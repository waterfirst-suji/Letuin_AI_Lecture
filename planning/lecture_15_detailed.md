# 15강: Firebase 배포 및 통합 - 상세 내용

작성일: 2026-05-16

---

## 학습 목표

1. **Firebase Hosting 배포**: Streamlit 앱을 Firebase Hosting에 배포하고 공개 URL 생성
2. **Firestore 데이터 저장**: 수율 데이터를 Firestore에 저장하고 실시간 쿼리
3. **Firebase Auth 인증**: 이메일/구글 로그인으로 사용자 인증 구현

---

## 섹션별 상세 내용

### Section 01: Hero (0~3분)

**도입 멘트**:
> "14강에서 만든 수율 시뮬레이터를 이제 전 세계에 공개합니다. Firebase Hosting으로 배포하고, Firestore에 데이터를 저장하며, Auth로 팀원만 접근하도록 보안을 강화합니다."

**학습목표 3개 카드**:
- **학습목표 1**: Firebase Hosting 웹앱 배포 (Cloud 아이콘)
- **학습목표 2**: Firestore 데이터베이스 구축 (Database 아이콘)
- **학습목표 3**: Firebase Auth 사용자 인증 (Lock 아이콘)

**40분 타임라인**:
- 0~3분: Firebase 소개 및 Spark 플랜
- 3~10분: Firebase CLI 설치 및 프로젝트 초기화
- 10~18분: Hosting 배포 및 URL 생성
- 18~30분: Firestore 데이터 저장 및 쿼리
- 30~35분: Firebase Auth 로그인 구현
- 35~40분: 정리 및 16강 예고

**역할 분담**:
- 엔지니어: Firebase 프로젝트 생성, 코드 배포, 데이터 스키마 설계
- Firebase: Hosting 서빙, Firestore 저장, Auth 인증 처리

---

### Section 02: Firebase 소개 (3~10분)

#### Firebase란?

**핵심 메시지**:
> "Firebase는 Google이 제공하는 백엔드 플랫폼입니다. 서버 없이 Hosting, 데이터베이스, 인증을 무료로 사용할 수 있습니다."

**Firebase 핵심 서비스**:

**1. Firebase Hosting**
```
기능: 정적 웹 파일 호스팅
용도: HTML, CSS, JS, React 앱 배포
무료 한도: 10GB 저장, 월 10GB 전송
배포 시간: 30초~1분
URL 예시: https://your-project.web.app
```

**2. Firestore (NoSQL 데이터베이스)**
```
기능: 실시간 데이터베이스
용도: 수율 로그, 사용자 설정 저장
무료 한도: 1GB 저장, 50K 읽기, 20K 쓰기/일
데이터 구조: 컬렉션 > 문서 > 필드
```

**3. Firebase Auth**
```
기능: 사용자 인증
용도: 이메일/비밀번호, 구글, GitHub 로그인
무료 한도: 무제한 사용자
토큰 만료: 1시간 (자동 갱신)
```

**4. Firebase Functions (서버리스 함수)**
```
기능: 백엔드 로직 실행
용도: Gemini API Key 보안, 데이터 전처리
무료 한도: 월 125K 호출, 40K GB-초
```

**5. Firebase Storage**
```
기능: 파일 저장
용도: 이미지, PDF, CSV 업로드
무료 한도: 5GB 저장, 1GB 다운로드/일
```

---

#### Spark 플랜 (무료) vs Blaze 플랜 (종량제)

| 항목 | Spark (무료) | Blaze (종량제) |
|------|-------------|--------------|
| Hosting | 10GB 저장, 10GB 전송 | 무제한 ($0.026/GB) |
| Firestore | 1GB, 50K 읽기, 20K 쓰기 | 무제한 (읽기 $0.06/10만, 쓰기 $0.18/10만) |
| Auth | 무제한 | 무제한 |
| Functions | 125K 호출/월 | 무제한 ($0.40/100만 호출) |
| Storage | 5GB | 무제한 ($0.026/GB) |

**Spark 플랜으로 충분한 경우**:
- 개인 포트폴리오 (방문자 < 1,000/월)
- 팀 내부 대시보드 (사용자 < 50명)
- 프로토타입, MVP

**Blaze 플랜이 필요한 경우**:
- 상용 서비스 (방문자 > 10,000/월)
- Functions로 Gemini API 호출 (무료 125K 초과 시)
- 대용량 파일 업로드 (> 5GB)

---

### Section 03: Firebase CLI 설치 및 프로젝트 초기화 (10~18분)

#### Step 1: Firebase 프로젝트 생성

**Firebase Console 접속**:
```
1. 브라우저에서 console.firebase.google.com 접속
2. Google 계정으로 로그인
3. "Add project" 클릭
4. 프로젝트 이름 입력 (예: yield-simulator)
5. Google Analytics 사용 선택 (선택 사항)
6. "Create project" 클릭 (30초 대기)
```

