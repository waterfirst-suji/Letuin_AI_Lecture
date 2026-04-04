# PART 6 — 텔레그램 봇 + 종합 실습 (13~16강)

## 13강: 텔레그램 봇 기초 + Claude 봇 연결 (30분)

### 오프닝 훅
> *"텔레그램 봇은 2016년부터 있었다. 그런데 AI가 들어가자 완전히 달라졌다.
> 지금 전 세계에서 공장 설비 알람, 주식 알림, 뉴스 요약 봇을 만들고 있다."*

### 이론 (12분)
- 텔레그램 봇 작동 구조
  - BotFather → Bot Token 발급
  - Polling (지속 감시) vs Webhook (이벤트 수신)
- `python-telegram-bot` 라이브러리
- Claude API 연동 구조
- 실제 사례: 설비 데이터 → 텔레그램 알람 봇

### 실습 (18분)
- BotFather에서 나만의 봇 생성
- 봇 토큰 발급: [@BotFather](https://t.me/BotFather) → `/newbot`
- Claude Code로 Claude 텔레그램 봇 코드 생성
- 실습 봇: **"디스플레이 기술 상담 봇"**
  - `/start` → 환영 메시지
  - `/help` → 사용법 안내
  - `/explain [공정명]` → Claude API 답변 (포토, 에치, 잉크젯 등)
  - 일반 텍스트 → Claude가 자유 답변

```python
# 핵심 구조
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler
import anthropic

async def explain_command(update, context):
    process = " ".join(context.args)
    # Claude API 호출
    response = call_claude(f"{process} 공정을 설명해줘")
    await update.message.reply_text(response)
```

---

## 14강: Gemini 봇 + 설비 알람 시스템 (30분)

### 오프닝 훅
> *"gemini_telebot 레포를 보면 텔레그램 봇이 Gmail 읽고, 캘린더 관리하고,
> GitHub에 자동 커밋까지 한다. AI 봇이 비서가 되는 시대.
> → [github.com/waterfirst/gemini_telebot](https://github.com/waterfirst/gemini_telebot)"*

### 이론 (12분)
- gemini_telebot 레포 구조 함께 탐색
  - PDCA 워크플로우 봇 (`/pdca plan`, `/pdca do`, `/pdca report`)
  - Google Workspace 연동 (Gmail, Calendar, Drive)
  - 550+ AI 스킬 라이브러리 (antigravity-awesome-skills)
- 설비 알람 봇 설계 패턴:
  ```
  데이터 수집 (CSV/DB/API)
      ↓
  임계값 판단 (수율 < 95%?)
      ↓
  텔레그램 알람 전송
  ```

### 실습 (18분)
- Gemini API 텔레그램 봇 기본 설정
- 실습 봇: **"디스플레이 수율 모니터링 알람 봇"**
  - 샘플 수율 데이터(CSV) 주기적 읽기
  - 수율 95% 미만 → 경고 알람 자동 전송
  - `/status` → 현재 수율 현황 리포트
  - `/ai [질문]` → Gemini가 답변
  - `/summary` → 오늘의 수율 요약 (Gemini 자동 작성)

---

## 15강: 종합 통합 실습 — 모든 것을 하나로 (30분)

### 30분 챌린지

```
[수율 데이터 시뮬레이션]
          ↓
[Streamlit 대시보드] ← Gemini AI 분석
          ↓
[이상 감지 시 텔레그램 알람]
          ↓
[GitHub에 자동 저장 (Actions)]
```

**목표**: 위 시스템을 Claude Code로 30분 안에 구축

**순서**
1. (5분) Claude에게 전체 아키텍처 설계 요청
2. (15분) Claude Code로 각 파트 코드 생성
3. (5분) 연결 테스트
4. (5분) GitHub push + Streamlit 배포

---

## 16강: 최신 AI 트렌드 & 수료 (30분)

### 내용

**[오늘의 AI 뉴스]** (10분)
- 최신 Claude 모델 변화 타임라인
- GitHub Trending 지금 Top 10 (실시간 확인)
- 유명 개발자들이 지금 만들고 있는 것들
- 디스플레이 × AI 최신 연구 소식

**[프로젝트 3 발표]** (15분)
- 각자 3분 시연 → 기술 설명 → 어려웠던 점
- 서로 피드백

**[다음 단계 로드맵]** (5분)
- LangChain / LlamaIndex — AI 앱 심화
- MCP 서버 만들기 — Claude가 당신의 앱을 직접 사용하게
- Rust로 CLI 도구 만들기 (cokacdir처럼)
- 수료 및 Q&A

> ✅ **프로젝트 3 제출** → [projects/project3/](../../projects/project3/README.md)
