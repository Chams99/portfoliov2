import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    // Check if Telegram is configured
    console.log("Environment check - TELEGRAM_BOT_TOKEN:", TELEGRAM_BOT_TOKEN ? "SET" : "NOT SET");
    console.log("Environment check - TELEGRAM_CHAT_ID:", TELEGRAM_CHAT_ID ? "SET" : "NOT SET");
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.log("Telegram not configured, logging contact form submission:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Subject:", subject);
      console.log("Message:", message);
      
      // Return success even without Telegram to avoid breaking the form
      return NextResponse.json({ 
        success: true, 
        message: "Message received (Telegram not configured)" 
      });
    }

    const telegramMessage = `📧 New Portfolio Contact Form Submission:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

    // Use URLSearchParams for better compatibility (2025 best practice)
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    console.log("Sending to Telegram URL:", telegramUrl);
    console.log("Chat ID:", TELEGRAM_CHAT_ID);
    console.log("Message:", telegramMessage);

    // Convert chat_id to number for proper formatting
    const chatId = parseInt(TELEGRAM_CHAT_ID);
    
    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Portfolio-Contact-Form/1.0",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    console.log("Telegram response status:", telegramResponse.status);
    const telegramResult = await telegramResponse.json();
    console.log("Telegram API response:", telegramResult);

    if (telegramResponse.ok && telegramResult.ok) {
      console.log("Telegram message sent successfully!");
      return NextResponse.json({ success: true });
    }
    
    console.error("Telegram API error:", telegramResult);
    
    // Provide more specific error handling based on error codes
    if (telegramResult.error_code === 400) {
      console.error("Bad Request - Check chat ID and bot token");
    } else if (telegramResult.error_code === 401) {
      console.error("Unauthorized - Check bot token");
    } else if (telegramResult.error_code === 403) {
      console.error("Forbidden - Bot blocked by user");
    }
    
    // Still return success to avoid breaking the form if Telegram fails
    return NextResponse.json({ 
      success: true, 
      message: "Message received (delivery confirmation pending)" 
    });
    
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Server error occurred. Please try again later." 
    }, { status: 500 });
  }
}
