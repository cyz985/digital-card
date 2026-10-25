import { useEffect, useState } from 'react'

/**
 * 滚动监听：判断当前所在的区块
 * 使用 IntersectionObserver 避免高频 scroll 计算
 */
export function useScrollSpy(ids: string[], offset = 96): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    if (sections.length === 0) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })
        const current = ids.find((id) => visible.has(id))
        if (current) setActive(current)
      },
      { rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids, offset])

  return active
}
