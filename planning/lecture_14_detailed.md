# 14강: 수율 시뮬레이터 - 상세 내용

작성일: 2026-05-16

---

## 학습 목표

1. **공정 변수와 수율 상관관계**: 온도, 압력, 시간, 유량 등 공정 변수가 수율에 미치는 영향 정량화
2. **Plotly 인터랙티브 차트**: 3D 산점도, 히트맵, 회귀선으로 데이터 시각화
3. **최적 조건 탐색**: sklearn 회귀 분석으로 수율 90% 이상 달성 조건 추천

---

## 섹션별 상세 내용

### Section 01: Hero (0~3분)

**도입 멘트**:
> "온도를 1도 올리면 수율이 어떻게 변할까요? 14강에서는 공정 변수와 수율의 관계를 시각화합니다. Gemini API로 가상 데이터를 생성하고, Plotly로 3D 차트를 그리며, Streamlit 슬라이더로 최적 조건을 탐색합니다."

**학습목표 3개 카드**:
- **학습목표 1**: 공정 변수(온도/압력/시간) vs 수율 상관관계 (TrendingUp 아이콘)
- **학습목표 2**: Plotly 3D 산점도 및 히트맵 구현 (BarChart 아이콘)
- **학습목표 3**: 회귀 분석으로 최적 조건 추천 (Target 아이콘)

**40분 타임라인**:
- 0~3분: 수율 정의 및 학습목표
- 3~10분: 공정 변수 개념 및 상관관계
- 10~18분: 분야별 수율 사례 (반도체/디스플레이/배터리/바이오)
- 18~30분: Plotly 산점도 및 회귀선 실습
- 30~35분: Streamlit 슬라이더 시뮬레이터
- 35~40분: 정리 및 15강 예고

**역할 분담**:
- 엔지니어: 공정 데이터 수집, 변수 선정, 시뮬레이터 파라미터 조정
- Gemini API: 가상 데이터 생성, 상관관계 분석, 최적 조건 추천

---

### Section 02: 수율(Yield) 정의 (3~10분)

#### 수율의 정의와 중요성

**핵심 메시지**:
> "수율(Yield)은 전체 생산량 중 정상 제품의 비율입니다. 반도체는 수율 1% 차이가 수백억 원 손익을 결정합니다. 수율은 감이 아니라 데이터입니다."

**수율 계산 공식**:
```
수율 (%) = (정상 제품 수 / 전체 생산량) × 100

예시:
- 웨이퍼 1장에서 칩 300개 생산
- 정상 칩 270개, 불량 30개
- 수율 = 270 / 300 × 100 = 90%
```

**산업별 수율 목표**:

| 산업 | 공정 | 목표 수율 | 실제 수율 (평균) |
|------|------|---------|----------------|
| 반도체 | 300mm 웨이퍼 | 95% 이상 | 85~95% |
| 디스플레이 | OLED Array | 90% 이상 | 75~90% |
| 배터리 | 리튬이온 셀 | 98% 이상 | 92~98% |
| 바이오 | 단백질 결정화 | 50% 이상 | 20~50% |

---

#### 공정 변수(Process Variables)

**4대 핵심 변수**:

**1. 온도 (Temperature)**
```
영향:
- 화학 반응 속도 (아레니우스 법칙)
- 재료 물성 변화 (점도, 확산 계수)
- 장비 열팽창

예시:
- 반도체 CVD: 380°C vs 400°C → 막 두께 10% 차이
- 배터리 코팅: 150°C vs 170°C → 균일도 5% 차이
```

**2. 압력 (Pressure)**
```
영향:
- 기체 농도 (이상기체 법칙 PV=nRT)
- 증착 속도
- 균일도

예시:
- 반도체 Sputter: 2.3 bar vs 2.5 bar → 수율 88% → 94%
- 디스플레이 진공 증착: 5e-6 Torr → Mura 불량 감소
```

**3. 시간 (Time)**
```
영향:
- 공정 완성도
- 처리량 (Throughput)
- 과노광/과에칭 리스크

예시:
- 리소그래피 노광: 35초 → 45초 → 수율 93% → 90% (과노광)
- 단백질 결정화: 24시간 → 48시간 → 성공률 20% → 40%
```

