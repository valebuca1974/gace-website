import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calculator,
  Package,
  Ruler,
  MessageCircle,
  ChevronDown,
  Info,
  CheckCircle
} from 'lucide-react';
import './CalculadoraPoliburbuja.css';

/* ───────────────────────────────────────────────────────
   CATÁLOGO OFICIAL GACE — Rollos de Poliburbuja
   Datos tomados directamente del catálogo PDF original.
   ─────────────────────────────────────────────────────── */
const POLIBURBUJA_CATALOG = [
  {
    id: 'pb-half-standard',
    group: 'Poliburbuja Estándar',
    caliber: '1/2"',
    label: 'Poliburbuja 1/2" — Rollo Estándar',
    rollWidth: 1.22,       // metros
    rollLength: 125,         // metros (Literal según catálogo GACE)
    rollArea: 1.22 * 125,
    // 79.3 m²
    description: 'Poliburbuja de 1/2" (Burbuja Grande)',
    slug: 'poliburbuja-industrial'
  },
  {
    id: 'pb-316-standard',
    group: 'Poliburbuja Estándar',
    caliber: '3/16"',
    label: 'Poliburbuja 3/16" — Rollo Estándar',
    rollWidth: 1.22,
    rollLength: 65,         // metros (Literal según catálogo GACE)
    rollArea: 1.22 * 65,
    description: 'Poliburbuja de 3/16" (Burbuja Chica)',
    slug: 'poliburbuja-industrial'
  },
  {
    id: 'pb-half-corte30',
    group: 'Poliburbuja con Corte',
    caliber: '1/2"',
    label: 'Poliburbuja 1/2" — Corte 30 cm',
    rollWidth: 0.30,
    rollLength: 125,
    rollArea: 0.30 * 125,
    description: 'Rollo pre-cortado a 30 cm de ancho. Burbuja de 1/2".',
    slug: 'poliburbuja-con-corte'
  },
  {
    id: 'pb-half-corte40',
    group: 'Poliburbuja con Corte',
    caliber: '1/2"',
    label: 'Poliburbuja 1/2" — Corte 40 cm',
    rollWidth: 0.40,
    rollLength: 125,
    rollArea: 0.40 * 125,
    description: 'Rollo pre-cortado a 40 cm de ancho. Burbuja de 1/2".',
    slug: 'poliburbuja-con-corte'
  },
  {
    id: 'pb-half-corte60',
    group: 'Poliburbuja con Corte',
    caliber: '1/2"',
    label: 'Poliburbuja 1/2" — Corte 60 cm',
    rollWidth: 0.60,
    rollLength: 125,
    rollArea: 0.60 * 125,
    description: 'Rollo pre-cortado a 60 cm de ancho. Burbuja de 1/2".',
    slug: 'poliburbuja-con-corte'
  },
  {
    id: 'pb-316-corte30',
    group: 'Poliburbuja con Corte',
    caliber: '3/16"',
    label: 'Poliburbuja 3/16" — Corte 30 cm',
    rollWidth: 0.30,
    rollLength: 65,
    rollArea: 0.30 * 65,
    description: 'Rollo pre-cortado a 30 cm de ancho. Burbuja de 3/16".',
    slug: 'poliburbuja-con-corte'
  },
  {
    id: 'pb-316-corte40',
    group: 'Poliburbuja con Corte',
    caliber: '3/16"',
    label: 'Poliburbuja 3/16" — Corte 40 cm',
    rollWidth: 0.40,
    rollLength: 65,
    rollArea: 0.40 * 65,
    description: 'Rollo pre-cortado a 40 cm de ancho. Burbuja de 3/16".',
    slug: 'poliburbuja-con-corte'
  },
  {
    id: 'pb-316-corte60',
    group: 'Poliburbuja con Corte',
    caliber: '3/16"',
    label: 'Poliburbuja 3/16" — Corte 60 cm',
    rollWidth: 0.60,
    rollLength: 65,
    rollArea: 0.60 * 65,
    description: 'Rollo pre-cortado a 60 cm de ancho. Burbuja de 3/16".',
    slug: 'poliburbuja-con-corte'
  },
  {
    id: 'mini-half-30',
    group: 'Mini Poliburbuja',
    caliber: '1/2"',
    label: 'Mini Poliburbuja 1/2" — 30 cm × 10 m',
    rollWidth: 0.30,
    rollLength: 10,
    rollArea: 0.30 * 10,
    description: 'Rollo compacto de 30 cm × 10 m. Burbuja de 1/2".',
    slug: 'mini-poliburbuja-retail'
  },
  {
    id: 'mini-half-40',
    group: 'Mini Poliburbuja',
    caliber: '1/2"',
    label: 'Mini Poliburbuja 1/2" — 40 cm × 10 m',
    rollWidth: 0.40,
    rollLength: 10,
    rollArea: 0.40 * 10,
    description: 'Rollo compacto de 40 cm × 10 m. Burbuja de 1/2".',
    slug: 'mini-poliburbuja-retail'
  },
  {
    id: 'mini-half-60',
    group: 'Mini Poliburbuja',
    caliber: '1/2"',
    label: 'Mini Poliburbuja 1/2" — 60 cm × 10 m',
    rollWidth: 0.60,
    rollLength: 10,
    rollArea: 0.60 * 10,
    description: 'Rollo compacto de 60 cm × 10 m. Burbuja de 1/2".',
    slug: 'mini-poliburbuja-retail'
  },
  {
    id: 'mini-316-30',
    group: 'Mini Poliburbuja',
    caliber: '3/16"',
    label: 'Mini Poliburbuja 3/16" — 30 cm × 10 m',
    rollWidth: 0.30,
    rollLength: 10,
    rollArea: 0.30 * 10,
    description: 'Rollo compacto de 30 cm × 10 m. Burbuja de 3/16".',
    slug: 'mini-poliburbuja-retail'
  },
  {
    id: 'mini-316-40',
    group: 'Mini Poliburbuja',
    caliber: '3/16"',
    label: 'Mini Poliburbuja 3/16" — 40 cm × 10 m',
    rollWidth: 0.40,
    rollLength: 10,
    rollArea: 0.40 * 10,
    description: 'Rollo compacto de 40 cm × 10 m. Burbuja de 3/16".',
    slug: 'mini-poliburbuja-retail'
  },
  {
    id: 'mini-316-60',
    group: 'Mini Poliburbuja',
    caliber: '3/16"',
    label: 'Mini Poliburbuja 3/16" — 60 cm × 10 m',
    rollWidth: 0.60,
    rollLength: 10,
    rollArea: 0.60 * 10,
    description: 'Rollo compacto de 60 cm × 10 m. Burbuja de 3/16".',
    slug: 'mini-poliburbuja-retail'
  }
];

