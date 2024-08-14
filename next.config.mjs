/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		if (process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === 'true') {
			return [
				{
					source: '/',
					destination: '/under-construction',
					permanent: false,
				},
			];
		}
		// No redirects in development or if under construction is not active
		return [];
	},
};

export default nextConfig;
