import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken } from '../../lib/tour-guide/auth'
import TourGuideLoginForm from '../../components/tour-guide/TourGuideLoginForm'

export default async function TourGuidePage({
  searchParams,
}: {
  searchParams: Promise<{ trial?: string }>
}) {
  const params = await searchParams
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('tg_session')
  
  if (sessionCookie?.value) {
    const session = await verifySessionToken(sessionCookie.value)
    if (session) {
      redirect('/tourguide/dashboard')
    }
  }
  
  const isTrialExpired = params.trial === 'expired'
  
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
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
  )
}