'use client'

import { useEffect } from 'react'
import { registerWebMcp } from '@/lib/webmcp'

/** Registers WebMCP tools when navigator.modelContext exists; otherwise a no-op. */
export function WebMcpRegistration() {
  useEffect(() => {
    registerWebMcp()
  }, [])
  return null
}
