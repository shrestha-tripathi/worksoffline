import re,sys
s=open('src/config/tools.ts').read()
tools=re.findall(r"name: '([^']+)',\s*tagline: '([^']+)',\s*description: '([^']+)',[\s\S]*?url: '([^']+)'",s)
alts=[]
try:
  a=open('src/config/alternatives.ts').read()
  alts=re.findall(r"slug: '([^']+)',\s*competitor: '([^']+)'",a)
except FileNotFoundError: pass
head="""# WorksOffline.in

> WorksOffline.in is a free hub of privacy-first browser tools (PDF, photos, video, subtitles, notes, developer utilities) that process files locally on your device with WebAssembly and on-device AI — no uploads.

## What it is
A portfolio of independent single-purpose web apps. Each tool runs client-side in the browser; files are not sent to a server for processing. Most work offline after the first load.

## Privacy
Processing happens in your browser. The hub site uses Google Analytics for page-view statistics only; your files are never part of that.

## Limits
Speed and maximum file size depend on your device's memory and browser. Some AI tools (captions, notes chat) need WebGPU and download a model on first use. Some tools rely on newer browser APIs (EyeDropper, Document Picture-in-Picture) that are Chromium-only at the time of writing.

## Pages
- [WorksOffline.in home](https://worksoffline.in/): Directory of all tools.
"""
if alts: head+="- [Offline alternatives](https://worksoffline.in/alternatives/): Honest comparisons of our offline tools with popular online services.\n"
head+="\n## Tools\n"+''.join(f"- [{n}]({u}): {t} — {d}\n" for n,t,d,u in tools)
if alts:
  head+="\n## Alternatives\n"+''.join(f"- [Offline alternative to {c}](https://worksoffline.in/alternatives/{sl}/): Private, in-browser alternative to {c}, with a fair comparison.\n" for sl,c in alts)
open('public/llms.txt','w').write(head)
full=head+"""
## FAQ
Q: Are the tools free?
A: Yes. All tools are free to use with no signup.

Q: Do my files get uploaded?
A: No. Files are processed in your browser on your own device. Nothing is uploaded for processing.

Q: Do the tools work offline?
A: Most do after the first visit, because the app and its WebAssembly/AI models are cached by the browser.

Q: What are the limits?
A: Large files depend on your device's RAM. AI features may need WebGPU and a one-time model download. Some tools need a Chromium-based browser for APIs like EyeDropper or Document Picture-in-Picture.

Q: Can AI agents use the site?
A: Yes. worksoffline.in exposes WebMCP tools (find_tool, list_tools) when the browser provides navigator.modelContext.
"""
open('public/llms-full.txt','w').write(full)
print(len(tools),len(alts))
