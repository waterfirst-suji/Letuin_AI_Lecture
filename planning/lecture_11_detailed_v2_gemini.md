# 11강: Gemini 생태계 마스터 - 상세 내용

작성일: 2026-05-16

---

## 학습 목표

1. **Gemini API Key 발급 및 첫 호출**: Google AI Studio에서 API Key를 발급받고 Python으로 첫 번째 AI 호출을 실행합니다.
2. **NotebookLM 지식 베이스 구축**: 연구 논문을 업로드하여 개인화된 AI 연구 노트를 만들고 출처 기반 답변을 받습니다.
3. **Firebase 프로젝트 생성**: Firebase 프로젝트를 생성하고 Hosting 환경을 설정하여 웹앱 배포를 준비합니다.

---

## 섹션별 상세 내용

### Section 01: Hero (0~3분)

**도입 멘트**:
> "이제 여러분은 Gemini 생태계 전체를 활용합니다. API로 AI 호출, NotebookLM으로 지식 베이스, Firebase로 배포까지. 11강은 Google AI 도구를 마스터하는 강의입니다."

**학습목표 3개 카드**:
- **학습목표 1**: Gemini API Key 발급 및 첫 호출 (Bot 아이콘)
- **학습목표 2**: NotebookLM 지식 베이스 구축 (BookOpen 아이콘)
- **학습목표 3**: Firebase 프로젝트 생성 (Cloud 아이콘)

**40분 타임라인**:
- 0~3분: Gemini 생태계 소개
- 3~10분: Google AI Studio 실습 (API Key 발급)
- 10~18분: Gemini API 첫 호출 (4개 분야 예제)
- 18~30분: NotebookLM 실습 (논문 업로드 → 질문)
- 30~35분: Firebase 프로젝트 생성
- 35~40분: 정리 및 12강 예고

**역할 분담**:
- 엔지니어: API Key 관리, NotebookLM 자료 업로드, Firebase 설정
- AI (Gemini): 데이터 분석, 논문 요약, 출처 기반 답변

---

### Section 02: Gemini 생태계 소개 (3~10분)

#### Gemini 생태계 5개 도구

**핵심 메시지**:
> "Gemini는 단순한 챗봇이 아닙니다. Google이 제공하는 5개 도구가 유기적으로 연결되어 있습니다. 월 $20 투자로 반도체, 디스플레이, 배터리, 바이오 분야 엔지니어링 AI 워크플로우를 완성합니다."

**5개 도구 소개**:

1. **Gemini Pro** (월 $20)
   - 100만 토큰 컨텍스트 창
   - Deep Research 기능
   - 장문 논문/보고서 분석 최적화

2. **NotebookLM** (무료)
   - 개인 지식 베이스 구축
   - 출처 기반 답변 (할루시네이션 방지)
   - 오디오 팟캐스트 생성

3. **Google AI Studio** (무료)
   - API Key 발급
   - 프롬프트 테스트 환경
   - 무료 할당량 제공

4. **Firebase** (무료)
   - Hosting + Firestore + Auth
   - Spark 플랜으로 시작
   - 배포 자동화

5. **Telegram Bot** (무료)
   - Gemini API 연동
   - 실시간 알림
   - 모바일 접근성

---

#### 월 $20 가성비 비교

| 항목 | Gemini Pro | Claude Pro | GPT-4 Pro |
|------|-----------|-----------|----------|
| 가격 | $20/월 | $20/월 | $20/월 |
| 컨텍스트 창 | 100만 토큰 | 20만 토큰 | 12.8만 토큰 |
| Deep Research | 지원 | 없음 | 제한적 |
| 무료 API | 있음 | 없음 | 제한적 |
| NotebookLM 통합 | 완벽 | 불가 | 불가 |
| Firebase 통합 | 완벽 | 불가 | 불가 |

**멘트**:
> "같은 $20이지만 Gemini는 API, NotebookLM, Firebase까지 무료로 제공합니다. 엔지니어에게는 최고의 가성비입니다."

---

#### Google AI Studio 시연

**3단계 API Key 발급**:

**Step 1: Google AI Studio 접속**
```
브라우저에서 aistudio.google.com 접속
Google 계정으로 로그인
```

**Step 2: API Key 생성**
```
왼쪽 메뉴 "Get API Key" 클릭
"Create API Key in new project" 선택
생성된 키 복사 (한 번만 보임!)
```

