import { redirect } from 'next/navigation'

export default async function CountryContactRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ country: string }>
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const { country } = await params
  const sp = await searchParams
  const qs = new URLSearchParams()
  // Build the full tour page URL so operators can click straight through
  if (sp.tour) {
    qs.set('ref', `https://asiabuddy.app/${country}/tours/${sp.tour}`)
  }
  redirect(`/contact${qs.toString() ? `?${qs.toString()}` : ''}`)
}
