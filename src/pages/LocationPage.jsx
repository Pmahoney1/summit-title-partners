import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { locations } from '../data/locations'
import { homepageFAQ } from '../data/faq'
import ScrollReveal from '../components/ScrollReveal'
import HowItWorks from '../components/HowItWorks'
import ServicesGrid from '../components/ServicesGrid'
import FAQAccordion from '../components/FAQAccordion'
import CTABand from '../components/CTABand'
import '../styles/hero.css'
import '../styles/testimonials.css'

export default function LocationPage({ city }) {
  const data = locations[city]
  const allFAQ = [...data.localFAQ, ...homepageFAQ.slice(0, 4)]

  useEffect(() => {
    document.title = data.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', data.meta.description)
    window.scrollTo(0, 0)
  }, [data])

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <section className="hero hero--location">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="eyebrow">Summit Title Partners — {data.name}</span>
            <h1>{data.headline}</h1>
            <p>{data.subheadline}</p>
            <p className="hero__desc">{data.description}</p>
            <Link to="/contact" className="btn-primary">Get a Free Consultation</Link>
          </div>
          <div className="hero__image">
            <img src={data.image} alt={data.imageAlt} style={{ borderRadius: 'var(--radius-lg)', width: '100%' }} />
          </div>
        </div>
      </section>

      <HowItWorks />
      <ServicesGrid />

      <section className="testimonials">
        <div className="container" style={{ textAlign: 'center' }}>
          <ScrollReveal>
            <span className="eyebrow">What Families Say</span>
            <h2>Trusted in {data.name}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="testimonials__card" style={{ maxWidth: 600, margin: '24px auto 0' }}>
              <blockquote>"{data.testimonial.quote}"</blockquote>
              <cite>— {data.testimonial.name}, {data.testimonial.location}</cite>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQAccordion items={allFAQ} title={`Common questions in ${data.name}`} />
      <CTABand />
    </motion.main>
  )
}
