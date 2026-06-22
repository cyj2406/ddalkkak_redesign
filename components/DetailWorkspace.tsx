"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Columns,
  Share2,
  Upload,
  MoreHorizontal,
  Sparkles,
  Paperclip,
  ArrowUp,
  Wand2,
  Layers,
  LayoutGrid,
  FileImage
} from "lucide-react";

interface DetailWorkspaceProps {
  workspaceTitle: string;
  isDarkMode: boolean;
  onClose: () => void;
}

export default function DetailWorkspace({
  workspaceTitle,
  isDarkMode,
  onClose
}: DetailWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"slide" | "all">("all");
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [chatInputValue, setChatInputValue] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // Slide pagination (1 to 7)
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 7;

  // Form States
  const [productName, setProductName] = useState("아쿠아 글로우 스킨부스터");
  const [productDesc, setProductDesc] = useState("피부 속 수분길을 여는 7일의 기적, 아쿠아 글로우 스킨부스터");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Chat History
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "ai",
      text: "안녕하세요, 최유정님! 판매할 제품 정보를 알려주시면\nAI가 상세페이지 섹션을 자동으로 구성해 드릴게요."
    },
    {
      sender: "user",
      text: "아쿠아 글로우 스킨부스터 상세페이지를 만들어줘."
    },
    {
      sender: "ai",
      text: "좋아요! 아래 폼에 제품 정보를 입력하면 섹션별로 구성해 드릴게요."
    }
  ]);

  const handleGenerateContent = () => {
    setHasGenerated(true);
    setChatHistory(prev => [
      ...prev,
      {
        sender: "user",
        text: `상세페이지 생성 요청:\n- 제품명: ${productName}\n- 설명: ${productDesc}\n- 이미지 첨부 여부: ${uploadedImage ? "예" : "아니오"}`
      },
      {
        sender: "ai",
        text: `아쿠아 글로우 스킨부스터의 핵심 셀링 포인트에 맞춘 7페이지 분량의 상세페이지 아웃라인 및 세로형 모바일 최적화 미리보기를 완성했습니다! 우측 탭을 눌러 슬라이드 단위 혹은 전체 구조를 살펴보세요.`
      }
    ]);
  };

  const handleSendCustomMsg = () => {
    if (!chatInputValue.trim()) return;
    const msg = chatInputValue;
    setChatInputValue("");
    setChatHistory(prev => [...prev, { sender: "user", text: msg }]);

    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          sender: "ai",
          text: `추가 반영 완료: 요청하신 '${msg}' 내용을 상세페이지 레이아웃 및 텍스트에 적용했습니다.`
        }
      ]);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  // Content segments of the beauty cosmetics product landing / detail page
  const slidesData = [
    {
      badge: "INTRO",
      title: "7일의 기적, 피부 속 수분길을 열다",
      subTitle: "아쿠아 글로우 스킨부스터",
      desc: "피부 속 깊은 곳까지 촉촉함을 전하는 고수분 솔루션",
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80",
    },
    {
      badge: "PROBLEM",
      title: "아무리 발라도 건조한 피부, 원인은?",
      subTitle: "피부 속 닫혀버린 수분 통로",
      desc: "표면에만 머무는 수분은 금방 증발합니다. 세포막 사이의 '수분길(Aquaporin)'이 열려야 진짜 보습이 시작됩니다.",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80"
    },
    {
      badge: "INGREDIENT",
      title: "단 3가지 핵심 성분으로 완성한 수분 과학",
      subTitle: "트리플 하이드라 부스팅 포뮬러",
      desc: "히알루론산으로 수분 충전, 판테놀로 수분 잠금, 그리고 글리세릴 글루코사이드로 수분길 전격 활성화!",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
    },
    {
      badge: "CLINICAL",
      title: "7일간 입증된 놀라운 수분율 변화",
      subTitle: "피부 수분 밀도 +148% 증가",
      desc: "인체적용시험 결과 피부 겉보습 뿐만 아니라 2.5mm 깊이의 속보습까지 단 일주일 만에 즉각적 향상 입증.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80"
    },
    {
      badge: "TEXTURE",
      title: "끈적임 없이 스며드는 고농축 워터 에센스",
      subTitle: "부드럽고 가벼운 피니시",
      desc: "모공을 막지 않는 오일리함 없는 텍스처로, 롤링하는 순간 물방울처럼 터져 매끄럽게 밀착됩니다.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80"
    },
    {
      badge: "HOW TO USE",
      title: "아쿠아 글로우 케어 솔루션 가이드",
      subTitle: "데일리 3단계 수분 채움 루틴",
      desc: "1. 세안 직후 결을 정돈합니다. 2. 앰플 3방울을 고르게 도포해 흡수시킵니다. 3. 수분 크림을 얇게 덮어 잠금막을 씌웁니다.",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80"
    },
    {
      badge: "SPECIAL OFFER",
      title: "지금 경험해보세요, 차원이 다른 촉촉함",
      subTitle: "7일 키트 특별 한정 출시",
      desc: "피부 속 수분길을 여는 첫걸음, 아쿠아 글로우 스킨부스터 스타터 팩 30% 한정 할인 이벤트 진행 중.",
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className={`flex-1 flex w-full h-[calc(100vh-64px)] overflow-hidden relative font-sans border-t ${
      isDarkMode 
        ? "bg-[#111318] border-[#2A3140]" 
        : "bg-slate-50 border-slate-100"
    }`}>
      {/* Left Pane: Chat Room & Product Outline Form */}
      <div className={`flex flex-col h-full overflow-hidden border-r shrink-0 transition-all duration-300 ${
        isRightPanelCollapsed ? "w-full" : "w-[40%]"
      } ${
        isDarkMode
          ? "bg-[#171A21] border-[#2A3140]"
          : "bg-[#FAFBFD] border-[#E2E8F0]"
      }`}>
        {/* Header */}
        <div className={`h-14 px-6 flex items-center justify-between shrink-0 border-b relative ${
          isDarkMode
            ? "bg-[#1E232D] border-[#2A3140]"
            : "bg-white border-[#E2E8F0]"
        }`}>
          {/* Back button */}
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-600 ${
              isDarkMode ? "hover:bg-[#252B36] hover:text-white" : "hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Center Title */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className={`text-[13.5px] font-extrabold tracking-tight ${
              isDarkMode ? "text-[#F8FAFC]" : "text-slate-850"
            }`}>
              {productName} 상세페이지
            </span>
          </div>

          <div className="w-8" />
        </div>

        {/* Form and Chat History Area (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {chatHistory.map((msg, i) => {
            const isAI = msg.sender === "ai";
            return (
              <div key={i} className={`flex flex-col ${isAI ? "items-start" : "items-end"} w-full animate-in fade-in duration-300`}>
                <div className="max-w-[85%]">
                  <div className={`px-4.5 py-3 rounded-2xl text-[13px] font-semibold leading-relaxed tracking-tight shadow-sm select-text whitespace-pre-line ${
                    isAI 
                      ? isDarkMode
                        ? "bg-[#1E232D] border-[#2A3140] text-[#F8FAFC] rounded-tl-sm"
                        : "bg-white border border-slate-100 text-slate-850 rounded-tl-sm" 
                      : isDarkMode
                        ? "bg-slate-850 border border-slate-700 text-[#F8FAFC] rounded-tr-sm"
                        : "bg-[#EFF6FF] border border-[#DBEAFE] text-slate-800 rounded-tr-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Content Config Form Card */}
          <div className={`p-5 rounded-2xl border text-left flex flex-col gap-4.5 select-none shadow-sm ${
            isDarkMode ? "bg-[#13161C] border-[#2A3140]" : "bg-white border-slate-200"
          }`}>
            <div className="flex flex-col">
              <h4 className={`text-[13.5px] font-extrabold tracking-tight ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-850"}`}>
                상세페이지 내용 구성
              </h4>
              <span className={`text-[10px] font-bold mt-1 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                제품 정보를 입력하면 AI가 상세페이지 내용을 자동으로 구성합니다.
              </span>
            </div>

            {/* Product Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                제품명
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="예: 에어핏 365 밴딩 와이드 슬랙스"
                className={`w-full h-9.5 rounded-xl border px-3.5 text-[12px] font-bold outline-none focus:ring-0 ${
                  isDarkMode 
                    ? "bg-[#0C0E12] border-[#2A3140] text-[#F8FAFC] focus:border-[#6D8FFF]/50" 
                    : "bg-[#F8FAFC] border-slate-200 text-slate-800 focus:border-blue-400/50"
                }`}
              />
            </div>

            {/* Product Description Text Area */}
            <div className="flex flex-col gap-1.5">
              <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                제품 설명 (선택)
              </label>
              <textarea 
                value={productDesc}
                onChange={(e) => setProductDesc(e.target.value)}
                placeholder="예: 면 100% 밴딩 와이드핏 사계절용 슬랙스"
                className={`w-full h-20 rounded-xl border p-3.5 text-[12.5px] font-semibold outline-none resize-none focus:ring-0 ${
                  isDarkMode 
                    ? "bg-[#0C0E12] border-[#2A3140] text-[#F8FAFC] placeholder-slate-600 focus:border-[#6D8FFF]/50" 
                    : "bg-[#F8FAFC] border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-400/50"
                }`}
              />
            </div>

            {/* Product Image Upload Box */}
            <div className="flex flex-col gap-1.5">
              <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                제품 이미지 (선택)
              </label>
              <label className={`w-full h-18.5 rounded-xl border border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                isDarkMode 
                  ? "bg-[#0C0E12] border-[#2A3140] hover:bg-[#1E232D]" 
                  : "bg-[#F8FAFC] border-slate-250 hover:bg-slate-100/50"
              }`}>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
                {uploadedImage ? (
                  <div className="flex items-center gap-2">
                    <img src={uploadedImage} alt="업로드 이미지" className="w-9 h-9 rounded-lg object-cover border" />
                    <span className={`text-[11.5px] font-bold ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-700"}`}>이미지 탑재 완료</span>
                  </div>
                ) : (
                  <>
                    <Upload size={16} className={isDarkMode ? "text-slate-500" : "text-slate-400"} />
                    <span className={`text-[11px] font-bold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                      제품 이미지 업로드 (없으면 AI가 자동 생성)
                    </span>
                  </>
                )}
              </label>
            </div>

            {/* Generate Trigger button */}
            <button
              onClick={handleGenerateContent}
              className={`w-full h-10 rounded-xl font-extrabold text-[12.5px] flex items-center justify-center gap-1.5 active:scale-98 transition-all shadow-sm cursor-pointer select-none ${
                isDarkMode
                  ? "bg-[#6D8FFF] hover:bg-[#4F7BFF] text-white"
                  : "bg-[#3B63F6] hover:bg-blue-600 text-white"
              }`}
            >
              <LayoutGrid size={13.5} />
              <span>내용 생성</span>
            </button>
          </div>
        </div>

        {/* Bottom Message Composer */}
        <div className={`p-4 border-t shrink-0 ${
          isDarkMode 
            ? "bg-[#1E232D] border-[#2A3140] shadow-none" 
            : "bg-white border-[#E2E8F0] shadow-[0_-4px_16px_rgba(0,0,0,0.02)]"
        }`}>
          <div className={`rounded-[20px] border p-3 flex flex-col gap-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100/40 ${
            isDarkMode ? "border-[#2A3140] bg-[#1B1F27]" : "bg-[#F8FAFC] border-slate-200"
          }`}>
            <textarea 
              value={chatInputValue}
              onChange={(e) => setChatInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendCustomMsg();
                }
              }}
              placeholder="추가 요청사항을 자유롭게 입력하세요"
              className={`w-full bg-transparent border-none outline-none resize-none text-[13px] font-medium focus:ring-0 min-h-[48px] ${
                isDarkMode ? "text-[#F8FAFC] placeholder-slate-500" : "text-slate-800 placeholder-slate-400"
              }`}
            />
            <div className="flex items-center justify-between mt-1 shrink-0 select-none">
              <div className="flex items-center gap-1.5">
                <button className="w-7.5 h-7.5 rounded-full flex items-center justify-center hover:bg-slate-200/50 text-slate-400 cursor-pointer">
                  <Paperclip size={13.5} />
                </button>
                <button className="w-7.5 h-7.5 rounded-full flex items-center justify-center hover:bg-slate-200/50 text-slate-400 cursor-pointer">
                  <Wand2 size={13.5} />
                </button>
              </div>
              <button 
                onClick={handleSendCustomMsg}
                className={`w-7.5 h-7.5 rounded-full flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-95 ${
                  isDarkMode ? "bg-[#6D8FFF] text-white" : "bg-[#3B63F6] text-white"
                }`}
              >
                <ArrowUp size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane: Slide / All View Toggle and Mockup Screen */}
      <div className={`h-full flex flex-col transition-all duration-300 relative select-none ${
        isRightPanelCollapsed ? "w-0 border-l-0 overflow-hidden" : "w-[60%] border-l"
      } ${
        isDarkMode ? "bg-[#111318] border-[#2A3140]" : "bg-slate-50 border-slate-250"
      }`}>
        {/* Header Controls */}
        <div className={`h-14 px-6 flex items-center justify-between shrink-0 border-b relative z-20 ${
          isDarkMode 
            ? "bg-[#1E232D] border-[#2A3140]" 
            : "bg-white border-slate-250"
        }`}>
          {/* Toggle expand panel */}
          <button
            onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-600 ${
              isDarkMode ? "hover:bg-[#252B36] hover:text-white" : "hover:bg-slate-100 hover:text-slate-850"
            }`}
            title={isRightPanelCollapsed ? "패널 펼치기" : "패널 접기"}
          >
            <Columns size={18} />
          </button>

          {/* Toggle pill buttons in center */}
          {hasGenerated && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl select-none shadow-inner animate-in fade-in duration-300">
              <button
                onClick={() => setActiveTab("slide")}
                className={`px-4 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                  activeTab === "slide"
                    ? "bg-slate-900 dark:bg-[#111318] text-white shadow"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Layers size={13} />
                <span>슬라이드 {activeTab === "slide" ? `${currentSlide}/${totalSlides}` : ""}</span>
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                  activeTab === "all"
                    ? "bg-slate-900 dark:bg-[#111318] text-white shadow"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <LayoutGrid size={13} />
                <span>전체 보기</span>
              </button>
            </div>
          )}

          {/* Action icons */}
          {hasGenerated && (
            <div className="flex items-center gap-2 animate-in fade-in duration-300">
              <button className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Share2 size={16} />
              </button>
              <button className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Upload size={16} />
              </button>
              <button className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <MoreHorizontal size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Smartphone-like detailed page mockup content */}
        <div className="flex-1 min-h-0 bg-slate-100 dark:bg-slate-900 p-6 flex items-center justify-center overflow-hidden">
          {hasGenerated ? (
            <div className={`w-[360px] h-full rounded-[40px] border-4 border-slate-900/10 dark:border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden bg-white dark:bg-[#13161C] flex flex-col relative transition-all duration-300 animate-in zoom-in-98 duration-500`}>
              
              {/* Scrollable mockup display */}
              <div className="flex-1 overflow-y-auto scrollbar-none relative flex flex-col">
                
                {activeTab === "slide" ? (
                  /* Slide View Mode */
                  <div className="flex-1 flex flex-col justify-between p-6 h-full relative select-text">
                    <div className="flex items-center justify-between border-b pb-4.5 select-none">
                      <span className="font-extrabold text-[14px] text-blue-600 tracking-tight">Aqua Glow</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                        {slidesData[currentSlide - 1].badge}
                      </span>
                    </div>

                    {/* Main Content Info */}
                    <div className="my-auto py-6 flex flex-col items-center text-center">
                      <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-snug break-keep">
                        {slidesData[currentSlide - 1].title}
                      </h2>
                      <h3 className="text-[14px] font-bold text-slate-700 mt-2 break-keep">
                        {slidesData[currentSlide - 1].subTitle}
                      </h3>
                      <p className="text-[12px] text-slate-500 mt-4 leading-relaxed font-semibold break-keep">
                        {slidesData[currentSlide - 1].desc}
                      </p>

                      {/* Image Area */}
                      <div className="w-full mt-6 rounded-xl overflow-hidden aspect-video shadow-sm relative">
                        <img 
                          src={uploadedImage && currentSlide === 1 ? uploadedImage : slidesData[currentSlide - 1].image} 
                          alt="Product Showcase" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>

                    {/* Slide controls */}
                    <div className="flex items-center justify-between border-t pt-4 select-none shrink-0">
                      <button
                        onClick={() => setCurrentSlide(prev => Math.max(1, prev - 1))}
                        disabled={currentSlide === 1}
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
                          currentSlide === 1 
                            ? "opacity-40 cursor-not-allowed text-slate-300 border-slate-100" 
                            : "hover:bg-slate-50 text-slate-600 border-slate-200 cursor-pointer"
                        }`}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <span className="text-[11.5px] font-extrabold text-slate-500">
                        {currentSlide} / {totalSlides}
                      </span>
                      <button
                        onClick={() => setCurrentSlide(prev => Math.min(totalSlides, prev + 1))}
                        disabled={currentSlide === totalSlides}
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
                          currentSlide === totalSlides 
                            ? "opacity-40 cursor-not-allowed text-slate-300 border-slate-100" 
                            : "hover:bg-slate-50 text-slate-600 border-slate-200 cursor-pointer"
                        }`}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Show All Vertical Page Mode */
                  <div className="flex-1 flex flex-col gap-0 select-text pb-12">
                    {/* Slide 1 - Cover */}
                    <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-blue-50/50 to-white">
                      <span className="font-extrabold text-[14px] text-blue-600 tracking-tight self-start">Aqua Glow</span>
                      
                      <div className="mt-8 flex flex-col items-center">
                        <h2 className="text-[21px] font-black text-slate-900 tracking-tight leading-snug break-keep">
                          7일의 기적,<br />피부 속 수분길을 열다
                        </h2>
                        <h3 className="text-[14px] font-bold text-slate-655 mt-2.5">아쿠아 글로우 스킨부스터</h3>
                        <p className="text-[10px] text-slate-400 font-bold mt-1.5">피부 속 수분 길을 여는 7일의 기적, 아쿠아 글로우 스킨부스터</p>
                      </div>

                      <div className="w-full mt-6 rounded-xl overflow-hidden aspect-[4/5] shadow-sm">
                        <img 
                          src={uploadedImage ? uploadedImage : "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80"} 
                          alt="Product Ampoules" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>

                    {/* Slide 2 - Problem */}
                    <div className="p-6 bg-[#FAFCFF] border-t border-slate-100/80 text-center">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">PROBLEM</span>
                      <h3 className="text-[16px] font-black text-slate-900 mt-4 leading-snug break-keep">
                        아무리 발라도 건조한 피부, 원인은?
                      </h3>
                      <p className="text-[11.5px] text-slate-500 mt-3 font-semibold break-keep leading-relaxed">
                        표면에만 머무는 수분은 금방 증발합니다. 세포막 사이의 '수분길'이 열려야 진짜 깊은 보습이 가능합니다.
                      </p>
                      <div className="w-full mt-4 rounded-lg overflow-hidden aspect-video">
                        <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Dry skin concept" />
                      </div>
                    </div>

                    {/* Slide 3 - Ingredient */}
                    <div className="p-6 bg-white border-t border-slate-100 text-center">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">INGREDIENT</span>
                      <h3 className="text-[16px] font-black text-slate-900 mt-4 leading-snug break-keep">
                        단 3가지 핵심 성분으로 완성한 수분 과학
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-2.5 break-keep leading-relaxed font-semibold">
                        히알루론산으로 겉수분 충전, 판테놀로 장벽 보습 잠금, 글리세릴 글루코사이드로 아쿠아포린 수분길 활성화!
                      </p>
                      <div className="w-full mt-4 rounded-lg overflow-hidden aspect-video">
                        <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Cosmetic raw ingredients" />
                      </div>
                    </div>

                    {/* Slide 4 - Clinical */}
                    <div className="p-6 bg-[#FAFCFF] border-t border-slate-100 text-center">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-100">CLINICAL</span>
                      <h3 className="text-[16px] font-black text-slate-900 mt-4 leading-snug break-keep">
                        7일 사용 후 입증된 놀라운 보습 개선 효과
                      </h3>
                      <div className="grid grid-cols-2 gap-3.5 mt-5">
                        <div className="bg-white p-3 rounded-xl border text-left flex flex-col justify-center">
                          <span className="text-[10px] text-slate-400 font-bold">피부 속 보습</span>
                          <span className="text-[18px] font-black text-blue-600 mt-0.5">+148%</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border text-left flex flex-col justify-center">
                          <span className="text-[10px] text-slate-400 font-bold">수분 장벽 손실</span>
                          <span className="text-[18px] font-black text-rose-500 mt-0.5">-34%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Premium Placeholder Card */
            <div className="flex flex-col items-center justify-center max-w-md p-8 text-center animate-in fade-in zoom-in-95 duration-500 select-none">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md ${
                isDarkMode ? "bg-slate-800/80 text-[#6D8FFF]" : "bg-[#EFF6FF] border border-blue-100 text-[#3B63F6]"
              }`}>
                <Sparkles size={28} className="animate-pulse" />
              </div>
              <h3 className={`text-[17px] font-black tracking-tight ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-850"}`}>
                상세페이지 미리보기 대기 중
              </h3>
              <p className={`text-[12.5px] font-medium mt-3.5 leading-relaxed tracking-tight ${isDarkMode ? "text-slate-400" : "text-slate-550"}`}>
                왼쪽 구성 폼에 내용을 기입하고 <span className="font-bold text-blue-600">내용 생성</span> 버튼을 눌러보세요.<br />
                실시간 모바일 모크업 미리보기가 이곳에 생성됩니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
