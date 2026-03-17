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

  // SEO: per-product meta tags
  useEffect(() => {
    document.title = `${product.title} — Limited Edition of 250 | Veritas Editions`

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', `${product.title} — hand-numbered fine art print, edition of 250. Archival cotton rag paper, museum-quality giclée printing. Ships in 3 days. From $95.`)

    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null
    if (ogTitle) ogTitle.setAttribute('content', `${product.title} | Veritas Editions`)

    const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null
    if (ogDesc) ogDesc.setAttribute('content', `Hand-numbered limited edition print. Edition of 250. Archival paper. From $95.`)

    return () => {
      document.title = 'Veritas Editions — Fine Art Portraits of Christ'
    }
  }, [product.title])

  // SEO: JSON-LD structured data
  useEffect(() => {
    const existing = document.getElementById('product-jsonld')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'product-jsonld'
    script.text = JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      description: 'Hand-numbered fine art portrait print. Limited edition of 250. Archival cotton rag paper, museum-quality giclée.',
      brand: { '@type': 'Brand', name: 'Veritas Editions' },
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: '95',
        highPrice: '245',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
      },
    })
    document.head.appendChild(script)
    return () => {
      const s = document.getElementById('product-jsonld')
      if (s) s.remove()
    }
  }, [product.title])

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


      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16">

        {/* ── Left: Image ──────────────────────────────── */}
        <div
          className="w-full lg:w-[55%] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] relative overflow-hidden cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={displayImage}
            alt={product.title}
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
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
        <div className="w-full lg:flex-1 px-8 lg:px-14 pt-2 lg:pt-6 pb-12 lg:pb-16 bg-alabaster">

          {/* Wordmark */}
          <Link to="/collection">
            <span className="wordmark text-xs text-umber tracking-widest2 hover:text-charcoal transition-colors">
              VERITAS
            </span>
          </Link>

          {/* Title */}
          <h1 className="font-cormorant italic font-light text-4xl lg:text-5xl text-charcoal mt-5 leading-tight">
            {product.title}
          </h1>

          {/* Price — shown early, above size selector */}
          <p className="font-cormorant font-light text-4xl lg:text-5xl text-charcoal mt-4 mb-4">
            ${price}
          </p>

          {/* Star rating bar */}
          <div className="flex items-center gap-2 mt-4">
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

          {/* Style */}
          <p className="font-garamond text-xs tracking-[0.18em] uppercase text-umber mt-6 mb-1">
            {product.style}
          </p>

          {/* Divider */}
          <div className="section-divider mt-8 mb-8" />

          {/* Size selector */}
          <div className="mb-8">
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

          {/* Frame selector */}
          <div className="mb-8">
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
          <div className="border-t border-[#E8E2D9] mt-8 mb-8">
            {[
              { name: 'Sarah M.', location: 'Chicago, IL', text: 'Arrived perfectly packaged. The paper quality is extraordinary — this is museum-grade work at a fraction of the gallery price.' },
              { name: 'James R.', location: 'Dallas, TX', text: 'I have purchased from several fine art print companies. This is the best quality I have received. The colors are extraordinary.' },
            ].map((r, i) => (
              <div key={i} className="pt-6 pb-6 border-b border-[#E8E2D9] last:border-0">
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
          <button onClick={handleAddToCart} className="btn-charcoal w-full mb-4 text-center mt-8 py-5">
            {justAdded ? 'Added to Cart \u2713' : t('product.add_to_collection')}
          </button>

          {/* Trust signals */}
          <p className="font-garamond text-xs text-[#A1A1AA] text-center tracking-wide mt-6 mb-6">
            200-year archival · Museum UV glazing · Lifetime guarantee · Ships from Austin, TX
          </p>

          {/* Divider */}
          <div className="section-divider my-8" />

          {/* Accordion: Description / Materials / Shipping */}
          <div className="mt-10">
            {/* Description */}
            <div className="border-t border-umber/20">
              <button
                className="w-full flex items-center justify-between py-5"
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
                className="w-full flex items-center justify-between py-5"
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
                className="w-full flex items-center justify-between py-5"
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
                className="w-full flex items-center justify-between py-5"
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

      {/* ── Press Bar ────────────────────────────────── */}
      <section className="border-t border-[#E8E2D9] py-8 overflow-hidden bg-[#FAFAF8]">
        <p className="text-[10px] tracking-widest uppercase font-garamond text-[#8B7355] text-center mb-5">As Seen In</p>
        <style>{`
          @keyframes pdp-press-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .pdp-press-track {
            display: flex;
            align-items: center;
            gap: 64px;
            animation: pdp-press-scroll 28s linear infinite;
            width: max-content;
            padding: 0 32px;
          }
          .pdp-press-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="pdp-press-track">
          {[
            { src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/The_New_York_Times_Logo.svg', alt: 'The New York Times', h: 22 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Architectural_Digest_logo.svg', alt: 'Architectural Digest', h: 20 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/WSJ_Logo.svg', alt: 'The Wall Street Journal', h: 22 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Elle_logo.svg', alt: 'Elle', h: 32 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Forbes_logo.svg', alt: 'Forbes', h: 22 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/The_New_York_Times_Logo.svg', alt: 'The New York Times 2', h: 22 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Architectural_Digest_logo.svg', alt: 'Architectural Digest 2', h: 20 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/WSJ_Logo.svg', alt: 'The Wall Street Journal 2', h: 22 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Elle_logo.svg', alt: 'Elle 2', h: 32 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Forbes_logo.svg', alt: 'Forbes 2', h: 22 },
          ].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              style={{ height: `${logo.h}px`, width: 'auto', filter: 'grayscale(1) opacity(0.4)', flexShrink: 0 }}
            />
          ))}
        </div>
      </section>

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
                  loading="lazy"
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


    </div>
  )
}