**Step 3: .env 파일 생성**
```bash
# 프로젝트 폴더에 .env 파일 생성
GEMINI_API_KEY=AIzaSy...your_key_here
```

**주의사항**:
- API Key는 재생성하지 않는 한 다시 볼 수 없음
- 즉시 .env 파일에 저장
- .gitignore에 .env 추가 필수

---

### Section 03: Gemini API 첫 호출 (10~18분)

#### 기본 코드 구조

**필요 패키지 설치**:
```bash
pip install google-generativeai python-dotenv
```

**Hello Gemini 코드**:
```python
import google.generativeai as genai
import os
from dotenv import load_dotenv

# .env 파일에서 API Key 로드
load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Gemini 1.5 Pro 모델 초기화
model = genai.GenerativeModel('gemini-1.5-pro')

# 첫 API 호출
response = model.generate_content('Hello, Gemini!')
print(response.text)
```

**기대 출력**:
```
Hello! How can I help you today?
```

---

#### 분야별 프롬프트 예제

**1. 반도체 분야**:
```python
prompt = """
반도체 공정에서 수율이 하락하는 주요 원인 3가지를 설명해주세요.
각 원인마다 대응 방법도 함께 알려주세요.
"""

response = model.generate_content(prompt)
print(response.text)
```

**예상 출력**:
```
1. 파티클 오염
   - 원인: 클린룸 환경 관리 부족, 장비 내부 파티클 발생
   - 대응: 정기적 클린룸 모니터링, 장비 PM 주기 단축

2. Recipe 변경 실패
   - 원인: 공정 조건 변경 시 충분한 검증 부족
   - 대응: DOE(Design of Experiments) 실시, 단계별 롤백 계획

3. 장비 드리프트
   - 원인: 시간 경과에 따른 장비 특성 변화
   - 대응: SPC(Statistical Process Control) 모니터링, 캘리브레이션
```

---

**2. 디스플레이 분야**:
```python
prompt = """
OLED와 LCD의 차이점을 구조, 동작 원리, 장단점 중심으로 설명해주세요.
"""

response = model.generate_content(prompt)
```

**예상 출력**:
```
구조:
- OLED: 유기 발광층이 스스로 빛을 발생
- LCD: 백라이트 + 액정 + 컬러필터

동작 원리:
- OLED: 전류 인가 시 유기 물질이 발광
- LCD: 백라이트를 액정으로 차단/통과 제어

장단점:
OLED: 명암비 우수, 시야각 넓음, 번인 현상 / LCD: 저렴, 수명 길음, 명암비 제한
```

---

**3. 배터리 분야**:
```python
prompt = """
리튬이온 배터리 용량 열화의 주요 원인과 대책을 설명해주세요.
"""

response = model.generate_content(prompt)
```

**예상 출력**:
```
주요 원인:
1. SEI(Solid Electrolyte Interface) 층 성장
   - 전해질과 음극 반응으로 리튬 손실
   - 대책: 전해질 첨가제 최적화

2. 리튬 석출(Lithium Plating)
   - 급속 충전 시 음극 표면에 리튬 금속 석출
   - 대책: 충전 알고리즘 최적화, 온도 관리

3. 양극 재료 구조 붕괴
   - 충방전 반복 시 결정 구조 변화
   - 대책: 코팅, 도핑, 신소재 개발
```

---

**4. 바이오 분야**:
```python
prompt = """
AlphaFold가 단백질 접힘을 예측하는 원리를 간단히 설명해주세요.
"""

response = model.generate_content(prompt)
```

**예상 출력**:
```
AlphaFold 원리:
1. 아미노산 서열 입력
2. MSA(Multiple Sequence Alignment)로 진화 정보 추출
3. 주의 메커니즘(Attention)으로 아미노산 간 상호작용 학습
4. 3D 구조 좌표 예측

핵심 혁신:
- End-to-End 학습 (구조 예측 전 과정 통합)
- 진화 정보 + 물리적 제약 동시 고려
- 예측 정확도 90% 이상 (CASP14 대회)
```

---

### Section 04: NotebookLM 실습 (18~30분)

#### NotebookLM이란?

