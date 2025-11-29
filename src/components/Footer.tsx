'use client'

import { motion } from 'framer-motion'
import { Heart, Github, Twitter, WifiOff, Shield, Mail } from 'lucide-react'
import { tools } from '@/config/tools'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-xl">WorksOffline</span>
                <span className="text-primary-400">.in</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Privacy-first utility tools powered by WebAssembly. 
              Your data never leaves your device — that&apos;s our promise.
            </p>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 inline-flex">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">100% Client-Side Processing</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Tools</h3>
            <ul className="space-y-3">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Privacy</h3>
            <ul className="space-y-3">
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-primary-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#trust" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Our Promise
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} WorksOffline.in. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for privacy-conscious users
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
