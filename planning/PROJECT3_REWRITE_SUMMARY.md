# 프로젝트 3 재작성 완료 보고서

작성일: 2026-05-16

## 작업 개요
프로젝트 3을 **Gemini 생태계 중심**으로 전면 재작성 완료

---

## 주요 변경사항

### 1. 프로젝트 제목 변경
- **기존**: "AI 디스플레이 종합 솔루션"
- **수정**: "Gemini 통합 솔루션 (반도체/디스플레이/배터리/바이오)"

### 2. 기술 스택 변경
- **기존**: Streamlit + Gemini API + Telegram
- **수정**: Firebase Hosting + Gemini Pro API + NotebookLM + Firestore + Firebase Functions + Telegram

### 3. 핵심 요구사항 변경

#### 기존 (5개)
1. Gemini API 연동
2. 데이터 시각화
3. Streamlit 배포
4. API Key 보안
5. 텔레그램 알림

#### 수정 (5개)
1. **Gemini Pro API 연동**: 분야별 데이터 분석 (반도체/디스플레이/배터리/바이오 중 선택)
2. **NotebookLM 지식 베이스**: 논문 업로드, 출처 기반 챗봇
3. **Firebase 배포**: Hosting + Firestore + Authentication
4. **API Key 보안**: .env + Firebase Functions 환경 변수
5. **Telegram 알림**: 조건부 자동 발송 (Gemini 분석 결과 포함)

---

## 난이도별 주요 변경

### 초급 (1일)

**제공 자료 변경**:
- 기존: Streamlit 템플릿 (`app.py`)
- 수정: Firebase 프로젝트 템플릿 (`index.html`, `firebase.json`)

**과제 변경**:
1. Gemini API 기본 호출 → **Firebase Hosting에 결과 표시**
2. **NotebookLM 체험** 추가 (논문 1개 + 질문 3개)
3. Streamlit Cloud 배포 → **Firebase Hosting 배포** (`firebase deploy`)
4. Telegram 수동 메시지 (동일)

**평가 기준 변경**:
- NotebookLM 체험 항목 추가 (20점)
- Firebase Hosting 배포 강조 (25점)

---

### 중급 (1~2일)

**제공 자료 변경**:
- 기존: Streamlit 요구사항 명세서
- 수정: Firebase + Gemini API 연동 가이드, NotebookLM API 문서

**과제 변경**:
1. Gemini Pro 데이터 분석 + **Firestore 저장**
2. **NotebookLM 5개 논문** 업로드 (새 항목)
3. **분야별 시각화** (반도체/디스플레이/배터리/바이오)
4. 조건부 Telegram 알림 (Gemini 분석 포함)
5. **Firebase 통합** (Hosting + Firestore + Functions)

**샘플 코드 변경**:
- 기존: Python (Streamlit + Gemini)
- 수정: JavaScript (Firebase Functions + Gemini API)

**평가 기준 변경**:
- NotebookLM 5개 논문 (20점)
- Firebase 통합 (10점)
- 분야별 시각화 (20점)

---

### 고급 (2일)

**통합 대시보드 변경**:

#### 기존 (Streamlit 4탭)
1. 전공 지식 챗봇 (Gemini API + RAG)
2. 픽셀 시뮬레이터
3. 수율 시뮬레이터
4. 실시간 모니터링

#### 수정 (Firebase 4탭)
1. **NotebookLM 챗봇** (논문 10개 + 출처 기반 답변 + 오디오 팟캐스트)
2. **Gemini Deep Research** (웹 검색 + 분석 + 보고서 생성)
3. **분야별 시뮬레이터** (반도체/디스플레이/배터리/바이오)
4. **실시간 모니터링** (Firestore onSnapshot)

**추가 요구사항**:
- **Firebase Authentication** (이메일 로그인 + 사용자별 데이터 분리)
- Telegram 봇 명령어 4개 (`/start`, `/report`, `/alert on/off`, `/analyze [파일]`)
- 다국어 지원 (한국어/영어)
- **Google Material Design 3 + 다크 모드**