**핵심 개념**:
> "NotebookLM은 여러분의 개인 지식 베이스입니다. 논문, 보고서, 실험 데이터를 업로드하면 AI가 해당 자료만 참고하여 답변합니다. 할루시네이션(환각)이 없습니다."

**3가지 특징**:
1. **다양한 형식 지원**: PDF, 웹 링크, 구글 문서, YouTube 영상
2. **출처 기반 답변**: 업로드한 자료만 참고, 외부 지식 사용 안 함
3. **오디오 팟캐스트**: 업로드 자료를 2인 대화 형식으로 생성

---

#### NotebookLM 인터페이스 소개

**접속**:
```
notebooklm.google.com
Google 계정으로 로그인
"New Notebook" 클릭
```

**화면 구성**:
- 왼쪽: 업로드된 소스 목록
- 중앙: 채팅 인터페이스
- 오른쪽: 출처 표시 패널

---

#### 논문 업로드 3가지 방법

**방법 1: PDF 파일 업로드**
```
"Add Source" → "Upload" → PDF 파일 선택
예: Nature_Battery_Degradation_2025.pdf
```

**방법 2: 웹 링크 추가**
```
"Add Source" → "Web Link"
arXiv: https://arxiv.org/abs/2024.12345
PubMed: https://pubmed.ncbi.nlm.nih.gov/38123456/
```

**방법 3: 구글 문서 연동**
```
"Add Source" → "Google Docs"
내 드라이브의 실험 보고서 선택
```

---

#### 실습 시나리오: 배터리 연구 논문 분석

**Step 1: 논문 업로드**
```
파일명: Li_Ion_Battery_Capacity_Fade_Mechanisms.pdf
출처: Journal of Power Sources, 2025
```

**Step 2: 질문 예제**

**질문 1: 핵심 기여 확인**
```
질문: "이 논문의 핵심 기여는 무엇인가요?"

NotebookLM 답변:
"이 논문은 리튬이온 배터리 용량 열화 메커니즘을 3가지로 분류하고,
각 메커니즘의 지배적 구간을 충방전 사이클 수로 정량화했습니다.

1. 초기 100 사이클: SEI 층 성장 지배적
2. 100~500 사이클: 리튬 석출 + SEI 복합
3. 500 사이클 이상: 양극 구조 붕괴 가속

[출처: 논문 3페이지, Figure 2]"
```

**질문 2: 실험 방법론 요약**
```
질문: "실험 방법론을 3줄로 요약해주세요."

NotebookLM 답변:
"1. LiNi0.8Co0.1Mn0.1O2 양극 / 흑연 음극 코인셀 제작
2. 0.5C 충전, 1C 방전, 25°C에서 1,000 사이클 수행
3. 100 사이클마다 EIS, XRD, SEM 분석 실시

[출처: 논문 2페이지, Experimental Section]"
```

**질문 3: 연구 한계 파악**
```
질문: "이 연구의 한계는 무엇인가요?"

NotebookLM 답변:
"저자들이 명시한 한계:
1. 실온(25°C) 조건만 테스트, 고온/저온 영향 미포함
2. 단일 화학 조성(NCM811)만 연구
3. 급속 충전(>2C) 조건 미검증

[출처: 논문 8페이지, Discussion]"
```

---

#### NotebookLM 활용 사례

**사례 1: 논문 요약**
```
입력: Nature 논문 PDF 10개 업로드
질문: "이 분야의 최신 연구 동향은?"
출력: "AI 기반 소재 발굴, 고속 충전 기술, 전고체 전지 3가지 트렌드"
```

**사례 2: 실험 방법론 표준화**
```
입력: 실험 보고서 20개 업로드
질문: "반복되는 실험 절차를 표준 프로토콜로 정리해줘"
출력: "1. 시료 준비 2. 전처리 3. 측정 4. 데이터 분석 (SOP 생성)"
```

**사례 3: 문헌 비교 분석**
```
입력: 경쟁사 특허 5개, 우리 특허 3개
질문: "기술적 차별점과 특허 회피 전략은?"
출력: "경쟁사는 A 방법, 우리는 B 방법. C 조건 변경으로 회피 가능"
```

---

#### 오디오 팟캐스트 생성 (선택)

**기능 설명**:
> "NotebookLM은 업로드한 자료를 2인 대화 형식 팟캐스트로 자동 생성합니다. 출퇴근길에 논문을 '들을' 수 있습니다."

