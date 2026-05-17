# 11~17강 마스터 기획안
작성일: 2026-05-16

---

## PART 0: colleague_repo 구조 분석 결과

### App.tsx 전체 구조 (1892 lines)
```
임포트:
- React (useState)
- framer-motion (motion 애니메이션)
- lucide-react (20+ 아이콘)

데이터 배열 패턴:
- fieldScenarios: 현장 시나리오 3개 (수율 로그, AOI 이미지, 설비 센서)
- impactExamples: Before/After 비교 3개
- intentChecklist: 체크리스트 5개 항목
- practiceSteps: 실습 단계 3개
- lessonFlow: 40분 타임라인 [3분, 7분, 8분, 17분, 5분]
- roleFlow: 역할 분담 (엔지니어 vs AI)
- learningGoals: 학습목표 3개 (definition, elements, field)
- tradVibeSteps: 전통 vs 바이브 비교 3행
- yieldTrend: 7일 수율 데이터 (차트용)
- excelFiles: 8개 파일 카드
- yieldLogRows: 테이블 데이터 6행
- aoiSamples: AOI 이미지 샘플 6개
- sensorLogRows: 센서 로그 8행
- promptParts: 프롬프트 5요소
- workshopExamples: 워크숍 예시 3개
- aiDialogueData: 좋은/나쁜 프롬프트 비교 2개
- firstRunSteps: 첫 실행 가이드 3단계
- tcreiItems: 2강 예고 5개 요소

컴포넌트 함수:
- ComplexCodeVisual: 전통 코딩 타이핑 애니메이션
- VibeIntentVisual: 바이브 코딩 시각화 (가우시안 분포, 박스플롯)
- GoalVisual: 학습목표 아이콘 렌더링
- YieldTrendChart: SVG 수율 추이 그래프
- DefectParetoChart: 막대 그래프
- SensorControlChart: 센서 관리도 SVG
- SensorDeepChart: 상세 관리도
- YieldCaseDeepDive: 수율 케이스 심층 분석 (Before/Prompt/After 3단 구조)
- AoiCaseDeepDive: AOI 케이스 심층 분석
- SensorCaseDeepDive: 센서 케이스 심층 분석
- VerifyChecklist: 검증 체크포인트
- AIDialogueDemo: AI 대화 비교
- InteractiveWorkshop: 5요소 입력 폼 + 실시간 작업지시서 생성 + 복사 버튼
- FirstRunGuide: Claude 첫 실행 3단계
- NextLecturePreview: 2강 예고

메인 App 구조:
- header (로고 + 태그)
- section 01: Hero (학습목표, 40분 타임라인, 역할 분담)
- section 02: 바이브 코딩 정의 (운전 비유, 만화 4컷)
- section 03: 전통 vs 바이브 (2열 비교, 비교표)
- section 04: 왜 중요한가 (영향 사례, 미니 대시보드)
- section 05: 첨단 공정 사례 (3개 시나리오 카드 + 3개 DeepDive)
- section 06: 의도 설계 (좋은/나쁜 프롬프트, AI 대화 비교, 5요소 표)
- section 07: 미니 워크숍 (실습 단계, 인터랙티브 입력, 첫 실행 가이드)
- section 08: 품질 점검 및 정리 (체크리스트, 2강 예고)
- footer
```

### 인터랙티브 요소
- **체크박스**: intentChecklist 섹션 (CheckCircle2 아이콘)
- **애니메이션**:
  - `motion.div` with `initial/animate/transition`
  - `whileInView`, `whileHover` 효과
  - `.typing-1` ~ `.typing-8` CSS 키프레임
- **스크롤 기반 스토리텔링**: viewport={{ once: true }}로 섹션별 등장
- **복사 버튼**: navigator.clipboard.writeText() + 상태 변경 (복사됨!)
- **인터랙티브 입력 폼**: useState로 5개 필드 관리, 실시간 작업지시서 생성
- **SVG 차트**: 수율/센서 데이터 시각화 (polyline, circle, line 요소)

### 40분 타임라인 구조 (lessonFlow)
```javascript
const lessonFlow = [
  { time: '3분', label: '목표 확인' },
  { time: '7분', label: '개념·비유' },
  { time: '8분', label: '실무 사례' },
  { time: '17분', label: '지시문·실습' },
  { time: '5분', label: '검증·정리' },
];
```

### 스타일 및 테마
```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --accent: #0071e3;
  --text-primary: #1d1d1f;
  --text-secondary: #86868b;
  --border: rgba(0,0,0,0.1);
  --font-main: 'Outfit', sans-serif;
  --font-content: 'Inter', sans-serif;
}
```
- **색상**: Apple 스타일 (흰색 배경, 파란색 액센트)
- **폰트**: Outfit (헤딩), Inter (본문)
- **레이아웃**: 최대 1100px 중앙 정렬, 2rem 패딩
- **카드**: border-radius: 20~24px, 부드러운 그림자
- **반응형**: 그리드 레이아웃, gap 활용

---

## PART 1: 전체 강의 흐름

### 1~10강 요약 (선수 학습 내용)

#### PART 1 (1~4강): AI 바이브 코딩 입문
- **1강**: 바이브 코딩 입문 - 의도 중심 개발 패러다임 이해
- **2강**: AI 도구 최적화 - Claude/Gemini 모델 선택 및 Projects 설정
- **3강**: AI 명령의 기술 - 고품질 프롬프트 작성법 (TCREI 프레임워크)
- **4강**: Claude Code 구축 - CLI 환경 설정 및 자연어 개발 시작

#### PART 2 (5~7강): 포트폴리오 웹사이트 구축
- **5강**: 커리어 웹 구축 - HTML/CSS 포트폴리오 메인 페이지
- **6강**: 웹 서비스 배포 - Git/GitHub/GitHub Pages 배포
- **7강**: 문서 자동화 기술 - Markdown 기반 공정 분석 보고서

#### PART 3 (8~10강): 데이터 시각화 & 앱 개발
- **8강**: 데이터 시각화 기초 - Plotly 인터랙티브 차트
- **9강**: Streamlit 서비스 - Python 웹 프레임워크로 10줄 코드 UI
- **10강**: [미션 1] 스펙 도구 - PPI/휘도/색역 계산기 구현 및 배포

### 11~17강의 위치 및 역할

