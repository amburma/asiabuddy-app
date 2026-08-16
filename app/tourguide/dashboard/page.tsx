import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { verifySessionToken } from '@/lib/tour-guide/auth'
import { supabaseAdmin } from '@/lib/tour-guide/supabaseAdmin'
import { getAccountStatus } from '@/lib/tour-guide/costGateService'
import { FileText, Camera, Mic, Headphones } from 'lucide-react'
import LogoutButton from '@/components/tour-guide/LogoutButton'

export default async function TourGuideDashboard() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('tg_session')
  
  if (!sessionCookie?.value) {
    redirect('/tourguide')
  }

  const session = await verifySessionToken(sessionCookie.value)
  if (!session) {
    redirect('/tourguide')
  }

  // Fetch account data
  const { data: account, error: accountError } = await supabaseAdmin
    .from('tour_guide_accounts')
    .select('*')
    .eq('id', session.accountId)
    .single()

  if (accountError || !account) {
    redirect('/tourguide')
  }

  const status = await getAccountStatus(account.id)
  let balanceDisplay: string
  if (status.source === 'trial') {
    const secondsRemaining = status.trialSecondsRemaining ?? 0
    balanceDisplay = `${secondsRemaining}s / 120s`
  } else {
    balanceDisplay = `${status.remainingHours.toFixed(2)}h / ${account.total_hours_allocated}h`
  }

  let isTrial = account.source === 'trial'

  const features = [
    { id: 'text', name: 'Text Translate', icon: FileText, description: 'Translate text between languages' },
    { id: 'photo', name: 'Photo Translate', icon: Camera, description: 'Translate text from images' },
    { id: 'voice', name: 'Voice Translator', icon: Mic, description: 'Record your voice clearly to translate.' },
    { id: 'live-translate', name: 'Live Translator', icon: Headphones, description: 'Real-time conversation translation' },
  ]

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <header className="border-b border-[#C9A84C] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#F5F0E8]">Tour Guide</h1>
            <p className="text-sm text-[#C9A84C]">{account.username} • {account.source}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-[#F5F0E8] opacity-70">Remaining</p>
              <p className="text-sm font-medium text-[#C9A84C]">{balanceDisplay}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Feature Grid */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => {
            const isEnabled = !isTrial || feature.id === 'live-translate'
            const Icon = feature.icon

            const cardContent = (
              <div
                className={`border rounded-lg p-6 ${
                  isEnabled
                    ? 'border-[#C9A84C] bg-[#1a1a1a] hover:bg-[#252525] cursor-pointer transition-colors'
                    : 'border-gray-700 bg-[#0a0a0a] opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${isEnabled ? 'bg-[#C9A84C]/20' : 'bg-gray-800'}`}>
                    <Icon
                      size={24}
                      className={isEnabled ? 'text-[#C9A84C]' : 'text-gray-600'}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#F5F0E8] mb-1">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-[#F5F0E8] opacity-70 mb-2">
                      {feature.description}
                    </p>
                    {!isEnabled && (
                      <span className="inline-block text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                        Full version only
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )

            if (feature.id === 'text' && isEnabled) {
              return (
                <Link key={feature.id} href="/tourguide/text">
                  {cardContent}
                </Link>
              )
            }

            if (feature.id === 'photo' && isEnabled) {
              return (
                <Link key={feature.id} href="/tourguide/photo">
                  {cardContent}
                </Link>
              )
            }

            if (feature.id === 'voice' && isEnabled) {
              return (
                <Link key={feature.id} href="/tourguide/voice">
                  {cardContent}
                </Link>
              )
            }

            if (feature.id === 'live-translate' && isEnabled) {
              return (
                <Link key={feature.id} href="/tourguide/live">
                  {cardContent}
                </Link>
              )
            }

            return <div key={feature.id}>{cardContent}</div>
          })}
        </div>
      </main>
    </div>
  )
}
