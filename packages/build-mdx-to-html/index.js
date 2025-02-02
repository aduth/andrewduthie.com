import { dirname } from 'path';
import { createHash } from 'crypto';
import { writeFile, unlink } from 'fs/promises';
import { compile } from '@mdx-js/mdx';
import esbuild from 'esbuild';

/** @typedef {esbuild.Metafile} Metafile */

/**
 * Returns an MD5 hash of the given string.
 *
 * @param {string} string String to hash.
 *
 * @return {string} Hashed string.
 */
const md5 = (string) => createHash('md5').update(string).digest('hex');

/**
 * @type {import('@aduth/build-files').Builder}
 */
async function build(source, options) {
	const { file } = options;

	const jsx = String(await compile(source));
	const { outputFiles, metafile } = await esbuild.build({
		stdin: {
			contents: jsx,
			loader: 'jsx',
			resolveDir: dirname(file),
		},
		metafile: true,
		bundle: true,
		write: false,
		format: 'esm',
		platform: 'node',
		plugins: [
			{
				name: 'external-node-modules',
				setup({ onResolve }) {
					onResolve({ filter: /^[^.]/ }, (args) => ({
						path: args.path,
						external: true,
					}));
				},
			},
		],
	});
	const code = outputFiles.map(({ text }) => text).join('');
	const namedExports = Object.values(/** @type {Metafile} */ (metafile).outputs)
		.flatMap((output) => output.exports)
		.filter((name) => name !== 'default');

	const tempFile = new URL(`./tmp/${md5(code)}.js`, import.meta.url);
	await writeFile(
		tempFile,
		`${code}
		import React from 'react';
		import { renderToStaticMarkup } from 'react-dom/server';
		const element = React.createElement(MDXContent, {${namedExports.join(',')}});
		export const _builtMDXContent = '<!doctype html>' + renderToStaticMarkup(element);`,
	);
	const { _builtMDXContent: content } = await import(tempFile.toString());
	await unlink(tempFile);

	return content;
}

export default build;
