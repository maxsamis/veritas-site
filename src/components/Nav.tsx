import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Nav() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es')
  }

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  const links = [
    { href: '/collection', label: t('nav.collection') },
    { href: '/craftsmanship', label: 'Craftsmanship' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/about', label: t('nav.about') },
    { href: '/faq', label: t('nav.faq') },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement bar */}
        <div className="bg-[#2A2927] py-2 px-4">
          <p className="text-center font-garamond text-xs tracking-[0.15em] uppercase text-[#D4C9B4]">
            Free US Shipping · Lifetime Guarantee · Delivered to 40+ Countries
          </p>
        </div>
      <nav className="bg-parchment/95 backdrop-blur-sm border-b border-umber/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Left: hamburger (mobile) + links (desktop) */}
            <div className="flex items-center gap-10">
              {/* Mobile hamburger — left */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex flex-col gap-1.5 p-1"
                aria-label="Menu"
              >
                <span className={`block w-6 h-px bg-charcoal transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-px bg-charcoal transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-px bg-charcoal transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
              <div className="hidden lg:flex items-center gap-10">
              <Link
                to="/collection"
                className={`font-garamond text-sm tracking-widest uppercase transition-opacity ${
                  isActive('/collection') ? 'text-charcoal' : 'text-umber hover:text-charcoal'
                }`}
              >
                {t('nav.collection')}
              </Link>
              <Link
                to="/craftsmanship"
                className={`font-garamond text-sm tracking-widest uppercase transition-opacity ${
                  isActive('/craftsmanship') ? 'text-charcoal' : 'text-umber hover:text-charcoal'
                }`}
              >
                Craftsmanship
              </Link>
              <Link
                to="/about"
                className={`font-garamond text-sm tracking-widest uppercase transition-opacity ${
                  isActive('/about') ? 'text-charcoal' : 'text-umber hover:text-charcoal'
                }`}
              >
                {t('nav.about')}
              </Link>
              </div>
            </div>

            {/* Wordmark — centered */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="wordmark text-xl lg:text-2xl text-charcoal tracking-widest2">
                VERITAS
              </span>
            </Link>

            {/* Right: Reviews + FAQ + lang toggle — desktop */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/reviews"
                className={`font-garamond text-sm tracking-widest uppercase transition-opacity ${
                  isActive('/reviews') ? 'text-charcoal' : 'text-umber hover:text-charcoal'
                }`}
              >
                Reviews
              </Link>
              <Link
                to="/faq"
                className={`font-garamond text-sm tracking-widest uppercase transition-opacity ${
                  isActive('/faq') ? 'text-charcoal' : 'text-umber hover:text-charcoal'
                }`}
              >
                {t('nav.faq')}
              </Link>
              <button
                onClick={toggleLang}
                className="font-garamond text-sm tracking-widest uppercase text-umber hover:text-charcoal transition-colors border-l border-umber/30 pl-8"
              >
                {t('nav.lang')}
              </button>
            </div>

            {/* Mobile: lang toggle only (right side) */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleLang}
                className="font-garamond text-xs tracking-widest uppercase text-umber"
              >
                {t('nav.lang')}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-parchment border-t border-umber/20 px-6 py-8">
            <div className="flex flex-col gap-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-garamond text-base tracking-widest uppercase text-charcoal"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      </div>

      {/* Spacer */}
      <div className="h-24 lg:h-28" />
    </>
  )
}
