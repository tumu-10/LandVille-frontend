import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk with LandVille Ventures about your real estate and property goals in Uganda.",
};

export default function ContactPage() {
  return <ContactForm />;
}
