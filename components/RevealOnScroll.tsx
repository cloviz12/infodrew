"use client";

import { useEffect, useRef, useState } from "react";

// Extiende la entrada "reveal-up" del héroe (ya definida en globals.css,
// ya respeta prefers-reduced-motion) a tarjetas más abajo en la página.
// Antes de que el observer dispare, el elemento se renderiza normal
// (opaco, sin animación) para no ocultar contenido si JS tarda o falla.
export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      className={`${visible ? "reveal-up" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
