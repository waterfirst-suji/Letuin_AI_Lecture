import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Battery,
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  Cloud,
  Code,
  Copy,
  Cpu,
  Database,
  Dna,
  ExternalLink,
  FileText,
  FolderPlus,
  Key,
  MessageCircle,
  Mic,
  Monitor,
  Shield,
  Terminal,
  Zap,
} from 'lucide-react';

// ============================================================================
// DATA ARRAYS (Gemini 생태계 중심)
// ============================================================================

const learningGoals = [
  {
    step: '학습목표 1',
    title: 'Gemini API Key 발급 및 첫 호출',
    body: 'Google AI Studio에서 API Key를 발급하고 Python으로 첫 번째 AI 호출을 실행합니다.',
    icon: Bot,
    type: 'api',
  },
  {
    step: '학습목표 2',
    title: 'NotebookLM 지식 베이스 구축',
    body: '연구 논문을 업로드하여 개인화된 AI 연구 노트를 만들고 출처 기반 답변을 받습니다.',
    icon: BookOpen,
    type: 'knowledge',
  },
  {
    step: '학습목표 3',
    title: 'Firebase 프로젝트 생성',
    body: 'Firebase 프로젝트를 생성하고 Hosting 환경을 설정하여 웹앱 배포를 준비합니다.',
    icon: Cloud,
    type: 'deploy',
  },
];

const lessonFlow = [
  { time: '0~3분', label: 'Gemini 생태계 소개' },
  { time: '3~10분', label: 'Google AI Studio 실습' },
  { time: '10~18분', label: 'Gemini API 첫 호출' },
  { time: '18~30분', label: 'NotebookLM 실습' },
  { time: '30~35분', label: 'Firebase 프로젝트 생성' },
  { time: '35~40분', label: '정리 및 12강 예고' },
];

const roleFlow = [
  { owner: '엔지니어', task: 'API Key 관리, NotebookLM 자료 업로드, Firebase 설정' },
  { owner: 'AI (Gemini)', task: '데이터 분석, 논문 요약, 출처 기반 답변' },
];

const geminiEcosystem = [
  {
    icon: Bot,
    title: 'Gemini Pro',
    description: '100만 토큰 컨텍스트 창, Deep Research 기능',
    cost: '$20/월',
    color: '#4285F4', // Google Blue
  },
  {
    icon: BookOpen,
    title: 'NotebookLM',
    description: '개인 지식 베이스, 출처 기반 답변, 팟캐스트 생성',
    cost: '무료',
    color: '#34A853', // Google Green
  },
  {
    icon: Code,
    title: 'AI Studio',
    description: 'API Key 발급, 프롬프트 테스트, 무료 할당량',
    cost: '무료',
    color: '#FBBC04', // Google Yellow
  },
  {
    icon: Cloud,
    title: 'Firebase',
    description: 'Hosting + Firestore + Auth, Spark 플랜',
    cost: '무료',
    color: '#EA4335', // Google Red
  },
  {
    icon: MessageCircle,
    title: 'Telegram Bot',
    description: 'Gemini API 연동 자동 알림',
    cost: '무료',
    color: '#0088CC', // Telegram Blue
  },
];

const pricingComparison = [
  {
    model: 'Gemini Pro',
    price: '$20/월',
    context: '100만 토큰',
    deepResearch: '지원',
    freeAPI: '있음',
    notebookLM: '완벽',
    firebase: '완벽',
  },
  {
    model: 'Claude Pro',
    price: '$20/월',
    context: '20만 토큰',
    deepResearch: '없음',
    freeAPI: '없음',
    notebookLM: '불가',
    firebase: '불가',
  },
  {
    model: 'GPT-4 Pro',
    price: '$20/월',
    context: '12.8만 토큰',
    deepResearch: '제한적',
    freeAPI: '제한적',
    notebookLM: '불가',
    firebase: '불가',
  },
];

