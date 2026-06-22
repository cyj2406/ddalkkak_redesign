"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Columns,
  Share2,
  Upload,
  MoreHorizontal,
  Eye,
  Code,
  Sparkles,
  Paperclip,
  ArrowUp,
  FileText,
  Wand2,
  Undo2,
  Redo2,
  Check
} from "lucide-react";

interface LpWorkspaceProps {
  workspaceTitle: string;
  isDarkMode: boolean;
  onClose: () => void;
}

export default function LpWorkspace({
  workspaceTitle,
  isDarkMode,
  onClose
}: LpWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [chatInputValue, setChatInputValue] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);
  
  // Form States
  const [productIntro, setProductIntro] = useState("DeerFlow — AI 기반 딥 리서치 자동화 플랫폼. AI 에이전트를 활용하려는 개발자 대상.");
  const [styleHint, setStyleHint] = useState("웜톤 코랄 라운드");
  const [sectionCount, setSectionCount] = useState("4개 섹션");
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);
  
  // HTML code state for live preview
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>딸깍페이지 - 아이디어를 현실로</title>
  <style>
    body {
      font-family: 'Pretendard', -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #F8FAFC;
      color: #1E293B;
    }
    .gnb {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      background: white;
      border-bottom: 1px solid #E2E8F0;
    }
    .logo {
      font-size: 18px;
      font-weight: 800;
      color: #0F172A;
    }
    .nav-links {
      display: flex;
      gap: 24px;
    }
    .nav-links a {
      text-decoration: none;
      color: #475569;
      font-size: 13.5px;
      font-weight: 600;
    }
    .btn-cta-nav {
      background: #3B63F6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
    }
    .hero {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 80px 40px;
      max-width: 1200px;
      margin: 0 auto;
      gap: 40px;
    }
    .hero-content {
      flex: 1;
      text-align: left;
    }
    .hero-content h1 {
      font-size: 38px;
      font-weight: 850;
      line-height: 1.3;
      color: #0F172A;
      margin-bottom: 20px;
      word-break: keep-all;
    }
    .hero-content p {
      font-size: 15px;
      color: #475569;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .btn-cta-hero {
      background: #3B63F6;
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 12px;
      font-size: 14.5px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(59, 99, 246, 0.2);
    }
    .hero-illustration {
      flex: 1;
      background: #EFF6FF;
      border-radius: 24px;
      aspect-ratio: 1.4;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      padding: 24px;
    }
    .illustration-card {
      background: white;
      border-radius: 16px;
      width: 100%;
      height: 100%;
      box-shadow: 0 8px 30px rgba(0,0,0,0.04);
      border: 1px solid #E2E8F0;
      padding: 24px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .ill-bar-1 { height: 12px; width: 40%; background: #E2E8F0; border-radius: 6px; }
    .ill-bar-2 { height: 8px; width: 85%; background: #F1F5F9; border-radius: 4px; }
    .ill-bar-3 { height: 8px; width: 70%; background: #F1F5F9; border-radius: 4px; }
    .ill-accent-bar { height: 8px; width: 30%; background: #3B63F6; border-radius: 4px; }
    
    .steps-section {
      background: #F8FAFC;
      padding: 80px 40px;
      text-align: center;
    }
    .steps-section h2 {
      font-size: 24px;
      font-weight: 800;
      margin-bottom: 48px;
    }
    .steps-grid {
      display: flex;
      justify-content: center;
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .step-card {
      flex: 1;
      background: white;
      border-radius: 20px;
      padding: 32px;
      border: 1px solid #F1F5F9;
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
      text-align: left;
    }
    .step-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: #EFF6FF;
      color: #3B63F6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin-bottom: 20px;
    }
    .step-card h3 {
      font-size: 15px;
      font-weight: 800;
      margin: 0 0 10px 0;
    }
    .step-card p {
      font-size: 12.5px;
      color: #64748B;
      margin: 0;
      line-height: 1.5;
    }
    
    .features-header {
      padding: 80px 40px 20px;
      text-align: center;
    }
    .features-badge {
      color: #3B63F6;
      font-size: 11.5px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 12px;
      display: block;
    }
    .features-header h2 {
      font-size: 26px;
      font-weight: 850;
      margin: 0;
    }
  </style>
</head>
<body>
  <nav class="gnb">
    <div class="logo">딸깍페이지</div>
    <div class="nav-links">
      <a href="#">사용방법</a>
      <a href="#">고객후기</a>
      <button class="btn-cta-nav">지금 시작하기</button>
    </div>
  </nav>
  
  <section class="hero">
    <div class="hero-content">
      <h1>코딩 없이, 디자인 없이.<br>아이디어를 현실로 만드는 가장 빠른 방법.</h1>
      <p>복잡한 과정은 AI에게 맡기세요. 당신은 본질에만 집중하세요.</p>
      <button class="btn-cta-hero">지금 무료로 시작하기</button>
    </div>
    <div class="hero-illustration">
      <div class="illustration-card">
        <div class="ill-bar-1"></div>
        <div class="ill-bar-2"></div>
        <div class="ill-bar-3"></div>
        <div class="ill-accent-bar"></div>
      </div>
    </div>
  </section>

  <section class="steps-section">
    <h2>딸깍, 세 번이면 충분합니다</h2>
    <div class="steps-grid">
      <div class="step-card">
        <div class="step-icon">✏️</div>
        <h3>1. 아이디어 입력</h3>
        <p>만들고 싶은 랜딩페이지 설명을 한 문장으로 간단히 작성해보세요.</p>
      </div>
      <div class="step-card">
        <div class="step-icon">🎨</div>
        <h3>2. 템플릿 선택</h3>
        <p>AI가 준비한 추천 스타일 중에서 마음에 드는 테마를 선택해보세요.</p>
      </div>
      <div class="step-card">
        <div class="step-icon">✨</div>
        <h3>3. 딸깍 생성</h3>
        <p>완성된 랜딩페이지 코드와 결과물을 실시간 확인하고 바로 배포하세요.</p>
      </div>
    </div>
  </section>

  <div class="features-header">
    <span class="features-badge">FEATURES</span>
    <h2>왜 딸깍페이지일까요?</h2>
  </div>
</body>
</html>`);

  // Chat History
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "ai",
      text: "안녕하세요, 최유정님! 멋진 랜딩페이지를 만들어 드릴게요.\n아래 폼에 제품·서비스 정보를 입력하면 AI가 아웃라인을 구성합니다."
    },
    {
      sender: "user",
      text: "웜톤 코랄 라운드 스타일 랜딩페이지로 만들어줘."
    },
    {
      sender: "ai",
      text: "좋은 선택입니다! 해당 스타일로 아웃라인을 잡아 드릴게요. 아래 폼에서 주제와 섹션 수를 정해 주세요."
    }
  ]);

  const handleStartOutlineGen = () => {
    setHasGenerated(true);
    // Modify htmlCode structure dynamically to simulate "Generation"
    setChatHistory(prev => [
      ...prev,
      {
        sender: "user",
        text: `아웃라인 생성 요청:\n- 주제: ${productIntro}\n- 스타일: ${styleHint}\n- 섹션: ${sectionCount}`
      },
      {
        sender: "ai",
        text: "요청하신 설정에 따라 랜딩페이지 레이아웃 구조와 실시간 소스코드를 완성했습니다! 미리보기 및 코드를 수정해 나가실 수 있습니다."
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
          text: `추가 요청 사항 [${msg}]을 HTML 소스코드에 실시간 반영 완료했습니다.`
        }
      ]);
      // Slightly modify style rules inside htmlCode to simulate code updates
      if (msg.includes("어둡") || msg.includes("다크") || msg.includes("dark")) {
        setHtmlCode(prev => prev.replace("#F8FAFC", "#111827").replace("#1E293B", "#F8FAFC").replace("#0F172A", "#F8FAFC"));
      } else if (msg.includes("레드") || msg.includes("빨강")) {
        setHtmlCode(prev => prev.replaceAll("#3B63F6", "#EF4444"));
      }
    }, 1000);
  };

  // Convert HTML code to lines for editor display
  const htmlLines = htmlCode.split("\n");

  return (
    <div className={`flex-1 flex w-full h-[calc(100vh-64px)] overflow-hidden relative font-sans border-t ${
      isDarkMode 
        ? "bg-[#111318] border-[#2A3140]" 
        : "bg-slate-50 border-slate-100"
    }`}>
      {/* Left Pane: Chat Room & Landing Page Outline Form */}
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
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-655 ${
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
              딸깍페이지 랜딩페이지 제작
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

          {/* Outline Creation Card */}
          <div className={`p-5 rounded-2xl border text-left flex flex-col gap-4.5 select-none shadow-sm ${
            isDarkMode ? "bg-[#13161C] border-[#2A3140]" : "bg-white border-slate-200"
          }`}>
            <div className="flex flex-col">
              <h4 className={`text-[13.5px] font-extrabold tracking-tight ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-850"}`}>
                랜딩페이지 아웃라인 구성
              </h4>
              <span className={`text-[10px] font-bold mt-1 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                제품/서비스 정보를 입력하면 AI가 랜딩페이지 아웃라인을 구성합니다.
              </span>
            </div>

            {/* Subject Text Area */}
            <div className="flex flex-col gap-1.5">
              <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                주제 / 제품 소개
              </label>
              <textarea 
                value={productIntro}
                onChange={(e) => setProductIntro(e.target.value)}
                placeholder="예: DeerFlow — AI 기반 딥 리서치 자동화 플랫폼. AI 에이전트를 활용하려는 개발자 대상."
                className={`w-full h-20 rounded-xl border p-3.5 text-[12.5px] font-semibold outline-none resize-none focus:ring-0 ${
                  isDarkMode 
                    ? "bg-[#0C0E12] border-[#2A3140] text-[#F8FAFC] placeholder-slate-600 focus:border-[#6D8FFF]/50" 
                    : "bg-[#F8FAFC] border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-400/50"
                }`}
              />
            </div>

            {/* Style Hint + Sections Count Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                  스타일 힌트 (선택)
                </label>
                <input 
                  type="text"
                  value={styleHint}
                  onChange={(e) => setStyleHint(e.target.value)}
                  placeholder="예: 웜톤 코랄 라운드"
                  className={`w-full h-9.5 rounded-xl border px-3.5 text-[12px] font-bold outline-none focus:ring-0 ${
                    isDarkMode 
                      ? "bg-[#0C0E12] border-[#2A3140] text-[#F8FAFC]" 
                      : "bg-[#F8FAFC] border-slate-200 text-slate-800"
                  }`}
                />
              </div>

              <div className="flex flex-col gap-1.5 relative">
                <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                  섹션 수
                </label>
                <button
                  onClick={() => setIsSectionDropdownOpen(!isSectionDropdownOpen)}
                  className={`w-full h-9.5 rounded-xl border px-3.5 text-[12px] font-bold flex items-center justify-between cursor-pointer select-none ${
                    isDarkMode 
                      ? "bg-[#0C0E12] border-[#2A3140] text-[#F8FAFC]" 
                      : "bg-[#F8FAFC] border-slate-200 text-slate-850"
                  }`}
                >
                  <span>{sectionCount}</span>
                  <ChevronDown size={13} className="text-slate-400" />
                </button>

                {isSectionDropdownOpen && (
                  <div className={`absolute left-0 right-0 top-full mt-1.5 rounded-xl py-1.5 border z-30 shadow-md ${
                    isDarkMode ? "bg-[#1E232D] border-[#2A3140] text-[#F8FAFC]" : "bg-white border-slate-200 text-slate-800"
                  }`}>
                    {["3개 섹션", "4개 섹션", "5개 섹션", "6개 섹션"].map((count) => (
                      <button
                        key={count}
                        onClick={() => {
                          setSectionCount(count);
                          setIsSectionDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-[12px] font-bold hover:bg-blue-50/50 ${
                          isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-50"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Outlines Gen Trigger button */}
            <button
              onClick={handleStartOutlineGen}
              className={`w-full h-10 rounded-xl font-extrabold text-[12.5px] flex items-center justify-center gap-1.5 active:scale-98 transition-all shadow-sm cursor-pointer select-none ${
                isDarkMode
                  ? "bg-[#6D8FFF] hover:bg-[#4F7BFF] text-white"
                  : "bg-[#3B63F6] hover:bg-blue-600 text-white"
              }`}
            >
              <Sparkles size={13} />
              <span>아웃라인 생성</span>
            </button>
          </div>
        </div>

        {/* Bottom Custom Message Input bar */}
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

      {/* Right Pane: Swappable editor view (HTML live output iframe or code text) */}
      <div className={`h-full flex flex-col transition-all duration-300 relative select-none ${
        isRightPanelCollapsed ? "w-0 border-l-0 overflow-hidden" : "w-[60%] border-l"
      } ${
        isDarkMode ? "bg-[#111318] border-[#2A3140]" : "bg-slate-50 border-slate-250"
      }`}>
        {/* Editor Top Bar Controls */}
        <div className={`h-14 px-6 flex items-center justify-between shrink-0 border-b relative z-20 ${
          isDarkMode 
            ? "bg-[#1E232D] border-[#2A3140]" 
            : "bg-white border-slate-250"
        }`}>
          {/* Toggle expand panel */}
          <button
            onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-655 ${
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
                onClick={() => setActiveTab("preview")}
                className={`px-4.5 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                  activeTab === "preview"
                    ? "bg-white dark:bg-[#1E232D] text-[#3B63F6] dark:text-[#6D8FFF] shadow"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Eye size={13} />
                <span>미리보기</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-4.5 py-1.5 rounded-lg text-[12px] font-bold flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                  activeTab === "code"
                    ? "bg-white dark:bg-[#1E232D] text-[#3B63F6] dark:text-[#6D8FFF] shadow"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Code size={13} />
                <span>코드</span>
              </button>
            </div>
          )}

          {/* Topbar Right action icons */}
          {hasGenerated && (
            <div className="flex items-center gap-2 animate-in fade-in duration-300">
              <button className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-655 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Share2 size={16} />
              </button>
              <button className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-655 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <Upload size={16} />
              </button>
              <button className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-655 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <MoreHorizontal size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 relative flex flex-col items-center justify-center">
          {hasGenerated ? (
            activeTab === "preview" ? (
              /* HTML PREVIEW WINDOW USING ISOLATED IFRAME FOR REAL-TIME RENDER */
              <div className="w-full h-full p-6 bg-slate-100 dark:bg-slate-900 overflow-hidden flex items-center justify-center">
                <div className="w-full h-full rounded-[24px] bg-white border border-slate-200 shadow-xl overflow-hidden relative">
                  <iframe
                    title="html-live-preview"
                    srcDoc={htmlCode}
                    className="w-full h-full border-none bg-white"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            ) : (
              /* CODE EDITOR VIEW WITH LINE NUMBERS */
              <div className="w-full h-full flex bg-[#0B0F19] text-[#94A3B8] font-mono text-[13px] leading-relaxed select-text overflow-hidden">
                {/* Line Numbers column */}
                <div className="py-6 pl-4.5 pr-2 select-none border-r border-[#1E293B] bg-[#070A10] text-[#334155] text-right shrink-0 min-w-[32px]">
                  {htmlLines.map((_, idx) => (
                    <div key={idx}>{idx + 1}</div>
                  ))}
                </div>
                {/* Textarea Code display */}
                <textarea
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  spellCheck="false"
                  className="flex-1 w-full h-full py-6 px-4 bg-transparent border-none outline-none resize-none text-[#F8FAFC] font-mono text-[13.5px] leading-relaxed focus:ring-0 overflow-y-auto"
                />
              </div>
            )
          ) : (
            /* Premium Placeholder Card */
            <div className="flex flex-col items-center justify-center max-w-md p-8 text-center animate-in fade-in zoom-in-95 duration-500 select-none">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md ${
                isDarkMode ? "bg-slate-800/80 text-[#6D8FFF]" : "bg-[#EFF6FF] border border-blue-100 text-[#3B63F6]"
              }`}>
                <Sparkles size={28} className="animate-pulse" />
              </div>
              <h3 className={`text-[17px] font-black tracking-tight ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-850"}`}>
                랜딩페이지 미리보기 대기 중
              </h3>
              <p className={`text-[12.5px] font-medium mt-3.5 leading-relaxed tracking-tight ${isDarkMode ? "text-slate-400" : "text-slate-550"}`}>
                왼쪽 구성 폼에 정보를 입력하고 <span className="font-bold text-blue-600">아웃라인 생성</span> 버튼을 눌러보세요.<br />
                실시간 아웃라인 분석 결과와 소스코드가 이곳에 나타납니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
