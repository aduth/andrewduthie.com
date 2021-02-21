#!/usr/bin/env node

import { program } from 'commander';
import build from '../index.js';

/** @typedef {import('../index').Builder} Builder */

program.arguments('<from...>');
program.option(
	'--handler <handler...>',
	'Colon-deliminated pair of file extension to module helper'
);
program.option(
	'--out-dir <outDir>',
	'Output directory for built files',
	'build'
);
program.parse(process.argv);

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
		/** @type {Record<TKey,TValue>} */ ({})
	);

/**
 * @param {string[]} rawHandlers Colon-delimited pair of file extension to module handler.
 *
 * @return {Promise<Record<string,Builder>>}
 */
async function getHandlers(rawHandlers) {
	/** @type {Promise<[string,Builder]>[]} */
	const handlerPairs = [];

	for (const rawHandler of rawHandlers) {
		const [extension, mod] = rawHandler.split(':');
		handlerPairs.push(import(mod).then((mod) => [extension, mod.default]));
	}

	return Promise.all(handlerPairs).then(fromPairs);
}

const { handler: rawHandlers = [], outDir } = program.opts();
const from = program.args;

getHandlers(rawHandlers).then((handlers) => build(from, outDir, handlers));
