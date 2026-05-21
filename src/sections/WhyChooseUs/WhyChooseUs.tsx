import { useInView } from 'react-intersection-observer'
import { cn } from '../../utils/cn'
import { Shield, Clock, Globe, Leaf, Zap, Award, Users, Package } from 'lucide-react'
import { useCounter } from '../../hooks/useCounter'
import './WhyChooseUs.css'

const features = [
  {
    icon: Shield,
    title: 'ISO 9001:2015 Certified',
    desc: 'International quality management standards ensuring consistency in every production run.',
    color: 'blue',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    desc: 'Industry-leading 12–20 day production cycles without compromising on quality.',
    color: 'purple',
  },
  {
    icon: Globe,
    title: '50+ Export Markets',
    desc: 'Proven export experience to USA, Europe, Middle East, Australia, and Southeast Asia.',
    color: 'blue',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    desc: 'GOTS and OEKO-TEX certified. Water-based inks, zero-discharge facility, solar-powered.',
    color: 'purple',
  },
  {
    icon: Zap,
    title: 'All-in-One Capability',
    desc: 'Design, sourcing, manufacturing, printing, packaging, and export — one partner, end-to-end.',
    color: 'blue',
  },
  {
    icon: Award,
    title: 'Private Label Ready',
    desc: 'Full white-label manufacturing with custom woven labels, hang tags, and brand packaging.',
    color: 'purple',
  },
  {
    icon: Users,
    title: 'Dedicated Account Team',
    desc: 'Assigned production manager and QC officer for every order. 24/7 WhatsApp support.',
    color: 'blue',
  },
  {
    icon: Package,
    title: 'Low MOQ Options',
    desc: 'Start manufacturing from just 100 pieces per style. Perfect for emerging brands.',
    color: 'purple',
  },
]

const stats = [
  { value: 10, suffix: 'M+', label: 'Garments Produced' },
  { value: 99.8, decimals: 1, suffix: '%', label: 'On-time Delivery' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Countries Exported' },
]

const StatCard = ({ stat, trigger }: { stat: typeof stats[0]; trigger: boolean }) => {
  const { formatted } = useCounter({
    end: stat.value,
    decimals: stat.decimals ?? 0,
    suffix: stat.suffix,
    duration: 2200,
    trigger,
  })

  return (
    <div className="card-stat why__stat">
      <div className="counter-value">{formatted}</div>
      <div className="why__stat-label">{stat.label}</div>
    </div>
  )
}

export const WhyChooseUs = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section id="why" className="why section" ref={ref}>
      <div className="ambient-blob ambient-blob-purple" style={{ width: 500, height: 500, top: '10%', right: '-100px' }} />
      <div className="ambient-blob ambient-blob-blue" style={{ width: 400, height: 400, bottom: '10%', left: '-80px' }} />

      <div className="container">
        {/* Header */}
        <div className={cn('section-header stagger-children', inView && 'is-visible')}>
          <div className="section-label">Why Choose ASNA</div>
          <h2 className="text-h1">
            The manufacturing<br />
            <span className="text-gradient">partner you deserve</span>
          </h2>
        </div>

        {/* Feature grid */}
        <div className="why__features">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Stats row */}
        <div className="why__stats-row" ref={statsRef}>
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} trigger={statsInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({ feature, index, inView }: {
  feature: typeof features[0]
  index: number
  inView: boolean
}) => {
  const Icon = feature.icon
  const isBlue = feature.color === 'blue'

  return (
    <div
      className={cn('card-glass why__feature-card animated-border', 'reveal', inView && 'is-visible')}
      style={{ transitionDelay: `${index * 0.06}s` }}
    >
      <div className={`icon-wrap icon-wrap-lg ${isBlue ? 'icon-wrap--blue' : 'icon-wrap--purple'}`} style={{ marginBottom: 'var(--space-5)' }}>
        <Icon size={26} />
      </div>
      <h3 className="why__card-title">{feature.title}</h3>
      <p className="why__card-desc">{feature.desc}</p>
    </div>
  )
}
