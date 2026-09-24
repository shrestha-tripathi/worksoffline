export interface AlternativeFaq {
  q: string
  a: string
}

export interface Alternative {
  slug: string
  competitor: string
  /** tools.ts ids this page recommends (first = primary) */
  toolIds: string[]
  title: string
  metaDescription: string
  h1: string
  intro: string
  whyOurs: string[]
  whereTheyWin: string[]
  bestFor: string
  faqs: AlternativeFaq[]
}

export const alternatives: Alternative[] = [
  {
    slug: 'ilovepdf',
    competitor: 'iLovePDF',
    toolIds: ['pdfhub', 'pdfunlocker', 'pdfredactor'],
    title: 'Offline, private iLovePDF alternative — merge, split, sign PDFs in your browser',
    metaDescription: 'A free iLovePDF alternative that edits PDFs in your browser. Merge, split, OCR, sign, redact and password-protect without uploading. Honest comparison inside.',
    h1: 'An offline, private alternative to iLovePDF',
    intro: 'iLovePDF is one of the most popular online PDF suites. It works by uploading your document to its servers, processing it there and letting you download the result. PDFHub does the everyday jobs — merge, split, OCR, sign, redact, add a password, PDF to images and images to PDF — with the file staying on your device the whole time. For password removal and automatic PII redaction we have two dedicated tools.',
    whyOurs: [
      'Files are processed in your browser; they are not uploaded for processing.',
      'Works offline once the page has loaded, which is useful on patchy connections.',
      'No account needed and no daily task quota.',
      'Separate focused tools for unlocking PDFs (PDF Unlocker) and AI-assisted PII redaction (PDF Redactor).',
    ],
    whereTheyWin: [
      'iLovePDF has a wider set of tools, including high-quality PDF ↔ Word/Excel/PowerPoint conversion, which we do not offer.',
      'It has desktop and mobile apps plus cloud integrations (Google Drive, Dropbox).',
      'Server-side processing means very large jobs do not depend on your device’s RAM.',
      'It offers team plans and an API for businesses.',
    ],
    bestFor: 'Pick PDFHub for confidential documents (ID proofs, contracts, bank statements) where uploading is a concern. Pick iLovePDF when you need Office format conversion or cloud integrations.',
    faqs: [
      { q: 'Is PDFHub a full replacement for iLovePDF?', a: 'For merge, split, OCR, sign, redact, password-protect and PDF/image conversion, yes. It does not convert PDF to Word, Excel or PowerPoint, which iLovePDF does.' },
      { q: 'Do my PDFs get uploaded?', a: 'No. PDFHub processes files with JavaScript and WebAssembly inside your browser tab. The file is not sent to a server for processing.' },
      { q: 'Is there a file size limit?', a: 'There is no fixed limit, but very large PDFs are limited by your device’s memory. On a typical laptop, documents of a few hundred pages work fine.' },
      { q: 'Can I remove a PDF password?', a: 'Yes — use PDF Unlocker. If the PDF needs a password to open, you must know it; the tool removes the protection so you do not have to type it again.' },
    ],
  },
  {
    slug: 'smallpdf',
    competitor: 'Smallpdf',
    toolIds: ['pdfhub', 'pdfunlocker'],
    title: 'Offline, private Smallpdf alternative — no upload, no task limit',
    metaDescription: 'A free Smallpdf alternative that works in your browser. Merge, split, sign and OCR PDFs locally with no upload and no daily limit. Fair comparison of both.',
    h1: 'An offline, private alternative to Smallpdf',
    intro: 'Smallpdf is a polished online PDF toolkit. Its free tier limits how many tasks you can run, and like most online converters it processes your files on its servers. PDFHub runs in your browser: open a PDF, do the job, save the result — without the file leaving your computer and without a task counter.',
    whyOurs: [
      'No upload: processing happens locally in your browser tab.',
      'No free-tier task limit or forced signup.',
      'Keeps working offline after the first load.',
      'OCR, redaction and signing are included, not paywalled.',
    ],
    whereTheyWin: [
      'Smallpdf has more tools, including PDF compression and conversion to and from Office formats.',
      'Its e-signature workflow can request signatures from other people by email; ours only signs your own copy.',
      'It syncs documents across devices and offers mobile apps.',
      'Its interface is very refined and has team features.',
    ],
    bestFor: 'Use PDFHub for quick private edits on sensitive files. Use Smallpdf if you need to send documents out for signature or convert to Word.',
    faqs: [
      { q: 'Does PDFHub compress PDFs like Smallpdf?', a: 'Not at the moment. PDFHub focuses on merge, split, OCR, sign, redact, password protection and image conversion.' },
      { q: 'Can I sign a PDF without uploading it?', a: 'Yes. PDFHub lets you draw or place a signature on the page locally and download the signed file.' },
      { q: 'Is it really free?', a: 'Yes. There is no signup and no daily task limit.' },
      { q: 'Does it work on mobile?', a: 'It runs in modern mobile browsers, but large documents are more comfortable on a laptop because of memory limits.' },
    ],
  },
  {
    slug: 'remove-bg',
    competitor: 'Remove.bg',
    toolIds: ['magicphotoeraser'],
    title: 'Private Remove.bg alternative? What MagicPhotoEraser can and can’t do',
    metaDescription: 'Looking for a private alternative to Remove.bg? MagicPhotoEraser removes objects, people and text from photos in your browser. Honest note: it is not a one-click background remover.',
    h1: 'A private, in-browser alternative to Remove.bg (with an honest caveat)',
    intro: 'Remove.bg is excellent at one thing: automatically cutting the subject out of a photo and making the background transparent. We want to be upfront — we do not have a one-click background remover. What we have is MagicPhotoEraser, which removes unwanted objects, people, text or watermarks from a photo with AI that runs in your browser. If your goal is “clean up the background” rather than “make it transparent”, it may be what you need.',
    whyOurs: [
      'The photo stays on your device; the AI model runs locally.',
      'Full-resolution downloads with no credits and no watermark.',
      'You choose exactly what to erase with a brush.',
      'No account needed.',
    ],
    whereTheyWin: [
      'Remove.bg does fully automatic subject cut-outs with transparent PNG output — we do not.',
      'It has an API, a Photoshop plugin and batch processing for e-commerce catalogues.',
      'Its edge detection on hair and fur is very good.',
      'It can place the subject on a new background colour or image.',
    ],
    bestFor: 'Use Remove.bg for transparent product cut-outs. Use MagicPhotoEraser to remove a photobomber, a date stamp or clutter from a private photo without uploading it.',
    faqs: [
      { q: 'Can MagicPhotoEraser make a background transparent?', a: 'No. It fills erased areas with plausible content (inpainting). It does not produce transparent cut-outs.' },
      { q: 'Are my photos uploaded?', a: 'No. The model is downloaded once and runs in your browser, so the photo is processed on your device.' },
      { q: 'Why is the first use slower?', a: 'The AI model has to download the first time. After that it is cached by your browser.' },
      { q: 'Is there a watermark?', a: 'No. Downloads are watermark-free.' },
    ],
  },
  {
    slug: 'cloudconvert',
    competitor: 'CloudConvert',
    toolIds: ['compressvideofile', 'heicpix', 'pdfhub'],
    title: 'Offline, private CloudConvert alternative for video, HEIC and PDF',
    metaDescription: 'A private alternative to CloudConvert for common jobs: compress and trim video, convert HEIC to JPG/PNG/WebP/AVIF, and turn images into PDFs — all in your browser.',
    h1: 'An offline, private alternative to CloudConvert',
    intro: 'CloudConvert supports hundreds of formats by converting files on its servers. That breadth is hard to beat. But most people only need a handful of conversions, and for those our tools do the work in your browser: Compress Video File for MP4/MOV/WebM/MP3/M4A, HEICPix for iPhone photos, and PDFHub for images ↔ PDF.',
    whyOurs: [
      'Your files are not uploaded — useful for personal videos and photos.',
      'No conversion-minute quota on the free tier.',
      'Batch HEIC conversion with no cap.',
      'Works offline after the page loads.',
    ],
    whereTheyWin: [
      'CloudConvert supports far more formats (documents, e-books, CAD, archives, fonts).',
      'Server-side conversion is faster for very long videos on weak devices.',
      'It has a mature API and integrations for automation.',
      'Fine-grained codec options for advanced users.',
    ],
    bestFor: 'Use our tools for everyday video, photo and PDF conversions on private files. Use CloudConvert for unusual formats or automated pipelines.',
    faqs: [
      { q: 'Which formats do your tools cover?', a: 'Video/audio: MP4, MOV, WebM, MP3, M4A (Compress Video File). Photos: HEIC to JPG, PNG, WebP, AVIF (HEICPix). Documents: images to PDF and PDF to images (PDFHub).' },
      { q: 'Is browser-based video compression slower?', a: 'It can be, because it uses your own CPU. Short clips are quick; long 4K videos may take a while on older machines.' },
      { q: 'Do files leave my device?', a: 'No. Conversion runs locally with WebAssembly.' },
    ],
  },
  {
    slug: 'freeconvert',
    competitor: 'FreeConvert',
    toolIds: ['compressvideofile', 'heicpix'],
    title: 'Offline, private FreeConvert alternative — compress video and convert HEIC locally',
    metaDescription: 'A FreeConvert alternative that compresses video and converts HEIC photos in your browser with no upload, no ads and no signup. See where each one is better.',
    h1: 'An offline, private alternative to FreeConvert',
    intro: 'FreeConvert is a popular ad-supported online converter with a file-size cap on its free plan. Two of its most common uses — shrinking a video to fit WhatsApp, email or Discord, and converting iPhone HEIC photos — are exactly what Compress Video File and HEICPix do, locally in your browser.',
    whyOurs: [
      'No upload and no waiting in a server queue.',
      'The free-plan file-size cap does not apply — the practical limit is your device’s memory.',
      'Target a specific output size and trim start/end in one step.',
      'No watermark and no signup.',
    ],
    whereTheyWin: [
      'FreeConvert handles many more file types, including documents and archives.',
      'It can import from URLs, Google Drive and Dropbox.',
      'Heavy conversions do not use your own CPU or battery.',
      'More advanced encoder settings are exposed.',
    ],
    bestFor: 'Use Compress Video File and HEICPix for private clips and photos. Use FreeConvert for exotic formats or when you are on a very low-powered device.',
    faqs: [
      { q: 'Can I compress a video to a specific size?', a: 'Yes. Compress Video File lets you target an output size, which is handy for platform upload limits.' },
      { q: 'Can I convert many HEIC photos at once?', a: 'Yes. HEICPix supports unlimited batch conversion to JPG, PNG, WebP or AVIF.' },
      { q: 'Is there a watermark?', a: 'No.' },
    ],
  },
  {
    slug: 'veed-subtitles',
    competitor: 'VEED subtitles',
    toolIds: ['subtitletranslatorfree', 'livecaptionit'],
    title: 'Private alternative to VEED for translating subtitle files',
    metaDescription: 'Translate SRT and VTT subtitle files into 20+ languages in your browser with no upload. An honest comparison with VEED’s online subtitle tools.',
    h1: 'An offline, private alternative to VEED’s subtitle tools',
    intro: 'VEED is an online video editor with auto-subtitles, translation and burned-in caption styling. If you already have an SRT or VTT file and just need it in another language, SubtitleTranslatorFree translates it on your device and keeps the timings intact. For live captions of anything playing in your browser, LiveCaptionIt runs Whisper locally.',
    whyOurs: [
      'Subtitle files are translated on your device — no upload.',
      'No watermark, no export limit, no signup.',
      'Keeps original cue timings, so the file drops straight back into your player or editor.',
      'Works with SRT and VTT.',
    ],
    whereTheyWin: [
      'VEED generates subtitles from a video file automatically; SubtitleTranslatorFree needs an existing subtitle file.',
      'It burns stylised captions into the video and has a full timeline editor.',
      'Cloud translation models can be more fluent for some language pairs.',
      'Team collaboration and brand kits.',
    ],
    bestFor: 'Use SubtitleTranslatorFree to translate an existing subtitle file privately. Use VEED when you need to create, style and burn in captions.',
    faqs: [
      { q: 'Can it create subtitles from a video?', a: 'No, it translates existing SRT/VTT files. For live on-screen captions of browser audio, try LiveCaptionIt.' },
      { q: 'Which languages are supported?', a: 'More than 20 languages, using translation models that run in your browser.' },
      { q: 'Will the timings change?', a: 'No. Only the text is translated; cue numbers and timestamps are preserved.' },
    ],
  },
  {
    slug: 'otter-ai-live-captions',
    competitor: 'Otter.ai live captions',
    toolIds: ['livecaptionit'],
    title: 'Private Otter.ai alternative for live captions — Whisper in your browser',
    metaDescription: 'Live captions for any browser tab — YouTube, lectures, web meetings — in a floating window. Whisper runs locally so audio never uploads. Compared fairly with Otter.ai.',
    h1: 'An offline, private alternative to Otter.ai live captions',
    intro: 'Otter.ai is a meeting assistant: it joins calls, transcribes them in the cloud, and produces searchable notes and summaries. LiveCaptionIt is narrower. It shows live captions for any audio your browser can hear in a floating picture-in-picture window, and the speech model (Whisper) runs on your device via WebGPU.',
    whyOurs: [
      'Audio is transcribed locally and never uploaded.',
      'Works on any tab — videos, podcasts, lectures, browser-based meetings.',
      'Captions float over other apps in a picture-in-picture window.',
      'Free, with no monthly minute cap.',
    ],
    whereTheyWin: [
      'Otter saves full transcripts with speaker labels, search and AI summaries; LiveCaptionIt is for live viewing.',
      'Otter can join Zoom, Meet and Teams calls as a bot.',
      'It has mobile apps and works with microphone audio in person.',
      'Cloud models are usually faster on low-end hardware.',
    ],
    bestFor: 'Use LiveCaptionIt to follow along with audio privately in real time. Use Otter when you need stored meeting notes and summaries.',
    faqs: [
      { q: 'What does it need to run?', a: 'A browser with WebGPU (recent Chrome or Edge on desktop works best). The Whisper model downloads once on first use.' },
      { q: 'Does my audio leave my device?', a: 'No. Transcription runs locally in your browser.' },
      { q: 'Can it caption desktop apps outside the browser?', a: 'It captions audio your browser can capture, such as a shared tab. Desktop-app audio depends on what your browser lets you share.' },
    ],
  },
  {
    slug: 'colorzilla',
    competitor: 'ColorZilla',
    toolIds: ['screencolorpicker'],
    title: 'ColorZilla alternative with no extension — pick colors from your whole screen',
    metaDescription: 'Pick any color from anywhere on your screen — other apps, PDFs, videos — without installing a browser extension. Honest comparison with ColorZilla.',
    h1: 'A no-install, private alternative to ColorZilla',
    intro: 'ColorZilla is a long-standing browser extension with an eyedropper, a gradient generator and CSS tools. Screen Color Picker needs no extension: it uses the browser’s built-in EyeDropper API, so you can pick colours from anywhere on your screen, including other apps and other monitors.',
    whyOurs: [
      'No extension to install, so no extension permissions on your pages.',
      'Picks colours outside the browser, not just from web pages.',
      'HEX, RGB and HSL output with a colour history.',
      'Nothing is sent to a server.',
    ],
    whereTheyWin: [
      'ColorZilla includes a CSS gradient generator and a page colour analyser.',
      'It is available in Firefox; the EyeDropper API is Chromium-only at the time of writing.',
      'One-click access from the toolbar without opening a tab.',
      'Can inspect the element under the cursor.',
    ],
    bestFor: 'Use Screen Color Picker in Chrome or Edge for quick picks from anywhere. Use ColorZilla in Firefox or when you want the gradient tools.',
    faqs: [
      { q: 'Which browsers are supported?', a: 'Chromium-based browsers such as Chrome, Edge, Brave and Opera on desktop. Firefox and Safari do not support the EyeDropper API at the time of writing.' },
      { q: 'Can it pick colours from other apps?', a: 'Yes. The EyeDropper API lets you pick any pixel on your screen.' },
      { q: 'Do I need to install anything?', a: 'No. It is a web page.' },
    ],
  },
  {
    slug: 'cleanup-pictures',
    competitor: 'Cleanup.pictures',
    toolIds: ['magicphotoeraser'],
    title: 'Private Cleanup.pictures alternative — erase objects without uploading',
    metaDescription: 'Remove objects, people, text or watermarks from photos with AI that runs in your browser. No upload, no signup, no watermark. Fair comparison with Cleanup.pictures.',
    h1: 'An offline, private alternative to Cleanup.pictures',
    intro: 'Cleanup.pictures popularised brush-to-erase inpainting on the web, running the model on its servers. MagicPhotoEraser does the same kind of job, but the AI model runs inside your browser, so the photo stays on your device.',
    whyOurs: [
      'The photo is processed locally — nothing is uploaded.',
      'No watermark and no resolution cap on downloads.',
      'Works offline once the model is cached.',
      'No account.',
    ],
    whereTheyWin: [
      'Server-side models can produce cleaner fills on large, complex areas.',
      'It is faster on low-end phones because your device does not do the work.',
      'It offers an API and higher-resolution Pro models.',
    ],
    bestFor: 'Use MagicPhotoEraser for private photos (family, documents, ID). Use Cleanup.pictures when you need the strongest fill quality on large areas.',
    faqs: [
      { q: 'How good is in-browser inpainting?', a: 'Very good for small to medium objects like people in the background, text or blemishes. Large complex areas may need a couple of passes.' },
      { q: 'Are photos uploaded?', a: 'No. The model runs in your browser.' },
      { q: 'Is it free?', a: 'Yes, with no watermark.' },
    ],
  },
  {
    slug: 'heictojpg',
    competitor: 'HEICtoJPG.com',
    toolIds: ['heicpix'],
    title: 'HEICtoJPG.com alternative — convert HEIC without uploading',
    metaDescription: 'Convert iPhone HEIC photos to JPG, PNG, WebP or AVIF in your browser with unlimited batch and no upload. Honest comparison with HEICtoJPG.com.',
    h1: 'An offline, private alternative to HEICtoJPG.com',
    intro: 'HEICtoJPG.com is a simple, well-known converter that uploads your iPhone photos, converts them on a server and gives you JPGs back. HEICPix converts HEIC files inside your browser, so personal photos never leave your device, and it can output JPG, PNG, WebP or AVIF.',
    whyOurs: [
      'No upload — photos are converted on your device.',
      'Unlimited batch with no per-session cap.',
      'Four output formats: JPG, PNG, WebP and AVIF.',
      'Works on Windows, Mac, Chromebook and Android browsers.',
    ],
    whereTheyWin: [
      'Very simple one-purpose interface that many people already know.',
      'Server conversion may be quicker on very old devices with huge batches.',
      'Long track record.',
    ],
    bestFor: 'Use HEICPix for private photos or large batches. Either works fine for a quick one-off JPG.',
    faqs: [
      { q: 'Does HEICPix keep photo quality?', a: 'You can choose the output format and quality. PNG is lossless; JPG, WebP and AVIF let you trade size for quality.' },
      { q: 'Are my iPhone photos uploaded?', a: 'No. Conversion happens in your browser with WebAssembly.' },
      { q: 'How many photos can I convert at once?', a: 'There is no fixed cap; very large batches depend on your device’s memory.' },
    ],
  },
]

export function getAlternative(slug: string): Alternative | undefined {
  return alternatives.find((a) => a.slug === slug)
}
