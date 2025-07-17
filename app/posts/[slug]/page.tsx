// app/posts/[slug]/page.tsx
import { getPost, getPosts, getUserById } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'
import PostPreview from '@/components/PostPreview'
import { Post } from '@/types'
import { cookies, headers } from 'next/headers'
import { verifyToken } from '@/lib/auth'

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

  // Check if user is logged in by verifying the auth token from cookies
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('auth-token')
  let isLoggedIn = false
  let currentUser = null

  if (authCookie) {
    try {
      const decoded = await verifyToken(authCookie.value)
      if (decoded) {
        isLoggedIn = true
        // Optionally get user details if needed
        currentUser = await getUserById(decoded.userId)
      }
    } catch (error) {
      // Invalid token, user is not logged in
      isLoggedIn = false
    }
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
            {post.metadata.exclusive && (
              <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 mr-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Member Exclusive</span>
              </div>
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

        {/* Content with preview logic */}
        <PostPreview post={post} isLoggedIn={isLoggedIn} />

        {/* Tags */}
        {post.metadata.tags && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.split(',').map((tag: string, index: number) => (
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