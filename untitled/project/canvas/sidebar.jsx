/* global React, Icon */
const { useState } = React;

const PRIMARY = "#2F6BFF";
const PRIMARY_DK = "#1F58F0";
const SOFT = "#EEF3FF";
const TINT = "#F3F6FC";

const COLLAPSED_W = 76;

const ImageLockup = () => (
  <img src="assets/logo-typo.png" alt="딸깍넷" style={{ display: "block", height: 26, width: "auto" }} />
);
const ImageIcon = () => (
  <img src="assets/logo.png" alt="딸깍넷" style={{ display: "block", width: 32, height: "auto" }} />
);

/* nav item with optional rounded-square icon container for active state */
const NavItem = ({ icon, label, active, collapsed }) => (
  <div
    title={collapsed ? label : undefined}
    className={
      "flex items-center rounded-xl cursor-pointer transition select-none " +
      (collapsed ? "justify-center w-11 h-11 mx-auto" : "gap-2.5 px-2 py-2") + " " +
      (active ? "" : "hover:bg-slate-50")
    }
    style={active ? { background: SOFT } : undefined}
  >
    <span
      className="inline-flex items-center justify-center rounded-lg shrink-0"
      style={{
        width: 32, height: 32,
        background: active ? "#DAE4FF" : "transparent",
        color: active ? PRIMARY : "#475569",
      }}
    >
      <Icon name={icon} size={18} stroke={active ? PRIMARY : "#475569"} strokeWidth={1.9} />
    </span>
    {!collapsed && (
      <span className={"text-[14.5px] " + (active ? "font-bold text-slate-900" : "text-slate-700")}>{label}</span>
    )}
  </div>
);

const RecentItem = ({ children }) => (
  <div className="px-3 py-1.5 text-[13px] text-slate-500 hover:bg-slate-50 rounded-md cursor-pointer truncate">
    {children}
  </div>
);

/* DALKKAK SERIES — accordion */
const SeriesCard = ({ label = "DALKKAK SERIES", defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mx-3 rounded-2xl p-3" style={{ background: SOFT, border: "1px solid #DCE5FF" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-1.5 px-1"
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: PRIMARY }} />
        <span className="text-[10.5px] font-extrabold tracking-[.14em]" style={{ color: PRIMARY }}>{label}</span>
        <Icon
          name="chev-d"
          size={13}
          className={"ml-auto transition-transform " + (open ? "rotate-0" : "-rotate-90")}
          stroke={PRIMARY}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pt-2 flex flex-col gap-1.5">
            <div className="px-1 mb-1 text-[11px] leading-snug text-slate-500">
              작업의 시작부터 마무리까지, 딸깍 전용 솔루션
            </div>
            <div className="bg-white rounded-xl border border-slate-200 px-2.5 py-2 flex items-center gap-2 cursor-pointer">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: SOFT, color: PRIMARY }}>
                <Icon name="blank" size={14} />
              </span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold text-slate-900 leading-tight">딸깍빈칸</div>
                <div className="text-[10.5px] text-slate-400 mt-px">AI 빈칸 채우기</div>
              </div>
              <Icon name="chev-r" size={12} className="ml-auto text-slate-400" />
            </div>
            <div className="bg-white rounded-xl border border-slate-200 px-2.5 py-2 flex items-center gap-2 cursor-pointer">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: SOFT, color: PRIMARY }}>
                <Icon name="check" size={14} />
              </span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold text-slate-900 leading-tight">딸깍체크</div>
                <div className="text-[10.5px] text-slate-400 mt-px">AI 교정 검수</div>
              </div>
              <Icon name="chev-r" size={12} className="ml-auto text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SeriesCardMini = () => (
  <div className="mx-auto mb-3 w-11 rounded-xl p-1.5 flex flex-col gap-1.5"
       style={{ background: SOFT, border: "1px solid #DCE5FF" }}>
    <button title="딸깍빈칸" className="w-8 h-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center" style={{ color: PRIMARY }}>
      <Icon name="blank" size={14} />
    </button>
    <button title="딸깍체크" className="w-8 h-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center" style={{ color: PRIMARY }}>
      <Icon name="check" size={14} />
    </button>
  </div>
);

const UserRow = ({ name = "최유정", email = "cyj2406@gmail.com", avatarLetter = "N", collapsed }) => {
  const Avatar = () => (
    <span
      className="w-9 h-9 rounded-full inline-flex items-center justify-center text-white text-[13px] font-bold shrink-0"
      style={{ background: "#1F2937" }}
    >{avatarLetter}</span>
  );
  if (collapsed) {
    return (
      <div className="mx-auto mb-4 flex justify-center" title={`${name} · ${email}`}>
        <Avatar />
      </div>
    );
  }
  return (
    <div className="mx-3 mt-1 mb-4 px-1 py-2 flex items-center gap-2.5">
      <Avatar />
      <div className="min-w-0 flex-1">
        <div className="text-[13.5px] font-bold text-slate-900 leading-tight">{name}</div>
        <div className="text-[11px] text-slate-400 mt-0.5 truncate">{email}</div>
      </div>
      <button className="text-slate-400 hover:text-slate-700 px-0.5">
        <Icon name="more" size={16} />
      </button>
    </div>
  );
};

