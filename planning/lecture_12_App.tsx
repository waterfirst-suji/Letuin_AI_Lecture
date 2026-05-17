import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  Headphones,
  FileText,
  Link,
  FileCode,
  Youtube,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Download,
  Play,
  Clock,
  User,
  Brain,
  Zap,
  TrendingUp,
  Grid,
  Database
} from 'lucide-react';

// =====================
// DATA ARRAYS
// =====================

const learningGoals = [
  {
    icon: BookOpen,
    title: '논문 10개로 지식 베이스 구축',
    description: 'PDF, 웹링크, 구글독스를 업로드하여 개인 연구 노트 생성',
    color: '#4285F4'
  },
  {
    icon: Target,
    title: '출처 기반 정확한 답변',
    description: '할루시네이션 없이 업로드 자료만 참고하여 답변',
    color: '#34A853'
  },
  {
    icon: Headphones,
    title: '오디오 팟캐스트 자동 생성',
    description: '논문을 2인 대화 형식으로 변환하여 청취',
    color: '#FBBC04'
  }
];

const lessonFlow = [
  { time: '3분', label: 'NotebookLM 소개', color: '#4285F4' },
  { time: '7분', label: '출처 기반 원리', color: '#34A853' },
  { time: '8분', label: '업로드 4가지 방법', color: '#FBBC04' },
  { time: '17분', label: '분야별 실습', color: '#EA4335' },
  { time: '5분', label: '팟캐스트 생성', color: '#0088CC' }
];

const roleFlow = [
  {
    role: '엔지니어',
    icon: User,
    tasks: ['논문 수집', '업로드 (PDF/링크/독스)', '질문 작성', '팟캐스트 재생'],
    color: '#0071e3'
  },
  {
    role: 'NotebookLM',
    icon: Brain,
    tasks: ['텍스트 인덱싱', '출처 명시 답변', '팟캐스트 생성', '실시간 동기화'],
    color: '#34A853'
  }
];

const hallucinationExamples = [
  {
    model: 'ChatGPT',
    year: 2024,
    question: '리튬이온 배터리 NCM811의 열화 메커니즘은?',
    answer: 'NCM811은 코발트가 81%입니다.',
    error: '실제: 니켈 80%, 코발트 10%, 망간 10%',
    severity: '높음'
  },
  {
    model: 'Claude',
    year: 2025,
    question: 'OLED RGB 증착 공정에서 FMM은 무엇인가?',
    answer: 'Fine Metal Mesh입니다.',
    error: '실제: Fine Metal Mask',
    severity: '중간'
  },
  {
    model: 'Gemini',
    year: 2025,
    question: '반도체 7nm 공정의 트랜지스터 개수는?',
    answer: '약 500억 개입니다.',
    error: '칩마다 다름, 일반화 불가',
    severity: '중간'
  }
];

const notebookLMvsAI = [
  { feature: '지식 출처', notebookLM: '업로드 자료만', generalAI: '학습 데이터 전체' },
  { feature: '할루시네이션', notebookLM: '없음 (출처 명시)', generalAI: '있음 (검증 필요)' },
  { feature: '출처 표시', notebookLM: '자동 (페이지 번호)', generalAI: '없음' },
  { feature: '최신 정보', notebookLM: '업로드 시점 기준', generalAI: '학습 시점 기준' },
  { feature: '파일 형식', notebookLM: 'PDF/링크/독스/유튜브', generalAI: '텍스트 위주' },
  { feature: '팟캐스트', notebookLM: '지원 (2인 대화)', generalAI: '미지원' }
];

