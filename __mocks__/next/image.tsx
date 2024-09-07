import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	priority?: boolean;
}

// Mock Next.js `Image` component using a standard `img` element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NextImage: React.FC<ImageProps> = ({ src, alt, priority, ...props }) => {
	return <img src={src} alt={alt} {...props} />;
};

export default NextImage;
