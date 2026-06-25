import { getProjects } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'
import SectionHeader from '@/components/SectionHeader'

export const revalidate = 60

export const metadata = {
  title: 'Projects — My Portfolio',
  description: 'Explore creative and development projects.',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        <SectionHeader
          eyebrow="✦ Portfolio"
          title="All Projects"
          subtitle="Branding, logos, web design, and development work."
        />
        {projects.length === 0 ? (
          <p className="text-center text-gray-400">No projects available yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}