import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORTED_LANGUAGES = ['en', 'mm', 'th', 'de', 'fr', 'es']
const EXCLUDED_PATHS = ['/api', '/_next', '/tourguide', '/about', '/contact', '/admin', '/how-to-pay', '/link-converter', '/partner-invite-2026', '/payment-proof', '/privacy-policy', '/sales', '/favicon.ico']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip excluded paths
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Skip root path
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Check if path already starts with a valid language prefix
  const pathSegments = pathname.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]?.toLowerCase()

  if (firstSegment && SUPPORTED_LANGUAGES.includes(firstSegment)) {
    return NextResponse.next()
  }

  // Determine target language
  let targetLanguage = 'en'

  // 1. Check NEXT_LOCALE cookie
  const cookieValue = request.cookies.get('NEXT_LOCALE')?.value?.toLowerCase()
  if (cookieValue && SUPPORTED_LANGUAGES.includes(cookieValue)) {
    targetLanguage = cookieValue
  } else {
    // 2. Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || ''
    const matchedLang = SUPPORTED_LANGUAGES.find(lang =>
      acceptLanguage.toLowerCase().startsWith(lang)
    )
    if (matchedLang) {
      targetLanguage = matchedLang
    }
    // 3. Fallback to 'en' is already set
  }

  // Redirect to the same path with language prefix
  const newPathname = `/${targetLanguage}${pathname}`
  const url = request.nextUrl.clone()
  url.pathname = newPathname

  return NextResponse.redirect(url, 307)
}

export const config = {
  matcher: [
    // Match all paths except static files, API routes, and files with extensions
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
