import FaqAccordion from '../components/FaqAccordion'

const FAQ_ITEMS = [
  {
    q: 'What is an edition of 250?',
    a: 'Each portrait is limited to 250 numbered impressions worldwide. Once sold out, it will never be reprinted.',
  },
  {
    q: 'What paper and printing method do you use?',
    a: 'Printed on 310 GSM Hahnemühle Photo Rag, a museum-grade archival fine art paper used by galleries worldwide. We use archival pigment printing — the same process used by major art museums — rated for 200+ years of light fastness. Frames are hand-assembled in Austin, TX using kiln-dried hardwood mouldings.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Orders ship within 3–5 business days from Austin, TX. US delivery typically 5–7 business days. International 10–14 business days.',
  },
  {
    q: 'Is this a real photograph?',
    a: 'These are archival pigment prints of original paintings rendered in the Flemish, Renaissance, and contemporary sacred art traditions. They are not photographs, but are printed using the same archival pigment process used by major art museums.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. We ship to over 40 countries. Shipping rates are calculated at checkout.',
  },
  {
    q: 'Can I return or exchange?',
    a: 'Yes. We accept returns and exchanges within 30 days of delivery. Contact us at studio@veritaseditions.com and we will arrange complimentary pickup.',
  },
  {
    q: 'Are the prints framed?',
    a: 'Yes — every order ships fully assembled in your chosen frame (Matte Black, Walnut Brown, Ivory White, Burnished Gold, or Antique Gold). You may also order the print unframed as a rolled edition.',
  },
  {
    q: 'What is your quality guarantee?',
    a: 'We stand behind every print with a lifetime guarantee. If your print arrives damaged or deteriorates under normal conditions, we will replace it at no charge. Our archival materials are rated for 200+ years.',
  },
  {
    q: 'Does it come with a certificate of authenticity?',
    a: 'Yes. Every edition includes a numbered certificate of authenticity signed by the studio.',
  },
]

export default function Faq() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

      {/* Header */}
      <div className="mb-14 lg:mb-16">
        <p className="font-garamond text-xs tracking-[0.25em] uppercase text-umber mb-4">
          Veritas
        </p>
        <h1 className="font-cormorant font-light text-4xl lg:text-6xl text-charcoal mb-5">
          Frequently Asked Questions
        </h1>
        <p className="font-garamond text-base lg:text-lg text-umber leading-relaxed max-w-lg">
          Everything you need to know about our materials, process, and policies.
        </p>
      </div>

      <div className="section-divider mb-2" />

      <FaqAccordion items={FAQ_ITEMS} />

    </div>
  )
}