#### PART 4 (11~12강): API 통합 & 전공 지식 챗봇
- **11강**: API 통합 연동 - Gemini/Claude API Key 발급 및 앱 연결
- **12강**: 전공 지식 챗봇 - 디스플레이 전공 지식 기반 RAG 챗봇

#### PART 5 (13~15강): 디스플레이 시뮬레이터 개발
- **13강**: 픽셀 구조 시각화 - RGB 픽셀 패턴 시뮬레이션
- **14강**: 수율 시뮬레이터 - 공정 변수와 수율 상관관계 분석
- **15강**: 전문 배포 전략 - Streamlit Cloud 원클릭 배포 및 버전 관리

#### PART 6 (16~17강): 보안 & 메시징 자동화
- **16강**: 보안 및 환경 관리 - .env 파일, GitHub Secrets, API Key 보안
- **17강**: 메시징 자동화 - Telegram 봇 API로 실시간 알림 시스템

### 11~17강 전체 학습 목표
1. **API 활용 역량**: Gemini/Claude API를 앱에 통합하여 지능형 기능 구현
2. **도메인 전문 앱 개발**: 디스플레이 픽셀 시뮬레이터, 수율 분석 도구 제작
3. **보안 및 배포**: 실무 수준의 API Key 보안 관리 및 클라우드 배포
4. **자동화 시스템**: 텔레그램 봇으로 공정 이상 알림 자동 발송

---

## PART 2: 강의별 상세 기획

### 🎯 11강: API 통합 연동

#### 학습 목표 (3개)
1. Gemini API Key를 발급하고 Python 앱에서 API 호출 구현
2. API Key 보안 원칙을 이해하고 환경 변수로 관리
3. AI API를 활용한 데이터 분석 자동화 실습

#### 40분 타임라인
- **0~3분**: 목표 확인 및 도입
  - "이제 여러분이 만든 앱에 AI 두뇌를 심습니다"
  - 학습목표 3개 제시
  - 40분 타임라인 시각화
- **3~10분**: 개념·비유
  - API란? "레스토랑 주문 시스템" 비유
  - API Key는 출입증 (보안 필수)
  - Gemini vs Claude API 비교 (무료/유료, 속도, 한글 품질)
- **10~18분**: 실무 사례
  - 사례 1: 수율 데이터를 Gemini에게 분석 요청
  - 사례 2: 불량 이미지 설명 자동 생성
  - 사례 3: 공정 이상 원인 후보 추출
- **18~35분**: 지시문·실습
  - Google AI Studio에서 API Key 발급
  - `pip install google-generativeai` 설치
  - 5줄 코드로 "Hello, Gemini!" 실행
  - 수율 CSV 데이터를 Gemini에게 분석 요청
  - 에러 처리 (API Key 없음, 할당량 초과)
- **35~40분**: 검증·정리
  - 체크리스트: API Key 발급 완료, 첫 호출 성공, 에러 처리 확인
  - 다음 강의 예고: 이 API로 전공 지식 챗봇 만들기

#### 인터랙티브 요소 (colleague_repo 패턴 적용)
- **학습목표 카드**: 3개 카드 (아이콘: Bot, Key, Zap)
- **API 비유 시각화**: 레스토랑 주문 흐름도 (손님 → 웨이터 → 주방)
- **비교표**: Gemini vs Claude (무료 한도, 속도, 한글 품질, 이미지 지원)
- **실습 가이드**: 3단계 (API Key 발급 → 코드 작성 → 실행 확인)
- **코드 복사 버튼**: 5줄 Hello Gemini 코드
- **체크리스트**: API Key 보안 5원칙 (체크 애니메이션)
- **에러 대응 카드**: 3가지 흔한 에러와 해결법

#### 핵심 메시지 (1문장)
> "API는 여러분의 앱에 AI 지능을 연결하는 다리입니다. 코드는 5줄이면 충분합니다."

#### 결과물
- Gemini API Key 발급 완료
- `api_test.py` 파일 (첫 API 호출 코드)
- 수율 CSV 분석 결과 출력 (콘솔 또는 간단한 HTML)

#### 데이터 배열 구조 (App.tsx에 들어갈 내용)
```javascript
const apiConcepts = [
  { icon: Bot, title: 'API란?', description: '앱이 외부 AI 서비스와 대화하는 창구' },
  { icon: Key, title: 'API Key', description: '출입증처럼 본인 확인용 비밀번호' },
  { icon: Zap, title: '호출 과정', description: '요청 → 처리 → 응답 (1~3초)' },
];

const apiComparison = [
  { model: 'Gemini 1.5 Flash', free: '15 req/min', speed: '빠름', korean: '우수', image: '지원' },
  { model: 'Claude Sonnet', free: '없음', speed: '중간', korean: '최고', image: '지원' },
];

const apiUseCases = [
  { title: '수율 분석', prompt: '이 CSV 데이터에서 수율 하락 원인 3가지 추출', result: 'Recipe 변경, 설비 PM 지연, AOI 불량률 증가' },
  { title: '이미지 설명', prompt: 'AOI 이미지를 보고 Scratch/Particle/Mura 판단', result: 'Scratch 가능성 92%' },
  { title: '원인 추론', prompt: '온도 90도 초과, 압력 2.5 bar 상승 시 예상 문제는?', result: 'Chiller 공급 이상 또는 Regulator drift' },
];

const apiSetupSteps = [
  { step: '01', title: 'Google AI Studio 접속', body: 'aistudio.google.com → Get API Key 클릭', icon: ExternalLink },
  { step: '02', title: 'API Key 복사', body: '생성된 Key를 복사 (한 번만 보임)', icon: Copy },
  { step: '03', title: '.env 파일 생성', body: 'GEMINI_API_KEY=복사한키 저장', icon: FileText },
];

const apiCodeSample = `import google.generativeai as genai
import os

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content('Hello, Gemini!')
print(response.text)`;

const apiErrorHandling = [
  { error: 'API Key not found', reason: '.env 파일 없음 또는 변수명 오타', solution: '.env 파일 확인, python-dotenv 설치' },
  { error: 'Quota exceeded', reason: '무료 할당량 15 req/min 초과', solution: '1분 대기 또는 유료 플랜' },
  { error: 'Invalid request', reason: '프롬프트가 너무 짧거나 긴 경우', solution: '명확한 질문으로 수정' },
];

const apiSecurityChecklist = [
  'API Key를 GitHub에 절대 커밋하지 않기 (.gitignore에 .env 추가)',
  '.env 파일은 로컬에만 보관하고 팀원과 공유 금지',
  'API Key 노출 시 즉시 재발급',
  '프로덕션 환경에서는 환경 변수로 주입',
  '할당량 모니터링 및 예산 알림 설정',
];
```

