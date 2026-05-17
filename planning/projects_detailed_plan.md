# 프로젝트 1, 2, 3 상세 기획안

작성일: 2026-05-16

---

## 프로젝트 수행 철학

### 핵심 원칙
- **1~2일 소요**: 학습자가 집중해서 완성할 수 있는 적정 분량
- **초급/중급/고급** 3단계: 동일 주제, 다른 힌트 수준
- **Gemini 유료 버전 활용**: 수강생은 강의 기간 동안 Gemini 1.5 Pro 사용 가능
- **실무 맥락**: 단순 코딩 과제가 아니라, 디스플레이 업계 실무 문제 해결

### 난이도 구분 철학
| 구분 | 제공 자료 | 코드 스캐폴딩 | 힌트 수준 | 예상 소요 |
|------|----------|--------------|-----------|----------|
| **초급** | 템플릿 코드 50% + 상세 가이드 | 높음 | 매우 상세 | 1일 |
| **중급** | 요구사항 명세 + 구조 가이드 | 중간 | 핵심만 제공 | 1~2일 |
| **고급** | 문제 정의만 | 없음 | 없음 (자체 리서치) | 2일 |

---

## 프로젝트 1: 소개 웹페이지 (1~4강 이후)

### 프로젝트 개요
- **학습 범위**: 1~4강 (바이브 코딩 입문, AI 도구, 프롬프트, Claude Code)
- **주제**: HTML/CSS 포트폴리오 웹페이지
- **기간**: 1~2일
- **제출물**: GitHub Pages URL + 소스 코드

### 프로젝트 목표
1. **AI 협업 역량**: Claude Code를 활용한 자연어 개발 경험
2. **웹 기초 이해**: HTML/CSS 기본 구조 학습
3. **배포 경험**: GitHub Pages를 통한 첫 배포 성공
4. **자기 표현**: 디스플레이 관심 분야 정리 및 포트폴리오 시작

### 핵심 학습 포인트
- AI와 대화하며 코드 수정하는 방법
- Git 커밋과 GitHub Pages 배포 프로세스
- 반응형 웹 디자인의 기본 원칙

---

### 난이도별 상세 과제

#### 초급 (1일 소요)

**제공 자료**:
```
제공 파일:
├── template_index.html (HTML 구조 70% 완성)
├── template_style.css (기본 스타일 제공)
├── setup_guide.md (GitHub Pages 배포 단계별 가이드)
└── prompt_examples.txt (수정용 프롬프트 10개 예시)
```

**과제**:
1. **내용 수정**:
   - 템플릿의 [이름], [관심 직무] 부분을 자신의 정보로 변경
   - 관심 디스플레이 기술 TOP 3 카드 내용 작성
   - OLED vs LCD 비교 테이블 완성 (AI에게 데이터 요청 가능)

2. **스타일 커스터마이징**:
   - CSS에서 색상 변경 (3개 변수만 수정)
   - 폰트 크기 조정 (2개 클래스만 수정)

3. **배포**:
   - GitHub에 푸시
   - GitHub Pages 활성화
   - URL 접근 확인

**제공 프롬프트 예시**:
```
"내 HTML 파일에서 [이름] 부분을 '홍길동'으로, [관심 직무]를 'OLED 공정 엔지니어'로 바꿔줘"

"OLED와 LCD의 차이점을 3가지로 정리해서 테이블 형식으로 만들어줘. 항목은 발광 방식, 명암비, 가격대로 해줘"

"CSS 파일에서 메인 색상을 파란색에서 보라색으로 변경해줘"
```

**제출물**:
- GitHub Repository URL
- GitHub Pages 배포 URL
- 간단한 제출 메모 (선택: 어려웠던 점 1줄)

**평가 기준** (100점):
| 항목 | 배점 | 평가 기준 |
|------|------|----------|
| 배포 완료 | 40점 | GitHub Pages URL 접근 가능 |
| 내용 완성도 | 30점 | 자기소개 + 관심 분야 + 비교 테이블 완성 |
| 스타일 수정 | 20점 | 색상 또는 폰트 변경 확인 |
| Git 커밋 | 10점 | 최소 1회 이상 커밋 |

---

#### 중급 (1~2일 소요)

**제공 자료**:
```
제공 파일:
├── requirements.md (요구사항 명세서)
├── wireframe.png (레이아웃 스케치)
└── css_hints.md (Flexbox/Grid 가이드, 미디어 쿼리 예시)
```

**과제**:
1. **HTML/CSS 전체 작성**:
   - `index.html` 처음부터 작성 (Claude Code 활용)
   - Semantic HTML 사용 (header, main, section, footer)
   - 자기소개 + 관심 분야 + 실제 디스플레이 스펙 데이터 포함

2. **반응형 디자인**:
   - 모바일 (320px~768px) 레이아웃
   - 태블릿/PC (768px 이상) 레이아웃
   - 미디어 쿼리 최소 2개 이상

3. **인터랙티브 요소 1개 이상**:
   - 탭 전환 (예: 공정별 소개)
   - 아코디언 (접히는 FAQ)
   - 슬라이더 (이미지 또는 콘텐츠)
   - 호버 효과 (카드 확대 등)

