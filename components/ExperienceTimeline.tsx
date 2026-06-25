'use client'

import { motion } from 'framer-motion'
import type { WorkExperience } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return date
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ExperienceTimeline({ items }: { items: WorkExperience[] }) {
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-400">No work experience available.</p>
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600 via-pink-600 to-transparent" />
      <div className="space-y-10">
        {items.map((item, index) => {
          const company = getMetafieldValue(item.metadata?.company) || item.title
          const role = getMetafieldValue(item.metadata?.role)
          const desc = getMetafieldValue(item.metadata?.description)
          const start = getMetafieldValue(item.metadata?.start_date)
          const end = getMetafieldValue(item.metadata?.end_date)
          const current = item.metadata?.current
          const accent = getMetafieldValue(item.metadata?.accent_color) || '#a855f7'
          const isLeft = index % 2 === 0

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className={`relative pl-12 md:pl-0 md:w-1/2 ${
                isLeft ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
              }`}
            >
              <div
                className="absolute left-4 md:left-auto top-2 w-3 h-3 rounded-full ring-4 ring-background"
                style={{
                  backgroundColor: accent,
                  [isLeft ? 'right' : 'left']: '-6px',
                  marginLeft: isLeft ? undefined : '-6px',
                }}
              />
              <div className="glass rounded-2xl p-6">
                <span className="text-xs text-gray-400">
                  {formatDate(start)} — {current ? 'Present' : formatDate(end)}
                </span>
                <h3 className="font-display text-lg font-bold text-white mt-1">{role}</h3>
                <p className="text-sm font-medium" style={{ color: accent }}>{company}</p>
                {desc && <p className="text-gray-400 text-sm mt-2">{desc}</p>}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}