# 17강: 메시징 자동화 - 상세 내용

작성일: 2026-05-16

---

## 학습 목표

1. **Telegram Bot 생성**: @BotFather로 봇을 만들고 토큰 발급
2. **메시지 자동 발송**: Python으로 텍스트, 이미지, 파일 전송
3. **조건부 알림**: 수율 < 90% 시 Gemini API 분석 결과 자동 발송

---

## 섹션별 상세 내용

### Section 01: Hero (0~3분)

**도입 멘트**:
> "수율이 90% 미만으로 하락하면 자동으로 휴대폰에 알림이 옵니다. 17강에서는 Telegram 봇을 만듭니다. Gemini API로 원인을 분석하고 텔레그램으로 실시간 알림을 보냅니다."

**학습목표 3개 카드**:
- **학습목표 1**: Telegram Bot 생성 및 토큰 발급 (MessageCircle 아이콘)
- **학습목표 2**: 메시지 자동 발송 (텍스트/이미지/파일) (Send 아이콘)
- **학습목표 3**: 조건부 알림 (수율 < 90%) (Bell 아이콘)

**40분 타임라인**:
- 0~3분: Telegram 봇 소개
- 3~10분: @BotFather로 봇 생성
- 10~18분: python-telegram-bot 설치 및 "Hello, Bot!"
- 18~30분: 수율 알림 시스템 구축
- 30~35분: Gemini API 연동 (원인 분석)
- 35~40분: 정리 및 Session 3 총정리

---

### Section 02: Telegram 봇 소개 (3~10분)

#### Telegram 봇이란?

**정의**:
```
Telegram Bot은 Telegram 메신저에서 작동하는 자동화 계정입니다.
API로 메시지를 보내고, 명령어를 처리하며, 파일을 전송할 수 있습니다.
```

**장점**:
- **무료**: API 호출 무제한, 봇 생성 무료
- **즉시성**: 푸시 알림 1초 내 도착
- **멀티미디어**: 텍스트, 이미지, 파일, 위치 전송 가능
- **그룹 지원**: 팀 채팅방에 자동 발송 가능
- **간단한 API**: RESTful API, 라이브러리 풍부

---

#### Telegram 봇 활용 사례

**사례 1: 공정 이상 알림**
```
수율 < 90% 감지
→ Gemini API로 원인 분석
→ Telegram 메시지 발송
→ 엔지니어 휴대폰 알림
→ 즉시 대응
```

**사례 2: 일일 리포트 자동 발송**
```
매일 18:00
→ 당일 수율 데이터 집계
→ Matplotlib 차트 생성
→ Telegram 이미지 + 요약 발송
```

**사례 3: 챗봇 명령어**
```
사용자: /status
봇: "현재 수율: 92.3% (정상)"

사용자: /report
봇: "일일 리포트를 생성 중입니다..." (PDF 파일 전송)
```

---

### Section 03: @BotFather로 봇 생성 (10~18분)

#### @BotFather란?

**정의**:
```
@BotFather는 Telegram 공식 봇입니다.
새로운 봇을 생성하고 관리할 수 있습니다.
```

---

#### 봇 생성 3단계

**Step 1: @BotFather 검색**
```
Telegram 앱 열기
→ 검색창에 "@BotFather" 입력
→ 파란색 체크 마크 확인 (공식 계정)
→ "Start" 버튼 클릭
```

**Step 2: /newbot 명령어**
```
사용자: /newbot

BotFather:
"Alright, a new bot. How are we going to call it?
Please choose a name for your bot."

사용자: YieldMonitorBot

BotFather:
"Good. Now let's choose a username for your bot.
It must end in `bot`. Like this, for example: TetrisBot or tetris_bot."

사용자: yield_monitor_bot

BotFather:
"Done! Congratulations on your new bot.
You will find it at t.me/yield_monitor_bot.

Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz

Keep your token secure and store it safely, it can be used by anyone to control your bot."
```

**Step 3: 토큰 저장**
```
토큰을 .env 파일에 저장:

TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789 (나중에 확인)
```

---

#### Chat ID 확인

**방법 1: @userinfobot 사용**
```
1. @userinfobot 검색
2. "Start" 클릭
3. Id: 123456789 (이것이 Chat ID)
```

