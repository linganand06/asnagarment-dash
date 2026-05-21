import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '../../utils/cn'
import { useTilt } from '../../hooks/useTilt'
import './Products.css'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    id: 'oversized-tee',
    name: 'Oversized T-Shirts',
    category: 'Streetwear',
    moq: '100 pcs',
    lead: '12 days',
    fabrics: ['100% Cotton', 'Cotton-Poly', 'Bamboo'],
    color: '#00F0FF',
    bgGradient: 'linear-gradient(135deg, #001020, #002040)',
    shirtColor: '#1a1a2e',
    desc: 'Premium drop-shoulder construction with reinforced neck tape. Available in 300+ GSM weights.',
  },
  {
    id: 'polo',
    name: 'Polo Shirts',
    category: 'Corporate',
    moq: '150 pcs',
    lead: '14 days',
    fabrics: ['Pique Cotton', 'Performance', 'Merino'],
    color: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, #100820, #180C30)',
    shirtColor: '#2d1b69',
    desc: 'Classic two-button placket with ribbed collar. Corporate branding via embroidery or woven label.',
  },
  {
    id: 'hoodie',
    name: 'Hoodies & Sweatshirts',
    category: 'Premium',
    moq: '100 pcs',
    lead: '18 days',
    fabrics: ['French Terry', 'Fleece', 'Organic Cotton'],
    color: '#DC143C',
    bgGradient: 'linear-gradient(135deg, #1a0008, #2d000f)',
    shirtColor: '#4a0011',
    desc: 'Heavyweight premium fleece with kangaroo pocket and adjustable drawstring. Retail-quality finish.',
  },
  {
    id: 'uniform',
    name: 'Corporate Uniforms',
    category: 'B2B',
    moq: '200 pcs',
    lead: '20 days',
    fabrics: ['Poly-Cotton', 'Stretch Fabric', 'Anti-wrinkle'],
    color: '#C9A84C',
    bgGradient: 'linear-gradient(135deg, #0f0c00, #1a1400)',
    shirtColor: '#2a2000',
    desc: 'Complete uniform solutions — shirts, trousers, vests. Industry-specific variants for hospitality, healthcare, retail.',
  },
  {
    id: 'activewear',
    name: 'Activewear',
    category: 'Performance',
    moq: '150 pcs',
    lead: '15 days',
    fabrics: ['Dri-Fit', 'Compression', '4-way Stretch'],
    color: '#00F0FF',
    bgGradient: 'linear-gradient(135deg, #001520, #002030)',
    shirtColor: '#003040',
    desc: 'Moisture-wicking performance wear with sublimation printing capability. Gym, sports, yoga, cycling.',
  },
  {
    id: 'streetwear',
    name: 'Streetwear Collections',
    category: 'Fashion',
    moq: '100 pcs',
    lead: '16 days',
    fabrics: ['Heavyweight Cotton', 'Waffle', 'Slub'],
    color: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, #0a0514, #110824)',
    shirtColor: '#1e0b3d',
    desc: 'Trend-forward silhouettes with premium washed finishes. Limited-edition capsule collection ready.',
  },
]

const TShirtSVG = ({ shirtColor, accentColor }: { shirtColor: string; accentColor: string }) => (
  <svg viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="product-card__shirt-svg">
    <defs>
      <linearGradient id={`sg-${accentColor.replace('#','')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={accentColor} stopOpacity="0.2" />
        <stop offset="100%" stopColor={accentColor} stopOpacity="0.05" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    {/* T-Shirt Body */}
    <path
      d="M70 250 L70 100 L30 82 L48 42 L88 62 Q110 22 132 62 L172 42 L190 82 L150 100 L150 250 Z"
      fill={shirtColor}
      stroke={accentColor}
      strokeWidth="1"
      strokeOpacity="0.3"
    />
    {/* Fabric gradient overlay */}
    <path
      d="M70 250 L70 100 L30 82 L48 42 L88 62 Q110 22 132 62 L172 42 L190 82 L150 100 L150 250 Z"
      fill={`url(#sg-${accentColor.replace('#','')})`}
    />
    {/* Collar */}
    <path
      d="M88 62 Q110 88 132 62"
      fill="none"
      stroke={accentColor}
      strokeWidth="2"
      strokeOpacity="0.5"
      filter="url(#glow)"
    />
    {/* Seam lines */}
    <line x1="110" y1="80" x2="110" y2="250" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 6"/>
    {/* Bottom hem */}
    <line x1="70" y1="242" x2="150" y2="242" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.2"/>
  </svg>
)

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const tiltRef = useTilt({ maxTilt: 8, scale: 1.02 })

  return (
    <div
      className="product-card"
      style={{ background: product.bgGradient } as React.CSSProperties}
      ref={tiltRef as React.RefObject<HTMLDivElement>}
    >
      {/* Glow */}
      <div className="product-card__glow" style={{ background: product.color }} />

      {/* Category badge */}
      <div className="product-card__badge" style={{ borderColor: `${product.color}33`, color: product.color, background: `${product.color}10` }}>
        {product.category}
      </div>

      {/* Shirt visual */}
      <div className="product-card__visual">
        <TShirtSVG shirtColor={product.shirtColor} accentColor={product.color} />
      </div>

      {/* Info */}
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.desc}</p>

        <div className="product-card__fabrics">
          {product.fabrics.map((f) => (
            <span key={f} className="product-card__fabric">{f}</span>
          ))}
        </div>

        <div className="product-card__meta">
          <div className="product-card__meta-item">
            <span className="product-card__meta-label">MOQ</span>
            <span className="product-card__meta-value" style={{ color: product.color }}>{product.moq}</span>
          </div>
          <div className="product-card__meta-divider" />
          <div className="product-card__meta-item">
            <span className="product-card__meta-label">Lead Time</span>
            <span className="product-card__meta-value" style={{ color: product.color }}>{product.lead}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Products = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    const track = trackRef.current
    const container = containerRef.current
    if (!track || !container) return

    const totalScroll = track.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.2,
          end: `+=${totalScroll * 0.85}`,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="products" className="products" ref={ref}>
      <div className="products__header container" ref={ref as unknown as React.RefObject<HTMLDivElement>}>
        <div className={cn('stagger-children', inView && 'is-visible')}>
          <div className="section-label">Product Showcase</div>
          <h2 className="text-h1">
            Every style,<br />
            <span className="text-gradient">manufactured to perfection</span>
          </h2>
          <p className="text-body-lg text-secondary" style={{ marginTop: '1rem' }}>
            Drag to explore our complete product range
          </p>
        </div>
      </div>

      <div className="products__scroll-container" ref={containerRef}>
        <div className="products__track" ref={trackRef}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