**평가 기준 변경**:
- 통합 대시보드 4탭 (35점)
- Firebase Auth (10점)
- Telegram 봇 명령어 (15점)
- Material Design 3 (10점)

---

## 새로 추가된 섹션

### 1. 실무 시나리오 4개 (고급용)

#### 시나리오 1: 반도체 공정 AI 모니터링
- 배경: CVD 공정 엔지니어, 일일 수율 데이터 500개 Lot 분석
- 데이터: SECOM 데이터셋 (UCI)

#### 시나리오 2: 디스플레이 불량 분류 시스템
- 배경: AOI 검사 엔지니어, 일일 이미지 1,000장 분류
- 기술: Gemini Pro Vision

#### 시나리오 3: 배터리 수명 예측 시스템
- 배경: 배터리 R&D 연구원, 충방전 사이클 데이터 분석
- NotebookLM: 리튬이온 배터리 논문 10개

#### 시나리오 4: 바이오 실험 데이터 분석
- 배경: 분자생물학 대학원생, 실험 결과 통계 분석
- Gemini Pro: t-test, ANOVA 통계 분석

### 2. Firebase 관련 가이드

**Firebase 프로젝트 구조**:
```
gemini-integrated-solution/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── functions/
│   ├── index.js (Gemini API 호출)
│   └── package.json
├── firestore.rules
├── firebase.json
└── README.md
```

**Firebase Functions 환경 변수 설정**:
```bash
firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY"
firebase functions:config:set telegram.bot_token="YOUR_BOT_TOKEN"
```

### 3. NotebookLM 활용 가이드

**논문 선택 기준** (분야별):
- 반도체: CVD 공정, 수율 최적화 논문
- 디스플레이: OLED 제조, 픽셀 구조 논문
- 배터리: 리튬이온 배터리 수명, 충방전 논문
- 바이오: 실험 프로토콜, 통계 분석 논문

**NotebookLM 질문 예시**:
- "CVD 공정에서 온도가 수율에 미치는 영향은?"
- "OLED 번인 현상의 주요 원인은?"
- "리튬이온 배터리 용량 열화 메커니즘은?"

### 4. Telegram 봇 명령어 구현 (고급용)

**JavaScript 샘플 코드** (Telegraf 사용):
```javascript
bot.command('start', (ctx) => {
  ctx.reply('안녕하세요! Gemini 통합 모니터링 시스템입니다.');
});

bot.command('report', async (ctx) => {
  const report = await generateReport();
  ctx.reply(report);
});

bot.command('alert', (ctx) => {
  const [_, action] = ctx.message.text.split(' ');
  if (action === 'on') {
    ctx.reply('알림이 활성화되었습니다.');
  }
});
```

---

## 제거된 내용

### 1. Streamlit 관련 코드
- `app.py` 템플릿 (Python)
- Streamlit 위젯 (`st.slider`, `st.expander`)
- `requirements.txt` (Python 패키지)

### 2. display_terms.txt
- 기존 50개 디스플레이 용어 사전 제거
- NotebookLM 논문 업로드로 대체

---

## 파일 변경 내역

### 수정된 파일
- `planning/projects_detailed_plan.md` (프로젝트 3 섹션 전면 재작성)

### 생성된 파일
- `planning/projects_detailed_plan_v2_gemini.md` (백업 파일)
- `planning/PROJECT3_REWRITE_SUMMARY.md` (이 문서)

---

## 체크리스트 업데이트

### 프로젝트 3 준비 (수정됨)
- [x] 초급/중급/고급 과제 명확히 구분
- [x] **Gemini + NotebookLM + Firebase 통합 확인** (변경)
- [x] **실무 시나리오 4개 (고급용) 작성** (변경)
- [x] **Firebase Functions 샘플 코드 제공** (변경)
- [x] 평가 루브릭 작성
- [x] **Firebase 배포 가이드 포함** (변경)
- [x] **NotebookLM 사용 가이드** (추가)
- [x] Telegram 봇 설정 가이드 포함
- [x] **API Key 보안 설정 가이드 (Firebase Functions)** (변경)
- [x] **분야별 샘플 데이터 CSV 제공** (추가)

---

## 주요 강조점

