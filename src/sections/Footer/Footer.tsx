import { Instagram, Linkedin, Twitter, Youtube, ArrowUpRight } from 'lucide-react'
import './Footer.css'

const footerLinks = {
  Services: [
    'Bulk T-Shirt Manufacturing',
    'Custom Printing',
    'Embroidery',
    'Corporate Uniforms',
    'Activewear',
    'Streetwear',
  ],
  Company: [
    'About ASNA',
    'Our Factory',
    'Certifications',
    'Sustainability',
    'Careers',
    'Press Kit',
  ],
  Export: [
    'USA & Canada',
    'Europe',
    'Middle East',
    'Asia Pacific',
    'Export Terms',
    'Shipping Info',
  ],
}

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter/X', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-main">ASNA</span>
                <span className="footer__logo-sub">GARMENTS</span>
              </div>
              <p className="footer__tagline">
                Manufacturing Premium Apparel at Scale. Your trusted wholesale textile manufacturing partner since 2008.
              </p>
              <div className="footer__address">
                <p>Plot 45, Industrial Estate,</p>
                <p>Tirupur — 641 607</p>
                <p>Tamil Nadu, India</p>
              </div>
              <div className="footer__socials">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="footer__social" aria-label={s.label}>
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading} className="footer__link-col">
                <h4 className="footer__col-heading">{heading}</h4>
                <ul className="footer__links">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer__link">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div className="footer__contact-col">
              <h4 className="footer__col-heading">Get in Touch</h4>
              <div className="footer__contact-items">
                <div className="footer__contact-item">
                  <span className="footer__contact-type">Sales</span>
                  <a href="mailto:sales@asnagarments.com" className="footer__contact-val">
                    sales@asnagarments.com
                  </a>
                </div>
                <div className="footer__contact-item">
                  <span className="footer__contact-type">WhatsApp</span>
                  <a href="https://wa.me/919876543210" className="footer__contact-val">
                    +91 98765 43210
                  </a>
                </div>
                <div className="footer__contact-item">
                  <span className="footer__contact-type">Office</span>
                  <span className="footer__contact-val">+91 421 234 5678</span>
                </div>
              </div>
              <a href="#cta" className="btn btn-outline-blue btn-sm footer__quote-btn"
                onClick={(e) => { e.preventDefault(); document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' }) }}>
                Request Quote
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__copy">
              © {new Date().getFullYear()} ASNA Garments. All rights reserved.
            </p>
            <div className="footer__bottom-links">
              <a href="#" className="footer__bottom-link">Privacy Policy</a>
              <span className="footer__bottom-sep">·</span>
              <a href="#" className="footer__bottom-link">Terms of Service</a>
              <span className="footer__bottom-sep">·</span>
              <a href="#" className="footer__bottom-link">Cookie Policy</a>
            </div>
            <div className="footer__made">
              <span className="footer__made-text">Made in India</span>
              <span className="footer__flag">🇮🇳</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
