import Icon, { type SupportedIcon } from './Icon';

interface SocialLinkProps {
	provider: SupportedIcon;

	url: string;
}

function SocialLink({ provider, url }: SocialLinkProps) {
	return (
		<a href={url} className="social-link">
			<Icon icon={provider} className="social-link__icon" />
		</a>
	);
}

export default SocialLink;
