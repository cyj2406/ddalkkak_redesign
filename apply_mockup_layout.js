const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Chat Pane Header - Left-aligned back button and Centered Workspace Title
const originalChatHeader = `              {/* Chat Pane Header */}
              <div className={\`h-14 px-6 flex items-center justify-between shrink-0 border-b \${
                isDarkMode
                  ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                  : "bg-white border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              }\`}>
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
                      className={\`text-[13.5px] font-extrabold tracking-tight bg-transparent outline-none focus:ring-0 w-[260px] px-1 py-0.5 animate-in fade-in duration-100 border-b-2 \${
                        isDarkMode ? "text-[#F8FAFC] border-[#6D8FFF]" : "text-slate-800 border-blue-500"
                      }\`}
                      autoFocus
                    />
                  ) : (
                    <div 
                      onClick={() => setIsEditingWorkspaceTitle(true)}
                      className={\`flex items-center gap-1.5 cursor-pointer group select-none px-2.5 py-1 rounded-xl transition-all border shadow-sm/5 hover:shadow-inner \${
                        isDarkMode
                          ? "hover:bg-[#252B36] border-transparent hover:border-[#2A3140]"
                          : "hover:bg-slate-50 border-transparent hover:border-slate-150"
                      }\`}
                      title="작업 스페이스 이름 변경"
                    >
                      <span className={\`text-[13.5px] font-extrabold tracking-tight \${
                        isDarkMode ? "text-[#F8FAFC]" : "text-slate-850"
                      }\`}>
                        {workspaceTitle}
                      </span>
                      <Pencil size={11} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 shrink-0" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsWorkspaceActive(false)}
                  className={\`flex items-center gap-1 text-[12px] font-bold transition-colors cursor-pointer px-3 py-1.5 rounded-full border shadow-sm \${
                    isDarkMode
                      ? "text-slate-400 hover:text-[#6D8FFF] bg-slate-800 hover:bg-[#252B36] border-[#2A3140] hover:border-blue-900"
                      : "text-slate-500 hover:text-[#3B63F6] bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-100"
                  }\`}
                >
                  <ArrowLeft size={13} />
                  <span>대시보드로 돌아가기</span>
                </button>
              </div>`;

const newChatHeader = `              {/* Chat Pane Header */}
              <div className={\`h-14 px-6 flex items-center justify-between shrink-0 border-b relative \${
                isDarkMode
                  ? "bg-[#1E232D] border-[#2A3140]"
                  : "bg-white border-[#E2E8F0]"
              }\`}>
                {/* Left back button */}
                <button
                  onClick={() => setIsWorkspaceActive(false)}
                  className={\`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-600 \${
                    isDarkMode ? "hover:bg-[#252B36] hover:text-white" : "hover:bg-slate-100 hover:text-slate-800"
                  }\`}
                >
                  <ChevronLeft size={18} />
                </button>

                {/* Center Title */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <span className={\`text-[13.5px] font-extrabold tracking-tight \${
                    isDarkMode ? "text-[#F8FAFC]" : "text-slate-850"
                  }\`}>
                    {workspaceTitle}
                  </span>
                </div>

                {/* Right empty spacing block */}
                <div className="w-8" />
              </div>`;

if (content.includes(originalChatHeader)) {
  content = content.replace(originalChatHeader, newChatHeader);
  console.log("1. Chat Pane Header updated successfully!");
} else {
  console.log("Error: Chat Pane Header matching block not found!");
}

