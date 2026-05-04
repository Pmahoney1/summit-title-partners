import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import ParallaxImage from '../components/ParallaxImage'
import TrustBar from '../components/TrustBar'
import HowItWorks from '../components/HowItWorks'
import ServicesGrid from '../components/ServicesGrid'
import TestimonialCarousel from '../components/TestimonialCarousel'
import LocationCards from '../components/LocationCards'
import FAQAccordion from '../components/FAQAccordion'
import CTABand from '../components/CTABand'
import { homepageFAQ } from '../data/faq'
import '../styles/hero.css'

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="eyebrow">Oklahoma's Title Problem Solvers</span>
            <h1>Inherited a house with title problems? We solve them — then you decide what's next.</h1>
            <p>Clouded deeds, missing heirs, probate delays, tax liens — we clear the title so you can sell, keep, or transfer the property on your terms.</p>
            <div className="hero__buttons">
              <Link to="/contact" className="btn-primary">Get a Free Consultation</Link>
              <a href="#how-it-works" className="btn-outline">How It Works</a>
            </div>
          </div>
          <div className="hero__image">
            <ParallaxImage src="/images/hero-oklahoma.svg" alt="Oklahoma plains at golden hour" />
          </div>
        </div>
      </section>

      <TrustBar />
      <HowItWorks />
      <ServicesGrid />
      <TestimonialCarousel />
      <LocationCards />
      <FAQAccordion items={homepageFAQ} />
      <CTABand />
    </motion.main>
  )
}
