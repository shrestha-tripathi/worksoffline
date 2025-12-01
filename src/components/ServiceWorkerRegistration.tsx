'use client'

import { useEffect } from 'react'

/**
 * Service Worker Registration Component
 * 
 * Features:
 * - Network-first caching strategy (always gets latest content when online)
 * - Automatic updates when new version is available
 * - Offline fallback support
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker after page load
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js')
          console.log('[App] SW registered:', registration.scope)

          // Check for updates immediately
          registration.update()

          // Check for updates periodically (every 5 minutes)
          setInterval(() => {
            registration.update()
          }, 5 * 60 * 1000)

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            console.log('[App] New SW installing...')

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, tell SW to skip waiting
                  console.log('[App] New content available, activating...')
                  newWorker.postMessage({ type: 'SKIP_WAITING' })
                }
              })
            }
          })

          // Reload page when new SW takes control
          let refreshing = false
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
              refreshing = true
              console.log('[App] New SW active, reloading for latest content...')
              window.location.reload()
            }
          })

        } catch (error) {
          console.log('[App] SW registration failed:', error)
        }
      })
    }
  }, [])

  return null
}
