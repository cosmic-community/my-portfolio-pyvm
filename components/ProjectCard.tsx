'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Project } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const title = getMetafieldValue(project.metadata?.title) || project.title
  const category = getMetafieldValue(project.metadata?.category)
  const desc = getMetafieldValue(project.metadata?.short_description)
  const image = project.metadata?.featured_image?.imgix_url
  const accent = getMetafieldValue(project.metadata?.accent_color) || '#a855f7'
  const techStack = Array.isArray(project.metadata?.tech_stack) ? project.metadata.tech_stack : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group glass rounded-3xl overflow-hidden"
    >
      <Link href={`/projects/${project.slug}`}>
        {image && (
          <div className="relative h-56 overflow-hidden">
            <img
              src={`${image}?w=800&h=560&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
              style={{ background: `linear-gradient(to top, ${accent}, transparent)` }}
            />
          </div>
        )}
        <div className="p-6">
          {category && (
            <span
              className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-3"
              style={{ backgroundColor: `${accent}22`, color: accent }}
            >
              {category}
            </span>
          )}
          <h3 className="font-display text-xl font-bold mb-2 group-hover:text-gradient transition-all">
            {title}
          </h3>
          {desc && <p className="text-gray-400 text-sm line-clamp-2 mb-4">{desc}</p>}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}