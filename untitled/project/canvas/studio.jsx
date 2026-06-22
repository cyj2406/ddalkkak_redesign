/* global React, Icon, Sidebar, TopBar, PRIMARY, SOFT, TINT */
const { useState, useRef } = React;

const ORANGE = "#F18A45";
const ORANGE_BG = "#FFF1E6";
const ORANGE_LINE = "#FCD2B0";
const BLUE_PRIMARY = "#0055FF";   // 로고 메인 블루 (버튼)
const BLUE_LINE = "#BFD3F8";

/* preset templates with attached auto-prompts */
const TEMPLATES = [
  {
    key: "cos",
    label: "신상 화장품 상세페이지 메인 컷",
    autoPrompt:
      "신상 화장품 상세페이지 메인 컷 템플릿으로 만들어줘. 따뜻한 베이지 톤에 미니멀 한국 감성을 살려줘.",
    promptDetail:
      "A studio product hero shot of a new cosmetic bottle, warm beige backdrop, soft natural daylight, glossy reflection, minimal Korean editorial styling, 50mm lens, photoreal, 8K",
    main: "GLOW",
    sub: "DAILY ESSENCE",
  },
  {
    key: "kpop",
    label: "K-POP 앨범 커버 비주얼",
    autoPrompt:
      "K-POP 앨범 커버 템플릿을 적용해서 만들어줘. 추가 반영할 내용은 다음과 같아: 고급스러운 에디토리얼 무드로, 한국적인 감성을 살려줘.",
    promptDetail:
      "A close-up beauty-editorial portrait of a Korean K-POP idol, soft natural skin tones, glossy color grading, cinematic rim lighting, magazine cover composition, 50mm lens, photoreal, 8K",
    main: "K-POP",
    sub: "MUSIC LIST",
  },
  {
    key: "wfh",
    label: "재택근무 카드뉴스 표지",
    autoPrompt:
      "재택근무 카드뉴스 표지를 만들어줘. 따뜻한 베이지·그린 톤으로 산뜻하게.",
    promptDetail:
      "A flat-lay home office desk scene, warm beige and sage green palette, soft daylight, minimal Korean lifestyle composition, card-news cover layout, 8K",
    main: "WFH",
    sub: "CARD NEWS",
  },
];

/* mock generated images */
const GEN_IMAGES = [
  { id: 0, preview: "linear-gradient(160deg,#7A5A48 0%,#4A3327 60%,#2B1C14 100%)" },
  { id: 1, preview: "linear-gradient(180deg,#3E465A 0%,#1A1F2C 100%)" },
  { id: 2, preview: "linear-gradient(160deg,#C28F66 0%,#6A4023 100%)" },
];

/* ─────────────────────────── Atoms ─────────────────────────── */
const ChatHeader = () => (
  <div className="h-12 px-4 border-b border-slate-200 bg-white flex items-center justify-center shrink-0">
    <div className="text-[13.5px] font-bold text-slate-900">K-POP 앨범 커버 시안</div>
  </div>
);
const ResultHeader = () => (
  <div className="h-12 px-4 border-b border-slate-200 bg-white flex items-center gap-2 shrink-0">
    <Icon name="sidebar" size={15} className="text-slate-400" />
    <div className="ml-auto flex items-center gap-3">
      <Icon name="share" size={15} className="text-slate-400" />
      <Icon name="upload" size={15} className="text-slate-400" />
      <Icon name="more" size={15} className="text-slate-400" />
    </div>
  </div>
);

const MsgAI = ({ children }) => (
  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed text-slate-800">
    {children}
  </div>
);
const MsgUser = ({ children }) => (
  <div className="self-end max-w-[82%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed"
       style={{ background: SOFT, border: "1px solid #DBE5FF", color: "#1F2A52" }}>
    {children}
  </div>
);

