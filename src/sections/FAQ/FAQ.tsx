import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Plus, Minus } from 'lucide-react'
import { cn } from '../../utils/cn'
import './FAQ.css'

const faqs = [
  {
    q: 'What is the minimum order quantity (MOQ)?',
    a: 'Our standard MOQ is 100 pieces per style per color. For corporate uniform programs with multiple SKUs, we can discuss flexible MOQ arrangements. Sample orders of 5–10 pieces are available for quality assessment before bulk production.',
  },
  {
    q: 'What is the typical lead time for production?',
    a: 'Standard lead time is 12–20 working days after sample approval and payment confirmation. This varies by order size, printing complexity, and current factory capacity. We offer priority production for urgent requirements at a 15% surcharge.',
  },
  {
    q: 'Do you offer samples before bulk production?',
    a: 'Yes. Pre-production samples are standard practice. We provide a salesman sample (SS) within 5–7 days, incorporating your design, chosen fabric, and specified construction. Bulk production commences only after written sample approval.',
  },
  {
    q: 'What payment terms do you accept?',
    a: 'Standard terms: 30% advance with purchase order, 70% before shipment. For established clients with 3+ successful orders, we offer NET 30 terms. We accept wire transfer (T/T), PayPal for samples, and LC at sight for large orders.',
  },
  {
    q: 'Which printing methods do you offer?',
    a: 'We offer: Direct-to-Garment (DTG), Screen Printing, Embroidery, Heat Transfer Vinyl (HTV), Sublimation, Discharge Printing, Puff Print, and Foil Print. Each method has specific fabric and design requirements — our team will recommend the best option for your artwork.',
  },
  {
    q: 'What fabric options are available?',
    a: 'We stock and source: 100% Combed Cotton (160–240 GSM), CVC (60/40 Cotton-Poly), Pique/Waffle, French Terry, Heavy Fleece, Performance Polyester, Organic Cotton (GOTS certified), Bamboo Blends, and Recycled Polyester. Custom fabric sourcing available.',
  },
  {
    q: 'Do you provide private label manufacturing?',
    a: 'Yes — full white-label and private label manufacturing is our specialty. We can produce: custom woven labels, sewn-in care labels, hangtags, tissue paper packing, custom poly bags, and export-ready retail packaging to your specifications.',
  },
  {
    q: 'What export documentation do you provide?',
    a: 'Standard export documentation: Commercial Invoice, Packing List, Bill of Lading/Airway Bill, Certificate of Origin (CoO), GSP Form A (for duty reduction in EU/UK), Phytosanitary Certificate (if required), Quality Inspection Certificate, and GOTS/OEKO-TEX certificates on request.',
  },
  {
    q: 'Which shipping terms (Incoterms) do you offer?',
    a: 'We work on FOB (Tirupur/Chennai/Cochin port), CIF (Cost Insurance Freight to your port), EXW (Ex-Works — buyer arranges shipping), and DDP (Delivered Duty Paid — we handle everything to your door). FOB Chennai is most common for our export clients.',
  },
  {
    q: 'How do you ensure quality control?',
    a: 'Our 5-stage QC process: (1) Pre-production fabric inspection using 4-point system, (2) In-line inspection at cutting & stitching, (3) Print quality check post-printing, (4) End-line AQL 2.5 inspection, (5) Final random audit before packing. We also facilitate third-party inspection (SGS, Bureau Veritas) on request.',
  },
]

const FAQItem = ({ faq, isOpen, onToggle }: {
  faq: typeof faqs[0]
  isOpen: boolean
  onToggle: () => void
}) => (
  <div className={cn('faq__item', isOpen && 'faq__item--open')}>
    <button className="faq__question" onClick={onToggle} aria-expanded={isOpen}>
      <span>{faq.q}</span>
      <div className="faq__icon">
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </div>
    </button>
    <div
      className="faq__answer-wrap"
      style={{ maxHeight: isOpen ? '400px' : '0' }}
    >
      <div className="faq__answer">
        <p>{faq.a}</p>
      </div>
    </div>
  </div>
)

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  const half = Math.ceil(faqs.length / 2)
  const col1 = faqs.slice(0, half)
  const col2 = faqs.slice(half)

  return (
    <section className="faq section" ref={ref}>
      <div className="container">
        <div className={cn('section-header stagger-children', inView && 'is-visible')}>
          <div className="section-label">Common Questions</div>
          <h2 className="text-h1">
            Frequently asked<br />
            <span className="text-gradient">questions</span>
          </h2>
        </div>

        <div className="faq__grid">
          <div className="faq__col">
            {col1.map((faq, i) => (
              <div
                key={i}
                className={cn('reveal', inView && 'is-visible')}
                style={{ transitionDelay: `${i * 0.07}s` }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              </div>
            ))}
          </div>

          <div className="faq__col">
            {col2.map((faq, i) => (
              <div
                key={i + half}
                className={cn('reveal', inView && 'is-visible')}
                style={{ transitionDelay: `${(i + half) * 0.07}s` }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openIndex === i + half}
                  onToggle={() => toggle(i + half)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
