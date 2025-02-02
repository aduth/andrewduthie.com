import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, relative, basename, dirname } from 'node:path';
import walkStream from 'klaw';

/**
 * @typedef BuildOptions
 *
 * @prop {string} file Absolute path to file.
 */

/**
 * @typedef {(source:string, options:BuildOptions)=>string|Promise<string>} Builder
 */

/**
 * @param {string} file
 *
 * @return {string}
 */
const dropExtension = (file) => file.slice(0, file.lastIndexOf('.'));

/**
 * @template T
 *
 * @param {T|T[]} obj
 *
 * @return {T[]}
 */
const castArray = (obj) => (Array.isArray(obj) ? obj : [obj]);

/**
 *
 * @param {Record<string,Builder>} handlers
 */
function createGetRenderer(handlers) {
	/** @type {[(path: string) => boolean, Builder][]} */
	const renderers = Object.entries(handlers).map(([ext, handler]) => [
		(path) => path.endsWith(ext),
		handler,
	]);

	/**
	 * @param {string} path
	 *
	 * @return {Builder=}
	 */
	function getRenderer(path) {
		for (const [isMatch, handler] of renderers) {
			if (isMatch(path)) {
				return handler;
			}
		}
	}

	return getRenderer;
}

/**
 * @param {string|string[]} from
 * @param {string} to
 * @param {Record<string,Builder>} [handlers]
 *
 * @return {Promise<string[]>}
 */
async function build(from, to, handlers = {}) {
	const getRenderer = createGetRenderer(handlers);

	/** @type {Promise<string>[]} */
	const files = [];

	for (const dir of castArray(from)) {
		for await (const entry of walkStream(dir)) {
			const { path, stats } = entry;
			if (!stats.isFile()) {
				continue;
			}

			// Don't process hidden or ignored files starting with dot or underscore
			if (/^[_.]/.test(basename(path))) {
				continue;
			}

			const render = getRenderer(path);
			if (!render) {
				continue;
			}

			const relativePath = relative(dir, path);
			const outFile = dropExtension(join(to, relativePath));
			files.push(
				readFile(path, 'utf-8')
					.then((content) => render(content, { file: join(dir, relativePath) }))
					.then(async (output) => {
						await mkdir(dirname(outFile), { recursive: true });
						await writeFile(outFile, output);
						return output;
					}),
			);
		}
	}

	return Promise.all(files);
}

export default build;
