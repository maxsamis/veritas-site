import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/ProductCard'

const GRADIENTS = {
  primary: 'linear-gradient(160deg, #2a2520 0%, #3d3028 40%, #4a3828 70%, #2a2520 100%)',
  variantA: 'linear-gradient(160deg, #1e1a16 0%, #2d2318 40%, #3a2e1e 70%, #1e1a16 100%)',
  variantB: 'linear-gradient(160deg, #252018 0%, #33281a 40%, #3e2f1c 70%, #252018 100%)',
}

const carouselReviews = [
  {
    id: 3,
    name: 'Emma T.',
    city: 'Nashville, TN',
    title: 'My whole family was moved to tears',
    body: 'We gave Light of the World to my parents for their 40th anniversary. My mother cried when she opened it. The quality of the print combined with the solid wood frame made it feel like a genuine heirloom. We ordered a second one for ourselves.',
  },
  {
    id: 10,
    name: 'Noah P.',
    city: 'Seattle, WA',
    title: 'Three friends ordered after seeing mine',
    body: 'Prince of Peace has been a conversation piece since day one. Three of my friends have now ordered from Veritas after visiting and seeing it in person. That\'s the best endorsement I can give — this print sells itself.',
  },
  {
    id: 20,
    name: 'Evelyn T.',
    city: 'Phoenix, AZ',
    title: 'My priest asked where I got it',
    body: 'Christ the Redeemer hangs in our home chapel and my priest saw it during a house blessing. He asked immediately where I\'d purchased it. The piece has an authenticity and gravitas that you can\'t fake. Absolutely worthy of sacred space.',
  },
  {
    id: 42,
    name: 'Lauren B.',
    city: 'Dallas, TX',
    title: 'My husband cried',
    body: 'Gifted Emmanuel to my husband for our tenth anniversary. He\'s not a crier. He cried. The piece is that beautiful, that meaningful. It hangs in his home office now and he says it starts every workday on the right note.',
  },
  {
    id: 72,
    name: 'Charles N.',
    city: 'Denver, CO',
    title: 'Simply the best I\'ve seen',
    body: 'I\'ve visited galleries in New York, London, and Paris. Emmanuel compares favorably to what hangs in those spaces. The print quality, the frame construction, the total composition — this is the real thing. Veritas has created something special.',
  },
  {
    id: 77,
    name: 'Nancy F.',
    city: 'Charlotte, NC',
    title: 'The gift of a lifetime',
    body: 'The Sacred Heart was a gift to my sister during a difficult time in her life. She said it brought her genuine comfort every day it hung on her wall. Art that can do that is worth ten times its price. I cannot recommend it highly enough.',
  },
  {
    id: 97,
    name: 'Raymond L.',
    city: 'New York, NY',
    title: 'Better than what hangs in hotels',
    body: 'I travel constantly and stay in luxury hotels. The art in those spaces is carefully curated and of the highest quality. Light of the World is better than most of what I\'ve seen in those rooms. That\'s the best frame of reference I can offer.',
  },
  {
    id: 100,
    name: 'Teresa M.',
    city: 'Dallas, TX',
    title: 'The last piece of art I\'ll ever need to buy',
    body: 'Emmanuel is the piece I\'ve been searching for my entire adult life. The quality is beyond what I imagined possible at this price, and the archival materials mean it will outlast everything else on our walls. I am done searching.',
  },
]

const ugcPhotos = [
  'https://i.imgur.com/whtAlx1.jpeg',
  'https://i.imgur.com/zQCIOqy.jpeg',
  'https://i.imgur.com/WGRNmXf.jpeg',
  'https://i.imgur.com/ThF68zp.jpeg',
  'https://i.imgur.com/VqFWzKB.jpeg',
]

const craftItems = [
  {
    key: 'craft_1',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#7A7365" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>
    ),
  },
  {
    key: 'craft_2',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="#7A7365" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
      </svg>
    ),
  },
]

