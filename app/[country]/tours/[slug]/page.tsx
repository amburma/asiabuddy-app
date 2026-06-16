export default async function TourPage({
  params,
}: {
  params: Promise<{ country: string; slug: string }>
}) {
  const { country, slug } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>Tour: {slug} — {countryName} — Coming Soon</div>
    </div>
  )
}
