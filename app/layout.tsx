import './globals.scss'; // Global styles
import Header from '@/components/Header'; // Navbar component
import Footer from '@/components/Footer'; // Footer component

export const metadata = {
  title: 'LandVille Ventures',
  description: 'Your gateway to real estate and property solutions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />       {/* Navbar across all pages */}
        <main>{children}</main>  {/* Dynamic content for each page */}
        <Footer />       {/* Footer across all pages */}
      </body>
    </html>
  );
}
