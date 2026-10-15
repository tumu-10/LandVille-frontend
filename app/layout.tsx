import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Preloader from "@/components/Preloader";

export const metadata = {
  title: {
    default: "LandVille Ventures | A place to begin what's next",
    template: "%s | LandVille Ventures",
  },
  description:
    "LandVille Ventures brings people, property, and possibility together through real estate, development, and technology in Uganda.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
