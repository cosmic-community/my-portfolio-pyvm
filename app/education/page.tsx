import { getEducation } from '@/lib/cosmic'
import EducationCard from '@/components/EducationCard'
import SectionHeader from '@/components/SectionHeader'

export const revalidate = 60

export const metadata = {
  title: 'Education — My Portfolio',
  description: 'My academic background.',
}

export default async function EducationPage() {
  const education = await getEducation()

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-5">
        <SectionHeader
          eyebrow="✦ Background"
          title="Education"
          subtitle="My academic qualifications and achievements."
        />
        {education.length === 0 ? (
          <p className="text-center text-gray-400">No education records available yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {education.map((item, i) => (
              <EducationCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}