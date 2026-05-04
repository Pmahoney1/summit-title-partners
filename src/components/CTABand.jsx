import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import '../styles/sections.css'

export default function CTABand({
  headline = "Ready to clear the title?",
  subtext = "Free consultation. No obligation to sell. We're here to help.",
  buttonText = "Schedule Your Free Call",
  buttonLink = "/contact"
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <ScrollReveal>
          <h2>{headline}</h2>
          <p>{subtext}</p>
          <Link to={buttonLink} className="btn-gold">{buttonText}</Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
