import { PostPreviewProps } from '@/types'
import ReactMarkdown from 'react-markdown'
import ExclusiveContentBanner from './ExclusiveContentBanner'

export default function PostPreview({ 
  post, 
  isLoggedIn, 
  previewLength = 500,
  className = '' 
}: PostPreviewProps) {
  const { content } = post.metadata
  
  // If user is logged in or content is not exclusive, show full content
  if (isLoggedIn || !post.metadata.exclusive) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    )
  }
  
  // For non-logged-in users viewing exclusive content, show preview
  const previewContent = content.length > previewLength 
    ? content.substring(0, previewLength) + '...'
    : content
  
  return (
    <div className={className}>
      {/* Exclusive content indicator */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-amber-100 p-1 rounded">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-amber-700">Member Exclusive</span>
        </div>
      </div>
      
      {/* Preview content */}
      <div className="prose prose-lg max-w-none mb-6">
        <ReactMarkdown>{previewContent}</ReactMarkdown>
      </div>
      
      {/* Fade effect */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent h-24 -mt-24 pointer-events-none"></div>
      </div>
      
      {/* Exclusive content banner */}
      <ExclusiveContentBanner />
    </div>
  )
}