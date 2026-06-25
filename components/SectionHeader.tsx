'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export default function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-14"
    >
      {eyebrow && (
        <span className="inline-block glass px-4 py-1.5 rounded-full text-sm text-gray-300 mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="text-gray-400">{subtitle}</p>}
    </motion.div>
  )
}