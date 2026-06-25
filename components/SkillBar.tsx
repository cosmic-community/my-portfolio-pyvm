'use client'

import { motion } from 'framer-motion'
import type { Skill } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function SkillBar({ skill, index = 0 }: { skill: Skill; index?: number }) {
  const name = getMetafieldValue(skill.metadata?.name) || skill.title
  const proficiency = skill.metadata?.proficiency ?? 0
  const accent = getMetafieldValue(skill.metadata?.accent_color) || '#a855f7'
  const icon = skill.metadata?.icon?.imgix_url

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <img
            src={`${icon}?w=80&h=80&fit=crop&auto=format,compress`}
            alt={name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg object-cover"
          />
        )}
        <span className="font-medium text-white flex-1">{name}</span>
        <span className="text-sm text-gray-400">{proficiency}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, ${accent}, #ec4899)` }}
        />
      </div>
    </motion.div>
  )
}