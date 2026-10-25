import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, VIEWPORT } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** 延迟秒数，用于同一组元素交错入场 */
  delay?: number
}

/** 滚动进入视口时播放一次淡入上移；减弱动效时直接呈现 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={delay}
      initial={reduced ? false : 'hidden'}
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}
