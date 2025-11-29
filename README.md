# WorksOffline.in - Landing Page PWA

> **Privacy-First Utility Tools Powered by WebAssembly**

A beautiful, animated landing page for the WorksOffline.in suite of privacy-first tools. All tools process data 100% locally on the user's device using WebAssembly technology.

## 🚀 Features

- **Beautiful Animations**: Smooth Framer Motion animations throughout
- **WASM Showcase**: Visual explanation of how WebAssembly enables local processing
- **Trust-Building UI**: Privacy badges, architecture diagrams, and trust indicators
- **PWA Support**: Installable as a Progressive Web App
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode Ready**: Supports system color scheme preferences
- **Extensible**: Easy to add new tools via configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router) with Static Site Generation
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **PWA**: Custom Service Worker

## 📦 Project Structure

```
landingSaaS/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles + Tailwind
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── page.tsx          # Main landing page
│   ├── components/
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Site footer
│   │   ├── HeroSection.tsx   # Hero with animated device
│   │   ├── ToolsGrid.tsx     # Grid of tool cards
│   │   ├── WasmSection.tsx   # WASM technology explainer
│   │   ├── TrustSection.tsx  # Privacy & trust section
│   │   ├── ServiceWorkerRegistration.tsx
│   │   └── index.ts          # Component exports
│   └── config/
│       └── tools.ts          # Tool definitions (EXTENSIBLE!)
├── public/
│   ├── manifest.json         # PWA manifest
│   ├── sw.js                 # Service worker
│   └── icons/                # PWA icons
└── package.json
```

## 🔧 Adding New Tools

To add a new tool, simply edit `src/config/tools.ts`:

```typescript
import { YourIcon } from 'lucide-react'

// Add to the tools array
{
  id: 'your-tool-id',
  name: 'Your Tool Name',
  tagline: 'Short description',
  description: 'Longer description of what the tool does.',
  icon: YourIcon,
  url: 'https://yourtool.worksoffline.in',
  color: '#hexcolor',
  gradient: 'from-color-500 to-color-600',
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
    'Feature 4'
  ],
  techHighlight: 'Technology used'
}
```

The landing page will automatically display your new tool in the grid!

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to the landing page directory
cd landingSaaS

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The static output will be in the `out` directory, ready to deploy to any static hosting service.

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

1. Build command: `npm run build`
2. Publish directory: `out`

## 🔐 Privacy Promise

This landing page showcases tools that:

- ✅ Process data 100% locally in the browser
- ✅ Never upload files to any server
- ✅ Use WebAssembly for near-native performance
- ✅ Work completely offline after initial load
- ✅ Don't collect or store any user data

## 🎨 Current Tools

| Tool | Description | URL |
|------|-------------|-----|
| **PresetPhoto** | Process exam photos to exact specifications | presetphoto.worksoffline.in |
| **PDF Unlocker** | Remove passwords from protected PDFs | pdfunlocker.worksoffline.in |
| **PDF Redactor** | AI-powered PII redaction | pdfredactor.worksoffline.in |
| **VyapaarPost** | WhatsApp marketing post creator | vyapaarpost.worksoffline.in |

## 📝 PWA Icons

Generate PWA icons from the SVG in `public/icons/icon.svg` using a tool like:
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- [Real Favicon Generator](https://realfavicongenerator.net/)

## 📄 License

MIT License - feel free to use and modify!

---

**Built with ❤️ for privacy-conscious users**
