// app/categories/[slug]/page.tsx
import { getCategory, getCategories, getPostsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { Category, Post } from '@/types'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.metadata.name} | Jazz Chronicle`,
    description: category.metadata.description || `Articles about ${category.metadata.name}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <header className="text-center mb-12">
        <div className="flex justify-center items-center mb-4">
          <span 
            className="px-6 py-2 rounded-full text-white text-lg font-medium"
            style={{ backgroundColor: category.metadata.color }}
          >
            {category.metadata.name}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.metadata.name}
        </h1>
        {category.metadata.description && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {category.metadata.description}
          </p>
        )}
      </header>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No articles found in this category yet.</p>
        </div>
      )}
    </div>
  )
}