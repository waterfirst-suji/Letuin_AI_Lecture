# 🎯 프로젝트 3 — 나만의 AI 디스플레이 도구 (최종 프로젝트)

> **제출 시기**: 16강 후 2주일 이내
> **주요 도구**: 이 강의에서 배운 기술 중 3가지 이상 조합

## 공통 주제

이 강의에서 배운 기술 중 최소 3가지를 조합하여 디스플레이 산업의 실제 문제를 해결하는 AI 도구를 만드시오.

### 주제 아이디어 (자유 선택)
- 디스플레이 설비 이상 감지 + 텔레그램 알람 시스템
- 공정 파라미터 최적화 AI 어드바이저
- 디스플레이 특허/논문 키워드 분석 봇
- OLED 소재 배합 시뮬레이터 + 색역 예측
- 디스플레이 기술 면접 Q&A 챗봇

### 선택 가능한 기술 스택

```
✅ Claude Code (개발 도구)
✅ GitHub + GitHub Actions (코드 관리 & CI/CD)
✅ Python Streamlit (웹 UI)
✅ R Shiny (웹 UI)
✅ Quarto (보고서/문서)
✅ Google AI Studio / Gemini API (AI 기능)
✅ Claude API (AI 기능)
✅ Google Antigravity (웹앱 플랫폼)
✅ Telegram Bot (알림/자동화)
```

---

## [하] 난이도 — 단계별 가이드 제공

**추천 구성**: Streamlit + Gemini API + 텔레그램 봇

### Step 1: 아이디어 구체화

Claude에게 다음을 질문하세요:
```
나는 디스플레이 [주제] 관련 AI 도구를 만들고 싶어.
필요한 기능 5가지, 기술 스택, 전체 폴더 구조를 제안해줘.
Streamlit + Gemini API + Telegram Bot 조합으로 만들어줘.
```

### Step 2: Claude Code로 각 파트 순서대로 생성

```
프로젝트 폴더/
├── app.py              ← Streamlit UI
├── ai_utils.py         ← Gemini API 함수
├── telegram_bot.py     ← 텔레그램 봇
├── .env                ← API Key (GitHub에 올리지 말 것!)
├── .gitignore
└── requirements.txt
```

Claude Code에 순서대로 요청:
1. `"app.py 파일 만들어줘 — Streamlit으로 [주제] UI"`
2. `"ai_utils.py 만들어줘 — Gemini API 연동"`
3. `"telegram_bot.py 만들어줘 — 수율 임계값 초과 시 알람"`
4. `"requirements.txt와 .gitignore 만들어줘"`

### Step 3: 배포

```bash
# GitHub push
git add app.py ai_utils.py telegram_bot.py requirements.txt .gitignore
git commit -m "Add AI display monitoring system"
git push

# Streamlit Cloud 배포
# share.streamlit.io에서 Repository 연결 → Deploy
```

**제출**: 배포 URL + GitHub Repository URL + 30초 데모 영상 (선택)

---

## [중] 난이도 — 방향 제시

### 요구사항
- 3가지 이상 기술 스택 조합
- AI API 연동 (Claude 또는 Gemini)
- 실제 데이터 또는 현실적인 시뮬레이션 데이터 사용
- 다른 사람이 실제로 사용할 수 있는 완성도
- README에 사용법 + 기술 스택 + 스크린샷 포함

### 힌트
완성도보다 **아이디어의 참신함과 현실성**이 더 중요합니다.
"이 도구가 실제로 디스플레이 공장에서 유용할까?"를 기준으로 평가합니다.

**제출**: 배포 URL + GitHub Repository URL + README 링크

---

## [상] 난이도 — 요구사항만 (힌트 없음)

1. 디스플레이 실제 공정/데이터 기반 (논문, 특허, 공개 데이터셋)
2. 4가지 이상 기술 스택 통합
3. 자동화 파이프라인 포함 (GitHub Actions 또는 스케줄러)
4. 다국어 지원 (한국어 + 영어)
5. 사용자 인증 기능 (선택: Firebase Auth 또는 간단한 비밀번호)
6. 성능 측정 지표 포함 (응답 시간, API 호출 횟수 등)
7. 실제 사용자 테스트 후 피드백 반영 (README에 테스트 결과 기록)

**제출**: 배포 URL + GitHub URL + 발표 자료 + 2분 데모 영상

---

## 발표 (16강)

- 발표 시간: **팀/개인당 3분**
- 발표 순서: 시연 → 기술 설명 → 어려웠던 점
- 서로 간단한 피드백 교환

---

## 평가 기준

| 항목 | 배점 | 하 | 중 | 상 |
|------|------|----|----|-----|
| 문제 정의의 현실성 | 30% | 기본 | 현실적 | 실제 공정 기반 |
| 기술 구현 완성도 | 30% | 동작만 | 완성도 있음 | CI/CD 포함 |
| 배포 및 사용성 | 20% | 배포만 | 사용 가능 | 다국어 + 인증 |
| GitHub 품질 | 20% | 코드 있음 | README 완성 | 영문 + 테스트 |
