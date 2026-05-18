import './About.css';

export default function About() {
  return (
    <section id="nosotros" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-container">
            <img 
              src="/about-factory.png" 
              alt="Interior de la fábrica GACE" 
              className="about-image"
              loading="lazy"
            />
          </div>
          <div className="about-content">
            <h2 className="section-title text-left">Nuestra Experiencia</h2>
            <p className="about-lead">
              GACE Empaques y Embalajes de Protección es una empresa especializada en la fabricación de mallas plásticas extruidas tipo red en polietileno y polipropileno virgen para empaque y protección.
            </p>
            <p className="about-text">
              Nuestra misión es satisfacer plenamente las necesidades de nuestros socios comerciales a través de servicios y productos para ampliar y garantizar el mercado. Somos el sistema de empaque ideal para proteger, promocionar y embalar productos en proceso, desarrollando mallas especiales acordes a las necesidades de cada cliente.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">+10</span>
                <span className="stat-label">Años de Exp.</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Mexicano</span>
              </div>
              <div className="stat">
                <span className="stat-number">+1M</span>
                <span className="stat-label">Metros fabricados</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