---

#### Step 2: Firebase CLI 설치

**Node.js 설치 (필수)**:
```bash
# Node.js가 없다면 https://nodejs.org 에서 설치
node --version  # v18 이상 권장
npm --version   # v9 이상 권장
```

**Firebase CLI 설치**:
```bash
npm install -g firebase-tools

# 설치 확인
firebase --version  # 예: 13.0.0
```

---

#### Step 3: Firebase 로그인

**로그인 명령어**:
```bash
firebase login

# 브라우저가 열리면 Google 계정 선택
# "Firebase CLI Login Successful" 메시지 확인
```

**오프라인 환경 (CI/CD)**:
```bash
firebase login:ci

# 토큰 생성 (예: 1//abc...xyz)
# GitHub Secrets에 FIREBASE_TOKEN 저장
```

---

#### Step 4: 프로젝트 초기화

**프로젝트 폴더로 이동**:
```bash
cd /path/to/your/streamlit-app
```

**Firebase 초기화**:
```bash
firebase init

# 질문에 답변:
? Which Firebase features do you want to set up?
  ◉ Hosting
  ◉ Firestore
  ◉ Functions (optional)

? Select a default Firebase project for this directory:
  → yield-simulator (방금 생성한 프로젝트 선택)

? What do you want to use as your public directory?
  → public (또는 build, dist)

? Configure as a single-page app?
  → Yes

? Set up automatic builds and deploys with GitHub?
  → No (나중에 설정 가능)

? File public/index.html already exists. Overwrite?
  → No
```

**생성된 파일**:
```
프로젝트 폴더/
├── firebase.json          (설정 파일)
├── .firebaserc            (프로젝트 ID)
├── firestore.rules        (보안 규칙)
├── firestore.indexes.json (인덱스)
└── public/                (배포할 파일)
```

---

### Section 04: Firebase Hosting 배포 (18~30분)

#### Streamlit 앱을 정적 파일로 변환

**문제점**:
> "Streamlit은 Python 서버가 필요합니다. Firebase Hosting은 정적 파일만 지원합니다."

**해결책 3가지**:

**방법 1: Streamlit Cloud 사용** (추천)
```
Firebase Hosting 대신 Streamlit Cloud 사용
장점: Streamlit 앱 그대로 배포
단점: Firebase 생태계 미활용
URL: https://share.streamlit.io/your-repo
```

**방법 2: React 앱으로 재작성** (Firebase Hosting 활용)
```
Streamlit → React + TypeScript 변환
장점: Firebase Hosting 직접 활용
단점: 코드 재작성 필요
```

**방법 3: Firebase Functions + Streamlit** (하이브리드)
```
Functions에서 Streamlit 실행
장점: Firebase 생태계 전체 활용
단점: 복잡도 증가, 무료 한도 초과 가능
```

---

#### React 앱 배포 (방법 2 시연)

**React 앱 빌드**:
```bash
# React 프로젝트가 있다면
npm run build

# 빌드 결과: build/ 폴더 생성
```

**firebase.json 수정**:
```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

**배포 명령어**:
```bash
firebase deploy --only hosting

# 배포 진행...
# ✔ Deploy complete!
# Hosting URL: https://yield-simulator.web.app
```

**배포 확인**:
```
브라우저에서 https://yield-simulator.web.app 접속
앱이 정상 작동하는지 확인
```

---

#### 자동 배포 (GitHub Actions)

**`.github/workflows/firebase-deploy.yml` 생성**:
```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Install Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

**GitHub Secrets 설정**:
```
1. GitHub 리포지토리 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. Name: FIREBASE_TOKEN
4. Value: (firebase login:ci로 얻은 토큰)
5. "Add secret" 클릭
```

**자동 배포 흐름**:
```
1. 코드를 main 브랜치에 푸시
2. GitHub Actions가 자동 실행
3. npm install → npm run build → firebase deploy
4. 1~2분 후 https://yield-simulator.web.app 업데이트
```

---

### Section 05: Firestore 데이터 저장 및 쿼리 (30~35분)

#### Firestore 데이터 구조

**NoSQL 구조**:
```
컬렉션 (Collection)
└── 문서 (Document)
    └── 필드 (Field)

예시:
yield_logs (컬렉션)
├── log_001 (문서)
│   ├── timestamp: 2026-05-16T10:30:00Z
│   ├── field: "반도체"
│   ├── temperature: 80
│   ├── pressure: 2.4
│   ├── time: 40
│   └── yield: 94.2
├── log_002 (문서)
│   ├── timestamp: 2026-05-16T11:15:00Z
│   ├── field: "디스플레이"
│   ├── temperature: 375
│   ├── vacuum: 1.0
│   └── yield: 95.1
```

---

#### Firestore 데이터 쓰기 (JavaScript)