---

### 🎯 12강: 전공 지식 챗봇

#### 학습 목표 (3개)
1. 디스플레이 전공 용어 사전을 AI 챗봇에 학습시키기
2. Streamlit으로 대화형 UI 구현 (질문 입력 → AI 답변)
3. 면접 대비 질문 리스트와 답변 자동 생성

#### 40분 타임라인
- **0~3분**: 목표 확인 및 도입
  - "면접관이 묻는 전공 질문에 AI가 먼저 답해줍니다"
  - 학습목표 3개 제시
- **3~10분**: 개념·비유
  - RAG (Retrieval-Augmented Generation)란? "참고서를 펼쳐놓고 답하는 AI"
  - 전공 지식 출처: 교과서, 논문, 기술 문서
  - 챗봇 vs 검색엔진 차이
- **10~18분**: 실무 사례
  - 사례 1: "TFT-LCD와 OLED 차이는?" → 상세 답변
  - 사례 2: "Inkjet Printing 공정 설명" → 단계별 답변
  - 사례 3: "QD(Quantum Dot) 장점은?" → 비교표 생성
- **18~35분**: 지시문·실습
  - `display_terms.txt` 파일 생성 (전공 용어 50개)
  - Gemini API로 파일 컨텍스트 전달
  - Streamlit 챗봇 UI 구현 (채팅 기록 유지)
  - 면접 질문 리스트 자동 생성 (20문항)
- **35~40분**: 검증·정리
  - 체크리스트: 용어 파일 준비, 챗봇 실행, 면접 질문 생성 완료
  - 다음 강의 예고: 이제 디스플레이 시뮬레이터를 만듭니다

#### 인터랙티브 요소
- **학습목표 카드**: 3개 (FileText, MessageSquare, Target)
- **RAG 비유**: "참고서 펼쳐놓기" 시각화 (책 → AI → 답변)
- **전공 용어 카드**: 10개 샘플 (TFT, OLED, PPI, 색역, 휘도 등)
- **챗봇 UI 프리뷰**: 3개 질문/답변 예시
- **면접 질문 샘플**: 접히는 아코디언 (20문항)
- **코드 복사 버튼**: Streamlit 챗봇 코드
- **체크리스트**: 챗봇 완성 5단계

#### 핵심 메시지
> "AI는 여러분의 개인 전공 과외 선생님입니다. 교과서를 학습시키면 24시간 질문에 답합니다."

#### 결과물
- `display_terms.txt` (전공 용어 사전 50개)
- `chatbot.py` (Streamlit 챗봇 앱)
- `interview_questions.md` (면접 질문 20개 + AI 답변)

#### 데이터 배열 구조
```javascript
const chatbotConcepts = [
  { icon: FileText, title: '지식 베이스', description: '교과서, 논문, 기술 문서를 텍스트 파일로 준비' },
  { icon: MessageSquare, title: 'RAG 챗봇', description: 'AI가 참고 자료를 보고 답변 생성' },
  { icon: Target, title: '면접 대비', description: '예상 질문 20개와 답변 자동 생성' },
];

const displayTerms = [
  { term: 'TFT-LCD', definition: 'Thin Film Transistor Liquid Crystal Display, 액정에 박막 트랜지스터를 결합한 디스플레이' },
  { term: 'OLED', definition: 'Organic Light-Emitting Diode, 유기 발광 다이오드 기반 자체 발광 디스플레이' },
  { term: 'PPI', definition: 'Pixels Per Inch, 1인치당 픽셀 수 (해상도 지표)' },
  { term: 'Color Gamut', definition: '색역, 표현 가능한 색상 범위 (sRGB, DCI-P3, Rec.2020)' },
  { term: 'Luminance', definition: '휘도, 단위 면적당 빛의 밝기 (cd/m²)' },
  { term: 'Inkjet Printing', definition: '잉크젯 방식으로 유기 재료를 증착하는 OLED 제조 공정' },
  { term: 'QD', definition: 'Quantum Dot, 양자점, 나노 입자로 색 순도를 높이는 기술' },
  { term: 'Array', definition: '백플레인, TFT와 전극이 형성된 기판' },
  { term: 'Cell', definition: '액정 또는 유기층을 봉입한 중간 공정' },
  { term: 'Module', definition: '최종 조립 공정, 백라이트/회로 결합' },
];

const chatbotUseCases = [
  { question: 'TFT-LCD와 OLED의 차이는?', answer: 'TFT-LCD는 백라이트 필요, OLED는 자체 발광. OLED가 명암비, 시야각, 응답속도 우수. TFT-LCD는 가격 경쟁력.' },
  { question: 'Inkjet Printing 공정 설명', answer: '1. 기판 준비 2. 격벽 형성 3. 잉크젯 헤드로 RGB 재료 분사 4. 건조 5. 봉지' },
  { question: 'QD(Quantum Dot) 장점은?', answer: '색 순도 향상 (>90% DCI-P3), 전력 효율 개선, 기존 백라이트에 필름 추가만으로 적용 가능' },
];

const interviewQuestions = [
  'TFT-LCD와 OLED의 구조적 차이를 설명하세요.',
  '디스플레이 PPI(Pixels Per Inch) 계산 방법은?',
  'DCI-P3와 sRGB 색역의 차이는 무엇인가요?',
  'Inkjet Printing 공정의 장점과 단점은?',
  'OLED 번인(Burn-in) 현상의 원인과 대책은?',
  'TFT Array 공정에서 Photo 공정의 역할은?',
  'LTPS와 Oxide TFT의 차이는?',
  '디스플레이 휘도 측정 단위 cd/m²는 무엇인가요?',
  'Color Filter의 역할과 구조는?',
  'QD-OLED와 WOLED의 차이는?',
];
```

---

### 🎯 13강: 픽셀 구조 시각화

#### 학습 목표 (3개)
1. RGB 픽셀 배열 구조를 SVG/Canvas로 시각화
2. 서브픽셀 배치 방식 (RGB Stripe, PenTile) 비교
3. Streamlit 슬라이더로 픽셀 개수/간격 조정 실습

