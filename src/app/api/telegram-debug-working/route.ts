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

    // Get bot info first
    const botInfoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
    const botInfoResponse = await fetch(botInfoUrl);
    const botInfo = await botInfoResponse.json();
    
    // Try to get updates to see what chats the bot can access
    const updatesUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;
    const updatesResponse = await fetch(updatesUrl);
    const updates = await updatesResponse.json();
    
    // Try to send a message to the current chat ID
    const testMessage = `🔍 Debug test - ${new Date().toISOString()}`;
    const sendMessageUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const postFields = {
      chat_id: TELEGRAM_CHAT_ID,
      text: testMessage,
      parse_mode: 'HTML'
    };
    
    const sendResponse = await fetch(sendMessageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(postFields).toString(),
    });

    const sendResult = await sendResponse.json();
    
    return NextResponse.json({
      success: true,
      botInfo: botInfo,
      updates: updates,
      sendResult: sendResult,
      currentChatId: TELEGRAM_CHAT_ID,
      debugInfo: {
        botTokenLength: TELEGRAM_BOT_TOKEN.length,
        botTokenStart: TELEGRAM_BOT_TOKEN.substring(0, 10),
        updatesCount: updates.result?.length || 0,
        sendResultOk: sendResult.ok
      },
      instructions: [
        "1. Check the 'updates' array to see recent chats",
        "2. Look for 'message.from.id' in the updates to find your user ID",
        "3. If you see your user ID, update TELEGRAM_CHAT_ID in Vercel",
        "4. If no updates, you need to start a conversation with @Giiiinnn_bot first"
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Debug failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
