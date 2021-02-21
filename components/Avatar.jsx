/**
 * @typedef {'normal'|'small'} AvatarSize
 */

/**
 * @typedef AvatarProps
 *
 * @prop {AvatarSize} size
 */

/**
 * @param {AvatarProps} props
 */
export default function Avatar({ size = 'normal' }) {
	const pixels = size === 'normal' ? 135 : 100;

	return (
		<img
			src="/images/andrew.jpg"
			alt="Andrew Duthie photo"
			width={pixels}
			height={pixels}
			className="avatar"
		/>
	);
}
