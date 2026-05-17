# 13강: 픽셀 구조 시각화 - 상세 내용

작성일: 2026-05-16

---

## 학습 목표

1. **RGB 픽셀 배열 구조 시각화**: 빨강/초록/파랑 서브픽셀 배치를 SVG/Matplotlib으로 구현
2. **PenTile vs RGB Stripe 비교**: 삼성 OLED(PenTile)와 애플 LCD(RGB Stripe) 구조 차이 이해
3. **PPI 계산기 구현**: 해상도와 대각선 크기로 픽셀 밀도를 계산하는 Streamlit 앱 제작

---

## 섹션별 상세 내용

### Section 01: Hero (0~3분)

**도입 멘트**:
> "디스플레이를 확대하면 빨강/초록/파랑 점이 보입니다. 이것이 서브픽셀입니다. 13강에서는 픽셀 구조를 시각화하고 PPI(Pixels Per Inch)를 계산합니다. Gemini API와 Streamlit으로 인터랙티브 시뮬레이터를 만듭니다."

**학습목표 3개 카드**:
- **학습목표 1**: RGB 서브픽셀 배열 시각화 (Grid 아이콘)
- **학습목표 2**: PenTile vs RGB Stripe 구조 비교 (Layers 아이콘)
- **학습목표 3**: PPI 계산기 및 시뮬레이터 구현 (Sliders 아이콘)

**40분 타임라인**:
- 0~3분: 픽셀 구조 개요 및 학습목표
- 3~10분: RGB 서브픽셀 원리 및 배치 방식
- 10~18분: 실제 제품 사례 (Galaxy/iPhone/Monitor)
- 18~30분: Matplotlib 픽셀 그리드 실습
- 30~35분: Streamlit 슬라이더 시뮬레이터
- 35~40분: 정리 및 14강 예고

**역할 분담**:
- 엔지니어: 픽셀 배치 알고리즘 작성, 슬라이더 파라미터 조정
- Gemini API: 픽셀 배치 최적화 코드 생성, PPI 계산 공식 설명

---

### Section 02: RGB 서브픽셀 원리 (3~10분)

#### 픽셀(Pixel)의 정의

**핵심 메시지**:
> "픽셀(Pixel)은 Picture Element의 줄임말입니다. 하나의 픽셀은 빨강(R), 초록(G), 파랑(B) 세 개의 서브픽셀로 구성됩니다. 세 색을 조합하면 1,670만 가지 색상을 표현할 수 있습니다."

**서브픽셀 구조**:
```
하나의 픽셀 = R (빨강) + G (초록) + B (파랑)

[R] [G] [B]  ← 1픽셀

색상 조합 예시:
- 빨강 (255, 0, 0): R만 켜고 G, B는 끔
- 노랑 (255, 255, 0): R+G 켜고 B는 끔
- 흰색 (255, 255, 255): R, G, B 모두 켬
- 검정 (0, 0, 0): R, G, B 모두 끔
```

**서브픽셀 크기**:
```
Galaxy S24 Ultra (501 PPI):
- 1픽셀 크기: 50.6 마이크로미터 (0.0506mm)
- R 서브픽셀: 약 16.9 마이크로미터
- G 서브픽셀: 약 16.9 마이크로미터
- B 서브픽셀: 약 16.8 마이크로미터
```

---

#### RGB Stripe vs PenTile 배치 방식

**RGB Stripe (일반 LCD, 일부 OLED)**:
```
구조:
R - G - B | R - G - B | R - G - B
R - G - B | R - G - B | R - G - B
R - G - B | R - G - B | R - G - B

특징:
- 서브픽셀이 1:1:1 비율로 균등 배치
- 가로/세로 직선이 선명
- 텍스트 렌더링 우수
```

**PenTile (삼성 OLED)**:
```
구조:
R - G - - | - - B - G | R - G - - | - - B - G
- - B - G | R - G - - | - - B - G | R - G - -

특징:
- G 서브픽셀을 2배 배치 (인간 눈이 녹색에 민감)
- R, B는 공유 (픽셀 간 보간)
- OLED 수명 향상 (B가 빨리 열화되므로 크기 증가)
- 실제 서브픽셀 수는 2/3 수준
```

