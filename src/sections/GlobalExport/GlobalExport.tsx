import { useInView } from 'react-intersection-observer'
import { cn } from '../../utils/cn'

import './GlobalExport.css'

const regions = [
  { name: 'North America', countries: ['USA', 'Canada', 'Mexico'], volume: '35%', color: '#00F0FF' },
  { name: 'Europe', countries: ['UK', 'Germany', 'France', 'Italy', 'Spain'], volume: '28%', color: '#8B5CF6' },
  { name: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar'], volume: '18%', color: '#C9A84C' },
  { name: 'Asia Pacific', countries: ['Australia', 'Japan', 'Singapore', 'Korea'], volume: '12%', color: '#DC143C' },
  { name: 'Rest of World', countries: ['South Africa', 'Brazil', 'Others'], volume: '7%', color: '#00F0FF' },
]

const exportStats = [
  { label: 'Countries Served', value: '50+' },
  { label: 'Annual Export Value', value: '$12M+' },
  { label: 'Avg Transit Time', value: '18 days' },
  { label: 'Export Terms', value: 'FOB / CIF / EXW' },
]

/* SVG World Map Simplified */
const WorldMapSVG = () => (
  <svg viewBox="0 0 960 480" className="export__map-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(0, 240, 255, 0.1)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>

    {/* Background grid */}
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
    </pattern>
    <rect width="960" height="480" fill="url(#grid)" />

    {/* Simplified continent shapes */}
    {/* North America */}
    <path d="M 120 80 L 200 60 L 280 70 L 300 120 L 280 180 L 240 220 L 200 250 L 160 230 L 130 200 L 100 150 Z"
      fill="rgba(0, 240, 255, 0.06)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" />
    {/* South America */}
    <path d="M 200 260 L 260 250 L 280 300 L 260 380 L 220 420 L 180 400 L 170 350 L 180 300 Z"
      fill="rgba(0, 240, 255, 0.04)" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="1" />
    {/* Europe */}
    <path d="M 430 60 L 510 50 L 540 80 L 530 120 L 490 140 L 450 130 L 430 100 Z"
      fill="rgba(139, 92, 246, 0.08)" stroke="rgba(139, 92, 246, 0.25)" strokeWidth="1" />
    {/* Africa */}
    <path d="M 450 140 L 530 130 L 560 180 L 550 280 L 510 340 L 470 350 L 440 310 L 430 240 L 440 180 Z"
      fill="rgba(201, 168, 76, 0.05)" stroke="rgba(201, 168, 76, 0.15)" strokeWidth="1" />
    {/* Middle East */}
    <path d="M 540 110 L 610 100 L 640 130 L 630 170 L 590 180 L 550 160 Z"
      fill="rgba(201, 168, 76, 0.08)" stroke="rgba(201, 168, 76, 0.25)" strokeWidth="1" />
    {/* Asia */}
    <path d="M 600 50 L 760 40 L 820 80 L 840 140 L 800 180 L 740 200 L 680 190 L 630 160 L 610 120 L 600 80 Z"
      fill="rgba(220, 20, 60, 0.05)" stroke="rgba(220, 20, 60, 0.15)" strokeWidth="1" />
    {/* India */}
    <path d="M 650 150 L 700 140 L 720 180 L 700 240 L 670 260 L 645 230 L 640 190 Z"
      fill="rgba(0, 240, 255, 0.15)" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1.5" />
    {/* Glow on India — our factory */}
    <circle cx="668" cy="195" r="8" fill="rgba(0, 240, 255, 0.4)" />
    <circle cx="668" cy="195" r="16" fill="rgba(0, 240, 255, 0.1)" />
    <circle cx="668" cy="195" r="4" fill="#00F0FF" />
    {/* Australia */}
    <path d="M 760 270 L 840 260 L 870 300 L 860 350 L 810 370 L 760 350 L 740 310 Z"
      fill="rgba(0, 240, 255, 0.04)" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="1" />

    {/* Export route lines from India */}
    {[
      { x1: 668, y1: 195, x2: 200, y2: 170, color: '#00F0FF' },   // To North America
      { x1: 668, y1: 195, x2: 470, y2: 90, color: '#8B5CF6' },    // To Europe
      { x1: 668, y1: 195, x2: 590, y2: 135, color: '#C9A84C' },   // To Middle East
      { x1: 668, y1: 195, x2: 800, y2: 310, color: '#00F0FF' },   // To Australia
      { x1: 668, y1: 195, x2: 760, y2: 120, color: '#DC143C' },   // To East Asia
    ].map((line, i) => (
      <g key={i}>
        <line
          x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
          stroke={line.color} strokeWidth="1" strokeOpacity="0.2"
          strokeDasharray="6 4"
        />
        {/* Animated travel dot */}
        <circle r="3" fill={line.color} opacity="0.8">
          <animateMotion
            dur={`${3 + i * 0.7}s`}
            repeatCount="indefinite"
            begin={`${i * 0.8}s`}
          >
            <mpath href={`#route${i}`} />
          </animateMotion>
        </circle>
        <path id={`route${i}`} d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`} fill="none" />
        {/* Destination dot */}
        <circle cx={line.x2} cy={line.y2} r="4" fill={line.color} opacity="0.6">
          <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`}/>
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`}/>
        </circle>
        <circle cx={line.x2} cy={line.y2} r="2.5" fill={line.color} />
      </g>
    ))}

    {/* Factory label */}
    <text x="690" y="200" fill="#00F0FF" fontSize="8" fontFamily="monospace" opacity="0.7">TIRUPUR, INDIA</text>
  </svg>
)

export const GlobalExport = () => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section className="global-export section" ref={ref}>
      <div className="ambient-blob ambient-blob-blue" style={{ width: 600, height: 600, top: 0, left: '30%' }} />

      <div className="container">
        <div className={cn('section-header stagger-children', inView && 'is-visible')}>
          <div className="section-label">Global Reach</div>
          <h2 className="text-h1">
            Shipping to<br />
            <span className="text-gradient">50+ countries</span>
          </h2>
          <p className="text-body-lg text-secondary" style={{ marginTop: '1rem' }}>
            From our Tirupur factory to fashion capitals worldwide
          </p>
        </div>

        {/* Map */}
        <div className={cn('export__map-wrap reveal-scale', inView && 'is-visible')} style={{ transitionDelay: '0.2s' }}>
          <WorldMapSVG />
        </div>

        {/* Stats */}
        <div className="export__stats-row">
          {exportStats.map((s, i) => (
            <div
              key={s.label}
              className={cn('export__stat reveal', inView && 'is-visible')}
              style={{ transitionDelay: `${0.3 + i * 0.08}s` }}
            >
              <div className="export__stat-value">{s.value}</div>
              <div className="export__stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Regions */}
        <div className="export__regions">
          {regions.map((region, i) => (
            <div
              key={region.name}
              className={cn('export__region reveal', inView && 'is-visible')}
              style={{ transitionDelay: `${0.4 + i * 0.07}s` }}
            >
              <div className="export__region-header">
                <span className="export__region-name">{region.name}</span>
                <span className="export__region-vol" style={{ color: region.color }}>{region.volume}</span>
              </div>
              <div className="export__region-bar-track">
                <div
                  className="export__region-bar"
                  style={{
                    width: inView ? region.volume : '0%',
                    background: region.color,
                    boxShadow: `0 0 8px ${region.color}44`,
                  }}
                />
              </div>
              <div className="export__region-countries">
                {region.countries.map((c) => (
                  <span key={c} className="export__country">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
