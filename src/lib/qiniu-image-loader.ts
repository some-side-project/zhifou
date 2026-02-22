export default function qiniuImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const qualityParam = quality || 75
  const widthParam = width
  return `https://zhifou.finded.net/${src}?imageView2/1/w/${widthParam}/q/${qualityParam}`
}
