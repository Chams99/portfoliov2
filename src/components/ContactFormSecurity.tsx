"use client";

import { useState, useEffect } from "react";
import styles from "./ContactFormSecurity.module.scss";

interface ContactFormSecurityProps {
  onValidationChange: (isValid: boolean) => void;
}

export default function ContactFormSecurity({ onValidationChange }: ContactFormSecurityProps) {
  const [startTime] = useState(Date.now());
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Simple time-based validation
    const timer = setTimeout(() => {
      setIsValid(true);
      onValidationChange(true);
    }, 3000); // 3 seconds minimum

    return () => clearTimeout(timer);
  }, [onValidationChange]);

  return (
    <>
      {/* Honeypot fields - hidden from users */}
      <div className={styles.honeypotFields}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input type="text" name="url" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input type="text" name="phone" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>

      {/* Time validation indicator */}
      {!isValid && (
        <div className={styles.timeValidationMessage}>
          Please wait a moment before submitting...
        </div>
      )}
    </>
  );
}
