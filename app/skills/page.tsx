import { getSkills } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import SkillBar from '@/components/SkillBar'
import SectionHeader from '@/components/SectionHeader'
import type { Skill } from '@/types'

export const revalidate = 60

export const metadata = {
  title: 'Skills — My Portfolio',
  description: 'Technical skills and expertise.',
}

export default async function SkillsPage() {
  const skills = await getSkills()

  const grouped: Record<string, Skill[]> = {}
  skills.forEach((skill) => {
    const category = getMetafieldValue(skill.metadata?.category) || 'Other'
    const bucket = grouped[category]
    if (bucket) {
      bucket.push(skill)
    } else {
      grouped[category] = [skill]
    }
  })

  const categories = Object.keys(grouped)

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-5">
        <SectionHeader
          eyebrow="✦ Expertise"
          title="Skills & Tools"
          subtitle="Software and technologies I use to bring ideas to life."
        />

        {skills.length === 0 ? (
          <p className="text-center text-gray-400">No skills available yet.</p>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => {
              const categorySkills = grouped[category]
              if (!categorySkills || categorySkills.length === 0) {
                return null
              }
              return (
                <div key={category}>
                  <h3 className="font-display text-xl font-bold text-white mb-5">{category}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {categorySkills.map((skill, i) => (
                      <SkillBar key={skill.id} skill={skill} index={i} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}