import { type ReactNode } from 'react';
import Avatar from '#components/Avatar.tsx';
import LinkedData from '#components/LinkedData.tsx';
import BaseLayout from './BaseLayout';
import { author } from '../package.json';

interface BlogLayoutProps {
	children: ReactNode;
	title: string;
	description?: string;
	datePublished: Date;
	tags?: string[];
}

export default function BlogLayout({
	children,
	title,
	datePublished,
	description,
	tags = [],
}: BlogLayoutProps) {
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
