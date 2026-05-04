import { useEffect } from 'react'
import { motion } from 'motion/react'
import ScrollReveal from '../components/ScrollReveal'
import ContactForm from '../components/ContactForm'
import '../styles/contact.css'

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us | Summit Title Partners"
    document.querySelector('meta[name="description"]')?.setAttribute('content',
      'Get a free consultation about your inherited property title issues. Contact Summit Title Partners today.')
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <section className="contact-hero">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Get in Touch</span>
            <h1>Let's clear that title</h1>
            <p>Free consultation. No obligation. Tell us about your situation and we'll call you within 24 hours.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="contact-body">
        <div className="container contact-body__inner">
          <ScrollReveal className="contact-body__form">
            <ContactForm />
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="contact-body__info">
            <div className="contact-info-card">
              <h3>Contact Details</h3>
              <p><strong>Email:</strong> <a href="mailto:trent@summittitlepartners.com">trent@summittitlepartners.com</a></p>
              <p><strong>Web:</strong> summittitlepartners.com</p>
            </div>
            <div className="contact-info-card">
              <h3>What Happens Next</h3>
              <ol>
                <li>We review your message and property details</li>
                <li>We call you within 24 hours for a free assessment</li>
                <li>We explain your options — no pressure, no obligation</li>
              </ol>
            </div>
            <div className="contact-info-card">
              <h3>Areas We Serve</h3>
              <p>Oklahoma City &middot; Tulsa &middot; Norman and all of Oklahoma</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.main>
  )
}