#### 40분 타임라인
- **0~3분**: 목표 확인 및 도입
  - "디스플레이를 확대하면 빨강/초록/파랑 점이 보입니다"
  - 학습목표 3개 제시
- **3~10분**: 개념·비유
  - 픽셀 = RGB 서브픽셀 3개 조합
  - RGB Stripe vs PenTile (삼성 OLED)
  - PPI 공식: √(가로²+세로²) / 대각선 인치
- **10~18분**: 실무 사례
  - 사례 1: Galaxy S24 Ultra (PenTile, 501 PPI)
  - 사례 2: iPhone 15 Pro (RGB Stripe, 460 PPI)
  - 사례 3: 32인치 4K 모니터 (RGB Stripe, 138 PPI)
- **18~35분**: 지시문·실습
  - Matplotlib로 RGB 픽셀 그리드 그리기
  - Streamlit 슬라이더: 픽셀 개수 (10~100)
  - PenTile 배열 구현 (RG-BG 반복)
  - 확대 시뮬레이션 (픽셀 간격 조정)
- **35~40분**: 검증·정리
  - 체크리스트: RGB 픽셀 시각화, PenTile 구현, PPI 계산 완료
  - 다음 강의 예고: 이제 수율 시뮬레이터를 만듭니다

#### 인터랙티브 요소
- **학습목표 카드**: 3개 (Grid, Layers, Sliders)
- **픽셀 구조 다이어그램**: RGB Stripe 3x3 그리드
- **PenTile 비교**: 나란히 배치 (Stripe vs PenTile)
- **PPI 계산기**: 입력 (가로, 세로, 대각선) → 결과 (PPI)
- **실시간 시뮬레이터**: 슬라이더 → 픽셀 그리드 변화 (Framer Motion)
- **제품 비교표**: 3개 제품 (Galaxy/iPhone/Monitor)
- **코드 복사 버튼**: Matplotlib 픽셀 그리기 코드

#### 핵심 메시지
> "디스플레이는 수백만 개의 빨강/초록/파랑 점입니다. AI로 이 배열을 시각화하면 PPI와 구조를 이해합니다."

#### 결과물
- `pixel_simulator.py` (Streamlit 픽셀 시뮬레이터)
- RGB Stripe vs PenTile 비교 이미지
- PPI 계산기 기능

#### 데이터 배열 구조
```javascript
const pixelConcepts = [
  { icon: Grid, title: '픽셀 = 3개 서브픽셀', description: 'R(빨강) + G(초록) + B(파랑) 조합' },
  { icon: Layers, title: '배열 방식', description: 'RGB Stripe (일반) vs PenTile (OLED)' },
  { icon: Sliders, title: 'PPI 계산', description: '해상도 / 대각선 인치' },
];

const pixelArrangements = [
  { type: 'RGB Stripe', structure: 'R-G-B | R-G-B | R-G-B', devices: 'LCD, iPhone', sharpness: '높음' },
  { type: 'PenTile', structure: 'RG-BG | RG-BG', devices: 'Samsung OLED', sharpness: '중간', advantage: '수명 향상' },
];

const deviceSpecs = [
  { device: 'Galaxy S24 Ultra', resolution: '3120x1440', diagonal: 6.8, ppi: 501, type: 'PenTile OLED' },
  { device: 'iPhone 15 Pro', resolution: '2556x1179', diagonal: 6.1, ppi: 460, type: 'RGB OLED' },
  { device: '32" 4K Monitor', resolution: '3840x2160', diagonal: 32, ppi: 138, type: 'RGB LCD' },
];

const ppiFormula = 'PPI = √(width² + height²) / diagonal_inch';

const pixelSimulatorCode = `import streamlit as st
import matplotlib.pyplot as plt
import numpy as np

st.title("픽셀 구조 시뮬레이터")
pixel_count = st.slider("픽셀 개수", 10, 100, 30)

fig, ax = plt.subplots(figsize=(8, 8))
for i in range(pixel_count):
    for j in range(pixel_count):
        # R, G, B 서브픽셀
        ax.add_patch(plt.Rectangle((i*3, j), 1, 1, color='red'))
        ax.add_patch(plt.Rectangle((i*3+1, j), 1, 1, color='green'))
        ax.add_patch(plt.Rectangle((i*3+2, j), 1, 1, color='blue'))

ax.set_xlim(0, pixel_count*3)
ax.set_ylim(0, pixel_count)
ax.set_aspect('equal')
st.pyplot(fig)`;
```

---

### 🎯 14강: 수율 시뮬레이터

#### 학습 목표 (3개)
1. 공정 변수(온도, 압력, 시간)와 수율의 상관관계 시각화
2. Plotly로 인터랙티브 3D 산점도 구현
3. 최적 조건 탐색 시뮬레이션 (회귀 분석)

#### 40분 타임라인
- **0~3분**: 목표 확인 및 도입
  - "온도를 1도 올리면 수율이 어떻게 변할까요?"
  - 학습목표 3개 제시
- **3~10분**: 개념·비유
  - 수율 = 정상 제품 / 전체 생산량
  - 공정 변수: 온도, 압력, 시간, 유량
  - 상관관계 vs 인과관계
- **10~18분**: 실무 사례
  - 사례 1: CVD 온도 ↑ → 막두께 ↑ → 수율 ↓
  - 사례 2: 압력 2.3~2.5 bar 최적 구간
  - 사례 3: 노광 시간 +10% → 수율 -3%
- **18~35분**: 지시문·실습
  - 가상 데이터 생성 (온도 70~90, 수율 85~98)
  - Plotly 산점도 (온도 vs 수율)
  - Streamlit 슬라이더: 온도/압력 조정 → 예상 수율 출력
  - 회귀선 표시 (sklearn LinearRegression)
- **35~40분**: 검증·정리
  - 체크리스트: 산점도 생성, 회귀선 추가, 최적 조건 탐색 완료
  - 다음 강의 예고: 이제 이 앱을 클라우드에 배포합니다

#### 인터랙티브 요소
- **학습목표 카드**: 3개 (TrendingUp, Sliders, Target)
- **수율 정의**: 공식 시각화 (정상 제품 / 전체)
- **변수 상관표**: 4x4 히트맵 (온도/압력/시간/유량)
- **3D 산점도**: Plotly 인터랙티브 (회전 가능)
- **슬라이더 시뮬레이터**: 온도 조정 → 수율 변화 애니메이션
- **최적 구간 표시**: 초록색 영역 (90% 이상 수율)
- **코드 복사 버튼**: Plotly 산점도 + 회귀선 코드

