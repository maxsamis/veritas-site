import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EFECE5' }}>

      {/* ── Hero — text only, dark ── */}
      <section
        className="flex flex-col items-center justify-center text-center px-8 py-32 lg:py-44"
        style={{ backgroundColor: '#1C1A17' }}
      >
        <p className="font-garamond text-xs tracking-[0.25em] uppercase mb-8" style={{ color: '#8C8C7A' }}>
          About Veritas
        </p>
        <h1
          className="font-cormorant italic font-light leading-tight max-w-3xl mx-auto"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#EFECE5' }}
        >
          We make the sacred available.
        </h1>
        <div className="my-8 mx-auto" style={{ width: '60px', height: '1px', backgroundColor: '#C4A55A' }} />
        <p className="font-garamond text-base lg:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: '#A8A39C' }}>
          Limited-edition archival portraits in the Flemish and Renaissance tradition. Made for homes that take beauty seriously.
        </p>
      </section>

      {/* ── Essay body ── */}
      <section className="px-8 py-24 lg:py-32">
        <div className="max-w-2xl mx-auto">

          <div className="mb-16">
            <p className="font-garamond text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#C4A55A' }}>
              The Problem
            </p>
            <p className="font-cormorant italic font-light text-2xl lg:text-3xl leading-snug mb-6" style={{ color: '#1C1A17' }}>
              For centuries, sacred portraiture lived in churches, chapels, and the homes of collectors who knew where to look.
            </p>
            <p className="font-garamond text-base leading-relaxed" style={{ color: '#8C8C7A' }}>
              The rest of the world made do with mass-produced reproductions — printed on paper that yellows within a generation, framed in materials that warp and fade. Beautiful subjects, poorly served.
            </p>
          </div>

          <div className="mb-16">
            <p className="font-garamond text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#C4A55A' }}>
              The Work
            </p>
            <p className="font-cormorant italic font-light text-2xl lg:text-3xl leading-snug mb-6" style={{ color: '#1C1A17' }}>
              Veritas works with studio artists in the Flemish and Renaissance tradition. Every portrait is limited to 250 impressions. None will ever be reprinted.
            </p>
            <p className="font-garamond text-base leading-relaxed" style={{ color: '#8C8C7A' }}>
              Each print is produced on 310 GSM Hahnemühle Photo Rag — the same museum-grade paper used by the Louvre for archival reproductions — using 12-color archival pigment inks rated for 200+ years of light-fastness. Then hand-assembled into solid wood frames in Austin, TX.
            </p>
          </div>

          <div>
            <p className="font-garamond text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#C4A55A' }}>
              The Point
            </p>
            <p className="font-cormorant italic font-light text-2xl lg:text-3xl leading-snug mb-6" style={{ color: '#1C1A17' }}>
              This is not decoration.
            </p>
            <p className="font-garamond text-base leading-relaxed" style={{ color: '#8C8C7A' }}>
              It is portraiture with a point of view. The faces in these works are not illustrations. They are presences. They belong on walls that mean something.
            </p>
          </div>

        </div>
      </section>

      {/* ── Full-width image break ── */}
      <div className="w-full" style={{ height: '60vh', minHeight: '360px', maxHeight: '520px', overflow: 'hidden' }}>
        <img
          src="https://i.imgur.com/zhzfFp0.png"
          alt="Hand-assembled frame"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
      </div>

      {/* ── Single stat ── */}
      <section
        className="text-center px-8 py-24"
        style={{ backgroundColor: '#1C1A17' }}
      >
        <p className="font-cormorant italic font-light text-7xl lg:text-8xl" style={{ color: '#EFECE5' }}>
          250
        </p>
        <p className="font-garamond text-xs tracking-[0.25em] uppercase mt-4" style={{ color: '#8C8C7A' }}>
          impressions per portrait · never reprinted
        </p>
      </section>

      {/* ── Closing ── */}
      <section className="text-center px-8 py-24 lg:py-32">
        <p className="font-cormorant italic font-light text-3xl lg:text-4xl mb-10 max-w-xl mx-auto leading-tight" style={{ color: '#1C1A17' }}>
          Owned by those who know the difference.
        </p>
        <div className="mx-auto mb-10" style={{ width: '60px', height: '1px', backgroundColor: '#C4A55A' }} />
        <p className="font-garamond text-sm italic mb-12" style={{ color: '#8C8C7A' }}>
          Veritas. Truth.
        </p>
        <Link
          to="/collection"
          className="inline-block font-garamond text-xs tracking-[0.2em] uppercase py-4 px-10 transition-colors"
          style={{ backgroundColor: '#1C1A17', color: '#EFECE5' }}
        >
          View the Collection
        </Link>
      </section>

    </div>
  )
}
