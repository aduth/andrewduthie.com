/**
 * @typedef SiteData
 *
 * @prop {string} baseURL
 */

/**
 * @typedef LinkedDataProps
 *
 * @prop {import('schema-dts').Thing} children
 */

/**
 * @param {LinkedDataProps} props
 */
function LinkedData({ children }) {
	const data = {
		'@context': 'https://schema.org',
		.../** @type {object} */ (children),
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}

export default LinkedData;
