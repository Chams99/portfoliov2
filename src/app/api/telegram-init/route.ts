import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function GET() {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({
        success: false,
        error: "Environment variables not set"
      });
    }

    // Send a simple initialization message
    const initMessage = `🤖 Bot initialization test - ${new Date().toISOString()}\n\nIf you receive this message, the bot is properly connected!`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const postFields = {
      chat_id: TELEGRAM_CHAT_ID,
      text: initMessage,
      parse_mode: 'HTML'
    };
    
    console.log("Init test - Chat ID:", TELEGRAM_CHAT_ID);
    console.log("Init test - Bot Token (first 10 chars):", TELEGRAM_BOT_TOKEN.substring(0, 10));
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(postFields).toString(),
    });

    const result = await response.json();
    
    return NextResponse.json({
      success: result.ok,
      httpStatus: response.status,
      telegramResponse: result,
      message: result.ok ? "Bot initialization successful! Check your Telegram." : "Bot initialization failed. Make sure you've started a conversation with @Giiiinnn_bot",
      debugInfo: {
        chatId: TELEGRAM_CHAT_ID,
        botTokenLength: TELEGRAM_BOT_TOKEN.length,
        errorDescription: result.description
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Initialization test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
