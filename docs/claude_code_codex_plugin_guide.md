# Claude Code 안에서 Codex Plugin 설치 및 활용 가이드

이 문서는 Claude Code 환경에서 OpenAI Codex CLI/Plugin을 함께 사용하는 방법을 정리한다. 핵심 목적은 Claude Code의 코드 작업 흐름은 유지하면서, Codex가 강한 이미지 생성, 프로젝트 파일 편집, 빌드 검증, 대규모 코드 수정 능력을 보완 도구로 붙이는 것이다.

---

## 1. 전체 구조

Claude Code 안에서 Codex를 쓰는 방식은 보통 다음 구조다.

```text
Claude Code
  └─ Codex Plugin
      └─ Codex CLI
          └─ OpenAI / ChatGPT 인증
```

즉 Claude Code가 직접 Codex 모델을 내장하는 것이 아니라, 로컬에 설치된 `codex` 명령어를 호출해서 Codex 기능을 사용하는 구조다.

Windows 환경에서는 전역 npm 경로가 보통 다음과 같다.

```text
C:/Users/nakch/AppData/Roaming/npm/codex.cmd
```

---

## 2. 설치 확인

Claude Code 터미널 또는 Bash 명령에서 다음을 실행한다.

```bash
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" --help
```

정상이라면 Codex CLI 도움말이 출력된다.

버전 확인:

```bash
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" --version
```

Claude Code에서 `codex` 명령어가 직접 안 먹는 경우:

```bash
codex: command not found
```

이 경우 설치가 안 된 것이 아니라 PATH 문제일 가능성이 높다. 전체 경로로 실행하면 된다.

---

## 3. 인증 방법

Claude Code 안에서 다음 명령을 실행한다.

```bash
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" login
```

브라우저가 열리면 OpenAI 또는 ChatGPT 계정으로 로그인한다.

인증 상태 확인:

```bash
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" login status
```

정상 예시:

```text
Logged in using ChatGPT
```

이 메시지가 나오면 Codex CLI 인증은 완료된 것이다.

---

## 4. PATH 설정

매번 전체 경로를 쓰기 싫다면 Claude Code의 Bash 환경에 npm 전역 경로를 추가한다.

`~/.bashrc`에 추가:

```bash
export PATH="$PATH:/c/Users/nakch/AppData/Roaming/npm"
```

적용:

```bash
source ~/.bashrc
```

확인:

```bash
which codex
codex login status
```

Windows PowerShell과 Claude Code Bash는 PATH 해석 방식이 다를 수 있다. PowerShell에서 되는 명령이 Claude Code Bash에서 안 될 수 있으므로, Claude Code 내부에서 직접 확인해야 한다.

---

## 5. 자주 발생하는 오류

### 5.1 `codex: command not found`

원인:

- Claude Code Bash 환경의 PATH에 npm 전역 폴더가 없음

해결:

```bash
export PATH="$PATH:/c/Users/nakch/AppData/Roaming/npm"
```

또는 전체 경로 사용:

```bash
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" login status
```

### 5.2 `codex auth status` 실패

오류 예시:

```text
error: unrecognized subcommand 'status'
```

원인:

- 현재 Codex CLI는 `auth status`가 아니라 `login status` 명령을 사용한다.
- Claude Code Codex Plugin이 예전 또는 다른 CLI 명령 체계를 기준으로 상태 확인을 시도할 수 있다.

정상 명령:

```bash
codex login status
```

또는 전체 경로:

```bash
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" login status
```

### 5.3 `/codex:setup`이 `ready: false`로 남는 경우

인증 상태가 다음처럼 정상이어도:

```text
Logged in using ChatGPT
```

`/codex:setup`이 계속 `ready: false`를 보일 수 있다.

이 경우 원인은 보통 둘 중 하나다.

- PATH에 `codex`가 없음
- Plugin이 `codex auth status`처럼 현재 CLI와 맞지 않는 명령을 호출함

Codex CLI 자체가 동작하는지 아래 명령으로 별도 확인한다.

```bash
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" exec "현재 폴더의 파일 목록을 요약해줘"
```

이 명령이 실행되면 Codex는 사용할 수 있는 상태다.

---

## 6. 기본 사용 예시

### 6.1 단발성 질문

```bash
codex exec "이 프로젝트 구조를 요약해줘"
```

전체 경로 사용:

```bash
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" exec "이 프로젝트 구조를 요약해줘"
```

### 6.2 코드 리뷰

```bash
codex exec "현재 변경사항을 리뷰하고 버그 가능성을 찾아줘"
```

### 6.3 파일 수정 요청

```bash
codex exec "lecture_11의 이미지 경로가 Vite base 경로에서도 동작하도록 수정하고 빌드까지 확인해줘"
```

### 6.4 문서 작성

```bash
codex exec "Claude Code 안에서 Codex를 설치하고 사용하는 방법을 docs에 Markdown으로 정리해줘"
```

### 6.5 빌드 오류 해결

```bash
codex exec "npm run build 오류를 분석하고 필요한 파일을 수정한 뒤 다시 빌드해줘"
```

---

## 7. Claude Code와 Codex를 함께 쓰는 장점

Claude Code는 대화형 코드 작업, 저장소 탐색, 일반적인 구현 흐름에 강하다. Codex를 같이 쓰면 다음 영역을 보완할 수 있다.

### 7.1 이미지 생성 및 프로젝트 반영

Claude Code만 사용할 때는 실제 강의용 이미지, UI 목업, 인포그래픽 같은 시각 자료를 직접 생성하기 어렵다. Codex 환경에서는 이미지 생성 도구와 파일 작업을 함께 사용해 다음 흐름이 가능하다.