// 2. Editor Header - borderless 20px size icons (Share, Upload/Download, MoreHorizontal), no borders, no credits charging modal trigger button
const originalEditorHeader = `              {/* Editor Header */}
              <div className={\`h-14 px-4.5 flex items-center justify-between shrink-0 border-b \${
                isDarkMode 
                  ? "bg-[#1E232D] border-[#2A3140] shadow-none" 
                  : "bg-white border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              }\`}>
                <button
                  onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                  className={\`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer border shadow-sm \${
                    isDarkMode
                      ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                      : "bg-white border-slate-150 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }\`}
                  title={isRightPanelCollapsed ? "패널 펼치기" : "패널 접기"}
                >
                  <PanelRightClose size={15} />
                </button>
                
                <div className="flex items-center gap-1.5">
                  {/* Credit Badge inside editor header */}
                  <button 
                    onClick={() => setIsCreditModalOpen(true)}
                    className={\`flex items-center gap-1.5 rounded-full py-1 px-3 shadow-[0_1px_2.5px_rgba(59,99,246,0.06)] hover:scale-102 active:scale-97 transition-all cursor-pointer mr-1 select-none border \${
                      isDarkMode
                        ? "bg-blue-950/20 hover:bg-blue-900/30 border-blue-900/30 text-[#6D8FFF]"
                        : "bg-blue-50/70 hover:bg-blue-100/70 border-blue-100 text-[#3B63F6]"
                    }\`}
                    title="크레딧 충전"
                  >
                    <div className={\`w-4 h-4 rounded-full flex items-center justify-center text-white font-bold text-[8.5px] \${
                      isDarkMode ? "bg-[#6D8FFF]" : "bg-[#3B63F6]"
                    }\`}>
                      C
                    </div>
                    <span className="text-[12px] font-extrabold tracking-tight leading-none">
                      {userCredits.toLocaleString()}
                    </span>
                  </button>

                  <button className={\`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer border shadow-sm \${
                    isDarkMode
                      ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                      : "bg-white border-slate-150 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }\`} title="공유하기">
                    <Share2 size={14} />
                  </button>
                  <button className={\`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer border shadow-sm \${
                    isDarkMode
                      ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                      : "bg-white border-slate-150 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }\`} title="다운로드">
                    <Download size={14} />
                  </button>
                  <button className={\`w-8.5 h-8.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer border shadow-sm \${
                    isDarkMode
                      ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                      : "bg-white border-slate-150 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }\`} title="더 보기">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>`;

const newEditorHeader = `              {/* Editor Header */}
              <div className={\`h-14 px-6 flex items-center justify-between shrink-0 border-b \${
                isDarkMode 
                  ? "bg-[#1E232D] border-[#2A3140]" 
                  : "bg-white border-slate-200"
              }\`}>
                <button
                  onClick={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
                  className={\`w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-600 \${
                    isDarkMode ? "hover:bg-[#252B36] hover:text-white" : "hover:bg-slate-100 hover:text-slate-800"
                  }\`}
                  title={isRightPanelCollapsed ? "패널 펼치기" : "패널 접기"}
                >
                  <Columns size={20} />
                </button>
                
                <div className="flex items-center gap-4">
                  <button className={\`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-600 \${
                    isDarkMode ? "hover:text-[#F8FAFC]" : "hover:text-slate-800"
                  }\`} title="공유하기">
                    <Share2 size={20} />
                  </button>
                  <button className={\`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-600 \${
                    isDarkMode ? "hover:text-[#F8FAFC]" : "hover:text-slate-800"
                  }\`} title="내보내기">
                    <Upload size={20} />
                  </button>
                  <button className={\`w-9 h-9 flex items-center justify-center transition-colors cursor-pointer text-slate-400 hover:text-slate-600 \${
                    isDarkMode ? "hover:text-[#F8FAFC]" : "hover:text-slate-800"
                  }\`} title="더 보기">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>`;

if (content.includes(originalEditorHeader)) {
  content = content.replace(originalEditorHeader, newEditorHeader);
  console.log("2. Editor Header updated successfully!");
} else {
  console.log("Error: Editor Header matching block not found!");
}

