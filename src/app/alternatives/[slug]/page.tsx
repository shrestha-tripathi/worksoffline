import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header, Footer } from '@/components'
import { alternatives, getAlternative } from '@/config/alternatives'
import { getToolById } from '@/config/tools'
import { site, lastUpdatedLabel } from '@/config/site'

export const dynamicParams = false

export function generateStaticParams() {
  return alternatives.map((a) => ({ slug: a.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getAlternative(params.slug)
  if (!a) return {}
  const url = `${site.url}/alternatives/${a.slug}/`
  return {
    title: a.title,
    description: a.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: a.title, description: a.metaDescription, url, siteName: site.name, type: 'article' },
  }
}

export default function AlternativePage({ params }: { params: { slug: string } }) {
  const a = getAlternative(params.slug)
  if (!a) notFound()
  const ourTools = a.toolIds.map((id) => getToolById(id)).filter((t): t is NonNullable<typeof t> => !!t)
  const url = `${site.url}/alternatives/${a.slug}/`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: a.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Alternatives', item: `${site.url}/alternatives/` },
        { '@type': 'ListItem', position: 3, name: a.competitor, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: a.title,
      url,
      dateModified: site.lastUpdated,
      publisher: { '@id': `${site.url}/#organization` },
    },
  ]
  const others = alternatives.filter((x) => x.slug !== a.slug).slice(0, 6)

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="container mx-auto px-4 pt-32 pb-16 max-w-3xl">
        <nav className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          <a href="/" className="hover:underline">Home</a> / <a href="/alternatives/" className="hover:underline">Alternatives</a> / {a.competitor}
        </nav>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{a.h1}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Last updated {lastUpdatedLabel()}</p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{a.intro}</p>

        <div className="grid gap-4 mb-10">
          {ourTools.map((t, i) => (
            <a key={t.id} href={t.url} target="_blank" rel="noopener" className="block rounded-2xl border border-gray-200 dark:border-gray-700 p-5 hover:border-primary-500 transition-colors">
              <div className="flex items-center gap-3">
                <t.icon className="w-6 h-6" style={{ color: t.color }} />
                <span className="font-semibold text-gray-900 dark:text-white">{t.name}</span>
                {i === 0 && <span className="text-sm text-primary-600 dark:text-primary-400">Recommended</span>}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{t.description}</p>
              <span className="inline-block mt-3 text-primary-600 dark:text-primary-400 font-medium">Open {t.name} →</span>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <section className="rounded-2xl bg-green-50 dark:bg-gray-800 p-5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Why pick ours</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              {a.whyOurs.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </section>
          <section className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Where {a.competitor} is better</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              {a.whereTheyWin.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </section>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Which should you use?</h2>
          <p className="text-gray-700 dark:text-gray-300">{a.bestFor}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">FAQ</h2>
          <div className="space-y-5">
            {a.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="font-semibold text-gray-900 dark:text-white">{f.q}</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-10">
          {a.competitor} is a trademark of its respective owner. This page is an independent comparison and is not affiliated with or endorsed by them. Feature details reflect our understanding at the time of writing.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Other comparisons</h2>
          <ul className="flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}><a href={`/alternatives/${o.slug}/`} className="text-primary-600 dark:text-primary-400 hover:underline">{o.competitor} alternative</a></li>
            ))}
          </ul>
        </section>
      </article>
      <Footer />
    </main>
  )
}
