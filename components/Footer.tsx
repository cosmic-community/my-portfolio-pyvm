import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-5 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg font-bold text-gradient">Lokesh Devda</p>
          <p className="text-sm text-gray-400">Graphic Designer & Web Developer</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-gray-400">
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="/experience" className="hover:text-white transition-colors">Experience</Link>
          <Link href="/education" className="hover:text-white transition-colors">Education</Link>
        </nav>
        <p className="text-sm text-gray-500">© {year} All rights reserved.</p>
      </div>
    </footer>
  )
}