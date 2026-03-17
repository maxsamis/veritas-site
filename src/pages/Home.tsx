import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'

const GRADIENTS = {
  primary: 'linear-gradient(160deg, #2a2520 0%, #3d3028 40%, #4a3828 70%, #2a2520 100%)',
  variantA: 'linear-gradient(160deg, #1e1a16 0%, #2d2318 40%, #3a2e1e 70%, #1e1a16 100%)',
  variantB: 'linear-gradient(160deg, #252018 0%, #33281a 40%, #3e2f1c 70%, #252018 100%)',
}

const craftItems = [
  { key: 'craft_1', icon: '◈' },
  { key: 'craft_2', icon: '◇' },
  { key: 'craft_3', icon: '◉' },
  { key: 'craft_4', icon: '◎' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] lg:min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: 'url(https://i.imgur.com/M9qXc66.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(120,90,60,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Cross motif — ultra-subtle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
          <div className="relative w-px bg-parchment" style={{ height: '55%' }}>
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 h-px bg-parchment w-20 lg:w-32" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-10">
          <span className="wordmark text-xs lg:text-sm text-parchment/60 tracking-widest2">
            VERITAS
          </span>

          <h1 className="font-cormorant italic font-light text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-parchment leading-tight max-w-3xl">
            {t('home.hero_headline')}
          </h1>

          <div className="h-px w-12 bg-parchment/30" />

          <Link to="/collection">
            <button className="btn-outline-parchment tracking-widest">
              {t('home.hero_cta')}
            </button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-parchment animate-pulse" />
        </div>
      </section>

      {/* ── Collection Preview ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-center mb-14 lg:mb-16">
          <p className="font-garamond text-xs tracking-[0.25em] uppercase text-umber mb-4">
            {t('collection.original')}
          </p>
          <h2 className="font-cormorant font-light text-3xl lg:text-5xl text-charcoal mb-5">
            {t('home.preview_title')}
          </h2>
          <p className="font-garamond text-base lg:text-lg text-umber max-w-xl mx-auto leading-relaxed">
            {t('home.preview_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          <ProductCard
            title="The Good Shepherd"
            style="Classical Oil"
            price="$145"
            gradient={GRADIENTS.primary}
            image="https://i.imgur.com/ThF68zp.jpeg"
            slug="the-good-shepherd"
            showExplore={false}
          />
          <ProductCard
            title="Christ the Redeemer"
            style="Renaissance"
            price="$145"
            gradient={GRADIENTS.variantA}
            image="https://i.imgur.com/VqFWzKB.jpeg"
            slug="christ-the-redeemer"
            showExplore={false}
          />
          <ProductCard
            title="Light of the World"
            style="Contemporary Sacred"
            price="$175"
            gradient={GRADIENTS.variantB}
            image="https://i.imgur.com/TQIrBod.jpeg"
            slug="light-of-the-world"
            showExplore={false}
          />
        </div>

        <div className="text-center mt-14">
          <Link to="/collection">
            <span className="font-garamond text-sm tracking-widest uppercase text-umber border-b border-umber/50 pb-px hover:text-charcoal hover:border-charcoal transition-colors">
              {t('home.cta_section_btn')} →
            </span>
          </Link>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="section-divider" />
      </div>

      {/* ── Craft Section ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="text-center mb-14">
          <h2 className="font-cormorant italic font-light text-3xl lg:text-5xl text-charcoal">
            {t('home.craft_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {craftItems.map(({ key, icon }) => (
            <div key={key} className="text-center lg:text-left">
              <div className="font-cormorant text-2xl text-umber mb-4">{icon}</div>
              <h3 className="font-cormorant font-light text-xl lg:text-2xl text-charcoal mb-3">
                {t(`home.${key}_title`)}
              </h3>
              <p className="font-garamond text-sm leading-relaxed text-umber">
                {t(`home.${key}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pull Quote ───────────────────────────────────── */}
      <section
        className="py-24 lg:py-36 px-6 text-center"
        style={{ backgroundColor: '#2A2927' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="font-cormorant text-parchment/30 text-7xl leading-none mb-2">&ldquo;</div>
          <blockquote className="font-cormorant italic font-light text-3xl md:text-4xl lg:text-5xl text-parchment leading-snug">
            {t('home.quote')}
          </blockquote>
          <div className="mt-8 h-px w-12 bg-parchment/20 mx-auto" />
          <p className="wordmark text-xs text-parchment/30 mt-6 tracking-widest2">VERITAS</p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
        <p className="font-garamond text-xs tracking-[0.25em] uppercase text-umber mb-5">
          {t('collection.original')}
        </p>
        <h2 className="font-cormorant font-light text-3xl lg:text-5xl text-charcoal mb-5">
          {t('home.cta_section_title')}
        </h2>
        <p className="font-garamond text-base text-umber mb-10 max-w-md mx-auto leading-relaxed">
          {t('home.cta_section_desc')}
        </p>
        <Link to="/collection">
          <button className="btn-charcoal tracking-widest">
            {t('home.cta_section_btn')}
          </button>
        </Link>
      </section>

    </div>
  )
}
