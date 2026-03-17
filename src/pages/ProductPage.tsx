import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

const SIZES = [
  { key: 'size_xs', label: '8"\u00d712"',  price: 95 },
  { key: 'size_sm', label: '12"\u00d718"', price: 125 },
  { key: 'size_md', label: '18"\u00d727"', price: 185 },
  { key: 'size_lg', label: '24"\u00d736"', price: 245 },
]

const FRAME_ADDONS = [50, 70, 110, 150]

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
  { key: 'frame_white',   color: '#f0ece2', imageKey: 'ivory',        label: 'Ivory White',  border: '#d4cfc4' },
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

const PRINT_COMPOSITES: Record<string, string> = {
  renaissance:  'https://i.imgur.com/LWZzIsG.jpeg',
  flemish:      'https://i.imgur.com/dyhqeLR.jpeg',
  contemporary: 'https://i.imgur.com/3IqEEby.jpeg',
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

export default function ProductPage() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { addItem, openCart } = useCart()
  const product = (slug && PRODUCTS[slug]) ? PRODUCTS[slug] : FALLBACK

  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedFrame, setSelectedFrame] = useState(1)
  const [selectedFormat, setSelectedFormat] = useState<'framed' | 'rolled'>('rolled')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  // 0 = print composite, 1 = frame/room composite, 2 = raw portrait
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const [justAdded, setJustAdded] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>('description')

  const portraitKey = (slug && SLUG_TO_PORTRAIT[slug]) ?? null
  const selectedFrameKey = FRAMES[selectedFrame].imageKey

  const printComposite = portraitKey ? (PRINT_COMPOSITES[portraitKey] ?? product.image) : product.image
  const frameComposite = portraitKey ? (FRAME_IMAGES[portraitKey]?.[selectedFrameKey] ?? product.image) : product.image
  const rawPortrait    = portraitKey ? (PORTRAIT_IMAGES[portraitKey] ?? product.image) : product.image

  const imageList = [printComposite, frameComposite, rawPortrait]
  const displayImage = imageList[selectedImageIdx] ?? printComposite

  const similarProducts = Object.entries(PRODUCTS)
    .filter(([key]) => key !== slug)
    .slice(0, 2)

  const price = selectedFormat === 'framed'
    ? SIZES[selectedSize].price + FRAME_ADDONS[selectedSize]
    : SIZES[selectedSize].price

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  // Reset to print composite when slug changes
  useEffect(() => { setSelectedImageIdx(0) }, [slug])

  const handleAddToCart = () => {
    const isFramed = selectedFormat === 'framed'
    const frameAddon = isFramed ? FRAME_ADDONS[selectedSize] : 0
    const variantId = slug && SHOPIFY_VARIANTS[slug] ? String(SHOPIFY_VARIANTS[slug][selectedSize]) : null
    addItem({
      id: (slug ?? 'fallback') + '_' + selectedSize + '_' + selectedFormat,
      slug: slug ?? 'fallback',
      title: product.title,
      sizeKey: selectedSize,
      sizeLabel: SIZES[selectedSize].label,
      price: SIZES[selectedSize].price,
      image: product.image,
      variantId,
      isFramed,
      frameKey: isFramed ? FRAMES[selectedFrame].key : null,
      frameLabel: isFramed ? FRAMES[selectedFrame].label : null,
      frameAddon,
    })
    openCart()
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="min-h-screen pb-20 md:pb-0">

      <div className="flex flex-col lg:flex-row">

        {/* Left: Image gallery */}
        <div className="w-full lg:w-[55%] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex flex-col">

          {/* Main image */}
          <div
            className="relative overflow-hidden cursor-zoom-in flex-1"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={displayImage}
              alt={product.title}
              crossOrigin="anonymous"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="w-full" style={{ paddingBottom: '133%' }} />
          </div>

          {/* Thumbnail row */}
          {portraitKey && (
            <div className="flex gap-2 p-3 bg-alabaster">
              {[
                { src: printComposite,  label: 'Print presentation' },
                { src: frameComposite,  label: 'Framed view' },
                { src: rawPortrait,     label: 'Portrait detail' },
              ].map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  aria-label={thumb.label}
                  className={`w-16 h-16 overflow-hidden flex-shrink-0 transition-all duration-150 ${
                    selectedImageIdx === idx
                      ? 'ring-2 ring-[#2A2927] ring-offset-1'
                      : 'ring-1 ring-[#E8E2D9] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-[45%] px-8 lg:px-14 py-12 lg:py-16 bg-alabaster">

          {/* 1. Artist line */}
          <p className="font-garamond text-xs tracking-[0.2em] uppercase text-[#8B7355] mb-3">
            VERITAS EDITIONS
          </p>

          {/* 2. Title */}
          <h1 className="font-garamond text-4xl font-normal text-[#2A2927] mb-4 leading-tight">
            {product.title}
          </h1>

          {/* 3. Price */}
          <div className="mb-2">
            <p className="font-garamond text-3xl text-[#2A2927]">
              {selectedFormat === 'rolled' ? 'From ' : ''}\${price}
            </p>
          </div>

          {/* 4. Edition metadata block */}
          <div className="border-t border-[#E8E2D9] mt-4 mb-4">
            <div className="flex justify-between py-2 border-b border-[#E8E2D9]">
              <span className="text-xs tracking-widest uppercase text-[#2A2927]">Limited Edition</span>
              <span className="text-xs text-[#8B7355]">Fine art archival print</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E8E2D9]">
              <span className="text-xs tracking-widest uppercase text-[#2A2927]">Edition of 250</span>
              <span className="text-xs text-[#8B7355]">Hand numbered</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#E8E2D9]">
              <span className="text-xs tracking-widest uppercase text-[#2A2927]">Ships in 3 Days</span>
              <span className="text-xs text-[#8B7355]">Worldwide</span>
            </div>
          </div>

          {/* 5. Size selector */}
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
            <p className="font-garamond text-xs text-[#8B7355] mt-2">
              {selectedFormat === 'rolled'
                ? '(framing available at checkout)'
                : `(includes ${FRAMES[selectedFrame].label} frame)`}
            </p>
          </div>

          {/* 6. Format toggle */}
          <div className="mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFormat('rolled')}
                className={`font-garamond text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-150 ${
                  selectedFormat === 'rolled'
                    ? 'bg-charcoal text-parchment border-charcoal'
                    : 'bg-transparent text-umber border-umber/40 hover:border-umber'
                }`}
              >
                Print Only
              </button>
              <button
                onClick={() => setSelectedFormat('framed')}
                className={`font-garamond text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-150 flex items-center gap-2 ${
                  selectedFormat === 'framed'
                    ? 'bg-charcoal text-parchment border-charcoal'
                    : 'bg-transparent text-umber border-umber/40 hover:border-umber'
                }`}
              >
                Add a Frame
                <span
                  className="font-garamond text-xs"
                  style={{ opacity: selectedFormat === 'framed' ? 0.7 : 0.6 }}
                >
                  +\${FRAME_ADDONS[selectedSize]}
                </span>
              </button>
            </div>
          </div>

          {/* 7. Frame swatches */}
          {selectedFormat === 'framed' && (
            <div className="mb-7">
              <p className="font-garamond text-xs tracking-widest uppercase text-umber mb-3">
                {t('product.frame_label')} &mdash; <span className="normal-case">{FRAMES[selectedFrame].label}</span>
              </p>
              <div className="flex gap-3">
                {FRAMES.map((f, i) => (
                  <button
                    key={f.key}
                    onClick={() => setSelectedFrame(i)}
                    aria-label={f.label}
                    className={`w-8 h-8 rounded-sm cursor-pointer transition-all duration-150 ${
                      selectedFrame === i
                        ? 'ring-2 ring-offset-1 ring-[#2A2927]'
                        : ''
                    }`}
                    style={{
                      backgroundColor: f.color,
                      border: (f as { border?: string }).border ? `1px solid ${(f as { border?: string }).border}` : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 8. Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-[#2A2927] text-parchment font-garamond text-sm tracking-widest uppercase mb-4 transition-opacity hover:opacity-90"
          >
            {justAdded ? 'Added to Cart' : t('product.add_to_collection')}
          </button>

          {/* Trust signals */}
          <p className="font-garamond text-xs text-[#A1A1AA] text-center tracking-wide mt-5 mb-2">
            200-year archival \u00b7 Museum UV glazing \u00b7 Lifetime guarantee \u00b7 Ships from Austin, TX
          </p>

          {/* Divider */}
          <div className="section-divider my-8" />

          {/* 9. Accordion sections */}
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
                  Printed on 310 GSM Hahnem\u00fchle Photo Rag fine art paper. Museum-grade archival inks rated 200+ years. Solid wood frame, hand-assembled in Austin, TX. Museum UV-protective glazing. Available in 8\u00d712", 12\u00d718", 18\u00d727", and 24\u00d736" (all 2:3 ratio). Ships fully assembled in custom double-wall packaging.
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
                  Free shipping within the US. International shipping available. Ships within 3\u20135 business days. 30-day free returns \u2014 we&apos;ll arrange pickup. Questions? Contact us at studio@veritaseditions.com
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
                  These portraits are original compositions rendered in archival pigments by studio artists working in the Flemish oil tradition and the Italian Renaissance manner. Each work is produced as a limited edition of 250 impressions on 310 GSM Hahnem\u00fchle Photo Rag. Hand-assembled in Austin, TX. Certificate of authenticity included.
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
              Back to Collection
            </Link>
          </div>

        </div>
      </div>

      {/* You May Also Like */}
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
                  From \${p.basePrice}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sticky mobile Add to Cart bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#EFECE5] border-t border-[#E4E4E7] px-4 py-3 flex items-center justify-between">
        <div>
          <p className="max-w-[160px] truncate" style={{ fontSize: '14px', color: '#2C2C2C' }}>{product.title}</p>
          <p style={{ fontSize: '14px', color: '#8C8C7A' }}>\${price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="px-6 py-3 bg-[#2A2927] text-[#EFECE5] font-garamond text-xs tracking-widest uppercase"
        >
          Add to Cart
        </button>
      </div>

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
