/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SERVER_URL: process.env.REACT_APP_SERVER_URL,
  },
};

module.exports = nextConfig;