**비교표**:

| 항목 | RGB Stripe | PenTile |
|------|-----------|---------|
| 서브픽셀 배치 | R-G-B 반복 | RG-BG 반복 |
| 서브픽셀 개수 | 100% (3n) | 67% (2n) |
| 텍스트 선명도 | 높음 | 중간 (안티앨리어싱 필요) |
| 색 정확도 | 높음 | 중간 |
| OLED 수명 | 표준 | 향상 (B 서브픽셀 크기 증가) |
| 제조 비용 | 높음 | 낮음 (서브픽셀 수 감소) |
| 대표 제품 | iPhone LCD, LG OLED TV | 삼성 Galaxy, Galaxy Watch |

---

#### PPI (Pixels Per Inch) 계산 공식

**PPI 정의**:
> "PPI는 1인치당 픽셀 개수입니다. 높을수록 화면이 세밀하고 선명합니다. 인간 눈의 분별력 한계는 약 300 PPI (30cm 거리)입니다."

**계산 공식**:
```
PPI = √(가로 픽셀² + 세로 픽셀²) / 대각선 인치

예시 1: Galaxy S24 Ultra
- 해상도: 3120 x 1440
- 대각선: 6.8 인치
- PPI = √(3120² + 1440²) / 6.8
      = √(9,734,400 + 2,073,600) / 6.8
      = √11,808,000 / 6.8
      = 3,436 / 6.8
      = 505.3 PPI

예시 2: iPhone 15 Pro
- 해상도: 2556 x 1179
- 대각선: 6.1 인치
- PPI = √(2556² + 1179²) / 6.1
      = √(6,533,136 + 1,390,041) / 6.1
      = √7,923,177 / 6.1
      = 2,815 / 6.1
      = 461.5 PPI

예시 3: 32인치 4K 모니터
- 해상도: 3840 x 2160
- 대각선: 32 인치
- PPI = √(3840² + 2160²) / 32
      = √(14,745,600 + 4,665,600) / 32
      = √19,411,200 / 32
      = 4,405 / 32
      = 137.7 PPI
```

**PPI와 시야 거리**:
```
300 PPI 이상: 30cm 거리에서 픽셀 안 보임 (스마트폰)
150-200 PPI: 50cm 거리 최적 (태블릿)
100-150 PPI: 70cm 거리 최적 (노트북)
80-110 PPI: 100cm 거리 최적 (데스크탑 모니터)
```

---

### Section 03: 실제 제품 사례 (10~18분)

#### 사례 1: Galaxy S24 Ultra (PenTile OLED)

**스펙**:
```
해상도: 3120 x 1440 (QHD+)
대각선: 6.8 인치
PPI: 505
패널: Dynamic AMOLED 2X
서브픽셀: PenTile (RG-BG)
주사율: 120Hz
최대 휘도: 1,750 nit (HDR)
```

**PenTile 구조 분석**:
```
실제 서브픽셀 수:
- RGB Stripe 기준: 3120 x 1440 x 3 = 13,478,400 서브픽셀
- PenTile 실제: 3120 x 1440 x 2 = 8,985,600 서브픽셀
- 감소율: 33%

장점:
- 제조 비용 절감
- B 서브픽셀 크기 증가 → OLED 수명 향상
- 소비 전력 감소

단점:
- 텍스트 렌더링 시 색 번짐 (작은 글씨)
- 실효 해상도 감소 (약 2,600 x 1,200 수준)
```

**삼성의 PenTile 최적화**:
```
1. 서브픽셀 렌더링 알고리즘 (안드로이드 OS)
2. 안티앨리어싱 강화 (글자 경계 부드럽게)
3. G 서브픽셀 2배 배치 (인간 눈의 녹색 민감도 활용)
```

---

#### 사례 2: iPhone 15 Pro (RGB Stripe OLED)

