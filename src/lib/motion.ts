import type { Variants } from 'framer-motion'

/** 全站统一的缓动曲线 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** 视口触发配置：只播放一次，进入 20% 即触发 */
export const VIEWPORT = { once: true, amount: 0.2 } as const

/** 淡入上移，custom 传入延迟秒数 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
}

/** 纯淡入，用于图片与容器 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
}
