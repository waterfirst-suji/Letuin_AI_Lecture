# 📎 참고 자료 & 치트시트

## 핵심 명령어 카드

### Git 기본

```bash
git init                    # 새 저장소 초기화
git clone [URL]             # 원격 저장소 복사
git status                  # 현재 상태 확인
git add [파일명]             # 스테이징
git commit -m "메시지"      # 커밋
git push                    # 원격에 업로드
git pull                    # 원격에서 다운로드
git log --oneline           # 커밋 히스토리 간략히
```

### Claude Code 주요 명령

```bash
claude                      # Claude Code 시작
/help                       # 도움말
/commit                     # 커밋 자동 생성
/feature-dev [설명]         # 7단계 기능 개발
/review                     # 코드 리뷰
```

### Python 패키지 설치

```bash
pip install streamlit pandas plotly python-dotenv requests
pip install google-generativeai anthropic python-telegram-bot
pip freeze > requirements.txt    # 패키지 목록 저장
pip install -r requirements.txt  # 패키지 목록으로 설치
```

### Streamlit 실행

```bash
streamlit run app.py
streamlit run app.py --server.port 8502   # 포트 변경
```

### R Shiny 실행 (RStudio)

```r
library(shiny)
runApp("app.R")
# 또는 RStudio에서 Run App 버튼 클릭
```

---

## 프롬프트 템플릿

### 앱 생성 프롬프트

```
역할: 숙련된 Python/R 개발자
맥락: 디스플레이 산업 취업준비생을 위한 앱
작업: [구체적 앱 설명]
기술 스택: Streamlit + pandas + plotly (또는 원하는 스택)
출력형식: 바로 실행 가능한 완성 코드 + requirements.txt
제약: 외부 유료 API 사용 금지, 코드 주석 포함
```

### 데이터 분석 프롬프트

```
역할: 디스플레이 공정 데이터 분석 전문가
데이터: [데이터 설명 또는 샘플 붙여넣기]
분석 목적: [원하는 인사이트]
출력형식: Python 코드 + 차트 + 한 줄 해석
```

### 텔레그램 봇 프롬프트

```
역할: Python 텔레그램 봇 개발자
기능: [봇이 해야 할 일]
연동 API: [Gemini/Claude]
명령어: /start, /status, /help 포함
출력형식: 완성된 bot.py + .env 예시
```

---

## 유용한 링크 모음

### AI 도구
| 서비스 | URL | 용도 |
|--------|-----|------|
| Claude.ai | https://claude.ai | Claude Pro 사용 |
| Google AI Studio | https://aistudio.google.com | Gemini API |
| Google Antigravity | https://antigravity.google | AI 웹앱 플랫폼 |

### 배포 플랫폼
| 플랫폼 | URL | 무료 |
|--------|-----|------|
| GitHub Pages | https://pages.github.com | ✅ |
| Streamlit Cloud | https://share.streamlit.io | ✅ |
| shinyapps.io | https://www.shinyapps.io | ✅ (제한) |
| Netlify | https://netlify.com | ✅ |
| Vercel | https://vercel.com | ✅ |
| Render | https://render.com | ✅ |

### 강의 관련 GitHub 레포
| 레포 | 설명 |
|------|------|
| [waterfirst/cokacdir](https://github.com/waterfirst/cokacdir) | AI 터미널 파일 매니저 |
| [waterfirst/CLI-Anything](https://github.com/waterfirst/CLI-Anything) | 소프트웨어 → AI CLI 변환 |
| [waterfirst/gemini_telebot](https://github.com/waterfirst/gemini_telebot) | Gemini 텔레그램 봇 |

### 학습 자료
| 자료 | URL |
|------|-----|
| Git 공식 문서 (한국어) | https://git-scm.com/book/ko/v2 |
| 점프 투 파이썬 | https://wikidocs.net/book/1 |
| Streamlit 공식 문서 | https://docs.streamlit.io |
| R Shiny 공식 문서 | https://shiny.posit.co |
| Quarto 공식 문서 | https://quarto.org/docs |

---

## .gitignore 기본 템플릿

```gitignore
# API Keys & 환경변수
.env
.env.local
.env.*.local

# Python
__pycache__/
*.py[cod]
*.egg-info/
dist/
build/
.venv/
venv/

# R
.Rhistory
.RData
.Rproj.user/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Streamlit
.streamlit/secrets.toml
```

---

## 디스플레이 용어 빠른 참조

| 용어 | 설명 |
|------|------|
| TFT | Thin Film Transistor — 픽셀 전류 제어 스위치 |
| OLED | Organic Light-Emitting Diode — 자체 발광 |
| LCD | Liquid Crystal Display — 백라이트 필요 |
| PPI | Pixels Per Inch — 픽셀 밀도 |
| 수율(Yield) | 전체 생산량 대비 양품 비율 |
| 포토리소그래피 | UV로 회로 패턴을 기판에 전사하는 공정 |
| 드라이 에치 | 플라즈마로 박막 제거하는 건식 식각 |
| 잉크젯 공정 | 노즐로 유기 재료를 정확히 도포하는 공정 |
| DCI-P3 | 영화/전문 영상용 색 재현율 표준 |
| sRGB | 일반 웹/모니터 색 재현율 표준 |
