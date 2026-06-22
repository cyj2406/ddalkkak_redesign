/* global React, Icon, PRIMARY, SOFT */

/* Shared atoms for 시안 1/2/3 — Claude/Perplexity/Notion AI 톤
   - Brand blue + slate only
   - Subtle borders, minimal shadows
   - No colored icon backgrounds */

const RECENT_WORKS = [];  // intentionally empty — main 영역 표시 안 함

const QUICK_ACTIONS = [
  { key: "blank", icon: "blank", brand: "딸깍빈칸", title: "AI 빈칸 채우기",
    hint: "긴 글 핵심을 자동 빈칸 처리" },
  { key: "check", icon: "check", brand: "딸깍체크", title: "AI 교정 검사",
    hint: "맞춤법·문맥까지 한 번에" },
];

const TOOLS = [
  { key: "img",   label: "이미지",       sub: "카드뉴스 · 썸네일",      icon: "image" },
  { key: "lp",    label: "랜딩페이지",   sub: "웹 · 모바일 한 페이지",  icon: "layout" },
  { key: "vid",   label: "동영상",       sub: "쇼츠 · 유튜브",         icon: "clapper" },
  { key: "doc",   label: "문서",         sub: "보고서 · 워드 · 한글",   icon: "doc" },
  { key: "deck",  label: "프레젠테이션", sub: "슬라이드 · 키노트",      icon: "present" },
  { key: "audio", label: "오디오",       sub: "BGM · TTS · 받아쓰기",  icon: "audio" },
];

/* HERO — 같은 카피, 한 줄, 톤 다운 */
const Hero = ({ size = "md" }) => {
  const sizes = { sm: "text-[24px]", md: "text-[28px]", lg: "text-[32px]" };
  return (
    <div className="text-center">
      <h1 className={"font-black text-slate-900 leading-[1.3] tracking-[-0.02em] whitespace-nowrap " + sizes[size]}>
        한 번의 <span style={{ color: PRIMARY }}>딸깍</span>으로, 세상 모든 <span style={{ color: PRIMARY }}>AI</span>를 한 번에
      </h1>
    </div>
  );
};

/* COMPOSER — Claude/ChatGPT 스타일. 얇은 보더, 미세 그림자, 포커스 시에만 블루 링 */
const Composer = ({ width = 720, value = "프로필 사진을 시네마틱 느낌으로", emphasis = "normal" }) => {
  const emph = emphasis === "strong";
  return (
    <div
      className="bg-white rounded-2xl mx-auto transition"
      style={{
        width,
        border: emph ? "1.5px solid #BCCCFF" : "1px solid #E2E8F0",
        boxShadow: emph
          ? "0 0 0 4px #EEF3FF, 0 4px 14px rgba(15,23,42,.04)"
          : "0 1px 2px rgba(15,23,42,.04)",
      }}
    >
      <div className="px-5 pt-4 pb-2 min-h-[110px] text-[14.5px] text-slate-700 leading-relaxed">
        {value || <span className="text-slate-300">무엇이든 한 문장으로 부탁해 보세요…</span>}
      </div>
      <div className="flex items-center gap-1.5 px-3 pb-3">
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition">
          <Icon name="paperclip" size={15} />
        </button>
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition">
          <Icon name="sparkles" size={15} />
        </button>
        <button
          className="ml-auto w-9 h-9 rounded-full flex items-center justify-center transition"
          style={{ background: PRIMARY }}
        >
          <Icon name="arrow-up" size={16} strokeWidth={2.4} stroke="#fff" />
        </button>
      </div>
    </div>
  );
};

/* SECTION LABEL — Claude 식 회색 소제목 */
const SectionLabel = ({ children, sub, cta }) => (
  <div className="flex items-baseline gap-2 mb-3">
    <span className="text-[12.5px] font-semibold text-slate-500">{children}</span>
    {sub && <span className="text-[11.5px] text-slate-400">{sub}</span>}
    {cta && (
      <button className="ml-auto text-[11.5px] text-slate-400 hover:text-slate-600 inline-flex items-center gap-0.5">
        {cta} <Icon name="chev-r" size={11} />
      </button>
    )}
  </div>
);