4. **실제 데이터 활용**:
   - 주요 스마트폰 OLED 스펙 비교 (AI에게 질문)
   - 또는 디스플레이 공정 흐름도 (Array → Cell → Module)

5. **배포 및 문서화**:
   - GitHub Pages 배포
   - README.md 작성 (프로젝트 설명 + 스크린샷 1장)

**Claude Code 프롬프트 예시**:
```
"디스플레이 취업준비생 포트폴리오 웹페이지를 만들어줘.
구조는:
1. Header: 이름, 한 줄 소개
2. About: 관심 직무 (OLED 공정)
3. Skills: 디스플레이 기술 TOP 3 (카드 형태)
4. Data: Galaxy S24, iPhone 15, Pixel 9의 OLED 스펙 비교 테이블
5. Footer: GitHub, 이메일 링크

스타일은 모던하고 깔끔하게, 반응형으로 만들어줘. 외부 프레임워크 없이 순수 HTML/CSS/JS만 사용."
```

**제출물**:
- GitHub Repository URL (README.md 포함)
- GitHub Pages 배포 URL
- 스크린샷 1장 (PC 또는 모바일)

**평가 기준** (100점):
| 항목 | 배점 | 평가 기준 |
|------|------|----------|
| HTML 구조 | 20점 | Semantic HTML, 적절한 태그 사용 |
| CSS 스타일 | 25점 | 색상, 폰트, 레이아웃 조화 |
| 반응형 | 25점 | 모바일/PC 대응, 미디어 쿼리 |
| 인터랙티브 요소 | 15점 | 탭/아코디언/슬라이더 중 1개 이상 |
| 배포 및 README | 15점 | 정상 배포 + README 작성 |

---

#### 고급 (2일 소요)

**제공 자료**:
```
요구사항 명세서만 제공 (힌트 없음)
```

**과제**:
1. **GitHub Pages 배포 완료** (필수)

2. **인터랙티브 요소 3개 이상**:
   - 예: 탭 + 모달 + 차트

3. **실제 디스플레이 공정 데이터 포함**:
   - 포토공정 (노광, 현상, 에칭) 흐름도
   - 또는 잉크젯 공정 단계별 설명
   - 또는 실제 논문/특허에서 추출한 데이터

4. **Chart.js 또는 D3.js 시각화**:
   - 예: 디스플레이 시장 점유율 파이 차트
   - 예: 연도별 OLED/LCD 생산량 추이 그래프

5. **README.md 영문 작성**:
   - 프로젝트 개요
   - 기술 스택
   - 실행 방법
   - 스크린샷 2장 이상
   - (AI 활용 가능)

6. **커밋 히스토리 5개 이상**:
   - 작업 과정이 보이도록 단계별 커밋
   - 커밋 메시지 명확히 작성

**제출물**:
- GitHub Repository URL (영문 README)
- GitHub Pages 배포 URL
- 커밋 히스토리 스크린샷 (선택)

**평가 기준** (100점):
| 항목 | 배점 | 평가 기준 |
|------|------|----------|
| HTML/CSS 품질 | 20점 | Semantic HTML, 구조화된 CSS |
| 반응형 | 15점 | 모바일/태블릿/PC 완벽 대응 |
| 인터랙티브 요소 | 20점 | 3개 이상, 부드러운 동작 |
| 시각화 | 20점 | Chart.js/D3.js 차트 포함 |
| 공정 데이터 | 15점 | 실제 디스플레이 공정 데이터 활용 |
| 문서화 | 10점 | 영문 README + 커밋 히스토리 |

---

### 제출 가이드라인

**GitHub Repository 구조**:
```
project1_portfolio/
├── index.html
├── style.css (또는 styles/)
├── script.js (인터랙티브 요소가 있는 경우)
├── images/ (이미지 파일)
├── README.md
└── screenshots/ (스크린샷)
```

**README.md 필수 항목**:
```markdown
# 디스플레이 포트폴리오 웹페이지

## 프로젝트 개요
디스플레이 취업준비생을 위한 개인 소개 웹페이지

## 기술 스택
- HTML5, CSS3, JavaScript
- GitHub Pages

## 주요 기능
- 자기소개 섹션
- 디스플레이 기술 TOP 3 카드
- OLED vs LCD 비교 테이블
- 반응형 디자인

## 배포 URL
https://username.github.io/project1_portfolio

## 스크린샷
![메인 화면](screenshots/main.png)

## 개발 후기
- 어려웠던 점: CSS 레이아웃 정렬
- 배운 점: 미디어 쿼리 활용법
```

---

## 프로젝트 2: 공정 시뮬레이터 (5~10강 이후)

### 프로젝트 개요
- **학습 범위**: 5~10강 (웹 구축, 배포, 문서 자동화, 데이터 시각화, Streamlit)
- **주제**: Streamlit + Plotly 공정 데이터 시각화 대시보드
- **기간**: 1~2일
- **제출물**: Streamlit Cloud URL + GitHub 레포

