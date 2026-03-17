import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

const SIZES = [
  { key: 'size_sm', price: 145 },
  { key: 'size_md', price: 195 },
  { key: 'size_lg', price: 285 },
]

const FRAMES = [
  { key: 'frame_black',   color: '#1a1a1a', imageKey: 'black',        label: 'Matte Black' },
  { key: 'frame_walnut',  color: '#5c3d1e', imageKey: 'walnut',       label: 'Walnut Brown' },
  { key: 'frame_white',   color: '#f0ece2', imageKey: 'ivory',        label: 'Ivory White' },
  { key: 'frame_gold',    color: '#b89040', imageKey: 'gold',         label: 'Burnished Gold' },
  { key: 'frame_natural', color: '#c4a55a', imageKey: 'antique_gold', label: 'Antique Gold' },
]

const FRAME_IMAGES: Record<string, Record<string, string>> = {
  flemish: {
    black:        'https://i.imgur.com/X8Ilrqs.jpeg',
    walnut:       'https://i.imgur.com/1PHPd7R.jpeg',
    ivory:        'https://i.imgur.com/W0Hkwdz.jpeg',
    gold:         'https://i.imgur.com/n0v6Wek.jpeg',
    antique_gold: 'https://i.imgur.com/HJ6PJel.jpeg',
  },
  renaissance: {
    black:        'https://i.imgur.com/2LO5P2d.jpeg',
    walnut:       'https://i.imgur.com/CfgseDy.jpeg',
    ivory:        'https://i.imgur.com/AuxJLpn.jpeg',
    gold:         'https://i.imgur.com/2y2t9W6.jpeg',
    antique_gold: 'https://i.imgur.com/Xt00zPB.jpeg',
  },
  contemporary: {
    black:        'https://i.imgur.com/XHSj99F.jpeg',
    walnut:       'https://i.imgur.com/I0nPKTJ.jpeg',
    ivory:        'https://i.imgur.com/096vLQQ.jpeg',
    gold:         'https://i.imgur.com/FBRueMr.jpeg',
    antique_gold: 'https://i.imgur.com/VPXWZp0.jpeg',
  },
}

const SLUG_TO_PORTRAIT: Record<string, string> = {
  'the-good-shepherd':   'flemish',
  'prince-of-peace':     'flemish',
  'christ-the-redeemer': 'renaissance',
  'the-sacred-heart':    'renaissance',
  'light-of-the-world':  'contemporary',
  'emmanuel':            'contemporary',
}

interface ProductData {
  title: string
  style: string
  edition: string
  image: string
  description: string
  basePrice: number
}

const PRODUCTS: Record<string, ProductData> = {
  'the-good-shepherd': {
    title: 'The Good Shepherd',
    style: 'Classical Oil · Limited Edition',
    edition: 'Edition of 500 · Certificate of authenticity included',
    image: 'https://i.imgur.com/whtAlx1.jpeg',
    description:
      'A rendering of profound stillness — the shepherd who leaves the ninety-nine. This composition draws from the Flemish tradition, rendered in the warm ochres and umbers of old master painting. Printed on 300 GSM archival fine art paper and hand-assembled into your chosen frame in the United States.',
    basePrice: 145,
  },
  'christ-the-redeemer': {
    title: 'Christ the Redeemer',
    style: 'Renaissance · Limited Edition',
    edition: 'Edition of 500 · Certificate of authenticity included',
    image: 'https://i.imgur.com/zQCIOqy.jpeg',
    description:
      'Chiaroscuro at its most reverent — light and shadow drawn from the Flemish masters, the figure emerging from darkness as if called forth by grace itself. Deep blacks, warm golds, and an expression that rewards every hour spent in its presence. Printed on 300 GSM archival cotton rag, assembled by hand in Austin, Texas.',
    basePrice: 165,
  },
  'light-of-the-world': {
    title: 'Light of the World',
    style: 'Contemporary Sacred · Limited Edition',
    edition: 'Edition of 300 · Certificate of authenticity included',
    image: 'https://i.imgur.com/WGRNmXf.jpeg',
    description:
      'A contemporary sacred composition that speaks the language of today without surrendering the reverence of centuries. Luminous and still, this piece occupies the rare space between tradition and the modern interior. Printed on 300 GSM archival fine art paper, hand-assembled in the United States.',
    basePrice: 175,
  },
  'prince-of-peace': {
    title: 'Prince of Peace',
    style: 'Minimalist · Limited Edition',
    edition: 'Edition of 500 · Certificate of authenticity included',
    image: 'https://i.imgur.com/whtAlx1.jpeg',
    description:
      'Restraint as devotion. This composition strips the sacred portrait to its essential gesture — a gaze of absolute peace rendered with economy and grace. For homes that understand that less, when it is the right less, says everything. Printed on 300 GSM archival fine art paper, hand-assembled in the United States.',
    basePrice: 145,
  },
  'the-sacred-heart': {
    title: 'The Sacred Heart',
    style: 'Baroque · Limited Edition',
    edition: 'Edition of 250 · Certificate of authenticity included',
    image: 'https://i.imgur.com/zQCIOqy.jpeg',
    description:
      'The oldest symbol of love made radiant again. This Baroque composition honors the iconographic tradition with depth and formal rigor — each element considered, nothing accidental. A piece that rewards years of living with it. Printed on 300 GSM archival cotton rag, assembled by hand in Austin, Texas.',
    basePrice: 185,
  },
  emmanuel: {
    title: 'Emmanuel',
    style: 'Icon Tradition · Limited Edition',
    edition: 'Edition of 300 · Certificate of authenticity included',
    image: 'https://i.imgur.com/WGRNmXf.jpeg',
    description:
      'God with us. This composition draws from the Byzantine icon tradition — the gold ground, the frontal gaze, the timeless stillness that has sustained communities across two millennia. Nothing is decorative here. Every choice is theological. Printed on 300 GSM archival fine art paper, hand-assembled in the United States.',
    basePrice: 155,
  },
}

