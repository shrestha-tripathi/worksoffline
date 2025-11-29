import { LucideIcon } from 'lucide-react'
import { 
  Image, 
  FileKey, 
  ShieldCheck, 
  Store,
  FileText,
  Camera,
  Lock,
  Megaphone
} from 'lucide-react'

export interface Tool {
  id: string
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  url: string
  color: string
  gradient: string
  features: string[]
  techHighlight: string
}

export const tools: Tool[] = [
  {
    id: 'presetphoto',
    name: 'PresetPhoto',
    tagline: 'Exam Photo Processor',
    description: 'Process photos and signatures for government exam applications. Crop, resize, and compress to exact specifications required by exam portals.',
    icon: Camera,
    url: 'https://presetphoto.worksoffline.in',
    color: '#22c55e',
    gradient: 'from-green-500 to-emerald-600',
    features: [
      'Precise KB size limiter',
      'Auto date stamp for photos',
      'Support for SSC, IBPS, UPSC & more',
      'Custom dimensions available'
    ],
    techHighlight: 'Canvas API + WASM Compression'
  },
  {
    id: 'pdfunlocker',
    name: 'PDF Unlocker',
    tagline: 'Remove PDF Passwords',
    description: 'Remove passwords from protected PDF files instantly. Unlock encrypted PDFs without uploading to any server.',
    icon: FileKey,
    url: 'https://pdfunlocker.worksoffline.in',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    features: [
      'Remove owner & user passwords',
      'Support for all encryption types',
      'Handles large PDF files',
      'No file size limits'
    ],
    techHighlight: 'PDF.js + WASM Decryption'
  },
  {
    id: 'pdfredactor',
    name: 'PDF Redactor',
    tagline: 'AI-Powered PII Redaction',
    description: 'Automatically detect and redact Personally Identifiable Information (PII) from PDF documents using AI that runs entirely in your browser.',
    icon: ShieldCheck,
    url: 'https://pdfredactor.worksoffline.in',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-600',
    features: [
      'AI-powered entity detection',
      'Detects names, emails, phones, SSN',
      'Custom regex patterns',
      'GDPR & compliance ready'
    ],
    techHighlight: 'Transformers.js + ONNX Runtime'
  },
  {
    id: 'vyapaarpost',
    name: 'VyapaarPost',
    tagline: 'WhatsApp Marketing Creator',
    description: 'Create beautiful marketing posts in Indian languages for WhatsApp. Professional templates for offers, festivals, and greetings.',
    icon: Megaphone,
    url: 'https://vyapaarpost.worksoffline.in',
    color: '#f97316',
    gradient: 'from-orange-500 to-amber-600',
    features: [
      'Multi-language support (Hindi, Tamil, etc.)',
      'Festival & offer templates',
      'Customizable designs',
      'Direct WhatsApp sharing'
    ],
    techHighlight: 'Canvas API + Custom Fonts'
  }
]

// Function to easily add new tools
export function addTool(tool: Tool): void {
  tools.push(tool)
}

// Function to get tool by ID
export function getToolById(id: string): Tool | undefined {
  return tools.find(t => t.id === id)
}

// Function to get all tools
export function getAllTools(): Tool[] {
  return tools
}