// 3. Complete Chat Input section (hidden inputs, chips layout and input bar styling)
const originalComposerBlock = `              {/* Chat Composer Workspace (Bottom Section) */}
              <div className={\`p-4 border-t shrink-0 \${
                isDarkMode 
                  ? "bg-[#1E232D] border-[#2A3140] shadow-none" 
                  : "bg-white border-[#E2E8F0] shadow-[0_-4px_16px_rgba(0,0,0,0.02)]"
              }\`}>
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
                  {/* Inpainting state badge */}
                  {isInpainting && (
                    <div className={\`flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold shadow-sm transition-all border \${
                      isDarkMode
                        ? "bg-[#3B63F6]/12 border-blue-900/30 text-[#6D8FFF]"
                        : "bg-[#EFF6FF] border border-blue-200 text-[#3B63F6]"
                    }\`}>
                      <span>🪄 선택 영역 부분 수정</span>
                      <button
                        onClick={() => setIsInpainting(false)}
                        className={\`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold ml-1 transition-colors cursor-pointer \${
                          isDarkMode
                            ? "bg-slate-700 hover:bg-slate-650 text-[#6D8FFF]"
                            : "bg-blue-100 hover:bg-blue-200 text-[#3B63F6]"
                        }\`}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {isInpainting && (
                    <span className={\`text-[11px] font-medium leading-none mr-2 \${isDarkMode ? "text-slate-500" : "text-slate-400"}\`}>
                      전체가 아닌 선택한 부분만 다시 생성합니다.
                    </span>
                  )}
                  {/* B표시 베이스 이미지 */}
                    <div className={\`flex items-center gap-1.5 pl-1.5 pr-3 py-1 rounded-xl text-[12px] font-bold shadow-sm transition-all group relative border \${
                      isDarkMode
                        ? "bg-[#EA580C]/12 border-[#EA580C]/30 text-[#EA580C]"
                        : "bg-[#FFF5F2] border-[#FFD9D0] text-[#EA580C]"
                    }\`}>
                      {/* Small thumbnail preview */}
                      <div className={\`w-5.5 h-5.5 rounded-lg overflow-hidden shrink-0 bg-white border \${
                        isDarkMode ? "border-[#EA580C]/20" : "border-[#FFD9D0]/50"
                      }\`}>
                        <img src={baseImage.url} className="w-full h-full object-cover animate-in fade-in duration-200" />
                      </div>
                      <span className="w-4.5 h-4.5 rounded-md bg-[#EA580C] text-white flex items-center justify-center text-[9px] font-black shrink-0 shadow-sm select-none">B</span>
                      <span className="tracking-tight max-w-[100px] truncate">{baseImage.name}</span>
                      <button
                        onClick={() => setBaseImage(null)}
                        className={\`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-colors cursor-pointer \${
                          isDarkMode
                            ? "bg-[#EA580C]/20 hover:bg-[#EA580C]/35 text-[#EA580C]"
                            : "bg-[#FFEAE6] hover:bg-[#FFD3CA] text-[#EA580C]"
                        }\`}
                        title="베이스 이미지 삭제"
                      >
                        ✕
                      </button>

                      {/* Premium Hover Card Preview (Matching User Screenshot) */}
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-250 z-50 pointer-events-none group-hover:pointer-events-auto">
                        <div className={\`w-40 h-40 border-3 rounded-[24px] p-2 relative select-none animate-in fade-in zoom-in-95 duration-150 \${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#EA580C] shadow-none"
                            : "bg-white border-[#FFA085] shadow-[0_12px_36px_rgba(234,88,12,0.18)]"
                        }\`}>
                          {/* Image inside */}
                          <div className={\`w-full h-full rounded-[16px] overflow-hidden relative \${
                            isDarkMode ? "bg-slate-800" : "bg-slate-50"
                          }\`}>
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
                            className={\`absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full text-white flex items-center justify-center text-[9px] font-extrabold shadow-md border-2 border-white transition-colors cursor-pointer \${
                              isDarkMode ? "bg-slate-800 hover:bg-slate-900" : "bg-[#1E293B] hover:bg-slate-900"
                            }\`}
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
                        className={\`flex items-center gap-1.5 px-3 h-7.5 rounded-xl border border-dashed text-[11.5px] font-bold active:scale-95 transition-all shadow-sm cursor-pointer select-none \${
                          isDarkMode
                            ? "border-[#EA580C]/30 bg-[#EA580C]/12 text-[#EA580C] hover:bg-[#EA580C]/20"
                            : "border-[#FFD9D0] bg-[#FFF8F6] text-[#EA580C] hover:bg-[#FFEAE6]"
                        }\`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                        <span>* 베이스 추가 +</span>
                      </button>
                      
                      {isBasePopoverOpen && (
                        <div className={\`absolute left-0 bottom-full mb-2 w-[190px] rounded-2xl py-1.5 animate-in fade-in slide-in-from-bottom-1 duration-150 border z-50 \${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                            : "bg-white border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        }\`}>
                          <button
                            onClick={() => {
                              baseFileInputRef.current?.click();
                              setIsBasePopoverOpen(false);
                            }}
                            className={\`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors \${
                              isDarkMode ? "text-slate-350 hover:bg-[#252B36]" : "text-slate-700 hover:bg-slate-50"
                            }\`}
                          >
                            <Paperclip size={13} className="text-slate-400" />
                            컴퓨터 파일 업로드
                          </button>
                          <button
                            onClick={setGeneratedAsBase}
                            disabled={!generatedImageUrl}
                            className={\`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors \${
                              generatedImageUrl 
                                ? "text-[#EA580C] " + (isDarkMode ? "hover:bg-[#EA580C]/10" : "hover:bg-[#FFF8F6]")
                                : (isDarkMode ? "text-slate-650 cursor-not-allowed" : "text-slate-300 cursor-not-allowed")
                            }\`}
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
                    <div key={idx} className={\`flex items-center gap-1.5 pl-1.5 pr-3 py-1 rounded-xl text-[12px] font-bold shadow-sm transition-all group relative border \${
                      isDarkMode
                        ? "bg-[#3B63F6]/12 border-blue-900/30 text-[#6D8FFF]"
                        : "bg-[#EFF6FF] border border-blue-200 text-[#3B63F6]"
                    }\`}>
                      {/* Small thumbnail preview */}
                      <div className={\`w-5.5 h-5.5 rounded-lg overflow-hidden shrink-0 bg-white border \${
                        isDarkMode ? "border-blue-900/20" : "border-blue-100/50"
                      }\`}>
                        <img src={refImg.url} className="w-full h-full object-cover animate-in fade-in duration-200" />
                      </div>
                      <span className="w-4.5 h-4.5 rounded-md bg-[#3B63F6] text-white flex items-center justify-center text-[9px] font-black shrink-0 shadow-sm select-none">R</span>
                      <span className="tracking-tight max-w-[100px] truncate">{refImg.name}</span>
                      <button
                        onClick={() => {
                          setReferenceImages(referenceImages.filter((_, rIdx) => rIdx !== idx));
                        }}
                        className={\`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-colors cursor-pointer \${
                          isDarkMode
                            ? "bg-slate-700 hover:bg-slate-650 text-[#6D8FFF]"
                            : "bg-blue-100 hover:bg-blue-200 text-[#3B63F6]"
                        }\`}
                        title="참조 이미지 삭제"
                      >
                        ✕
                      </button>

                      {/* Premium Hover Card Preview (Matching User Screenshot) */}
                      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-250 z-50 pointer-events-none group-hover:pointer-events-auto">
                        <div className={\`w-40 h-40 border-3 rounded-[24px] p-2 relative select-none animate-in fade-in zoom-in-95 duration-150 \${
                          isDarkMode
                            ? "bg-[#1E232D] border-blue-900 shadow-none"
                            : "bg-white border-blue-400 shadow-[0_12px_36px_rgba(59,99,246,0.18)]"
                        }\`}>
                          {/* Image inside */}
                          <div className={\`w-full h-full rounded-[16px] overflow-hidden relative \${
                            isDarkMode ? "bg-slate-800" : "bg-slate-50"
                          }\`}>
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
                            className={\`absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full text-white flex items-center justify-center text-[9px] font-extrabold shadow-md border-2 border-white transition-colors cursor-pointer \${
                              isDarkMode ? "bg-slate-800 hover:bg-slate-900" : "bg-[#1E293B] hover:bg-slate-900"
                            }\`}
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
                        className={\`flex items-center gap-1 px-3 h-7.5 rounded-xl border border-dashed text-[11.5px] font-bold active:scale-95 transition-all shadow-sm cursor-pointer select-none \${
                          isDarkMode
                            ? "border-blue-900/40 bg-blue-950/20 text-[#6D8FFF] hover:bg-blue-950/40"
                            : "border-blue-200 bg-[#EFF6FF]/40 text-[#3B63F6] hover:bg-[#EFF6FF]"
                        }\`}
                      >
                        <span>+ 참조 추가</span>
                      </button>
                      
                      {isRefPopoverOpen && (
                        <div className={\`absolute left-0 bottom-full mb-2 w-[190px] rounded-2xl py-1.5 animate-in fade-in slide-in-from-bottom-1 duration-150 border z-50 \${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                            : "bg-white border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        }\`}>
                          <button
                            onClick={() => {
                              refFileInputRef.current?.click();
                              setIsRefPopoverOpen(false);
                            }}
                            className={\`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors \${
                              isDarkMode ? "text-slate-350 hover:bg-[#252B36]" : "text-slate-700 hover:bg-slate-50"
                            }\`}
                          >
                            <Paperclip size={13} className="text-slate-400" />
                            컴퓨터 파일 업로드
                          </button>
                          <button
                            onClick={setGeneratedAsReference}
                            disabled={!generatedImageUrl}
                            className={\`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors \${
                              generatedImageUrl 
                                ? "text-[#3B63F6] " + (isDarkMode ? "hover:bg-slate-800" : "hover:bg-[#EFF6FF]")
                                : (isDarkMode ? "text-slate-650 cursor-not-allowed" : "text-slate-300 cursor-not-allowed")
                            }\`}
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
                <div className={\`flex items-center rounded-[20px] px-3.5 py-2.5 shadow-sm transition-all relative border \${
                  isDarkMode
                    ? "bg-[#1B1F27] border-[#2A3140] focus-within:border-[#6D8FFF] focus-within:bg-[#1B1F27] focus-within:ring-2 focus-within:ring-slate-800"
                    : "bg-slate-50 border border-slate-200 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100"
                }\`}>
                  {/* Left Side Tools: Clip Upload + Skill Selection dropdown */}
                  <div className="flex items-center gap-2 relative">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={\`w-8.5 h-8.5 rounded-full flex items-center justify-center active:scale-95 shadow-sm transition-all cursor-pointer shrink-0 border \${
                        isDarkMode
                          ? "bg-[#1E232D] border-[#2A3140] text-slate-400 hover:bg-[#252B36]"
                          : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100"
                      }\`}
                      title="첨부파일 추가"
                    >
                      <Paperclip size={14} />
                    </button>

                    {/* Skill selection dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
                        className={\`flex items-center gap-1 px-3 h-8.5 rounded-full font-bold text-[12px] active:scale-95 transition-all shadow-sm cursor-pointer shrink-0 border \${
                          isDarkMode
                            ? selectedSkill || isSkillDropdownOpen
                              ? "border-blue-900 bg-blue-950/20 text-[#6D8FFF]"
                              : "border-[#2A3140] text-slate-300 bg-[#1E232D] hover:bg-[#252B36]"
                            : selectedSkill || isSkillDropdownOpen
                              ? "border-blue-200 bg-blue-50/50 text-[#3B63F6]"
                              : "border-slate-200 text-slate-600 bg-white hover:bg-slate-100"
                        }\`}
                      >
                        <Sparkles size={12} className={selectedSkill ? (isDarkMode ? "text-[#6D8FFF]" : "text-[#3B63F6]") : "text-slate-400"} />
                        <span>{selectedSkill ? \`\${selectedSkill}\` : "스킬 선택"}</span>
                        <ChevronDown size={12} className={\`text-slate-400 transition-transform duration-200 \${isSkillDropdownOpen ? "rotate-180" : ""}\`} />
                      </button>

                      {/* Skill dropdown list */}
                      {isSkillDropdownOpen && (
                        <div className={\`absolute left-0 bottom-full mb-2 w-[160px] rounded-[18px] z-40 py-1.5 overflow-hidden animate-in fade-in slide-in-from-bottom-1 duration-150 border \${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                            : "bg-white border border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                        }\`}>
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
                              className={\`w-full text-left px-4 py-2 text-[12px] font-semibold flex items-center justify-between transition-colors cursor-pointer \${
                                selectedSkill === skill || (skill === "스킬 초기화" && !selectedSkill)
                                  ? isDarkMode
                                    ? "text-[#6D8FFF] bg-slate-800"
                                    : "text-[#3B63F6] bg-[#EFF6FF]/65"
                                  : isDarkMode
                                    ? "text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                                    : "text-slate-650 hover:bg-[#F8FAFC] hover:text-slate-950"
                              }\`}
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
                    placeholder={isInpainting ? "선택한 영역을 어떻게 바꿀까요? (예: 배경을 바다로)" : "무엇을 만들까요? 대화로 자유롭게 요청하거나 템플릿을 선택해 보세요!"}
                    className={\`flex-1 bg-transparent border-none outline-none px-4 text-[13.5px] font-semibold \${
                      isDarkMode ? "text-[#F8FAFC] placeholder-slate-500" : "text-slate-800 placeholder-slate-400"
                    }\`}
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
                    className={\`w-9 h-9 rounded-full active:scale-95 flex items-center justify-center transition-all shadow-sm cursor-pointer shrink-0 ml-1.5 \${
                      isDarkMode ? "bg-[#6D8FFF] hover:bg-[#4F7BFF]" : "bg-[#3B63F6] hover:bg-blue-700"
                    }\`}
                  >
                    <ArrowUp size={16} strokeWidth={2.5} className="text-white" />
                  </button>
                </div>
                
                <p className={\`text-[10px] font-medium text-center mt-2.5 tracking-tight select-none \${
                  isDarkMode ? "text-slate-500" : "text-slate-400"
                }\`}>
                  생성된 이미지는 사실과 다를 수 있습니다. 결과물 사용 전 직접 확인해 주세요.
                </p>
              </div>`;

