# My Portfolio

![App Preview](https://imgix.cosmicjs.com/0715e930-707f-11f1-a87f-d72293b1048a-autopilot-photo-1550745165-9bc0b252726f-1782382630715.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A stunning, modern creative portfolio for **Lokesh Devda** — Graphic Designer & Web Developer. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com), this portfolio features fluid bento-grid layouts, 3D parallax scroll effects, interactive motion cards, and a fully content-driven architecture.

## ✨ Features

- 🎨 **Bento Grid Hero** — Fluid, asymmetric grid layouts with interactive motion cards
- 🌊 **3D Parallax Scrolling** — Depth-driven scroll effects throughout the experience
- 🚀 **Dynamic Projects Showcase** — Filterable project cards with galleries, tech stacks, and live links
- 🛠️ **Skills Visualization** — Animated proficiency bars grouped by category
- 💼 **Work Experience Timeline** — Animated vertical timeline of career history
- 🎓 **Education Section** — Clean, card-based education history
- 📱 **Fully Responsive** — Beautiful on every device with fluid spacing
- ⚡ **Server Components** — Fast, SEO-optimized data fetching from Cosmic

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a3cff8ee5c22dc3cbf8a1bd&clone_repository=6a3d00f9e5c22dc3cbf8a21e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a developer portfolio with projects (including screenshots, tech stack, and live URLs), skills, and work experience.
>
> User instructions: PERSONAL INFO Name: Lokesh Devda Tools & software use skils: Graphic Designer & Web Developer, vibe coder, chatgpt, gemini, canva, photoshop, illsutrator, Figma, Ai Graphic designer , ai website and tools builder Phone: +91 6267382299 Location: Ramkrishna Bagh Colony, Near Velocity Robot Square, Indore 💼 JOB EXPERIENCE Company Role Duration Graphic360 Graphic Designer Nov 2025 - Angel Creation Graphic Designer Feb 2024 – Nov 2025- Present Krishna Printers Graphic Designer Jun 2023 – Feb 2024 Digital Graphics Graphic Designer Jan 2023 – Jun 2023 World Book of Star Records Graphic Designer & Web Developer Oct 2022 – Jan 2023 Sarvagya Online Studio Graphic Designer Apr 2020 – Oct 2022 🛠️ TECHNICAL SKILLS Corel Draw Adobe Illustrator Adobe Photoshop Affinity Designer WordPress Microsoft Office 🎓 EDUCATION Course Subject University Score Year ITI COPA NCVT 90% 2022–23 Graduation Mathematics B.U. Bhopal 60% 2019–22 12th Mathematics M.P. Board Bhopal 60% 2018–19 💡 SOFT SKILLS Strong Communication Problem Solving Adaptability Leadership Is content ke liye best portfolio graphic design ke liye batao json formate ne code do and full creative motion 3d parallax scrolling ke hisab se best design banao logo, poster, banners, printing, flyers, visiting card, letterhead, full branding, ui and ux designs ke hisab se kuch batao bento grid style fluid style mein interactive motion cards andd elements and"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Portfolio". The content is managed in Cosmic CMS with the following object types: profile, projects, skills, work-experience, education. Create a beautiful, modern, responsive design with a homepage and pages for each content type. Make it full creative with motion, 3D parallax scrolling, bento grid style, fluid style with interactive motion cards and elements.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **[Next.js 16](https://nextjs.org)** — React framework with App Router
- **[React 19](https://react.dev)** — UI library
- **[TypeScript](https://www.typescriptlang.org)** — Type safety
- **[Tailwind CSS](https://tailwindcss.com)** — Utility-first styling
- **[Framer Motion](https://www.framer.com/motion/)** — Animations & parallax
- **[Cosmic](https://www.cosmicjs.com)** — Headless CMS ([docs](https://www.cosmicjs.com/docs))

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with the portfolio bucket

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-portfolio

# Install dependencies
bun install

# Add your environment variables (see below)

# Run the development server
bun dev
```

Environment variables required:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## 📦 Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all projects with nested data
const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch the profile
const { object: profile } = await cosmic.objects
  .findOne({ type: 'profile', slug: 'profile' })
  .depth(1)
```

## 🌌 Cosmic CMS Integration

This portfolio reads from five Cosmic object types:

- **profile** — Personal info, bio, photo, stats, social links
- **projects** — Portfolio work with galleries, tech stacks, and links
- **skills** — Technical skills with proficiency and category
- **work-experience** — Career timeline
- **education** — Academic history

All data is fetched server-side using the [Cosmic SDK](https://www.cosmicjs.com/docs) with proper error handling and depth parameters for connected objects.

## ☁️ Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Connect your repository to [Netlify](https://netlify.com)
2. Set build command to `bun run build`
3. Add environment variables in the Netlify dashboard

<!-- README_END -->