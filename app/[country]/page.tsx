import ThailandApp from '@/components/thailand/ThailandApp'

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const countryName = country.charAt(0).toUpperCase() + country.slice(1)
                                              
  if (country === 'thailand') {
    return <ThailandApp />
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>{countryName} — Coming Soon</div>
    </div>
  )
}
