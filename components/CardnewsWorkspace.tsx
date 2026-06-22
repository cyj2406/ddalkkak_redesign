"use client";

import React, { useState } from "react";
import {
  Undo2,
  Redo2,
  ChevronDown,
  ListChecks,
  Share2,
  Download,
  Sparkles,
  ArrowUp,
  Paperclip,
  Layers,
  Sparkle,
  Type,
  Square,
  Image as ImageIcon,
  Smile,
  Palette,
  Eraser,
  Grid,
  Check,
  Eye,
  Settings,
  ChevronLeft,
  MousePointer,
  Maximize2
} from "lucide-react";

interface CardnewsWorkspaceProps {
  workspaceTitle: string;
  isDarkMode: boolean;
  onClose: () => void;
  onOpenSkillModal?: () => void;
}

export default function CardnewsWorkspace({
  workspaceTitle,
  isDarkMode,
  onClose,
  onOpenSkillModal
}: CardnewsWorkspaceProps) {
  // Local States mirroring the screenshot
  const [workspaceState, setWorkspaceState] = useState<"idle" | "generating" | "generated" | "editor_open">("generated");
  const [activeCanvasTab, setActiveCanvasTab] = useState<"design" | "layers" | "theme">("layers");
  const [selectedElement, setSelectedElement] = useState<string>("main-title");
  const [promptText, setPromptText] = useState("좌측에 인물 측면, 자연스러운 코 라인을 강조한 클로즈업");
  const [mainTitle, setMainTitle] = useState("코 재수술");
  const [subTitle, setSubTitle] = useState("코수술");
  const [price, setPrice] = useState("275만원");
  const [tagline, setTagline] = useState("비주, 비순각을 고려한 올인원 코");
  const [bottomInfo, setBottomInfo] = useState("서울시 강남구 논현동 123-1");

  const [slides, setSlides] = useState([
    { id: 1, name: "카드 1" },
    { id: 2, name: "카드 2" },
    { id: 3, name: "카드 3" },
    { id: 4, name: "카드 4" },
    { id: 5, name: "카드 5" }
  ]);
  const [activeSlide, setActiveSlide] = useState(1);
  const [canvasZoom, setCanvasZoom] = useState(38);

  const [chatInputValue, setChatInputValue] = useState("");
  const [selectedVersionId, setSelectedVersionId] = useState("v2");
  const [isVersionDropdownOpen, setIsVersionDropdownOpen] = useState(false);
  const [versions, setVersions] = useState([
    {
      id: "v1",
      label: "버전 v1",
      time: "오후 12:30",
      prompt: "코수술 관련 카드뉴스 시안 만들어줘",
      mainTitle: "코수술 초안",
      subTitle: "초안",
      price: "250만원",
      tagline: "자연스러운 코성형",
      bottomInfo: "서울시 강남구 논현동 123-1",
      slides: [
        { id: 1, name: "카드 1" },
        { id: 2, name: "카드 2" },
        { id: 3, name: "카드 3" }
      ]
    },
    {
      id: "v2",
      label: "버전 v2",
      time: "오후 1:15",
      prompt: "좌측에 인물 측면, 자연스러운 코 라인을 강조한 클로즈업",
      mainTitle: "코 재수술",
      subTitle: "코수술",
      price: "275만원",
      tagline: "비주, 비순각을 고려한 올인원 코",
      bottomInfo: "서울시 강남구 논현동 123-1",
      slides: [
        { id: 1, name: "카드 1" },
        { id: 2, name: "카드 2" },
        { id: 3, name: "카드 3" },
        { id: 4, name: "카드 4" },
        { id: 5, name: "카드 5" }
      ]
    }
  ]);

  const handleLoadVersion = (verId: string) => {
    const ver = versions.find(v => v.id === verId);
    if (ver) {
      setSelectedVersionId(verId);
      setMainTitle(ver.mainTitle);
      setSubTitle(ver.subTitle);
      if (ver.price) setPrice(ver.price);
      if (ver.tagline) setTagline(ver.tagline);
      if (ver.bottomInfo) setBottomInfo(ver.bottomInfo);
      setSlides(ver.slides);
      setActiveSlide(1);
    }
  };

  const handleSendMessage = () => {
    if (!chatInputValue.trim()) return;
    const nextVerNum = versions.length + 1;
    const newVerId = `v${nextVerNum}`;
    
    // Simulate some edits based on prompt text
    let nextTitle = mainTitle;
    let nextSubTitle = subTitle;
    let nextSlides = [...slides];

    if (chatInputValue.includes("제목") || chatInputValue.includes("타이틀")) {
      nextTitle = "수정된 타이틀";
    }
    if (chatInputValue.includes("추가")) {
      nextSlides = [...slides, { id: slides.length + 1, name: `카드 ${slides.length + 1}` }];
    }

    const newVer = {
      id: newVerId,
      label: `버전 ${newVerId}`,
      time: new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" }),
      prompt: chatInputValue,
      mainTitle: nextTitle,
      subTitle: nextSubTitle,
      price: price,
      tagline: tagline,
      bottomInfo: bottomInfo,
      slides: nextSlides
    };

    setVersions([...versions, newVer]);
    setSelectedVersionId(newVerId);
    setMainTitle(nextTitle);
    setSubTitle(nextSubTitle);
    setSlides(nextSlides);
    setActiveSlide(1);
    setPromptText(chatInputValue);
    setChatInputValue("");
  };

  const handleAddSlide = () => {
    const newId = slides.length + 1;
    setSlides([...slides, { id: newId, name: `카드 ${newId}` }]);
    setActiveSlide(newId);
  };

  return (
    <div className={`flex-1 flex w-full h-[calc(100vh-64px)] overflow-hidden relative font-sans border-t ${
      isDarkMode 
        ? "bg-[#111318] border-[#2A3140]" 
        : "bg-slate-50 border-slate-100"
    }`}>

      {/* ==========================================
         2. CENTER PANEL (PROMPT & CHAT CONTROLS)
         ========================================== */}
      <div className={`h-full flex flex-col overflow-hidden transition-all duration-500 ease-in-out ${
        workspaceState === "editor_open" 
          ? "w-[360px] shrink-0 border-r" 
          : "flex-1 max-w-3xl mx-auto border-x"
      } ${
        isDarkMode ? "bg-[#171A21] border-white/5" : "bg-[#FAFBFD] border-[#E2E8F0]"
      }`}>
        {/* Header */}
        <div className={`h-14 px-5 flex items-center justify-between shrink-0 border-b ${
          isDarkMode ? "bg-[#1E232D] border-white/5" : "bg-white border-[#E2E8F0]"
        }`}>
          <span className={`text-[13.5px] font-black tracking-tight ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>
            자유 이미지 생성 작업 스페이스
          </span>
          <button 
            onClick={onClose}
            className={`px-3 py-1 rounded-full text-[10px] font-black tracking-tight flex items-center gap-1 border transition-all cursor-pointer ${
              isDarkMode 
                ? "bg-slate-800 border-white/5 text-slate-350 hover:bg-slate-700 hover:text-white" 
                : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
            }`}
          >
            ← 대시보드로
          </button>
        </div>

        {/* Chat History and Visual Detail Form (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5.5 scroll-container scrollbar-thin">
          
          {/* User Prompt Box */}
          {(workspaceState === "generated" || workspaceState === "editor_open" || workspaceState === "generating") && (
            <div className="flex justify-end w-full animate-in fade-in duration-300">
              <div className={`max-w-[85%] p-4 rounded-2xl rounded-tr-none text-[12.5px] font-bold leading-relaxed border select-text shadow-sm text-right ${
                isDarkMode 
                  ? "bg-[#1E232D] border-white/5 text-slate-200" 
                  : "bg-[#EFF6FF]/60 border-blue-100/50 text-slate-800"
              }`}>
                프롬프트: {promptText}
              </div>
            </div>
          )}

          {/* GENERATING STATE UI */}
          {workspaceState === "generating" && (
            <div className="flex gap-2.5 max-w-[85%] text-left animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white shadow-md shadow-blue-500/10">
                <Sparkles size={14} className="animate-spin" />
              </div>
              <div className="flex flex-col text-left w-full gap-3">
                <span className="text-[10px] font-black text-slate-400 mb-1 select-none">딸깍 AI 어시스턴트</span>
                
                {/* JSON Layout Plan Block */}
                <div className="p-4 rounded-2xl bg-[#0C0E12] border border-white/5 text-[#38BDF8] font-mono text-[11px] leading-relaxed shadow-inner overflow-hidden max-w-full">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2 text-slate-500 text-[9px] font-black select-none">
                    <span>LAYOUT_GENERATOR.JSON</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                  </div>
                  <pre className="whitespace-pre-wrap select-text animate-pulse">
{`{
  "style": "Regular-weight black Korean sans-serif, center-aligned",
  "template": "card_news_present_v2",
  "layers": [
    { "type": "background_image", "content": "clinic_aesthetic_concept" },
    { "type": "main_title", "content": "${mainTitle}" },
    { "type": "sub_title", "content": "${subTitle}" },
    { "type": "price", "content": "${price}" }
  ],
  "color_palette": ["#1E232D", "#3B63F6", "#FFFFFF"]
}`}
                  </pre>
                </div>

                {/* AI working status pill */}
                <div className={`p-3 rounded-xl border flex items-center gap-2 max-w-fit shadow-sm ${
                  isDarkMode ? "bg-[#1E232D] border-white/5 text-slate-200" : "bg-white border-slate-200 text-slate-800"
                }`}>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                  <span className="text-[10.5px] font-extrabold tracking-tight">
                    카드뉴스 이미지 및 레이아웃 스냅샷 생성 중...
                  </span>
                </div>

                {/* Skeleton placeholder card */}
                <div className={`w-full aspect-square rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 ${
                  isDarkMode ? "bg-[#161B22]/50 border-slate-800" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="w-8 h-8 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin" />
                  <span className="text-[11px] font-bold text-slate-500 select-none">레이아웃 배치 렌더링 중...</span>
                </div>
              </div>
            </div>
          )}

          {/* GENERATED / EDITOR OPEN STATE UI */}
          {(workspaceState === "generated" || workspaceState === "editor_open") && (
            <div className="flex gap-2.5 max-w-[85%] text-left animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 text-white shadow-md shadow-blue-500/10">
                <Sparkles size={14} />
              </div>
              <div className="flex flex-col text-left w-full gap-2">
                <span className="text-[10px] font-black text-slate-400 mb-1 select-none">딸깍 AI 어시스턴트</span>
                <div className={`p-4 rounded-2xl rounded-tl-none text-[12.5px] font-medium leading-relaxed border select-text shadow-sm ${
                  isDarkMode 
                    ? "bg-[#1E232D] border-white/5 text-slate-250" 
                    : "bg-white border-slate-200/80 text-slate-755"
                }`}>
                  요청하신 정보에 맞춰 최적의 이미지와 카드뉴스 생성을 성공적으로 완료했습니다! 아래 결과물 카드를 클릭해 확인하세요.
                </div>

                {/* Single Representative Inline Card (Claude style) */}
                <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 shadow-sm select-none transition-all duration-300 hover:border-blue-500/30 ${
                  isDarkMode 
                    ? "bg-[#1E232D] border-white/5 text-slate-200" 
                    : "bg-white border-slate-200 text-slate-850"
                }`}>
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Left: Thumbnail image with rounded corners */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-white/5 shadow-inner">
                      <img 
                        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=80&q=80" 
                        alt="Cardnews cover thumbnail"
                        className="w-full h-full object-cover filter brightness-90"
                      />
                    </div>
                    
                    {/* Center: Title & Subtitle */}
                    <div className="flex flex-col min-w-0 text-left">
                      <span className={`text-[12.5px] font-black truncate ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>
                        {mainTitle}
                      </span>
                      <span className="text-[10px] font-bold text-[#6D8FFF] tracking-wider uppercase truncate">
                        {subTitle}
                      </span>
                    </div>
                  </div>

                  {/* Right: Blue button */}
                  <button
                    onClick={() => {
                      setWorkspaceState("editor_open");
                      handleLoadVersion(selectedVersionId);
                    }}
                    className="h-8.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black rounded-lg cursor-pointer transition-all active:scale-95 whitespace-nowrap shadow-sm shadow-blue-500/10"
                  >
                    결과 보기
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Visual Detail form - Hidden when editor is open */}
          {workspaceState !== "editor_open" && workspaceState !== "generating" && (
            <div className={`p-5.5 rounded-2xl border text-left flex flex-col gap-4 select-none ${
              isDarkMode ? "bg-[#13161C] border-[#2A3140]" : "bg-white border-slate-200/80 shadow-sm"
            }`}>
              <div>
                <h4 className={`text-[13.5px] font-black tracking-tight ${isDarkMode ? "text-slate-100" : "text-slate-800"}`}>상세 프롬프트</h4>
                <p className={`text-[10px] font-semibold mt-1 leading-relaxed ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                  템플릿 고유 프롬프트가 미리 입력되어 있어요. 자유롭게 수정하세요.
                </p>
              </div>

              {/* Prompt description input: 이미지 설명 */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[11px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>이미지 설명</span>
                <textarea 
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className={`w-full h-20 rounded-xl border p-3.5 text-[12.5px] font-medium outline-none focus:ring-0 resize-none ${
                    isDarkMode 
                      ? "bg-[#0C0E12] border-white/5 text-slate-200 placeholder-slate-600 focus:border-blue-500/50" 
                      : "bg-[#F8FAFC] border-slate-200 text-slate-800 focus:border-[#3B63F6]/50"
                  }`}
                />
              </div>

              {/* Divider: 세부 프롬프트 */}
              <div className="flex items-center gap-2 my-1 select-none">
                <div className={`h-[1px] flex-1 ${isDarkMode ? "bg-white/10" : "bg-slate-100"}`} />
                <span className={`text-[9.5px] font-black tracking-wider uppercase ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                  세부 프롬프트
                </span>
                <div className={`h-[1px] flex-1 ${isDarkMode ? "bg-white/10" : "bg-slate-100"}`} />
              </div>

              {/* 작은 제목 */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[11px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>작은 제목</span>
                <input 
                  type="text" 
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  className={`w-full h-9.5 rounded-xl border px-3.5 text-[12.5px] font-medium outline-none focus:ring-0 ${
                    isDarkMode 
                      ? "bg-[#0C0E12] border-white/5 text-slate-200 focus:border-[#3B63F6]/50" 
                      : "bg-[#F8FAFC] border-slate-250 text-slate-800 focus:border-[#3B63F6]/50"
                  }`}
                />
              </div>

              {/* 큰 제목 */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[11px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>큰 제목</span>
                <input 
                  type="text" 
                  value={mainTitle}
                  onChange={(e) => setMainTitle(e.target.value)}
                  className={`w-full h-9.5 rounded-xl border px-3.5 text-[12.5px] font-medium outline-none focus:ring-0 ${
                    isDarkMode 
                      ? "bg-[#0C0E12] border-white/5 text-slate-200 focus:border-[#3B63F6]/50" 
                      : "bg-[#F8FAFC] border-slate-250 text-slate-800 focus:border-[#3B63F6]/50"
                  }`}
                />
              </div>

              {/* 가격 */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[11px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>가격</span>
                <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-full h-9.5 rounded-xl border px-3.5 text-[12.5px] font-medium outline-none focus:ring-0 ${
                    isDarkMode 
                      ? "bg-[#0C0E12] border-white/5 text-slate-200 focus:border-[#3B63F6]/50" 
                      : "bg-[#F8FAFC] border-slate-250 text-slate-800 focus:border-[#3B63F6]/50"
                  }`}
                />
              </div>

              {/* 태그라인 */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[11px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>태그라인</span>
                <input 
                  type="text" 
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className={`w-full h-9.5 rounded-xl border px-3.5 text-[12.5px] font-medium outline-none focus:ring-0 ${
                    isDarkMode 
                      ? "bg-[#0C0E12] border-white/5 text-slate-200 focus:border-[#3B63F6]/50" 
                      : "bg-[#F8FAFC] border-slate-250 text-slate-800 focus:border-[#3B63F6]/50"
                  }`}
                />
              </div>

              {/* 하단 정보 */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[11px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>하단 정보</span>
                <input 
                  type="text" 
                  value={bottomInfo}
                  onChange={(e) => setBottomInfo(e.target.value)}
                  className={`w-full h-9.5 rounded-xl border px-3.5 text-[12.5px] font-medium outline-none focus:ring-0 ${
                    isDarkMode 
                      ? "bg-[#0C0E12] border-white/5 text-slate-200 focus:border-[#3B63F6]/50" 
                      : "bg-[#F8FAFC] border-slate-250 text-slate-800 focus:border-[#3B63F6]/50"
                  }`}
                />
              </div>

              {/* 이미지 생성하기 Button */}
              <button
                onClick={() => {
                  setWorkspaceState("generating");
                  setTimeout(() => {
                    const nextVerNum = versions.length + 1;
                    const newVerId = `v${nextVerNum}`;
                    const newVer = {
                      id: newVerId,
                      label: `버전 ${newVerId}`,
                      time: new Date().toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" }),
                      prompt: promptText,
                      mainTitle: mainTitle,
                      subTitle: subTitle,
                      price: price,
                      tagline: tagline,
                      bottomInfo: bottomInfo,
                      slides: [...slides]
                    };
                    setVersions(prev => [...prev, newVer]);
                    setSelectedVersionId(newVerId);
                    setWorkspaceState("generated");
                  }, 2000);
                }}
                className="w-full mt-2 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98 shadow-md shadow-blue-500/10"
              >
                <Sparkle size={14} className="animate-pulse" />
                <span>이미지 생성하기</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Chat Input Composer */}
        <div className={`p-4 border-t ${
          isDarkMode ? "border-white/5 bg-[#171A21]" : "bg-white border-[#E2E8F0]"
        }`}>
          <div className={`rounded-2xl border p-3 flex flex-col gap-2 ${
            isDarkMode ? "border-white/5 bg-[#1E232D]" : "bg-[#F8FAFC] border-slate-200"
          }`}>
            <textarea 
              value={chatInputValue}
              onChange={(e) => setChatInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="무엇을 만들까요? 자유롭게 요청해 보세요."
              className="w-full bg-transparent border-none outline-none resize-none text-[12.5px] font-medium placeholder-slate-400 text-slate-200 focus:ring-0 min-h-[48px]"
            />
            <div className="flex items-center justify-between mt-1 shrink-0 select-none">
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-400 cursor-pointer">
                  <Paperclip size={13.5} />
                </button>
                <button 
                  onClick={onOpenSkillModal}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-400 cursor-pointer" 
                  title="스킬 선택"
                >
                  <Sparkles size={13.5} className="text-amber-500" />
                </button>
              </div>
              <button 
                onClick={handleSendMessage}
                className="w-8 h-8 rounded-full bg-[#3B63F6] hover:bg-blue-600 text-white flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-95"
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================
         EDITOR PANEL CONTAINER (LNB + Canvas + Properties Panel)
         ========================================== */}
      <div className={`flex h-full transition-all duration-500 ease-in-out ${
        workspaceState === "editor_open" 
          ? "flex-1 translate-x-0 opacity-100" 
          : "w-0 opacity-0 translate-x-12 pointer-events-none overflow-hidden"
      }`}>
        {/* ==========================================
           1. LEFTMOST ASSETS SIDEBAR (LNB/Assets)
           ========================================== */}
        <div className={`w-[70px] h-full shrink-0 border-r flex flex-col items-center py-5 justify-between select-none ${
          isDarkMode ? "bg-[#13161C] border-white/5" : "bg-white border-slate-200"
        }`}>
          <div className="flex flex-col items-center gap-4.5 w-full">
            {[
              { id: "select", icon: MousePointer, label: "선택", active: true },
              { id: "text", icon: Type, label: "텍스트" },
              { id: "shape", icon: Square, label: "도형" },
              { id: "image", icon: ImageIcon, label: "이미지" },
              { id: "icon", icon: Smile, label: "아이콘" },
              { id: "draw", icon: Palette, label: "그리기" },
              { id: "eraser", icon: Eraser, label: "지우개" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`w-13 h-13 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    item.active
                      ? isDarkMode
                        ? "bg-blue-950/40 text-[#6D8FFF] border border-blue-900/30"
                        : "bg-[#EFF6FF] text-[#3B63F6] border border-blue-100"
                      : isDarkMode
                        ? "text-slate-450 hover:bg-[#1E232D]/55 hover:text-slate-200"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <Icon size={17} />
                  <span className="text-[9.5px] font-black tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* AI quick controls bottom */}
          <div className="flex flex-col items-center gap-3 w-full border-t border-slate-150 dark:border-white/5 pt-4.5">
            <button className={`w-13 h-10 rounded-xl flex items-center justify-center flex-col gap-0.5 cursor-pointer text-[#8B5CF6] ${
              isDarkMode ? "hover:bg-purple-950/20" : "hover:bg-purple-50"
            }`}>
              <Sparkle size={15} className="animate-pulse" />
              <span className="text-[8.5px] font-black">AI 수정</span>
            </button>
            <button className={`w-13 h-10 rounded-xl flex items-center justify-center flex-col gap-0.5 cursor-pointer text-blue-500 ${
              isDarkMode ? "hover:bg-blue-950/20" : "hover:bg-blue-50"
            }`}>
              <Layers size={15} />
              <span className="text-[8.5px] font-black">배경 제거</span>
            </button>
          </div>
        </div>

      {/* ==========================================
         3. CENTER GRID WORKSPACE (1:1 AIRY CANVAS)
         ========================================== */}
      <div className="flex-1 flex flex-col bg-[#1E232D] relative overflow-hidden select-none">
        
        {/* 3-1. Mini Toolbar */}
        <div className="h-14 px-6 flex items-center justify-between border-b border-slate-800 bg-[#13161C]/80 z-10 shrink-0">
          {/* Left: Undo/Redo & Zoom */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#0C0E12] border border-white/5 rounded-lg overflow-hidden">
              <button className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-slate-200 cursor-pointer" title="실행 취소">
                <Undo2 size={13.5} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-white/5 text-slate-400 hover:text-slate-200 cursor-pointer" title="재실행">
                <Redo2 size={13.5} />
              </button>
            </div>
            
            <div className="flex items-center bg-[#0C0E12] border border-white/5 px-2.5 h-8 rounded-lg text-slate-300 text-[11.5px] font-bold gap-1 cursor-pointer hover:bg-[#1E232D]">
              <span>{canvasZoom}%</span>
              <ChevronDown size={11} className="text-slate-500" />
            </div>

            <button className="w-8 h-8 bg-[#0C0E12] border border-white/5 hover:bg-[#1E232D] rounded-lg text-slate-400 flex items-center justify-center cursor-pointer">
              <Maximize2 size={13} />
            </button>

            {/* Pill-shaped Mini Editor button */}
            <button className="h-8 px-3.5 rounded-full bg-[#0C0E12] border border-white/5 text-slate-350 hover:text-slate-200 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#1E232D] transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B63F6]"></span>
              <span>미니 에디터</span>
            </button>

            {/* Pill-shaped Auto Save indicator button */}
            <button className="h-8 px-3.5 rounded-full bg-[#0C0E12] border border-white/5 text-slate-350 hover:text-slate-200 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#1E232D] transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              <span>자동 저장</span>
            </button>

            {/* Version Dropdown trigger button styled identically */}
            <div className="relative">
              <button 
                onClick={() => setIsVersionDropdownOpen(!isVersionDropdownOpen)}
                className="h-8 px-3.5 rounded-full bg-[#0C0E12] border border-white/5 text-[#6D8FFF] text-[11px] font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#1E232D] transition-all"
              >
                <span>버전 {selectedVersionId}</span>
                <ChevronDown size={11} className="text-slate-500" />
              </button>

              {isVersionDropdownOpen && (
                <div className="absolute left-0 mt-2 w-80 rounded-xl border p-2.5 shadow-xl flex flex-col gap-2 z-50 bg-[#1B2028] border-slate-800 text-white animate-in slide-in-from-top-1.5 duration-200">
                  <div className="px-2 py-1 text-[10px] font-black text-slate-500 uppercase tracking-wider border-b border-slate-800/80">저장 지점 버전 목록</div>
                  <div className="max-h-56 overflow-y-auto pr-0.5 flex flex-col gap-1.5">
                    {versions.map((ver) => (
                      <button
                        key={ver.id}
                        onClick={() => {
                          handleLoadVersion(ver.id);
                          setIsVersionDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-lg text-left cursor-pointer transition-all flex flex-col gap-1 hover:bg-slate-800/70 ${
                          ver.id === selectedVersionId ? "bg-blue-950/40 text-[#6D8FFF] border border-blue-900/30" : "border border-transparent"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11.5px] font-black">
                          <span>{ver.label}</span>
                          <span className="text-slate-500 font-semibold">{ver.time}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium truncate w-full">
                          {ver.prompt}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Guideline, Share, Export */}
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 rounded-lg bg-[#0C0E12] border border-white/5 hover:bg-[#1E232D] text-slate-350 hover:text-slate-200 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer">
              <Grid size={13} />
              <span>가이드라인</span>
            </button>
            <button className="h-8 px-3 rounded-lg bg-[#0C0E12] border border-white/5 hover:bg-[#1E232D] text-slate-355 hover:text-slate-200 text-[11px] font-bold flex items-center gap-1.5 cursor-pointer">
              <Share2 size={13} />
              <span>공유</span>
            </button>
            <button className="h-8 px-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10">
              <Download size={13} />
              <span>내보내기</span>
            </button>
          </div>
        </div>

        {/* 3-2. Canvas Center Workspace (Airy space) */}
        <div className="flex-1 flex items-center justify-center p-12 pb-32 overflow-hidden min-h-0 bg-[#0C0E12]/95 relative">
          
          {/* 1:1 Square Canvas */}
          <div 
            className="aspect-square w-full max-h-[85%] max-w-[85%] bg-slate-900 rounded-lg shadow-[0_24px_70px_rgba(0,0,0,0.55)] overflow-hidden relative cursor-default transition-all border border-white/5 select-none"
            style={{ transform: `scale(${canvasZoom / 100 + 0.6})` }}
          >
            {/* The layered background image exactly matching Screenshot 1 */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1080&q=80" 
                alt="Library cardnews background"
                className="w-full h-full object-cover filter brightness-[0.4]"
              />
            </div>

            {/* Editorial Elements Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-12 text-left">
              {/* Upper badge overlay */}
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full select-none">추천 도서 12선</span>
              </div>

              {/* Main title text overlay matching screenshot */}
              <div className="my-auto flex flex-col justify-center gap-2">
                <h1 className="text-[52px] font-black text-white leading-none tracking-tight drop-shadow-md select-text">
                  {mainTitle}
                </h1>
                <span className="text-[12.5px] font-black tracking-widest text-[#6D8FFF] select-text">
                  {subTitle}
                </span>
              </div>

              {/* Footer details */}
              <div className="flex items-center justify-between border-t border-white/10 pt-4.5 text-[9px] font-bold text-slate-400 select-none">
                <span>딸깍 카드뉴스 GENERATOR</span>
                <span>PAGE {activeSlide} OF {slides.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-3. BOTTOM PAGE/SCENE NAVIGATOR (Airy style matching screenshot) */}
        <div className="absolute bottom-0 left-0 right-0 h-[88px] bg-[#13161C]/95 border-t border-white/5 flex items-center justify-between px-6 z-10 select-none">
          {/* Left spacer / scene info */}
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
            <button className="h-8.5 px-3 rounded-lg bg-slate-900 border border-white/5 hover:bg-[#1E232D] text-slate-300 text-[11.5px] font-extrabold cursor-pointer flex items-center gap-1.5">
              <span>템플릿</span>
            </button>
            <span className="text-slate-500">•</span>
            <span className="text-[#3B63F6] font-extrabold">{slides.length}장</span>
          </div>

          {/* Center Thumbnails slider list */}
          <div className="flex-1 flex justify-center items-center gap-3 mx-6 overflow-x-auto">
            {slides.map((s) => (
              <div 
                key={s.id}
                onClick={() => setActiveSlide(s.id)}
                className={`h-14 px-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 shrink-0 relative ${
                  s.id === activeSlide
                    ? "bg-[#3B63F6]/20 border-[#3B63F6] text-white"
                    : "bg-[#1E232D] border-white/5 text-slate-450 hover:bg-slate-800"
                }`}
              >
                {/* 1:1 Small preview thumbnail */}
                <div className="w-8 h-8 rounded bg-slate-900 border border-white/5 overflow-hidden flex items-center justify-center shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=40&q=80" 
                    className="w-full h-full object-cover brightness-[0.5]"
                  />
                </div>
                <span className="text-[11px] font-extrabold">{s.name}</span>
                
                {slides.length > 1 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlides(slides.filter((item) => item.id !== s.id));
                      if (activeSlide === s.id) setActiveSlide(1);
                    }}
                    className="w-4 h-4 rounded-full bg-slate-900 hover:bg-red-500 flex items-center justify-center text-white text-[8px] font-bold absolute -top-1.5 -right-1.5 shadow-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {/* Page Add trigger button */}
            <button 
              onClick={handleAddSlide}
              className="w-14 h-14 rounded-xl border border-dashed border-slate-700 hover:border-slate-500 flex items-center justify-center text-slate-500 hover:text-slate-350 cursor-pointer active:scale-95 transition-all shrink-0"
              title="새 카드 추가"
            >
              <span className="text-[20px] font-light">+</span>
            </button>
          </div>

          {/* Right layout metadata */}
          <div className="flex items-center gap-2 text-slate-455 text-[10.5px] font-extrabold tracking-wider">
            <span>1:1 1080 x 1080 px</span>
            <span className="text-slate-750">|</span>
            <span>72 DPI</span>
          </div>
        </div>

      </div>

      {/* ==========================================
         4. RIGHT PANEL (PROPERTIES/EDITOR EDITOR)
         ========================================== */}
      <div className={`w-[260px] h-full shrink-0 border-l flex flex-col select-none ${
        isDarkMode ? "bg-[#13161C] border-white/5" : "bg-white border-[#E2E8F0]"
      }`}>
        {/* LNB Tab Triggers */}
        <div className={`h-12 flex border-b shrink-0 ${
          isDarkMode ? "bg-[#171A21] border-white/5" : "bg-[#F8FAFC] border-slate-200"
        }`}>
          {["design", "layers", "theme"].map((tab) => {
            const isAct = activeCanvasTab === tab;
            const label = tab === "design" ? "디자인" : tab === "layers" ? "레이어" : "테마";
            return (
              <button
                key={tab}
                onClick={() => setActiveCanvasTab(tab as any)}
                className={`flex-1 h-full text-[12px] font-extrabold tracking-tight relative cursor-pointer transition-all ${
                  isAct 
                    ? isDarkMode ? "text-[#6D8FFF] font-black" : "text-[#3B63F6] font-black"
                    : "text-slate-450 hover:text-slate-200"
                }`}
              >
                {label}
                {isAct && (
                  <div className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full ${
                    isDarkMode ? "bg-[#6D8FFF]" : "bg-[#3B63F6]"
                  }`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 scrollbar-thin">
          {activeCanvasTab === "layers" ? (
            /* LAYER LIST TAB CONTENT */
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mt-1 shrink-0">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">단일 레이어 목록</span>
                <button className="text-[9.5px] font-bold text-slate-400 hover:text-slate-200 cursor-pointer">초기화</button>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { id: "badge", name: "배지 텍스트", desc: "24px · Pretendard", isText: true },
                  { id: "ref-badge", name: "참조 배지", desc: "240 x 64", isText: false },
                  { id: "sub-title", name: "서브 타이틀", desc: "36px · Pretendard", isText: true },
                  { id: "main-title", name: "메인 타이틀", desc: "200px · Pretendard", isText: true, selected: true },
                  { id: "bg-image", name: "생성 이미지", desc: "1080 x 1080", isText: false }
                ].map((lyr) => (
                  <div 
                    key={lyr.id}
                    onClick={() => setSelectedElement(lyr.id)}
                    className={`p-3 rounded-2xl flex items-center justify-between border cursor-pointer transition-all ${
                      lyr.selected || selectedElement === lyr.id
                        ? isDarkMode
                          ? "bg-[#1E232D] border-[#6D8FFF]/30 text-white"
                          : "bg-[#EFF6FF] border-[#3B63F6]/25 text-[#3B63F6]"
                        : "bg-slate-800/10 dark:bg-slate-900/30 border-transparent text-slate-400 hover:bg-slate-800/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-slate-455 ${
                        isDarkMode ? "bg-slate-900 border border-white/5" : "bg-slate-50 border border-slate-100"
                      }`}>
                        {lyr.isText ? <Type size={13.5} /> : <ImageIcon size={13.5} />}
                      </div>
                      <div className="flex flex-col text-left truncate">
                        <span className="text-[11.5px] font-black truncate">{lyr.name}</span>
                        <span className="text-[9px] font-semibold text-slate-500 mt-0.5 truncate">{lyr.desc}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/5 cursor-pointer">
                        <Eye size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom purple credit hint */}
              <div className="bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-4 rounded-2xl text-left mt-3 select-text shadow-sm">
                <span className="text-[11px] font-black text-[#A78BFA] block leading-snug">이미지를 레이어로 분리</span>
                <p className="text-[10px] font-medium text-slate-400 mt-1 leading-normal">
                  시안 텍스트·메인 이미지 아이아웃을 완벽히 격리해 드립니다. · 6 크레딧 소모
                </p>
              </div>
            </div>
          ) : activeCanvasTab === "design" ? (
            /* DESIGN OPTIONS TAB CONTENT */
            <div className="flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between shrink-0">
                <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">속성 제어</span>
              </div>

              {selectedElement === "main-title" ? (
                /* Active Text properties exactly matching screenshot 5 */
                <div className="flex flex-col gap-4.5">
                  <div className="bg-slate-800/20 dark:bg-slate-900/30 p-3.5 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">선택된 요소</span>
                    <span className="text-[12.5px] font-black text-slate-100 flex items-center gap-1.5">
                      <Type size={14} className="text-blue-500" />
                      <span>메인 타이틀 텍스트</span>
                    </span>
                  </div>

                  {/* Size and Position controls */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10.5px] font-extrabold text-slate-455">크기 / 위치</span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1.5 bg-[#0C0E12] border border-white/5 px-2.5 h-8 rounded-lg text-slate-350 text-[11px] font-extrabold">
                        <span className="text-slate-500">X</span>
                        <input type="number" defaultValue={80} className="w-full bg-transparent border-none text-right focus:outline-none" />
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#0C0E12] border border-white/5 px-2.5 h-8 rounded-lg text-slate-350 text-[11px] font-extrabold">
                        <span className="text-slate-500">Y</span>
                        <input type="number" defaultValue={96} className="w-full bg-transparent border-none text-right focus:outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Typography Font Selection */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10.5px] font-extrabold text-slate-455">타이포그래피</span>
                    <div className="flex items-center justify-between bg-[#0C0E12] border border-white/5 px-3 h-8.5 rounded-lg text-slate-200 text-[11.5px] font-extrabold cursor-pointer hover:bg-[#1E232D]">
                      <span>Pretendard</span>
                      <ChevronDown size={12} className="text-slate-500" />
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center bg-[#0C0E12] border border-white/5 rounded-lg overflow-hidden flex-1 justify-between">
                        <button className="h-8.5 flex-1 hover:bg-white/5 text-slate-400 font-extrabold text-[12px]">B</button>
                        <button className="h-8.5 flex-1 hover:bg-white/5 text-slate-400 font-extrabold text-[12px] italic">I</button>
                        <button className="h-8.5 flex-1 hover:bg-white/5 text-slate-400 font-extrabold text-[12px] underline">U</button>
                      </div>
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10.5px] font-extrabold text-slate-455">글자색</span>
                    <div className="flex items-center justify-between bg-[#0C0E12] border border-white/5 px-3 h-8.5 rounded-lg text-slate-200 text-[11.5px] font-extrabold">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white rounded border border-white/10" />
                        <span>#FFFFFF</span>
                      </div>
                      <ChevronDown size={12} className="text-slate-500" />
                    </div>
                  </div>
                </div>
              ) : (
                /* Unselected state matching Screenshot 2/3 */
                <div className="flex flex-col items-center py-10 text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400">
                    <MousePointer size={18} />
                  </div>
                  <span className="text-[12px] font-extrabold text-slate-300">요소를 선택해 보세요</span>
                  <p className="text-[10.5px] font-medium text-slate-500 leading-normal max-w-[180px]">
                    캔버스에서 텍스트, 도형, 이미지를 클릭하면 속성을 편집할 수 있어요.
                  </p>
                  
                  <div className="flex flex-col gap-2 w-full mt-4">
                    <button className="w-full h-8.5 rounded-xl border border-white/5 bg-slate-900 hover:bg-[#1E232D] text-slate-350 text-[11px] font-extrabold cursor-pointer">T 텍스트 추가</button>
                    <button className="w-full h-8.5 rounded-xl border border-white/5 bg-slate-900 hover:bg-[#1E232D] text-slate-350 text-[11px] font-extrabold cursor-pointer">도형 추가</button>
                    <button className="w-full h-8.5 rounded-xl border border-white/5 bg-slate-900 hover:bg-[#1E232D] text-slate-350 text-[11px] font-extrabold cursor-pointer">아이콘 추가</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* THEME / PALETTE OPTIONS TAB CONTENT */
            <div className="flex flex-col gap-4 text-left">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest">배경 테마 / 스타일</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {["금융 블루", "럭셔리 골드", "네추럴 민트", "차분한 핑크"].map((themeName) => (
                  <div key={themeName} className="p-3 bg-slate-900 border border-white/5 rounded-xl hover:border-slate-600 transition-all cursor-pointer">
                    <div className="h-6 w-full rounded bg-gradient-to-r from-blue-600 to-indigo-500 mb-2" />
                    <span className="text-[10.5px] font-bold text-slate-300 block">{themeName}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
      </div>

    </div>
  );
}
