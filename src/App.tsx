import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductPage from './pages/ProductPage'
import About from './pages/About'
import Faq from './pages/Faq'
import Policies from './pages/Policies'

function App() {
  return (
    <div className="min-h-screen bg-parchment text-charcoal">
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:slug" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/policies" element={<Policies />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
