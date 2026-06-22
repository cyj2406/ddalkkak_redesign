/* global React, Icon, Sidebar, TopBar, Footer, PRIMARY,
          Hero, Composer, SectionLabel, QuickActionChip, ToolRowItem, UxNote,
          QUICK_ACTIONS, TOOLS */

/* 시안 3 — AI 도구 중심형
   컴포저는 강조하되, AI 도구를 가로 리스트 행 형태로 더 자세히 보여줌
   추천 액션은 칩으로 작게 노출 */

const HomeV3 = () => (
  <div className="w-full h-full flex bg-white">
    <Sidebar active="home" />
    <main className="relative flex-1 flex flex-col min-w-0 bg-white">
      <TopBar variant="home" credit="12,121,209" />

      <div className="flex-1 flex flex-col items-center px-12 pt-10">
        <div className="w-full max-w-[760px] flex flex-col items-center gap-8">
          <Hero size="md" />
          <Composer width={720} emphasis="strong" />
        </div>

        {/* AI 도구 — 가로 리스트 (라벨 + 부제), 컴포저 다음 강조 */}
        <section className="w-full max-w-[760px] mt-12">
          <SectionLabel sub="한 문장이면 충분해요. 자세한 조건은 대화로 알려주세요.">AI 도구</SectionLabel>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {TOOLS.map((t) => <ToolRowItem key={t.key} t={t} />)}
          </div>
        </section>

        {/* 추천 시작하기 — 가장 약한 위계, 칩 두 개 */}
        <section className="w-full max-w-[760px] mt-10">
          <SectionLabel>추천 시작하기</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((q) => <QuickActionChip key={q.key} q={q} />)}
          </div>
        </section>

        <div className="flex-1 min-h-[40px]" />

        <div className="w-full max-w-[760px] mb-6">
          <UxNote items={[
            "<b>도구의 정보화</b> · 6개 도구에 짧은 부제(보고서/카드뉴스 등)를 붙여 '아이콘 일렬'보다 정보 가독성을 우선.",
            "<b>2-column 리스트</b> · 큰 컬러 칸 대신 슬레이트 리스트로 정렬해 화면 전체가 조용해지고 스캐닝이 빨라집니다.",
            "<b>딸깍 시리즈 = 보조 칩</b> · 메인 도구의 시각 무게를 흐리지 않도록, 시리즈는 가장 작은 보조 칩으로 표기.",
          ]} />
        </div>
        <Footer />
      </div>
    </main>
  </div>
);

window.HomeV3 = HomeV3;
