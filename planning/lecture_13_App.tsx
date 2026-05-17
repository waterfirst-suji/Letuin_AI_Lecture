import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Grid,
  Layers,
  Sliders,
  Smartphone,
  Monitor,
  Tablet,
  Cpu,
  Zap,
  TrendingUp,
  FileText,
  CheckCircle2,
  Calculator,
  Maximize,
  ArrowRight,
  Eye
} from 'lucide-react';

// =====================
// DATA ARRAYS
// =====================

const learningGoals = [
  {
    icon: Grid,
    title: 'RGB 서브픽셀 배열 시각화',
    description: '빨강/초록/파랑 서브픽셀 배치를 SVG/Matplotlib으로 구현',
    color: '#EA4335'
  },
  {
    icon: Layers,
    title: 'PenTile vs RGB Stripe 비교',
    description: '삼성 OLED(PenTile)와 애플 LCD(RGB Stripe) 구조 차이',
    color: '#4285F4'
  },
  {
    icon: Sliders,
    title: 'PPI 계산기 및 시뮬레이터',
    description: '해상도와 대각선으로 픽셀 밀도 계산하는 Streamlit 앱',
    color: '#34A853'
  }
];

const lessonFlow = [
  { time: '3분', label: '픽셀 구조 개요', color: '#EA4335' },
  { time: '7분', label: 'RGB 서브픽셀 원리', color: '#4285F4' },
  { time: '8분', label: '실제 제품 사례', color: '#34A853' },
  { time: '17분', label: 'Matplotlib 실습', color: '#FBBC04' },
  { time: '5분', label: 'Streamlit 시뮬레이터', color: '#0088CC' }
];

const pixelConcepts = [
  {
    title: '1픽셀 = 3개 서브픽셀',
    description: 'R(빨강) + G(초록) + B(파랑) 조합으로 1,670만 색상 표현',
    formula: '[R] [G] [B] ← 1픽셀',
    icon: Grid,
    color: '#EA4335'
  },
  {
    title: 'RGB 값으로 색상 제어',
    description: 'R(255,0,0) = 빨강, RGB(255,255,0) = 노랑, RGB(255,255,255) = 흰색',
    formula: '각 채널 0~255 (256단계) = 256³ = 1,670만 색',
    icon: Cpu,
    color: '#4285F4'
  },
  {
    title: '서브픽셀 크기',
    description: 'Galaxy S24 Ultra (501 PPI): 1픽셀 = 50.6 마이크로미터',
    formula: '1 마이크로미터 = 0.001mm',
    icon: Maximize,
    color: '#34A853'
  }
];

const arrangementTypes = [
  {
    type: 'RGB Stripe',
    structure: 'R-G-B | R-G-B | R-G-B',
    subpixelRatio: '1:1:1 (100%)',
    devices: 'LCD, iPhone OLED, LG OLED TV',
    sharpness: '높음',
    cost: '높음',
    pros: [
      '텍스트 렌더링 최고 선명도',
      '색 정확도 우수',
      '실제 해상도 = 표기 해상도'
    ],
    cons: [
      '제조 비용 높음',
      'OLED 수명 상대적 짧음 (B 서브픽셀)'
    ],
    color: '#4285F4'
  },
  {
    type: 'PenTile',
    structure: 'RG-BG | RG-BG',
    subpixelRatio: 'R:G:B = 1:2:1 (67%)',
    devices: '삼성 Galaxy, Galaxy Watch',
    sharpness: '중간',
    cost: '낮음',
    pros: [
      'G 서브픽셀 2배 (인간 눈의 녹색 민감도)',
      'B 서브픽셀 크기 증가 → OLED 수명 향상',
      '제조 비용 절감'
    ],
    cons: [
      '텍스트 색 번짐 (작은 글씨)',
      '실효 해상도 감소 (~67%)'
    ],
    color: '#34A853'
  }
];

const deviceSpecs = [
  {
    device: 'Galaxy S24 Ultra',
    icon: Smartphone,
    resolution: '3120 x 1440',
    diagonal: 6.8,
    ppi: 505,
    type: 'PenTile OLED',
    subpixels: 8985600,
    color: '#34A853'
  },
  {
    device: 'iPhone 15 Pro',
    icon: Smartphone,
    resolution: '2556 x 1179',
    diagonal: 6.1,
    ppi: 460,
    type: 'RGB Stripe OLED',
    subpixels: 9036084,
    color: '#4285F4'
  },
  {
    device: 'iPad Pro 12.9',
    icon: Tablet,
    resolution: '2732 x 2048',
    diagonal: 12.9,
    ppi: 264,
    type: 'RGB Stripe LCD',
    subpixels: 16777216,
    color: '#FBBC04'
  },
  {
    device: '32" 4K Monitor',
    icon: Monitor,
    resolution: '3840 x 2160',
    diagonal: 32,
    ppi: 138,
    type: 'RGB Stripe IPS',
    subpixels: 24883200,
    color: '#EA4335'
  }
];