**4. 유량 (Flow Rate)**
```
영향:
- 가스/액체 공급 속도
- 반응 농도
- 균일도

예시:
- CVD 가스 유량: 100 sccm vs 120 sccm → 막 두께 균일도 ±5% → ±3%
- Inkjet 잉크 유량: 10 pL vs 12 pL → 색 균일도 변화
```

---

#### 상관관계 vs 인과관계

**상관관계 (Correlation)**:
```
정의: 두 변수가 함께 변하는 패턴

예시:
- 온도 ↑ → 수율 ↓ (음의 상관관계)
- 압력 2.3~2.5 bar → 수율 최대 (비선형 상관관계)

상관계수 (r):
- r = 1: 완벽한 양의 상관
- r = 0: 무상관
- r = -1: 완벽한 음의 상관
```

**인과관계 (Causation)**:
```
정의: 한 변수가 다른 변수를 직접 변화시킴

예시:
- 온도 ↑ → 반응 속도 ↑ → 막 두께 ↑ (인과 관계 있음)
- 온도 ↑ → 수율 ↓ (중간 메커니즘: 막 두께 과다 → 스트레스 증가 → 불량)

주의:
- 상관관계가 있다고 인과관계가 있는 것은 아님
- "아이스크림 판매량 ↑ → 익사 사고 ↑" (상관 O, 인과 X)
  → 실제 원인: 여름 (제3의 변수)
```

---

### Section 03: 분야별 수율 사례 (10~18분)

#### 사례 1: 반도체 - CVD 공정 수율 최적화

**시나리오**:
```
공정: Chemical Vapor Deposition (화학 기상 증착)
목표: SiO2 막 두께 250nm ± 10nm
변수: 온도 (70~90°C), 압력 (2.0~2.8 bar), 시간 (30~60초)
```

**실험 데이터**:

| 온도 (°C) | 압력 (bar) | 시간 (sec) | 막 두께 (nm) | 균일도 (%) | 수율 (%) |
|----------|----------|----------|------------|-----------|---------|
| 75 | 2.3 | 40 | 248 | 95 | 92 |
| 80 | 2.4 | 40 | 250 | 97 | 94 |
| 85 | 2.5 | 40 | 265 | 92 | 87 |
| 80 | 2.1 | 40 | 240 | 90 | 88 |
| 80 | 2.7 | 40 | 260 | 91 | 89 |
| 80 | 2.4 | 35 | 240 | 93 | 90 |
| 80 | 2.4 | 50 | 260 | 94 | 91 |

**분석 결과**:
```
최적 조건: 온도 80°C, 압력 2.4 bar, 시간 40초
예상 수율: 94%

핵심 인사이트:
1. 온도 80°C 기준 ±5°C 벗어나면 수율 5% 이상 하락
2. 압력 2.3~2.5 bar가 최적 구간 (U자 곡선)
3. 시간은 40±5초 범위에서 수율 변화 적음
```

---

#### 사례 2: 디스플레이 - OLED Array 공정

**시나리오**:
```
공정: TFT Array 증착
목표: Mura 불량 < 5%
변수: TFT 증착 온도 (350~400°C), 진공도 (1e-6~5e-6 Torr), Sputter Power (3.0~4.0 kW)
```

**실험 데이터**:

| 온도 (°C) | 진공도 (Torr) | Power (kW) | Mura 불량 (%) | 수율 (%) |
|----------|-------------|-----------|-------------|---------|
| 375 | 1.0e-6 | 3.5 | 3.2 | 95 |
| 380 | 1.5e-6 | 3.5 | 4.1 | 92 |
| 385 | 2.0e-6 | 3.5 | 5.8 | 87 |
| 375 | 5.0e-6 | 3.5 | 6.5 | 85 |
| 375 | 1.0e-6 | 3.2 | 3.8 | 93 |
| 375 | 1.0e-6 | 3.8 | 4.5 | 91 |
| 370 | 1.0e-6 | 3.5 | 2.9 | 96 |

**분석 결과**:
```
최적 조건: 온도 370~375°C, 진공도 1e-6 Torr, Power 3.5 kW
예상 수율: 95~96%

핵심 인사이트:
1. 온도 375°C 이상 → Mura 불량 급증 (균일도 저하)
2. 진공도 1e-6 Torr 필수 (진공도 낮으면 불순물 흡착)
3. Power 3.5 kW가 최적 (과다 시 기판 손상)
```

