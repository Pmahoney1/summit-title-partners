import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LocationPage from './pages/LocationPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/oklahoma-city" element={<LocationPage city="oklahoma-city" />} />
          <Route path="/tulsa" element={<LocationPage city="tulsa" />} />
          <Route path="/norman" element={<LocationPage city="norman" />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
