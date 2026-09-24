import { tools } from '@/config/tools'

type TextResult = { content: { type: 'text'; text: string }[] }
type WebMcpTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (args: Record<string, unknown>) => Promise<TextResult>
}

const text = (t: string): TextResult => ({ content: [{ type: 'text', text: t }] })

const STOP = new Set(['a', 'an', 'the', 'to', 'of', 'for', 'and', 'or', 'in', 'on', 'my', 'i', 'want', 'need', 'how', 'can', 'with', 'from', 'into', 'file', 'files', 'tool', 'online', 'free'])

function tokens(s: string): string[] {
  return s.toLowerCase().split(/[^a-z0-9+]+/).filter((w) => w.length > 1 && !STOP.has(w))
}

export function findTools(task: string, limit = 3) {
  const q = tokens(task)
  return tools
    .map((t) => {
      const name = tokens(`${t.name} ${t.id} ${t.tagline}`)
      const body = tokens(`${t.description} ${t.features.join(' ')}`)
      let score = 0
      for (const w of q) {
        const stem = w.replace(/(ing|es|s)$/, '')
        if (name.some((n) => n.startsWith(stem))) score += 3
        if (body.some((n) => n.startsWith(stem))) score += 1
      }
      return { t, score }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ t }) => ({ name: t.name, url: t.url, tagline: t.tagline, description: t.description }))
}

const webMcpTools: WebMcpTool[] = [
  {
    name: 'find_tool',
    description: 'Find the best WorksOffline in-browser tool(s) for a task (e.g. "convert HEIC to JPG", "unlock a PDF"). Returns names, URLs and descriptions. All tools process files locally.',
    inputSchema: {
      type: 'object',
      properties: { task: { type: 'string', description: 'What the user wants to do' } },
      required: ['task'],
    },
    async execute(args) {
      const task = String(args?.task ?? '').trim()
      if (!task) return text('Please provide a task, e.g. "compress a video for WhatsApp".')
      const hits = findTools(task)
      if (!hits.length) return text(`No close match for "${task}". Call list_tools to see all ${tools.length} tools.`)
      return text(hits.map((h) => `${h.name} — ${h.tagline}\n${h.url}\n${h.description}`).join('\n\n'))
    },
  },
  {
    name: 'list_tools',
    description: 'List every WorksOffline privacy-first browser tool with its URL and a one-line description.',
    inputSchema: { type: 'object', properties: {} },
    async execute() {
      return text(tools.map((t) => `- ${t.name}: ${t.tagline} — ${t.url}`).join('\n'))
    },
  },
]

let registered = false

export function registerWebMcp(): void {
  if (registered || typeof navigator === 'undefined') return
  try {
    const mc = (navigator as unknown as { modelContext?: Record<string, unknown> }).modelContext
    if (!mc) return
    if (typeof mc.registerTool === 'function') {
      for (const t of webMcpTools) (mc.registerTool as (t: WebMcpTool) => void).call(mc, t)
      registered = true
    } else if (typeof mc.provideContext === 'function') {
      ;(mc.provideContext as (c: { tools: WebMcpTool[] }) => void).call(mc, { tools: webMcpTools })
      registered = true
    }
  } catch {
    /* progressive enhancement — never throw */
  }
}
