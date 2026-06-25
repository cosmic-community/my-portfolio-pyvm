export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  behance?: string;
  dribbble?: string;
  twitter?: string;
  github?: string;
  [key: string]: string | undefined;
}

export interface Profile extends CosmicObject {
  type: 'profile';
  metadata: {
    full_name?: string;
    professional_title?: string;
    tagline?: string;
    bio?: string;
    profile_photo?: CosmicImage;
    hero_background?: CosmicImage;
    phone?: string;
    email?: string;
    location?: string;
    years_experience?: number;
    projects_completed?: number;
    social_links?: SocialLinks;
    resume_file?: CosmicImage;
  };
}

export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    title?: string;
    category?: string;
    short_description?: string;
    full_description?: string;
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    tech_stack?: string[];
    live_url?: string;
    github_url?: string;
    accent_color?: string;
    featured?: boolean;
  };
}

export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    name?: string;
    category?: string;
    proficiency?: number;
    icon?: CosmicImage;
    accent_color?: string;
  };
}

export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    company?: string;
    role?: string;
    start_date?: string;
    end_date?: string;
    current?: boolean;
    description?: string;
    company_logo?: CosmicImage;
    accent_color?: string;
  };
}

export interface Education extends CosmicObject {
  type: 'education';
  metadata: {
    course?: string;
    subject?: string;
    institution?: string;
    score?: string;
    year_range?: string;
    accent_color?: string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}