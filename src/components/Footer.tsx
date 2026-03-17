import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
    }
  }

  return (
    <footer className="bg-[#2A2927] text-[#D4C9B4] mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <p className="font-garamond text-xs tracking-[0.2em] uppercase text-[#8C8C7A] mb-5">Collection</p>
            <div className="flex flex-col gap-3">
              <Link to="/collection" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">All Works</Link>
              <Link to="/product/the-good-shepherd" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">The Good Shepherd</Link>
              <Link to="/product/christ-the-redeemer" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">Christ the Redeemer</Link>
              <Link to="/product/light-of-the-world" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">Light of the World</Link>
            </div>
          </div>
          <div>
            <p className="font-garamond text-xs tracking-[0.2em] uppercase text-[#8C8C7A] mb-5">About</p>
            <div className="flex flex-col gap-3">
              <Link to="/craftsmanship" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">Craftsmanship</Link>
              <Link to="/about" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">Our Story</Link>
              <Link to="/reviews" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">Reviews</Link>
            </div>
          </div>
          <div>
            <p className="font-garamond text-xs tracking-[0.2em] uppercase text-[#8C8C7A] mb-5">Support</p>
            <div className="flex flex-col gap-3">
              <Link to="/faq" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">FAQ</Link>
              <Link to="/shipping" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">Shipping &amp; Returns</Link>
              <Link to="/care" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">Care Guide</Link>
              <a href="mailto:studio@veritaseditions.com" className="font-garamond text-sm text-[#D4C9B4] hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
          <div>
            <p className="font-garamond text-xs tracking-[0.2em] uppercase text-[#8C8C7A] mb-5">Veritas</p>
            <p className="font-garamond text-sm text-[#8C8C7A] leading-relaxed mb-5">Sacred art. Museum grade. Hand-assembled in Austin, TX.</p>
            <p className="font-garamond text-xs tracking-wide text-[#8C8C7A]">studio@veritaseditions.com</p>
          </div>
        </div>

        {/* Email capture */}
        <div className="border-t border-[#3D3A36] pt-8 mb-8">
          {submitted ? (
            <p className="font-garamond text-sm text-[#D4C9B4] tracking-wide">Thank you.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="font-garamond text-sm text-[#8C8C7A] whitespace-nowrap">
                Be first to know when new portraits release.
              </label>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="font-garamond text-sm bg-transparent border px-4 py-2 text-[#EFECE5] placeholder-[#5A5550] focus:outline-none focus:border-[#8C8C7A] transition-colors"
                  style={{ borderColor: '#4A4542', minWidth: '220px' }}
                />
                <button
                  type="submit"
                  className="font-garamond text-xs tracking-widest uppercase px-5 py-2 bg-transparent border border-[#4A4542] text-[#D4C9B4] hover:bg-[#3D3A36] transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="border-t border-[#3D3A36] pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="font-garamond text-xs tracking-[0.15em] uppercase select-none" style={{ color: '#5A5550' }}>
            &copy; 2025 Veritas. All rights reserved.
          </p>
          <p className="font-garamond text-xs" style={{ color: '#5A5550' }}>
            Limited editions. Once sold out, gone forever.
          </p>
        </div>
      </div>
    </footer>
  )
}