const ppiRanges = [
  {
    range: '300+ PPI',
    usage: '스마트폰',
    distance: '30cm',
    verdict: '픽셀 안 보임',
    icon: Smartphone,
    color: '#34A853'
  },
  {
    range: '150-200 PPI',
    usage: '노트북',
    distance: '70cm',
    verdict: '최적',
    icon: Monitor,
    color: '#4285F4'
  },
  {
    range: '100-150 PPI',
    usage: '데스크탑 모니터',
    distance: '100cm',
    verdict: '적합',
    icon: Monitor,
    color: '#FBBC04'
  },
  {
    range: '60-80 PPI',
    usage: 'TV',
    distance: '300cm',
    verdict: '자연스러움',
    icon: Monitor,
    color: '#EA4335'
  }
];

const completionChecklist = [
  {
    category: 'Matplotlib 실습',
    items: [
      'RGB Stripe 10x10 픽셀 그리드 생성',
      'PenTile 10x10 픽셀 그리드 생성',
      '나란히 비교 이미지 저장 (stripe_vs_pentile.png)'
    ]
  },
  {
    category: 'Streamlit 시뮬레이터',
    items: [
      'pixel_simulator.py 파일 생성',
      '슬라이더로 픽셀 개수 조정 기능',
      '배치 방식 선택 (RGB Stripe / PenTile)',
      '실시간 렌더링 확인'
    ]
  },
  {
    category: 'PPI 계산기',
    items: [
      '가로/세로 픽셀, 대각선 입력 기능',
      'PPI 자동 계산 및 표시',
      'PPI 평가 메시지 (스마트폰/태블릿/모니터)',
      '주요 제품 PPI 비교 테이블'
    ]
  }
];

const lecture14Preview = {
  title: '14강: 수율 시뮬레이터',
  description: '반도체/디스플레이/배터리/바이오 분야의 수율과 공정 변수 상관관계 분석',
  topics: [
    '수율 정의: 정상 제품 / 전체 생산량',
    '공정 변수: 온도, 압력, 시간, 유량',
    'Plotly 3D 산점도: 온도 vs 압력 vs 수율',
    '회귀 분석: sklearn으로 최적 조건 탐색',
    'Streamlit 슬라이더: 변수 조정 → 예상 수율'
  ],
  deliverables: [
    'yield_simulator.py (Streamlit 앱)',
    '온도/압력 vs 수율 인터랙티브 차트',
    '최적 조건 추천 기능'
  ]
};

// =====================
// SUB COMPONENTS
// =====================

