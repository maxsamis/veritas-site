import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const SIZES = [
  { key: 'size_xs', label: '8"×12"',  price: 145 },
  { key: 'size_sm', label: '12"×18"', price: 195 },
  { key: 'size_md', label: '18"×27"', price: 295 },
  { key: 'size_lg', label: '24"×36"', price: 395 },
]

const SHOPIFY_VARIANTS: Record<string, string[]> = {
  'the-good-shepherd':    ['53318331171153','53318331203921','53318331236689','53318331269457'],
  'prince-of-peace':     ['53318331367761','53318331400529','53318331433297','53318331466065'],
  'christ-the-redeemer': ['53318331531601','53318331564369','53318331597137','53318331629905'],
  'the-sacred-heart':    ['53318331760977','53318331793745','53318331826513','53318331859281'],
  'light-of-the-world':  ['53318331957585','53318331990353','53318332023121','53318332055889'],
  'emmanuel':            ['53318332154193','53318332186961','53318332219729','53318332252497'],
}

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

const PORTRAIT_IMAGES: Record<string, string> = {
  flemish:      'https://i.imgur.com/ThF68zp.jpeg',
  renaissance:  'https://i.imgur.com/VqFWzKB.jpeg',
  contemporary: 'https://i.imgur.com/TQIrBod.jpeg',
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
    edition: 'Edition of 250 · Certificate of authenticity included',
    image: 'https://i.imgur.com/whtAlx1.jpeg',
    description:
      'A rendering of profound stillness — the shepherd who leaves the ninety-nine. This composition draws from the Flemish tradition, rendered in the warm ochres and umbers of old master painting. Printed on 300 GSM archival fine art paper and hand-assembled into your chosen frame in the United States.',
    basePrice: 145,
  },
  'christ-the-redeemer': {
    title: 'Christ the Redeemer',
    style: 'Renaissance · Limited Edition',
    edition: 'Edition of 250 · Certificate of authenticity included',
    image: 'https://i.imgur.com/zQCIOqy.jpeg',
    description:
      'Chiaroscuro at its most reverent — light and shadow drawn from the Flemish masters, the figure emerging from darkness as if called forth by grace itself. Deep blacks, warm golds, and an expression that rewards every hour spent in its presence. Printed on 300 GSM archival cotton rag, assembled by hand in Austin, Texas.',
    basePrice: 165,
  },
  'light-of-the-world': {
    title: 'Light of the World',
    style: 'Contemporary Sacred · Limited Edition',
    edition: 'Edition of 250 · Certificate of authenticity included',
    image: 'https://i.imgur.com/WGRNmXf.jpeg',
    description:
      'A contemporary sacred composition that speaks the language of today without surrendering the reverence of centuries. Luminous and still, this piece occupies the rare space between tradition and the modern interior. Printed on 300 GSM archival fine art paper, hand-assembled in the United States.',
    basePrice: 175,
  },
  'prince-of-peace': {
    title: 'Prince of Peace',
    style: 'Minimalist · Limited Edition',
    edition: 'Edition of 250 · Certificate of authenticity included',
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
    edition: 'Edition of 250 · Certificate of authenticity included',
    image: 'https://i.imgur.com/WGRNmXf.jpeg',
    description:
      'God with us. This composition draws from the Byzantine icon tradition — the gold ground, the frontal gaze, the timeless stillness that has sustained communities across two millennia. Nothing is decorative here. Every choice is theological. Printed on 300 GSM archival fine art paper, hand-assembled in the United States.',
    basePrice: 155,
  },
}

const FALLBACK: ProductData = {
  title: 'Original Composition',
  style: 'Classical Oil · Limited Edition',
  edition: 'Edition of 250 · Certificate of authenticity included',
  image: 'https://i.imgur.com/whtAlx1.jpeg',
  description:
    'A rendering of profound stillness. Printed on 300 GSM archival fine art paper and hand-assembled into your chosen frame in the United States.',
  basePrice: 145,
}


