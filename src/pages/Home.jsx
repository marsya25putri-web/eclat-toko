import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  const [produk, setProduk] = useState([])
  const [kategori, setKategori] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost/toko-penjahit/api/produk.php'),
      axios.get('http://localhost/toko-penjahit/api/kategori.php')
    ])
      .then(([resProduk, resKategori]) => {
        setProduk(resProduk.data)
        setKategori(resKategori.data)
      })
      .catch(err => console.error(err))
  }, [])

  // Kategori + gambar sampel dari produk pertama kategori itu
  const kategoriLengkap = kategori.map(k => {
    const produkKategori = produk.filter(p => String(p.kategori_id) === String(k.id))
    const sample = produkKategori.find(p => p.gambar_url)
    return {
      ...k,
      count: produkKategori.length,
      sample_image: sample?.gambar_url || null
    }
  })

  const produkTerbaru = produk.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Timeless<br />Style</h1>
          <p>Koleksi pakaian jahitan premium untuk pria dan wanita. Dibuat dengan teliti, dipakai dengan bangga.</p>
          <Link to="/katalog" className="btn">Belanja Sekarang</Link>
        </div>
      </section>

      {/* KATEGORI (Uniqlo Style) */}
      <section className="kategori-section">
        <div className="kategori-wrapper">
          <h2 className="kategori-heading">Cari berdasarkan kategori</h2>

          {kategoriLengkap.length === 0 ? (
            <p style={{ color: '#757575', fontSize: '14px' }}>Belum ada kategori.</p>
          ) : (
            <div className="kategori-list">
              {kategoriLengkap.map(k => (
                <Link
                  key={k.id}
                  to={`/katalog?kategori=${k.id}`}
                  className="kategori-item"
                >
                  <div className="kategori-item-image">
                    {k.sample_image ? (
                      <img src={k.sample_image} alt={k.nama_kategori} />
                    ) : (
                      <div className="kategori-item-noimg">
                        <i className="fas fa-image"></i>
                      </div>
                    )}
                  </div>
                  <div className="kategori-item-name">{k.nama_kategori}</div>
                  <div className="kategori-item-count">{k.count} produk</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Produk Terbaru */}
      <section className="container">
        <div className="section-title">
          <h2>Produk Terbaru</h2>
          <p>Lihat semua koleksi terbaru kami</p>
        </div>

        {produkTerbaru.length === 0 ? (
          <p style={{ color: '#757575' }}>Belum ada produk.</p>
        ) : (
          <div className="produk-grid">
            {produkTerbaru.map(p => (
              <div className="produk-card" key={p.id}>
                <Link to={`/produk/${p.id}`}>
                  <div className="image-wrapper">
                    {p.gambar_url ? (
                      <img src={p.gambar_url} alt={p.nama_produk} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: '12px' }}>NO IMAGE</div>
                    )}
                  </div>
                </Link>
                <p className="kategori">{p.nama_kategori || 'Tanpa Kategori'}</p>
                <h3>{p.nama_produk}</h3>
                <p className="harga">Rp {parseInt(p.harga).toLocaleString('id-ID')}</p>
                <Link to={`/produk/${p.id}`} className="btn-detail">Lihat Detail</Link>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link to="/katalog" className="btn">Lihat Semua Produk</Link>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-item">
          <div>✂️</div>
          <h4>Jahitan Rapi</h4>
          <p>Dikerjakan dengan teliti oleh penjahit berpengalaman</p>
        </div>
        <div className="feature-item">
          <div>🏆</div>
          <h4>Bahan Premium</h4>
          <p>Kualitas terbaik yang nyaman dan awet</p>
        </div>
        <div className="feature-item">
          <div>🚚</div>
          <h4>Pengiriman Cepat</h4>
          <p>Dikirim ke seluruh Indonesia</p>
        </div>
        <div className="feature-item">
          <div>💬</div>
          <h4>Layanan Ramah</h4>
          <p>Kami siap membantu kebutuhan Anda</p>
        </div>
      </section>

      {/* Tentang */}
      <section className="container" id="tentang">
        <div className="section-title">
          <h2>Tentang Kami</h2>
        </div>
        <div style={{ maxWidth: '800px' }}>
          <p style={{ fontSize: '16px', color: '#757575', lineHeight: 1.9, fontWeight: 400 }}>
            Éclat by Beatricia hadir sejak 2020 sebagai destinasi fashion lokal yang mengutamakan kualitas.
            Setiap pakaian dikerjakan dengan teliti oleh penjahit berpengalaman menggunakan bahan-bahan pilihan.
            Kami percaya, penampilan yang baik dimulai dari pakaian yang nyaman dan dibuat dengan cinta.
          </p>
        </div>
      </section>

      {/* Kontak */}
      <section className="features" id="kontak">
        <div style={{ maxWidth: '1600px', margin: 'auto', width: '100%' }}>
          <div className="section-title">
            <h2>Hubungi Kami</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px'
          }}>
            <div style={{ background: 'white', padding: '30px 25px', borderLeft: '3px solid #e60012' }}>
              <p style={{ fontSize: '11px', color: '#757575', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>EMAIL</p>
              <p style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>admin@eclatbybeatricia.com</p>
            </div>
            <div style={{ background: 'white', padding: '30px 25px', borderLeft: '3px solid #e60012' }}>
              <p style={{ fontSize: '11px', color: '#757575', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>WHATSAPP</p>
              <p style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>0812-3456-7890</p>
            </div>
            <div style={{ background: 'white', padding: '30px 25px', borderLeft: '3px solid #e60012' }}>
              <p style={{ fontSize: '11px', color: '#757575', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>ALAMAT</p>
              <p style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>Ponorogo, Jawa Timur</p>
            </div>
            <div style={{ background: 'white', padding: '30px 25px', borderLeft: '3px solid #e60012' }}>
              <p style={{ fontSize: '11px', color: '#757575', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>INSTAGRAM</p>
              <p style={{ fontSize: '15px', fontWeight: 500, color: '#000' }}>@eclatbybeatricia</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}