/* Groups for the selector */
const GROUPS = [...new Set(POLIBURBUJA_CATALOG.map(p => p.group))];

export default function CalculadoraPoliburbuja() {
  const [selectedId, setSelectedId] = useState('');
  const [coverWidth, setCoverWidth] = useState('');
  const [coverHeight, setCoverHeight] = useState('');
  const [unit, setUnit] = useState('m'); // m or cm
  const [showResult, setShowResult] = useState(false);

  const selectedProduct = POLIBURBUJA_CATALOG.find(p => p.id === selectedId);

  const result = useMemo(() => {
    if (!selectedProduct || !coverWidth || !coverHeight) return null;

    const w = parseFloat(coverWidth);
    const h = parseFloat(coverHeight);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return null;

    // Convert to meters
    const wMeters = unit === 'cm' ? w / 100 : w;
    const hMeters = unit === 'cm' ? h / 100 : h;

    const totalAreaNeeded = wMeters * hMeters;
    const rollArea = selectedProduct.rollArea;

    // Calculate how many strips fit widthwise
    const stripsNeeded = Math.ceil(wMeters / selectedProduct.rollWidth);
    // Length of material per strip
    const lengthPerStrip = hMeters;
    // Total linear meters needed
    const totalLinearMeters = stripsNeeded * lengthPerStrip;
    // Rolls needed based on linear meters per roll
    const rollsByLength = Math.ceil(totalLinearMeters / selectedProduct.rollLength);
    // Rolls needed based on total area
    const rollsByArea = Math.ceil(totalAreaNeeded / rollArea);
    // Use the higher of both calculations to be safe
    const rollsNeeded = Math.max(rollsByLength, rollsByArea);

    return {
      totalAreaNeeded: totalAreaNeeded.toFixed(2),
      rollArea: rollArea.toFixed(2),
      rollsNeeded,
      stripsNeeded,
      totalLinearMeters: totalLinearMeters.toFixed(2),
      wMeters: wMeters.toFixed(2),
      hMeters: hMeters.toFixed(2),
      surplus: ((rollsNeeded * rollArea) - totalAreaNeeded).toFixed(2)
    };
  }, [selectedProduct, coverWidth, coverHeight, unit]);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (result) setShowResult(true);
  };

  const handleReset = () => {
    setSelectedId('');
    setCoverWidth('');
    setCoverHeight('');
    setShowResult(false);
  };

  const waNumber = "525586763800";
  const generateWhatsAppUrl = () => {
    if (!selectedProduct || !result) return '#';
    const msg = `Hola GACE, usé su calculadora y necesito ${result.rollsNeeded} rollo(s) de ${selectedProduct.label} para cubrir ${result.totalAreaNeeded} m². ¿Me pueden cotizar?`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="calc-page">
      <Helmet>
        <title>Calculadora de Poliburbuja | GACE Industrial</title>
        <meta name="description" content="Calcula cuántos rollos de poliburbuja necesitas. Selecciona el modelo, ingresa las dimensiones y obtén el resultado al instante." />
      </Helmet>

      {/* Header */}
      <div className="calc-header">
        <div className="calc-header-inner">
          <Link to="/" className="calc-back">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>
          <div className="calc-header-title">
            <Calculator size={28} />
            <div>
              <h1>Calculadora de Poliburbuja</h1>
              <p>Calcula cuántos rollos necesitas según el área que deseas cubrir</p>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-body">
        <div className="calc-body-inner">

          {/* Left: Calculator Form */}
          <div className="calc-form-card">
            <div className="calc-form-header">
              <Package size={20} />
              <h2>Configuración</h2>
            </div>

            <form onSubmit={handleCalculate}>
              {/* Step 1: Select Product */}
              <div className="calc-step">
                <div className="calc-step-number">1</div>
                <div className="calc-step-content">
                  <label htmlFor="calc-product">Selecciona el modelo de Poliburbuja</label>
                  <div className="calc-select-wrap">
                    <select
                      id="calc-product"
                      value={selectedId}
                      onChange={(e) => {
                        setSelectedId(e.target.value);
                        setShowResult(false);
                      }}
                      required
                    >
                      <option value="">— Seleccionar modelo —</option>
                      {GROUPS.map(group => (
                        <optgroup key={group} label={group}>
                          {POLIBURBUJA_CATALOG.filter(p => p.group === group).map(p => (
                            <option key={p.id} value={p.id}>
                              {p.label} ({p.rollWidth}m × {p.rollLength}m)
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <ChevronDown size={18} className="calc-select-icon" />
                  </div>
                  {selectedProduct && (
                    <div className="calc-product-info">
                      <Info size={14} />
                      <span>{selectedProduct.description}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Roll Specs */}
              {selectedProduct && (
                <div className="calc-roll-specs">
                  <h4>Especificaciones del Rollo Seleccionado</h4>
                  <div className="calc-specs-grid">
                    <div className="calc-spec-item">
                      <span className="calc-spec-label">Calibre</span>
                      <span className="calc-spec-value">{selectedProduct.caliber}</span>
                    </div>
                    <div className="calc-spec-item">
                      <span className="calc-spec-label">Ancho</span>
                      <span className="calc-spec-value">{selectedProduct.rollWidth} m</span>
                    </div>
                    <div className="calc-spec-item">
                      <span className="calc-spec-label">Largo</span>
                      <span className="calc-spec-value">{selectedProduct.rollLength} m</span>
                    </div>
                    <div className="calc-spec-item">
                      <span className="calc-spec-label">Área / rollo</span>
                      <span className="calc-spec-value">{selectedProduct.rollArea.toFixed(1)} m²</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Enter Dimensions */}
              <div className="calc-step">
                <div className="calc-step-number">2</div>
                <div className="calc-step-content">
                  <label>Ingresa las dimensiones del área a cubrir</label>

                  <div className="calc-unit-toggle">
                    <button
                      type="button"
                      className={`calc-unit-btn ${unit === 'm' ? 'active' : ''}`}
                      onClick={() => { setUnit('m'); setShowResult(false); }}
                    >
                      Metros
                    </button>
                    <button
                      type="button"
                      className={`calc-unit-btn ${unit === 'cm' ? 'active' : ''}`}
                      onClick={() => { setUnit('cm'); setShowResult(false); }}
                    >
                      Centímetros
                    </button>
                  </div>

                  <div className="calc-inputs-row">
                    <div className="calc-input-group">
                      <label htmlFor="calc-width">
                        <Ruler size={14} /> Ancho
                      </label>
                      <div className="calc-input-wrap">
                        <input
                          id="calc-width"
                          type="number"
                          step="0.01"
                          min="0.01"
                          placeholder={unit === 'm' ? 'Ej: 3.5' : 'Ej: 350'}
                          value={coverWidth}
                          onChange={(e) => {
                            setCoverWidth(e.target.value);
                            setShowResult(false);
                          }}
                          required
                        />
                        <span className="calc-input-unit">{unit}</span>
                      </div>
                    </div>
                    <div className="calc-input-divider">×</div>
                    <div className="calc-input-group">
                      <label htmlFor="calc-height">
                        <Ruler size={14} /> Alto / Largo
                      </label>
                      <div className="calc-input-wrap">
                        <input
                          id="calc-height"
                          type="number"
                          step="0.01"
                          min="0.01"
                          placeholder={unit === 'm' ? 'Ej: 5.0' : 'Ej: 500'}
                          value={coverHeight}
                          onChange={(e) => {
                            setCoverHeight(e.target.value);
                            setShowResult(false);
                          }}
                          required
                        />
                        <span className="calc-input-unit">{unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="calc-actions">
                <button type="submit" className="calc-btn-calculate" disabled={!selectedProduct || !coverWidth || !coverHeight}>
                  <Calculator size={18} />
                  Calcular Rollos
                </button>
                <button type="button" className="calc-btn-reset" onClick={handleReset}>
                  Limpiar
                </button>
              </div>
            </form>
          </div>

          {/* Right: Result */}
          <div className={`calc-result-card ${showResult && result ? 'show' : ''}`}>
            {showResult && result ? (
              <>
                <div className="calc-result-header">
                  <CheckCircle size={24} />
                  <h2>Resultado</h2>
                </div>

                <div className="calc-result-main">
                  <div className="calc-result-big-number">
                    <span className="calc-big-num">{result.rollsNeeded}</span>
                    <span className="calc-big-label">
                      {result.rollsNeeded === 1 ? 'Rollo necesario' : 'Rollos necesarios'}
                    </span>
                  </div>
                </div>

                <div className="calc-result-details">
                  <div className="calc-result-row">
                    <span>Modelo seleccionado</span>
                    <strong>{selectedProduct.label}</strong>
                  </div>
                  <div className="calc-result-row">
                    <span>Área total a cubrir</span>
                    <strong>{result.totalAreaNeeded} m²</strong>
                  </div>
                  <div className="calc-result-row">
                    <span>Dimensiones ingresadas</span>
                    <strong>{result.wMeters} m × {result.hMeters} m</strong>
                  </div>
                  <div className="calc-result-row">
                    <span>Área por rollo</span>
                    <strong>{result.rollArea} m²</strong>
                  </div>
                  <div className="calc-result-row">
                    <span>Tiras necesarias (ancho)</span>
                    <strong>{result.stripsNeeded}</strong>
                  </div>
                  <div className="calc-result-row">
                    <span>Metros lineales totales</span>
                    <strong>{result.totalLinearMeters} m</strong>
                  </div>
                  <div className="calc-result-row highlight">
                    <span>Material sobrante aprox.</span>
                    <strong>{result.surplus} m²</strong>
                  </div>
                </div>


                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calc-cta-whatsapp"
                >
                  <MessageCircle size={18} />
                  Cotizar {result.rollsNeeded} {result.rollsNeeded === 1 ? 'Rollo' : 'Rollos'} por WhatsApp
                </a>

                <Link to={`/producto/${selectedProduct.slug}`} className="calc-link-product">
                  Ver ficha técnica del producto →
                </Link>
              </>
            ) : (
              <div className="calc-result-empty">
                <div className="calc-empty-icon">
                  <Calculator size={48} />
                </div>
                <h3>Tu resultado aparecerá aquí</h3>
                <p>Selecciona un modelo de poliburbuja, ingresa las dimensiones y haz clic en &quot;Calcular Rollos&quot;.</p>
              </div>
            )}
          </div>
        </div>

        {/* Reference Table */}
        <div className="calc-reference">
          <h3>📋 Tabla de Referencia — Medidas de Rollos GACE</h3>
          <div className="calc-table-wrap">
            <table className="calc-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Calibre</th>
                  <th>Ancho</th>
                  <th>Largo</th>
                  <th>Área / Rollo</th>
                </tr>
              </thead>
              <tbody>
                {POLIBURBUJA_CATALOG.map(p => (
                  <tr
                    key={p.id}
                    className={selectedId === p.id ? 'selected' : ''}
                    onClick={() => { setSelectedId(p.id); setShowResult(false); }}
                  >
                    <td>{p.label}</td>
                    <td><span className="calc-caliber-badge">{p.caliber}</span></td>
                    <td>{p.rollWidth} m</td>
                    <td>{p.rollLength} m</td>
                    <td><strong>{p.rollArea.toFixed(1)} m²</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
