import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  BarChart3,
  Target,
  Thermometer,
  Gauge,
  Clock,
  Droplet,
  Cpu,
  Monitor,
  Zap,
  Activity,
  CheckCircle2,
  FileText,
  Sliders,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

// =====================
// DATA ARRAYS
// =====================

const learningGoals = [
  {
    icon: TrendingUp,
    title: '공정 변수와 수율 상관관계',
    description: '온도, 압력, 시간, 유량 등이 수율에 미치는 영향 정량화',
    color: '#4285F4'
  },
  {
    icon: BarChart3,
    title: 'Plotly 인터랙티브 차트',
    description: '3D 산점도, 히트맵, 회귀선으로 데이터 시각화',
    color: '#34A853'
  },
  {
    icon: Target,
    title: '최적 조건 탐색',
    description: 'sklearn 회귀 분석으로 수율 90% 이상 조건 추천',
    color: '#FBBC04'
  }
];

const lessonFlow = [
  { time: '3분', label: '수율 정의', color: '#4285F4' },
  { time: '7분', label: '공정 변수 개념', color: '#34A853' },
  { time: '8분', label: '분야별 사례', color: '#FBBC04' },
  { time: '17분', label: 'Plotly 실습', color: '#EA4335' },
  { time: '5분', label: 'Streamlit 시뮬레이터', color: '#0088CC' }
];

const processVariables = [
  {
    icon: Thermometer,
    name: '온도',
    unit: '°C',
    impact: '화학 반응 속도, 재료 물성 변화',
    example: '반도체 CVD: 380°C vs 400°C → 막 두께 10% 차이',
    color: '#EA4335'
  },
  {
    icon: Gauge,
    name: '압력',
    unit: 'bar',
    impact: '기체 농도, 증착 속도, 균일도',
    example: 'Sputter: 2.3 bar vs 2.5 bar → 수율 88% → 94%',
    color: '#4285F4'
  },
  {
    icon: Clock,
    name: '시간',
    unit: 'sec',
    impact: '공정 완성도, 처리량, 과처리 리스크',
    example: '노광: 35초 → 45초 → 수율 93% → 90% (과노광)',
    color: '#34A853'
  },
  {
    icon: Droplet,
    name: '유량',
    unit: 'sccm',
    impact: '가스/액체 공급 속도, 반응 농도',
    example: 'CVD 가스: 100 sccm → 120 sccm → 균일도 향상',
    color: '#FBBC04'
  }
];

const yieldTargets = [
  {
    industry: '반도체',
    process: '300mm 웨이퍼',
    target: '95% 이상',
    actual: '85~95%',
    icon: Cpu,
    color: '#4285F4'
  },
  {
    industry: '디스플레이',
    process: 'OLED Array',
    target: '90% 이상',
    actual: '75~90%',
    icon: Monitor,
    color: '#34A853'
  },
  {
    industry: '배터리',
    process: '리튬이온 셀',
    target: '98% 이상',
    actual: '92~98%',
    icon: Zap,
    color: '#FBBC04'
  },
  {
    industry: '바이오',
    process: '단백질 결정화',
    target: '50% 이상',
    actual: '20~50%',
    icon: Activity,
    color: '#EA4335'
  }
];

const fieldCases = [
  {
    field: '반도체',
    process: 'CVD 공정',
    goal: 'SiO2 막 두께 250nm ± 10nm',
    variables: ['온도 (70~90°C)', '압력 (2.0~2.8 bar)', '시간 (30~60초)'],
    optimal: { temp: 80, pressure: 2.4, time: 40, yield: 94 },
    insights: [
      '온도 80°C 기준 ±5°C 벗어나면 수율 5% 이상 하락',
      '압력 2.3~2.5 bar가 최적 구간 (U자 곡선)',
      '시간은 40±5초 범위에서 수율 변화 적음'
    ],
    icon: Cpu,
    color: '#4285F4'
  },
  {
    field: '디스플레이',
    process: 'OLED Array 증착',
    goal: 'Mura 불량 < 5%',
    variables: ['온도 (350~400°C)', '진공도 (1e-6~5e-6 Torr)', 'Power (3.0~4.0 kW)'],
    optimal: { temp: 375, vacuum: 1.0, power: 3.5, yield: 95 },
    insights: [
      '온도 375°C 이상 → Mura 불량 급증',
      '진공도 1e-6 Torr 필수 (불순물 흡착 방지)',
      'Power 3.5 kW 최적 (과다 시 기판 손상)'
    ],
    icon: Monitor,
    color: '#34A853'
  },
  {
    field: '배터리',
    process: 'NCM811 코팅',
    goal: '용량 유지율 > 90% (500 사이클)',
    variables: ['온도 (450~550°C)', '두께 (5~15nm)', '시간 (2~6hr)'],
    optimal: { temp: 500, thickness: 10, time: 4, yield: 94 },
    insights: [
      '온도 500°C 최적 (과열 시 구조 변화)',
      '코팅 두께 10nm 이상 필수 (보호 효과)',
      '어닐링 시간 4시간이 경제적'
    ],
    icon: Zap,
    color: '#FBBC04'
  },
  {
    field: '바이오',
    process: '단백질 결정화',
    goal: '결정 크기 > 0.2mm',
    variables: ['Precipitant (25~35%)', 'pH (4.0~5.5)', '온도 (18~25°C)'],
    optimal: { precipitant: 32, ph: 4.5, temp: 20, yield: 50 },
    insights: [
      'Precipitant 30~32% 최적 (과다 시 침전)',
      'pH 4.5가 최적 (등전점 근처)',
      '저온 (18~20°C)이 결정 품질 향상'
    ],
    icon: Activity,
    color: '#EA4335'
  }
];

