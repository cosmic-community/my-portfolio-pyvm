import { getWorkExperience } from '@/lib/cosmic'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import SectionHeader from '@/components/SectionHeader'

export const revalidate = 60

export const metadata = {
  title: 'Experience — My Portfolio',
  description: 'My professional career timeline.',
}

export default async function ExperiencePage() {
  const experience = await getWorkExperience()

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-5">
        <SectionHeader
          eyebrow="✦ Journey"
          title="Work Experience"
          subtitle="A timeline of my professional career as a designer and developer."
        />
        <ExperienceTimeline items={experience} />
      </div>
    </div>
  )
}