"use client";

import { useEffect, useRef } from 'react';
import styles from './ParticlesBg.module.css';

const ParticlesBg = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log('ParticlesBg component mounted');
        const canvas = canvasRef.current;
        if (!canvas) {
            console.log('Canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.log('Canvas context not found');
            return;
        }

        console.log('Canvas and context found, setting up particles');

        // Configurar canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Crear partículas simples
        const particles: Array<{
            x: number;
            y: number;
            size: number;
        }> = [];

        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 4 + 2,
            });
        }

        console.log('Created', particles.length, 'particles');

        // Función de animación simple
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Dibujar partícula
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 174, 0.8)';
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();
        console.log('Animation started');

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={styles.particlesCanvas}
        />
    );
};

export default ParticlesBg; 