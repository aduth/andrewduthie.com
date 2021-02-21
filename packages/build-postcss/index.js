import { join } from 'path';
import postcss from 'postcss';

/**
 * @type {import('@aduth/build-files').Builder}
 */
async function build(content, { file }) {
	let plugins = [];
	try {
		const configPath = join(process.cwd(), 'postcss.config.js');
		const { default: config } = await import(configPath);
		plugins = config.plugins;
	} catch {}

	const { css } = await postcss(plugins).process(content, { from: file });
	return css;
}

export default build;
