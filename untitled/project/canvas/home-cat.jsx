/* global React, Icon, Sidebar, TopBar, Footer, PRIMARY, Hero, Composer */
const { useState } = React;

/* 카테고리 리디자인 — 이름+아이콘만, 세부설명은 hover 툴팁
   딸깍넷 메인 무드/레이아웃 유지, 카테고리 영역만 변경 */

const CAT_TOOLS = [
  { key: "img",   label: "이미지",       sub: "썸네일 · 카드뉴스",        icon: "image",   fg: "#F18A45" },
  { key: "lp",    label: "랜딩페이지",   sub: "웹 · 모바일 한 페이지",     icon: "layout",  fg: "#3DA168" },
  { key: "vid",   label: "동영상",       sub: "숏폼 · 광고",             icon: "clapper", fg: "#E25C50" },
  { key: "deck",  label: "프레젠테이션", sub: "슬라이드 제작",            icon: "present", fg: "#8B6FD0" },
  { key: "audio", label: "오디오",       sub: "TTS · BGM",              icon: "audio",   fg: "#B074C6" },
  { key: "doc",   label: "문서",         sub: "보고서 · 워드",            icon: "doc",     fg: "#4172D8" },
  { key: "form",  label: "서식",         sub: "빈칸 채우기 · 문서 자동화", icon: "pencil",  fg: "#3DA168" },
  { key: "check", label: "PPT 검수",     sub: "PPT 번역 · 오타 체크",     icon: "check",   fg: "#E0A93B" },
];

/* hover 툴팁 (공통) */
const Tip = ({ show, children }) => (
  <div
    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 px-2.5 py-1.5 rounded-lg text-white text-[11.5px] font-medium whitespace-nowrap transition pointer-events-none"
    style={{
      background: "rgba(15,23,42,.92)",
      opacity: show ? 1 : 0,
      transform: `translate(-50%, ${show ? "0" : "4px"})`,
      boxShadow: "0 6px 18px rgba(15,23,42,.18)",
    }}
  >
    {children}
    <span className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 rotate-45 -mt-1" style={{ background: "rgba(15,23,42,.92)" }} />
  </div>
);

/* ───── 시안 A — 젠스파크 스타일 (그룹 + 구분선, 세로 아이콘+라벨) ───── */
const GROUPS = [
  { title: "콘텐츠", keys: ["img", "lp", "vid"] },
  { title: "문서·발표", keys: ["deck", "doc", "form"] },
  { title: "도구", keys: ["audio", "check"] },
];

const GsItem = ({ t }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      className="relative flex flex-col items-center gap-2 px-3 group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Tip show={hover}>{t.sub}</Tip>
      <span className="w-11 h-11 rounded-2xl flex items-center justify-center transition group-hover:-translate-y-0.5"
            style={{ background: "#F8FAFC", border: "1px solid #EAEEF4", color: t.fg }}>
        <Icon name={t.icon} size={21} strokeWidth={1.8} />
      </span>
      <span className="text-[12.5px] font-semibold text-slate-700 whitespace-nowrap">{t.label}</span>
    </button>
  );
};

