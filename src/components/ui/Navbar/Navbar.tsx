import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Capabilities', href: '#factory' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#cta' },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#" className="navbar__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <span className="navbar__logo-main">ASNA</span>
          <span className="navbar__logo-sub">GARMENTS</span>
        </a>

        {/* Desktop Nav */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="navbar__actions">
          <a
            href="#cta"
            className="btn btn-primary btn-sm navbar__cta"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#cta') }}
          >
            Get Quote
          </a>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link, i) => (
            <li key={link.label} style={{ transitionDelay: `${i * 60}ms` }}>
              <a
                href={link.href}
                className="navbar__mobile-link"
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
              >
                <span className="navbar__mobile-num">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ transitionDelay: `${navLinks.length * 60}ms` }}>
            <a href="#cta" className="btn btn-primary btn-lg" style={{ marginTop: '1rem' }}
              onClick={(e) => { e.preventDefault(); handleLinkClick('#cta') }}>
              Get Quote →
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