const completionChecklist = [
  {
    category: 'Plotly 차트',
    items: [
      '2D 산점도 + 회귀선 생성',
      '3D 산점도 (온도 vs 압력 vs 수율)',
      '히트맵 (온도-압력 조합)'
    ]
  },
  {
    category: 'Streamlit 시뮬레이터',
    items: [
      'yield_simulator.py 파일 생성',
      '슬라이더로 변수 조정 기능',
      '예상 수율 실시간 계산',
      'Plotly 차트 업데이트 확인'
    ]
  },
  {
    category: '회귀 분석',
    items: [
      'sklearn LinearRegression 사용',
      '다항식 회귀 (PolynomialFeatures) 적용',
      '최적 조건 탐색 (np.argmax)'
    ]
  }
];

const lecture15Preview = {
  title: '15강: Firebase 배포 및 통합',
  description: 'Firebase Hosting에 앱 배포, Firestore 데이터 저장, Gemini API 보안 강화',
  topics: [
    'Firebase Hosting: 웹앱 배포 (URL 생성)',
    'Firebase Firestore: 수율 데이터 저장',
    'Firebase Auth: 이메일/구글 로그인',
    'Firebase Functions: Gemini API Key 보안',
    '실시간 동기화: 팀 대시보드'
  ],
  deliverables: [
    'Firebase 배포 URL (yield-sim.web.app)',
    'Firestore 데이터베이스 (수율 로그)',
    'Auth 로그인 페이지'
  ]
};

// =====================
// SUB COMPONENTS
// =====================

