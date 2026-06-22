/* global React, Icon, Sidebar, TopBar, RightFloating, Footer, PRIMARY, SOFT */
const { useState } = React;

const SERVICES = [
  { key: "img",   label: "이미지",       sub: "카드뉴스 · 썸네일 · 일러스트", icon: "image",   bg: "#FFE7D7", fg: "#F18A45" },
  { key: "lp",    label: "랜딩페이지",   sub: "웹/모바일 한 페이지",         icon: "layout",  bg: "#DDF1E0", fg: "#3DA168" },
  { key: "vid",   label: "동영상",       sub: "쇼츠 · 광고 · 유튜브",         icon: "clapper", bg: "#FBD7D2", fg: "#E25C50" },
  { key: "doc",   label: "문서",         sub: "보고서 · 워드 · 한글",         icon: "doc",     bg: "#DCE6FB", fg: "#4172D8" },
  { key: "deck",  label: "프레젠테이션", sub: "슬라이드 덱 · 키노트",         icon: "present", bg: "#E5DEF4", fg: "#8B6FD0" },
  { key: "audio", label: "오디오",       sub: "BGM · TTS · 받아쓰기",        icon: "audio",   bg: "#F3E1F8", fg: "#B074C6" },
];

const Hero = () => (
  <div className="text-center">
    <h1 className="font-black text-slate-900 leading-[1.25] tracking-[-0.025em] text-[34px] whitespace-nowrap">
      한 번의 <span style={{ color: PRIMARY }}>딸깍</span>으로, 세상 모든 <span style={{ color: PRIMARY }}>AI</span>를 한 번에
    </h1>
    <p className="mt-3 text-[13.5px] text-slate-400">
      자연스러운 한 문장이면 됩니다. 이미지부터 영상·문서·오디오까지 한 곳에서.
    </p>
  </div>
);

const Composer = () => {
  const [value, setValue] = useState("프로필 사진을 시네마");
  const hasText = value.trim().length > 0;
  return (
    <div
      className="relative w-full bg-white rounded-3xl transition"
      style={{
        border: "1.5px solid #BCCCFF",
        boxShadow: "0 0 0 6px #EEF3FF, 0 6px 20px rgba(15,23,42,.04)",
      }}
    >
      <style>{`@keyframes dkk-caret{0%,49%{opacity:1}50%,100%{opacity:0}}`}</style>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={6}
        className="w-full bg-transparent resize-none outline-none px-6 pt-5 pb-3 text-[15px] text-slate-800 placeholder:text-slate-300 leading-relaxed"
        placeholder="무엇이든 한 문장으로 부탁해 보세요…"
        style={{ minHeight: 220 }}
      />
      <div className="flex items-center gap-2 px-4 pb-4">
        <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition">
          <Icon name="paperclip" size={16} />
        </button>
        <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-300 transition">
          <Icon name="sparkles" size={16} />
        </button>
        <button
          disabled={!hasText}
          className="ml-auto w-11 h-11 rounded-full flex items-center justify-center transition"
          style={{ background: hasText ? PRIMARY : "#E2E8F0", boxShadow: hasText ? "0 4px 10px rgba(47,107,255,.30)" : "none" }}
        >
          <Icon name="arrow-up" size={18} strokeWidth={2.4} stroke={hasText ? "#fff" : "#94A3B8"} />
        </button>
      </div>
    </div>
  );
};

const ServiceTile = ({ s }) => (
  <button className="flex flex-col items-center gap-3 group">
    <span
      className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center transition group-hover:-translate-y-0.5"
      style={{ background: s.bg, color: s.fg, boxShadow: "0 1px 0 rgba(15,23,42,.03)" }}
    >
      <Icon name={s.icon} size={28} strokeWidth={1.8} />
    </span>
    <div className="text-center">
      <div className="text-[14px] font-bold text-slate-900">{s.label}</div>
      <div className="text-[11.5px] text-slate-400 mt-0.5">{s.sub}</div>
    </div>
  </button>
);

const HomeScreen = () => (
  <div className="w-full h-full flex bg-white">
    <Sidebar active="home" />
    <main className="relative flex-1 flex flex-col min-w-0 bg-white">
      <TopBar variant="home" credit="12,121,209" />

      <div className="flex-1 flex flex-col items-center justify-center px-10">
        <div className="w-full max-w-[820px] flex flex-col items-center gap-8">
          <Hero />
          <Composer />
          <div className="w-full grid grid-cols-6 gap-x-6 mt-4 justify-items-center">
            {SERVICES.map((s) => <ServiceTile key={s.key} s={s} />)}
          </div>
        </div>
      </div>

      <RightFloating />
      <Footer />
    </main>
  </div>
);

Object.assign(window, { HomeScreen, SERVICES });
