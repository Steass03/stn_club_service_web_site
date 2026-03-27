import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layouts/Header";
import Footer from "@/components/Layouts/Footer";
import { siteConfig } from "@/config/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.siteName} — Автосервіс`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.tagline,
  viewport: { width: "device-width", initialScale: 1 },
  icons: {
    icon: [{ url: siteConfig.logoSrc, type: "image/png" }],
    apple: siteConfig.logoSrc,
  },
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.tagline,
    siteName: siteConfig.siteName,
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: siteConfig.logoSrc,
        alt: `${siteConfig.siteName} — логотип`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.tagline,
    images: [siteConfig.logoSrc],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="cyber-bg text-white min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-1 w-full min-h-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
