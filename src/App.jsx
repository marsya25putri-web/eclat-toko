import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Katalog from './pages/Katalog'
import DetailProduk from './pages/DetailProduk'
import Keranjang from './pages/Keranjang'
import Checkout from './pages/Checkout'
import Sukses from './pages/Sukses'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Katalog />} />
          <Route path="/produk/:id" element={<DetailProduk />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/sukses" element={<Sukses />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App