**스펙**:
```
해상도: 2556 x 1179
대각선: 6.1 인치
PPI: 460
패널: Super Retina XDR (LTPO OLED)
서브픽셀: RGB Stripe
주사율: 120Hz (ProMotion)
최대 휘도: 2,000 nit (HDR)
```

**RGB Stripe 구조 분석**:
```
실제 서브픽셀 수:
- 2556 x 1179 x 3 = 9,036,084 서브픽셀

장점:
- 텍스트 렌더링 최고 선명도
- 색 정확도 우수 (True Tone, P3 color)
- 실제 해상도 = 표기 해상도

단점:
- 제조 비용 높음
- B 서브픽셀 크기 작음 → OLED 수명 상대적으로 짧음
```

**애플의 RGB Stripe 선택 이유**:
```
1. 프리미엄 브랜드 이미지 (최고 화질)
2. 텍스트 중심 사용 (웹 브라우징, 메시지)
3. 색 재현율 중요 (사진/동영상 편집)
```

---

#### 사례 3: 32인치 4K 모니터 (RGB Stripe IPS LCD)

**스펙**:
```
해상도: 3840 x 2160 (4K UHD)
대각선: 32 인치
PPI: 138
패널: IPS LCD
서브픽셀: RGB Stripe
주사율: 60Hz (일부 144Hz)
휘도: 300-400 nit
```

**저 PPI의 영향**:
```
138 PPI는 70cm 거리에서 최적:
- 30cm 거리: 픽셀이 보임 (계단 현상)
- 70cm 거리: 픽셀 안 보임 (자연스러움)
- 100cm 거리: 여전히 선명

용도별 적합성:
- 사무 작업: 적합 (문서, 스프레드시트)
- 웹 브라우징: 적합
- 사진 편집: 부족 (27인치 4K 권장, 163 PPI)
- 게임: 적합 (시야 거리 고려)
```

---

#### 디스플레이 픽셀 밀도 비교표

| 제품 | 해상도 | 대각선 | PPI | 서브픽셀 배치 | 용도 |
|------|-------|-------|-----|------------|-----|
| Galaxy S24 Ultra | 3120x1440 | 6.8" | 505 | PenTile | 스마트폰 |
| iPhone 15 Pro | 2556x1179 | 6.1" | 460 | RGB Stripe | 스마트폰 |
| iPad Pro 12.9 | 2732x2048 | 12.9" | 264 | RGB Stripe | 태블릿 |
| MacBook Pro 14 | 3024x1964 | 14.2" | 254 | RGB Stripe | 노트북 |
| 27" 4K 모니터 | 3840x2160 | 27" | 163 | RGB Stripe | 디자인 |
| 32" 4K 모니터 | 3840x2160 | 32" | 138 | RGB Stripe | 사무/게임 |
| 65" 4K TV | 3840x2160 | 65" | 68 | RGB Stripe | TV (3m 거리) |

---

### Section 04: Matplotlib 픽셀 그리드 실습 (18~30분)

#### 실습 목표

**결과물**:
1. RGB Stripe 배열 시각화 (10x10 픽셀)
2. PenTile 배열 시각화 (10x10 픽셀)
3. 확대 시뮬레이션 (서브픽셀 간격 조정)

---

#### 코드 1: RGB Stripe 픽셀 그리드

