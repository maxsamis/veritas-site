export default function Shipping() {
  return (
    <div className="min-h-screen bg-parchment">
      <div className="max-w-2xl mx-auto py-20 px-6">
        <div className="mb-14">
          <h1 className="font-cormorant font-light text-4xl lg:text-5xl text-charcoal mb-4">
            Shipping &amp; Returns
          </h1>
          <p className="font-garamond text-base text-umber">
            We stand behind every piece we make.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <div>
            <h3 className="font-cormorant font-light text-charcoal mb-3" style={{ fontSize: '20px' }}>
              Free US Shipping
            </h3>
            <p className="font-garamond text-base text-umber leading-relaxed">
              All orders ship free within the United States via FedEx Ground. Orders placed before 2 PM CT ship the same business day. Delivery in 3&ndash;7 business days depending on location.
            </p>
          </div>

          <div>
            <h3 className="font-cormorant font-light text-charcoal mb-3" style={{ fontSize: '20px' }}>
              International Shipping
            </h3>
            <p className="font-garamond text-base text-umber leading-relaxed">
              We ship to Australia, Canada, the United Kingdom, and the UAE. International orders ship via FedEx International Priority. Duties and taxes may apply and are the responsibility of the buyer. Contact us for US shipping rates.
            </p>
          </div>

          <div>
            <h3 className="font-cormorant font-light text-charcoal mb-3" style={{ fontSize: '20px' }}>
              Packaging
            </h3>
            <p className="font-garamond text-base text-umber leading-relaxed">
              Every print ships fully assembled in a custom-designed double-wall box engineered specifically for this frame size. We wrap each piece in archival tissue and include a limited edition print.
            </p>
          </div>

          <div>
            <h3 className="font-cormorant font-light text-charcoal mb-3" style={{ fontSize: '20px' }}>
              Returns
            </h3>
            <p className="font-garamond text-base text-umber leading-relaxed">
              We offer free All sales final on all orders. If your print arrives damaged or you&rsquo;re not satisfied, contact us at{' '}
              <a href="mailto:studio@veritas.art" className="text-charcoal hover:underline transition-colors">studio@veritas.art</a>
              {' '}and we will arrange a free pickup. Refunds are processed within 3&ndash;5 business days of receipt.
            </p>
          </div>

          <div>
            <h3 className="font-cormorant font-light text-charcoal mb-3" style={{ fontSize: '20px' }}>
              Questions?
            </h3>
            <p className="font-garamond text-base text-umber leading-relaxed">
              Email us at{' '}
              <a href="mailto:studio@veritas.art" className="text-charcoal hover:underline transition-colors">studio@veritas.art</a>
              {' '}&mdash; we typically respond within a few hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
