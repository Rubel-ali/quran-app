/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["cdn.islamic.network", "everyayah.com"],
  },
};

export default nextConfig;
