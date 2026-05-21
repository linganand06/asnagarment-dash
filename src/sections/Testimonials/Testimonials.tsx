import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: 'Marcus Williams',
    role: 'CEO, StreetEdge Apparel',
    country: '🇺🇸 United States',
    text: 'ASNA Garments transformed our supply chain. Their production quality is absolutely on par with factories twice their size. We placed our first order for 5,000 oversized tees and received them 3 days ahead of schedule with zero defects. They\'re our primary manufacturing partner now.',
    stars: 5,
    order: '5,000 Oversized T-Shirts',
    since: 'Client since 2021',
    avatar: 'M',
    color: '#00F0FF',
  },
  {
    id: 2,
    name: 'Sophie Laurent',
    role: 'Sourcing Director, MaisonBlanche',
    country: '🇫🇷 France',
    text: 'We\'ve worked with manufacturers across Bangladesh, Turkey, and Portugal. ASNA Garments in India offers an unbeatable combination of quality, lead time, and price. Their embroidery work on our polo line is exceptional — the digitization is precise and every piece is consistent.',
    stars: 5,
    order: '12,000 Polo Shirts',
    since: 'Client since 2020',
    avatar: 'S',
    color: '#8B5CF6',
  },
  {
    id: 3,
    name: 'Ahmad Al-Rashid',
    role: 'Operations Manager, GulfUniform Co.',
    country: '🇦🇪 UAE',
    text: 'For our corporate uniform program serving 200+ hospitality properties, ASNA has been flawless. 80,000 pieces annually, strict QC requirements, multiple delivery windows — they handle it all without a single escalation. Their documentation for customs is always perfect.',
    stars: 5,
    order: '80,000 Corporate Uniforms/year',
    since: 'Client since 2019',
    avatar: 'A',
    color: '#C9A84C',
  },
  {
    id: 4,
    name: 'Priya Venkataraman',
    role: 'Founder, EcoThread Collective',
    country: '🇸🇬 Singapore',
    text: 'As a sustainability-focused brand, finding an ethical manufacturer was critical. ASNA\'s GOTS certification and transparent factory practices won us over. Their organic cotton quality is exceptional, and the DTG prints on our mindfulness collection are vivid even after 50 washes.',
    stars: 5,
    order: '3,000 Organic Cotton Tees',
    since: 'Client since 2022',
    avatar: 'P',
    color: '#00F0FF',
  },
  {
    id: 5,
    name: 'James O\'Brien',
    role: 'Brand Manager, Dublin Athletic Co.',
    country: '🇮🇪 Ireland',
    text: 'We needed a manufacturer who could handle sublimation all-over prints for our football kits on a tight timeline. ASNA delivered 8,000 kits in 16 days with registration-perfect prints. The account management is incredible — daily updates, proactive communication.',
    stars: 5,
    order: '8,000 Sublimation Jerseys',
    since: 'Client since 2023',
    avatar: 'J',
    color: '#8B5CF6',
  },
]

export const Testimonials = () => {
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const autoRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(autoRef.current)
  }, [])

  const next = () => {
    clearInterval(autoRef.current)
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    clearInterval(autoRef.current)
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[active]

  return (
    <section className="testimonials section" ref={ref}>
      <div className="ambient-blob ambient-blob-purple" style={{ width: 500, height: 500, bottom: '-100px', left: '30%' }} />

      <div className="container">
        <div className={cn('section-header stagger-children', inView && 'is-visible')}>
          <div className="section-label">Client Testimonials</div>
          <h2 className="text-h1">
            Trusted by brands<br />
            <span className="text-gradient">around the world</span>
          </h2>
        </div>

        <div className={cn('testimonials__layout reveal', inView && 'is-visible')} style={{ transitionDelay: '0.2s' }}>
          {/* Main card */}
          <div className="testimonials__main" key={current.id}>
            <div className="card-testimonial testimonials__card">
              <div className="stars">
                {Array.from({ length: current.stars }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="testimonials__text">"{current.text}"</p>
              <div className="testimonials__author">
                <div className="avatar testimonials__avatar" style={{ background: `${current.color}20`, borderColor: `${current.color}33`, color: current.color }}>
                  {current.avatar}
                </div>
                <div>
                  <div className="testimonials__name">{current.name}</div>
                  <div className="testimonials__role">{current.role}</div>
                  <div className="testimonials__country">{current.country}</div>
                </div>
                <div className="testimonials__order-info">
                  <div className="testimonials__order-label">Order</div>
                  <div className="testimonials__order-value">{current.order}</div>
                  <div className="testimonials__since">{current.since}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar — other testimonials */}
          <div className="testimonials__sidebar">
            {testimonials.filter((_, i) => i !== active).slice(0, 2).map((t) => (
              <button
                key={t.id}
                className="testimonials__mini-card"
                onClick={() => { clearInterval(autoRef.current); setActive(testimonials.indexOf(t)) }}
              >
                <div className="avatar" style={{ background: `${t.color}20`, borderColor: `${t.color}33`, color: t.color, width: 36, height: 36, fontSize: '0.75rem' }}>
                  {t.avatar}
                </div>
                <div className="testimonials__mini-info">
                  <div className="testimonials__mini-name">{t.name}</div>
                  <p className="testimonials__mini-text">"{t.text.substring(0, 80)}..."</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className={cn('testimonials__controls reveal', inView && 'is-visible')} style={{ transitionDelay: '0.3s' }}>
          <button className="btn-icon" onClick={prev} aria-label="Previous">
            <ChevronLeft size={18} />
          </button>

          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === active ? 'testimonials__dot--active' : ''}`}
                onClick={() => { clearInterval(autoRef.current); setActive(i) }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button className="btn-icon" onClick={next} aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
