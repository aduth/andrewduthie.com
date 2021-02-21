import BaseLayout from './BaseLayout';
import Avatar from '../components/Avatar';
import LinkedData from '../components/LinkedData';
import { author } from '../package.json';

/**
 * @typedef BlogLayoutProps
 *
 * @prop {import('react').ReactNode} children
 * @prop {string} title
 * @prop {string=} description
 * @prop {Date} datePublished
 * @prop {string[]=} tags
 */

/**
 * @param {BlogLayoutProps} props
 */
export default function BlogLayout({
	children,
	title,
	datePublished,
	description,
	tags = [],
}) {
	return (
		<BaseLayout title={title} description={description}>
			<LinkedData>
				{{
					'@type': 'BlogPosting',
					headline: title,
					datePublished: datePublished.toISOString(),
					description,
					author: {
						'@type': 'Person',
						...author,
					},
					keywords: tags.join(),
				}}
			</LinkedData>
			<a href="/">
				<Avatar size="small" />
			</a>
			<hr />
			<h1 className="blog-layout__heading">{title}</h1>
			<div className="blog-layout__publish-date">
				Published on{' '}
				<time dateTime={datePublished.toISOString()}>
					{new Intl.DateTimeFormat('en-US', {
						dateStyle: 'medium',
					}).format(datePublished)}
				</time>
			</div>
			<div className="blog-layout__content">{children}</div>
		</BaseLayout>
	);
}
