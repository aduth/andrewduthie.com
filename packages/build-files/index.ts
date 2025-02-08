import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, relative, basename, dirname } from 'node:path';
import walkStream from 'klaw';

interface BuildOptions {
	/**
	 * Absolute path to file.
	 */
	file: string;
}

export type Builder = (
	source: string,
	options: BuildOptions,
) => string | Promise<string>;

const dropExtension = (file: string): string =>
	file.slice(0, file.lastIndexOf('.'));

const castArray = <T>(obj: T | T[]): T[] => (Array.isArray(obj) ? obj : [obj]);

function createGetRenderer(handlers: Record<string, Builder>) {
	const renderers: [(path: string) => boolean, Builder][] = Object.entries(
		handlers,
	).map(([ext, handler]) => [(path) => path.endsWith(ext), handler]);

	function getRenderer(path: string): Builder | undefined {
		for (const [isMatch, handler] of renderers) {
			if (isMatch(path)) {
				return handler;
			}
		}
	}

	return getRenderer;
}

async function build(
	from: string | string[],
	to: string,
	handlers: Record<string, Builder> = {},
): Promise<string[]> {
	const getRenderer = createGetRenderer(handlers);

	const files: Promise<string>[] = [];

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
