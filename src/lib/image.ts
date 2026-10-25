const IMAGE_API = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image'

export type ImageSize =
  | 'square_hd'
  | 'square'
  | 'portrait_4_3'
  | 'portrait_16_9'
  | 'landscape_4_3'
  | 'landscape_16_9'

/** 生成站点配图地址，prompt 统一做 URL 编码 */
export function createImageUrl(prompt: string, size: ImageSize): string {
  return `${IMAGE_API}?prompt=${encodeURIComponent(prompt)}&image_size=${size}`
}
