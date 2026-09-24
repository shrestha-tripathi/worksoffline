import { Header, Footer, HeroSection, ToolsGrid, WasmSection, TrustSection } from '@/components'
import { TldrSection } from '@/components/TldrSection'
import { tools } from '@/config/tools'
import { site } from '@/config/site'

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'WorksOffline tools',
  itemListElement: tools.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'WebApplication',
      name: t.name,
      url: t.url,
      description: t.description,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any (web browser)',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${site.url}/#organization` },
    },
  })),
}

const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  dateModified: site.lastUpdated,
  publisher: { '@id': `${site.url}/#organization` },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      <HeroSection />
      <TldrSection />
      
      {/* Tools Grid */}
      <ToolsGrid />
      
      {/* WASM Technology Section */}
      <section id="how-it-works">
        <WasmSection />
      </section>
      
      {/* Trust Section */}
      <section id="trust">
        <TrustSection />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
