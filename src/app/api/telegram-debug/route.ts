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

    // Get bot info
    const botInfoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
    const botInfoResponse = await fetch(botInfoUrl);
    const botInfo = await botInfoResponse.json();
    
    if (!botInfo.ok) {
      return NextResponse.json({
        success: false,
        error: "Bot token is invalid",
        botInfo: botInfo
      });
    }

    // Get chat info
    const chatInfoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat`;
    const chatInfoResponse = await fetch(chatInfoUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        chat_id: TELEGRAM_CHAT_ID
      }).toString()
    });
    
    const chatInfo = await chatInfoResponse.json();
    
    return NextResponse.json({
      success: true,
      botInfo: {
        username: botInfo.result.username,
        first_name: botInfo.result.first_name,
        id: botInfo.result.id
      },
      chatInfo: chatInfo,
      chatId: TELEGRAM_CHAT_ID,
      debugInfo: {
        chatIdType: typeof TELEGRAM_CHAT_ID,
        chatIdLength: TELEGRAM_CHAT_ID.length,
        botTokenLength: TELEGRAM_BOT_TOKEN.length
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to debug Telegram setup",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