/* QUICK ACTION CHIP — 작은 인라인 칩 */
const QuickActionChip = ({ q }) => (
  <button
    className="inline-flex items-center gap-2.5 pl-2.5 pr-3 py-2 rounded-xl bg-white text-left transition hover:bg-slate-50"
    style={{ border: "1px solid #E2E8F0" }}
  >
    <span className="w-6 h-6 rounded-md flex items-center justify-center text-slate-600">
      <Icon name={q.icon} size={13} strokeWidth={1.9} />
    </span>
    <span className="text-[13px] text-slate-700">
      <b className="font-semibold text-slate-900">{q.brand}</b> — {q.title}
    </span>
    <Icon name="chev-r" size={12} className="text-slate-300" />
  </button>
);

/* QUICK ACTION ROW — 좀 더 큰 horizontal item */
const QuickActionRow = ({ q }) => (
  <button
    className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white text-left transition hover:bg-slate-50 w-full"
    style={{ border: "1px solid #E2E8F0" }}
  >
    <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-slate-600"
          style={{ background: "#F1F5F9" }}>
      <Icon name={q.icon} size={17} strokeWidth={1.9} />
    </span>
    <div className="min-w-0 flex-1">
      <div className="text-[13.5px] font-bold text-slate-900 leading-tight">
        {q.brand} <span className="font-normal text-slate-400 mx-0.5">→</span> <span className="font-semibold text-slate-700">{q.title}</span>
      </div>
      <div className="text-[11.5px] text-slate-400 mt-0.5 truncate">{q.hint}</div>
    </div>
    <Icon name="chev-r" size={14} className="text-slate-300 shrink-0" />
  </button>
);

/* TOOL ICON — 모노톤 (슬레이트), 호버 시 살짝 어두워짐 */
const ToolIcon = ({ t, size = "md", showSub = false }) => {
  const dim = size === "sm" ? 36 : 44;
  const ic = size === "sm" ? 18 : 20;
  return (
    <button className="flex flex-col items-center gap-2.5 group cursor-pointer">
      <span
        className="rounded-xl flex items-center justify-center transition group-hover:bg-slate-100 text-slate-600"
        style={{ width: dim, height: dim, background: "#F8FAFC", border: "1px solid #EAEEF4" }}
      >
        <Icon name={t.icon} size={ic} strokeWidth={1.7} stroke="#475569" />
      </span>
      <div className="text-center">
        <div className="text-[12.5px] font-semibold text-slate-700">{t.label}</div>
        {showSub && <div className="text-[11px] text-slate-400 mt-0.5">{t.sub}</div>}
      </div>
    </button>
  );
};

/* TOOL ROW ITEM — 가로형 (V3에서 사용) */
const ToolRowItem = ({ t }) => (
  <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-left transition hover:bg-slate-50 w-full"
          style={{ border: "1px solid #E2E8F0" }}>
    <span className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 shrink-0"
          style={{ background: "#F8FAFC", border: "1px solid #EAEEF4" }}>
      <Icon name={t.icon} size={18} strokeWidth={1.7} />
    </span>
    <div className="min-w-0">
      <div className="text-[13.5px] font-bold text-slate-900 leading-tight">{t.label}</div>
      <div className="text-[11.5px] text-slate-400 mt-0.5">{t.sub}</div>
    </div>
  </button>
);

/* UX NOTE — 디자인 시안 아래 부착되는 설명 */
const UxNote = ({ items }) => (
  <div className="rounded-xl px-5 py-4 bg-white" style={{ border: "1px solid #E2E8F0" }}>
    <div className="flex items-center gap-2 mb-2.5">
      <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-[.14em]"
            style={{ background: "#0F172A", color: "#fff" }}>UX RATIONALE</span>
    </div>
    <ul className="grid grid-cols-3 gap-x-6 gap-y-2">
      {items.map((t, i) => (
        <li key={i} className="text-[12px] text-slate-600 leading-relaxed flex gap-1.5">
          <span className="text-slate-300 shrink-0">·</span>
          <span dangerouslySetInnerHTML={{ __html: t }} />
        </li>
      ))}
    </ul>
  </div>
);

Object.assign(window, {
  HOME_SERVICES: TOOLS,
  RECENT_WORKS, QUICK_ACTIONS, TOOLS,
  Hero, Composer, SectionLabel, QuickActionChip, QuickActionRow, ToolIcon, ToolRowItem, UxNote,
  /* legacy exports kept for compatibility — alias to new */
  HeroCompact: Hero, ComposerCompact: Composer, SectionHeader: SectionLabel,
  SeriesBigCard: QuickActionRow, SeriesMiniCard: QuickActionChip, ServiceTilesRow: () => null, WorkCard: () => null,
  SERIES_ITEMS: QUICK_ACTIONS,
});
