import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import { AuthProvider } from "@/contexts/AuthContext";
import { ContentProvider } from "@/contexts/ContentContext";

export const metadata: Metadata = {
  title: "EastDocs Studios — Podcast, YouTube & Livestream Studio in London",
  description: "Book London's most creative podcast and content studio. Shoot, record, or stream with EastDocs Studios.",
  keywords: ["podcast studio", "content studio", "video production", "livestream studio", "London", "YouTube recording"],
  openGraph: {
    title: "EastDocs Studios — Podcast, YouTube & Livestream Studio in London",
    description: "Book London's most creative podcast and content studio. Shoot, record, or stream with EastDocs Studios.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="smooth-scroll" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <ContentProvider>
            <Preloader />
            <Navbar />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
          </ContentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
