import { Shield, Box, Droplets, Truck, Trees } from 'lucide-react';
import './Applications.css';

export default function Applications() {
  const applications = [
    { 
      id: "empaque-proteccion", 
      icon: <Box size={32} />, 
      title: "Empaque y Protección Industrial", 
      text: "Poliburbuja en calibres de 1/2\" y 3/16\" para la protección de mercancía y embalaje industrial de alta resistencia.",
      image: "/webp/CATÁLOGO GACE-2-0.webp"
    },
    { 
      id: "higiene-zacates", 
      icon: <Droplets size={32} />, 
      title: "Higiene y Cuidado Personal", 
      text: "Malla suave disponible en diversidad de colores, ideal para la fabricación de artículos de higiene y cuidado personal.",
      image: "/webp/CATÁLOGO GACE-9-0.webp"
    },
    { 
      id: "agro-alimentos", 
      icon: <Shield size={32} />, 
      title: "Sector Agrícola y Promocionales", 
      text: "Malla plástica ideal para el empaque de frutas, verduras, juguetes y artículos promocionales. En formato de rollo o bolsa sellada.",
      image: "/webp/CATÁLOGO GACE-7-0.webp"
    },
    { 
      id: "logistica-industrial", 
      icon: <Truck size={32} />, 
      title: "Protección Técnica", 
      text: "Mallas de protección y reforzadas con aberturas desde 1.5 hasta 60 cms para resguardar piezas industriales.",
      image: "/webp/CATÁLOGO GACE-11-0.webp"
    },
    { 
      id: "navidad", 
      icon: <Trees size={32} />, 
      title: "Temporada Navideña", 
      text: "Malla especializada para el empaque de árboles de Navidad con aberturas de 70 hasta 110 cms en rollos de 1,000 metros.",
      image: "/webp/CATÁLOGO GACE-13-0.webp"
    }
  ];

  return (
    <section id="aplicaciones" className="applications">
      <div className="container">
        <div className="applications-header text-center">
          <h2 className="section-title">Aplicaciones del Catálogo GACE</h2>
          <p className="section-subtitle">Soluciones técnicas fabricadas bajo las especificaciones exactas del catálogo oficial.</p>
        </div>
        
        <div className="applications-list">
          {applications.map((app, i) => (
            <div key={app.id} className={`app-row ${i % 2 !== 0 ? 'app-row-reverse' : ''}`}>
              <div className="app-image-container">
                <img src={app.image} alt={app.title} className="app-image" loading="lazy" />
              </div>
              <div className="app-content-box">
                <div className="app-icon">{app.icon}</div>
                <h3 className="app-title">{app.title}</h3>
                <p className="app-text">{app.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
