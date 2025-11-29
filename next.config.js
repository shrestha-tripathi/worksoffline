/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/worksoffline',
  assetPrefix: '/worksoffline/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
