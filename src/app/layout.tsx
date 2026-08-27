import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingProvider } from "@/components/loading-provider";
import { Preloader } from "@/components/preloader";
import { LayoutWrapper } from "@/components/layout-wrapper";
import { StructuredData } from "@/components/structured-data";
import { Toaster } from "sonner";
import { getActiveProducts } from "@/lib/product_data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "EcoCatch — BioGAS & Sustainable Energy Solutions | India",
  description:
    "End-to-end biogas plant engineering, manufacturing, and installation across India. Bio-CNG, water treatment, energy audits & EPC consulting since 2016.",
  keywords: [
    "biogas plant india",
    "bio cng plant",
    "waste to energy",
    "biogas engineering mumbai",
    "stp etp solutions",
    "energy audit india",
    "ecocatch",
  ],
  authors: [{ name: "EcoCatch Energy Solutions" }],
  creator: "EcoCatch Energy Solutions Pvt. Ltd.",
  metadataBase: new URL("https://ecocatch.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ecocatch.in",
    siteName: "EcoCatch",
    title: "EcoCatch — BioGAS & Sustainable Energy Solutions",
    description:
      "Transforming organic waste into clean energy. 150+ plants installed across India.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "EcoCatch Biogas Plant" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoCatch — BioGAS & Sustainable Energy Solutions",
    description: "Transforming organic waste into clean energy since 2016.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const allProducts = await getActiveProducts();
  const solutions = allProducts.filter(p => p.productType === "solution");
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <LoadingProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            <Preloader />
            <LayoutWrapper solutions={solutions}>{children}</LayoutWrapper>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}