const FALLBACK: ProductData = {
  title: 'Original Composition',
  style: 'Classical Oil · Limited Edition',
  edition: 'Edition of 500 · Certificate of authenticity included',
  image: 'https://i.imgur.com/whtAlx1.jpeg',
  description:
    'A rendering of profound stillness. Printed on 300 GSM archival fine art paper and hand-assembled into your chosen frame in the United States.',
  basePrice: 145,
}

export default function ProductPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const product = (slug && PRODUCTS[slug]) ? PRODUCTS[slug] : FALLBACK

  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedFrame, setSelectedFrame] = useState(1)
  const [selectedFormat, setSelectedFormat] = useState<'framed' | 'rolled'>('framed')
  const [showARModal, setShowARModal] = useState(false)

  const portraitKey = (slug && SLUG_TO_PORTRAIT[slug]) ?? null
  const selectedFrameKey = FRAMES[selectedFrame].imageKey
  const heroImage = (portraitKey && FRAME_IMAGES[portraitKey]?.[selectedFrameKey]) ?? product.image

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js'
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const price = product.basePrice + (selectedSize * 50) + (selectedFormat === 'rolled' ? -30 : 0)

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">

        {/* ── Left: Image ──────────────────────────────── */}
        <div
          className="w-full lg:w-[55%] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] relative overflow-hidden"
        >
          <img
            src={heroImage}
            alt={product.title}
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Portrait placeholder ratio for mobile */}
          <div className="w-full" style={{ paddingBottom: '133%' }} />
        </div>

        {/* ── Right: Details ───────────────────────────── */}
        <div className="w-full lg:w-[45%] px-8 lg:px-14 py-12 lg:py-16 bg-alabaster">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link to="/collection">
              <span className="font-garamond text-xs tracking-widest uppercase text-umber/70 hover:text-charcoal transition-colors">
                Collection
              </span>
            </Link>
            <span className="font-garamond text-xs text-umber/40">·</span>
            <span className="font-garamond text-xs tracking-widest uppercase text-charcoal">
              {product.title}
            </span>
          </div>

          {/* Wordmark */}
          <Link to="/collection">
            <span className="wordmark text-xs text-umber tracking-widest2 hover:text-charcoal transition-colors">
              VERITAS
            </span>
          </Link>

          {/* Title */}
          <h1 className="font-cormorant italic font-light text-4xl lg:text-5xl text-charcoal mt-5 mb-2 leading-tight">
            {product.title}
          </h1>

          {/* Style + Edition */}
          <p className="font-garamond text-xs tracking-[0.18em] uppercase text-umber mb-1">
            {product.style}
          </p>
          <p className="font-garamond text-xs tracking-[0.12em] uppercase text-umber/60 mb-8">
            {product.edition}
          </p>

          {/* Divider */}
          <div className="section-divider mb-8" />

          {/* Size selector */}
          <div className="mb-7">
            <p className="font-garamond text-xs tracking-widest uppercase text-umber mb-3">
              {t('product.size_label')}
            </p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setSelectedSize(i)}
                  className={`font-garamond text-xs tracking-wide px-4 py-2 border transition-all duration-150 ${
                    selectedSize === i
                      ? 'bg-charcoal text-parchment border-charcoal'
                      : 'bg-transparent text-umber border-umber/40 hover:border-umber'
                  }`}
                >
                  {t(`product.${s.key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Frame selector */}
          <div className="mb-7">
            <p className="font-garamond text-xs tracking-widest uppercase text-umber mb-3">
              {t('product.frame_label')} — <span className="normal-case">{FRAMES[selectedFrame].label}</span>
            </p>
            <div className="flex gap-3">
              {FRAMES.map((f, i) => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFrame(i)}
                  aria-label={f.label}
                  className={`w-8 h-8 rounded-full transition-all duration-150 ${
                    selectedFrame === i
                      ? 'ring-2 ring-charcoal ring-offset-2 ring-offset-alabaster'
                      : 'ring-1 ring-umber/30 hover:ring-umber'
                  }`}
                  style={{ backgroundColor: f.color }}
                />
              ))}
            </div>
          </div>

          {/* Format toggle */}
          <div className="mb-8">
            <p className="font-garamond text-xs tracking-widest uppercase text-umber mb-3">
              {t('product.format_label')}
            </p>
            <div className="flex border border-umber/30 w-fit">
              {(['framed', 'rolled'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`font-garamond text-xs tracking-wide px-5 py-2 transition-all duration-150 ${
                    selectedFormat === fmt
                      ? 'bg-charcoal text-parchment'
                      : 'text-umber hover:bg-umber/10'
                  }`}
                >
                  {t(`product.format_${fmt}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-8">
            <p className="font-cormorant font-light text-4xl text-charcoal">
              ${price}
            </p>
          </div>

          {/* Add to Collection */}
          <button className="btn-charcoal w-full mb-4 text-center">
            {t('product.add_to_collection')}
          </button>

          {/* View in Your Room */}
          <button
            onClick={() => setShowARModal(true)}
            className="w-full py-3.5 border border-[#2A2927] text-[#2A2927] font-garamond text-sm tracking-widest uppercase hover:bg-[#2A2927] hover:text-parchment transition-colors duration-200 flex items-center justify-center gap-2 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
            View in Your Room
          </button>

          {/* Trust signals */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#7A7365" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <p className="font-garamond text-xs text-umber/80 leading-snug">Lifetime warranty on frame &amp; print</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#7A7365" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
              </div>
              <p className="font-garamond text-xs text-umber/80 leading-snug">Ships double-boxed, fully assembled</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#7A7365" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <p className="font-garamond text-xs text-umber/80 leading-snug">Certificate of authenticity included</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#7A7365" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
              </div>
              <p className="font-garamond text-xs text-umber/80 leading-snug">Solid wood frame, made in the US</p>
            </div>
          </div>

          {/* Shipping note */}
          <p className="font-garamond text-xs text-umber/60 text-center tracking-wide">
            {t('product.ships_from')}
          </p>

          {/* Divider */}
          <div className="section-divider my-8" />

          {/* Description */}
          <p className="font-garamond text-base leading-relaxed text-umber">
            {product.description}
          </p>

          {/* Back link */}
          <div className="mt-10">
            <Link
              to="/collection"
              className="font-garamond text-xs tracking-widest uppercase text-umber/70 hover:text-charcoal transition-colors border-b border-umber/30 hover:border-charcoal pb-px"
            >
              ← Back to Collection
            </Link>
          </div>

        </div>
      </div>

      {/* AR Modal */}
      {showARModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowARModal(false) }}
        >
          <div className="relative w-full max-w-md bg-alabaster rounded-[14px] p-8 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setShowARModal(false)}
              className="absolute top-4 right-4 text-umber hover:text-charcoal transition-colors text-xl leading-none"
              aria-label="Close"
            >
              ×
            </button>

            {/* Title */}
            <h2 className="font-cormorant italic font-light text-3xl text-charcoal mb-3">
              View in Your Room
            </h2>

            {/* Body */}
            <p className="font-garamond text-base leading-relaxed text-umber mb-8">
              Point your camera at the wall where you'd like to hang this piece.
              The print will appear at true scale.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <a
                href="https://developer.apple.com/augmented-reality/quick-look/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-charcoal text-parchment font-garamond text-sm tracking-widest uppercase text-center hover:bg-umber transition-colors duration-200"
              >
                Open on iPhone / iPad
              </a>
              <a
                href="https://developers.google.com/ar/develop/scene-viewer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 border border-charcoal text-charcoal font-garamond text-sm tracking-widest uppercase text-center hover:bg-charcoal hover:text-parchment transition-colors duration-200"
              >
                Open on Android
              </a>
            </div>

            {/* Fine print */}
            <p className="font-garamond text-xs text-[#A1A1AA] text-center leading-relaxed">
              AR feature available on iOS Safari and Android Chrome. Requires a
              modern device.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
