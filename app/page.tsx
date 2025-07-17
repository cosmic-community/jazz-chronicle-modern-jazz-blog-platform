import { getPosts, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import { Post, Category } from '@/types'
import { cookies } from 'next/headers'

export default async function HomePage() {
  const posts = await getPosts()
  const categories = await getCategories()
  
  // Check if user is logged in by looking for auth cookie
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('auth-token')
  const isLoggedIn = !!authCookie
  
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Jazz Chronicle
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the rich world of jazz music through expert articles, artist spotlights, 
          album reviews, and live performance coverage.
        </p>
        {!isLoggedIn && (
          <div className="mt-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-amber-800 text-sm">
                <strong>New!</strong> Join our community to access exclusive interviews, 
                rare recordings, and premium jazz content.
              </p>
              <div className="mt-3 space-x-2">
                <a href="/signup" className="bg-amber-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-600 transition-colors">
                  Join Now
                </a>
                <a href="/login" className="text-amber-700 hover:text-amber-800 text-sm font-medium">
                  Already a member?
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Category Filter */}
      <CategoryFilter categories={categories} />

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {featuredPost.metadata.featured_image && (
              <div className="relative h-96">
                <img
                  src={`${featuredPost.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  width={1200}
                  height={600}
                />
                {/* Exclusive content overlay */}
                {featuredPost.metadata.exclusive && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Member Exclusive</span>
                  </div>
                )}
              </div>
            )}
            <div className="p-8">
              <div className="flex items-center mb-4">
                {featuredPost.metadata.category && (
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium text-white mr-4"
                    style={{ backgroundColor: featuredPost.metadata.category.metadata.color }}
                  >
                    {featuredPost.metadata.category.metadata.name}
                  </span>
                )}
                {featuredPost.metadata.exclusive && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center space-x-1 mr-4">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Member Only</span>
                  </span>
                )}
                {featuredPost.metadata.published_date && (
                  <time className="text-sm text-gray-500">
                    {new Date(featuredPost.metadata.published_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                <a href={`/posts/${featuredPost.slug}`} className="hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </a>
              </h3>
              {featuredPost.metadata.excerpt && (
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredPost.metadata.excerpt}
                </p>
              )}
              {featuredPost.metadata.author && (
                <div className="flex items-center">
                  {featuredPost.metadata.author.metadata.photo && (
                    <img
                      src={`${featuredPost.metadata.author.metadata.photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={featuredPost.metadata.author.metadata.name}
                      className="w-10 h-10 rounded-full mr-3"
                      width={40}
                      height={40}
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {featuredPost.metadata.author.metadata.name}
                    </p>
                    {featuredPost.metadata.author.metadata.specialties && (
                      <p className="text-xs text-gray-500">
                        {featuredPost.metadata.author.metadata.specialties}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}