# PART 2 — Claude Code 심화 + 에이전트 (3~4강)

## 3강: Claude Code Skills & 커스텀 자동화 (30분)

### 오프닝 훅
> *"유명 개발자 Simon Willison이 말했다: '나는 하루에 10개의 작은 앱을 만든다. AI 덕분에.'
> 오늘 우리도 30분 안에 하나 만든다."*

### 이론 (12분)
- Skills — 반복 작업을 슬래시 명령어로 저장하는 방법
- 좋은 프롬프트 vs 나쁜 프롬프트 실제 비교
- CLAUDE.md 고급 설정 — 프로젝트별 맞춤화
- **[특별 소개]** cokacdir — Rust로 만든 AI 터미널 파일 매니저
  - 자연어로 파일 관리: `.` 누르고 "수율 데이터 파일 찾아서 열어줘"
  - → [github.com/waterfirst/cokacdir](https://github.com/waterfirst/cokacdir)

### 실습 (18분)
- `/commit` 스킬 사용해보기
- 나만의 `/analyze-yield` 커스텀 스킬 만들기
- 프롬프트 패턴 실습:

```
역할: 디스플레이 공정 데이터 분석 전문가
맥락: [배경 정보 입력]
작업: [구체적 요청]
출력형식: Python Streamlit 앱 코드
제약: pandas, plotly만 사용
```

---

## 4강: Claude Agent 모드 + Cowork (30분)

### 오프닝 훅
> *"Claude에게 '앱 만들어줘'라고 하면 1개의 파일을 만든다.
> 에이전트 모드로 '앱 만들어줘'라고 하면 20개의 파일을, 테스트까지 하면서 만든다."*

### 이론 (12분)
- 에이전트 모드 vs 일반 대화 모드 (실제 차이 시연)
- **[특별 소개]** CLI-Anything
  - 어떤 소프트웨어든 AI 에이전트용 CLI로 자동 변환
  - 7단계 파이프라인: Analyze → Design → Implement → Test → Document → Publish
  - → [github.com/waterfirst/CLI-Anything](https://github.com/waterfirst/CLI-Anything)
- Claude for Work — 기업 환경에서의 AI 활용 전략
  - 사내 AI 제한 현실 vs 개인 Claude Pro 활용법

### 실습 (18분)
- `/feature-dev` 워크플로우 체험
  - 프롬프트: *"디스플레이 수율 분석 대시보드 만들어줘"*
  - Plan → Explore → Code → Review 과정 관찰
- 생성된 코드 구조 이해 (AI에게 설명 요청)
- GitHub push

> ✅ **이후 프로젝트 1 시작** → [projects/project1/](../../projects/project1/README.md)
