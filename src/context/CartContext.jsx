import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart_toko_penjahit')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart_toko_penjahit', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (produk, jumlah = 1) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.id === produk.id)
      if (exist) {
        return prev.map(item => 
          item.id === produk.id ? { ...item, jumlah: item.jumlah + jumlah } : item
        )
      }
      return [...prev, { 
        id: produk.id,
        nama_produk: produk.nama_produk,
        harga: parseInt(produk.harga),
        gambar_url: produk.gambar_url,
        jumlah: jumlah
      }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id, jumlah) => {
    if (jumlah < 1) return removeFromCart(id)
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, jumlah } : item)
    )
  }

  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((sum, item) => sum + item.jumlah, 0)
  const totalHarga = cartItems.reduce((sum, item) => sum + (item.harga * item.jumlah), 0)

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalHarga
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)