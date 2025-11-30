// Security utilities for contact form

export interface SecurityConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs: number;
  enableHoneypot: boolean;
  enableTimeValidation: boolean;
}

export const SECURITY_CONFIG: SecurityConfig = {
  maxRequests: 5, // Max 5 requests per window
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDurationMs: 60 * 60 * 1000, // 1 hour block
  enableHoneypot: true,
  enableTimeValidation: true,
};

// Honeypot field validation (hidden field that should be empty)
export function validateHoneypot(body: Record<string, unknown>): boolean {
  const honeypotFields = ["website", "url", "phone", "company"];
  for (const field of honeypotFields) {
    const value = body[field];
    if (value && typeof value === "string" && value.trim() !== "") {
      return false; // Bot detected
    }
  }
  return true;
}

// Time-based validation (form should take at least 3 seconds to fill)
export function validateSubmissionTime(startTime: number): boolean {
  const submissionTime = Date.now() - startTime;
  return submissionTime >= 3000; // At least 3 seconds
}

// Additional security headers
export function getSecurityHeaders() {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
  };
}

// Log security events
export function logSecurityEvent(event: string, ip: string, details?: Record<string, unknown>) {
  console.log(`[SECURITY] ${event} - IP: ${ip}`, details ? JSON.stringify(details) : "");
}
