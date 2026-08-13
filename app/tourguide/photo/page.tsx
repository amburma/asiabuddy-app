import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken } from '@/lib/tour-guide/auth'
import { supabaseAdmin } from '@/lib/tour-guide/supabaseAdmin'
import TourGuidePhotoOCRForm from '@/components/tour-guide/TourGuidePhotoOCRForm'

export default async function TourGuidePhotoPage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('tg_session')

  if (!sessionCookie?.value) {
    redirect('/tourguide')
  }

  const session = await verifySessionToken(sessionCookie.value)
  if (!session) {
    redirect('/tourguide')
  }

  const { data: account, error: accountError } = await supabaseAdmin
    .from('tour_guide_accounts')
    .select('source, status')
    .eq('id', session.accountId)
    .single()

  if (accountError || !account || account.status !== 'active') {
    redirect('/tourguide')
  }

  // Trial accounts only ever get Live Translator (featureGateService.ts).
  // Bounce before they see the form — same reasoning as text/page.tsx.
  if (account.source === 'trial') {
    redirect('/tourguide/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <TourGuidePhotoOCRForm />
      </div>
    </div>
  )
}