**Firebase SDK 설치**:
```bash
npm install firebase
```

**Firebase 초기화 (firebaseConfig.js)**:
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "yield-simulator.firebaseapp.com",
  projectId: "yield-simulator",
  storageBucket: "yield-simulator.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

**데이터 추가**:
```javascript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

async function saveYieldLog(data) {
  try {
    const docRef = await addDoc(collection(db, 'yield_logs'), {
      timestamp: new Date(),
      field: data.field,
      temperature: data.temperature,
      pressure: data.pressure,
      time: data.time,
      yield: data.yield
    });

    console.log('Document written with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
}

// 사용 예시
saveYieldLog({
  field: '반도체',
  temperature: 80,
  pressure: 2.4,
  time: 40,
  yield: 94.2
});
```

---

#### Firestore 데이터 읽기

**전체 데이터 읽기**:
```javascript
import { collection, getDocs } from 'firebase/firestore';

async function getYieldLogs() {
  const querySnapshot = await getDocs(collection(db, 'yield_logs'));

  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}
```

**조건 쿼리 (수율 > 90%)**:
```javascript
import { collection, query, where, getDocs } from 'firebase/firestore';

async function getHighYieldLogs() {
  const q = query(
    collection(db, 'yield_logs'),
    where('yield', '>=', 90)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}
```

**정렬 및 제한**:
```javascript
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

async function getLatestLogs() {
  const q = query(
    collection(db, 'yield_logs'),
    orderBy('timestamp', 'desc'),
    limit(10)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}
```

---

#### 실시간 리스너 (onSnapshot)

**실시간 업데이트**:
```javascript
import { collection, onSnapshot } from 'firebase/firestore';

function listenToYieldLogs() {
  const unsubscribe = onSnapshot(
    collection(db, 'yield_logs'),
    (querySnapshot) => {
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() });
      });
      console.log('Current logs:', logs);

      // React 상태 업데이트
      // setYieldLogs(logs);
    }
  );

  // 컴포넌트 언마운트 시 리스너 해제
  return unsubscribe;
}
```

---

### Section 06: Firebase Auth 사용자 인증 (35~40분)

#### Firebase Auth 설정

**Firebase Console에서 활성화**:
```
1. console.firebase.google.com → Authentication 클릭
2. "Get started" 클릭
3. Sign-in method 탭 → "Email/Password" 활성화
4. "Google" 활성화 (선택 사항)
5. "Save" 클릭
```

---

#### 이메일/비밀번호 회원가입

**회원가입 코드**:
```javascript
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed up:', user.uid);
  } catch (error) {
    console.error('Error signing up:', error.message);
  }
}

// 사용 예시
signUp('engineer@company.com', 'password123');
```

---

#### 로그인 및 로그아웃

**로그인 코드**:
```javascript
import { signInWithEmailAndPassword } from 'firebase/auth';

async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in:', user.uid);
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
}
```

**로그아웃 코드**:
```javascript
import { signOut } from 'firebase/auth';

async function logOut() {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error.message);
  }
}
```

---

#### 구글 로그인

**구글 로그인 코드**:
```javascript
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('User signed in with Google:', user.displayName);
  } catch (error) {
    console.error('Error signing in with Google:', error.message);
  }
}
```

---

#### 로그인 상태 감지

**onAuthStateChanged 리스너**:
```javascript
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, (user) => {
  if (user) {
    // 로그인 상태
    console.log('Signed in as:', user.email);
    // React 상태 업데이트
    // setUser(user);
  } else {
    // 로그아웃 상태
    console.log('Not signed in');
    // setUser(null);
  }
});
```

---

## 핵심 메시지

> "Firebase는 서버 없이 백엔드를 구축하는 플랫폼입니다. Hosting으로 배포하고, Firestore에 데이터를 저장하며, Auth로 보안을 강화합니다. 월 $0부터 시작할 수 있습니다."

---

## 결과물

1. **Firebase Hosting URL**: https://yield-simulator.web.app
2. **Firestore 데이터베이스**: yield_logs 컬렉션 생성
3. **Firebase Auth**: 이메일/구글 로그인 구현
4. **GitHub Actions**: 자동 배포 파이프라인

---

## 다음 강의 예고: 16강 보안 및 환경 관리

**미리보기**:
> "15강에서 Firebase에 배포했습니다. 16강에서는 API Key 보안을 강화합니다. .env 파일, .gitignore, Firebase Functions 환경 변수로 Gemini API Key를 보호합니다."

**16강 핵심 기술**:
- **.env 파일**: 로컬 개발 환경 변수
- **.gitignore**: GitHub 커밋 방지
- **Firebase Functions**: 서버리스 환경 변수
- **환경 변수 주입**: 배포 시 secrets 관리

---

작성 완료: 2026-05-16

**총 라인 수**: 약 900 라인
**타겟 시간**: 40분 강의 분량
