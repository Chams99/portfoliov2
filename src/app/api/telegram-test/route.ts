import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function GET() {
  try {
    // Check if environment variables are set
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({
        success: false,
        error: "Telegram environment variables not set",
        botToken: TELEGRAM_BOT_TOKEN ? "SET" : "NOT SET",
        chatId: TELEGRAM_CHAT_ID ? "SET" : "NOT SET"
      });
    }

    // Test Telegram API with a simple message
    const testMessage = "🧪 Telegram bot test - " + new Date().toISOString();
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Portfolio-Test/1.0",
      },
      body: JSON.stringify({
        chat_id: String(TELEGRAM_CHAT_ID),
        text: testMessage,
        parse_mode: "HTML",
      }),
    });

    const result = await response.json();
    
    return NextResponse.json({
      success: result.ok,
      telegramResponse: result,
      httpStatus: response.status,
      chatId: TELEGRAM_CHAT_ID,
      botToken: TELEGRAM_BOT_TOKEN.substring(0, 10) + "..."
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to test Telegram API",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
