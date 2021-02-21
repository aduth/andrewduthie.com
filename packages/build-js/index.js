import { relative, dirname, join } from 'path';
import { fileURLToPath } from 'url';

/**
 * @type {import('@aduth/build-files').Builder}
 */
async function build(_content, { file }) {
	const modulePath = relative(
		dirname(fileURLToPath(import.meta.url)),
		join(process.cwd(), file)
	);

	return (await import(modulePath)).default();
}

export default build;