#### 핵심 메시지
> "수율은 감이 아니라 데이터입니다. AI로 변수 관계를 시각화하면 최적 조건을 찾습니다."

#### 결과물
- `yield_simulator.py` (Streamlit 수율 시뮬레이터)
- 온도/압력 vs 수율 인터랙티브 차트
- 최적 조건 추천 기능

#### 데이터 배열 구조
```javascript
const yieldConcepts = [
  { icon: TrendingUp, title: '수율 정의', description: '정상 제품 / 전체 생산량 × 100%' },
  { icon: Sliders, title: '공정 변수', description: '온도, 압력, 시간, 유량' },
  { icon: Target, title: '최적화', description: '수율 90% 이상 달성 조건 탐색' },
];

const processVariables = [
  { variable: '온도 (°C)', range: '70~90', optimal: '78~82', impact: '높음' },
  { variable: '압력 (bar)', range: '2.0~2.8', optimal: '2.3~2.5', impact: '중간' },
  { variable: '시간 (sec)', range: '30~60', optimal: '40~45', impact: '중간' },
  { variable: '유량 (slm)', range: '100~150', optimal: '120~130', impact: '낮음' },
];

const yieldCases = [
  { case: 'CVD 온도 상승', before: '75°C → 수율 92%', after: '85°C → 수율 87%', reason: '막두께 과다' },
  { case: '압력 최적화', before: '2.1 bar → 수율 88%', after: '2.4 bar → 수율 94%', reason: '증착 균일도 향상' },
  { case: '노광 시간 증가', before: '35 sec → 수율 93%', after: '45 sec → 수율 90%', reason: '과노광' },
];

const yieldSimulatorCode = `import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np

st.title("수율 시뮬레이터")

# 가상 데이터
temp = np.linspace(70, 90, 100)
yield_rate = 95 - 0.3 * (temp - 80)**2 + np.random.normal(0, 2, 100)

df = pd.DataFrame({'Temperature': temp, 'Yield': yield_rate})

fig = px.scatter(df, x='Temperature', y='Yield',
                 title='온도 vs 수율',
                 trendline='ols')
st.plotly_chart(fig)

# 슬라이더
user_temp = st.slider("온도 설정", 70, 90, 80)
predicted_yield = 95 - 0.3 * (user_temp - 80)**2
st.metric("예상 수율", f"{predicted_yield:.1f}%")`;
```

---

### 🎯 15강: 전문 배포 전략

#### 학습 목표 (3개)
1. Streamlit Cloud에 앱을 원클릭 배포
2. GitHub 연동 및 자동 재배포 설정
3. 커스텀 도메인 및 비공개 앱 설정

#### 40분 타임라인
- **0~3분**: 목표 확인 및 도입
  - "이제 여러분의 앱을 전 세계에 공개합니다"
  - 학습목표 3개 제시
- **3~10분**: 개념·비유
  - 배포 = 로컬 → 클라우드 (24시간 접속 가능)
  - Streamlit Cloud vs Heroku vs AWS
  - 무료 플랜 제약 (3개 앱, 1GB RAM)
- **10~18분**: 실무 사례
  - 사례 1: 포트폴리오 앱 배포 (면접 시 URL 제출)
  - 사례 2: 팀 내부 대시보드 (비공개 설정)
  - 사례 3: 데모 앱 (커스텀 도메인)
- **18~35분**: 지시문·실습
  - GitHub에 코드 푸시
  - Streamlit Cloud 가입 및 GitHub 연동
  - New app → Repository 선택 → Deploy
  - requirements.txt 작성
  - secrets.toml로 API Key 주입
- **35~40분**: 검증·정리
  - 체크리스트: 앱 배포 완료, URL 공유, API Key 보안 설정
  - 다음 강의 예고: 보안 강화 (환경 변수, GitHub Secrets)

#### 인터랙티브 요소
- **학습목표 카드**: 3개 (Cloud, Repeat, Lock)
- **배포 플랫폼 비교표**: Streamlit Cloud vs Heroku vs Vercel
- **배포 흐름도**: Local → GitHub → Streamlit Cloud → Live URL
- **3단계 가이드**: 접히는 아코디언 (가입 → 연동 → 배포)
- **requirements.txt 생성**: 코드 복사 버튼
- **secrets 설정**: 시각적 가이드 (Settings → Secrets)
- **포트폴리오 URL 예시**: 3개 샘플 (클릭 가능)

#### 핵심 메시지
> "배포는 복잡하지 않습니다. GitHub 푸시 → Streamlit Cloud 클릭 3번이면 끝입니다."

#### 결과물
- 배포된 앱 URL (예: `https://yourapp.streamlit.app`)
- `requirements.txt` 파일
- `.streamlit/secrets.toml` 설정 완료

#### 데이터 배열 구조
```javascript
const deployConcepts = [
  { icon: Cloud, title: '클라우드 배포', description: '로컬 앱을 24시간 접속 가능한 서버에 올리기' },
  { icon: Repeat, title: '자동 재배포', description: 'GitHub 푸시 시 자동으로 업데이트' },
  { icon: Lock, title: '비공개 설정', description: '팀 내부용 또는 비밀번호 보호' },
];

const platformComparison = [
  { platform: 'Streamlit Cloud', free: '3 apps', setup: '쉬움', python: '최적화', custom_domain: '유료' },
  { platform: 'Heroku', free: '없음 (유료 전환)', setup: '중간', python: '지원', custom_domain: '지원' },
  { platform: 'Vercel', free: '무제한', setup: '중간', python: '제한적', custom_domain: '지원' },
];

const deploySteps = [
  { step: '01', title: 'GitHub 푸시', body: 'git add . && git commit -m "Deploy" && git push', icon: GitBranch },
  { step: '02', title: 'Streamlit Cloud 연동', body: 'share.streamlit.io → New app → GitHub 레포 선택', icon: Cloud },
  { step: '03', title: 'Deploy 클릭', body: '2~3분 대기 → Live URL 생성', icon: Zap },
];

const requirementsTxt = `streamlit==1.32.0
pandas==2.2.0
plotly==5.18.0
google-generativeai==0.4.0
python-dotenv==1.0.0`;

const secretsToml = `[secrets]
GEMINI_API_KEY = "your_api_key_here"`;

const portfolioExamples = [
  { name: '수율 시뮬레이터', url: 'https://yield-sim.streamlit.app', views: 124 },
  { name: '픽셀 시뮬레이터', url: 'https://pixel-viz.streamlit.app', views: 89 },
  { name: '전공 챗봇', url: 'https://display-chatbot.streamlit.app', views: 201 },
];
```

