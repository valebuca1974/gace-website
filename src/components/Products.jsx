import { Link } from 'react-router-dom';
import { 
  Layers, 
  Maximize, 
  Box, 
  Bath, 
  Activity, 
  Shield, 
  Trees, 
  Link as LinkIcon, 
  Apple, 
  Gamepad2, 
  Tag 
} from 'lucide-react';
import { productsData } from '../data/products';
import './Products.css';

const iconMap = {
  "poliburbuja": <Layers size={24} />,
  "poliburbuja-corte": <Maximize size={24} />,
  "poliburbuja-punteada": <Box size={24} />,
  "mini-poliburbuja": <Box size={24} />,
  "malla-frutas-verduras": <Apple size={24} />,
  "malla-juguetes": <Gamepad2 size={24} />,
  "malla-promocionales": <Tag size={24} />,
  "malla-memoria": <Activity size={24} />,
  "malla-suave": <Bath size={24} />,
  "malla-proteccion": <Shield size={24} />,
  "malla-reforzada": <Maximize size={28} />,
  "malla-navidad": <Trees size={24} />,
  "broches": <LinkIcon size={24} />
};

const mallasProducts = productsData.filter(p => p.category === 'Mallas' || p.category === 'Accesorios');
const poliburbujaProducts = productsData.filter(p => p.category === 'Embalaje' || p.category === 'Retail y Oficina');

function ProductCard({ p }) {
  return (
    <div className="product-card">
      {p.featured && <span className="product-badge">Más vendido</span>}
      <Link to={`/producto/${p.slug}`} className="product-card-link">
        <div className="product-image-wrapper">
          <img src={p.image} alt={`${p.title} industrial`} className="product-image-show" loading="lazy" />
          <div className="product-icon-overlay">{iconMap[p.id]}</div>
        </div>
        <div className="product-card-body">
          <div className="product-category">{p.category}</div>
          <h3 className="product-title">{p.title}</h3>
          
          <ul className="product-benefits">
            {p.benefits.slice(0, 3).map((b, i) => (
              <li key={i}>✓ {b}</li>
            ))}
          </ul>

          <div className="variants-preview">
            {p.variants.map((v, i) => (
              <span key={i} className="variant-mini-pill">{v.name}</span>
            ))}
          </div>

          <div className="btn-wrapper-prod">
            <span className="cta-mini">Ver detalles técnicos</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Products() {
  return (
    <>
      {/* SECCIÓN MALLA */}
      <section id="malla" className="products">
        <div className="container text-center">
          <h2 className="section-title">Malla Plástica</h2>
          <p className="section-subtitle">Mallas extruidas tipo red para empaque, protección y presentación de productos.</p>
          
          <div className="products-grid">
            {mallasProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN POLIBURBUJA */}
      <section id="poliburbuja" className="products products-poli">
        <div className="container text-center">
          <h2 className="section-title">Poliburbuja</h2>
          <p className="section-subtitle">Protección superior contra golpes, vibraciones y humedad para sus envíos.</p>
          
          <div className="products-grid">
            {poliburbujaProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
