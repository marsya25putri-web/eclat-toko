import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Katalog() {
  const [produk, setProduk] = useState([])
  const [kategoriAktif, setKategoriAktif] = useState('semua')
  const [searchParams] = useSearchParams()
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/produk.json')
      .then(res => res.json())
      .then(data => {
        setProduk(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const katParam = searchParams.get('kategori')
    if (katParam) setKategoriAktif(katParam)
  }, [searchParams])

  const kategoriList = [...new Map(produk.map(p => [p.kategori_id, { id: p.kategori_id, nama: p.nama_kategori }])).values()]

  const produkFiltered = produk.filter(p => {
    const cocokKeyword = keyword === '' || p.nama_produk.toLowerCase().includes(keyword.toLowerCase())
    const cocokKategori = kategoriAktif === 'semua' || String(p.kategori_id) === String(kategoriAktif)
    return cocokKeyword && cocokKategori
  })

  const handleReset = () => {
    setKeyword('')
    setKategoriAktif('semua')
  }

  return (
    <div className="container">
      <div className="section-title">
        <h2>Katalog Produk</h2>
        <div className="divider"></div>
        <p>Koleksi Terbaru</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '500px', margin: '0 auto 30px', display: 'flex' }}>
        <input
          type="text"
          placeholder="Cari produk..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ flex: 1, padding: '15px 20px', border: '1px solid #1a1a1a', borderRight: 'none', background: 'transparent', fontSize: '0.85rem', letterSpacing: '1px', outline: 'none', fontFamily: 'inherit' }}
        />
        <button type="submit" className="btn" style={{ padding: '15px 30px' }}>Cari</button>
      </form>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
        <button
          onClick={() => setKategoriAktif('semua')}
          style={{ padding: '10px 22px', border: '1px solid #1a1a1a', background: kategoriAktif === 'semua' ? '#1a1a1a' : 'transparent', color: kategoriAktif === 'semua' ? 'white' : '#1a1a1a', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Semua ({produk.length})
        </button>
        {kategoriList.map(k => (
          <button
            key={k.id}
            onClick={() => setKategoriAktif(k.id)}
            style={{ padding: '10px 22px', border: '1px solid #1a1a1a', background: String(kategoriAktif) === String(k.id) ? '#1a1a1a' : 'transparent', color: String(kategoriAktif) === String(k.id) ? 'white' : '#1a1a1a', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {k.nama}
          </button>
        ))}
      </div>

      {(keyword || kategoriAktif !== 'semua') && (
        <p style={{ textAlign: 'center', color: '#6b6b6b', marginBottom: '40px', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Menampilkan <strong style={{ color: '#1a1a1a' }}>{produkFiltered.length}</strong> produk
          &nbsp;·&nbsp;
          <span onClick={handleReset} style={{ color: '#7a2e2e', textDecoration: 'underline', cursor: 'pointer' }}>Reset</span>
        </p>
      )}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : produkFiltered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <h3 style={{ fontSize: '2rem', letterSpacing: '2px' }}>Produk Tidak Ditemukan</h3>
        </div>
      ) : (
        <div className="produk-grid">
          {produkFiltered.map((p) => (
            <div className="produk-card" key={p.id}>
              <div className="image-wrapper">
                {p.gambar ? (
                  <img src={`/images/${p.gambar}`} alt={p.nama_produk} />
                ) : (
                  <div style={{ width: '100%', height: '380px', background: '#f5f3f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4d4d4' }}>NO IMAGE</div>
                )}
              </div>
              <p className="kategori">{p.nama_kategori || 'Tanpa Kategori'}</p>
              <h3>{p.nama_produk}</h3>
              <p className="harga">Rp {parseInt(p.harga).toLocaleString('id-ID')}</p>
              <Link to={`/produk/${p.id}`} className="btn-detail">Lihat Detail</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}