### 프로젝트 목표
1. **데이터 시각화**: Plotly 인터랙티브 차트 구현
2. **앱 개발**: Streamlit으로 웹 UI 구현
3. **배포 경험**: Streamlit Cloud 배포
4. **데이터 분석**: CSV 데이터 필터링 및 통계 요약

### 핵심 학습 포인트
- Pandas로 CSV 데이터 처리
- Plotly로 인터랙티브 차트 생성
- Streamlit 위젯 활용 (슬라이더, 필터, 버튼)
- 클라우드 배포 프로세스

---

### 난이도별 상세 과제

#### 초급 (1일 소요)

**제공 자료**:
```
제공 파일:
├── app.py (템플릿 코드 70% 완성)
├── data/sample_yield.csv (50행 샘플 데이터)
├── requirements.txt
├── deployment_guide.md (Streamlit Cloud 배포 가이드)
└── code_hints.py (슬라이더, 필터링 예시 코드)
```

**과제**:
1. **슬라이더 추가**:
   - 수율 임계값 슬라이더 (80~100%)
   - 선택한 값 이상의 데이터만 필터링

2. **필터링 기능**:
   - 공정 단계 선택 (Photo, Etch, Depo 중)
   - 선택한 공정의 데이터만 표시

3. **기본 차트 표시**:
   - 템플릿에 이미 있는 선 그래프 활용
   - 슬라이더 값에 따라 차트 업데이트

4. **Streamlit Cloud 배포**:
   - GitHub에 푸시
   - Streamlit Cloud 연결
   - 배포 URL 확인

**템플릿 코드 예시 (app.py)**:
```python
import streamlit as st
import pandas as pd
import plotly.express as px

st.title("디스플레이 수율 모니터링 대시보드")

# 데이터 로드
df = pd.read_csv('data/sample_yield.csv')

# TODO: 슬라이더 추가 (수강생 작성)
# yield_threshold = st.slider("수율 임계값", 80, 100, 90)

# TODO: 필터링 (수강생 작성)
# filtered_df = df[df['yield'] >= yield_threshold]

# 차트 (이미 작성됨)
fig = px.line(df, x='date', y='yield', title='수율 추이')
st.plotly_chart(fig)

# TODO: 통계 요약 표시 (수강생 작성)
# st.metric("평균 수율", f"{df['yield'].mean():.1f}%")
```

**sample_yield.csv 구조**:
```csv
date,process,line,yield,temp
2026-01-01,Photo,Line1,94.5,75
2026-01-02,Photo,Line1,93.2,76
2026-01-03,Etch,Line2,91.8,78
...
```

**제출물**:
- GitHub Repository URL
- Streamlit Cloud URL
- 배포 확인 스크린샷 (선택)

**평가 기준** (100점):
| 항목 | 배점 | 평가 기준 |
|------|------|----------|
| 슬라이더 구현 | 25점 | 수율 임계값 조정 기능 |
| 필터링 기능 | 25점 | 공정 선택 필터 |
| 차트 표시 | 20점 | 기본 선 그래프 동작 |
| 배포 완료 | 20점 | Streamlit Cloud URL 접근 가능 |
| 코드 정리 | 10점 | 주석, requirements.txt |

---

#### 중급 (1~2일 소요)

**제공 자료**:
```
제공 파일:
├── requirements.md (요구사항 명세서)
├── data/process_data.csv (500행 실제형 데이터)
└── data_schema.md (데이터 컬럼 설명)
```

**과제**:
1. **차트 3종 이상**:
   - 선 그래프: 날짜별 수율 추이
   - 막대 그래프: 공정별 평균 수율
   - 산점도: 온도 vs 수율 (회귀선 포함)

2. **CSV 업로드 기능**:
   - `st.file_uploader()` 사용
   - 사용자가 직접 CSV 업로드 가능
   - 업로드 시 데이터 검증 (컬럼 확인)

3. **통계 요약**:
   - 평균 수율, 최고 수율, 최저 수율
   - `st.metric()` 또는 `st.columns()` 활용

4. **회귀선 추가**:
   - Plotly `trendline='ols'` 또는 sklearn LinearRegression
   - 온도와 수율의 상관관계 시각화

5. **배포 및 문서화**:
   - Streamlit Cloud 배포
   - README.md: 사용 방법, 스크린샷 2장

**process_data.csv 구조**:
```csv
date,process,line,lot_id,yield,temp,pressure,time
2026-01-01,Photo,Line1,LOT001,94.5,75,2.3,45
2026-01-01,Photo,Line1,LOT002,93.2,76,2.4,46
2026-01-01,Etch,Line2,LOT003,91.8,78,2.2,50
...
```

**요구사항 프롬프트 예시**:
```
"Streamlit 앱을 만들어줘. 기능은:
1. CSV 파일 업로드 (date, process, yield, temp 컬럼 포함)
2. 날짜별 수율 추이 선 그래프 (Plotly)
3. 공정별 평균 수율 막대 그래프
4. 온도 vs 수율 산점도 + 회귀선
5. 평균/최고/최저 수율 통계 표시 (st.metric)
6. 사이드바에 공정 필터 (Photo, Etch, Depo 선택)

스타일은 깔끔하게, 차트는 인터랙티브하게."
```

