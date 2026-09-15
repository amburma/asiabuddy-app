export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go back to home
      </a>
    </div>
  );
}
