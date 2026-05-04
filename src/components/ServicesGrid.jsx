import { motion } from 'motion/react'
import ScrollReveal from './ScrollReveal'
import '../styles/sections.css'

const services = [
  { icon: '🔗', title: 'Clouded Deeds', desc: 'Ownership disputes, recording errors, breaks in the chain of title.' },
  { icon: '⚖️', title: 'Probate Issues', desc: 'Inherited property stuck in probate — we navigate the court process.' },
  { icon: '👥', title: 'Missing Heirs', desc: 'Heir searches, affidavits of heirship, multi-party coordination.' },
  { icon: '📋', title: 'Tax Liens', desc: 'Delinquent taxes, lien negotiations, redemption period guidance.' }
]

export default function ServicesGrid() {
  return (
    <section className="services" id="services">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">What We Solve</span>
          <h2>Title problems are our specialty</h2>
        </ScrollReveal>
        <div className="services__grid">
          {services.map((svc, i) => (
            <ScrollReveal key={svc.title} delay={i * 0.1}>
              <motion.div
                className="services__card"
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                transition={{ duration: 0.2 }}
              >
                <span className="services__icon">{svc.icon}</span>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
