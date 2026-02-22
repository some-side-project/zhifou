/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: 'https://zhifou.finded.net',
  images: {
    loader: 'custom',
    loaderFile: './src/lib/qiniu-image-loader.ts',
  },
}

module.exports = nextConfig
