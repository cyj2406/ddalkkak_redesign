/* global React */
// Lucide-style stroke icons (inline SVG) and brand mark for 딸깍넷.
const Icon = ({ name, size = 18, stroke = "currentColor", strokeWidth = 1.8, fill = "none" }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill, stroke, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "plus": return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "home": return <svg {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/></svg>;
    case "folder": return <svg {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
    case "chev-r": return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case "chev-l": return <svg {...p}><path d="m15 6-6 6 6 6"/></svg>;
    case "ext": return <svg {...p}><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>;
    case "gear": return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case "bell": return <svg {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case "paperclip": return <svg {...p}><path d="m21.4 11.05-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 1 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
    case "sparkles": return <svg {...p}><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 13.5 19.7 15.3 21.5 16l-1.8.7L19 18.5 18.3 16.7 16.5 16l1.8-.7z"/></svg>;
    case "arrow-up": return <svg {...p}><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>;
    case "image": return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-9 9"/></svg>;
    case "grid": return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case "layout": return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;
    case "clapper": return <svg {...p}><rect x="3" y="8" width="18" height="13" rx="2"/><path d="m3 8 3-5 4 1-3 4"/><path d="m10 8 3-5 4 1-3 4"/><path d="m17 8 3-5"/></svg>;
    case "doc": return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>;
    case "present": return <svg {...p}><rect x="2.5" y="4" width="19" height="12" rx="2"/><path d="M7 20l5-4 5 4"/><path d="M12 16v-3"/></svg>;
    case "audio": return <svg {...p}><path d="M4 12h2"/><path d="M8 8v8"/><path d="M12 5v14"/><path d="M16 9v6"/><path d="M20 11v2"/></svg>;
    case "blank": return <svg {...p}><path d="M5 7h14"/><path d="M5 12h10"/><path d="M5 17h6"/></svg>;
    case "check-shield": return <svg {...p}><circle cx="12" cy="12" r="8"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>;
    case "clock": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "magic": return <svg {...p}><path d="m4 20 12-12"/><path d="m13 5 3 3"/><path d="M19 14v3M17.5 15.5h3"/><path d="M5 5v2M4 6h2"/></svg>;
    case "upload": return <svg {...p}><path d="M12 17V4"/><path d="m6 10 6-6 6 6"/><path d="M4 20h16"/></svg>;
    case "share": return <svg {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8 11 8-4M8 13l8 4"/></svg>;
    case "more": return <svg {...p}><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>;
    case "sidebar": return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>;
    case "user-plus": return <svg {...p}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c1-3.5 3.5-5 6-5s5 1.5 6 5"/><path d="M19 9v6M16 12h6"/></svg>;
    case "play-circle": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z" fill="currentColor" stroke="none"/></svg>;
    case "wave": return <svg {...p}><path d="M3 12h2"/><path d="M7 8v8"/><path d="M11 5v14"/><path d="M15 9v6"/><path d="M19 11v2"/></svg>;
    default: return null;
  }
};

const BrandMark = ({ size = 28 }) => (
  <img src="assets/logo.png" alt="딸깍넷" width={size} height={size} style={{ display: "block", objectFit: "contain" }} />
);
const BrandLockup = ({ height = 28 }) => (
  <img src="assets/logo-typo.png" alt="딸깍넷" style={{ display: "block", height, width: "auto" }} />
);
window.BrandLockup = BrandLockup;

window.Icon = Icon;
window.BrandMark = BrandMark;
