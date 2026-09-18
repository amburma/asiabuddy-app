import Image from 'next/image'

export default function PhotoGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-[#0D0D0D] uppercase tracking-wide mb-6">
        More Photos
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="relative w-full aspect-square overflow-hidden">
            <Image
              src={image}
              alt={`Gallery photo ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
            />
          </div>
        ))}
      </div>
    </div>
  )
}