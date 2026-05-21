import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  LayoutGrid, 
  CheckCircle, 
  FileText,
  ShieldCheck,
  Settings,
  Package,
  Info,
  X,
  Lock,
  Download,
  Building2
} from "lucide-react";
import { productsData } from '../data/products';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const product = productsData.find(p => p.slug === slug);
  
  // Sincronizar activeImg durante el renderizado cuando cambia el producto
  const [prevProduct, setPrevProduct] = useState(product);
  const [activeImg, setActiveImg] = useState(product?.image);
  
  // Estados para el Modal de Descarga Protegida
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadForm, setDownloadForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: ''
  });
  const [downloadStatus, setDownloadStatus] = useState(null); // 'sending', 'success', 'error'
  
  if (product !== prevProduct) {
    setPrevProduct(product);
    setActiveImg(product?.image);
  }
  
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

  const handleDownloadSubmit = async (e) => {
    e.preventDefault();
    setDownloadStatus('sending');
    
    try {
      // 🚀 Registrar lead de descarga en la API Serverless
      const response = await fetch('https://web-fabrica-de-malla.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          lead_data: {
            name: downloadForm.name,
            email: downloadForm.email,
            phone: downloadForm.phone,
            message: `Descarga autorizada de Ficha Técnica para el producto industrial: ${product.title}`,
            company: downloadForm.company,
            industry: downloadForm.industry
          },
          metadata: {
            source_url: window.location.href,
            timestamp: new Date().toISOString(),
            lead_type: "B2B_Technical_Sheet_Download",
            user_agent: navigator.userAgent
          }
        })
      });

      if (response.ok || response.type === 'opaque') {
        setDownloadStatus('success');
        
        // Gatillar descarga automatizada en segundo plano del PDF oficial
        const link = document.createElement('a');
        link.href = '/documentos/GACE Empaques y Embalajes de Protección INFO PAG WEB.pdf';
        link.setAttribute('download', `${product.title} - Ficha Tecnica GACE.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Auto-cerrar modal y limpiar campos después del delay visual
        setTimeout(() => {
          setShowDownloadModal(false);
          setDownloadStatus(null);
          setDownloadForm({ name: '', email: '', company: '', phone: '', industry: '' });
        }, 2500);
      } else {
        setDownloadStatus('error');
      }
    } catch {
      setDownloadStatus('error');
    }
  };

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
                <div className="pd-sheet-image-section">
                  <div className="pd-sheet-image-box">
                    <img src={activeImg} alt={product.title} />
                  </div>
                  {product.images && product.images.length > 0 && (
                    <div className="pd-sheet-gallery">
                      {product.images.map((img, idx) => (
                        <img 
                          key={idx}
                          src={img} 
                          className={`pd-sheet-gallery-thumb ${activeImg === img ? 'active' : ''}`}
                          onClick={() => setActiveImg(img)}
                          alt={`${product.title} vista ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
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
              </div>


            </aside>
          </div>
        </div>
      </div>

      {/* PREMIUM GATED DOWNLOAD MODAL */}
      {showDownloadModal && (
        <div className="pd-modal-overlay" onClick={() => setShowDownloadModal(false)}>
          <div className="pd-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="pd-modal-close" onClick={() => setShowDownloadModal(false)} aria-label="Cerrar modal">
              <X size={20} />
            </button>
            
            {downloadStatus === 'success' ? (
              <div className="pd-modal-success-state">
                <div className="pd-modal-success-icon">
                  <CheckCircle size={48} />
                </div>
                <h3>¡Acceso Autorizado!</h3>
                <p>Tu descarga de la Ficha Técnica para <strong>{product.title}</strong> se ha iniciado automáticamente.</p>
                <div className="pd-modal-success-loader">
                  <div className="pd-loader-bar"></div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit} className="pd-modal-form">
                <div className="pd-modal-header">
                  <div className="pd-modal-lock-badge">
                    <Lock size={12} /> DESCARGA EXCLUSIVA B2B
                  </div>
                  <h3>Descargar Ficha Técnica</h3>
                  <p>Por favor complete los datos de su empresa para habilitar la descarga inmediata en PDF.</p>
                </div>
                
                <div className="pd-modal-body">
                  <div className="pd-modal-group">
                    <label htmlFor="modal-name">Nombre Completo y Cargo</label>
                    <input 
                      type="text" 
                      id="modal-name" 
                      placeholder="Ej. Ing. Carlos Mendoza / Compras" 
                      value={downloadForm.name}
                      onChange={(e) => setDownloadForm({...downloadForm, name: e.target.value})}
                      required 
                    />
                  </div>

                  <div className="pd-modal-group">
                    <label htmlFor="modal-company">Empresa / Negocio</label>
                    <div className="pd-modal-input-icon-wrapper">
                      <Building2 size={16} />
                      <input 
                        type="text" 
                        id="modal-company" 
                        placeholder="Nombre de la empresa o negocio" 
                        value={downloadForm.company}
                        onChange={(e) => setDownloadForm({...downloadForm, company: e.target.value})}
                        required 
                      />
                    </div>
                  </div>

                  <div className="pd-modal-row">
                    <div className="pd-modal-group half">
                      <label htmlFor="modal-email">Correo Corporativo</label>
                      <input 
                        type="email" 
                        id="modal-email" 
                        placeholder="nombre@empresa.com" 
                        value={downloadForm.email}
                        onChange={(e) => setDownloadForm({...downloadForm, email: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="pd-modal-group half">
                      <label htmlFor="modal-phone">Teléfono / Celular</label>
                      <input 
                        type="tel" 
                        id="modal-phone" 
                        placeholder="Ej. 5512345678" 
                        value={downloadForm.phone}
                        onChange={(e) => setDownloadForm({...downloadForm, phone: e.target.value})}
                        required 
                      />
                    </div>
                  </div>

                  <div className="pd-modal-group">
                    <label htmlFor="modal-industry">Giro o Sector de la Empresa</label>
                    <select 
                      id="modal-industry" 
                      value={downloadForm.industry}
                      onChange={(e) => setDownloadForm({...downloadForm, industry: e.target.value})}
                      required
                    >
                      <option value="" disabled>Seleccione una opción...</option>
                      <option value="Agropecuario">Agrícola / Agropecuario</option>
                      <option value="Empaque y Logistica">Embalaje / Logística / Envase</option>
                      <option value="Higiene y Cuidado">Higiene / Cuidado Personal</option>
                      <option value="Alimentos y Bebidas">Alimentos y Bebidas</option>
                      <option value="Otro">Otro Giro Comercial</option>
                    </select>
                  </div>
                </div>

                <div className="pd-modal-footer">
                  <button type="submit" className="pd-modal-submit-btn" disabled={downloadStatus === 'sending'}>
                    {downloadStatus === 'sending' ? (
                      'Procesando...'
                    ) : (
                      <>
                        <Download size={18} /> Descargar PDF Oficial
                      </>
                    )}
                  </button>
                  {downloadStatus === 'error' && (
                    <p className="pd-modal-error-msg">❌ Hubo un error de conexión. Por favor intente de nuevo.</p>
                  )}
                  <p className="pd-modal-security-text">
                    🔒 Sus datos están protegidos bajo nuestro aviso de privacidad industrial.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
