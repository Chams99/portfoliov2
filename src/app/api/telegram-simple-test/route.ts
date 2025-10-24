import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function GET() {
  try {
    // Simple test - just try to send a basic message
    const testMessage = `🧪 Simple test - ${new Date().toISOString()}`;
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    if (!TELEGRAM_CHAT_ID) {
      throw new Error("TELEGRAM_CHAT_ID is not set");
    }
    
    const formData = new URLSearchParams();
    formData.append('chat_id', TELEGRAM_CHAT_ID);
    formData.append('text', testMessage);
    
    console.log("Simple test - Chat ID:", TELEGRAM_CHAT_ID);
    console.log("Simple test - Bot Token (first 10 chars):", TELEGRAM_BOT_TOKEN?.substring(0, 10));
    
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();
    
    return NextResponse.json({
      success: result.ok,
      httpStatus: response.status,
      telegramResponse: result,
      debugInfo: {
        chatId: TELEGRAM_CHAT_ID,
        botTokenLength: TELEGRAM_BOT_TOKEN?.length,
        botTokenStart: TELEGRAM_BOT_TOKEN?.substring(0, 10)
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Simple test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
