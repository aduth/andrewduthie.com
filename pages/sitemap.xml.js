import { dirname } from 'path';
import { fileURLToPath } from 'url';
import glob from 'fast-glob';
import { readFile } from 'fs/promises';

/**
 * @type {Set<string>}
 */
const EXCLUDED_PATHS = new Set(['404.html']);

/**
 * @param {string} path
 *
 * @return {string}
 */
const getNormalPath = (path) =>
	path.replace(/\.mdx$/, '').replace(/(^|\/)index\.html$/, '');

/**
 * @param {string} path
 * @param {string} baseURL
 *
 * @return {string}
 */
const getURLEntry = (url) => `<url><loc>${url}</loc></url>`;

/**
 * @param {string[]} urls
 *
 * @return {string}
 */
const getURLSet = (urls) =>
	'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
	urls.map(getURLEntry).join('') +
	'</urlset>';

/**
 * @param {string[]} urls
 *
 * @return {string}
 */
const getSitemap = (urls) =>
	`<?xml version="1.0" encoding="UTF-8"?>${getURLSet(urls)}`;

/**
 * @return {Promise<string>}
 */
async function render() {
	const scriptDir = dirname(fileURLToPath(import.meta.url));
	const pkgFile = new URL('../package.json', import.meta.url);
	const [pages, pkg] = await Promise.all([
		glob('**/*.html.mdx', { cwd: scriptDir }),
		readFile(pkgFile, 'utf-8'),
	]);
	const { homepage: baseURL } = JSON.parse(pkg);
	const urls = pages
		.map((path) => getNormalPath(path))
		.filter((path) => !EXCLUDED_PATHS.has(path))
		.map((path) => new URL(path, baseURL));

	return getSitemap(urls);
}

export default render;
