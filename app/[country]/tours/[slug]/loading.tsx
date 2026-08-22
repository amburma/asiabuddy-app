export default function TourDetailLoading() {
  return (
    <div className="min-h-screen bg-sacred-bg/30">
      {/* ── Hero Skeleton ── */}
      <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-sacred-green to-emerald-950 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        
        {/* Back Button Skeleton */}
        <div className="absolute top-6 left-6 z-10">
          <div className="w-24 h-10 bg-white/20 backdrop-blur-md rounded-full animate-pulse" />
        </div>

        {/* Hero Content Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="w-32 h-6 bg-white/20 rounded-full mb-4 animate-pulse" />
          <div className="w-3/4 h-12 md:h-16 bg-white/20 rounded-lg mb-4 animate-pulse" />
          <div className="w-1/2 h-4 bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      {/* ── Main Content Skeleton ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Overview + Reserve Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="w-32 h-4 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="w-48 h-8 bg-gray-200 rounded mb-6 animate-pulse" />
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-3/4 h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-5/6 h-4 bg-gray-100 rounded animate-pulse" />
                <div className="w-2/3 h-4 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Column - Reserve */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a2332] rounded-2xl shadow-lg p-6">
              <div className="w-40 h-4 bg-gray-700 rounded mb-6 animate-pulse" />
              <div className="h-[1px] bg-gray-700 mb-6" />
              
              {/* Stats Grid Skeleton */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="w-16 h-3 bg-gray-700 rounded mb-2 animate-pulse" />
                    <div className="w-20 h-4 bg-gray-600 rounded animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Button Skeleton */}
              <div className="w-full h-12 bg-orange-500/50 rounded-xl animate-pulse" />
              
              {/* Trust Badges Skeleton */}
              <div className="w-48 h-3 bg-gray-700 rounded mx-auto mt-3 animate-pulse" />
            </div>
          </div>
        </div>

        {/* What's Included Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-12">
          <div className="w-48 h-8 bg-gray-200 rounded mb-6 animate-pulse" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-4 h-4 bg-gray-200 rounded-full mt-0.5 animate-pulse" />
                <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Divider Skeleton */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex-grow h-[1px] bg-gray-200 animate-pulse" />
          <div className="w-16 h-[1px] bg-gray-200 animate-pulse" />
        </div>

        {/* Highlights Skeleton */}
        <div className="mb-10">
          <div className="w-56 h-8 bg-gray-200 rounded mb-5 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="w-4 h-4 bg-gray-200 rounded-full mt-0.5 animate-pulse" />
                <div className="flex-1 h-4 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary Skeleton */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse" />
            <div className="flex-grow h-[1px] bg-gray-200 animate-pulse" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                  {i < 2 && <div className="w-[1px] flex-grow bg-gray-200 mt-2 animate-pulse" />}
                </div>
                <div className="pb-6 flex-1">
                  <div className="w-40 h-4 bg-gray-200 rounded mb-3 animate-pulse" />
                  <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 animate-pulse" />
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-100 rounded animate-pulse" />
                    <div className="w-5/6 h-3 bg-gray-100 rounded animate-pulse" />
                    <div className="w-4/5 h-3 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="bg-sacred-green rounded-2xl p-8 text-center mb-10">
          <div className="w-48 h-8 bg-white/20 rounded mx-auto mb-2 animate-pulse" />
          <div className="w-64 h-4 bg-white/10 rounded mx-auto mb-6 animate-pulse" />
          <div className="w-48 h-12 bg-white/20 rounded-xl mx-auto animate-pulse" />
        </div>

        {/* Footer Nav Skeleton */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}