const apiKeySteps = [
  {
    step: '01',
    title: 'Google AI Studio 접속',
    body: 'aistudio.google.com에 접속하여 Google 계정으로 로그인합니다.',
    icon: ExternalLink,
    screenshot: '/lecture_11/ai-studio-home.png',
  },
  {
    step: '02',
    title: 'API Key 생성',
    body: '"Get API Key" → "Create API Key in new project" 클릭합니다.',
    icon: Key,
    screenshot: '/lecture_11/api-key-create.png',
  },
  {
    step: '03',
    title: '.env 파일 저장',
    body: '생성된 키를 복사하여 .env 파일에 GEMINI_API_KEY=... 형식으로 저장합니다.',
    icon: FileText,
    code: 'GEMINI_API_KEY=AIzaSy...',
  },
];

const helloGeminiCode = `import google.generativeai as genai
import os
from dotenv import load_dotenv

# .env 파일에서 API Key 로드
load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

# Gemini 1.5 Pro 모델 초기화
model = genai.GenerativeModel('gemini-1.5-pro')

# 첫 API 호출
response = model.generate_content('Hello, Gemini!')
print(response.text)`;

const targetFields = [
  {
    field: '반도체',
    icon: Cpu,
    examples: ['수율 분석', '웨이퍼 검사', '공정 최적화'],
    color: '#4285F4',
    prompt: '반도체 공정에서 수율 하락 원인 3가지',
  },
  {
    field: '디스플레이',
    icon: Monitor,
    examples: ['AOI 불량', '픽셀 구조', '수율 시뮬레이터'],
    color: '#34A853',
    prompt: 'OLED와 LCD의 차이점과 각각의 장단점',
  },
  {
    field: '배터리',
    icon: Battery,
    examples: ['충방전 사이클', '용량 열화', '안전성 분석'],
    color: '#FBBC04',
    prompt: '리튬이온 배터리 용량 열화의 주요 원인과 대책',
  },
  {
    field: '바이오',
    icon: Dna,
    examples: ['실험 데이터', '단백질 구조', '논문 요약'],
    color: '#EA4335',
    prompt: '단백질 접힘 예측 AlphaFold의 원리',
  },
];

const semiconductorPrompt = `import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel('gemini-1.5-pro')

prompt = """
반도체 공정에서 수율이 하락하는 주요 원인 3가지를 설명해주세요.
각 원인마다 대응 방법도 함께 알려주세요.
"""

response = model.generate_content(prompt)
print(response.text)`;

const notebookLMFeatures = [
  {
    feature: '다양한 형식 지원',
    description: 'PDF, 웹 링크, 구글 문서, YouTube 영상 등',
    icon: FileText,
  },
  {
    feature: '출처 기반 답변',
    description: '업로드한 자료만 참고, 할루시네이션 방지',
    icon: Shield,
  },
  {
    feature: '오디오 팟캐스트',
    description: '업로드 자료를 2인 대화 형식 팟캐스트로 생성',
    icon: Mic,
  },
];

const notebookLMUseCases = [
  {
    usecase: '논문 요약',
    input: 'Nature 논문 PDF 업로드',
    question: '이 논문의 핵심 기여는?',
    output: '새로운 촉매 합성 방법으로 효율 30% 향상. 기존 대비 3배 빠른 반응 속도.',
  },
  {
    usecase: '실험 방법론',
    input: '실험 보고서 10개 업로드',
    question: '반복되는 실험 절차를 표준화해줘',
    output: '1. 시료 준비 2. 전처리 3. 측정 4. 데이터 분석 (표준 프로토콜 생성)',
  },
  {
    usecase: '연구 동향',
    input: '최근 3년 리뷰 논문 5개',
    question: '이 분야의 최신 트렌드는?',
    output: 'AI 기반 최적화, 나노 소재 적용, 지속 가능성 강조',
  },
];