function PixelStructureVisual() {
  return (
    <div className="pixel-structure-visual">
      <div className="visual-title">
        <h4>RGB Stripe: 1픽셀 = 3개 서브픽셀</h4>
      </div>

      <div className="pixel-grid-demo">
        {/* 3x3 픽셀 그리드 시연 */}
        <div className="pixel-row">
          {[...Array(3)].map((_, row) => (
            <div key={row} className="pixel-group">
              {[...Array(3)].map((_, col) => (
                <div key={col} className="single-pixel">
                  <div className="subpixel red">R</div>
                  <div className="subpixel green">G</div>
                  <div className="subpixel blue">B</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="visual-info">
        <p>3×3 = 9픽셀 = 27개 서브픽셀 (R 9개 + G 9개 + B 9개)</p>
      </div>
    </div>
  );
}

function ArrangementComparison() {
  return (
    <div className="arrangement-comparison">
      {arrangementTypes.map((arrangement, index) => (
        <motion.div
          key={index}
          className="arrangement-card"
          style={{ borderColor: arrangement.color }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
        >
          <div className="arrangement-header">
            <h3 style={{ color: arrangement.color }}>{arrangement.type}</h3>
            <div className="structure-formula">{arrangement.structure}</div>
          </div>

          <div className="arrangement-details">
            <div className="detail-row">
              <span className="detail-label">서브픽셀 비율</span>
              <span className="detail-value">{arrangement.subpixelRatio}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">대표 제품</span>
              <span className="detail-value">{arrangement.devices}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">텍스트 선명도</span>
              <span className="detail-value">{arrangement.sharpness}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">제조 비용</span>
              <span className="detail-value">{arrangement.cost}</span>
            </div>
          </div>

          <div className="pros-cons">
            <div className="pros">
              <h5>장점</h5>
              <ul>
                {arrangement.pros.map((pro, i) => (
                  <li key={i}>
                    <CheckCircle2 size={14} color={arrangement.color} />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="cons">
              <h5>단점</h5>
              <ul>
                {arrangement.cons.map((con, i) => (
                  <li key={i}>
                    <span className="con-bullet">•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PPICalculator() {
  const [width, setWidth] = useState(3120);
  const [height, setHeight] = useState(1440);
  const [diagonal, setDiagonal] = useState(6.8);
  const [ppi, setPpi] = useState(0);

  const calculatePPI = () => {
    const diagonalPixels = Math.sqrt(width ** 2 + height ** 2);
    const calculatedPPI = diagonalPixels / diagonal;
    setPpi(calculatedPPI);
  };

  const getPPIEvaluation = () => {
    if (ppi >= 300) {
      return { text: '✅ 300 PPI 이상: 스마트폰 수준 (30cm 거리에서 픽셀 안 보임)', color: '#34A853' };
    } else if (ppi >= 200) {
      return { text: '✅ 200-300 PPI: 태블릿 수준 (50cm 거리 최적)', color: '#4285F4' };
    } else if (ppi >= 150) {
      return { text: '⚠️ 150-200 PPI: 노트북 수준 (70cm 거리 최적)', color: '#FBBC04' };
    } else if (ppi >= 100) {
      return { text: '⚠️ 100-150 PPI: 모니터 수준 (100cm 거리 최적)', color: '#EA4335' };
    } else {
      return { text: '❌ 100 PPI 미만: TV 수준 (200cm 이상 거리)', color: '#9AA0A6' };
    }
  };

  return (
    <div className="ppi-calculator">
      <div className="calculator-header">
        <Calculator size={32} color="#4285F4" />
        <h3>PPI 계산기</h3>
        <p>해상도와 대각선 크기로 픽셀 밀도 계산</p>
      </div>

      <div className="calculator-inputs">
        <div className="input-group">
          <label>가로 픽셀</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            min="100"
            max="10000"
          />
        </div>

        <div className="input-group">
          <label>세로 픽셀</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            min="100"
            max="10000"
          />
        </div>

        <div className="input-group">
          <label>대각선 (인치)</label>
          <input
            type="number"
            value={diagonal}
            onChange={(e) => setDiagonal(Number(e.target.value))}
            min="1"
            max="100"
            step="0.1"
          />
        </div>
      </div>

      <motion.button
        className="calculate-button"
        onClick={calculatePPI}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        계산하기
      </motion.button>

      {ppi > 0 && (
        <motion.div
          className="calculator-result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="ppi-value">
            <span className="ppi-number">{ppi.toFixed(1)}</span>
            <span className="ppi-unit">PPI</span>
          </div>

          <div
            className="ppi-evaluation"
            style={{ borderColor: getPPIEvaluation().color }}
          >
            <p style={{ color: getPPIEvaluation().color }}>
              {getPPIEvaluation().text}
            </p>
          </div>

          <div className="ppi-formula">
            <p>계산 과정:</p>
            <code>
              PPI = √({width}² + {height}²) / {diagonal}<br />
              = √{(width ** 2 + height ** 2).toLocaleString()} / {diagonal}<br />
              = {Math.sqrt(width ** 2 + height ** 2).toFixed(1)} / {diagonal}<br />
              = {ppi.toFixed(1)} PPI
            </code>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function DeviceSpecsGrid() {
  return (
    <div className="device-specs-grid">
      {deviceSpecs.map((device, index) => {
        const Icon = device.icon;
        return (
          <motion.div
            key={index}
            className="device-spec-card"
            style={{ borderColor: device.color }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className="device-icon" style={{ background: device.color }}>
              <Icon size={32} color="white" />
            </div>

            <h4>{device.device}</h4>

            <div className="spec-details">
              <div className="spec-row">
                <span className="spec-label">해상도</span>
                <span className="spec-value">{device.resolution}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">대각선</span>
                <span className="spec-value">{device.diagonal}"</span>
              </div>
              <div className="spec-row highlight">
                <span className="spec-label">PPI</span>
                <span className="spec-value ppi-highlight">{device.ppi}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">패널</span>
                <span className="spec-value">{device.type}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">서브픽셀</span>
                <span className="spec-value">{device.subpixels.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function PPIRangesGuide() {
  return (
    <div className="ppi-ranges-guide">
      <h3>PPI 범위별 최적 용도</h3>
      <div className="ranges-grid">
        {ppiRanges.map((range, index) => {
          const Icon = range.icon;
          return (
            <motion.div
              key={index}
              className="range-card"
              style={{ borderColor: range.color }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Icon size={28} color={range.color} />
              <div className="range-info">
                <h4 style={{ color: range.color }}>{range.range}</h4>
                <p className="usage">{range.usage}</p>
                <p className="distance">
                  <Eye size={14} />
                  시청 거리: {range.distance}
                </p>
                <p className="verdict">{range.verdict}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function StreamlitCodeDemo() {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `import streamlit as st
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

st.title("📱 픽셀 구조 시뮬레이터")

arrangement = st.sidebar.selectbox("배치 방식", ["RGB Stripe", "PenTile"])
pixel_count = st.sidebar.slider("픽셀 개수", 5, 50, 10)

fig, ax = plt.subplots(figsize=(12, 12))

if arrangement == "RGB Stripe":
    for row in range(pixel_count):
        for col in range(pixel_count):
            # R 서브픽셀
            r_rect = patches.Rectangle(
                (col * 3, row),
                1, 1,
                facecolor='red',
                edgecolor='black'
            )
            ax.add_patch(r_rect)

            # G, B 서브픽셀 동일 방식
            # ...

st.pyplot(fig)
st.metric("총 픽셀", f"{pixel_count * pixel_count:,}")`;

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

      <div className="code-explanation">
        <h5>핵심 기능</h5>
        <ul>
          <li>슬라이더로 픽셀 개수 조정 (5~50)</li>
          <li>배치 방식 선택 (RGB Stripe / PenTile)</li>
          <li>Matplotlib patches.Rectangle로 서브픽셀 렌더링</li>
          <li>st.pyplot()으로 실시간 업데이트</li>
        </ul>
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
        <TrendingUp size={32} color="#4285F4" />
        <h3>{lecture14Preview.title}</h3>
        <p>{lecture14Preview.description}</p>
      </div>

      <div className="preview-content">
        <div className="preview-section">
          <h4>핵심 주제</h4>
          <ul>
            {lecture14Preview.topics.map((topic, index) => (
              <li key={index}>
                <Zap size={16} color="#FBBC04" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="preview-section">
          <h4>결과물</h4>
          <ul>
            {lecture14Preview.deliverables.map((item, index) => (
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
        14강 바로가기 <ArrowRight size={20} />
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
            <Grid size={32} color="#EA4335" />
            <span className="logo-text">Letuin AI 강의</span>
          </div>
          <div className="header-tags">
            <span className="tag">Session 3</span>
            <span className="tag">13강</span>
            <span className="tag">픽셀 구조</span>
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
            픽셀 구조 시각화
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            디스플레이를 확대하면 빨강/초록/파랑 점이 보입니다. RGB 서브픽셀 배열을 시각화하고 PPI를 계산합니다.
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

        {/* SECTION 02: PIXEL CONCEPTS */}
        <section id="pixel-concepts" className="content-section">
          <h2>RGB 서브픽셀 원리</h2>
          <p className="section-intro">
            하나의 픽셀은 빨강(R), 초록(G), 파랑(B) 세 개의 서브픽셀로 구성됩니다.
          </p>

          <div className="concepts-grid">
            {pixelConcepts.map((concept, index) => {
              const Icon = concept.icon;
              return (
                <motion.div
                  key={index}
                  className="concept-card"
                  style={{ borderColor: concept.color }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Icon size={28} color={concept.color} />
                  <h4>{concept.title}</h4>
                  <p>{concept.description}</p>
                  <code className="formula">{concept.formula}</code>
                </motion.div>
              );
            })}
          </div>

          <PixelStructureVisual />
        </section>

        {/* SECTION 03: ARRANGEMENT COMPARISON */}
        <section id="arrangement" className="content-section">
          <h2>RGB Stripe vs PenTile 비교</h2>
          <p className="section-intro">
            서브픽셀 배치 방식에 따라 선명도, 비용, OLED 수명이 달라집니다.
          </p>
          <ArrangementComparison />
        </section>

        {/* SECTION 04: PPI CALCULATOR */}
        <section id="ppi-calculator" className="content-section">
          <h2>PPI 계산기</h2>
          <p className="section-intro">
            해상도와 대각선 크기로 픽셀 밀도(PPI)를 계산합니다.
          </p>
          <PPICalculator />
          <PPIRangesGuide />
        </section>

        {/* SECTION 05: DEVICE SPECS */}
        <section id="device-specs" className="content-section">
          <h2>실제 제품 사례</h2>
          <p className="section-intro">
            Galaxy, iPhone, iPad, 모니터의 픽셀 구조와 PPI를 비교합니다.
          </p>
          <DeviceSpecsGrid />
        </section>

        {/* SECTION 06: STREAMLIT CODE */}
        <section id="streamlit-code" className="content-section">
          <h2>Streamlit 시뮬레이터 구현</h2>
          <p className="section-intro">
            슬라이더로 픽셀 개수를 조정하고 실시간으로 렌더링하는 앱을 만듭니다.
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
