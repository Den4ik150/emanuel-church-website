import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { MapPin, Phone, Mail, Instagram, Send, Youtube, Facebook } from "lucide-react";
import { ContactForm } from "@/features/contacts/ContactForm";
import { PrayerRequestForm } from "@/features/prayer-requests/PrayerRequestForm";
import { FadeIn } from "@/components/shared/Animate";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";
import { YOUTUBE_CHANNEL_URLS } from "@/lib/youtube";
import { SOCIAL } from "@/lib/social";

export async function generateMetadata({ params }: { params: Promise<{ stream: string }> }): Promise<Metadata> {
  const { stream } = await params;
  const t = getT(streamToLang(stream));
  return { title: t.contacts.pageTitle, description: t.contacts.pageSubtitle };
}

export default async function ContactsPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const t = getT(streamToLang(stream));
  const streamEnum = toStreamEnum(stream);
  const youtubeUrl = YOUTUBE_CHANNEL_URLS[stream];
  const instagramUrl = SOCIAL.instagram[stream as "ro" | "ru"];
  const facebookUrl = SOCIAL.facebook[stream as "ro" | "ru"];

  return (
    <>
      <PageHero title={t.contacts.pageTitle} subtitle={t.contacts.pageSubtitle} />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <FadeIn direction="left" className="space-y-8">
              <div>
                <h2 className="mb-5 font-serif text-xl font-bold text-gray-900">{t.contacts.pageTitle}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <MapPin className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{t.contacts.addressLabel}</p>
                      <p className="text-sm text-gray-600">Strada Pușkin 77, MD-3100, Bălți</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{t.contacts.phoneLabel}</p>
                      <p className="text-sm text-gray-600">+373 231 00 000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Mail className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{t.contacts.emailLabel}</p>
                      <p className="text-sm text-gray-600">info@emmanuel.md</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600">
                  <Facebook className="h-5 w-5" /> Facebook
                </a>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-pink-500">
                  <Instagram className="h-5 w-5" /> Instagram
                </a>
                <a href="#" aria-label="Telegram" className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gold">
                  <Send className="h-5 w-5" /> Telegram
                </a>
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-red-600">
                  <Youtube className="h-5 w-5" /> YouTube
                </a>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <iframe
                  src="https://maps.google.com/maps?q=Strada+Puskin+77,+Balti,+Moldova&output=embed&z=17"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Церковь Эммануил на карте"
                />
                <a
                  href="https://share.google/L6dxie16lB9ZCVHNE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-50 py-2.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gold"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Открыть в Google Maps
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 className="mb-5 font-serif text-xl font-bold text-gray-900">{t.contacts.formTitle}</h2>
              <ContactForm stream={streamEnum} lang={streamToLang(stream)} />
            </FadeIn>
          </div>
        </Container>
      </Section>

      <div className="bg-gray-50">
        <Section>
          <Container>
            <FadeIn className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-gray-900">{t.contacts.prayerTitle}</h2>
                <p className="mt-3 text-gray-500">{t.contacts.prayerText}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                <PrayerRequestForm stream={streamEnum} lang={streamToLang(stream)} />
              </div>
            </FadeIn>
          </Container>
        </Section>
      </div>
    </>
  );
}
