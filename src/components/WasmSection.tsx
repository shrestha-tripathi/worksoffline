'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Shield, Globe, Zap, Lock, Eye, Database, Server } from 'lucide-react'

export function WasmSection() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <BinaryRain />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Powered by WebAssembly</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How We Achieve <span className="gradient-text">True Privacy</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              WebAssembly (WASM) enables us to run complex processing directly in your browser 
              at near-native speed — no server required.
            </p>
          </motion.div>

          {/* Architecture Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <ArchitectureDiagram />
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TechFeature
              icon={Cpu}
              title="WASM Runtime"
              description="Near-native performance in browser"
              delay={0}
            />
            <TechFeature
              icon={Lock}
              title="Zero Upload"
              description="Files never leave your device"
              delay={0.1}
            />
            <TechFeature
              icon={Zap}
              title="Lightning Fast"
              description="Process in milliseconds"
              delay={0.2}
            />
            <TechFeature
              icon={Globe}
              title="Works Offline"
              description="No internet needed after load"
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function TechFeature({ 
  icon: Icon, 
  title, 
  description, 
  delay 
}: { 
  icon: any
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-primary-500/50 transition-colors"
    >
      <Icon className="w-10 h-10 text-primary-400 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  )
}

function ArchitectureDiagram() {
  return (
    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Your Device */}
        <motion.div 
          className="flex-1 max-w-sm"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Your Device</h4>
                <p className="text-green-400 text-xs">100% Local Processing</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <ProcessStep icon={Database} text="Your Files" color="text-blue-400" />
              <motion.div 
                className="flex justify-center"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-purple-400" />
              </motion.div>
              <ProcessStep icon={Cpu} text="WASM Processing" color="text-purple-400" />
              <motion.div 
                className="flex justify-center"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                <div className="w-0.5 h-6 bg-gradient-to-b from-purple-400 to-green-400" />
              </motion.div>
              <ProcessStep icon={Eye} text="Result Preview" color="text-green-400" />
            </div>
          </div>
        </motion.div>

        {/* Blocked Connection */}
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-dashed border-red-500/50 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-0.5 bg-red-500 rotate-45" />
              </div>
            </motion.div>
          </div>
          <span className="text-red-400 text-sm font-medium">No Data Transfer</span>
        </motion.div>

        {/* External Server (Crossed Out) */}
        <motion.div 
          className="flex-1 max-w-sm opacity-40"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600 relative">
            {/* Crossed out overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-full h-0.5 bg-red-500 rotate-12" />
              <div className="absolute w-full h-0.5 bg-red-500 -rotate-12" />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <h4 className="text-gray-400 font-semibold">External Server</h4>
                <p className="text-gray-500 text-xs">Not Used</p>
              </div>
            </div>
            
            <div className="space-y-2 text-gray-500 text-sm">
              <p>❌ No file uploads</p>
              <p>❌ No data collection</p>
              <p>❌ No server processing</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ProcessStep({ icon: Icon, text, color }: { icon: any; text: string; color: string }) {
  return (
    <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg px-4 py-3">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-white text-sm font-medium">{text}</span>
    </div>
  )
}

function BinaryRain() {
  const columns = 20
  const [isMounted, setIsMounted] = useState(false)
  const [rainData, setRainData] = useState<{ duration: number; delay: number; digits: string[] }[]>([])

  useEffect(() => {
    setIsMounted(true)
    const data = [...Array(columns)].map(() => ({
      duration: 10 + Math.random() * 5,
      delay: Math.random() * 5,
      digits: [...Array(20)].map(() => (Math.random() > 0.5 ? '1' : '0')),
    }))
    setRainData(data)
  }, [])

  if (!isMounted) {
    return <div className="absolute inset-0 overflow-hidden" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {rainData.map((column, i) => (
        <motion.div
          key={i}
          className="absolute text-green-500 font-mono text-xs"
          style={{ left: `${(i / columns) * 100}%` }}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: column.duration,
            repeat: Infinity,
            delay: column.delay,
          }}
        >
          {column.digits.map((digit, j) => (
            <div key={j}>{digit}</div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}
