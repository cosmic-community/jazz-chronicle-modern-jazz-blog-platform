import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Get the auth token from cookies
  const token = request.cookies.get('auth-token')?.value

  // If there's a token, verify it and add user info to headers
  if (token) {
    try {
      const decoded = await verifyToken(token)
      if (decoded) {
        // Add user ID to request headers for server components
        const response = NextResponse.next()
        response.headers.set('x-user-id', decoded.userId)
        return response
      }
    } catch (error) {
      // Invalid token, continue without authentication
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}