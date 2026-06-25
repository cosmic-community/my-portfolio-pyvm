'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import type { Profile } from '@/types'

const ARTWORK_URL =
  'https://ik.imagekit.io/xmnehhl6rx/Hero%20Images%20/text_and_ye_bada_light_202605221918.jpeg'

export default function Hero({ profile }: { profile: Profile | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Artwork scales up as user scrolls
  const artworkScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  // Glow expands on scroll
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0])
  // Badge moves slower than content (parallax depth)
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -120])

  const photo = profile?.metadata?.profile_photo?.imgix_url

  // Mouse parallax state
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const nx = (e.clientX - cx) / cx
    const ny = (e.clientY - cy) / cy
    setMouse({ x: nx, y: ny })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Layer 1: Dark Background */}
      <div className="absolute inset-0 -z-30 bg-[#070710]" />

      {/* Layer 3: Large Light Glow (behind artwork) */}
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-purple-500/30 blur-[120px] -z-20 animate-float"
      />

      {/* Layer 2: Hero Artwork Image (as background layer) */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08, filter: 'blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          scale: artworkScale,
          x: mouse.x * 20,
          y: mouse.y * 20,
        }}
        className="absolute inset-0 -z-10"
      >
        <div
          className="w-full h-full bg-center bg-no-repeat bg-contain md:bg-cover"
          style={{ backgroundImage: `url("${ARTWORK_URL}")` }}
        />
      </motion.div>

      {/* Subtle dark vignette over artwork for badge contrast */}
      <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-[#070710]/70 via-transparent to-[#070710]/40 pointer-events-none" />

      {/* Layer 4: Lanyard Badge (foreground, interactive) */}
      {photo && (
        <motion.div
          initial={{ opacity: 0, y: -300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 12,
            mass: 1,
            delay: 0.6,
          }}
          style={{
            y: badgeY,
            x: mouse.x * -30,
            rotate: mouse.x * 6,
          }}
          className="absolute right-6 md:right-20 top-1/2 -translate-y-1/2 z-20 perspective"
        >
          {/* Lanyard strap */}
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-24 md:h-32 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full shadow-lg" />
            <div className="w-4 h-4 rounded-full bg-gray-700 border border-white/20 -mt-1 z-10" />

            {/* Badge card */}
            <div className="relative -mt-2 w-44 md:w-56 glass rounded-3xl p-4 border border-white/15 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-pink-600/30 rounded-3xl blur-xl -z-10" />
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={`${photo}?w=600&h=700&fit=crop&auto=format,compress`}
                  alt={profile?.metadata?.full_name || 'Profile'}
                  className="w-full object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <div className="text-white font-display font-semibold text-sm md:text-base">
                  {profile?.metadata?.full_name || 'Lokesh Devda'}
                </div>
                <div className="text-gray-400 text-[11px] md:text-xs mt-0.5">
                  {profile?.metadata?.professional_title || 'Designer & Developer'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}