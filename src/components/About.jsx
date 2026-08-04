import './About.css';

export default function About() {
  return (
    <section id="nosotros" className="about">
      <div className="container">
        <div className="about-content-centered">
          <h2 className="section-title text-center">Nuestra Experiencia</h2>
          <p className="about-lead">
            GACE Empaques y Embalajes de Proteccion es una empresa
            especializada en la fabricacion de mallas plasticas extruidas
            tipo red en polietileno y polipropileno virgen para empaque y
            proteccion.
          </p>
          <p className="about-text">
            Nuestra mision es satisfacer plenamente las necesidades de nuestros socios
            comerciales a traves de servicios y productos para ampliar y garantizar el
            mercado. Somos el sistema de empaque ideal para proteger, promocionar y
            embalar productos en proceso, desarrollando mallas especiales acordes a las
            necesidades de cada cliente.
          </p>
          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat-number">+10</span>
              <span className="about-stat-label">Anos de Exp.</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">100%</span>
              <span className="about-stat-label">Mexicano</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">+1M</span>
              <span className="about-stat-label">Metros fabricados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}