**기본 구조**:
```python
import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, ax = plt.subplots(figsize=(10, 10))

# 10x10 픽셀 그리드
pixel_rows = 10
pixel_cols = 10
subpixel_width = 1  # 서브픽셀 너비
subpixel_height = 3  # 서브픽셀 높이

for row in range(pixel_rows):
    for col in range(pixel_cols):
        # R 서브픽셀
        r_rect = patches.Rectangle(
            (col * 3 * subpixel_width, row * subpixel_height),
            subpixel_width,
            subpixel_height,
            facecolor='red',
            edgecolor='black',
            linewidth=0.5
        )
        ax.add_patch(r_rect)

        # G 서브픽셀
        g_rect = patches.Rectangle(
            (col * 3 * subpixel_width + subpixel_width, row * subpixel_height),
            subpixel_width,
            subpixel_height,
            facecolor='green',
            edgecolor='black',
            linewidth=0.5
        )
        ax.add_patch(g_rect)

        # B 서브픽셀
        b_rect = patches.Rectangle(
            (col * 3 * subpixel_width + 2 * subpixel_width, row * subpixel_height),
            subpixel_width,
            subpixel_height,
            facecolor='blue',
            edgecolor='black',
            linewidth=0.5
        )
        ax.add_patch(b_rect)

ax.set_xlim(0, pixel_cols * 3 * subpixel_width)
ax.set_ylim(0, pixel_rows * subpixel_height)
ax.set_aspect('equal')
ax.set_title('RGB Stripe 배열 (10x10 픽셀)', fontsize=16)
ax.axis('off')

plt.tight_layout()
plt.savefig('rgb_stripe_grid.png', dpi=300)
plt.show()
```

**출력 결과**:
```
10x10 픽셀 = 300개 서브픽셀 (R 100개 + G 100개 + B 100개)
이미지 크기: 30 x 30 서브픽셀
```

---

#### 코드 2: PenTile 배열 시각화

**PenTile 패턴**:
```python
import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, ax = plt.subplots(figsize=(10, 10))

pixel_rows = 10
pixel_cols = 10
subpixel_width = 1.5  # PenTile은 서브픽셀이 더 큼
subpixel_height = 3

for row in range(pixel_rows):
    for col in range(pixel_cols):
        if col % 2 == 0:
            # 짝수 열: R-G 패턴
            # R 서브픽셀
            r_rect = patches.Rectangle(
                (col * 2 * subpixel_width, row * subpixel_height),
                subpixel_width,
                subpixel_height,
                facecolor='red',
                edgecolor='black',
                linewidth=0.5
            )
            ax.add_patch(r_rect)

            # G 서브픽셀
            g_rect = patches.Rectangle(
                (col * 2 * subpixel_width + subpixel_width, row * subpixel_height),
                subpixel_width,
                subpixel_height,
                facecolor='green',
                edgecolor='black',
                linewidth=0.5
            )
            ax.add_patch(g_rect)
        else:
            # 홀수 열: B-G 패턴
            # B 서브픽셀
            b_rect = patches.Rectangle(
                (col * 2 * subpixel_width, row * subpixel_height),
                subpixel_width,
                subpixel_height,
                facecolor='blue',
                edgecolor='black',
                linewidth=0.5
            )
            ax.add_patch(b_rect)

            # G 서브픽셀
            g_rect = patches.Rectangle(
                (col * 2 * subpixel_width + subpixel_width, row * subpixel_height),
                subpixel_width,
                subpixel_height,
                facecolor='green',
                edgecolor='black',
                linewidth=0.5
            )
            ax.add_patch(g_rect)

ax.set_xlim(0, pixel_cols * 2 * subpixel_width)
ax.set_ylim(0, pixel_rows * subpixel_height)
ax.set_aspect('equal')
ax.set_title('PenTile 배열 (10x10 픽셀)', fontsize=16)
ax.axis('off')

plt.tight_layout()
plt.savefig('pentile_grid.png', dpi=300)
plt.show()
```

**출력 결과**:
```
10x10 픽셀 = 200개 서브픽셀 (R 50개 + G 100개 + B 50개)
G 서브픽셀이 2배 → 인간 눈의 녹색 민감도 활용
```

---

#### 코드 3: 나란히 비교 (Subplot)

**RGB Stripe vs PenTile 비교**:
```python
import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 8))

# 왼쪽: RGB Stripe
pixel_rows = 10
pixel_cols = 10
subpixel_width = 1
subpixel_height = 3

for row in range(pixel_rows):
    for col in range(pixel_cols):
        # R, G, B 서브픽셀 (위 코드 동일)
        pass  # (코드 생략, 위와 동일)

ax1.set_title('RGB Stripe (300 서브픽셀)', fontsize=14)
ax1.axis('off')

# 오른쪽: PenTile
for row in range(pixel_rows):
    for col in range(pixel_cols):
        # RG-BG 패턴 (위 코드 동일)
        pass  # (코드 생략, 위와 동일)

ax2.set_title('PenTile (200 서브픽셀)', fontsize=14)
ax2.axis('off')

plt.tight_layout()
plt.savefig('stripe_vs_pentile.png', dpi=300)
plt.show()
```

