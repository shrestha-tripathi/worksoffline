import { Header, Footer, HeroSection, ToolsGrid, WasmSection, TrustSection } from '@/components'

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
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
