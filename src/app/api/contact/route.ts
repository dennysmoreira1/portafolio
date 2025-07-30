import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    try {
        console.log('API route called');

        // Obtener la API key desde variables de entorno
        const apiKey = process.env.RESEND_API_KEY;
        console.log('API Key available:', !!apiKey);

        if (!apiKey) {
            console.error('API key not found');
            return NextResponse.json(
                { error: 'API key no configurada' },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        const body = await request.json();
        const { name, email, message } = body;

        console.log('Received data:', { name, email, message });

        // Validar los campos requeridos
        if (!name || !email || !message) {
            console.log('Missing required fields');
            return NextResponse.json(
                { error: 'Todos los campos son requeridos' },
                { status: 400 }
            );
        }

        console.log('Sending email with Resend...');

        // Enviar email usando Resend
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'nickyparra0@gmail.com',
            subject: `Nuevo mensaje de ${name} desde tu portafolio`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${message}</p>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: 'Error al enviar el email: ' + error.message },
                { status: 500 }
            );
        }

        console.log('Email sent successfully:', data);
        return NextResponse.json(
            { message: 'Email enviado correctamente' },
            { status: 200 }
        );
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor: ' + (error as Error).message },
            { status: 500 }
        );
    }
} 