/* ────────────────── Asset pills (Base / Reference) ────────────────── */
const BasePill = ({ value, onRemove }) => {
  if (!value) {
    return (
      <span className="inline-flex items-center gap-1.5 pl-1 pr-3 py-1 rounded-full text-[12px] font-semibold cursor-default select-none"
            style={{ background: ORANGE_BG, color: "#B25F1F", border: `1px dashed ${ORANGE_LINE}` }}>
        <span className="w-4 h-4 rounded-full text-white text-[9px] font-extrabold inline-flex items-center justify-center"
              style={{ background: ORANGE }}>B</span>
        베이스 추가
        <Icon name="plus" size={11} stroke="#B25F1F" strokeWidth={2.4} className="-mr-0.5" />
      </span>
    );
  }
  return (
    <span className="group inline-flex items-center gap-1.5 pl-0.5 pr-1 py-0.5 rounded-full text-[12px] font-semibold"
          style={{ background: "#fff", color: "#B25F1F", border: `1.5px solid ${ORANGE}` }}>
      <span className="relative inline-block">
        <span className="w-7 h-7 rounded-full block" style={{ background: value.preview }} />
        <span className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 rounded-full text-white text-[8px] font-extrabold inline-flex items-center justify-center"
              style={{ background: ORANGE, border: "1.5px solid #fff" }}>B</span>
      </span>
      <span className="text-slate-700 mr-1">{value.label || "base.png"}</span>
      <button
        onClick={onRemove}
        className="w-5 h-5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
        title="베이스 제거"
      >
        <Icon name="x" size={11} strokeWidth={2.4} />
      </button>
    </span>
  );
};

const RefPill = ({ value, onRemove }) => (
  <span className="group inline-flex items-center gap-1.5 pl-0.5 pr-1 py-0.5 rounded-full text-[12px] text-slate-700"
        style={{ background: "#fff", border: `1.5px solid ${BLUE_LINE}` }}>
    <span className="relative inline-block">
      <span className="w-7 h-7 rounded-full block" style={{ background: value.preview }} />
      <span className="absolute -top-0.5 -left-0.5 w-3.5 h-3.5 rounded-full text-white text-[8px] font-extrabold inline-flex items-center justify-center"
            style={{ background: PRIMARY, border: "1.5px solid #fff" }}>R</span>
    </span>
    <span className="font-medium mr-1 truncate max-w-[110px]">{value.name}</span>
    <button
      onClick={onRemove}
      className="w-5 h-5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
      title="참조 제거"
    >
      <Icon name="x" size={11} strokeWidth={2.4} />
    </button>
  </span>
);