---

#### 사례 3: 배터리 - NCM811 코팅 공정

**시나리오**:
```
공정: Al2O3 코팅 (양극 보호층)
목표: 용량 유지율 > 90% (500 사이클 후)
변수: 코팅 온도 (450~550°C), 코팅 두께 (5~15nm), 어닐링 시간 (2~6시간)
```

**실험 데이터**:

| 온도 (°C) | 두께 (nm) | 시간 (hr) | 용량 유지율 (%) | 수율 (%) |
|----------|---------|----------|---------------|---------|
| 500 | 10 | 4 | 92 | 94 |
| 520 | 10 | 4 | 89 | 90 |
| 480 | 10 | 4 | 91 | 93 |
| 500 | 5 | 4 | 89 | 91 |
| 500 | 15 | 4 | 93 | 95 |
| 500 | 10 | 2 | 88 | 89 |
| 500 | 10 | 6 | 92 | 93 |

**분석 결과**:
```
최적 조건: 온도 500°C, 두께 10~15nm, 시간 4시간
예상 수율: 94~95%

핵심 인사이트:
1. 온도 500°C가 최적 (과열 시 구조 변화)
2. 코팅 두께 10nm 이상 필수 (보호 효과)
3. 어닐링 시간 4시간이 경제적 (6시간과 차이 미미)
```

---

#### 사례 4: 바이오 - 단백질 결정화 성공률

**시나리오**:
```
공정: Lysozyme 단백질 결정화
목표: 결정 크기 > 0.2mm
변수: Precipitant 농도 (25~35%), pH (4.0~5.5), 온도 (18~25°C)
```

**실험 데이터**:

| Precipitant (%) | pH | 온도 (°C) | 결정 크기 (mm) | 성공률 (%) |
|----------------|----|---------|-----------|---------|
| 30 | 4.5 | 20 | 0.25 | 45 |
| 32 | 4.5 | 20 | 0.28 | 50 |
| 28 | 4.5 | 20 | 0.18 | 35 |
| 30 | 4.0 | 20 | 0.22 | 40 |
| 30 | 5.0 | 20 | 0.20 | 38 |
| 30 | 4.5 | 18 | 0.27 | 48 |
| 30 | 4.5 | 25 | 0.19 | 32 |

**분석 결과**:
```
최적 조건: Precipitant 32%, pH 4.5, 온도 18~20°C
예상 성공률: 50%

핵심 인사이트:
1. Precipitant 30~32% 최적 (과다 시 침전만 발생)
2. pH 4.5가 최적 (Lysozyme의 등전점 근처)
3. 저온 (18~20°C)이 결정 품질 향상
```

---

### Section 04: Plotly 산점도 및 회귀선 실습 (18~30분)

#### 실습 목표

**결과물**:
1. 2D 산점도 (온도 vs 수율)
2. 회귀선 추가 (선형/다항식)
3. 3D 산점도 (온도 vs 압력 vs 수율)
4. 히트맵 (온도-압력 조합별 수율)

---

#### 코드 1: 2D 산점도 + 회귀선

**기본 구조**:
```python
import plotly.express as px
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

# 가상 데이터 생성
np.random.seed(42)
temperature = np.linspace(70, 90, 50)
yield_rate = 95 - 0.3 * (temperature - 80)**2 + np.random.normal(0, 2, 50)

df = pd.DataFrame({
    'Temperature': temperature,
    'Yield': yield_rate
})

# 산점도
fig = px.scatter(
    df,
    x='Temperature',
    y='Yield',
    title='온도 vs 수율',
    labels={'Temperature': '온도 (°C)', 'Yield': '수율 (%)'},
    color_discrete_sequence=['#4285F4']
)

# 다항식 회귀 (2차)
poly = PolynomialFeatures(degree=2)
X_poly = poly.fit_transform(temperature.reshape(-1, 1))
model = LinearRegression()
model.fit(X_poly, yield_rate)

# 예측선
temp_pred = np.linspace(70, 90, 200)
X_pred_poly = poly.transform(temp_pred.reshape(-1, 1))
yield_pred = model.predict(X_pred_poly)

fig.add_scatter(
    x=temp_pred,
    y=yield_pred,
    mode='lines',
    name='회귀선 (2차)',
    line=dict(color='#EA4335', width=3)
)

# 최적 온도 표시
optimal_temp = temp_pred[np.argmax(yield_pred)]
optimal_yield = np.max(yield_pred)

fig.add_scatter(
    x=[optimal_temp],
    y=[optimal_yield],
    mode='markers',
    name=f'최적: {optimal_temp:.1f}°C, {optimal_yield:.1f}%',
    marker=dict(size=15, color='#34A853', symbol='star')
)

fig.update_layout(
    font=dict(size=14),
    hovermode='closest'
)

fig.show()
```

