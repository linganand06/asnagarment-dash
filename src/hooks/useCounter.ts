import { useState, useEffect, useRef } from 'react'

interface CounterOptions {
  start?: number
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  trigger?: boolean
}

export const useCounter = ({
  start = 0,
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  trigger = true,
}: CounterOptions) => {
  const [count, setCount] = useState(start)
  const frameRef = useRef<number>()
  const startTimeRef = useRef<number>()

  useEffect(() => {
    if (!trigger) return

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutExpo(progress)
      const current = start + (end - start) * easedProgress

      setCount(parseFloat(current.toFixed(decimals)))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [trigger, start, end, duration, decimals])

  const formatted = `${prefix}${count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`

  return { count, formatted }
}
