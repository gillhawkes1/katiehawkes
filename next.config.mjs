/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'katiehawkes.com',
        pathname: '/assets/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost:3000',
        pathname: '/assets/**',
      },
    ]
  }
};

export default nextConfig;
