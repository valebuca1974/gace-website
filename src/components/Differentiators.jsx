import { Ruler, Activity, Layers, Clock, ShieldCheck } from 'lucide-react';
import './Differentiators.css';

export default function Differentiators() {
  const diffs = [
    { icon: <Ruler size={40} />, title: "Precisión de Medida", desc: "Cumplimos estrictamente con las alturas y largos especificados en catálogo." },
    { icon: <Activity size={40} />, title: "Eficiencia Industrial", desc: "Nuestros productos optimizan los tiempos de empaque y logística." },
    { icon: <Layers size={40} />, title: "Variedad Técnica", desc: "Contamos con mallas para diversos sectores: agro, industrial y retail." },
    { icon: <Clock size={40} />, title: "Entrega Inmediata", desc: "Stock permanente en las referencias más demandadas del mercado." },
    { icon: <ShieldCheck size={40} />, title: "Calidad GACE", desc: "La mejor calidad del mercado la encuentras aquí, con fabricación directa." },
    { icon: <ShieldCheck size={40} />, title: "Garantía de Fábrica", desc: "Respaldo total en cada rollo y accesorio que sale de nuestras líneas." }
  ];

  return (
    <section className="differentiators">
      <div className="container text-center diff-wrapper">
        <div className="diff-header">
          <span className="badge">La Ventaja GACE</span>
          <h2 className="section-title">Por qué somos el aliado #1 de la industria</h2>
          <p className="section-subtitle">No somos simples proveedores. Somos fabricantes que dominan la calidad desde la extrusión hasta la entrega final, garantizando el mejor costo-beneficio del mercado.</p>
        </div>
        
        <div className="diff-grid">
          {diffs.map((d, i) => (
            <div key={i} className="diff-item">
              <div className="diff-icon">{d.icon}</div>
              <h3 className="diff-title">{d.title}</h3>
              <p className="diff-desc">{d.desc}</p>
            </div>
          ))}
        </div>

        <div className="diff-cta">
          <p>¿Busca una solución técnica específica? <strong>Nuestros ingenieros le asesoran sin costo.</strong></p>
          <a href="#contacto" className="btn btn-accent">Solicitar Asesoría Técnica</a>
        </div>
      </div>
    </section>
  );
}
