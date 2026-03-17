import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WelcomeModal from './components/WelcomeModal'
import CartDrawer from './components/CartDrawer'
import { CartProvider } from './contexts/CartContext'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductPage from './pages/ProductPage'
import About from './pages/About'
import Faq from './pages/Faq'
import Policies from './pages/Policies'
import Reviews from './pages/Reviews'
import Craftsmanship from './pages/Craftsmanship'
import Shipping from './pages/Shipping'

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-parchment text-charcoal">
        <WelcomeModal />
        <CartDrawer />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/collection/:slug" element={<ProductPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/craftsmanship" element={<Craftsmanship />} />
            <Route path="/shipping" element={<Shipping />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
