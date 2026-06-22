/* global React, Icon, PRIMARY, SOFT */

/* CardNewsCanvas — 카드뉴스 AI 에디터
   - mode 별 다른 툴바를 렌더 (default / gib-select / gib-prompt / text / shape / image)
   - 우측 캔버스 영역만 차지 (좌측 채팅 영역은 침범하지 않음)
   - 카드뉴스 이미지는 1:1 비율 유지 */

const BLUE = "#2F6BFF";
const BLUE_SOFT = "#EEF3FF";

/* ─── 상단 헤더 (스튜디오와 동일) ─── */
const CanvasHeader = () => (
  <div className="h-12 px-4 border-b border-slate-200 bg-white flex items-center gap-2 shrink-0">
    <Icon name="sidebar" size={15} className="text-slate-400" />
    <div className="ml-auto flex items-center gap-3">
      <div className="flex items-center gap-2 pl-1 pr-3 py-0.5 rounded-full bg-white border border-slate-200">
        <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: "#1F2937" }}>C</span>
        <span className="text-[12px] font-bold text-slate-900">12,121,209</span>
      </div>
      <Icon name="share" size={15} className="text-slate-400" />
      <Icon name="upload" size={15} className="text-slate-400" />
      <Icon name="more" size={15} className="text-slate-400" />
    </div>
  </div>
);

/* ─── 상단 툴바 atoms ─── */
const PillBar = ({ children, className = "" }) => (
  <div
    className={"absolute left-1/2 -translate-x-1/2 top-5 z-20 inline-flex items-center gap-0.5 bg-white rounded-2xl px-2 py-1.5 " + className}
    style={{ boxShadow: "0 6px 22px rgba(15,23,42,.10), 0 0 0 1px rgba(15,23,42,.04)" }}
  >{children}</div>
);

const PillBtn = ({ icon, label, active, primary, onClick, ariaLabel, hasChev }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={"inline-flex items-center gap-1.5 h-9 rounded-xl text-[13px] font-semibold transition select-none " +
      (label ? "px-3" : "w-9 justify-center") + " " +
      (primary
        ? "text-white"
        : active
          ? "text-blue-700"
          : "text-slate-700 hover:bg-slate-100")}
    style={primary ? { background: BLUE } : active ? { background: BLUE_SOFT } : undefined}
  >
    {icon && <Icon name={icon} size={15} strokeWidth={1.9} stroke={primary ? "#fff" : active ? BLUE : "#334155"} />}
    {label && <span>{label}</span>}
    {hasChev && <Icon name="chev-d" size={11} stroke={primary ? "#fff" : "#94A3B8"} />}
  </button>
);

const PillDivider = () => <span className="w-px h-5 bg-slate-200 mx-1" />;

/* ─── 하단 컨트롤바 (반투명 다크) ─── */
const DockBar = ({ children, className = "" }) => (
  <div
    className={"absolute left-1/2 -translate-x-1/2 bottom-5 z-20 inline-flex items-center gap-0.5 rounded-2xl px-2 py-1.5 " + className}
    style={{
      background: "rgba(15,23,42,.86)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 8px 24px rgba(15,23,42,.18)",
    }}
  >{children}</div>
);