---

### 🎯 16강: 보안 및 환경 관리

#### 학습 목표 (3개)
1. .env 파일로 API Key를 코드에서 분리
2. .gitignore로 민감 정보 커밋 방지
3. GitHub Secrets로 배포 환경 보안 강화

#### 40분 타임라인
- **0~3분**: 목표 확인 및 도입
  - "API Key가 GitHub에 노출되면 1시간 내 악용됩니다"
  - 학습목표 3개 제시
- **3~10분**: 개념·비유
  - 환경 변수 = 프로그램 밖 설정값
  - .env 파일 = 로컬 비밀 금고
  - GitHub Secrets = 클라우드 비밀 금고
- **10~18분**: 실무 사례
  - 사례 1: API Key 노출 → 300달러 청구
  - 사례 2: DB 비밀번호 유출 → 데이터 삭제
  - 사례 3: GitHub Security Alert 대응
- **18~35분**: 지시문·실습
  - .env 파일 생성 (GEMINI_API_KEY=...)
  - python-dotenv로 로드
  - .gitignore에 .env 추가
  - GitHub Secrets 설정 (Settings → Secrets → New)
  - Streamlit Cloud에서 secrets.toml 주입
- **35~40분**: 검증·정리
  - 체크리스트: .env 생성, .gitignore 확인, GitHub Secrets 설정
  - 다음 강의 예고: 텔레그램 봇으로 알림 자동화

#### 인터랙티브 요소
- **학습목표 카드**: 3개 (Lock, ShieldCheck, AlertTriangle)
- **보안 위협 시각화**: API Key 노출 → 악용 시나리오 (타임라인)
- **3단계 보안**: .env → .gitignore → GitHub Secrets
- **코드 비교**: 나쁜 예 (하드코딩) vs 좋은 예 (환경 변수)
- **.gitignore 체크리스트**: 8개 항목 (체크 애니메이션)
- **GitHub Secrets 가이드**: 스크린샷 + 단계별 설명
- **보안 점검표**: 10개 항목 (완료 시 초록색)

#### 핵심 메시지
> "API Key는 절대 코드에 쓰지 마세요. .env 파일과 GitHub Secrets가 여러분의 금고입니다."

#### 결과물
- `.env` 파일 (로컬 전용)
- `.gitignore` 파일 (보안 강화)
- GitHub Secrets 설정 완료

#### 데이터 배열 구조
```javascript
const securityConcepts = [
  { icon: Lock, title: '.env 파일', description: '로컬 환경에서 API Key 분리 저장' },
  { icon: ShieldCheck, title: '.gitignore', description: 'GitHub 커밋 시 .env 제외' },
  { icon: AlertTriangle, title: 'GitHub Secrets', description: '클라우드 배포 시 보안 주입' },
];

const securityThreats = [
  { time: '00:00', event: 'API Key를 코드에 하드코딩', risk: '높음' },
  { time: '00:05', event: 'GitHub에 푸시', risk: '높음' },
  { time: '00:30', event: '봇이 GitHub 스캔 후 Key 탈취', risk: '매우 높음' },
  { time: '01:00', event: 'Key로 무단 API 호출 (300달러 청구)', risk: '매우 높음' },
];

const codeComparison = {
  bad: `# ❌ 절대 하지 마세요
api_key = "AIzaSyC..."
genai.configure(api_key=api_key)`,
  good: `# ✅ 환경 변수 사용
import os
from dotenv import load_dotenv
load_dotenv()
api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)`
};

const gitignoreItems = [
  '.env',
  '.env.local',
  'secrets.toml',
  '*.key',
  '__pycache__/',
  '*.pyc',
  '.DS_Store',
  'venv/',
];

const githubSecretsSteps = [
  { step: '01', title: 'Repository → Settings', body: '레포지토리 설정 페이지로 이동' },
  { step: '02', title: 'Secrets and variables → Actions', body: '왼쪽 메뉴에서 선택' },
  { step: '03', title: 'New repository secret', body: 'Name: GEMINI_API_KEY, Value: [복사한 키]' },
  { step: '04', title: 'Add secret', body: '저장 후 Actions에서 사용 가능' },
];

const securityChecklist = [
  '코드에 API Key가 하드코딩되어 있지 않은가?',
  '.env 파일이 .gitignore에 추가되어 있는가?',
  'GitHub에 .env 파일이 커밋되지 않았는가?',
  'GitHub Secrets에 API Key가 등록되어 있는가?',
  'Streamlit Cloud secrets.toml 설정을 완료했는가?',
  'API Key 사용량 모니터링을 활성화했는가?',
  'API Key 노출 시 즉시 재발급할 계획이 있는가?',
  '팀원과 .env 파일을 직접 공유하지 않았는가?',
  'requirements.txt에 python-dotenv가 포함되어 있는가?',
  '배포 환경에서 환경 변수가 정상 로드되는가?',
];
```

---

### 🎯 17강: 메시징 자동화

#### 학습 목표 (3개)
1. Telegram Bot API로 봇 생성 및 토큰 발급
2. Python에서 메시지 자동 발송 (텍스트, 이미지, 파일)
3. 공정 이상 감지 시 실시간 알림 시스템 구축

#### 40분 타임라인
- **0~3분**: 목표 확인 및 도입
  - "수율 하락 시 자동으로 휴대폰에 알림이 옵니다"
  - 학습목표 3개 제시
- **3~10분**: 개념·비유
  - 텔레그램 봇 = 24시간 근무하는 비서
  - 알림 vs 이메일 (즉시성, 읽음율)
  - 실시간 모니터링의 중요성
- **10~18분**: 실무 사례
  - 사례 1: 수율 90% 미만 시 알림
  - 사례 2: 설비 온도 초과 시 알림 + 차트 이미지
  - 사례 3: 일일 생산량 리포트 자동 발송
- **18~35분**: 지시문·실습
  - @BotFather로 봇 생성 및 토큰 발급
  - python-telegram-bot 설치
  - "Hello, Bot!" 메시지 발송
  - 수율 데이터 읽고 조건부 알림 (if yield < 90)
  - Matplotlib 차트를 이미지로 발송
