/* global React, Icon, Sidebar, TopBar, Footer, PRIMARY,
          Hero, Composer, SectionLabel, QuickActionChip, ToolIcon, UxNote,
          QUICK_ACTIONS, TOOLS */

/* 시안 1 — 입력창 중심형
   Claude/ChatGPT처럼 화면 중앙의 컴포저 하나에 시선이 집중되도록
   추천/도구는 모두 작은 보조 요소로 축소 */

const HomeV1 = () => (
  <div className="w-full h-full flex bg-white">
    <Sidebar active="home" />
    <main className="relative flex-1 flex flex-col min-w-0 bg-white">
      <TopBar variant="home" credit="12,121,209" />

      <div className="flex-1 flex flex-col items-center px-12">
        {/* hero + composer — 화면의 시각 중심 */}
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-8 max-w-[760px]">
          <Hero size="lg" />
          <Composer width={720} emphasis="strong" />

          {/* 추천 시작하기 — composer 직하단 작은 인라인 칩 (Perplexity prompt 추천 식) */}
          <div className="w-full">
            <SectionLabel>추천 시작하기</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((q) => <QuickActionChip key={q.key} q={q} />)}
            </div>
          </div>
        </div>

        {/* AI 도구 — 푸터 가까이, 가장 약한 위계 */}
        <section className="w-full max-w-[760px] mt-10 mb-6">
          <SectionLabel>AI 도구</SectionLabel>
          <div className="flex items-start gap-8 justify-between">
            {TOOLS.map((t) => <ToolIcon key={t.key} t={t} size="sm" />)}
          </div>
        </section>

        {/* UX 노트 */}
        <div className="w-full max-w-[760px] mb-6">
          <UxNote items={[
            "<b>위계 명확</b> · 컴포저만 강조(블루 보더+소프트 글로우), 나머지는 슬레이트 톤 보조 요소로 위계를 한 단계씩 뺐습니다.",
            "<b>발견은 가까이</b> · 추천 액션은 컴포저 바로 아래에 두어 '한 줄로 시작하기 어려울 때의 보조 입구'로 인식됩니다.",
            "<b>도구는 정보, 아닌 장식</b> · 6개 도구는 모노톤 라벨 아이콘으로 처리해 컬러로 메인 액션을 흐리지 않습니다.",
          ]} />
        </div>
        <Footer />
      </div>
    </main>
  </div>
);

window.HomeV1 = HomeV1;
