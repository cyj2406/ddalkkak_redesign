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
  RotateCw
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

  return (
    <div className="w-full h-full flex flex-col items-center justify-between select-none animate-in fade-in duration-300">
      
      {/* COMPACT TOOLBAR (Flexible Rows for Small Space) */}
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

        {/* TOOLBAR CENTER: Selected element properties dynamically active */}
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
                      {/* FONT FAMILY DROPDOWN */}
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

                      {/* SIZE +/- CONTROL PANEL */}
                      <div className={`h-8 px-1 rounded-md border flex items-center gap-0.5 whitespace-nowrap shrink-0 ${
                        isDarkMode ? "bg-[#161B22] border-slate-800" : "bg-slate-50 border-slate-200"
                      }`}>
                        <button
                          onClick={() => updateElementProperty(selectedElementId, 'fontSize', Math.max(8, (selEl.fontSize || 12) - 1))}
                          className="w-5 h-6 rounded flex items-center justify-center font-bold text-[11px] cursor-pointer hover:bg-slate-200/50"
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
                          className="w-5 h-6 rounded flex items-center justify-center font-bold text-[11px] cursor-pointer hover:bg-slate-200/50"
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
                            selEl.bold ? "bg-blue-150 text-[#3B63F6] font-black" : "text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          <Bold size={11} />
                        </button>
                        <button
                          onClick={() => updateElementProperty(selectedElementId, 'italic', !selEl.italic)}
                          className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-colors ${
                            selEl.italic ? "bg-blue-150 text-[#3B63F6]" : "text-slate-500 hover:bg-slate-200"
                          }`}
                        >
                          <Italic size={11} />
                        </button>
                        <button
                          onClick={() => updateElementProperty(selectedElementId, 'underline', !selEl.underline)}
                          className={`w-6 h-6 rounded flex items-center justify-center cursor-pointer transition-colors ${
                            selEl.underline ? "bg-blue-150 text-[#3B63F6]" : "text-slate-500 hover:bg-slate-200"
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
                              className="w-6 h-6 rounded-md cursor-pointer border border-black/10 hover:scale-110 active:scale-95 transition-transform"
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
                                  className="w-6 h-6 rounded-md cursor-pointer border border-slate-200 flex items-center justify-center text-[8px] font-bold"
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
                        className={`h-8 w-8 rounded-md border flex items-center justify-center cursor-pointer shrink-0 ${
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
                      className={`h-8 px-2 rounded-md text-[11px] font-bold border flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
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
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">X%</label>
                            <input
                              type="number"
                              value={Math.round(selEl.x)}
                              onChange={(e) => updateElementProperty(selectedElementId, 'x', parseFloat(e.target.value) || 0)}
                              className="w-full h-7 text-[11px] font-bold px-1.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">Y%</label>
                            <input
                              type="number"
                              value={Math.round(selEl.y)}
                              onChange={(e) => updateElementProperty(selectedElementId, 'y', parseFloat(e.target.value) || 0)}
                              className="w-full h-7 text-[11px] font-bold px-1.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">W%</label>
                            <input
                              type="number"
                              value={Math.round(selEl.width)}
                              onChange={(e) => updateElementProperty(selectedElementId, 'width', Math.max(2, parseFloat(e.target.value) || 10))}
                              className="w-full h-7 text-[11px] font-bold px-1.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-400 block mb-0.5">H%</label>
                            <input
                              type="number"
                              value={Math.round(selEl.height)}
                              onChange={(e) => updateElementProperty(selectedElementId, 'height', Math.max(2, parseFloat(e.target.value) || 10))}
                              className="w-full h-7 text-[11px] font-bold px-1.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2.5 mt-1 text-[9px] text-slate-400 select-none">
                          <span>회전: <strong>{selEl.rotation || 0}°</strong></span>
                          <button 
                            onClick={() => updateElementProperty(selectedElementId, 'rotation', ((selEl.rotation || 0) + 90) % 360)}
                            className="text-blue-500 font-extrabold hover:underline cursor-pointer"
                          >
                            +90°
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* DELETE BUTTON */}
                  {!selEl.locked && (
                    <button
                      onClick={() => deleteElement(selectedElementId)}
                      className="h-8 w-8 rounded-md border flex items-center justify-center cursor-pointer hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-500"
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
            <span>더블클릭하여 텍스트 인라인 수정</span>
          </span>
          <div className="flex items-center gap-2">
            <span>확대/축소:</span>
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
  );
}
