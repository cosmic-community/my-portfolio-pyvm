'use client'

import { motion } from 'framer-motion'
import type { Education } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function EducationCard({ item, index = 0 }: { item: Education; index?: number }) {
  const course = getMetafieldValue(item.metadata?.course) || item.title
  const subject = getMetafieldValue(item.metadata?.subject)
  const institution = getMetafieldValue(item.metadata?.institution)
  const score = getMetafieldValue(item.metadata?.score)
  const yearRange = getMetafieldValue(item.metadata?.year_range)
  const accent = getMetafieldValue(item.metadata?.accent_color) || '#a855f7'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="glass rounded-3xl p-7 relative overflow-hidden"
    >
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-30"
        style={{ backgroundColor: accent }}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-bold text-white">{course}</h3>
          {subject && <p className="text-sm text-gray-400 mt-1">{subject}</p>}
          {institution && <p className="text-sm font-medium mt-2" style={{ color: accent }}>{institution}</p>}
        </div>
        {score && (
          <span
            className="text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: `${accent}22`, color: accent }}
          >
            {score}
          </span>
        )}
      </div>
      {yearRange && <p className="text-xs text-gray-500 mt-4">{yearRange}</p>}
    </motion.div>
  )
}