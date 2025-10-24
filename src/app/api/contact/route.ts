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

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "HTML",
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (telegramResponse.ok && telegramResult.ok) {
      return NextResponse.json({ success: true });
    }
    
    console.error("Telegram API error:", telegramResult);
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