const DockBtn = ({ icon, label, primary, onClick, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={"inline-flex items-center gap-1.5 h-8 rounded-lg text-[12px] font-semibold transition select-none " +
      (label ? "px-2.5" : "w-8 justify-center") + " " +
      (primary ? "text-white" : "text-slate-300 hover:bg-white/10 hover:text-white")}
    style={primary ? { background: BLUE } : undefined}
  >
    {icon && <Icon name={icon} size={14} strokeWidth={1.9} stroke={primary ? "#fff" : undefined} />}
    {label && <span>{label}</span>}
  </button>
);

const DockDivider = () => <span className="w-px h-4 bg-white/15 mx-1.5" />;

/* ─── 카드뉴스 이미지 (placeholder) ─── */
const CardNewsImage = ({ children, selected, hideOuter }) => (
  <div
    className={"relative rounded-xl overflow-hidden " + (selected ? "ring-2" : "")}
    style={{
      width: 484, height: 484,
      background:
        "linear-gradient(155deg,#3a4b7a 0%,#252e4a 55%,#10131f 100%)",
      boxShadow: "0 6px 28px rgba(15,23,42,.18)",
      ...(selected ? { outline: `2px solid ${BLUE}`, outlineOffset: "2px" } : {}),
    }}
  >
    {/* 책 일러스트 placeholder */}
    <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
      <div className="relative w-[78%] h-[60%]">
        {[
          { c: "#E78A4A", w: 100, t: "ZERO TO ONE" },
          { c: "#C44A4A", w: 96,  t: "EGO IS THE ENEMY" },
          { c: "#B88B4A", w: 92,  t: "THE OBSTACLE IS THE WAY" },
          { c: "#7E8A99", w: 88,  t: "EXPONENTIAL ORGANIZATIONS" },
          { c: "#F5DEB3", w: 84,  t: "COMPETING AGAINST LUCK" },
          { c: "#D9CFC3", w: 80,  t: "VALUE PROPOSITION DESIGN" },
          { c: "#F2EDE6", w: 76,  t: "THE STARTUP OWNER'S MANUAL" },
          { c: "#FFFFFF", w: 72,  t: "THE CORPORATE STARTUP" },
        ].map((b, i) => (
          <div key={i}
            className="absolute left-1/2 -translate-x-1/2 rounded-sm flex items-center justify-center text-[7px] font-bold text-black/50 tracking-tighter px-2"
            style={{
              width: `${b.w}%`,
              height: 20,
              background: b.c,
              bottom: i * 22,
              boxShadow: "0 1px 0 rgba(0,0,0,.15)",
            }}
          >
            <span className="truncate">{b.t}</span>
          </div>
        ))}
      </div>
    </div>

    {/* badge */}
    {!hideOuter && (
      <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/55 text-white text-[10px] font-semibold backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 생성 결과 · 1:1
      </span>
    )}

    {children}
  </div>
);

/* ─── GIB 영역 선택 overlay ─── */
const GibSelection = () => (
  <>
    {/* dark mask outside selection */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0" style={{
        background: "rgba(15,23,42,.45)",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 30%, 28% 30%, 28% 78%, 76% 78%, 76% 30%, 0 30%)",
      }} />
    </div>
    {/* selection box */}
    <div className="absolute pointer-events-none" style={{
      left: "28%", top: "30%", width: "48%", height: "48%",
      border: `2px dashed ${BLUE}`,
      background: "rgba(47,107,255,.05)",
      borderRadius: 6,
    }}>
      {/* corner handles */}
      {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([x,y],i) => (
        <span key={i} className="absolute w-2.5 h-2.5 bg-white rounded-sm" style={{
          left: x < 0 ? -5 : "auto",
          right: x > 0 ? -5 : "auto",
          top: y < 0 ? -5 : "auto",
          bottom: y > 0 ? -5 : "auto",
          border: `2px solid ${BLUE}`,
          boxShadow: "0 1px 2px rgba(15,23,42,.18)",
        }} />
      ))}
      {/* size badge */}
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-white text-[10.5px] font-semibold" style={{ background: BLUE }}>
        <Icon name="brush" size={10} stroke="#fff" strokeWidth={2} />
        선택 영역 232 × 232
      </span>
    </div>
  </>
);

/* ─── 텍스트 selection overlay ─── */
const TextSelection = () => (
  <div className="absolute top-[18%] left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md text-white font-black text-[20px] tracking-tight"
       style={{ background: "rgba(0,0,0,.42)", outline: `2px solid ${BLUE}`, outlineOffset: 3, borderRadius: 4 }}>
    READING LIST
    {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([x,y],i) => (
      <span key={i} className="absolute w-2 h-2 bg-white rounded-sm" style={{
        left: x < 0 ? -8 : "auto",
        right: x > 0 ? -8 : "auto",
        top: y < 0 ? -8 : "auto",
        bottom: y > 0 ? -8 : "auto",
        border: `1.5px solid ${BLUE}`,
        boxShadow: "0 1px 2px rgba(15,23,42,.2)",
      }} />
    ))}
  </div>
);

