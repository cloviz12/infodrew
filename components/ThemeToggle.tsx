"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@/components/icons";

// El valor real ya lo fija el script bloqueante en <body> (ver
// app/layout.tsx) antes de que React hidrate, así que este componente
// solo lee ese estado inicial y lo mantiene en sync al hacer clic.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Lee el tema real recién al montar (ya lo fijó el script bloqueante
    // en <body>) para no desincronizar el primer render del servidor,
    // que no conoce la preferencia del navegador.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme((document.documentElement.dataset.theme as "light" | "dark") ?? "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition hover:bg-surface-muted hover:text-foreground"
    >
      {theme === "dark" ? <IconSun className="h-5 w-5" /> : <IconMoon className="h-5 w-5" />}
    </button>
  );
}
