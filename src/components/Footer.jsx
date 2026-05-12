import './Footer.css';

export default function Footer() {
  const whatsappNumber = "525586763800";
  const generalWaUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola GACE, quiero cotizar productos industriales directo de fábrica.")}`;

  return (
    <footer className="footer">
      <div className="container">
        {/* High-Impact Footer CTA Section */}
        <div className="footer-cta-premium">
          <div className="footer-cta-inner">
            <h2 className="cta-headline">¿Listo para cotizar directo de fábrica?</h2>
            <p className="cta-subheadline">
              <span className="dot"></span> Asesoría técnica gratuita
              <span className="separator">|</span>
              <span className="dot"></span> Respuesta inmediata
            </p>
            <div className="footer-cta-actions-centered">
              <a href={generalWaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-white btn-lg cta-wa-btn">
                <img src="/whatsapp-icon.png" alt="" className="btn-icon-img" style={{ display: 'none' }} />
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-container">
              <img src="/logo-gace-hd.png" alt="GACE - Embalaje y Protección de Calidad" className="footer-logo" />
              <h2 className="logo-text-hidden">GACE</h2>
            </div>
            <p className="footer-desc">
              <strong>GACE Industrial:</strong> Especialistas en la fabricación de soluciones de embalaje y protección de alta resistencia. Orgullosamente Mexicanos.
            </p>
          </div>
          
          <div className="footer-links-group">
            <h4>Navegación</h4>
            <ul className="footer-links">
              <li><a href="/#inicio">Inicio</a></li>
              <li><a href="/#productos">Catálogo de Productos</a></li>
              <li><a href="/#aplicaciones">Aplicaciones Industriales</a></li>
              <li><a href="/#nosotros">Sobre GACE</a></li>
              <li><a href="/#contacto">Contacto Directo</a></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Recursos Directos</h4>
            <ul className="footer-links">
              <li><a href="/#contacto">Aviso de Privacidad</a></li>
              <li>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola GACE, me gustaría recibir su catálogo de productos en PDF actualizado.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="catalog-link-footer"
                >
                  Descargar Catálogo (PDF)
                </a>
              </li>
              <li className="footer-phone-item">
                <strong>Ventas:</strong> <a href="tel:5586763800">(55) 8676 3800</a> | <a href="tel:5557334240">(55) 5733 4240</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GACE Industrial. Todos los derechos reservados. | Hecho en México</p>
        </div>
      </div>
    </footer>
  );
}
