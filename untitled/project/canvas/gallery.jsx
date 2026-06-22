/* global React, Icon, Sidebar, TopBar, PRIMARY, SOFT, TINT */

const TABS = ["전체", "AI 트렌드", "카드뉴스", "밈/짤", "상세페이지"];

const GRID_COLS = [
  [
    { h: 178, g: "linear-gradient(165deg,#E8B26B 0%,#9C6532 70%,#3D2818 100%)", title: "고요한 호수의 일출", tags: ["풍경"] },
    { h: 232, g: "linear-gradient(180deg,#7E9BC7 0%,#3A5273 100%)", title: "해변 스케치 조감도", tags: ["야외","풍경"] },
    { h: 200, g: "linear-gradient(200deg,#7A6757 0%,#3D352C 100%)", title: "비온 뒤의 도시", tags: ["스트리트"] },
    { h: 256, g: "linear-gradient(160deg,#5C5953 0%,#262320 100%)", title: "3D 이소메트릭 작품", tags: ["3D"] },
    { h: 210, g: "linear-gradient(180deg,#C28F66 0%,#6A4023 100%)", title: "패럴 로고진", tags: ["야외"] },
  ],
  [
    { h: 208, g: "linear-gradient(160deg,#B0C0A7 0%,#5C7150 100%)", title: "AI 브랜드 2026", tags: ["카드뉴스","브랜드"] },
    { h: 160, g: "linear-gradient(160deg,#3D3E3F 0%,#16181A 100%)", title: "다리 위의 일몰", tags: ["풍경"] },
    { h: 264, g: "linear-gradient(180deg,#8BA0AC 0%,#43525C 100%)", title: "Q4 마케팅 인사이트", tags: ["카드뉴스"] },
    { h: 190, g: "linear-gradient(180deg,#C6A487 0%,#7B5436 100%)", title: "별빛 풍경 시 새벽", tags: ["풍경"] },
    { h: 244, g: "linear-gradient(180deg,#2F362D 0%,#10130F 100%)", title: "숲으로 떠나는 우슬", tags: ["풍경"] },
  ],
  [
    { h: 336, g: "linear-gradient(180deg,#D8D2C6 0%,#7E796E 100%)", title: "화장품 상세페이지", tags: ["상세페이지"] },
    { h: 216, g: "linear-gradient(180deg,#4F5664 0%,#1B1F26 100%)", title: "비 오는 도시", tags: ["스트리트"] },
    { h: 284, g: "linear-gradient(180deg,#7A7975 0%,#363432 100%)", title: "스튜디오 NPC 인터뷰", tags: ["인물"] },
    { h: 226, g: "linear-gradient(180deg,#A8B4C6 0%,#5A6A7E 100%)", title: "디자이너의 작업 풍경", tags: ["밈/짤"] },
  ],
  [
    { h: 376, g: "linear-gradient(160deg,#A18371 0%,#4A2F1C 100%)", title: "식품 상세페이지", tags: ["상세페이지"] },
    { h: 274, g: "linear-gradient(180deg,#D9DDE0 0%,#7E848A 100%)", title: "하늘의 매", tags: ["풍경"] },
    { h: 320, g: "linear-gradient(180deg,#8E9382 0%,#3E4338 100%)", title: "패션 상세페이지", tags: ["상세페이지"] },
  ],
];

const Tile = ({ t }) => (
  <div className="rounded-2xl overflow-hidden bg-white shadow-[0_1px_2px_rgba(15,23,42,.05)] mb-3.5 border border-slate-200">
    <div style={{ background: t.g, height: t.h }} />
    <div className="px-3 py-2.5">
      <div className="text-[12.5px] font-bold text-slate-900 truncate -tracking-[0.01em]">{t.title}</div>
      <div className="mt-1.5 flex gap-1.5 flex-wrap">
        {t.tags.map((x) => (
          <span key={x} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">{x}</span>
        ))}
      </div>
    </div>
  </div>
);

const GalleryScreen = () => (
  <div className="w-full h-full flex" style={{ background: "#fff" }}>
    <Sidebar active="home" width={232} />
    <main className="flex-1 flex flex-col min-w-0" style={{ background: TINT }}>
      <TopBar />
      <div className="flex-1 overflow-hidden px-10 pt-2 pb-6">
        {/* page header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full"
             style={{ background: SOFT, color: PRIMARY }}>
          <Icon name="sparkles" size={11} /> <span className="text-[11.5px] font-semibold">AI 이미지 생성</span>
        </div>
        <h1 className="mt-3 text-[26px] font-extrabold tracking-[-0.03em] text-slate-900">
          한 줄의 묘사로, 놀라운 이미지를 만들어보세요
        </h1>
        <p className="mt-1.5 text-[13.5px] text-slate-500">
          연출이나 분위기까지 함께 적어 보세요. 직접 참조도 더할 수 있어요.
        </p>

        {/* composer */}
        <div
          className="mt-4 bg-white rounded-2xl"
          style={{ border: `1px solid ${PRIMARY}`, boxShadow: `0 0 0 4px ${SOFT}` }}
        >
          <div className="px-5 pt-4 pb-3 text-[13.5px] text-slate-400 min-h-[64px] leading-relaxed">
            예: 미니멀 북유럽 스타일 거실, 햇살 가득한 오후, 베이지 톤, 부드러운 대각선 레이아웃
          </div>
          <div className="flex items-center gap-3 px-4 pb-3 pt-2">
            <div className="inline-flex items-center gap-1.5 pl-1.5 pr-3 py-1 rounded-full border bg-white" style={{ borderColor: "#C7D7FF" }}>
              <span className="w-4 h-4 rounded-full" style={{ background: PRIMARY }} />
              <span className="text-[12px] font-semibold text-slate-700">딸깍 Pro · GPT-5</span>
              <Icon name="chev-d" size={12} className="text-slate-400" />
            </div>
            <button className="inline-flex items-center gap-1.5 text-[12.5px] text-slate-500 px-1.5 py-1 rounded-md">
              <Icon name="paperclip" size={14} /> 자동 업로드
            </button>
            <span className="ml-auto inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-[12px] text-slate-600">
                1:1 <Icon name="chev-d" size={10} />
              </span>
              <button
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-white text-[12.5px] font-semibold"
                style={{ background: PRIMARY }}
              >
                <Icon name="sparkles" size={12} stroke="#fff" /> 생성하기
              </button>
            </span>
          </div>
        </div>

        {/* tabs */}
        <div className="mt-6 flex items-center gap-2">
          <span className="text-[13px] font-bold mr-1 text-slate-900">카테고리</span>
          {TABS.map((t, i) => (
            <span
              key={t}
              className={"text-[12px] px-3 py-1 rounded-full border " + (i === 0 ? "text-white" : "bg-white text-slate-600 border-slate-200")}
              style={i === 0 ? { background: PRIMARY, borderColor: PRIMARY } : undefined}
            >{t}</span>
          ))}
          <span className="ml-auto inline-flex gap-1">
            <span className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400"><Icon name="chev-l" size={13} /></span>
            <span className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400"><Icon name="chev-r" size={13} /></span>
          </span>
        </div>

        {/* masonry */}
        <div className="mt-5 grid grid-cols-4 gap-3.5">
          {GRID_COLS.map((col, ci) => (
            <div key={ci}>{col.map((t, i) => <Tile key={i} t={t} />)}</div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

window.GalleryScreen = GalleryScreen;
