import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

export const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number>()

  useEffect(() => {
    // Check touch device
    if (window.matchMedia('(hover: none)').matches) {
      setIsHidden(true)
      return
    }

    const handleMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleEnter = () => setIsHidden(false)
    const handleLeave = () => setIsHidden(true)

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor], input, textarea')
      setIsHovering(!!interactive)
    }

    document.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mousemove', handleInteractive, { passive: true })
    document.addEventListener('mouseenter', handleEnter)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // Animate ring with lerp
    const animate = () => {
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px)`
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mousemove', handleInteractive)
      document.removeEventListener('mouseenter', handleEnter)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  if (isHidden && typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovering ? 'cursor-dot--hover' : ''} ${isClicking ? 'cursor-dot--click' : ''} ${isHidden ? 'cursor--hidden' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'cursor-ring--hover' : ''} ${isClicking ? 'cursor-ring--click' : ''} ${isHidden ? 'cursor--hidden' : ''}`}
        aria-hidden="true"
      />
    </>
  )
}
