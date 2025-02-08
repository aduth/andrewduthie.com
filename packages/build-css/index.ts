import { bundle } from 'lightningcss';
import { type Builder } from '@aduth/build-files';

const build: Builder = (_content, { file }) => {
	const { code } = bundle({
		filename: file,
		minify: true,
	});

	return code.toString();
};

export default build;
