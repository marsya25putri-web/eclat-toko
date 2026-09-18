import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { totalItems } = useCart()

  const isHome = location.pathname === '/'
  const isKatalog = location.pathname === '/katalog'

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="announcement-bar">
        <p>FREE SHIPPING untuk pembelian di atas Rp 200.000</p>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <span className="logo-main">Éclat</span>
            <span className="logo-sub">by Beatricia</span>
          </Link>

          <ul className="nav-menu">
            <li><Link to="/" className={isHome ? 'active' : ''}>Home</Link></li>
            <li><Link to="/katalog" className={isKatalog ? 'active' : ''}>Katalog</Link></li>
            <li><span onClick={() => scrollToSection('tentang')}>Tentang</span></li>
            <li><span onClick={() => scrollToSection('kontak')}>Kontak</span></li>
          </ul>

          <div className="nav-icons">
            <Link to="/katalog" title="Cari">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </Link>
            <a href="http://localhost/toko-penjahit/admin/login.php" title="Admin">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </a>
            <Link to="/keranjang" title="Keranjang" style={{ position: 'relative' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}