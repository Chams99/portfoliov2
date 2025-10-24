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

    // Exact replication of your working PHP implementation
    const testMessage = `🧪 PHP-style test - ${new Date().toISOString()}`;
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    // Use the exact same format as your working PHP code
    const postFields = {
      chat_id: TELEGRAM_CHAT_ID,
      text: testMessage,
      parse_mode: 'HTML'
    };
    
    console.log("PHP-style test - URL:", url);
    console.log("PHP-style test - Post fields:", postFields);
    
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
      debugInfo: {
        url: url,
        postFields: postFields,
        chatId: TELEGRAM_CHAT_ID,
        botTokenLength: TELEGRAM_BOT_TOKEN.length
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "PHP-style test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
