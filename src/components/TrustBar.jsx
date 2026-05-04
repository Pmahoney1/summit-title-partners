import '../styles/sections.css'

const items = [
  'Licensed & Bonded',
  '100+ Titles Cleared',
  'Free Consultation',
  'No Obligation to Sell'
]

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="container trust-bar__inner">
        {items.map(item => (
          <span key={item} className="trust-bar__item">✓ {item}</span>
        ))}
      </div>
    </div>
  )
}
