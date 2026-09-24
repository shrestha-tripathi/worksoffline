export const site = {
  name: 'WorksOffline.in',
  shortName: 'WorksOffline',
  url: 'https://worksoffline.in',
  description:
    'Free, privacy-first utility tools that run in your browser. Process PDFs, images, video, subtitles and more locally on your device — no uploads.',
  github: 'https://github.com/shrestha-tripathi',
  /** Single freshness constant — shown on landing pages and used as dateModified. */
  lastUpdated: '2026-09-24',
}

export function lastUpdatedLabel(): string {
  const d = new Date(site.lastUpdated + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icons/icon.svg`,
  sameAs: [site.github],
}