const notebookLMQuestions = [
  {
    question: '이 논문의 핵심 기여는 무엇인가요?',
    answer:
      '이 논문은 리튬이온 배터리 용량 열화 메커니즘을 3가지로 분류하고, 각 메커니즘의 지배적 구간을 충방전 사이클 수로 정량화했습니다.',
    source: '논문 3페이지, Figure 2',
  },
  {
    question: '실험 방법론을 3줄로 요약해주세요.',
    answer:
      '1. LiNi0.8Co0.1Mn0.1O2 양극 / 흑연 음극 코인셀 제작\n2. 0.5C 충전, 1C 방전, 25°C에서 1,000 사이클 수행\n3. 100 사이클마다 EIS, XRD, SEM 분석 실시',
    source: '논문 2페이지, Experimental Section',
  },
  {
    question: '이 연구의 한계는 무엇인가요?',
    answer:
      '저자들이 명시한 한계:\n1. 실온(25°C) 조건만 테스트, 고온/저온 영향 미포함\n2. 단일 화학 조성(NCM811)만 연구\n3. 급속 충전(>2C) 조건 미검증',
    source: '논문 8페이지, Discussion',
  },
];

const firebaseSetupSteps = [
  { step: '01', title: 'Firebase Console 접속', body: 'console.firebase.google.com', icon: ExternalLink },
  { step: '02', title: 'Add Project', body: '프로젝트 이름 입력 (예: display-ai-monitor)', icon: FolderPlus },
  { step: '03', title: 'Google Analytics 설정', body: '선택 사항, 나중에 추가 가능', icon: BarChart3 },
  { step: '04', title: 'Firebase CLI 설치', body: 'npm install -g firebase-tools', icon: Terminal },
  { step: '05', title: 'Login & Init', body: 'firebase login && firebase init hosting', icon: Zap },
];

const completionChecklist = [
  'Google AI Studio에서 API Key 발급 완료',
  'Gemini API로 "Hello, Gemini!" 호출 성공',
  'NotebookLM에 논문 1개 업로드',
  'NotebookLM에서 질문하고 출처 기반 답변 받기',
  'Firebase 프로젝트 생성 완료',
  '.env 파일 생성 및 .gitignore 추가 확인',
];

const securityChecklist = [
  'API Key를 GitHub에 절대 커밋하지 않기 (.gitignore에 .env 추가)',
  '.env 파일은 로컬에만 보관하고 팀원과 공유 금지',
  'API Key 노출 시 즉시 재발급',
  '프로덕션 환경에서는 환경 변수로 주입 (Streamlit secrets.toml)',
  '할당량 모니터링 및 예산 알림 설정 (Google Cloud Console)',
];

const nextLecturePreview = [
  { label: 'RAG', name: 'Retrieval-Augmented Generation', text: 'NotebookLM 자료를 Gemini에게 전달' },
  { label: 'UI', name: 'Streamlit 채팅', text: 'st.chat_message, st.chat_input' },
  { label: 'DATA', name: '전공 용어 파일', text: 'display_terms.txt (100개 용어)' },
  { label: 'Q&A', name: '면접 질문 생성', text: 'Gemini API로 20개 자동 생성' },
];

// ============================================================================
// SUB COMPONENTS
// ============================================================================

function GeminiEcosystemMap() {
  return (
    <div className="visual-container gemini-ecosystem-map">
      <div className="visual-header">
        <span>Gemini Ecosystem</span>
        <strong>5개 도구 연결 지도</strong>
      </div>
      <svg viewBox="0 0 600 300" role="img" aria-label="Gemini 생태계 지도">
        <defs>
          <linearGradient id="ecosystemGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="100%" stopColor="#34A853" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 중앙: Gemini Pro */}
        <g transform="translate(300, 150)">
          <circle cx="0" cy="0" r="50" fill="#4285F4" opacity="0.1" />
          <circle cx="0" cy="0" r="40" fill="#4285F4" stroke="#fff" strokeWidth="3" filter="url(#glow)" />
          <text x="0" y="5" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">
            Gemini
          </text>
          <text x="0" y="20" textAnchor="middle" fontSize="12" fill="#fff">
            Pro
          </text>
        </g>

        {/* AI Studio */}
        <g transform="translate(150, 80)">
          <circle cx="0" cy="0" r="35" fill="#FBBC04" stroke="#fff" strokeWidth="2" />
          <text x="0" y="2" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">
            AI Studio
          </text>
          <path d="M 35 0 L 210 70" stroke="#FBBC04" strokeWidth="2" strokeDasharray="5,5" />
        </g>

        {/* NotebookLM */}
        <g transform="translate(450, 80)">
          <circle cx="0" cy="0" r="35" fill="#34A853" stroke="#fff" strokeWidth="2" />
          <text x="0" y="2" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">
            NotebookLM
          </text>
          <path d="M -35 0 L -110 70" stroke="#34A853" strokeWidth="2" strokeDasharray="5,5" />
        </g>

        {/* Firebase */}
        <g transform="translate(150, 220)">
          <circle cx="0" cy="0" r="35" fill="#EA4335" stroke="#fff" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">
            Firebase
          </text>
          <path d="M 35 0 L 210 -70" stroke="#EA4335" strokeWidth="2" strokeDasharray="5,5" />
        </g>

        {/* Telegram */}
        <g transform="translate(450, 220)">
          <circle cx="0" cy="0" r="35" fill="#0088CC" stroke="#fff" strokeWidth="2" />
          <text x="0" y="2" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">
            Telegram
          </text>
          <path d="M -35 0 L -110 -70" stroke="#0088CC" strokeWidth="2" strokeDasharray="5,5" />
        </g>
      </svg>
      <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
        Gemini Pro를 중심으로 AI Studio(API), NotebookLM(지식), Firebase(배포), Telegram(알림)이 연결됩니다.
      </p>
    </div>
  );
}

