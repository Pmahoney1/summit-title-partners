import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import ScrollReveal from './ScrollReveal'
import '../styles/faq.css'

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="faq__item">
      <button className="faq__question" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <motion.span
          className="faq__icon"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="faq__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQAccordion({ items, title = 'Answers for heirs & families' }) {
  return (
    <section className="faq">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">Common Questions</span>
          <h2>{title}</h2>
        </ScrollReveal>
        <div className="faq__list">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FAQItem question={item.q} answer={item.a} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
