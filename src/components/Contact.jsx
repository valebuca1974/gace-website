import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', fax: '' });
  const [submitStatus, setSubmitStatus] = useState(null); // 'sending', 'success', 'error'

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check: If the hidden field is filled, it's a bot
    if (formData.fax) {
      console.warn("Spam detected");
      setSubmitStatus('success'); // Pretend it worked to trick the bot
      return;
    }

    setSubmitStatus('sending');
    
    try {
      // 🚀 INTEGRACIÓN PRO: Backend Interno (Vercel API)
      // Conectado directamente a nuestra propia API Serverless programada a la medida
      const webhookUrl = '/api/contact.php';
      
      const payload = {
        lead_data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        metadata: {
          source_url: window.location.href,
          timestamp: new Date().toISOString(),
          lead_type: "B2B_Inbound_Web",
          user_agent: navigator.userAgent
        }
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok || response.type === 'opaque') {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <section id="contacto" className="contact">
      <div className="container contact-wrapper">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title text-left">Ponte en contacto</h2>
            <p className="contact-desc">
              ¿Listo para realizar un pedido o tienes dudas sobre nuestros productos? Nuestro equipo de ventas está listo para atenderte.
            </p>
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Phone size={24} />
                </div>
                <div>
                  <h4>Ventas WhatsApp</h4>
                  <a href="https://wa.me/525586763800">+52 55 8676 3800</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Phone size={24} />
                </div>
                <div>
                  <h4>Teléfono Oficina</h4>
                  <a href="tel:5557334240">(55) 5733 4240</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <Mail size={24} />
                </div>
                <div>
                  <h4>Correo Institucional</h4>
                  <a href="mailto:direccion@gaceempaques.mx">direccion@gaceempaques.mx</a>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon-wrapper">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4>Ubicación base</h4>
                  <p>Envíos a todo México</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Solicitar Cotización</h3>
              
              {/* Honeypot field (hidden from users) */}
              <div className="hidden-field">
                <label htmlFor="fax">No llenar este campo si eres humano</label>
                <input type="text" id="fax" name="fax" value={formData.fax} onChange={handleChange} autoComplete="off" />
              </div>

              <div className="form-group">
                <label htmlFor="name">Nombre / Empresa</label>
                <input type="text" id="name" name="name" placeholder="Ej. Juan Pérez / Agrícola del Norte" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input type="email" id="email" name="email" placeholder="correo@empresa.com" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" name="phone" placeholder="55 1234 5678" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje / Especificaciones</label>
                <textarea id="message" name="message" rows="4" placeholder="Describa el tipo de malla, cantidades y medidas que necesita..." value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary submit-btn" disabled={submitStatus === 'sending'}>
                <Send size={18} /> {submitStatus === 'sending' ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
              {submitStatus === 'success' && (
                <p className="form-success">✅ ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.</p>
              )}
              {submitStatus === 'error' && (
                <p className="form-error">❌ Hubo un error. Por favor inténtalo de nuevo o contáctanos por WhatsApp.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