---

### Section 05: Streamlit 시뮬레이터 (30~35분)

#### Streamlit 앱 구조

**파일명**: `pixel_simulator.py`

**기능**:
1. 슬라이더로 픽셀 개수 조정 (10~100)
2. 배치 방식 선택 (RGB Stripe / PenTile)
3. 실시간 렌더링
4. PPI 계산기 (해상도, 대각선 입력 → PPI 출력)

---

#### Streamlit 코드

```python
import streamlit as st
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

st.set_page_config(page_title="픽셀 구조 시뮬레이터", layout="wide")

st.title("📱 픽셀 구조 시뮬레이터")
st.markdown("RGB 서브픽셀 배열을 시각화하고 PPI를 계산합니다.")

# ===== 사이드바 컨트롤 =====
st.sidebar.header("설정")

arrangement = st.sidebar.selectbox(
    "배치 방식",
    ["RGB Stripe", "PenTile"]
)

pixel_count = st.sidebar.slider(
    "픽셀 개수 (한 변)",
    min_value=5,
    max_value=50,
    value=10,
    step=1
)

subpixel_width = st.sidebar.slider(
    "서브픽셀 너비",
    min_value=0.5,
    max_value=2.0,
    value=1.0,
    step=0.1
)

subpixel_height = st.sidebar.slider(
    "서브픽셀 높이",
    min_value=1.0,
    max_value=5.0,
    value=3.0,
    step=0.5
)

# ===== 픽셀 그리드 렌더링 =====
st.subheader(f"{arrangement} 배열 시각화")

fig, ax = plt.subplots(figsize=(12, 12))

if arrangement == "RGB Stripe":
    # RGB Stripe 렌더링
    for row in range(pixel_count):
        for col in range(pixel_count):
            # R
            r_rect = patches.Rectangle(
                (col * 3 * subpixel_width, row * subpixel_height),
                subpixel_width,
                subpixel_height,
                facecolor='red',
                edgecolor='black',
                linewidth=0.3
            )
            ax.add_patch(r_rect)

            # G
            g_rect = patches.Rectangle(
                (col * 3 * subpixel_width + subpixel_width, row * subpixel_height),
                subpixel_width,
                subpixel_height,
                facecolor='green',
                edgecolor='black',
                linewidth=0.3
            )
            ax.add_patch(g_rect)

            # B
            b_rect = patches.Rectangle(
                (col * 3 * subpixel_width + 2 * subpixel_width, row * subpixel_height),
                subpixel_width,
                subpixel_height,
                facecolor='blue',
                edgecolor='black',
                linewidth=0.3
            )
            ax.add_patch(b_rect)

    ax.set_xlim(0, pixel_count * 3 * subpixel_width)
    total_subpixels = pixel_count * pixel_count * 3

else:  # PenTile
    for row in range(pixel_count):
        for col in range(pixel_count):
            if col % 2 == 0:
                # RG 패턴
                r_rect = patches.Rectangle(
                    (col * 2 * subpixel_width, row * subpixel_height),
                    subpixel_width * 1.2,  # PenTile은 서브픽셀이 약간 큼
                    subpixel_height,
                    facecolor='red',
                    edgecolor='black',
                    linewidth=0.3
                )
                ax.add_patch(r_rect)

                g_rect = patches.Rectangle(
                    (col * 2 * subpixel_width + subpixel_width * 1.2, row * subpixel_height),
                    subpixel_width * 1.2,
                    subpixel_height,
                    facecolor='green',
                    edgecolor='black',
                    linewidth=0.3
                )
                ax.add_patch(g_rect)
            else:
                # BG 패턴
                b_rect = patches.Rectangle(
                    (col * 2 * subpixel_width, row * subpixel_height),
                    subpixel_width * 1.2,
                    subpixel_height,
                    facecolor='blue',
                    edgecolor='black',
                    linewidth=0.3
                )
                ax.add_patch(b_rect)

                g_rect = patches.Rectangle(
                    (col * 2 * subpixel_width + subpixel_width * 1.2, row * subpixel_height),
                    subpixel_width * 1.2,
                    subpixel_height,
                    facecolor='green',
                    edgecolor='black',
                    linewidth=0.3
                )
                ax.add_patch(g_rect)

    ax.set_xlim(0, pixel_count * 2 * subpixel_width * 1.2)
    total_subpixels = pixel_count * pixel_count * 2

ax.set_ylim(0, pixel_count * subpixel_height)
ax.set_aspect('equal')
ax.axis('off')

st.pyplot(fig)

# ===== 통계 정보 =====
col1, col2, col3 = st.columns(3)

with col1:
    st.metric("총 픽셀 수", f"{pixel_count * pixel_count:,}")

with col2:
    st.metric("총 서브픽셀 수", f"{total_subpixels:,}")

with col3:
    efficiency = (total_subpixels / (pixel_count * pixel_count * 3)) * 100
    st.metric("서브픽셀 효율", f"{efficiency:.1f}%")

# ===== PPI 계산기 =====
st.markdown("---")
st.subheader("🔢 PPI 계산기")

col_a, col_b, col_c = st.columns(3)

with col_a:
    width_pixels = st.number_input("가로 픽셀", min_value=100, max_value=10000, value=3120, step=10)

with col_b:
    height_pixels = st.number_input("세로 픽셀", min_value=100, max_value=10000, value=1440, step=10)

with col_c:
    diagonal_inches = st.number_input("대각선 (인치)", min_value=1.0, max_value=100.0, value=6.8, step=0.1)

# PPI 계산
diagonal_pixels = np.sqrt(width_pixels**2 + height_pixels**2)
ppi = diagonal_pixels / diagonal_inches

st.success(f"### 📊 PPI: **{ppi:.1f}**")

# PPI 평가
if ppi >= 300:
    st.info("✅ 300 PPI 이상: 스마트폰 수준 (30cm 거리에서 픽셀 안 보임)")
elif ppi >= 200:
    st.info("✅ 200-300 PPI: 태블릿 수준 (50cm 거리 최적)")
elif ppi >= 150:
    st.info("⚠️ 150-200 PPI: 노트북 수준 (70cm 거리 최적)")
elif ppi >= 100:
    st.info("⚠️ 100-150 PPI: 모니터 수준 (100cm 거리 최적)")
else:
    st.warning("❌ 100 PPI 미만: TV 수준 (200cm 이상 거리)")

# ===== 제품 비교 =====
st.markdown("---")
st.subheader("📱 주요 제품 PPI 비교")

products_data = {
    "제품": ["Galaxy S24 Ultra", "iPhone 15 Pro", "iPad Pro 12.9", "MacBook Pro 14", "32\" 4K 모니터"],
    "해상도": ["3120x1440", "2556x1179", "2732x2048", "3024x1964", "3840x2160"],
    "대각선": [6.8, 6.1, 12.9, 14.2, 32.0],
    "PPI": [505, 460, 264, 254, 138],
    "배치": ["PenTile", "RGB Stripe", "RGB Stripe", "RGB Stripe", "RGB Stripe"]
}

import pandas as pd
df = pd.DataFrame(products_data)
st.dataframe(df, use_container_width=True)
```