**제출물**:
- GitHub Repository URL (README.md 포함)
- Streamlit Cloud URL
- 스크린샷 2장 (차트 + 통계 요약)

**평가 기준** (100점):
| 항목 | 배점 | 평가 기준 |
|------|------|----------|
| 데이터 처리 | 20점 | CSV 읽기, 필터링, 요약 통계 |
| 시각화 | 30점 | Plotly 차트 3종 이상, 인터랙티브 |
| CSV 업로드 | 15점 | file_uploader 기능, 검증 |
| 회귀선 | 15점 | 온도 vs 수율 상관관계 시각화 |
| 배포 및 README | 15점 | 정상 배포 + README 작성 |
| 창의성 | 5점 | 추가 기능 (다운로드 버튼 등) |

---

#### 고급 (2일 소요)

**제공 자료**:
```
실무 시나리오만 제공 (힌트 없음)
+ 공개 데이터셋 링크
```

**과제**:
1. **디스플레이 실제 공정 데이터 기반**:
   - SECOM 데이터셋 (UCI) 활용 추천
   - 또는 논문/특허에서 추출한 데이터
   - 또는 AI로 생성한 현실적인 시뮬레이션 데이터

2. **AI API 연동**:
   - Gemini 또는 Claude API
   - 수율 하락 시 원인 분석 자동 생성
   - 예: "수율이 90% 미만입니다. 가능한 원인 3가지를 추출해주세요"

3. **고급 시각화**:
   - 3D 산점도 (온도, 압력, 수율)
   - 히트맵 (공정 단계별 수율 분포)
   - 박스플롯 (공정별 수율 분산)

4. **공정 최적화 제안**:
   - 최적 온도/압력 구간 계산
   - sklearn으로 회귀 분석
   - 예측 수율 표시

5. **보안 설정**:
   - `.env` 파일로 API Key 관리
   - `.gitignore`에 .env 추가
   - Streamlit secrets.toml 설정

6. **GitHub Actions CI/CD**:
   - 자동 테스트 (선택)
   - 또는 자동 배포 파이프라인

7. **다국어 지원**:
   - 한국어/영어 선택 (st.selectbox)

**제출물**:
- GitHub Repository URL (영문 README)
- Streamlit Cloud URL
- 2분 데모 영상 (기능 시연)
- Architecture 문서 (선택: 시스템 구조도)

**평가 기준** (100점):
| 항목 | 배점 | 평가 기준 |
|------|------|----------|
| 데이터 품질 | 20점 | 실제 공정 데이터 또는 현실적 시뮬레이션 |
| AI API 연동 | 20점 | 자동 분석 기능, 에러 처리 |
| 고급 시각화 | 20점 | 3D 차트, 히트맵, 박스플롯 중 2개 이상 |
| 최적화 제안 | 15점 | 회귀 분석, 예측 기능 |
| 보안 | 10점 | .env, .gitignore, secrets 설정 |
| CI/CD 또는 다국어 | 10점 | GitHub Actions 또는 i18n |
| 창의성 | 5점 | 독창적 기능 |

---

### 추천 공개 데이터셋

| 데이터셋 | URL | 설명 |
|---------|-----|------|
| SECOM (UCI) | https://archive.ics.uci.edu/dataset/179/secom | 반도체 공정 센서 데이터 + 수율 레이블 |
| Kaggle Manufacturing | https://www.kaggle.com/search?q=manufacturing | 제조업 수율 예측 데이터셋 다수 |
| IEEE DataPort | https://ieee-dataport.org | 실험 기반 센서 데이터 |

---

## 프로젝트 3: Gemini 통합 솔루션 (반도체/디스플레이/배터리/바이오) (11~17강 이후)

### 프로젝트 개요
- **학습 범위**: 11~17강 (API, 챗봇, 픽셀 시각화, 수율 시뮬레이터, 배포, 보안, 메시징)
- **주제**: Gemini Pro API + NotebookLM + Firebase + Telegram 통합 솔루션
- **기간**: 1~2일
- **제출물**: Firebase Hosting URL + GitHub 레포 + NotebookLM 링크 + 텔레그램 봇 토큰

### 프로젝트 목표
1. **Gemini 생태계 통합**: Gemini Pro API + NotebookLM 지식 베이스 + Firebase 배포
2. **분야별 실무 적용**: 반도체/디스플레이/배터리/바이오 중 선택하여 데이터 분석
3. **포트폴리오 완성**: 면접 시 제출 가능한 수준의 종합 프로젝트

### 핵심 학습 포인트
- Gemini Pro API 고급 활용 (구조화된 프롬프트)
- NotebookLM 논문 기반 지식 베이스 구축
- Firebase 통합 (Hosting + Firestore + Functions + Auth)
- 실시간 알림 및 자동화 시스템

---

### 핵심 요구사항 (모든 난이도 공통)

