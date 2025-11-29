/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/landingSaaS',
  assetPrefix: '/landingSaaS/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
