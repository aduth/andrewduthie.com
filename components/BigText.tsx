import { type ReactNode } from 'react';

interface BigTextProps {
	children: ReactNode;
}

function BigText({ children }: BigTextProps) {
	return <div className="big-text">{children}</div>;
}

export default BigText;
