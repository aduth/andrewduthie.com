interface GistProps {
	id: string;

	file?: string;
}

function Gist({ id, file }: GistProps) {
	const url = new URL(id + '.js', 'https://gist.github.com/');
	if (file) {
		url.searchParams.append('file', file);
	}

	return <script src={url.toString()} />;
}

export default Gist;
