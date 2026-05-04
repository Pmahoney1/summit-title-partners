import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export default function ParallaxImage({ src, alt, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div ref={ref} className={`parallax-wrap ${className}`} style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, width: '100%', height: '120%', objectFit: 'cover' }}
      />
    </div>
  )
}
