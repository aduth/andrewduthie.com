import postcssImport from 'postcss-import';
import postcssClean from 'postcss-clean';

export default {
	plugins: [postcssImport, postcssClean()],
};
