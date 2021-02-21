import { description as DEFAULT_DESCRIPTION } from '../package.json';

/**
 * @typedef BaseLayoutProps
 *
 * @prop {import('react').ReactNode} children
 * @prop {string} title
 * @prop {string=} description
 */

/**
 * @param {BaseLayoutProps} props
 */
function BaseLayout({ children, title, description = DEFAULT_DESCRIPTION }) {
	const formattedTitle = [title, 'Andrew Duthie'].filter(Boolean).join(' | ');

	return (
		<html lang="en">
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="description" content={description} />
			<title>{formattedTitle}</title>
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link rel="alternate" type="application/rss+xml" href="/sitemap.xml" />
			<link
				rel="stylesheet"
				href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap"
			/>
			<link rel="stylesheet" href="/style.css" />
			<body>{children}</body>
		</html>
	);
}

export default BaseLayout;
