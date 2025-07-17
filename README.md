# Jazz Chronicle - Modern Jazz Blog Platform

![App Preview](https://imgix.cosmicjs.com/e7269270-62db-11f0-a051-23c10f41277a-photo-1508700115892-45ecd05ae2ad-1752735705765.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated Next.js 15 application that transforms your jazz blog content into a beautiful, modern website. Built with your existing Cosmic content structure, featuring posts about jazz history, artist spotlights, album reviews, and live performances.

## Features

- **Dynamic Content Management**: Automatically displays your existing posts, authors, and categories
- **Category-Based Organization**: Browse content by Jazz History, Artist Spotlights, Album Reviews, and Live Performances
- **Author Profiles**: Detailed author pages with bios, photos, and social media links
- **Responsive Design**: Optimized for all devices with modern, jazz-inspired aesthetics
- **SEO Optimized**: Built-in metadata and structured data for search engines
- **Fast Performance**: Server-side rendering with Next.js 15 for optimal loading speeds
- **Color-Coded Categories**: Each category has its own distinct color scheme
- **Rich Content Support**: Full markdown support with beautiful typography

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68789f4a2920a13bc482d26b&clone_repository=68796ae38e7aaab1929a1305)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog about Jazz music with posts, authors, and categories.

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: staging in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Cosmic CMS** - Headless CMS for content management
- **Inter Font** - Modern typography for excellent readability

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with your jazz blog content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```bash
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Posts
```typescript
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .depth(1)
  .sort('-created_at')
```

### Fetching Authors
```typescript
const { objects: authors } = await cosmic.objects
  .find({ type: 'authors' })
  .props(['id', 'title', 'slug', 'metadata'])
```

### Fetching Categories
```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This application is designed to work with your existing Cosmic content structure:

- **Posts**: Jazz articles with title, excerpt, content, featured image, author, category, tags, and published date
- **Authors**: Writer profiles with name, bio, photo, email, website, Twitter, and specialties
- **Categories**: Content organization with name, description, and color coding

The app automatically handles relationships between posts, authors, and categories using Cosmic's object metafields with depth queries.

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add your environment variables in build settings
4. Deploy!

### Environment Variables
Add these to your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->