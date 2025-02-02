interface ClickableImageProps {
	src: string;

	width: number;

	height: number;

	alt: string;
}

function ClickableImage({ src, width, height, alt }: ClickableImageProps) {
	return (
		<a href={src}>
			<img src={src} width={width} height={height} alt={alt} />
		</a>
	);
}

export default ClickableImage;