function PricingComparisonTable() {
  return (
    <div className="data-table-card pricing-comparison-table">
      <div className="visual-header">
        <span>월 $20 가성비 비교</span>
        <strong>Gemini vs Claude vs GPT-4</strong>
      </div>
      <table>
        <thead>
          <tr>
            <th>모델</th>
            <th>가격</th>
            <th>컨텍스트</th>
            <th>Deep Research</th>
            <th>무료 API</th>
            <th>NotebookLM</th>
            <th>Firebase</th>
          </tr>
        </thead>
        <tbody>
          {pricingComparison.map((item) => (
            <tr key={item.model}>
              <td>
                <strong>{item.model}</strong>
              </td>
              <td>{item.price}</td>
              <td>{item.context}</td>
              <td>{item.deepResearch}</td>
              <td>{item.freeAPI}</td>
              <td>{item.notebookLM}</td>
              <td>{item.firebase}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="highlight-box" style={{ marginTop: '1rem', background: '#e8f5e9', borderLeftColor: '#34A853' }}>
        <p style={{ fontSize: '0.95rem', color: '#1b5e20' }}>
          같은 $20이지만 Gemini는 API, NotebookLM, Firebase까지 무료로 제공합니다. 엔지니어에게는 최고의 가성비입니다.
        </p>
      </div>
    </div>
  );
}

function HelloGeminiCode() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(helloGeminiCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="code-block-card">
      <div className="code-header">
        <div className="window-dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <span>hello_gemini.py</span>
        <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? (
            <>
              <Check size={14} />
              복사됨!
            </>
          ) : (
            <>
              <Copy size={14} />
              복사
            </>
          )}
        </button>
      </div>
      <pre className="code-content">{helloGeminiCode}</pre>
      <div className="code-footer">
        <Terminal size={14} />
        <span>출력: Hello! How can I help you today?</span>
      </div>
    </div>
  );
}

function SemiconductorPromptCode() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(semiconductorPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="code-block-card">
      <div className="code-header">
        <div className="window-dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <span>semiconductor_prompt.py</span>
        <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? (
            <>
              <Check size={14} />
              복사됨!
            </>
          ) : (
            <>
              <Copy size={14} />
              복사
            </>
          )}
        </button>
      </div>
      <pre className="code-content">{semiconductorPrompt}</pre>
    </div>
  );
}

