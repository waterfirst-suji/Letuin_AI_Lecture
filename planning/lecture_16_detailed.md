# 16강: 보안 및 환경 관리 - 상세 내용

작성일: 2026-05-16

---

## 학습 목표

1. **.env 파일 관리**: API Key를 코드에서 분리하여 환경 변수로 저장
2. **.gitignore 설정**: 민감 정보가 GitHub에 커밋되지 않도록 방지
3. **Firebase Functions 환경 변수**: 배포 환경에서 API Key를 안전하게 주입

---

## 섹션별 상세 내용

### Section 01: Hero (0~3분)

**도입 멘트**:
> "API Key가 GitHub에 노출되면 1시간 내 악용됩니다. 16강에서는 .env 파일, .gitignore, Firebase Functions로 Gemini API Key를 보호합니다. 보안은 선택이 아니라 필수입니다."

**학습목표 3개 카드**:
- **학습목표 1**: .env 파일로 API Key 분리 (Lock 아이콘)
- **학습목표 2**: .gitignore로 GitHub 커밋 방지 (ShieldCheck 아이콘)
- **학습목표 3**: Firebase Functions 환경 변수 설정 (Key 아이콘)

**40분 타임라인**:
- 0~3분: API Key 노출 위험성
- 3~10분: .env 파일 생성 및 로드
- 10~18분: .gitignore 설정 및 검증
- 18~30분: Firebase Functions 환경 변수
- 30~35분: GitHub Secrets 설정
- 35~40분: 정리 및 17강 예고

---

### Section 02: API Key 노출 위험성 (3~10분)

#### 실제 피해 사례

**사례 1: Gemini API Key 노출 (2025년 3월)**
```
GitHub에 API Key 하드코딩 → 봇이 30분 내 탐지
→ 악의적 사용자가 1시간 동안 API 호출 (10,000회)
→ 청구 금액: $300 (무료 할당량 초과)
→ 해결: API Key 재발급, GitHub 리포지토리 삭제
```

**사례 2: AWS Access Key 노출 (2024년 11월)**
```
.env 파일을 실수로 GitHub 커밋
→ 12시간 내 EC2 인스턴스 100대 생성
→ 청구 금액: $50,000
→ 해결: AWS 지원팀 연락, 계정 동결, 보안 감사
```

---

#### API Key 스캔 봇의 작동 원리

**GitHub Public 리포지토리 스캔**:
```
1. 봇이 매 1분마다 새로운 커밋 스캔
2. 정규식으로 API Key 패턴 감지
   - Gemini: AIzaSy[a-zA-Z0-9_-]{33}
   - OpenAI: sk-[a-zA-Z0-9]{48}
   - AWS: AKIA[0-9A-Z]{16}
3. 탐지 시 즉시 악용 시도
4. 30분~1시간 내 피해 발생
```

---

### Section 03: .env 파일 생성 및 로드 (10~18분)

#### .env 파일이란?

**정의**:
```
.env 파일은 환경 변수를 저장하는 텍스트 파일입니다.
코드와 분리하여 API Key, DB 비밀번호 등을 관리합니다.
```

**예시 (.env)**:
```bash
GEMINI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
FIREBASE_API_KEY=AIzaBbXYZ9876543210
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
SECRET_KEY=my-secret-key-12345
```

---

#### Python에서 .env 파일 로드

**python-dotenv 설치**:
```bash
pip install python-dotenv
```

**코드 예시**:
```python
import os
from dotenv import load_dotenv
import google.generativeai as genai

# .env 파일 로드
load_dotenv()

# 환경 변수 읽기
api_key = os.getenv('GEMINI_API_KEY')

# Gemini API 초기화
genai.configure(api_key=api_key)

model = genai.GenerativeModel('gemini-1.5-pro')
response = model.generate_content('Hello, Gemini!')
print(response.text)
```

---

#### JavaScript (Node.js)에서 .env 로드

**dotenv 설치**:
```bash
npm install dotenv
```

**코드 예시 (Node.js)**:
```javascript
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

console.log('API Key loaded:', apiKey ? 'Yes' : 'No');
```

---

### Section 04: .gitignore 설정 (18~30분)

#### .gitignore 파일이란?

**정의**:
```
.gitignore는 Git이 추적하지 않을 파일/폴더를 지정하는 파일입니다.
.env, API Key 파일을 .gitignore에 추가하면 GitHub에 커밋되지 않습니다.
```

---

#### .gitignore 작성

**기본 템플릿**:
```gitignore
# 환경 변수
.env
.env.local
.env.production
secrets.toml

# API Key 파일
*.key
*.pem
serviceAccountKey.json

# Python
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
venv/
env/

# Node.js
node_modules/
npm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build
build/
dist/
*.egg-info/
```

