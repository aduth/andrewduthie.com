import { relative, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { type Builder } from '@aduth/build-files';

const build: Builder = async (_content, { file }) => {
	const modulePath = relative(
		dirname(fileURLToPath(import.meta.url)),
		join(process.cwd(), file),
	);

	return (await import(modulePath)).default();
};

export default build;
