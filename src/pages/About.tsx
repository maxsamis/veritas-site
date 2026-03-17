import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  return (
    <div>

      {/* ── Hero Quote ───────────────────────────────────── */}
      <section
        className="min-h-[70vh] flex items-center justify-center px-6 text-center"
        style={{ backgroundColor: '#2A2927' }}
      >
        <div className="max-w-3xl">
          <span className="wordmark text-xs text-parchment/30 tracking-widest2 block mb-10">
            VERITAS
          </span>
          <blockquote className="font-cormorant italic font-light text-3xl md:text-4xl lg:text-5xl text-parchment leading-snug">
            {t('about.hero_quote')}
          </blockquote>
          <div className="h-px w-12 bg-parchment/20 mx-auto mt-10" />
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

        {/* Section 1 */}
        <section className="mb-20">
          <h2 className="font-cormorant font-light text-3xl lg:text-4xl text-charcoal mb-8">
            {t('about.section1_title')}
          </h2>
          {t('about.section1_body').split('\n\n').map((para, i) => (
            <p key={i} className="font-garamond text-base lg:text-lg leading-relaxed text-umber mb-6">
              {para}
            </p>
          ))}
        </section>

        {/* Divider with motif */}
        <div className="flex items-center gap-6 mb-20">
          <div className="flex-1 h-px bg-umber/20" />
          <span className="font-cormorant text-umber/40">✦</span>
          <div className="flex-1 h-px bg-umber/20" />
        </div>

        {/* Section 2 */}
        <section className="mb-20">
          <h2 className="font-cormorant font-light text-3xl lg:text-4xl text-charcoal mb-8">
            {t('about.section2_title')}
          </h2>
          {t('about.section2_body').split('\n\n').map((para, i) => (
            <p key={i} className="font-garamond text-base lg:text-lg leading-relaxed text-umber mb-6">
              {para}
            </p>
          ))}
        </section>

        {/* Divider */}
        <div className="flex items-center gap-6 mb-20">
          <div className="flex-1 h-px bg-umber/20" />
          <span className="font-cormorant text-umber/40">✦</span>
          <div className="flex-1 h-px bg-umber/20" />
        </div>

        {/* Section 3 */}
        <section className="mb-20">
          <h2 className="font-cormorant font-light text-3xl lg:text-4xl text-charcoal mb-8">
            {t('about.section3_title')}
          </h2>
          {t('about.section3_body').split('\n\n').map((para, i) => (
            <p key={i} className="font-garamond text-base lg:text-lg leading-relaxed text-umber mb-6">
              {para}
            </p>
          ))}
        </section>

        {/* Closing Quote */}
        <div className="bg-alabaster border-l-2 border-umber/30 pl-8 py-6">
          <blockquote className="font-cormorant italic font-light text-xl lg:text-2xl text-charcoal leading-relaxed">
            &ldquo;{t('about.closing_quote')}&rdquo;
          </blockquote>
        </div>

      </div>
    </div>
  )
}
