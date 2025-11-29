'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Server, FileCheck, WifiOff, CheckCircle2 } from 'lucide-react'

export function TrustSection() {
  const trustPoints = [
    {
      icon: WifiOff,
      title: 'Works 100% Offline',
      description: 'Once loaded, all tools work without internet. Your data stays on your device.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Server,
      title: 'No Server Contact',
      description: 'Zero network requests for processing. We have no servers to receive your data.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Eye,
      title: 'No Data Collection',
      description: 'No analytics on your files. No cookies tracking your documents.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FileCheck,
      title: 'Open Source Ready',
      description: 'Verify our claims yourself. Our code is transparent and auditable.',
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">Trust & Privacy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Trust <span className="gradient-text">WorksOffline?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We built these tools with a simple philosophy: 
              your data is yours, and it should never leave your control.
            </p>
          </motion.div>

          {/* Trust Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {trustPoints.map((point, index) => (
              <TrustCard key={index} {...point} index={index} />
            ))}
          </div>

          {/* Promise Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 md:p-12 text-center text-white overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <Lock className="w-16 h-16 mx-auto" />
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Privacy Promise
                </h3>
                <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
                  Every tool on WorksOffline.in processes your data 100% locally. 
                  We cannot see, access, or store your files — by design.
                </p>
                
                {/* Checklist */}
                <div className="flex flex-wrap justify-center gap-4">
                  <PromiseItem text="No file uploads" />
                  <PromiseItem text="No server processing" />
                  <PromiseItem text="No data retention" />
                  <PromiseItem text="No tracking" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TrustCard({ 
  icon: Icon, 
  title, 
  description, 
  color, 
  index 
}: { 
  icon: any
  title: string
  description: string
  color: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${color} mb-6`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}

function PromiseItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
      <CheckCircle2 className="w-5 h-5" />
      <span className="font-medium">{text}</span>
    </div>
  )
}