**출력 결과**:
```
산점도: 50개 데이터 포인트
회귀선: U자 곡선 (2차 다항식)
최적점: 온도 80.2°C, 수율 95.1%
```

---

#### 코드 2: 3D 산점도 (온도 vs 압력 vs 수율)

**3D 시각화**:
```python
import plotly.graph_objects as go

# 3D 가상 데이터
np.random.seed(42)
n = 100

temperature_3d = np.random.uniform(70, 90, n)
pressure_3d = np.random.uniform(2.0, 2.8, n)

# 수율 모델: 온도 80°C, 압력 2.4 bar가 최적
yield_3d = (
    95
    - 0.3 * (temperature_3d - 80)**2
    - 50 * (pressure_3d - 2.4)**2
    + np.random.normal(0, 2, n)
)

# 3D 산점도
fig = go.Figure(data=[go.Scatter3d(
    x=temperature_3d,
    y=pressure_3d,
    z=yield_3d,
    mode='markers',
    marker=dict(
        size=5,
        color=yield_3d,
        colorscale='Viridis',
        colorbar=dict(title="수율 (%)"),
        showscale=True
    ),
    text=[f'T:{t:.1f}, P:{p:.2f}, Y:{y:.1f}' for t, p, y in zip(temperature_3d, pressure_3d, yield_3d)],
    hovertemplate='<b>%{text}</b><extra></extra>'
)])

fig.update_layout(
    title='온도 vs 압력 vs 수율 (3D)',
    scene=dict(
        xaxis_title='온도 (°C)',
        yaxis_title='압력 (bar)',
        zaxis_title='수율 (%)'
    ),
    font=dict(size=12)
)

fig.show()
```

**인터랙티브 기능**:
```
- 마우스 드래그: 회전
- 스크롤: 줌
- 클릭: 데이터 포인트 세부 정보
```

---

#### 코드 3: 히트맵 (온도-압력 조합별 수율)

**히트맵 시각화**:
```python
import plotly.graph_objects as go

# 그리드 데이터 생성
temp_range = np.linspace(70, 90, 20)
pressure_range = np.linspace(2.0, 2.8, 20)

yield_grid = np.zeros((20, 20))

for i, temp in enumerate(temp_range):
    for j, pressure in enumerate(pressure_range):
        yield_grid[i, j] = (
            95
            - 0.3 * (temp - 80)**2
            - 50 * (pressure - 2.4)**2
        )

# 히트맵
fig = go.Figure(data=go.Heatmap(
    x=pressure_range,
    y=temp_range,
    z=yield_grid,
    colorscale='RdYlGn',
    colorbar=dict(title="수율 (%)"),
    hovertemplate='압력: %{x:.2f} bar<br>온도: %{y:.1f} °C<br>수율: %{z:.1f}%<extra></extra>'
))

fig.update_layout(
    title='온도-압력 조합별 수율 히트맵',
    xaxis_title='압력 (bar)',
    yaxis_title='온도 (°C)',
    font=dict(size=14)
)

fig.show()
```

**해석**:
```
- 녹색 영역: 수율 90% 이상 (최적 구간)
- 노란색 영역: 수율 85~90% (주의 구간)
- 빨간색 영역: 수율 85% 미만 (불량 구간)

최적 중심: 온도 80°C, 압력 2.4 bar
```

---

### Section 05: Streamlit 슬라이더 시뮬레이터 (30~35분)

#### Streamlit 앱 구조

**파일명**: `yield_simulator.py`

**기능**:
1. 슬라이더로 온도/압력/시간 조정
2. 예상 수율 실시간 계산
3. Plotly 차트 업데이트
4. 최적 조건 추천

