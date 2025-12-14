import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { StoreProvider } from "@/hooks/utils/StoreProvider";
import Navbarmenu from "./_components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Product Management Dashboard",
    template: "%s | Product Dashboard",
  },
  description: "A comprehensive dashboard for managing your product inventory, tracking sales, and growing your business.",
  keywords: ["dashboard", "product management", "inventory", "sales", "ecommerce"],
  authors: [{ name: "Shubhradeep" }],
  creator: "Shubhradeep",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Product Management Dashboard",
    description: "Manage your products with ease using our premium dashboard.",
    siteName: "Product Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Management Dashboard",
    description: "Manage your products with ease using our premium dashboard.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning >
        <StoreProvider>
          <Navbarmenu />
          <Toaster position="top-right" richColors />
          <div className="pt-24 min-h-screen">
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
