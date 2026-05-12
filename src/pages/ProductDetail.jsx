import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  LayoutGrid, 
  CheckCircle, 
  FileText,
  ShieldCheck,
  Settings,
  Package,
  Info
} from "lucide-react";
import { productsData } from '../data/products';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const product = productsData.find(p => p.slug === slug);
  
  if (!product) {
    return <Navigate to="/" />;
  }

  const waNumber = "525586763800";
  
  const generateWhatsAppUrl = (variant) => {
    let msg = `Hola GACE, quiero cotizar ${product.title}`;
    if (variant) {
      msg += ` tipo ${variant.name}`;
      if (variant.width && variant.length) {
        msg += ` de ${variant.width}m x ${variant.length}m`;
      }
    }
    msg += `. Es para uso industrial, ¿me pueden asesorar?`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };

  const mainWaUrl = generateWhatsAppUrl();

  return (
    <div className="pd-page">
      <Helmet>
        <title>{product.seo?.title || product.title}</title>
        <meta name="description" content={product.seo?.description || ""} />
      </Helmet>

      {/* BACKGROUND BLUE HEADER - Minimalized */}
      <div className="pd-header-bg"></div>

      <div className="pd-container">
        {/* UNIFIED TECHNICAL DATA SHEET */}
        <div className="pd-technical-sheet">
          
          {/* SHEET HEADER */}
          <div className="pd-sheet-header">
            <div className="pd-sheet-header-left">
              <Link to="/" className="pd-back-btn">
                <ArrowLeft size={16} /> Volver
              </Link>
              <div className="pd-sheet-meta">
                <span className="pd-sheet-cat">{product.category}</span>
                <h1 className="pd-sheet-title">{product.title}</h1>
              </div>
            </div>
            <div className="pd-sheet-header-right">
              <span className="pd-sheet-sku">REF: GACE-{product.id.toUpperCase()}</span>
              <div className="pd-sheet-badge">
                <CheckCircle size={12} /> Fabricación Directa México
              </div>
            </div>
          </div>

          <div className="pd-sheet-grid">
            {/* LEFT COLUMN: VISUALS & SPECS */}
            <div className="pd-sheet-main">
              <div className="pd-sheet-product-row">
                <div className="pd-sheet-image-box">
                  <img src={product.image} alt={product.title} />
                </div>
                
                <div className="pd-sheet-table-box">
                  <div className="pd-section-label"><Settings size={14} /> ESPECIFICACIONES</div>
                  <table className="pd-technical-table">
                    <tbody>
                      {product.features && product.features.map((f, i) => {
                        const parts = f.split(':');
                        return (
                          <tr key={i}>
                            <th>{parts[0]}</th>
                            <td>{parts[1] || f}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <th>Origen</th>
                        <td>Industrial GACE / México</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pd-sheet-details-row">
                <div className="pd-details-col">
                  <div className="pd-section-label"><ShieldCheck size={14} /> BENEFICIOS</div>
                  <div className="pd-text-list">
                    {product.benefits && product.benefits.map((b, i) => (
                      <div key={i} className="pd-text-item">
                        <CheckCircle size={12} /> {b}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pd-details-col">
                  <div className="pd-section-label"><Package size={14} /> APLICACIONES</div>
                  <div className="pd-app-badges">
                    {product.applications ? product.applications.map((a, i) => (
                      <span key={i} className="pd-app-badge-item">{a}</span>
                    )) : (
                      <span className="pd-app-badge-item">Uso Industrial</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: VARIANTS & CTAS */}
            <aside className="pd-sheet-sidebar">
              <div className="pd-sidebar-section">
                <div className="pd-section-label"><LayoutGrid size={14} /> MEDIDAS</div>
                <div className="pd-measures-list">
                  {product.variants && product.variants.map((v, i) => (
                    <div key={i} className="pd-measure-item">
                      <span className="pd-m-name">{v.name}</span>
                      <span className="pd-m-val">{v.width && `${v.width}m x `}{v.length}{v.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pd-sidebar-actions">
                <a href={mainWaUrl} target="_blank" rel="noopener noreferrer" className="pd-sheet-btn-primary">
                  <MessageCircle size={18} /> Cotizar vía WhatsApp
                </a>
                <button className="pd-sheet-btn-outline" onClick={() => alert('Ficha técnica solicitada.')}>
                  <FileText size={18} /> Ficha Técnica (PDF)
                </button>
              </div>

              <div className="pd-sheet-footer">
                <div className="pd-footer-trust">
                  <ShieldCheck size={14} /> Calidad Grado Industrial GACE
                </div>
                <p className="pd-footer-info">
                  <Info size={12} /> Fabricación a medida disponible bajo pedido de volumen.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
