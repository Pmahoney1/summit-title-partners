import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import ScrollReveal from './ScrollReveal'
import '../styles/sections.css'

const cities = [
  { name: 'Oklahoma City', slug: 'oklahoma-city', desc: 'Metro & surrounding counties' },
  { name: 'Tulsa', slug: 'tulsa', desc: 'Green Country region' },
  { name: 'Norman', slug: 'norman', desc: 'Cleveland County & south metro' }
]

export default function LocationCards() {
  return (
    <section className="locations-section" id="locations">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">We Serve All of Oklahoma</span>
          <h2>Local expertise where you need it</h2>
        </ScrollReveal>
        <div className="locations-grid">
          {cities.map((city, i) => (
            <ScrollReveal key={city.slug} delay={i * 0.1}>
              <Link to={`/${city.slug}`}>
                <motion.div
                  className="location-card"
                  whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <h3>{city.name}</h3>
                  <p>{city.desc}</p>
                  <span className="location-card__arrow">&rarr;</span>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
