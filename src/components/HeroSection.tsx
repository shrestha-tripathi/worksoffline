'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Wifi, WifiOff, Lock, Server, ServerOff, Cpu, Zap } from 'lucide-react'

interface Particle {
  id: number
  x: number
  y: number
  duration: number
  delay: number
}

export function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles - only render on client */}
        {isMounted && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full bg-primary-500/20"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
          >
            <WifiOff className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-primary-600">100% Offline • Zero Server Contact</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white">Your Data </span>
            <span className="gradient-text">Never Leaves</span>
            <br />
            <span className="text-gray-900 dark:text-white">Your Device</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Privacy-first utility tools powered by WebAssembly. 
            Process PDFs, images, and more — everything happens locally in your browser.
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <TrustBadge icon={ServerOff} text="No Server Uploads" />
            <TrustBadge icon={Lock} text="End-to-End Privacy" />
            <TrustBadge icon={Cpu} text="WASM Powered" />
            <TrustBadge icon={Zap} text="Lightning Fast" />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="#tools"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              Explore Secure Tools
            </a>
          </motion.div>
        </div>

        {/* Animated Device Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative max-w-2xl mx-auto"
        >
          <DeviceAnimation />
        </motion.div>
      </div>
    </section>
  )
}

function TrustBadge({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <Icon className="w-5 h-5 text-green-500" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{text}</span>
    </div>
  )
}

function DeviceAnimation() {
  return (
    <div className="relative">
      {/* Device Frame */}
      <div className="relative bg-gray-900 rounded-3xl p-2 device-glow">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 min-h-[300px] flex items-center justify-center">
          {/* Screen Content */}
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="inline-block"
            >
              <Shield className="w-24 h-24 text-green-500 shield-pulse" />
            </motion.div>
            <p className="text-white font-semibold mt-4">Processing Locally</p>
            <p className="text-gray-400 text-sm">Your data stays here</p>
          </div>

          {/* Data Flow Animation - showing data NOT going to server */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
            {/* Local processing circle */}
            <motion.circle
              cx="200"
              cy="150"
              r="80"
              fill="none"
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Blocked server connection */}
            <motion.line
              x1="200"
              y1="50"
              x2="200"
              y2="10"
              stroke="rgba(239, 68, 68, 0.5)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 bg-red-500 text-white p-3 rounded-xl shadow-lg"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ServerOff className="w-6 h-6" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-xl shadow-lg"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <Lock className="w-6 h-6" />
      </motion.div>
    </div>
  )
}
