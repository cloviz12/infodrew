import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// General Sans (Fontshare) es la tipografía pedida, pero fontshare.com
// está bloqueado por la política de red de este entorno — mismo bloqueo
// que Flickr/Vercel. Archivo (Google Fonts) es la alternativa más
// cercana en peso ExtraBold/Black para el mismo espíritu de cartel;
// si se agregan los .woff2 de General Sans al repo, se cambia acá por
// next/font/local sin tocar el resto del sistema.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colombia Incluyente — Colombia y Cauca en conexión",
  description:
    "Plataforma informativa e interactiva que conecta a líderes nacionales, regionales y a los sectores sociales de Colombia y el Cauca: organizaciones, comunidades campesinas, mujeres y comunidades afro.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
