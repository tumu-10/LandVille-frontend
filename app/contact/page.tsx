import ContactForm from "./ContactForm";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata(
  "Contact",
  "Contact LandVille Ventures in Kampala, Uganda, about real estate, property development, surveying, management, and consultancy.",
  "/contact",
);

export default function ContactPage() {
  return <ContactForm />;
}
