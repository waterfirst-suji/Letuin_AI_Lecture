"""
5강 실습: 디스플레이 픽셀 밀도(PPI) 계산기
Streamlit 앱 — 바로 실행 가능한 완성 코드

실행 방법:
    pip install -r requirements.txt
    streamlit run app.py
"""

import math
import streamlit as st
import pandas as pd
import plotly.graph_objects as go

# ------- 주요 기기 비교 데이터 -------
DEVICES = {
    "iPhone 15 Pro": {"width": 2556, "height": 1179, "size": 6.1},
    "Samsung Galaxy S24": {"width": 2340, "height": 1080, "size": 6.2},
    "iPad Pro 12.9": {"width": 2732, "height": 2048, "size": 12.9},
    "MacBook Pro 14": {"width": 3024, "height": 1964, "size": 14.2},
    "4K TV 55\"": {"width": 3840, "height": 2160, "size": 55.0},
}


def calc_ppi(width_px: int, height_px: int, size_inch: float) -> float:
    diagonal_px = math.sqrt(width_px**2 + height_px**2)
    return diagonal_px / size_inch


# ------- UI -------
st.set_page_config(page_title="PPI 계산기", page_icon="📱", layout="centered")
st.title("📱 디스플레이 PPI 계산기")
st.caption("Pixel Per Inch — 화면 선명도를 수치로 확인하세요")

st.subheader("내 기기 계산")
col1, col2, col3 = st.columns(3)
with col1:
    w = st.number_input("가로 해상도 (px)", min_value=1, value=2556, step=1)
with col2:
    h = st.number_input("세로 해상도 (px)", min_value=1, value=1179, step=1)
with col3:
    s = st.number_input("화면 크기 (인치)", min_value=0.1, value=6.1, step=0.1)

ppi = calc_ppi(w, h, s)

if ppi >= 400:
    level = "🔬 초고해상도 (Retina 이상)"
elif ppi >= 300:
    level = "✅ 고해상도 (Retina급)"
elif ppi >= 200:
    level = "👍 일반 고화질"
else:
    level = "📺 저해상도 (대형 TV 등 일반)"

st.metric("계산된 PPI", f"{ppi:.1f} PPI", level)

# ------- 기기 비교 차트 -------
st.subheader("주요 기기와 비교")

comparison = {name: calc_ppi(d["width"], d["height"], d["size"]) for name, d in DEVICES.items()}
comparison["내 기기"] = ppi

df = pd.DataFrame(comparison.items(), columns=["기기", "PPI"])
df = df.sort_values("PPI", ascending=True)

colors = ["#FF4B4B" if g == "내 기기" else "#636EFA" for g in df["기기"]]

fig = go.Figure(go.Bar(
    x=df["PPI"], y=df["기기"],
    orientation="h",
    marker_color=colors,
    text=df["PPI"].round(0).astype(int),
    textposition="outside",
))
fig.update_layout(xaxis_title="PPI", height=350, margin=dict(l=0, r=40, t=10, b=10))
st.plotly_chart(fig, use_container_width=True)

st.info("PPI가 높을수록 같은 크기에서 더 세밀한 화면을 표시합니다.")
