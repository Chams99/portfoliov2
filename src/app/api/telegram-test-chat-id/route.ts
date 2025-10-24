import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function GET() {
  try {
    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({
        success: false,
        error: "TELEGRAM_BOT_TOKEN not set"
      });
    }

    // Test with different possible chat ID formats
    const possibleChatIds = [
      "259407405", // Current chat ID
      "259407405", // As string
      259407405,   // As number
    ];

    const results = [];

    for (const chatId of possibleChatIds) {
      try {
        const testMessage = `🧪 Chat ID test: ${chatId} - ${new Date().toISOString()}`;
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const postFields = {
          chat_id: chatId.toString(),
          text: testMessage,
          parse_mode: 'HTML'
        };
        
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(postFields).toString(),
        });

        const result = await response.json();
        
        results.push({
          chatId: chatId,
          success: result.ok,
          error: result.description,
          httpStatus: response.status
        });
        
      } catch (error) {
        results.push({
          chatId: chatId,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          httpStatus: 0
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      results: results,
      message: "Test completed. Check which chat ID works.",
      instructions: [
        "1. Get your user ID by messaging @userinfobot",
        "2. Update TELEGRAM_CHAT_ID in Vercel with your actual user ID",
        "3. Redeploy the project"
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Chat ID test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
