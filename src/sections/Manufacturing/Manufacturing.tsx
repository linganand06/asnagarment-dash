import { useInView } from 'react-intersection-observer'
import { cn } from '../../utils/cn'
import { Scissors, Palette, Package, Truck, CheckCircle, Ruler, Search, Zap } from 'lucide-react'
import './Manufacturing.css'

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Design Consultation',
    desc: 'Our design team works closely with you to understand your vision, requirements, and brand identity. We provide technical feasibility analysis and material recommendations.',
    color: 'blue',
  },
  {
    num: '02',
    icon: Palette,
    title: 'Material Sourcing',
    desc: 'Premium fabrics sourced from certified mills — organic cotton, recycled polyester, performance blends. All materials comply with OEKO-TEX standards.',
    color: 'purple',
  },
  {
    num: '03',
    icon: Ruler,
    title: 'Pattern Making',
    desc: 'CAD-assisted precision pattern making ensures consistent sizing across all units. Sample approval process before mass production begins.',
    color: 'blue',
  },
  {
    num: '04',
    icon: Scissors,
    title: 'Cutting & Stitching',
    desc: 'Automated fabric spreading and computer-guided cutting maximizes material efficiency. Skilled craftsmen on 200+ industrial machines for premium construction.',
    color: 'purple',
  },
  {
    num: '05',
    icon: Zap,
    title: 'Printing & Finishing',
    desc: 'DTG, screen printing, embroidery, sublimation — all under one roof. Premium finishing: washing, stone-washing, enzyme treatment as required.',
    color: 'blue',
  },
  {
    num: '06',
    icon: CheckCircle,
    title: 'Quality Control',
    desc: '100% AQL inspection at every stage. 4-point system fabric inspection, inline checks, and final audit before dispatch. Zero-defect commitment.',
    color: 'purple',
  },
  {
    num: '07',
    icon: Package,
    title: 'Packaging',
    desc: 'Custom folding, tagging, labeling, and packaging per buyer specifications. Retail-ready packaging available with private label branding.',
    color: 'blue',
  },
  {
    num: '08',
    icon: Truck,
    title: 'Export Logistics',
    desc: 'Door-to-door export management. FOB, CIF, EXW terms. Documentation: commercial invoice, packing list, certificate of origin, GSP form A.',
    color: 'purple',
  },
]

export const Manufacturing = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="process" className="manufacturing section" ref={ref}>
      <div className="ambient-blob ambient-blob-blue" style={{ width: 600, height: 600, bottom: '-100px', left: '-150px' }} />

      <div className="container">
        <div className={cn('section-header', 'stagger-children', inView && 'is-visible')}>
          <div className="section-label">Manufacturing Process</div>
          <h2 className="text-h1">
            From concept to<br />
            <span className="text-gradient">container</span>
          </h2>
          <p className="text-body-lg text-secondary" style={{ marginTop: '1.5rem' }}>
            A vertically integrated 8-step process ensuring premium quality at every stage
          </p>
        </div>

        <div className="manufacturing__grid">
          {steps.map((step, i) => (
            <ProcessCard
              key={step.num}
              step={step}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const ProcessCard = ({ step, index, inView }: {
  step: typeof steps[0]
  index: number
  inView: boolean
}) => {
  const Icon = step.icon
  const isBlue = step.color === 'blue'

  return (
    <div
      className={cn('card-process manufacturing__card', 'animated-border', 'reveal', inView && 'is-visible')}
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <div className="manufacturing__card-header">
        <div className="step-number">{step.num}</div>
        <div className={`icon-wrap ${isBlue ? 'icon-wrap--blue' : 'icon-wrap--purple'}`}>
          <Icon size={22} />
        </div>
      </div>
      <h3 className="manufacturing__card-title">{step.title}</h3>
      <p className="manufacturing__card-desc">{step.desc}</p>
      <div className={`manufacturing__card-accent ${isBlue ? 'manufacturing__card-accent--blue' : 'manufacturing__card-accent--purple'}`} />
    </div>
  )
}