**필수 요소** (최소 5개 포함):
1. **Gemini Pro API 연동**: 분야별 데이터 분석 (반도체/디스플레이/배터리/바이오 중 선택)
2. **NotebookLM 지식 베이스**: 논문 업로드, 출처 기반 챗봇
3. **Firebase 배포**: Hosting + Firestore + Authentication
4. **API Key 보안**: .env + Firebase Functions 환경 변수
5. **Telegram 알림**: 조건부 자동 발송 (Gemini 분석 결과 포함)

**기술 스택 조합**:
- Firebase Hosting (UI) + Gemini Pro API (분석) + NotebookLM (지식 베이스)
- Firestore (데이터 저장) + Firebase Functions (백엔드) + Firebase Auth (인증)
- Telegram Bot API (알림) + Plotly/Matplotlib (시각화)

---

### 난이도별 상세 과제

#### 초급 (1일 소요)

**제공 자료**:
```
제공 파일:
├── index.html (Firebase 프로젝트 템플릿, HTML + CSS 50%)
├── gemini_sample.js (Gemini API 호출 샘플 코드)
├── telegram_bot.js (Telegram 봇 메시지 발송 코드)
├── data/sample_data.csv (100행)
├── .env.example (API Key 템플릿)
├── firebase.json (Firebase 설정 파일)
└── setup_guide.md (전체 설정 가이드)
```

**과제**:
1. **Gemini API 기본 호출**:
   - CSV 데이터를 Gemini에게 전달
   - 분야별 분석 요청 (예: "반도체 수율 하락 원인 3가지")
   - Firebase Hosting에 결과 표시

2. **NotebookLM 체험**:
   - 논문 1개 업로드
   - 질문 3개 입력 및 답변 캡처
   - 스크린샷 제출

3. **Firebase Hosting 배포**:
   - `firebase deploy` 실행
   - 배포 URL 제출

4. **Telegram 수동 메시지**:
   - 버튼 클릭 시 분석 결과 발송
   - 내용: "분석 완료: [Gemini 결과]"

**템플릿 코드 예시 (index.html)**:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Gemini 통합 솔루션</title>
  <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"></script>
</head>
<body>
  <div id="app">
    <h1>반도체 수율 분석</h1>
    <input type="file" id="csvInput" accept=".csv" />
    <button onclick="analyzeWithGemini()">Gemini 분석</button>
    <div id="result"></div>
    <button onclick="sendTelegram()">Telegram 알림</button>
  </div>

  <script>
    // TODO: Gemini API 호출 (수강생 작성)
    async function analyzeWithGemini() {
      const file = document.getElementById('csvInput').files[0];
      const text = await file.text();

      // Firebase Functions 호출
      const analyzeData = firebase.functions().httpsCallable('analyzeData');
      const result = await analyzeData({
        field: '반도체',
        csvData: text
      });

      document.getElementById('result').innerText = result.data.analysis;
    }

    // TODO: Telegram 메시지 발송 (수강생 작성)
    async function sendTelegram() {
      const message = document.getElementById('result').innerText;
      // Telegram Bot API 호출
    }
  </script>
</body>
</html>
```

**.env.example**:
```
GEMINI_API_KEY=your_gemini_api_key_here
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**제출물**:
- GitHub Repository URL
- Firebase Hosting URL
- NotebookLM 스크린샷 (질문/답변 3개)
- Telegram 봇 토큰

**평가 기준** (100점):
| 항목 | 배점 | 평가 기준 |
|------|------|----------|
| Gemini API 정상 연동 | 30점 | CSV 데이터 분석 및 응답 표시 |
| NotebookLM 체험 | 20점 | 논문 1개 + 질문 3개 스크린샷 |
| Firebase Hosting 배포 | 25점 | 배포 URL 접근 가능 |
| Telegram 수동 발송 | 15점 | 버튼 클릭 시 메시지 발송 |
| README 작성 | 10점 | 실행 방법 명시 |

---

#### 중급 (1~2일 소요)

**제공 자료**:
```
제공 파일:
├── requirements.md (요구사항 명세서)
├── data_schema.md (CSV 3종 스키마)
├── gemini_api_guide.md (Gemini API + Firebase 연동 가이드)
└── notebooklm_api_docs.md (NotebookLM API 문서 - 참고용)
```

**과제**:
1. **Gemini Pro 데이터 분석**:
   - CSV 업로드 기능 (Firebase Storage)
   - Gemini에게 "원인 분석 + 조치 후보 + 확인 질문" 요청
   - Firestore에 분석 결과 저장
   - 결과를 3개 섹션으로 구조화하여 표시

2. **NotebookLM 지식 베이스**:
   - 논문 5개 업로드 (PDF)
   - 사용자 질문 입력 → NotebookLM 답변 (iframe 또는 링크)
   - 채팅 기록 저장 (Firestore)

3. **분야별 시각화**:
   - **반도체**: 수율 vs 온도 산점도 (Plotly)
   - **디스플레이**: 픽셀 구조 시뮬레이터 (RGB/PenTile)
   - **배터리**: 충방전 사이클 그래프
   - **바이오**: 실험 데이터 히트맵

