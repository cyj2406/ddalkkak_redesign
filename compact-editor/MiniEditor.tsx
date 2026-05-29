"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  ChevronDown,
  Type,
  Square,
  Circle,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RotateCw,
  Sparkles,
  Wand2,
  Crop
} from "lucide-react";

interface MiniEditorProps {
  generatedImageUrl: string;
  isDarkMode: boolean;
  onClose: () => void;
}

export default function MiniEditor({ generatedImageUrl, isDarkMode, onClose }: MiniEditorProps) {
  // --- CANVA INLINE EDITOR STATES ---
  const [canvasZoom, setCanvasZoom] = useState(100);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [canvasElements, setCanvasElements] = useState<Array<any>>([]);
  const [editorHistory, setEditorHistory] = useState<Array<Array<any>>>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activePopover, setActivePopover] = useState<string | null>(null); // 'add', 'font', 'color', 'align', 'dimensions', 'layers', 'effects'
  const [editorMode, setEditorMode] = useState<'default' | 'gib-select' | 'gib-prompt' | 'text' | 'shape' | 'image'>('default');

  // Interactive style state variables mirroring high-fidelity design
  const [textShadow, setTextShadow] = useState(36);
  const [textOutlineColor, setTextOutlineColor] = useState("#0F172A");
  const [textOutlineWidth, setTextOutlineWidth] = useState(2);
  const [textBgHighlight, setTextBgHighlight] = useState("transparent");
  const [textOpacity, setTextOpacity] = useState(92);
  const [textWeight, setTextWeight] = useState<'Light' | 'Regular' | 'Bold'>('Bold');
  const [gibPromptText, setGibPromptText] = useState("");

  const handleSelectElement = (id: string | null) => {
    setSelectedElementId(id);
    if (!id) {
      setEditorMode('default');
      return;
    }
    const el = canvasElements.find(e => e.id === id);
    if (el) {
      if (el.type === 'text') setEditorMode('text');
      else if (el.type === 'shape') setEditorMode('shape');
      else if (el.type === 'image') setEditorMode('image');
    }
  };

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

  // Initialize Canvas elements when component loads
  useEffect(() => {
    if (generatedImageUrl && canvasElements.length === 0) {
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
  }, [generatedImageUrl]);

  useEffect(() => {
    if (!dragState) return;

    const handleMouseMove = (e: MouseEvent) => {
      const canvasEl = document.getElementById("canvas-workspace-area-mini");
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
        const elDom = document.getElementById(`canvas-el-mini-${dragState.elementId}`);
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
    handleSelectElement(newEl.id);
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
    handleSelectElement(newEl.id);
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
    handleSelectElement(null);
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

  return (
    <div className="w-full h-full flex flex-col items-center justify-between select-none animate-in fade-in duration-300">
      
      {/* REDESIGNED MODE-SPECIFIC TOP TOOLBAR */}
      <div className={`w-full p-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2 shadow-sm mb-4 relative z-50 ${
        isDarkMode ? "bg-[#1E232D] border-[#2A3140]" : "bg-white border-slate-200"
      }`}>
        
        {/* TOOLBAR LEFT: Add Elements Menu & Generative Brush Edit */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setActivePopover(activePopover === 'add' ? null : 'add')}
              className={`px-2.5 py-1.5 rounded-lg text-[11.5px] font-extrabold flex items-center gap-1 cursor-pointer border transition-all whitespace-nowrap ${
                activePopover === 'add'
                  ? "bg-blue-50 border-blue-200 text-[#3B63F6]"
                  : isDarkMode
                    ? "bg-[#161B22] border-slate-800 text-slate-350 hover:bg-slate-800"
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
                  onClick={() => { addTextElement('title'); setActivePopover(null); setEditorMode('text'); }}
                  className={`w-full px-2.5 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                    isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-slate-50"
                  }`}
                >
                  <Type size={13} className="text-blue-500" />
                  <span>큰 제목 추가</span>
                </button>
                <button
                  onClick={() => { addTextElement('subtitle'); setActivePopover(null); setEditorMode('text'); }}
                  className={`w-full px-2.5 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                    isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-slate-50"
                  }`}
                >
                  <Type size={12} className="text-blue-400" />
                  <span>부제목 추가</span>
                </button>
                <button
                  onClick={() => { addTextElement('body'); setActivePopover(null); setEditorMode('text'); }}
                  className={`w-full px-2.5 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                    isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-slate-50"
                  }`}
                >
                  <Type size={11} className="text-slate-400" />
                  <span>본문 추가</span>
                </button>
                <div className={`my-1 border-t ${isDarkMode ? "border-slate-800" : "border-slate-100"}`} />
                <button
                  onClick={() => { addShapeElement('rect'); setActivePopover(null); setEditorMode('shape'); }}
                  className={`w-full px-2.5 py-2 rounded-lg text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                    isDarkMode ? "hover:bg-slate-800/80" : "hover:bg-slate-50"
                  }`}
                >
                  <Square size={13} className="text-emerald-500 fill-emerald-500/20" />
                  <span>사각형 추가</span>
                </button>
                <button
                  onClick={() => { addShapeElement('circle'); setActivePopover(null); setEditorMode('shape'); }}
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

          {/* 그려서 편집하기 Toggle Button */}
          <button
            onClick={() => {
              const newMode = (editorMode === 'gib-select' || editorMode === 'gib-prompt') ? 'default' : 'gib-select';
              setEditorMode(newMode);
              setSelectedElementId(null);
            }}
            className={`px-2.5 py-1.5 rounded-lg text-[11.5px] font-extrabold flex items-center gap-1 cursor-pointer border transition-all ${
              editorMode === 'gib-select' || editorMode === 'gib-prompt'
                ? "bg-blue-50 border-blue-200 text-[#3B63F6]"
                : isDarkMode
                  ? "bg-[#161B22] border-slate-800 text-slate-350 hover:bg-slate-800"
                  : "bg-slate-50 border-slate-200 text-[#334155] hover:bg-slate-100"
            }`}
          >
            <Sparkles size={12} className={editorMode === 'gib-select' || editorMode === 'gib-prompt' ? "text-[#3B63F6]" : "text-slate-500"} />
            <span>그려서 편집하기</span>
          </button>
        </div>

        {/* TOOLBAR CENTER: Dynamic selected elements properties */}
        <div className="flex-1 flex flex-wrap items-center justify-center gap-2 min-w-[220px]">
          {editorMode === 'text' && selectedElementId ? (
            (() => {
              const selEl = canvasElements.find(el => el.id === selectedElementId);
              if (!selEl) return null;
              return (
                <div className="flex flex-wrap items-center gap-1.5 animate-in fade-in duration-200">
                  {/* FONT SELECT DROPDOWN */}
                  <div className="relative">
                    <button
                      onClick={() => setActivePopover(activePopover === 'font' ? null : 'font')}
                      className={`h-8 px-2 rounded-md text-[11px] font-bold border flex items-center gap-1 cursor-pointer truncate max-w-[96px] whitespace-nowrap shrink-0 ${
                        isDarkMode ? "bg-[#161B22] border-slate-800 text-slate-355" : "bg-slate-50 border-slate-200 text-slate-700"
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

                  {/* COLOR SWATCH */}
                  <div className="relative">
                    <button
                      onClick={() => setActivePopover(activePopover === 'color' ? null : 'color')}
                      className={`h-8 px-2 rounded-md text-[11px] font-bold border flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        isDarkMode ? "bg-[#161B22] border-slate-800 text-slate-355" : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <div 
                        className="w-3.5 h-3.5 rounded border border-black/10" 
                        style={{ backgroundColor: selEl.color || "#1E293B" }} 
                      />
                    </button>
                    {activePopover === 'color' && (
                      <div className={`absolute left-0 top-[34px] w-48 rounded-xl border p-3 shadow-lg flex flex-col gap-2.5 animate-in slide-in-from-top-1 duration-150 ${
                        isDarkMode ? "bg-[#1B2028] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                      }`}>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">글자색 변경</span>
                        <div className="grid grid-cols-6 gap-1.5">
                          {["#1E293B", "#3B63F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6", "#F43F5E", "#06B6D4", "#EC4899", "#FFFFFF", "#F1F5F9", "#D9F99D"].map(color => (
                            <button
                              key={color}
                              onClick={() => { updateElementProperty(selectedElementId, 'color', color); setActivePopover(null); }}
                              className="w-6 h-6 rounded-md cursor-pointer border border-black/10 hover:scale-110 active:scale-95 transition-transform"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* B, I, U STYLING SHORTCUTS */}
                  <div className={`h-8 p-0.5 rounded-md border flex items-center gap-0.5 shrink-0 ${
                    isDarkMode ? "bg-[#161B22] border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <button
                      onClick={() => updateElementProperty(selectedElementId, 'bold', !selEl.bold)}
                      className={`w-6.5 h-6.5 rounded flex items-center justify-center cursor-pointer transition-colors ${
                        selEl.bold 
                          ? "bg-blue-50 text-[#3B63F6] font-extrabold" 
                          : isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <Bold size={11} />
                    </button>
                    <button
                      onClick={() => updateElementProperty(selectedElementId, 'italic', !selEl.italic)}
                      className={`w-6.5 h-6.5 rounded flex items-center justify-center cursor-pointer transition-colors ${
                        selEl.italic 
                          ? "bg-blue-50 text-[#3B63F6]" 
                          : isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <Italic size={11} />
                    </button>
                    <button
                      onClick={() => updateElementProperty(selectedElementId, 'underline', !selEl.underline)}
                      className={`w-6.5 h-6.5 rounded flex items-center justify-center cursor-pointer transition-colors ${
                        selEl.underline 
                          ? "bg-blue-50 text-[#3B63F6]" 
                          : isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      <Underline size={11} />
                    </button>
                  </div>

                  {/* DYNAMIC EFFECTS POPOVER (HIGH-FIDELITY DESIGN SPECIFICATION) */}
                  <div className="relative">
                    <button
                      onClick={() => setActivePopover(activePopover === 'effects' ? null : 'effects')}
                      className={`h-8 px-2 rounded-md text-[11px] font-extrabold border flex items-center gap-1 cursor-pointer transition-all ${
                        activePopover === 'effects'
                          ? "bg-blue-50 border-blue-200 text-[#3B63F6]"
                          : isDarkMode
                            ? "bg-[#161B22] border-slate-800 text-slate-355 hover:bg-[#202733]"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Wand2 size={11.5} className="text-[#3B63F6]" />
                      <span>효과</span>
                      <ChevronDown size={10} className="opacity-70" />
                    </button>
                    
                    {activePopover === 'effects' && (
                      <div 
                        className={`absolute z-[100] rounded-2xl p-4 shadow-xl border w-72 flex flex-col gap-3.5 animate-in slide-in-from-top-1.5 duration-200 ${
                          isDarkMode ? "bg-[#1E232D] border-slate-800 text-[#F8FAFC]" : "bg-white border-slate-200 text-slate-800"
                        }`}
                        style={{
                          top: "38px",
                          right: "-50px",
                        }}
                      >
                        {/* Shadow Effect Row */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-[11px] font-black text-slate-400 tracking-wider">
                            <span>그림자</span>
                            <span className="font-extrabold text-[#3B63F6]">{textShadow}</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={textShadow}
                            onChange={(e) => {
                              const v = parseInt(e.target.value);
                              setTextShadow(v);
                              updateElementProperty(selectedElementId, 'textShadow', v > 15);
                            }}
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2F6BFF]"
                          />
                        </div>

                        {/* Outline Effect Row */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-[11px] font-black text-slate-400 tracking-wider">
                            <span>외각선 두께</span>
                            <span className="font-extrabold text-[#3B63F6]">{textOutlineWidth}px</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="8"
                            value={textOutlineWidth}
                            onChange={(e) => {
                              const v = parseInt(e.target.value);
                              setTextOutlineWidth(v);
                              updateElementProperty(selectedElementId, 'textStroke', v > 0);
                            }}
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2F6BFF]"
                          />
                          <div className="flex items-center gap-1.5 mt-1">
                            {["#0F172A", "#FFFFFF", "#2F6BFF", "#10B981", "#EF4444"].map((c) => (
                              <button
                                key={c}
                                onClick={() => setTextOutlineColor(c)}
                                className={`w-5.5 h-5.5 rounded-md border flex items-center justify-center transition-transform ${
                                  textOutlineColor === c ? "scale-110 border-blue-500 border-2" : "border-slate-300"
                                }`}
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Background Highlight Swatches */}
                        <div className="flex flex-col gap-1.5">
                          <div className="text-[11px] font-black text-slate-400 tracking-wider">배경 강조 (형광펜)</div>
                          <div className="flex items-center gap-1.5">
                            {["transparent", "#FEF08A", "#BBF7D0", "#BFDBFE", "#FBCFE8"].map((c) => (
                              <button
                                key={c}
                                onClick={() => {
                                  setTextBgHighlight(c);
                                  updateElementProperty(selectedElementId, 'bgColor', c);
                                }}
                                className={`w-6.5 h-6.5 rounded-md border text-[9px] font-bold flex items-center justify-center transition-all ${
                                  textBgHighlight === c ? "scale-110 border-[#2F6BFF] border-2" : "border-slate-200"
                                }`}
                                style={{ backgroundColor: c === "transparent" ? "transparent" : c }}
                              >
                                {c === "transparent" && "X"}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Opacity Row */}
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-[11px] font-black text-slate-400 tracking-wider">
                            <span>투명도</span>
                            <span className="font-extrabold text-[#3B63F6]">{textOpacity}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={textOpacity}
                            onChange={(e) => {
                              const v = parseInt(e.target.value);
                              setTextOpacity(v);
                              updateElementProperty(selectedElementId, 'opacity', v / 100);
                            }}
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2F6BFF]"
                          />
                        </div>

                        {/* Font Weight Row */}
                        <div className="flex flex-col gap-1.5">
                          <div className="text-[11px] font-black text-slate-400 tracking-wider">글꼴 굵기</div>
                          <div className="inline-flex border border-slate-200 rounded-lg overflow-hidden text-[10.5px] font-semibold bg-white w-fit">
                            {["Light", "Regular", "Bold"].map((w) => (
                              <button
                                key={w}
                                onClick={() => {
                                  setTextWeight(w as any);
                                  updateElementProperty(selectedElementId, 'bold', w === 'Bold');
                                }}
                                className={`px-2.5 py-1 transition-colors ${
                                  textWeight === w 
                                    ? "bg-slate-900 text-white" 
                                    : "text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                {w}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          ) : editorMode === 'shape' && selectedElementId ? (
            (() => {
              const selEl = canvasElements.find(el => el.id === selectedElementId);
              if (!selEl) return null;
              return (
                <div className="flex flex-wrap items-center gap-1.5 animate-in fade-in duration-200">
                  <div className="relative">
                    <button
                      onClick={() => setActivePopover(activePopover === 'color' ? null : 'color')}
                      className={`h-8 px-2 rounded-md text-[11px] font-bold border flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                        isDarkMode ? "bg-[#161B22] border-slate-800 text-slate-355" : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      <div 
                        className="w-3.5 h-3.5 rounded border border-black/10" 
                        style={{ backgroundColor: selEl.fillColor || "#3B63F6" }} 
                      />
                      <span>채우기</span>
                    </button>
                    {activePopover === 'color' && (
                      <div className={`absolute left-0 top-[34px] w-48 rounded-xl border p-3 shadow-lg flex flex-col gap-2.5 animate-in slide-in-from-top-1 duration-150 ${
                        isDarkMode ? "bg-[#1B2028] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
                      }`}>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">도형 색 채우기</span>
                        <div className="grid grid-cols-6 gap-1.5">
                          {["#3B63F6", "#10B981", "#EF4444", "#F59E0B", "#8B5CF6", "#F43F5E", "#06B6D4", "#EC4899", "#FFFFFF", "#1E293B", "#F1F5F9", "#D9F99D"].map(color => (
                            <button
                              key={color}
                              onClick={() => { updateElementProperty(selectedElementId, 'fillColor', color); setActivePopover(null); }}
                              className="w-6 h-6 rounded-md cursor-pointer border border-black/10 hover:scale-110 active:scale-95 transition-transform"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={`h-8 px-1 rounded-md border flex items-center gap-0.5 whitespace-nowrap shrink-0 ${
                    isDarkMode ? "bg-[#161B22] border-slate-800" : "bg-slate-50 border-slate-200"
                  }`}>
                    <span className="text-[10px] font-bold text-slate-400 px-1">투명도</span>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={Math.round((selEl.opacity || 0.8) * 100)}
                      onChange={(e) => updateElementProperty(selectedElementId, 'opacity', parseInt(e.target.value) / 100)}
                      className="w-16 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              );
            })()
          ) : editorMode === 'image' && selectedElementId ? (
            <div className="flex items-center gap-1.5 animate-in fade-in duration-200">
              <button
                onClick={() => setEditorMode('gib-select')}
                className="h-8 px-2.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 bg-blue-50 text-[#3B63F6] border border-blue-200"
              >
                <Sparkles size={11} />
                <span>영역 그려서 편집</span>
              </button>
              <button className={`h-8 px-2.5 rounded-lg text-[11px] font-bold border ${
                isDarkMode ? "bg-[#161B22] border-slate-800 text-slate-355 hover:bg-slate-800" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}>
                <Crop size={11} className="inline mr-1" />
                <span>크롭</span>
              </button>
            </div>
          ) : (
            /* DEFAULT DOCK: Undo / Redo */
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold whitespace-nowrap">
              <button
                onClick={undoEditor}
                disabled={historyIndex === 0}
                className={`w-8 h-8 rounded-md flex items-center justify-center border transition-all ${
                  historyIndex === 0 ? "opacity-40 cursor-not-allowed" : "bg-slate-50 border-slate-150 hover:bg-slate-100 text-slate-750 cursor-pointer"
                }`}
                title="Undo"
              >
                <Undo2 size={12} />
              </button>
              <button
                onClick={redoEditor}
                disabled={historyIndex >= editorHistory.length - 1}
                className={`w-8 h-8 rounded-md flex items-center justify-center border transition-all ${
                  historyIndex >= editorHistory.length - 1 ? "opacity-40 cursor-not-allowed" : "bg-slate-50 border-slate-150 hover:bg-slate-100 text-slate-750 cursor-pointer"
                }`}
                title="Redo"
              >
                <Redo2 size={12} />
              </button>
              <span className="ml-1 opacity-70">요소를 추가하여 시안을 완성해보세요.</span>
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
                    ? "bg-[#161B22] border-slate-800 text-slate-355 hover:bg-slate-800"
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
                          onClick={() => handleSelectElement(el.id)}
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
                                title="앞으로"
                              >
                                ▲
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); moveElementOrder(el.id, 'back'); }}
                                className="hover:text-blue-600 text-[8px] font-black cursor-pointer leading-[6px] h-2.5 px-0.5"
                                title="뒤로"
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
            onClick={onClose}
            className={`px-2.5 py-1.5 rounded-lg text-[11.5px] font-extrabold cursor-pointer border transition-all whitespace-nowrap shrink-0 ${
              isDarkMode
                ? "bg-slate-800 border-slate-700 text-slate-355 hover:bg-slate-700"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
            }`}
          >
            닫기
          </button>
        </div>
      </div>

      {/* CANVAS DISPLAY WRAPPER (Gray background, 1:1 Canvas Centered) */}
      <div 
        onClick={() => { handleSelectElement(null); setActivePopover(null); }}
        className="flex-1 w-full bg-slate-150 rounded-2xl flex items-center justify-center p-6 relative overflow-hidden min-h-[360px]"
      >
        
        {/* THE 1:1 CANVAS CONTAINER */}
        <div
          id="canvas-workspace-area-mini"
          className={`aspect-square w-full max-w-[340px] max-h-[340px] bg-white shadow-xl relative overflow-hidden rounded-lg select-none ${
            editorMode === 'image' ? "outline outline-2 outline-[#2F6BFF] outline-offset-2" : ""
          }`}
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
                    id={`canvas-el-mini-${el.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectElement(el.id);
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
                    
                    {/* Double outline selection box */}
                    {isSelected && !el.locked && (
                      <>
                        <div className="absolute inset-0 border border-white pointer-events-none z-10" />
                        <div className="absolute inset-0 border-2 border-[#2F6BFF] pointer-events-none z-15" />
                      </>
                    )}
                  </div>
                );
              }

              if (el.type === 'shape') {
                return (
                  <div
                    key={el.id}
                    id={`canvas-el-mini-${el.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectElement(el.id);
                    }}
                    onMouseDown={(e) => {
                      if (el.locked) return;
                      e.stopPropagation();
                      handleSelectElement(el.id);
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
                      cursor: el.locked ? 'default' : 'move',
                      outline: isSelected ? "2px solid #2F6BFF" : "none",
                      outlineOffset: isSelected ? "3px" : "0px",
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
                        {/* corner handles */}
                        {[-1, 1].map(x => [-1, 1].map(y => (
                          <div
                            key={`${x}-${y}`}
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
                                handle: x < 0 ? (y < 0 ? 'tl' : 'bl') : (y < 0 ? 'tr' : 'br')
                              });
                            }}
                            className="absolute w-2 h-2 bg-white rounded-sm z-30 cursor-se-resize"
                            style={{
                              left: x < 0 ? -8 : "auto",
                              right: x > 0 ? -8 : "auto",
                              top: y < 0 ? -8 : "auto",
                              bottom: y > 0 ? -8 : "auto",
                              border: "1.5px solid #2F6BFF",
                            }}
                          />
                        )))}

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
                    id={`canvas-el-mini-${el.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectElement(el.id);
                    }}
                    onMouseDown={(e) => {
                      if (el.locked || editingTextId === el.id) return;
                      e.stopPropagation();
                      handleSelectElement(el.id);
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
                      cursor: el.locked ? 'default' : editingTextId === el.id ? 'text' : 'move',
                      outline: isSelected ? "2px solid #2F6BFF" : "none",
                      outlineOffset: isSelected ? "3px" : "0px",
                      borderRadius: "4px"
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
                      className="w-full h-full bg-transparent focus:outline-none focus:ring-0 whitespace-pre-wrap select-text"
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
                        {/* corner handles */}
                        {[-1, 1].map(x => [-1, 1].map(y => (
                          <div
                            key={`${x}-${y}`}
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
                                handle: x < 0 ? (y < 0 ? 'tl' : 'bl') : (y < 0 ? 'tr' : 'br')
                              });
                            }}
                            className="absolute w-2 h-2 bg-white rounded-sm z-30 cursor-se-resize"
                            style={{
                              left: x < 0 ? -8 : "auto",
                              right: x > 0 ? -8 : "auto",
                              top: y < 0 ? -8 : "auto",
                              bottom: y > 0 ? -8 : "auto",
                              border: "1.5px solid #2F6BFF",
                            }}
                          />
                        )))}

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

          {/* HIGH-FIDELITY INTERACTIVE CANVAS OVERLAYS */}
          {(editorMode === 'gib-select' || editorMode === 'gib-prompt') && (
            <>
              {/* dark mask outside selection */}
              <div className="absolute inset-0 pointer-events-none z-40 bg-black/45" style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 30%, 28% 30%, 28% 78%, 76% 78%, 76% 30%, 0 30%)",
              }} />
              {/* selection box */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  setEditorMode('gib-prompt');
                }}
                className="absolute z-45 cursor-pointer" 
                style={{
                  left: "28%", top: "30%", width: "48%", height: "48%",
                  border: "2px dashed #2F6BFF",
                  background: "rgba(47,107,255,.05)",
                  borderRadius: 6,
                }}
              >
                {/* corner handles */}
                {[-1, 1].map(x => [-1, 1].map(y => (
                  <span key={`${x}-${y}`} className="absolute w-2.5 h-2.5 bg-white rounded-sm" style={{
                    left: x < 0 ? -5 : "auto",
                    right: x > 0 ? -5 : "auto",
                    top: y < 0 ? -5 : "auto",
                    bottom: y > 0 ? -5 : "auto",
                    border: "2px solid #2F6BFF",
                    boxShadow: "0 1px 2px rgba(15,23,42,.18)",
                  }} />
                )))}
                {/* size badge */}
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-white text-[9.5px] font-bold whitespace-nowrap bg-[#2F6BFF] shadow-md select-none">
                  선택 영역 232 × 232
                </span>
              </div>
            </>
          )}
        </div>

        {/* MODE-SPECIFIC BOTTOM TOOLBAR (DOCKBAR) */}
        {editorMode === 'gib-prompt' || editorMode === 'gib-select' ? (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-5 z-20 w-[92%] max-w-[540px] flex flex-col items-center gap-2">
            {/* Suggestion chips */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center select-none">
              {["배경을 바다로", "사람 제거", "노트북 추가", "미소 짓는 얼굴로"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setGibPromptText(t);
                    setEditorMode('gib-prompt');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10.5px] font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer shadow-sm active:scale-95 transition-all"
                >
                  <Sparkles size={10} className="text-slate-400" />
                  {t}
                </button>
              ))}
            </div>
            {/* Prompt input field */}
            <div className="w-full bg-white rounded-2xl flex items-center gap-2 pl-4 pr-1 py-1 border-2 border-[#2F6BFF] shadow-[0_0_0_4px_#EEF3FF,0_6px_22px_rgba(15,23,42,.10)] text-left">
              <Sparkles size={14} className="text-[#2F6BFF] shrink-0" />
              <input
                type="text"
                value={gibPromptText}
                onChange={(e) => {
                  setGibPromptText(e.target.value);
                  if (editorMode === 'gib-select') setEditorMode('gib-prompt');
                }}
                placeholder="선택 영역에 대해 수정할 내용을 입력하세요"
                className="text-[12.5px] font-medium text-slate-800 placeholder-slate-400 w-full bg-transparent border-0 outline-none focus:ring-0 py-1.5"
              />
              <button
                onClick={() => {
                  if (!gibPromptText.trim()) {
                    alert("변경할 내용을 먼저 입력해 주세요.");
                    return;
                  }
                  alert(`"${gibPromptText}" 내용으로 AI 부분 생성을 시작합니다.`);
                  setEditorMode('default');
                  setGibPromptText("");
                }}
                className="inline-flex items-center gap-1 h-9 px-4 rounded-xl text-white text-[11.5px] font-extrabold bg-[#2F6BFF] hover:bg-blue-600 transition-colors cursor-pointer select-none active:scale-95 shrink-0"
              >
                AI 다시 생성
              </button>
            </div>
          </div>
        ) : (
          /* Standard DockBar */
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-5 z-20 inline-flex items-center gap-1 bg-[#0F172A]/90 backdrop-blur-md rounded-2xl px-3 py-1.5 shadow-lg select-none"
          >
            <button
              onClick={() => setCanvasZoom(Math.max(50, canvasZoom - 10))}
              className="w-7 h-7 rounded flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
              title="축소"
            >
              -
            </button>
            <span className="px-1.5 text-[11.5px] font-bold text-white select-none tabular-nums">{canvasZoom}%</span>
            <button
              onClick={() => setCanvasZoom(Math.min(150, canvasZoom + 10))}
              className="w-7 h-7 rounded flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
              title="확대"
            >
              +
            </button>
            <span className="w-px h-3.5 bg-white/15 mx-1.5" />
            <button
              onClick={undoEditor}
              disabled={historyIndex === 0}
              className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
                historyIndex === 0 ? "opacity-30 cursor-not-allowed text-slate-500" : "text-slate-355 hover:bg-white/10 hover:text-white cursor-pointer"
              }`}
              title="실행 취소"
            >
              <Undo2 size={12} />
            </button>
            <button
              onClick={redoEditor}
              disabled={historyIndex >= editorHistory.length - 1}
              className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
                historyIndex >= editorHistory.length - 1 ? "opacity-30 cursor-not-allowed text-slate-500" : "text-slate-355 hover:bg-white/10 hover:text-white cursor-pointer"
              }`}
              title="다시 실행"
            >
              <Redo2 size={12} />
            </button>
            <span className="w-px h-3.5 bg-white/15 mx-1.5" />
            <button
              onClick={() => {
                if (confirm("정말 편집 내용을 초기화하시겠습니까?")) {
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
                  handleSelectElement(null);
                }
              }}
              className="h-7 px-2 rounded flex items-center justify-center text-[10.5px] font-bold text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
            >
              초기화
            </button>
            <button
              onClick={() => {
                handleSelectElement(null);
                alert("디자인 편집 완료 후 저장되었습니다.");
                onClose();
              }}
              className="h-7 px-3 rounded-lg text-[10.5px] font-black text-white bg-[#2F6BFF] hover:bg-blue-600 cursor-pointer active:scale-95 transition-all select-none ml-1"
            >
              편집 완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
