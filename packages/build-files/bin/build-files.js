#!/usr/bin/env node

import { parseArgs } from 'node:util';
import build from '../index.js';

/** @typedef {import('../index').Builder} Builder */

/**
 * @typedef BuildOptions
 *
 * @prop {string[]} handler Mappings of file extension to handler package.
 * @prop {string} outDir Output directory.
 */

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

/**
 * @template {string} TKey
 * @template TValue
 *
 * @param {[TKey,TValue][]} array
 *
 * @return {Record<TKey,TValue>}
 */
const fromPairs = (array) =>
	array.reduce(
		(result, pair) => ((result[pair[0]] = pair[1]), result),
		/** @type {Record<TKey,TValue>} */ ({}),
	);

/**
 * @param {string[]} rawHandlers Colon-delimited pair of file extension to module handler.
 *
 * @return {Promise<Record<string,Builder>>}
 */
function getHandlers(rawHandlers) {
	/** @type {Promise<[string,Builder]>[]} */
	const handlerPairs = [];

	for (const rawHandler of rawHandlers) {
		const [extension, mod] = rawHandler.split(':');
		handlerPairs.push(
			import(mod).then(({ default: handler }) => [extension, handler]),
		);
	}

	return Promise.all(handlerPairs).then(fromPairs);
}

getHandlers(rawHandlers).then((handlers) => build(from, outDir, handlers));
