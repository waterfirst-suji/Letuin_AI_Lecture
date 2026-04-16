# 프로젝트 3 — AI 엔지니어링 솔루션 (최종 프로젝트)

> **수행 기간**: 주말 2일간 (최종 프로젝트)
> **주요 도구**: Gemini API + Streamlit + Telegram Bot + 자유 조합 (3가지 이상)

## 프로젝트 개요

이 강의에서 배운 기술을 **3가지 이상** 조합하여 실제 산업 문제를 해결하는 AI 솔루션을 만드세요.
단순한 실습이 아니라 **실제로 쓸 수 있는 완성품**을 목표로 합니다.

---

## 주제 아이디어

| 산업 | 주제 예시 |
|------|----------|
| 반도체 | 웨이퍼 맵 불량 패턴 분류기 + 알림 |
| 디스플레이 | 설비 이상 감지 + 텔레그램 리포트 |
| 2차전지 | 배터리 수명 예측 + 최적 충전 가이드 |
| 바이오 | 임상시험 데이터 자동 요약 챗봇 |
| 에너지 | 태양광 발전량 예측 대시보드 |
| 범용 | 특허/논문 키워드 트렌드 분석기 |

---

## 기술 스택 (자유 조합, 3가지 이상 필수)

```
✅ Gemini API          — AI 분석 / 텍스트 생성
✅ Streamlit           — 웹 UI 대시보드
✅ Telegram Bot        — 알림 / 자동화
✅ Python pandas       — 데이터 처리
✅ Plotly              — 인터랙티브 시각화
✅ GitHub              — 코드 관리 & 배포
✅ Streamlit Cloud     — 웹앱 배포 플랫폼
✅ GitHub Actions      — CI/CD 자동화 (상급)
```

---

## 모범 답안 예시

```
examples/
├── 하/     ← 공정 모니터링 알림 시스템 (템플릿 기반, 단계별 가이드 포함)
├── 중/     ← AI 공정 어드바이저 (자유 주제, 방향 제시)
└── 상/     ← 스마트 팩토리 통합 대시보드 (포트폴리오 수준)
```

> 모범 답안은 **실행 가능한 완성 코드**입니다.  
> 직접 `streamlit run app.py`로 실행해 보고 참고하세요.

---

## [하] 난이도 — 공정 모니터링 알림 시스템

**핵심 기술**: Streamlit + 시뮬레이션 센서 데이터 + Telegram Bot

### 구성 파일
```
examples/하/
├── app.py              ← Streamlit 대시보드 (게이지, 라인 차트, 상태 표시)
├── telegram_bot.py     ← 임계값 초과 시 텔레그램 알림 전송
├── requirements.txt
└── .env.example
```

### 실행 방법
```bash
cd examples/하
pip install -r requirements.txt
cp .env.example .env
# .env 파일에 BOT_TOKEN, CHAT_ID 입력
streamlit run app.py
```

### 단계별 학습 목표
1. Streamlit으로 실시간처럼 업데이트되는 대시보드 만들기
2. 임계값 기반 상태 판단 로직 구현 (정상 / 주의 / 위험)
3. python-telegram-bot으로 알림 메시지 전송

---

## [중] 난이도 — AI 공정 어드바이저

**핵심 기술**: Streamlit 멀티페이지 + 데이터 업로드 + AI 분석 + 보고서 생성

### 구성 파일
```
examples/중/
├── app.py              ← 멀티페이지 Streamlit 앱
├── ai_advisor.py       ← AI 분석 모듈 (Gemini API 연동 구조)
├── report_generator.py ← 마크다운 보고서 자동 생성
├── requirements.txt
└── .env.example
```

### 실행 방법
```bash
cd examples/중
pip install -r requirements.txt
cp .env.example .env
# .env 파일에 GEMINI_API_KEY 입력
streamlit run app.py
```

### 구현 포인트
- CSV/Excel 파일 업로드 → 자동 시각화
- AI가 데이터 패턴을 분석하고 한국어로 설명
- 분석 결과를 마크다운 보고서로 다운로드

---

## [상] 난이도 — 스마트 팩토리 통합 대시보드

**핵심 기술**: Streamlit 멀티페이지 + 이상 감지 + AI 분석 + 텔레그램 + 커스텀 테마

### 구성 파일
```
examples/상/
├── app.py
├── pages/
│   ├── 01_실시간_모니터링.py
│   ├── 02_이상_감지.py
│   ├── 03_AI_분석.py
│   └── 04_보고서.py
├── utils/
│   ├── data_generator.py   ← 현실적인 합성 공장 데이터
│   ├── analyzer.py         ← 통계 분석 함수
│   └── telegram_alert.py   ← 텔레그램 알림 모듈
├── .streamlit/
│   └── config.toml         ← 커스텀 테마
├── requirements.txt
├── .env.example
└── README.md
```

### 실행 방법
```bash
cd examples/상
pip install -r requirements.txt
cp .env.example .env
streamlit run app.py
```

### 구현 포인트
- Z-score 기반 이상 감지 알고리즘
- 커스텀 CSS 테마 적용 (프로페셔널 UI)
- HTML 보고서 자동 생성 및 다운로드
- 텔레그램 이상 알림 모듈 분리

---

## 평가 기준

| 항목 | 배점 | 하 | 중 | 상 |
|------|------|----|----|-----|
| 문제 정의의 현실성 | 30% | 기본 템플릿 활용 | 현실적 아이디어 | 실제 공정 기반 |
| 기술 구현 완성도 | 30% | 동작하면 OK | 완성도 있음 | CI/CD 포함 |
| 배포 및 사용성 | 20% | 로컬 실행 | Streamlit Cloud | 다국어 + 인증 |
| GitHub 품질 | 20% | 코드 있음 | README 완성 | 영문 README + 테스트 |

---

## 제출 형식

- **하**: GitHub Repository URL + 스크린샷 1장
- **중**: GitHub Repository URL + README + 스크린샷 2장
- **상**: GitHub Repository URL + 배포 URL + README + 2분 데모 영상 + 발표 자료

## 발표 (최종강)

- 발표 시간: 팀/개인당 **3분**
- 순서: 시연 → 기술 설명 → 배운 점
- 상호 피드백 교환
