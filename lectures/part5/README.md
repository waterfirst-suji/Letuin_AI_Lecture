# PART 5 — 배포 전략 & 보안 (11~12강)

## 11강: 배포 플랫폼 10종 총정리 (30분)

### 오프닝 훅
> *"앱을 만들었는데 내 컴퓨터에서만 돌아간다면 의미가 없다.
> 10개 플랫폼 비교하고, 상황에 맞는 선택을 배운다."*

### 이론 (20분)

| 플랫폼 | 적합한 앱 | 무료 | 난이도 |
|--------|----------|------|--------|
| GitHub Pages | HTML/정적 사이트 | ✅ 완전 무료 | ⭐ |
| Streamlit Cloud | Python 앱 | ✅ 무료 | ⭐ |
| shinyapps.io | R Shiny 앱 | ✅ 제한 무료 | ⭐ |
| Netlify | 정적 + 서버리스 | ✅ 무료 | ⭐⭐ |
| Vercel | Next.js/React | ✅ 무료 | ⭐⭐ |
| Firebase Hosting | 웹앱 + DB | ✅ 무료 | ⭐⭐ |
| Google Antigravity | AI 웹앱 | ✅ | ⭐⭐ |
| Render | 풀스택 앱 | ✅ 무료 | ⭐⭐ |
| Fly.io | 컨테이너 앱 | ✅ 제한 무료 | ⭐⭐⭐ |
| Google Cloud Run | 프로덕션급 | 💰 유료 | ⭐⭐⭐ |

**결정 가이드**
- HTML 파일 → GitHub Pages
- Python 앱 → Streamlit Cloud (가장 쉬움)
- R 앱 → shinyapps.io
- 빠른 배포 → Netlify/Vercel
- AI 웹앱 → Google Antigravity

### 실습 (10분)
- 프로젝트 1 결과물을 Netlify에도 배포해보기 (drag & drop)

---

## 12강: 환경 관리 & 보안 & GitHub Actions (30분)

### 오프닝 훅
> *"2023년 삼성전자 직원들이 ChatGPT에 사내 코드를 올렸다가 내부 데이터가 유출됐다.
> API Key를 GitHub에 올렸다가 하루 만에 요금 폭탄 맞은 개발자들.
> 이런 사고를 방지하는 법을 배운다."*

### 이론 (18분)

**환경변수 & API Key 관리**
```bash
# .env 파일 예시
GEMINI_API_KEY=AIza...
ANTHROPIC_API_KEY=sk-ant-...
TELEGRAM_BOT_TOKEN=123456:ABC...
```

```python
# Python에서 불러오기
from dotenv import load_dotenv
import os
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
```

**.gitignore 필수 설정**
```gitignore
.env
__pycache__/
.DS_Store
```

**GitHub Actions 기초**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Streamlit
on:
  push:
    branches: [main]
```

### 실습 (12분)
- `.env` 파일 설정 + `.gitignore` 적용 실습
- Claude Code로 GitHub Actions 워크플로우 생성
- GitHub Secrets 설정 — Actions에서 API Key 안전하게 사용