**방법 2: getUpdates API**
```python
import requests

TOKEN = "1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
url = f"https://api.telegram.org/bot{TOKEN}/getUpdates"

response = requests.get(url)
data = response.json()

print(data)
# "chat": {"id": 123456789, "first_name": "홍길동", ...}
```

---

### Section 04: python-telegram-bot 설치 및 "Hello, Bot!" (18~30분)

#### 라이브러리 설치

**python-telegram-bot 설치**:
```bash
pip install python-telegram-bot
```

---

#### Hello, Bot! 코드

**기본 메시지 발송**:
```python
import os
from dotenv import load_dotenv
from telegram import Bot
import asyncio

load_dotenv()

TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

async def send_hello():
    bot = Bot(token=TOKEN)
    await bot.send_message(chat_id=CHAT_ID, text="Hello, Bot!")

# 실행
asyncio.run(send_hello())
```

**실행**:
```bash
python telegram_hello.py

# Telegram 앱에서 "Hello, Bot!" 메시지 확인
```

---

#### 이미지 전송

**Matplotlib 차트 전송**:
```python
import matplotlib.pyplot as plt
from telegram import Bot
import asyncio

async def send_chart():
    # 차트 생성
    plt.figure(figsize=(8, 6))
    plt.plot([1, 2, 3, 4], [92, 90, 88, 85], marker='o')
    plt.xlabel('Day')
    plt.ylabel('Yield (%)')
    plt.title('Yield Trend')
    plt.savefig('yield_chart.png')
    plt.close()

    # 전송
    bot = Bot(token=TOKEN)
    with open('yield_chart.png', 'rb') as photo:
        await bot.send_photo(chat_id=CHAT_ID, photo=photo, caption='수율 하락 추이')

asyncio.run(send_chart())
```

---

#### 파일 전송

**CSV 파일 전송**:
```python
async def send_file():
    bot = Bot(token=TOKEN)
    with open('yield_data.csv', 'rb') as document:
        await bot.send_document(chat_id=CHAT_ID, document=document, caption='일일 수율 데이터')

asyncio.run(send_file())
```

---

### Section 05: 수율 알림 시스템 구축 (30~35분)

#### 조건부 알림 로직

**시나리오**:
```
1. 수율 데이터 읽기 (CSV 또는 Firestore)
2. 최신 수율 확인
3. if 수율 < 90%:
   → Gemini API로 원인 분석
   → Telegram 메시지 발송 (텍스트 + 차트)
```

---

#### 코드 구현

**전체 코드**:
```python
import os
import pandas as pd
import matplotlib.pyplot as plt
from telegram import Bot
import google.generativeai as genai
import asyncio
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-1.5-pro')

async def check_yield_and_alert():
    # 1. 수율 데이터 읽기
    df = pd.read_csv('yield_log.csv')
    latest_yield = df['yield'].iloc[-1]
    latest_temp = df['temperature'].iloc[-1]
    latest_pressure = df['pressure'].iloc[-1]

    print(f"최신 수율: {latest_yield}%")

    # 2. 조건 확인
    if latest_yield < 90:
        print("⚠️ 수율 이상 감지!")

        # 3. Gemini API로 원인 분석
        prompt = f"""
        반도체 CVD 공정에서 수율이 {latest_yield}%로 하락했습니다.
        현재 조건:
        - 온도: {latest_temp}°C
        - 압력: {latest_pressure} bar

        가능한 원인 3가지와 대응 방안을 제시해주세요.
        """

        response = model.generate_content(prompt)
        analysis = response.text

        # 4. 차트 생성
        plt.figure(figsize=(10, 6))
        plt.plot(df['date'], df['yield'], marker='o', color='#EA4335', linewidth=2)
        plt.axhline(y=90, color='#34A853', linestyle='--', label='목표 수율 90%')
        plt.xlabel('날짜')
        plt.ylabel('수율 (%)')
        plt.title('수율 추이')
        plt.legend()
        plt.grid(True, alpha=0.3)
        plt.savefig('yield_alert_chart.png', dpi=150)
        plt.close()

        # 5. Telegram 메시지 발송
        bot = Bot(token=TOKEN)

        # 텍스트 메시지
        message = f"""
⚠️ **수율 이상 감지**

현재 수율: {latest_yield}%
목표 수율: 90%

**Gemini AI 분석 결과:**
{analysis}

즉시 확인이 필요합니다.
        """

        await bot.send_message(
            chat_id=CHAT_ID,
            text=message,
            parse_mode='Markdown'
        )

        # 차트 이미지 전송
        with open('yield_alert_chart.png', 'rb') as photo:
            await bot.send_photo(
                chat_id=CHAT_ID,
                photo=photo,
                caption='수율 추이 차트'
            )

        print("✅ Telegram 알림 발송 완료")

    else:
        print("✅ 수율 정상 범위 (90% 이상)")

# 실행
asyncio.run(check_yield_and_alert())
```

