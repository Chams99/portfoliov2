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

    // First, let's check if the bot can get info about the chat
    const getChatUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChat`;
    const getChatResponse = await fetch(getChatUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        chat_id: TELEGRAM_CHAT_ID
      }).toString(),
    });

    const chatInfo = await getChatResponse.json();
    
    // Now try to send a message
    const testMessage = `🔍 Verification test - ${new Date().toISOString()}`;
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
      success: sendResult.ok,
      httpStatus: sendResponse.status,
      chatInfo: chatInfo,
      sendResult: sendResult,
      debugInfo: {
        chatId: TELEGRAM_CHAT_ID,
        botTokenLength: TELEGRAM_BOT_TOKEN.length,
        chatInfoOk: chatInfo.ok,
        sendResultOk: sendResult.ok
      },
      message: sendResult.ok ? 
        "✅ Bot verification successful! Check your Telegram for the test message." : 
        "❌ Bot verification failed. Make sure you've started a conversation with @Giiiinnn_bot"
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Verification test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
