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

  if (!lead_data || !lead_data.name || !lead_data.email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Faltan campos requeridos',
      debug: { hasBody: !!body, hasLeadData: !!lead_data }
    });
  }

  const { name, email, phone, message } = lead_data;

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

    // 1. Correo de Alerta para el Dueño/Ventas
    const ownerMailOptions = {
      from: `"Sistema Web GACE" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🚨 NUEVO PROSPECTO WEB: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1D1D4B;">🚨 Nuevo Contacto B2B desde la Web</h2>
          <p>Se ha recibido una nueva solicitud de cotización desde la página web de GACE.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>👤 Nombre / Empresa:</strong> ${name}</p>
          <p><strong>✉️ Correo del cliente:</strong> ${email}</p>
          <p><strong>📞 Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p><strong>📝 Especificaciones / Mensaje:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 30px;">Recibido a través de la API Interna de Vercel.</p>
        </div>
      `,
    };

    // 2. Correo Automático de Bienvenida para el Cliente
    const clientMailOptions = {
      from: `"Ventas GACE Industrial" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Solicitud Recibida - GACE Mallas y Poliburbuja`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #007BFF; border-radius: 10px;">
          <h2 style="color: #1D1D4B;">¡Hola ${name}!</h2>
          <p>Hemos recibido tu solicitud de cotización con éxito.</p>
          <p>En <strong>GACE</strong> somos fabricantes directos de mallas plásticas, poliburbuja y soluciones de empaque. Uno de nuestros ingenieros de ventas revisará tus requerimientos y se pondrá en contacto contigo muy pronto para brindarte la mejor atención y precio de fábrica.</p>
          <br/>
          <p><strong>Detalles de tu solicitud:</strong></p>
          <p style="background-color: #f4f7fb; padding: 10px; border-left: 4px solid #00AEEF;"><em>"${message}"</em></p>
          <br/>
          <p>Atentamente,</p>
          <p><strong>Equipo de Ventas GACE</strong><br/>
          📞 (55) 8676 3800<br/>
          🌐 <a href="https://web-fabrica-de-malla.vercel.app">www.gace.com.mx</a></p>
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
