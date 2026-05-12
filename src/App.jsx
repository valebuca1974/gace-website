import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SEO from './components/SEO';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CalculadoraPoliburbuja from './pages/CalculadoraPoliburbuja';

function App() {
  return (
    <HelmetProvider>
      <SEO />
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:slug" element={<ProductDetail />} />
            <Route path="/calculadora-poliburbuja" element={<CalculadoraPoliburbuja />} />
          </Routes>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