function YieldDefinition() {
  return (
    <div className="yield-definition">
      <h3>수율(Yield) 정의</h3>
      <div className="formula-box">
        <code className="formula-large">
          수율 (%) = (정상 제품 수 / 전체 생산량) × 100
        </code>
      </div>

      <div className="example-box">
        <h4>예시: 반도체 웨이퍼</h4>
        <ul>
          <li>웨이퍼 1장에서 칩 300개 생산</li>
          <li>정상 칩 270개, 불량 30개</li>
          <li>수율 = 270 / 300 × 100 = <strong>90%</strong></li>
        </ul>
      </div>

      <div className="targets-grid">
        {yieldTargets.map((target, index) => {
          const Icon = target.icon;
          return (
            <motion.div
              key={index}
              className="target-card"
              style={{ borderColor: target.color }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Icon size={28} color={target.color} />
              <h5>{target.industry}</h5>
              <p className="process">{target.process}</p>
              <div className="target-values">
                <span className="label">목표:</span>
                <span className="value">{target.target}</span>
              </div>
              <div className="target-values">
                <span className="label">실제:</span>
                <span className="value actual">{target.actual}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ProcessVariablesGrid() {
  return (
    <div className="process-variables-grid">
      <h3>4대 핵심 공정 변수</h3>
      {processVariables.map((variable, index) => {
        const Icon = variable.icon;
        return (
          <motion.div
            key={index}
            className="variable-card"
            style={{ borderColor: variable.color }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ x: 8 }}
          >
            <div className="variable-header">
              <div className="variable-icon" style={{ background: variable.color }}>
                <Icon size={24} color="white" />
              </div>
              <div className="variable-title">
                <h4>{variable.name}</h4>
                <span className="unit">단위: {variable.unit}</span>
              </div>
            </div>

            <div className="variable-content">
              <p className="impact">
                <strong>영향:</strong> {variable.impact}
              </p>
              <p className="example">
                <strong>예시:</strong> {variable.example}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function FieldCaseStudies() {
  const [selectedField, setSelectedField] = useState<number | null>(null);

  return (
    <div className="field-case-studies">
      <h3>분야별 수율 최적화 사례</h3>
      <div className="cases-grid">
        {fieldCases.map((caseStudy, index) => {
          const Icon = caseStudy.icon;
          const isExpanded = selectedField === index;

          return (
            <motion.div
              key={index}
              className={`case-card ${isExpanded ? 'expanded' : ''}`}
              style={{ borderColor: caseStudy.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="case-header"
                onClick={() => setSelectedField(isExpanded ? null : index)}
              >
                <Icon size={28} color={caseStudy.color} />
                <div className="case-info">
                  <h4>{caseStudy.field}</h4>
                  <p>{caseStudy.process}</p>
                </div>
                <motion.div
                  className="expand-icon"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                >
                  ▼
                </motion.div>
              </div>

              <div className="case-goal">
                <Target size={16} />
                <span>{caseStudy.goal}</span>
              </div>

              {isExpanded && (
                <motion.div
                  className="case-details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="variables-list">
                    <h5>공정 변수</h5>
                    <ul>
                      {caseStudy.variables.map((v, i) => (
                        <li key={i}>
                          <Sliders size={14} />
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="optimal-conditions">
                    <h5>최적 조건</h5>
                    <div className="optimal-grid">
                      {Object.entries(caseStudy.optimal).map(([key, value]) => (
                        <div key={key} className="optimal-item">
                          <span className="key">{key}:</span>
                          <span className="value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="insights-list">
                    <h5>핵심 인사이트</h5>
                    <ul>
                      {caseStudy.insights.map((insight, i) => (
                        <li key={i}>
                          <CheckCircle2 size={14} color={caseStudy.color} />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function YieldSimulator() {
  const [temperature, setTemperature] = useState(80);
  const [pressure, setPressure] = useState(2.4);
  const [time, setTime] = useState(40);

  const calculateYield = () => {
    const yield_value =
      95
      - 0.3 * Math.pow(temperature - 80, 2)
      - 50 * Math.pow(pressure - 2.4, 2)
      - 0.05 * Math.pow(time - 40, 2);

    return Math.max(0, Math.min(100, yield_value));
  };

  const currentYield = calculateYield();

  return (
    <div className="yield-simulator">
      <div className="simulator-header">
        <Sliders size={32} color="#4285F4" />
        <h3>수율 시뮬레이터 (반도체 CVD 공정)</h3>
        <p>슬라이더를 조정하여 예상 수율을 확인하세요</p>
      </div>

      <div className="simulator-controls">
        <div className="control-group">
          <label>
            <Thermometer size={16} />
            온도: {temperature}°C
          </label>
          <input
            type="range"
            min="70"
            max="90"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
          />
          <span className="range-labels">
            <span>70°C</span>
            <span>90°C</span>
          </span>
        </div>

        <div className="control-group">
          <label>
            <Gauge size={16} />
            압력: {pressure} bar
          </label>
          <input
            type="range"
            min="2.0"
            max="2.8"
            step="0.1"
            value={pressure}
            onChange={(e) => setPressure(Number(e.target.value))}
          />
          <span className="range-labels">
            <span>2.0 bar</span>
            <span>2.8 bar</span>
          </span>
        </div>

        <div className="control-group">
          <label>
            <Clock size={16} />
            시간: {time} sec
          </label>
          <input
            type="range"
            min="30"
            max="60"
            step="5"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
          <span className="range-labels">
            <span>30 sec</span>
            <span>60 sec</span>
          </span>
        </div>
      </div>

      <motion.div
        className="yield-result"
        key={currentYield}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className={`yield-value ${currentYield >= 90 ? 'good' : 'warning'}`}>
          {currentYield.toFixed(1)}%
        </div>
        <div className="yield-label">예상 수율</div>
        {currentYield >= 90 ? (
          <div className="yield-status success">
            <CheckCircle2 size={20} />
            ✅ 목표 달성 (90% 이상)
          </div>
        ) : (
          <div className="yield-status warning">
            <AlertCircle size={20} />
            ⚠️ 목표 미달 (90% 목표)
          </div>
        )}
      </motion.div>

      <div className="optimal-recommendation">
        <h4>🎯 최적 조건 추천</h4>
        <div className="recommendation-values">
          <span>온도: 80°C</span>
          <span>압력: 2.4 bar</span>
          <span>시간: 40 sec</span>
          <span className="expected-yield">예상 수율: 95%</span>
        </div>
      </div>
    </div>
  );
}

function StreamlitCodeDemo() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `import streamlit as st
import plotly.express as px
import numpy as np

st.title("📊 공정 수율 시뮬레이터")

temp = st.sidebar.slider("온도 (°C)", 70, 90, 80)
pressure = st.sidebar.slider("압력 (bar)", 2.0, 2.8, 2.4, 0.1)

# 수율 계산
yield_pred = 95 - 0.3 * (temp - 80)**2 - 50 * (pressure - 2.4)**2

st.metric("예상 수율", f"{yield_pred:.1f}%")

# Plotly 차트
temp_range = np.linspace(70, 90, 50)
yield_range = [95 - 0.3 * (t - 80)**2 for t in temp_range]

fig = px.line(x=temp_range, y=yield_range, title='온도 vs 수율')
st.plotly_chart(fig)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="streamlit-code-demo">
      <div className="code-header">
        <FileText size={24} color="#4285F4" />
        <h4>Streamlit 시뮬레이터 코드</h4>
        <motion.button
          className="copy-button"
          onClick={handleCopy}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {copied ? '복사됨!' : '복사'}
        </motion.button>
      </div>

      <pre className="code-block">
        <code>{codeSnippet}</code>
      </pre>
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
        <Monitor size={32} color="#4285F4" />
        <h3>{lecture15Preview.title}</h3>
        <p>{lecture15Preview.description}</p>
      </div>

      <div className="preview-content">
        <div className="preview-section">
          <h4>핵심 주제</h4>
          <ul>
            {lecture15Preview.topics.map((topic, index) => (
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
            {lecture15Preview.deliverables.map((item, index) => (
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
        15강 바로가기 <ArrowRight size={20} />
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
            <TrendingUp size={32} color="#4285F4" />
            <span className="logo-text">Letuin AI 강의</span>
          </div>
          <div className="header-tags">
            <span className="tag">Session 3</span>
            <span className="tag">14강</span>
            <span className="tag">수율 시뮬레이터</span>
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
            수율 시뮬레이터
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            공정 변수(온도/압력/시간)와 수율의 관계를 시각화하고 최적 조건을 탐색합니다.
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
                  whileHover={{ y: -8 }}
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
        </section>

        {/* SECTION 02: YIELD DEFINITION */}
        <section id="yield-definition" className="content-section">
          <h2>수율(Yield) 정의와 목표</h2>
          <YieldDefinition />
        </section>

        {/* SECTION 03: PROCESS VARIABLES */}
        <section id="process-variables" className="content-section">
          <h2>공정 변수 (Process Variables)</h2>
          <p className="section-intro">
            온도, 압력, 시간, 유량 등 공정 변수가 수율에 미치는 영향을 정량화합니다.
          </p>
          <ProcessVariablesGrid />
        </section>

        {/* SECTION 04: FIELD CASES */}
        <section id="field-cases" className="content-section">
          <h2>분야별 수율 최적화 사례</h2>
          <p className="section-intro">
            반도체, 디스플레이, 배터리, 바이오 분야의 실제 수율 데이터와 최적 조건을 분석합니다.
          </p>
          <FieldCaseStudies />
        </section>

        {/* SECTION 05: SIMULATOR */}
        <section id="simulator" className="content-section">
          <h2>인터랙티브 수율 시뮬레이터</h2>
          <p className="section-intro">
            슬라이더로 공정 변수를 조정하고 예상 수율을 실시간으로 확인합니다.
          </p>
          <YieldSimulator />
        </section>

        {/* SECTION 06: STREAMLIT CODE */}
        <section id="streamlit-code" className="content-section">
          <h2>Streamlit 시뮬레이터 구현</h2>
          <p className="section-intro">
            Plotly 차트와 슬라이더를 결합한 수율 시뮬레이터를 만듭니다.
          </p>
          <StreamlitCodeDemo />
        </section>

        {/* SECTION 07: CHECKLIST */}
        <section id="checklist" className="content-section">
          <h2>정리 및 검증</h2>
          <CompletionChecklistComponent />
        </section>

        {/* SECTION 08: NEXT LECTURE */}
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
