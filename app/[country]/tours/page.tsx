export default async function ToursPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>Tours Listing — {countryName} — Coming Soon</div>
    </div>
  )
}
