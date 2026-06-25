'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import type { Profile } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function Hero({ profile }: { profile: Profile | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const name = getMetafieldValue(profile?.metadata?.full_name) || 'Lokesh Devda'
  const title = getMetafieldValue(profile?.metadata?.professional_title) || 'Graphic Designer & Web Developer'
  const tagline = getMetafieldValue(profile?.metadata?.tagline)
  const photo = profile?.metadata?.profile_photo?.imgix_url
  const heroBg = profile?.metadata?.hero_background?.imgix_url

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-16"
    >
      {heroBg && (
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 -z-10"
        >
          <img
            src={`${heroBg}?w=2400&h=1600&fit=crop&auto=format,compress`}
            alt="Background"
            className="w-full h-[120%] object-cover opacity-20"
          />
        </motion.div>
      )}

      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:60px_60px]" />
      <motion.div
        style={{ y: y2 }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl -z-10"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl -z-10 animate-float"
      />

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-5 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block glass px-4 py-1.5 rounded-full text-sm text-gray-300 mb-6"
            >
              ✦ Available for freelance work
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-bold leading-[1.05] mb-6"
            >
              Hi, I'm <span className="text-gradient">{name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-gray-300 mb-4"
            >
              {title}
            </motion.p>

            {tagline && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-gray-400 mb-8 max-w-md"
              >
                {tagline}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:scale-105 transition-transform"
              >
                View My Work
              </Link>
              <Link
                href="/experience"
                className="px-6 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors"
              >
                My Journey
              </Link>
            </motion.div>
          </div>

          {photo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative perspective"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-40 animate-float" />
                <img
                  src={`${photo}?w=900&h=1000&fit=crop&auto=format,compress`}
                  alt={name}
                  className="relative rounded-3xl w-full object-cover border border-white/10"
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}