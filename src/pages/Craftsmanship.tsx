import { Link } from 'react-router-dom'

const sections = [
  {
    number: '01',
    title: '300 GSM Fine Art Paper',
    subtitle: 'The Paper',
    body: 'We print exclusively on Hahnemühle Photo Rag 308, a 100% cotton rag paper with a smooth matte surface that eliminates glare and gives each piece the presence of an original painting. No optical brighteners. No shortcuts.',
  },
  {
    number: '02',
    title: '12-Color Archival Pigment Inks',
    subtitle: 'The Inks',
    body: 'Our Epson SC-P9000 printers use UltraChrome HDX pigment inks rated for 200+ years of light-fastness. Blacks are deep and dimensionally rich. Colors are faithful to the original composition. Every print is inspected under museum-grade lighting before framing.',
  },
  {
    number: '03',
    title: 'Hand-Assembled in the United States',
    subtitle: 'The Frame',
    body: 'Each frame is built from solid wood moulding, hand-assembled by our team in Austin, Texas. We use museum-quality UV-protective glazing and acid-free backing board. The result is a piece that will outlast the wall it hangs on.',
  },
  {
    number: '04',
    title: 'White-Glove Delivery',
    subtitle: 'The Packaging',
    body: "Every order ships double-boxed with custom foam inserts designed for each frame size. Fragile corners are individually protected. We've never had a piece arrive damaged — and we intend to keep it that way.",
  },
]

const GradientPlaceholder = () => (
  <div
    className="w-full h-full min-h-[320px] rounded-[8px]"
    style={{
      background:
        'linear-gradient(135deg, #1a1916 0%, #2A2927 30%, #3d3830 60%, #1a1916 100%)',
    }}
  />
)

export default function Craftsmanship() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero */}
      <div
        className="relative w-full py-28 lg:py-40 px-6 flex flex-col items-center justify-center text-center"
        style={{ backgroundColor: '#2A2927' }}
      >
        <h1 className="font-cormorant italic font-light text-5xl lg:text-7xl text-parchment leading-tight max-w-3xl">
          Every print begins with an obsession.
        </h1>
        <p className="font-garamond text-lg lg:text-xl text-[#A8A39C] mt-6 max-w-xl leading-relaxed">
          From archival paper selection to final white-glove packaging, every
          step of our process is deliberate.
        </p>
        <div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background:
              'linear-gradient(to bottom, transparent, #EFECE5)',
          }}
        />
      </div>

      {/* Process sections */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-8">
        {sections.map((section, i) => {
          const isEven = i % 2 === 0

          return (
            <div
              key={section.number}
              className={`flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-12 lg:gap-20 items-center mb-24 lg:mb-32`}
            >
              {/* Text */}
              <div className="flex-1 max-w-lg">
                <p className="font-garamond text-xs tracking-[0.2em] uppercase text-umber mb-4">
                  {section.subtitle}
                </p>
                <div className="flex items-start gap-4 mb-6">
                  <span
                    className="font-cormorant italic text-6xl lg:text-7xl leading-none"
                    style={{ color: '#E4E4E7' }}
                  >
                    {section.number}
                  </span>
                  <h2 className="font-cormorant font-light text-3xl lg:text-4xl text-charcoal leading-tight mt-2">
                    {section.title}
                  </h2>
                </div>
                <div className="w-10 h-px bg-umber/40 mb-6" />
                <p className="font-garamond text-base lg:text-lg leading-relaxed text-umber">
                  {section.body}
                </p>
              </div>

              {/* Image placeholder */}
              <div className="flex-1 w-full">
                <GradientPlaceholder />
              </div>
            </div>
          )
        })}
      </div>

      {/* Stats bar */}
      <div
        className="py-16 px-6"
        style={{ backgroundColor: '#2A2927' }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {[
            { value: '308 GSM', label: 'Cotton rag paper weight' },
            { value: '200+', label: 'Years ink light-fastness' },
            { value: '12', label: 'Pigment ink channels' },
            { value: '100%', label: 'Solid wood frame moulding' },
          ].map((stat) => (
            <div key={stat.value}>
              <p className="font-cormorant italic text-4xl lg:text-5xl text-parchment mb-2">
                {stat.value}
              </p>
              <p className="font-garamond text-xs tracking-widest uppercase text-[#A8A39C]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pull quote */}
      <div className="py-20 px-6 text-center bg-parchment">
        <div className="max-w-2xl mx-auto">
          <div className="w-10 h-px bg-umber/40 mx-auto mb-10" />
          <p className="font-cormorant italic font-light text-3xl lg:text-4xl text-charcoal leading-relaxed mb-10">
            "We inspect every print under museum-grade lighting before it leaves
            Austin. If we wouldn't hang it in our own home, it doesn't ship."
          </p>
          <div className="w-10 h-px bg-umber/40 mx-auto mb-10" />
          <p className="font-garamond text-sm tracking-widest uppercase text-umber">
            Veritas Production Team — Austin, Texas
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-20 px-6 text-center bg-parchment border-t border-[#E4E4E7]">
        <h2 className="font-cormorant font-light text-3xl lg:text-4xl text-charcoal mb-4">
          The collection, made to last.
        </h2>
        <p className="font-garamond text-base text-umber mb-10 max-w-md mx-auto">
          Six original compositions, printed and framed to museum standard.
          Yours for a lifetime.
        </p>
        <Link
          to="/collection"
          className="inline-block bg-charcoal text-parchment font-garamond text-sm tracking-widest uppercase px-10 py-4 hover:bg-umber transition-colors duration-200"
        >
          View the Collection
        </Link>
      </div>
    </div>
  )
}
