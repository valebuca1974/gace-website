import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { productsData } from '../data/products';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use location directly without effect to close menu (standard React pattern)
  const prevLocation = useRef(location.pathname);
  if (prevLocation.current !== location.pathname) {
    prevLocation.current = location.pathname;
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (productsOpen) setProductsOpen(false);
  }

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleProductsMobile = (e) => {
    e.preventDefault();
    setProductsOpen(!productsOpen);
  };

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/#productos', isDropdown: true },
    { name: 'Aplicaciones', href: '/#aplicaciones' },
    { name: 'Nosotros', href: '/#nosotros' },
    { name: 'Contacto', href: '/#contacto' },
  ];

  const isProductPage = location.pathname.startsWith('/producto/');

  return (
    <header className={`header ${isScrolled || isProductPage ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/logo-gace-final-transparent.png" alt="GACE - Empaques y embalaje de protección" className="logo-img" />
          <span className="logo-slogan">Empaques y embalaje de protección</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name} className={link.isDropdown ? 'dropdown-item' : ''}>
                {link.isDropdown ? (
                  <button className="nav-link dropdown-toggle">
                    {link.name} <ChevronDown size={14} />
                  </button>
                ) : link.isInternal ? (
                  <Link to={link.href} className="nav-link">{link.name}</Link>
                ) : (
                  <a href={link.href} className="nav-link">{link.name}</a>
                )}
                
                {link.isDropdown && (
                  <ul className="dropdown-menu">
                    {productsData.map(p => (
                      <li key={p.id}>
                        <Link to={`/producto/${p.slug}`} className="dropdown-link">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
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
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.isDropdown ? (
                <>
                  <div className="mobile-dropdown-header" onClick={toggleProductsMobile}>
                    <span className="mobile-nav-link">{link.name}</span>
                    <ChevronDown size={20} className={productsOpen ? 'rotate' : ''} />
                  </div>
                  <ul className={`mobile-dropdown-menu ${productsOpen ? 'show' : ''}`}>
                    {productsData.map(p => (
                      <li key={p.id}>
                        <Link 
                          to={`/producto/${p.slug}`} 
                          className="mobile-dropdown-link"
                        >
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : link.isInternal ? (
                <Link to={link.href} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              ) : (
                <a href={link.href} className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </a>
              )}
            </li>
          ))}
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