```text
이미지 기획
  → 이미지 생성
  → public/assets 폴더에 저장
  → React/Vite 코드에 연결
  → 빌드 및 URL 확인
```

예시:

- 강의 11의 `gemini-ecosystem.png`
- `api-key-workflow.png`
- `notebooklm-demo.png`
- `firebase-setup.png`
- `pricing-comparison.png`
- `security-checklist.png`

이런 이미지는 단순 장식이 아니라 강의 완성도를 높이는 시각 자료로 사용할 수 있다.

### 7.2 실제 파일 시스템 기반 작업

Codex는 로컬 파일을 읽고, 수정하고, 빌드까지 확인하는 작업 흐름에 강하다.

예시:

```text
src/App.tsx 수정
src/index.css 수정
public 이미지 추가
npm.cmd run build 검증
로컬 URL 200 응답 확인
```

### 7.3 반복 검증

단순히 코드를 제안하는 데서 끝나지 않고, 명령을 실행해 실제 결과를 확인할 수 있다.

검증 예시:

```bash
npm.cmd run build
```

이미지 URL 확인 예시:

```bash
curl http://127.0.0.1:5173/letuin_lecture_project/lecture_11/gemini-ecosystem.png
```

### 7.4 프론트엔드 완성도 개선

Codex는 React/Vite 앱에서 다음 작업을 한 번에 묶어 처리하기 좋다.

- 이미지 경로 수정
- `import.meta.env.BASE_URL` 적용
- CSS 카드 스타일 추가
- 모바일/데스크톱 레이아웃 고려
- 빌드 오류 수정
- 로컬 서버 응답 확인

### 7.5 Claude의 약점 보완

Claude Code가 잘하는 영역:

- 긴 문맥 이해
- 코드 설명
- 설계 토론
- 일반적인 리팩터링 방향 제안

Codex로 보완하기 좋은 영역:

- 실제 이미지 생성
- 생성 이미지를 프로젝트 폴더에 저장
- 코드 수정 후 빌드 검증
- 로컬 파일 경로 기반 작업
- 반복적인 디버깅과 패치
- Git diff 기준 변경사항 점검

둘을 같이 쓰면 “설명과 설계는 Claude, 실행과 검증은 Codex”처럼 역할을 나눌 수 있다.

---

## 8. 추천 워크플로우

### 8.1 Claude Code에서 기획

Claude에게 먼저 요구사항을 정리시킨다.

```text
lecture_11을 lecture1처럼 이미지가 풍부한 강의 페이지로 만들기 위한 섹션별 이미지 목록을 제안해줘.
```

### 8.2 Codex로 실행

정리된 요구사항을 Codex에 넘긴다.

```bash
codex exec "lecture_11에 필요한 이미지를 생성하고 public 폴더에 저장한 뒤 App.tsx에 연결해줘. Vite base 경로에서도 보여야 하며 npm run build로 검증해줘."
```

### 8.3 Claude Code에서 최종 설명

완료 후 Claude에게 변경사항 요약을 요청한다.

```text
방금 Codex가 수정한 내용을 강의 운영자가 이해할 수 있게 요약해줘.
```

---

## 9. 실전 프롬프트 예시

### 강의 이미지 보강

```bash
codex exec "lecture_11의 각 섹션에 어울리는 교육용 이미지를 생성하고 public 폴더에 저장해줘. App.tsx에서 import.meta.env.BASE_URL 기준으로 연결하고, npm.cmd run build까지 확인해줘."
```

### 경로 문제 수정

```bash
codex exec "http://127.0.0.1:5173/letuin_lecture_project/lecture_11/에서 이미지가 안 보이는 문제를 고쳐줘. Vite base 설정과 public asset 경로를 확인하고 수정해줘."
```

### README 보강

```bash
codex exec "README.md에 lecture_11 실행 방법과 이미지 에셋 구조를 추가해줘."
```

### 코드 리뷰

```bash
codex exec "현재 git diff를 리뷰하고, 배포 시 깨질 수 있는 경로 문제나 빌드 오류 가능성을 찾아줘."
```

---

## 10. 운영 팁

- Claude Code에서 `codex`가 안 먹으면 전체 경로를 사용한다.
- 인증 확인은 `auth status`가 아니라 `login status`를 우선 사용한다.
- 이미지나 정적 파일은 Vite 프로젝트의 `public` 폴더에 둔다.
- Vite base가 설정된 프로젝트에서는 `/image.png` 대신 `import.meta.env.BASE_URL` 기반 경로를 쓴다.
- 변경 후에는 반드시 `npm.cmd run build`로 확인한다.
- Claude Code의 `/codex:setup`이 실패해도 `codex login status`와 `codex exec`가 되면 실제 사용은 가능하다.

---

## 11. 빠른 체크리스트

```text
[ ] codex.cmd 경로 확인
[ ] codex login 실행
[ ] codex login status 확인
[ ] PATH 필요 시 ~/.bashrc 수정
[ ] codex exec 테스트
[ ] 프로젝트 파일 수정 요청
[ ] 빌드 검증
[ ] 이미지 URL 200 확인
```

---

## 12. 결론

Claude Code 안에서 Codex Plugin을 함께 쓰면 Claude의 대화형 개발 경험에 Codex의 실행형 작업 능력을 더할 수 있다. 특히 강의 페이지처럼 이미지, React 코드, CSS, 빌드 검증, 로컬 URL 확인이 모두 필요한 작업에서 효과가 크다.

가장 중요한 확인 명령은 다음 두 개다.

```bash
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" login status
"C:/Users/nakch/AppData/Roaming/npm/codex.cmd" exec "테스트"
```

두 명령이 동작하면 Codex는 Claude Code 안에서 보조 실행 도구로 사용할 준비가 된 것이다.