const Sidebar = ({
  active = "home",
  width = 280,
  defaultCollapsed = false,
  recents,
  navItems = ["home", "work", "favorites"],
  recentLabel = "최근 대화",
  familyLabel = "DALKKAK SERIES",
  userName = "최유정",
  userEmail = "cyj2406@gmail.com",
  avatarLetter = "N",
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const w = collapsed ? COLLAPSED_W : width;
  const RECENTS = recents || [
    "2026 금융 트렌드 PPT",
    "K-POP 썸네일 시리즈",
    "재택근무 카드뉴스",
    "브랜드 BGM 30s",
  ];
  const NAV_LABELS = { home: "홈", work: "내 작업", favorites: "즐겨찾기", history: "최근 기록" };
  const NAV_ICONS  = { home: "home", work: "folder", favorites: "star", history: "history" };

  return (
    <aside
      className="bg-white border-r border-slate-200 flex flex-col shrink-0 h-full transition-[width] duration-300 ease-out"
      style={{ width: w }}
    >
      {/* header — image logo + hamburger menu */}
      <div className={"flex items-center pt-5 pb-4 " + (collapsed ? "px-2 flex-col gap-3" : "px-5 justify-between")}>
        {collapsed ? <ImageIcon /> : <ImageLockup />}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="w-7 h-7 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 flex items-center justify-center"
          title={collapsed ? "사이드바 펼치기" : "사이드바 접기"}
        >
          <Icon name="menu" size={17} />
        </button>
      </div>

      {/* nav */}
      <nav className="px-3 flex flex-col gap-1">
        {navItems.map((k) => (
          <NavItem key={k} icon={NAV_ICONS[k]} label={NAV_LABELS[k]} active={active === k} collapsed={collapsed} />
        ))}
      </nav>

      {/* recent list */}
      {!collapsed ? (
        <div className="px-3 pt-5 flex-1 min-h-0 flex flex-col">
          <div className="px-3 mb-1">
            <span className="text-[11px] font-semibold tracking-wide text-slate-400">{recentLabel}</span>
          </div>
          <div className="overflow-y-auto">
            {RECENTS.map((t) => <RecentItem key={t}>{t}</RecentItem>)}
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* series + user */}
      {collapsed ? <SeriesCardMini /> : <SeriesCard label={familyLabel} />}
      <UserRow name={userName} email={userEmail} avatarLetter={avatarLetter} collapsed={collapsed} />
    </aside>
  );
};

/* TopBar — 우상단 C 크레딧 + 알림 */
const TopBar = ({
  credit = "12,121,209",
  variant = "home",         // "home" | "studio"
} = {}) => (
  <header className="h-16 px-6 flex items-center bg-transparent shrink-0">
    {/* 좌상단: 미니 C + 미니 bell (홈 레퍼런스에서 보이는 요소들) */}
    {variant === "home" && (
      <div className="flex items-center gap-6 text-slate-300">
        <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "#CBD5E1" }}>C</span>
        <Icon name="bell" size={18} stroke="#CBD5E1" />
      </div>
    )}
    <div className="ml-auto flex items-center gap-3">
      <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white" style={{ border: "1px solid #E2E8F0" }}>
        <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "#1F2937" }}>C</span>
        <span className="text-[13px] font-bold text-slate-900">{credit}</span>
      </div>
      <button className="relative w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700">
        <Icon name="bell" size={19} />
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: "#EF4444" }} />
      </button>
    </div>
  </header>
);

/* Right-edge floating helper widgets (browser extension-like) */
const RightFloating = () => (
  <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
    <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-[0_2px_6px_rgba(15,23,42,.04)] hover:text-slate-700">
      <Icon name="grid" size={16} />
    </button>
    <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-[0_2px_6px_rgba(15,23,42,.04)] hover:text-slate-700">
      <Icon name="translate" size={16} />
    </button>
  </div>
);

const Footer = () => (
  <div className="text-center text-[11.5px] text-slate-400 pb-5">
    딸깍.net &nbsp;-&nbsp; AI 통합 서비스 · © 2026 · <a className="hover:text-slate-600 cursor-pointer">고객센터</a>
    <span className="mx-1.5 text-slate-300">|</span>
    <a className="hover:text-slate-600 cursor-pointer">이용약관</a>
    <span className="mx-1.5 text-slate-300">|</span>
    <a className="hover:text-slate-600 cursor-pointer">개인정보처리방침</a>
  </div>
);

Object.assign(window, { Sidebar, TopBar, RightFloating, Footer, PRIMARY, PRIMARY_DK, SOFT, TINT });
