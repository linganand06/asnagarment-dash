import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Mail, MessageSquare } from 'lucide-react'
import gsap from 'gsap'
import { cn } from '../../utils/cn'
import './CTA.css'

export const CTA = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mx', `${x}%`)
      el.style.setProperty('--my', `${y}%`)
    }

    el.addEventListener('mousemove', handleMove)
    return () => el.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section id="cta" className="cta" ref={ref}>
      <div className="cta__inner" ref={bgRef}>
        {/* Background */}
        <div className="cta__bg">
          <div className="cta__bg-gradient" />
          <div className="cta__mouse-glow" />
          <div className="cta__grid" />
        </div>

        {/* Ambient orbs */}
        <div className="cta__orb cta__orb--1" />
        <div className="cta__orb cta__orb--2" />
        <div className="cta__orb cta__orb--3" />

        <div className="container cta__content">
          <div className={cn('cta__label reveal', inView && 'is-visible')}>
            <span className="accent-dot" />
            Ready to Manufacture at Scale
          </div>

          <h2 className={cn('cta__headline reveal', inView && 'is-visible')} style={{ transitionDelay: '0.1s' }}>
            <span className="cta__headline-main">Let's build your</span>
            <span className="cta__headline-accent">next collection</span>
            <span className="cta__headline-sub">together</span>
          </h2>

          <p className={cn('cta__desc reveal', inView && 'is-visible')} style={{ transitionDelay: '0.2s' }}>
            From 100 to 100,000 pieces. Custom designs, premium materials, global export.
            <br />Contact us today and receive a quote within 24 hours.
          </p>

          <div className={cn('cta__actions reveal', inView && 'is-visible')} style={{ transitionDelay: '0.3s' }}>
            <a
              href="mailto:sales@asnagarments.com"
              className="btn btn-primary btn-xl cta__btn-primary"
            >
              <Mail size={18} />
              <span>Get a Free Quote</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-xl cta__btn-secondary"
            >
              <MessageSquare size={18} />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Trust signals */}
          <div className={cn('cta__trust reveal', inView && 'is-visible')} style={{ transitionDelay: '0.4s' }}>
            {[
              '24hr Quote Response',
              'No Hidden Fees',
              'Sample Before Bulk',
              'Dedicated Account Manager',
            ].map((item) => (
              <div key={item} className="cta__trust-item">
                <span className="cta__trust-check">✓</span>
                {item}
              </div>
            ))}
          </div>

          {/* Contact details */}
          <div className={cn('cta__contact-row reveal', inView && 'is-visible')} style={{ transitionDelay: '0.5s' }}>
            <div className="cta__contact-item">
              <span className="cta__contact-label">Email</span>
              <a href="mailto:sales@asnagarments.com" className="cta__contact-value">
                sales@asnagarments.com
              </a>
            </div>
            <div className="cta__contact-divider" />
            <div className="cta__contact-item">
              <span className="cta__contact-label">WhatsApp</span>
              <a href="https://wa.me/919876543210" className="cta__contact-value">
                +91 98765 43210
              </a>
            </div>
            <div className="cta__contact-divider" />
            <div className="cta__contact-item">
              <span className="cta__contact-label">Location</span>
              <span className="cta__contact-value">Tirupur, Tamil Nadu, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
