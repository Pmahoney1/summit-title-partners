import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import '../styles/navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">▲</div>
          <span>Summit Title Partners</span>
        </Link>

        <div className="navbar__links">
          <a href="/#services">Services</a>
          <a href="/#locations">Locations</a>
          <a href="/#how-it-works">How It Works</a>
          <Link to="/contact" className="btn-primary">Free Consultation</Link>
        </div>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <a href="/#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="/#locations" onClick={() => setMenuOpen(false)}>Locations</a>
            <a href="/#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
            <Link to="/contact" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ alignSelf: 'flex-start' }}>Free Consultation</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
