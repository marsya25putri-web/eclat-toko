import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Keranjang() {
  const { cartItems, removeFromCart, updateQuantity, totalHarga } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛍️</div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', letterSpacing: '3px', marginBottom: '20px' }}>
          KERANJANG KOSONG
        </h1>
        <p style={{ color: '#6b6b6b', marginBottom: '35px', letterSpacing: '1px' }}>
          Yuk, pilih pakaian favoritmu dulu!
        </p>
        <Link to="/katalog" className="btn">Lihat Katalog</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="section-title">
        <h2>Keranjang Belanja</h2>
        <div className="divider"></div>
        <p>{cartItems.length} Item</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: 'auto' }}>
        {cartItems.map(item => (
          <div 
            key={item.id} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '120px 1fr auto auto', 
              gap: '25px', 
              alignItems: 'center',
              padding: '20px 0',
              borderBottom: '1px solid #e5e0da'
            }}
          >
            <img 
              src={item.gambar_url || 'https://via.placeholder.com/120'} 
              alt={item.nama_produk}
              style={{ width: '120px', height: '120px', objectFit: 'cover', background: '#f5f3f0' }}
            />
            
            <div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', letterSpacing: '1px', marginBottom: '8px' }}>
                {item.nama_produk}
              </h3>
              <p style={{ color: '#7a2e2e', letterSpacing: '1px', fontWeight: 500 }}>
                Rp {item.harga.toLocaleString('id-ID')}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button 
                onClick={() => updateQuantity(item.id, item.jumlah - 1)}
                style={{ width: '38px', height: '38px', border: '1px solid #1a1a1a', background: 'white', cursor: 'pointer' }}
              >−</button>
              <div style={{ width: '50px', height: '38px', border: '1px solid #1a1a1a', borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.jumlah}
              </div>
              <button 
                onClick={() => updateQuantity(item.id, item.jumlah + 1)}
                style={{ width: '38px', height: '38px', border: '1px solid #1a1a1a', background: 'white', cursor: 'pointer' }}
              >+</button>
            </div>

            <div style={{ textAlign: 'right', minWidth: '140px' }}>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '1px', marginBottom: '8px' }}>
                Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}
              </p>
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ background: 'none', border: 'none', color: '#7a2e2e', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase' }}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        maxWidth: '1000px', 
        margin: '50px auto 0', 
        padding: '30px 0',
        borderTop: '2px solid #1a1a1a',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <p style={{ color: '#6b6b6b', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Total Belanja</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', letterSpacing: '2px', color: '#7a2e2e' }}>
            Rp {totalHarga.toLocaleString('id-ID')}
          </h2>
        </div>
        <button onClick={() => navigate('/checkout')} className="btn" style={{ padding: '18px 50px' }}>
          Checkout →
        </button>
      </div>
    </div>
  )
}