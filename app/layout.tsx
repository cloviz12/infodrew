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
  title: "Colombia Incluyente - Colombia y Cauca en conexión",
  description:
    "Plataforma informativa e interactiva que conecta a líderes nacionales, regionales y a los sectores sociales de Colombia y el Cauca: organizaciones, comunidades campesinas, mujeres y comunidades afro.",
};

// Se ejecuta antes de que React hidrate para fijar data-theme en <html>
// sin parpadeo: usa la preferencia guardada o, si no hay ninguna, la del
// sistema operativo, y queda escuchando cambios del sistema mientras no
// haya una elección manual guardada.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var mql = window.matchMedia("(prefers-color-scheme: dark)");
    var resolve = function () { return stored === "light" || stored === "dark" ? stored : (mql.matches ? "dark" : "light"); };
    document.documentElement.dataset.theme = resolve();
    mql.addEventListener("change", function () {
      if (!localStorage.getItem("theme")) document.documentElement.dataset.theme = mql.matches ? "dark" : "light";
    });
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${archivo.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
