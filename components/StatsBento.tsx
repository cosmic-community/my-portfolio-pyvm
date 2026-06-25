'use client'

import { motion } from 'framer-motion'
import type { Profile } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function StatsBento({ profile }: { profile: Profile | null }) {
  const years = profile?.metadata?.years_experience ?? 0
  const projects = profile?.metadata?.projects_completed ?? 0
  const location = getMetafieldValue(profile?.metadata?.location)
  const email = getMetafieldValue(profile?.metadata?.email)
  const phone = getMetafieldValue(profile?.metadata?.phone)
  const bio = getMetafieldValue(profile?.metadata?.bio)

  const tiles = [
    { label: 'Years Experience', value: `${years}+`, gradient: 'from-purple-600/20 to-transparent', span: 'md:col-span-1' },
    { label: 'Projects Completed', value: `${projects}+`, gradient: 'from-pink-600/20 to-transparent', span: 'md:col-span-1' },
  ]

  return (
    <section className="max-w-7xl mx-auto px-5 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
        {bio && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-2 md:row-span-2 glass rounded-3xl p-8 flex flex-col justify-center"
          >
            <h2 className="font-display text-2xl font-bold mb-4 text-gradient">About Me</h2>
            <p className="text-gray-300 leading-relaxed">{bio}</p>
          </motion.div>
        )}

        {tiles.map((tile, i) => (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className={`${tile.span} glass rounded-3xl p-6 bg-gradient-to-br ${tile.gradient} flex flex-col justify-center`}
          >
            <span className="font-display text-4xl md:text-5xl font-bold text-white">{tile.value}</span>
            <span className="text-sm text-gray-400 mt-2">{tile.label}</span>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -6 }}
          className="col-span-2 glass rounded-3xl p-6 flex flex-col justify-center gap-2"
        >
          {location && <p className="text-gray-300 text-sm">📍 {location}</p>}
          {email && <p className="text-gray-300 text-sm">✉️ {email}</p>}
          {phone && <p className="text-gray-300 text-sm">📞 {phone}</p>}
        </motion.div>
      </div>
    </section>
  )
}