import { getProfile, getProjects, getSkills, getWorkExperience } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import StatsBento from '@/components/StatsBento'
import ProjectCard from '@/components/ProjectCard'
import SkillBar from '@/components/SkillBar'
import SectionHeader from '@/components/SectionHeader'
import Link from 'next/link'

export const revalidate = 60

export default async function HomePage() {
  const [profile, projects, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
  ])

  const featuredProjects = projects.filter((p) => p.metadata?.featured).slice(0, 3)
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3)
  const topSkills = skills.slice(0, 6)

  return (
    <>
      <Hero profile={profile} />
      <StatsBento profile={profile} />

      {displayProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 py-20">
          <SectionHeader
            eyebrow="✦ Selected Work"
            title="Featured Projects"
            subtitle="A glimpse into my creative and development work."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {displayProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-block px-6 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors"
            >
              View All Projects →
            </Link>
          </div>
        </section>
      )}

      {topSkills.length > 0 && (
        <section className="max-w-5xl mx-auto px-5 py-20">
          <SectionHeader
            eyebrow="✦ Expertise"
            title="My Skills"
            subtitle="Tools and technologies I work with."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {topSkills.map((skill, i) => (
              <SkillBar key={skill.id} skill={skill} index={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/skills"
              className="inline-block px-6 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors"
            >
              All Skills →
            </Link>
          </div>
        </section>
      )}
    </>
  )
}