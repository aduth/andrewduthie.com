import assert from 'node:assert/strict';
import { glob, readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';
import { relative, join, basename } from 'node:path';
import build from '../index.ts';

describe('build', () => {
	it('converts input files to output files using specified handlers', async () => {
		const relativePath = relative(process.cwd(), import.meta.dirname);
		const from = join(relativePath, 'fixtures/in');
		const to = join(relativePath, 'fixtures/out/actual');
		const handlers = {
			'.html.mdx': (await import('@aduth/build-mdx-to-html')).default,
			'.js': (await import('@aduth/build-js')).default,
			'.css': (await import('@aduth/build-css')).default,
		};
		await build(from, to, handlers);

		const expected = glob(join(relativePath, 'fixtures/out/expected/*'));
		for await (const path of expected) {
			const filename = basename(path);
			const actualPath = join(relativePath, 'fixtures/out/actual', filename);
			const expectedContent = await readFile(path);
			const actualContent = await readFile(actualPath);

			assert.equal(actualContent.toString(), expectedContent.toString());
		}
	});
});
