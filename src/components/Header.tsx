'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, Download, Github, WifiOff } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white">WorksOffline</span>
                <span className="text-primary-500">.in</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#tools" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                Tools
              </a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                How It Works
              </a>
              <a href="#trust" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                Privacy
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium text-green-600">100% Offline</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <a
                href="#tools"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Tools
              </a>
              <a
                href="#how-it-works"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#trust"
                className="block text-gray-600 dark:text-gray-300 hover:text-primary-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy
              </a>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">100% Offline Processing</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
