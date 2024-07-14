/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE: process.env.API_BASE,
  },
  images: {
		domains: [
			"storage.googleapis.com",
		],
	},
};

export default nextConfig;
