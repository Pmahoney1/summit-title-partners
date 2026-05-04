import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import ScrollReveal from './ScrollReveal'
import '../styles/testimonials.css'

const defaultTestimonials = [
  {
    quote: "After Mom passed, we had no idea the deed had issues going back 20 years. Summit cleared everything in six weeks. We didn't even have to sell.",
    name: 'Sarah M.',
    location: 'Tulsa'
  },
  {
    quote: "I was overwhelmed dealing with Dad's estate and a clouded title. They walked me through every step and never once pressured me to sell.",
    name: 'James R.',
    location: 'Oklahoma City'
  },
  {
    quote: "Our probate attorney recommended Summit. They found two missing heirs, resolved the lien, and cleared the title in under two months.",
    name: 'Linda & Tom K.',
    location: 'Norman'
  }
]

export default function TestimonialCarousel({ testimonials = defaultTestimonials }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="testimonials">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">What Families Say</span>
          <h2>Trusted by Oklahoma families</h2>
        </ScrollReveal>
        <div className="testimonials__carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="testimonials__card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote>"{testimonials[current].quote}"</blockquote>
              <cite>— {testimonials[current].name}, {testimonials[current].location}</cite>
            </motion.div>
          </AnimatePresence>
          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
