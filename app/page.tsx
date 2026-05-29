"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Home as HomeIcon,
  Folder,
  Plus,
  Bell,
  Paperclip,
  Sparkles,
  ArrowUp,
  Image as ImageIcon,
  LayoutTemplate,
  Clapperboard,
  FileText,
  Presentation,
  AudioLines,
  ListChecks,
  CircleCheck,
  MoreHorizontal,
  Sun,
  Moon,
  Globe,
  Users,
  Mail,
  Settings,
  LogOut,
  ArrowLeft,
  Check,
  Megaphone,
  PanelLeft,
  PanelLeftClose,
  Menu,
  Share2,
  Download,
  PanelRightClose,
  PanelRight,
  Bot,
  Pencil,
  Coins,
  Wallet,
  FileSpreadsheet,
  FileArchive,
  File,
  Search,
  Filter,
  Star,
  Type,
  Square,
  Circle,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Layers,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Trash2,
  Move,
  RotateCw
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ElementType } from "react";

const SERVICES = [
  // 1행 (4개)
  { key: "img", label: "이미지", sub: "썸네일 · 카드뉴스", icon: ImageIcon, bg: "#FFF6ED", fg: "#F59E0B" },
  { key: "lp", label: "랜딩페이지", sub: "웹 · 모바일", icon: LayoutTemplate, bg: "#F0FDF4", fg: "#22C55E" },
  { key: "vid", label: "동영상", sub: "숏폼 · 광고", icon: Clapperboard, bg: "#FEF2F2", fg: "#EF4444" },
  { key: "deck", label: "프레젠테이션", sub: "슬라이드 제작", icon: Presentation, bg: "#F5F3FF", fg: "#8B5CF6" },
  // 2행 (4개)
  { key: "audio", label: "오디오", sub: "TTS · BGM", icon: AudioLines, bg: "#FAF5FF", fg: "#D946EF" },
  { key: "doc", label: "문서", sub: "보고서 · 워드", icon: FileText, bg: "#EFF6FF", fg: "#3B82F6" },
  { key: "doc_check", label: "서식", sub: "빈칸 채우기 · 문서 자동 생성", icon: Pencil, bg: "#ECFDF5", fg: "#10B981" },
  { key: "ppt_check", label: "PPT 검수", sub: "PPT 번역 · 오타 체크", icon: CircleCheck, bg: "#FFFBEB", fg: "#F59E0B" },
];

