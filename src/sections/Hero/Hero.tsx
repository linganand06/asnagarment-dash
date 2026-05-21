import { useEffect, useRef } from 'react'

import { ArrowDown, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { HeroCanvas } from '../../components/three/HeroCanvas'
import './Hero.css'

const stats = [
  { value: '10M+', label: 'Garments Produced' },
  { value: '50+', label: 'Countries Exported' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '500+', label: 'Expert Craftsmen' },
]

export const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo('.hero__label',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.hero__headline-line',
      { opacity: 0, y: 60, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: 'power3.out', stagger: 0.15 },
      '-=0.4'
    )
    .fromTo('.hero__sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero__cta-group',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.hero__stat',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    )
  }, [])

  const scrollDown = () => {
    const next = document.querySelector('#brands')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" ref={containerRef}>
      {/* 3D Canvas */}
      <HeroCanvas />

      {/* Ambient glow blobs */}
      <div className="hero__blob hero__blob--blue" />
      <div className="hero__blob hero__blob--purple" />

      {/* Grid overlay */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content">
        
        {/* Left Column (Text & CTAs) */}
        <div className="hero__content-left">
          {/* Label */}
          <div className="hero__label">
            <span className="accent-dot" />
            <span>Premium Wholesale Manufacturing</span>
            <span className="hero__label-badge">ISO 9001</span>
          </div>

          {/* Headline */}
          <h1 className="hero__headline" ref={headlineRef}>
            <span className="hero__headline-line">Manufacturing</span>
            <span className="hero__headline-line hero__headline-line--accent">
              Premium Apparel
            </span>
            <span className="hero__headline-line">at Scale</span>
          </h1>

          {/* Sub */}
          <p className="hero__sub">
            Where global fashion brands manufacture excellence.
            <br className="hide-mobile" />
            Bulk t-shirts · Custom printing · Corporate uniforms · Export quality
          </p>

          {/* CTAs */}
          <div className="hero__cta-group">
            <a
              href="#cta"
              className="btn btn-primary btn-lg hero__cta-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <span>Start Manufacturing</span>
              <ChevronRight size={18} />
            </a>
            <a
              href="#products"
              className="btn btn-ghost btn-lg"
              onClick={(e) => { e.preventDefault(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              View Capabilities
            </a>
          </div>
        </div>

        {/* Right Column (Stats) */}
        <div className="hero__content-right">
          <div className="hero__stats">
            {stats.map((stat, i) => (
              <div key={i} className="hero__stat">
                <div className="hero__stat-value">{stat.value}</div>
                <div className="hero__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button className="hero__scroll-btn" onClick={scrollDown} aria-label="Scroll down">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-icon">
          <ArrowDown size={14} />
        </div>
      </button>

      {/* Bottom gradient */}
      <div className="hero__gradient-bottom" />
    </section>
  )
}
