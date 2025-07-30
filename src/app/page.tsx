"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import ParticlesBg from "../components/ParticlesBg";

const socialIcons = [
  { src: "/github.svg", alt: "GitHub", href: "https://github.com/dennysmoreira1" },
  { src: "/linkedin.svg", alt: "LinkedIn", href: "https://www.linkedin.com/in/dennys-alejandro-766a64193/" },
  { src: "/cv.svg", alt: "CV", href: "#" },
];

const skills = [
  "HTML & CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Express.js",
  "Firebase",
  "Git & GitHub",
  "REST APIs",
];

export default function Home() {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setShowParticles(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100; // Aumentar el offset para mejor centrado
      const elementPosition = element.offsetTop - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleCVClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Crear un enlace temporal para descargar el CV
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'Dennys_Alejandro_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Usar Formspree como alternativa
      const response = await fetch("https://formspree.io/f/xpzgwqjq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      alert("Mensaje enviado con éxito!");

      // Reset del formulario de forma segura
      if (form) {
        form.reset();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      alert(`Error al enviar el mensaje: ${errorMessage}`);
    }
  };

  return (
    <div className={styles.page}>
      {showParticles && <ParticlesBg />}
      {/* Sección de presentación principal */}
      <section id="inicio" className={styles.hero}>
        <div className={styles.heroText}>
          <h3>Hello, I&apos;m</h3>
          <h1>Dennys <span>Dev</span></h1>
          <h2>Web Developer</h2>
          <p>
            Bienvenido a mi portafolio. Doy vida a tus ideas a través del código, creando experiencias web únicas, funcionales y llenas de creatividad.<br />
            ¡Transformo tus ideas en realidad!
          </p>
          <a href="https://wa.me/593967328523" className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
            <Image src="/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
            Contáctame
          </a>
          <div className={styles.socialIcons}>
            {socialIcons.map((icon, i) => (
              <a
                key={i}
                href={icon.alt === "CV" ? "#" : icon.href}
                target={icon.alt === "CV" ? undefined : "_blank"}
                rel={icon.alt === "CV" ? undefined : "noopener noreferrer"}
                onClick={icon.alt === "CV" ? handleCVClick : undefined}
              >
                <div className={styles.socialIconDiamond}>
                  <Image src={icon.src} alt={icon.alt} width={28} height={28} />
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className={styles.heroImage}>
          {/* Foto de perfil circular con sombra verde */}
          <div className={styles.profileCircle}>
            <Image
              src="/profile.jpg"
              alt="Foto de Dennys Dev"
              width={220}
              height={220}
              className={styles.profilePic}
              priority
            />
          </div>
        </div>
      </section>

      {/* Sección Sobre mí */}
      <section id="sobremi" className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            {/* Logo circular con DD */}
            <div className={styles.profileCircle}>
              <Image
                src="/logo.png"
                alt="Logo Dennys Dev"
                width={180}
                height={180}
                className={styles.profilePic}
                priority
              />
            </div>
          </div>
          <div className={styles.aboutText}>
            <h3>¿Quién soy?</h3>
            <h2>Sobre mí</h2>
            <p>
              Soy un desarrollador full stack con experiencia en HTML, CSS, JavaScript y frameworks modernos. Me encanta transformar ideas en productos funcionales, atractivos y responsivos. Siempre busco nuevos retos que me ayuden a seguir creciendo profesionalmente.
            </p>
            <a href="https://wa.me/593967328523" className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
              <Image src="/whatsapp.svg" alt="WhatsApp" width={24} height={24} />
              Contactame
            </a>
          </div>
        </div>
      </section>

      {/* Sección My Skills */}
      <section id="skills" className={styles.skillsSection}>
        <h3>Favorite Skills</h3>
        <h2>My Skills</h2>
        <div className={styles.skillsContent}>
          <div className={styles.skillsText}>
            <p>
              Cuento con un dominio completo de las herramientas y tecnologías clave para crear soluciones web innovadoras y de alto rendimiento.
            </p>
            <button
              onClick={() => scrollToSection('proyectos')}
              className={styles.ctaButton}
            >
              Ver Proyectos
            </button>
          </div>
          <div className={styles.skillsGrid}>
            {skills.map((skill, i) => (
              <div key={i} className={styles.skillItem}>
                <span>{(i + 1).toString().padStart(2, '0')}.</span> {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Mis Servicios */}
      <section id="servicios" className={styles.section}>
        <h2>Mis Servicios</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h3>Desarrollador Web</h3>
            <p>
              Creo páginas web personalizadas y modernas, con animaciones únicas que hacen que tu proyecto se destaque. Uso HTML, CSS, JavaScript y frameworks actuales para hacer realidad tus ideas.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Desarrollo de Sistemas de Gestión</h3>
            <p>
              Creo sistemas completos para empresas: gestión de ventas, inventarios, usuarios y reportes. Incluye paneles administrativos, autenticación y bases de datos. Soluciones personalizadas y escalables.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Desarrollo de Portales Web</h3>
            <p>
              Especializado en portales inmobiliarios, sitios corporativos y plataformas colaborativas. Interfaces modernas, funcionalidades avanzadas y integración con APIs externas.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Mis Proyectos */}
      <section id="proyectos" className={styles.section}>
        <h2>Mis Trabajos</h2>
        <h3>Proyectos Recientes</h3>
        <div className={styles.projectsGrid}>
          {/* Tarjetas de proyectos de ejemplo */}
          <a href="https://6879a1fdcaf6fc0008485c47--marvelous-crepe-5b3818.netlify.app/login" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
            <Image src="/projects/proyecto1.jpg" alt="Panel de Transparencia Municipal" width={180} height={120} />
            <h4>Panel de Transparencia Municipal</h4>
            <div className={styles.projectDescription}>
              <p>
                Panel web para gestionar y visualizar datos municipales: proyectos, contratos, presupuestos, usuarios e informes. Interfaz de usuario moderna, acceso basado en roles, autenticación y paneles interactivos. Fullstack: React + Node.js/Express.
              </p>
            </div>
          </a>
          <a href="https://sistema-gestion-ventas.netlify.app/" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
            <Image src="/projects/proyecto2.jpg" alt="Sistema de Gestión de Ventas" width={180} height={120} />
            <h4>Sistema de Gestión de Ventas</h4>
            <div className={styles.projectDescription}>
              <p>
                Una aplicación web moderna para explorar y contactar con propiedades en venta en Ecuador. Busca propiedades por ciudad, consulta información detallada y conecta fácilmente con agentes. Desarrollada con React y componentes con estilo.
              </p>
            </div>
          </a>
          <a href="https://portal-inmobiliaria.netlify.app/" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
            <Image src="/projects/proyecto3.jpg" alt="Portal Inmobiliario" width={180} height={120} />
            <h4>Portal Inmobiliario</h4>
            <div className={styles.projectDescription}>
              <p>
                Una aplicación web moderna para explorar y contactar con propiedades en venta en Ecuador. Busca propiedades por ciudad, consulta información detallada y conecta fácilmente con agentes. Desarrollada con React y componentes con estilo.
              </p>
            </div>
          </a>
          <a href="https://687e360661919f00c9b050e7--tienda-automatica.netlify.app/" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
            <Image src="/projects/proyecto4.jpg" alt="Tienda Automática" width={180} height={120} />
            <h4>Tienda Automática</h4>
            <div className={styles.projectDescription}>
              <p>
                Una aplicación web integral para gestionar y vender productos en una tienda. Incluye un frontend de React y un backend de Node.js/Express + SQLite. Incluye registro de usuarios, carrito de compra, gestión de pedidos y un panel de administración.
              </p>
            </div>
          </a>
          <a href="https://google-docs-lite.netlify.app/" target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
            <Image src="/projects/proyecto5.jpg" alt="Google Docs Lite" width={180} height={120} />
            <h4>Google Docs Lite</h4>
            <div className={styles.projectDescription}>
              <p>
                Plataforma web colaborativa como Google Docs, desarrollada con React y Firebase.
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contacto" className={styles.section}>
        <h2>Trabajos Personalizados</h2>
        <h3>Contactame</h3>
        <form 
          className={styles.contactForm} 
          onSubmit={handleContactSubmit}
          name="contact"
          method="POST"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu correo"
            required
          />
          <textarea
            name="message"
            placeholder="Tu mensaje"
            required
          />
          <button type="submit">Enviar mensaje</button>
        </form>
      </section>

      {/* Flecha de scroll */}
      <div
        className={styles.scrollArrow}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        title="Ir al inicio"
        style={{ cursor: "pointer" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 14l5-5 5 5" stroke="#00ffae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>



      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <strong>Dennys Dev</strong> &nbsp;|&nbsp; Web Developer
        </div>
        <div>© Copyright Dennys Dev. Todos los derechos reservados</div>
      </footer>
    </div>
  );
}
