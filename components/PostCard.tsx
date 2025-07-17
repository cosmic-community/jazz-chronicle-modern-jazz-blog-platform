import Link from 'next/link'
import { PostCardProps } from '@/types'

export default function PostCard({ post, showAuthor = true, className = '' }: PostCardProps) {
  return (
    <article className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${className}`}>
      {/* Featured Image */}
      {post.metadata.featured_image && (
        <div className="relative h-48">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
            width={400}
            height={200}
          />
          {/* Exclusive content overlay */}
          {post.metadata.exclusive && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Exclusive</span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {post.metadata.category && (
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ backgroundColor: post.metadata.category.metadata.color }}
              >
                {post.metadata.category.metadata.name}
              </span>
            )}
            {post.metadata.exclusive && (
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Member Only</span>
              </span>
            )}
          </div>
          {post.metadata.published_date && (
            <time className="text-sm text-gray-500">
              {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Author */}
        {showAuthor && post.metadata.author && (
          <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
            {post.metadata.author.metadata.photo && (
              <img
                src={`${post.metadata.author.metadata.photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata.name}
                className="w-8 h-8 rounded-full mr-3"
                width={32}
                height={32}
              />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">
                {post.metadata.author.metadata.name}
              </p>
              {post.metadata.author.metadata.specialties && (
                <p className="text-xs text-gray-500">
                  {post.metadata.author.metadata.specialties}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}