function NotebookLMInterface() {
  return (
    <div className="visual-card notebooklm-interface">
      <div className="visual-header">
        <BookOpen size={18} color="#34A853" />
        <span>NotebookLM Interface</span>
        <strong>논문 업로드 → 질문 → 출처 기반 답변</strong>
      </div>
      <div className="notebooklm-mockup">
        <div className="nlm-sidebar">
          <h4>Sources</h4>
          <div className="nlm-source-item">
            <FileText size={16} />
            <span>Li_Ion_Battery_Capacity_Fade.pdf</span>
          </div>
        </div>
        <div className="nlm-main">
          <div className="nlm-chat-bubble user">
            <p>이 논문의 핵심 기여는 무엇인가요?</p>
          </div>
          <div className="nlm-chat-bubble ai">
            <p>
              이 논문은 리튬이온 배터리 용량 열화 메커니즘을 3가지로 분류하고, 각 메커니즘의 지배적 구간을 충방전 사이클 수로
              정량화했습니다.
            </p>
            <div className="nlm-source-tag">출처: 논문 3페이지, Figure 2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FirebaseSetupFlow() {
  return (
    <div className="practice-board firebase-setup-flow">
      <div className="visual-header">
        <Cloud size={18} color="#EA4335" />
        <span>Firebase 프로젝트 생성</span>
        <strong>5단계 설정 가이드</strong>
      </div>
      {firebaseSetupSteps.map((item, index) => {
        const Icon = item.icon;
        return (
          <div className="practice-step" key={item.step}>
            <span className="step-number">{item.step}</span>
            <div className="step-icon">
              <Icon size={20} />
            </div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NextLectureCard() {
  return (
    <div className="next-lecture-card">
      <div className="nlc-header">
        <span>12강 미리보기</span>
        <h3>전공 지식 챗봇: NotebookLM + Gemini API로 면접 질문에 자동 답변</h3>
        <p>
          11강에서 마스터한 Gemini 생태계를 이제 전공 지식 챗봇에 적용합니다. NotebookLM에 업로드한 전공 용어를 Gemini
          API로 불러와 면접 질문에 자동 답변하는 Streamlit 챗봇을 만듭니다.
        </p>
      </div>
      <div className="tcrei-grid">
        {nextLecturePreview.map((item) => (
          <div className="tcrei-item" key={item.label}>
            <span className="tcrei-letter">{item.label}</span>
            <strong>{item.name}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function App() {
  return (
    <div className="app-container">
      {/* ====== HEADER ====== */}
      <header className="main-header">
        <div className="header-top">
          <motion.div className="logo-group" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <img
              src="/lecture11/logo.png"
              alt="LettUin Edu"
              className="header-logo"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </motion.div>

          <motion.div
            className="header-tag-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="header-tag">Gemini 생태계를 마스터하는 스마트한 엔지니어</span>
          </motion.div>
        </div>

        <motion.div
          className="hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1>11강: Gemini 생태계 마스터</h1>
          <p className="subtitle">
            Gemini는 단순한 챗봇이 아닙니다. API, NotebookLM, Firebase까지. Google AI 도구 전체를 활용하여 엔지니어링 AI
            워크플로우를 완성합니다.
          </p>
          <div className="lesson-meta" aria-label="lesson summary">
            <span>40분</span>
            <span>Gemini 생태계</span>
            <span>실습 포함</span>
            <span>결과물: API + NotebookLM + Firebase</span>
          </div>
        </motion.div>
      </header>

      <main>
        {/* ====== SECTION 01: HERO (0~3분) ====== */}
        <section className="overview-section">
          <span className="section-label">01. 학습목표 및 타임라인</span>
          <h2>오늘은 Gemini 생태계 5개 도구를 모두 마스터합니다</h2>
          <p className="section-intro">
            Google이 제공하는 5개 도구(Gemini Pro, NotebookLM, AI Studio, Firebase, Telegram)를 유기적으로 연결하여
            엔지니어링 AI 워크플로우를 완성합니다. 월 $20 투자로 최고의 가성비를 경험하세요.
          </p>

          <div className="learning-goals-grid" aria-label="학습목표">
            {learningGoals.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  className="learning-goal-card"
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="goal-icon">
                    <Icon size={32} />
                  </div>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="lesson-timeline" aria-label="40분 강의 진행표">
            {lessonFlow.map((item, index) => (
              <div className="timeline-step" key={item.label}>
                <strong>{item.time}</strong>
                <span>{item.label}</span>
                {index < lessonFlow.length - 1 && <div className="timeline-connector" />}
              </div>
            ))}
          </div>

          <div className="role-flow" aria-label="역할 분담">
            {roleFlow.map((item, index) => (
              <div className="role-step" key={`${item.owner}-${item.task}`}>
                <span>{item.owner}</span>
                <strong>{item.task}</strong>
                {index < roleFlow.length - 1 && <ArrowRight size={22} />}
              </div>
            ))}
          </div>
        </section>

        {/* ====== SECTION 02: Gemini 생태계 소개 (3~10분) ====== */}
        <section>
          <span className="section-label">02. Gemini 생태계 소개</span>
          <h2>월 $20 투자로 5개 도구를 모두 활용하는 최고의 가성비</h2>
          <p className="section-intro">
            Gemini는 단순한 챗봇이 아닙니다. Google이 제공하는 5개 도구가 유기적으로 연결되어 있습니다. API Key 발급부터
            Firebase 배포까지, 엔지니어링 AI 워크플로우 전체를 지원합니다.
          </p>

          <GeminiEcosystemMap />

          <div className="ecosystem-cards-grid">
            {geminiEcosystem.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  className="ecosystem-card"
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  style={{ borderLeftColor: item.color }}
                >
                  <div className="ecosystem-icon" style={{ backgroundColor: `${item.color}20` }}>
                    <Icon size={28} color={item.color} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="cost-badge" style={{ backgroundColor: item.color }}>
                    {item.cost}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <PricingComparisonTable />

          <div className="highlight-box" style={{ marginTop: '2rem', background: '#e3f2fd', borderLeftColor: '#4285F4' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={20} color="#4285F4" /> Google AI Studio: API Key 발급 3단계
            </h3>
            <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
              <li>aistudio.google.com 접속 → Google 계정 로그인</li>
              <li>"Get API Key" → "Create API Key in new project" 클릭</li>
              <li>생성된 키 복사 → .env 파일에 GEMINI_API_KEY=... 저장</li>
            </ol>
          </div>
        </section>

        {/* ====== SECTION 03: Gemini API 첫 호출 (10~18분) ====== */}
        <section>
          <span className="section-label">03. Gemini API 첫 호출</span>
          <h2>반도체, 디스플레이, 배터리, 바이오 분야별 프롬프트 실습</h2>
          <p className="section-intro">
            Gemini API 호출은 코드 10줄이면 충분합니다. 중요한 것은 명확한 프롬프트 작성입니다. 4개 분야(반도체, 디스플레이,
            배터리, 바이오) 예제를 통해 실무 적용 방법을 익히세요.
          </p>

          <HelloGeminiCode />

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>분야별 프롬프트 예제</h3>
            <div className="target-fields-grid">
              {targetFields.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    className="target-field-card"
                    key={item.field}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{ borderTopColor: item.color }}
                  >
                    <div className="field-icon" style={{ backgroundColor: `${item.color}20` }}>
                      <Icon size={32} color={item.color} />
                    </div>
                    <h4>{item.field}</h4>
                    <div className="examples-list">
                      {item.examples.map((ex) => (
                        <span key={ex} className="example-badge">
                          {ex}
                        </span>
                      ))}
                    </div>
                    <div className="prompt-preview">
                      <strong>프롬프트 예제:</strong>
                      <p>{item.prompt}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={20} color="#4285F4" />
              반도체 분야 프롬프트 전체 코드
            </h4>
            <SemiconductorPromptCode />
          </div>

          <div className="highlight-box" style={{ marginTop: '2rem', background: '#fff9e6', borderLeftColor: '#FBBC04' }}>
            <h3>핵심 포인트</h3>
            <p>
              API 호출은 코드가 아니라 프롬프트가 핵심입니다. "반도체 공정에서 수율 하락 원인 3가지"처럼 명확한 요청을 보내면
              Gemini가 1~3초 내에 전문가 수준의 답변을 반환합니다.
            </p>
          </div>
        </section>

        {/* ====== SECTION 04: NotebookLM 실습 (18~30분) ====== */}
        <section>
          <span className="section-label">04. NotebookLM 실습</span>
          <h2>논문 업로드 → 질문 → 출처 기반 답변 (할루시네이션 제로)</h2>
          <p className="section-intro">
            NotebookLM은 여러분의 개인 지식 베이스입니다. 논문, 보고서, 실험 데이터를 업로드하면 AI가 해당 자료만 참고하여
            답변합니다. 외부 지식을 사용하지 않으므로 할루시네이션이 없습니다.
          </p>

          <div className="feature-cards-grid">
            {notebookLMFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  className="feature-card"
                  key={item.feature}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="feature-icon">
                    <Icon size={28} color="#34A853" />
                  </div>
                  <h4>{item.feature}</h4>
                  <p>{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          <NotebookLMInterface />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>NotebookLM 질문 예제</h3>
            {notebookLMQuestions.map((item, index) => (
              <div className="notebooklm-qa-card" key={index}>
                <div className="qa-question">
                  <strong>질문:</strong> {item.question}
                </div>
                <div className="qa-answer">
                  <strong>NotebookLM 답변:</strong>
                  <p style={{ whiteSpace: 'pre-line' }}>{item.answer}</p>
                  <div className="qa-source">[출처: {item.source}]</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>NotebookLM 활용 사례</h3>
            <div className="usecase-cards-grid">
              {notebookLMUseCases.map((item, index) => (
                <motion.div
                  className="usecase-card"
                  key={item.usecase}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4>{item.usecase}</h4>
                  <div className="usecase-section">
                    <span className="usecase-label">입력:</span>
                    <p>{item.input}</p>
                  </div>
                  <div className="usecase-section">
                    <span className="usecase-label">질문:</span>
                    <p>{item.question}</p>
                  </div>
                  <div className="usecase-section">
                    <span className="usecase-label">출력:</span>
                    <p>{item.output}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="highlight-box" style={{ marginTop: '2rem', background: '#e8f5e9', borderLeftColor: '#34A853' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mic size={20} color="#34A853" /> 오디오 팟캐스트 생성 (선택)
            </h3>
            <p>
              NotebookLM은 업로드한 자료를 2인 대화 형식 팟캐스트로 자동 생성합니다. 우측 상단 "Generate Audio" 클릭 →
              2~3분 대기 → 재생 또는 다운로드. 출퇴근길에 논문을 '들을' 수 있습니다.
            </p>
          </div>
        </section>

        {/* ====== SECTION 05: Firebase 프로젝트 생성 (30~35분) ====== */}
        <section>
          <span className="section-label">05. Firebase 프로젝트 생성</span>
          <h2>무료 플랜으로 Hosting + Firestore + Auth 모두 사용</h2>
          <p className="section-intro">
            Firebase는 Google이 제공하는 백엔드 플랫폼입니다. Spark 플랜(무료)으로 Hosting(웹 배포), Firestore(데이터베이스),
            Auth(인증)을 모두 사용할 수 있습니다. 5단계로 프로젝트를 생성하고 CLI 설정까지 완료합니다.
          </p>

          <FirebaseSetupFlow />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Firebase Spark 플랜 (무료) 제공량</h3>
            <div className="firebase-plan-grid">
              <div className="plan-item">
                <div className="plan-icon" style={{ backgroundColor: '#e3f2fd' }}>
                  <Cloud size={24} color="#4285F4" />
                </div>
                <h4>Hosting</h4>
                <p>10GB 저장공간</p>
                <p>월 10GB 전송</p>
              </div>
              <div className="plan-item">
                <div className="plan-icon" style={{ backgroundColor: '#fff3e0' }}>
                  <Database size={24} color="#FBBC04" />
                </div>
                <h4>Firestore</h4>
                <p>1GB 저장</p>
                <p>50K 읽기/일</p>
              </div>
              <div className="plan-item">
                <div className="plan-icon" style={{ backgroundColor: '#e8f5e9' }}>
                  <Key size={24} color="#34A853" />
                </div>
                <h4>Auth</h4>
                <p>무제한 사용자</p>
                <p>이메일, Google 로그인</p>
              </div>
            </div>
          </div>

          <div className="highlight-box" style={{ marginTop: '2rem' }}>
            <h3>배포 명령어</h3>
            <pre
              className="code-content"
              style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem' }}
            >
              {`# Firebase 배포
firebase deploy

# 배포 URL 확인
https://display-ai-monitor.web.app`}
            </pre>
          </div>
        </section>

        {/* ====== SECTION 06: 정리 및 검증 (35~40분) ====== */}
        <section>
          <span className="section-label">06. 정리 및 검증</span>
          <h2>Gemini 생태계 워크플로우 완성 체크리스트</h2>
          <p className="section-intro">
            5개 도구(Gemini Pro, AI Studio, NotebookLM, Firebase, Telegram)를 모두 마스터했습니다. 아래 체크리스트를
            확인하고 보안 원칙을 숙지하세요.
          </p>

          <div className="checklist" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>완성 체크리스트</h3>
            {completionChecklist.map((item) => (
              <div className="check-item" key={item}>
                <CheckCircle2 size={20} color="#34A853" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="checklist" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>보안 체크리스트</h3>
            {securityChecklist.map((item) => (
              <div className="check-item" key={item}>
                <Shield size={20} color="#EA4335" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Gemini 생태계 워크플로우</h3>
            <div className="workflow-diagram">
              <div className="workflow-step">
                <Code size={24} color="#FBBC04" />
                <h4>1. Google AI Studio</h4>
                <p>API Key 발급 → 프롬프트 테스트</p>
              </div>
              <ArrowRight size={24} color="var(--text-secondary)" />
              <div className="workflow-step">
                <Bot size={24} color="#4285F4" />
                <h4>2. Gemini API</h4>
                <p>Python 스크립트로 데이터 분석</p>
              </div>
              <ArrowRight size={24} color="var(--text-secondary)" />
              <div className="workflow-step">
                <BookOpen size={24} color="#34A853" />
                <h4>3. NotebookLM</h4>
                <p>논문 업로드 → 출처 기반 답변</p>
              </div>
              <ArrowRight size={24} color="var(--text-secondary)" />
              <div className="workflow-step">
                <Cloud size={24} color="#EA4335" />
                <h4>4. Firebase</h4>
                <p>Streamlit 앱 배포</p>
              </div>
              <ArrowRight size={24} color="var(--text-secondary)" />
              <div className="workflow-step">
                <MessageCircle size={24} color="#0088CC" />
                <h4>5. Telegram Bot</h4>
                <p>자동 알림 + 모바일 대시보드</p>
              </div>
            </div>
          </div>

          <NextLectureCard />

          <div className="wrap-message">
            <Bot size={36} color="#4285F4" />
            <h3>"Gemini 생태계는 API, NotebookLM, Firebase가 유기적으로 연결된 통합 플랫폼입니다"</h3>
            <p>월 $20 투자로 엔지니어링 AI 워크플로우 전체를 완성할 수 있습니다.</p>
          </div>
        </section>

        {/* ====== PROFESSIONAL POINT ====== */}
        <section className="professional-point">
          <div
            className="highlight-box"
            style={{ background: '#4285F4', color: 'white', border: 'none', borderRadius: '24px' }}
          >
            <h3>Advanced Process Engineering Point</h3>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginTop: '1rem', fontSize: '1.1rem' }}>
              "Gemini 생태계는 반도체, 디스플레이, 배터리, 바이오 엔지니어가 AI를 실무에 통합하는 최적의 플랫폼입니다. API로
              데이터를 분석하고, NotebookLM으로 논문을 요약하고, Firebase로 팀과 공유합니다. 최종 판단은 공정 지식을 가진
              엔지니어가 검증합니다."
            </p>
            <div className="point-strip">
              <span>
                <Bot size={16} /> API 호출 5줄
              </span>
              <span>
                <BookOpen size={16} /> 논문 요약 자동화
              </span>
              <span>
                <Cloud size={16} /> Firebase 무료 배포
              </span>
              <span>
                <CheckCircle2 size={16} /> 최종 검증은 사람
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ====== FOOTER ====== */}
      <footer>
        <p>© 2026 Vibe Coding for Fine Tech Engineering | LettUin Edu</p>
      </footer>
    </div>
  );
}
