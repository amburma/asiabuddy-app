import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken } from '@/lib/tour-guide/auth'
import { supabaseAdmin } from '@/lib/tour-guide/supabaseAdmin'
import { normalizeLocale } from '@/lib/i18n'
import TourGuideLiveTranslateForm from '@/components/tour-guide/TourGuideLiveTranslateForm'
import FloatingContactButtonLoader from '@/components/shared/FloatingContactButtonLoader'
import FloatingChatButtonLoader from '@/components/shared/FloatingChatButtonLoader'

export default async function TourGuideLivePage() {
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

  // Live Translator is available to all account types including trial
  // (TRIAL_ALLOWED_FEATURES = ['live-translate'] in featureGateService.ts)
  // No source-based filtering needed here

  return (
    <div className="min-h-screen bg-[#0D0D0D] px-6 pt-8 pb-40 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <TourGuideLiveTranslateForm />
      </div>
      <FloatingContactButtonLoader language={language} />
      <FloatingChatButtonLoader language={language} country="thailand" />
    </div>
  )
}
