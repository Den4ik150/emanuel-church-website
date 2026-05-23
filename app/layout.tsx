import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthSessionProvider } from "@/components/shared/AuthSessionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Biserica Emanuel Bălți",
    default: "Biserica Emanuel Bălți",
  },
  description:
    "Site oficial al Bisericii Emanuel din Bălți, Moldova. Flux român și flux rus.",
  metadataBase: new URL("https://www.emmanuel.md"),
  openGraph: {
    type: "website",
    siteName: "Biserica Emanuel Bălți",
    images: [
      {
        url: "https://res.cloudinary.com/dcml2gd8n/image/upload/w_1200,h_630,c_fill,g_auto/emmanuil-church/hero/church-exterior.jpg",
        width: 1200,
        height: 630,
        alt: "Biserica Emanuel Bălți",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthSessionProvider>{children}</AuthSessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
