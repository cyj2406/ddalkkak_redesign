/* global React */
const Icon = ({ name, size = 18, stroke = "currentColor", strokeWidth = 1.8, fill = "none", className = "", style }) => {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill, stroke, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", className, style };
  switch (name) {
    case "menu":      return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case "plus":      return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "home":      return <svg {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/></svg>;
    case "folder":    return <svg {...p}><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>;
    case "history":   return <svg {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>;
    case "chev-r":    return <svg {...p}><path d="m9 6 6 6-6 6"/></svg>;
    case "chev-l":    return <svg {...p}><path d="m15 6-6 6 6 6"/></svg>;
    case "chev-d":    return <svg {...p}><path d="m6 9 6 6 6-6"/></svg>;
    case "ext":       return <svg {...p}><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>;
    case "gear":      return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case "bell":      return <svg {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>;
    case "paperclip": return <svg {...p}><path d="m21.4 11.05-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 1 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
    case "sparkles":  return <svg {...p}><path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 13.5 19.7 15.3 21.5 16l-1.8.7L19 18.5 18.3 16.7 16.5 16l1.8-.7z"/></svg>;
    case "arrow-up":  return <svg {...p}><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>;
    case "image":     return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-9 9"/></svg>;
    case "layout":    return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;
    case "clapper":   return <svg {...p}><rect x="3" y="8" width="18" height="13" rx="2"/><path d="m3 8 3-5 4 1-3 4"/><path d="m10 8 3-5 4 1-3 4"/><path d="m17 8 3-5"/></svg>;
    case "doc":       return <svg {...p}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>;
    case "present":   return <svg {...p}><rect x="2.5" y="4" width="19" height="12" rx="2"/><path d="M7 20l5-4 5 4"/><path d="M12 16v-3"/></svg>;
    case "audio":     return <svg {...p}><path d="M4 12h2"/><path d="M8 8v8"/><path d="M12 5v14"/><path d="M16 9v6"/><path d="M20 11v2"/></svg>;
    case "blank":     return <svg {...p}><path d="M5 7h14"/><path d="M5 12h10"/><path d="M5 17h6"/></svg>;
    case "check":     return <svg {...p}><circle cx="12" cy="12" r="8"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>;
    case "clock":     return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "share":     return <svg {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8 11 8-4M8 13l8 4"/></svg>;
    case "upload":    return <svg {...p}><path d="M12 17V4"/><path d="m6 10 6-6 6 6"/><path d="M4 20h16"/></svg>;
    case "more":      return <svg {...p}><circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/></svg>;
    case "sidebar":   return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg>;
    case "x":         return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case "search":    return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>;
    case "diamond":   return <svg {...p}><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20"/><path d="m8 9 4 12 4-12"/><path d="M6 3 8 9M18 3l-2 6"/></svg>;
    case "star":      return <svg {...p}><path d="m12 3 2.9 6.1 6.6 1-4.8 4.7 1.1 6.6L12 18.3 6.2 21.4l1.1-6.6L2.5 10.1l6.6-1z"/></svg>;
    case "translate": return <svg {...p}><path d="M4 5h12"/><path d="M9 3v2"/><path d="M11.5 5c-.5 4-2.5 7-7 9"/><path d="M5 9c1.5 2.5 4 4 7 5"/><path d="m13 21 4-9 4 9"/><path d="M14.5 17h5"/></svg>;
    case "grid":      return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case "pencil":    return <svg {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>;
    case "brush":     return <svg {...p}><path d="M9.06 11.9 8.32 13.43a2 2 0 0 1-3.78-1.18l.83-2.66a3 3 0 0 1 2.86-2.07h.51"/><path d="m22 2-7 7-3-3 7-7z"/><path d="m18.5 5.5-5.5 5.5"/><path d="M11 8c-3 0-4 3-4 5"/></svg>;
    case "type":      return <svg {...p}><path d="M4 7V5h16v2"/><path d="M12 5v14"/><path d="M9 19h6"/></svg>;
    case "shapes":    return <svg {...p}><circle cx="7" cy="16" r="4"/><path d="m12 4 5 8H7z"/><rect x="14" y="13" width="7" height="7" rx="1"/></svg>;
    case "circle":    return <svg {...p}><circle cx="12" cy="12" r="9"/></svg>;
    case "square":    return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="1.5"/></svg>;
    case "triangle":  return <svg {...p}><path d="m12 4 9 16H3z"/></svg>;
    case "crop":      return <svg {...p}><path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/></svg>;
    case "rotate":    return <svg {...p}><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>;
    case "resize":    return <svg {...p}><path d="M3 8V3h5"/><path d="M21 8V3h-5"/><path d="M3 16v5h5"/><path d="M21 16v5h-5"/></svg>;
    case "zoom-in":   return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg>;
    case "zoom-out":  return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>;
    case "minus":     return <svg {...p}><path d="M5 12h14"/></svg>;
    case "undo":      return <svg {...p}><path d="M3 7v6h6"/><path d="M3 13a9 9 0 1 0 3-7l-3 3"/></svg>;
    case "redo":      return <svg {...p}><path d="M21 7v6h-6"/><path d="M21 13a9 9 0 1 1-3-7l3 3"/></svg>;
    case "refresh":   return <svg {...p}><path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"/><path d="M3 3v5h5"/></svg>;
    case "bold":      return <svg {...p} strokeWidth={2.4}><path d="M7 5h7a3.5 3.5 0 0 1 0 7H7zM7 12h8a3.5 3.5 0 0 1 0 7H7z"/></svg>;
    case "italic":    return <svg {...p}><path d="M19 4h-9M14 20H5M15 4 9 20"/></svg>;
    case "underline": return <svg {...p}><path d="M6 4v8a6 6 0 0 0 12 0V4"/><path d="M4 20h16"/></svg>;
    case "align-l":   return <svg {...p}><path d="M3 6h18M3 12h12M3 18h18"/></svg>;
    case "align-c":   return <svg {...p}><path d="M3 6h18M6 12h12M3 18h18"/></svg>;
    case "align-r":   return <svg {...p}><path d="M3 6h18M9 12h12M3 18h18"/></svg>;
    case "list-ul":   return <svg {...p}><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>;
    case "palette":   return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="8" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="17" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/></svg>;
    case "layers":    return <svg {...p}><path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>;
    case "wand":      return <svg {...p}><path d="m4 20 12-12"/><path d="m13 5 3 3"/><path d="M19 14v3M17.5 15.5h3M5 5v2M4 6h2"/></svg>;
    case "send":      return <svg {...p}><path d="m4 12 16-8-7 18-3-9z"/></svg>;
    case "scissors":  return <svg {...p}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m20 4-12 8M14 14l6 6M8 12l6 4"/></svg>;
    case "letter-h":  return <svg {...p}><path d="M5 7v10M19 7v10"/><path d="M7 12h10"/><path d="m9 9-3 3 3 3"/><path d="m15 9 3 3-3 3"/></svg>;
    case "line-h":    return <svg {...p}><path d="M4 6h16M4 18h16"/><path d="M12 7v10"/><path d="m9 9 3-3 3 3"/><path d="m9 15 3 3 3-3"/></svg>;
    case "drop":      return <svg {...p}><path d="M12 3c4 4 7 7 7 11a7 7 0 0 1-14 0c0-4 3-7 7-11z"/></svg>;
    case "circle-d":  return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/></svg>;
    case "brand":     return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="bMark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7C8BFF"/><stop offset="1" stopColor="#2F40C8"/>
          </linearGradient>
          <linearGradient id="bMark2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#3447CB"/><stop offset="1" stopColor="#8FA0FF"/>
          </linearGradient>
        </defs>
        <path d="M4 9 L16 4 L28 9 L16 15 Z" fill="url(#bMark)"/>
        <path d="M4 9 L16 15 L16 28 L4 23 Z" fill="url(#bMark2)"/>
        <path d="M28 9 L16 15 L16 28 L28 23 Z" fill="#2F3FB8"/>
      </svg>
    );
    default: return null;
  }
};

window.Icon = Icon;
