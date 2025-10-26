import { NextResponse } from "next/server";
import { headers } from "next/headers";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 5, // Max 5 requests
  windowMs: 15 * 60 * 1000, // Per 15 minutes
  blockDurationMs: 60 * 60 * 1000, // Block for 1 hour if exceeded
};

// Input validation and sanitization
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .substring(0, 1000); // Limit length
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function validateInput(
  name: string,
  email: string,
  subject: string,
  message: string,
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!name || name.length < 2 || name.length > 50) {
    errors.push("Name must be between 2 and 50 characters");
  }

  if (!validateEmail(email)) {
    errors.push("Please enter a valid email address");
  }

  if (!subject || subject.length < 3 || subject.length > 100) {
    errors.push("Subject must be between 3 and 100 characters");
  }

  if (!message || message.length < 5 || message.length > 2000) {
    errors.push("Message must be between 5 and 2000 characters");
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\(/i,
    /document\./i,
    /window\./i,
    /alert\(/i,
    /prompt\(/i,
  ];

  const allText = `${name} ${email} ${subject} ${message}`;
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(allText)) {
      errors.push("Suspicious content detected");
      break;
    }
  }

  return { valid: errors.length === 0, errors };
}

// Rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = ip;

  const current = rateLimitMap.get(key);

  if (!current || now > current.resetTime) {
    // Reset or create new entry
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return {
      allowed: true,
      remaining: RATE_LIMIT.maxRequests - 1,
      resetTime: now + RATE_LIMIT.windowMs,
    };
  }

  if (current.count >= RATE_LIMIT.maxRequests) {
    // Check if still in block period
    if (now < current.resetTime + RATE_LIMIT.blockDurationMs) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: current.resetTime + RATE_LIMIT.blockDurationMs,
      };
    }
    // Reset after block period
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return {
      allowed: true,
      remaining: RATE_LIMIT.maxRequests - 1,
      resetTime: now + RATE_LIMIT.windowMs,
    };
  }

  // Increment count
  current.count++;
  rateLimitMap.set(key, current);

  return {
    allowed: true,
    remaining: RATE_LIMIT.maxRequests - current.count,
    resetTime: current.resetTime,
  };
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const clientIP =
      headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";

    // Check rate limiting
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            "X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            "X-RateLimit-Reset": rateLimit.resetTime.toString(),
          },
        },
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Validate inputs
    const validation = validateInput(
      sanitizedName,
      sanitizedEmail,
      sanitizedSubject,
      sanitizedMessage,
    );
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.errors,
        },
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
        message: "Message received (Telegram not configured)",
      });
    }

    const telegramMessage = `📧 New Portfolio Contact Form Submission:

Name: ${sanitizedName}
Email: ${sanitizedEmail}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

IP: ${clientIP}
Time: ${new Date().toISOString()}`;

    // Use URLSearchParams for better compatibility (2025 best practice)
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    console.log("Sending to Telegram URL:", telegramUrl);
    console.log("Chat ID:", TELEGRAM_CHAT_ID);
    console.log("Message:", telegramMessage);

    // Use the exact same format as the working PHP implementation
    const postFields = {
      chat_id: TELEGRAM_CHAT_ID,
      text: telegramMessage,
      parse_mode: "HTML",
    };

    console.log("Post fields being sent:", postFields);

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Portfolio-Contact-Form/1.0",
      },
      body: new URLSearchParams(postFields).toString(),
    });

    console.log("Telegram response status:", telegramResponse.status);
    const telegramResult = await telegramResponse.json();
    console.log("Telegram API response:", telegramResult);

    if (telegramResponse.ok && telegramResult.ok) {
      console.log("Telegram message sent successfully!");
      return NextResponse.json({
        success: true,
        message: "Message sent successfully!",
      });
    }

    console.error("Telegram API error:", telegramResult);

    // Provide more specific error handling based on error codes
    if (telegramResult.error_code === 400) {
      console.error("Bad Request - Check chat ID and bot token");
      console.error("Error description:", telegramResult.description);

      // Handle specific error cases
      if (telegramResult.description?.includes("chat not found")) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Telegram bot not found in chat. Please add the bot to your chat or check the chat ID.",
            telegramError: telegramResult.description,
            solution: "Add your bot to the chat or verify the chat ID in environment variables",
          },
          { status: 400 },
        );
      }
    } else if (telegramResult.error_code === 401) {
      console.error("Unauthorized - Check bot token");
    } else if (telegramResult.error_code === 403) {
      console.error("Forbidden - Bot blocked by user");
    }

    // Return error response to help with debugging
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message via Telegram",
        telegramError: telegramResult.description || "Unknown Telegram error",
      },
      { status: 500 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Server error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