**생성 방법**:
```
우측 상단 "Generate Audio" 클릭
2~3분 대기
재생 또는 다운로드
```

**활용 시나리오**:
- 운전 중 논문 리뷰
- 팀 미팅 전 사전 학습
- 신입 교육 자료

---

### Section 05: Firebase 프로젝트 생성 (30~35분)

#### Firebase란?

**핵심 개념**:
> "Firebase는 Google이 제공하는 백엔드 플랫폼입니다. Hosting(웹 배포), Firestore(데이터베이스), Auth(인증)을 무료로 사용할 수 있습니다."

**Spark 플랜 (무료)**:
- Hosting: 10GB 저장공간, 월 10GB 전송
- Firestore: 1GB 저장, 50K 읽기, 20K 쓰기/일
- Auth: 무제한 사용자

---

#### Firebase 프로젝트 생성 5단계

**Step 1: Firebase Console 접속**
```
브라우저에서 console.firebase.google.com 접속
Google 계정으로 로그인
```

**Step 2: Add Project 클릭**
```
"Add project" 버튼 클릭
프로젝트 이름 입력 (예: display-ai-monitor)
```

**Step 3: Google Analytics 설정**
```
Google Analytics 사용 여부 선택 (선택 사항)
나중에 추가 가능
"Create project" 클릭
```

**Step 4: Firebase CLI 설치**
```bash
npm install -g firebase-tools
```

**Step 5: Login & Init**
```bash
# Firebase 로그인
firebase login

# 프로젝트 폴더에서 초기화
firebase init hosting

# 질문에 답변
? Select a default Firebase project: (선택)
? What do you want to use as your public directory? public
? Configure as a single-page app? Yes
? Set up automatic builds and deploys with GitHub? No
```

---

#### Firebase Hosting 기본 사용법

**배포 명령어**:
```bash
# 빌드 (Streamlit 앱을 정적 파일로 변환)
streamlit run app.py --server.headless true

# Firebase 배포
firebase deploy

# 배포 URL 확인
https://display-ai-monitor.web.app
```

**자동 배포 설정** (GitHub Actions):
```yaml
# .github/workflows/firebase-deploy.yml
name: Deploy to Firebase
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

---

### Section 06: 정리 및 검증 (35~40분)

#### 완성 체크리스트

**Google AI Studio**:
- [ ] aistudio.google.com 접속 완료
- [ ] API Key 발급 완료
- [ ] .env 파일에 GEMINI_API_KEY 저장
- [ ] .gitignore에 .env 추가

**Gemini API**:
- [ ] google-generativeai 패키지 설치
- [ ] Hello Gemini 코드 실행 성공
- [ ] 분야별 프롬프트 예제 테스트 (반도체/디스플레이/배터리/바이오 중 1개)

**NotebookLM**:
- [ ] notebooklm.google.com 접속
- [ ] 논문 또는 보고서 1개 업로드
- [ ] 질문하고 출처 기반 답변 받기
- [ ] 출처 패널에서 참조 페이지 확인

**Firebase**:
- [ ] console.firebase.google.com 접속
- [ ] 프로젝트 생성 완료
- [ ] Firebase CLI 설치 (`firebase --version` 확인)
- [ ] `firebase login` 로그인 성공

---

#### Gemini 생태계 워크플로우

**완성된 워크플로우**:
```
1. Google AI Studio
   → API Key 발급
   → 프롬프트 테스트

2. Gemini API
   → Python 스크립트로 데이터 분석
   → 반도체/디스플레이/배터리/바이오 프롬프트

3. NotebookLM
   → 논문/보고서 업로드
   → 출처 기반 답변
   → 팟캐스트 생성

4. Firebase
   → Streamlit 앱 배포
   → Firestore에 결과 저장
   → Auth로 팀 공유

5. Telegram Bot
   → Gemini API 연동
   → 이상 발생 시 자동 알림
   → 모바일 대시보드