### Gemini 생태계 중심
1. **Gemini Pro API**: 고급 데이터 분석
2. **NotebookLM**: 논문 기반 지식 베이스 (출처 명시)
3. **Gemini Deep Research**: 웹 검색 + 종합 분석

### Firebase 통합
1. **Firebase Hosting**: 웹앱 배포
2. **Firestore**: NoSQL 데이터 저장
3. **Firebase Functions**: 백엔드 로직 (Gemini API 호출)
4. **Firebase Auth**: 사용자 인증 (고급)
5. **Firebase Storage**: 파일 저장 (중급/고급)

### 분야별 확장
1. 반도체 (SECOM 데이터셋)
2. 디스플레이 (Gemini Pro Vision)
3. 배터리 (수명 예측 모델)
4. 바이오 (통계 분석)

---

## 다음 단계

### 강사 준비 사항
1. Firebase 프로젝트 템플릿 제작 (초급용)
2. Gemini API + Firebase Functions 연동 가이드 작성
3. NotebookLM 논문 10개 선정 (분야별)
4. 샘플 CSV 데이터 4종 생성 (반도체/디스플레이/배터리/바이오)
5. Firebase 배포 단계별 가이드 (스크린샷 포함)
6. Telegram 봇 명령어 구현 예시 (JavaScript)

### 학생 제공 자료
- **초급**: `index.html` (50% 완성), `firebase.json`, `.env.example`, `sample_data.csv`
- **중급**: 요구사항 명세서, CSV 3종, Gemini + Firebase 가이드
- **고급**: 실무 시나리오 4개, 공개 데이터셋 링크

---

## 예상 질문 및 답변

### Q1: Streamlit이 아니라 Firebase를 사용하는 이유는?
**A**: Gemini 생태계 통합을 위해서입니다. Firebase는 Google Cloud 플랫폼의 일부로, Gemini API와 자연스럽게 연동되며, NotebookLM도 Google AI Studio 내에서 함께 사용할 수 있습니다. 또한 Firebase Functions를 사용하면 API Key를 안전하게 백엔드에서 관리할 수 있습니다.

### Q2: NotebookLM은 어떻게 평가하나요?
**A**:
- **초급**: 스크린샷 제출 (논문 1개 + 질문/답변 3개)
- **중급**: NotebookLM 공유 링크 제출 (논문 5개 + 채팅 기록)
- **고급**: NotebookLM 공유 링크 + 오디오 팟캐스트 생성 (선택)

### Q3: 4개 분야 중 하나만 선택하나요?
**A**:
- **초급/중급**: 1개 분야 선택
- **고급**: 1개 분야 깊이 있게, 또는 여러 분야 통합 (창의성 점수)

### Q4: Firebase 비용은?
**A**: Firebase 무료 플랜 (Spark)으로 충분합니다.
- Hosting: 10GB 스토리지, 360MB/일 전송
- Firestore: 1GB 저장, 50K 읽기/20K 쓰기 무료
- Functions: 125K 호출/월, 40K GB-초/월

### Q5: Gemini API 비용은?
**A**: 강의 기간 동안 유료 버전 제공 (Gemini 1.5 Pro).
- 초급: 약 10회 호출 (충분)
- 중급: 약 50회 호출
- 고급: 약 200회 호출 (Deep Research 포함)

---

## 완료 확인

- [x] 프로젝트 3 제목 변경
- [x] 핵심 요구사항 5개 재작성
- [x] 초급 과제 Firebase 중심으로 재작성
- [x] 중급 과제 NotebookLM 추가
- [x] 고급 과제 4탭 구조 변경
- [x] 실무 시나리오 4개 추가
- [x] Firebase Functions 샘플 코드 추가
- [x] NotebookLM 활용 가이드 추가
- [x] Telegram 봇 명령어 샘플 추가
- [x] 체크리스트 업데이트
- [x] 백업 파일 생성
- [x] 요약 보고서 작성

---

**작성 완료**: 2026-05-16
**수정자**: Claude Agent (Sonnet 4.5)
**파일 위치**: `D:/python/2026_letuin/Letuin_AI_Lecture/planning/projects_detailed_plan.md`
