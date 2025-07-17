import Link from 'next/link'
import { ExclusiveContentBannerProps } from '@/types'

export default function ExclusiveContentBanner({ className = '' }: ExclusiveContentBannerProps) {
  return (
    <div className={`bg-gradient-to-r from-amber-400 to-orange-500 text-white p-6 rounded-lg shadow-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-3 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">Exclusive Content</h3>
            <p className="text-white/90">This is premium content available only to registered members</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/login"
            className="bg-white text-orange-500 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-orange-600 text-white px-4 py-2 rounded-md font-medium hover:bg-orange-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}