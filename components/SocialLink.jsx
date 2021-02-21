import Icon from './Icon';

/**
 * @typedef SocialLinkProps
 *
 * @prop {import('./Icon').SupportedIcon} provider
 * @prop {string} url
 */

/**
 * @param {SocialLinkProps} props
 */
function SocialLink({ provider, url }) {
	return (
		<a href={url} className="social-link">
			<Icon icon={provider} className="social-link__icon" />
		</a>
	);
}

export default SocialLink;
