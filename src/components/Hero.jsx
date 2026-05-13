import { MessageCircle } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const whatsappNumber = "525586763800";
  const whatsappMessage = encodeURIComponent("Hola GACE, me interesa cotizar rollos de malla plástica.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="inicio" className="hero">
      <div className="hero-glow-background"></div>
      
      <div className="container hero-container">
        <div className="hero-content animate-fade-in-up">
          <h1 className="hero-title">
            Fabricación de Malla Plástica y Poliburbuja
          </h1>
          <p className="hero-subtitle">
            Expertos en Poliburbuja y Mallas Plásticas de alta resistencia para embalaje, protección, higiene y sector agroalimentario. Fabricación directa por volumen.
          </p>
          <div className="hero-badge">
            <span className="live-dot"></span>
            Fabricantes Directos en México
          </div>
          <div className="hero-cta-group">
            <div className="btn-wrapper">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-accent btn-lg">
                <MessageCircle size={20} />
                Solicitar cotización
              </a>
              <span className="btn-subtext">Respuesta en menos de 5 min</span>
            </div>
            <div className="btn-wrapper">
              <a href="#productos" className="btn btn-outline btn-lg">
                Explorar catálogo
              </a>
            </div>
          </div>
          
          <div className="social-proof">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>Con la confianza de +500 empresas de manufactura, agro e industrias en México.</p>
          </div>
        </div>

        {/* COMPOSICIÓN B2B PREMIUM (LIGHT STUDIO) */}
        <div className="hero-product-container animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          
          {/* Poliburbuja sutil en segundo plano para dar profundidad de campo (Cinematic Blur) */}
          <img src="/webp/CATÁLOGO GACE-4-0.webp" alt="Poliburbuja GACE" className="hero-product-img secondary-mesh" />

          {/* Malla Morada Protagonista */}
          <img src="/webp/CATÁLOGO GACE-8-0.webp" alt="Malla con Memoria para Ajos" className="hero-product-img main-mesh" />
          
          <div className="hero-floating-badges">
            <div className="hero-badge-float badge-top">
              <img src="/webp/CATÁLOGO GACE-10-0.webp" alt="Coca Cola Packaging" />
              <span>Malla Protección</span>
            </div>
            <div className="hero-badge-float badge-bottom">
              <img src="/webp/CATÁLOGO GACE-16-0.webp" alt="Malla Industrial" />
              <span>Malla Reforzada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
