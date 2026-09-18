import { Link, useLocation } from 'react-router-dom'

export default function Sukses() {
  const location = useLocation()
  const kode = location.state?.kode || ''

  return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <div style={{ fontSize: '5rem', marginBottom: '25px' }}>✅</div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem', letterSpacing: '3px', color: '#7a2e2e', marginBottom: '20px' }}>
        PESANAN BERHASIL!
      </h1>
      <p style={{ color: '#6b6b6b', marginBottom: '35px', letterSpacing: '1px' }}>
        Terima kasih sudah berbelanja di Toko Penjahit.
      </p>

      {kode && (
        <div style={{ background: '#f5f3f0', padding: '25px', marginBottom: '35px', maxWidth: '500px', margin: '0 auto 35px' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '10px' }}>
            Kode Transaksi
          </p>
          <h3 style={{ fontFamily: 'monospace', fontSize: '1.4rem', letterSpacing: '2px', color: '#1a1a1a' }}>
            {kode}
          </h3>
        </div>
      )}

      <p style={{ color: '#6b6b6b', marginBottom: '35px', letterSpacing: '1px', lineHeight: 1.8 }}>
        Pesananmu akan segera diproses.<br />
        Kami akan menghubungi kamu melalui WhatsApp.
      </p>

      <Link to="/katalog" className="btn">Kembali ke Katalog</Link>
    </div>
  )
}