const uploadMethods = [
  {
    icon: FileText,
    method: 'PDF 파일',
    description: '로컬 PDF를 직접 업로드',
    limit: '최대 50MB, 500페이지',
    time: '30초~1분',
    color: '#4285F4'
  },
  {
    icon: Link,
    method: '웹 링크',
    description: 'arXiv, PubMed, Nature 논문 URL',
    limit: '오픈액세스만 전문 추출',
    time: '1~2분',
    color: '#34A853'
  },
  {
    icon: FileCode,
    method: '구글 문서',
    description: 'Google Docs/Drive 연동',
    limit: '실시간 동기화',
    time: '즉시',
    color: '#FBBC04'
  },
  {
    icon: Youtube,
    method: 'YouTube 영상',
    description: '자막 추출 또는 음성 인식',
    limit: '영어/한글 자동 감지',
    time: '2~5분',
    color: '#EA4335'
  }
];

const fieldScenarios = [
  {
    field: '반도체',
    icon: Grid,
    goal: '수율 하락 원인 분석',
    papers: [
      'Particle-Induced Defects (PDF, 2024)',
      'SPC for Yield Management (arXiv, 2025)',
      'CVD Process Optimization (Nature)',
      'Lithography Overlay Control (PDF)',
      'Etching Profile Uniformity (구글독스)',
      'AOI Image Analysis (PDF, 2025)',
      'Equipment PM Scheduling (IEEE)',
      '300mm Wafer Handling (PDF)',
      'Yield Learning Curves (arXiv)',
      'Cleanroom Monitoring (YouTube)'
    ],
    questions: [
      {
        q: '반도체 수율이 갑자기 3% 하락했을 때 가장 먼저 확인해야 할 항목은?',
        a: 'Particle count, 장비 PM 일정, Recipe 변경 이력 (최근 7일)',
        source: '논문 1 (5페이지), 논문 7 (12페이지)'
      },
      {
        q: 'CVD 온도와 막 두께의 관계를 설명해주세요.',
        a: '온도 ↑ → 막 두께 ↑, 균일도 ↓ (380°C: 250nm ±3%, 420°C: 310nm ±7%)',
        source: '논문 3, Figure 2 (8페이지)'
      }
    ],
    color: '#4285F4'
  },
  {
    field: '디스플레이',
    icon: Database,
    goal: 'OLED/LCD 기술 비교 및 불량 분석',
    papers: [
      'OLED vs LCD: Comparative (PDF, 2025)',
      'Inkjet Printing for OLED (arXiv)',
      'Mura Defect Classification (PDF)',
      'TFT Array Process (Nature)',
      'Color Gamut Optimization (구글독스)',
      'Burn-in Prevention (PDF, 2024)',
      'QD-OLED Technology (YouTube)',
      'PenTile vs RGB Stripe (PDF)',
      'Luminance Uniformity (arXiv)',
      'Encapsulation Materials (SID)'
    ],
    questions: [
      {
        q: 'OLED와 LCD의 구조적 차이를 3줄로 요약해주세요.',
        a: 'LCD: 백라이트+액정+컬러필터 (3층), OLED: 자체 발광 (2층), OLED가 얇고 명암비 우수',
        source: '논문 1, Figure 1 (3페이지)'
      },
      {
        q: 'OLED에서 Mura 불량이 발생하는 이유는?',
        a: 'TFT 증착 불균일, 유기층 두께 편차, 전압 강하, 픽셀 구동 회로 편차',
        source: '논문 3, Section 2.3 (7페이지)'
      }
    ],
    color: '#34A853'
  },
  {
    field: '배터리',
    icon: Zap,
    goal: '리튬이온 배터리 열화 메커니즘',
    papers: [
      'NCM811 Degradation (PDF, 2025)',
      'SEI Layer Formation (arXiv, 2024)',
      'Lithium Plating Analysis (PDF)',
      'Cathode Structural Collapse (Nature Energy)',
      'Al2O3 Coating Effects (구글독스)',
      'Fast Charging Protocols (PDF)',
      'Electrolyte Additives (YouTube)',
      'Capacity Fade Prediction (PDF)',
      'Thermal Runaway Prevention (arXiv)',
      'Solid-State Batteries (Science)'
    ],
    questions: [
      {
        q: 'NCM811 양극의 주요 열화 메커니즘 3가지는?',
        a: 'SEI 층 성장 (초기 100 사이클), 리튬 석출 (100~500 사이클), 양극 구조 붕괴 (500+ 사이클)',
        source: '논문 1 (5페이지), 논문 3 (8페이지), 논문 4 (12페이지)'
      },
      {
        q: 'Al2O3 코팅이 용량 유지율에 미치는 영향은?',
        a: '코팅 없음: 78%, 5nm: 89%, 10nm: 92% (500 사이클 후)',
        source: '논문 5, Figure 3 (11페이지)'
      }
    ],
    color: '#FBBC04'
  },
  {
    field: '바이오',
    icon: TrendingUp,
    goal: '단백질 구조 예측 및 결정화',
    papers: [
      'AlphaFold3 Architecture (PDF, 2025)',
      'Protein Crystallization (arXiv, 2024)',
      'Lysozyme Structure (PDF, 2023)',
      'Cryo-EM vs X-ray (Nature)',
      'Membrane Protein Challenges (구글독스)',
      'Drug Target Identification (PDF)',
      'PEG Screening (YouTube)',
      'Phase Diagram (PDF, 2024)',
      'Vapor Diffusion Method (arXiv)',
      'Protein Purification (Cell)'
    ],
    questions: [
      {
        q: 'AlphaFold3가 단백질 구조를 예측하는 핵심 원리는?',
        a: 'MSA 생성 → 주의 메커니즘 → 3D 좌표 예측 → 물리적 제약',
        source: '논문 1, Figure 2 (6페이지)'
      },
      {
        q: 'Lysozyme 결정화 실패 시 체크할 항목은?',
        a: '단백질 순도 (>95%), Precipitant 농도 (25~35%), pH (4.0~5.5), 온도 (20°C±2°C), 잔여 염 제거',
        source: '논문 2, Table 2 (9페이지)'
      }
    ],
    color: '#EA4335'
  }
];

