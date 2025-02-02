import baseConfig from '@aduth/eslint-config';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
	...baseConfig,
	{
		plugins: { react },
		files: ['{packages,components,layouts}/**/*.{js,jsx}'],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			'react/jsx-uses-vars': 'error',
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},
		},
	},
];