export default function ProductPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { addItem, openCart } = useCart()
  const product = (slug && PRODUCTS[slug]) ? PRODUCTS[slug] : FALLBACK

  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedFrame, setSelectedFrame] = useState(1)
  const [selectedFormat, setSelectedFormat] = useState<'framed' | 'rolled'>('framed')
  const [showARModal, setShowARModal] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'room' | 'print'>('room')
  const [justAdded, setJustAdded] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>('description')

  const portraitKey = (slug && SLUG_TO_PORTRAIT[slug]) ?? null
  const selectedFrameKey = FRAMES[selectedFrame].imageKey
  const heroImage = (portraitKey && FRAME_IMAGES[portraitKey]?.[selectedFrameKey]) ?? product.image
  const displayImage = viewMode === 'print' && portraitKey
    ? PORTRAIT_IMAGES[portraitKey]
    : heroImage

  const similarProducts = Object.entries(PRODUCTS)
    .filter(([key]) => key !== slug)
    .slice(0, 2)
  // Scroll to top when navigating between products
  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js'
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const price = SIZES[selectedSize].price + (selectedFormat === 'rolled' ? -30 : 0)

  const handleAddToCart = () => {
    const variantId = slug && SHOPIFY_VARIANTS[slug] ? String(SHOPIFY_VARIANTS[slug][selectedSize]) : null
    addItem({
      id: (slug ?? 'fallback') + '_' + selectedSize,
      slug: slug ?? 'fallback',
      title: product.title,
      sizeKey: selectedSize,
      sizeLabel: SIZES[selectedSize].label,
      price,
      image: product.image,
      variantId,
    })
    openCart()
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">


      <div className="flex flex-col lg:flex-row">

        {/* ── Left: Image ──────────────────────────────── */}
        <div
          className="w-full lg:w-[55%] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] relative overflow-hidden cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={displayImage}
            alt={product.title}
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Portrait placeholder ratio for mobile */}
          <div className="w-full" style={{ paddingBottom: '133%' }} />

          {/* View mode toggle pill */}
          {portraitKey && (
            <div
              className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/85 backdrop-blur-sm rounded-2xl px-4 py-1.5 shadow-lg flex items-center gap-3">
                <button
                  onClick={() => setViewMode('room')}
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    color: viewMode === 'room' ? '#2C2C2C' : '#8C8C7A',
                    textDecoration: viewMode === 'room' ? 'underline' : 'none',
                    textUnderlineOffset: '3px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    textTransform: 'uppercase',
                  }}
                >
                  Room
                </button>
                <span style={{ color: '#C4BDB3', fontSize: '10px' }}>|</span>
                <button
                  onClick={() => setViewMode('print')}
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    color: viewMode === 'print' ? '#2C2C2C' : '#8C8C7A',
                    textDecoration: viewMode === 'print' ? 'underline' : 'none',
                    textUnderlineOffset: '3px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0',
                    textTransform: 'uppercase',
                  }}
                >
                  Print
                </button>
              </div>
            </div>
          )}

          {/* Floating swatch panel — overlaid on image, all screen sizes */}
          {viewMode === 'room' && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/85 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg flex flex-col items-center gap-1.5">
                <p style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#8C8C7A', fontFamily: 'Cormorant Garamond, serif', textTransform: 'uppercase' }}>
                  Select Frame Style
                </p>
                <div className="flex gap-3">
                  {FRAMES.map((f, i) => (
                    <button
                      key={f.key}
                      onClick={() => setSelectedFrame(i)}
                      aria-label={f.label}
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-150 ${
                        selectedFrame === i ? 'border-[#2C2C2C] scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: f.color }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: '10px', color: '#3C3C3C', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                  {FRAMES[selectedFrame].label}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Details ───────────────────────────── */}
        <div className="w-full lg:w-[45%] px-8 lg:px-14 py-12 lg:py-16 bg-alabaster">

          {/* Wordmark */}
          <Link to="/collection">
            <span className="wordmark text-xs text-umber tracking-widest2 hover:text-charcoal transition-colors">
              VERITAS
            </span>
          </Link>

          {/* Title */}
          <h1 className="font-cormorant italic font-light text-4xl lg:text-5xl text-charcoal mt-5 mb-3 leading-tight">
            {product.title}
          </h1>

          {/* Price — shown early, above size selector */}
          <p className="font-cormorant font-light text-4xl lg:text-5xl text-charcoal mb-4">
            ${price}
          </p>

          {/* Star rating bar */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5 fill-[#C4A55A] text-[#C4A55A]" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="text-xs font-garamond text-[#8B7355]">4.9 · 127 reviews</span>
            <a href="/reviews" className="text-xs font-garamond text-[#8B7355] underline underline-offset-2 hover:text-[#2A2927]">See all</a>
          </div>

          {/* Style + Edition */}
          <p className="font-garamond text-xs tracking-[0.18em] uppercase text-umber mb-1">
            {product.style}
          </p>
          <p className="font-garamond text-xs tracking-[0.12em] uppercase text-umber/60 mb-2">
            {product.edition}
          </p>

          {/* Edition + scarcity badge */}
          <div className="flex items-center gap-3 mt-2 mb-3">
            <span className="font-garamond text-xs text-[#4A4A3A] tracking-wide">Limited edition of 250</span>
            <span style={{ backgroundColor: '#EDD9A3', color: '#5C3D00', fontSize: '10px', padding: '2px 10px', borderRadius: '20px', fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.08em', fontWeight: 600 }}>
              Only a few remaining
            </span>
          </div>

          {/* Divider */}
          <div className="section-divider mb-8 mt-6" />

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
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension diagram — mobile only */}
          <div className="mb-6 lg:hidden">
            <svg
              viewBox="0 0 340 110"
              width="100%"
              style={{ maxHeight: '100px', display: 'block' }}
              aria-label="Size comparison diagram"
            >
              {/* Scale: 36in = 100px → 1in = 2.78px. Heights: 33, 50, 75, 100. Widths: 22, 33, 50, 67. Baseline y=100. */}
              {/* 8x12 */}
              <rect
                x="10" y={100 - 33} width={22} height={33}
                fill="none"
                stroke={selectedSize === 0 ? '#2A2927' : '#C4BDB3'}
                strokeWidth={selectedSize === 0 ? 1.5 : 1}
              />
              <text x={10 + 11} y={100 - 33 - 4} textAnchor="middle" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '7px', fill: selectedSize === 0 ? '#2A2927' : '#C4BDB3' }}>8×12</text>

              {/* 12x18 */}
              <rect
                x="44" y={100 - 50} width={33} height={50}
                fill="none"
                stroke={selectedSize === 1 ? '#2A2927' : '#C4BDB3'}
                strokeWidth={selectedSize === 1 ? 1.5 : 1}
              />
              <text x={44 + 16} y={100 - 50 - 4} textAnchor="middle" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '7px', fill: selectedSize === 1 ? '#2A2927' : '#C4BDB3' }}>12×18</text>

              {/* 18x27 */}
              <rect
                x="90" y={100 - 75} width={50} height={75}
                fill="none"
                stroke={selectedSize === 2 ? '#2A2927' : '#C4BDB3'}
                strokeWidth={selectedSize === 2 ? 1.5 : 1}
              />
              <text x={90 + 25} y={100 - 75 - 4} textAnchor="middle" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '7px', fill: selectedSize === 2 ? '#2A2927' : '#C4BDB3' }}>18×27</text>

              {/* 24x36 */}
              <rect
                x="154" y={100 - 100} width={67} height={100}
                fill="none"
                stroke={selectedSize === 3 ? '#2A2927' : '#C4BDB3'}
                strokeWidth={selectedSize === 3 ? 1.5 : 1}
              />
              <text x={154 + 33} y={100 - 100 - 4} textAnchor="middle" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '7px', fill: selectedSize === 3 ? '#2A2927' : '#C4BDB3' }}>24×36</text>

              {/* Human silhouette ~5px wide, ~70px tall at x=240 */}
              {/* Head */}
              <circle cx="243" cy="34" r="3" fill="#C4BDB3" />
              {/* Body */}
              <line x1="243" y1="37" x2="243" y2="68" stroke="#C4BDB3" strokeWidth="1" />
              {/* Arms */}
              <line x1="238" y1="47" x2="248" y2="47" stroke="#C4BDB3" strokeWidth="1" />
              {/* Left leg */}
              <line x1="243" y1="68" x2="239" y2="100" stroke="#C4BDB3" strokeWidth="1" />
              {/* Right leg */}
              <line x1="243" y1="68" x2="247" y2="100" stroke="#C4BDB3" strokeWidth="1" />
              <text x="243" y="108" textAnchor="middle" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '6px', fill: '#C4BDB3' }}>5\'9"</text>
            </svg>
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

          {/* Price (also shown in cart below, this spacer removed) */}

          {/* Inline review snippets */}
          <div className="border-t border-[#E8E2D9] mt-5 pt-4 space-y-3">
            {[
              { name: 'Sarah M.', location: 'Chicago, IL', text: 'Arrived perfectly packaged. The paper quality is extraordinary — this is museum-grade work at a fraction of the gallery price.' },
              { name: 'James R.', location: 'Dallas, TX', text: 'I have purchased from several fine art print companies. This is the best quality I have received. The colors are extraordinary.' },
            ].map((r, i) => (
              <div key={i} className="pb-3 border-b border-[#E8E2D9] last:border-0">
                <div className="flex items-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3 h-3 fill-[#C4A55A]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-xs font-garamond text-[#2A2927] italic leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[10px] tracking-widest uppercase font-garamond text-[#8B7355] mt-1">{r.name} · {r.location}</p>
              </div>
            ))}
          </div>

          {/* Add to Cart */}
          <button onClick={handleAddToCart} className="btn-charcoal w-full mb-4 text-center">
            {justAdded ? 'Added to Cart \u2713' : t('product.add_to_collection')}
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
          <p className="font-garamond text-xs text-[#A1A1AA] text-center tracking-wide mt-5 mb-2">
            200-year archival · Museum UV glazing · Lifetime guarantee · Ships from Austin, TX
          </p>

          {/* Divider */}
          <div className="section-divider my-8" />

          {/* Accordion: Description / Materials / Shipping */}
          <div>
            {/* Description */}
            <div className="border-t border-umber/20">
              <button
                className="w-full flex items-center justify-between py-4"
                onClick={() => setOpenSection(openSection === 'description' ? null : 'description')}
              >
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#2C2C2C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Description
                </span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#2C2C2C', lineHeight: 1 }}>
                  {openSection === 'description' ? '\u2212' : '+'}
                </span>
              </button>
              {openSection === 'description' && (
                <p className="pt-2 pb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#6B6B5A', lineHeight: '1.65' }}>
                  {product.description}
                </p>
              )}
            </div>

            {/* Materials & Dimensions */}
            <div className="border-t border-umber/20">
              <button
                className="w-full flex items-center justify-between py-4"
                onClick={() => setOpenSection(openSection === 'materials' ? null : 'materials')}
              >
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#2C2C2C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Materials &amp; Dimensions
                </span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#2C2C2C', lineHeight: 1 }}>
                  {openSection === 'materials' ? '\u2212' : '+'}
                </span>
              </button>
              {openSection === 'materials' && (
                <p className="pt-2 pb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#6B6B5A', lineHeight: '1.65' }}>
                  Printed on 310 GSM Hahnemühle Photo Rag fine art paper. Museum-grade archival inks rated 200+ years. Solid wood frame, hand-assembled in Austin, TX. Museum UV-protective glazing. Available in 8×12", 12×18", 18×27", and 24×36" (all 2:3 ratio). Ships fully assembled in custom double-wall packaging.
                </p>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="border-t border-umber/20">
              <button
                className="w-full flex items-center justify-between py-4"
                onClick={() => setOpenSection(openSection === 'shipping' ? null : 'shipping')}
              >
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#2C2C2C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Shipping &amp; Returns
                </span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#2C2C2C', lineHeight: 1 }}>
                  {openSection === 'shipping' ? '\u2212' : '+'}
                </span>
              </button>
              {openSection === 'shipping' && (
                <p className="pt-2 pb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#6B6B5A', lineHeight: '1.65' }}>
                  Free shipping within the US. International shipping available. Ships within 3–5 business days. 30-day free returns — we&apos;ll arrange pickup. Questions? Contact us at studio@veritaseditions.com
                </p>
              )}
            </div>

            {/* Provenance & Medium */}
            <div className="border-t border-umber/20">
              <button
                className="w-full flex items-center justify-between py-4"
                onClick={() => setOpenSection(openSection === 'provenance' ? null : 'provenance')}
              >
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#2C2C2C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Provenance &amp; Medium
                </span>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#2C2C2C', lineHeight: 1 }}>
                  {openSection === 'provenance' ? '\u2212' : '+'}
                </span>
              </button>
              {openSection === 'provenance' && (
                <p className="pt-2 pb-4" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#6B6B5A', lineHeight: '1.65' }}>
                  These portraits are original compositions rendered in archival pigments by studio artists working in the Flemish oil tradition and the Italian Renaissance manner. Each work is produced as a limited edition of 250 impressions on 310 GSM Hahnemühle Photo Rag. Hand-assembled in Austin, TX. Certificate of authenticity included.
                </p>
              )}
            </div>
          </div>

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

      {/* ── You May Also Like ────────────────────────── */}
      <div className="py-16 px-6 max-w-4xl mx-auto">
        <h2
          className="mb-6"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '24px',
            color: '#2C2C2C',
            fontWeight: 400,
          }}
        >
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {similarProducts.map(([key, p]) => (
            <Link
              key={key}
              to={`/product/${key}`}
              className="bg-white rounded-[12px] overflow-hidden border border-[#E8E2D9] block"
            >
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden' }}>
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '16px',
                    color: '#2C2C2C',
                    fontWeight: 400,
                    marginBottom: '4px',
                  }}
                >
                  {p.title}
                </p>
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '14px',
                    color: '#8C8C7A',
                  }}
                >
                  From ${p.basePrice}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#2A2927] text-[#EFECE5] px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest uppercase font-garamond">{product.title}</p>
          <p className="text-sm font-garamond">{SIZES[selectedSize].label} · ${SIZES[selectedSize].price}</p>
        </div>
        <button onClick={handleAddToCart} className="bg-[#EFECE5] text-[#2A2927] px-6 py-2 text-xs tracking-widest uppercase font-garamond">
          Add to Cart
        </button>
      </div>

      {/* Cart now handled globally by CartDrawer in App.tsx */}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '24px',
              color: '#ffffff',
              fontSize: '32px',
              lineHeight: 1,
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '0',
            }}
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={displayImage}
            alt={product.title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

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
