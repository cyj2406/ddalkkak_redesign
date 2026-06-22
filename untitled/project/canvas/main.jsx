/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard, HomeScreen, HomeV1, HomeV2, HomeV3, GalleryScreen, StudioScreen, CardNewsCanvas, HomeCatA, HomeCatB, HomeCatC */

const App = () => (
  <DesignCanvas
    title="딸깍.net 리디자인"
    subtitle="레퍼런스 톤앤매너 적용 — 화면별 아트보드"
  >
    <DCSection id="entry" title="홈" subtitle="현재 레퍼런스 매칭본">
      <DCArtboard id="home" label="00 · 홈 (현재)" width={1440} height={900}>
        <HomeScreen />
      </DCArtboard>
    </DCSection>

    <DCSection id="proposals" title="메인 화면 개선 시안" subtitle="딸깍 시리즈 노출 방안 3종 — 비교용">
      <DCArtboard id="home-v1" label="시안 1 · 입력창 중심형" width={1280} height={900}>
        <HomeV1 />
      </DCArtboard>
      <DCArtboard id="home-v2" label="시안 2 · 추천 액션 중심형" width={1280} height={960}>
        <HomeV2 />
      </DCArtboard>
      <DCArtboard id="home-v3" label="시안 3 · AI 도구 중심형" width={1280} height={960}>
        <HomeV3 />
      </DCArtboard>
    </DCSection>

    <DCSection id="image" title="이미지 흐름" subtitle="AI 이미지 생성 · 이미지 스튜디오">
      <DCArtboard id="gallery" label="02 · AI 이미지 생성 (갤러리)" width={1280} height={1320}>
        <GalleryScreen />
      </DCArtboard>
      <DCArtboard id="studio" label="03 · 이미지 스튜디오" width={1280} height={940}>
        <StudioScreen />
      </DCArtboard>
    </DCSection>

    <DCSection id="editor" title="카드뉴스 AI 에디터" subtitle="생성된 카드뉴스를 빠르게 수정하는 6가지 상태">
      <DCArtboard id="ed-default" label="04a · 기본 상태" width={920} height={880}>
        <CardNewsCanvas mode="default" />
      </DCArtboard>
      <DCArtboard id="ed-gib-select" label="04b · GIB · 영역 선택" width={920} height={880}>
        <CardNewsCanvas mode="gib-select" />
      </DCArtboard>
      <DCArtboard id="ed-gib-prompt" label="04c · GIB · 프롬프트 입력" width={920} height={880}>
        <CardNewsCanvas mode="gib-prompt" />
      </DCArtboard>
      <DCArtboard id="ed-text" label="04d · 텍스트 편집" width={920} height={880}>
        <CardNewsCanvas mode="text" />
      </DCArtboard>
      <DCArtboard id="ed-shape" label="04e · 도형 편집" width={920} height={880}>
        <CardNewsCanvas mode="shape" />
      </DCArtboard>
      <DCArtboard id="ed-image" label="04f · 이미지 편집" width={920} height={880}>
        <CardNewsCanvas mode="image" />
      </DCArtboard>
    </DCSection>

    <DCSection id="category" title="카테고리 리디자인" subtitle="이름+아이콘 / 세부설명은 호버 — 2가지 시안">
      <DCArtboard id="cat-a" label="시안 A · 젠스파크형 (그룹+구분선)" width={1280} height={900}>
        <HomeCatA />
      </DCArtboard>
      <DCArtboard id="cat-b" label="시안 B · 다글로형 (원형 아이콘 행)" width={1280} height={900}>
        <HomeCatB />
      </DCArtboard>
      <DCArtboard id="cat-c" label="시안 C · 다글로형 (라운드 사각 타일)" width={1280} height={900}>
        <HomeCatC />
      </DCArtboard>
    </DCSection>
  </DesignCanvas>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