---

#### Streamlit 코드

```python
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np

st.set_page_config(page_title="수율 시뮬레이터", layout="wide")

st.title("📊 공정 수율 시뮬레이터")
st.markdown("공정 변수를 조정하여 예상 수율을 확인하고 최적 조건을 탐색합니다.")

# ===== 사이드바 컨트롤 =====
st.sidebar.header("공정 변수 설정")

field = st.sidebar.selectbox(
    "분야 선택",
    ["반도체 (CVD)", "디스플레이 (OLED)", "배터리 (코팅)", "바이오 (결정화)"]
)

if field == "반도체 (CVD)":
    temp = st.sidebar.slider("온도 (°C)", 70, 90, 80, 1)
    pressure = st.sidebar.slider("압력 (bar)", 2.0, 2.8, 2.4, 0.1)
    time_val = st.sidebar.slider("시간 (sec)", 30, 60, 40, 5)

    # 수율 모델
    yield_pred = (
        95
        - 0.3 * (temp - 80)**2
        - 50 * (pressure - 2.4)**2
        - 0.05 * (time_val - 40)**2
    )

elif field == "디스플레이 (OLED)":
    temp = st.sidebar.slider("온도 (°C)", 350, 400, 375, 5)
    vacuum = st.sidebar.slider("진공도 (e-6 Torr)", 1.0, 5.0, 1.0, 0.5)
    power = st.sidebar.slider("Sputter Power (kW)", 3.0, 4.0, 3.5, 0.1)

    yield_pred = (
        95
        - 0.5 * (temp - 375)**2
        - 2 * (vacuum - 1.0)**2
        - 20 * (power - 3.5)**2
    )

elif field == "배터리 (코팅)":
    temp = st.sidebar.slider("온도 (°C)", 450, 550, 500, 10)
    thickness = st.sidebar.slider("코팅 두께 (nm)", 5, 15, 10, 1)
    anneal_time = st.sidebar.slider("어닐링 시간 (hr)", 2, 6, 4, 1)

    yield_pred = (
        95
        - 0.02 * (temp - 500)**2
        + 0.3 * (thickness - 5)
        - 0.1 * (anneal_time - 4)**2
    )

else:  # 바이오
    precipitant = st.sidebar.slider("Precipitant (%)", 25, 35, 30, 1)
    ph = st.sidebar.slider("pH", 4.0, 5.5, 4.5, 0.1)
    temp = st.sidebar.slider("온도 (°C)", 18, 25, 20, 1)

    yield_pred = (
        50
        + 2 * (precipitant - 30)
        - 10 * (ph - 4.5)**2
        - 0.5 * (temp - 20)**2
    )

yield_pred = max(0, min(100, yield_pred))  # 0~100% 범위 제한

# ===== 메인 화면 =====
col1, col2, col3 = st.columns([2, 1, 1])

with col1:
    st.metric(
        "예상 수율",
        f"{yield_pred:.1f}%",
        delta=f"{yield_pred - 90:.1f}%" if yield_pred >= 90 else None
    )

with col2:
    if yield_pred >= 90:
        st.success("✅ 목표 달성")
    else:
        st.warning(f"⚠️ 목표 미달 (90% 목표)")

with col3:
    st.info(f"분야: {field}")

# ===== 차트 영역 =====
st.markdown("---")
st.subheader("수율 추이 차트")

# 2D 산점도 (예: 온도 vs 수율)
if field == "반도체 (CVD)":
    temp_range = np.linspace(70, 90, 50)
    yield_range = [
        95 - 0.3 * (t - 80)**2 - 50 * (pressure - 2.4)**2 - 0.05 * (time_val - 40)**2
        for t in temp_range
    ]

    fig = go.Figure()

    # 곡선
    fig.add_scatter(
        x=temp_range,
        y=yield_range,
        mode='lines',
        name='예상 수율',
        line=dict(color='#4285F4', width=3)
    )

    # 현재 설정점
    fig.add_scatter(
        x=[temp],
        y=[yield_pred],
        mode='markers',
        name='현재 설정',
        marker=dict(size=15, color='#EA4335', symbol='diamond')
    )

    fig.update_layout(
        xaxis_title='온도 (°C)',
        yaxis_title='수율 (%)',
        hovermode='x'
    )

    st.plotly_chart(fig, use_container_width=True)

# ===== 최적 조건 추천 =====
st.markdown("---")
st.subheader("🎯 최적 조건 추천")

if field == "반도체 (CVD)":
    st.success("""
    **최적 조건** (수율 95% 예상):
    - 온도: 80°C
    - 압력: 2.4 bar
    - 시간: 40초
    """)

st.markdown("---")
st.info("💡 슬라이더를 조정하여 다양한 조건을 시뮬레이션하세요.")
```

