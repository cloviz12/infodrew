// Set de iconos lineales mínimos (stroke, sin dependencias externas)
// para el sistema visual claro: header, redes, tarjetas de temas y
// metadatos de las noticias.
type IconProps = { className?: string };

function base(paths: React.ReactNode) {
  return function Icon({ className = "h-5 w-5" }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {paths}
      </svg>
    );
  };
}

export const IconSearch = base(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </>
);

export const IconUser = base(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.6-3.6 4.8-5.5 8-5.5s6.4 1.9 8 5.5" />
  </>
);

export const IconMenu = base(
  <>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </>
);

export const IconClose = base(
  <>
    <path d="M6 6l12 12M18 6L6 18" />
  </>
);

export const IconArrowRight = base(<path d="M5 12h14M13 6l6 6-6 6" />);

export const IconCalendar = base(
  <>
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </>
);

export const IconComment = base(
  <path d="M4 5.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4.6 3.5a.5.5 0 0 1-.8-.4V16H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z" />
);

export const IconHeart = base(
  <path d="M12 20.2s-7.4-4.6-9.7-9.2C.8 7.7 2.5 4.5 5.7 4c2-.3 3.7.6 4.9 2.2l1.4 1.9 1.4-1.9C14.6 4.6 16.3 3.7 18.3 4c3.2.5 4.9 3.7 3.4 7-2.3 4.6-9.7 9.2-9.7 9.2Z" />
);

export const IconPlay = base(<path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />);

export const IconPencil = base(
  <>
    <path d="M4 20l1-4.5L16 4.5a2 2 0 0 1 2.8 0l.7.7a2 2 0 0 1 0 2.8L8.5 19l-4.5 1Z" />
    <path d="M13.5 6.5l4 4" />
  </>
);

export const IconSend = base(<path d="M21 3 3 10.5l7.5 3L14 21l7-18Z" />);

export const IconUsers = base(
  <>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.7 19c1-3 3.4-4.7 6.3-4.7s5.3 1.7 6.3 4.7" />
    <path d="M15.5 5.2c1.5.3 2.6 1.6 2.6 3.1 0 1.5-1.1 2.8-2.6 3.1" />
    <path d="M16.8 14.3c2 .5 3.5 2 4.3 4.3" />
  </>
);

export const IconLeaf = base(
  <>
    <path d="M5 19c8.5 0 14-5.5 14-14 0 0-9 .5-12 4.5S5 19 5 19Z" />
    <path d="M5 19c0-4 2-8 6-10.5" />
  </>
);

export const IconWomen = base(
  <>
    <circle cx="12" cy="8" r="4.5" />
    <path d="M12 12.5V21M8.5 17.5h7" />
  </>
);

export const IconHandshake = base(
  <>
    <path d="M2.5 12l4-3.5 3 2 3-2.5 4 3.5" />
    <path d="M9.5 10.5 13 14l3-2.5 3.5 3-3 3.2a2 2 0 0 1-2.8.1L9 13" />
    <path d="M2.5 12l3 3.3" />
  </>
);

export const IconBook = base(
  <>
    <path d="M4 5.5c2-1 5-1 8 0v13c-3-1-6-1-8 0Z" />
    <path d="M20 5.5c-2-1-5-1-8 0v13c3-1 6-1 8 0Z" />
  </>
);

export const IconMegaphone = base(
  <>
    <path d="M3 10.5v3a1.5 1.5 0 0 0 1.5 1.5H6l1 4.5h2l-.7-4.5h1.2L18 19V6l-8.5 4H4.5A1.5 1.5 0 0 0 3 10.5Z" />
    <path d="M20 9.5c1 .8 1 3.2 0 4" />
  </>
);

export const IconMapPin = base(
  <>
    <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </>
);

export const IconFacebook = base(
  <path d="M14.5 8.5H17V5h-2.7C11.9 5 10.5 6.5 10.5 9v2.2H8V15h2.5v6h3.2v-6h2.4l.4-3.8h-2.8V9.3c0-.6.3-.8 1-.8Z" fill="currentColor" stroke="none" />
);

export const IconInstagram = base(
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </>
);

export const IconYoutube = base(
  <>
    <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
    <path d="M10.3 9.6v4.8l4.4-2.4Z" fill="currentColor" stroke="none" />
  </>
);

export const IconX = base(<path d="M4 4l16 16M20 4 4 20" />);

export const IconSun = base(
  <>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
  </>
);

export const IconMoon = base(
  <path d="M20 14.3A8.5 8.5 0 1 1 9.7 4a6.8 6.8 0 0 0 10.3 10.3Z" />
);
