#!/usr/bin/env node

import { parseArgs } from 'node:util';
import build, { type Builder } from '../index.ts';

const { positionals: from, values } = parseArgs({
	allowPositionals: true,
	options: {
		handler: {
			type: 'string',
			multiple: true,
		},
		'out-dir': {
			type: 'string',
		},
		help: {
			type: 'boolean',
			short: 'h',
		},
	},
});

if (values.help) {
	process.stdout.write(
		`Usage: build-files --handler <handler...> --out-dir <outdir> [from...]

  --handler <handler...>
  Colon-deliminated pair of file extension to module helper

  --out-dir <outDir>
  Output directory for built files
`,
	);

	process.exit(1);
}

const outDir = values['out-dir'] ?? 'build';
const rawHandlers = values.handler ?? [];

const fromPairs = <TKey extends string, TValue>(
	array: [TKey, TValue][],
): Record<TKey, TValue> =>
	array.reduce(
		(result, pair) => ((result[pair[0]] = pair[1]), result),
		{} as Record<TKey, TValue>,
	);

function getHandlers(): Promise<Record<string, Builder>> {
	const handlerPairs: Promise<[string, Builder]>[] = [];

	for (const rawHandler of rawHandlers) {
		const [extension, mod] = rawHandler.split(':');
		handlerPairs.push(
			import(mod).then(({ default: handler }) => [extension, handler]),
		);
	}

	return Promise.all(handlerPairs).then(fromPairs);
}

getHandlers().then((handlers) => build(from, outDir, handlers));