4. **조건부 Telegram 알림**:
   - 이상 감지 시 자동 발송
   - 내용: "⚠️ [분야] 이상 감지: [수치]\n원인: [Gemini 분석]"

5. **Firebase 통합**:
   - Hosting: 웹앱 배포
   - Firestore: 데이터 저장
   - Functions: Gemini API 호출 (보안)

**Firebase Functions 예시 (functions/index.js)**:
```javascript
const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(functions.config().gemini.api_key);

exports.analyzeData = functions.https.onCall(async (data, context) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = `
    분야: ${data.field}
    데이터: ${JSON.stringify(data.csvData)}
    질문: 이상 원인을 3가지 추출하고 조치 방법을 제안해주세요.
  `;

  const result = await model.generateContent(prompt);
  return { analysis: result.response.text() };
});
```

**제출물**:
- GitHub Repository URL (README 포함)
- Firebase Hosting URL
- NotebookLM 링크 (공유 설정)
- Telegram 봇 토큰 + Chat ID
- 시연 영상 (2분)

**평가 기준** (100점):
| 항목 | 배점 | 평가 기준 |
|------|------|----------|
| Gemini Pro 고급 활용 | 25점 | 구조화된 분석 + Firestore 저장 |
| NotebookLM 5개 논문 | 20점 | 논문 기반 챗봇 + 채팅 기록 |
| 분야별 시각화 | 20점 | 선택한 분야의 적절한 차트 |
| 조건부 Telegram 알림 | 20점 | 자동 발송 + Gemini 분석 포함 |
| Firebase 통합 | 10점 | Hosting + Firestore + Functions |
| 창의성 | 5점 | 추가 기능 |

---

#### 고급 (2일 소요)

**제공 자료**:
```
실무 시나리오만 제공 (문제 정의만)
+ 공개 데이터셋 링크
```

**과제**:
1. **통합 대시보드 (4탭)**:

   **탭 1: NotebookLM 챗봇**
   - 논문 10개 업로드 (PDF)
   - 질문 입력 → 출처 기반 답변
   - 오디오 팟캐스트 생성 (선택)
   - 채팅 기록 저장 (Firestore)

   **탭 2: Gemini Deep Research**
   - 복잡한 연구 질문 입력
   - Deep Research 모드로 웹 검색 + 분석
   - 최종 보고서 생성 (Markdown)

   **탭 3: 분야별 시뮬레이터**
   - **반도체**: 수율 최적화 (다변수 회귀)
   - **디스플레이**: RGB/PenTile 비교 시뮬레이터
   - **배터리**: 수명 예측 모델
   - **바이오**: 단백질 구조 시각화 (Py3Dmol)

   **탭 4: 실시간 모니터링**
   - CSV 자동 리로드 (Firestore onSnapshot)
   - 이상 감지 → Gemini 분석 → Telegram 알림
   - 알림 기록 표시

2. **Firebase Authentication**:
   - 이메일 로그인
   - 사용자별 데이터 분리

3. **Telegram 봇 명령어**:
   - `/start`: 봇 소개
   - `/report`: 현재 상태 요약 발송
   - `/alert on/off`: 알림 켜기/끄기
   - `/analyze [파일]`: 파일 업로드 → Gemini 분석

4. **다국어 지원**:
   - 한국어/영어 선택 (Firebase Firestore)

5. **커스텀 CSS + 테마**:
   - Google Material Design 3
   - 다크 모드 지원

**제출물**:
- GitHub Repository URL (영문 README + architecture.md)
- Firebase Hosting URL (커스텀 도메인 선택)
- NotebookLM 공유 링크
- Telegram 봇 토큰 + 시연 영상 (3분)
- 기술 문서 (API 설계, DB 스키마)

**평가 기준** (100점):
| 항목 | 배점 | 평가 기준 |
|------|------|----------|
| 통합 대시보드 4탭 | 35점 | NotebookLM, Deep Research, 시뮬레이터, 모니터링 |
| Firebase Auth | 10점 | 이메일 로그인 + 사용자별 분리 |
| Telegram 봇 명령어 | 15점 | 4개 명령어 모두 구현 |
| 다국어 지원 | 10점 | 한/영 전환 기능 |
| 커스텀 CSS | 10점 | Material Design 3 + 다크 모드 |
| 코드 품질 | 10점 | 구조화, 주석, 문서 |
| 창의성 | 10점 | 독창적 기능 |

---

### 실무 시나리오 (고급용)

#### 시나리오 1: 반도체 공정 AI 모니터링
**배경**: CVD 공정 엔지니어, 일일 수율 데이터 500개 Lot 분석

**요구사항**:
1. Gemini Pro로 수율 하락 원인 실시간 분석
2. NotebookLM에 공정 매뉴얼 10개 업로드 (PDF)
3. 수율 < 90% 시 Telegram 알림
4. Firebase Firestore에 일별 데이터 저장
5. 대시보드: 수율 추이, 원인 분석, 조치 이력

**데이터**: SECOM 데이터셋 (UCI Machine Learning Repository)

---

