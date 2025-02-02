import { bundle } from 'lightningcss';

/**
 * @type {import('@aduth/build-files').Builder}
 */
function build(_content, { file }) {
	const { code } = bundle({
		filename: file,
		minify: true,
	});

	return code.toString();
}

export default build;
