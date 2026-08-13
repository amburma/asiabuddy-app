import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken } from '../../lib/tour-guide/auth'
import TourGuideLoginForm from '../../components/tour-guide/TourGuideLoginForm'

export default async function TourGuidePage() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('tg_session')
  
  if (sessionCookie?.value) {
    const session = await verifySessionToken(sessionCookie.value)
    if (session) {
      redirect('/tourguide/dashboard')
    }
  }
  
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <TourGuideLoginForm />
    </div>
  )
}