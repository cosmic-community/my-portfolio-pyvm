// app/projects/[slug]/page.tsx
import { getProject, getProjects } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  const title = getMetafieldValue(project.metadata?.title) || project.title
  const category = getMetafieldValue(project.metadata?.category)
  const fullDesc = getMetafieldValue(project.metadata?.full_description)
  const shortDesc = getMetafieldValue(project.metadata?.short_description)
  const image = project.metadata?.featured_image?.imgix_url
  const accent = getMetafieldValue(project.metadata?.accent_color) || '#a855f7'
  const liveUrl = getMetafieldValue(project.metadata?.live_url)
  const githubUrl = getMetafieldValue(project.metadata?.github_url)
  const techStack = Array.isArray(project.metadata?.tech_stack) ? project.metadata.tech_stack : []
  const gallery = Array.isArray(project.metadata?.gallery) ? project.metadata.gallery : []

  return (
    <article className="pt-32 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-5">
        <Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to Projects
        </Link>

        <div className="mt-8">
          {category && (
            <span
              className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: `${accent}22`, color: accent }}
            >
              {category}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">{title}</span>
          </h1>
          {shortDesc && <p className="text-xl text-gray-300 mb-8">{shortDesc}</p>}
        </div>

        {image && (
          <div className="rounded-3xl overflow-hidden mb-10 border border-white/10">
            <img
              src={`${image}?w=2000&h=1100&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            {fullDesc && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{fullDesc}</p>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            {techStack.length > 0 && (
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display font-bold mb-3 text-white">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span key={tech} className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(liveUrl || githubUrl) && (
              <div className="space-y-3">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:scale-105 transition-transform"
                  >
                    View Live →
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center px-6 py-3 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors"
                  >
                    View Code
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>

        {gallery.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-2xl font-bold mb-6 text-white">Gallery</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {gallery.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={`${img.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                    alt={`${title} gallery ${i + 1}`}
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}