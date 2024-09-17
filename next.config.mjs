import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	serverExternalPackages: ['onnxruntime-node', '@xenova/transformers', 'llamaindex'],
	webpack: (config) => {
		config.resolve.alias.canvas = false;

		return config;
	},
};

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
