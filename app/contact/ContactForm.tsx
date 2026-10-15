"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import styles from "./contact.module.scss";
import WordCycle from "@/components/WordCycle";

export default function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSending(true);
    setStatusMessage("");
    setHasError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setHasError(true);
        setStatusMessage(result.error ?? "We could not send your message. Please try again.");
        return;
      }

      form.reset();
      setStatusMessage("Thanks for reaching out. Your message has been sent to our team.");
    } catch {
      setHasError(true);
      setStatusMessage("We could not send your message. Please check your connection and try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className={styles.contact}>
      <section className={styles.hero}>
        <Image src="/office.jpg" alt="A welcoming LandVille workspace" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}><span /> Contact</p>
          <h1>Every good thing<br />starts with <em><WordCycle words={["hello.", "talk.", "what's next."]} /></em></h1>
          <p>Tell us what you&apos;re thinking about. We&apos;re ready to listen.</p>
        </div>
      </section>
      <section className={styles.contactBody}>
        <div className={styles.contactDetails}>
          <div className={styles.sectionLabel}>Find us, or drop us a line</div>
          <h2>We&apos;re here<br /><em>to help you move.</em></h2>
          <a href="mailto:landvilleventures@gmail.com"><FiMail aria-hidden="true" /><span><small>Email</small>landvilleventures@gmail.com</span></a>
          <a href="tel:+256774413516"><FiPhone aria-hidden="true" /><span><small>Call</small>+256 774 413 516</span></a>
          <a href="https://www.google.com/maps/place/Kyanja+Mall/@0.3957122,32.5951815,15.04z/" target="_blank" rel="noreferrer"><FiMapPin aria-hidden="true" /><span><small>Visit</small>Kyanja, Kampala, Uganda</span></a>
          <p className={styles.locationNote}>Our office is in Kyanja, Kampala. Get in touch and we&apos;ll help you find us.</p>
        </div>
        <form className={styles.form} onSubmit={sendMessage}>
          <h3>What can we help with?</h3>
          <p>Send our team a note and we&apos;ll get back to you as soon as we can.</p>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
          <label htmlFor="contact-message">A little about your plans</label>
          <textarea id="contact-message" name="message" rows={5} required />
          <button type="submit" disabled={isSending}>
            {isSending ? "Sending…" : "Send message"} <span aria-hidden="true">↗</span>
          </button>
          {statusMessage && (
            <p className={styles.formNote} role={hasError ? "alert" : "status"}>
              {statusMessage}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