/* ─── 도형 selection overlay ─── */
const ShapeSelection = () => (
  <div className="absolute" style={{
    left: "10%", top: "20%", width: 88, height: 88,
    background: "rgba(47,107,255,.8)",
    borderRadius: 999,
    outline: `2px solid ${BLUE}`, outlineOffset: 3,
  }}>
    {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([x,y],i) => (
      <span key={i} className="absolute w-2 h-2 bg-white rounded-sm" style={{
        left: x < 0 ? -8 : "auto",
        right: x > 0 ? -8 : "auto",
        top: y < 0 ? -8 : "auto",
        bottom: y > 0 ? -8 : "auto",
        border: `1.5px solid ${BLUE}`,
      }} />
    ))}
  </div>
);

/* ─── 이미지 selection overlay (전체 이미지 선택됨) ─── */
const ImageSelection = () => (
  <>
    {[[-1,-1],[1,-1],[-1,1],[1,1]].map(([x,y],i) => (
      <span key={i} className="absolute w-3 h-3 bg-white rounded-sm" style={{
        left: x < 0 ? -6 : "auto",
        right: x > 0 ? -6 : "auto",
        top: y < 0 ? -6 : "auto",
        bottom: y > 0 ? -6 : "auto",
        border: `2px solid ${BLUE}`,
        boxShadow: "0 1px 3px rgba(15,23,42,.2)",
      }} />
    ))}
  </>
);

/* ─── 상단 툴바 — 모드별 ─── */
const TopToolbar = ({ mode }) => {
  if (mode === "default") {
    return (
      <PillBar>
        <PillBtn icon="brush" label="그려서 편집하기" primary />
        <PillDivider />
        <PillBtn icon="type" label="텍스트 추가" />
        <PillBtn icon="shapes" label="도형 추가" />
      </PillBar>
    );
  }
  if (mode === "gib-select" || mode === "gib-prompt") {
    return (
      <PillBar>
        <PillBtn icon="brush" label="그려서 편집하기" active />
        <PillDivider />
        <PillBtn icon="resize" label="영역 재설정" />
        <PillBtn label="취소" />
      </PillBar>
    );
  }
  if (mode === "text") {
    return (
      <>
        <PillBar>
          <PillBtn label="Pretendard" hasChev />
          <PillDivider />
          <PillBtn icon="minus" />
          <span className="px-2 text-[13px] font-bold text-slate-700 select-none">24</span>
          <PillBtn icon="plus" />
          <PillDivider />
          <button className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center">
            <span className="w-5 h-5 rounded-md" style={{ background: "#FACC15", border: "1px solid rgba(0,0,0,.06)" }} />
          </button>
          <PillBtn icon="bold" />
          <PillBtn icon="italic" />
          <PillBtn icon="underline" />
          <PillDivider />
          <PillBtn icon="align-c" hasChev />
          <PillBtn icon="list-ul" />
          <PillDivider />
          {/* 자간 · 행간 — 각각 독립 제어 + 값 노출 */}
          <button className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-xl hover:bg-slate-100 transition" title="자간">
            <Icon name="letter-h" size={14} stroke="#334155" />
            <span className="text-[12.5px] font-bold text-slate-700 tabular-nums">0</span>
            <Icon name="chev-d" size={10} stroke="#94A3B8" />
          </button>
          <button className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-xl hover:bg-slate-100 transition" title="행간">
            <Icon name="line-h" size={14} stroke="#334155" />
            <span className="text-[12.5px] font-bold text-slate-700 tabular-nums">1.5</span>
            <Icon name="chev-d" size={10} stroke="#94A3B8" />
          </button>
          <PillDivider />
          {/* 효과 — 다운드 상태 */}
          <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-[13px] font-semibold transition select-none text-blue-700"
                  style={{ background: BLUE_SOFT }}>
            <Icon name="wand" size={14} stroke={BLUE} strokeWidth={1.9} />
            효과
            <Icon name="chev-d" size={10} stroke={BLUE} />
          </button>
        </PillBar>
        <EffectsPopover />
      </>
    );
  }
  if (mode === "shape") {
    return (
      <PillBar>
        <PillBtn icon="circle" label="도형" hasChev />
        <PillDivider />
        <button className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-xl hover:bg-slate-100">
          <span className="w-5 h-5 rounded-md" style={{ background: BLUE }} />
          <span className="text-[13px] font-semibold text-slate-700">채우기</span>
        </button>
        <PillBtn label="테두리" hasChev />
        <PillBtn label="모서리" hasChev />
        <PillDivider />
        <PillBtn icon="layers" label="위치" hasChev />
      </PillBar>
    );
  }
  if (mode === "image") {
    return (
      <PillBar>
        <PillBtn icon="wand" label="편집" hasChev />
        <PillDivider />
        <PillBtn icon="image" label="이미지 교체" hasChev />
        <PillBtn icon="crop" label="크롭" />
        <PillBtn icon="rotate" label="회전" />
        <PillBtn icon="resize" label="크기" />
      </PillBar>
    );
  }
  return null;
};

