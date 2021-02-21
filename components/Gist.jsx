/**
 * @typedef GistProps
 *
 * @prop {string} id
 * @prop {string=} file
 */

/**
 * @param {GistProps} props
 */
function Gist({ id, file }) {
	const url = new URL(id + '.js', 'https://gist.github.com/');
	if (file) {
		url.searchParams.append('file', file);
	}

	return <script src={url.toString()} />;
}

export default Gist;