const podcastFeatures = [
  { icon: Clock, title: '자동 생성', description: '2~3분 대기 → 5~15분 팟캐스트', color: '#4285F4' },
  { icon: Play, title: '2인 대화', description: '자연스러운 질문-답변 형식', color: '#34A853' },
  { icon: Download, title: 'MP3 다운로드', description: '오프라인 청취 가능', color: '#FBBC04' },
  { icon: ExternalLink, title: '링크 공유', description: '팀원과 공유 가능', color: '#EA4335' }
];

const podcastUseCases = [
  {
    scenario: '출퇴근 학습',
    detail: '지하철 40분 → 논문 3편 (8분×3)',
    effect: '주 5일 = 월 60편 청취',
    color: '#4285F4'
  },
  {
    scenario: '팀 미팅 준비',
    detail: '회의 30분 전 팟캐스트 1.5배속',
    effect: '핵심 파악 → 토론 참여도 향상',
    color: '#34A853'
  },
  {
    scenario: '신입 교육',
    detail: '핵심 논문 10편 플레이리스트',
    effect: '텍스트 부담 감소 → 학습 동기 유지',
    color: '#FBBC04'
  }
];

const completionChecklist = [
  { category: 'NotebookLM 설정', items: [
    'notebooklm.google.com 접속 및 로그인',
    'New Notebook 생성 (프로젝트명 입력)',
    '화면 구성 이해 (소스/채팅/출처 패널)'
  ]},
  { category: '논문 업로드', items: [
    'PDF 파일 업로드 1개 이상 완료',
    '웹 링크 (arXiv/PubMed) 추가 1개 이상',
    '총 10개 소스 업로드 완료'
  ]},
  { category: '질의응답', items: [
    '첫 질문 입력 및 답변 받기',
    '출처 패널에서 참조 페이지 확인',
    '3개 이상 질문하여 할루시네이션 없음 검증'
  ]},
  { category: '오디오 팟캐스트', items: [
    'Generate Audio 버튼 클릭',
    '팟캐스트 생성 완료 (5~15분)',
    '재생 및 다운로드 확인'
  ]}
];

