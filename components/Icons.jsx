// Central SVG icon set (Lucide-style strokes), used across public + admin.
const paths = {
  leaf: <><path d="M12 2C8 7 4 9.5 4 14a8 8 0 0 0 16 0c0-4.5-4-7-8-12Z" /><path d="M12 22V12" /></>,
  users: <><path d="M16 11a4 4 0 1 0-8 0" /><circle cx="12" cy="7" r="4" /><path d="M3 21v-1a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v1" /></>,
  bed: <><path d="M3 12h18M5 12V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5M3 12v6m18-6v6" /></>,
  area: <><path d="M4 4h16v16H4z" /><path d="M4 14h16" /></>,
  star: <path d="m12 2 3 6.6 7 .9-5.2 4.9 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.5l7-.9Z" />,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUp: <path d="M12 19V5m-7 7 7-7 7 7" />,
  trendUp: <path d="M7 17 17 7M9 7h8v8" />,
  trendDown: <path d="M17 7 7 17M15 17H7V9" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 7L2 7" /></>,
  pin: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></>,
  bell: <><path d="M18 9a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" /></>,
  dashboard: <><rect x="3" y="3" width="8" height="10" rx="2" /><rect x="13" y="3" width="8" height="6" rx="2" /><rect x="13" y="11" width="8" height="10" rx="2" /><rect x="3" y="15" width="8" height="6" rx="2" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4m8-4v4M3 11h18" /></>,
  home: <><path d="M3 21V8l9-5 9 5v13" /><path d="M9 21v-6h6v6" /></>,
  box: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" /></>,
  chart: <><path d="M4 20V10m6 10V4m6 16v-7" /><path d="M2 20h20" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></>,
  plus: <path d="M12 5v14m-7-7h14" />,
  check: <path d="m4 12.5 5.5 5.5L20 7" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  sun: <><path d="M12 3v2M5.6 5.6 7 7M3 12h2M5.6 18.4 7 17M12 21v-2M18.4 18.4 17 17M21 12h-2M18.4 5.6 17 7" /><circle cx="12" cy="12" r="4" /></>,
  dining: <><path d="M3 16c4-1 5-4 5-7 4 0 8 1 10 5-2 4-7 6-15 2Z" /><path d="M3 21c3-3 7-4 12-4" /></>,
  tea: <><path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" /><path d="M17 9h2a2.5 2.5 0 0 1 0 5h-2M7 3.5c0 .8.8 1 .8 1.8S7 6.5 7 7.3M11 3.5c0 .8.8 1 .8 1.8s-.8 1.2-.8 2" /></>,
  tree: <><path d="M12 2 6 9h3l-4 6h5v7h4v-7h5l-4-6h3L12 2Z" /></>,
  boat: <><path d="M3 17c1.5 1.5 3 1.5 4.5 0s3-1.5 4.5 0 3 1.5 4.5 0 3-1.5 4.5 0" /><path d="M5 14 12 4l7 10" /><path d="M12 4v10" /></>,
  bird: <><path d="M16 7a3 3 0 0 1 6 1l-2 1v2c0 5-4 9-10 9H3l5-4-5-9 5 3 3-3h5Z" /><circle cx="18.5" cy="7.5" r=".5" /></>,
  bike: <><circle cx="6" cy="17" r="4" /><circle cx="18" cy="17" r="4" /><path d="M6 17 9 8h6l3 9M9 8 7 5h3" /></>,
  music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  award: <><path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" /><path d="m8.2 13.9-1.7 8.1 5.5-3 5.5 3-1.7-8.1" /></>,
  shield: <path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z" />,
  heart: <path d="M12 21s-7-4.6-9.3-9A5.6 5.6 0 0 1 12 6.4 5.6 5.6 0 0 1 21.3 12C19 16.4 12 21 12 21Z" />,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5m0 3v.5" /></>,
  taka: <><circle cx="12" cy="12" r="9" /><path d="M9 7c1 0 1.5.5 1.5 1.5V15c0 1.5 1 2.2 2.2 2.2 1.5 0 2.3-1 2.3-2.4 0-1.2-.7-1.8-1.5-1.8M8 10.5h6" /></>,
  wifi: <><path d="M5 12.5a10 10 0 0 1 14 0M2 9a15 15 0 0 1 20 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="19" r="1" /></>,
  printer: <><path d="M6 9V3h12v6" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="7" /></>,
  wallet: <><rect x="2" y="6" width="20" height="14" rx="3" /><path d="M16 13h4M2 10h20" /></>,
  broom: <><path d="m13 11 8-8M10 14l-7 7" /><path d="M14.5 8.5 19 13c-1 3-4 6-8.5 6.5L5 14c.5-4.5 3.5-7.5 6.5-8.5l3 3Z" /></>,
};

export default function Icon({ name, size = 20, stroke = 1.8, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || null}
    </svg>
  );
}

export function StarRow({ count = 5 }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="m12 2 3 6.6 7 .9-5.2 4.9 1.4 7-6.2-3.6L5.8 21l1.4-7L2 9.5l7-.9Z" />
        </svg>
      ))}
    </div>
  );
}
