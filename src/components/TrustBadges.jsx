import './TrustBadges.css';
import { ShieldCheck, Recycle, Factory, MapPin, Activity } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: <Factory size={32} />, title: "Fabricantes Directos", text: "Sin intermediarios" },
    { icon: <ShieldCheck size={32} />, title: "Alta Resistencia", text: "La mejor calidad del mercado" },
    { icon: <Activity size={32} />, title: "Atención Inmediata", text: "Asesoría técnica directa" },
    { icon: <MapPin size={32} />, title: "Hecho en México", text: "Orgullo nacional, calidad GACE" }
  ];

  return (
    <section className="trust-badges">
      <div className="container">
        <div className="badges-grid">
          {badges.map((badge, idx) => (
            <div key={idx} className="badge-card">
              <div className="badge-icon">
                {badge.icon}
              </div>
              <h3 className="badge-title">{badge.title}</h3>
              <p className="badge-text">{badge.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
