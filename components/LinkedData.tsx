import { type Thing } from 'schema-dts';

interface LinkedDataProps {
	children: Thing;
}

function LinkedData({ children }: LinkedDataProps) {
	const data = {
		'@context': 'https://schema.org',
		...(children as object),
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	);
}

export default LinkedData;
