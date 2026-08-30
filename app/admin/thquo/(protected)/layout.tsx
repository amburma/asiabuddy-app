import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function ThquoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  // If no authenticated user, redirect to admin login
  if (authError || !user) {
    redirect('/admin/staff')
  }

  // Check if user is on the thquo allowlist
  const { data: allowlistEntry, error: allowlistError } = await supabase
    .from('thquo_allowlist')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  // If not on allowlist, redirect to unauthorized page
  if (allowlistError || !allowlistEntry) {
    redirect('/admin/thquo/unauthorized')
  }

  // User is authenticated and on allowlist, render children
  return <>{children}</>
}