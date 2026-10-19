import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MetaPixel from "@/components/MetaPixel";
import Preloader from "@/components/Preloader";
import { SITE_URL } from "./seo";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LandVille Ventures",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "LandVille Ventures is a Kampala, Uganda company working across real estate, property development, and technology.",
  email: "landvilleventures@gmail.com",
  telephone: "+256774413516",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kampala",
    addressCountry: "UG",
  },
  sameAs: [
    "https://facebook.com/LandvilleVentures",
    "https://instagram.com/LandvilleVentures",
  ],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LandVille Ventures | Real Estate & Property in Uganda",
    template: "%s | LandVille Ventures",
  },
  description:
    "LandVille Ventures is a Kampala, Uganda company offering real estate, property development, construction, surveying, management, and consultancy services.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "LandVille Ventures",
    title: "LandVille Ventures | Real Estate & Property in Uganda",
    description:
      "Explore LandVille Ventures' real estate, property development, and property services in Uganda.",
    images: [
      {
        url: "/The%20Hills%20Project%20-%20Nii%20Ofoe.jpg",
        alt: "A contemporary property featured by LandVille Ventures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LandVille Ventures | Real Estate & Property in Uganda",
    description:
      "Explore LandVille Ventures' real estate, property development, and property services in Uganda.",
    images: ["/The%20Hills%20Project%20-%20Nii%20Ofoe.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
          }}
        />
        <Preloader />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MetaPixel />
      </body>
    </html>
  );
}
