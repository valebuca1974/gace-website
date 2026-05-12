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
              En GACE somos especialistas en la fabricación de mallas plásticas de alta resistencia, orgullosamente ubicados en México.
            </p>
            <p className="about-text">
              Nuestra misión es proveer a la industria del embalaje, higiene y sector industrial con productos que solucionan problemas reales de protección, transporte y confort. Utilizamos materia prima de primera calidad y tecnología de extrusión avanzada para crear soluciones que cumplen con los estándares más exigentes del mercado.
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
