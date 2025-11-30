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
        chatId: TELEGRAM_CHAT_ID ? "SET" : "NOT SET",
      });
    }

    // First, let's test if the bot exists and get info
    const botInfoUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`;
    console.log("Testing bot info first...");

    const botInfoResponse = await fetch(botInfoUrl);
    const botInfo = await botInfoResponse.json();
    console.log("Bot info:", botInfo);

    if (!botInfo.ok) {
      return NextResponse.json({
        success: false,
        error: "Bot token is invalid or bot doesn't exist",
        botInfo: botInfo,
      });
    }

    // Test Telegram API with a simple message
    const testMessage = `🧪 Telegram bot test - ${new Date().toISOString()}`;
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    // Try different chat ID formats
    const chatId = TELEGRAM_CHAT_ID;
    const chatIdAsNumber = Number.parseInt(TELEGRAM_CHAT_ID);

    console.log("Testing with chat ID:", chatId);
    console.log("Chat ID as number:", chatIdAsNumber);
    console.log("Bot username:", botInfo.result.username);

    // Use form data exactly like the working PHP version
    const formData = new URLSearchParams();
    formData.append("chat_id", TELEGRAM_CHAT_ID);
    formData.append("text", testMessage);
    formData.append("parse_mode", "HTML");

    console.log("Form data being sent:", formData.toString());

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Portfolio-Test/1.0",
      },
      body: formData.toString(),
    });

    const result = await response.json();

    return NextResponse.json({
      success: result.ok,
      telegramResponse: result,
      httpStatus: response.status,
      chatId: TELEGRAM_CHAT_ID,
      botToken: `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...`,
      botInfo: botInfo.result,
      debugInfo: {
        chatIdAsString: chatId,
        chatIdAsNumber: chatIdAsNumber,
        botUsername: botInfo.result.username,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to test Telegram API",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
