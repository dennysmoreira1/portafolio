const { Resend } = require('resend');

exports.handler = async function(event, context) {
  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);
    
    // Validar campos requeridos
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Todos los campos son requeridos' })
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

         const { data, error } = await resend.emails.send({
       from: 'Portfolio <onboarding@resend.dev>',
       to: ['nickyparra0@gmail.com'],
       subject: `Nuevo mensaje de ${name} desde tu portafolio`,
       html: `
         <h2>Nuevo mensaje desde tu portafolio</h2>
         <p><strong>Nombre:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Mensaje:</strong></p>
         <p>${message}</p>
       `
     });

    if (error) {
      console.error('Error de Resend:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error al enviar el email' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Email enviado con éxito',
        data 
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
}; 