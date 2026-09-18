import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function DetailProduk() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [produk, setProduk] = useState(null)
  const [loading, setLoading] = useState(true)
  const [jumlah, setJumlah] = useState(1)

  useEffect(() => {
    fetch('/produk.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => String(p.id) === String(id))
        setProduk(found)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const handleTambahKeranjang = () => {
    addToCart(produk, jumlah)
    alert(`${jumlah} x ${produk.nama_produk} berhasil ditambahkan ke keranjang!`)
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!produk) return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', letterSpacing: '2px' }}>Produk Tidak Ditemukan</h2>
      <Link to="/katalog" className="btn" style={{ marginTop: '30px' }}>Kembali ke Katalog</Link>
    </div>
  )

  const totalHarga = parseInt(produk.harga) * jumlah

  return (
    <div className="container">
      <div style={{ marginBottom: '30px', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#6b6b6b' }}>
        <Link to="/" style={{ color: '#6b6b6b' }}>Home</Link>
        <span style={{ margin: '0 10px' }}>/</span>
        <Link to="/katalog" style={{ color: '#6b6b6b' }}>Katalog</Link>
        <span style={{ margin: '0 10px' }}>/</span>
        <span style={{ color: '#1a1a1a' }}>{produk.nama_produk}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '60px', alignItems: 'start' }}>
        <div>
          <div style={{ background: '#f5f3f0', overflow: 'hidden' }}>
            {produk.gambar ? (
              <img src={`/images/${produk.gambar}`} alt={produk.nama_produk} style={{ width: '100%', height: '600px', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4d4d4' }}>NO IMAGE</div>
            )}
          </div>
        </div>

        <div style={{ paddingTop: '20px' }}>
          <p style={{ color: '#7a2e2e', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '15px' }}>
            {produk.nama_kategori || 'Tanpa Kategori'}
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 500, letterSpacing: '2px', color: '#1a1a1a', lineHeight: 1.2, marginBottom: '20px' }}>
            {produk.nama_produk}
          </h1>
          <div style={{ width: '60px', height: '2px', background: '#7a2e2e', marginBottom: '25px' }}></div>
          <p style={{ fontSize: '1.8rem', fontWeight: 500, letterSpacing: '2px', color: '#1a1a1a', marginBottom: '25px' }}>
            Rp {parseInt(produk.harga).toLocaleString('id-ID')}
          </p>
          <div style={{ marginBottom: '30px' }}>
            <p style={{ color: '#6b6b6b', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '10px' }}>KETERSEDIAAN</p>
            <p style={{ color: parseInt(produk.stok) > 0 ? '#10b981' : '#ef4444', fontWeight: 500, fontSize: '0.95rem', letterSpacing: '1px' }}>
              {parseInt(produk.stok) > 0 ? `✓ Stok tersedia: ${produk.stok}` : '✗ Stok habis'}
            </p>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <p style={{ color: '#6b6b6b', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '10px' }}>DESKRIPSI</p>
            <p style={{ color: '#2d2d2d', lineHeight: 1.9, fontWeight: 300 }}>{produk.deskripsi || 'Belum ada deskripsi.'}</p>
          </div>

          {parseInt(produk.stok) > 0 && (
            <>
              <div style={{ marginBottom: '25px' }}>
                <p style={{ color: '#6b6b6b', fontSize: '0.85rem', letterSpacing: '1px', marginBottom: '10px' }}>JUMLAH</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => setJumlah(Math.max(1, jumlah - 1))} style={{ width: '45px', height: '45px', border: '1px solid #1a1a1a', background: 'white', cursor: 'pointer' }}>−</button>
                  <div style={{ width: '70px', height: '45px', border: '1px solid #1a1a1a', borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 500 }}>{jumlah}</div>
                  <button onClick={() => setJumlah(Math.min(parseInt(produk.stok), jumlah + 1))} style={{ width: '45px', height: '45px', border: '1px solid #1a1a1a', background: 'white', cursor: 'pointer' }}>+</button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid #e5e0da', marginBottom: '25px' }}>
                <span style={{ color: '#6b6b6b', letterSpacing: '1px' }}>Subtotal</span>
                <span style={{ fontWeight: 600, letterSpacing: '1px' }}>Rp {totalHarga.toLocaleString('id-ID')}</span>
              </div>

              <button onClick={handleTambahKeranjang} className="btn" style={{ width: '100%', padding: '18px' }}>
                Tambah ke Keranjang
              </button>
            </>
          )}

          <div style={{ marginTop: '40px', paddingTop: '25px', borderTop: '1px solid #e5e0da' }}>
            <p style={{ fontSize: '0.8rem', color: '#6b6b6b', lineHeight: 2, letterSpacing: '0.5px' }}>
              ✦ Dikerjakan oleh penjahit berpengalaman<br />
              ✦ Free ongkir untuk pembelian di atas Rp 200.000<br />
              ✦ Bahan premium, jahitan rapi
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}