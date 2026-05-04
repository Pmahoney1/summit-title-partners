import { useState } from 'react'
import { motion } from 'motion/react'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  function validate(form) {
    const errs = {}
    if (!form.get('name')?.trim()) errs.name = 'Name is required'
    const email = form.get('email')?.trim()
    if (!email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email'
    if (!form.get('phone')?.trim()) errs.phone = 'Phone is required'
    if (!form.get('address')?.trim()) errs.address = 'Property address is required'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        body: form,
        headers: { Accept: 'application/json' }
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        className="contact-form__success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h3>Thank you</h3>
        <p>We've received your message and will call you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__field">
        <label htmlFor="name">Full Name *</label>
        <input type="text" id="name" name="name" placeholder="Your full name" />
        {errors.name && <span className="contact-form__error">{errors.name}</span>}
      </div>
      <div className="contact-form__field">
        <label htmlFor="email">Email *</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" />
        {errors.email && <span className="contact-form__error">{errors.email}</span>}
      </div>
      <div className="contact-form__field">
        <label htmlFor="phone">Phone *</label>
        <input type="tel" id="phone" name="phone" placeholder="(405) 555-0199" />
        {errors.phone && <span className="contact-form__error">{errors.phone}</span>}
      </div>
      <div className="contact-form__field">
        <label htmlFor="address">Property Address *</label>
        <input type="text" id="address" name="address" placeholder="123 Main St, Oklahoma City, OK" />
        {errors.address && <span className="contact-form__error">{errors.address}</span>}
      </div>
      <div className="contact-form__field">
        <label htmlFor="message">Tell us about your situation</label>
        <textarea id="message" name="message" rows="4" placeholder="What's going on with the property? (optional)"></textarea>
      </div>
      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && <p className="contact-form__error" style={{ marginTop: 12 }}>Something went wrong. Please try again or email us directly.</p>}
    </form>
  )
}