const newComposerBlock = `              {/* Chat Composer Workspace (Bottom Section) */}
              <div className={\`p-4 border-t shrink-0 \${
                isDarkMode 
                  ? "bg-[#1E232D] border-[#2A3140] shadow-none" 
                  : "bg-white border-[#E2E8F0] shadow-[0_-4px_16px_rgba(0,0,0,0.01)]"
              }\`}>
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
                    <div className={\`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-bold shadow-sm transition-all relative border \${
                      isDarkMode
                        ? "bg-[#EA580C]/12 border-[#EA580C]/30 text-[#EA580C]"
                        : "bg-[#FFF8F6] border-[#FFD9D0] text-[#EA580C]"
                    }\`}>
                      <span className="w-4 h-4 rounded-md bg-[#EA580C] text-white flex items-center justify-center text-[8.5px] font-black shrink-0 shadow-sm">B</span>
                      <span className="tracking-tight max-w-[120px] truncate">{baseImage.name}</span>
                      <button
                        onClick={() => setBaseImage(null)}
                        className={\`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors cursor-pointer \${
                          isDarkMode ? "hover:bg-[#EA580C]/20 text-[#EA580C]" : "hover:bg-[#FFEAE6] text-[#EA580C]"
                        }\`}
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
                        className={\`flex items-center gap-1.5 px-3.5 h-7.5 rounded-full border text-[11.5px] font-bold active:scale-95 transition-all shadow-sm cursor-pointer select-none \${
                          isDarkMode
                            ? "border-[#EA580C]/35 bg-[#EA580C]/12 text-[#EA580C] hover:bg-[#EA580C]/20"
                            : "border-[#FFD9D0] bg-[#FFF8F6] text-[#EA580C] hover:bg-[#FFEAE6]"
                        }\`}
                      >
                        <span className="w-4 h-4 rounded-md bg-[#EA580C] text-white flex items-center justify-center text-[8.5px] font-black shrink-0">B</span>
                        <span>베이스 추가 +</span>
                      </button>
                      
                      {isBasePopoverOpen && (
                        <div className={\`absolute left-0 bottom-full mb-2 w-[190px] rounded-2xl py-1.5 animate-in fade-in slide-in-from-bottom-1 duration-150 border z-50 \${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                            : "bg-white border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        }\`}>
                          <button
                            onClick={() => {
                              baseFileInputRef.current?.click();
                              setIsBasePopoverOpen(false);
                            }}
                            className={\`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors \${
                              isDarkMode ? "text-slate-350 hover:bg-[#252B36]" : "text-slate-700 hover:bg-slate-50"
                            }\`}
                          >
                            <Paperclip size={13} className="text-slate-400" />
                            컴퓨터 파일 업로드
                          </button>
                          <button
                            onClick={setGeneratedAsBase}
                            disabled={!generatedImageUrl}
                            className={\`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors \${
                              generatedImageUrl 
                                ? "text-[#EA580C] " + (isDarkMode ? "hover:bg-[#EA580C]/10" : "hover:bg-[#FFF8F6]")
                                : (isDarkMode ? "text-slate-655 cursor-not-allowed" : "text-slate-300 cursor-not-allowed")
                            }\`}
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
                    <div key={idx} className={\`flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-bold shadow-sm transition-all relative border \${
                      isDarkMode
                        ? "bg-[#1E232D] border-[#2A3140] text-slate-300"
                        : "bg-white border-slate-200 text-slate-700"
                    }\`}>
                      <div className="w-5.5 h-5.5 rounded-full overflow-hidden shrink-0 bg-slate-100 relative">
                        <img src={refImg.url} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/45 flex items-center justify-center text-white text-[8px] font-black">R</div>
                      </div>
                      <span className="tracking-tight max-w-[100px] truncate">{refImg.name}</span>
                      <button
                        onClick={() => setReferenceImages(referenceImages.filter((_, rIdx) => rIdx !== idx))}
                        className={\`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors cursor-pointer \${
                          isDarkMode ? "hover:bg-slate-800 text-slate-500 hover:text-white" : "hover:bg-slate-100 text-slate-400 hover:text-slate-800"
                        }\`}
                      >
                        ✕
                      </button>
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
                        className={\`flex items-center gap-1.5 px-3.5 h-7.5 rounded-full border border-dashed text-[11.5px] font-bold active:scale-95 transition-all shadow-sm cursor-pointer select-none \${
                          isDarkMode
                            ? "border-blue-900/40 bg-blue-950/20 text-[#6D8FFF] hover:bg-blue-950/40"
                            : "border-blue-200 bg-[#EFF6FF]/40 text-[#3B63F6] hover:bg-[#EFF6FF]"
                        }\`}
                      >
                        <span>+ 참조 추가</span>
                      </button>
                      
                      {isRefPopoverOpen && (
                        <div className={\`absolute left-0 bottom-full mb-2 w-[190px] rounded-2xl py-1.5 animate-in fade-in slide-in-from-bottom-1 duration-150 border z-50 \${
                          isDarkMode
                            ? "bg-[#1E232D] border-[#2A3140] shadow-none"
                            : "bg-white border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        }\`}>
                          <button
                            onClick={() => {
                              refFileInputRef.current?.click();
                              setIsRefPopoverOpen(false);
                            }}
                            className={\`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors \${
                              isDarkMode ? "text-slate-350 hover:bg-[#252B36]" : "text-slate-700 hover:bg-slate-50"
                            }\`}
                          >
                            <Paperclip size={13} className="text-slate-400" />
                            컴퓨터 파일 업로드
                          </button>
                          <button
                            onClick={setGeneratedAsReference}
                            disabled={!generatedImageUrl}
                            className={\`w-full text-left px-3.5 py-2 text-[12px] font-bold flex items-center gap-2 cursor-pointer transition-colors \${
                              generatedImageUrl 
                                ? "text-[#3B63F6] " + (isDarkMode ? "hover:bg-slate-800" : "hover:bg-[#EFF6FF]")
                                : (isDarkMode ? "text-slate-655 cursor-not-allowed" : "text-slate-300 cursor-not-allowed")
                            }\`}
                          >
                            <ImageIcon size={13} className={generatedImageUrl ? "text-[#3B63F6]" : (isDarkMode ? "text-slate-655" : "text-slate-200")} />
                            생성 이미지 적용
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Subtitle helper showing current inpainting action */}
                <div className="min-h-[22px] flex items-center mb-1 select-none">
                  {isInpainting ? (
                    <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#3B63F6] animate-in fade-in duration-200">
                      <span>🪄 선택 영역 부분 수정 중...</span>
                      <button
                        onClick={() => setIsInpainting(false)}
                        className={\`w-4 h-4 rounded-full flex items-center justify-center text-[7.5px] font-bold transition-colors cursor-pointer \${
                          isDarkMode ? "bg-slate-850 hover:bg-slate-800 text-[#6D8FFF]" : "bg-blue-100 hover:bg-blue-200 text-[#3B63F6]"
                        }\`}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    baseImage && (
                      <span className={\`text-[11.5px] font-bold animate-in fade-in duration-200 \${isDarkMode ? "text-slate-500" : "text-slate-400"}\`}>
                        선택된 이미지를 바탕으로 수정을 진행합니다.
                      </span>
                    )
                  )}
                </div>

                {/* Main Input bar */}
                <div className={\`flex items-center rounded-full px-4.5 py-2 shadow-sm transition-all relative border \${
                  isDarkMode
                    ? "bg-[#1B1F27] border-[#2A3140] focus-within:border-[#6D8FFF]"
                    : "bg-white border border-slate-250 focus-within:border-[#3B63F6] focus-within:ring-4 focus-within:ring-blue-50"
                }\`}>
                  {/* Left Side Tools: Borderless File Clip and Sparkles */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={\`p-1.5 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-600 \${
                        isDarkMode ? "hover:bg-slate-800 hover:text-white" : "hover:bg-slate-100 hover:text-slate-800"
                      }\`}
                      title="컴퓨터 파일 업로드"
                    >
                      <Paperclip size={18} />
                    </button>
                    <button
                      onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
                      className={\`p-1.5 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-[#3B63F6] \${
                        isDarkMode ? "hover:bg-slate-800 hover:text-[#6D8FFF]" : "hover:bg-blue-50 hover:text-[#3B63F6]"
                      }\`}
                      title="스킬 선택"
                    >
                      <Sparkles size={18} />
                    </button>
                    
                    {/* Skill dropdown list */}
                    {isSkillDropdownOpen && (
                      <div className={\`absolute left-0 bottom-full mb-3.5 w-[160px] rounded-2xl z-40 py-1.5 overflow-hidden animate-in fade-in slide-in-from-bottom-1.5 duration-150 border \${
                        isDarkMode
                          ? "bg-[#1E232D] border-[#2A3140]"
                          : "bg-white border border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
                      }\`}>
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
                            className={\`w-full text-left px-4 py-2 text-[12px] font-semibold flex items-center justify-between transition-colors cursor-pointer \${
                              selectedSkill === skill || (skill === "스킬 초기화" && !selectedSkill)
                                ? isDarkMode
                                  ? "text-[#6D8FFF] bg-slate-800"
                                  : "text-[#3B63F6] bg-[#EFF6FF]/65"
                                : isDarkMode
                                  ? "text-slate-400 hover:bg-[#252B36] hover:text-[#F8FAFC]"
                                  : "text-slate-650 hover:bg-[#F8FAFC] hover:text-slate-950"
                            }\`}
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

                  {/* Input Text Box */}
                  <input
                    type="text"
                    value={chatInputValue}
                    onChange={(e) => setChatInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && chatInputValue.trim()) {
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
                    placeholder={isInpainting ? "선택한 영역을 어떻게 바꿀까요? (예: 배경을 바다로)" : "무엇을 만들까요? 대화로 자유롭게 요청하거나 템플릿을 선택해 보세요!"}
                    className={\`flex-1 bg-transparent border-none outline-none px-3.5 text-[13.5px] font-semibold \${
                      isDarkMode ? "text-[#F8FAFC] placeholder-slate-500" : "text-slate-800 placeholder-slate-400"
                    }\`}
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
                    className={\`w-9.5 h-9.5 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0 ml-1.5 \${
                      chatInputValue.trim()
                        ? "bg-[#3B63F6] text-white hover:bg-blue-600"
                        : isDarkMode
                          ? "bg-slate-850 text-slate-600"
                          : "bg-slate-100 text-slate-350"
                    }\`}
                  >
                    <ArrowUp size={18} className="text-white stroke-[2.5]" />
                  </button>
                </div>
                
                <p className={\`text-[10px] font-medium text-center mt-2.5 tracking-tight select-none \${
                  isDarkMode ? "text-slate-500" : "text-slate-400"
                }\`}>
                  생성된 이미지는 사실과 다를 수 있습니다. 결과물 사용 전 직접 확인해 주세요.
                </p>
              </div>`;

if (content.includes(originalComposerBlock)) {
  content = content.replace(originalComposerBlock, newComposerBlock);
  console.log("3. Composer block and attachment chips row updated successfully!");
} else {
  console.log("Error: Composer block matching not found!");
}

// 4. Update Brown Canvas View color to [#4d3427] inside Editor Workspace Content
content = content.replace(/bg-\\[#3d261c\\]/g, 'bg-[#4d3427]');
content = content.replace(/bg-\\[#3e2720\\]/g, 'bg-[#4d3427]');
console.log("4. Adjusted background brown canvas codes to [#4d3427]!");

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done applying mockup alignment programmatically!");
