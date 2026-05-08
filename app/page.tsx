import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-black text-blue-600 mb-4">AsiaBuddy</h1>
        <p className="text-xl text-gray-500 mb-12">Your Southeast Asia Travel Companion</p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link href="/thailand" className="px-8 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-lg">
            🇹🇭 Thai Guide
          </Link>
          <Link href="/myanmar" className="px-8 py-4 bg-yellow-400 text-black rounded-2xl font-bold hover:bg-yellow-500 transition-all shadow-lg">
            🇲🇲 Myanmar Guide
          </Link>
        </div>
      </div>
    </main>
  );
}