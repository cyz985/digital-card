import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { IconName } from '@/types'

/** 内联 SVG 图标集合，避免引入图标库 */
const ICONS: Record<IconName, ReactNode> = {
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.9 3.16 9.05 7.56 10.52.55.1.75-.24.75-.53 0-.26-.01-1.12-.02-2.04-3.08.67-3.73-1.31-3.73-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.11.08 1.7 1.14 1.7 1.14.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.46-.28-5.05-1.23-5.05-5.48 0-1.21.43-2.2 1.14-2.98-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.6 1.53.22 2.66.11 2.94.71.78 1.14 1.77 1.14 2.98 0 4.26-2.59 5.2-5.06 5.47.4.34.75 1.02.75 2.06 0 1.49-.01 2.79-.01 3.06 0 .29.2.64.76.53a11.1 11.1 0 0 0 7.56-10.52C23.1 5.33 18.27.5 12 .5Z"
    />
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  wechat: (
    <>
      <path d="M9 4.5c-3.6 0-6.5 2.2-6.5 4.9 0 1.6.9 3 2.3 3.9l-.7 2.2 2.5-1.2c.8.2 1.6.4 2.4.4 3.6 0 6.5-2.2 6.5-4.9S12.6 4.5 9 4.5Z" />
      <path d="M15.2 9.2c3 0 5.3 1.8 5.3 4 0 1.3-.7 2.4-1.9 3.2l.6 1.8-2-.9c-.6.2-1.3.3-2 .3-3 0-5.3-1.8-5.3-4" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5c.6-.1 1.2.2 1.5.8l1 2.2c.2.5.1 1.1-.3 1.5l-1 1a12.4 12.4 0 0 0 6.2 6.2l1-1c.4-.4 1-.5 1.5-.3l2.2 1c.6.3.9.9.8 1.5l-.3 2c-.1.7-.7 1.3-1.5 1.3C10.2 20 4 13.8 4 5.3c0-.8.6-1.4 1.3-1.5l1.3-.3Z" />
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4 9h3v11H4zM5.5 4a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4ZM10 9h2.9v1.5h.1c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.7V20h-3v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20h-3V9Z"
    />
  ),
  link: (
    <>
      <path d="M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7L11.2 6.6" />
      <path d="M14 10.5a4 4 0 0 0-5.7 0L5.5 13.3a4 4 0 0 0 5.7 5.7l1.6-1.6" />
    </>
  ),
  'arrow-down': (
    <>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="M12 20V5" />
      <path d="m6 11 6-6 6 6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </>
  ),
}

interface IconProps {
  name: IconName
  className?: string
}

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('h-5 w-5', className)}
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  )
}
