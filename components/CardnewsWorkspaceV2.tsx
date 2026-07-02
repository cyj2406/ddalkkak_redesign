"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Coins,
  ChevronDown,
  ExternalLink,
  Info,
  Calendar,
  Layers,
  Sparkles,
  Search,
  CheckCircle,
  Plus,
  HelpCircle,
  Sun,
  Moon,
  Monitor,
  Globe,
  MessageSquare,
  Settings as SettingsIcon,
  LogOut,
  Check,
  Bell,
  Database,
  MoreHorizontal,
  Home as HomeIcon,
  Folder,
  Star,
  Store,
  Menu,
  ChevronRight,
  Sparkle
} from "lucide-react";

interface CardnewsWorkspaceV2Props {
  workspaceTitle: string;
  isDarkMode: boolean;
  onClose: () => void;
  onOpenSkillModal?: () => void;
}

export default function CardnewsWorkspaceV2({
  workspaceTitle,
  isDarkMode: externalDarkMode,
  onClose,
  onOpenSkillModal
}: CardnewsWorkspaceV2Props) {
  // Theme state localized for the prototype toggling
  const [isDarkMode, setIsDarkMode] = useState(externalDarkMode);
  const [themeMode, setThemeMode] = useState<"system" | "light" | "dark">(externalDarkMode ? "dark" : "light");

  useEffect(() => {
    if (themeMode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [themeMode]);

  const applyThemeMode = (mode: "system" | "light" | "dark") => {
    setThemeMode(mode);
    if (mode === "light") setIsDarkMode(false);
    if (mode === "dark") setIsDarkMode(true);
  };

  // Navigation / Views inside the prototype
  const [activeTab, setActiveTab] = useState<
    "home" | "credit-history"
  >("credit-history");
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Popover and Modal states
  const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false);
  const [profileView, setProfileView] = useState<"main" | "theme" | "language">("main");
  const [selectedLanguage, setSelectedLanguage] = useState("한국어");
  const [hoveredSubmenu, setHoveredSubmenu] = useState<"theme" | "lang" | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<"theme" | "lang" | null>(null);

  // Settings Modal states
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [settingsActiveTab, setSettingsActiveTab] = useState<"memory" | "notification" | "credit">("memory");
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [memories, setMemories] = useState([
    "사용자는 주로 한국어로 소통합니다.",
    "이전 작업 시안에는 블루/웜톤 계열 색상이 사용되었습니다.",
    "출력 파일 포맷은 고해상도 PNG를 기본적으로 선호합니다.",
    "카드뉴스 제작 시 비주와 비순각 레이아웃 배치를 중요시합니다."
  ]);

  const popoverRef = useRef<HTMLDivElement>(null);

  // Close profile popover on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsProfilePopoverOpen(false);
        setProfileView("main");
        setHoveredSubmenu(null);
        setActiveSubmenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filters = ["전체", "AI 모델", "미디어", "웹 검색", "충전"];

  const initialHistoryData = [
    {
      date: "2026. 06. 22. 오전 9:49:06",
      type: "AI 모델",
      details: "월급 빼고 다 오르는 물가 카드뉴스",
      change: -69,
      balance: 11972930,
      category: "AI 모델"
    },
    {
      date: "2026. 06. 15. 오후 5:13:59",
      type: "AI 모델",
      details: "시말서 템플릿 작성 안내",
      change: -185,
      balance: 11972999,
      category: "AI 모델"
    },
    {
      date: "2026. 06. 15. 오후 5:13:36",
      type: "AI 모델",
      details: "졸업논문 템플릿 작성 안내",
      change: -74,
      balance: 11973184,
      category: "AI 모델"
    },
    {
      date: "2026. 06. 15. 오후 5:13:33",
      type: "미디어",
      details: "수입대행계약서 템플릿 작성 내용 문의",
      change: -106,
      balance: 11973258,
      category: "미디어"
    },
    {
      date: "2026. 06. 15. 오후 5:13:29",
      type: "미디어",
      details: "이미지 템플릿 편집 정보",
      change: -224,
      balance: 11973364,
      category: "미디어"
    },
    {
      date: "2026. 06. 15. 오후 5:12:58",
      type: "웹 검색",
      details: "딸깍넷 랜딩페이지 생성",
      change: -122,
      balance: 11973588,
      category: "웹 검색"
    },
    {
      date: "2026. 06. 15. 오후 5:12:47",
      type: "웹 검색",
      details: "세금계산서 템플릿 작성 내용 문의",
      change: -98,
      balance: 11973710,
      category: "웹 검색"
    },
    {
      date: "2026. 06. 15. 오후 5:12:40",
      type: "AI 모델",
      details: "내용증명서 템플릿 작성 문의",
      change: -119,
      balance: 11973808,
      category: "AI 모델"
    },
    {
      date: "2026. 06. 15. 오후 5:12:19",
      type: "충전",
      details: "크레딧 카드 충전 (VVIP 패키지)",
      change: 100000,
      balance: 11973927,
      category: "충전"
    },
    {
      date: "2026. 06. 15. 오후 5:12:14",
      type: "AI 모델",
      details: "다이어트 앱 광고 템플릿 편집",
      change: -67,
      balance: 11973997,
      category: "AI 모델"
    }
  ];

  const filteredData = selectedFilter === "전체" 
    ? initialHistoryData 
    : initialHistoryData.filter(item => item.category === selectedFilter);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenSettings = () => {
    setIsProfilePopoverOpen(false);
    setSettingsActiveTab("memory"); // Default memory tab active
    setIsSettingsModalOpen(true);
  };

  return (
    <div className={`flex w-full h-[calc(100vh-64px)] overflow-hidden relative font-sans ${
      isDarkMode ? "bg-[#111318] text-slate-100" : "bg-slate-50 text-slate-800"
    }`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-3 rounded-2xl shadow-xl z-[70] flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle size={16} />
          <span className="text-[12.5px] font-bold">{toastMessage}</span>
        </div>
      )}



      {/* ==========================================
         B. MAIN CONTENT CONTAINER (Switchable)
         ========================================== */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {activeTab === "home" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 ${
              isDarkMode ? "bg-[#3B63F6]/20 text-[#6D8FFF]" : "bg-blue-50 text-[#3B63F6]"
            }`}>
              <Sparkles size={32} />
            </div>
            <h1 className={`text-2xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              딸깍넷 대시보드 홈
            </h1>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              프로필 팝오버 설정 페이지 프로토타입입니다. 좌측 하단 프로필 영역을 눌러 팝오버를 열거나 설정 창을 열어보세요.
            </p>
          </div>
        ) : (
          /* ==========================================
             CREDIT HISTORY DASHBOARD VIEW (Polished Redesign from Previous Step)
             ========================================== */
          <div className="flex-1 flex flex-col">
            {/* Header Panel */}
            <div className={`h-16 px-8 flex items-center justify-between shrink-0 border-b select-none ${
              isDarkMode ? "bg-[#171A21]/90 border-white/5" : "bg-white border-[#E2E8F0]"
            }`}>
              <div className="flex items-center gap-2.5">
                <h2 className={`text-[16px] font-black tracking-tight font-sans leading-none ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                  크레딧 사용 내역
                </h2>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 max-w-[1000px] w-full mx-auto px-8 py-8 flex flex-col gap-6.5 text-left">
              
              {/* 1. TOP SUMMARY DASHBOARD CARD (SaaS Styled Overview Card - Reconstructed Stacking) */}
              <div className={`p-8 rounded-2xl border flex items-center justify-between gap-5 relative overflow-hidden transition-all ${
                isDarkMode 
                  ? "bg-[#171A21]/40 border-[#2A3140]" 
                  : "bg-[#F8FAFC] border-slate-200"
              }`}>
                <div className="flex flex-col text-left">
                  {/* [첫 번째 줄]: 사용 가능한 크레딧 라벨 */}
                  <span className={`text-sm font-semibold tracking-tight ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    사용 가능한 크레딧
                  </span>
                  
                  {/* [두 번째 줄]: 대형 숫자 */}
                  <div className="mt-1 leading-none">
                    <span className={`text-[36px] font-black tracking-tight font-sans ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      11,974,710
                    </span>
                  </div>

                  {/* [세 번째 줄]: 이번 달 사용한 크레딧 */}
                  <div className={`text-[12px] font-bold mt-4 flex items-center gap-1.5 ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>
                    <span>이번 달 사용한 크레딧:</span>
                    <span className="font-extrabold">2,480</span>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => handleOpenSettings()}
                    className={`h-10 px-5 rounded-xl text-[12.5px] font-black transition-all active:scale-97 cursor-pointer flex items-center gap-1.5 ${
                      isDarkMode 
                        ? "bg-slate-800 border border-white/5 text-slate-100 hover:bg-slate-700 hover:border-slate-600" 
                        : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
                    }`}
                  >
                    <Plus size={13} />
                    <span>크레딧 충전</span>
                  </button>
                </div>
              </div>

              {/* 2. CATEGORY FILTERS */}
              <div className="flex items-center justify-between border-b pb-2 select-none border-slate-200 dark:border-white/5">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                  {filters.map((filter) => {
                    const isActive = selectedFilter === filter;
                    return (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-4.5 py-1.5 rounded-full text-[12px] font-black tracking-tight border transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                          isActive
                            ? isDarkMode
                              ? "bg-[#3B63F6] border-[#3B63F6] text-white shadow-md shadow-blue-500/10"
                              : "bg-slate-900 border-slate-900 text-white shadow-sm"
                            : isDarkMode
                              ? "bg-transparent border-[#2A3140] text-slate-400 hover:border-slate-500 hover:text-slate-200"
                              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>

                <span className={`text-[11px] font-bold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                  총 {filteredData.length}건
                </span>
              </div>

              {/* 3. TABLE */}
              <div className={`border rounded-2xl overflow-hidden shadow-sm ${
                isDarkMode ? "bg-[#171A21] border-[#2A3140]" : "bg-white border-[#E2E8F0]"
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className={`border-b text-[11px] font-black uppercase tracking-wider ${
                        isDarkMode ? "bg-[#1A1F29]/60 border-[#2A3140] text-slate-450" : "bg-slate-50/70 border-[#E2E8F0] text-slate-500"
                      }`}>
                        <th className="py-3.5 px-6 font-bold">일시</th>
                        <th className="py-3.5 px-4 font-bold">유형</th>
                        <th className="py-3.5 px-4 font-bold">상세 내용</th>
                        <th className="py-3.5 px-4 font-bold text-right">크레딧 변동</th>
                        <th className="py-3.5 px-6 font-bold text-right">잔액</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 dark:divide-white/5">
                      {filteredData.map((item, idx) => (
                        <tr 
                          key={idx} 
                          className={`text-[12.5px] font-medium transition-colors ${
                            isDarkMode ? "hover:bg-white/[0.015]" : "hover:bg-slate-50/50"
                          }`}
                        >
                          <td className="py-4 px-6 text-slate-400 whitespace-nowrap">{item.date}</td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider ${
                              item.type === "충전"
                                ? "bg-blue-50 text-blue-650 dark:bg-blue-950/40 dark:text-blue-400"
                                : "bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-350"
                            }`}>{item.type}</span>
                          </td>
                          <td className="py-4 px-4">
                            <a href="#workspace" className="font-bold text-[#3B63F6] dark:text-[#6D8FFF] hover:underline flex items-center gap-1">
                              <span>{item.details}</span>
                              <ExternalLink size={11} className="opacity-0 group-hover:opacity-100" />
                            </a>
                          </td>
                          <td className={`py-4 px-4 text-right font-extrabold ${item.change > 0 ? "text-[#3B63F6]" : "text-[#EF4444]"}`}>
                            {item.change > 0 ? `+${item.change.toLocaleString()}` : item.change.toLocaleString()}
                          </td>
                          <td className="py-4 px-6 text-right font-black">{item.balance.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* ==========================================
         C. REDESIGNED SETTINGS MODAL (Memory active by default, 外관 Tab deleted)
         ========================================== */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        themeMode={themeMode}
        setThemeMode={applyThemeMode}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        setActiveTab={setActiveTab}
        showToast={showToast}
      />

    </div>
  );
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  themeMode: "system" | "light" | "dark";
  setThemeMode: (mode: "system" | "light" | "dark") => void;
  selectedLanguage: string;
  setSelectedLanguage: (val: string) => void;
  setActiveTab: (val: any) => void;
  showToast: (msg: string) => void;
}

const SETTINGS_LANGUAGES = ["한국어", "中文", "English", "日本語", "Tiếng Việt", "Español", "Русский", "Français"];

export function SettingsModal({
  isOpen,
  onClose,
  isDarkMode,
  setIsDarkMode,
  themeMode,
  setThemeMode,
  selectedLanguage,
  setSelectedLanguage,
  setActiveTab,
  showToast
}: SettingsModalProps) {
  const [settingsActiveTab, setSettingsActiveTab] = useState<"appearance" | "memory" | "notification" | "credit">("appearance");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [memories, setMemories] = useState([
    "사용자는 주로 한국어로 소통합니다.",
    "이전 작업 시안에는 블루/웜톤 계열 색상이 사용되었습니다.",
    "출력 파일 포맷은 고해상도 PNG를 기본적으로 선호합니다.",
    "카드뉴스 제작 시 비주와 비순각 레이아웃 배치를 중요시합니다."
  ]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-[800px] h-[520px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col border transition-all ${
          isDarkMode ? "bg-[#171A21] border-[#2A3140] text-slate-100" : "bg-white border-[#E2E8F0] text-slate-800"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`px-6 py-4 flex items-center justify-between border-b ${
          isDarkMode ? "border-white/5" : "border-slate-100"
        }`}>
          <div className="flex flex-col text-left">
            <h3 className={`text-[15px] font-semibold tracking-tight ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              설정
            </h3>
            <span className="text-[11.5px] font-normal text-gray-500 mt-0.5">
              계정의 정보와 능력을 설정합니다.
            </span>
          </div>
          <button 
            onClick={onClose}
            className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-all cursor-pointer`}
          >
            ✕
          </button>
        </div>

        {/* Modal Content Split */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Navigation: 외관(테마+언어) / 알림 / 메모리 / 크레딧 */}
          <div className={`w-[200px] h-full p-4 flex flex-col gap-1.5 select-none ${
            isDarkMode ? "bg-[#14171E]" : "bg-slate-50/50"
          }`}>
            <button
              onClick={() => setSettingsActiveTab("appearance")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[12.5px] font-bold cursor-pointer transition-all ${
                settingsActiveTab === "appearance"
                  ? isDarkMode ? "bg-slate-800 text-[#6D8FFF] border border-blue-900/30" : "bg-white text-[#3B63F6] border border-blue-100/50 shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/10 hover:text-slate-200"
              }`}
            >
              <SettingsIcon size={15} />
              <span>외관</span>
            </button>

            <button
              onClick={() => setSettingsActiveTab("notification")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[12.5px] font-bold cursor-pointer transition-all ${
                settingsActiveTab === "notification"
                  ? isDarkMode ? "bg-slate-800 text-[#6D8FFF] border border-blue-900/30" : "bg-white text-[#3B63F6] border border-blue-100/50 shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/10 hover:text-slate-200"
              }`}
            >
              <Bell size={15} />
              <span>알림</span>
            </button>

            <button
              onClick={() => setSettingsActiveTab("memory")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[12.5px] font-bold cursor-pointer transition-all ${
                settingsActiveTab === "memory"
                  ? isDarkMode ? "bg-slate-800 text-[#6D8FFF] border border-blue-900/30" : "bg-white text-[#3B63F6] border border-blue-100/50 shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/10 hover:text-slate-200"
              }`}
            >
              <Database size={15} />
              <span>메모리</span>
            </button>

            <button
              onClick={() => setSettingsActiveTab("credit")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[12.5px] font-bold cursor-pointer transition-all ${
                settingsActiveTab === "credit"
                  ? isDarkMode ? "bg-slate-800 text-[#6D8FFF] border border-blue-900/30" : "bg-white text-[#3B63F6] border border-blue-100/50 shadow-sm"
                  : "text-slate-400 hover:bg-slate-800/10 hover:text-slate-200"
              }`}
            >
              <Coins size={15} />
              <span>크레딧</span>
            </button>
          </div>

          {/* Right Panel Contents */}
          <div className="flex-1 h-full p-6.5 overflow-y-auto text-left flex flex-col">
            {settingsActiveTab === "appearance" && (
              /* 0. APPEARANCE TAB VIEW (테마 + 언어 단일 소스) */
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-[13.5px] font-semibold text-gray-800 dark:text-white">테마</h4>
                  <p className="text-[11px] font-normal text-gray-500 mt-1 leading-normal">
                    인터페이스가 기기를 따르도록 하거나 고정된 테마를 선택합니다.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "system" as const, label: "시스템", desc: "운영체제 설정을 자동으로 따릅니다.", icon: Monitor },
                    { id: "light" as const, label: "라이트", desc: "낮 시간에 적합한 밝은 색상 팔레트입니다.", icon: Sun },
                    { id: "dark" as const, label: "다크", desc: "눈의 피로를 줄여주는 어두운 색상 팔레트입니다.", icon: Moon }
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = themeMode === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setThemeMode(opt.id)}
                        className={`flex flex-col p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? isDarkMode ? "border-[#6D8FFF] bg-slate-800/60" : "border-[#3B63F6] bg-blue-50/40 shadow-sm"
                            : isDarkMode ? "border-white/5 hover:bg-slate-800/30" : "border-slate-150 hover:bg-slate-50/70"
                        }`}
                      >
                        <div className={`h-16 rounded-lg mb-2.5 p-2 flex flex-col gap-1 ${
                          opt.id === "dark" ? "bg-slate-900" : opt.id === "light" ? "bg-white border border-slate-100" : "bg-gradient-to-br from-white from-50% to-slate-900 to-50% border border-slate-100"
                        }`}>
                          <div className={`h-1.5 w-3/5 rounded-full ${opt.id === "dark" ? "bg-slate-600" : "bg-slate-200"}`} />
                          <div className={`h-1.5 w-2/5 rounded-full ${opt.id === "dark" ? "bg-slate-700" : "bg-slate-150"}`} />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Icon size={13} className={isSelected ? (isDarkMode ? "text-[#6D8FFF]" : "text-[#3B63F6]") : "text-slate-450"} />
                          <span className={`text-[11.5px] font-extrabold ${isSelected ? (isDarkMode ? "text-[#6D8FFF]" : "text-[#3B63F6]") : ""}`}>{opt.label}</span>
                        </div>
                        <p className="text-[9.5px] text-slate-400 mt-1 leading-normal">{opt.desc}</p>
                      </button>
                    );
                  })}
                </div>

                <div>
                  <h4 className="text-[13.5px] font-semibold text-gray-800 dark:text-white">언어</h4>
                  <p className="text-[11px] font-normal text-gray-500 mt-1 leading-normal">언어를 전환합니다.</p>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsLangDropdownOpen((v) => !v)}
                    className={`w-full h-10 px-3.5 rounded-xl border flex items-center justify-between text-[12.5px] font-bold cursor-pointer transition-all ${
                      isDarkMode ? "bg-slate-900/40 border-white/5 text-slate-200" : "bg-slate-50/50 border-slate-150 text-slate-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Globe size={14} className="text-slate-400" />
                      <span>{selectedLanguage}</span>
                    </span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isLangDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isLangDropdownOpen && (
                    <div className={`absolute left-0 right-0 mt-1.5 max-h-56 overflow-y-auto rounded-xl border p-1.5 flex flex-col gap-0.5 z-10 shadow-xl ${
                      isDarkMode ? "bg-[#1E232D] border-white/10" : "bg-white border-slate-200"
                    }`}>
                      {SETTINGS_LANGUAGES.map((lang) => {
                        const isSelected = selectedLanguage === lang;
                        return (
                          <button
                            key={lang}
                            onClick={() => {
                              setSelectedLanguage(lang);
                              setIsLangDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[12px] font-medium cursor-pointer transition-all ${
                              isSelected
                                ? isDarkMode ? "bg-slate-800 text-[#6D8FFF] font-semibold" : "bg-[#EFF6FF] text-[#3B63F6] font-semibold"
                                : isDarkMode ? "text-slate-300 hover:bg-slate-800/50" : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span>{lang}</span>
                            {isSelected && <Check size={13} />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {settingsActiveTab === "memory" && (
              /* 1. MEMORY TAB VIEW (AI Core Memory) */
              <div className="flex flex-col gap-4.5">
                <div>
                  <h4 className="text-[13.5px] font-semibold text-gray-800 dark:text-white">기억 데이터 보관소</h4>
                  <p className="text-[11px] font-normal text-gray-500 mt-1 leading-normal">
                    사용자와 나눈 유의미한 대화를 바탕으로 딸깍 AI 서비스가 개인화해서 기억한 내용입니다. 이 기억은 새로운 작업 생성 시 컨텍스트로 적용됩니다.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {memories.map((mem, idx) => (
                    <div 
                      key={idx}
                      className={`px-4 py-3 rounded-xl border flex items-center justify-between text-[12px] font-bold ${
                        isDarkMode ? "bg-slate-900/40 border-white/5" : "bg-slate-50/50 border-slate-100"
                      }`}
                    >
                      <span>{mem}</span>
                      <button 
                        onClick={() => {
                          setMemories(memories.filter((_, i) => i !== idx));
                          showToast("기억 항목이 망각/삭제 처리되었습니다.");
                        }}
                        className="text-[10px] text-red-500 hover:underline font-extrabold cursor-pointer"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2.5 mt-2.5">
                  <button 
                    onClick={() => {
                      setMemories([]);
                      showToast("모든 메모리가 완전히 지워졌습니다.");
                    }}
                    className={`h-8.5 px-4 rounded-xl text-[11px] font-extrabold cursor-pointer transition-all border ${
                      isDarkMode ? "bg-slate-800 border-white/5 text-slate-355 hover:bg-slate-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    기억 전체 지우기
                  </button>
                </div>
              </div>
            )}

            {settingsActiveTab === "notification" && (
              /* 2. NOTIFICATION TAB VIEW */
              <div className="flex flex-col gap-4.5">
                <div>
                  <h4 className="text-[13.5px] font-semibold text-gray-800 dark:text-white">실시간 알림 제어</h4>
                  <p className="text-[11px] font-normal text-gray-500 mt-1 leading-normal">
                    작업 완료 시 브라우저 푸시 알림 및 딸깍 서비스 내 실시간 소리 알림을 활성화합니다.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDarkMode ? "bg-slate-900/40 border-white/5" : "bg-slate-50/50 border-slate-100"
                }`}>
                  <div className="flex flex-col">
                    <span className="text-[12.5px] font-black">서비스 작업 완료 알림</span>
                    <span className="text-[10.5px] text-slate-400 mt-0.5">이미지 및 랜딩페이지 빌드가 완료되면 알립니다.</span>
                  </div>
                  
                  {/* Simple Switch Widget */}
                  <button
                    onClick={() => {
                      setIsNotificationEnabled(!isNotificationEnabled);
                      showToast(isNotificationEnabled ? "알림을 비활성화했습니다." : "알림을 활성화했습니다.");
                    }}
                    className={`w-11 h-6 rounded-full p-0.5 transition-all cursor-pointer ${
                      isNotificationEnabled ? "bg-[#3B63F6]" : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${
                      isNotificationEnabled ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {settingsActiveTab === "credit" && (
              /* 3. SIMPLIFIED CREDIT TAB VIEW (Replaces heavy logs with a summary card & routing link) */
              <div className="flex flex-col gap-4.5 h-full justify-between">
                <div className="flex flex-col gap-4.5">
                  <div>
                    <h4 className="text-[13.5px] font-semibold text-gray-800 dark:text-white">크레딧 계정 상태 요약</h4>
                    <p className="text-[11px] font-normal text-gray-500 mt-1 leading-normal">
                      보유하고 있는 충전액과 잔고 상세입니다. 정산 이력 및 충전 기능은 상세 페이지에서 안전하게 처리하실 수 있습니다.
                    </p>
                  </div>

                  {/* Gorgeous Summary Card (Outfit styled contrast layout) */}
                  <div className={`p-5 rounded-2xl border text-left flex flex-col gap-2.5 ${
                    isDarkMode ? "bg-slate-900/60 border-white/5" : "bg-[#F8FAFC] border-slate-150"
                  }`}>
                    <div className="flex flex-col leading-none">
                      <span className="text-[11.5px] font-bold text-slate-450">남은 크레딧 잔액</span>
                      <span className={`text-[24px] font-black mt-2 leading-none font-sans ${
                        isDarkMode ? "text-[#6D8FFF]" : "text-[#3B63F6]"
                      }`}>
                        11,974,710 <span className="text-[12.5px] font-black text-slate-500 ml-0.5">크레딧</span>
                      </span>
                    </div>

                    <div className={`h-[1px] w-full ${isDarkMode ? "bg-white/5" : "bg-slate-200"}`} />

                    <div className="flex items-center justify-between text-[11.5px]">
                      <span className="text-slate-450 font-bold">이번 달 사용 요약:</span>
                      <span className="font-extrabold text-slate-700 dark:text-slate-350">2,480 크레딧 차감 완료</span>
                    </div>
                  </div>
                </div>

                {/* Routing redirection action button (Fulfilling main requirement) */}
                <div className="mt-auto pt-4.5">
                  <button
                    onClick={() => {
                      onClose(); // Close Modal
                      setActiveTab("credit-history"); // Switch view tab to Credit History dashboard
                      showToast("크레딧 사용 내역 대시보드로 이동했습니다.");
                    }}
                    className="w-full h-11.5 bg-[#3B63F6] hover:bg-blue-650 text-white rounded-xl text-[12.5px] font-black flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer active:scale-97 transition-all"
                  >
                    <Coins size={14} />
                    <span>크레딧 상세 내역 및 충전 페이지로 이동</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      
    </div>
  );
}
