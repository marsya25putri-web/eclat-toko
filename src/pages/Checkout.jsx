import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { cartItems, totalHarga, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nama_pembeli: '', no_hp: '', alamat: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', letterSpacing: '3px', marginBottom: '20px' }}>
          KERANJANG KOSONG
        </h1>
        <p style={{ color: '#6b6b6b', marginBottom: '35px' }}>Nggak bisa checkout kalau keranjangnya kosong.</p>
        <Link to="/katalog" className="btn">Kembali ke Katalog</Link>
      </div>
    )
  }

  // ✅ VALIDASI FORM
  const validate = () => {
    const newErrors = {}

    // Nama: min 3 huruf, cuma huruf + spasi
    if (!form.nama_pembeli.trim()) {
      newErrors.nama_pembeli = 'Nama lengkap wajib diisi'
    } else if (form.nama_pembeli.trim().length < 3) {
      newErrors.nama_pembeli = 'Nama minimal 3 karakter'
    } else if (!/^[a-zA-Z\s.']+$/.test(form.nama_pembeli)) {
      newErrors.nama_pembeli = 'Nama hanya boleh berisi huruf'
    }

    // No HP: min 10 digit, cuma angka
    const noHpBersih = form.no_hp.replace(/[\s-]/g, '')
    if (!form.no_hp.trim()) {
      newErrors.no_hp = 'No HP / WhatsApp wajib diisi'
    } else if (!/^[0-9]+$/.test(noHpBersih)) {
      newErrors.no_hp = 'No HP hanya boleh berisi angka'
    } else if (noHpBersih.length < 10) {
      newErrors.no_hp = 'No HP minimal 10 digit'
    } else if (noHpBersih.length > 15) {
      newErrors.no_hp = 'No HP maksimal 15 digit'
    }

    // Alamat: min 10 karakter
    if (!form.alamat.trim()) {
      newErrors.alamat = 'Alamat wajib diisi'
    } else if (form.alamat.trim().length < 10) {
      newErrors.alamat = 'Alamat minimal 10 karakter'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ✅ HANDLE CHECKOUT (dengan validasi + konfirmasi)
  const handleCheckout = async (e) => {
    e.preventDefault()

    // 1. Validasi form
    if (!validate()) {
      return
    }

    // 2. Konfirmasi
    const konfirmasi = window.confirm(
      `Apakah Anda yakin ingin membuat pesanan ini?\n\n` +
      `Total Belanja: Rp ${totalHarga.toLocaleString('id-ID')}\n` +
      `Jumlah Item: ${cartItems.length} produk\n\n` +
      `Pastikan data pengiriman sudah benar.`
    )

    if (!konfirmasi) {
      return
    }

    // 3. Proses checkout
    setLoading(true)
    try {
      const res = await axios.post('http://localhost/toko-penjahit/api/checkout.php', {
        ...form,
        items: cartItems,
        total_harga: totalHarga
      })
      clearCart()
      navigate('/sukses', { state: { kode: res.data.kode_transaksi } })
    } catch (err) {
      console.error(err)
      alert('Gagal checkout: ' + (err.response?.data?.error || err.message))
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <div className="container">
      <div className="section-title">
        <h2>Checkout</h2>
        <div className="divider"></div>
        <p>Lengkapi Data Pengiriman</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '50px', maxWidth: '1100px', margin: 'auto' }}>
        {/* Form */}
        <div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', letterSpacing: '2px', marginBottom: '25px' }}>
            DATA PENGIRIMAN
          </h3>
          <form onSubmit={handleCheckout} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Nama */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '8px' }}>
                Nama Lengkap <span style={{ color: '#e60012' }}>*</span>
              </label>
              <input
                type="text"
                value={form.nama_pembeli}
                onChange={(e) => handleChange('nama_pembeli', e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: errors.nama_pembeli ? '1px solid #e60012' : '1px solid #1a1a1a',
                  background: 'transparent',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  outline: 'none'
                }}
              />
              {errors.nama_pembeli && (
                <p style={{ color: '#e60012', fontSize: '0.75rem', marginTop: '6px', letterSpacing: '0.5px' }}>
                  ⚠ {errors.nama_pembeli}
                </p>
              )}
            </div>

            {/* No HP */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '8px' }}>
                No HP / WhatsApp <span style={{ color: '#e60012' }}>*</span>
              </label>
              <input
                type="text"
                value={form.no_hp}
                onChange={(e) => handleChange('no_hp', e.target.value)}
                placeholder="Masukkan nomor HP Anda"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: errors.no_hp ? '1px solid #e60012' : '1px solid #1a1a1a',
                  background: 'transparent',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  outline: 'none'
                }}
              />
              {errors.no_hp && (
                <p style={{ color: '#e60012', fontSize: '0.75rem', marginTop: '6px', letterSpacing: '0.5px' }}>
                  ⚠ {errors.no_hp}
                </p>
              )}
            </div>

            {/* Alamat */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '8px' }}>
                Alamat Lengkap <span style={{ color: '#e60012' }}>*</span>
              </label>
              <textarea
                rows="4"
                value={form.alamat}
                onChange={(e) => handleChange('alamat', e.target.value)}
                placeholder="Masukkan alamat lengkap pengiriman"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: errors.alamat ? '1px solid #e60012' : '1px solid #1a1a1a',
                  background: 'transparent',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  letterSpacing: '1px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
              {errors.alamat && (
                <p style={{ color: '#e60012', fontSize: '0.75rem', marginTop: '6px', letterSpacing: '0.5px' }}>
                  ⚠ {errors.alamat}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn"
              style={{ padding: '18px', width: '100%', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'MEMPROSES...' : `BUAT PESANAN · Rp ${totalHarga.toLocaleString('id-ID')}`}
            </button>

            <p style={{ fontSize: '0.7rem', color: '#6b6b6b', textAlign: 'center', letterSpacing: '0.5px' }}>
              <span style={{ color: '#e60012' }}>*</span> Wajib diisi
            </p>
          </form>
        </div>

        {/* Ringkasan */}
        <div>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', letterSpacing: '2px', marginBottom: '25px' }}>
            RINGKASAN PESANAN
          </h3>
          <div style={{ background: '#f5f3f0', padding: '25px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '18px', paddingBottom: '18px', borderBottom: '1px solid #e5e0da' }}>
                <img src={item.gambar_url} alt={item.nama_produk} style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500, fontSize: '0.95rem', marginBottom: '5px', letterSpacing: '0.5px' }}>{item.nama_produk}</p>
                  <p style={{ color: '#6b6b6b', fontSize: '0.85rem' }}>{item.jumlah} × Rp {item.harga.toLocaleString('id-ID')}</p>
                </div>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '1px' }}>Rp {(item.harga * item.jumlah).toLocaleString('id-ID')}</p>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
              <span style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.75rem', color: '#6b6b6b' }}>Total</span>
              <span style={{ fontWeight: 600, fontSize: '1.3rem', color: '#7a2e2e', letterSpacing: '1px' }}>Rp {totalHarga.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}