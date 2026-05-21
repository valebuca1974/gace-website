/* global process */
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Permitir CORS desde cualquier origen (para que el navegador no bloquee)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  // Responder a preflight CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  // Parsear body si viene como string
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { /* ignore */ }
  }

  const lead_data = body?.lead_data;
  const metadata = body?.metadata;
  const lead_type = metadata?.lead_type || "B2B_Inbound_Web";

  if (!lead_data || !lead_data.name || !lead_data.email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Faltan campos requeridos',
      debug: { hasBody: !!body, hasLeadData: !!lead_data }
    });
  }

  const { name, email, phone, message, company, industry, volume } = lead_data;

  // Verificar que las variables de entorno existen
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ 
      success: false, 
      message: 'Configuración de correo no encontrada en el servidor'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const isDownload = lead_type === 'B2B_Technical_Sheet_Download';
    
    // Asunto diferenciado
    const ownerSubject = isDownload 
      ? `📥 FICHA TÉCNICA DESCARGADA: ${name} (${company || 'Sin Empresa'})`
      : `🚨 NUEVA COTIZACIÓN WEB: ${name}`;

    // Cuerpo HTML del correo para el dueño estilizado
    const ownerMailHtml = isDownload 
      ? `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; padding: 25px; border: 2px solid #10B981; border-radius: 10px; background-color: #ffffff; color: #1e293b;">
          <div style="background-color: #E6F4EA; color: #137333; padding: 8px 15px; border-radius: 5px; font-weight: bold; font-size: 13px; margin-bottom: 20px; display: inline-block; text-transform: uppercase; letter-spacing: 0.5px;">
            📥 DESCARGA DE FICHA TÉCNICA (Gated Lead)
          </div>
          <h2 style="color: #1a365d; margin: 0 0 10px 0; font-size: 20px; font-weight: 800;">Nuevo Prospecto Calificado</h2>
          <p style="margin: 0 0 20px 0; font-size: 14px; color: #64748b; line-height: 1.5;">Un usuario B2B ha completado el formulario de descarga en el detalle de producto para obtener la Ficha Técnica.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 35%;">👤 Contacto / Cargo:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">🏢 Empresa / Negocio:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${company || 'No especificada'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">✉️ Correo Corporativo:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #00AEEF; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">📞 Teléfono:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${phone || 'No proporcionado'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">⚙️ Giro Industrial:</td>
                <td style="padding: 10px 0; color: #1e3a8a; font-weight: bold;">${industry || 'No especificado'}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; border-radius: 4px; font-size: 13px; color: #15803d; font-style: italic;">
            <strong>Evento registrado:</strong> ${message}
          </div>

          <p style="color: #94a3b8; font-size: 11px; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 15px; text-align: center; margin-bottom: 0;">
            Enviado de forma segura desde la API de gaceempaques.mx
          </p>
        </div>
      `
      : `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; padding: 25px; border: 2px solid #00AEEF; border-radius: 10px; background-color: #ffffff; color: #1e293b;">
          <div style="background-color: #E8F0FE; color: #1A73E8; padding: 8px 15px; border-radius: 5px; font-weight: bold; font-size: 13px; margin-bottom: 20px; display: inline-block; text-transform: uppercase; letter-spacing: 0.5px;">
            🚨 SOLICITUD DE COTIZACIÓN B2B
          </div>
          <h2 style="color: #1a365d; margin: 0 0 10px 0; font-size: 20px; font-weight: 800;">Nuevo Prospecto Comercial</h2>
          <p style="margin: 0 0 20px 0; font-size: 14px; color: #64748b; line-height: 1.5;">Se ha recibido una nueva solicitud de cotización desde el formulario principal de contacto.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 35%;">👤 Nombre / Empresa:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">✉️ Correo electrónico:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #00AEEF; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">📞 Teléfono:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${phone || 'No proporcionado'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">⚙️ Giro Industrial:</td>
                <td style="padding: 10px 0; color: #1e3a8a; font-weight: bold;">${industry || 'No especificado'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">📦 Volumen Estimado:</td>
                <td style="padding: 10px 0; color: #ef4444; font-weight: bold;">${volume || 'No especificado'}</td>
              </tr>
            </table>
          </div>
          
          <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px; color: #1a365d;">📝 Mensaje o Especificaciones:</p>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #00AEEF; padding: 15px; border-radius: 4px; font-size: 13px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>

          <p style="color: #94a3b8; font-size: 11px; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 15px; text-align: center; margin-bottom: 0;">
            Enviado de forma segura desde la API de gaceempaques.mx
          </p>
        </div>
      `;

    // 1. Correo de Alerta para el Dueño/Ventas
    const ownerMailOptions = {
      from: `"Sistema Web GACE" <${process.env.GMAIL_USER}>`,
      to: 'mariana.garcia@gaceempaques.mx',
      subject: ownerSubject,
      html: ownerMailHtml,
    };

    // 2. Correo Automático de Bienvenida para el Cliente
    const clientMailOptions = {
      from: `"Ventas GACE Industrial" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: isDownload
        ? `Ficha Técnica Recibida - GACE Mallas y Poliburbuja`
        : `Solicitud Recibida - GACE Mallas y Poliburbuja`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #E0E0E0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <!-- Header / Letterhead -->
          <div style="background-color: #0A192F; padding: 25px; text-align: center; border-bottom: 4px solid #00AEEF;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">GACE Empaques y Mallas Plásticas</h1>
            <p style="color: #8892B0; margin: 5px 0 0 0; font-size: 14px;">Fabricantes Directos · Soluciones Industriales</p>
          </div>

          <!-- Body -->
          <div style="padding: 30px;">
            <h2 style="color: #1D1D4B; font-size: 20px;">Estimado/a ${name},</h2>
            
            <p style="color: #333; line-height: 1.6; font-size: 15px;">
              ${isDownload 
                ? 'Es un honor saludarle y agradecer su interés en nuestras fichas técnicas de grado industrial.' 
                : 'Hemos recibido su solicitud de cotización comercial con éxito.'}
            </p>

            <p style="color: #333; line-height: 1.6; font-size: 15px;">
              En <strong>GACE</strong>, nos enorgullece ser una empresa fabricante líder en la extrusión de mallas plásticas, poliburbuja y soluciones de empaque de alta ingeniería. Nuestro compromiso es brindar protección y calidad inigualable para los sectores agrícola, alimenticio, logístico e industrial en todo México.
            </p>

            <p style="color: #333; line-height: 1.6; font-size: 15px;">
              Uno de nuestros ingenieros comerciales revisará detenidamente sus requerimientos y se pondrá en contacto a la brevedad para brindarle atención personalizada y los mejores precios directos de fábrica.
            </p>

            <!-- Curiosity Gap Hook -->
            <div style="background-color: #F8FAFC; border-left: 4px solid #F59E0B; padding: 15px 20px; margin: 25px 0; border-radius: 0 6px 6px 0;">
              <h3 style="margin: 0 0 8px 0; color: #B45309; font-size: 15px;">🏭 Nota de Manufactura y Producción:</h3>
              <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">
                Al ser fábrica directa, si dentro de nuestra información general no encuentra el calibre, ancho o especificación exacta que requiere, <strong>por favor responda a este correo o contáctenos por WhatsApp</strong>. Contamos con la infraestructura para desarrollar formulaciones y extruir medidas especiales según las exigencias de su proyecto.
              </p>
            </div>

            <!-- User Data Reference -->
            <div style="background-color: #F1F5F9; border-radius: 6px; padding: 15px; margin-bottom: 30px;">
              <p style="margin: 0 0 10px 0; font-size: 13px; color: #64748B; text-transform: uppercase; font-weight: bold;">Requerimiento registrado:</p>
              <p style="margin: 0; font-style: italic; color: #334155; font-size: 14px;">"${message}"</p>
            </div>

            <!-- Formal Closing -->
            <p style="color: #333; line-height: 1.6; font-size: 15px; margin-bottom: 5px;">Agradecemos de antemano su confianza.</p>
            <p style="color: #333; line-height: 1.6; font-size: 15px; font-weight: bold; margin-top: 0;">Atentamente,</p>
            <p style="color: #0A192F; font-size: 16px; font-weight: bold; margin-bottom: 25px;">Dirección Comercial GACE</p>
          </div>

          <!-- Footer / Company Data (Letterhead bottom) -->
          <div style="background-color: #E2E8F0; padding: 25px 30px; border-top: 1px solid #CBD5E1;">
            <h4 style="margin: 0 0 15px 0; color: #0F172A; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Información Corporativa</h4>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #334155; line-height: 1.5;">
              <tr>
                <td width="20" valign="top" style="padding-bottom: 8px;">📍</td>
                <td style="padding-bottom: 8px;">
                  <strong>Planta y Oficinas Centrales:</strong><br/>
                  Manuel Carrión y Rubio Mz. 154 Lt. 20 #103,<br/>
                  Col. Santa Martha Acatitla Norte, Iztapalapa, CDMX, C.P. 09140
                </td>
              </tr>
              <tr>
                <td width="20" valign="top" style="padding-bottom: 8px;">📞</td>
                <td style="padding-bottom: 8px;">
                  <strong>Contacto Directo:</strong><br/>
                  Teléfono Oficina: (55) 5733 4240<br/>
                  Ventas / WhatsApp: +52 55 8676 3800
                </td>
              </tr>
              <tr>
                <td width="20" valign="top" style="padding-bottom: 8px;">✉️</td>
                <td style="padding-bottom: 8px;">
                  <strong>Correo Institucional:</strong><br/>
                  <a href="mailto:mariana.garcia@gaceempaques.mx" style="color: #334155; text-decoration: none;">mariana.garcia@gaceempaques.mx</a>
                </td>
              </tr>
              <tr>
                <td width="20" valign="top">🌐</td>
                <td>
                  <strong>Sitio Web Oficial:</strong><br/>
                  <a href="https://gaceempaques.mx" style="color: #00AEEF; text-decoration: none;">www.gaceempaques.mx</a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      `,
    };

    // Ejecutamos el envío de ambos correos en paralelo
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    return res.status(200).json({ success: true, message: 'Correos enviados exitosamente' });
  } catch (error) {
    console.error('Error enviando correos:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Fallo al enviar correos', 
      error: error.message 
    });
  }
}
