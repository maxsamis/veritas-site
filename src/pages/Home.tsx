import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'

const GRADIENTS = {
  primary: 'linear-gradient(160deg, #2a2520 0%, #3d3028 40%, #4a3828 70%, #2a2520 100%)',
  variantA: 'linear-gradient(160deg, #1e1a16 0%, #2d2318 40%, #3a2e1e 70%, #1e1a16 100%)',
  variantB: 'linear-gradient(160deg, #252018 0%, #33281a 40%, #3e2f1c 70%, #252018 100%)',
}

const PORTRAITS = [
  'https://i.imgur.com/ThF68zp.jpeg',
  'https://i.imgur.com/VqFWzKB.jpeg',
  'https://i.imgur.com/TQIrBod.jpeg',
]

const HERO_COMPOSITE = 'https://i.imgur.com/M9qXc66.jpeg'

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
        className="relative min-h-[92vh] lg:min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Hero background — real room composite */}
        <img
          src={HERO_COMPOSITE}
          alt="Sacred art in a luxury interior"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-charcoal/55" />

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
            slug="the-good-shepherd"
            showExplore={false}
            imageUrl={PORTRAITS[0]}
          />
          <ProductCard
            title="Christ the Redeemer"
            style="Renaissance"
            price="$145"
            gradient={GRADIENTS.variantA}
            slug="christ-the-redeemer"
            showExplore={false}
            imageUrl={PORTRAITS[1]}
          />
          <ProductCard
            title="Light of the World"
            style="Contemporary Sacred"
            price="$175"
            gradient={GRADIENTS.variantB}
            slug="light-of-the-world"
            showExplore={false}
            imageUrl={PORTRAITS[2]}
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
          {craftItems.map((item) => (
            <div key={item.key} className="text-center">
              <div className="text-2xl text-umber mb-5">{item.icon}</div>
              <h3 className="font-cormorant font-light text-xl text-charcoal mb-3">
                {t(`home.${item.key}_title`)}
              </h3>
              <p className="font-garamond text-sm text-umber leading-relaxed">
                {t(`home.${item.key}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="section-divider" />
      </div>

      {/* ── Pull Quote ───────────────────────────────────── */}
      <section className="bg-charcoal py-24 lg:py-36 px-6 text-center">
        <blockquote className="max-w-3xl mx-auto font-cormorant italic font-light text-2xl md:text-3xl lg:text-4xl text-parchment leading-relaxed">
          "{t('home.pull_quote')}"
        </blockquote>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-10 py-16 border-t border-umber/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="wordmark text-xs text-charcoal tracking-widest2 mb-2">VERITAS</p>
            <p className="font-garamond text-xs text-umber">{t('footer.tagline')}</p>
          </div>
          <div className="flex gap-8 font-garamond text-xs tracking-widest uppercase text-umber">
            <Link to="/collection" className="hover:text-charcoal transition-colors">{t('nav.collection')}</Link>
            <Link to="/about" className="hover:text-charcoal transition-colors">{t('nav.about')}</Link>
            <Link to="/faq" className="hover:text-charcoal transition-colors">{t('nav.faq')}</Link>
            <Link to="/policies" className="hover:text-charcoal transition-colors">{t('nav.policies')}</Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-umber/10">
          <p className="font-garamond text-[10px] text-umber/60 text-center">
            © {new Date().getFullYear()} Veritas. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  )
}
