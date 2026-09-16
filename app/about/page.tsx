import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function AboutRedirect() {
  const cookieStore = await cookies()
  const targetLanguage = cookieStore.get('NEXT_LOCALE')?.value?.toLowerCase() || 'en'
  const defaultCountry = 'thailand'
  redirect(`/${targetLanguage}/${defaultCountry}/about`)
}