const HomeCatA = () => {
  const byKey = Object.fromEntries(CAT_TOOLS.map((t) => [t.key, t]));
  return (
    <div className="w-full h-full flex bg-white">
      <Sidebar active="home" />
      <main className="relative flex-1 flex flex-col min-w-0 bg-white">
        <TopBar variant="home" credit="12,121,209" />
        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <div className="w-full max-w-[820px] flex flex-col items-center gap-8">
            <Hero size="lg" />
            <Composer width={720} emphasis="strong" />
            {/* grouped categories */}
            <div className="flex items-start justify-center gap-0 mt-2">
              {GROUPS.map((g, gi) => (
                <React.Fragment key={g.title}>
                  {gi > 0 && <span className="w-px self-stretch bg-slate-200 mx-5 my-1" />}
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-[11.5px] font-semibold text-slate-400">{g.title}</span>
                    <div className="flex items-start">
                      {g.keys.map((k) => <GsItem key={k} t={byKey[k]} />)}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

/* ───── 시안 B — 다글로 스타일 (원형 소프트 아이콘 행, 라벨 하단) ───── */
const DgItem = ({ t }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      className="relative flex flex-col items-center gap-2.5 group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Tip show={hover}>{t.sub}</Tip>
      <span className="w-14 h-14 rounded-full flex items-center justify-center transition group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_16px_rgba(15,23,42,.10)]"
            style={{ background: "#F1F5F9", color: t.fg }}>
        <Icon name={t.icon} size={23} strokeWidth={1.8} />
      </span>
      <span className="text-[12.5px] font-semibold text-slate-700 whitespace-nowrap">{t.label}</span>
    </button>
  );
};

const HomeCatB = () => (
  <div className="w-full h-full flex bg-white">
    <Sidebar active="home" />
    <main className="relative flex-1 flex flex-col min-w-0 bg-white">
      <TopBar variant="home" credit="12,121,209" />
      <div className="flex-1 flex flex-col items-center justify-center px-12">
        <div className="w-full max-w-[860px] flex flex-col items-center gap-9">
          <Hero size="lg" />
          <Composer width={720} emphasis="strong" />
          <div className="flex items-start justify-center gap-7 mt-2 flex-wrap">
            {CAT_TOOLS.map((t) => <DgItem key={t.key} t={t} />)}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  </div>
);

Object.assign(window, { HomeCatA, HomeCatB, HomeCatC });

/* ───── 시안 C — 다글로 스타일 (라운드 사각 타일 + 투톤 아이콘) ───── */
function HomeCatC() {
  const byKey = Object.fromEntries(CAT_TOOLS.map((t) => [t.key, t]));
  // soft tinted bg per tool (브랜드 톤 안에서 절제)
  const TINTS = {
    img:   { bg: "#FFF1E6", fg: "#F18A45" },
    lp:    { bg: "#E7F6EC", fg: "#3DA168" },
    vid:   { bg: "#FDEAE7", fg: "#E25C50" },
    deck:  { bg: "#EFEAFB", fg: "#8B6FD0" },
    audio: { bg: "#F6EAFA", fg: "#B074C6" },
    doc:   { bg: "#E8EFFD", fg: "#4172D8" },
    form:  { bg: "#E7F6EC", fg: "#3DA168" },
    check: { bg: "#FBF1DE", fg: "#E0A93B" },
  };
  const ORDER = ["img", "lp", "vid", "deck", "audio", "doc", "form", "check"];

  const CTile = ({ t }) => {
    const [hover, setHover] = useState(false);
    const tint = TINTS[t.key];
    return (
      <button
        className="relative flex flex-col items-center gap-3 group"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Tip show={hover}>{t.sub}</Tip>
        <span
          className="w-[66px] h-[66px] rounded-[20px] flex items-center justify-center transition group-hover:-translate-y-1"
          style={{
            background: "#F8FAFC",
            border: "1px solid #EAEEF4",
            boxShadow: hover ? "0 10px 22px rgba(15,23,42,.08)" : "none",
          }}
        >
          <Icon name={t.icon} size={28} strokeWidth={1.8} stroke={tint.fg} />
        </span>
        <span className="text-[13px] font-bold text-slate-800 whitespace-nowrap">{t.label}</span>
      </button>
    );
  };

  return (
    <div className="w-full h-full flex bg-white">
      <Sidebar active="home" />
      <main className="relative flex-1 flex flex-col min-w-0 bg-white">
        <TopBar variant="home" credit="12,121,209" />
        <div className="flex-1 flex flex-col items-center justify-center px-12">
          <div className="w-full max-w-[840px] flex flex-col items-center gap-9">
            <Hero size="lg" />
            <Composer width={720} emphasis="strong" />
            {/* 라운드 사각 타일 그리드 — 4 x 2 */}
            <div className="grid grid-cols-8 gap-x-6 gap-y-6 mt-2">
              {ORDER.map((k) => <CTile key={k} t={byKey[k]} />)}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
