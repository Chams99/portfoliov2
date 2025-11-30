"use client";

import { Button, Column, Heading, Input, Row, Text } from "@once-ui-system/core";
import type React from "react";
import { useState, useCallback, useMemo } from "react";
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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          setStatus("error");
          setErrorMessage(
            errorData.details?.join(", ") ||
              errorData.error ||
              `Failed to send message (${response.status})`,
          );
          return;
        }

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
        console.error("Contact form error:", error);
        setStatus("error");
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    },
    [formData],
  );

  const handleInputChange = useCallback(
    (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    [],
  );

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.subject.trim() !== "" &&
      formData.message.trim() !== "" &&
      formData.email.includes("@")
    );
  }, [formData]);

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
                onChange={handleInputChange("name")}
                required
                disabled={status === "sending"}
              />

              <Input
                id="email"
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                required
                disabled={status === "sending"}
              />

              <Input
                id="subject"
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange("subject")}
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
                  onChange={handleInputChange("message")}
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