---

### Section 06: 정리 및 검증 (35~40분)

#### 완성 체크리스트

**Matplotlib 실습**:
- [ ] RGB Stripe 10x10 픽셀 그리드 생성 완료
- [ ] PenTile 10x10 픽셀 그리드 생성 완료
- [ ] 나란히 비교 이미지 (stripe_vs_pentile.png) 저장

**Streamlit 시뮬레이터**:
- [ ] `pixel_simulator.py` 파일 생성
- [ ] 슬라이더로 픽셀 개수 조정 기능 구현
- [ ] 배치 방식 선택 (RGB Stripe / PenTile)
- [ ] 실시간 렌더링 확인

**PPI 계산기**:
- [ ] 가로/세로 픽셀, 대각선 입력 기능
- [ ] PPI 자동 계산 및 표시
- [ ] PPI 평가 메시지 (스마트폰/태블릿/모니터 수준)
- [ ] 주요 제품 PPI 비교 테이블

---

#### 핵심 개념 정리

**픽셀 구조**:
```
1픽셀 = R (빨강) + G (초록) + B (파랑) 3개 서브픽셀
RGB Stripe: R-G-B 반복 (100% 서브픽셀)
PenTile: RG-BG 반복 (67% 서브픽셀, G 2배)
```

**PPI 계산**:
```
PPI = √(가로² + 세로²) / 대각선 인치
300 PPI 이상: 스마트폰 최적
150-200 PPI: 노트북 최적
100-150 PPI: 모니터 최적
```

