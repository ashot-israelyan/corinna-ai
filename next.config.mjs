/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com'
      },
      {
        protocol: 'https',
        hostname: 'wordpress-1275798-4611047.cloudwaysapps.com'
      }
    ]
  }
};

export default nextConfig;
