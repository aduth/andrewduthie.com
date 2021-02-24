/**
 * @typedef ClickableImageProps
 *
 * @prop {string} src
 * @prop {number} width
 * @prop {number} height
 * @prop {string} alt
 */

/**
 * @param {ClickableImageProps} props
 */
function ClickableImage({ src, width, height, alt }) {
	return (
		<a href={src}>
			<img src={src} width={width} height={height} alt={alt} />
		</a>
	);
}

export default ClickableImage;
