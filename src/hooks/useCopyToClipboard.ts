import { useCallback, useEffect, useRef, useState } from 'react'

/** 复制文本并在指定时间后重置反馈状态 */
export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(text)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setCopied(null), resetDelay)
        return true
      } catch {
        return false
      }
    },
    [resetDelay],
  )

  return { copied, copy }
}