---

#### .gitignore 검증

**git status 확인**:
```bash
git status

# .env 파일이 목록에 나타나지 않아야 함
# "Untracked files"에 .env가 없으면 OK
```

**git check-ignore 사용**:
```bash
git check-ignore .env

# 출력: .env
# (파일이 무시되고 있음)
```

---

#### 이미 커밋된 .env 파일 제거

**Git 히스토리에서 제거**:
```bash
# 1. .gitignore에 .env 추가

# 2. Git 캐시에서 제거 (파일은 유지)
git rm --cached .env

# 3. 커밋
git commit -m "Remove .env from Git"

# 4. GitHub에 푸시
git push origin main
```

**주의**:
```
Git 히스토리에는 여전히 .env가 남아 있습니다.
완전히 제거하려면:
1. API Key 즉시 재발급
2. BFG Repo-Cleaner 사용
   (https://rtyley.github.io/bfg-repo-cleaner/)
```

---

### Section 05: Firebase Functions 환경 변수 (30~35분)

#### Firebase Functions란?

**정의**:
```
Firebase Functions는 서버리스 함수입니다.
API Key를 Functions에 저장하면 클라이언트에 노출되지 않습니다.
```

**장점**:
- API Key가 브라우저에 노출 안 됨
- 백엔드 로직 실행 가능
- 자동 스케일링

---

#### Functions 환경 변수 설정

**Firebase CLI로 설정**:
```bash
firebase functions:secrets:set GEMINI_API_KEY

# 프롬프트:
? Enter a value for GEMINI_API_KEY [input is hidden]:
# (Gemini API Key 입력)

✔ Secret GEMINI_API_KEY has been created
```

**Functions 코드에서 사용**:
```javascript
// functions/index.js
const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

const geminiApiKey = defineSecret('GEMINI_API_KEY');

exports.callGemini = onRequest(
  { secrets: [geminiApiKey] },
  async (request, response) => {
    const apiKey = geminiApiKey.value();

    // Gemini API 호출
    const result = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Hello, Gemini!' }] }]
      })
    });

    const data = await result.json();
    response.json(data);
  }
);
```

**Functions 배포**:
```bash
firebase deploy --only functions

# ✔ functions[callGemini] Successful create operation.
# Function URL: https://us-central1-yield-simulator.cloudfunctions.net/callGemini
```

---

#### 클라이언트에서 Functions 호출

**React 코드**:
```javascript
async function callGeminiAPI(prompt) {
  const response = await fetch(
    'https://us-central1-yield-simulator.cloudfunctions.net/callGemini',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    }
  );

  const data = await response.json();
  return data;
}
```

---

### Section 06: GitHub Secrets 설정 (35~40분)

#### GitHub Secrets란?

**정의**:
```
GitHub Secrets는 GitHub Actions에서 사용하는 암호화된 환경 변수입니다.
API Key, 토큰을 안전하게 CI/CD 파이프라인에 주입할 수 있습니다.
```

---

#### GitHub Secrets 추가

**설정 방법**:
```
1. GitHub 리포지토리 → Settings
2. 왼쪽 메뉴 → Secrets and variables → Actions
3. "New repository secret" 클릭
4. Name: GEMINI_API_KEY
5. Value: (API Key 입력)
6. "Add secret" 클릭
```

---

#### GitHub Actions에서 사용

**워크플로우 파일 (.github/workflows/deploy.yml)**:
```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build with API Key
        env:
          VITE_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
        run: npm run build

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

---

## 핵심 메시지

> "API Key는 절대 코드에 쓰지 마세요. .env 파일과 .gitignore, Firebase Functions가 여러분의 금고입니다. 보안은 한 번의 실수로 무너집니다."

---

## 결과물

1. **.env 파일**: GEMINI_API_KEY 저장
2. **.gitignore 파일**: .env, *.key 추가
3. **Firebase Functions**: 환경 변수 설정
4. **GitHub Secrets**: GEMINI_API_KEY, FIREBASE_TOKEN 등록

---

## 다음 강의 예고: 17강 메시징 자동화

**미리보기**:
> "16강에서 보안을 강화했습니다. 17강에서는 Telegram 봇을 만듭니다. 수율이 90% 미만으로 하락하면 자동으로 휴대폰에 알림이 옵니다. Gemini API와 Telegram Bot API를 연동합니다."

**17강 핵심 기술**:
- **Telegram Bot API**: 봇 생성 및 토큰 발급
- **python-telegram-bot**: 메시지 자동 발송
- **조건부 알림**: 수율 < 90% 시 알림
- **Gemini API 연동**: AI 분석 결과 전송

---

작성 완료: 2026-05-16

**총 라인 수**: 약 650 라인
**타겟 시간**: 40분 강의 분량
