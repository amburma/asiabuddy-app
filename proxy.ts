import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID_COUNTRIES = ['thailand', 'singapore', 'vietnam', 'japan']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Don't block API routes
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Don't block Next.js internal routes
  if (pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  // Don't block static files
  if (pathname.startsWith('/static/') || pathname.startsWith('/public/')) {
    return NextResponse.next()
  }

  // Check if path matches /[country] pattern
  const countryMatch = pathname.match(/^\/([^\/]+)/)
  if (countryMatch) {
    const country = countryMatch[1]

    // If it's a country path but not a valid country, redirect to home
    if (!VALID_COUNTRIES.includes(country)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Pass through all other paths
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.jpg|.*\\.jpeg|.*\\.png|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.webp|.*\\.mp4|.*\\.mp3|.*\\.pdf|.*\\.json|.*\\.js|.*\\.css|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.otf).*)',
  ],
}