/* ─── 효과 드롭다운 popover (텍스트 편집 모드) ─── */
const EffectsPopover = () => (
  <div
    className="absolute z-30 bg-white rounded-2xl"
    style={{
      top: 72,
      right: "calc(50% - 305px)",
      width: 280,
      padding: 14,
      boxShadow: "0 14px 36px rgba(15,23,42,.14), 0 0 0 1px rgba(15,23,42,.05)",
    }}
  >
    {/* arrow */}
    <div className="absolute w-3 h-3 bg-white" style={{
      top: -6, right: 28, transform: "rotate(45deg)",
      boxShadow: "-1px -1px 0 rgba(15,23,42,.05)",
    }} />

    {/* row: 그림자 */}
    <Row label="그림자">
      <Slider value={36} />
    </Row>
    {/* row: 외각선 */}
    <Row label="외각선">
      <div className="flex items-center gap-1.5">
        <Swatch c="#0F172A" active />
        <Swatch c="#FFFFFF" border />
        <Swatch c="#2F6BFF" />
        <span className="text-[11.5px] text-slate-400 ml-auto">2 px</span>
      </div>
    </Row>
    {/* row: 배경 강조 */}
    <Row label="배경 강조">
      <div className="flex items-center gap-1.5">
        <Swatch c="transparent" border check />
        <Swatch c="#FACC15" active />
        <Swatch c="#F472B6" />
        <Swatch c="#2F6BFF" />
      </div>
    </Row>
    {/* row: 투명도 */}
    <Row label="투명도">
      <Slider value={92} unit="%" />
    </Row>
    {/* row: 굵기 */}
    <Row label="굵기" last>
      <div className="inline-flex border border-slate-200 rounded-lg overflow-hidden text-[11.5px] font-semibold">
        {["Light", "Regular", "Bold"].map((w, i) => (
          <button key={w} className={"px-2.5 py-1 " + (i === 2 ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50") + (i > 0 ? " border-l border-slate-200" : "")}>{w}</button>
        ))}
      </div>
    </Row>
  </div>
);

const Row = ({ label, children, last }) => (
  <div className={"flex items-center gap-3 " + (last ? "" : "pb-3 mb-3 border-b border-slate-100")}>
    <span className="text-[11.5px] font-semibold text-slate-500 w-14 shrink-0">{label}</span>
    <div className="flex-1 min-w-0">{children}</div>
  </div>
);

const Slider = ({ value, unit = "" }) => (
  <div className="flex items-center gap-2">
    <div className="relative flex-1 h-1.5 rounded-full bg-slate-100">
      <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: value + "%", background: BLUE }} />
      <div className="absolute -top-1.5 w-4 h-4 rounded-full bg-white"
           style={{ left: `calc(${value}% - 8px)`, border: `2px solid ${BLUE}`, boxShadow: "0 1px 3px rgba(15,23,42,.2)" }} />
    </div>
    <span className="text-[11.5px] font-bold text-slate-700 tabular-nums w-9 text-right">{value}{unit}</span>
  </div>
);

const Swatch = ({ c, active, border, check }) => (
  <button
    className="w-6 h-6 rounded-md relative flex items-center justify-center"
    style={{
      background: c === "transparent" ? "#fff" : c,
      border: active
        ? `2px solid ${BLUE}`
        : border
          ? "1px solid #E2E8F0"
          : "1px solid rgba(0,0,0,.04)",
    }}
  >
    {check && <div className="absolute inset-0 m-auto w-[1px] h-[26px] bg-rose-400 rotate-45 origin-center" />}
  </button>
);

