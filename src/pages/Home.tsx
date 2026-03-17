import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'

const GRADIENTS = {
  primary: 'linear-gradient(160deg, #2a2520 0%, #3d3028 40%, #4a3828 70%, #2a2520 100%)',
  variantA: 'linear-gradient(160deg, #1e1a16 0%, #2d2318 40%, #3a2e1e 70%, #1e1a16 100%)',
  variantB: 'linear-gradient(160deg, #252018 0%, #33281a 40%, #3e2f1c 70%, #252018 100%)',
}

const craftItems = [
  {
    key: 'craft_1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#7A7365" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
      </svg>
    ),
  },
  {
    key: 'craft_2',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#7A7365" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    key: 'craft_3',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#7A7365" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    key: 'craft_4',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#7A7365" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] lg:min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: 'url(https://i.imgur.com/ThF68zp.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: 'rgba(30, 22, 16, 0.55)' }}
        />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(120,90,60,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Cross motif — ultra-subtle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
          <div className="relative w-px bg-parchment" style={{ height: '55%' }}>
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 h-px bg-parchment w-20 lg:w-32" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 lg:gap-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col items-center gap-3">
            <div className="h-px w-8 bg-parchment/40" />
            <span className="wordmark text-[10px] lg:text-xs text-parchment/50 tracking-[0.35em]">
              VERITAS
            </span>
            <div className="h-px w-8 bg-parchment/40" />
          </div>

          <h1 className="font-cormorant italic font-light text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-parchment leading-tight max-w-3xl">
            {t('home.hero_headline')}
          </h1>

          <p className="font-garamond text-sm lg:text-base text-parchment/60 max-w-sm text-center leading-relaxed">
            Original compositions. Limited editions. Ready to hang.
          </p>

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
              <div className="mb-5 flex justify-center lg:justify-start">{icon}</div>
              <div className="h-px w-8 bg-umber/20 mb-5 mx-auto lg:mx-0" />
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
        className="py-28 lg:py-44 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: '#2A2927' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(120,90,60,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="h-px w-10 bg-parchment/20 mx-auto mb-10" />
          <div className="font-cormorant text-parchment/20 text-8xl leading-none mb-4 select-none">&ldquo;</div>
          <blockquote className="font-cormorant italic font-light text-3xl md:text-4xl lg:text-5xl text-parchment leading-snug tracking-tight">
            {t('home.quote')}
          </blockquote>
          <div className="mt-10 h-px w-10 bg-parchment/20 mx-auto" />
          <p className="wordmark text-[10px] text-parchment/25 mt-7 tracking-[0.35em]">VERITAS</p>
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
