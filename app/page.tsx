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
  Beaker,
  PenTool,
  Video,
  LayoutGrid,
  Store,
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
  RotateCw,
  Columns,
  Upload,
  X,
  Copy,
  Play,
  Wand2,
  RefreshCw
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ElementType } from "react";
import CardnewsWorkspace from "@/components/CardnewsWorkspace";
import LpWorkspace from "@/components/LpWorkspace";
import DetailWorkspace from "@/components/DetailWorkspace";

const getTemplateId = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

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

const SidebarHistoryItem = ({ title, isDarkMode = false, onClick }: { title: string; isDarkMode?: boolean; onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 text-[13px] rounded-xl truncate transition-all duration-200 hover:translate-x-0.5 cursor-pointer ${
      isDarkMode 
        ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40" 
        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
    }`}
  >
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
    aspect: "aspect-[1/1]",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Q4 마케팅 인사이트",
    category: "카드뉴스",
    tags: ["#카드뉴스", "#비즈니스"],
    column: 2,
    aspect: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "공동 챌린지 7일",
    category: "카드뉴스",
    tags: ["#카드뉴스", "#라이프"],
    column: 2,
    aspect: "aspect-[1/1]",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 16,
    title: "비건 라이프 가이드",
    category: "카드뉴스",
    tags: ["#카드뉴스", "#라이프"],
    column: 2,
    aspect: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 301,
    title: "시네마틱 다크 우주",
    category: "랜딩페이지",
    tags: ["#랜딩페이지", "#다크"],
    column: 2,
    aspect: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 302,
    title: "웜톤 코랄 라운드",
    category: "랜딩페이지",
    tags: ["#랜딩페이지", "#코랄"],
    column: 2,
    aspect: "aspect-[1/1]",
    image: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 303,
    title: "딸깍페이지 랜딩페이지 제작",
    category: "랜딩페이지",
    tags: ["#랜딩페이지", "#비즈니스"],
    column: 2,
    aspect: "aspect-[3/4]",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
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

const ALL_TEMPLATES = [
  ...TEMPLATES.map(t => ({ ...t, type: "image" })),
  ...[
    { title: "시네마틱 다크 우주 스타일", category: "SaaS", tags: ["#다크", "#시네마틱"], bg: "bg-[#090D1A]", textCol: "text-[#6D8FFF]", accentBg: "bg-blue-500/10", accentText: "text-blue-400" },
    { title: "웜톤 코랄 라운드 스타일", category: "서비스", tags: ["#코랄", "#라운드"], bg: "bg-[#FFF5F3]", textCol: "text-[#EF4444]", accentBg: "bg-red-500/10", accentText: "text-red-400" },
    { title: "럭셔리 다크 블루 스타일", category: "이벤트", tags: ["#럭셔리", "#블루"], bg: "bg-[#0B1528]", textCol: "text-[#4F7BFF]", accentBg: "bg-blue-600/10", accentText: "text-blue-400" },
    { title: "오픈소스 에메랄드 스타일", category: "SaaS", tags: ["#에메랄드", "#블랙"], bg: "bg-[#05140C]", textCol: "text-[#22C55E]", accentBg: "bg-green-500/10", accentText: "text-green-400" },
    { title: "극미니멀 모노크롬 스타일", category: "서비스", tags: ["#모노크롬", "#미니멀"], bg: "bg-[#111111]", textCol: "text-white", accentBg: "bg-white/10", accentText: "text-white" },
    { title: "크림 세리프 아카데믹", category: "이벤트", tags: ["#크림", "#세리프"], bg: "bg-[#FAF6EE]", textCol: "text-[#C084FC]", accentBg: "bg-purple-500/10", accentText: "text-purple-400" }
  ].map(t => ({ ...t, id: getTemplateId(t.title), type: "lp", aspect: "aspect-[16/10]" })),
  ...[
    { title: "까칠한 냥이의 분노", category: "영상", tags: ["#숏폼", "#반려동물"], image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80", coverText: "이게 뭘 보고 있는 거야?" },
    { title: "군고구마 먹는 강아지", category: "영상", tags: ["#숏폼", "#ASMR"], image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80", coverText: "군고구마 먹는 강아지" },
    { title: "조선 궁궐과 빌딩", category: "유튜브영상", tags: ["#시네마틱", "#역사"], image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80", coverText: "궁궐과 현대 빌딩의 조화!" },
    { title: "당근 써는 ASMR", category: "영상", tags: ["#ASMR", "#요리"], image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80", coverText: "당근 썰어볼까요?" }
  ].map(t => ({ ...t, id: getTemplateId(t.title), type: "vid", aspect: t.category === "유튜브영상" ? "aspect-[16/9]" : "aspect-[9/16]" })),
  ...[
    { title: "비즈니스 프레젠테이션", category: "PPT", tags: ["#비즈니스"], subtitle: "2026 금융소비자 트렌드", bg: "from-blue-600 to-indigo-700" },
    { title: "마케팅 포트폴리오", category: "PPT", tags: ["#다크", "#프리미엄"], subtitle: "MARKETING PORTFOLIO", bg: "from-slate-800 to-slate-950" },
    { title: "크리에이티브 포트폴리오", category: "슬라이드", tags: ["#크리에이티브"], subtitle: "COMPANY", bg: "from-red-600 to-red-800" },
    { title: "미니멀 보고서", category: "슬라이드", tags: ["#미니멀"], subtitle: "ROI를 높이는 실행형 전략", bg: "from-[#F3EFE9] to-[#E5DFD4]", darkText: true },
    { title: "제품 브로셔", category: "PPT", tags: ["#글라스모피즘"], subtitle: "Product Brochure", bg: "from-blue-200 to-indigo-300", darkText: true },
    { title: "깔끔한 프레젠테이션", category: "슬라이드", tags: ["#화이트", "#미니멀"], subtitle: "깔끔한 프레젠테이션", bg: "from-[#F8FAFC] to-[#F1F5F9]", darkText: true }
  ].map(t => ({ ...t, id: getTemplateId(t.title), type: "deck", aspect: "aspect-[16/10]" })),
  ...[
    { title: "브랜드 BGM 30초", category: "음악", tags: ["#BGM", "#브랜드"], bg: "from-purple-100 to-indigo-150", waveColor: "bg-purple-400" },
    { title: "팟캐스트 인트로", category: "팟캐스트", tags: ["#팟캐스트", "#인트로"], bg: "from-blue-100 to-sky-150", waveColor: "bg-blue-400" },
    { title: "제품 광고 음악", category: "음악", tags: ["#광고", "#비트"], bg: "from-orange-100 to-amber-150", waveColor: "bg-orange-400" },
    { title: "명상 앰비언트", category: "음악", tags: ["#앰비언트", "#힐링"], bg: "from-green-100 to-emerald-150", waveColor: "bg-green-400" },
    { title: "로파이 비트", category: "음악", tags: ["#로파이", "#집중"], bg: "from-slate-100 to-slate-200", waveColor: "bg-slate-400" },
    { title: "TTS 내레이션", category: "팟캐스트", tags: ["#TTS", "#내레이션"], bg: "from-yellow-100 to-amber-150", waveColor: "bg-amber-400" },
    { title: "유튜브 오프닝 징글", category: "음악", tags: ["#징글", "#유튜브"], bg: "from-pink-100 to-rose-150", waveColor: "bg-pink-400" },
    { title: "카페 재즈 루프", category: "음악", tags: ["#재즈", "#매장"], bg: "from-blue-100 to-indigo-150", waveColor: "bg-indigo-400" }
  ].map(t => ({ ...t, id: getTemplateId(t.title), type: "audio", aspect: "aspect-[4/3]" })),
  ...[
    { title: "채용추천서", category: "워드", tags: ["#비즈니스", "#추천서"], iconColor: "bg-blue-500", docType: "워드" },
    { title: "추천서", category: "워드", tags: ["#비즈니스"], iconColor: "bg-blue-500", docType: "워드" },
    { title: "이의신청서", category: "한글", tags: ["#행정", "#신청서"], iconColor: "bg-green-500", docType: "한글" },
    { title: "2026 매출 예산안", category: "엑셀", tags: ["#재무", "#가계부"], iconColor: "bg-emerald-500", docType: "엑셀" },
    { title: "기술개발 연구계획서", category: "논문", tags: ["#연구", "#계획서"], iconColor: "bg-purple-500", docType: "논문" }
  ].map(t => ({ ...t, id: getTemplateId(t.title), type: "doc", aspect: "aspect-[3/4]" }))
];

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  activeTab,
  setActiveTab,
  recentChats,
  isDarkMode,
  setIsDarkMode,
  setIsWorkspaceActive,
  setWorkspaceType,
  setWorkspaceTitle
}: {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  activeTab: "home" | "image" | "credit" | "workspace" | "favorites" | "lp" | "vid" | "deck" | "audio" | "doc" | "skillstore";
  setActiveTab: (val: "home" | "image" | "credit" | "workspace" | "favorites" | "lp" | "vid" | "deck" | "audio" | "doc" | "skillstore") => void;
  recentChats: Array<{ id: string; title: string }>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  setIsWorkspaceActive: (val: boolean) => void;
  setWorkspaceType: (val: "normal" | "cardnews" | "lp" | "detail") => void;
  setWorkspaceTitle: (val: string) => void;
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
              onClick={() => {
                setActiveTab("home");
                setIsWorkspaceActive(false);
              }}
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
        <SidebarItem 
          icon={Store} 
          label="스킬 스토어" 
          active={activeTab === "skillstore"}
          isCollapsed={isCollapsed} 
          isDarkMode={isDarkMode}
          onClick={() => setActiveTab("skillstore")}
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
              <SidebarHistoryItem 
                key={chat.id} 
                title={chat.title} 
                isDarkMode={isDarkMode} 
                onClick={() => {
                  if (chat.title.includes("카드뉴스")) {
                    setWorkspaceType("cardnews");
                  } else if (chat.title.includes("랜딩페이지") || chat.title.includes("딸깍페이지")) {
                    setWorkspaceType("lp");
                  } else if (chat.title.includes("상세페이지") || chat.title.includes("상세 페이지")) {
                    setWorkspaceType("detail");
                  } else {
                    setWorkspaceType("normal");
                  }
                  setWorkspaceTitle(chat.title);
                  setIsWorkspaceActive(true);
                }}
              />
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


const ServiceDashboardView = ({
  type,
  isDarkMode,
  setIsWorkspaceActive,
  setWorkspaceType,
  setWorkspaceTitle,
  favoriteTemplates,
  toggleFavorite,
  setSelectedDetailTemplate
}: {
  type: "lp" | "vid" | "deck" | "audio" | "doc";
  isDarkMode: boolean;
  setIsWorkspaceActive: (val: boolean) => void;
  setWorkspaceType: (val: "normal" | "cardnews" | "lp" | "detail") => void;
  setWorkspaceTitle: (val: string) => void;
  favoriteTemplates: Set<number>;
  toggleFavorite: (id: number) => void;
  setSelectedDetailTemplate: (val: any) => void;
}) => {
  const configs = {
    lp: {
      title: "한 문장이면, ",
      titleAccent: "전환되는 랜딩페이지",
      titleSuffix: "가 완성돼요",
      desc: "서비스 톤과 목적만 알려주세요. 카피라이팅·디자인까지 한 번에 만들어 드려요.",
      placeholder: "예: SaaS 협업 툴 무료 체험 유도, 다크 시네마틱, 블루 액센트, 직각 디자인",
      buttonText: "생성하기",
      defaultSelect: "SaaS",
      selectOptions: ["SaaS", "서비스", "이벤트", "포트폴리오"],
      categories: ["전체", "SaaS", "서비스", "이벤트"],
      templates: [
        { title: "시네마틱 다크 우주 스타일", category: "SaaS", tags: ["#다크", "#시네마틱"], bg: "bg-[#090D1A]", textCol: "text-[#6D8FFF]", accentBg: "bg-blue-500/10", accentText: "text-blue-400" },
        { title: "웜톤 코랄 라운드 스타일", category: "서비스", tags: ["#코랄", "#라운드"], bg: "bg-[#FFF5F3]", textCol: "text-[#EF4444]", accentBg: "bg-red-500/10", accentText: "text-red-400" },
        { title: "럭셔리 다크 블루 스타일", category: "이벤트", tags: ["#럭셔리", "#블루"], bg: "bg-[#0B1528]", textCol: "text-[#4F7BFF]", accentBg: "bg-blue-600/10", accentText: "text-blue-400" },
        { title: "오픈소스 에메랄드 스타일", category: "SaaS", tags: ["#에메랄드", "#블랙"], bg: "bg-[#05140C]", textCol: "text-[#22C55E]", accentBg: "bg-green-500/10", accentText: "text-green-400" },
        { title: "극미니멀 모노크롬 스타일", category: "서비스", tags: ["#모노크롬", "#미니멀"], bg: "bg-[#111111]", textCol: "text-white", accentBg: "bg-white/10", accentText: "text-white" },
        { title: "크림 세리프 아카데믹", category: "이벤트", tags: ["#크림", "#세리프"], bg: "bg-[#FAF6EE]", textCol: "text-[#C084FC]", accentBg: "bg-purple-500/10", accentText: "text-purple-400" }
      ]
    },
    vid: {
      title: "장면 한 줄이면, ",
      titleAccent: "영상이 움직이기",
      titleSuffix: " 시작해요",
      desc: "분위기·길이·자막 톤만 적어 주세요. 쇼츠부터 유튜브까지 바로 만들어 드려요.",
      placeholder: "예: 군고구마를 맛있게 먹는 강아지, 따뜻한 주방, 자막은 노란 굵은 폰트",
      buttonText: "생성하기",
      defaultSelect: "9:16",
      selectOptions: ["9:16", "16:9"],
      categories: ["전체", "영상", "유튜브영상"],
      templates: [
        { title: "까칠한 냥이의 분노", category: "영상", tags: ["#숏폼", "#반려동물"], image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80", coverText: "이게 뭘 보고 있는 거야?" },
        { title: "군고구마 먹는 강아지", category: "영상", tags: ["#숏폼", "#ASMR"], image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80", coverText: "군고구마 먹는 강아지" },
        { title: "조선 궁궐과 빌딩", category: "유튜브영상", tags: ["#시네마틱", "#역사"], image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80", coverText: "궁궐과 현대 빌딩의 조화!" },
        { title: "당근 써는 ASMR", category: "영상", tags: ["#ASMR", "#요리"], image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80", coverText: "당근 썰어볼까요?" }
      ]
    },
    deck: {
      title: "주제 한 줄이면, ",
      titleAccent: "발표 자료",
      titleSuffix: "가 완성돼요",
      desc: "목적과 분량만 알려주세요. 표지부터 마무리까지 슬라이드를 자동 구성해 드려요.",
      placeholder: "예: 2026 금융소비자 트렌드, 7장, 비즈니스 톤, 데이터 차트 포함",
      buttonText: "생성하기",
      defaultSelect: "16:9",
      selectOptions: ["16:9", "4:3", "A4 세로"],
      categories: ["전체", "PPT", "슬라이드"],
      templates: [
        { title: "비즈니스 프레젠테이션", category: "PPT", tags: ["#비즈니스"], subtitle: "2026 금융소비자 트렌드", bg: "from-blue-600 to-indigo-700" },
        { title: "마케팅 포트폴리오", category: "PPT", tags: ["#다크", "#프리미엄"], subtitle: "MARKETING PORTFOLIO", bg: "from-slate-800 to-slate-950" },
        { title: "크리에이티브 포트폴리오", category: "슬라이드", tags: ["#크리에이티브"], subtitle: "COMPANY", bg: "from-red-600 to-red-800" },
        { title: "미니멀 보고서", category: "슬라이드", tags: ["#미니멀"], subtitle: "ROI를 높이는 실행형 전략", bg: "from-[#F3EFE9] to-[#E5DFD4]", darkText: true },
        { title: "제품 브로셔", category: "PPT", tags: ["#글라스모피즘"], subtitle: "Product Brochure", bg: "from-blue-200 to-indigo-300", darkText: true },
        { title: "깔끔한 프레젠테이션", category: "슬라이드", tags: ["#화이트", "#미니멀"], subtitle: "깔끔한 프레젠테이션", bg: "from-[#F8FAFC] to-[#F1F5F9]", darkText: true }
      ]
    },
    audio: {
      title: "분위기 한 줄이면, ",
      titleAccent: "사운드가 흘러나와요",
      titleSuffix: "",
      desc: "장르·길이·용도만 적어 주세요. BGM부터 내레이션까지 바로 만들어 드려요.",
      placeholder: "예: 브랜드 인트로용 30초 BGM, 밝고 경쾌한 신스팝, 로고 사운드 포함",
      buttonText: "생성하기",
      defaultSelect: "30초",
      selectOptions: ["30초", "1분", "3분", "자유"],
      categories: ["전체", "음악", "팟캐스트"],
      templates: [
        { title: "브랜드 BGM 30초", category: "음악", tags: ["#BGM", "#브랜드"], bg: "from-purple-100 to-indigo-150", waveColor: "bg-purple-400" },
        { title: "팟캐스트 인트로", category: "팟캐스트", tags: ["#팟캐스트", "#인트로"], bg: "from-blue-100 to-sky-150", waveColor: "bg-blue-400" },
        { title: "제품 광고 음악", category: "음악", tags: ["#광고", "#비트"], bg: "from-orange-100 to-amber-150", waveColor: "bg-orange-400" },
        { title: "명상 앰비언트", category: "음악", tags: ["#앰비언트", "#힐링"], bg: "from-green-100 to-emerald-150", waveColor: "bg-green-400" },
        { title: "로파이 비트", category: "음악", tags: ["#로파이", "#집중"], bg: "from-slate-100 to-slate-200", waveColor: "bg-slate-400" },
        { title: "TTS 내레이션", category: "팟캐스트", tags: ["#TTS", "#내레이션"], bg: "from-yellow-100 to-amber-150", waveColor: "bg-amber-400" },
        { title: "유튜브 오프닝 징글", category: "음악", tags: ["#징글", "#유튜브"], bg: "from-pink-100 to-rose-150", waveColor: "bg-pink-400" },
        { title: "카페 재즈 루프", category: "음악", tags: ["#재즈", "#매장"], bg: "from-blue-100 to-indigo-150", waveColor: "bg-indigo-400" }
      ]
    },
    doc: {
      title: "양식 한 줄이면, ",
      titleAccent: "문서가 알아서",
      titleSuffix: " 채워져요",
      desc: "용도와 항목만 알려주세요. 워드, 한글, 엑셀 양식을 바로 만들어 드려요.",
      placeholder: "예: 채용추천서, 추천 대상/사유 항목 포함, 비즈니스 격식 톤",
      buttonText: "생성하기",
      defaultSelect: "워드",
      selectOptions: ["워드", "한글", "엑셀", "PDF"],
      categories: ["전체", "워드", "한글", "엑셀", "논문"],
      templates: [
        { title: "채용추천서", category: "워드", tags: ["#비즈니스", "#추천서"], iconColor: "bg-blue-500", docType: "워드" },
        { title: "추천서", category: "워드", tags: ["#비즈니스"], iconColor: "bg-blue-500", docType: "워드" },
        { title: "이의신청서", category: "한글", tags: ["#행정", "#신청서"], iconColor: "bg-green-500", docType: "한글" },
        { title: "2026 매출 예산안", category: "엑셀", tags: ["#재무", "#가계부"], iconColor: "bg-emerald-500", docType: "엑셀" },
        { title: "기술개발 연구계획서", category: "논문", tags: ["#연구", "#계획서"], iconColor: "bg-purple-500", docType: "논문" }
      ]
    }
  };

  const config = configs[type];
  const [localPrompt, setLocalPrompt] = useState("");
  const [selectedCat, setSelectedCat] = useState("전체");
  const [selectedFormat, setSelectedFormat] = useState(config.defaultSelect);
  const [isFormatDropdownOpen, setIsFormatDropdownOpen] = useState(false);
  const [serviceSort, setServiceSort] = useState<"popular" | "recent">("popular");

  const handleStartWork = (titleStr?: string) => {
    setWorkspaceTitle(titleStr || localPrompt || `${config.buttonText} 작업`);
    if (type === "lp") {
      setWorkspaceType("lp");
    } else {
      setWorkspaceType("normal");
    }
    setIsWorkspaceActive(true);
  };

  const handleModalApplyTemplate = (t: any) => {
    setWorkspaceTitle(t.title);
    if (type === "lp") {
      setWorkspaceType("lp");
    } else {
      setWorkspaceType("normal");
    }
    setIsWorkspaceActive(true);
  };

  // Filter templates based on selected category & sort option
  const filteredTemplates = config.templates
    .filter(t => {
      if (selectedCat === "전체") return true;
      return t.category === selectedCat;
    })
    .sort((a, b) => {
      if (serviceSort === "recent") {
        return b.title.localeCompare(a.title);
      } else {
        return a.title.localeCompare(b.title);
      }
    });

  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-[120px] pb-10 px-8 max-w-[1100px] mx-auto w-full">
      {/* Title */}
      <div className="text-center mb-10 max-w-3xl select-none font-sans animate-in fade-in slide-in-from-top-3 duration-500">
        <h1 className={`font-heading font-bold text-[36px] md:text-[38px] leading-tight tracking-tighter ${
          isDarkMode ? "text-[#F8FAFC]" : "text-[#111827]"
        }`}>
          {config.title}<span className="text-[#3B63F6]">{config.titleAccent}</span>{config.titleSuffix}
        </h1>
        <p className={`text-[14.5px] font-medium mt-3.5 leading-relaxed tracking-tight ${
          isDarkMode ? "text-[#94A3B8]" : "text-[#64748B]"
        }`}>
          {config.desc}
        </p>
      </div>

      {/* Composer Card - Matching Screenshot Styles Perfectly */}
      <div className="w-full max-w-full mb-14">
        <div className={`rounded-[24px] flex flex-col transition-all duration-200 border-2 ${
          isDarkMode
            ? "bg-[#171A21] border-[#2A3140] shadow-none focus-within:border-[#3B63F6]"
            : "bg-white border-[#8BB4F6] shadow-[0_8px_32px_rgba(59,99,246,0.08)] focus-within:shadow-[0_8px_32px_rgba(59,99,246,0.12)]"
        }`}>
          <div className="p-6 pb-4 min-h-[120px] flex flex-col relative rounded-t-[22px]">
            <textarea
              value={localPrompt}
              onChange={(e) => setLocalPrompt(e.target.value)}
              placeholder={config.placeholder}
              className={`w-full bg-transparent border-none outline-none resize-none text-[15.5px] font-semibold tracking-tight min-h-[70px] focus:ring-0 ${
                isDarkMode ? "text-[#F8FAFC] placeholder-slate-550" : "text-slate-800 placeholder-slate-400"
              }`}
            />
          </div>

          {/* Bottom Actions Bar */}
          <div className={`px-5 py-3.5 flex items-center border-t rounded-b-[22px] select-none ${
            isDarkMode ? "border-[#2A3140] bg-[#1B1F27]/60" : "border-slate-50 bg-[#FBFDFF]/80"
          }`}>
            {/* 사진 첨부 버튼 */}
            <div className="relative group">
              <button
                onClick={() => alert("파일 첨부 기능")}
                className={`w-9.5 h-9.5 rounded-full flex items-center justify-center border transition-all active:scale-95 cursor-pointer ${
                  isDarkMode
                    ? "bg-transparent border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    : "bg-transparent border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <Paperclip size={15} />
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold tracking-tight whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                이미지 첨부
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[4px] border-x-transparent border-t-[4px] border-t-slate-900 dark:border-t-white" />
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-3 relative">
              {/* Format Dropdown Selector */}
              {type !== "deck" && (
                <div className="relative">
                  <button
                    onClick={() => setIsFormatDropdownOpen(!isFormatDropdownOpen)}
                    className={`px-4 h-9.5 rounded-xl text-[12.5px] font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                      isDarkMode
                        ? "bg-slate-800 border-slate-700 text-slate-350 hover:bg-slate-750"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{selectedFormat}</span>
                    <ChevronDown size={13} className="text-slate-400" />
                  </button>
                  {isFormatDropdownOpen && (
                    <div className={`absolute right-0 bottom-full mb-2 w-[110px] rounded-xl shadow-lg z-50 py-1.5 border ${
                      isDarkMode ? "bg-[#1E232D] border-[#2A3140] text-slate-300" : "bg-white border-slate-200 text-slate-700"
                    }`}>
                      {config.selectOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedFormat(opt);
                            setIsFormatDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-[12px] font-bold hover:bg-blue-50/50 ${
                            isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-50"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 생성하기 버튼 */}
              <button
                onClick={() => handleStartWork()}
                className="flex items-center gap-1.5 px-5 h-9.5 rounded-full text-white text-[13px] font-black transition-all bg-[#3B63F6] hover:bg-blue-700 active:scale-95 shadow-md cursor-pointer"
              >
                <Sparkles size={13} />
                <span>{config.buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="w-full max-w-full mb-8 select-none text-left">
        <h2 className={`text-[16px] font-extrabold tracking-tight mb-4 ${isDarkMode ? "text-[#F8FAFC]" : "text-slate-900"}`}>카테고리</h2>
        <div className="flex justify-between items-center w-full border-b border-slate-100/50 dark:border-slate-800/50 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {config.categories.map((cat) => {
              const isActive = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-4.5 py-1.5 rounded-full text-[13px] font-bold tracking-tight transition-all cursor-pointer ${
                    isActive
                      ? (isDarkMode ? "bg-slate-800 text-white shadow-sm" : "bg-slate-900 text-white shadow-sm")
                      : isDarkMode 
                        ? "bg-[#1E232D] text-slate-400 hover:bg-[#252B36] hover:text-slate-200" 
                        : "bg-[#F1F5F9] text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Notion/Linear style minimalist text toggle filter */}
          <div className="flex items-center gap-1.5 text-[12.5px] shrink-0 select-none">
            <button
              onClick={() => setServiceSort("popular")}
              className={`font-semibold transition-colors cursor-pointer ${
                serviceSort === "popular"
                  ? isDarkMode ? "text-white font-medium text-sm" : "text-slate-900 font-medium text-sm"
                  : isDarkMode ? "text-slate-500 hover:text-slate-350" : "text-slate-400 hover:text-gray-600 text-sm"
              }`}
            >
              인기순
            </button>
            <span className={isDarkMode ? "text-slate-700" : "text-slate-300"}>·</span>
            <button
              onClick={() => setServiceSort("recent")}
              className={`font-semibold transition-colors cursor-pointer ${
                serviceSort === "recent"
                  ? isDarkMode ? "text-white font-medium text-sm" : "text-slate-900 font-medium text-sm"
                  : isDarkMode ? "text-slate-500 hover:text-slate-350" : "text-slate-400 hover:text-gray-600 text-sm"
              }`}
            >
              최신순
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Templates Grid - Matching screenshots exactly! */}
      <div className="w-full max-w-full mb-12 select-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full px-0.5 items-start">
          {filteredTemplates.map((t: any, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedDetailTemplate(t)}
              className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border cursor-pointer ${
                isDarkMode
                  ? "bg-[#1E232D] border-[#2A3140] hover:border-[#3B63F6]"
                  : "bg-white border-[#E5E7EB] hover:shadow-[0_8px_24px_rgba(59,99,246,0.06)]"
              }`}
            >
              
              {/* Type-Specific Graphic Rendering representing screenshot mockups exactly */}
              {type === "doc" ? (
                /* 1. DOCUMENT MOCKUP PREVIEW */
                <div className="relative aspect-[3/4] w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6 select-none overflow-hidden shrink-0">
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20"
                    style={{
                      backgroundColor: 
                        t.category === "워드" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                        t.category === "한글" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                        t.category === "엑셀" ? (isDarkMode ? "rgba(16, 185, 129, 0.15)" : "rgba(209, 250, 229, 0.85)") : 
                        (isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(245, 243, 255, 0.85)"),
                      color: 
                        t.category === "워드" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                        t.category === "한글" ? "#F59E0B" : 
                        t.category === "엑셀" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                        "#8B5CF6"
                    }}
                  >
                    {t.category}
                  </div>
                  {/* Simulated Lined Paper Document */}
                  <div className="w-full h-full bg-white border border-slate-200 rounded-lg p-4 flex flex-col shadow-sm">
                    <div className="text-[7.5px] font-bold text-slate-400 text-center tracking-widest border-b border-slate-200 pb-1 mb-3 shrink-0 flex items-center justify-center gap-1">
                      <span>||</span> {t.title} <span>||</span>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1 mt-1">
                      <div className="h-1 bg-slate-200 rounded w-[85%]" />
                      <div className="h-1 bg-slate-100 rounded w-[95%]" />
                      <div className="h-1 bg-slate-150 rounded w-[90%]" />
                      <div className="h-1 bg-slate-100 rounded w-[60%]" />
                      <div className="h-10 border border-dashed border-slate-200 rounded-lg my-3 w-full" />
                      <div className="h-1 bg-slate-150 rounded w-[80%]" />
                      <div className="h-1 bg-slate-100 rounded w-[45%]" />
                    </div>
                  </div>
                  {/* Overlay button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }}
                      className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
                    >
                      <Plus size={14} className="text-[#3B63F6]" />
                      템플릿 적용하기
                    </button>
                  </div>
                  {/* Favorite button top-right */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(getTemplateId(t.title)); }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 z-20 cursor-pointer ${
                      favoriteTemplates.has(getTemplateId(t.title))
                        ? "bg-amber-400 text-white opacity-100"
                        : "bg-white/90 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400"
                    }`}
                  >
                    <Star size={14} fill={favoriteTemplates.has(getTemplateId(t.title)) ? "currentColor" : "none"} strokeWidth={2} />
                  </button>
                </div>
              ) : type === "vid" ? (
                /* 2. VERTICAL VIDEO PREVIEW with play icon */
                <div className={`relative w-full overflow-hidden shrink-0 select-none bg-slate-100 ${
                  t.category === "유튜브영상" ? "aspect-[16/9]" : "aspect-[9/16]"
                }`}>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20"
                    style={{
                      backgroundColor: t.category === "유튜브영상"
                        ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)")
                        : (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)"),
                      color: t.category === "유튜브영상" ? "#F59E0B" : (isDarkMode ? "#4ADE80" : "#16A34A")
                    }}
                  >
                    {t.category}
                  </div>
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Simulated video play button indicator */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md">
                      <div className="border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white ml-1" />
                    </div>
                  </div>
                  {/* Action hover overlay */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-20">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }}
                      className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
                    >
                      <Plus size={14} className="text-[#3B63F6]" />
                      템플릿 적용하기
                    </button>
                  </div>
                  {/* Favorite button top-right */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(getTemplateId(t.title)); }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 z-20 cursor-pointer ${
                      favoriteTemplates.has(getTemplateId(t.title))
                        ? "bg-amber-400 text-white opacity-100"
                        : "bg-white/90 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400"
                    }`}
                  >
                    <Star size={14} fill={favoriteTemplates.has(getTemplateId(t.title)) ? "currentColor" : "none"} strokeWidth={2} />
                  </button>
                </div>
              ) : type === "lp" ? (
                /* 3. LANDING PAGE PREVIEWS with custom colored screenshot templates */
                <div className={`relative aspect-[16/10] w-full ${t.bg} flex items-center justify-center p-4 border-b border-slate-100 overflow-hidden shrink-0`}>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20"
                    style={{
                      backgroundColor: 
                        t.category === "SaaS" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                        t.category === "서비스" ? (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)") : 
                        t.category === "이벤트" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                        (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)"),
                      color: 
                        t.category === "SaaS" ? "#F59E0B" : 
                        t.category === "서비스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                        t.category === "이벤트" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                        "#22C55E"
                    }}
                  >
                    {t.category}
                  </div>
                  {/* Simulated Landing Page Mockup */}
                  <div className="w-full text-center flex flex-col items-center select-none pt-2">
                    <div className={`text-[13px] font-black tracking-tight ${t.textCol} flex items-center gap-0.5`}>
                      <span className="text-[10px]">♦</span> 딸깍
                    </div>
                    <div className="h-1 bg-white/10 rounded w-[40%] my-2 shrink-0" />
                  </div>
                  {/* Action hover overlay */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-20">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }}
                      className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
                    >
                      <Plus size={14} className="text-[#3B63F6]" />
                      템플릿 적용하기
                    </button>
                  </div>
                  {/* Favorite button top-right */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(getTemplateId(t.title)); }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 z-20 cursor-pointer ${
                      favoriteTemplates.has(getTemplateId(t.title))
                        ? "bg-amber-400 text-white opacity-100"
                        : "bg-white/90 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400"
                    }`}
                  >
                    <Star size={14} fill={favoriteTemplates.has(getTemplateId(t.title)) ? "currentColor" : "none"} strokeWidth={2} />
                  </button>
                </div>
              ) : type === "audio" ? (
                /* 4. AUDIO PREVIEWS with waves and plays */
                <div className="relative aspect-[4/3] w-full bg-slate-50 flex items-center justify-center p-5 border-b border-slate-100 overflow-hidden shrink-0">
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20"
                    style={{
                      backgroundColor: t.category === "음악"
                        ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)")
                        : (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)"),
                      color: t.category === "음악" ? "#F59E0B" : (isDarkMode ? "#4ADE80" : "#16A34A")
                    }}
                  >
                    {t.category}
                  </div>
                  {/* Small absolute play button top-right */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 border border-slate-150">
                    <div className="border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-slate-600 ml-0.5" />
                  </div>
                  {/* Visual Audio Sound waves */}
                  <div className="flex items-end gap-[3px] h-[36px] select-none">
                    {[10, 24, 15, 30, 42, 28, 14, 25, 38, 48, 30, 18, 22, 35, 12, 20, 32].map((h, i) => (
                      <div key={i} className={`w-[3px] rounded-full ${t.waveColor}`} style={{ height: `${h}px` }} />
                    ))}
                  </div>
                  {/* Action hover overlay */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-20">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }}
                      className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
                    >
                      <Plus size={14} className="text-[#3B63F6]" />
                      템플릿 적용하기
                    </button>
                  </div>
                  {/* Favorite button top-right */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(getTemplateId(t.title)); }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 z-20 cursor-pointer ${
                      favoriteTemplates.has(getTemplateId(t.title))
                        ? "bg-amber-400 text-white opacity-100"
                        : "bg-white/90 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400"
                    }`}
                  >
                    <Star size={14} fill={favoriteTemplates.has(getTemplateId(t.title)) ? "currentColor" : "none"} strokeWidth={2} />
                  </button>
                </div>
              ) : (
                /* 5. PRESENTATION/SLIDE PREVIEWS with slide dots */
                <div className={`relative aspect-[16/10] w-full bg-gradient-to-br ${t.bg} flex items-center justify-center p-5 border-b border-slate-100 overflow-hidden shrink-0`}>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20"
                    style={{
                      backgroundColor: t.category === "PPT"
                        ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)")
                        : (isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(245, 243, 255, 0.85)"),
                      color: t.category === "PPT" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : "#8B5CF6"
                    }}
                  >
                    {t.category}
                  </div>
                  {/* simulated slides pagination indicator dots bottom center */}
                  <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1 z-10 select-none">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div key={dot} className={`w-[4px] h-[4px] rounded-full ${dot === 2 ? (t.darkText ? "bg-slate-800" : "bg-white") : (t.darkText ? "bg-slate-300" : "bg-white/40")}`} />
                    ))}
                  </div>
                  {/* Presentation mock contents */}
                  <div className="w-full text-center flex flex-col items-center select-none pt-2 font-sans px-3">
                    <span className={`text-[8px] font-bold tracking-widest ${t.darkText ? "text-slate-400" : "text-white/60"}`}>THINKING INFINITY</span>
                    <h4 className={`text-[12.5px] font-extrabold leading-tight tracking-tight mt-1.5 ${t.darkText ? "text-slate-800" : "text-white"}`}>
                      {t.subtitle}
                    </h4>
                  </div>
                  {/* Action hover overlay */}
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-20">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }}
                      className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer"
                    >
                      <Plus size={14} className="text-[#3B63F6]" />
                      템플릿 적용하기
                    </button>
                  </div>
                  {/* Favorite button top-right */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(getTemplateId(t.title)); }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 z-20 cursor-pointer ${
                      favoriteTemplates.has(getTemplateId(t.title))
                        ? "bg-amber-400 text-white opacity-100"
                        : "bg-white/90 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-400"
                    }`}
                  >
                    <Star size={14} fill={favoriteTemplates.has(getTemplateId(t.title)) ? "currentColor" : "none"} strokeWidth={2} />
                  </button>
                </div>
              )}

              {/* Title & Tags - Standardized Layout styling */}
              <div className="p-4.5 flex flex-col flex-1 text-left">
                <h3 className={`text-[13.5px] font-bold leading-tight tracking-tight mb-2 select-text ${
                  isDarkMode ? "text-[#F8FAFC]" : "text-[#1F2937]"
                }`}>
                  {t.title}
                </h3>
                <div className="flex flex-wrap gap-x-2 mt-auto">
                  {t.tags.map((tag: string) => (
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

      {/* Footer */}
      <footer className="mt-auto text-center w-full select-none">
        <p className="text-[12px] font-medium text-slate-400 tracking-tight">
          딸깍.net - AI 통합 서비스 · © 2026 · 고객센터 <span className="mx-1.5 text-slate-200">|</span> 이용약관 <span className="mx-1.5 text-slate-200">|</span> 개인정보처리방침
        </p>
      </footer>
    </div>
  );
};

const SKILL_ITEMS = [
  {
    id: "brand-design-lp",
    title: "브랜드 디자인 랜딩페이지",
    category: "디자인",
    description: "53개 세계적 브랜드 디자인 시스템 기반 프로덕션급 반응형 HTML 랜딩페이지를 생성합니다.",
    iconType: "pen",
    bgIcon: "#EFF6FF",
    fgIcon: "#3B63F6",
    subtext: "53개 세계적 브랜드 디자인 시스템 기반 프로덕션급 반응형 HTML 랜딩페이지를 생성",
    templates: [
      { id: "lp-cinematic-dark-space", title: "시네마틱 다크 우주", isDark: true, buttonColor: "bg-[#10B981]", buttonText: "시작하기", category: "상세페이지" },
      { id: "lp-warmtone-coral-round", title: "웜톤 코랄 라운드", isDark: false, buttonColor: "bg-[#EF4444]", buttonText: "시작하기", category: "상세페이지" },
      { id: "lp-luxury-dark-blue", title: "럭셔리 다크 블루", isDark: true, buttonColor: "bg-[#3B63F6]", buttonText: "시작하기", category: "상세페이지" },
      { id: "lp-opensource-emerald", title: "오픈소스 에메랄드", isDark: true, buttonColor: "bg-[#10B981]", buttonText: "시작하기", category: "상세페이지" },
      { id: "lp-cookminimal-monochrome", title: "국미니멀 모노크롬", isDark: false, buttonColor: "bg-[#1E293B]", buttonText: "시작하기", category: "상세페이지" },
      { id: "lp-clean-blue-finance", title: "클린 블루 파이낸스", isDark: false, buttonColor: "bg-[#3B63F6]", buttonText: "시작하기", category: "상세페이지" },
    ]
  },
  {
    id: "slide-video",
    title: "슬라이드 영상",
    category: "영상",
    description: "제목만 입력하면 대본·나레이션·애니메이션 슬라이드·자막까지 자동으로 영상을 만들어 드립니다.",
    iconType: "video",
    bgIcon: "#FEF2F2",
    fgIcon: "#EF4444",
    isNew: true,
    subtext: "제목만 입력하면 대본·나레이션·애니메이션 슬라이드·자막까지 자동으로 영상을 만들어",
    templates: [
      { id: "vid-insta-vlog", title: "인스타 감성 브이로그", isDark: true, buttonColor: "bg-[#EF4444]", buttonText: "시작하기", category: "동영상" },
      { id: "vid-biz-promo", title: "비즈니스 프로모션", isDark: false, buttonColor: "bg-[#3B63F6]", buttonText: "시작하기", category: "동영상" },
      { id: "vid-tech-shorts", title: "유튜브 쇼츠 테크", isDark: true, buttonColor: "bg-[#10B981]", buttonText: "시작하기", category: "동영상" },
      { id: "vid-neon-night", title: "네온 나이트 라이프", isDark: true, buttonColor: "bg-[#D946EF]", buttonText: "시작하기", category: "동영상" },
      { id: "vid-home-cook", title: "내추럴 홈 쿡", isDark: false, buttonColor: "bg-[#F59E0B]", buttonText: "시작하기", category: "동영상" },
      { id: "vid-edu-slide", title: "에듀케이션 슬라이드", isDark: false, buttonColor: "bg-[#1E293B]", buttonText: "시작하기", category: "동영상" },
    ]
  },
  {
    id: "academic-paper",
    title: "학술 논문 작성",
    category: "문서",
    description: "서론·본론·결론·참고문헌 구조 작성, LaTeX 컴파일, 기존 논문 감사까지 14개 모든 논문 작성 스킬을 지원합니다.",
    iconType: "beaker",
    bgIcon: "#E8F8F0",
    fgIcon: "#10B981",
    subtext: "서론·본론·결론·참고문헌 구조 작성, LaTeX 컴파일, 기존 논문 감사까지 14개 모든.",
    templates: [
      { id: "doc-sci-journal", title: "SCI 등재 학술지 포맷", isDark: false, buttonColor: "bg-[#3B63F6]", buttonText: "문서 생성", category: "논문" },
      { id: "doc-ieee-style", title: "IEEE 컴퓨터 학회 양식", isDark: false, buttonColor: "bg-[#1E293B]", buttonText: "문서 생성", category: "논문" },
      { id: "doc-science-review", title: "자연과학 리뷰 페이퍼", isDark: false, buttonColor: "bg-[#10B981]", buttonText: "문서 생성", category: "논문" },
      { id: "doc-humanity-essay", title: "인문사회학 에세이", isDark: false, buttonColor: "bg-[#F59E0B]", buttonText: "문서 생성", category: "논문" },
      { id: "doc-grad-thesis", title: "대학원 학위 논문 기본형", isDark: false, buttonColor: "bg-[#8B5CF6]", buttonText: "문서 생성", category: "논문" },
      { id: "doc-short-report", title: "연구 과제 요약 보고서", isDark: false, buttonColor: "bg-[#EF4444]", buttonText: "문서 생성", category: "논문" },
    ]
  },
  {
    id: "cardnews-templates",
    title: "카드뉴스 템플릿",
    category: "디자인",
    description: "15가지 디자인 템플릿에서 선택해 카드뉴스를 자동 생성합니다. 주제만 입력하면 끝.",
    iconType: "grid",
    bgIcon: "#EFF6FF",
    fgIcon: "#3B82F6",
    subtext: "15가지 디자인 템플릿에서 선택해 카드뉴스를 자동 생성합니다. 주제만 입력하면 끝.",
    templates: [
      { id: "cn-pastel-info", title: "파스텔 정보형 6장", isDark: false, buttonColor: "bg-[#3B63F6]", buttonText: "편집하기", category: "카드뉴스" },
      { id: "cn-infographic-summary", title: "인포그래픽 요약형 5장", isDark: false, buttonColor: "bg-[#10B981]", buttonText: "편집하기", category: "카드뉴스" },
      { id: "cn-dark-tech-news", title: "다크 테크 뉴스룸 8장", isDark: true, buttonColor: "bg-[#1E293B]", buttonText: "편집하기", category: "카드뉴스" },
      { id: "cn-retro-pop", title: "레트로 팝 프로모션 4장", isDark: true, buttonColor: "bg-[#EF4444]", buttonText: "편집하기", category: "카드뉴스" },
      { id: "cn-minimal-interview", title: "미니멀리즘 인터뷰 6장", isDark: false, buttonColor: "bg-[#8B5CF6]", buttonText: "편집하기", category: "카드뉴스" },
      { id: "cn-modern-brand-story", title: "모던 브랜드 스토리 7장", isDark: false, buttonColor: "bg-[#F59E0B]", buttonText: "편집하기", category: "카드뉴스" },
    ]
  },
  {
    id: "ceo-review",
    title: "CEO 리뷰",
    category: "분석",
    description: "CEO·창업자 시각에서 사업계획서·피치덱·전략 문서를 분석합니다. 10-Star 프레임워크를 기반으로 핵심 포인트를 도출합니다.",
    iconType: "check",
    bgIcon: "#FEF3C7",
    fgIcon: "#D97706",
    subtext: "CEO·창업자 시각에서 사업계획서·피치덱·전략 문서를 분석합니다. 10-Star 프레임워.",
    templates: [
      { id: "ana-pitch-deck", title: "피치덱 투자 유치 10-Star", isDark: true, buttonColor: "bg-[#D97706]", buttonText: "분석 실행", category: "PPT" },
      { id: "ana-lean-startup", title: "린 스타트업 캔버스 1P", isDark: false, buttonColor: "bg-[#3B63F6]", buttonText: "분석 실행", category: "PPT" },
      { id: "ana-competitor-matrix", title: "경쟁사 비교 시각 분석", isDark: false, buttonColor: "bg-[#10B981]", buttonText: "분석 실행", category: "PPT" },
      { id: "ana-kpi-dashboard", title: "분기 핵심 KPI 대시보드", isDark: true, buttonColor: "bg-[#1E293B]", buttonText: "분석 실행", category: "PPT" },
      { id: "ana-swot-marketing", title: "SWOT 마케팅 전략 프레임", isDark: false, buttonColor: "bg-[#EF4444]", buttonText: "분석 실행", category: "PPT" },
      { id: "ana-global-expansion", title: "글로벌 진출 시장 타당성", isDark: true, buttonColor: "bg-[#8B5CF6]", buttonText: "분석 실행", category: "PPT" },
    ]
  }
];

const cosmeticSlides = [
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80"
];

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

  const [activeTab, setActiveTab] = useState<"home" | "image" | "credit" | "workspace" | "favorites" | "lp" | "vid" | "deck" | "audio" | "doc" | "skillstore">("home");
  const [activeSkillStoreTab, setActiveSkillStoreTab] = useState<"my-skills" | "community">("community");
  const [skillStoreCategory, setSkillStoreCategory] = useState("전체");
  const [skillStoreSort, setSkillStoreSort] = useState<"popular" | "recent">("popular");
  const [mainSort, setMainSort] = useState<"popular" | "recent">("popular");
  const [skillStoreSearch, setSkillStoreSearch] = useState("");
  const [installedSkills, setInstalledSkills] = useState<Set<string>>(new Set(["bg-remover", "upscaler", "translator"]));
  const [selectedTemplate, setSelectedTemplate] = useState<{ title: string; image: string; category?: string } | null>(null);
  const [selectedDetailTemplate, setSelectedDetailTemplate] = useState<any | null>(null);
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
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // --- DRAG SELECTION FOR AI IMAGE WORKSPACE ---
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [isDragSelected, setIsDragSelected] = useState(false);
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const handleSelectionMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelectionModeActive || isDragSelected || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragStart({ x, y });
    setIsSelecting(true);
    setSelectionBox({ x, y, width: 0, height: 0 });
  };

  const handleSelectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting || !dragStart || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    const left = Math.min(dragStart.x, x);
    const top = Math.min(dragStart.y, y);
    const width = Math.abs(dragStart.x - x);
    const height = Math.abs(dragStart.y - y);
    setSelectionBox({ x: left, y: top, width, height });
  };

  const handleSelectionMouseUp = () => {
    if (!isSelecting) return;
    setIsSelecting(false);
    setDragStart(null);
    if (selectionBox && selectionBox.width > 10 && selectionBox.height > 10) {
      setIsDragSelected(true);
      setTimeout(() => {
        document.getElementById("chat-input-field")?.focus();
      }, 50);
    } else {
      setSelectionBox(null);
      setIsDragSelected(false);
    }
  };

  // --- CANVA INLINE EDITOR STATES ---
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isInpainting, setIsInpainting] = useState(true);
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
  const [selectedRechargeIndex, setSelectedRechargeIndex] = useState(0);
  const [selectedPaymentPkg, setSelectedPaymentPkg] = useState<{ amount: number; price: string } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "kakao" | "toss" | "payco">("card");
  const [selectedCardCompany, setSelectedCardCompany] = useState("");
  const [isPaymentAgreementChecked, setIsPaymentAgreementChecked] = useState(true);
  // Workspace-specific state declarations for split chat/editor screen
  const [isWorkspaceActive, setIsWorkspaceActive] = useState(false);
  const [workspaceType, setWorkspaceType] = useState<"normal" | "cardnews" | "lp" | "detail">("normal");
  const [detailActiveView, setDetailActiveView] = useState<"page" | "all">("page");
  const [detailCurrentPage, setDetailCurrentPage] = useState<number>(1);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [selectedSkillItem, setSelectedSkillItem] = useState("brand-design-lp");
  const [skillSearchQuery, setSkillSearchQuery] = useState("");
  const [skillSubFilter, setSkillSubFilter] = useState("전체");
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
    { id: "hist-3", title: "차세대 카드뉴스" },
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
    
    if (selectedTemplate) {
      if (selectedTemplate.category === "카드뉴스") {
        setWorkspaceType("cardnews");
      } else if (selectedTemplate.category === "랜딩페이지") {
        setWorkspaceType("lp");
      } else if (selectedTemplate.category === "상세페이지") {
        setWorkspaceType("detail");
      } else {
        setWorkspaceType("normal");
      }
    } else {
      if (selectedCategory === "카드뉴스") {
        setWorkspaceType("cardnews");
      } else if (selectedCategory === "랜딩페이지") {
        setWorkspaceType("lp");
      } else if (selectedCategory === "상세페이지") {
        setWorkspaceType("detail");
      } else {
        setWorkspaceType("normal");
      }
    }
    
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

    // Keep Right Pane preloaded with the applied template image if present
    setIsLoadingImage(false);
    setGeneratedImageUrl(selectedTemplate ? selectedTemplate.image : null);
  };

  const handleApplyTemplate = (t: { title: string; image: string; category?: string; aspect?: string }) => {
    setSelectedTemplate({ title: t.title, image: t.image, category: t.category });
    
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

  const getPromptForTemplate = (t: any) => {
    if (!t) return "";
    if (t.category === "AI 이미지" || t.category === "카드뉴스" || t.category === "웹툰" || t.category === "상세페이지") {
      return `Norwegian fjord at blue hour, mirror-still water reflecting snow-capped peaks, single red wooden cabin with glowing windows, absolute serenity, matching theme: ${t.title}`;
    }
    if (t.category === "SaaS" || t.category === "서비스" || t.category === "이벤트") {
      return `Premium SaaS marketing landing page design layout for ${t.title}. High conversion, sleek cards, glowing borders, modern tech illustration, call to action buttons, glassmorphic UI elements.`;
    }
    if (t.category === "영상" || t.category === "유튜브영상") {
      return `Cinematic high-definition tracking shot, realistic animation, warm volumetric lighting, soft ambient sound cue. Scene: ${t.title}.`;
    }
    if (t.category === "PPT" || t.category === "슬라이드") {
      return `Modern slides presentation layout for theme: ${t.title}. Dynamic data infographics, corporate slide templates, consistent serif typography.`;
    }
    if (t.category === "음악" || t.category === "팟캐스트") {
      return `High fidelity ambient intro tune for ${t.title}. Gentle piano swells, emotional build-up, clean modern synth layers.`;
    }
    return `Professional business layout template for ${t.title}. Standard typography, clear headings, fields for signature and official seal.`;
  };

  const handleModalApplyTemplate = (t: any) => {
    setSelectedDetailTemplate(null);
    if (t.category === "AI 이미지" || t.category === "카드뉴스" || t.category === "웹툰" || t.category === "상세페이지") {
      handleApplyTemplate(t);
    } else {
      setWorkspaceTitle(t.title);
      setIsWorkspaceActive(true);
    }
  };

  const sortedTemplates = [...TEMPLATES].sort((a, b) => {
    if (mainSort === "recent") {
      return b.id - a.id;
    } else {
      return a.id - b.id;
    }
  });

  const filteredTemplates = sortedTemplates.filter((t) => {
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
        setIsWorkspaceActive={setIsWorkspaceActive}
        setWorkspaceType={setWorkspaceType}
        setWorkspaceTitle={setWorkspaceTitle}
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
                            n.isRead ? "bg-white hover:bg-[#F8FAFC]" : "bg-blue-50/30 hover:bg-blue-50/55"
                          }`}
                        >
                          {/* 왼쪽 아이콘 영역 */}
                          <div className="shrink-0 relative">
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
                            {!n.isRead && (
                              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#3B63F6] rounded-full border-2 border-white translate-x-[10%] -translate-y-[10%]" />
                            )}
                          </div>

                          {/* 텍스트 내용 영역 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[13px] tracking-tight ${n.isRead ? "text-gray-400 font-normal" : "text-slate-900 font-semibold"}`}>
                                {n.title}
                              </span>
                              <span className="text-[11px] font-medium text-slate-400 shrink-0">
                                {n.time}
                              </span>
                            </div>
                            <p className={`text-[12px] mt-1 leading-relaxed tracking-tight break-all ${
                              n.isRead ? "text-gray-400 font-normal" : "text-slate-500 font-medium"
                            }`}>
                              {n.desc}
                            </p>
                          </div>
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
                  {(() => {
                    const favItems = ALL_TEMPLATES.filter(t => favoriteTemplates.has(t.id));
                    const uniqueCats = Array.from(new Set(favItems.map(t => t.category)));
                    return ["전체", ...uniqueCats].map(cat => (
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
                    ));
                  })()}
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
              /* Favorites Grid — supports all template types */
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                {(() => {
                  const favItems = ALL_TEMPLATES.filter(t =>
                    favoriteTemplates.has(t.id) &&
                    (favoritesFilter === "전체" || t.category === favoritesFilter)
                  );
                  // Distribute into 4 columns
                  const cols: any[][] = [[], [], [], []];
                  favItems.forEach((t, i) => cols[i % 4].push(t));
                  return cols.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-6">
                      {col.map(t => {
                        const bgStyle = {
                          backgroundColor: 
                            t.category === "AI 이미지" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                            t.category === "카드뉴스" ? (isDarkMode ? "rgba(34, 197, 94, 0.15)" : "rgba(240, 253, 244, 0.85)") : 
                            t.category === "웹툰" ? (isDarkMode ? "rgba(139, 92, 246, 0.15)" : "rgba(245, 243, 255, 0.85)") : 
                            t.category === "상세페이지" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                            t.category === "워드" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                            t.category === "한글" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                            t.category === "엑셀" ? (isDarkMode ? "rgba(16, 185, 129, 0.15)" : "rgba(209, 250, 229, 0.85)") : 
                            t.category === "음악" ? (isDarkMode ? "rgba(245, 158, 11, 0.15)" : "rgba(255, 247, 237, 0.85)") : 
                            t.category === "PPT" ? (isDarkMode ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 246, 255, 0.85)") : 
                            (isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.85)"),
                          color: 
                            t.category === "AI 이미지" ? "#F59E0B" : 
                            t.category === "카드뉴스" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                            t.category === "웹툰" ? (isDarkMode ? "#A78BFA" : "#7C3AED") : 
                            t.category === "상세페이지" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                            t.category === "워드" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                            t.category === "한글" ? "#F59E0B" : 
                            t.category === "엑셀" ? (isDarkMode ? "#4ADE80" : "#16A34A") : 
                            t.category === "음악" ? "#F59E0B" : 
                            t.category === "PPT" ? (isDarkMode ? "#60A5FA" : "#3B63F6") : 
                            (isDarkMode ? "#94A3B8" : "#64748B")
                        };

                        return (
                          <div
                            key={t.id}
                            onClick={() => setSelectedDetailTemplate(t)}
                            className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border cursor-pointer ${
                              isDarkMode
                                ? "bg-[#1E232D] border-[#2A3140] shadow-none hover:shadow-none hover:border-[#6D8FFF]"
                                : "bg-white border-[#E5E7EB] shadow-none hover:bg-[#F1F5F9] transition-colors"
                            }`}
                          >
                            {/* Graphic Rendering */}
                            {t.type === "doc" ? (
                              <div className="relative aspect-[3/4] w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6 select-none overflow-hidden shrink-0">
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20" style={bgStyle}>
                                  {t.category}
                                </div>
                                <div className="w-full h-full bg-white border border-slate-200 rounded-lg p-4 flex flex-col shadow-sm">
                                  <div className="text-[7.5px] font-bold text-slate-400 text-center tracking-widest border-b border-slate-200 pb-1 mb-3 shrink-0 flex items-center justify-center gap-1">
                                    <span>||</span> {t.title} <span>||</span>
                                  </div>
                                  <div className="flex flex-col gap-1.5 flex-1 mt-1">
                                    <div className="h-1 bg-slate-200 rounded w-[85%]" />
                                    <div className="h-1 bg-slate-100 rounded w-[95%]" />
                                    <div className="h-1 bg-slate-150 rounded w-[90%]" />
                                    <div className="h-1 bg-slate-100 rounded w-[60%]" />
                                    <div className="h-10 border border-dashed border-slate-200 rounded-lg my-3 w-full" />
                                    <div className="h-1 bg-slate-150 rounded w-[80%]" />
                                    <div className="h-1 bg-slate-100 rounded w-[45%]" />
                                  </div>
                                </div>
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                                  <button onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }} className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer">
                                    <Plus size={14} className="text-[#3B63F6]" />
                                    템플릿 적용하기
                                  </button>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md z-20 cursor-pointer">
                                  <Star size={14} fill="currentColor" strokeWidth={2} />
                                </button>
                              </div>
                            ) : t.type === "vid" ? (
                              <div className={`relative w-full overflow-hidden shrink-0 select-none bg-slate-100 ${t.category === "유튜브영상" ? "aspect-[16/9]" : "aspect-[9/16]"}`}>
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20" style={bgStyle}>
                                  {t.category}
                                </div>
                                <img src={t.image} alt={t.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md">
                                    <div className="border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-white ml-1" />
                                  </div>
                                </div>
                                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-20">
                                  <button onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }} className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer">
                                    <Plus size={14} className="text-[#3B63F6]" />
                                    템플릿 적용하기
                                  </button>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md z-20 cursor-pointer">
                                  <Star size={14} fill="currentColor" strokeWidth={2} />
                                </button>
                              </div>
                            ) : t.type === "lp" ? (
                              <div className={`relative aspect-[16/10] w-full ${t.bg} flex items-center justify-center p-4 border-b border-slate-100 overflow-hidden shrink-0`}>
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20" style={bgStyle}>
                                  {t.category}
                                </div>
                                <div className="w-full text-center flex flex-col items-center select-none pt-2 font-sans">
                                  <div className={`text-[13px] font-black tracking-tight ${t.textCol} flex items-center justify-center gap-0.5`}>
                                    <span className="text-[10px]">♦</span> 딸깍
                                  </div>
                                  <div className="h-1 bg-white/10 rounded w-[40%] mx-auto my-2 shrink-0" />
                                </div>
                                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-20">
                                  <button onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }} className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer">
                                    <Plus size={14} className="text-[#3B63F6]" />
                                    템플릿 적용하기
                                  </button>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md z-20 cursor-pointer">
                                  <Star size={14} fill="currentColor" strokeWidth={2} />
                                </button>
                              </div>
                            ) : t.type === "audio" ? (
                              <div className="relative aspect-[4/3] w-full bg-slate-50 flex items-center justify-center p-5 border-b border-slate-100 overflow-hidden shrink-0">
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20" style={bgStyle}>
                                  {t.category}
                                </div>
                                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-500 border border-slate-150">
                                  <div className="border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-slate-600 ml-0.5" />
                                </div>
                                <div className="flex items-end gap-[3px] h-[36px] select-none">
                                  {[10, 24, 15, 30, 42, 28, 14, 25, 38, 48, 30, 18, 22, 35, 12, 20, 32].map((h, i) => (
                                    <div key={i} className={`w-[3px] rounded-full ${t.waveColor}`} style={{ height: `${h}px` }} />
                                  ))}
                                </div>
                                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-20">
                                  <button onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }} className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer">
                                    <Plus size={14} className="text-[#3B63F6]" />
                                    템플릿 적용하기
                                  </button>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md z-20 cursor-pointer">
                                  <Star size={14} fill="currentColor" strokeWidth={2} />
                                </button>
                              </div>
                            ) : t.type === "deck" ? (
                              <div className={`relative aspect-[16/10] w-full bg-gradient-to-br ${t.bg} flex items-center justify-center p-5 border-b border-slate-100 overflow-hidden shrink-0`}>
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20" style={bgStyle}>
                                  {t.category}
                                </div>
                                <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1 z-10 select-none">
                                  {[1, 2, 3, 4, 5].map((dot) => (
                                    <div key={dot} className={`w-[4px] h-[4px] rounded-full ${dot === 2 ? (t.darkText ? "bg-slate-800" : "bg-white") : (t.darkText ? "bg-slate-300" : "bg-white/40")}`} />
                                  ))}
                                </div>
                                <div className="w-full text-center flex flex-col items-center select-none pt-2 font-sans px-3">
                                  <span className={`text-[8px] font-bold tracking-widest ${t.darkText ? "text-slate-400" : "text-white/60"}`}>THINKING INFINITY</span>
                                  <h4 className={`text-[12.5px] font-extrabold leading-tight tracking-tight mt-1.5 ${t.darkText ? "text-slate-800" : "text-white"}`}>
                                    {t.subtitle}
                                  </h4>
                                </div>
                                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4 z-20">
                                  <button onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }} className="bg-white hover:bg-slate-50 text-slate-800 text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200 cursor-pointer">
                                    <Plus size={14} className="text-[#3B63F6]" />
                                    템플릿 적용하기
                                  </button>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md z-20 cursor-pointer">
                                  <Star size={14} fill="currentColor" strokeWidth={2} />
                                </button>
                              </div>
                            ) : (
                              /* Default: image type rendering */
                              <div className={`relative ${t.aspect} w-full overflow-hidden shrink-0 ${isDarkMode ? "bg-slate-800" : "bg-slate-50"}`}>
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-tight select-none z-10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-white/20" style={bgStyle}>
                                  {t.category}
                                </div>
                                <img src={t.image} alt={t.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                                  <button onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }} className={`text-[12px] font-bold py-2 px-4.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all transform translate-y-2 group-hover:translate-y-0 duration-200 cursor-pointer ${isDarkMode ? "bg-[#1E232D] hover:bg-[#252B36] text-[#F8FAFC]" : "bg-white hover:bg-slate-50 text-[#1F2937]"}`}>
                                    <Plus size={14} className={isDarkMode ? "text-[#6D8FFF]" : "text-[#4F7BFF]"} />
                                    템플릿 적용하기
                                  </button>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md z-20 cursor-pointer">
                                  <Star size={14} fill="currentColor" strokeWidth={2} />
                                </button>
                              </div>
                            )}

                            {/* Card content */}
                            <div className="p-4 flex flex-col flex-1 text-left">
                              <h3 className={`text-[13.5px] font-bold leading-tight tracking-tight mb-2 ${
                                isDarkMode ? "text-[#F8FAFC]" : "text-[#1F2937]"
                              }`}>{t.title}</h3>
                              <div className="flex flex-wrap gap-x-2 mt-auto">
                                {t.tags.map((tag: string) => (
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
        ) : activeTab === "skillstore" ? (
          /* ==========================================
             SKILL STORE VIEW
             ========================================== */
          <div className="flex-1 flex flex-col pt-[92px] pb-10 px-8 max-w-[980px] mx-auto w-full select-none animate-in fade-in duration-200">
            {/* Header Hero Area */}
            <div className="flex flex-col items-center text-center mb-10 select-none">
              {/* Graphic containing 3 overlapping circles */}
              <div className="flex items-center justify-center relative w-40 h-20 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-lg flex items-center justify-center text-white absolute left-4 z-10">
                  <Sparkles size={22} />
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 shadow-xl flex items-center justify-center text-white absolute z-20">
                  <Bot size={26} />
                </div>
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 shadow-lg flex items-center justify-center text-white absolute right-4 z-10">
                  <LayoutGrid size={22} />
                </div>
              </div>
              
              <h1 className="text-[32px] font-extrabold tracking-tight leading-tight select-text mb-3.5 text-slate-850 dark:text-white" style={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}>
                스킬을 설치해 딸깍을 진화시키세요
              </h1>
              <p className="text-[14.5px] font-medium leading-relaxed max-w-xl text-slate-450">
                필요한 기능(스킬)을 클릭 한 번으로 설치해 내 워크스페이스에 통합하세요.
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-transparent pb-5 mb-6">
              {/* Left Tab Buttons (내 스킬 | 커뮤니티) */}
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl self-start">
                <button
                  onClick={() => setActiveSkillStoreTab("my-skills")}
                  className={`px-4.5 py-1.5 rounded-lg text-[12.5px] font-bold tracking-tight transition-all cursor-pointer ${
                    activeSkillStoreTab === "my-skills"
                      ? isDarkMode ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-800 shadow-sm"
                      : "text-slate-450 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  내 스킬
                </button>
                <button
                  onClick={() => setActiveSkillStoreTab("community")}
                  className={`px-4.5 py-1.5 rounded-lg text-[12.5px] font-bold tracking-tight transition-all cursor-pointer ${
                    activeSkillStoreTab === "community"
                      ? isDarkMode ? "bg-slate-700 text-white shadow-sm" : "bg-white text-slate-800 shadow-sm"
                      : "text-slate-450 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  커뮤니티
                </button>
              </div>

              {/* Right Search and Action Buttons */}
              <div className="flex items-center gap-2.5">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search size={14} />
                  </div>
                  <input
                    type="text"
                    placeholder="스킬 검색..."
                    value={skillStoreSearch}
                    onChange={(e) => setSkillStoreSearch(e.target.value)}
                    className={`h-9.5 w-52 rounded-xl text-[12.5px] pl-9.5 pr-4 border font-bold outline-none shadow-sm focus:border-blue-500 transition-all ${
                      isDarkMode 
                        ? "bg-[#1E232D] border-[#2A3140] text-white" 
                        : "bg-white border-slate-200 text-slate-800"
                    }`}
                  />
                </div>

                <button className={`h-9.5 px-4 rounded-xl text-[12.5px] font-bold border transition-all active:scale-95 cursor-pointer shadow-sm ${
                  isDarkMode 
                    ? "border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800" 
                    : "border-slate-200 text-slate-650 bg-white hover:bg-slate-50"
                }`}>
                  가져오기
                </button>

                <button className="h-9.5 px-4 rounded-xl text-[12.5px] font-bold text-white bg-[#3B63F6] hover:bg-blue-600 active:scale-95 cursor-pointer shadow-sm">
                  + 스킬 만들기
                </button>
              </div>
            </div>

            {/* Category Chips with sorting filter */}
            <div className="flex justify-between items-center w-full mb-8 border-b border-slate-100/50 dark:border-slate-800/50 pb-3">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {["전체", "AI 이미지", "카드뉴스", "동영상", "문서", "분석"].map((cat) => {
                  const isActive = skillStoreCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSkillStoreCategory(cat)}
                      className={`px-4.5 py-1.5 rounded-full text-[13px] font-semibold tracking-tight transition-all cursor-pointer ${
                        isActive
                          ? "bg-slate-900 text-white shadow-sm"
                          : isDarkMode
                            ? "bg-[#1E232D] text-slate-400 hover:bg-[#252B36] hover:text-slate-250"
                            : "bg-[#F1F5F9] text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Notion/Linear style minimalist text toggle filter */}
              <div className="flex items-center gap-1.5 text-[12.5px] shrink-0 select-none">
                <button
                  onClick={() => setSkillStoreSort("popular")}
                  className={`font-semibold transition-colors cursor-pointer ${
                    skillStoreSort === "popular"
                      ? isDarkMode ? "text-white" : "text-slate-900"
                      : isDarkMode ? "text-slate-500 hover:text-slate-350" : "text-slate-400 hover:text-gray-600"
                  }`}
                >
                  인기순
                </button>
                <span className={isDarkMode ? "text-slate-700" : "text-slate-300"}>·</span>
                <button
                  onClick={() => setSkillStoreSort("recent")}
                  className={`font-semibold transition-colors cursor-pointer ${
                    skillStoreSort === "recent"
                      ? isDarkMode ? "text-white" : "text-slate-900"
                      : isDarkMode ? "text-slate-500 hover:text-slate-350" : "text-slate-400 hover:text-gray-600"
                  }`}
                >
                  최신순
                </button>
              </div>
            </div>

            {/* Skill Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-2">
              {(() => {
                const MOCK_STORE_SKILLS = [
                  { id: "bg-remover", title: "배경 제거 Pro", developer: "딸깍 공식", category: "AI 이미지", desc: "고해상도 이미지 속 피사체를 완벽하게 감지하고 배경을 정밀 제거합니다.", installs: "14.2k", rating: 4.8, bgIcon: "#EFF6FF", fgIcon: "#3B63F6", icon: Layers },
                  { id: "upscaler", title: "고해상도 업스케일러", developer: "딸깍 공식", category: "AI 이미지", desc: "저화질 이미지를 화질 저하 없이 깨끗하게 고해상도로 4배 확대합니다.", installs: "8.5k", rating: 4.9, bgIcon: "#FEF3C7", fgIcon: "#D97706", icon: Sparkles },
                  { id: "face-restore", title: "얼굴 복원 마스터", developer: "FaceLabs", category: "AI 이미지", desc: "손상되거나 흐릿한 인물의 이목구비를 자연스럽게 고화질로 디지털 복원합니다.", installs: "3.1k", rating: 4.7, bgIcon: "#E8F8F0", fgIcon: "#10B981", icon: Bot },
                  { id: "translator", title: "AI 번역 & 맞춤법 교정", developer: "딸깍 공식", category: "문서", desc: "다국어 텍스트 번역과 오타, 띄어쓰기, 맞춤법 교정을 한 번에 정확하게 처리합니다.", installs: "12.0k", rating: 4.9, bgIcon: "#EFF6FF", fgIcon: "#3B82F6", icon: FileText },
                  { id: "cardnews-layout", title: "자동 카드뉴스 배치", developer: "LayoutAI", category: "카드뉴스", desc: "텍스트 문장 길이를 감안하여 카드의 타이틀과 문단을 자동으로 보기 좋게 레이아웃합니다.", installs: "4.8k", rating: 4.6, bgIcon: "#FEF2F2", fgIcon: "#EF4444", icon: LayoutGrid },
                  { id: "seo-landing", title: "SEO 반응형 랜딩페이지", developer: "WebFlow", category: "분석", desc: "검색 최적화 태그(SEO)가 내장된 반응형 웹 랜딩페이지 시각 코드를 생성합니다.", installs: "2.5k", rating: 4.5, bgIcon: "#FAF5FF", fgIcon: "#D946EF", icon: Globe },
                  { id: "caption-generator", title: "숏폼 자동 자막 생성기", developer: "딸깍 공식", category: "동영상", desc: "동영상의 음성을 정확하게 받아쓰기하여 매력적인 글꼴과 애니메이션 숏폼 자막을 입힙니다.", installs: "6.2k", rating: 4.8, bgIcon: "#EFF6FF", fgIcon: "#3B63F6", icon: Video },
                  { id: "biz-matrix", title: "10-Star CEO 사업 분석기", developer: "BizWizard", category: "분석", desc: "사업 계획 및 피치덱 데이터를 기반으로 기업 경영 핵심 전략 매트릭스를 즉각 도출합니다.", installs: "1.9k", rating: 4.7, bgIcon: "#FEF3C7", fgIcon: "#D97706", icon: ListChecks }
                ];

                const filtered = MOCK_STORE_SKILLS.filter((s) => {
                  const matchesTab = activeSkillStoreTab === "community" || installedSkills.has(s.id);
                  const matchesCategory = skillStoreCategory === "전체" || s.category === skillStoreCategory;
                  const matchesSearch = s.title.toLowerCase().includes(skillStoreSearch.toLowerCase()) || 
                                        s.desc.toLowerCase().includes(skillStoreSearch.toLowerCase());
                  return matchesTab && matchesCategory && matchesSearch;
                });

                const getInstallsVal = (installsStr: string) => {
                  return parseFloat(installsStr.replace("k", "")) * 1000;
                };

                const sorted = [...filtered].sort((a, b) => {
                  if (skillStoreSort === "popular") {
                    return getInstallsVal(b.installs) - getInstallsVal(a.installs);
                  } else {
                    const list = ["seo-landing", "biz-matrix", "face-restore", "cardnews-layout", "caption-generator", "upscaler", "bg-remover", "translator"];
                    return list.indexOf(a.id) - list.indexOf(b.id);
                  }
                });

                if (sorted.length === 0) {
                  return (
                    <div className="col-span-full py-16 text-center text-slate-400 select-none">
                      <span className="text-[13.5px] font-bold">표시할 스킬이 없습니다.</span>
                    </div>
                  );
                }

                return sorted.map((skill) => {
                  const isInstalled = installedSkills.has(skill.id);
                  const SkillIcon = skill.icon;

                  return (
                    <div
                      key={skill.id}
                      className="border border-transparent rounded-[24px] bg-white dark:bg-[#1E232D] p-5.5 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] flex flex-col justify-between group"
                    >
                      <div>
                        {/* Card Upper Row */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3.5">
                            {/* Icon Box */}
                            <div 
                              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                              style={{ backgroundColor: skill.bgIcon, color: skill.fgIcon }}
                            >
                              <SkillIcon size={18} strokeWidth={2.2} />
                            </div>
                            {/* Title & Developer */}
                            <div className="flex flex-col text-left">
                              <h3 className="text-[14.5px] font-bold text-slate-800 dark:text-slate-100 tracking-tight leading-none">
                                {skill.title}
                              </h3>
                              <span className="text-[10.5px] font-semibold text-slate-400 mt-1.5 leading-none">
                                {skill.developer} • {skill.category}
                              </span>
                            </div>
                          </div>

                          {/* Stats Info */}
                          <div className="flex flex-col items-end text-right text-[10.5px] font-semibold text-slate-400 leading-none gap-1.5">
                            <span>설치 {skill.installs}</span>
                            <span className="text-amber-500">★ {skill.rating}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[12px] font-normal text-slate-500 dark:text-slate-400 mt-4 leading-relaxed text-left min-h-[40px]">
                          {skill.desc}
                        </p>
                      </div>

                      {/* Card Lower Actions */}
                      <div className="flex items-center justify-between border-t border-slate-50 dark:border-white/5 pt-4 mt-4 select-none">
                        <span className="text-[10.5px] font-bold text-[#3B63F6] dark:text-[#6D8FFF] cursor-pointer hover:underline">상세보기</span>
                        
                        {isInstalled ? (
                          <div className="h-8 px-4 bg-slate-100 dark:bg-slate-850 rounded-xl text-[11.5px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <Check size={12} strokeWidth={3} className="text-slate-500" />
                            <span>설치됨</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              const newInstalled = new Set(installedSkills);
                              newInstalled.add(skill.id);
                              setInstalledSkills(newInstalled);
                            }}
                            className="h-8 px-4 bg-transparent border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-[11.5px] font-bold text-slate-700 dark:text-slate-300 transition-all active:scale-95 cursor-pointer"
                          >
                            + 설치
                          </button>
                        )}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
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
                      onClick={() => setIsSkillModalOpen(true)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-95 transition-all shadow-sm cursor-pointer ${
                        isDarkMode
                          ? "bg-slate-800/80 border border-slate-700 text-[#6D8FFF] hover:bg-slate-750"
                          : "bg-[#EFF6FF] border border-blue-100 text-[#4F7BFF] hover:bg-blue-100 hover:text-blue-700"
                      }`}
                      title="스킬로 시작하기"
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
                      } else if (s.key === "lp") {
                        setActiveTab("lp");
                      } else if (s.key === "vid") {
                        setActiveTab("vid");
                      } else if (s.key === "deck" || s.key === "ppt_check") {
                        setActiveTab("deck");
                      } else if (s.key === "audio") {
                        setActiveTab("audio");
                      } else if (s.key === "doc" || s.key === "doc_check") {
                        setActiveTab("doc");
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
        ) : isWorkspaceActive && workspaceType === "cardnews" ? (
          <CardnewsWorkspace
            workspaceTitle={workspaceTitle}
            isDarkMode={isDarkMode}
            onClose={() => setIsWorkspaceActive(false)}
            onOpenSkillModal={() => setIsSkillModalOpen(true)}
          />
        ) : isWorkspaceActive && workspaceType === "lp" ? (
          <LpWorkspace
            workspaceTitle={workspaceTitle}
            isDarkMode={isDarkMode}
            onClose={() => setIsWorkspaceActive(false)}
          />
        ) : isWorkspaceActive && workspaceType === "detail" ? (
          <DetailWorkspace
            workspaceTitle={workspaceTitle}
            isDarkMode={isDarkMode}
            onClose={() => setIsWorkspaceActive(false)}
          />
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
            <div className={`flex flex-col h-full overflow-hidden border-r shrink-0 transition-all duration-300 ${
              isRightPanelCollapsed ? "w-full" : "w-[40%]"
            } ${
              isDarkMode
                ? "bg-[#171A21] border-[#2A3140]"
                : "bg-[#FAFBFD] border-[#E2E8F0]"
            }`}>
              {/* Chat Pane Header */}
              <div className={`h-14 px-6 flex items-center justify-between shrink-0 border-b relative ${
                isDarkMode
                  ? "bg-[#1E232D] border-[#2A3140]"
                  : "bg-white border-[#E2E8F0]"
              }`}>
                {/* Left back button */}
                <button
                  onClick={() => setIsWorkspaceActive(false)}
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
                    {workspaceTitle}
                  </span>
                </div>

                {/* Right empty spacing block */}
                <div className="w-8" />
              </div>

              {/* Chat Scroll Workspace Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                {chatHistory.map((msg, i) => {
                  const isAI = msg.sender === "ai";
                  return (
                    <div key={i} className={`flex flex-col ${isAI ? "items-start" : "items-end"} w-full animate-in fade-in duration-300`}>
                      <div className="max-w-[85%]">
                        {/* Speech Bubble */}
                        <div className={`px-4.5 py-3 rounded-2xl text-[13.5px] font-medium leading-relaxed tracking-tight shadow-sm select-text whitespace-pre-line flex flex-col gap-2.5 ${
                          isAI 
                            ? isDarkMode
                              ? "bg-[#1E232D] border-[#2A3140] text-[#F8FAFC] rounded-tl-sm"
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

                      {/* AI Suggestions Row */}
                      {isAI && msg.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-3 ml-0">
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
                        <div className={`mt-4 ml-0 w-full max-w-[550px] rounded-3xl p-5.5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 border ${
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

                {/* In-painting selection badge shown in screenshot */}
                {isInpainting && (
                  <div className="flex items-center gap-2 px-1 mb-3.5 select-none animate-in fade-in duration-200 text-left">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                      isDarkMode
                        ? "bg-blue-950/20 border-blue-900/40 text-[#6D8FFF]"
                        : "bg-[#EFF6FF] border-blue-200 text-[#3B63F6]"
                    }`}>
                      <span>선택 영역 부분 수정</span>
                      <button
                        onClick={() => setIsInpainting(false)}
                        className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8.5px] font-black cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      >
                        ✕
                      </button>
                    </div>
                    <span className={`text-[10.5px] font-semibold ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                      전체가 아닌 선택한 부분만 다시 생성합니다.
                    </span>
                  </div>
                )}

                {/* 2-3 Attachment chips row */}
                <div className="flex flex-wrap items-center gap-2.5 px-1 mb-2.5 select-none">
                  {/* B표시 베이스 이미지 */}
                  {baseImage ? (
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-bold shadow-sm transition-all relative border ${
                      isDarkMode
                        ? "bg-[#EA580C]/12 border-[#EA580C]/30 text-[#EA580C]"
                        : "bg-[#FFF8F6] border-[#FFD9D0] text-[#EA580C]"
                    }`}>
                      <span className="w-4 h-4 rounded-md bg-[#EA580C] text-white flex items-center justify-center text-[8.5px] font-black shrink-0 shadow-sm">B</span>
                      <span className="tracking-tight max-w-[120px] truncate">{baseImage.name}</span>
                      <button
                        onClick={() => setBaseImage(null)}
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors cursor-pointer ${
                          isDarkMode ? "hover:bg-[#EA580C]/20 text-[#EA580C]" : "hover:bg-[#FFEAE6] text-[#EA580C]"
                        }`}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => {
                          setIsBasePopoverOpen(!isBasePopoverOpen);
                          setIsRefPopoverOpen(false);
                        }}
                        className={`flex items-center gap-1.5 px-3.5 h-7.5 rounded-full border text-[11.5px] font-bold active:scale-95 transition-all shadow-sm cursor-pointer select-none ${
                          isDarkMode
                            ? "border-[#EA580C]/35 bg-[#EA580C]/12 text-[#EA580C] hover:bg-[#EA580C]/20"
                            : "border-[#FFD9D0] bg-[#FFF8F6] text-[#EA580C] hover:bg-[#FFEAE6]"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-md bg-[#EA580C] text-white flex items-center justify-center text-[8.5px] font-black shrink-0">B</span>
                        <span>베이스 추가 +</span>
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

                      <button
                        onClick={() => setIsSkillModalOpen(true)}
                        className={`w-8.5 h-8.5 rounded-full flex items-center justify-center active:scale-95 shadow-sm transition-all cursor-pointer shrink-0 border ${
                          isDarkMode
                            ? selectedSkill
                              ? "border-blue-900 bg-blue-950/20 text-[#6D8FFF]"
                              : "border-[#2A3140] text-slate-400 bg-[#1E232D] hover:bg-[#252B36]"
                            : selectedSkill
                              ? "border-blue-200 bg-blue-50/50 text-[#3B63F6]"
                              : "border-slate-200 text-slate-500 bg-white hover:bg-slate-100"
                        }`}
                        title="스킬 선택"
                      >
                        <Sparkles size={14} className={selectedSkill ? (isDarkMode ? "text-[#6D8FFF]" : "text-[#3B63F6]") : "text-slate-400"} />
                      </button>
                    </div>

                  {/* Input Text Box */}
                  <input
                    type="text"
                    id="chat-input-field"
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
                    placeholder={isInpainting ? "선택한 영역을 어떻게 바꿀까요? (예: 배경을 바다로)" : "무엇을 만들까요? 자유롭게 요청해 보세요."}
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
              isRightPanelCollapsed ? "w-0 border-l-0 overflow-hidden" : "w-[60%] border-l"
            } ${
              isDarkMode ? "bg-[#111318] border-[#2A3140]" : "bg-slate-50 border-slate-200"
            }`}>
              {/* Editor Header */}
              <div className={`h-14 px-6 flex items-center justify-between shrink-0 border-b ${
                isDarkMode 
                  ? "bg-[#1E232D] border-[#2A3140]" 
                  : "bg-white border-slate-200"
              }`}>
                <button
                  onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-655 ${
                    isDarkMode ? "hover:bg-[#252B36] hover:text-white" : "hover:bg-slate-100 hover:text-slate-800"
                  }`}
                  title={isRightPanelCollapsed ? "패널 펼치기" : "패널 접기"}
                >
                  <Columns size={20} />
                </button>
                
                <div className="flex items-center gap-4">
                  <button className={`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-655 ${
                    isDarkMode ? "hover:text-[#F8FAFC]" : "hover:text-slate-800"
                  }`} title="공유하기">
                    <Share2 size={20} />
                  </button>
                  <button className={`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-655 ${
                    isDarkMode ? "hover:text-[#F8FAFC]" : "hover:text-slate-800"
                  }`} title="내보내기">
                    <Upload size={20} />
                  </button>
                  <button className={`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-655 ${
                    isDarkMode ? "hover:text-[#F8FAFC]" : "hover:text-slate-800"
                  }`} title="더 보기">
                    <MoreHorizontal size={20} />
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
                  (() => {
                    const isDetailPage = workspaceTitle.includes("상세페이지") || workspaceTitle.includes("상세 페이지") || workspaceTitle.includes("랜딩페이지") || workspaceTitle.includes("랜딩 페이지");
                    if (isDetailPage) {
                      return (
                        <div className="w-full h-full flex flex-col items-center relative animate-in fade-in duration-300">
                          {/* 1. Top View Mode Toggle UI */}
                          <div className="sticky top-0 z-30 mb-6 flex justify-center w-full">
                            <div className={`flex items-center gap-1 p-1 rounded-full shadow-md backdrop-blur-md border ${
                              isDarkMode 
                                ? "bg-[#1E232D]/90 border-[#2A3140]" 
                                : "bg-white/95 border-slate-200"
                            }`}>
                              <button
                                onClick={() => setDetailActiveView("page")}
                                className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                  detailActiveView === "page"
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 bg-transparent"
                                }`}
                              >
                                <span>슬라이드</span>
                                {detailActiveView === "page" && (
                                  <span className="text-[10px] opacity-80 font-semibold">{detailCurrentPage}/7</span>
                                )}
                              </button>
                              <button
                                onClick={() => setDetailActiveView("all")}
                                className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                  detailActiveView === "all"
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "text-gray-500 hover:text-gray-700 bg-transparent"
                                }`}
                              >
                                <span>전체 보기</span>
                              </button>
                            </div>
                          </div>

                          {/* 2. Mode-specific Layout Canvas */}
                          <div className="w-full flex-1 flex items-center justify-center relative overflow-hidden min-h-[500px]">
                            {detailActiveView === "page" ? (
                              /* Slide Mode */
                              <div className="relative w-full max-w-[390px] aspect-[9/16] flex flex-col justify-between group/canvas">
                                {/* Left Floating Arrow */}
                                <button
                                  onClick={() => setDetailCurrentPage(prev => Math.max(1, prev - 1))}
                                  disabled={detailCurrentPage === 1}
                                  className={`absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border shadow-md transition-all z-20 cursor-pointer active:scale-90 ${
                                    detailCurrentPage === 1
                                      ? "opacity-30 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400"
                                      : "opacity-80 hover:opacity-100 bg-white hover:bg-slate-50 border-slate-200 text-slate-800"
                                  }`}
                                >
                                  <ChevronLeft size={20} strokeWidth={2.5} />
                                </button>

                                {/* Right Floating Arrow */}
                                <button
                                  onClick={() => setDetailCurrentPage(prev => Math.min(7, prev + 1))}
                                  disabled={detailCurrentPage === 7}
                                  className={`absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border shadow-md transition-all z-20 cursor-pointer active:scale-90 ${
                                    detailCurrentPage === 7
                                      ? "opacity-30 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400"
                                      : "opacity-80 hover:opacity-100 bg-white hover:bg-slate-50 border-slate-200 text-slate-800"
                                  }`}
                                >
                                  <ChevronRight size={20} strokeWidth={2.5} />
                                </button>

                                {/* Smartphone-like mock device border */}
                                <div className={`w-full h-full rounded-[36px] overflow-hidden border-4 flex flex-col relative shadow-[0_24px_50px_-12px_rgba(0,0,0,0.18)] ${
                                  isDarkMode ? "border-[#2A3140] bg-[#1E232D]" : "border-white bg-white"
                                }`}>
                                  <div className="w-full h-full overflow-y-auto scrollbar-none rounded-[32px]">
                                    <img
                                      src={cosmeticSlides[detailCurrentPage - 1]}
                                      alt={`Detail Slide ${detailCurrentPage}`}
                                      className="w-full h-auto object-contain block"
                                      style={{ display: 'block', margin: 0, padding: 0 }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* Full View Mode: Continuous Seamless list */
                              <div className="w-full max-w-[390px] h-[70vh] flex flex-col relative group/canvas select-none">
                                {/* Smartphone-like mock device border */}
                                <div className={`w-full h-full rounded-[36px] overflow-hidden border-4 flex flex-col relative shadow-[0_24px_50px_-12px_rgba(0,0,0,0.18)] ${
                                  isDarkMode ? "border-[#2A3140] bg-[#1E232D]" : "border-white bg-white"
                                }`}>
                                  <div className="w-full h-full overflow-y-auto scrollbar-none rounded-[32px] flex flex-col gap-0">
                                    {cosmeticSlides.map((src, index) => (
                                      <img
                                        key={index}
                                        src={src}
                                        alt={`Detail Page Segment ${index + 1}`}
                                        className="w-full h-auto block object-contain"
                                        style={{ display: 'block', margin: 0, padding: 0 }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="flex flex-col items-center gap-4 animate-in zoom-in-98 duration-300 w-full h-full justify-center">
                        <div 
                          ref={imageContainerRef}
                          onMouseDown={handleSelectionMouseDown}
                          onMouseMove={handleSelectionMouseMove}
                          onMouseUp={handleSelectionMouseUp}
                          className={`relative rounded-[28px] overflow-hidden border-4 w-full max-w-[95%] h-full max-h-[85vh] flex items-center justify-center group/img select-none ${
                            isDarkMode
                              ? "border-[#2A3140] bg-[#1E232D] shadow-none"
                              : "border-white bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.04)]"
                          }`}
                          style={{
                            cursor: isSelectionModeActive && !isDragSelected ? 'crosshair' : 'default'
                          }}
                        >
                          <img
                            src={generatedImageUrl}
                            alt="Generated preview"
                            className="w-full h-full object-contain rounded-[24px]"
                          />

                          {/* Dotted selection box overlay when selection exists */}
                          {selectionBox && (
                            <div 
                              className="absolute border-2 border-dashed border-[#3B63F6] pointer-events-none z-20"
                              style={{
                                left: `${selectionBox.x}px`,
                                top: `${selectionBox.y}px`,
                                width: `${selectionBox.width}px`,
                                height: `${selectionBox.height}px`
                              }}
                            >
                              {/* Corner Resizing Handles */}
                              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#3B63F6] rounded-full" />
                              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#3B63F6] rounded-full" />
                              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#3B63F6] rounded-full" />
                              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#3B63F6] rounded-full" />
                              
                              {/* 이 영역 수정 Floating pill button below selection box */}
                              {isDragSelected && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    document.getElementById("chat-input-field")?.focus();
                                  }}
                                  className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-[#3B63F6] hover:bg-[#254EDB] text-white font-extrabold text-[10.5px] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1 transition-all active:scale-95 cursor-pointer pointer-events-auto select-none z-40"
                                >
                                  <Wand2 size={11} />
                                  <span>이 영역 수정</span>
                                </button>
                              )}
                            </div>
                          )}

                          {/* Top-right floating "수정하기" button */}
                          {!isSelectionModeActive && (
                            <div className="absolute top-4 right-4 z-30 select-none">
                              <button
                                onClick={() => {
                                  setIsSelectionModeActive(true);
                                }}
                                className="bg-[#3B63F6] hover:bg-[#254EDB] text-white font-extrabold text-[12px] px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                              >
                                <Wand2 size={13} />
                                <span>수정하기</span>
                              </button>
                            </div>
                          )}

                          {/* Top Right Floating Toolbar: 수정 모드 & 다시 선택 */}
                          {isSelectionModeActive && isDragSelected && (
                            <div className="absolute top-4 right-4 bg-white/95 border border-slate-200/50 p-1 rounded-xl shadow-md flex items-center gap-1 z-30 select-none">
                              <button
                                className="bg-[#EFF6FF] text-[#3B63F6] font-extrabold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-default"
                              >
                                <Wand2 size={12} />
                                <span>수정 모드</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectionBox(null);
                                  setIsDragSelected(false);
                                }}
                                className="bg-transparent hover:bg-slate-100 text-slate-700 font-extrabold text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                              >
                                <span>다시 선택</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()
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
        ) : activeTab === "image" ? (
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
                    <div className="relative group">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 cursor-pointer ${
                          isDarkMode
                            ? "bg-transparent border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-slate-200"
                            : "bg-transparent border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                        }`}
                      >
                        <Paperclip size={15} />
                      </button>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold tracking-tight whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-50">
                        이미지 첨부
                        {/* Tooltip Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-[4px] border-x-transparent border-t-[4px] border-t-slate-900 dark:border-t-white" />
                      </div>
                    </div>
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

              <div className="flex justify-between items-center w-full border-b border-slate-100/50 dark:border-slate-800/50 pb-3">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                  {["전체", "AI 이미지", "카드뉴스", "웹툰", "상세페이지"].map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4.5 py-1.5 rounded-full text-[13px] font-semibold tracking-tight transition-all cursor-pointer ${
                          isActive
                            ? (isDarkMode ? "bg-slate-800 text-white shadow-sm" : "bg-slate-900 text-white shadow-sm")
                            : (isDarkMode ? "bg-[#1E232D] text-slate-400 hover:bg-[#252B36] hover:text-slate-200" : "bg-[#F1F5F9] text-slate-400 hover:bg-slate-200 hover:text-slate-700")
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Notion/Linear style minimalist text toggle filter */}
                <div className="flex items-center gap-1.5 text-[12.5px] shrink-0 select-none">
                  <button
                    onClick={() => setMainSort("popular")}
                    className={`font-semibold transition-colors cursor-pointer ${
                      mainSort === "popular"
                        ? isDarkMode ? "text-white font-medium text-sm" : "text-slate-900 font-medium text-sm"
                        : isDarkMode ? "text-slate-500 hover:text-slate-350" : "text-slate-400 hover:text-gray-600 text-sm"
                    }`}
                  >
                    인기순
                  </button>
                  <span className={isDarkMode ? "text-slate-700" : "text-slate-300"}>·</span>
                  <button
                    onClick={() => setMainSort("recent")}
                    className={`font-semibold transition-colors cursor-pointer ${
                      mainSort === "recent"
                        ? isDarkMode ? "text-white font-medium text-sm" : "text-slate-900 font-medium text-sm"
                        : isDarkMode ? "text-slate-500 hover:text-slate-350" : "text-slate-400 hover:text-gray-600 text-sm"
                    }`}
                  >
                    최신순
                  </button>
                </div>
              </div>
            </div>

            {/* Template Masonry Cards Grid (4 columns exactly like Figma) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-full mb-12 px-0.5">
              
              {/* Column 1 */}
              <div className="flex flex-col gap-6">
                {col1.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedDetailTemplate(t)}
                    className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border cursor-pointer ${
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
                          onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }}
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
                    onClick={() => setSelectedDetailTemplate(t)}
                    className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border cursor-pointer ${
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
                          onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }}
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
                    onClick={() => setSelectedDetailTemplate(t)}
                    className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border cursor-pointer ${
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
                          onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }}
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
                    onClick={() => setSelectedDetailTemplate(t)}
                    className={`rounded-[24px] overflow-hidden transition-all duration-300 group flex flex-col w-full border cursor-pointer ${
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
                          onClick={(e) => { e.stopPropagation(); handleModalApplyTemplate(t); }}
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
        ) : activeTab === "lp" ? (
          <ServiceDashboardView type="lp" isDarkMode={isDarkMode} setIsWorkspaceActive={setIsWorkspaceActive} setWorkspaceType={setWorkspaceType} setWorkspaceTitle={setWorkspaceTitle} favoriteTemplates={favoriteTemplates} toggleFavorite={toggleFavorite} setSelectedDetailTemplate={setSelectedDetailTemplate} />
        ) : activeTab === "vid" ? (
          <ServiceDashboardView type="vid" isDarkMode={isDarkMode} setIsWorkspaceActive={setIsWorkspaceActive} setWorkspaceType={setWorkspaceType} setWorkspaceTitle={setWorkspaceTitle} favoriteTemplates={favoriteTemplates} toggleFavorite={toggleFavorite} setSelectedDetailTemplate={setSelectedDetailTemplate} />
        ) : activeTab === "deck" ? (
          <ServiceDashboardView type="deck" isDarkMode={isDarkMode} setIsWorkspaceActive={setIsWorkspaceActive} setWorkspaceType={setWorkspaceType} setWorkspaceTitle={setWorkspaceTitle} favoriteTemplates={favoriteTemplates} toggleFavorite={toggleFavorite} setSelectedDetailTemplate={setSelectedDetailTemplate} />
        ) : activeTab === "audio" ? (
          <ServiceDashboardView type="audio" isDarkMode={isDarkMode} setIsWorkspaceActive={setIsWorkspaceActive} setWorkspaceType={setWorkspaceType} setWorkspaceTitle={setWorkspaceTitle} favoriteTemplates={favoriteTemplates} toggleFavorite={toggleFavorite} setSelectedDetailTemplate={setSelectedDetailTemplate} />
        ) : activeTab === "doc" ? (
          <ServiceDashboardView type="doc" isDarkMode={isDarkMode} setIsWorkspaceActive={setIsWorkspaceActive} setWorkspaceType={setWorkspaceType} setWorkspaceTitle={setWorkspaceTitle} favoriteTemplates={favoriteTemplates} toggleFavorite={toggleFavorite} setSelectedDetailTemplate={setSelectedDetailTemplate} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-start pt-[120px] pb-10 px-8 max-w-[1400px] mx-auto w-full">
            <p className="text-slate-400">잘못된 접근입니다.</p>
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
            <div className="flex items-start justify-between mb-6 select-none">
              <div>
                <h2 className="text-[17px] font-bold text-slate-800 tracking-tight leading-none mb-4.5">크레딧 충전</h2>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">현재 잔액</span>
                  <span className="text-[25px] font-extrabold text-slate-900 tracking-tight leading-none font-sans block">
                    {userCredits.toLocaleString()}<span className="text-[14px] font-semibold text-slate-400 ml-1">크레딧</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsCreditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="닫기"
              >
                ✕
              </button>
            </div>

            {/* Charging Packages Header */}
            <div className="mb-3 px-1 select-none">
              <span className="text-[12px] font-bold text-slate-400 tracking-tight">충전 패키지</span>
            </div>

            {/* Packages List */}
            <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-0.5 scrollbar-thin">
              {[
                { amount: 1000, price: "₩1,000" },
                { amount: 5000, price: "₩5,000" },
                { amount: 10000, price: "₩10,000" },
                { amount: 50000, price: "₩50,000" },
                { amount: 100000, price: "₩100,000" }
              ].map((pkg, idx) => {
                const isSelected = selectedRechargeIndex === idx;
                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedRechargeIndex(idx)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-150 cursor-pointer select-none ${
                      isSelected
                        ? "bg-[#EFF6FF]/65 border-[#3B63F6]/25"
                        : "bg-white border-slate-100 hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Left Icon and Amount Info */}
                    <div className="flex items-center gap-3">
                      <Coins 
                        size={17} 
                        strokeWidth={1.8} 
                        className={`transition-colors duration-150 ${isSelected ? "text-[#3B63F6]" : "text-slate-400"}`} 
                      />
                      <div className="flex items-baseline">
                        <span className="text-[16px] font-bold text-slate-900 tracking-tight leading-none">
                          {pkg.amount.toLocaleString()}
                        </span>
                        <span className="text-[11.5px] font-semibold text-slate-450 tracking-tight leading-none ml-1">
                          크레딧
                        </span>
                        {pkg.amount === 50000 && (
                          <span className="bg-blue-50 text-[#3B63F6] text-[9.5px] font-black px-2 py-0.5 rounded-[5px] leading-none ml-2 select-none tracking-normal">
                            BEST
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-[12.5px] font-semibold text-slate-450 tracking-tight font-sans">
                      {pkg.price}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Single CTA Recharge Button */}
            {(() => {
              const packages = [
                { amount: 1000, price: "₩1,000" },
                { amount: 5000, price: "₩5,000" },
                { amount: 10000, price: "₩10,000" },
                { amount: 50000, price: "₩50,000" },
                { amount: 100000, price: "₩100,000" }
              ];
              const activePkg = packages[selectedRechargeIndex];
              return (
                <button
                  onClick={() => {
                    setIsCreditModalOpen(false);
                    setSelectedPaymentPkg(activePkg);
                    setIsPaymentModalOpen(true);
                  }}
                  className="w-full h-11.5 rounded-xl bg-[#3B63F6] hover:bg-blue-600 active:scale-[0.98] text-white text-[13px] font-bold transition-all shadow-md mt-5.5 cursor-pointer flex items-center justify-center"
                >
                  {activePkg.price} 충전하기
                </button>
              );
            })()}

            {/* Footer View Usage Link */}
            <div className="mt-4 text-center select-none">
              <button 
                onClick={() => {
                  setCreditToast("사용 내역 기능 준비 중입니다!");
                }}
                className="text-[12px] font-bold text-slate-400 hover:text-[#3B63F6] hover:underline flex items-center gap-1 mx-auto transition-colors cursor-pointer"
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

      {/* 스킬로 시작하기 모달 (Modal) 창 구현 */}
      {isSkillModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsSkillModalOpen(false)}
        >
          <div 
            className="bg-white rounded-[28px] w-full max-w-5xl border border-slate-100 shadow-[0_24px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6.5 pt-6 pb-4 flex items-start justify-between border-b border-transparent bg-white">
              <div>
                <h2 className="text-[17px] font-bold text-slate-850 tracking-tight leading-none">
                  스킬로 시작하기
                </h2>
                <p className="text-[11px] font-normal text-slate-500 mt-2 leading-none">
                  스킬을 고르면 바로 쓸 수 있는 템플릿이 오른쪽에 나타나요.
                </p>
              </div>
              <button 
                onClick={() => setIsSkillModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-[12px]"
                title="닫기"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Split Panels */}
            <div className="flex flex-col md:flex-row h-[550px] w-full min-h-[550px]">
              
              {/* Left Panel (35% width, list of skills) */}
              <div className="w-full md:w-[35%] border-r border-transparent bg-slate-50/70 p-5 flex flex-col h-full overflow-hidden select-none">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Search size={14} />
                  </div>
                  <input
                    type="text"
                    placeholder="스킬 검색..."
                    value={skillSearchQuery}
                    onChange={(e) => setSkillSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-3.5 py-2.5 text-[12.5px] font-semibold tracking-tight outline-none shadow-sm"
                  />
                </div>

                {/* Category Chips - Inactive: text-gray-500, Active: bg-slate-900 text-white */}
                <div className="flex flex-wrap items-center gap-1.5 mt-4">
                  {["전체", "영상", "디자인", "문서", "분석"].map((cat) => {
                    const isActive = skillSubFilter === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSkillSubFilter(cat)}
                        className={`px-3 py-1.5 rounded-full text-[12px] font-bold tracking-tight transition-all cursor-pointer ${
                          isActive
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-750"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Skill List Column */}
                <div className="flex-1 overflow-y-auto mt-5 pr-1 flex flex-col gap-2.5 scroll-container scrollbar-thin">
                  {(() => {
                    const filtered = SKILL_ITEMS.filter((s) => {
                      const matchesCategory = skillSubFilter === "전체" || s.category === skillSubFilter;
                      const matchesSearch = s.title.toLowerCase().includes(skillSearchQuery.toLowerCase()) || 
                                            s.subtext.toLowerCase().includes(skillSearchQuery.toLowerCase());
                      return matchesCategory && matchesSearch;
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                          <span className="text-[12px] font-bold">검색 결과가 없습니다.</span>
                        </div>
                      );
                    }

                    return filtered.map((skill) => {
                      const isSelected = selectedSkillItem === skill.id;
                      
                      // Render matching icon
                      let IconComponent = PenTool;
                      if (skill.iconType === "video") IconComponent = Video;
                      else if (skill.iconType === "beaker") IconComponent = Beaker;
                      else if (skill.iconType === "grid") IconComponent = LayoutGrid;
                      else if (skill.iconType === "check") IconComponent = Check;

                      return (
                        <button
                          key={skill.id}
                          onClick={() => setSelectedSkillItem(skill.id)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                            isSelected
                              ? "bg-[#EFF6FF] border-transparent shadow-none"
                              : "bg-transparent border-transparent hover:bg-slate-100/60"
                          }`}
                        >
                          {/* Left Icon inside circle */}
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{ backgroundColor: skill.bgIcon, color: skill.fgIcon }}
                          >
                            <IconComponent size={16} strokeWidth={2.2} />
                          </div>

                          {/* Middle Info Text */}
                          <div className="flex-1 min-w-0 flex flex-col justify-start">
                            <div className="flex items-center">
                              <span className={`text-[13px] font-semibold tracking-tight leading-none ${
                                isSelected ? "text-[#3B63F6]" : "text-slate-800"
                              }`}>
                                {skill.title}
                              </span>
                              {skill.isNew && (
                                <span className="bg-[#E8F8F0] text-[#10B981] text-[8.5px] font-extrabold px-1.5 py-0.5 rounded ml-2 select-none tracking-normal">
                                  NEW
                                </span>
                              )}
                            </div>
                            <span className="text-[10.5px] font-normal text-slate-500 mt-1.5 leading-snug break-all text-ellipsis overflow-hidden line-clamp-2">
                              {skill.subtext}
                            </span>
                          </div>

                          {/* Right arrow */}
                          <div className="text-slate-400 shrink-0 self-center">
                            <ChevronRight size={14} />
                          </div>
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Right Panel (65% width, grid of templates belonging to selected skill) */}
              <div className="flex-1 bg-white p-6.5 flex flex-col h-full overflow-hidden select-none text-left">
                {(() => {
                  const activeSkill = SKILL_ITEMS.find((s) => s.id === selectedSkillItem) || SKILL_ITEMS[0];
                  
                  return (
                    <>
                      {/* Active Skill Title & Header Info */}
                      <div>
                        <h3 className="text-[17px] font-bold text-slate-800 tracking-tight leading-none">
                          {activeSkill.title}
                        </h3>
                        <p className="text-[11.5px] font-semibold text-slate-400 mt-2 leading-relaxed max-w-2xl break-all">
                          {activeSkill.description}
                        </p>
                      </div>

                      {/* Templates Grid Container */}
                      <div className="flex-1 overflow-y-auto mt-6 pr-1 grid grid-cols-3 gap-4.5 scroll-container scrollbar-thin pb-4">
                        {activeSkill.templates.map((tmpl) => {
                          return (
                            <div
                              key={tmpl.id}
                              onClick={() => {
                                setIsSkillModalOpen(false);
                                // Generate a template action exactly like the homepage templates
                                const syntheticTemplate = {
                                  id: Date.now(),
                                  title: tmpl.title,
                                  category: tmpl.category,
                                  aspect: "aspect-[4/3]",
                                  image: tmpl.isDark
                                    ? "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
                                    : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                                };
                                handleModalApplyTemplate(syntheticTemplate);
                              }}
                              className="border border-transparent rounded-2xl overflow-hidden cursor-pointer bg-white transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] flex flex-col group"
                            >
                              {/* Visual Simulated Mockup Box */}
                              <div className={`aspect-[4/3] w-full shrink-0 flex items-center justify-center p-4 relative overflow-hidden select-none border-b border-transparent ${
                                tmpl.isDark 
                                  ? "bg-[#1E232D] text-white" 
                                  : "bg-slate-50 text-slate-800"
                              }`}>
                                {/* Small top-left brand watermark */}
                                <span className={`absolute top-2.5 left-2.5 text-[8.5px] font-black tracking-tight ${
                                  tmpl.isDark ? "text-white/40" : "text-slate-400"
                                }`}>
                                  딸깍
                                </span>

                                {/* Main mockup elements */}
                                <div className="flex flex-col items-center gap-2">
                                  <span className={`text-[17px] font-extrabold tracking-wider ${
                                    tmpl.isDark ? "text-white" : "text-slate-800"
                                  }`}>
                                    딸깍
                                  </span>
                                </div>
                              </div>

                              {/* Card Bottom Label */}
                              <div className="p-3 text-center bg-white border-t border-slate-50 flex items-center justify-center">
                                <span className="text-[12px] font-medium text-slate-900 tracking-tight text-center leading-none truncate">
                                  {tmpl.title}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 템플릿 상세 정보 모달 (Modal) 창 구현 */}
      {selectedDetailTemplate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedDetailTemplate(null)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-5xl border border-slate-100 shadow-[0_24px_60px_rgba(0,0,0,0.15)] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Preview Area (60%) */}
            <div className="w-full md:w-[60%] bg-slate-50 p-6 flex flex-col justify-center items-center">
              {(() => {
                const t = selectedDetailTemplate;
                if (t.image) {
                  return (
                    <div className="w-full h-full min-h-[300px] md:min-h-[460px] bg-slate-100 rounded-2xl overflow-hidden shadow-inner relative flex items-center justify-center">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover rounded-2xl" />
                    </div>
                  );
                }
                if (t.bg && t.textCol) {
                  return (
                    <div className={`w-full h-full min-h-[300px] md:min-h-[460px] ${t.bg} rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-inner select-none`}>
                      <div className="text-center">
                        <div className={`text-[24px] font-black tracking-tight ${t.textCol} flex items-center justify-center gap-1`}>
                          <span>♦</span> 딸깍
                        </div>
                        <div className="h-2 bg-white/20 rounded w-[150px] mx-auto my-4" />
                        <div className="h-1 bg-white/10 rounded w-[100px] mx-auto my-2" />
                      </div>
                    </div>
                  );
                }
                if (t.category === "워드" || t.category === "한글" || t.category === "엑셀" || t.category === "논문") {
                  return (
                    <div className="w-full h-full min-h-[300px] md:min-h-[460px] bg-slate-50 rounded-2xl flex items-center justify-center p-6 select-none relative overflow-hidden shadow-inner border border-slate-200">
                      <div className="w-[90%] h-[95%] bg-white border border-slate-200 rounded-lg p-5 flex flex-col shadow-md">
                        <div className="text-[10px] font-bold text-slate-400 text-center tracking-widest border-b border-slate-200 pb-2 mb-4">
                          || {t.title} ||
                        </div>
                        <div className="flex flex-col gap-2.5 flex-1 mt-2">
                          <div className="h-2 bg-slate-200 rounded w-[85%]" />
                          <div className="h-2 bg-slate-100 rounded w-[95%]" />
                          <div className="h-2 bg-slate-150 rounded w-[90%]" />
                          <div className="h-2 bg-slate-100 rounded w-[60%]" />
                          <div className="h-20 border border-dashed border-slate-200 rounded-lg my-3 w-full" />
                          <div className="h-2 bg-slate-150 rounded w-[80%]" />
                          <div className="h-2 bg-slate-100 rounded w-[45%]" />
                        </div>
                      </div>
                    </div>
                  );
                }
                if (t.subtitle) {
                  return (
                    <div className={`w-full h-full min-h-[300px] md:min-h-[460px] bg-gradient-to-br ${t.bg} rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-inner select-none`}>
                      <span className={`text-[10px] font-bold tracking-widest ${t.darkText ? "text-slate-400" : "text-white/60"}`}>THINKING INFINITY</span>
                      <h4 className={`text-[20px] font-extrabold leading-tight tracking-tight mt-3 text-center ${t.darkText ? "text-slate-800" : "text-white"}`}>
                        {t.subtitle}
                      </h4>
                    </div>
                  );
                }
                if (t.waveColor) {
                  return (
                    <div className="w-full h-full min-h-[300px] md:min-h-[460px] bg-slate-50 rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-inner select-none border border-slate-200">
                      <div className="flex items-end gap-[4px] h-[70px] mb-8">
                        {[15, 35, 20, 45, 60, 40, 20, 35, 55, 70, 45, 25, 30, 50, 18, 30, 48].map((h, i) => (
                          <div key={i} className={`w-[4px] rounded-full ${t.waveColor}`} style={{ height: `${h}px` }} />
                        ))}
                      </div>
                      <div className="w-14 h-14 rounded-full bg-[#3B63F6] flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 cursor-pointer transition-all">
                        <Play size={20} className="ml-1 fill-white" />
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="w-full h-full min-h-[300px] md:min-h-[460px] bg-slate-100 rounded-2xl flex items-center justify-center">
                    <p className="text-slate-400">미리보기가 제공되지 않는 템플릿입니다.</p>
                  </div>
                );
              })()}
            </div>

            {/* Right Information Area (40%) */}
            <div className="w-full md:w-[40%] p-6 flex flex-col justify-between border-l border-slate-100">
              {/* Header Info */}
              <div>
                <div className="flex items-center justify-between mb-4 select-none">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#3B63F6] bg-blue-50 px-2.5 py-1 rounded-full">
                    {selectedDetailTemplate.category}
                  </span>
                  <button 
                    onClick={() => setSelectedDetailTemplate(null)}
                    className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    title="닫기"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Title & Tags */}
                <h2 className="text-[20px] font-black text-slate-900 tracking-tight leading-tight mb-2">
                  {selectedDetailTemplate.title}
                </h2>
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {selectedDetailTemplate.tags.map((tag: string) => (
                    <span key={tag} className="text-[12.5px] font-bold text-[#94A3B8] tracking-tight">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Prompt Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12.5px] font-extrabold text-slate-800 tracking-tight">프롬프트</span>
                    <button 
                      onClick={() => {
                        const prompt = getPromptForTemplate(selectedDetailTemplate);
                        navigator.clipboard.writeText(prompt);
                        setCreditToast("프롬프트가 클립보드에 복사되었습니다!");
                      }}
                      className="text-[11px] font-bold text-slate-500 hover:text-[#3B63F6] flex items-center gap-1 bg-slate-50 hover:bg-blue-50/50 px-2 py-1 rounded-lg border border-slate-100 transition-colors cursor-pointer"
                    >
                      <Copy size={11} />
                      복사
                    </button>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 text-[12px] text-slate-600 leading-relaxed font-mono break-words shadow-inner max-h-[140px] overflow-y-auto">
                    {getPromptForTemplate(selectedDetailTemplate)}
                  </div>
                </div>

                {/* Metadata Info Table */}
                <div className="mb-6">
                  <span className="text-[12.5px] font-extrabold text-slate-800 tracking-tight block mb-2">상세 정보</span>
                  <div className="border border-slate-100 rounded-xl overflow-hidden text-[12px] bg-slate-50/30">
                    <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-100">
                      <span className="font-bold text-slate-400">모델</span>
                      <span className="font-extrabold text-slate-700">
                        {selectedDetailTemplate.category.includes("이미지") || selectedDetailTemplate.category.includes("뉴스") || selectedDetailTemplate.category.includes("웹툰") || selectedDetailTemplate.category.includes("상세")
                          ? "Nano Banana Pro"
                          : "딸깍 GPT-4o Design"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2.5 border-b border-slate-100">
                      <span className="font-bold text-slate-400">품질</span>
                      <span className="font-extrabold text-slate-700">1K (Ultra-Detail)</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2.5">
                      <span className="font-bold text-slate-400">크기</span>
                      <span className="font-extrabold text-slate-700">
                        {(() => {
                          const t = selectedDetailTemplate;
                          if (t.aspect) {
                            if (t.aspect.includes("4/3")) return "1365 x 1024 (4:3)";
                            if (t.aspect.includes("3/4")) return "768 x 1024 (3:4)";
                            if (t.aspect.includes("9/16")) return "1080 x 1920 (9:16)";
                            if (t.aspect.includes("16/9")) return "1920 x 1080 (16:9)";
                          }
                          return "1024 x 1024 (1:1)";
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="mt-auto">
                <button 
                  onClick={() => handleModalApplyTemplate(selectedDetailTemplate)}
                  className="bg-[#3B63F6] hover:bg-blue-700 text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center shadow-lg hover:shadow-blue-500/20 w-full transition-all duration-200 cursor-pointer text-[13px] active:scale-[0.98]"
                >
                  템플릿 적용하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
