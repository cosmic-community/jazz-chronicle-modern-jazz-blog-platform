import { AuthorCardProps } from '@/types'

export default function AuthorCard({ author, className = '' }: AuthorCardProps) {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {author.metadata.photo && (
        <img
          src={`${author.metadata.photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
          alt={author.metadata.name}
          className="w-12 h-12 rounded-full object-cover"
          width={60}
          height={60}
        />
      )}
      <div>
        <h3 className="font-semibold text-gray-900">
          {author.metadata.name}
        </h3>
        {author.metadata.specialties && (
          <p className="text-sm text-gray-600">
            {author.metadata.specialties}
          </p>
        )}
        {author.metadata.bio && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {author.metadata.bio}
          </p>
        )}
        <div className="flex space-x-3 mt-2">
          {author.metadata.website && (
            <a
              href={author.metadata.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Website
            </a>
          )}
          {author.metadata.twitter && (
            <a
              href={`https://twitter.com/${author.metadata.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Twitter
            </a>
          )}
          {author.metadata.email && (
            <a
              href={`mailto:${author.metadata.email}`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Email
            </a>
          )}
        </div>
      </div>
    </div>
  )
}