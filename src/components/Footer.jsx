export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h3 className="footer-brand-name">Éclat</h3>
          <p className="footer-brand-sub">By Beatricia</p>
          <p>Pakaian berkualitas dengan jahitan rapi, dikerjakan dengan teliti oleh penjahit berpengalaman.</p>
        </div>
        <div>
          <h4>Menu</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/katalog">Katalog</a></li>
            <li><a href="/keranjang">Keranjang</a></li>
          </ul>
        </div>
        <div>
          <h4>Bantuan</h4>
          <ul>
            <li><a href="#">Cara Pemesanan</a></li>
            <li><a href="#">Pengiriman</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4>Kontak</h4>
          <p>admin@eclatbybeatricia.com</p>
          <p>0812-3456-7890</p>
          <p>Ponorogo, Jawa Timur</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Éclat by Beatricia. All rights reserved.</p>
      </div>
    </footer>
  )
}