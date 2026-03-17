import { useState } from 'react'
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

  const price = SIZES[selectedSize].price + (selectedFormat === 'rolled' ? -30 : 0)

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">

        {/* ── Left: Image ──────────────────────────────── */}
        <div
          className="w-full lg:w-[55%] lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] relative overflow-hidden"
        >
          <img
            src="https://i.imgur.com/M9qXc66.jpeg"
            alt="Portrait on wall, SoHo Loft"
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
    </div>
  )
}
