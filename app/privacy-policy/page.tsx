export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <a href="/" className="inline-block text-blue-600 hover:text-blue-800 mb-8">
          ← Back
        </a>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Privacy Policy — AsiaBuddy
        </h1>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              What Data We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and Google Analytics to collect information about how you use our website. This includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Pages you visit on our site</li>
              <li>Time spent on each page</li>
              <li>Your approximate location (country/region)</li>
              <li>Browser type and device information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Why We Collect It
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We collect this data to improve your experience and understand how our website is being used. This helps us:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Identify popular content and features</li>
              <li>Fix bugs and improve site performance</li>
              <li>Make informed decisions about future improvements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Google Analytics Opt-Out
            </h2>
            <p className="text-gray-700 leading-relaxed">
              You can choose to opt out of Google Analytics tracking in two ways:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Click the "Decline" button on our cookie banner when you first visit the site</li>
              <li>
                Visit the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>{' '}
                page for browser-level opt-out options
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Contact
            </h2>
            <p className="text-gray-700 leading-relaxed">
              [PLACEHOLDER — I will fill in]
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