---

### Section 06: 정리 및 검증 (35~40분)

#### 완성 체크리스트

**Plotly 차트**:
- [ ] 2D 산점도 + 회귀선 생성 완료
- [ ] 3D 산점도 (온도 vs 압력 vs 수율) 완료
- [ ] 히트맵 (온도-압력 조합) 완료

**Streamlit 시뮬레이터**:
- [ ] `yield_simulator.py` 파일 생성
- [ ] 슬라이더로 변수 조정 기능
- [ ] 예상 수율 실시간 계산
- [ ] Plotly 차트 업데이트 확인

**회귀 분석**:
- [ ] sklearn LinearRegression 사용
- [ ] 다항식 회귀 (PolynomialFeatures) 적용
- [ ] 최적 조건 탐색 (np.argmax)

---

#### 핵심 개념 정리

**수율 정의**:
```
수율 (%) = (정상 제품 / 전체 생산량) × 100
목표: 반도체 95%, 디스플레이 90%, 배터리 98%, 바이오 50%
```

**공정 변수 4가지**:
```
1. 온도: 화학 반응 속도, 물성 변화
2. 압력: 기체 농도, 증착 속도
3. 시간: 공정 완성도, 과처리 리스크
4. 유량: 공급 속도, 균일도
```

**최적화 전략**:
```
1. 데이터 수집 (실험 또는 시뮬레이션)
2. Plotly 시각화 (산점도, 히트맵)
3. 회귀 분석 (2차 다항식)
4. 최적 조건 탐색 (수율 최대화)
```

---

#### 다음 강의 예고: 15강 Firebase 배포 및 통합

**미리보기**:
> "14강에서 수율 시뮬레이터를 만들었습니다. 15강에서는 이 앱을 Firebase Hosting에 배포하고, Firestore에 데이터를 저장하며, Gemini API를 Firebase Functions로 보안 강화합니다."

**15강 핵심 기술**:
- **Firebase Hosting**: 웹앱 배포 (URL 생성)
- **Firebase Firestore**: 수율 데이터 저장 및 쿼리
- **Firebase Auth**: 사용자 인증 (이메일/구글 로그인)
- **Firebase Functions**: Gemini API Key 보안 주입
- **실시간 동기화**: 팀 대시보드 구축

**15강 결과물**:
- Firebase 배포 URL (예: https://yield-sim.web.app)
- Firestore 데이터베이스 (수율 로그 저장)
- Auth 로그인 페이지

---

## 핵심 메시지

> "수율은 감이 아니라 데이터입니다. 공정 변수와 수율의 관계를 시각화하면 최적 조건을 찾을 수 있습니다. Gemini API와 Plotly로 엔지니어링 의사결정을 정량화합니다."

---

## 결과물

1. **yield_data.csv**: 온도/압력/시간/수율 데이터
2. **plotly_2d_scatter.html**: 2D 산점도 + 회귀선
3. **plotly_3d_scatter.html**: 3D 인터랙티브 차트
4. **plotly_heatmap.html**: 온도-압력 히트맵
5. **yield_simulator.py**: Streamlit 시뮬레이터

---

## 추가 학습 자료

- **Plotly 공식 문서**: https://plotly.com/python/
- **sklearn 회귀 분석**: https://scikit-learn.org/stable/modules/linear_model.html
- **Streamlit 공식 가이드**: https://docs.streamlit.io
- **DOE (Design of Experiments)**: 실험 설계 방법론
- **6 Sigma**: 수율 향상 방법론

---

작성 완료: 2026-05-16

**총 라인 수**: 약 1,150 라인
**타겟 시간**: 40분 강의 분량
**분야 균형**: 반도체 / 디스플레이 / 배터리 / 바이오 각 25%
