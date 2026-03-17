import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>

      {/* Dark hero */}
      <section
        className="py-24 flex items-center justify-center text-center"
        style={{ backgroundColor: '#1C1A17' }}
      >
        <div className="max-w-3xl px-6 mx-auto">
          <h1
            className="font-garamond"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.15,
              fontStyle: 'italic',
            }}
          >
            We make the sacred available.
          </h1>
        </div>
      </section>

      {/* Three paragraphs */}
      <section
        className="py-16 px-8"
        style={{ backgroundColor: '#EFECE5' }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="font-garamond"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.125rem',
              color: '#2C2C2C',
              lineHeight: '1.75',
              marginBottom: '1.5rem',
            }}
          >
            For centuries, sacred portraiture lived in churches, chapels, and the homes of collectors who knew where to look. The rest of the world made do with mass-produced reproductions on paper that yellows and fades.
          </p>
          <p
            className="font-garamond"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.125rem',
              color: '#2C2C2C',
              lineHeight: '1.75',
              marginBottom: '1.5rem',
            }}
          >
            Veritas Editions exists to change that. We work with studio artists in the Flemish and Renaissance tradition to produce limited-edition archival prints — 250 per portrait, never reprinted — on the same museum-grade paper used by the Louvre.
          </p>
          <p
            className="font-garamond"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.125rem',
              color: '#2C2C2C',
              lineHeight: '1.75',
              marginBottom: '1.5rem',
            }}
          >
            This is not decoration. It is portraiture with a point of view. The faces in these works are not illustrations. They are presences.
          </p>

          {/* Closing italic line */}
          <p
            className="font-garamond text-center mt-12"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.125rem',
              color: '#2C2C2C',
              fontStyle: 'italic',
              letterSpacing: '0.08em',
            }}
          >
            Veritas. Truth.
          </p>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/collection"
              className="inline-block font-garamond text-sm tracking-widest uppercase px-10 py-4 transition-colors duration-200"
              style={{
                backgroundColor: '#2A2927',
                color: '#EFECE5',
                fontFamily: 'Cormorant Garamond, serif',
              }}
            >
              View the Collection
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
