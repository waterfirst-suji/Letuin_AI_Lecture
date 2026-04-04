# PART 1 — 세팅 & 바이브 코딩 철학 (1~2강)

## 1강: AI 마인드셋 + Claude Pro 시작 (30분)

### 오프닝 훅
> *"2024년 2월, Andrej Karpathy(전 Tesla AI 디렉터)가 한 트윗을 올렸다.
> '나는 이제 코드를 거의 직접 쓰지 않는다. 전부 AI한테 시킨다.'
> 6시간 만에 50만 뷰. 이것이 바이브 코딩이다."*

### 이론 (15분)
- 바이브 코딩이란? Andrej Karpathy가 말한 진짜 의미
- AI 개발 생태계 2025 지형도 — Claude vs GPT vs Gemini
- **[흥미 포인트]** Claude의 유출된 System Prompt 분석
  - Anthropic이 Claude에게 내린 숨겨진 지시들
  - Constitutional AI — "착한 AI"를 만드는 방법
- Claude Pro가 제공하는 것
  - 무제한 Claude 3.7 Sonnet
  - Projects — 나만의 AI 비서 공간
  - 확장 컨텍스트 (200K 토큰)

### 실습 (15분)
- Claude.ai 로그인 및 Pro 활성화
- Projects 기능으로 "디스플레이 학습 프로젝트" 생성
- 첫 번째 프롬프트 실습:
  ```
  나는 디스플레이 산업 취업준비생이야.
  AI로 만들 수 있는 가장 인상적인 포트폴리오 앱 5가지를 제안해줘.
  각각 어떤 기술 스택을 쓸지도 알려줘.
  ```

---

## 2강: GitHub + Claude Code 환경 세팅 (30분)

### 오프닝 훅
> *"Pieter Levels(@levelsio)는 혼자서 AI를 이용해 연 수익 $5M(약 65억원)짜리 서비스를 만들었다.
> 그의 도구? GitHub + AI. 지금 이 환경을 세팅한다."*

### 이론 (15분)
- Git vs GitHub — 버전 관리 핵심 개념
- Repository, Commit, Branch, Pull Request
- GitHub Stars로 보는 2024~2025 인기 프로젝트 실시간 확인
- Claude Code 소개 — 터미널 기반 AI 코딩 에이전트
- CLAUDE.md — AI에게 "나는 이런 사람이야" 알려주기

### 실습 (12분)
- GitHub 계정 생성 & 첫 Repository 만들기
- Claude Code 설치:
  ```bash
  npm install -g @anthropic-ai/claude-code
  claude
  ```
- 나만의 CLAUDE.md 작성
- 첫 commit + push

### 핵심 명령어
```bash
git init / git clone [URL]
git add [파일명]
git commit -m "커밋 메시지"
git push / git pull
```
