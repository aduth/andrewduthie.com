/**
 * @typedef BigTextProps
 *
 * @prop {import('react').ReactNode} children
 */

/**
 * @param {BigTextProps} props
 */
function BigText({ children }) {
	return <div className="big-text">{children}</div>;
}

export default BigText;
