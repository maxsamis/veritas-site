import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const SIZES = [
  { key: 'size_xs', label: '8"\u00d712"',  price: 95 },
  { key: 'size_sm', label: '12"\u00d718"', price: 125 },
  { key: 'size_md', label: '18"\u00d727"', price: 185 },
  { key: 'size_lg', label: '24"\u00d736"', price: 245 },
]

const SHOPIFY_VARIANTS: Record<string, string[]> = {
  'the-good-shepherd':    ['53318331171153','53318331203921','53318331236689','53318331269457'],
  'prince-of-peace':     ['53318331367761','53318331400529','53318331433297','53318331466065'],
  'christ-the-redeemer': ['53318331531601','53318331564369','53318331597137','53318331629905'],
  'the-sacred-heart':    ['53318331760977','53318331793745','53318331826513','53318331859281'],
  'light-of-the-world':  ['53318331957585','53318331990353','53318332023121','53318332055889'],
  'emmanuel':            ['53318332154193','53318332186961','53318332219729','53318332252497'],
}

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

const PRINT_COMPOSITES: Record<string, string> = {
  renaissance:  'https://i.imgur.com/LWZzIsG.jpeg',
  flemish:      'https://i.imgur.com/dyhqeLR.jpeg',
  contemporary: 'https://i.imgur.com/3IqEEby.jpeg',
}

const ROOM_IMAGES: Record<string, string> = {
  flemish:      'https://i.imgur.com/whtAlx1.jpeg',
  renaissance:  'https://i.imgur.com/zQCIOqy.jpeg',
  contemporary: 'https://i.imgur.com/WGRNmXf.jpeg',
}

const PORTRAIT_IMAGES: Record<string, string> = {
  flemish:      'https://i.imgur.com/VqFWzKB.jpeg',
  renaissance:  'https://i.imgur.com/ThF68zp.jpeg',
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
    style: 'Classical Oil \u00b7 Limited Edition',
    edition: 'Edition of 250 \u00b7 Certificate of authenticity included',
    image: 'https://i.imgur.com/dyhqeLR.jpeg',
    description:
      'A rendering of profound stillness \u2014 the shepherd who leaves the ninety-nine. This composition draws from the Flemish tradition, rendered in the warm ochres and umbers of old master painting. Printed on 300 GSM archival fine art paper and hand-assembled into your chosen frame in the United States.',
    basePrice: 95,
  },
  'christ-the-redeemer': {
    title: 'Christ the Redeemer',
    style: 'Renaissance \u00b7 Limited Edition',
    edition: 'Edition of 250 \u00b7 Certificate of authenticity included',
    image: 'https://i.imgur.com/LWZzIsG.jpeg',
    description:
      'Chiaroscuro at its most reverent \u2014 light and shadow drawn from the Flemish masters, the figure emerging from darkness as if called forth by grace itself. Deep blacks, warm golds, and an expression that rewards every hour spent in its presence. Printed on 300 GSM archival cotton rag, assembled by hand in Austin, Texas.',
    basePrice: 95,
  },
  'light-of-the-world': {
    title: 'Light of the World',
    style: 'Contemporary Sacred \u00b7 Limited Edition',
    edition: 'Edition of 250 \u00b7 Certificate of authenticity included',
    image: 'https://i.imgur.com/3IqEEby.jpeg',
    description:
      'A contemporary sacred composition that speaks the language of today without surrendering the reverence of centuries. Luminous and still, this piece occupies the rare space between tradition and the modern interior. Printed on 300 GSM archival fine art paper, hand-assembled in the United States.',
    basePrice: 95,
  },
  'prince-of-peace': {
    title: 'Prince of Peace',
    style: 'Minimalist \u00b7 Limited Edition',
    edition: 'Edition of 250 \u00b7 Certificate of authenticity included',
    image: 'https://i.imgur.com/dyhqeLR.jpeg',
    description:
      'Restraint as devotion. This composition strips the sacred portrait to its essential gesture \u2014 a gaze of absolute peace rendered with economy and grace. For homes that understand that less, when it is the right less, says everything. Printed on 300 GSM archival fine art paper, hand-assembled in the United States.',
    basePrice: 95,
  },
  'the-sacred-heart': {
    title: 'The Sacred Heart',
    style: 'Baroque \u00b7 Limited Edition',
    edition: 'Edition of 250 \u00b7 Certificate of authenticity included',
    image: 'https://i.imgur.com/LWZzIsG.jpeg',
    description:
      'The oldest symbol of love made radiant again. This Baroque composition honors the iconographic tradition with depth and formal rigor \u2014 each element considered, nothing accidental. A piece that rewards years of living with it. Printed on 300 GSM archival cotton rag, assembled by hand in Austin, Texas.',
    basePrice: 95,
  },
  emmanuel: {
    title: 'Emmanuel',
    style: 'Icon Tradition \u00b7 Limited Edition',
    edition: 'Edition of 250 \u00b7 Certificate of authenticity included',
    image: 'https://i.imgur.com/3IqEEby.jpeg',
    description:
      'God with us. This composition draws from the Byzantine icon tradition \u2014 the gold ground, the frontal gaze, the timeless stillness that has sustained communities across two millennia. Nothing is decorative here. Every choice is theological. Printed on 300 GSM archival fine art paper, hand-assembled in the United States.',
    basePrice: 95,
  },
}

