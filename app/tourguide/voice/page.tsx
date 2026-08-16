import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken } from '@/lib/tour-guide/auth'
import { supabaseAdmin } from '@/lib/tour-guide/supabaseAdmin'
import { normalizeLocale } from '@/lib/i18n'
import TourGuideVoiceTranslateForm from '@/components/tour-guide/TourGuideVoiceTranslateForm'
import FloatingContactButtonLoader from '@/components/shared/FloatingContactButtonLoader'
import FloatingChatButtonLoader from '@/components/shared/FloatingChatButtonLoader'

export default async function TourGuideVoicePage() {
  const cookieStore = await cookies()
  const language = normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value)
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

  // Trial accounts only ever get Live Translator (featureGateService.ts —
  // TRIAL_ALLOWED_FEATURES = ['live-translate']). The API route would 403 this
  // anyway, but bounce them before they even see the form, for a cleaner
  // UX than "submit and get an error".
  if (account.source === 'trial') {
    redirect('/tourguide/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] px-6 pt-8 pb-40 md:pb-8">
      <div className="max-w-2xl mx-auto">
        <TourGuideVoiceTranslateForm />
      </div>
      <FloatingContactButtonLoader language={language} />
      <FloatingChatButtonLoader language={language} country="thailand" />
    </div>
  )
}
