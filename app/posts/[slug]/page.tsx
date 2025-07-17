// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'
import { Post } from '@/types'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Jazz Chronicle`,
    description: post.metadata.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.metadata.excerpt || post.title,
      images: post.metadata.featured_image ? [post.metadata.featured_image.imgix_url] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            {post.metadata.category && (
              <CategoryBadge category={post.metadata.category} className="mr-4" />
            )}
            {post.metadata.published_date && (
              <time className="text-sm text-gray-500">
                {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          {post.metadata.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.metadata.excerpt}
            </p>
          )}
          
          {post.metadata.author && (
            <AuthorCard author={post.metadata.author} />
          )}
        </header>

        {/* Featured Image */}
        {post.metadata.featured_image && (
          <div className="mb-8">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              width={1200}
              height={600}
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        {post.metadata.tags && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}