import { createBucketClient } from '@cosmicjs/sdk'
import type { Profile, Project, Skill, WorkExperience, Education } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'profile' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const objects = response.objects as Profile[]
    return objects[0] ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch profile')
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Project[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch projects')
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return (response.object as Project) ?? null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch project')
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Skill[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch skills')
  }
}

export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const items = response.objects as WorkExperience[]
    return items.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '').getTime()
      const dateB = new Date(b.metadata?.start_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch work experience')
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'education' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Education[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch education')
  }
}