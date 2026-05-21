import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { cn } from '../../utils/cn'
import './PrintingTech.css'

const technologies = [
  {
    id: 'dtg',
    name: 'Direct-to-Garment',
    short: 'DTG',
    desc: 'Photo-realistic full-color prints directly onto fabric using water-based inks. Perfect for complex designs and small batches.',
    specs: ['Up to 1440 DPI resolution', 'Unlimited color gradients', 'Min order: 1 pc', 'Eco water-based inks', 'OEKO-TEX compliant'],
    best: 'Small runs, complex artwork, photo prints',
    color: '#00F0FF',
    icon: '⬛',
  },
  {
    id: 'screen',
    name: 'Screen Printing',
    short: 'SCREEN',
    desc: 'The industry gold standard for bulk orders. Vibrant, wash-resistant colors with exceptional durability and consistency across thousands of pieces.',
    specs: ['Up to 12 spot colors', 'Pantone color matching', 'Plastisol & discharge inks', 'Simulated process printing', 'High production speed'],
    best: 'Bulk orders, bold designs, brand merchandise',
    color: '#8B5CF6',
    icon: '🔲',
  },
  {
    id: 'embroidery',
    name: 'Embroidery',
    short: 'EMBROID',
    desc: 'Premium tactile branding using high-density thread work. Adds luxury texture and longevity that screen printing cannot match.',
    specs: ['Up to 15 thread colors', '3D puff embroidery available', 'Chenille & appliqué options', 'Corporate logo digitization', '1M+ stitch count capacity'],
    best: 'Corporate wear, luxury branding, caps, polos',
    color: '#C9A84C',
    icon: '🔶',
  },
  {
    id: 'heat',
    name: 'Heat Transfer',
    short: 'HTV',
    desc: 'Vinyl and digital heat transfer for specialty effects including metallic, glitter, and reflective finishes unavailable through other methods.',
    specs: ['Metallic & foil finishes', 'Reflective HTV', 'Flock & glitter options', 'Stretch-compatible', 'Quick turnaround'],
    best: 'Specialty effects, small logos, sportswear',
    color: '#DC143C',
    icon: '🔴',
  },
  {
    id: 'sublimation',
    name: 'Sublimation',
    short: 'SUBLI',
    desc: 'Dye sublimation for all-over print designs. Ink becomes part of the fabric — no feel, no fade, infinite color range on polyester.',
    specs: ['360° all-over print', 'Photographic quality', 'No hand feel', 'Permanent & wash-fast', 'Synthetic fabrics only'],
    best: 'Sportswear, performance wear, all-over prints',
    color: '#00F0FF',
    icon: '🔷',
  },
  {
    id: 'discharge',
    name: 'Discharge Printing',
    short: 'DISCH',
    desc: 'Removes dye from colored fabrics to create soft-hand prints. Produces vintage and worn-in aesthetics prized in premium streetwear.',
    specs: ['Vintage/worn look', 'Super soft hand feel', 'Works on colored shirts', 'Eco-reactive inks', 'Ideal for overwashed styles'],
    best: 'Premium streetwear, vintage aesthetics',
    color: '#8B5CF6',
    icon: '🔮',
  },
]

export const PrintingTech = () => {
  const [active, setActive] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const tech = technologies[active]

  return (
    <section id="printing" className="printing section" ref={ref}>
      <div className="ambient-blob ambient-blob-blue" style={{ width: 600, height: 600, top: '-100px', right: '-100px' }} />

      <div className="container">
        <div className={cn('section-header stagger-children', inView && 'is-visible')}>
          <div className="section-label">Printing Technologies</div>
          <h2 className="text-h1">
            Six ways to<br />
            <span className="text-gradient">brand your vision</span>
          </h2>
        </div>

        <div className="printing__layout">
          {/* Tab list */}
          <div className="printing__tabs">
            {technologies.map((t, i) => (
              <button
                key={t.id}
                className={cn('printing__tab', active === i && 'printing__tab--active')}
                onClick={() => setActive(i)}
                style={{ '--tab-color': t.color } as React.CSSProperties}
              >
                <span className="printing__tab-short">{t.short}</span>
                <span className="printing__tab-name">{t.name}</span>
                {active === i && <div className="printing__tab-indicator" style={{ background: t.color }} />}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="printing__panel" key={tech.id}>
            <div className="printing__panel-header">
              <div className="printing__panel-badge" style={{ color: tech.color, borderColor: `${tech.color}33`, background: `${tech.color}0D` }}>
                {tech.name}
              </div>
            </div>

            <p className="printing__panel-desc">{tech.desc}</p>

            <div className="printing__specs">
              <h4 className="printing__specs-title">Specifications</h4>
              <ul className="printing__specs-list">
                {tech.specs.map((spec) => (
                  <li key={spec} className="printing__spec-item">
                    <span className="printing__spec-dot" style={{ background: tech.color }} />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="printing__best">
              <span className="printing__best-label">Best for: </span>
              <span className="printing__best-value">{tech.best}</span>
            </div>

            {/* Visual bars */}
            <div className="printing__bars">
              {[
                { label: 'Color Range', val: tech.id === 'sublimation' ? 100 : tech.id === 'dtg' ? 98 : tech.id === 'screen' ? 85 : 70 },
                { label: 'Durability', val: tech.id === 'embroidery' ? 99 : tech.id === 'screen' ? 95 : tech.id === 'sublimation' ? 92 : 80 },
                { label: 'Cost Efficiency', val: tech.id === 'screen' ? 95 : tech.id === 'dtg' ? 60 : tech.id === 'heat' ? 75 : 70 },
              ].map((bar) => (
                <div key={bar.label} className="printing__bar-row">
                  <div className="printing__bar-label">{bar.label}</div>
                  <div className="printing__bar-track">
                    <div
                      className="printing__bar-fill"
                      style={{ width: `${bar.val}%`, background: tech.color, boxShadow: `0 0 10px ${tech.color}66` }}
                    />
                  </div>
                  <div className="printing__bar-val" style={{ color: tech.color }}>{bar.val}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
