import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function GET() {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({
        success: false,
        error: "Environment variables not set",
        instructions: [
          "1. Update TELEGRAM_BOT_TOKEN with: 8078438225:AAEYhUOZIZdOyjDE2P9i_yM-h2Y3YeTich4",
          "2. Get your user ID by messaging @userinfobot",
          "3. Update TELEGRAM_CHAT_ID with your user ID",
          "4. Redeploy the project"
        ]
      });
    }

    // Test the new bot
    const testMessage = `🤖 New bot test - ${new Date().toISOString()}\n\nIf you receive this message, the new bot is working!`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const postFields = {
      chat_id: TELEGRAM_CHAT_ID,
      text: testMessage,
      parse_mode: 'HTML'
    };
    
    console.log("New bot test - Chat ID:", TELEGRAM_CHAT_ID);
    console.log("New bot test - Bot Token (first 10 chars):", TELEGRAM_BOT_TOKEN.substring(0, 10));
    
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
      message: result.ok ? 
        "✅ New bot test successful! Check your Telegram for the test message." : 
        "❌ New bot test failed. Make sure you've updated the environment variables and started a conversation with @Vhamees_bot",
      debugInfo: {
        chatId: TELEGRAM_CHAT_ID,
        botTokenLength: TELEGRAM_BOT_TOKEN.length,
        botTokenStart: TELEGRAM_BOT_TOKEN.substring(0, 10),
        errorDescription: result.description
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "New bot test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
