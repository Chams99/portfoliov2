"use client";

import React, { useState } from "react";
import { Column, Row, Button, Input, Heading, Text } from "@once-ui-system/core";
import styles from "./ContactForm.module.scss";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Column fillWidth horizontal="center">
      <Column maxWidth="s" paddingX="l">
        <form onSubmit={handleSubmit} className={styles.contactForm}>
        <Column gap="24">
          <Column gap="16" align="center">
            <Heading as="h3" variant="heading-strong-l" align="center">
              Send Me a Message
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              I'll respond within 24 hours
            </Text>
          </Column>

          <Column gap="16">
            <Input
              id="name"
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />

            <Input
              id="email"
              label="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />

            <Input
              id="subject"
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={status === "sending"}
            />

            <Column gap="8">
              <label htmlFor="message" className={styles.label}>
                <Text variant="label-default-s" onBackground="neutral-medium">
                  Your Message
                </Text>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={status === "sending"}
                rows={6}
                className={styles.textarea}
                placeholder="Tell me about your project or inquiry..."
              />
            </Column>
          </Column>

          <Button
            type="submit"
            variant="primary"
            size="l"
            disabled={status === "sending"}
            fillWidth
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </Button>

          {status === "success" && (
            <div className={styles.successMessage}>
              <Text variant="body-default-m" onBackground="brand-strong">
                ✓ Message sent successfully! I'll get back to you soon.
              </Text>
            </div>
          )}

          {status === "error" && (
            <div className={styles.errorMessage}>
              <Text variant="body-default-m" onBackground="accent-strong">
                ✗ {errorMessage}
              </Text>
            </div>
          )}
        </Column>
      </form>
      </Column>
    </Column>
  );
}