const FALLBACK: ProductData = {
  title: 'Original Composition',
  style: 'Classical Oil \u00b7 Limited Edition',
  edition: 'Edition of 250 \u00b7 Certificate of authenticity included',
  image: 'https://i.imgur.com/dyhqeLR.jpeg',
  description:
    'A rendering of profound stillness. Printed on 300 GSM archival fine art paper and hand-assembled into your chosen frame in the United States.',
  basePrice: 95,
}

// Keep FRAME_IMAGES, ROOM_IMAGES, PORTRAIT_IMAGES, SLUG_TO_PORTRAIT referenced above
void FRAME_IMAGES

const FRAME_ADDONS: Record<string, number[]> = {
  black: [50, 70, 110, 150],
  white: [50, 70, 110, 150],
  wood:  [60, 80, 120, 160],
}

const FRAME_LABELS: Record<string, string> = {
  black: 'Black',
  white: 'White',
  wood:  'Natural Wood',
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const { addItem, openCart } = useCart()
  const product = (slug && PRODUCTS[slug]) ? PRODUCTS[slug] : FALLBACK

  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<'unframed' | 'black' | 'white' | 'wood'>('unframed')
  const [showFrameModal, setShowFrameModal] = useState(false)

  const portraitKey = (slug && SLUG_TO_PORTRAIT[slug]) ?? null

  const printComposite = portraitKey ? (PRINT_COMPOSITES[portraitKey] ?? product.image) : product.image
  const roomComposite  = portraitKey ? (ROOM_IMAGES[portraitKey] ?? product.image) : product.image
  const rawPortrait    = portraitKey ? (PORTRAIT_IMAGES[portraitKey] ?? product.image) : product.image

  const displayImages = [printComposite, roomComposite, rawPortrait]
  const displayImage = displayImages[selectedImageIndex] ?? printComposite

  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  useEffect(() => { setSelectedImageIndex(0) }, [slug])

  const handleAddToCart = () => {
    if (selectedFrame !== 'unframed') {
      setShowFrameModal(true)
      return
    }
    const variantId = slug && SHOPIFY_VARIANTS[slug] ? String(SHOPIFY_VARIANTS[slug][selectedSize]) : null
    addItem({
      id: (slug ?? 'fallback') + '_' + selectedSize + '_unframed',
      slug: slug ?? 'fallback',
      title: product.title,
      sizeKey: selectedSize,
      sizeLabel: SIZES[selectedSize].label,
      price: SIZES[selectedSize].price,
      image: product.image,
      variantId,
      isFramed: false,
      frameKey: null,
      frameLabel: null,
      frameAddon: 0,
    })
    openCart()
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const accordions = [
    {
      key: 'about',
      num: '01',
      label: 'About This Work',
      content: product.description,
    },
    {
      key: 'edition',
      num: '02',
      label: 'Edition Details',
      content: 'Printed on 310 GSM Hahnem\u00fchle Photo Rag fine art paper. Museum-grade archival inks rated 200+ years. Solid wood frame, hand-assembled in Austin, TX. Museum UV-protective glazing. Available in 8\u00d712", 12\u00d718", 18\u00d727", and 24\u00d736" (all 2:3 ratio). Ships fully assembled in custom double-wall packaging.',
    },
    {
      key: 'shipping',
      num: '03',
      label: 'Packaging & Shipping',
      content: 'Free shipping within the US. International shipping available. Ships within 3\u20135 business days. 30-day free returns \u2014 we\u2019ll arrange pickup. Questions? Contact us at studio@veritaseditions.com',
    },
    {
      key: 'provenance',
      num: '04',
      label: 'Provenance',
      content: 'These portraits are original compositions rendered in archival pigments by studio artists working in the Flemish oil tradition and the Italian Renaissance manner. Each work is produced as a limited edition of 250 impressions on 310 GSM Hahnem\u00fchle Photo Rag. Hand-assembled in Austin, TX. Certificate of authenticity included.',
    },
  ]

  return (
    <div className="min-h-screen pb-20 md:pb-0">

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row">

        {/* LEFT: Image gallery — 55% */}
        <div className="w-full lg:w-[55%] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex flex-col bg-[#F5F2ED]">

          {/* Main image */}
          <div
            className="relative flex-1 cursor-zoom-in flex items-center justify-center overflow-hidden"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={displayImage}
              alt={product.title}
              className="w-full max-h-[80vh] object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 p-3">
            {displayImages.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                aria-label={'View image ' + (idx + 1)}
                className={`w-20 h-20 overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-150 ${
                  selectedImageIndex === idx
                    ? 'ring-2 ring-[#2A2927] ring-offset-1'
                    : 'ring-1 ring-[#E8E2D9] opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={src}
                  alt={'Thumbnail ' + (idx + 1)}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product details — 45% */}
        <div className="w-full lg:w-[45%] px-8 lg:px-14 py-12 lg:py-16 bg-[#EFECE5]">

          {/* Label */}
          <p className="font-garamond text-xs tracking-[0.2em] uppercase text-[#8B7355]">
            VERITAS EDITIONS
          </p>

          {/* Title */}
          <h1 className="font-garamond text-3xl font-normal text-[#2A2927] mt-2 leading-tight">
            {product.title}
          </h1>

          {/* Price */}
          <p className="font-garamond text-2xl text-[#2A2927] mt-3">
            From ${SIZES[selectedSize].price}
          </p>

          {/* Frame swatches */}
          <div className="flex gap-4 justify-center mt-6">
            {[
              { key: 'unframed', label: 'Unframed', bg: '#F8F6F1', border: '#D4CFC4', inner: '#EFECE5' },
              { key: 'black',    label: 'Black',    bg: '#1a1a1a', border: '#333',    inner: '#2a2a2a' },
              { key: 'white',    label: 'White',    bg: '#F5F3EF', border: '#C8C3BB', inner: '#E8E3DA' },
              { key: 'wood',     label: 'Wood',     bg: '#7C5C3A', border: '#5c3d1e', inner: '#8B6644' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setSelectedFrame(f.key as 'unframed' | 'black' | 'white' | 'wood')}
                className="flex flex-col items-center gap-1.5 group"
              >
                {/* Circle swatch showing frame corner */}
                <div
                  className={`w-14 h-14 rounded-full overflow-hidden relative ${selectedFrame === f.key ? 'ring-2 ring-offset-2 ring-[#2A2927]' : ''}`}
                  style={{ backgroundColor: f.inner }}
                >
                  {/* Frame corner simulation: thick colored border on top+left edges */}
                  <div className="absolute inset-0" style={{
                    background: `linear-gradient(135deg, ${f.bg} 0%, ${f.bg} 38%, ${f.inner} 38%, ${f.inner} 100%)`,
                  }} />
                  {/* Corner detail line */}
                  <div className="absolute inset-0" style={{
                    background: `linear-gradient(135deg, ${f.border} 0%, ${f.border} 38%, transparent 38%)`,
                    opacity: 0.5,
                  }} />
                </div>
                {/* Label */}
                <span className={`text-[10px] tracking-widest uppercase font-garamond ${selectedFrame === f.key ? 'text-[#2A2927]' : 'text-[#8B7355]'}`}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>

          {/* Metadata block — centered, below swatches */}
          <div className="text-center mt-5 mb-5 border-t border-b border-[#E8E2D9] py-4">
            <p className="text-sm font-garamond text-[#2A2927]">Limited edition</p>
            <p className="text-sm font-garamond text-[#2A2927] mt-1">Edition of 250</p>
            <p className="text-sm font-garamond text-[#2A2927] mt-1">Ships in 3 days</p>
          </div>

          {/* Size selector */}
          <div className="flex flex-wrap gap-2">
            {SIZES.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setSelectedSize(i)}
                className={`text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-150 font-garamond ${
                  selectedSize === i
                    ? 'bg-[#2A2927] text-[#EFECE5] border-[#2A2927]'
                    : 'bg-transparent text-[#2A2927] border-[#2A2927] hover:bg-[#2A2927]/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Buy Now */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#2A2927] text-[#EFECE5] py-4 text-xs tracking-widest uppercase font-garamond mt-4 transition-opacity hover:opacity-90"
          >
            {justAdded ? 'Added to Cart' : 'Buy Now'}
          </button>

          {/* Divider */}
          <div className="border-t border-[#E8E2D9] mt-6" />

          {/* Accordions */}
          <div>
            {accordions.map((acc) => (
              <div key={acc.key} className="border-b border-[#E8E2D9]">
                <button
                  className="w-full flex items-center justify-between py-4 text-left"
                  onClick={() => setOpenSection(openSection === acc.key ? null : acc.key)}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-garamond text-xs text-[#8B7355]">{acc.num}</span>
                    <span className="font-garamond text-xs tracking-widest uppercase text-[#2A2927]">{acc.label}</span>
                  </span>
                  <span className="font-garamond text-lg text-[#2A2927] leading-none select-none">
                    {openSection === acc.key ? '\u2212' : '+'}
                  </span>
                </button>
                {openSection === acc.key && (
                  <p className="pb-4 font-garamond text-sm text-[#6B6B5A] leading-relaxed">
                    {acc.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              to="/collection"
              className="font-garamond text-xs tracking-widest uppercase text-[#8B7355] hover:text-[#2A2927] transition-colors border-b border-[#8B7355]/30 hover:border-[#2A2927] pb-px"
            >
              Back to Collection
            </Link>
          </div>

        </div>
      </div>

      {/* Sticky mobile Add to Cart bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#EFECE5] border-t border-[#E8E2D9] px-4 py-3 flex items-center justify-between">
        <div>
          <p className="font-garamond text-sm text-[#2A2927] max-w-[160px] truncate">{product.title}</p>
          <p className="font-garamond text-sm text-[#8B7355]">${SIZES[selectedSize].price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-3 bg-[#2A2927] text-[#EFECE5] font-garamond text-xs tracking-widest uppercase"
        >
          Buy Now
        </button>
      </div>

      {/* Framing modal */}
      {showFrameModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFrameModal(false)} />
          {/* Modal panel */}
          <div className="relative bg-[#FAFAF8] w-full sm:max-w-lg mx-auto sm:rounded-none shadow-2xl z-10 p-8">
            <button
              onClick={() => setShowFrameModal(false)}
              className="absolute top-4 right-4 text-[#8B7355] text-xs tracking-widest uppercase font-garamond"
            >
              Close
            </button>

            <p className="text-xs tracking-[0.2em] uppercase font-garamond text-[#8B7355] mb-2">VERITAS EDITIONS</p>
            <h2 className="font-garamond text-2xl text-[#2A2927] mb-6">{product.title}</h2>

            <p className="text-xs tracking-widest uppercase font-garamond text-[#2A2927] mb-4">Select your frame</p>

            {/* 3 framing option boxes */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { key: 'black', label: 'Black',        desc: 'Slim black frame',    color: '#1a1a1a', price: 50 },
                { key: 'white', label: 'White',        desc: 'White gallery frame', color: '#F5F3EF', price: 50 },
                { key: 'wood',  label: 'Natural Wood', desc: 'Walnut finish',       color: '#7C5C3A', price: 70 },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSelectedFrame(opt.key as 'black' | 'white' | 'wood')}
                  className={`border p-3 text-left transition-all ${selectedFrame === opt.key ? 'border-[#2A2927]' : 'border-[#E8E2D9]'}`}
                >
                  <div className="w-full h-12 mb-2 rounded-sm" style={{ backgroundColor: opt.color }} />
                  <p className="text-xs tracking-widest uppercase font-garamond text-[#2A2927]">{opt.label}</p>
                  <p className="text-xs font-garamond text-[#8B7355] mt-0.5">+${opt.price}</p>
                </button>
              ))}
            </div>

            {/* Confirm button */}
            <button
              onClick={() => {
                const addon = FRAME_ADDONS[selectedFrame]?.[selectedSize] ?? 0
                const variantId = slug && SHOPIFY_VARIANTS[slug] ? String(SHOPIFY_VARIANTS[slug][selectedSize]) : null
                addItem({
                  id: (slug ?? 'fallback') + '_' + selectedSize + '_' + selectedFrame,
                  slug: slug ?? 'fallback',
                  title: product.title,
                  sizeKey: selectedSize,
                  sizeLabel: SIZES[selectedSize].label,
                  price: SIZES[selectedSize].price,
                  image: product.image,
                  variantId,
                  isFramed: true,
                  frameKey: selectedFrame,
                  frameLabel: FRAME_LABELS[selectedFrame] ?? selectedFrame,
                  frameAddon: addon,
                })
                setShowFrameModal(false)
                openCart()
              }}
              className="w-full bg-[#2A2927] text-[#EFECE5] py-4 text-xs tracking-widest uppercase font-garamond"
            >
              {`Add to Cart — $${SIZES[selectedSize].price + (FRAME_ADDONS[selectedFrame]?.[selectedSize] ?? 0)}`}
            </button>

            <button
              onClick={() => {
                const variantId = slug && SHOPIFY_VARIANTS[slug] ? String(SHOPIFY_VARIANTS[slug][selectedSize]) : null
                addItem({
                  id: (slug ?? 'fallback') + '_' + selectedSize + '_unframed',
                  slug: slug ?? 'fallback',
                  title: product.title,
                  sizeKey: selectedSize,
                  sizeLabel: SIZES[selectedSize].label,
                  price: SIZES[selectedSize].price,
                  image: product.image,
                  variantId,
                  isFramed: false,
                  frameKey: null,
                  frameLabel: null,
                  frameAddon: 0,
                })
                setShowFrameModal(false)
                openCart()
              }}
              className="w-full border border-[#2A2927] text-[#2A2927] py-3 text-xs tracking-widest uppercase font-garamond mt-2"
            >
              Continue unframed
            </button>
          </div>
        </div>
      )}

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
