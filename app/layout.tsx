import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Церковь Эммануил | Бельцы",
  description: "Официальный сайт церкви Эммануил, Бельцы, русский поток.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}