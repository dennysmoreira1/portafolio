"use client";

import Link from 'next/link';
import styles from './Navbar.module.css';

/**
 * Navbar principal del portafolio Dennys Dev
 * Incluye enlaces a las secciones: Inicio, Sobre mí, Mis Servicios, Mis Proyectos, Contacto
 */
const Navbar = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            let navbarHeight = 100; // Offset por defecto

            // Ajuste específico para la sección de servicios
            if (sectionId === 'servicios') {
                navbarHeight = 120; // Más espacio para servicios
            }

            // Ajuste específico para la sección sobre mí
            if (sectionId === 'sobremi') {
                navbarHeight = 90; // Espacio específico para sobre mí
            }

            const elementPosition = element.offsetTop - navbarHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">
                    Dennys <span>Dev</span>
                </Link>
            </div>
            <ul className={styles.menu}>
                <li><button onClick={() => scrollToSection('inicio')} className={styles.navLink}>Inicio</button></li>
                <li><button onClick={() => scrollToSection('sobremi')} className={styles.navLink}>Sobre mí</button></li>
                <li><button onClick={() => scrollToSection('servicios')} className={styles.navLink}>Mis Servicios</button></li>
                <li><button onClick={() => scrollToSection('proyectos')} className={styles.navLink}>Mis Proyectos</button></li>
                <li><button onClick={() => scrollToSection('contacto')} className={styles.navLink}>Contacto</button></li>
            </ul>
        </nav>
    );
};

export default Navbar; 