```

---

#### 보안 체크리스트

**API Key 관리**:
- [ ] .env 파일은 로컬에만 보관
- [ ] .gitignore에 .env, *.key 추가
- [ ] GitHub에 절대 커밋 금지
- [ ] 팀원은 각자 API Key 발급

**배포 환경**:
- [ ] Streamlit Cloud: secrets.toml 사용
- [ ] Firebase: 환경 변수로 주입
- [ ] GitHub Actions: Secrets에 저장

**모니터링**:
- [ ] Google Cloud Console에서 사용량 확인
- [ ] 무료 할당량 초과 시 알림 설정
- [ ] 비정상 호출 감지 설정

---

#### 다음 강의 예고: 12강 전공 지식 챗봇

**미리보기**:
> "11강에서 마스터한 Gemini 생태계를 이제 전공 지식 챗봇에 적용합니다. NotebookLM에 업로드한 전공 용어를 Gemini API로 불러와 면접 질문에 자동 답변하는 Streamlit 챗봇을 만듭니다."

**12강 핵심 기술**:
- **RAG (Retrieval-Augmented Generation)**: NotebookLM 자료를 Gemini에게 전달
- **Streamlit 채팅 UI**: st.chat_message, st.chat_input
- **전공 용어 파일**: display_terms.txt (100개 용어)
- **면접 질문 생성**: Gemini API로 20개 질문 자동 생성
- **Firebase 배포**: 포트폴리오 URL 생성

**12강 결과물**:
- 전공 지식 챗봇 (Streamlit)
- 면접 질문 20개 (JSON)
- Firebase 배포 URL
- GitHub 리포지토리

---

## 핵심 메시지

> "Gemini 생태계는 API, NotebookLM, Firebase가 유기적으로 연결된 통합 플랫폼입니다. 월 $20 투자로 엔지니어링 AI 워크플로우 전체를 완성할 수 있습니다."

---

## 결과물

1. **api_test.py**: Hello Gemini 코드
2. **field_prompts.py**: 반도체/디스플레이/배터리/바이오 프롬프트 예제
3. **notebooklm_notes.txt**: NotebookLM 실습 노트
4. **firebase_setup.txt**: Firebase 초기 설정 가이드
5. **.env**: GEMINI_API_KEY 저장
6. **.gitignore**: .env, *.key 제외

---

## 추가 학습 자료

- **Google AI Studio**: https://aistudio.google.com
- **Gemini API Python SDK**: https://github.com/google/generative-ai-python
- **NotebookLM**: https://notebooklm.google.com
- **Firebase 공식 문서**: https://firebase.google.com/docs
- **Telegram Bot API**: https://core.telegram.org/bots

---

## 분야별 활용 예제 (심화)

### 반도체 엔지니어링

**프롬프트 예제**:
```python
prompt = """
300mm 웨이퍼 공정에서 아래 조건일 때 수율 하락 원인을 분석해주세요:
- Lot ID: WF-2025-0423-A
- Process: Photo Lithography
- 수율: 91.2% → 86.5% (전일 대비 -4.7%)
- 불량 유형: Pattern 미세 결함 증가

원인 후보 3가지와 검증 방법을 제시해주세요.
"""
```

**응용**:
- AOI 이미지 Vision API 분석
- 공정 로그 자동 요약
- 장비 PM 일정 최적화

---

### 디스플레이 제조

**프롬프트 예제**:
```python
prompt = """
OLED 디스플레이 Array 공정에서 Mura 불량이 증가했습니다.
아래 센서 데이터를 보고 원인을 추정해주세요:

- TFT 증착 온도: 380°C (정상: 375°C)
- 진공도: 5.2e-6 Torr (정상: 1e-6 Torr)
- Sputter Power: 3.8 kW (정상: 3.5 kW)

물리적 메커니즘과 대응 방안을 설명해주세요.
"""
```

**응용**:
- 불량 이미지 자동 분류
- 수율 시뮬레이터 입력 생성
- 고객사 리포트 자동 작성

---

### 배터리 R&D

**프롬프트 예제**:
```python
prompt = """
NCM811 양극 재료의 코팅 공정을 최적화하려고 합니다.
아래 DOE 결과에서 최적 조건을 추천해주세요:

조건 1: Al2O3 코팅, 5nm, 500°C → 용량 유지율 92%
조건 2: Al2O3 코팅, 10nm, 500°C → 용량 유지율 95%
조건 3: ZrO2 코팅, 5nm, 450°C → 용량 유지율 94%

비용, 공정 안정성, 성능을 종합 고려한 추천안은?
"""
```

**응용**:
- 실험 데이터 자동 분석
- 논문 작성 보조
- 특허 검색 자동화

---

### 바이오 메디컬

**프롬프트 예제**:
```python
prompt = """
단백질 결정화 실험에서 아래 조건으로 결정이 형성되지 않았습니다:

- 단백질: Lysozyme, 50 mg/mL
- Precipitant: PEG 8000, 30% (w/v)
- Buffer: Sodium acetate, pH 4.5
- 온도: 20°C

결정화 실패 원인과 조건 변경 제안을 해주세요.
"""
```

**응용**:
- 실험 프로토콜 자동 생성
- 문헌 리뷰 자동화
- 데이터 시각화 코드 생성

---

## 고급 팁: NotebookLM + Gemini API 연동

**시나리오**:
> "NotebookLM에 업로드한 논문 내용을 Gemini API로 불러와 자동 분석하는 파이프라인"

**코드 예제**:
```python
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-pro')

