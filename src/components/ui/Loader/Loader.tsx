import { useEffect, useState, useRef } from 'react'
import './Loader.css'

interface LoaderProps {
  onComplete: () => void
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0)
  const [isLeaving, setIsLeaving] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    let current = 0
    const target = 100
    const duration = 2600

    const tick = () => {
      const remaining = target - current
      const increment = remaining * 0.04 + 0.5
      current = Math.min(current + increment, target)
      setProgress(Math.floor(current))

      if (current >= target) {
        clearInterval(intervalRef.current)
        setTimeout(() => {
          setIsLeaving(true)
          setTimeout(onComplete, 900)
        }, 300)
      }
    }

    intervalRef.current = setInterval(tick, 30)
    return () => clearInterval(intervalRef.current)
  }, [onComplete])

  const letters = 'ASNA'.split('')
  const letters2 = 'GARMENTS'.split('')

  return (
    <div className={`loader ${isLeaving ? 'loader--leaving' : ''}`}>
      <div className="loader__bg" />

      {/* Scan line */}
      <div className="loader__scan" />

      {/* Content */}
      <div className="loader__content">
        <div className="loader__brand">
          <div className="loader__letters">
            {letters.map((l, i) => (
              <span key={i} className="loader__letter" style={{ animationDelay: `${i * 80}ms` }}>
                {l}
              </span>
            ))}
          </div>
          <div className="loader__letters loader__letters--sub">
            {letters2.map((l, i) => (
              <span key={i} className="loader__letter" style={{ animationDelay: `${320 + i * 60}ms` }}>
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="loader__bar-wrap">
          <div className="loader__bar">
            <div
              className="loader__bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loader__progress">
            <span className="loader__progress-num">{String(progress).padStart(3, '0')}</span>
            <span className="loader__progress-sep">%</span>
          </div>
        </div>

        <p className="loader__tag">Premium Apparel Manufacturing</p>
      </div>

      {/* Corner decorations */}
      <div className="loader__corner loader__corner--tl" />
      <div className="loader__corner loader__corner--tr" />
      <div className="loader__corner loader__corner--bl" />
      <div className="loader__corner loader__corner--br" />
    </div>
  )
}
