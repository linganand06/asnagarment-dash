import { useInView } from 'react-intersection-observer'
import { cn } from '../../utils/cn'
import './About.css'

const milestones = [
  { year: '2008', text: 'Founded in Tirupur, India\'s textile capital' },
  { year: '2012', text: 'First international export — 50,000 garments to UAE' },
  { year: '2016', text: 'Expanded to 50,000 sq ft state-of-the-art facility' },
  { year: '2019', text: 'ISO 9001:2015 certification achieved' },
  { year: '2022', text: 'Launched eco-friendly organic cotton line' },
  { year: '2024', text: '10 million+ garments produced across 50+ nations' },
]

export const About = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section id="about" className="about section" ref={ref}>
      {/* Ambient */}
      <div className="ambient-blob ambient-blob-purple" style={{ width: 500, height: 500, top: '20%', right: '-100px' }} />

      <div className="container">
        <div className="about__grid">
          {/* Left: Story */}
          <div className={cn('about__story', inView && 'is-visible')}>
            <div className="section-label">
              <span>Our Story</span>
            </div>

            <h2 className={cn('text-h1 reveal', inView && 'is-visible')}>
              Born from craft,<br />
              <span className="text-gradient">built for scale</span>
            </h2>

            <div className={cn('about__text-block reveal', inView && 'is-visible')} style={{ transitionDelay: '0.15s' }}>
              <p>
                ASNA Garments began as a vision — to bring international-grade manufacturing
                quality to the wholesale market. Founded in Tirupur, the heartbeat of India's
                textile industry, we grew from a 10-machine workshop to a 500+ workforce facility
                serving premium fashion brands across six continents.
              </p>
            </div>

            <div className={cn('about__text-block reveal', inView && 'is-visible')} style={{ transitionDelay: '0.25s' }}>
              <p>
                Every stitch we produce carries the weight of 15 years of craftsmanship, ISO-certified
                quality systems, and an unrelenting commitment to exceeding global standards. We don't
                just manufacture — we engineer fashion excellence at scale.
              </p>
            </div>

            <div className={cn('about__tags reveal', inView && 'is-visible')} style={{ transitionDelay: '0.35s' }}>
              <span className="badge badge-blue">ISO 9001:2015</span>
              <span className="badge badge-purple">Eco Certified</span>
              <span className="badge badge-blue">OEKO-TEX</span>
              <span className="badge badge-purple">GOTS Certified</span>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className="about__timeline">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={cn('about__milestone reveal-right', inView && 'is-visible')}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="about__milestone-year">{m.year}</div>
                <div className="about__milestone-line">
                  <div className="about__milestone-dot" />
                  <div className="about__milestone-bar" />
                </div>
                <div className="about__milestone-text">{m.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Large brand statement */}
        <div className={cn('about__statement reveal', inView && 'is-visible')} style={{ transitionDelay: '0.4s' }}>
          <p className="about__statement-text">
            "We manufacture the clothes the world wears."
          </p>
          <span className="about__statement-attr">— ASNA Garments Vision, 2008</span>
        </div>
      </div>
    </section>
  )
}