const RefAddPill = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={"inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold transition " +
      (disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-blue-50/60")}
    style={{ border: `1px dashed ${BLUE_LINE}`, background: "#fff", color: PRIMARY }}
  >
    <Icon name="plus" size={11} stroke={PRIMARY} strokeWidth={2.4} />
    참조 추가
  </button>
);

/* ────────────────── Inline form card ────────────────── */
const FormCard = ({ tpl, onSubmit }) => {
  const [detail, setDetail] = useState(tpl.promptDetail);
  const [main, setMain] = useState(tpl.main);
  const [sub, setSub] = useState(tpl.sub);
  const fileRef = useRef(null);
  const [refs, setRefs] = useState([]); // form-internal reference uploads

  const onPickFiles = () => fileRef.current?.click();
  const onFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const room = 3 - refs.length;
    const accepted = files.slice(0, room);
    Promise.all(
      accepted.map(
        (f) => new Promise((resolve) => {
          const r = new FileReader();
          r.onload = () => resolve({ id: Math.random().toString(36).slice(2), name: f.name, preview: `center / cover no-repeat url(${r.result})` });
          r.readAsDataURL(f);
        })
      )
    ).then((arr) => setRefs((cur) => [...cur, ...arr]));
    e.target.value = "";
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col gap-4">
      <div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[12.5px] font-bold text-slate-900">비주얼 상세 프롬프트</span>
          <span className="text-[10.5px] text-slate-400">템플릿 고유 프롬프트가 미리 입력되어 있어요. 자유롭게 수정하세요.</span>
        </div>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows={4}
          className="w-full text-[12.5px] text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-lg px-3 py-2.5 outline-none resize-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[12.5px] font-bold text-slate-900 mb-1.5">메인 타이틀</div>
          <input
            value={main}
            onChange={(e) => setMain(e.target.value)}
            className="w-full h-9 px-3 text-[13px] border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>
        <div>
          <div className="text-[12.5px] font-bold text-slate-900 mb-1.5">서브 타이틀</div>
          <input
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            className="w-full h-9 px-3 text-[13px] border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-[12.5px] font-bold text-slate-900">참고 이미지</span>
          <span className="text-[10.5px] text-slate-400">최대 3장까지 첨부할 수 있어요.</span>
        </div>
        {refs.length > 0 && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {refs.map((r) => (
              <span key={r.id} className="inline-flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11.5px] text-slate-700">
                <span className="w-5 h-5 rounded-md inline-block" style={{ background: r.preview }} />
                <span className="truncate max-w-[120px]">{r.name}</span>
                <button onClick={() => setRefs((cur) => cur.filter((x) => x.id !== r.id))} className="text-slate-400 hover:text-slate-700">
                  <Icon name="x" size={10} strokeWidth={2.4} />
                </button>
              </span>
            ))}
          </div>
        )}
        <button
          onClick={onPickFiles}
          disabled={refs.length >= 3}
          className={"w-full h-[88px] rounded-xl flex flex-col items-center justify-center gap-1 transition " +
            (refs.length >= 3 ? "opacity-40 cursor-not-allowed" : "hover:bg-slate-50")}
          style={{ border: "1.5px dashed #CBD5E1", background: "#FBFCFE" }}
        >
          <Icon name="image" size={18} className="text-slate-400" />
          <span className="text-[12.5px] text-slate-500">참고 이미지를 드래그하거나 클릭해 첨부하세요</span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
      </div>

      <div className="flex justify-end pt-1">
        <button
          onClick={() => onSubmit({ detail, main, sub, refs })}
          className="inline-flex items-center gap-1.5 h-10 px-5 rounded-xl text-white font-bold text-[13px] hover:brightness-110 transition"
          style={{ background: BLUE_PRIMARY, boxShadow: "0 2px 0 rgba(0,68,204,.22)" }}
        >
          <Icon name="sparkles" size={13} stroke="#fff" /> 이 템플릿으로 생성하기
        </button>
      </div>
    </div>
  );
};

/* ────────────────── Generated image bubble w/ tiny toolbar ────────────────── */
const ImageBubble = ({ img, isBase, onSetBase }) => (
  <div className="flex flex-col gap-1.5">
    <div className="relative inline-block">
      <div className="w-[150px] h-[150px] rounded-xl overflow-hidden"
           style={{ background: img.preview, boxShadow: "0 1px 2px rgba(15,23,42,.08)" }} />
      {isBase && (
        <span className="absolute top-1.5 right-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-white text-[10px] font-bold"
              style={{ background: ORANGE }}>
          <Icon name="check" size={9} stroke="#fff" strokeWidth={2.4} /> 베이스
        </span>
      )}
    </div>
    <div className="inline-flex items-center gap-1 self-start">
      <button
        onClick={() => onSetBase(img)}
        className={"inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10.5px] font-semibold transition " +
          (isBase ? "" : "hover:bg-slate-50 text-slate-600 border border-slate-200")}
        style={isBase ? { color: ORANGE, border: `1px solid ${ORANGE}`, background: ORANGE_BG } : undefined}
      >
        <span className="w-3.5 h-3.5 rounded-full text-white text-[8px] font-bold inline-flex items-center justify-center" style={{ background: ORANGE }}>B</span>
        {isBase ? "베이스로 지정됨" : "베이스로 지정"}
      </button>
      <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10.5px] font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200">
        <Icon name="upload" size={11} className="rotate-180" /> 다운로드
      </button>
    </div>
  </div>
);

