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
        </div>
      )}

      <div className="p-6">
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-3">
          {post.metadata.category && (
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: post.metadata.category.metadata.color }}
            >
              {post.metadata.category.metadata.name}
            </span>
          )}
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