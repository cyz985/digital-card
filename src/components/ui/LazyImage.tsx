import type { ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface LazyImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading' | 'decoding'> {
  src: string
  alt: string
  /** 如 "16 / 10"，用于预留高度、避免 CLS */
  aspectRatio?: string
  /** 首屏关键图片设为 true：立即加载并提高优先级 */
  priority?: boolean
  wrapperClassName?: string
}

/** 统一图片封装：非首屏默认懒加载 + 异步解码 */
export function LazyImage({
  src,
  alt,
  aspectRatio = '16 / 10',
  priority = false,
  wrapperClassName,
  className,
  ...rest
}: LazyImageProps) {
  return (
    <div
      className={cn('overflow-hidden bg-surface-2', wrapperClassName)}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('h-full w-full object-cover', className)}
        {...rest}
      />
    </div>
  )
}
