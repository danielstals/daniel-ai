import * as React from 'react';

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string;
};

// Mock Next.js `Link` component using a standard `a` element
const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
	return (
		<a data-testid='link-mock' href={href} {...props}>
			{children}
		</a>
	);
};

export default Link;
