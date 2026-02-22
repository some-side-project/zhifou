export default function qiniuImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (process.env.NODE_ENV === 'development') {
    return src
  }
  const qualityParam = quality || 75
  const widthParam = width
  return `https://zhifou-static.finded.net/${src}?imageView2/1/w/${widthParam}/q/${qualityParam}`
}
