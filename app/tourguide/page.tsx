import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { verifySessionToken } from '../../lib/tour-guide/auth'
import { normalizeLocale, UI_TRANSLATIONS } from '../../lib/i18n'
import TourGuideLoginForm from '../../components/tour-guide/TourGuideLoginForm'
import { Sparkles } from 'lucide-react'

export default async function TourGuidePage({
  searchParams,
}: {
  searchParams: Promise<{ trial?: string }>
}) {
  const params = await searchParams
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('tg_session')
  const language = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)
  
  if (sessionCookie?.value) {
    const session = await verifySessionToken(sessionCookie.value)
    if (session) {
      redirect('/tourguide/dashboard')
    }
  }
  
  const isTrialExpired = params.trial === 'expired'
  const t = UI_TRANSLATIONS[language].tourGuideWelcome
  
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Welcome Section */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#F5F0E8]">
            {t.welcomeHeading}
          </h1>
          <p className="text-[#F5F0E8] opacity-70 text-lg">
            {t.welcomeDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] text-[#0D0D0D] font-bold px-8 py-4 rounded-full hover:bg-[#b8942f] hover:scale-105 hover:shadow-lg hover:shadow-[#C9A84C]/40 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5" />
              {t.buyServicesButton}
            </Link>
            <Link
              href="/thailand"
              className="inline-flex items-center justify-center border border-[#F5F0E8]/30 text-[#F5F0E8] px-6 py-3 rounded-lg hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              {t.backToHomeButton}
            </Link>
          </div>
        </div>

        {/* Login Section */}
        <div className="w-full max-w-md mx-auto md:mx-0 space-y-6">
          {isTrialExpired && (
            <div className="bg-[#C9A84C]/10 border border-[#C9A84C] rounded-lg p-4 text-center">
              <p className="text-[#F5F0E8] mb-3">
                Your free trial has ended. Want full access? Contact us to upgrade!
              </p>
              <a
                href="https://asiabuddy.app/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full h-[44px] bg-[#C9A84C] text-[#0D0D0D] font-semibold rounded-md hover:bg-[#b8942f] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:ring-offset-2 focus:ring-offset-[#0D0D0D] transition-colors"
              >
                Contact Us to Upgrade
              </a>
            </div>
          )}
          <TourGuideLoginForm />
        </div>
      </div>
    </div>
  )
}