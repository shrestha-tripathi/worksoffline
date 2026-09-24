import type { Metadata } from 'next'
import { Header, Footer } from '@/components'
import { alternatives } from '@/config/alternatives'
import { getToolById } from '@/config/tools'
import { site, lastUpdatedLabel } from '@/config/site'

export const metadata: Metadata = {
  title: 'Offline, private alternatives to popular online tools | WorksOffline.in',
  description: 'Honest comparisons of WorksOffline’s in-browser tools with iLovePDF, Smallpdf, Remove.bg, CloudConvert, Otter.ai, ColorZilla and more — including where they are better.',
  alternates: { canonical: `${site.url}/alternatives/` },
}

export default function AlternativesHub() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Offline alternatives',
    itemListElement: alternatives.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${site.url}/alternatives/${a.slug}/`, name: a.h1 })),
  }
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Offline, private alternatives to popular online tools</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          Most online converters upload your file to a server. Ours run in your browser. Each page below compares one popular service with our tool — including what the other service does better.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-10">Last updated {lastUpdatedLabel()}</p>
        <ul className="grid md:grid-cols-2 gap-4">
          {alternatives.map((a) => {
            const t = getToolById(a.toolIds[0])
            return (
              <li key={a.slug}>
                <a href={`/alternatives/${a.slug}/`} className="block h-full rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:border-primary-500 transition-colors">
                  <span className="font-semibold text-gray-900 dark:text-white">Alternative to {a.competitor}</span>
                  {t && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Our pick: {t.name}</p>}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <Footer />
    </main>
  )
}
