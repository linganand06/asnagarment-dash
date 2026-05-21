import { useRef, useEffect } from 'react'

interface TiltOptions {
  maxTilt?: number
  scale?: number
  speed?: number
  glare?: boolean
}

export const useTilt = ({ maxTilt = 10, scale = 1.02, speed = 400 }: TiltOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)

      const rotateX = -dy * maxTilt
      const rotateY = dx * maxTilt

      el.style.transition = `transform ${speed / 4}ms linear`
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
    }

    const handleLeave = () => {
      el.style.transition = `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [maxTilt, scale, speed])

  return ref
}