const lecture13Preview = {
  title: '13강: 픽셀 구조 시각화',
  description: 'RGB 서브픽셀, PenTile 배열, PPI 계산을 Gemini API와 Streamlit으로 구현',
  topics: [
    'RGB 픽셀 배열 시각화',
    'PenTile vs RGB Stripe 비교',
    'PPI 계산기 구현',
    'Streamlit 슬라이더 인터랙티브',
    'Matplotlib/Plotly 픽셀 그래프'
  ],
  deliverables: [
    'pixel_simulator.py (Streamlit 앱)',
    'RGB Stripe vs PenTile 비교 이미지',
    'PPI 계산기 기능'
  ]
};

// =====================
// SUB COMPONENTS
// =====================

function HallucinationDemo() {
  return (
    <div className="hallucination-demo">
      <div className="demo-header">
        <AlertTriangle size={32} color="#EA4335" />
        <h3>일반 AI의 할루시네이션 사례</h3>
        <p>없는 사실을 그럴듯하게 지어내는 문제</p>
      </div>

      <div className="examples-grid">
        {hallucinationExamples.map((ex, index) => (
          <motion.div
            key={index}
            className="example-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="example-header">
              <span className="model-name">{ex.model}</span>
              <span className="year">{ex.year}</span>
              <span className={`severity severity-${ex.severity}`}>{ex.severity}</span>
            </div>
            <div className="question">
              <strong>Q:</strong> {ex.question}
            </div>
            <div className="answer error">
              <strong>A:</strong> {ex.answer}
            </div>
            <div className="correction">
              <AlertTriangle size={16} />
              <span>{ex.error}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="notebooklm-solution">
        <CheckCircle2 size={24} color="#34A853" />
        <p>
          <strong>NotebookLM의 차이:</strong> 업로드한 논문에 "NCM811은 Ni:Co:Mn = 8:1:1"이라고 쓰여 있으면
          정확히 그대로 인용합니다. 없는 내용은 "자료에서 찾을 수 없습니다"라고 답합니다.
        </p>
      </div>
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="comparison-table-container">
      <h3>NotebookLM vs 일반 AI 비교</h3>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>항목</th>
            <th>NotebookLM</th>
            <th>ChatGPT/Claude/Gemini</th>
          </tr>
        </thead>
        <tbody>
          {notebookLMvsAI.map((row, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <td className="feature-name">{row.feature}</td>
              <td className="notebooklm-col">
                <CheckCircle2 size={16} color="#34A853" />
                {row.notebookLM}
              </td>
              <td className="general-ai-col">{row.generalAI}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UploadMethodsGrid() {
  return (
    <div className="upload-methods-grid">
      {uploadMethods.map((method, index) => {
        const Icon = method.icon;
        return (
          <motion.div
            key={index}
            className="upload-method-card"
            style={{ borderColor: method.color }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
          >
            <div className="method-icon" style={{ background: method.color }}>
              <Icon size={32} color="white" />
            </div>
            <h4>{method.method}</h4>
            <p className="method-description">{method.description}</p>
            <div className="method-details">
              <span className="detail-item">
                <Clock size={14} />
                {method.time}
              </span>
              <span className="detail-item">{method.limit}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function FieldScenarioCards() {
  const [expandedField, setExpandedField] = useState<number | null>(null);

  return (
    <div className="field-scenarios-container">
      {fieldScenarios.map((field, index) => {
        const Icon = field.icon;
        const isExpanded = expandedField === index;

        return (
          <motion.div
            key={index}
            className={`field-scenario-card ${isExpanded ? 'expanded' : ''}`}
            style={{ borderColor: field.color }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="field-header" onClick={() => setExpandedField(isExpanded ? null : index)}>
              <div className="field-icon" style={{ background: field.color }}>
                <Icon size={28} color="white" />
              </div>
              <div className="field-info">
                <h3>{field.field}</h3>
                <p>{field.goal}</p>
              </div>
              <motion.div
                className="expand-icon"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.div>
            </div>

            {isExpanded && (
              <motion.div
                className="field-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="papers-list">
                  <h4>논문 10개 목록</h4>
                  <ul>
                    {field.papers.map((paper, i) => (
                      <li key={i}>
                        <FileText size={14} />
                        {paper}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="questions-list">
                  <h4>질문 예제</h4>
                  {field.questions.map((qa, i) => (
                    <div key={i} className="qa-item">
                      <div className="question-text">
                        <strong>Q:</strong> {qa.q}
                      </div>
                      <div className="answer-text">
                        <strong>A:</strong> {qa.a}
                      </div>
                      <div className="source-text">
                        <Target size={14} />
                        <span>출처: {qa.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function PodcastDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="podcast-demo">
      <div className="podcast-header">
        <Headphones size={40} color="#4285F4" />
        <h3>오디오 팟캐스트 생성</h3>
        <p>논문을 2인 대화 형식으로 자동 변환</p>
      </div>

      <div className="podcast-features-grid">
        {podcastFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="podcast-feature-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Icon size={24} color={feature.color} />
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="podcast-player">
        <div className="player-info">
          <h4>NCM811 Degradation Mechanisms</h4>
          <p>8분 23초 • 2025-05-16 생성</p>
        </div>
        <div className="player-controls">
          <motion.button
            className="play-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸' : '▶'}
          </motion.button>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: isPlaying ? '45%' : '0%' }} />
          </div>
          <span className="time">3:47 / 8:23</span>
        </div>
        <div className="player-actions">
          <button className="action-button">
            <Download size={20} />
            다운로드
          </button>
          <button className="action-button">
            <ExternalLink size={20} />
            공유
          </button>
        </div>
      </div>

      <div className="podcast-usecases">
        <h4>활용 사례</h4>
        <div className="usecases-grid">
          {podcastUseCases.map((usecase, index) => (
            <motion.div
              key={index}
              className="usecase-card"
              style={{ borderColor: usecase.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h5 style={{ color: usecase.color }}>{usecase.scenario}</h5>
              <p className="detail">{usecase.detail}</p>
              <p className="effect">
                <CheckCircle2 size={16} color={usecase.color} />
                {usecase.effect}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompletionChecklistComponent() {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (category: string, item: string) => {
    const key = `${category}-${item}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="completion-checklist">
      <h3>완성 체크리스트</h3>
      {completionChecklist.map((section, sectionIndex) => (
        <div key={sectionIndex} className="checklist-section">
          <h4>{section.category}</h4>
          <ul>
            {section.items.map((item, itemIndex) => {
              const key = `${section.category}-${item}`;
              const isChecked = checkedItems[key] || false;

              return (
                <motion.li
                  key={itemIndex}
                  className={isChecked ? 'checked' : ''}
                  onClick={() => toggleItem(section.category, item)}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="checkbox">
                    {isChecked && <CheckCircle2 size={20} color="#34A853" />}
                  </div>
                  <span>{item}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function NextLecturePreview() {
  return (
    <motion.div
      className="next-lecture-preview"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="preview-header">
        <h3>{lecture13Preview.title}</h3>
        <p>{lecture13Preview.description}</p>
      </div>

      <div className="preview-content">
        <div className="preview-section">
          <h4>핵심 주제</h4>
          <ul>
            {lecture13Preview.topics.map((topic, index) => (
              <li key={index}>
                <CheckCircle2 size={16} color="#4285F4" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="preview-section">
          <h4>결과물</h4>
          <ul>
            {lecture13Preview.deliverables.map((item, index) => (
              <li key={index}>
                <FileText size={16} color="#34A853" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <motion.button
        className="preview-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        13강 바로가기 →
      </motion.button>
    </motion.div>
  );
}

// =====================
// MAIN APP COMPONENT
// =====================

function App() {
  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="main-header">
        <div className="header-content">
          <div className="logo-section">
            <BookOpen size={32} color="#4285F4" />
            <span className="logo-text">Letuin AI 강의</span>
          </div>
          <div className="header-tags">
            <span className="tag">Session 3</span>
            <span className="tag">12강</span>
            <span className="tag">NotebookLM</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* SECTION 01: HERO */}
        <section id="hero" className="hero-section">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            NotebookLM 연구 노트
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            논문 10개로 개인 지식 베이스를 구축하고, 출처 기반 정확한 답변을 얻으며, 오디오 팟캐스트로 언제 어디서나 학습합니다.
          </motion.p>

          {/* Learning Goals */}
          <div className="learning-goals-grid">
            {learningGoals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <motion.div
                  key={index}
                  className="goal-card"
                  style={{ borderColor: goal.color }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                >
                  <div className="goal-icon" style={{ background: goal.color }}>
                    <Icon size={32} color="white" />
                  </div>
                  <h3>{goal.title}</h3>
                  <p>{goal.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="timeline-container">
            <h3>40분 타임라인</h3>
            <div className="timeline-flow">
              {lessonFlow.map((step, index) => (
                <motion.div
                  key={index}
                  className="timeline-step"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="step-time" style={{ background: step.color }}>{step.time}</div>
                  <div className="step-label">{step.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Role Flow */}
          <div className="role-flow-container">
            <h3>역할 분담</h3>
            <div className="role-cards">
              {roleFlow.map((role, index) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={index}
                    className="role-card"
                    style={{ borderColor: role.color }}
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.2 }}
                  >
                    <Icon size={32} color={role.color} />
                    <h4>{role.role}</h4>
                    <ul>
                      {role.tasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 02: HALLUCINATION PROBLEM */}
        <section id="hallucination" className="content-section">
          <h2>할루시네이션 문제와 NotebookLM의 차이</h2>
          <p className="section-intro">
            일반 AI 챗봇은 없는 사실을 그럴듯하게 지어냅니다. NotebookLM은 업로드한 자료만 참고하므로 할루시네이션이 없습니다.
          </p>
          <HallucinationDemo />
          <ComparisonTable />
        </section>

        {/* SECTION 03: UPLOAD METHODS */}
        <section id="upload-methods" className="content-section">
          <h2>논문 업로드 4가지 방법</h2>
          <p className="section-intro">
            PDF 파일, 웹 링크, 구글 문서, YouTube 영상 등 다양한 형식을 지원합니다.
          </p>
          <UploadMethodsGrid />
        </section>

        {/* SECTION 04: FIELD SCENARIOS */}
        <section id="field-scenarios" className="content-section">
          <h2>분야별 실습: 논문 10개 업로드</h2>
          <p className="section-intro">
            반도체, 디스플레이, 배터리, 바이오 각 분야별 논문 10개를 업로드하고 질의응답을 실습합니다.
          </p>
          <FieldScenarioCards />
        </section>

        {/* SECTION 05: PODCAST */}
        <section id="podcast" className="content-section">
          <h2>오디오 팟캐스트 생성</h2>
          <p className="section-intro">
            논문을 2인 대화 형식의 5~15분 팟캐스트로 자동 변환하여 언제 어디서나 청취할 수 있습니다.
          </p>
          <PodcastDemo />
        </section>

        {/* SECTION 06: CHECKLIST */}
        <section id="checklist" className="content-section">
          <h2>정리 및 검증</h2>
          <CompletionChecklistComponent />
        </section>

        {/* SECTION 07: NEXT LECTURE */}
        <section id="next-lecture" className="content-section">
          <h2>다음 강의 예고</h2>
          <NextLecturePreview />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="main-footer">
        <p>© 2026 Letuin KDC | AI 바이브 코딩 실전 강의</p>
        <p>Session 3: Gemini 생태계 (11~17강)</p>
      </footer>
    </div>
  );
}

export default App;