#### 시나리오 2: 디스플레이 불량 분류 시스템
**배경**: AOI 검사 엔지니어, 일일 이미지 1,000장 분류

**요구사항**:
1. Gemini Pro Vision으로 불량 이미지 분류
2. NotebookLM에 불량 기준서 5개 업로드
3. 불량률 > 5% 시 Telegram 알림
4. Firebase Storage에 이미지 저장
5. 대시보드: 불량 갤러리, 분류 통계, 리뷰 우선순위

---

#### 시나리오 3: 배터리 수명 예측 시스템
**배경**: 배터리 R&D 연구원, 충방전 사이클 데이터 분석

**요구사항**:
1. Gemini Pro로 용량 열화 원인 분석
2. NotebookLM에 논문 10개 업로드 (리튬이온 배터리)
3. 용량 < 80% 시 Telegram 알림
4. Firebase Firestore에 사이클 데이터 저장
5. 대시보드: 수명 예측 그래프, 열화 원인, 개선 제안

---

#### 시나리오 4: 바이오 실험 데이터 분석
**배경**: 분자생물학 대학원생, 실험 결과 통계 분석

**요구사항**:
1. Gemini Pro로 실험 결과 통계 분석 (t-test, ANOVA)
2. NotebookLM에 프로토콜 문서 8개 업로드
3. 유의미한 결과 발견 시 Telegram 알림
4. Firebase Firestore에 실험 기록 저장
5. 대시보드: 데이터 시각화, 통계 요약, 결론 자동 생성

---

### 샘플 코드 (중급 참고용)

#### Firebase Functions (Gemini API 호출)
```javascript
const functions = require('firebase-functions');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(functions.config().gemini.api_key);

exports.analyzeData = functions.https.onCall(async (data, context) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = `
    분야: ${data.field}
    데이터: ${JSON.stringify(data.csvData)}
    질문: 이상 원인을 3가지 추출하고 조치 방법을 제안해주세요.
  `;

  const result = await model.generateContent(prompt);
  return { analysis: result.response.text() };
});
```

#### index.html (Firebase Hosting)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Gemini 통합 솔루션</title>
  <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"></script>
</head>
<body>
  <div id="app">
    <h1>반도체 수율 분석</h1>
    <input type="file" id="csvInput" />
    <button onclick="analyze()">Gemini 분석</button>
    <div id="result"></div>
  </div>

  <script>
    async function analyze() {
      const file = document.getElementById('csvInput').files[0];
      const text = await file.text();

      const analyzeData = firebase.functions().httpsCallable('analyzeData');
      const result = await analyzeData({
        field: '반도체',
        csvData: text
      });

      document.getElementById('result').innerText = result.data.analysis;
    }
  </script>
</body>
</html>
```

---

## 제출 가이드라인 (모든 프로젝트 공통)

### GitHub Repository 구조
```
project_name/
├── app.py (또는 index.html)
├── requirements.txt (Python 프로젝트만)
├── .env.example (API Key 템플릿)
├── .gitignore (반드시 .env 포함)
├── README.md (실행 방법, 스크린샷)
├── data/ (CSV 파일)
├── docs/ (기술 문서)
└── screenshots/ (실행 화면 캡처)
```

### README.md 필수 항목
```markdown
# 프로젝트 제목

## 프로젝트 개요
한 줄 설명

## 기술 스택
- Python 3.11
- Streamlit 1.32.0
- Gemini API
- Telegram Bot API

## 실행 방법

### 1. 환경 설정
```bash
git clone https://github.com/username/project.git
cd project
pip install -r requirements.txt
```

### 2. API Key 설정
.env 파일 생성:
```
GEMINI_API_KEY=your_key_here
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### 3. 실행
```bash
streamlit run app.py
```

## 주요 기능
- 기능 1: 수율 데이터 분석
- 기능 2: AI 원인 분석
- 기능 3: 텔레그램 알림

## 스크린샷
![메인 화면](screenshots/main.png)
![차트 화면](screenshots/chart.png)

## 배포 URL
https://yourapp.streamlit.app

## 개발 후기
- **어려웠던 점**: API Key 보안 설정
- **배운 점**: Streamlit과 Gemini API 통합
- **개선할 점**: 실시간 데이터 업데이트 기능 추가
```

### .gitignore 필수 항목
```
# API Keys
.env
.env.local
secrets.toml

# Python
__pycache__/
*.pyc
*.pyo
*.pyd

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Data (대용량 파일은 제외)
*.csv
!data/sample*.csv
```

---

## 평가 일정 및 피드백

### 제출 기한
| 프로젝트 | 제출 기한 | 재제출 가능 |
|---------|----------|------------|
| 프로젝트 1 | 4강 후 1주일 | 1회 (1주일 추가) |
| 프로젝트 2 | 10강 후 1주일 | 1회 (1주일 추가) |
| 프로젝트 3 | 17강 후 2주일 | 1회 (1주일 추가) |

### 피드백 방식

**1. 자동 평가 (30%)**:
- URL 접근 가능 여부
- requirements.txt 존재 여부
- .env가 .gitignore에 포함되었는지
- README.md 필수 항목 포함 여부

