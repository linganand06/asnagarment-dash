import { useInView } from 'react-intersection-observer'
import { cn } from '../../utils/cn'
import { useCounter } from '../../hooks/useCounter'
import './Factory.css'

const capabilities = [
  { label: 'Production Capacity', value: 50000, suffix: ' units/day', format: true },
  { label: 'Facility Area', value: 50000, suffix: ' sq ft', format: true },
  { label: 'Expert Workforce', value: 500, suffix: '+', format: false },
  { label: 'Production Lines', value: 24, suffix: '', format: false },
  { label: 'Machine Count', value: 200, suffix: '+', format: false },
  { label: 'Annual Output', value: 10, suffix: 'M+', format: false },
]

const certifications = [
  'ISO 9001:2015', 'GOTS Certified', 'OEKO-TEX 100',
  'BSCI Audited', 'SA8000', 'Sedex SMETA',
]

const departments = [
  { name: 'Cutting Dept', machines: 12, workers: 80, note: 'Auto-spreading, CAD cutting' },
  { name: 'Stitching Dept', machines: 120, workers: 280, note: 'Flatlock, overlock, single & double needle' },
  { name: 'Printing Dept', machines: 20, workers: 60, note: 'DTG, screen, embroidery, sublimation' },
  { name: 'Finishing Dept', machines: 30, workers: 70, note: 'QC, folding, tagging, packing' },
  { name: 'QC Lab', machines: 15, workers: 30, note: 'Washfastness, shrinkage, tensile strength testing' },
  { name: 'Dispatch Hub', machines: 5, workers: 20, note: 'Export carton packing, container stuffing' },
]

const CapabilityCounter = ({ cap, trigger }: { cap: typeof capabilities[0]; trigger: boolean }) => {
  const { formatted } = useCounter({
    end: cap.value,
    suffix: cap.suffix,
    duration: 2400,
    trigger,
  })

  return (
    <div className="factory__cap-item">
      <div className="factory__cap-value">{cap.format ? formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : formatted}</div>
      <div className="factory__cap-label">{cap.label}</div>
    </div>
  )
}

export const Factory = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [capsRef, capsInView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section id="factory" className="factory section" ref={ref}>
      <div className="ambient-blob ambient-blob-crimson" style={{ width: 400, height: 400, top: '20%', right: '-80px' }} />

      <div className="container">
        {/* Header */}
        <div className={cn('section-header stagger-children', inView && 'is-visible')}>
          <div className="section-label">Factory Capabilities</div>
          <h2 className="text-h1">
            Industrial scale,<br />
            <span className="text-gradient">artisan precision</span>
          </h2>
          <p className="text-body-lg text-secondary" style={{ marginTop: '1rem' }}>
            Our Tirupur facility runs 3 shifts, 300+ days a year — built for your scale
          </p>
        </div>

        {/* Capability counters */}
        <div className="factory__caps" ref={capsRef}>
          {capabilities.map((cap, i) => (
            <div
              key={cap.label}
              className={cn('reveal', inView && 'is-visible')}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <CapabilityCounter cap={cap} trigger={capsInView} />
            </div>
          ))}
        </div>

        {/* Departments */}
        <div className="factory__departments">
          <h3 className={cn('text-h3 factory__dept-heading reveal', inView && 'is-visible')} style={{ transitionDelay: '0.3s' }}>
            Department Overview
          </h3>
          <div className="factory__dept-grid">
            {departments.map((dept, i) => (
              <div
                key={dept.name}
                className={cn('factory__dept-card card reveal', inView && 'is-visible')}
                style={{ transitionDelay: `${0.35 + i * 0.08}s` }}
              >
                <div className="factory__dept-header">
                  <h4 className="factory__dept-name">{dept.name}</h4>
                  <div className="badge badge-blue">{dept.machines} machines</div>
                </div>
                <div className="factory__dept-workers">
                  <span className="factory__dept-num">{dept.workers}</span>
                  <span className="factory__dept-worker-label">workers</span>
                </div>
                <p className="factory__dept-note">{dept.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className={cn('factory__certs reveal', inView && 'is-visible')} style={{ transitionDelay: '0.6s' }}>
          <h4 className="factory__certs-heading">Certifications & Compliance</h4>
          <div className="factory__certs-list">
            {certifications.map((cert) => (
              <div key={cert} className="factory__cert-badge">
                <span className="factory__cert-icon">✓</span>
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
