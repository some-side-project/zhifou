/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'development' ? undefined : 'https://zhifou-static.finded.net',
  images: {
    loader: 'custom',
    loaderFile: './src/lib/qiniu-image-loader.ts',
  },
}

module.exports = nextConfig