- **35~40분**: 검증·정리
  - 체크리스트: 봇 생성, 메시지 발송, 조건부 알림 완료
  - 최종 프로젝트 예고: 이제 모든 기술을 종합합니다

#### 인터랙티브 요소
- **학습목표 카드**: 3개 (MessageCircle, Bell, Zap)
- **텔레그램 봇 장점**: 4개 카드 (즉시성, 무료, 멀티미디어, 그룹 지원)
- **봇 생성 가이드**: @BotFather 대화 흐름 (채팅 UI 스타일)
- **메시지 종류**: 텍스트, 이미지, 파일, 위치 (4개 예시)
- **알림 시나리오**: 3개 flowchart (수율 → 조건 → 알림)
- **코드 복사 버튼**: "Hello, Bot!" 코드
- **데모 메시지**: 실제 텔레그램 알림 스크린샷

#### 핵심 메시지
> "텔레그램 봇은 여러분의 24시간 공정 감시자입니다. 이상 발생 시 1초 내 휴대폰에 알립니다."

#### 결과물
- 텔레그램 봇 생성 완료 (토큰 발급)
- `telegram_bot.py` (메시지 발송 코드)
- 수율 이상 알림 시스템 (조건부 자동 발송)

#### 데이터 배열 구조
```javascript
const telegramConcepts = [
  { icon: MessageCircle, title: '텔레그램 봇', description: 'API로 제어하는 자동 메시지 발송 계정' },
  { icon: Bell, title: '실시간 알림', description: '이상 감지 즉시 휴대폰 푸시 알림' },
  { icon: Zap, title: '자동화', description: '수율/온도/압력 조건 만족 시 자동 발송' },
];

const telegramAdvantages = [
  { title: '즉시성', description: '푸시 알림 1초 내 도착', icon: Zap },
  { title: '무료', description: 'API 호출 무제한 (봇 생성 무료)', icon: DollarSign },
  { title: '멀티미디어', description: '텍스트, 이미지, 파일, 위치 전송', icon: Image },
  { title: '그룹 지원', description: '팀 채팅방에 자동 발송 가능', icon: Users },
];

const botfatherFlow = [
  { user: '사용자', message: '/newbot', response: '' },
  { user: 'BotFather', message: 'Alright, a new bot. How are we going to call it?', response: '' },
  { user: '사용자', message: 'DisplayMonitorBot', response: '' },
  { user: 'BotFather', message: 'Good. Now choose a username ending in bot.', response: '' },
  { user: '사용자', message: 'display_monitor_bot', response: '' },
  { user: 'BotFather', message: 'Done! Your token: 1234567890:ABCdefGHIjklMNOpqrsTUVwxyz', response: 'token' },
];

const messageTypes = [
  { type: 'Text', example: '수율 87% 하락 감지!', code: 'bot.send_message(chat_id, "수율 87%")' },
  { type: 'Image', example: 'yield_chart.png', code: 'bot.send_photo(chat_id, open("chart.png", "rb"))' },
  { type: 'File', example: 'report.pdf', code: 'bot.send_document(chat_id, open("report.pdf", "rb"))' },
  { type: 'Location', example: '공장 위치', code: 'bot.send_location(chat_id, 37.5, 127.0)' },
];

const alertScenarios = [
  { trigger: '수율 < 90%', condition: 'if yield < 90', action: '알림 발송 + 차트 이미지', frequency: '1회/발생' },
  { trigger: '온도 > 87°C', condition: 'if temp > 87', action: '알림 발송 + 설비 ID', frequency: '1회/발생' },
  { trigger: '일일 리포트', condition: 'schedule 18:00', action: '일일 생산량 요약', frequency: '1회/일' },
];

const helloBotCode = `import os
from telegram import Bot
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

bot = Bot(token=TOKEN)
bot.send_message(chat_id=CHAT_ID, text="Hello, Bot!")`;

const yieldAlertCode = `import pandas as pd
from telegram import Bot

df = pd.read_csv('yield_log.csv')
latest_yield = df['yield'].iloc[-1]

if latest_yield < 90:
    bot = Bot(token=TOKEN)
    message = f"⚠️ 수율 이상 감지: {latest_yield}%"
    bot.send_message(chat_id=CHAT_ID, text=message)

    # 차트 이미지 발송
    import matplotlib.pyplot as plt
    plt.plot(df['date'], df['yield'])
    plt.savefig('yield_chart.png')
    bot.send_photo(chat_id=CHAT_ID, photo=open('yield_chart.png', 'rb'))`;
```

---

## PART 3: 통일성 원칙

### 구조적 통일성
- **40분 타임라인**: 모든 강의 동일 (3+7+8+17+5분)
- **섹션 구조**:
  1. Hero (학습목표 + 타임라인 + 역할 분담)
  2. 개념·비유 (시각화 + 비교)
  3. 실무 사례 (3개 시나리오 카드)
  4. DeepDive (Before/Prompt/After 3단 구조)
  5. 실습 (인터랙티브 워크숍)
  6. 검증·정리 (체크리스트 + 다음 강의 예고)
- **데이터 배열 → map 렌더링**: colleague_repo와 동일 패턴

### 시각적 통일성
- **색상 테마**:
  - Primary: #0071e3 (Apple Blue)
  - Background: #ffffff / #f8f9fa
  - Text: #1d1d1f / #86868b
  - Accent: #0071e3
- **아이콘**: Lucide React (동일 스타일)
- **애니메이션**: Framer Motion (initial/animate/whileInView)
- **폰트**: Outfit (헤딩), Inter (본문)
- **카드**: border-radius 20~24px, 그림자 subtle

