# PART 3 — 데이터 시각화 앱 3종 (5~7강)

## 5강: Python Streamlit (30분)

### 오프닝 훅
> *"Streamlit은 2019년 출시 후 GitHub Star 38만 개 돌파.
> Python으로 웹앱을 '코드 거의 없이' 만들 수 있어서. AI 시대에 가장 어울리는 프레임워크."*

### 이론 (12분)
- Streamlit 소개 & 구조 (선형 실행 모델)
- 핵심 위젯: `st.slider`, `st.selectbox`, `st.file_uploader`, `st.plotly_chart`
- Streamlit Community Cloud 무료 배포 방법

### 실습 (18분)
- Claude Code로 앱 생성 (프롬프트 입력 → 전체 코드 생성)
- 실습 앱: **"디스플레이 픽셀 밀도(PPI) 계산기"**
  - 가로/세로 해상도 + 화면 크기(인치) 입력
  - PPI 자동 계산 + 시각화
  - 주요 스마트폰 제품과 비교
- Streamlit Cloud 배포까지 완료

---

## 6강: R Shiny (30분)

> ⚠️ **수강생 사전 준비 필수** (강의 전 주 공지):
> - R 설치: https://cran.r-project.org (무료)
> - RStudio 설치: https://posit.co/downloads (무료)
> - shinyapps.io 계정 생성: https://www.shinyapps.io (무료 플랜)
> - RStudio에서 패키지 설치: `install.packages(c("shiny", "shinydashboard", "ggplot2", "dplyr", "rsconnect"))`
>
> **미설치 시 6강 실습 불가** — 강의 당일 설치 시 15~20분 소요

### 오프닝 훅
> *"R은 통계학자들이 만든 언어. 데이터 분석에서는 Python보다 강력한 면이 있다.
> Shiny는 R로 웹앱을 만드는 마법 같은 라이브러리."*

### 이론 (12분)
- R Shiny 소개 (UI + Server 구조 개념)
- Streamlit vs Shiny 비교 — 언제 뭘 쓸까?
- shinyapps.io 무료 배포

### 실습 (18분)
- Claude Code로 Shiny 앱 생성
- 실습 앱: **"수율 트렌드 모니터링 대시보드"**
  - CSV 파일 업로드 → 자동 시각화
  - 날짜 범위 선택, 라인별 필터링
  - 이상 구간 자동 하이라이트 (95% 미만 경고 표시)
- shinyapps.io 배포

---

## 7강: Quarto (30분)

### 오프닝 훅
> *"PowerPoint 보고서는 수정이 지옥이다.
> Quarto는 코드 + 글 + 차트가 하나로 묶인 '살아있는 보고서'.
> AI가 코드를 바꾸면 차트가 자동으로 바뀐다."*

### 이론 (12분)
- Quarto란? R/Python 통합 문서 시스템
- 출력 형식: HTML 보고서, PDF, Slides(revealjs), 웹사이트
- Quarto vs Jupyter Notebook vs PPT 비교

### 실습 (18분)
- Claude Code로 Quarto 문서 생성
- 실습: **"디스플레이 공정 분석 보고서"**
  - 샘플 데이터 + ggplot2/plotly 차트 자동 생성
  - GitHub Pages에 HTML 보고서 배포
- Quarto Slides — 발표 자료도 코드 한 줄로 전환
