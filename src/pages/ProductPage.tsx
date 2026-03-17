import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const SIZES = [
  { key: 'size_sm', price: 145 },
  { key: 'size_md', price: 195 },
  { key: 'size_lg', price: 285 },
]

const FRAMES = [
  { key: 'frame_black', color: '#1a1a1a' },
  { key: 'frame_walnut', color: '#5c3d1e' },
  { key: 'frame_white', color: '#f0ece2' },
  { key: 'frame_gold', color: '#b89040' },
  { key: 'frame_natural', color: '#c4a55a' },
]

export default function ProductPage() {
  const { t } = useTranslation()
  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedFrame, setSelectedFrame] = useState(0)
  const [selectedFormat, setSelectedFormat] = useState<'framed' | 'rolled'>('framed')
  const [showARModal, setShowARModal] = useState(false)

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

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">

        {/* ── Left: Image ──────────────────────────────── */}
        <div
          className="w-full lg:w-[55%] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] relative overflow-hidden"
        >
          <img
            src="https://i.imgur.com/ThF68zp.jpeg"
            alt="The Good Shepherd — Classical Oil Portrait"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Portrait placeholder ratio for mobile */}
          <div className="w-full" style={{ paddingBottom: '133%' }} />
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
          <h1 className="font-cormorant italic font-light text-4xl lg:text-5xl text-charcoal mt-5 mb-2 leading-tight">
            The Good Shepherd
          </h1>

          {/* Style + Edition */}
          <p className="font-garamond text-xs tracking-[0.18em] uppercase text-umber mb-1">
            {t('product.style')}
          </p>
          <p className="font-garamond text-xs tracking-[0.12em] uppercase text-umber/60 mb-8">
            {t('product.edition_note')}
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
              {t('product.frame_label')} — <span className="normal-case">{t(`product.${FRAMES[selectedFrame].key}`)}</span>
            </p>
            <div className="flex gap-3">
              {FRAMES.map((f, i) => (
                <button
                  key={f.key}
                  onClick={() => setSelectedFrame(i)}
                  aria-label={t(`product.${f.key}`)}
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

          {/* Shipping note */}
          <p className="font-garamond text-xs text-umber/60 text-center tracking-wide">
            {t('product.ships_from')}
          </p>

          {/* Divider */}
          <div className="section-divider my-8" />

          {/* Description */}
          <p className="font-garamond text-base leading-relaxed text-umber">
            {t('product.description')}
          </p>

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