### 기술적 통일성
- **React 19** + **TypeScript**
- **Vite** 빌드 시스템
- **package.json**: colleague_repo와 동일 의존성
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.479.0"
  }
}
```

---

## PART 4: 프로젝트 연계 계획

### 프로젝트 1 (1~4강 이후)
- **주제**: 소개 웹페이지 (HTML/CSS 포트폴리오)
- **기술**: HTML, CSS, GitHub Pages
- **기간**: 1~2일

### 프로젝트 2 (5~10강 이후)
- **주제**: 공정 시뮬레이터 (Streamlit + Plotly)
- **기술**: Python, Streamlit, Plotly, 데이터 시각화
- **기간**: 1~2일

### 프로젝트 3 (11~17강 이후)
- **주제**: AI 디스플레이 종합 솔루션
- **활용 내용**:
  - **11강 (API)**: Gemini API로 데이터 분석
  - **12강 (챗봇)**: 전공 지식 질의응답
  - **13강 (시각화)**: 픽셀 구조 시뮬레이터
  - **14강 (시뮬레이터)**: 수율 최적화 도구
  - **15강 (배포)**: Streamlit Cloud 배포
  - **16강 (보안)**: API Key 환경 변수 관리
  - **17강 (메시징)**: 텔레그램 알림 연동

- **난이도별 차이**:
  - **초급**:
    - 기본 Streamlit 앱 (수율 입력 → Gemini 분석 → 결과 출력)
    - 텔레그램 메시지 1개 발송
    - Streamlit Cloud 배포
    - 소요: 1~2일
  - **중급**:
    - 픽셀 시뮬레이터 + 수율 차트 + Gemini 분석 통합
    - 조건부 텔레그램 알림 (수율 < 90% 시)
    - 커스텀 CSS 스타일링
    - GitHub Secrets 설정
    - 소요: 1~2일
  - **고급**:
    - 전공 챗봇 + 픽셀/수율 시뮬레이터 통합 대시보드
    - 실시간 데이터 업로드 및 분석
    - 텔레그램 봇 명령어 (/ start, /report, /alert)
    - 다국어 지원 (한/영)
    - 커스텀 도메인 배포
    - 소요: 2일

---

## PART 5: 제작 가이드라인

### 기술 스택 (colleague_repo와 동일)
```json
{
  "name": "lecture_11",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.479.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "~5.7.2",
    "vite": "^6.2.0"
  }
}
```

### 파일 구조 (각 강의마다)
```
lecture_11/
├── src/
│   ├── App.tsx          (메인 컴포넌트, 1500~2000 라인)
│   ├── index.css        (스타일, 2000~3000 라인)
│   └── main.tsx         (엔트리 포인트)
├── public/
│   ├── logo.png
│   ├── api_diagram.png
│   ├── security_flow.png
│   └── [기타 이미지]
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 컴포넌트 패턴 (colleague_repo에서 추출)
```typescript
// 1. 데이터 배열 선언
const concepts = [
  { icon: Bot, title: '제목', description: '설명' },
  // ...
];

// 2. 서브 컴포넌트 (시각화, 차트 등)
function ConceptVisual() {
  return (
    <div className="visual-container">
      {/* SVG, 차트, 애니메이션 */}
    </div>
  );
}

// 3. 메인 App 컴포넌트
function App() {
  const [state, setState] = useState(초기값);

  return (
    <div className="app-container">
      <header className="main-header">
        {/* 로고, 태그 */}
      </header>

      <main>
        {/* Section 01: Hero */}
        <section id="hero">
          <h1>강의 제목</h1>
          <div className="learning-goals-grid">
            {learningGoals.map((goal, index) => (
              <motion.div key={index} {...애니메이션}>
                {goal.title}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 02~08: 각 강의별 내용 */}

      </main>

      <footer>
        <p>© 2026 Vibe Coding</p>
      </footer>
    </div>
  );
}

export default App;
```

### CSS 패턴
```css
/* 변수 정의 */
:root {
  --accent: #0071e3;
  --bg-primary: #ffffff;
  /* ... */
}

/* 섹션 기본 스타일 */
section {
  margin-bottom: 6rem;
}

/* 카드 패턴 */
.card {
  background: var(--bg-secondary);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* 그리드 레이아웃 */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

/* 애니메이션 */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}
```

---

## PART 6: 다음 단계 (Agent 2~6에게 전달할 내용)

### Agent 2가 할 일: 11~17강 세부 내용 작성
- 이 기획안의 각 강의별 **데이터 배열을 TypeScript 코드로 완성**
- colleague_repo의 실제 JSX 코드 스타일 참고
- 각 강의마다 **1500~2000 라인 App.tsx 초안** 작성
- 섹션별 내용 상세화 (개념 설명, 비유, 사례 확장)

### Agent 3이 할 일: 프로젝트 1, 2, 3 상세 기획안 작성
- 프로젝트 3 (11~17강 이후) 중점
- 초급/중급/고급 차이 명확히 (힌트 수준, 코드 스캐폴딩)
- 평가 루브릭 (채점 기준)
- 제출 형식 (GitHub URL + 배포 URL + 설명서)

### Agent 4가 할 일: 프로젝트 1, 2, 3 문제/답안 웹 제작
- Agent 3의 기획을 colleague_repo 스타일 웹으로 구현
- 문제 페이지 (프로젝트 소개, 요구사항, 힌트)
- 답안 페이지 (전체 코드, 실행 결과, 설명)
- 난이도별 3개 버전 제작

### Agent 5가 할 일: 11~17강 40분 스크립트 작성
- Agent 2의 세부 내용을 40분 강의 스크립트로 변환
- 각 섹션별 멘트 (도입/설명/시연/실습/정리)
- 빠른 목소리 기준 (분당 150~180 단어)
- 화면 녹화 지시 (클릭 위치, 스크롤 타이밍)

### Agent 6이 할 일: 전체 검토 및 레드팀
- 통일성 검증 (11~17강 스타일 일관성)
- 기술적 정확성 (코드 오류, API 최신 버전)
- 학습 흐름 검증 (난이도 곡선, 선수 지식 연결)
- 시간 배분 검증 (40분 타임라인 준수)
- 프로젝트 연계 검증 (11~17강 → 프로젝트 3 활용 가능성)

---

## 작성 완료 체크리스트
- [x] colleague_repo/lecture01/src/App.tsx 전체 구조 분석 완료
- [x] 11~17강 각각의 40분 타임라인 작성 완료
- [x] 인터랙티브 요소 (카드, 차트, 입력 폼, 복사 버튼) 정의 완료
- [x] 프로젝트 3 연계 계획 완료 (11~17강 기술 통합)
- [x] 기술 스택 및 파일 구조 문서화 완료
- [x] 데이터 배열 구조 샘플 (JavaScript 코드) 완료
- [x] 통일성 원칙 (구조/시각/기술) 명시 완료

---

**다음 단계**: Agent 2에게 이 기획안을 전달하여 각 강의별 상세 App.tsx 코드 작성 시작
