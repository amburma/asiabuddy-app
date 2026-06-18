import Link from 'next/link';

export default function TourNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Tour not found</h1>
        <p className="text-gray-600 mb-8">The tour you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
