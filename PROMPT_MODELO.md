# 💎 Prompt Maestro: Web Industrial Premium B2B

Este documento contiene el modelo de prompt estructurado para replicar o extender la web de **GACE Industrial**. Puedes copiar este texto íntegro y dárselo a una IA para iniciar un proyecto similar.

---

## 📝 Descripción del Proyecto
**Título:** Plataforma de Manufactura Industrial GACE.
**Nicho:** B2B, Fabricación de Mallas Plásticas.
**Objetivo:** Transmitir robustez, limpieza industrial y facilitar la cotización directa por volumen.

---

## 🛠️ Stack Técnico Sugerido
- **Frontend:** React 19 + Vite (Rápido, Moderno).
- **Styling:** Vanilla CSS (Diseño personalizado, sin dependencias pesadas).
- **Iconos:** Lucide-React (Consistencia visual).
- **SEO:** React Helmet Async (Indexación dinámica).
- **Backend/Forms:** Web3Forms / Formspree (Sin servidor).
- **Chat:** Tawk.to / WhatsApp Floating Button.

---

## 🎨 Guía de Estilo y Diseño (Design System)
### 1. Colores (Variables CSS)
- `--color-primary: #0A2A66;` (Azul Marino Profundo - Confianza)
- `--color-secondary: #1E88E5;` (Azul Eléctrico - Tecnología)
- `--color-accent: #2E7D32;` (Verde Industrial - Agricultura/Acción)
- `--color-bg: #F4F7FB;` (Gris Ultra-Claro - Limpieza)

### 2. Estética "Industrial Premium"
- **Glassmorphism:** Uso de `backdrop-filter: blur(12px)` en Header y tarjetas flotantes.
- **Micro-animaciones:** Los elementos deben aparecer con `fadeInUp` suave al hacer scroll.
- **Gradientes:** Fondos con gradientes de 90 grados que pasen de color sólido a transparente sobre imágenes industriales.
- **Tipografía:** 'Inter' o 'Outfit' (Modernas, legibles, geométricas).

---

## 🏗️ Arquitectura de Componentes
### 1. Header (Navegación)
- Diseño Sticky (fijo al scroll).
- Efecto de desenfoque de cristal.
- Logo compuesto: Isotipo vertical + Logotipo.
- CTA de "Cotizar" destacado en la esquina derecha.

### 2. Hero (Impacto)
- Fondo de video cinemático (`loop`, `muted`, `autoplay`).
- Overlay de textura de malla (patrón de diamantes animado).
- Título H1 con `clamp()` para adaptabilidad móvil.
- Badge de "Fabricantes Directos" con punto de luz animado (Live Dot).

### 3. Catálogo de Productos
- Grid responsivo de 3-4 columnas.
- Tarjetas con sombras suaves que se elevan al pasar el mouse.
- Botones de "Ver Detalles" o "Cotizar" específicos por producto.

### 4. Sección 'Acerca de' (Storytelling)
- Dividida en dos columnas.
- Lado A: Texto persuasivo sobre calidad y trayectoria.
- Lado B: Ilustración 3D o foto de alta calidad de los rollos de malla.

### 5. Contacto y Lead Gen
- Formulario de contacto limpio con validaciones.
- Mapa o iconos de contacto (WhatsApp, Email, Ubicación).
- Botón flotante de WhatsApp en la esquina inferior.

---

## 📈 Reglas de Oro (Best Practices)
1. **Mobile-First:** La web debe verse perfecta en un iPhone 12/13 antes que en escritorio.
2. **SEO Nativo:** Cada página debe tener un componente `<SEO />` con Schema Markup de `Organization`.
3. **Velocidad:** Imágenes en `.webp` y carga diferida (lazy load).
4. **Cero Placeholders:** Si no hay imagen, usar gradientes industriales elegantes.

---

### 📝 Cómo guardar esto como PDF:
1. Abre este archivo en tu editor (VS Code).
2. Abre la vista previa de Markdown (`Ctrl + Shift + V`).
3. Haz clic derecho en la vista previa y selecciona "Imprimir" o "Exportar a PDF".