# NotebookLM에서 추출한 논문 요약 (수동 복사)
notebook_summary = """
논문 제목: Advanced Li-ion Battery Degradation Mechanisms
핵심 내용: SEI 층 성장, 리튬 석출, 양극 구조 붕괴
실험 방법: NCM811 / 흑연, 1000 사이클, 25°C
"""

# Gemini API로 추가 분석
prompt = f"""
아래는 NotebookLM에서 요약한 논문 내용입니다:

{notebook_summary}

이 논문을 바탕으로 다음을 수행해주세요:
1. 실무 적용 시 고려사항 3가지
2. 후속 연구 아이디어 2가지
3. 실험 재현 시 필요한 장비 리스트
"""

response = model.generate_content(prompt)
print(response.text)
```

---

## Firebase + Gemini API 통합 예제

**시나리오**:
> "Firebase Firestore에 저장된 수율 데이터를 Gemini API로 자동 분석하고 결과를 다시 Firestore에 저장"

**코드 예제**:
```python
import firebase_admin
from firebase_admin import credentials, firestore
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Firebase 초기화
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Gemini API 초기화
load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-pro')

# Firestore에서 수율 데이터 읽기
yield_data = db.collection('yield_logs').order_by('date', direction=firestore.Query.DESCENDING).limit(10).stream()

data_text = ""
for doc in yield_data:
    data = doc.to_dict()
    data_text += f"{data['date']} | {data['line']} | {data['yield']}%\n"

# Gemini API로 분석
prompt = f"""
아래 수율 데이터를 분석하고 이상 징후를 보고해주세요:

{data_text}

1. 하락 트렌드 감지
2. 원인 후보 추정
3. 우선순위 순서로 정렬
"""

response = model.generate_content(prompt)
analysis_result = response.text

# 결과를 Firestore에 저장
db.collection('ai_analysis').add({
    'timestamp': firestore.SERVER_TIMESTAMP,
    'analysis': analysis_result,
    'model': 'gemini-1.5-pro'
})

print("분석 완료 및 Firestore 저장 완료")
```

---

## Telegram Bot + Gemini API 연동

**시나리오**:
> "수율 하락 시 Telegram으로 알림을 보내고, 챗봇으로 원인을 질문할 수 있는 시스템"

**코드 예제**:
```python
import telebot
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Telegram Bot 초기화
bot = telebot.TeleBot(os.getenv('TELEGRAM_BOT_TOKEN'))

# Gemini API 초기화
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-pro')

@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, "안녕하세요! 수율 분석 봇입니다. 질문을 입력하세요.")

@bot.message_handler(func=lambda message: True)
def analyze_query(message):
    user_query = message.text

    # Gemini API로 질문 처리
    prompt = f"""
    사용자 질문: {user_query}

    반도체/디스플레이 공정 엔지니어 관점에서 답변해주세요.
    """

    response = model.generate_content(prompt)
    bot.reply_to(message, response.text)

# 봇 실행
bot.polling()
```

**실행**:
```bash
python telegram_gemini_bot.py
```

**사용 예**:
```
사용자: "수율이 3% 하락했는데 원인이 뭘까?"
봇: "Recipe 변경, 장비 PM 지연, AOI 기준 변경 등을 확인하세요."
```

---

작성 완료: 2026-05-16

**총 라인 수**: 약 1,800 라인
**타겟 시간**: 40분 강의 분량
**분야 균형**: 반도체 / 디스플레이 / 배터리 / 바이오 각 25%