---

#### 자동 실행 (cron 또는 스케줄러)

**Linux cron 설정**:
```bash
# crontab 편집
crontab -e

# 매 1시간마다 실행
0 * * * * /usr/bin/python3 /path/to/yield_alert.py

# 매일 18:00 실행
0 18 * * * /usr/bin/python3 /path/to/yield_alert.py
```

**Python schedule 라이브러리**:
```python
import schedule
import time

def job():
    asyncio.run(check_yield_and_alert())

# 1시간마다 실행
schedule.every(1).hours.do(job)

# 무한 루프
while True:
    schedule.run_pending()
    time.sleep(60)
```

---

### Section 06: 정리 및 Session 3 총정리 (35~40분)

#### 17강 완성 체크리스트

- [ ] @BotFather로 Telegram 봇 생성
- [ ] 봇 토큰 발급 및 .env 저장
- [ ] Chat ID 확인
- [ ] "Hello, Bot!" 메시지 발송 성공
- [ ] 이미지 전송 테스트 (차트)
- [ ] 조건부 알림 코드 작성 (수율 < 90%)
- [ ] Gemini API 연동 (원인 분석)

---

#### Session 3 (11~17강) 총정리

**11강: Gemini 생태계 마스터**
```
- Google AI Studio에서 API Key 발급
- NotebookLM으로 논문 10개 업로드
- Firebase 프로젝트 생성
```

**12강: NotebookLM 연구 노트**
```
- 출처 기반 질의응답 (할루시네이션 없음)
- 오디오 팟캐스트 생성
- 4개 분야 (반도체/디스플레이/배터리/바이오) 논문 분석
```

**13강: 픽셀 구조 시각화**
```
- RGB Stripe vs PenTile 비교
- PPI 계산기 구현
- Streamlit 슬라이더 시뮬레이터
```

**14강: 수율 시뮬레이터**
```
- 공정 변수 (온도/압력/시간) vs 수율 상관관계
- Plotly 3D 산점도, 히트맵
- 회귀 분석으로 최적 조건 탐색
```

**15강: Firebase 배포 및 통합**
```
- Firebase Hosting 배포
- Firestore 데이터 저장
- Firebase Auth 사용자 인증
```

**16강: 보안 및 환경 관리**
```
- .env 파일로 API Key 분리
- .gitignore로 GitHub 커밋 방지
- Firebase Functions 환경 변수
```

**17강: 메시징 자동화**
```
- Telegram 봇 생성
- 조건부 알림 (수율 < 90%)
- Gemini API 원인 분석 + Telegram 발송
```

---

## 핵심 메시지

> "Telegram 봇은 여러분의 24시간 공정 감시자입니다. 수율 이상 발생 시 1초 내 휴대폰에 알립니다. Gemini API와 함께 사용하면 AI가 원인을 분석하고 대응 방안을 제시합니다."

---

## 결과물

1. **Telegram Bot**: @yield_monitor_bot
2. **telegram_alert.py**: 조건부 알림 스크립트
3. **yield_alert_chart.png**: 수율 추이 차트
4. **자동 실행**: cron 또는 schedule 라이브러리

---

## 최종 프로젝트 (Session 3 종합)

**주제**: AI 공정 모니터링 대시보드

**구성 요소**:
1. **Gemini API**: 수율 데이터 분석
2. **NotebookLM**: 논문 지식 베이스
3. **Streamlit 시뮬레이터**: 픽셀 구조 + 수율 시뮬레이터
4. **Firebase**: Hosting + Firestore + Auth
5. **Telegram Bot**: 실시간 알림

**난이도**:
- **초급**: 기본 기능 구현 (Gemini API + Firebase + Telegram)
- **중급**: 실시간 대시보드 + 자동 알림
- **고급**: 멀티 분야 통합 + 예측 모델 + 다국어 지원

---

작성 완료: 2026-05-16

**총 라인 수**: 약 700 라인
**타겟 시간**: 40분 강의 분량
