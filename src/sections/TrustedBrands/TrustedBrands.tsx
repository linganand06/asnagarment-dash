import { Marquee } from '../../components/ui/Marquee/Marquee'
import './TrustedBrands.css'

const brands = [
  'NIKE', 'ADIDAS', 'ZARA', 'H&M', 'UNIQLO',
  'TOMMY HILFIGER', 'CALVIN KLEIN', 'RALPH LAUREN',
  'GUCCI', 'PUMA', 'REEBOK', 'GAP',
]

const brands2 = [
  'LEVI\'S', 'VERSACE', 'ARMANI', 'BURBERRY',
  'LACOSTE', 'HUGO BOSS', 'DIESEL', 'STONE ISLAND',
  'PATAGONIA', 'COLUMBIA', 'CHAMPION', 'FILA',
]

export const TrustedBrands = () => {
  return (
    <section id="brands" className="trusted-brands section-sm">
      <div className="container">
        <p className="trusted-brands__label">Trusted by global fashion leaders</p>
      </div>

      <div className="trusted-brands__tracks">
        <Marquee speed={35} className="trusted-brands__track">
          {brands.map((brand) => (
            <div key={brand} className="trusted-brands__item">
              <span className="trusted-brands__name">{brand}</span>
              <span className="trusted-brands__sep" aria-hidden="true">✦</span>
            </div>
          ))}
        </Marquee>

        <Marquee speed={28} reverse className="trusted-brands__track">
          {brands2.map((brand) => (
            <div key={brand} className="trusted-brands__item">
              <span className="trusted-brands__name trusted-brands__name--dim">{brand}</span>
              <span className="trusted-brands__sep" aria-hidden="true">◆</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
