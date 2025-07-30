import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dennys Dev - Portafolio Personal",
  description: "Desarrollador Full Stack especializado en React, Next.js, Node.js y desarrollo web moderno. Creo experiencias web únicas y funcionales.",
  keywords: "desarrollador web, full stack, React, Next.js, Node.js, JavaScript, TypeScript, desarrollo web",
  authors: [{ name: "Dennys Alejandro" }],
  creator: "Dennys Alejandro",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: "Dennys Dev - Portafolio Personal",
    description: "Desarrollador Full Stack especializado en React, Next.js, Node.js y desarrollo web moderno.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dennys Dev - Portafolio Personal",
    description: "Desarrollador Full Stack especializado en React, Next.js, Node.js y desarrollo web moderno.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <ParticlesBg /> */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
