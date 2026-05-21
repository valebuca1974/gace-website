import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { productsData } from '../data/products';
import './Header.css';

const mallasData = productsData.filter(p => p.category === 'Mallas' || p.category === 'Accesorios');
const poliburbujaData = productsData.filter(p => p.category === 'Embalaje' || p.category === 'Retail y Oficina');

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mallaOpen, setMallaOpen] = useState(false);
  const [poliOpen, setPoliOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta (Sincronización durante el renderizado)
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
    setMallaOpen(false);
    setPoliOpen(false);
  }

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleMallaMobile = (e) => { e.preventDefault(); setMallaOpen(!mallaOpen); setPoliOpen(false); };
  const togglePoliMobile = (e) => { e.preventDefault(); setPoliOpen(!poliOpen); setMallaOpen(false); };

  const isProductPage = location.pathname.startsWith('/producto/');

  return (
    <header className={`header ${isScrolled || isProductPage ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/logo-gace-clean.png" alt="GACE" className="logo-img" />
          <span className="logo-slogan">Empaques y Embalajes de Protección.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li><a href="/" className="nav-link">Inicio</a></li>
            <li className="dropdown-item">
              <button className="nav-link dropdown-toggle">
                Malla <ChevronDown size={14} />
              </button>
              <ul className="dropdown-menu">
                {mallasData.map(p => (
                  <li key={p.id}>
                    <Link to={`/producto/${p.slug}`} className="dropdown-link">{p.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="dropdown-item">
              <button className="nav-link dropdown-toggle">
                Poliburbuja <ChevronDown size={14} />
              </button>
              <ul className="dropdown-menu">
                {poliburbujaData.map(p => (
                  <li key={p.id}>
                    <Link to={`/producto/${p.slug}`} className="dropdown-link">{p.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li><a href="/#aplicaciones" className="nav-link">Aplicaciones</a></li>
            <li><a href="/#nosotros" className="nav-link">Nosotros</a></li>
            <li><a href="/#contacto" className="nav-link">Contacto</a></li>
          </ul>
          <a href="/#contacto" className="btn btn-primary">Cotizar ahora</a>
        </nav>

        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Abrir menú">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          <li>
            <a href="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
          </li>
          <li>
            <div className="mobile-dropdown-header" onClick={toggleMallaMobile}>
              <span className="mobile-nav-link">Malla</span>
              <ChevronDown size={20} className={mallaOpen ? 'rotate' : ''} />
            </div>
            <ul className={`mobile-dropdown-menu ${mallaOpen ? 'show' : ''}`}>
              {mallasData.map(p => (
                <li key={p.id}>
                  <Link to={`/producto/${p.slug}`} className="mobile-dropdown-link" onClick={() => setMobileMenuOpen(false)}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="mobile-dropdown-header" onClick={togglePoliMobile}>
              <span className="mobile-nav-link">Poliburbuja</span>
              <ChevronDown size={20} className={poliOpen ? 'rotate' : ''} />
            </div>
            <ul className={`mobile-dropdown-menu ${poliOpen ? 'show' : ''}`}>
              {poliburbujaData.map(p => (
                <li key={p.id}>
                  <Link to={`/producto/${p.slug}`} className="mobile-dropdown-link" onClick={() => setMobileMenuOpen(false)}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li><a href="/#aplicaciones" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Aplicaciones</a></li>
          <li><a href="/#nosotros" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Nosotros</a></li>
          <li><a href="/#contacto" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Contacto</a></li>
          <li>
            <a href="/#contacto" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Cotizar ahora
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
