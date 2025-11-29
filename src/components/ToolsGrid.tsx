'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react'
import { tools, type Tool } from '@/config/tools'

export function ToolsGrid() {
  return (
    <section id="tools" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-medium text-accent-600">Utility Tools</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy-First Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Each tool processes your data entirely on your device. 
            No uploads, no servers, no compromises.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <ToolCard key={tool.id} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon

  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="tool-card group relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Background Gradient on Hover */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Icon */}
      <div 
        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} mb-6`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        {tool.name}
        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </h3>
      
      <p className="text-sm font-medium mb-3" style={{ color: tool.color }}>
        {tool.tagline}
      </p>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {tool.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {tool.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tool.color }} />
            {feature}
          </li>
        ))}
      </ul>

      {/* Tech Badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
          {tool.techHighlight}
        </span>
        
        <span className="flex items-center gap-1 text-sm font-medium" style={{ color: tool.color }}>
          Open Tool
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </motion.a>
  )
}
