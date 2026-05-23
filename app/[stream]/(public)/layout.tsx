import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HtmlLang } from "@/components/shared/HtmlLang";
import { isValidStream } from "@/lib/stream";
import { getT, streamToLang } from "@/lib/translations";

const OG_IMAGE =
  "https://res.cloudinary.com/dcml2gd8n/image/upload/w_1200,h_630,c_fill,g_auto/emmanuil-church/hero/church-exterior.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stream: string }>;
}): Promise<Metadata> {
  const { stream } = await params;
  if (!isValidStream(stream)) return {};

  const t = getT(streamToLang(stream));
  const isRu = stream === "ru";

  const siteName = isRu ? "Церковь Эммануил Бельцы" : "Biserica Emanuel Bălți";
  const description = isRu
    ? "Официальный сайт церкви Эммануил, Бельцы, Молдова. Русский поток."
    : "Site oficial al Bisericii Emanuel din Bălți, Moldova. Flux român.";

  return {
    title: {
      template: `%s | ${siteName}`,
      default: siteName,
    },
    description,
    openGraph: {
      type: "website",
      locale: t.stream.locale,
      siteName,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      languages: {
        "ro": `/ro`,
        "ru": `/ru`,
      },
    },
  };
}

const CHURCH_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Церковь Эммануил / Biserica Emanuel",
  url: "https://www.emmanuel.md",
  logo: "https://www.emmanuel.md/favicon.ico",
  image:
    "https://res.cloudinary.com/dcml2gd8n/image/upload/emmanuil-church/hero/church-exterior.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strada Pușkin 77",
    addressLocality: "Bălți",
    postalCode: "MD-3100",
    addressCountry: "MD",
  },
  email: "info@emmanuel.md",
  sameAs: [
    "https://www.facebook.com/EmmanuilBalti",
    "https://www.instagram.com/emmanuil.balti",
  ],
};

export default async function StreamPublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ stream: string }>;
}) {
  const { stream } = await params;

  if (!isValidStream(stream)) notFound();

  return (
    <>
      <HtmlLang stream={stream} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CHURCH_JSON_LD) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header stream={stream} />
        <main className="flex-1">{children}</main>
        <Footer stream={stream} />
      </div>
    </>
  );
}