// Reusable Sidebar Item with refined micro-interactions
const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  isCollapsed = false,
  isDarkMode = false,
  onClick
}: {
  icon: ElementType;
  label: string;
  active?: boolean;
  isCollapsed?: boolean;
  isDarkMode?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 group cursor-pointer ${
      isCollapsed ? "justify-center w-11 h-11 p-0 mx-auto" : "w-full hover:translate-x-0.5"
    } ${
      active
        ? (isDarkMode ? "bg-slate-800/70 text-[#6D8FFF] font-semibold" : "bg-[#EFF6FF] text-[#4F7BFF] font-semibold shadow-[0_2px_8px_-3px_rgba(59,99,246,0.12)]")
        : (isDarkMode ? "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200" : "text-[#64748B] hover:bg-slate-50 hover:text-slate-900")
    }`}
    title={isCollapsed ? label : undefined}
  >
    <Icon
      size={20}
      className={`transition-colors duration-200 ${
        active
          ? (isDarkMode ? "text-[#6D8FFF]" : "text-[#4F7BFF]")
          : (isDarkMode ? "text-slate-500 group-hover:text-slate-300" : "text-slate-400 group-hover:text-slate-600")
      }`}
    />
    {!isCollapsed && <span className="tracking-tight">{label}</span>}
  </button>
);

const SidebarHistoryItem = ({ title, isDarkMode = false }: { title: string; isDarkMode?: boolean }) => (
  <button className={`w-full text-left px-4 py-2.5 text-[13px] rounded-xl truncate transition-all duration-200 hover:translate-x-0.5 ${
    isDarkMode 
      ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40" 
      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
  }`}>
    {title}
  </button>
);

const TEMPLATES = [
  // --- COLUMN 1 ---
  {
    id: 1,
    title: "고요한 호수의 일출",
    category: "AI 이미지",
    tags: ["#자연", "#풍경"],
    column: 1,
    aspect: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "영화 스타일 초상화",
    category: "AI 이미지",
    tags: ["#초상화", "#영화"],
    column: 1,
    aspect: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "네온 사이버펑크 도시",
    category: "AI 이미지",
    tags: ["#사이버펑크", "#도시"],
    column: 1,
    aspect: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "3D 아이소메트릭 룸",
    category: "AI 이미지",
    tags: ["#3D", "#인테리어"],
    column: 1,
    aspect: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "제품 광고 컷",
    category: "AI 이미지",
    tags: ["#자연", "#식물"],
    column: 1,
    aspect: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80"
  },

  // --- COLUMN 2 ---
  {
    id: 6,
    title: "AI 브랜드 2026",
    category: "카드뉴스",
    tags: ["#카드뉴스", "#브랜드"],
    column: 2,
    aspect: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Q4 마케팅 인사이트",
    category: "카드뉴스",
    tags: ["#카드뉴스", "#비즈니스"],
    column: 2,
    aspect: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "공동 챌린지 7일",
    category: "카드뉴스",
    tags: ["#카드뉴스", "#라이프"],
    column: 2,
    aspect: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "웹툰 어반 판타지 배경",
    category: "웹툰",
    tags: ["#웹툰", "#어반판타지", "#4:3"],
    column: 2,
    aspect: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    title: "웹툰 로맨스 판타지 드레스",
    category: "웹툰",
    tags: ["#웹툰", "#로판", "#4:3"],
    column: 2,
    aspect: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    title: "웹툰 일상물 학교 복도",
    category: "웹툰",
    tags: ["#웹툰", "#학원물", "#4:3"],
    column: 2,
    aspect: "aspect-[4/3]",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
  },

  // --- COLUMN 3 ---
  {
    id: 12,
    title: "화장품 상세페이지",
    category: "상세페이지",
    tags: ["#상세페이지", "#뷰티"],
    column: 3,
    aspect: "aspect-[1/2.8]",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    title: "자연 속 독수리 실루엣",
    category: "AI 이미지",
    tags: ["#자연", "#힐링"],
    column: 3,
    aspect: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80"
  },

  // --- COLUMN 4 ---
  {
    id: 14,
    title: "식품 상세페이지",
    category: "상세페이지",
    tags: ["#상세페이지", "#식품"],
    column: 4,
    aspect: "aspect-[1/2.2]",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 15,
    title: "패션 상세페이지",
    category: "상세페이지",
    tags: ["#상세페이지", "#패션"],
    column: 4,
    aspect: "aspect-[1/2.2]",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
  }
];

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  activeTab,
  setActiveTab,
  recentChats,
  isDarkMode,
  setIsDarkMode
}: {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  activeTab: "home" | "image" | "credit" | "workspace" | "favorites";
  setActiveTab: (val: "home" | "image" | "credit" | "workspace" | "favorites") => void;
  recentChats: Array<{ id: string; title: string }>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}) => {
  const [isSeriesExpanded, setIsSeriesExpanded] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<"main" | "language" | "theme">("main");
  const [selectedLanguage, setSelectedLanguage] = useState("한국어");
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
        setActiveView("main");
      }
    };
    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  const LANGUAGES = ["한국어", "中文", "English", "日本語", "Tiếng Việt", "Español", "Русский", "Français"];

  return (
    <aside
      className={`h-screen flex flex-col shrink-0 transition-all duration-300 ease-in-out select-none relative border-r ${
        isDarkMode 
          ? "bg-[#171A21] border-[#2A3140]" 
          : "bg-white border-[#F1F5F9]"
      } ${isCollapsed ? "w-[72px]" : "w-[260px]"}`}
    >
      {/* Logo Area */}
      <div
        className={`h-[72px] flex items-center transition-all duration-300 relative ${
          isCollapsed ? "justify-center px-2" : "justify-between px-6"
        }`}
        onMouseEnter={() => isCollapsed && setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        {!isCollapsed ? (
          <>
            <img
              src={isDarkMode ? "/logo-typo-dark.png" : "/logo-typo.png"}
              alt="딸깍넷 로고"
              className="h-6 object-contain cursor-pointer active:scale-95 transition-transform"
              onClick={() => setIsCollapsed(true)}
            />
            <button
              onClick={() => setIsCollapsed(true)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isDarkMode 
                  ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" 
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
              title="사이드바 접기"
            >
              <Menu size={18} />
            </button>
          </>
        ) : (
          <div className="relative flex items-center justify-center">
            {isLogoHovered ? (
              <button
                onClick={() => {
                  setIsCollapsed(false);
                  setIsLogoHovered(false);
                }}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer animate-in fade-in duration-200 ${
                  isDarkMode 
                    ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Menu size={20} />
              </button>
            ) : (
              <img
                src="/logo.png"
                alt="딸깍넷 심볼"
                className="h-8 w-8 object-contain cursor-pointer hover:scale-105 active:scale-95 transition-transform animate-in fade-in duration-200"
                onClick={() => setIsCollapsed(false)}
              />
            )}

            {/* Custom Tooltip Bubble (like ChatGPT) when hovered! */}
            {isLogoHovered && (
              <div className={`absolute left-full ml-3.5 px-3 py-2 text-[11px] font-bold rounded-lg shadow-md whitespace-nowrap z-50 pointer-events-none animate-in fade-in slide-in-from-left-2 duration-150 flex items-center gap-1.5 ${
                isDarkMode 
                  ? "bg-[#1E232D] text-white border border-[#2A3140]" 
                  : "bg-slate-900 text-white"
              }`}>
                <span>사이드바 열기</span>
                <span className={`text-[10px] font-medium ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Ctrl + \</span>
              </div>
            )}
          </div>
        )}
      </div>



      {/* Main Menu */}
      <div className={`px-2 mt-2 flex flex-col gap-1 ${isCollapsed ? "px-0" : ""}`}>
        <SidebarItem
          icon={HomeIcon}
          label="홈"
          active={activeTab === "home"}
          isCollapsed={isCollapsed}
          isDarkMode={isDarkMode}
          onClick={() => setActiveTab("home")}
        />
        <SidebarItem 
          icon={Folder} 
          label="내 작업" 
          active={activeTab === "workspace"}
          isCollapsed={isCollapsed} 
          isDarkMode={isDarkMode}
          onClick={() => setActiveTab("workspace")}
        />
        <SidebarItem 
          icon={Star} 
          label="즐겨찾기" 
          active={activeTab === "favorites"}
          isCollapsed={isCollapsed} 
          isDarkMode={isDarkMode}
          onClick={() => setActiveTab("favorites")}
        />
      </div>

      {/* History List */}
      {!isCollapsed && (
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className={`text-[12px] font-bold tracking-tight ${
              isDarkMode ? "text-slate-500" : "text-slate-400"
            }`}>최근 대화</span>
          </div>
          <div className="flex flex-col gap-0.5 max-h-[220px] overflow-y-auto scrollbar-none">
            {recentChats.map((chat) => (
              <SidebarHistoryItem key={chat.id} title={chat.title} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      )}

      {/* Sidebar Footer Areas */}
      <div className={`mt-auto pb-6 relative transition-all duration-300 ${isCollapsed ? "px-2" : "px-4"}`} ref={profileMenuRef}>
        
        {/* Dropdown Menu Card (image_1.png 오른쪽 신버전 디자인 완벽 재현) */}
        <div
          className={`absolute rounded-[20px] shadow-[0_12px_38px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.03)] z-50 overflow-hidden transition-all duration-300 ease-in-out ${
            isCollapsed
              ? "bottom-4 left-[76px] w-[270px] origin-bottom-left"
              : "bottom-16 left-3.5 right-3.5 w-[calc(100%-28px)] origin-bottom"
          } ${
            isProfileMenuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-2 pointer-events-none"
          } ${
            isDarkMode ? "bg-[#1E232D] border border-[#2A3140]" : "bg-white border border-[#E2E8F0]"
          }`}
        >
          {activeView !== "theme" ? (
            /* Slide-In Container for Main Menu and Language Submenu */
            <div
              className="flex w-[200%] transition-transform duration-300 ease-out"
              style={{
                transform: activeView === "language" ? "translateX(-50%)" : "translateX(0%)",
              }}
            >
              {/* 1. Main View (메인 메뉴 리스트) */}
              <div className="w-1/2 flex flex-col shrink-0">
                {/* 상단 프로필 헤더 */}
                <div className="px-5 pt-5 pb-4 text-left">
                  <div className={`text-[15px] font-bold tracking-tight font-sans ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-900"}`}>최유정</div>
                  <div className="text-[12px] font-medium text-slate-400 mt-0.5 tracking-tight font-sans">cyj2406@gmail.com</div>
                </div>
                <div className={`h-[1px] w-full ${isDarkMode ? "bg-[#2A3140]" : "bg-[#F1F5F9]"}`} />

                {/* 메뉴 목록 */}
                <div className="p-2 flex flex-col gap-0.5 text-left">
                  {/* 1. 색상 모드 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveView("theme");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 group ${
                      isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isDarkMode ? (
                        <Moon size={18} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
                      ) : (
                        <Sun size={18} className="text-slate-450 group-hover:text-amber-500 transition-colors" />
                      )}
                      <span className="tracking-tight">색상 모드</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] text-slate-450 font-normal">{isDarkMode ? "다크 모드" : "화이트 모드"}</span>
                      <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>

                  {/* 2. 언어 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveView("language");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 group ${
                      isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={18} className="text-slate-400 group-hover:text-[#4F7BFF] transition-colors" />
                      <span className="tracking-tight">언어</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] text-slate-455 font-normal">{selectedLanguage}</span>
                      <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>

                  {/* Divider (Thin) */}
                  <div className={`h-[1px] my-1 mx-2 ${isDarkMode ? "bg-[#2A3140]" : "bg-[#F1F5F9]"}`} />

                  {/* 3. 커뮤니티 */}
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 group ${
                      isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <Users size={18} className="text-slate-400 group-hover:text-[#8B5CF6] transition-colors" />
                    <span className="tracking-tight">커뮤니티</span>
                  </a>

                  {/* 4. 문의하기 */}
                  <button
                    onClick={() => alert("문의하기 채널로 연결됩니다.")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 group text-left ${
                      isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <Mail size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                    <span className="tracking-tight">문의하기</span>
                  </button>

                  {/* 5. 설정 */}
                  <button
                    onClick={() => alert("설정 화면으로 이동합니다.")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 group text-left ${
                      isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-slate-700 hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <Settings size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="tracking-tight">설정</span>
                  </button>

                  {/* 6. 로그아웃 */}
                  <button
                    onClick={() => alert("로그아웃 되었습니다.")}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 group text-left ${
                      isDarkMode
                        ? "text-red-400 hover:bg-red-955/30 hover:text-red-300"
                        : "text-slate-650 hover:bg-red-50 hover:text-red-650"
                    }`}
                  >
                    <LogOut size={18} className={isDarkMode ? "text-red-400" : "text-slate-400 group-hover:text-red-500"} />
                    <span className="tracking-tight">로그아웃</span>
                  </button>
                </div>
              </div>

              {/* 2. Language Selection View (언어 선택 메뉴 - image_2.png 완벽 재현) */}
              <div className="w-1/2 flex flex-col shrink-0">
                {/* 상단 헤더 (이전으로 가기 버튼) */}
                <div className={`px-4 py-3.5 border-b flex items-center gap-2 text-left ${isDarkMode ? "border-[#2A3140]" : "border-[#F1F5F9]"}`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveView("main");
                    }}
                    className={`p-1 rounded-lg transition-colors ${isDarkMode ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"}`}
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <span className={`text-[13px] font-bold tracking-tight font-sans ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-800"}`}>언어 설정</span>
                </div>

                {/* 언어 리스트 */}
                <div className="p-2 max-h-[280px] overflow-y-auto flex flex-col gap-0.5 text-left">
                  {LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguage === lang;
                    return (
                      <button
                        key={lang}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLanguage(lang);
                          setTimeout(() => {
                            setActiveView("main");
                          }, 180);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${
                          isSelected
                            ? (isDarkMode ? "bg-slate-800 text-[#6D8FFF] font-semibold" : "bg-[#EFF6FF] text-[#4F7BFF] font-semibold")
                            : (isDarkMode ? "text-slate-350 hover:bg-slate-800/50" : "text-slate-700 hover:bg-[#F8FAFC]")
                        }`}
                      >
                        <span className="tracking-tight">{lang}</span>
                        {isSelected && <Check size={14} className={isDarkMode ? "text-[#6D8FFF]" : "text-[#4F7BFF]"} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* 3. Theme Selection View (색상 모드 설정 - 완벽 대칭) */
            <div className="w-full flex flex-col shrink-0">
              {/* 상단 헤더 */}
              <div className={`px-4 py-3.5 border-b flex items-center gap-2 text-left ${isDarkMode ? "border-[#2A3140]" : "border-[#F1F5F9]"}`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveView("main");
                  }}
                  className={`p-1 rounded-lg transition-colors ${isDarkMode ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800" : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"}`}
                >
                  <ArrowLeft size={16} />
                </button>
                <span className={`text-[13px] font-bold tracking-tight font-sans ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-800"}`}>테마 설정</span>
              </div>

              {/* 테마 목록 */}
              <div className="p-2 flex flex-col gap-0.5 text-left">
                {/* 화이트 모드 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDarkMode(false);
                    setTimeout(() => {
                      setActiveView("main");
                    }, 180);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${
                    !isDarkMode
                      ? (isDarkMode ? "bg-slate-800 text-[#6D8FFF] font-semibold" : "bg-[#EFF6FF] text-[#4F7BFF] font-semibold")
                      : (isDarkMode ? "text-slate-350 hover:bg-slate-800/50" : "text-slate-700 hover:bg-[#F8FAFC]")
                  }`}
                >
                  <span className="tracking-tight">화이트 모드</span>
                  {!isDarkMode && <Check size={14} className={isDarkMode ? "text-[#6D8FFF]" : "text-[#4F7BFF]"} />}
                </button>

                {/* 다크 모드 */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDarkMode(true);
                    setTimeout(() => {
                      setActiveView("main");
                    }, 180);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${
                    isDarkMode
                      ? (isDarkMode ? "bg-slate-800 text-[#6D8FFF] font-semibold" : "bg-[#EFF6FF] text-[#4F7BFF] font-semibold")
                      : (isDarkMode ? "text-slate-350 hover:bg-slate-800/50" : "text-slate-700 hover:bg-[#F8FAFC]")
                  }`}
                >
                  <span className="tracking-tight">다크 모드</span>
                  {isDarkMode && <Check size={14} className={isDarkMode ? "text-[#6D8FFF]" : "text-[#4F7BFF]"} />}
                </button>
              </div>
            </div>
          )}
        </div>



        {/* Sidebar Credit Widget Removed as requested */}

        {/* User Profile Trigger Button */}
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className={`w-full flex items-center text-left p-1.5 rounded-2xl transition-all duration-200 active:scale-[0.98] cursor-pointer ${
            isDarkMode 
              ? (isProfileMenuOpen ? "bg-slate-850" : "hover:bg-slate-800/60") 
              : (isProfileMenuOpen ? "bg-slate-50" : "hover:bg-slate-50")
          } ${isCollapsed ? "justify-center p-1" : "gap-3"}`}
        >
          <Avatar className={`w-9 h-9 rounded-full font-bold shrink-0 select-none ${
            isDarkMode
              ? "bg-slate-800 text-[#6D8FFF] border border-slate-700"
              : "bg-[#E0E7FF] text-[#4F46E5] border border-[#C7D2FE]"
          }`}>
            <AvatarFallback className="bg-transparent text-[13px] font-semibold">유정</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className={`text-[13px] font-bold truncate tracking-tight ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-900"}`}>최유정</div>
                <div className="text-[11px] font-medium text-slate-400 truncate mt-0.5 tracking-tight">cyj2406@gmail.com</div>
              </div>
              <div className={`p-1 rounded-lg transition-transform duration-200 shrink-0 ${
                isDarkMode 
                  ? `text-slate-400 hover:text-slate-200 ${isProfileMenuOpen ? "rotate-90 text-[#6D8FFF]" : ""}`
                  : `text-slate-400 hover:text-slate-600 ${isProfileMenuOpen ? "rotate-90 text-indigo-600" : ""}`
              }`}>
                <MoreHorizontal size={16} />
              </div>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

// 다크모드 채도 약화 틴트 컬러 헬퍼 함수
const getToolColors = (key: string, isDark: boolean) => {
  const specs: Record<string, { bg: string; fg: string }> = {
    img: isDark ? { bg: "rgba(245,158,11,0.12)", fg: "#F59E0B" } : { bg: "#FFF6ED", fg: "#F59E0B" },
    lp: isDark ? { bg: "rgba(34,197,94,0.12)", fg: "#22C55E" } : { bg: "#F0FDF4", fg: "#22C55E" },
    vid: isDark ? { bg: "rgba(239,68,68,0.12)", fg: "#EF4444" } : { bg: "#FEF2F2", fg: "#EF4444" },
    deck: isDark ? { bg: "rgba(139,92,246,0.12)", fg: "#A78BFA" } : { bg: "#F5F3FF", fg: "#8B5CF6" },
    audio: isDark ? { bg: "rgba(217,70,239,0.12)", fg: "#D946EF" } : { bg: "#FAF5FF", fg: "#D946EF" },
    doc: isDark ? { bg: "rgba(59,130,246,0.12)", fg: "#60A5FA" } : { bg: "#EFF6FF", fg: "#3B82F6" },
    doc_check: isDark ? { bg: "rgba(16,185,129,0.12)", fg: "#10B981" } : { bg: "#ECFDF5", fg: "#10B981" },
    ppt_check: isDark ? { bg: "rgba(245,158,11,0.12)", fg: "#F59E0B" } : { bg: "#FFFBEB", fg: "#F59E0B" },
  };
  return specs[key] || { bg: "#EFF6FF", fg: "#4F7BFF" };
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "check",
      title: "딸깍체크 검수 완료",
      desc: "요청하신 'K-POP 썸네일' 교정 검수가 성공적으로 완료되었습니다.",
      time: "3분 전",
      isRead: false
    },
    {
      id: 2,
      type: "credit",
      title: "크레딧 충전 성공",
      desc: "보너스 1,000 크레딧이 계정에 충전되었습니다.",
      time: "2시간 전",
      isRead: false
    },
    {
      id: 3,
      type: "feature",
      title: "신규 기능 출시 알림",
      desc: "더 스마트해진 '딸깍스튜디오 v2' 업데이트를 확인해보세요.",
      time: "어제",
      isRead: true
    }
  ]);

  const notifRef = useRef<HTMLDivElement>(null);
  const ratioRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const homeFileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"home" | "image" | "credit" | "workspace" | "favorites">("home");
  const [selectedTemplate, setSelectedTemplate] = useState<{ title: string; image: string } | null>(null);
  const [promptText, setPromptText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; type: 'image' | 'pdf' | 'doc' | 'excel' | 'zip' | 'other'; url?: string } | null>(null);
  const [isRatioPopoverOpen, setIsRatioPopoverOpen] = useState(false);
  const [workspaceFilter, setWorkspaceFilter] = useState("전체");
  const [isWorkspaceFilterOpen, setIsWorkspaceFilterOpen] = useState(false);
  const [workspaceSearch, setWorkspaceSearch] = useState("");
  const [favoriteTemplates, setFavoriteTemplates] = useState<Set<number>>(new Set());
  const [favoritesFilter, setFavoritesFilter] = useState("전체");

  const toggleFavorite = (id: number) => {
    setFavoriteTemplates(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  const [userCredits, setUserCredits] = useState(12121209);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [creditToast, setCreditToast] = useState<string | null>(null);
  const baseFileInputRef = useRef<HTMLInputElement>(null);
  const refFileInputRef = useRef<HTMLInputElement>(null);

  // --- CANVA INLINE EDITOR STATES ---
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(100);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [canvasElements, setCanvasElements] = useState<Array<any>>([]);
  const [editorHistory, setEditorHistory] = useState<Array<Array<any>>>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activePopover, setActivePopover] = useState<string | null>(null); // 'add', 'font', 'color', 'align', 'dimensions', 'layers'

  const [dragState, setDragState] = useState<{
    type: 'move' | 'resize' | 'rotate' | null;
    elementId: string;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
    startWidth: number;
    startHeight: number;
    startRotation: number;
    handle?: string;
  } | null>(null);

  useEffect(() => {
    if (!dragState) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvasEl = document.getElementById("canvas-workspace-area");
      if (!canvasEl) return;
      const rect = canvasEl.getBoundingClientRect();
      
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      
      const dxPercent = (dx / rect.width) * 100;
      const dyPercent = (dy / rect.height) * 100;

      if (dragState.type === 'move') {
        const newX = Math.max(-50, Math.min(150, dragState.startLeft + dxPercent));
        const newY = Math.max(-50, Math.min(150, dragState.startTop + dyPercent));
        
        setCanvasElements(prev => prev.map(el => 
          el.id === dragState.elementId ? { ...el, x: newX, y: newY } : el
        ));
      } else if (dragState.type === 'resize') {
        let newWidth = dragState.startWidth;
        let newHeight = dragState.startHeight;
        let newX = dragState.startLeft;
        let newY = dragState.startTop;
        
        const handle = dragState.handle;
        if (handle === 'br') {
          newWidth = Math.max(2, dragState.startWidth + dxPercent);
          newHeight = Math.max(2, dragState.startHeight + dyPercent);
        } else if (handle === 'bl') {
          newWidth = Math.max(2, dragState.startWidth - dxPercent);
          newHeight = Math.max(2, dragState.startHeight + dyPercent);
          if (newWidth > 2) newX = dragState.startLeft + dxPercent;
        } else if (handle === 'tr') {
          newWidth = Math.max(2, dragState.startWidth + dxPercent);
          newHeight = Math.max(2, dragState.startHeight - dyPercent);
          if (newHeight > 2) newY = dragState.startTop + dyPercent;
        } else if (handle === 'tl') {
          newWidth = Math.max(2, dragState.startWidth - dxPercent);
          newHeight = Math.max(2, dragState.startHeight - dyPercent);
          if (newWidth > 2) newX = dragState.startLeft + dxPercent;
          if (newHeight > 2) newY = dragState.startTop + dyPercent;
        }

        setCanvasElements(prev => prev.map(el => 
          el.id === dragState.elementId ? { ...el, x: newX, y: newY, width: newWidth, height: newHeight } : el
        ));
      } else if (dragState.type === 'rotate') {
        const elDom = document.getElementById(`canvas-el-${dragState.elementId}`);
        if (!elDom) return;
        const elRect = elDom.getBoundingClientRect();
        const centerX = elRect.left + elRect.width / 2;
        const centerY = elRect.top + elRect.height / 2;
        
        const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        let angleDeg = (angleRad * 180) / Math.PI + 90;
        if (angleDeg < 0) angleDeg += 360;
        
        setCanvasElements(prev => prev.map(el => 
          el.id === dragState.elementId ? { ...el, rotation: Math.round(angleDeg) } : el
        ));
      }
    };

    const handleMouseUp = () => {
      saveToHistory(canvasElements);
      setDragState(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, canvasElements]);

  const saveToHistory = (newElements: Array<any>) => {
    const nextHistory = editorHistory.slice(0, historyIndex + 1);
    setEditorHistory([...nextHistory, newElements]);
    setHistoryIndex(nextHistory.length);
  };

  const undoEditor = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setCanvasElements(editorHistory[prevIdx]);
    }
  };

  const redoEditor = () => {
    if (historyIndex < editorHistory.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setCanvasElements(editorHistory[nextIdx]);
    }
  };

  const addTextElement = (textType: 'title' | 'subtitle' | 'body' = 'title') => {
    let text = "텍스트를 입력하세요";
    let fontSize = 22;
    let fontWeight = false;
    let height = 12;

    if (textType === 'title') {
      text = "큰 제목 입력";
      fontSize = 32;
      fontWeight = true;
      height = 16;
    } else if (textType === 'subtitle') {
      text = "부제목 입력";
      fontSize = 20;
      fontWeight = true;
      height = 10;
    } else {
      text = "본문 텍스트 내용을 여기에 입력하세요.";
      fontSize = 14;
      fontWeight = false;
      height = 20;
    }

    const newEl = {
      id: `text-${Date.now()}`,
      type: "text",
      x: 20,
      y: 40,
      width: 60,
      height: height,
      rotation: 0,
      opacity: 1,
      zIndex: canvasElements.length + 1,
      text: text,
      fontFamily: "Pretendard",
      fontSize: fontSize,
      color: isDarkMode ? "#F8FAFC" : "#1E293B",
      bgColor: "transparent",
      bold: fontWeight,
      italic: false,
      underline: false,
      align: "center",
      letterSpacing: 0,
      lineHeight: 1.4,
      textShadow: false,
      textStroke: false,
      visible: true,
      locked: false,
      name: textType === 'title' ? "큰 제목" : textType === 'subtitle' ? "부제목" : "본문",
    };
    const nextElements = [...canvasElements, newEl];
    setCanvasElements(nextElements);
    setSelectedElementId(newEl.id);
    saveToHistory(nextElements);
  };

  const addShapeElement = (shapeType: 'rect' | 'circle' | 'triangle') => {
    const newEl = {
      id: `shape-${Date.now()}`,
      type: "shape",
      shapeType,
      x: 40,
      y: 40,
      width: 20,
      height: 20,
      rotation: 0,
      opacity: 0.8,
      zIndex: canvasElements.length + 1,
      fillColor: shapeType === "rect" ? "#3B63F6" : shapeType === "circle" ? "#10B981" : "#EF4444",
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: shapeType === "circle" ? 9999 : 8,
      visible: true,
      locked: false,
      name: shapeType === "rect" ? "사각형" : shapeType === "circle" ? "원형" : "삼각형",
    };
    const nextElements = [...canvasElements, newEl];
    setCanvasElements(nextElements);
    setSelectedElementId(newEl.id);
    saveToHistory(nextElements);
  };

  const updateElementProperty = (id: string, prop: string, value: any) => {
    const nextElements = canvasElements.map(el => {
      if (el.id === id) {
        return { ...el, [prop]: value };
      }
      return el;
    });
    setCanvasElements(nextElements);
    saveToHistory(nextElements);
  };

  const deleteElement = (id: string) => {
    const nextElements = canvasElements.filter(el => el.id !== id);
    setCanvasElements(nextElements);
    setSelectedElementId(null);
    saveToHistory(nextElements);
  };

  const moveElementOrder = (id: string, direction: 'front' | 'back') => {
    const target = canvasElements.find(el => el.id === id);
    if (!target) return;
    const sorted = [...canvasElements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
    const idx = sorted.findIndex(el => el.id === id);
    
    if (direction === 'front' && idx < sorted.length - 1) {
      const temp = sorted[idx].zIndex;
      sorted[idx].zIndex = sorted[idx + 1].zIndex;
      sorted[idx + 1].zIndex = temp;
    } else if (direction === 'back' && idx > 0) {
      const temp = sorted[idx].zIndex;
      sorted[idx].zIndex = sorted[idx - 1].zIndex;
      sorted[idx - 1].zIndex = temp;
    }
    
    setCanvasElements(sorted);
    saveToHistory(sorted);
  };

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentPkg, setSelectedPaymentPkg] = useState<{ amount: number; price: string } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "kakao" | "toss" | "payco">("card");
  const [selectedCardCompany, setSelectedCardCompany] = useState("");
  const [isPaymentAgreementChecked, setIsPaymentAgreementChecked] = useState(true);
  // Workspace-specific state declarations for split chat/editor screen
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [isBasePopoverOpen, setIsBasePopoverOpen] = useState(false);
  const [isRefPopoverOpen, setIsRefPopoverOpen] = useState(false);
  
  // Refined Base / Reference image structures to hold custom previews
  const [baseImage, setBaseImage] = useState<{ name: string; url: string } | null>(null);
  const [referenceImages, setReferenceImages] = useState<Array<{ name: string; url: string }>>([
    { name: "reference-1.png", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=120&q=80" }
  ]);



  const handleBaseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBaseImage({ name: file.name, url: url });
      setChatHistory(prev => [
        ...prev,
        { sender: "ai", text: `📎 로컬 파일 **${file.name}**을 베이스 이미지(B)로 업로드했습니다.` }
      ]);
    }
    setIsBasePopoverOpen(false);
  };

  const handleReferenceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (referenceImages.length < 3) {
        const url = URL.createObjectURL(file);
        setReferenceImages(prev => [...prev, { name: file.name, url: url }]);
        setChatHistory(prev => [
          ...prev,
          { sender: "ai", text: `📎 로컬 파일 **${file.name}**을 참조 이미지(R)로 업로드했습니다.` }
        ]);
      }
    }
    setIsRefPopoverOpen(false);
  };

  const setGeneratedAsBase = () => {
    if (generatedImageUrl) {
      setBaseImage({ name: "생성된 시안 #B", url: generatedImageUrl });
      setChatHistory(prev => [
        ...prev,
        { sender: "ai", text: "👉 우측의 생성 완료 이미지를 **베이스 이미지(B)**로 탑재했습니다. 이를 기초로 변형을 지시하실 수 있습니다." }
      ]);
    }
    setIsBasePopoverOpen(false);
  };

  const setGeneratedAsReference = () => {
    if (generatedImageUrl && referenceImages.length < 3) {
      setReferenceImages(prev => [...prev, { name: `생성된 시안 #R${prev.length + 1}`, url: generatedImageUrl }]);
      setChatHistory(prev => [
        ...prev,
        { sender: "ai", text: "👉 우측의 생성 완료 이미지를 **참조 이미지(R)**로 추가했습니다. 최대 3개까지 결합하여 시너지를 낼 수 있습니다." }
      ]);
    }
    setIsRefPopoverOpen(false);
  };

  const [mainTitleText, setMainTitleText] = useState("K-POP");
  const [subTitleText, setSubTitleText] = useState("MUSIC LIST");
  const [visualFormPromptText, setVisualFormPromptText] = useState(
    "A close-up beauty-editorial portrait of a Korean K-POP idol, soft natural skin tones, glossy color grading, cinematic rim lighting, magazine cover composition, 50mm lens, photoreal, 8K"
  );
  const [workspaceTitle, setWorkspaceTitle] = useState("자유 이미지 생성 작업 스페이스");
  const [isEditingWorkspaceTitle, setIsEditingWorkspaceTitle] = useState(false);
  const [recentChats, setRecentChats] = useState<Array<{ id: string; title: string }>>([
    { id: "hist-1", title: "2026 금융 트렌드 PPT" },
    { id: "hist-2", title: "K-POP 썸네일 시리즈" },
    { id: "hist-3", title: "재택근무 카드뉴스" },
    { id: "hist-4", title: "브랜드 BGM 30s" }
  ]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);

  const updateWorkspaceTitle = (newTitle: string) => {
    setWorkspaceTitle(newTitle);
    if (currentWorkspaceId) {
      setRecentChats(prev => prev.map(chat => 
        chat.id === currentWorkspaceId ? { ...chat, title: newTitle } : chat
      ));
    }
  };

  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [chatInputValue, setChatInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<
    Array<{ 
      sender: "ai" | "user"; 
      text: string; 
      hasForm?: boolean; 
      suggestions?: string[];
      templateImage?: string;
      templateTitle?: string;
    }>
  >([
    {
      sender: "user",
      text: "프롬프트: 새로운 이미지 생성 시안을 기반으로 만들어줘. 고급스러운 디테일로 구성해줘."
    },
    {
      sender: "ai",
      text: "작성하신 프롬프트 시안에 맞춰 고유 기획을 구성해 드릴게요. 아래 상세 카드 폼에 메인/서브 타이틀 텍스트와 구체적인 비주얼 묘사를 작성하고 생성하기를 눌러주세요.",
      hasForm: true
    }
  ]);

  const handleStartGeneration = () => {
    setIsWorkspaceActive(true);
    
    // Automatically set form state depending on what was selected
    const userPrompt = promptText || "새로운 이미지 생성 시안을 기반으로 만들어줘. 고급스러운 디테일로 구성해줘.";
    const initialTitle = selectedTemplate 
      ? `${selectedTemplate.title} 작업 스페이스` 
      : "자유 이미지 생성 작업 스페이스";
    
    setWorkspaceTitle(initialTitle);
    
    const newId = `ws-${Date.now()}`;
    setCurrentWorkspaceId(newId);

    if (selectedTemplate) {
      setVisualFormPromptText(
        selectedTemplate.title.includes("K-POP") || selectedTemplate.title.includes("2026")
          ? "A close-up beauty-editorial portrait of a Korean K-POP idol, soft natural skin tones, glossy color grading, cinematic rim lighting, magazine cover composition, 50mm lens, photoreal, 8K"
          : `A professional, high-fidelity design layout of ${selectedTemplate.title}, emphasizing commercial aesthetics, beautiful gradients, balanced typography, and highly polished art style.`
      );
      setMainTitleText(selectedTemplate.title.split(" ")[0] || "K-POP");
      setSubTitleText(selectedTemplate.title.split(" ").slice(1).join(" ") || "MUSIC LIST");
    } else {
      setVisualFormPromptText(userPrompt);
      setMainTitleText("딸깍");
      setSubTitleText("AI GENERATED");
    }

    // Set initial chat history for premium narrative flow!
    setChatHistory([
      {
        sender: "user",
        text: selectedTemplate 
          ? `[선택 템플릿: ${selectedTemplate.title}]\n프롬프트: ${userPrompt}`
          : `프롬프트: ${userPrompt}`,
        templateImage: selectedTemplate ? selectedTemplate.image : undefined,
        templateTitle: selectedTemplate ? selectedTemplate.title : undefined
      },
      {
        sender: "ai",
        text: selectedTemplate
          ? "좋은 선택입니다! 해당 템플릿의 핵심 스타일과 어울리도록 세부 내용을 추가 조율해 드릴게요. 아래 상세 카드 폼에 원하는 타이틀 텍스트와 비주얼 묘사를 작성하고 생성하기를 눌러주세요."
          : "작성하신 프롬프트 시안에 맞춰 고유 기획을 구성해 드릴게요. 아래 상세 카드 폼에 메인/서브 타이틀 텍스트와 구체적인 비주얼 묘사를 작성하고 생성하기를 눌러주세요.",
        hasForm: true
      }
    ]);

    // Keep Right Pane empty until user explicitly clicks the card generation button!
    setIsLoadingImage(false);
    setGeneratedImageUrl(null);
  };

  const handleApplyTemplate = (t: { title: string; image: string; aspect?: string }) => {
    setSelectedTemplate({ title: t.title, image: t.image });
    
    // Automatically synchronize the aspect ratio of the applied template!
    if (t.aspect) {
      if (t.aspect.includes("4/3")) setAspectRatio("4:3");
      else if (t.aspect.includes("16/9")) setAspectRatio("16:9");
      else if (t.aspect.includes("1/1")) setAspectRatio("1:1");
      else if (t.aspect.includes("9/16")) setAspectRatio("9:16");
      else if (t.aspect.includes("2/3")) setAspectRatio("2:3");
    }
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (selectedCategory === "전체") return true;
    return t.category === selectedCategory;
  });

  // Dynamically distribute filtered cards to 4 columns to preserve beautiful packing!
  const col1: typeof TEMPLATES = [];
  const col2: typeof TEMPLATES = [];
  const col3: typeof TEMPLATES = [];
  const col4: typeof TEMPLATES = [];

  filteredTemplates.forEach((t, i) => {
    if (selectedCategory === "전체") {
      if (t.column === 1) col1.push(t);
      else if (t.column === 2) col2.push(t);
      else if (t.column === 3) col3.push(t);
      else if (t.column === 4) col4.push(t);
    } else {
      // Round-robin distribution to keep columns balanced when filtered!
      const colIndex = i % 4;
      if (colIndex === 0) col1.push(t);
      else if (colIndex === 1) col2.push(t);
      else if (colIndex === 2) col3.push(t);
      else col4.push(t);
    }
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotifOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ratioRef.current && !ratioRef.current.contains(e.target as Node)) {
        setIsRatioPopoverOpen(false);
      }
    };
    if (isRatioPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRatioPopoverOpen]);

  useEffect(() => {
    if (creditToast) {
      const timer = setTimeout(() => {
        setCreditToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [creditToast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKB = (file.size / 1024).toFixed(1);
      const isImage = file.type.startsWith('image/');
      let type: 'image' | 'pdf' | 'doc' | 'excel' | 'zip' | 'other' = 'other';
      if (isImage) type = 'image';
      else if (file.type === 'application/pdf') type = 'pdf';
      else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) type = 'doc';
      else if (file.name.endsWith('.xls') || file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) type = 'excel';
      else if (file.name.endsWith('.zip') || file.name.endsWith('.rar')) type = 'zip';
      const url = isImage ? URL.createObjectURL(file) : undefined;
      setAttachedFile({
        name: file.name,
        size: `${sizeKB}KB`,
        type,
        url
      });
    }
  };

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-screen w-screen bg-[#F8FAFC]" />;
  }

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${
      isDarkMode ? "bg-[#111318] text-[#F8FAFC]" : "bg-[#F8FAFC] text-slate-900"
    }`}>
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recentChats={recentChats}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-y-auto">
        {/* TopBar with strict layout spacing */}
        {/* TopBar with strict layout spacing - Hide in Workspace to prevent clashing */}
        {!isWorkspaceActive && (
          <header className="absolute top-0 right-0 left-0 h-[72px] flex items-center justify-end px-8 pointer-events-none z-20">
            <div className="flex items-center gap-3 pointer-events-auto">
              <button 
                onClick={() => setIsCreditModalOpen(true)}
                className={`flex items-center gap-2 rounded-full py-1.5 px-3.5 active:scale-95 transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-[#1E232D] border border-[#6D8FFF]/30 hover:border-[#6D8FFF]/60 hover:bg-[#252B36] text-[#F8FAFC] shadow-[0_2px_10px_rgba(109,143,255,0.08)] hover:shadow-[0_4px_16px_rgba(109,143,255,0.15)]"
                    : "bg-white border border-[#E5E7EB] hover:bg-[#F1F5F9] text-[#1F2937] shadow-sm"
                }`}
                title="크레딧 충전"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-white ${
                  isDarkMode ? "bg-[#6D8FFF]" : "bg-[#4F7BFF]"
                }`}>
                  C
                </div>
                <span className="text-[13px] font-bold tracking-tight">
                  {userCredits.toLocaleString()}
                </span>
              </button>
              
              {/* 알림 드롭다운 컨테이너 */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className={`w-9 h-9 flex items-center justify-center rounded-full active:scale-95 transition-all relative cursor-pointer ${
                    isNotifOpen
                      ? (isDarkMode ? "bg-[#1E232D] text-[#F8FAFC]" : "bg-[#F1F5F9] text-[#1F2937]")
                      : (isDarkMode ? "text-slate-400 hover:text-slate-200 hover:bg-[#252B36]" : "text-[#94A3B8] hover:text-[#1F2937] hover:bg-[#F1F5F9]")
                  }`}
                  title="알림"
                >
                  <Bell size={20} />
                  {notifications.some(n => !n.isRead) && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3B63F6] rounded-full border border-white animate-pulse" />
                  )}
                </button>

                {/* 알림 창 디자인 (image_1.png 오른쪽 디자인과 동일한 프리미엄 아이덴티티 적용) */}
                <div
                  className={`absolute right-0 mt-3 w-[360px] bg-white border border-[#E2E8F0] rounded-[24px] shadow-[0_12px_38px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.03)] z-50 overflow-hidden transition-all duration-300 ease-in-out origin-top-right ${
                    isNotifOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* 상단 알림 헤더 */}
                  <div className="px-5 pt-5 pb-4 flex items-center justify-between">
                    <div className="text-[15px] font-bold text-slate-900 tracking-tight font-sans">알림</div>
                    {notifications.some(n => !n.isRead) && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[12px] font-semibold text-[#3B63F6] hover:text-blue-700 transition-colors cursor-pointer"
                      >
                        모두 읽음으로 표시
                      </button>
                    )}
                  </div>
                  <div className="h-[1px] bg-[#F1F5F9] w-full" />

                  {/* 알림 아이템 목록 */}
                  <div className="p-2.5 max-h-[360px] overflow-y-auto flex flex-col gap-1">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => handleMarkAsRead(n.id)}
                          className={`w-full text-left p-3 rounded-2xl transition-all duration-200 active:scale-[0.99] flex gap-3.5 relative group cursor-pointer ${
                            n.isRead ? "bg-white hover:bg-[#F8FAFC]" : "bg-[#EFF6FF]/35 hover:bg-[#EFF6FF]/60"
                          }`}
                        >
                          {/* 왼쪽 아이콘 영역 */}
                          <div className="shrink-0">
                            {n.type === "check" && (
                              <div className="w-8.5 h-8.5 rounded-xl bg-blue-50 flex items-center justify-center text-[#3B63F6] border border-blue-100">
                                <CircleCheck size={16} />
                              </div>
                            )}
                            {n.type === "credit" && (
                              <div className="w-8.5 h-8.5 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100">
                                <Sparkles size={16} />
                              </div>
                            )}
                            {n.type === "feature" && (
                              <div className="w-8.5 h-8.5 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 border border-indigo-100">
                                <Megaphone size={16} />
                              </div>
                            )}
                          </div>

                          {/* 텍스트 내용 영역 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[13px] font-bold tracking-tight ${n.isRead ? "text-slate-800" : "text-slate-900"}`}>
                                {n.title}
                              </span>
                              <span className="text-[11px] font-medium text-slate-400 shrink-0">
                                {n.time}
                              </span>
                            </div>
                            <p className="text-[12px] font-medium text-slate-500 mt-1 leading-relaxed tracking-tight break-all">
                              {n.desc}
                            </p>
                          </div>

                          {/* 읽지 않은 알림 블루 닷 표시 */}
                          {!n.isRead && (
                            <div className="absolute right-3.5 top-3.5 w-1.5 h-1.5 rounded-full bg-[#3B63F6]" />
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="py-12 text-center">
                        <p className="text-[13px] font-semibold text-slate-400">새로운 알림이 없습니다.</p>
                      </div>
                    )}
                  </div>

                  {/* 알림창 하단 푸터 */}
                  <div className="h-[1px] bg-[#F1F5F9] w-full" />
                  <div className="p-3 text-center bg-[#F8FAFC]/55">
                    <button className="text-[12px] font-bold text-slate-500 hover:text-slate-800 transition-colors w-full cursor-pointer">
                      과거 알림 전체 보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}

        {activeTab === "workspace" ? (
          /* ==========================================
             WORKSPACE VIEW (내 작업)
             ========================================== */
          <div className="flex-1 flex flex-col pt-[92px] pb-10 px-8 max-w-[1100px] mx-auto w-full select-none animate-in fade-in duration-200">
            {/* Header Area */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  isDarkMode 
                    ? "bg-slate-800/60 border-slate-700 text-[#6D8FFF]" 
                    : "bg-blue-50 border-blue-100 text-[#3B63F6]"
                }`}>
                  <Folder size={20} />
                </div>
                <h1 className={`text-[22px] font-black tracking-tight font-sans ${
                  isDarkMode ? "text-[#F8FAFC]" : "text-slate-800"
                }`}>내 작업</h1>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={workspaceSearch}
                    onChange={(e) => setWorkspaceSearch(e.target.value)}
                    placeholder="검색어를 입력해 주세요" 
                    className={`w-[260px] h-[38px] pl-10 pr-4 rounded-xl border text-[13px] font-medium transition-all shadow-sm focus:outline-none ${
                      isDarkMode
                        ? "border-[#2A3140] bg-[#1B1F27] text-[#F8FAFC] placeholder:text-slate-500 focus:border-[#6D8FFF] focus:ring-1 focus:ring-slate-850"
                        : "border-slate-200 bg-white text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    }`}
                  />
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setIsWorkspaceFilterOpen(!isWorkspaceFilterOpen)}
                    className={`flex items-center gap-2 px-3.5 h-[38px] rounded-xl text-[13px] font-bold active:scale-95 transition-all shadow-sm cursor-pointer border ${
                      isDarkMode
                        ? workspaceFilter !== "전체"
                          ? "border-blue-900 bg-blue-950/30 text-[#6D8FFF]"
                          : "bg-[#1E232D] border-[#2A3140] text-slate-300 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                        : workspaceFilter !== "전체" 
                          ? "border-blue-300 bg-blue-50/50 text-[#3B63F6]" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <Filter size={15} /> {workspaceFilter === "전체" ? "필터" : workspaceFilter}
                  </button>
                  {isWorkspaceFilterOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsWorkspaceFilterOpen(false)} />
                      <div className={`absolute right-0 mt-2 w-44 rounded-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200 border ${
                        isDarkMode
                          ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                          : "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100"
                      }`}>
                        {["전체", "이미지", "랜딩페이지", "동영상", "문서", "프레젠테이션", "오디오"].map((cat) => (
                          <div 
                            key={cat}
                            onClick={() => {
                              setWorkspaceFilter(cat);
                              setIsWorkspaceFilterOpen(false);
                            }}
                            className={`px-3 py-2 text-[13px] font-semibold rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                              workspaceFilter === cat 
                                ? (isDarkMode ? "bg-slate-800 text-[#6D8FFF]" : "bg-[#EFF6FF] text-[#3B63F6]") 
                                : (isDarkMode ? "text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")
                            }`}
                          >
                            <span>{cat}</span>
                            {workspaceFilter === cat && <Check size={14} className={isDarkMode ? "text-[#6D8FFF]" : "text-[#3B63F6]"} />}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Simple Clean List */}
            <div className={`rounded-[24px] overflow-hidden flex flex-col border ${
              isDarkMode
                ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                : "bg-white border-[#E2E8F0] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            }`}>
              <div className="flex flex-col py-2 px-2">
                {[
                  { title: "투명 피부, 시원한 물방울", category: "이미지", date: "2025. 11. 26." },
                  { title: "아쿠아 글로우 상세페이지 생성", category: "이미지", date: "2025. 4. 9." },
                  { title: "딸깍스토어 랜딩페이지 구성", category: "랜딩페이지", date: "2025. 4. 9." },
                  { title: "딸깍스토어 랜딩페이지 제작", category: "랜딩페이지", date: "2025. 4. 8." },
                  { title: "딸깍* 랜딩페이지 제작", category: "랜딩페이지", date: "2025. 4. 8." },
                  { title: "딸깍페이지 랜딩페이지 제작", category: "랜딩페이지", date: "2025. 4. 7." },
                  { title: "Untitled", category: "동영상", date: "2025. 4. 2." },
                  { title: "재택근무 생산성 카드뉴스", category: "프레젠테이션", date: "2025. 4. 2." },
                  { title: "Untitled", category: "문서", date: "2023. 11. 19." },
                  { title: "Untitled", category: "오디오", date: "2023. 8. 19." },
                  { title: "사이버 글램 K-뷰티 아이돌 초상", category: "이미지", date: "2023. 8. 19." }
                ].filter(item => workspaceFilter === "전체" || item.category === workspaceFilter)
                 .filter(item => item.title.toLowerCase().includes(workspaceSearch.toLowerCase()))
                 .map((item, idx) => {
                  let bg = isDarkMode ? "rgba(59,130,246,0.12)" : "#EFF6FF";
                  let fg = isDarkMode ? "#60A5FA" : "#3B63F6";
                  if (item.category === "이미지") { 
                    bg = isDarkMode ? "rgba(245,158,11,0.12)" : "#FFF7ED"; 
                    fg = isDarkMode ? "#F59E0B" : "#EA580C"; 
                  } else if (item.category === "랜딩페이지") { 
                    bg = isDarkMode ? "rgba(34,197,94,0.12)" : "#F0FDF4"; 
                    fg = isDarkMode ? "#22C55E" : "#16A34A"; 
                  } else if (item.category === "동영상") { 
                    bg = isDarkMode ? "rgba(239,68,68,0.12)" : "#FEF2F2"; 
                    fg = isDarkMode ? "#EF4444" : "#DC2626"; 
                  } else if (item.category === "문서") { 
                    bg = isDarkMode ? "rgba(59,130,246,0.12)" : "#EFF6FF"; 
                    fg = isDarkMode ? "#60A5FA" : "#3B63F6"; 
                  } else if (item.category === "프레젠테이션") { 
                    bg = isDarkMode ? "rgba(139,92,246,0.12)" : "#F5F3FF"; 
                    fg = isDarkMode ? "#A78BFA" : "#7C3AED"; 
                  } else if (item.category === "오디오") { 
                    bg = isDarkMode ? "rgba(217,70,239,0.12)" : "#FAF5FF"; 
                    fg = isDarkMode ? "#E879F9" : "#C026D3"; 
                  }

                  return (
                    <div key={idx} className={`flex items-center justify-between px-5 py-4 border-b last:border-0 rounded-xl transition-colors group cursor-pointer ${
                      isDarkMode ? "border-[#2A3140] hover:bg-[#252B36]" : "border-slate-100 hover:bg-blue-50/50"
                    }`}>
                      <span className={`text-[14px] font-bold tracking-tight transition-colors truncate pr-4 flex-1 ${
                        isDarkMode ? "text-[#F8FAFC] group-hover:text-[#6D8FFF]" : "text-slate-700 group-hover:text-[#3B63F6]"
                      }`}>
                        {item.title}
                      </span>
                      <div className="flex items-center justify-end gap-6 shrink-0 w-[240px]">
                        <span 
                          className="text-[12px] font-bold px-2.5 py-1 rounded-md min-w-[70px] text-center shrink-0"
                          style={{ backgroundColor: bg, color: fg }}
                        >
                          {item.category}
                        </span>
                        <span className={`text-[13px] font-medium font-sans tracking-tight shrink-0 w-[85px] text-right ${
                          isDarkMode ? "text-[#64748B]" : "text-slate-400"
                        }`}>
                          {item.date}
                        </span>
                        <button className={`opacity-0 group-hover:opacity-100 transition-opacity w-5 flex justify-end shrink-0 ${
                          isDarkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-300 hover:text-slate-650"
                        }`}>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-1.5 font-sans">
              <button className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
                isDarkMode
                  ? "text-slate-500 hover:text-slate-300 hover:bg-[#1E232D] border-transparent hover:border-[#2A3140]"
                  : "text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm"
              }`}>
                <ChevronLeft size={16}/>
              </button>
              <button className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-[13px] shadow-sm cursor-pointer ${
                isDarkMode ? "bg-[#6D8FFF] text-white" : "bg-[#3B63F6] text-white"
              }`}>1</button>
              <button className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-[13px] border transition-all cursor-pointer ${
                isDarkMode
                  ? "text-slate-400 hover:text-white hover:bg-[#1E232D] border-transparent hover:border-[#2A3140]"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm"
              }`}>2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 font-bold text-[13px] hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer">
                <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        ) : activeTab === "favorites" ? (
          /* ==========================================
             FAVORITES VIEW (즐겨찾기)
             ========================================== */
          <div className="flex-1 flex flex-col pt-[92px] pb-10 px-8 max-w-[1100px] mx-auto w-full select-none animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  isDarkMode
                    ? "border-[#2A3140] text-[#6D8FFF]"
                    : "border-[#C7D7FF] text-[#4F7BFF]"
                } `} style={{ backgroundColor: isDarkMode ? "rgba(59,130,246,0.12)" : "#EEF3FF" }}>
                  <Star size={18} strokeWidth={2} />
                </div>
                <div>
                  <h1 className={`text-[22px] font-black tracking-tight font-sans ${
                    isDarkMode ? "text-[#F8FAFC]" : "text-[#1F2937]"
                  }`}>즐겨찾기</h1>
                </div>
              </div>
              {/* Category filter pills — top right */}
              {favoriteTemplates.size > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {["전체", "AI 이미지", "카드뉴스", "웹툰", "상세페이지"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFavoritesFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold tracking-tight transition-all cursor-pointer ${
                        favoritesFilter === cat
                          ? (isDarkMode ? "bg-[#6D8FFF] text-white shadow-sm" : "bg-[#4F7BFF] text-white shadow-sm")
                          : (isDarkMode ? "bg-[#1E232D] border border-[#2A3140] text-[#94A3B8] hover:bg-[#252B36] hover:text-[#F8FAFC]" : "bg-white border border-[#E5E7EB] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1F2937]")
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {favoriteTemplates.size === 0 ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center gap-5 py-24">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                  isDarkMode
                    ? "border-[#2A3140] text-[#6D8FFF]"
                    : "border-[#C7D7FF] text-[#4F7BFF]"
                }`} style={{ backgroundColor: isDarkMode ? "rgba(59,130,246,0.12)" : "#EEF3FF" }}>
                  <Star size={28} strokeWidth={1.5} />
                </div>
                <div className="text-center flex flex-col items-center">
                  <p className={`text-[17px] font-bold tracking-tight ${
                    isDarkMode ? "text-[#F8FAFC]" : "text-[#1F2937]"
                  }`}>아직 저장한 템플릿이 없어요</p>
                  <p className={`text-[14px] font-medium mt-2 leading-relaxed text-center ${
                    isDarkMode ? "text-[#94A3B8]" : "text-[#64748B]"
                  }`}>마음에 드는 템플릿을 저장해보세요</p>
                </div>
                <button
                  onClick={() => setActiveTab("image")}
                  className={`mt-1 px-5 py-2.5 text-[13px] font-bold rounded-xl active:scale-95 transition-all shadow-sm cursor-pointer text-white ${
                    isDarkMode ? "bg-[#6D8FFF] hover:bg-[#5A7EFF]" : "bg-[#4F7BFF] hover:bg-[#3B6BFF]"
                  }`}
                >
                  작업 둘러보기
                </button>
              </div>
            ) : (
              /* Favorites Masonry Grid — same 4-col style as image tab */
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {(() => {
                  const favItems = TEMPLATES.filter(t =>
                    favoriteTemplates.has(t.id) &&
                    (favoritesFilter === "전체" || t.category === favoritesFilter)
                  );
                  // Distribute into 4 columns
                  const cols: typeof TEMPLATES[] = [[], [], [], []];
                  favItems.forEach((t, i) => cols[i % 4].push(t));
                  return cols.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-6">
                      {col.map(t => {
                        return (
                          <div
                            key={t.id}
                            className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border ${
                              isDarkMode
                                ? "bg-[#1E232D] border-[#2A3140] shadow-none hover:shadow-none hover:border-[#6D8FFF]"
                                : "bg-white border-[#E5E7EB] shadow-none hover:bg-[#F1F5F9] transition-colors"
                            }`}
                          >
                            {/* Image */}
                            <div className={`relative ${t.aspect} w-full overflow-hidden shrink-0 ${
                              isDarkMode ? "bg-slate-800" : "bg-slate-50"
                            }`}>
                              {/* Premium Category Glass Badge */}
                              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-1 border border-white/20"
                                style={{
                                  backgroundColor: 
                                    t.category === "AI 이미지" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                                    t.category === "카드뉴스" ? (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)") : 
                                    t.category === "웹툰" ? (isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(245, 243, 255, 0.85)") : 
                                    t.category === "상세페이지" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                                    (isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.85)"),
                                  color: 
                                    t.category === "AI 이미지" ? "#F59E0B" : 
                                    t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                                    t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                                    t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                                    (isDarkMode ? "#94A3B8" : "#64748B")
                                }}
                              >
                                <span className="w-1 h-1 rounded-full animate-pulse" 
                                  style={{
                                    backgroundColor: 
                                      t.category === "AI 이미지" ? "#F59E0B" : 
                                      t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                                      t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                                      t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                                      (isDarkMode ? "#94A3B8" : "#64748B")
                                  }}
                                />
                                {t.category}
                              </div>
                              <img
                                src={t.image}
                                alt={t.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                              {/* Overlay */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                                <button
                                  onClick={() => handleApplyTemplate(t)}
                                  className={`text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 duration-200 cursor-pointer ${
                                    isDarkMode
                                      ? "bg-[#1E232D] hover:bg-[#252B36] text-[#F8FAFC]"
                                      : "bg-white hover:bg-slate-50 text-[#1F2937]"
                                  }`}
                                >
                                  <Plus size={14} className={isDarkMode ? "text-[#6D8FFF]" : "text-[#4F7BFF]"} />
                                  템플릿 적용하기
                                </button>
                              </div>
                              {/* Unfavorite button — always visible amber star */}
                              <button
                                onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md transition-all duration-200 hover:bg-amber-500 active:scale-90 cursor-pointer"
                              >
                                <Star size={14} fill="currentColor" strokeWidth={2} />
                              </button>
                            </div>
                            {/* Card content */}
                            <div className="p-4 flex flex-col flex-1 text-left">
                              <h3 className={`text-[13.5px] font-bold leading-tight tracking-tight mb-2 ${
                                isDarkMode ? "text-[#F8FAFC]" : "text-[#1F2937]"
                              }`}>{t.title}</h3>
                              <div className="flex flex-wrap gap-x-2 mt-auto">
                                {t.tags.map(tag => (
                                  <span key={tag} className={`font-bold text-[10.5px] tracking-tight ${
                                    isDarkMode ? "text-slate-500" : "text-[#94A3B8]"
                                  }`}>{tag}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
        ) : activeTab === "credit" ? (
          /* ==========================================
             CREDIT TOP-UP VIEW (Premium Bento Grid Page View matching Design Guidelines)
             ========================================== */
          <div className="flex-1 flex flex-col pt-[92px] pb-10 px-8 max-w-[940px] mx-auto w-full select-none animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center gap-2 mb-8 select-none">
              <span className="w-1.5 h-6 bg-[#3B63F6] rounded-full" />
              <h1 className="text-[20px] font-black text-slate-800 tracking-tight font-sans">크레딧 충전</h1>
            </div>

            {/* Current Balance Card (Outfit Inspired Premium Gradient Card) */}
            <div className="bg-gradient-to-br from-blue-50/40 via-indigo-50/20 to-white border border-[#E2E8F0] rounded-[32px] p-6 flex items-center justify-between mb-9 shadow-[0_4px_20px_rgba(0,0,0,0.01)] select-none">
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shadow-sm animate-pulse">
                  <Coins size={24} />
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[12px] font-extrabold text-slate-400 tracking-tight">보유 크레딧 잔액</span>
                  <span className="text-[26px] font-black text-slate-800 tracking-tight mt-2.5 font-sans flex items-baseline leading-none">
                    {userCredits.toLocaleString()}<span className="text-[13px] font-extrabold text-slate-450 ml-1 font-sans">크레딧</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Charging Packages Section */}
            <div className="mb-4.5 text-left px-1">
              <span className="text-[14px] font-black text-slate-800 tracking-tight">충전 패키지</span>
            </div>

            {/* Bento Grid Packages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
              {/* 1,000 Credits */}
              <div className="bg-white border border-[#E2E8F0] hover:border-blue-300 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(59,99,246,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#3B63F6] group-hover:border-blue-100 transition-colors mb-4">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="text-[15px] font-black text-slate-800 tracking-tight leading-none">1,000 크레딧</h3>
                  <p className="text-[11px] font-semibold text-slate-400 mt-2">간단한 체험용 패키지</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-[16px] font-black text-slate-850">₩1,000</span>
                  <button
                    onClick={() => {
                      setSelectedPaymentPkg({ amount: 1000, price: "₩1,000" });
                      setIsPaymentModalOpen(true);
                    }}
                    className="bg-[#1E293B] hover:bg-[#3B63F6] active:scale-95 text-white h-8.5 px-4.5 rounded-xl text-[12px] font-bold transition-all shadow-sm cursor-pointer"
                  >
                    충전하기
                  </button>
                </div>
              </div>

              {/* 5,000 Credits */}
              <div className="bg-white border border-[#E2E8F0] hover:border-blue-300 rounded-[28px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(59,99,246,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#3B63F6] group-hover:border-blue-100 transition-colors mb-4">
                    <Sparkles size={16} />
                  </div>
                  <h3 className={`text-[15px] font-black tracking-tight leading-none ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-800"}`}>5,000 크레딧</h3>
                  <p className={`text-[11px] font-semibold mt-2 ${isDarkMode ? "text-[#94A3B8]" : "text-slate-400"}`}>일반적인 시안 제작 최적화</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className={`text-[16px] font-black ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-850"}`}>₩5,000</span>
                  <button
                    onClick={() => {
                      setSelectedPaymentPkg({ amount: 5000, price: "₩5,000" });
                      setIsPaymentModalOpen(true);
                    }}
                    className={`active:scale-95 text-white h-8.5 px-4.5 rounded-xl text-[12px] font-bold transition-all shadow-sm cursor-pointer ${
                      isDarkMode ? "bg-slate-800 hover:bg-[#6D8FFF]" : "bg-[#1E293B] hover:bg-[#3B63F6]"
                    }`}
                  >
                    충전하기
                  </button>
                </div>
              </div>

              {/* 100,000 Credits - Spans 2 columns, gorgeous highlight badge */}
              <div className={`md:col-span-2 border rounded-[28px] p-6.5 flex flex-col justify-between relative group overflow-hidden ${
                isDarkMode 
                  ? "bg-gradient-to-br from-indigo-950/40 via-slate-900/50 to-slate-950/60 border-slate-800" 
                  : "bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-slate-850 shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(59,99,246,0.12)] hover:-translate-y-1 transition-all duration-300"
              }`}>
                {/* Background glow ball */}
                <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-blue-500/10 blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500" />
                <div className="absolute top-4 right-6 bg-[#FEF08A] text-amber-950 text-[9px] font-black px-2.5 py-0.5 rounded-full select-none flex items-center gap-1 shadow-sm leading-normal">
                  <span>★</span> <span>BEST VALUE +10%</span>
                </div>
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-amber-300 mb-4 animate-pulse">
                    <Sparkles size={16} />
                  </div>
                  <h3 className="text-[16px] font-black text-white tracking-tight leading-none">100,000 크레딧 + 10,000 보너스</h3>
                  <p className="text-[11px] font-semibold text-slate-350 mt-2.5">전문 크리에이티브 스튜디오 및 헤비 사용자를 위한 최상의 선택</p>
                </div>
                <div className="mt-8 flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-450 line-through leading-none">₩110,000</span>
                    <span className="text-[18px] font-black text-white mt-1.5 leading-none">₩100,000</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPaymentPkg({ amount: 110000, price: "₩100,000" });
                      setIsPaymentModalOpen(true);
                    }}
                    className={`active:scale-95 text-white h-9 px-5.5 rounded-xl text-[12.5px] font-extrabold transition-all shadow-md cursor-pointer ${
                      isDarkMode ? "bg-[#6D8FFF] hover:bg-[#4F7BFF]" : "bg-[#3B63F6] hover:bg-blue-600"
                    }`}
                  >
                    VVIP 혜택 충전하기
                  </button>
                </div>
              </div>
            </div>

            {/* Footer usage link */}
            <div className="text-center">
              <button 
                onClick={() => setCreditToast("사용 내역 기능 준비 중입니다!")}
                className={`text-[13px] font-extrabold flex items-center gap-1 mx-auto transition-colors cursor-pointer ${
                  isDarkMode ? "text-slate-500 hover:text-[#6D8FFF]" : "text-slate-400 hover:text-[#3B63F6] hover:underline"
                }`}
              >
                <span>사용 내역 보기</span>
                <span className="text-[12px]">➔</span>
              </button>
            </div>
          </div>
        ) : activeTab === "home" ? (
          /* ==========================================
             HOME VIEW
             ========================================== */
          <div className="flex-1 flex flex-col items-center justify-center pt-[140px] pb-10 px-8 max-w-[1100px] mx-auto w-full">
            {/* Hero Typography Alignment */}
            <div className="text-center mb-10 max-w-3xl">
              <h1 className={`font-heading font-bold text-[36px] md:text-[38px] leading-tight tracking-tighter ${isDarkMode ? "text-[#F8FAFC]" : "text-[#111827]"}`}>
                <span className={isDarkMode ? "text-[#6D8FFF]" : "text-[#4F7BFF]"}>딸깍</span> 한 번이면, 작업은 더 빠르게
              </h1>
              <p className={`text-[14.5px] font-medium mt-3.5 leading-relaxed tracking-tight ${isDarkMode ? "text-[#94A3B8]" : "text-[#64748B]"}`}>
                이미지, 문서, 발표자료, 검수까지 필요한 AI 작업을 한 곳에서.
              </p>
            </div>

            {/* Premium Composer UI */}
            <div className="w-full max-w-[840px] mb-10">
              <div className={`rounded-[24px] flex flex-col transition-all duration-200 ${
                isDarkMode 
                  ? "bg-[#1B1F27] border-2 border-[#6D8FFF] shadow-[0_8px_30px_rgba(0,0,0,0.25)]" 
                  : "bg-white border-2 border-[#4F7BFF] shadow-[0_8px_32px_rgba(79,123,255,0.08)]"
              }`}>
                <div className="p-6.5 pb-5 min-h-[148px] flex flex-col relative text-left rounded-t-[22px]">
                  
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={homeFileInputRef}
                    className="hidden"
                    accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                    onChange={handleFileChange}
                  />

                  {/* Real Textarea Input */}
                  <textarea
                    rows={4}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="이곳에 원하는 작업을 자유롭게 적어보세요"
                    className={`w-full bg-transparent outline-none border-none resize-none text-[15.5px] font-medium tracking-tight placeholder-slate-400/80 ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-slate-800"
                    }`}
                  />

                  {/* Attachment Preview (if any) */}
                  {attachedFile && (
                    <div className="flex flex-wrap gap-2 mt-3 select-none">
                      <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-2xl text-[12px] font-semibold animate-in fade-in zoom-in-95 duration-250 shadow-sm ${
                        attachedFile.type === 'image' 
                          ? (isDarkMode ? "bg-[#1E232D] border-slate-700 text-[#F8FAFC]" : "bg-white border-blue-200 text-slate-800")
                          : (isDarkMode ? "bg-[#1B1F27] border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-700")
                      }`}>
                        {attachedFile.type === 'image' && attachedFile.url ? (
                          <div className={`group relative w-8 h-8 rounded-lg shrink-0 border ${
                            isDarkMode ? "border-slate-700" : "border-slate-150"
                          }`}>
                            <img 
                              src={attachedFile.url} 
                              alt="attached" 
                              className={`w-full h-full object-cover rounded-lg cursor-pointer transition-opacity duration-200 ${
                                isDarkMode ? "bg-[#1E232D]" : "bg-white"
                              }`} 
                            />
                            {/* Hover Preview Card */}
                            <div className={`absolute bottom-[calc(100%+12px)] left-0 z-[9999] w-[206px] h-[206px] flex items-center justify-center p-1.5 rounded-[16px] border shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out origin-bottom-left opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto ${
                              isDarkMode ? "bg-[#1E232D] border-[#2A3140]/80" : "bg-[#FFFFFF] border-[#E2E8F0]"
                            }`}>
                              <img 
                                src={attachedFile.url} 
                                alt="preview" 
                                className="w-[192px] h-[192px] object-cover rounded-[12px]" 
                              />
                            </div>
                          </div>
                        ) : (
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            attachedFile.type === 'pdf' ? (isDarkMode ? "bg-red-950/20 text-red-400" : "bg-red-50 text-red-500") :
                            attachedFile.type === 'doc' ? (isDarkMode ? "bg-blue-950/20 text-blue-400" : "bg-blue-50 text-blue-500") :
                            attachedFile.type === 'excel' ? (isDarkMode ? "bg-green-950/20 text-green-400" : "bg-green-50 text-green-500") :
                            attachedFile.type === 'zip' ? (isDarkMode ? "bg-amber-950/20 text-amber-400" : "bg-amber-50 text-amber-500") :
                            (isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500")
                          }`}>
                            {attachedFile.type === 'pdf' ? <FileText size={16} /> :
                             attachedFile.type === 'doc' ? <FileText size={16} /> :
                             attachedFile.type === 'excel' ? <FileSpreadsheet size={16} /> :
                             attachedFile.type === 'zip' ? <FileArchive size={16} /> :
                             <File size={16} />}
                          </div>
                        )}
                        <div className="flex flex-col text-left leading-tight ml-0.5">
                          <span className="tracking-tight font-extrabold max-w-[120px] truncate">{attachedFile.name}</span>
                          <span className="text-[10px] text-slate-400">{attachedFile.size}</span>
                        </div>
                        <button
                          onClick={() => setAttachedFile(null)}
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ml-1 transition-colors cursor-pointer ${
                            isDarkMode 
                              ? "bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200" 
                              : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                          }`}
                          title="첨부 파일 제거"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}

                </div>
                <div className={`px-6 py-4 flex items-center border-t rounded-b-[22px] ${
                  isDarkMode ? "border-[#2A3140] bg-[#171A21]/65" : "border-slate-50 bg-[#F8FAFC]/65"
                }`}>
                  <div className="flex gap-2.5">
                    <button
                      onClick={() => homeFileInputRef.current?.click()}
                      className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer ${
                        isDarkMode 
                          ? "bg-slate-800 border border-slate-700 text-slate-350 hover:bg-slate-750 hover:text-slate-100"
                          : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      }`}
                      title="파일 첨부"
                    >
                      <Paperclip size={15} />
                    </button>
                    <button
                      onClick={() => alert("스킬 설정 창이 오픈됩니다.")}
                      className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer ${
                        isDarkMode
                          ? "bg-slate-800/80 border border-slate-700 text-[#6D8FFF] hover:bg-slate-750"
                          : "bg-[#EFF6FF] border border-blue-100 text-[#4F7BFF] hover:bg-blue-100 hover:text-blue-700"
                      }`}
                      title="스킬 설정"
                    >
                      <Sparkles size={15} />
                    </button>
                  </div>
                  <div className="ml-auto">
                    <button 
                      onClick={handleStartGeneration}
                      className={`w-9 h-9 rounded-full active:scale-95 flex items-center justify-center transition-all shadow-sm cursor-pointer ${
                        isDarkMode ? "bg-[#6D8FFF] hover:bg-[#4F7BFF]" : "bg-[#4F7BFF] hover:bg-[#3B63F6]"
                      }`}
                      title="작업 보내기"
                    >
                      <ArrowUp size={16} strokeWidth={2.5} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Highly Polish interactive Services Row */}
            <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-10 md:gap-11 w-full max-w-[980px] mb-16 px-1 mt-6">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                const colors = getToolColors(s.key, isDarkMode);
                return (
                  <button
                    key={s.key}
                    onClick={() => {
                      if (s.key === "img") {
                        setActiveTab("image");
                      }
                    }}
                    className="flex flex-col items-center group relative cursor-pointer active:scale-95 transition-all duration-200"
                  >
                    {/* Tooltip on Hover */}
                    <div className={`absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 text-white text-[11px] font-semibold px-3 py-1.5 rounded-[8px] whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 translate-y-1 group-hover:translate-y-0 shadow-lg z-50 ${
                      isDarkMode ? "bg-[#1E2330] border border-[#2A3140]" : "bg-[#1E2330]"
                    }`}>
                      {s.sub}
                      {/* Down arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1E2330]" />
                    </div>

                    {/* Icon Container (64px x 64px, Circle) */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.01)] transition-all duration-250 hover:scale-105 hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.05)] ${
                        isDarkMode ? "bg-[#202530] hover:bg-[#2A3140]" : "bg-[#F1F5F9] hover:bg-[#E2E8F0]"
                      }`}
                      style={{ color: colors.fg }}
                    >
                      <Icon size={24} strokeWidth={1.8} />
                    </div>

                    {/* Text Label */}
                    <span className={`text-[13.5px] font-semibold mt-3 tracking-tight transition-colors duration-150 ${
                      isDarkMode 
                        ? "text-slate-350 group-hover:text-[#6D8FFF]" 
                        : "text-[#334155] group-hover:text-[#4F7BFF]"
                    }`}>
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Refined Footer */}
            <footer className="mt-auto text-center w-full select-none">
              <p className={`text-[12px] font-medium tracking-tight ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                딸깍.net - AI 통합 서비스 · © 2026 · 고객센터 <span className={`mx-1.5 ${isDarkMode ? "text-slate-700" : "text-slate-200"}`}>|</span> 이용약관 <span className={`mx-1.5 ${isDarkMode ? "text-slate-700" : "text-slate-200"}`}>|</span> 개인정보처리방침
              </p>
            </footer>
          </div>
        ) : isWorkspaceActive ? (
          /* =========================================================
             2-1 / 2-2 / 2-3: DUAL-PANE CHAT + EDITOR WORKSPACE
             ========================================================= */
          <div className={`flex-1 flex w-full h-[calc(100vh-64px)] overflow-hidden relative font-sans border-t ${
            isDarkMode 
              ? "bg-[#111318] border-[#2A3140]" 
              : "bg-slate-50 border-slate-100"
          }`}>
            {/* Left Pane: Chat Room & Visual Detailed Prompt Form */}
            <div className={`flex-1 flex flex-col h-full min-w-[500px] overflow-hidden border-r ${
              isDarkMode
                ? "bg-[#171A21] border-[#2A3140]"
                : "bg-[#FAFBFD] border-[#E2E8F0]"
            }`}>
              {/* Chat Pane Header */}
              <div className={`h-14 px-6 flex items-center justify-between shrink-0 border-b ${
                isDarkMode
                  ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                  : "bg-white border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              }`}>
                <div className="flex items-center">
                  {isEditingWorkspaceTitle ? (
                    <input
                      type="text"
                      value={workspaceTitle}
                      onChange={(e) => updateWorkspaceTitle(e.target.value)}
                      onBlur={() => setIsEditingWorkspaceTitle(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setIsEditingWorkspaceTitle(false);
                        }
                      }}
                      className={`text-[13.5px] font-extrabold tracking-tight bg-transparent outline-none focus:ring-0 w-[260px] px-1 py-0.5 animate-in fade-in duration-100 border-b-2 ${
                        isDarkMode ? "text-[#F8FAFC] border-[#6D8FFF]" : "text-slate-800 border-blue-500"
                      }`}
                      autoFocus
                    />
                  ) : (
                    <div 
                      onClick={() => setIsEditingWorkspaceTitle(true)}
                      className={`flex items-center gap-1.5 cursor-pointer group select-none px-2.5 py-1 rounded-xl transition-all border shadow-sm/5 hover:shadow-inner ${
                        isDarkMode
                          ? "hover:bg-[#252B36] border-transparent hover:border-[#2A3140]"
                          : "hover:bg-slate-50 border-transparent hover:border-slate-150"
                      }`}
                      title="작업 스페이스 이름 변경"
                    >
                      <span className={`text-[13.5px] font-extrabold tracking-tight ${
                        isDarkMode ? "text-[#F8FAFC]" : "text-slate-850"
                      }`}>
                        {workspaceTitle}
                      </span>
                      <Pencil size={11} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 shrink-0" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsWorkspaceActive(false)}
                  className={`flex items-center gap-1 text-[12px] font-bold transition-colors cursor-pointer px-3 py-1.5 rounded-full border shadow-sm ${
                    isDarkMode
                      ? "text-slate-400 hover:text-[#6D8FFF] bg-slate-800 hover:bg-[#252B36] border-[#2A3140] hover:border-blue-900"
                      : "text-slate-500 hover:text-[#3B63F6] bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-100"
                  }`}
                >
                  <ArrowLeft size={13} />
                  <span>대시보드로 돌아가기</span>
                </button>
              </div>

              {/* Chat Scroll Workspace Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                {chatHistory.map((msg, i) => {
                  const isAI = msg.sender === "ai";
                  return (
                    <div key={i} className={`flex flex-col ${isAI ? "items-start" : "items-end"} w-full animate-in fade-in duration-300`}>
                      <div className={`flex gap-3 max-w-[85%] ${isAI ? "flex-row" : "flex-row-reverse"}`}>
                        {/* Avatar */}
                        {isAI ? (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${
                            isDarkMode
                              ? "bg-blue-950/20 border-blue-900/30 text-[#6D8FFF]"
                              : "bg-blue-50 border border-blue-100 text-[#3B63F6]"
                          }`}>
                            <Bot size={16} />
                          </div>
                        ) : (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm font-bold text-[11px] border ${
                            isDarkMode
                              ? "bg-slate-800 border-slate-700 text-slate-350"
                              : "bg-slate-100 border border-slate-200 text-slate-600"
                          }`}>
                            유정
                          </div>
                        )}

                        {/* Speech Bubble */}
                        <div className="flex flex-col gap-1.5">
                          <div className={`text-[11px] font-bold ${isAI ? "text-left" : "text-right"} ${
                            isDarkMode ? "text-slate-500" : "text-slate-400"
                          }`}>
                            {isAI ? "딸깍 AI 어시스턴트" : "최유정"}
                          </div>
                          <div className={`px-4.5 py-3 rounded-2xl text-[13.5px] font-medium leading-relaxed tracking-tight shadow-sm select-text whitespace-pre-line flex flex-col gap-2.5 ${
                            isAI 
                              ? isDarkMode
                                ? "bg-[#1E232D] border border-[#2A3140] text-[#F8FAFC] rounded-tl-sm"
                                : "bg-white border border-slate-100 text-slate-850 rounded-tl-sm" 
                              : isDarkMode
                                ? "bg-slate-850 border border-slate-700 text-[#F8FAFC] rounded-tr-sm"
                                : "bg-[#EFF6FF] border border-[#DBEAFE] text-slate-800 rounded-tr-sm"
                          }`}>
                            <span>{msg.text}</span>
                            {msg.templateImage && (
                              <div className={`mt-1 p-1.5 rounded-2xl shadow-sm max-w-[220px] select-none text-left animate-in fade-in zoom-in-95 duration-200 border ${
                                isDarkMode
                                  ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                                  : "bg-white border border-slate-150"
                              }`}>
                                <div className={`aspect-[4/3] w-full rounded-xl overflow-hidden relative border ${
                                  isDarkMode
                                    ? "bg-[#171A21] border-[#2A3140]"
                                    : "bg-slate-50 border border-slate-100"
                                }`}>
                                  <img src={msg.templateImage} className="w-full h-full object-cover" alt={msg.templateTitle} />
                                </div>
                                <div className="px-1.5 py-1.5">
                                  <div className={`text-[9px] font-black tracking-tight leading-none uppercase ${
                                    isDarkMode ? "text-slate-500" : "text-slate-400"
                                  }`}>선택 템플릿</div>
                                  <div className={`text-[11.5px] font-extrabold mt-1 leading-tight tracking-tight truncate ${
                                    isDarkMode ? "text-[#F8FAFC]" : "text-slate-800"
                                  }`}>
                                    {msg.templateTitle}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* AI Suggestions Row */}
                      {isAI && msg.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3 ml-11">
                          {msg.suggestions.map((sug, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setPromptText(sug);
                                setChatInputValue(sug);
                              }}
                              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold shadow-sm transition-all duration-200 active:scale-95 cursor-pointer border ${
                                isDarkMode
                                  ? "border-[#2A3140] bg-[#1E232D] hover:border-[#6D8FFF] hover:bg-[#252B36] text-slate-400 hover:text-[#6D8FFF]"
                                  : "px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:border-[#3B63F6] hover:bg-[#EFF6FF] text-slate-650 hover:text-[#3B63F6]"
                              }`}
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Detailed Prompt Panel Form (Message 4) */}
                      {isAI && msg.hasForm && (
                        <div className={`mt-4 ml-11 w-full max-w-[550px] rounded-3xl p-5.5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 border ${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                            : "bg-white border-slate-200/80 shadow-[0_6px_20px_rgba(0,0,0,0.03)]"
                        }`}>
                          {/* Form Title */}
                          <div className={`flex flex-col text-left border-b pb-3 ${
                            isDarkMode ? "border-[#2A3140]" : "border-slate-100"
                          }`}>
                            <span className={`text-[14px] font-bold tracking-tight ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-800"}`}>비주얼 상세 프롬프트</span>
                            <span className={`text-[11px] font-medium mt-0.5 leading-none ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>템플릿 고유 프롬프트가 미리 입력되어 있어요. 자유롭게 수정하세요.</span>
                          </div>

                          {/* Interactive Textarea */}
                          <div className="flex flex-col gap-1.5">
                            <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>프롬프트 묘사</label>
                            <textarea
                              value={visualFormPromptText}
                              onChange={(e) => setVisualFormPromptText(e.target.value)}
                              className={`w-full min-h-[90px] px-3.5 py-2.5 rounded-2xl text-[13px] font-medium transition-all resize-none leading-relaxed ${
                                isDarkMode
                                  ? "bg-[#1B1F27] border border-[#2A3140] text-[#F8FAFC] placeholder-slate-500 focus:outline-none focus:border-[#6D8FFF]"
                                  : "bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white"
                              }`}
                            />
                          </div>

                          {/* Horizontal Form Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>메인 타이틀</label>
                              <input
                                type="text"
                                value={mainTitleText}
                                onChange={(e) => setMainTitleText(e.target.value)}
                                className={`w-full h-9.5 px-3.5 rounded-xl text-[13px] font-bold transition-all ${
                                  isDarkMode
                                    ? "bg-[#1B1F27] border border-[#2A3140] text-[#F8FAFC] focus:outline-none focus:border-[#6D8FFF]"
                                    : "bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-400 focus:bg-white"
                                }`}
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>서브 타이틀</label>
                              <input
                                type="text"
                                value={subTitleText}
                                onChange={(e) => setSubTitleText(e.target.value)}
                                className={`w-full h-9.5 px-3.5 rounded-xl text-[13px] font-bold transition-all ${
                                  isDarkMode
                                    ? "bg-[#1B1F27] border border-[#2A3140] text-[#F8FAFC] focus:outline-none focus:border-[#6D8FFF]"
                                    : "bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-blue-400 focus:bg-white"
                                }`}
                              />
                            </div>
                          </div>

                          {/* Reference Upload Dashed Area */}
                          <div className="flex flex-col gap-1.5 pb-2">
                            <label className={`text-[11px] font-bold text-left ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>참고 이미지 <span className={isDarkMode ? "text-slate-600 font-medium" : "text-slate-300 font-medium"}>(최대 3장 첨부 가능)</span></label>
                            <div 
                              onClick={() => {
                                if (referenceImages.length < 3) {
                                  refFileInputRef.current?.click();
                                }
                              }}
                              className={`border-2 border-dashed rounded-2xl p-6.5 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 select-none group ${
                                isDarkMode
                                  ? "border-[#2A3140] hover:border-blue-900 bg-[#1B1F27] hover:bg-[#252B36] text-slate-400 hover:text-slate-250"
                                  : "border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-blue-50/20 text-slate-700 group-hover:text-blue-600"
                              }`}
                            >
                              <ImageIcon size={22} className={`mb-2 transition-colors ${isDarkMode ? "text-slate-500 group-hover:text-[#6D8FFF]" : "text-slate-400 group-hover:text-blue-500"}`} />
                              <span className="text-[12.5px] font-bold transition-colors">참고 이미지를 드래그하거나 클릭해 첨부하세요</span>
                              <span className={`text-[10px] font-medium mt-1 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>PNG, JPG 파일 지원</span>
                            </div>
                          </div>

                          {/* Generate (생성하기) Button Inside the Card */}
                          <div className={`pt-3 border-t flex flex-col gap-2 ${isDarkMode ? "border-[#2A3140]" : "border-slate-100"}`}>
                            <button
                              onClick={() => {
                                if (
                                  visualFormPromptText.trim() &&
                                  mainTitleText.trim() &&
                                  subTitleText.trim()
                                ) {
                                  // Trigger loading states on right panel
                                  setIsLoadingImage(true);
                                  setGeneratedImageUrl(null);

                                  if (currentWorkspaceId) {
                                    setRecentChats(prev => {
                                      const exists = prev.some(chat => chat.id === currentWorkspaceId);
                                      if (!exists) {
                                        return [
                                          { id: currentWorkspaceId, title: workspaceTitle },
                                          ...prev
                                        ];
                                      }
                                      return prev;
                                    });
                                  }
                                  
                                  // Add user action to history
                                  setChatHistory(prev => [
                                    ...prev, 
                                    { 
                                      sender: "user", 
                                      text: `상세 프롬프트 제출 완료! 이미지 생성을 시작합니다.\n- 묘사: "${visualFormPromptText}"\n- 텍스트: "${mainTitleText}" / "${subTitleText}"`
                                    }
                                  ]);

                                  // Simulated API call completion
                                  setTimeout(() => {
                                    setChatHistory(prev => [
                                      ...prev, 
                                      { 
                                        sender: "ai", 
                                        text: "상세 기획서에 기재된 타이틀 텍스트와 레이아웃 구조를 반영하여 비주얼 상세 프롬프트 이미지 생성을 성공적으로 완료했습니다. 우측 패널에서 시안을 직접 확인하고 정교하게 편집하실 수 있습니다." 
                                      }
                                    ]);
                                    setIsLoadingImage(false);
                                    setGeneratedImageUrl(
                                      selectedTemplate
                                        ? selectedTemplate.image
                                        : "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
                                    );
                                  }, 1800);
                                }
                              }}
                              disabled={
                                !visualFormPromptText.trim() ||
                                !mainTitleText.trim() ||
                                !subTitleText.trim()
                              }
                              className={`w-full py-3.5 rounded-2xl font-extrabold text-[13px] flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm cursor-pointer select-none ${
                                visualFormPromptText.trim() &&
                                mainTitleText.trim() &&
                                subTitleText.trim()
                                  ? isDarkMode
                                    ? "bg-[#6D8FFF] hover:bg-[#4F7BFF] text-white shadow-none"
                                    : "bg-gradient-to-r from-blue-600 to-[#3B63F6] hover:from-blue-700 hover:to-blue-600 text-white shadow-[0_4px_14px_rgba(59,99,246,0.22)] active:scale-98 cursor-pointer"
                                  : isDarkMode
                                    ? "bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed"
                                    : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                              }`}
                            >
                              <Sparkles size={13} className={visualFormPromptText.trim() && mainTitleText.trim() && subTitleText.trim() ? "animate-pulse" : ""} />
                              <span>이미지 생성하기</span>
                            </button>
                            
                            {/* Validation feedback text helper */}
                            {(!visualFormPromptText.trim() || !mainTitleText.trim() || !subTitleText.trim()) && (
                              <p className={`text-[10px] font-bold text-center tracking-tight select-none ${
                                isDarkMode ? "text-amber-400/90" : "text-amber-500"
                              }`}>
                                * 필수 입력 항목을 모두 작성하면 버튼이 활성화됩니다 (묘사, 메인/서브 타이틀).
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Chat Composer Workspace (Bottom Section) */}
              <div className={`p-4 border-t shrink-0 ${
                isDarkMode 
                  ? "bg-[#1E232D] border-[#2A3140] shadow-none" 
                  : "bg-white border-[#E2E8F0] shadow-[0_-4px_16px_rgba(0,0,0,0.02)]"
              }`}>
                {/* Hidden Workspace Image Inputs */}
                <input
                  type="file"
                  ref={baseFileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleBaseImageUpload}
                />
                <input
                  type="file"
                  ref={refFileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleReferenceImageUpload}
                />

                {/* 2-3 Attachment chips row */}
                <div className="flex flex-wrap items-center gap-2.5 px-1 mb-2.5 select-none">
                  {/* B표시 베이스 이미지 */}
                  {baseImage ? (
                    <div className={`flex items-center gap-1.5 pl-1.5 pr-3 py-1 rounded-xl text-[12px] font-bold shadow-sm transition-all group relative border ${
                      isDarkMode
                        ? "bg-[#EA580C]/12 border-[#EA580C]/30 text-[#EA580C]"
                        : "bg-[#FFF5F2] border-[#FFD9D0] text-[#EA580C]"
                    }`}>
                      {/* Small thumbnail preview */}
                      <div className={`w-5.5 h-5.5 rounded-lg overflow-hidden shrink-0 bg-white border ${
                        isDarkMode ? "border-[#EA580C]/20" : "border-[#FFD9D0]/50"
                      }`}>
                        <img src={baseImage.url} className="w-full h-full object-cover animate-in fade-in duration-200" />
                      </div>
                      <span className="w-4.5 h-4.5 rounded-md bg-[#EA580C] text-white flex items-center justify-center text-[9px] font-black shrink-0 shadow-sm select-none">B</span>
                      <span className="tracking-tight max-w-[100px] truncate">{baseImage.name}</span>
                      <button
                        onClick={() => setBaseImage(null)}
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-colors cursor-pointer ${
                          isDarkMode
                            ? "bg-[#EA580C]/20 hover:bg-[#EA580C]/35 text-[#EA580C]"
                            : "bg-[#FFEAE6] hover:bg-[#FFD3CA] text-[#EA580C]"
                        }`}
                        title="베이스 이미지 삭제"
                      >
                        ✕
                      </button>

                      {/* Premium Hover Card Preview (Matching User Screenshot) */}
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-250 z-50 pointer-events-none group-hover:pointer-events-auto">
                        <div className={`w-40 h-40 border-3 rounded-[24px] p-2 relative select-none animate-in fade-in zoom-in-95 duration-150 ${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#EA580C] shadow-none"
                            : "bg-white border-[#FFA085] shadow-[0_12px_36px_rgba(234,88,12,0.18)]"
                        }`}>
                          {/* Image inside */}
                          <div className={`w-full h-full rounded-[16px] overflow-hidden relative ${
                            isDarkMode ? "bg-slate-800" : "bg-slate-50"
                          }`}>
                            <img src={baseImage.url} className="w-full h-full object-cover" />
                          </div>
                          {/* Floating badge top-left */}
                          <div className="absolute -top-2.5 -left-2.5 w-7 h-7 rounded-full bg-[#EA580C] text-white flex items-center justify-center text-[10px] font-black shadow-md border-2 border-white select-none">
                            B
                          </div>
                          {/* Floating close top-right */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setBaseImage(null);
                            }}
                            className={`absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full text-white flex items-center justify-center text-[9px] font-extrabold shadow-md border-2 border-white transition-colors cursor-pointer ${
                              isDarkMode ? "bg-slate-800 hover:bg-slate-900" : "bg-[#1E293B] hover:bg-slate-900"
                            }`}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => {
                          setIsBasePopoverOpen(!isBasePopoverOpen);
                          setIsRefPopoverOpen(false);
                        }}
                        className={`flex items-center gap-1.5 px-3 h-7.5 rounded-xl border border-dashed text-[11.5px] font-bold active:scale-95 transition-all shadow-sm cursor-pointer select-none ${
                          isDarkMode
                            ? "border-[#EA580C]/30 bg-[#EA580C]/12 text-[#EA580C] hover:bg-[#EA580C]/20"
                            : "border-[#FFD9D0] bg-[#FFF8F6] text-[#EA580C] hover:bg-[#FFEAE6]"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                        <span>* 베이스 추가 +</span>
                      </button>
                      
                      {isBasePopoverOpen && (
                        <div className={`absolute left-0 bottom-full mb-2 w-[190px] rounded-2xl py-1.5 animate-in fade-in slide-in-from-bottom-1 duration-150 border z-50 ${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                            : "bg-white border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        }`}>
                          <button
                            onClick={() => {
                              baseFileInputRef.current?.click();
                              setIsBasePopoverOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                              isDarkMode ? "text-slate-350 hover:bg-[#252B36]" : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <Paperclip size={13} className="text-slate-400" />
                            컴퓨터 파일 업로드
                          </button>
                          <button
                            onClick={setGeneratedAsBase}
                            disabled={!generatedImageUrl}
                            className={`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                              generatedImageUrl 
                                ? "text-[#EA580C] " + (isDarkMode ? "hover:bg-[#EA580C]/10" : "hover:bg-[#FFF8F6]")
                                : (isDarkMode ? "text-slate-650 cursor-not-allowed" : "text-slate-300 cursor-not-allowed")
                            }`}
                          >
                            <ImageIcon size={13} className={generatedImageUrl ? "text-[#EA580C]" : (isDarkMode ? "text-slate-655" : "text-slate-200")} />
                            생성 이미지 적용
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* R표시 참조 이미지 (최대 3개) */}
                  {referenceImages.map((refImg, idx) => (
                    <div key={idx} className={`flex items-center gap-1.5 pl-1.5 pr-3 py-1 rounded-xl text-[12px] font-bold shadow-sm transition-all group relative border ${
                      isDarkMode
                        ? "bg-[#3B63F6]/12 border-blue-900/30 text-[#6D8FFF]"
                        : "bg-[#EFF6FF] border border-blue-200 text-[#3B63F6]"
                    }`}>
                      {/* Small thumbnail preview */}
                      <div className={`w-5.5 h-5.5 rounded-lg overflow-hidden shrink-0 bg-white border ${
                        isDarkMode ? "border-blue-900/20" : "border-blue-100/50"
                      }`}>
                        <img src={refImg.url} className="w-full h-full object-cover animate-in fade-in duration-200" />
                      </div>
                      <span className="w-4.5 h-4.5 rounded-md bg-[#3B63F6] text-white flex items-center justify-center text-[9px] font-black shrink-0 shadow-sm select-none">R</span>
                      <span className="tracking-tight max-w-[100px] truncate">{refImg.name}</span>
                      <button
                        onClick={() => {
                          setReferenceImages(referenceImages.filter((_, rIdx) => rIdx !== idx));
                        }}
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-colors cursor-pointer ${
                          isDarkMode
                            ? "bg-slate-700 hover:bg-slate-650 text-[#6D8FFF]"
                            : "bg-blue-100 hover:bg-blue-200 text-[#3B63F6]"
                        }`}
                        title="참조 이미지 삭제"
                      >
                        ✕
                      </button>

                      {/* Premium Hover Card Preview (Matching User Screenshot) */}
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-250 z-50 pointer-events-none group-hover:pointer-events-auto">
                        <div className={`w-40 h-40 border-3 rounded-[24px] p-2 relative select-none animate-in fade-in zoom-in-95 duration-150 ${
                          isDarkMode
                            ? "bg-[#1E232D] border-blue-900 shadow-none"
                            : "bg-white border-blue-400 shadow-[0_12px_36px_rgba(59,99,246,0.18)]"
                        }`}>
                          {/* Image inside */}
                          <div className={`w-full h-full rounded-[16px] overflow-hidden relative ${
                            isDarkMode ? "bg-slate-800" : "bg-slate-50"
                          }`}>
                            <img src={refImg.url} className="w-full h-full object-cover" />
                          </div>
                          {/* Floating badge top-left */}
                          <div className="absolute -top-2.5 -left-2.5 w-7 h-7 rounded-full bg-[#3B63F6] text-white flex items-center justify-center text-[10px] font-black shadow-md border-2 border-white select-none">
                            R
                          </div>
                          {/* Floating close top-right */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setReferenceImages(referenceImages.filter((_, rIdx) => rIdx !== idx));
                            }}
                            className={`absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full text-white flex items-center justify-center text-[9px] font-extrabold shadow-md border-2 border-white transition-colors cursor-pointer ${
                              isDarkMode ? "bg-slate-800 hover:bg-slate-900" : "bg-[#1E293B] hover:bg-slate-900"
                            }`}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Reference Button (Only shows if < 3) */}
                  {referenceImages.length < 3 && (
                    <div className="relative">
                      <button
                        onClick={() => {
                          setIsRefPopoverOpen(!isRefPopoverOpen);
                          setIsBasePopoverOpen(false);
                        }}
                        className={`flex items-center gap-1 px-3 h-7.5 rounded-xl border border-dashed text-[11.5px] font-bold active:scale-95 transition-all shadow-sm cursor-pointer select-none ${
                          isDarkMode
                            ? "border-blue-900/40 bg-blue-950/20 text-[#6D8FFF] hover:bg-blue-950/40"
                            : "border-blue-200 bg-[#EFF6FF]/40 text-[#3B63F6] hover:bg-[#EFF6FF]"
                        }`}
                      >
                        <span>+ 참조 추가</span>
                      </button>
                      
                      {isRefPopoverOpen && (
                        <div className={`absolute left-0 bottom-full mb-2 w-[190px] rounded-2xl py-1.5 animate-in fade-in slide-in-from-bottom-1 duration-150 border z-50 ${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                            : "bg-white border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        }`}>
                          <button
                            onClick={() => {
                              refFileInputRef.current?.click();
                              setIsRefPopoverOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                              isDarkMode ? "text-slate-350 hover:bg-[#252B36]" : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <Paperclip size={13} className="text-slate-400" />
                            컴퓨터 파일 업로드
                          </button>
                          <button
                            onClick={setGeneratedAsReference}
                            disabled={!generatedImageUrl}
                            className={`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                              generatedImageUrl 
                                ? "text-[#3B63F6] " + (isDarkMode ? "hover:bg-slate-800" : "hover:bg-[#EFF6FF]")
                                : (isDarkMode ? "text-slate-650 cursor-not-allowed" : "text-slate-300 cursor-not-allowed")
                            }`}
                          >
                            <ImageIcon size={13} className={generatedImageUrl ? "text-[#3B63F6]" : (isDarkMode ? "text-slate-655" : "text-slate-200")} />
                            생성 이미지 적용
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Main Input bar */}
                <div className={`flex items-center rounded-[20px] px-3.5 py-2.5 shadow-sm transition-all relative border ${
                  isDarkMode
                    ? "bg-[#1B1F27] border-[#2A3140] focus-within:border-[#6D8FFF] focus-within:bg-[#1B1F27] focus-within:ring-2 focus-within:ring-slate-800"
                    : "bg-slate-50 border border-slate-200 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100"
                }`}>
                  {/* Left Side Tools: Clip Upload + Skill Selection dropdown */}
                  <div className="flex items-center gap-2 relative">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-8.5 h-8.5 rounded-full flex items-center justify-center active:scale-95 shadow-sm transition-all cursor-pointer shrink-0 border ${
                        isDarkMode
                          ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36]"
                          : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                      title="첨부파일 추가"
                    >
                      <Paperclip size={14} />
                    </button>

                    {/* Skill selection dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
                        className={`flex items-center gap-1 px-3 h-8.5 rounded-full font-bold text-[12px] active:scale-95 transition-all shadow-sm cursor-pointer shrink-0 border ${
                          isDarkMode
                            ? selectedSkill || isSkillDropdownOpen
                              ? "border-blue-900 bg-blue-950/20 text-[#6D8FFF]"
                              : "border-[#2A3140] text-slate-300 bg-[#1E232D] hover:bg-[#252B36]"
                            : selectedSkill || isSkillDropdownOpen
                              ? "border-blue-200 bg-blue-50/50 text-[#3B63F6]"
                              : "border-slate-200 text-slate-600 bg-white hover:bg-slate-100"
                        }`}
                      >
                        <Sparkles size={12} className={selectedSkill ? (isDarkMode ? "text-[#6D8FFF]" : "text-[#3B63F6]") : "text-slate-400"} />
                        <span>{selectedSkill ? `${selectedSkill}` : "스킬 선택"}</span>
                        <ChevronDown size={12} className={`text-slate-400 transition-transform duration-200 ${isSkillDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {/* Skill dropdown list */}
                      {isSkillDropdownOpen && (
                        <div className={`absolute left-0 bottom-full mb-2 w-[160px] rounded-[18px] z-40 py-1.5 overflow-hidden animate-in fade-in slide-in-from-bottom-1 duration-150 border ${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                            : "bg-white border border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                        }`}>
                          {["스킬 초기화", "배경 제거", "고해상도 업스케일", "얼굴 복원", "텍스트 인페인팅"].map((skill) => (
                            <button
                              key={skill}
                              onClick={() => {
                                if (skill === "스킬 초기화") {
                                  setSelectedSkill(null);
                                } else {
                                  setSelectedSkill(skill);
                                }
                                setIsSkillDropdownOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-[12px] font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                selectedSkill === skill || (skill === "스킬 초기화" && !selectedSkill)
                                  ? isDarkMode
                                    ? "text-[#6D8FFF] bg-slate-800"
                                    : "text-[#3B63F6] bg-[#EFF6FF]/65"
                                  : isDarkMode
                                    ? "text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                                    : "text-slate-600 hover:bg-[#F8FAFC] hover:text-slate-950"
                              }`}
                            >
                              <span>{skill}</span>
                              {((skill === "스킬 초기화" && !selectedSkill) || selectedSkill === skill) && (
                                <Check size={12} className={isDarkMode ? "text-[#6D8FFF]" : "text-[#3B63F6]"} />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Input Text Box */}
                  <input
                    type="text"
                    value={chatInputValue}
                    onChange={(e) => setChatInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && chatInputValue.trim()) {
                        const userTxt = chatInputValue;
                        setChatInputValue("");
                        
                        // Append user message
                        setChatHistory(prev => [...prev, { sender: "user", text: userTxt }]);
                        
                        // Append AI waiting message
                        setTimeout(() => {
                          setChatHistory(prev => [...prev, { sender: "ai", text: "좋습니다. 요청하신 내용을 프롬프트에 즉각 반영하여 새로운 이미지를 생성 중입니다..." }]);
                          setIsLoadingImage(true);
                          setGeneratedImageUrl(null);
                          
                          setTimeout(() => {
                            setIsLoadingImage(false);
                            setGeneratedImageUrl(
                              selectedTemplate
                                ? selectedTemplate.image
                                : "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
                            );
                          }, 1500);
                        }, 600);
                      }
                    }}
                    placeholder="무엇을 만들까요? 대화로 자유롭게 요청하거나 템플릿을 선택해 보세요!"
                    className={`flex-1 bg-transparent border-none outline-none px-4 text-[13.5px] font-semibold ${
                      isDarkMode ? "text-[#F8FAFC] placeholder-slate-500" : "text-slate-800 placeholder-slate-400"
                    }`}
                  />

                  {/* Send Button */}
                  <button
                    onClick={() => {
                      if (chatInputValue.trim()) {
                        const userTxt = chatInputValue;
                        setChatInputValue("");
                        setChatHistory(prev => [...prev, { sender: "user", text: userTxt }]);
                        
                        setTimeout(() => {
                          setChatHistory(prev => [...prev, { sender: "ai", text: "좋습니다. 요청하신 내용을 프롬프트에 즉각 반영하여 새로운 이미지를 생성 중입니다..." }]);
                          setIsLoadingImage(true);
                          setGeneratedImageUrl(null);
                          
                          setTimeout(() => {
                            setIsLoadingImage(false);
                            setGeneratedImageUrl(
                              selectedTemplate
                                ? selectedTemplate.image
                                : "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
                            );
                          }, 1500);
                        }, 600);
                      }
                    }}
                    className={`w-9 h-9 rounded-full active:scale-95 flex items-center justify-center transition-all shadow-sm cursor-pointer shrink-0 ml-1.5 ${
                      isDarkMode ? "bg-[#6D8FFF] hover:bg-[#4F7BFF]" : "bg-[#3B63F6] hover:bg-blue-700"
                    }`}
                  >
                    <ArrowUp size={16} strokeWidth={2.5} className="text-white" />
                  </button>
                </div>
                
                <p className={`text-[10px] font-medium text-center mt-2.5 tracking-tight select-none ${
                  isDarkMode ? "text-slate-500" : "text-slate-400"
                }`}>
                  생성된 이미지는 사실과 다를 수 있습니다. 결과물 사용 전 직접 확인해 주세요.
                </p>
              </div>
            </div>

            <div className={`h-full flex flex-col transition-all duration-300 relative select-none ${
              isRightPanelCollapsed ? "w-0 border-l-0 overflow-hidden" : "w-[48%] min-w-[420px] border-l"
            } ${
              isDarkMode ? "bg-[#111318] border-[#2A3140]" : "bg-slate-50 border-slate-200"
            }`}>
              {/* Editor Header */}
              <div className={`h-14 px-4.5 flex items-center justify-between shrink-0 border-b ${
                isDarkMode 
                  ? "bg-[#1E232D] border-[#2A3140] shadow-none" 
                  : "bg-white border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              }`}>
                <button
                  onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                  className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer border shadow-sm ${
                    isDarkMode
                      ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                      : "bg-white border-slate-150 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                  title={isRightPanelCollapsed ? "패널 펼치기" : "패널 접기"}
                >
                  <PanelRightClose size={15} />
                </button>
                
                <div className="flex items-center gap-1.5">
                  {/* Credit Badge inside editor header */}
                  <button 
                    onClick={() => setIsCreditModalOpen(true)}
                    className={`flex items-center gap-1.5 rounded-full py-1 px-3 shadow-[0_1px_2.5px_rgba(59,99,246,0.06)] hover:scale-102 active:scale-97 transition-all cursor-pointer mr-1 select-none border ${
                      isDarkMode
                        ? "bg-blue-950/20 hover:bg-blue-900/30 border-blue-900/30 text-[#6D8FFF]"
                        : "bg-blue-50/70 hover:bg-blue-100/70 border-blue-100 text-[#3B63F6]"
                    }`}
                    title="크레딧 충전"
                  >
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-[8.5px] ${
                      isDarkMode ? "bg-[#6D8FFF]" : "bg-[#3B63F6]"
                    }`}>
                      C
                    </div>
                    <span className="text-[12px] font-extrabold tracking-tight leading-none">
                      {userCredits.toLocaleString()}
                    </span>
                  </button>

                  <button className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer border shadow-sm ${
                    isDarkMode
                      ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                      : "bg-white border-slate-150 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }`} title="공유하기">
                    <Share2 size={14} />
                  </button>
                  <button className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer border shadow-sm ${
                    isDarkMode
                      ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                      : "bg-white border-slate-150 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }`} title="다운로드">
                    <Download size={14} />
                  </button>
                  <button className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer border shadow-sm ${
                    isDarkMode
                      ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                      : "bg-white border-slate-150 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }`} title="더 보기">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>

              {/* Editor Workspace Content */}
              <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center">
                {isLoadingImage ? (
                  /* Loading Shimmer / Skeleton State */
                  <div className={`flex flex-col items-center justify-center w-full max-w-[360px] aspect-[4/3] rounded-[24px] border p-5 shadow-lg select-none ${
                    isDarkMode
                      ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                      : "bg-white border-slate-200/80"
                  }`}>
                    <div className={`w-full h-full rounded-xl relative overflow-hidden flex items-center justify-center ${
                      isDarkMode ? "bg-[#1B1F27]" : "bg-slate-100"
                    }`}>
                      {/* Premium loading spinner and pulse shimmer bar */}
                      <div className={`absolute inset-0 animate-shimmer bg-gradient-to-r ${
                        isDarkMode
                          ? "from-slate-900/60 via-slate-850/40 to-slate-900/60"
                          : "from-slate-100 via-slate-200/50 to-slate-100"
                      }`} style={{ backgroundSize: "200% 100%" }} />
                      <div className="flex flex-col items-center gap-3.5 z-10">
                        <div className={`w-9 h-9 rounded-full border-3 border-t-3 animate-spin ${
                          isDarkMode
                            ? "border-slate-750 border-t-[#6D8FFF]"
                            : "border-blue-100 border-t-[#3B63F6]"
                        }`} />
                        <span className={`text-[12.5px] font-bold tracking-tight ${
                          isDarkMode ? "text-[#94A3B8]" : "text-slate-500"
                        }`}>AI가 아름다운 고해상도 시안을 생성 중...</span>
                      </div>
                    </div>
                  </div>
                ) : generatedImageUrl ? (
                  /* Beautiful Generated Aspect Ratio Image View or Compact Canva Editor Workspace */
                  !isEditingMode ? (
                    <div className="flex flex-col items-center gap-4 animate-in zoom-in-98 duration-300">
                      <div className={`relative rounded-[28px] overflow-hidden border-4 max-w-[480px] w-full group/img select-none ${
                        isDarkMode
                          ? "border-[#2A3140] bg-[#1E232D] shadow-none"
                          : "border-white bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.04)]"
                      }`}>
                        <img
                          src={generatedImageUrl}
                          alt="Generated preview"
                          className="w-full h-auto object-contain rounded-[24px]"
                        />
                        
                        {/* Top indicator tag of the generated image */}
                        <div className="absolute top-4 left-4 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[10.5px] font-bold tracking-tight shadow-md flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                          <span>생성 결과 (비율 {aspectRatio})</span>
                        </div>

                        {/* Floating actions overlayed on bottom of the image on hover */}
                        <div className={`absolute bottom-4 left-4 right-4 backdrop-blur-md rounded-2xl p-2.5 flex gap-2 justify-center shadow-lg opacity-0 group-hover/img:opacity-100 transition-all duration-300 translate-y-2 group-hover/img:translate-y-0 border ${
                          isDarkMode
                            ? "bg-[#1E232D]/90 border-[#2A3140]/60 shadow-none"
                            : "bg-white/90 border-white/60"
                        }`}>
                          <button
                            onClick={setGeneratedAsBase}
                            className={`flex-1 py-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors active:scale-98 shadow-sm border ${
                              isDarkMode
                                ? "bg-[#EA580C]/12 border-[#EA580C]/30 text-[#EA580C] hover:bg-[#EA580C]/20"
                                : "bg-[#FFF8F6] border-[#FFD9D0] text-[#EA580C] hover:bg-[#FFEAE6]"
                            }`}
                          >
                            <span className="w-4 h-4 rounded-md bg-[#EA580C] text-white flex items-center justify-center text-[8px] font-black shadow-sm shrink-0">B</span>
                            베이스로 설정
                          </button>
                          <button
                            onClick={setGeneratedAsReference}
                            disabled={referenceImages.length >= 3}
                            className={`flex-1 py-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-98 shadow-sm border ${
                              referenceImages.length >= 3
                                ? isDarkMode
                                  ? "bg-slate-800 border-slate-700 text-slate-550 cursor-not-allowed"
                                  : "bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed"
                                : isDarkMode
                                  ? "bg-[#3B63F6]/12 border-blue-900/30 text-[#6D8FFF] hover:bg-blue-950/40"
                                  : "bg-[#EFF6FF] border border-blue-200 text-[#3B63F6] hover:bg-blue-100"
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-md text-white flex items-center justify-center text-[8px] font-black shadow-sm shrink-0 ${
                              referenceImages.length >= 3 
                                ? "bg-slate-400" 
                                : isDarkMode ? "bg-[#6D8FFF]" : "bg-[#3B63F6]"
                            }`}>R</span>
                            참조로 추가
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <p className={`text-[12px] font-bold select-none ${
                          isDarkMode ? "text-slate-500" : "text-slate-400"
                        }`}>
                          이미지를 클릭하여 추가 편집을 진행하거나 크롭할 수 있습니다.
                        </p>
                        <button
                          onClick={() => {
                            setIsEditingMode(true);
                            if (canvasElements.length === 0) {
                              // Initialize element with base background image
                              setCanvasElements([
                                {
                                  id: "bg-img",
                                  type: "image",
                                  x: 0,
                                  y: 0,
                                  width: 100,
                                  height: 100,
                                  rotation: 0,
                                  visible: true,
                                  locked: true,
                                  url: generatedImageUrl,
                                  name: "배경 이미지",
                                  zIndex: 0
                                }
                              ]);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 cursor-pointer transition-all active:scale-95 border ${
                            isDarkMode
                              ? "bg-[#3B63F6] border-[#3B63F6] text-white hover:bg-blue-600"
                              : "bg-[#3B63F6] border-[#3B63F6] text-white hover:bg-blue-700 shadow-sm"
                          }`}
                        >
                          <Pencil size={11} />
                          에디터 열기
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ------------------------------------------------------------------ */
                    /* COMPACT MINI EDITOR (CANVA WORKSPACE) */
                    /* ------------------------------------------------------------------ */
                    <div className="w-full h-full flex flex-col items-center justify-between select-none animate-in fade-in duration-300">
                      
                      {/* COMPACT TOOLBAR (1 Row - with wrapping for small screens) */}
                      <div className={`w-full p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2 shadow-sm mb-4 relative z-50 ${
                        isDarkMode ? "bg-[#1E232D] border-[#2A3140]" : "bg-white border-slate-200"
                      }`}>
                        
                        {/* TOOLBAR LEFT: Add Elements Menu */}
                        <div className="relative">
                          <button
                            onClick={() => setActivePopover(activePopover === 'add' ? null : 'add')}
                            className={`px-2.5 py-1.5 rounded-lg text-[11.5px] font-extrabold flex items-center gap-1 cursor-pointer border transition-all whitespace-nowrap ${
                              activePopover === 'add'
                                ? "bg-blue-50 border-blue-200 text-[#3B63F6]"
                                : isDarkMode
                                  ? "bg-[#161B22] border-slate-800 text-slate-300 hover:bg-slate-800"
                                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <Plus size={13} className="text-[#3B63F6]" />
                            <span>요소 추가</span>
                            <ChevronDown size={11} className="opacity-70" />
                          </button>
                          
                          {/* Element Add Dropdown */}
                          {activePopover === 'add' && (
                            <div className={`absolute left-0 top-[38px] w-48 rounded-xl border p-1.5 shadow-lg flex flex-col gap-0.5 animate-in slide-in-from-top-1.5 duration-200 ${
                              isDarkMode ? "bg-[#1B2028] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                            }`}>
                              <button
                                onClick={() => { addTextElement('title'); setActivePopover(null); }}
                                className={`w-full px-2.5 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                                  isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-slate-50"
                                }`}
                              >
                                <Type size={13} className="text-blue-500" />
                                <span>큰 제목 추가</span>
                              </button>
                              <button
                                onClick={() => { addTextElement('subtitle'); setActivePopover(null); }}
                                className={`w-full px-2.5 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                                  isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-slate-50"
                                }`}
                              >
                                <Type size={12} className="text-blue-400" />
                                <span>부제목 추가</span>
                              </button>
                              <button
                                onClick={() => { addTextElement('body'); setActivePopover(null); }}
                                className={`w-full px-2.5 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                                  isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-slate-50"
                                }`}
                              >
                                <Type size={11} className="text-slate-400" />
                                <span>본문 추가</span>
                              </button>
                              <div className={`my-1 border-t ${isDarkMode ? "border-slate-800" : "border-slate-100"}`} />
                              <button
                                onClick={() => { addShapeElement('rect'); setActivePopover(null); }}
                                className={`w-full px-2.5 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                                  isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-slate-50"
                                }`}
                              >
                                <Square size={13} className="text-emerald-500 fill-emerald-500/20" />
                                <span>사각형 추가</span>
                              </button>
                              <button
                                onClick={() => { addShapeElement('circle'); setActivePopover(null); }}
                                className={`w-full px-2.5 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                                  isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-slate-50"
                                }`}
                              >
                                <Circle size={13} className="text-indigo-500 fill-indigo-500/20" />
                                <span>원형 추가</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* TOOLBAR CENTER: Dynamic selected elements properties */}
                        <div className="flex-1 flex flex-wrap items-center justify-center gap-2 min-w-[220px]">
                          {selectedElementId ? (
                            (() => {
                              const selEl = canvasElements.find(el => el.id === selectedElementId);
                              if (!selEl) return null;
                              const isText = selEl.type === 'text';

                              return (
                                <div className="flex flex-wrap items-center gap-1.5 animate-in fade-in duration-200">
                                  {isText && (
                                    <>
                                      {/* FONT SELECT DROPDOWN */}
                                      <div className="relative">
                                        <button
                                          onClick={() => setActivePopover(activePopover === 'font' ? null : 'font')}
                                          className={`h-8 px-2 rounded-md text-[11px] font-bold border flex items-center gap-1 cursor-pointer truncate max-w-[96px] whitespace-nowrap shrink-0 ${
                                            isDarkMode ? "bg-[#161B22] border-slate-800 text-slate-350" : "bg-slate-50 border-slate-200 text-slate-700"
                                          }`}
                                        >
                                          <span className="truncate">{selEl.fontFamily || "Pretendard"}</span>
                                          <ChevronDown size={10} className="shrink-0 opacity-70" />
                                        </button>
                                        {activePopover === 'font' && (
                                          <div className={`absolute left-0 top-[34px] w-32 rounded-lg border p-1 shadow-lg flex flex-col gap-0.5 animate-in slide-in-from-top-1 duration-150 ${
                                            isDarkMode ? "bg-[#1B2028] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                                          }`}>
                                            {["Pretendard", "Noto Sans KR", "Nanum Myeongjo", "Gmarket Sans", "Bamin"].map(font => (
                                              <button
                                                key={font}
                                                onClick={() => { updateElementProperty(selectedElementId, 'fontFamily', font); setActivePopover(null); }}
                                                className={`w-full px-2 py-1 rounded-md text-[11px] font-bold text-left cursor-pointer transition-colors ${
                                                  selEl.fontFamily === font
                                                    ? "bg-blue-50 text-[#3B63F6]"
                                                    : isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-50"
                                                }`}
                                                style={{ fontFamily: font }}
                                              >
                                                {font}
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                      </div>

                                      {/* SIZE INPUT / +/- BUTTONS */}
                                      <div className={`h-8 px-1 rounded-md border flex items-center gap-0.5 whitespace-nowrap shrink-0 ${
                                        isDarkMode ? "bg-[#161B22] border-slate-800" : "bg-slate-50 border-slate-200"
                                      }`}>
                                        <button
                                          onClick={() => updateElementProperty(selectedElementId, 'fontSize', Math.max(8, (selEl.fontSize || 12) - 1))}
                                          className={`w-5 h-6 rounded flex items-center justify-center font-bold text-[11px] cursor-pointer hover:bg-slate-200/50 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                                        >
                                          -
                                        </button>
                                        <input
                                          type="number"
                                          value={selEl.fontSize || 12}
                                          onChange={(e) => updateElementProperty(selectedElementId, 'fontSize', Math.max(6, parseInt(e.target.value) || 12))}
                                          className={`w-7 text-center bg-transparent border-0 font-bold text-[11px] focus:outline-none focus:ring-0 p-0 ${isDarkMode ? "text-white" : "text-slate-800"}`}
                                        />
                                        <button
                                          onClick={() => updateElementProperty(selectedElementId, 'fontSize', Math.min(120, (selEl.fontSize || 12) + 1))}
                                          className={`w-5 h-6 rounded flex items-center justify-center font-bold text-[11px] cursor-pointer hover:bg-slate-200/50 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                                        >
                                          +
                                        </button>
                                      </div>

                                      {/* STYLE (B, I, U) */}
                                      <div className={`h-8 p-0.5 rounded-md border flex items-center gap-0.5 shrink-0 ${
                                        isDarkMode ? "bg-[#161B22] border-slate-800" : "bg-slate-50 border-slate-200"
                                      }`}>
                                        <button
                                          onClick={() => updateElementProperty(selectedElementId, 'bold', !selEl.bold)}
                                          className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-colors ${
                                            selEl.bold 
                                              ? "bg-blue-150 text-[#3B63F6] font-black" 
                                              : isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-200/60"
                                          }`}
                                        >
                                          <Bold size={11} />
                                        </button>
                                        <button
                                          onClick={() => updateElementProperty(selectedElementId, 'italic', !selEl.italic)}
                                          className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-colors ${
                                            selEl.italic 
                                              ? "bg-blue-150 text-[#3B63F6]" 
                                              : isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-200/60"
                                          }`}
                                        >
                                          <Italic size={11} />
                                        </button>
                                        <button
                                          onClick={() => updateElementProperty(selectedElementId, 'underline', !selEl.underline)}
                                          className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-colors ${
                                            selEl.underline 
                                              ? "bg-blue-150 text-[#3B63F6]" 
                                              : isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-200/60"
                                          }`}
                                        >
                                          <Underline size={11} />
                                        </button>
                                      </div>
                                    </>
                                  )}

                                  {/* COLOR PICKER POPOVER */}
                                  <div className="relative">
                                    <button
                                      onClick={() => setActivePopover(activePopover === 'color' ? null : 'color')}
                                      className={`h-8 px-2 rounded-md text-[11px] font-bold border flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                                        isDarkMode ? "bg-[#161B22] border-slate-800 text-slate-350" : "bg-slate-50 border-slate-200 text-slate-700"
                                      }`}
                                    >
                                      <div 
                                        className="w-3.5 h-3.5 rounded border border-black/10" 
                                        style={{ backgroundColor: isText ? (selEl.color || "#000") : (selEl.fillColor || "#000") }} 
                                      />
                                      <span>색상</span>
                                    </button>
                                    {activePopover === 'color' && (
                                      <div className={`absolute left-0 top-[34px] w-48 rounded-xl border p-3 shadow-lg flex flex-col gap-2.5 animate-in slide-in-from-top-1 duration-150 ${
                                        isDarkMode ? "bg-[#1B2028] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                                      }`}>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                                          {isText ? "글자색 변경" : "요소 채우기 색"}
                                        </span>
                                        <div className="grid grid-cols-6 gap-1.5">
                                          {["#1E293B", "#3B63F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6", "#F43F5E", "#06B6D4", "#EC4899", "#FFFFFF", "#F1F5F9", "#D9F99D"].map(color => (
                                            <button
                                              key={color}
                                              onClick={() => { 
                                                updateElementProperty(selectedElementId, isText ? 'color' : 'fillColor', color);
                                              }}
                                              className={`w-6 h-6 rounded-md cursor-pointer border border-black/10 hover:scale-110 active:scale-95 transition-transform`}
                                              style={{ backgroundColor: color }}
                                            />
                                          ))}
                                        </div>
                                        {isText && (
                                          <>
                                            <div className={`my-0.5 border-t ${isDarkMode ? "border-slate-800" : "border-slate-100"}`} />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">글자 배경색 (형광펜)</span>
                                            <div className="grid grid-cols-6 gap-1.5">
                                              {["transparent", "#FEF08A", "#BBF7D0", "#BFDBFE", "#FBCFE8", "#FED7AA"].map(bgColor => (
                                                <button
                                                  key={bgColor}
                                                  onClick={() => { updateElementProperty(selectedElementId, 'bgColor', bgColor); }}
                                                  className={`w-6 h-6 rounded-md cursor-pointer border border-slate-200 flex items-center justify-center text-[8px] font-bold`}
                                                  style={{ backgroundColor: bgColor === 'transparent' ? 'transparent' : bgColor }}
                                                >
                                                  {bgColor === 'transparent' && "X"}
                                                </button>
                                              ))}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {/* ALIGN & LETTER / LINE SPACING */}
                                  {isText && (
                                    <div className="relative">
                                      <button
                                        onClick={() => setActivePopover(activePopover === 'align' ? null : 'align')}
                                        className={`h-8 w-8 rounded-md border flex items-center justify-center cursor-pointer ${
                                          isDarkMode ? "bg-[#161B22] border-slate-800 text-slate-350" : "bg-slate-50 border-slate-200 text-slate-700"
                                        }`}
                                      >
                                        {selEl.align === 'left' ? <AlignLeft size={12} /> : selEl.align === 'right' ? <AlignRight size={12} /> : <AlignCenter size={12} />}
                                      </button>
                                      {activePopover === 'align' && (
                                        <div className={`absolute right-0 top-[34px] w-48 rounded-xl border p-3 shadow-lg flex flex-col gap-3.5 animate-in slide-in-from-top-1 duration-150 ${
                                          isDarkMode ? "bg-[#1B2028] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                                        }`}>
                                          <div>
                                            <span className="text-[10px] font-black text-slate-400 block mb-1.5 uppercase tracking-wider">정렬</span>
                                            <div className="flex gap-1">
                                              {['left', 'center', 'right'].map(align => (
                                                <button
                                                  key={align}
                                                  onClick={() => updateElementProperty(selectedElementId, 'align', align)}
                                                  className={`flex-1 h-7 rounded border flex items-center justify-center cursor-pointer ${
                                                    selEl.align === align
                                                      ? "bg-blue-50 border-blue-200 text-[#3B63F6]"
                                                      : isDarkMode ? "bg-slate-800 border-slate-750 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
                                                  }`}
                                                >
                                                  {align === 'left' ? <AlignLeft size={12} /> : align === 'right' ? <AlignRight size={12} /> : <AlignCenter size={12} />}
                                                </button>
                                              ))}
                                            </div>
                                          </div>
                                          <div className={`border-t ${isDarkMode ? "border-slate-800" : "border-slate-100"}`} />
                                          <div>
                                            <div className="flex justify-between text-[10px] font-black text-slate-400 mb-1">
                                              <span>자간 (LETTER SPACING)</span>
                                              <span>{selEl.letterSpacing || 0}px</span>
                                            </div>
                                            <input
                                              type="range"
                                              min="-5"
                                              max="15"
                                              value={selEl.letterSpacing || 0}
                                              onChange={(e) => updateElementProperty(selectedElementId, 'letterSpacing', parseFloat(e.target.value))}
                                              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                            />
                                          </div>
                                          <div>
                                            <div className="flex justify-between text-[10px] font-black text-slate-400 mb-1">
                                              <span>행간 (LINE HEIGHT)</span>
                                              <span>{selEl.lineHeight || 1.4}</span>
                                            </div>
                                            <input
                                              type="range"
                                              min="0.8"
                                              max="2.5"
                                              step="0.1"
                                              value={selEl.lineHeight || 1.4}
                                              onChange={(e) => updateElementProperty(selectedElementId, 'lineHeight', parseFloat(e.target.value))}
                                              className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* COORDINATES & DIMENSIONS (X, Y, W, H) */}
                                  <div className="relative">
                                    <button
                                      onClick={() => setActivePopover(activePopover === 'dimensions' ? null : 'dimensions')}
                                      className={`h-8 px-2 rounded-md text-[11px] font-bold border flex items-center gap-1 cursor-pointer ${
                                        isDarkMode ? "bg-[#161B22] border-slate-800 text-slate-350" : "bg-slate-50 border-slate-200 text-slate-700"
                                      }`}
                                    >
                                      <span>X,Y,W,H</span>
                                    </button>
                                    {activePopover === 'dimensions' && (
                                      <div className={`absolute right-0 top-[34px] w-48 rounded-xl border p-3 shadow-lg flex flex-col gap-2.5 animate-in slide-in-from-top-1 duration-150 ${
                                        isDarkMode ? "bg-[#1B2028] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                                      }`}>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">정밀 위치/크기 조절</span>
                                        <div className="grid grid-cols-2 gap-2">
                                          <div>
                                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">가로 위치 (X%)</label>
                                            <input
                                              type="number"
                                              value={Math.round(selEl.x)}
                                              onChange={(e) => updateElementProperty(selectedElementId, 'x', parseFloat(e.target.value) || 0)}
                                              className={`w-full h-7 text-[11px] font-bold px-1.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                                              }`}
                                            />
                                          </div>
                                          <div>
                                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">세로 위치 (Y%)</label>
                                            <input
                                              type="number"
                                              value={Math.round(selEl.y)}
                                              onChange={(e) => updateElementProperty(selectedElementId, 'y', parseFloat(e.target.value) || 0)}
                                              className={`w-full h-7 text-[11px] font-bold px-1.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                                              }`}
                                            />
                                          </div>
                                          <div>
                                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">너비 (W%)</label>
                                            <input
                                              type="number"
                                              value={Math.round(selEl.width)}
                                              onChange={(e) => updateElementProperty(selectedElementId, 'width', Math.max(2, parseFloat(e.target.value) || 10))}
                                              className={`w-full h-7 text-[11px] font-bold px-1.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                                              }`}
                                            />
                                          </div>
                                          <div>
                                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">높이 (H%)</label>
                                            <input
                                              type="number"
                                              value={Math.round(selEl.height)}
                                              onChange={(e) => updateElementProperty(selectedElementId, 'height', Math.max(2, parseFloat(e.target.value) || 10))}
                                              className={`w-full h-7 text-[11px] font-bold px-1.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
                                              }`}
                                            />
                                          </div>
                                        </div>
                                        <div className="flex gap-2.5 mt-1 text-[9px] text-slate-400 select-none">
                                          <span>회전 각도: <strong>{selEl.rotation || 0}°</strong></span>
                                          <button 
                                            onClick={() => updateElementProperty(selectedElementId, 'rotation', ((selEl.rotation || 0) + 90) % 360)}
                                            className="text-blue-500 font-extrabold cursor-pointer hover:underline"
                                          >
                                            +90° 회전
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {/* DELETE BUTTON */}
                                  {!selEl.locked && (
                                    <button
                                      onClick={() => deleteElement(selectedElementId)}
                                      className={`h-8 w-8 rounded-md border flex items-center justify-center cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors ${
                                        isDarkMode ? "bg-[#161B22] border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-500"
                                      }`}
                                      title="요소 삭제"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  )}
                                </div>
                              );
                            })()
                          ) : (
                            /* DEFAULT DOCK: Undo / Redo */
                            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold">
                              <button
                                onClick={undoEditor}
                                disabled={historyIndex === 0}
                                className={`w-8 h-8 rounded-md flex items-center justify-center border transition-all ${
                                  historyIndex === 0 
                                    ? "opacity-40 cursor-not-allowed" 
                                    : isDarkMode ? "bg-[#161B22] border-slate-850 hover:bg-slate-800 text-white cursor-pointer" : "bg-slate-50 border-slate-150 hover:bg-slate-100 text-slate-750 cursor-pointer"
                                }`}
                                title="실행 취소 (Undo)"
                              >
                                <Undo2 size={12} />
                              </button>
                              <button
                                onClick={redoEditor}
                                disabled={historyIndex >= editorHistory.length - 1}
                                className={`w-8 h-8 rounded-md flex items-center justify-center border transition-all ${
                                  historyIndex >= editorHistory.length - 1 
                                    ? "opacity-40 cursor-not-allowed" 
                                    : isDarkMode ? "bg-[#161B22] border-slate-850 hover:bg-slate-800 text-white cursor-pointer" : "bg-slate-50 border-slate-150 hover:bg-slate-100 text-slate-750 cursor-pointer"
                                }`}
                                title="다시 실행 (Redo)"
                              >
                                <Redo2 size={12} />
                              </button>
                              <span className="ml-1 opacity-70">시안을 완성하려면 요소를 추가하거나 변경하세요.</span>
                            </div>
                          )}
                        </div>

                        {/* TOOLBAR RIGHT: Layers Popover & Exit Button */}
                        <div className="flex items-center gap-1.5 whitespace-nowrap ml-auto">
                          {/* LAYER POPOVER BUTTON */}
                          <div className="relative">
                            <button
                              onClick={() => setActivePopover(activePopover === 'layers' ? null : 'layers')}
                              className={`px-2.5 py-1.5 rounded-lg text-[11.5px] font-extrabold flex items-center gap-1 cursor-pointer border transition-all whitespace-nowrap shrink-0 ${
                                activePopover === 'layers'
                                  ? "bg-blue-50 border-blue-200 text-[#3B63F6]"
                                  : isDarkMode
                                    ? "bg-[#161B22] border-slate-800 text-slate-350 hover:bg-slate-800"
                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                              }`}
                            >
                              <Layers size={13} className="text-slate-500" />
                              <span>레이어</span>
                              <ChevronDown size={11} className="opacity-70" />
                            </button>
                            
                            {/* LAYERS MANAGER PANEL */}
                            {activePopover === 'layers' && (
                              <div className={`absolute right-0 top-[38px] w-60 rounded-xl border p-3 shadow-lg flex flex-col gap-2.5 animate-in slide-in-from-top-1.5 duration-200 ${
                                isDarkMode ? "bg-[#1B2028] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                              }`}>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">레이어 리스트</span>
                                <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-0.5">
                                  {canvasElements.length === 0 ? (
                                    <div className="text-center py-4 text-[11px] text-slate-400 select-none">레이어에 요소가 없습니다.</div>
                                  ) : (
                                    [...canvasElements]
                                      .sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0))
                                      .map((el) => (
                                        <div
                                          key={el.id}
                                          onClick={() => setSelectedElementId(el.id)}
                                          className={`group px-2 py-1.5 rounded-lg text-[11.5px] font-bold flex items-center justify-between gap-1 cursor-pointer transition-all border ${
                                            selectedElementId === el.id
                                              ? "bg-blue-50 border-blue-150 text-[#3B63F6]"
                                              : isDarkMode
                                                ? "bg-[#161B22]/50 border-transparent text-slate-355 hover:bg-slate-800"
                                                : "bg-slate-50 border-transparent text-slate-750 hover:bg-slate-100"
                                          }`}
                                        >
                                          <div className="flex items-center gap-1.5 truncate max-w-[120px]">
                                            <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center shrink-0 text-[8px] text-white ${
                                              el.type === 'image' ? "bg-amber-500" : el.type === 'shape' ? "bg-emerald-500" : "bg-blue-500"
                                            }`}>
                                              {el.type === 'image' ? "I" : el.type === 'shape' ? "S" : "T"}
                                            </div>
                                            <span className="truncate">{el.name || "미확인 요소"}</span>
                                          </div>
                                          
                                          {/* Layers Action buttons */}
                                          <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateElementProperty(el.id, 'visible', !el.visible);
                                              }}
                                              className="p-1 rounded hover:bg-slate-200/50 cursor-pointer text-slate-450 hover:text-slate-800"
                                              title={el.visible ? "숨기기" : "표시"}
                                            >
                                              {el.visible ? <Eye size={11} /> : <EyeOff size={11} className="text-rose-500" />}
                                            </button>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                updateElementProperty(el.id, 'locked', !el.locked);
                                              }}
                                              className="p-1 rounded hover:bg-slate-200/50 cursor-pointer text-slate-450 hover:text-slate-800"
                                              title={el.locked ? "잠금 해제" : "잠금"}
                                            >
                                              {el.locked ? <Lock size={11} className="text-amber-500" /> : <Unlock size={11} />}
                                            </button>
                                            <div className="flex flex-col">
                                              <button
                                                onClick={(e) => { e.stopPropagation(); moveElementOrder(el.id, 'front'); }}
                                                className="hover:text-blue-600 text-[8px] font-black cursor-pointer leading-[6px] h-2.5 px-0.5"
                                                title="앞으로 보내기"
                                              >
                                                ▲
                                              </button>
                                              <button
                                                onClick={(e) => { e.stopPropagation(); moveElementOrder(el.id, 'back'); }}
                                                className="hover:text-blue-600 text-[8px] font-black cursor-pointer leading-[6px] h-2.5 px-0.5"
                                                title="뒤로 보내기"
                                              >
                                                ▼
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              setIsEditingMode(false);
                              setSelectedElementId(null);
                              setActivePopover(null);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-[11.5px] font-extrabold cursor-pointer border transition-all whitespace-nowrap shrink-0 ${
                              isDarkMode
                                ? "bg-slate-800 border-slate-700 text-slate-350 hover:bg-slate-700"
                                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            닫기
                          </button>
                        </div>
                      </div>

                      {/* CANVAS DISPLAY WRAPPER (Gray background, 1:1 Canvas Centered) */}
                      <div 
                        onClick={() => { setSelectedElementId(null); setActivePopover(null); }}
                        className="flex-1 w-full bg-slate-150 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden min-h-[360px]"
                      >
                        
                        {/* THE 1:1 CANVAS CONTAINER */}
                        <div
                          id="canvas-workspace-area"
                          className="aspect-square w-full max-w-[340px] max-h-[340px] bg-white shadow-xl relative overflow-hidden rounded-lg select-none"
                          style={{
                            transform: `scale(${canvasZoom / 100})`,
                            transition: dragState ? 'none' : 'transform 0.15s ease-out'
                          }}
                        >
                          {/* Rendering Canvas Elements */}
                          {canvasElements
                            .filter(el => el.visible !== false)
                            .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
                            .map((el) => {
                              const isSelected = selectedElementId === el.id;

                              if (el.type === 'image') {
                                return (
                                  <div
                                    key={el.id}
                                    id={`canvas-el-${el.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedElementId(el.id);
                                    }}
                                    style={{
                                      position: "absolute",
                                      left: `${el.x}%`,
                                      top: `${el.y}%`,
                                      width: `${el.width}%`,
                                      height: `${el.height}%`,
                                      transform: `rotate(${el.rotation || 0}deg)`,
                                      zIndex: el.zIndex
                                    }}
                                    className="group"
                                  >
                                    <img
                                      src={el.url}
                                      alt="Base background"
                                      className="w-full h-full object-cover pointer-events-none"
                                    />
                                    
                                    {/* Selection Border */}
                                    {isSelected && !el.locked && (
                                      <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none" />
                                    )}
                                  </div>
                                );
                              }

                              if (el.type === 'shape') {
                                return (
                                  <div
                                    key={el.id}
                                    id={`canvas-el-${el.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedElementId(el.id);
                                    }}
                                    onMouseDown={(e) => {
                                      if (el.locked) return;
                                      e.stopPropagation();
                                      setSelectedElementId(el.id);
                                      setDragState({
                                        type: 'move',
                                        elementId: el.id,
                                        startX: e.clientX,
                                        startY: e.clientY,
                                        startLeft: el.x,
                                        startTop: el.y,
                                        startWidth: el.width,
                                        startHeight: el.height,
                                        startRotation: el.rotation || 0
                                      });
                                    }}
                                    style={{
                                      position: "absolute",
                                      left: `${el.x}%`,
                                      top: `${el.y}%`,
                                      width: `${el.width}%`,
                                      height: `${el.height}%`,
                                      transform: `rotate(${el.rotation || 0}deg)`,
                                      zIndex: el.zIndex,
                                      cursor: el.locked ? 'default' : 'move'
                                    }}
                                  >
                                    <div
                                      className="w-full h-full"
                                      style={{
                                        backgroundColor: el.fillColor || "#3B63F6",
                                        borderRadius: el.shapeType === 'circle' ? '9999px' : `${el.borderRadius || 8}px`,
                                        opacity: el.opacity || 0.8
                                      }}
                                    />

                                    {/* SELECTION WRAPPER & RESIZE HANDLERS */}
                                    {isSelected && !el.locked && (
                                      <>
                                        <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none" />
                                        
                                        {/* Resize handles */}
                                        {['tl', 'tr', 'bl', 'br'].map((handle) => (
                                          <div
                                            key={handle}
                                            onMouseDown={(e) => {
                                              e.stopPropagation();
                                              setDragState({
                                                type: 'resize',
                                                elementId: el.id,
                                                startX: e.clientX,
                                                startY: e.clientY,
                                                startLeft: el.x,
                                                startTop: el.y,
                                                startWidth: el.width,
                                                startHeight: el.height,
                                                startRotation: el.rotation || 0,
                                                handle
                                              });
                                            }}
                                            className={`absolute w-2.5 h-2.5 bg-white border border-blue-600 rounded-full z-30 cursor-se-resize ${
                                              handle === 'tl' ? '-top-1.5 -left-1.5' :
                                              handle === 'tr' ? '-top-1.5 -right-1.5' :
                                              handle === 'bl' ? '-bottom-1.5 -left-1.5' : '-bottom-1.5 -right-1.5'
                                            }`}
                                          />
                                        ))}

                                        {/* Rotate handle */}
                                        <div
                                          onMouseDown={(e) => {
                                            e.stopPropagation();
                                            setDragState({
                                              type: 'rotate',
                                              elementId: el.id,
                                              startX: e.clientX,
                                              startY: e.clientY,
                                              startLeft: el.x,
                                              startTop: el.y,
                                              startWidth: el.width,
                                              startHeight: el.height,
                                              startRotation: el.rotation || 0
                                            });
                                          }}
                                          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border border-slate-300 rounded-full flex items-center justify-center cursor-alias hover:border-blue-500 shadow-sm z-30"
                                          title="회전 드래그"
                                        >
                                          <RotateCw size={10} className="text-slate-600" />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                );
                              }

                              if (el.type === 'text') {
                                return (
                                  <div
                                    key={el.id}
                                    id={`canvas-el-${el.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedElementId(el.id);
                                    }}
                                    onMouseDown={(e) => {
                                      if (el.locked || editingTextId === el.id) return;
                                      e.stopPropagation();
                                      setSelectedElementId(el.id);
                                      setDragState({
                                        type: 'move',
                                        elementId: el.id,
                                        startX: e.clientX,
                                        startY: e.clientY,
                                        startLeft: el.x,
                                        startTop: el.y,
                                        startWidth: el.width,
                                        startHeight: el.height,
                                        startRotation: el.rotation || 0
                                      });
                                    }}
                                    style={{
                                      position: "absolute",
                                      left: `${el.x}%`,
                                      top: `${el.y}%`,
                                      width: `${el.width}%`,
                                      height: `${el.height}%`,
                                      transform: `rotate(${el.rotation || 0}deg)`,
                                      zIndex: el.zIndex,
                                      cursor: el.locked ? 'default' : editingTextId === el.id ? 'text' : 'move'
                                    }}
                                  >
                                    <div
                                      contentEditable={!el.locked && editingTextId === el.id}
                                      suppressContentEditableWarning
                                      onBlur={(e) => {
                                        updateElementProperty(el.id, 'text', e.target.innerText || "");
                                        setEditingTextId(null);
                                      }}
                                      onDoubleClick={(e) => {
                                        if (el.locked) return;
                                        e.stopPropagation();
                                        setEditingTextId(el.id);
                                      }}
                                      className={`w-full h-full bg-transparent focus:outline-none focus:ring-0 whitespace-pre-wrap select-text`}
                                      style={{
                                        fontFamily: el.fontFamily || "Pretendard",
                                        fontSize: `${(el.fontSize || 16) * 0.35}vw`,
                                        color: el.color || "#1E293B",
                                        backgroundColor: el.bgColor || "transparent",
                                        fontWeight: el.bold ? 'bold' : 'normal',
                                        fontStyle: el.italic ? 'italic' : 'normal',
                                        textDecoration: el.underline ? 'underline' : 'none',
                                        textAlign: el.align || 'center',
                                        letterSpacing: `${el.letterSpacing || 0}px`,
                                        lineHeight: el.lineHeight || 1.4
                                      }}
                                    >
                                      {el.text}
                                    </div>

                                    {/* SELECTION WRAPPER & RESIZE HANDLERS */}
                                    {isSelected && !el.locked && (
                                      <>
                                        <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none" />
                                        
                                        {/* Resize handles */}
                                        {['tl', 'tr', 'bl', 'br'].map((handle) => (
                                          <div
                                            key={handle}
                                            onMouseDown={(e) => {
                                              e.stopPropagation();
                                              setDragState({
                                                type: 'resize',
                                                elementId: el.id,
                                                startX: e.clientX,
                                                startY: e.clientY,
                                                startLeft: el.x,
                                                startTop: el.y,
                                                startWidth: el.width,
                                                startHeight: el.height,
                                                startRotation: el.rotation || 0,
                                                handle
                                              });
                                            }}
                                            className={`absolute w-2.5 h-2.5 bg-white border border-blue-600 rounded-full z-30 cursor-se-resize ${
                                              handle === 'tl' ? '-top-1.5 -left-1.5' :
                                              handle === 'tr' ? '-top-1.5 -right-1.5' :
                                              handle === 'bl' ? '-bottom-1.5 -left-1.5' : '-bottom-1.5 -right-1.5'
                                            }`}
                                          />
                                        ))}

                                        {/* Rotate handle */}
                                        <div
                                          onMouseDown={(e) => {
                                            e.stopPropagation();
                                            setDragState({
                                              type: 'rotate',
                                              elementId: el.id,
                                              startX: e.clientX,
                                              startY: e.clientY,
                                              startLeft: el.x,
                                              startTop: el.y,
                                              startWidth: el.width,
                                              startHeight: el.height,
                                              startRotation: el.rotation || 0
                                            });
                                          }}
                                          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border border-slate-300 rounded-full flex items-center justify-center cursor-alias hover:border-blue-500 shadow-sm z-30"
                                          title="회전 드래그"
                                        >
                                          <RotateCw size={10} className="text-slate-600" />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                );
                              }

                              return null;
                            })}
                        </div>

                        {/* ZOOM / CONTEXT TIPS BANNER */}
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-bold text-slate-400 select-none bg-white/70 backdrop-blur-md py-1 px-2.5 rounded-lg border border-slate-200/50 shadow-sm">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span>더블클릭하여 인라인 글자 직접 수정</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <span>캔버스 확대/축소:</span>
                            <div className="flex items-center gap-1.5">
                              <button 
                                onClick={() => setCanvasZoom(Math.max(50, canvasZoom - 10))}
                                className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 cursor-pointer"
                              >
                                -
                              </button>
                              <span>{canvasZoom}%</span>
                              <button 
                                onClick={() => setCanvasZoom(Math.min(150, canvasZoom + 10))}
                                className="px-1 py-0.5 bg-slate-100 rounded text-slate-600 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  /* Empty state exactly matching Screenshot 2 */
                  <div className="flex flex-col items-center justify-center text-center max-w-[320px] select-none animate-in fade-in duration-300">
                    <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center mb-4.5 shadow-sm border ${
                      isDarkMode
                        ? "bg-blue-950/20 border-blue-900/30 text-[#6D8FFF]"
                        : "bg-blue-50 border border-blue-100 text-[#3B63F6]"
                    }`}>
                      <ImageIcon size={28} />
                    </div>
                    <h3 className={`text-[15.5px] font-bold tracking-tight mb-2 select-text ${
                      isDarkMode ? "text-[#F8FAFC]" : "text-slate-800"
                    }`}>아직 결과가 없어요</h3>
                    <p className={`text-[12px] font-semibold leading-relaxed tracking-tight select-text ${
                      isDarkMode ? "text-slate-500" : "text-slate-400"
                    }`}>
                      좌측 비주얼 상세 프롬프트 카드를 작성하고 하단의 '이미지 생성하기' 버튼을 누르면 여기에 완성된 시안 이미지가 표시됩니다.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Folded expanded drawer tab in collapsed mode */}
            {isRightPanelCollapsed && (
              <button
                onClick={() => setIsRightPanelCollapsed(false)}
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-8 h-20 border border-r-0 rounded-l-2xl shadow-sm flex flex-col items-center justify-center transition-all cursor-pointer z-20 group ${
                  isDarkMode
                    ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800"
                }`}
                title="에디터 패널 펼치기"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className={`text-[8px] font-bold mt-1 tracking-tighter [writing-mode:vertical-lr] select-none ${
                  isDarkMode ? "text-slate-500 group-hover:text-slate-350" : "text-slate-400 group-hover:text-slate-600"
                }`}>결과 창</span>
              </button>
            )}
          </div>
        ) : (
          /* ==========================================
             AI IMAGE GENERATION VIEW
             ========================================== */
          <div className="flex-1 flex flex-col items-center justify-start pt-[120px] pb-10 px-8 max-w-[1400px] mx-auto w-full">
            <div className="text-center mb-12 max-w-3xl select-none font-sans animate-in fade-in slide-in-from-top-3 duration-500">
              <h1 className={`font-heading font-bold text-[36px] leading-tight tracking-tighter ${
                isDarkMode ? "text-[#F8FAFC]" : "text-[#111827]"
              }`}>
                한 줄의 묘사로, <span className={isDarkMode ? "text-[#6D8FFF]" : "text-[#3B63F6]"}>놀라운 이미지</span>를 만들어보세요
              </h1>
              <p className={`text-[14.5px] font-medium mt-3.5 leading-relaxed tracking-tight ${
                isDarkMode ? "text-[#94A3B8]" : "text-[#64748B]"
              }`}>
                템플릿부터 영감을 얻고 싶다면 바로 시작해 보세요. 직접 시도를 입력하셔도 좋아요.
              </p>
            </div>

            {/* Premium Composer UI with template & image attachment logic */}
            <div className="w-full max-w-full mb-20">
              <div className={`rounded-[24px] flex flex-col transition-all duration-200 ${
                isDarkMode
                  ? "bg-[#1B1F27] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(75,120,255,0.25)] focus-within:border-[rgba(75,120,255,0.25)] shadow-[0_8px_30px_rgba(0,0,0,0.25),_inset_0_1px_0_rgba(255,255,255,0.03)]"
                  : "bg-white border-2 border-[#8BB4F6] shadow-[0_8px_32px_rgba(59,99,246,0.1)] focus-within:shadow-[0_8px_32px_rgba(59,99,246,0.15)]"
              }`}>
                <div className="p-6.5 pb-5 min-h-[148px] flex flex-col relative rounded-t-[22px]">
                  
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />

                  {/* Attachment Chips Container */}
                  <div className="flex flex-wrap gap-2 mb-3.5 select-none">
                    {/* Template Applied Chip (파일첨부 스타일 이식) */}
                    {selectedTemplate ? (
                      <div className="flex items-center bg-[#EFF6FF] border border-blue-200 text-[#3B63F6] pl-2 pr-3.5 py-1.5 rounded-2xl text-[13px] font-bold animate-in fade-in zoom-in-95 duration-250 gap-2.5 relative shadow-sm">
                        {/* Beautiful Thumbnail Preview Image */}
                        <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-blue-200/80 shrink-0 select-none bg-slate-50 shadow-sm">
                          <img
                            src={selectedTemplate.image}
                            alt={selectedTemplate.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Mini blue template indicator tag in the corner */}
                          <div className="absolute top-0 left-0 w-4 h-4 bg-[#3B63F6] text-white flex items-center justify-center text-[9px] font-extrabold rounded-br-lg shadow-[1px_1px_3px_rgba(0,0,0,0.15)]">
                            T
                          </div>
                        </div>

                        {/* Text labels */}
                        <div className="flex flex-col text-left">
                          <span className="text-[12px] font-bold text-blue-700 leading-tight tracking-tight">{selectedTemplate.title}</span>
                          <span className="text-[10px] font-medium text-blue-400 mt-0.5 leading-none">템플릿 적용됨</span>
                        </div>

                        {/* Close button */}
                        <button
                          onClick={() => setSelectedTemplate(null)}
                          className="w-5 h-5 rounded-full bg-blue-100/80 hover:bg-blue-200 flex items-center justify-center text-[#3B63F6] hover:text-blue-800 transition-colors cursor-pointer text-[10px] ml-2 shrink-0 shadow-sm"
                          title="템플릿 제거"
                        >
                          ✕
                        </button>
                      </div>
                    ) : null}

                    {/* File Attachment Chip */}
                    {attachedFile ? (
                      <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-2xl text-[12.5px] font-semibold animate-in fade-in zoom-in-95 duration-250 shadow-sm ${
                        attachedFile.type === 'image' 
                          ? (isDarkMode ? "bg-[#1E232D] border-slate-700 text-[#F8FAFC]" : "bg-white border-blue-200 text-slate-800")
                          : (isDarkMode ? "bg-[#1B1F27] border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-700")
                      }`}>
                        {attachedFile.type === 'image' && attachedFile.url ? (
                          <div className={`group relative w-8 h-8 rounded-lg shrink-0 border ${
                            isDarkMode ? "border-slate-700" : "border-slate-150"
                          }`}>
                            <img 
                              src={attachedFile.url} 
                              alt="attached" 
                              className={`w-full h-full object-cover rounded-lg cursor-pointer transition-opacity duration-200 ${
                                isDarkMode ? "bg-[#1E232D]" : "bg-white"
                              }`} 
                            />
                            {/* Hover Preview Card */}
                            <div className={`absolute bottom-[calc(100%+12px)] left-0 z-[9999] w-[206px] h-[206px] flex items-center justify-center p-1.5 rounded-[16px] border shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-200 ease-out origin-bottom-left opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto ${
                              isDarkMode ? "bg-[#1E232D] border-[#2A3140]/80" : "bg-[#FFFFFF] border-[#E2E8F0]"
                            }`}>
                              <img 
                                src={attachedFile.url} 
                                alt="preview" 
                                className="w-[192px] h-[192px] object-cover rounded-[12px]" 
                              />
                            </div>
                          </div>
                        ) : (
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            attachedFile.type === 'pdf' ? (isDarkMode ? "bg-red-950/20 text-red-400" : "bg-red-50 text-red-500") :
                            attachedFile.type === 'doc' ? (isDarkMode ? "bg-blue-950/20 text-blue-400" : "bg-blue-50 text-blue-500") :
                            attachedFile.type === 'excel' ? (isDarkMode ? "bg-green-950/20 text-green-400" : "bg-green-50 text-green-500") :
                            attachedFile.type === 'zip' ? (isDarkMode ? "bg-amber-950/20 text-amber-400" : "bg-amber-50 text-amber-500") :
                            (isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500")
                          }`}>
                            {attachedFile.type === 'pdf' ? <FileText size={16} /> :
                             attachedFile.type === 'doc' ? <FileText size={16} /> :
                             attachedFile.type === 'excel' ? <FileSpreadsheet size={16} /> :
                             attachedFile.type === 'zip' ? <FileArchive size={16} /> :
                             <File size={16} />}
                          </div>
                        )}
                        <div className="flex flex-col text-left leading-tight ml-0.5">
                          <span className="tracking-tight font-extrabold max-w-[120px] truncate">{attachedFile.name}</span>
                          <span className="text-[10px] text-slate-400">{attachedFile.size}</span>
                        </div>
                        <button
                          onClick={() => setAttachedFile(null)}
                          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ml-1 transition-colors cursor-pointer ${
                            isDarkMode 
                              ? "bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-slate-200" 
                              : "bg-slate-100 hover:bg-slate-200 text-slate-500"
                          }`}
                          title="첨부 파일 제거"
                        >
                          ✕
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {/* Textarea Input */}
                  <textarea
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder={
                      selectedTemplate
                        ? "선택하신 템플릿이 적용되었습니다. 이곳에 추가로 원하는 묘사를 마음껏 적어주세요!"
                        : "예: 미니멀 워크스페이스에 놓인 청자병, 봄빛에 비치는 부드러운 다큐멘터리 라이팅"
                    }
                    className={`w-full bg-transparent border-none outline-none resize-none text-[16px] font-medium tracking-tight min-h-[60px] focus:ring-0 ${
                      isDarkMode ? "text-[#F8FAFC] placeholder-slate-500" : "text-slate-800 placeholder-slate-400"
                    }`}
                  />
                </div>
                
                {/* Bottom Actions Bar */}
                <div className={`px-6 py-4 flex items-center border-t rounded-b-[22px] select-none ${
                  isDarkMode ? "border-[#2A3140] bg-[#171A21]/65" : "border-slate-50 bg-[#F8FAFC]/65"
                }`}>
                  <div className="flex gap-2.5">
                    {/* 사진 첨부 버튼 */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex items-center gap-2 px-4 h-9 rounded-full text-[12.5px] font-bold active:scale-95 transition-all shadow-sm cursor-pointer ${
                        isDarkMode
                          ? "bg-[#1E232D] border border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-slate-200"
                          : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                      }`}
                      title="사진 첨부"
                    >
                      <Paperclip size={14} />
                      사진 첨부
                    </button>
                  </div>
                  
                  <div className="ml-auto flex items-center gap-3">
                    {/* Aspect Ratio Selector Popover */}
                    <div className="relative" ref={ratioRef}>
                      <button
                        onClick={() => setIsRatioPopoverOpen(!isRatioPopoverOpen)}
                        className={`px-4 h-9 rounded-full text-[12.5px] font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm cursor-pointer ${
                          isDarkMode
                            ? `bg-[#1E232D] border border-[#2A3140] text-slate-350 hover:bg-[#252B36] hover:text-white ${isRatioPopoverOpen ? "border-[#6D8FFF] bg-[#252B36]" : ""}`
                            : `bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 ${isRatioPopoverOpen ? "border-slate-300 bg-slate-50" : ""}`
                        }`}
                      >
                        <span>비율 {aspectRatio}</span>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isRatioPopoverOpen ? "rotate-180" : ""}`} />
                      </button>

                      {/* Floating Popover Dropdown (above composer bottom actions) */}
                      {isRatioPopoverOpen && (
                        <div className={`absolute right-0 bottom-full mb-2.5 w-[165px] rounded-[20px] shadow-[0_12px_38px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.03)] z-30 py-2 px-1.5 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                          isDarkMode ? "bg-[#1E232D] border border-[#2A3140]" : "bg-white border border-[#E2E8F0]"
                        }`}>
                          {["1:1", "16:9", "4:3", "9:16", "2:3"].map((ratio) => {
                            const isSelected = aspectRatio === ratio;
                            
                            // Calculate preview thumbnail shapes
                            let shapeClass = "";
                            if (ratio === "1:1") shapeClass = "w-[14px] h-[14px]";
                            else if (ratio === "16:9") shapeClass = "w-[18px] h-[10px]";
                            else if (ratio === "4:3") shapeClass = "w-[16px] h-[12px]";
                            else if (ratio === "9:16") shapeClass = "w-[10px] h-[18px]";
                            else if (ratio === "2:3") shapeClass = "w-[12px] h-[18px]";

                            return (
                              <button
                                key={ratio}
                                onClick={() => {
                                  setAspectRatio(ratio);
                                  setIsRatioPopoverOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-xl text-[12.5px] font-semibold flex items-center transition-colors cursor-pointer group ${
                                  isSelected
                                    ? (isDarkMode ? "text-[#6D8FFF] bg-slate-800" : "text-[#3B63F6] bg-[#EFF6FF]/65")
                                    : (isDarkMode ? "text-slate-400 hover:bg-slate-850 hover:text-slate-200" : "text-slate-650 hover:bg-[#F8FAFC] hover:text-slate-950")
                                }`}
                              >
                                {/* Mini aspect ratio illustration box with high contrast outline */}
                                <div className={`w-8 h-8 flex items-center justify-center rounded-lg shrink-0 mr-2.5 transition-colors border ${
                                  isDarkMode ? "bg-slate-800 border-slate-700 group-hover:bg-slate-750" : "bg-slate-50 border-slate-100 group-hover:bg-slate-100"
                                }`}>
                                  <div className={`${shapeClass} border-[1.5px] ${
                                    isSelected
                                      ? (isDarkMode ? "border-[#6D8FFF] bg-slate-700/50" : "border-[#3B63F6] bg-blue-50/50")
                                      : (isDarkMode ? "border-slate-400" : "border-slate-800")
                                  } rounded-[3px] transition-colors`} />
                                </div>

                                <span className="font-bold tracking-tight">{ratio}</span>
                                
                                {isSelected && <div className={`ml-auto w-1.5 h-1.5 rounded-full ${isDarkMode ? "bg-[#6D8FFF]" : "bg-[#3B63F6]"}`} />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Generate Button */}
                    <button
                      onClick={handleStartGeneration}
                      className={`flex items-center gap-2 px-5.5 h-9 rounded-full text-white text-[13.5px] font-bold transition-all shadow-sm cursor-pointer active:scale-95 ${
                        isDarkMode ? "bg-[#6D8FFF] hover:bg-[#4F7BFF]" : "bg-[#3B63F6] hover:bg-blue-700"
                      }`}
                    >
                      <Sparkles size={14} />
                      생성하기
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter Title & Header */}
            <div className="w-full max-w-full mb-12 select-none">
              <div className="flex items-center justify-between mb-5">
                <span className={`text-[16px] font-extrabold tracking-tight ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-900"}`}>카테고리</span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {["전체", "AI 이미지", "카드뉴스", "웹툰", "상세페이지"].map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4.5 py-1.5 rounded-full text-[13px] font-semibold tracking-tight transition-all cursor-pointer ${
                        isActive
                          ? (isDarkMode ? "bg-[#6D8FFF] text-white shadow-sm" : "bg-[#3B63F6] text-white shadow-sm")
                          : (isDarkMode ? "bg-[#1E232D] text-slate-400 hover:bg-[#252B36] hover:text-slate-200" : "bg-[#F1F5F9] text-slate-600 hover:bg-slate-200")
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Template Masonry Cards Grid (4 columns exactly like Figma) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-full mb-12 px-0.5">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-6">
                {col1.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border ${
                      isDarkMode
                        ? "bg-[#1E232D] border-[#2A3140] shadow-none hover:shadow-none hover:border-[#6D8FFF]"
                        : "bg-white border-[#E5E7EB] shadow-none hover:bg-[#F1F5F9] transition-colors"
                    }`}
                  >
                    {/* Image with apply template overlay */}
                    <div className={`relative ${t.aspect} w-full overflow-hidden shrink-0 select-none ${
                      isDarkMode ? "bg-slate-800" : "bg-slate-50"
                    }`}>
                      {/* Premium Category Glass Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-1 border border-white/20"
                        style={{
                          backgroundColor: 
                            t.category === "AI 이미지" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                            t.category === "카드뉴스" ? (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)") : 
                            t.category === "웹툰" ? (isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(245, 243, 255, 0.85)") : 
                            t.category === "상세페이지" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                            (isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.85)"),
                          color: 
                            t.category === "AI 이미지" ? "#F59E0B" : 
                            t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                            t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                            t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                            (isDarkMode ? "#94A3B8" : "#64748B")
                        }}
                      >
                        <span className="w-1 h-1 rounded-full animate-pulse" 
                          style={{
                            backgroundColor: 
                              t.category === "AI 이미지" ? "#F59E0B" : 
                              t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                              t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                              t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                              (isDarkMode ? "#94A3B8" : "#64748B")
                          }}
                        />
                        {t.category}
                      </div>
                      <img
                        src={t.image}
                        alt={t.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Dark overlay & center align button on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                        <button
                          onClick={() => { handleApplyTemplate(t); }}
                          className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
                        >
                          <Plus size={14} className="text-[#3B63F6]" />
                          템플릿 적용하기
                        </button>
                      </div>
                      {/* Favorite button top-right */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 cursor-pointer ${
                          favoriteTemplates.has(t.id)
                            ? "bg-amber-400 text-white opacity-100"
                            : "bg-white/90 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400"
                        }`}
                      >
                        <Star size={14} fill={favoriteTemplates.has(t.id) ? "currentColor" : "none"} strokeWidth={2} />
                      </button>
                    </div>
 
                    {/* Card Content */}
                    <div className="p-4.5 flex flex-col flex-1 text-left">
                      <h3 className={`text-[13.5px] font-bold leading-tight tracking-tight mb-2 select-text ${
                        isDarkMode ? "text-[#F8FAFC]" : "text-[#1F2937]"
                      }`}>
                        {t.title}
                      </h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-x-2 mt-auto">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`font-bold text-[10.5px] tracking-tight select-none ${
                              isDarkMode ? "text-slate-500" : "text-[#94A3B8]"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-6">
                {col2.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border ${
                      isDarkMode
                        ? "bg-[#1E232D] border-[#2A3140] shadow-none hover:shadow-none hover:border-[#6D8FFF]"
                        : "bg-white border-[#E5E7EB] shadow-none hover:bg-[#F1F5F9] transition-colors"
                    }`}
                  >
                    {/* Image with apply template overlay */}
                    <div className={`relative ${t.aspect} w-full overflow-hidden shrink-0 select-none ${
                      isDarkMode ? "bg-slate-800" : "bg-slate-50"
                    }`}>
                      {/* Premium Category Glass Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-1 border border-white/20"
                        style={{
                          backgroundColor: 
                            t.category === "AI 이미지" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                            t.category === "카드뉴스" ? (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)") : 
                            t.category === "웹툰" ? (isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(245, 243, 255, 0.85)") : 
                            t.category === "상세페이지" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                            (isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.85)"),
                          color: 
                            t.category === "AI 이미지" ? "#F59E0B" : 
                            t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                            t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                            t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                            (isDarkMode ? "#94A3B8" : "#64748B")
                        }}
                      >
                        <span className="w-1 h-1 rounded-full animate-pulse" 
                          style={{
                            backgroundColor: 
                              t.category === "AI 이미지" ? "#F59E0B" : 
                              t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                              t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                              t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                              (isDarkMode ? "#94A3B8" : "#64748B")
                          }}
                        />
                        {t.category}
                      </div>
                      <img
                        src={t.image}
                        alt={t.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Dark overlay & center align button on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                        <button
                          onClick={() => { handleApplyTemplate(t); }}
                          className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
                        >
                          <Plus size={14} className="text-[#3B63F6]" />
                          템플릿 적용하기
                        </button>
                      </div>
                      {/* Favorite button top-right */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 cursor-pointer ${
                          favoriteTemplates.has(t.id)
                            ? "bg-amber-400 text-white opacity-100"
                            : "bg-white/90 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400"
                        }`}
                      >
                        <Star size={14} fill={favoriteTemplates.has(t.id) ? "currentColor" : "none"} strokeWidth={2} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-4.5 flex flex-col flex-1 text-left">
                      <h3 className={`text-[13.5px] font-bold leading-tight tracking-tight mb-2 select-text ${
                        isDarkMode ? "text-[#F8FAFC]" : "text-[#1F2937]"
                      }`}>
                        {t.title}
                      </h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-x-2 mt-auto">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`font-bold text-[10.5px] tracking-tight select-none ${
                              isDarkMode ? "text-slate-500" : "text-[#94A3B8]"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 3 */}
              <div className="flex flex-col gap-6">
                {col3.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border ${
                      isDarkMode
                        ? "bg-[#1E232D] border-[#2A3140] shadow-none hover:shadow-none hover:border-[#6D8FFF]"
                        : "bg-white border-[#E5E7EB] shadow-none hover:bg-[#F1F5F9] transition-colors"
                    }`}
                  >
                    {/* Image with apply template overlay */}
                    <div className={`relative ${t.aspect} w-full overflow-hidden shrink-0 select-none ${
                      isDarkMode ? "bg-slate-800" : "bg-slate-50"
                    }`}>
                      {/* Premium Category Glass Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-1 border border-white/20"
                        style={{
                          backgroundColor: 
                            t.category === "AI 이미지" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                            t.category === "카드뉴스" ? (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)") : 
                            t.category === "웹툰" ? (isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(245, 243, 255, 0.85)") : 
                            t.category === "상세페이지" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                            (isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.85)"),
                          color: 
                            t.category === "AI 이미지" ? "#F59E0B" : 
                            t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                            t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                            t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                            (isDarkMode ? "#94A3B8" : "#64748B")
                        }}
                      >
                        <span className="w-1 h-1 rounded-full animate-pulse" 
                          style={{
                            backgroundColor: 
                              t.category === "AI 이미지" ? "#F59E0B" : 
                              t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                              t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                              t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                              (isDarkMode ? "#94A3B8" : "#64748B")
                          }}
                        />
                        {t.category}
                      </div>
                      <img
                        src={t.image}
                        alt={t.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Dark overlay & center align button on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                        <button
                          onClick={() => { handleApplyTemplate(t); }}
                          className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
                        >
                          <Plus size={14} className="text-[#3B63F6]" />
                          템플릿 적용하기
                        </button>
                      </div>
                      {/* Favorite button top-right */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 cursor-pointer ${
                          favoriteTemplates.has(t.id)
                            ? "bg-amber-400 text-white opacity-100"
                            : "bg-white/90 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400"
                        }`}
                      >
                        <Star size={14} fill={favoriteTemplates.has(t.id) ? "currentColor" : "none"} strokeWidth={2} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-4.5 flex flex-col flex-1 text-left">
                      <h3 className={`text-[13.5px] font-bold leading-tight tracking-tight mb-2 select-text ${
                        isDarkMode ? "text-[#F8FAFC]" : "text-[#1F2937]"
                      }`}>
                        {t.title}
                      </h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-x-2 mt-auto">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`font-bold text-[10.5px] tracking-tight select-none ${
                              isDarkMode ? "text-slate-500" : "text-[#94A3B8]"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 4 */}
              <div className="flex flex-col gap-6">
                {col4.map((t) => (
                  <div
                    key={t.id}
                    className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border ${
                      isDarkMode
                        ? "bg-[#1E232D] border-[#2A3140] shadow-none hover:shadow-none hover:border-[#6D8FFF]"
                        : "bg-white border-[#E5E7EB] shadow-none hover:bg-[#F1F5F9] transition-colors"
                    }`}
                  >
                    {/* Image with apply template overlay */}
                    <div className={`relative ${t.aspect} w-full overflow-hidden shrink-0 select-none ${
                      isDarkMode ? "bg-slate-800" : "bg-slate-50"
                    }`}>
                      {/* Premium Category Glass Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center gap-1 border border-white/20"
                        style={{
                          backgroundColor: 
                            t.category === "AI 이미지" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                            t.category === "카드뉴스" ? (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)") : 
                            t.category === "웹툰" ? (isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(245, 243, 255, 0.85)") : 
                            t.category === "상세페이지" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                            (isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.85)"),
                          color: 
                            t.category === "AI 이미지" ? "#F59E0B" : 
                            t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                            t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                            t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                            (isDarkMode ? "#94A3B8" : "#64748B")
                        }}
                      >
                        <span className="w-1 h-1 rounded-full animate-pulse" 
                          style={{
                            backgroundColor: 
                              t.category === "AI 이미지" ? "#F59E0B" : 
                              t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                              t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                              t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                              (isDarkMode ? "#94A3B8" : "#64748B")
                          }}
                        />
                        {t.category}
                      </div>
                      <img
                        src={t.image}
                        alt={t.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Dark overlay & center align button on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                        <button
                          onClick={() => { handleApplyTemplate(t); }}
                          className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
                        >
                          <Plus size={14} className="text-[#3B63F6]" />
                          템플릿 적용하기
                        </button>
                      </div>
                      {/* Favorite button top-right */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 cursor-pointer ${
                          favoriteTemplates.has(t.id)
                            ? "bg-amber-400 text-white opacity-100"
                            : "bg-white/90 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400"
                        }`}
                      >
                        <Star size={14} fill={favoriteTemplates.has(t.id) ? "currentColor" : "none"} strokeWidth={2} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-4.5 flex flex-col flex-1 text-left">
                      <h3 className={`text-[13.5px] font-bold leading-tight tracking-tight mb-2 select-text ${
                        isDarkMode ? "text-[#F8FAFC]" : "text-[#1F2937]"
                      }`}>
                        {t.title}
                      </h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-x-2 mt-auto">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`font-bold text-[10.5px] tracking-tight select-none ${
                              isDarkMode ? "text-slate-500" : "text-[#94A3B8]"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Refined Image Tab Footer */}
            <footer className="mt-auto text-center w-full select-none">
              <p className="text-[12px] font-medium text-slate-400 tracking-tight">
                딸깍.net - AI 통합 서비스 · © 2026 · 고객센터 <span className="mx-1.5 text-slate-200">|</span> 이용약관 <span className="mx-1.5 text-slate-200">|</span> 개인정보처리방침
              </p>
            </footer>
          </div>
        )}
      </main>

      {/* Dynamic Success Credit Top-up Toast Notification */}
      {creditToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#1E293B] text-white px-5 py-3.5 rounded-2xl shadow-xl z-[99] flex items-center gap-2.5 text-[13px] font-bold animate-in fade-in slide-in-from-top-4 duration-300 select-none">
          <CircleCheck size={16} className="text-[#3B63F6]" />
          <span>{creditToast}</span>
        </div>
      )}

      {/* Credit Top-up Modal Dialog (Fully matching User Reference with premium aesthetics) */}
      {isCreditModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsCreditModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[32px] w-full max-w-[460px] border border-slate-100 shadow-[0_24px_60px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.03)] flex flex-col p-6.5 animate-in fade-in zoom-in-95 duration-200 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5.5 select-none">
              <div className="flex items-center gap-2">
                <Coins size={20} className="text-[#3B63F6]" />
                <h2 className="text-[17px] font-extrabold text-slate-800 tracking-tight">크레딧 충전</h2>
              </div>
              <button 
                onClick={() => setIsCreditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="닫기"
              >
                ✕
              </button>
            </div>

            {/* Current Balance Card (Outfit Inspired Premium Gradient Card) */}
            <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/70 rounded-[22px] p-4.5 flex items-center justify-between mb-6 shadow-[0_2px_4px_rgba(59,99,246,0.02)] select-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 animate-pulse">
                  <Coins size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 tracking-tight leading-none">현재 잔액</span>
                  <span className="text-[19px] font-black text-slate-800 tracking-tight mt-1.5 font-sans leading-none">
                    {userCredits.toLocaleString()}<span className="text-[13px] font-bold text-slate-400 ml-1">크레딧</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Charging Packages Header */}
            <div className="mb-3 px-1 select-none">
              <span className="text-[13px] font-extrabold text-slate-400 tracking-tight">충전 패키지</span>
            </div>

            {/* Packages List */}
            <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-0.5 scrollbar-thin">
              {[
                { amount: 1000, price: "₩1,000" },
                { amount: 5000, price: "₩5,000" },
                { amount: 10000, price: "₩10,000" },
                { amount: 50000, price: "₩50,000" },
                { amount: 100000, price: "₩100,000" }
              ].map((pkg, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-white border border-slate-150 hover:border-blue-200 hover:bg-blue-50/5 rounded-2xl shadow-sm transition-all duration-200 group/pkg hover:scale-[1.005] select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8.5 h-8.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover/pkg:text-[#3B63F6] group-hover/pkg:bg-blue-50 group-hover/pkg:border-blue-100 transition-colors">
                      <Sparkles size={15} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12.5px] font-extrabold text-slate-800 tracking-tight leading-none group-hover/pkg:text-[#3B63F6] transition-colors">
                        {pkg.amount.toLocaleString()} 크레딧
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 tracking-tight leading-none mt-1">
                        {pkg.amount.toLocaleString()} 크레딧
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[13.5px] font-black text-slate-850 tracking-tight font-sans">
                      {pkg.price}
                    </span>
                    <button
                      onClick={() => {
                        setUserCredits(prev => prev + pkg.amount);
                        setCreditToast(`${pkg.amount.toLocaleString()} 크레딧이 성공적으로 충전되었습니다.`);
                      }}
                      className="bg-[#1E293B] hover:bg-[#3B63F6] active:scale-95 text-white h-8.5 px-4 rounded-xl text-[12px] font-extrabold transition-all shadow-sm cursor-pointer"
                    >
                      충전하기
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer View Usage Link */}
            <div className="mt-5.5 text-center select-none">
              <button 
                onClick={() => {
                  setCreditToast("사용 내역 기능 준비 중입니다!");
                }}
                className="text-[12px] font-extrabold text-slate-400 hover:text-[#3B63F6] hover:underline flex items-center gap-1 mx-auto transition-colors cursor-pointer"
              >
                <span>사용 내역 보기</span>
                <span className="text-[11px]">➔</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal Dialog ("딸깍 크레딧 1,000 결제" - 완벽 재현) */}
      {isPaymentModalOpen && selectedPaymentPkg && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsPaymentModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[28px] w-full max-w-[430px] border border-slate-100 shadow-[0_24px_50px_rgba(0,0,0,0.15)] flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5.5 select-none">
              <h2 className="text-[15.5px] font-extrabold text-slate-800 tracking-tight">
                딸깍 크레딧 {selectedPaymentPkg.amount.toLocaleString()} 결제
              </h2>
              <button 
                onClick={() => setIsPaymentModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-[12px]"
                title="닫기"
              >
                ✕
              </button>
            </div>

            {/* Label */}
            <div className="mb-2.5 select-none">
              <span className="text-[12.5px] font-extrabold text-slate-800 tracking-tight">결제 방법</span>
            </div>

            {/* Methods Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {/* Card option */}
              <button 
                onClick={() => setPaymentMethod("card")}
                className={`flex items-center justify-center h-[46px] rounded-xl border text-[12px] font-extrabold transition-all cursor-pointer select-none ${
                  paymentMethod === "card" 
                    ? "border-[#1E293B] text-[#1E293B] bg-slate-50/60 ring-1 ring-[#1E293B]" 
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                신용·체크카드
              </button>

              {/* Kakao Option */}
              <button 
                onClick={() => setPaymentMethod("kakao")}
                className={`flex items-center justify-center h-[46px] rounded-xl border transition-all cursor-pointer select-none ${
                  paymentMethod === "kakao" 
                    ? "border-[#FEE500] bg-[#FEE500]/10 ring-1 ring-[#FEE500]" 
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="bg-[#FEE500] text-slate-900 px-1 py-0.5 rounded-[3px] text-[8px] font-black mr-1 leading-none select-none">pay</span>
                <span className="text-[12px] font-extrabold text-slate-800">카카오페이</span>
              </button>

              {/* Toss Option */}
              <button 
                onClick={() => setPaymentMethod("toss")}
                className={`flex items-center justify-center h-[46px] rounded-xl border transition-all cursor-pointer select-none ${
                  paymentMethod === "toss" 
                    ? "border-[#0064FF] bg-blue-50/10 ring-1 ring-[#0064FF]" 
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="text-[11.5px] font-black text-[#0064FF] tracking-tighter select-none">toss</span>
                <span className="text-[11.5px] font-black text-slate-800 ml-0.5 select-none">pay</span>
              </button>

              {/* Payco Option */}
              <button 
                onClick={() => setPaymentMethod("payco")}
                className={`flex items-center justify-center h-[46px] rounded-xl border transition-all cursor-pointer select-none ${
                  paymentMethod === "payco" 
                    ? "border-[#E50012] bg-red-50/10 ring-1 ring-[#E50012]" 
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span className="text-[12px] font-black text-[#E50012] tracking-tighter select-none">PAYCO</span>
              </button>
            </div>

            {/* Card details select */}
            {paymentMethod === "card" && (
              <div className="flex flex-col select-none">
                <div className="relative">
                  <select 
                    value={selectedCardCompany}
                    onChange={(e) => setSelectedCardCompany(e.target.value)}
                    className="w-full h-[42px] rounded-xl border border-slate-200 bg-white px-3 text-[12px] font-bold text-slate-700 focus:border-[#3B63F6] focus:ring-1 focus:ring-[#3B63F6] outline-none cursor-pointer appearance-none"
                  >
                    <option value="" disabled>카드사 선택</option>
                    <option value="shinhan">신한카드</option>
                    <option value="kookmin">KB국민카드</option>
                    <option value="hyundai">현대카드</option>
                    <option value="samsung">삼성카드</option>
                    <option value="lotte">롯데카드</option>
                    <option value="nh">NH농협카드</option>
                    <option value="hana">하나카드</option>
                    <option value="bc">BC카드</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown size={14} />
                  </div>
                </div>
                
                <button 
                  onClick={() => alert("무이자 할부 카드 혜택 안내 창으로 연결됩니다.")}
                  className="text-[10px] text-slate-400 hover:text-[#3B63F6] font-bold mt-2 self-start hover:underline cursor-pointer transition-colors"
                >
                  신용카드 무이자 할부 안내 ➔
                </button>
              </div>
            )}

            {/* Checkbox agreement */}
            <label className="flex items-center gap-2 mt-7 select-none cursor-pointer">
              <input 
                type="checkbox"
                checked={isPaymentAgreementChecked}
                onChange={() => setIsPaymentAgreementChecked(!isPaymentAgreementChecked)}
                className="w-4 h-4 rounded text-[#3B63F6] border-slate-300 focus:ring-[#3B63F6] cursor-pointer"
              />
              <span className="text-[11.5px] font-bold text-slate-500">
                [필수] 결제 서비스 이용 약관, 개인정보 처리 동의
              </span>
              <span className="text-[11px] text-slate-400 hover:text-[#3B63F6] hover:underline ml-auto">➔</span>
            </label>

            {/* Action button */}
            <button 
              disabled={!isPaymentAgreementChecked || (paymentMethod === "card" && !selectedCardCompany)}
              onClick={() => {
                setUserCredits(prev => prev + selectedPaymentPkg.amount);
                setCreditToast(`${selectedPaymentPkg.amount.toLocaleString()} 크레딧이 성공적으로 충전되었습니다.`);
                setIsPaymentModalOpen(false);
                setIsCreditModalOpen(false);
              }}
              className={`w-full h-11.5 rounded-xl text-white text-[13px] font-black transition-all shadow-md mt-5 select-none active:scale-[0.98] ${
                isPaymentAgreementChecked && (paymentMethod !== "card" || selectedCardCompany)
                  ? "bg-[#3B63F6] hover:bg-blue-700 cursor-pointer" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              {selectedPaymentPkg.price} 결제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
