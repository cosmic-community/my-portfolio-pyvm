'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/experience', label: 'Experience' },
  { href: '/education', label: 'Education' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold text-gradient">
          LD<span className="text-white">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
        </button>
      </nav>

      {open && (
        <ul className="md:hidden glass mt-3 mx-5 rounded-2xl p-4 flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-gray-200 hover:text-white py-2"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}