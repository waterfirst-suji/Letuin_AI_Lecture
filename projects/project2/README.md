# 🎯 프로젝트 2 — 디스플레이 공정 시뮬레이터 or 데이터 분석 앱

> **제출 시기**: 10강 후 1주일 이내
> **주요 도구**: Streamlit / R Shiny / Google Antigravity 중 선택

## 공통 주제

Python Streamlit, R Shiny, 또는 Google Antigravity 중 하나를 선택하여 디스플레이 산업과 관련된 인터랙티브 앱을 제작하고 배포하시오.

**주제 선택 예시** (자유 선택)
- OLED/LCD 비교 분석 도구
- 포토공정 노광 조건 시뮬레이터
- 잉크젯 도포 균일성 분석기
- RGB 색공간 변환기
- 수율 데이터 이상치 탐지기

---

## [하] 난이도 — 단계별 가이드 제공

### Step 1: 아이디어 구체화 (Claude에게 물어보기)

```
나는 [주제]에 대한 Streamlit 앱을 만들고 싶어.
필요한 데이터 구조, 주요 기능, 코드 전체를 작성해줘.
수준은 입문자가 이해할 수 있는 것으로.
사용 라이브러리는 streamlit, pandas, plotly만 써줘.
```

### Step 2: 파일 저장 및 로컬 실행 확인

```bash
# requirements.txt 생성 (Claude에게 요청)
pip install -r requirements.txt

# 로컬 실행 확인
streamlit run app.py
```

### Step 3: Streamlit Community Cloud 배포

1. GitHub에 push
2. [share.streamlit.io](https://share.streamlit.io) 접속 → New app
3. GitHub Repository 연결 → `app.py` 선택 → Deploy

**제출**: 배포 URL + GitHub Repository URL

---

## [중] 난이도 — 방향 제시

### 요구사항
- AI API(Gemini 또는 Claude) 연동 필수
- 사용자 입력에 따라 AI가 인사이트를 제공하는 기능 포함
- 실제 공개 데이터 사용 (AI에게 *"디스플레이 관련 공개 데이터셋 알려줘"* 질문)
- README.md에 앱 사용 방법 + 스크린샷 설명

### 힌트
- `.env` 파일로 API Key 관리: `GEMINI_API_KEY=your_key_here`
- `python-dotenv` 라이브러리로 로드: `from dotenv import load_dotenv`
- `.gitignore`에 `.env` 반드시 추가!

**제출**: 배포 URL + GitHub Repository URL

---

## [상] 난이도 — 요구사항만 (힌트 없음)

1. 디스플레이 실제 공정 데이터 기반 (논문, 특허, 공개 데이터셋)
2. AI API 연동으로 데이터 자동 해석 기능
3. 사용자 입력 → 공정 최적화 제안 기능
4. 모바일 반응형 UI
5. GitHub Actions로 자동 테스트/배포 파이프라인
6. 앱 내 한국어/영어 전환 기능

**제출**: 배포 URL + GitHub Repository URL + 기능 설명 영상 (2분 이내)

---

## 평가 기준

| 항목 | 하 | 중 | 상 |
|------|----|----|-----|
| 배포 완료 | 필수 | 필수 | 필수 |
| 인터랙티브 차트 | 1개 이상 | 2개 이상 | 3개 이상 |
| AI API 연동 | 없어도 됨 | 필수 | 필수 |
| 실제 데이터 | 샘플 데이터 OK | 공개 데이터 | 공정 데이터 |
| 코드 품질 | 동작만 하면 됨 | 구조화 권장 | CI/CD 필수 |