**제조 방식 비교**:
```
RGB Stripe:
+ 텍스트 선명도 최고
+ 색 정확도 우수
- 제조 비용 높음
- OLED 수명 짧음

PenTile:
+ 제조 비용 절감
+ OLED 수명 향상
- 텍스트 선명도 중간
- 실효 해상도 감소
```

---

#### 다음 강의 예고: 14강 수율 시뮬레이터

**미리보기**:
> "13강에서 픽셀 구조를 시각화했습니다. 14강에서는 반도체/디스플레이/배터리/바이오 분야의 수율 시뮬레이터를 만듭니다. 공정 변수(온도, 압력, 시간)와 수율의 상관관계를 Plotly 3D 산점도로 시각화하고, Gemini API로 최적 조건을 추천받습니다."

**14강 핵심 기술**:
- **수율 정의**: 정상 제품 / 전체 생산량 × 100%
- **공정 변수**: 온도, 압력, 시간, 유량
- **Plotly 3D 산점도**: 온도 vs 압력 vs 수율
- **회귀 분석**: sklearn LinearRegression으로 최적 조건 탐색
- **Streamlit 슬라이더**: 변수 조정 → 예상 수율 실시간 표시

**14강 결과물**:
- `yield_simulator.py` (Streamlit 수율 시뮬레이터)
- 온도/압력 vs 수율 인터랙티브 차트
- 최적 조건 추천 기능

---

## 핵심 메시지

> "디스플레이는 수백만 개의 빨강/초록/파랑 점으로 이루어져 있습니다. RGB Stripe와 PenTile 배치 방식의 차이를 이해하면 제품 스펙을 정확히 평가할 수 있습니다. PPI 계산으로 화질을 정량화합니다."

---

## 결과물

1. **rgb_stripe_grid.png**: RGB Stripe 10x10 픽셀 이미지
2. **pentile_grid.png**: PenTile 10x10 픽셀 이미지
3. **stripe_vs_pentile.png**: 나란히 비교 이미지
4. **pixel_simulator.py**: Streamlit 인터랙티브 시뮬레이터
5. **ppi_calculator.py**: PPI 계산기 (단독 앱)

---

## 추가 학습 자료

- **디스플레이 기술 문서**:
  - Samsung Display 기술 백서
  - LG Display OLED 가이드
  - Apple Super Retina XDR 설명서

- **PPI 계산 도구**:
  - https://www.sven.de/dpi/ (온라인 PPI 계산기)
  - https://dpi.lv/ (디바이스 PPI 데이터베이스)

- **서브픽셀 렌더링**:
  - Microsoft ClearType 기술 문서
  - FreeType 서브픽셀 렌더링 가이드

---

작성 완료: 2026-05-16

**총 라인 수**: 약 1,100 라인
**타겟 시간**: 40분 강의 분량
**분야 균형**: 디스플레이 중심 + 반도체/배터리/바이오 공정 변수 연계 (14강 예고)
