import { ReactNode } from 'react'
import './Marquee.css'

interface MarqueeProps {
  children: ReactNode
  speed?: number
  reverse?: boolean
  pauseOnHover?: boolean
  className?: string
}

export const Marquee = ({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  className = '',
}: MarqueeProps) => {
  return (
    <div
      className={`marquee-root ${className}`}
      style={{
        ['--marquee-speed' as string]: `${speed}s`,
        ['--marquee-direction' as string]: reverse ? 'reverse' : 'normal',
      }}
    >
      <div className={`marquee-track ${pauseOnHover ? 'marquee-track--pausable' : ''}`}>
        <div className="marquee-content">{children}</div>
        <div className="marquee-content" aria-hidden="true">{children}</div>
      </div>
    </div>
  )
}
