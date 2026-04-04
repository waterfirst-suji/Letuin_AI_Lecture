# 🎯 프로젝트 1 — 나의 디스플레이 관심 분야 소개 웹페이지

> **제출 시기**: 4강 후 1주일 이내
> **주요 도구**: Claude Code + GitHub Pages

## 공통 주제

Claude Code와 GitHub Pages를 사용하여 자신의 디스플레이 산업 관심 분야를 소개하는 인터랙티브 웹 페이지를 만드시오.

**최소 포함 요소**
- 자기소개 섹션
- 관심 공정/직무 소개
- 비교 데이터 테이블 1개 이상
- GitHub Pages 배포 완료

---

## [하] 난이도 — 단계별 가이드 제공

### Step 1: Claude Code에 아래 프롬프트를 그대로 입력하세요

```
나는 디스플레이 산업 취업준비생이야.
아래 조건으로 GitHub Pages에 배포할 수 있는 index.html 파일 하나를 만들어줘:

1. 내 소개: [이름 입력], 관심 직무: [직무명 입력]
2. 내가 관심 있는 디스플레이 기술 TOP 3 섹션 (카드 형태)
3. OLED vs LCD 비교 테이블
4. 모던한 CSS 스타일 (다크모드 선호)
5. 반응형 디자인 (모바일에서도 잘 보이게)

파일은 index.html 하나로 완성해줘.
```

### Step 2: 파일 저장 후 GitHub에 올리기

```bash
git add index.html
git commit -m "Add portfolio page"
git push
```

### Step 3: GitHub Pages 활성화

1. GitHub Repository → Settings → Pages
2. Source: Deploy from branch `main`
3. 저장 후 2~3분 대기
4. `https://[사용자명].github.io/[레포명]` 접속 확인

**제출**: 배포된 URL 제출

---

## [중] 난이도 — 방향 제시

### 요구사항
- Claude Code로 HTML 생성 (프롬프트는 직접 작성)
- 인터랙티브 요소 1개 이상 (탭, 토글, 슬라이더 등)
- 실제 디스플레이 스펙 데이터 활용 (검색 또는 AI에 질문)
- GitHub Pages 배포 필수

### 힌트
- `외부 프레임워크(React 등) 없이 순수 HTML/CSS/JS로 구현`
- `모바일에서도 잘 보여야 함 (반응형)`
- 데이터 부족하면 Claude에게: *"주요 스마트폰 OLED 디스플레이 스펙 표로 만들어줘"*

### 추가 점수
- README.md에 앱 설명 + 스크린샷 포함 시

**제출**: GitHub Repository URL + 배포 URL

---

## [상] 난이도 — 요구사항만 (힌트 없음)

1. GitHub Pages 배포 완료
2. 인터랙티브 요소 3개 이상
3. 실제 디스플레이 공정 데이터 포함 (포토/에치/잉크젯 중 1개 이상)
4. Chart.js 또는 D3.js를 이용한 시각화 포함
5. README.md 영문 작성 (AI 활용 가능)
6. 커밋 히스토리 최소 5개 이상 (작업 과정이 보여야 함)

**제출**: GitHub Repository URL + 배포 URL

---

## 평가 기준

| 항목 | 하 | 중 | 상 |
|------|----|----|-----|
| GitHub Pages 배포 | 필수 | 필수 | 필수 |
| 인터랙티브 요소 | 없어도 됨 | 1개 이상 | 3개 이상 |
| 데이터 수준 | 기본 비교표 | 실제 스펙 데이터 | 공정 데이터 포함 |
| 시각화 | 없어도 됨 | 없어도 됨 | 필수 |
| README | 선택 | 권장 | 필수 (영문) |
| 커밋 수 | 제한 없음 | 제한 없음 | 5개 이상 |
