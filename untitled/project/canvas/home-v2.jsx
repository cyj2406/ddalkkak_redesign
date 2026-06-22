/* global React, Icon, Sidebar, TopBar, Footer, PRIMARY,
          Hero, Composer, SectionLabel, QuickActionRow, ToolIcon, UxNote,
          QUICK_ACTIONS, TOOLS */

/* 시안 2 — 추천 액션 중심형
   컴포저는 유지하되, 추천 시작하기를 컴포저와 동등한 시각 무게의 가로 카드 2개로
   AI 도구는 가장 작은 보조 요소로 */

const HomeV2 = () => (
  <div className="w-full h-full flex bg-white">
    <Sidebar active="home" />
    <main className="relative flex-1 flex flex-col min-w-0 bg-white">
      <TopBar variant="home" credit="12,121,209" />

      <div className="flex-1 flex flex-col items-center px-12 pt-10">
        <div className="w-full max-w-[760px] flex flex-col items-center gap-8">
          <Hero size="md" />
          <Composer width={720} emphasis="strong" />
        </div>

        {/* 추천 시작하기 — 컴포저와 함께 강조 */}
        <section className="w-full max-w-[760px] mt-12">
          <SectionLabel>추천 시작하기</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((q) => <QuickActionRow key={q.key} q={q} />)}
          </div>
        </section>

        {/* AI 도구 — 모노톤 작은 행 */}
        <section className="w-full max-w-[760px] mt-12">
          <SectionLabel>AI 도구</SectionLabel>
          <div className="flex items-start gap-8 justify-between">
            {TOOLS.map((t) => <ToolIcon key={t.key} t={t} size="sm" />)}
          </div>
        </section>

        <div className="flex-1 min-h-[40px]" />

        <div className="w-full max-w-[760px] mb-6">
          <UxNote items={[
            "<b>이중 entry point</b> · 자유 입력(컴포저)과 정형화된 빠른 시작(추천)을 한 시야 안에 동등 노출, 사용자 학습 곡선에 따라 진입 경로 선택.",
            "<b>딸깍 시리즈 자연 흡수</b> · 독립 서비스가 아닌 '브랜드 → 액션' 한 줄로 표기해 빠른 액션의 일부로 녹였습니다.",
            "<b>색 절제</b> · 컬러 아이콘 배경 제거, 블루는 컴포저 보더와 send 버튼에만. 위계 신호로서의 컬러 효율 ↑.",
          ]} />
        </div>
        <Footer />
      </div>
    </main>
  </div>
);

window.HomeV2 = HomeV2;
