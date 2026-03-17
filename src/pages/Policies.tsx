import { useTranslation } from 'react-i18next'

const sections = [
  { titleKey: 'policies.returns_title', bodyKey: 'policies.returns_body' },
  { titleKey: 'policies.shipping_title', bodyKey: 'policies.shipping_body' },
  { titleKey: 'policies.warranty_title', bodyKey: 'policies.warranty_body' },
  { titleKey: 'policies.privacy_title', bodyKey: 'policies.privacy_body' },
]

export default function Policies() {
  const { t } = useTranslation()

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

      {/* Header */}
      <div className="mb-14">
        <p className="font-garamond text-xs tracking-[0.25em] uppercase text-umber mb-4">
          VERITAS
        </p>
        <h1 className="font-cormorant font-light text-4xl lg:text-6xl text-charcoal">
          {t('policies.title')}
        </h1>
      </div>

      <div className="section-divider mb-12" />

      {/* Sections */}
      <div className="space-y-16">
        {sections.map(({ titleKey, bodyKey }) => (
          <section key={titleKey}>
            <h2 className="font-cormorant font-light text-2xl lg:text-3xl text-charcoal mb-6">
              {t(titleKey)}
            </h2>
            {t(bodyKey).split('\n\n').map((para, i) => (
              <p key={i} className="font-garamond text-base leading-relaxed text-umber mb-4">
                {para}
              </p>
            ))}
            <div className="section-divider mt-16" />
          </section>
        ))}
      </div>

    </div>
  )
}
