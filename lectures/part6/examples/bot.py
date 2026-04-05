"""
13강 실습: 디스플레이 기술 상담 텔레그램 봇 (Claude API 연동)
바로 실행 가능한 완성 코드

사전 준비:
    1. BotFather에서 봇 생성 → 토큰 발급
       https://t.me/BotFather → /newbot
    2. .env.example을 .env로 복사 후 값 입력
    3. pip install -r requirements.txt
    4. python bot.py

지원 명령어:
    /start  — 환영 메시지
    /help   — 사용법 안내
    /explain [공정명]  — 공정 설명 (Claude API)
    일반 텍스트 → Claude 자유 답변
"""

import os
import logging
import anthropic
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import (
    ApplicationBuilder,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters,
)

load_dotenv()

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)

SYSTEM_PROMPT = """당신은 디스플레이 공정 전문가입니다.
OLED, LCD, TFT, 포토리소그래피, 드라이에치, 잉크젯 공정 등
디스플레이 제조 전반에 대해 취업준비생이 이해하기 쉽게 설명해주세요.
답변은 한국어로 간결하게 (200자 이내) 작성하세요."""


def call_claude(user_message: str) -> str:
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=512,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )
    return message.content[0].text


# ------- 명령어 핸들러 -------
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "👋 안녕하세요! 디스플레이 기술 상담 봇입니다.\n\n"
        "📌 사용 가능한 명령어:\n"
        "/help — 사용법 보기\n"
        "/explain [공정명] — 공정 설명 요청\n"
        "또는 궁금한 점을 바로 입력하세요!"
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "📖 **사용법**\n\n"
        "`/explain 포토리소그래피` — 공정 설명\n"
        "`/explain 잉크젯` — 잉크젯 공정 설명\n"
        "또는 자유롭게 질문하세요:\n"
        "예) OLED와 LCD 차이가 뭐야?\n"
        "예) 수율이 낮아지는 이유는?",
        parse_mode="Markdown",
    )


async def explain_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        await update.message.reply_text("사용법: /explain [공정명]\n예) /explain 포토리소그래피")
        return
    process = " ".join(context.args)
    await update.message.reply_text(f"🔍 {process} 공정 설명 생성 중...")
    answer = call_claude(f"{process} 공정을 200자 이내로 설명해줘.")
    await update.message.reply_text(answer)


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_text = update.message.text
    answer = call_claude(user_text)
    await update.message.reply_text(answer)


# ------- 봇 실행 -------
def main():
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        raise ValueError("TELEGRAM_BOT_TOKEN이 .env 파일에 없습니다.")

    app = ApplicationBuilder().token(token).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))
    app.add_handler(CommandHandler("explain", explain_command))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("봇 실행 중... Ctrl+C로 종료")
    app.run_polling()


if __name__ == "__main__":
    main()
