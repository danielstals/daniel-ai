import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
}

// Mock Next.js `Image` component using a standard `img` element
const NextImage: React.FC<ImageProps> = ({ src, alt, ...props }) => {
	return <img src={src} alt={alt} {...props} />;
};

export default NextImage;
