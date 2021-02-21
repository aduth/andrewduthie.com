import { dirname } from 'path';
import { Worker } from 'worker_threads';
import mdx from '@mdx-js/mdx';
import esbuild from 'esbuild';

/**
 * @type {import('@aduth/build-files').Builder}
 */
async function build(source, options) {
	const { file } = options;

	const jsx = await mdx(source);
	const { outputFiles } = await esbuild.build({
		stdin: {
			contents: jsx,
			loader: 'jsx',
			resolveDir: dirname(file),
		},
		bundle: true,
		write: false,
		format: 'cjs',
		platform: 'node',
		plugins: [
			{
				name: 'external-node-modules',
				setup(build) {
					build.onResolve({ filter: /^[^.]/ }, (args) => ({
						path: args.path,
						external: true,
					}));
				},
			},
		],
	});
	const code = outputFiles.map(({ text }) => text).join('');
	const worker = new Worker(
		`const { mdx } = require('@mdx-js/react');
		const React = require('react');
		const { renderToStaticMarkup } = require('react-dom/server');
		const { MDXProvider } = require('@mdx-js/react');
		const { parentPort, workerData } = require('worker_threads');
		${code}
		const { default: CompiledComponent, ...props } = exports;
		const element = React.createElement(CompiledComponent, props);
		const elementWithProvider = React.createElement(MDXProvider, null, element);
		const rendered = '<!doctype html>' + renderToStaticMarkup(elementWithProvider);
		parentPort.postMessage(rendered);`,
		{ eval: true }
	);

	return new Promise((resolve) => worker.on('message', resolve));
}

export default build;
