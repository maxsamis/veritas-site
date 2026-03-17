import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export interface CartItem {
  id: string        // slug + '_' + sizeKey + '_' + format
  slug: string
  title: string
  sizeKey: number
  sizeLabel: string
  price: number
  image: string
  variantId: string | null
  qty: number
  isFramed: boolean
  frameKey: string | null
  frameLabel: string | null
  frameAddon: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  addFrame: (id: string, frameKey: string, frameLabel: string, frameAddon: number) => void
  removeFrame: (id: string) => void
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'veritas_cart_v3'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return (JSON.parse(raw) as CartItem[]) ?? []
    } catch { /* ignore */ }
    return []
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      window.dispatchEvent(new Event('veritas_cart_update'))
    } catch { /* ignore */ }
  }, [items])

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id)
      if (idx >= 0) {
        const updated = [...prev]
        updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 }
        return updated
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) { removeItem(id); return }
    if (qty > 10) return
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const addFrame = (id: string, frameKey: string, frameLabel: string, frameAddon: number) => {
    setItems(prev => prev.map(i =>
      i.id === id
        ? { ...i, isFramed: true, frameKey, frameLabel, frameAddon }
        : i
    ))
  }

  const removeFrame = (id: string) => {
    setItems(prev => prev.map(i =>
      i.id === id
        ? { ...i, isFramed: false, frameKey: null, frameLabel: null, frameAddon: 0 }
        : i
    ))
  }

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + (i.price + i.frameAddon) * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, count, subtotal,
      addItem, removeItem, updateQty, clearCart,
      addFrame, removeFrame,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
