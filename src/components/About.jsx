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
