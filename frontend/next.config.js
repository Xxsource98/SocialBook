/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ process.env.SERVER_DOMAIN || '127.0.0.1', process.env.SERVER_CONTAINER_DOMAIN || 'socialbook-server' ]
  },
  env: {
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    SERVER_URL: process.env.SERVER_URL,
    SERVER_PORT: process.env.SERVER_PORT,
    SERVER_CONTAINER_DOMAIN: process.env.SERVER_CONTAINER_DOMAIN,
    SERVER_CONTAINER_URL: process.env.SERVER_CONTAINER_URL,
    SERVER_CONTAINER_PORT: process.env.SERVER_CONTAINER_PORT
  },
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    }

    return config
  }
}

module.exports = nextConfig
