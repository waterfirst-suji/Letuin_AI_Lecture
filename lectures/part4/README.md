# PART 4 — AI API + 시뮬레이션 + Antigravity (8~10강)

## 8강: Google AI Studio + Gemini API (30분)

### 오프닝 훅
> *"Google이 Gemini API를 무료로 쏜다. 하루 1500번까지.
> 이걸 이용하면 당신의 앱에 AI를 무료로 넣을 수 있다."*

### 이론 (12분)
- Google AI Studio 소개 & Gemini API 구조
- API Key 발급 및 보안 관리 (.env + .gitignore)
- Gemini의 멀티모달 능력 (텍스트 + 이미지 + 영상)
- Claude API vs Gemini API 비교 — 어떤 걸 언제 쓸까
- **[흥미 포인트]** Google DeepMind와 Gemini 합쳐진 이야기

### 실습 (18분)
- Google AI Studio 가입 + API Key 발급
- Claude Code로 Gemini 챗봇 앱 생성
- 실습 앱: **"디스플레이 기술 Q&A 챗봇"**
  - Gemini API 연동
  - System Prompt: "너는 디스플레이 공정 전문가야"
  - Streamlit 인터페이스

---

## 9강: AI 시뮬레이션 만들기 (30분)

### 오프닝 훅
> *"픽셀 하나가 어떻게 색을 만드는지 눈으로 보여줄 수 있다면?
> 포토공정에서 노광 패턴이 어떻게 생기는지 시뮬레이션할 수 있다면?"*

### 이론 (10분)
- 시뮬레이션의 종류: 물리, 광학, 공정, 통계
- 디스플레이 관련 시뮬레이션 아이디어들:
  - RGB 서브픽셀 레이아웃 (Diamond, Stripe, PenTile)
  - 색공간 변환 (sRGB ↔ DCI-P3 ↔ Adobe RGB)
  - 포토리소그래피 노광 패턴 시뮬레이터
  - 잉크젯 도포 균일성 시뮬레이터 (커피링 효과 포함)

### 실습 (20분)
- 실습 앱: **"RGB 픽셀 색상 혼합 & 색역 시뮬레이터"**
  - R, G, B 슬라이더 → 실시간 색상 조합
  - sRGB / DCI-P3 / Adobe RGB 영역 시각화
  - "이 색은 DCI-P3에서만 표현 가능합니다" AI 해설
  - Gemini API로 색상 용도 설명 자동 생성
- Streamlit Cloud 배포

---

## 10강: Google Antigravity 웹앱 만들기 (30분)

### 오프닝 훅
> *"Google이 만든 AI 웹앱 플랫폼 Antigravity.
> 이름부터 '중력을 거스른다' — 기존 무거운 개발 방식을 뒤집겠다는 선언.
> → [antigravity.google](https://antigravity.google)"*

### 이론 (15분)
- Google Antigravity 플랫폼 소개
  - AI 에이전트 기반 웹앱 생성
  - 550+ 전문 AI 스킬 라이브러리 (antigravity-awesome-skills)
  - Gemini + Google Workspace 통합
- 기존 플랫폼(Firebase, Streamlit)과의 차이점

### 실습 (15분)
- Google Antigravity 계정 설정 & 첫 앱 생성
- 실습 앱: **"디스플레이 스펙 비교 웹앱"**
  - 주요 스마트폰/TV 디스플레이 스펙 데이터
  - 사용자가 기기 선택 → 스펙 비교 시각화
  - Antigravity 플랫폼에 배포

> ✅ **이후 프로젝트 2 시작** → [projects/project2/](../../projects/project2/README.md)