export default function Home() {
  const { t } = useTranslation()
  const [reviewsPaused, setReviewsPaused] = useState(false)

  const mergedItems = [
    { type: 'review' as const, ...carouselReviews[0] },
    { type: 'photo' as const, url: ugcPhotos[0] },
    { type: 'review' as const, ...carouselReviews[1] },
    { type: 'review' as const, ...carouselReviews[2] },
    { type: 'photo' as const, url: ugcPhotos[1] },
    { type: 'review' as const, ...carouselReviews[3] },
    { type: 'photo' as const, url: ugcPhotos[2] },
    { type: 'review' as const, ...carouselReviews[4] },
    { type: 'review' as const, ...carouselReviews[5] },
    { type: 'photo' as const, url: ugcPhotos[3] },
    { type: 'review' as const, ...carouselReviews[6] },
    { type: 'photo' as const, url: ugcPhotos[4] },
    { type: 'review' as const, ...carouselReviews[7] },
  ]

  return (
    <div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[92vh] lg:min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          backgroundImage: 'url(https://i.imgur.com/whtAlx1.jpeg)',
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
            Museum-grade archival prints. Hand-assembled frames. Six original compositions.
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

      {/* ── Press Bar ────────────────────────────────────── */}
      <section className="py-8 border-y border-[#E4E4E7] bg-[#FAFAF8] overflow-hidden">
        <div className="flex items-center justify-center mb-5">
          <span className="font-garamond text-xs tracking-[0.2em] uppercase text-[#B0A898]">As featured in</span>
        </div>
        <style>{`
          @keyframes press-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .press-track {
            display: flex;
            align-items: center;
            gap: 64px;
            animation: press-scroll 28s linear infinite;
            width: max-content;
            padding: 0 32px;
          }
          .press-track:hover { animation-play-state: paused; }
        `}</style>
        <div className="press-track">
          {[
            { src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/The_New_York_Times_Logo.svg', alt: 'The New York Times', h: 22 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Architectural_Digest_logo.svg/320px-Architectural_Digest_logo.svg.png', alt: 'Architectural Digest', h: 18 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/WSJ_Logo.svg/320px-WSJ_Logo.svg.png', alt: 'The Wall Street Journal', h: 20 },
            { src: 'https://logo.clearbit.com/townandcountrymag.com', alt: 'Town & Country', h: 20 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Vogue_logo.svg/320px-Vogue_logo.svg.png', alt: 'Vogue', h: 28 },
            { src: 'https://logo.clearbit.com/elledecor.com', alt: 'Elle Decor', h: 20 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/0/02/The_New_York_Times_Logo.svg', alt: 'The New York Times 2', h: 22 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Architectural_Digest_logo.svg/320px-Architectural_Digest_logo.svg.png', alt: 'Architectural Digest 2', h: 18 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/WSJ_Logo.svg/320px-WSJ_Logo.svg.png', alt: 'The Wall Street Journal 2', h: 20 },
            { src: 'https://logo.clearbit.com/townandcountrymag.com', alt: 'Town & Country 2', h: 20 },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Vogue_logo.svg/320px-Vogue_logo.svg.png', alt: 'Vogue 2', h: 28 },
            { src: 'https://logo.clearbit.com/elledecor.com', alt: 'Elle Decor 2', h: 20 },
          ].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              style={{ height: `${logo.h}px`, width: 'auto', filter: 'grayscale(1) opacity(0.4)', flexShrink: 0 }}
            />
          ))}
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
            image="https://i.imgur.com/whtAlx1.jpeg"
            slug="the-good-shepherd"
            showExplore={false}
          />
          <ProductCard
            title="Christ the Redeemer"
            style="Renaissance"
            price="$145"
            gradient={GRADIENTS.variantA}
            image="https://i.imgur.com/zQCIOqy.jpeg"
            slug="christ-the-redeemer"
            showExplore={false}
          />
          <ProductCard
            title="Light of the World"
            style="Contemporary Sacred"
            price="$175"
            gradient={GRADIENTS.variantB}
            image="https://i.imgur.com/WGRNmXf.jpeg"
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

      {/* ── Reviews + UGC Carousel ─────────────────────── */}
      <section className="py-20 overflow-hidden" style={{ background: '#F2EDE4' }}>
        <div className="text-center mb-10 px-6">
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#2C2C2C', marginBottom: '8px' }}>
            What Our Customers Say
          </h2>
          <p style={{ fontSize: '14px', color: '#8C8C7A' }}>Delivered to homes in 40+ countries</p>
        </div>

        {/* Single merged carousel — alternates UGC photos and review cards */}
        <div
          className="scrollbar-hide"
          style={{ overflow: 'hidden', width: '100%' }}
          onMouseEnter={() => setReviewsPaused(true)}
          onMouseLeave={() => setReviewsPaused(false)}
        >
          <div
            style={{
              display: 'flex',
              gap: '16px',
              paddingLeft: '24px',
              width: 'max-content',
              animation: `scrollLeft 40s linear infinite`,
              animationPlayState: reviewsPaused ? 'paused' : 'running',
            }}
          >
            {[...mergedItems, ...mergedItems].map((item, i) =>
              item.type === 'photo' ? (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: '220px',
                    height: '300px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={item.url}
                    alt="Customer home"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: '280px',
                    background: '#F9F6F1',
                    borderRadius: '12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '300px',
                  }}
                >
                  <div>
                    <div style={{ color: '#C9A84C', fontSize: '16px', marginBottom: '10px', letterSpacing: '2px' }}>
                      {'★★★★★'}
                    </div>
                    <p
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontStyle: 'italic',
                        fontSize: '16px',
                        color: '#3C3C3C',
                        lineHeight: '1.6',
                        display: '-webkit-box',
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      "{item.body}"
                    </p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#8C8C7A', marginTop: '12px' }}>
                    {item.name} — {(item as any).city || ''}
                  </p>
                </div>
              )
            )}
          </div>
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
