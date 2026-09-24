import { lastUpdatedLabel } from '@/config/site'

export function TldrSection() {
  return (
    <section aria-labelledby="tldr-heading" className="container mx-auto px-4 pt-12">
      <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
        <h2 id="tldr-heading" className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          TL;DR
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          WorksOffline.in is a free collection of browser tools for PDFs, photos, video, subtitles,
          notes and developer tasks. Files are processed locally on your device with WebAssembly and
          on-device AI, so nothing is uploaded. The main limit: speed and maximum file size depend on
          your device&apos;s memory and browser.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">Last updated {lastUpdatedLabel()}</p>
      </div>
    </section>
  )
}
