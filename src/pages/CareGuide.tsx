export default function CareGuide() {
  const sections = [
    {
      number: '01',
      title: 'Handling Your Print',
      body: 'Always handle your archival print by the edges. Natural oils from skin can affect the paper surface over time. Cotton gloves are recommended for the initial installation.'
    },
    {
      number: '02',
      title: 'Framing Recommendations',
      body: 'We recommend UV-protective glazing (glass or acrylic) to prevent fading from ambient light. For the most archival result, use acid-free matting and backing board. Our prints are designed to accept standard frame sizes.'
    },
    {
      number: '03',
      title: 'Hanging & Environment',
      body: 'Avoid hanging in direct sunlight or near HVAC vents. Ideal conditions are consistent temperature and humidity — the same environment that preserves books and documents. Our 310 GSM cotton rag paper is inherently stable and will not yellow or become brittle over time.'
    },
    {
      number: '04',
      title: 'Cleaning',
      body: 'The surface of an archival giclée print should never be touched or wiped. If dust accumulates, use a very soft natural-hair brush (like a bookbinding brush) held parallel to the surface. Never use water, solvents, or commercial cleaners.'
    },
    {
      number: '05',
      title: 'Longevity',
      body: 'Our prints are produced using pigment-based inks on 310 GSM cotton rag paper — the same archival standard used by major museums and galleries. Under proper conditions (UV glazing, no direct sunlight), our prints are rated to maintain full color fidelity for over 200 years.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 text-center border-b border-[#E8E2D9]">
        <p className="text-xs tracking-[0.2em] uppercase font-garamond text-[#8B7355] mb-4">Veritas Editions</p>
        <h1 className="font-garamond text-4xl md:text-5xl text-[#2A2927] mb-6">Care & Framing Guide</h1>
        <p className="font-garamond text-lg text-[#5C4A32] max-w-xl mx-auto leading-relaxed">
          Your print is built to last generations. These guidelines will ensure it does.
        </p>
      </section>

      {/* Sections */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="space-y-12">
          {sections.map(s => (
            <div key={s.number} className="flex gap-8">
              <span className="font-garamond text-5xl text-[#E8E2D9] leading-none flex-shrink-0 w-12">{s.number}</span>
              <div>
                <h2 className="font-garamond text-xl text-[#2A2927] mb-3">{s.title}</h2>
                <p className="font-garamond text-base text-[#5C4A32] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#E8E2D9] py-16 px-6 text-center bg-[#EFECE5]">
        <p className="font-garamond text-2xl text-[#2A2927] mb-6">Ready to own yours?</p>
        <a href="/collection" className="inline-block bg-[#2A2927] text-[#EFECE5] px-8 py-4 text-xs tracking-widest uppercase font-garamond">
          View the Collection
        </a>
      </section>
    </div>
  )
}
