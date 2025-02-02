type AvatarSize = 'normal' | 'small';

interface AvatarProps {
	size: AvatarSize;
}

export default function Avatar({ size = 'normal' }: AvatarProps) {
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
