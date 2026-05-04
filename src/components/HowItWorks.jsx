import ScrollReveal from './ScrollReveal'
import '../styles/sections.css'

const steps = [
  { num: 1, title: 'Tell Us Your Situation', desc: "Free call. No paperwork. We listen and assess what's tangled." },
  { num: 2, title: 'We Clear the Title', desc: 'We handle probate, liens, deeds, and missing heir searches — all of it.' },
  { num: 3, title: 'You Decide What\'s Next', desc: 'Keep it, sell it, transfer it. Clean title in hand — your choice.' }
]

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">How It Works</span>
          <h2>Three steps to a clear title</h2>
        </ScrollReveal>
        <div className="how-it-works__grid">
          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.15}>
              <div className="how-it-works__card">
                <div className="how-it-works__num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