/* ────────────────────────────── Studio ────────────────────────────── */
const StudioScreen = () => {
  // chat state machine — 스크린샷 상태를 기본값으로 렌더링 (사용자는 계속 조작 가능)
  const [selectedTpl, setSelectedTpl] = useState(TEMPLATES[1]);
  const [sentMsg, setSentMsg] = useState(TEMPLATES[1].autoPrompt);
  const [showForm, setShowForm] = useState(true);
  const [generated, setGenerated] = useState(false);

  // asset pills (above composer)
  const [base, setBase] = useState(null);
  const [refs, setRefs] = useState([
    {
      id: "seed-ref-1",
      name: "reference-1.png",
      preview: "linear-gradient(135deg,#3D332B 0%,#1F1814 100%)",
    },
  ]);
  const refInputRef = useRef(null);

  // composer state
  const [composer, setComposer] = useState("");

  /* template click → auto-fill composer */
  const onPickTemplate = (tpl) => {
    setSelectedTpl(tpl);
    setComposer(tpl.autoPrompt);
  };

  /* send composer → user msg + AI reply with form */
  const onSend = () => {
    const text = composer.trim();
    if (!text) return;
    setSentMsg(text);
    setComposer("");
    if (selectedTpl) {
      setShowForm(true);
    }
  };

  /* form submit → produce 3 images */
  const onFormSubmit = () => setGenerated(true);

  /* AI image → asset base pill */
  const onSetBase = (img) => setBase({ id: img.id, preview: img.preview, label: `result-${img.id + 1}.png` });

  /* asset pill: + 참조 추가 → file picker */
  const onPickRefs = () => refInputRef.current?.click();
  const onRefFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const room = 3 - refs.length;
    const accepted = files.slice(0, room);
    Promise.all(
      accepted.map(
        (f) => new Promise((resolve) => {
          const r = new FileReader();
          r.onload = () => resolve({ id: Math.random().toString(36).slice(2), name: f.name, preview: `center / cover no-repeat url(${r.result})` });
          r.readAsDataURL(f);
        })
      )
    ).then((arr) => setRefs((cur) => [...cur, ...arr]));
    e.target.value = "";
  };

  const hasAssets = !!base || refs.length > 0;
  const placeholder = hasAssets
    ? "선택된 이미지를 바탕으로 수정을 진행합니다."
    : "무엇을 만들까요? 대화로 자유롭게 요청하거나 템플릿을 선택해 보세요!";

  return (
    <div className="w-full h-full flex" style={{ background: "#fff" }}>
      <Sidebar
        active="work"
        width={232}
        showPro={false}
        logoMode="image"
        ctaStyle="solid"
        navItems={["home", "work"]}
        recentLabel="최근 대화"
        familyLabel="DALKKAK SERIES"
        userName="최유정"
        userPlan=""
        avatarLetter="유"
        recents={[
          "2026 금융소비자 트렌드 보고서",
          "K-POP 썸네일 시리즈",
          "재택근무 카드뉴스 5장",
          "Q4 마케팅 전략 PPT 12장",
          "Spark — AI 에디터 랜딩",
          "브랜드 BGM 30초 v2",
          "UXUI 피드백 미팅 받아쓰기",
        ]}
      />
      <main className="flex-1 flex flex-col min-w-0" style={{ background: "#fff" }}>
        <TopBar creditStyle="yellow" />
        <div className="flex-1 flex min-h-0">
          {/* CHAT PANEL (~45%) */}
          <section className="w-[44%] min-w-[460px] border-r border-slate-200 bg-white flex flex-col">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">
              {/* AI greeting */}
              <MsgAI>
                안녕하세요, <b>최유정님</b>! 어떤 이미지를 만들고 싶으세요?<br/>
                목적이나 컨셉트를 한 줄로 알려주시면, 제가 필요한 정보를 차근차근 물어볼게요.
              </MsgAI>

              {/* template chips */}
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => onPickTemplate(t)}
                    className={"px-3 py-1.5 rounded-full text-[12px] transition " +
                      (selectedTpl?.key === t.key
                        ? "text-white"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300")}
                    style={selectedTpl?.key === t.key ? { background: BLUE_PRIMARY, borderColor: BLUE_PRIMARY } : undefined}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* user message (after send) */}
              {sentMsg && <MsgUser>{sentMsg}</MsgUser>}

              {/* AI reply + inline form */}
              {showForm && selectedTpl && !generated && (
                <>
                  <MsgAI>
                    좋은 선택입니다! 해당 템플릿의 퀄리티를 유지하며 세부 내용을 수정해 드릴게요. 아래 폼에서 원하는 정보를 입력해 주세요.
                  </MsgAI>
                  <FormCard tpl={selectedTpl} onSubmit={onFormSubmit} />
                </>
              )}

              {/* generated images */}
              {generated && (
                <>
                  <MsgAI>
                    3가지 시안을 만들었어요. 마음에 드는 컷을 <b className="font-extrabold">베이스로 지정</b>하면 그 위에서 이어서 수정해 드릴게요.
                  </MsgAI>
                  <div className="flex gap-3 flex-wrap">
                    {GEN_IMAGES.map((g) => (
                      <ImageBubble key={g.id} img={g} isBase={base?.id === g.id} onSetBase={onSetBase} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* DOCK — pill row + composer */}
            <div className="px-5 py-3 border-t border-slate-200 bg-white flex flex-col gap-2.5">
              {/* asset pill row */}
              <div className="flex items-center gap-2 flex-wrap">
                <BasePill value={base} onRemove={() => setBase(null)} />
                <span className="w-px h-6 bg-slate-200 mx-0.5" />
                {refs.map((r) => (
                  <RefPill key={r.id} value={r} onRemove={() => setRefs((cur) => cur.filter((x) => x.id !== r.id))} />
                ))}
                {refs.length < 3 && <RefAddPill onClick={onPickRefs} disabled={refs.length >= 3} />}
                <input ref={refInputRef} type="file" accept="image/*" multiple className="hidden" onChange={onRefFiles} />
              </div>

              {/* composer — 60-30-10 white/gray, focus-only blue */}
              <div
                className="rounded-2xl transition focus-within:ring-1 focus-within:ring-blue-300 focus-within:border-blue-300"
                style={{ background: "#F4F6FA", border: "1px solid #EAEEF4" }}
              >
                <textarea
                  value={composer}
                  onChange={(e) => setComposer(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); onSend(); }
                  }}
                  placeholder={placeholder}
                  rows={2}
                  className="w-full px-4 pt-3 pb-2 text-[13px] text-slate-800 placeholder:text-slate-400 bg-transparent resize-none outline-none leading-relaxed"
                />
                <div className="flex items-center gap-3 px-3 pb-2 pt-1.5">
                  <button className="w-7 h-7 rounded-md text-slate-400 hover:bg-slate-200/60 flex items-center justify-center"><Icon name="paperclip" size={14} /></button>
                  <button className="w-7 h-7 rounded-md text-slate-400 hover:bg-slate-200/60 flex items-center justify-center"><Icon name="sparkles" size={14} /></button>
                  <button
                    onClick={onSend}
                    disabled={!composer.trim()}
                    className="ml-auto w-7 h-7 rounded-full flex items-center justify-center transition"
                    style={{ background: composer.trim() ? BLUE_PRIMARY : "#E2E8F0" }}
                  >
                    <Icon name="arrow-up" size={13} strokeWidth={2.4} stroke={composer.trim() ? "#fff" : "#94A3B8"} />
                  </button>
                </div>
              </div>

              <div className="text-center text-[10.5px] text-slate-400">
                생성된 이미지는 사실과 다를 수 있습니다. 결과를 사용 전 직접 확인해 주세요.
              </div>
            </div>
          </section>

          {/* CANVAS PANEL (~56%) */}
          <section className="flex-1 flex flex-col min-w-0 bg-white">
            <ResultHeader />
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
              {base ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-[360px] h-[360px] rounded-2xl shadow-md overflow-hidden"
                       style={{ background: base.preview }} />
                  <div className="text-[12.5px] text-slate-500">
                    현재 베이스 · <b className="text-slate-800">{base.label}</b>
                  </div>
                </div>
              ) : (
                <>
                  <span className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: SOFT, color: PRIMARY }}>
                    <Icon name="image" size={28} strokeWidth={1.8} />
                  </span>
                  <div className="text-[15px] font-black text-slate-900 tracking-tight">아직 결과가 없어요</div>
                  <div className="text-[12px] text-slate-400 text-center leading-relaxed">
                    좌측 채팅에서 템플릿을 선택하고 폼을 채우면<br/>여기에 결과 이미지가 표시됩니다.
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

window.StudioScreen = StudioScreen;