/* ─── 하단 컨트롤바 — 모드별 ─── */
const BottomToolbar = ({ mode }) => {
  if (mode === "gib-prompt") {
    /* GPT-스타일 프롬프트 입력바 */
    return (
      <div className="absolute left-1/2 -translate-x-1/2 bottom-5 z-20 w-[640px] flex flex-col items-center gap-2">
        {/* 예시 chips */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {["배경을 바다로", "사람 제거", "표정을 웃는 얼굴로", "책 대신 노트북 추가"].map((t) => (
            <button key={t} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11.5px] text-slate-600 hover:bg-slate-50">
              <Icon name="sparkles" size={10} stroke="#94A3B8" />
              {t}
            </button>
          ))}
        </div>
        {/* input bar */}
        <div className="w-full bg-white rounded-2xl flex items-center gap-2 pl-4 pr-1.5 py-1.5"
             style={{
               border: `1.5px solid ${BLUE}`,
               boxShadow: "0 0 0 4px #EEF3FF, 0 6px 22px rgba(15,23,42,.10)",
             }}>
          <Icon name="brush" size={15} stroke={BLUE} />
          <span className="text-[13.5px] text-slate-400 flex-1 py-1.5">선택 영역에 대해 수정할 내용을 입력하세요</span>
          <button className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-white text-[13px] font-bold" style={{ background: BLUE }}>
            <Icon name="sparkles" size={13} stroke="#fff" /> AI 다시 생성
          </button>
        </div>
      </div>
    );
  }
  if (mode === "gib-select") {
    return (
      <DockBar>
        <DockBtn icon="zoom-out" ariaLabel="축소" />
        <span className="px-2 text-[11.5px] font-bold text-white/90 select-none">100%</span>
        <DockBtn icon="zoom-in" ariaLabel="확대" />
        <DockDivider />
        <DockBtn icon="refresh" label="영역 초기화" />
      </DockBar>
    );
  }
  /* default for default/text/shape/image */
  return (
    <DockBar>
      <DockBtn icon="zoom-out" ariaLabel="축소" />
      <span className="px-2 text-[11.5px] font-bold text-white/90 select-none">100%</span>
      <DockBtn icon="zoom-in" ariaLabel="확대" />
      <DockDivider />
      <DockBtn icon="undo" ariaLabel="실행취소" />
      <DockBtn icon="redo" ariaLabel="다시실행" />
      <DockDivider />
      <DockBtn icon="refresh" label="초기화" />
      <DockBtn label="편집 완료" primary />
    </DockBar>
  );
};

/* ─── 카드뉴스 캔버스 ─── */
const CardNewsCanvas = ({ mode = "default" }) => {
  const showImageSelection = mode === "image";
  const showTextSelection  = mode === "text";
  const showShapeSelection = mode === "shape";
  const showGib            = mode === "gib-select" || mode === "gib-prompt";

  return (
    <div className="w-full h-full flex flex-col bg-[#F3F6FC]">
      <CanvasHeader />
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <TopToolbar mode={mode} />

        {/* image with overlays */}
        <div className="relative">
          <CardNewsImage selected={showImageSelection}>
            {showGib && <GibSelection />}
            {showTextSelection && <TextSelection />}
            {showShapeSelection && <ShapeSelection />}
            {showImageSelection && <ImageSelection />}
          </CardNewsImage>
          <div className="text-center text-[11.5px] text-slate-400 mt-4">
            {mode === "gib-select" && "선택한 영역을 AI가 다시 생성합니다. 모서리 핸들로 영역을 조정할 수 있어요."}
            {mode === "gib-prompt" && "원하는 변경 내용을 한 줄로 적어주세요."}
            {mode === "default" && "이미지 위를 드래그하면 영역을 AI로 다시 그릴 수 있어요."}
            {mode === "text" && "텍스트를 클릭해 편집하거나, 드래그해 위치를 옮길 수 있어요."}
            {mode === "shape" && "도형을 드래그해 위치를 옮기거나 크기를 조정해 보세요."}
            {mode === "image" && "이미지를 다시 생성하거나, 크롭/회전/크기를 조정해 보세요."}
          </div>
        </div>

        <BottomToolbar mode={mode} />
      </div>
    </div>
  );
};

window.CardNewsCanvas = CardNewsCanvas;