**2. 강사 평가 (70%)**:
- 루브릭 기준 점수 부여
- 코드 리뷰 코멘트 (GitHub Issues 또는 PR)
- 개선 제안 및 모범 사례 공유

**3. 동료 평가 (선택, 보너스 5점)**:
- 다른 수강생 프로젝트 1개 리뷰
- GitHub Issues에 건설적 피드백 작성
- 참여 시 본인 점수에 +5점

### 재제출
- 기한 내 제출 시 **1회 재제출 가능** (1주일 추가)
- 피드백 반영 후 점수 갱신
- 재제출 점수는 최대 90점까지 (100점 불가)

### 우수 프로젝트
- 각 프로젝트별 상위 3개 선정
- 강의 마지막 시간(20강)에 발표 기회
- 우수 프로젝트는 공식 예시로 활용 (동의 시)

---

## 체크리스트

### 프로젝트 1 준비
- [ ] 초급/중급/고급 과제 명확히 구분
- [ ] HTML/CSS 템플릿 제공 (초급용)
- [ ] 와이어프레임 이미지 제공 (중급용)
- [ ] 평가 루브릭 작성
- [ ] 제출 가이드라인 명시
- [ ] GitHub Pages 배포 가이드 문서

### 프로젝트 2 준비
- [ ] 초급/중급/고급 과제 명확히 구분
- [ ] Streamlit 템플릿 제공 (초급용)
- [ ] 샘플 CSV 데이터 3종 준비
- [ ] 공개 데이터셋 링크 정리
- [ ] 평가 루브릭 작성
- [ ] Streamlit Cloud 배포 가이드

### 프로젝트 3 준비
- [ ] 초급/중급/고급 과제 명확히 구분
- [ ] Gemini + NotebookLM + Firebase 통합 확인
- [ ] 실무 시나리오 4개 (고급용) 작성
- [ ] Firebase Functions 샘플 코드 제공
- [ ] 평가 루브릭 작성
- [ ] Firebase 배포 가이드 포함
- [ ] NotebookLM 사용 가이드
- [ ] Telegram 봇 설정 가이드 포함
- [ ] API Key 보안 설정 가이드 (Firebase Functions)
- [ ] 분야별 샘플 데이터 CSV 제공

### 공통 준비
- [ ] .env.example 파일 템플릿
- [ ] .gitignore 템플릿
- [ ] README.md 템플릿
- [ ] 제출 양식 (Google Forms 또는 GitHub Issue Template)
- [ ] 평가 기준표 공유
- [ ] 우수 프로젝트 예시 (이전 기수 또는 샘플)

---

## 프로젝트 3 추가 가이드

### Firebase 프로젝트 구조 (중급/고급)
```
gemini-integrated-solution/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── functions/
│   ├── index.js (Gemini API 호출)
│   └── package.json
├── firestore.rules
├── firebase.json
├── .env.example
├── .gitignore
└── README.md
```

### Firebase Functions 환경 변수 설정
```bash
# Firebase CLI로 환경 변수 설정
firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY"
firebase functions:config:set telegram.bot_token="YOUR_BOT_TOKEN"
firebase functions:config:set telegram.chat_id="YOUR_CHAT_ID"

# 로컬 테스트용
firebase functions:config:get > .runtimeconfig.json
```

### NotebookLM 활용 가이드

**논문 선택 기준** (분야별):
- **반도체**: CVD 공정, 수율 최적화 논문
- **디스플레이**: OLED 제조, 픽셀 구조 논문
- **배터리**: 리튬이온 배터리 수명, 충방전 논문
- **바이오**: 실험 프로토콜, 통계 분석 논문

**NotebookLM 질문 예시**:
```
"CVD 공정에서 온도가 수율에 미치는 영향은?"
"OLED 번인 현상의 주요 원인은?"
"리튬이온 배터리 용량 열화 메커니즘은?"
"t-test와 ANOVA의 차이는?"
```

### Telegram 봇 명령어 구현 (고급용)

**commands.js**:
```javascript
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply('안녕하세요! Gemini 통합 모니터링 시스템입니다.');
});

bot.command('report', async (ctx) => {
  // Firestore에서 최신 데이터 조회
  const report = await generateReport();
  ctx.reply(report);
});

bot.command('alert', (ctx) => {
  const [_, action] = ctx.message.text.split(' ');
  if (action === 'on') {
    ctx.reply('알림이 활성화되었습니다.');
  } else if (action === 'off') {
    ctx.reply('알림이 비활성화되었습니다.');
  }
});

bot.launch();
```

---

## 완료 후 다음 단계

**Agent 4에게 전달**:
이 기획안을 colleague_repo 스타일의 웹 형식으로 구현
- 프로젝트 1, 2, 3 각각의 문제 페이지
- 난이도별 (초급/중급/고급) 탭 구성
- 제출 가이드라인 인터랙티브 체크리스트
- 평가 루브릭 시각화
- 샘플 코드 복사 버튼

---

**작성 완료**: 2026-05-16
