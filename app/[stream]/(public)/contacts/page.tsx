import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { MapPin, Phone, Mail, Instagram, Send, Youtube } from "lucide-react";
import { ContactForm } from "@/features/contacts/ContactForm";
import { PrayerRequestForm } from "@/features/prayer-requests/PrayerRequestForm";
import { getT, streamToLang } from "@/lib/translations";
import { toStreamEnum, isValidStream } from "@/lib/stream";

export default async function ContactsPage({ params }: { params: Promise<{ stream: string }> }) {
  const { stream } = await params;
  if (!isValidStream(stream)) notFound();
  const t = getT(streamToLang(stream));
  const streamEnum = toStreamEnum(stream);

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{t.contacts.pageTitle}</h1>
            <p className="mt-2 text-gray-500">{t.contacts.pageSubtitle}</p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="mb-5 text-xl font-bold text-gray-900">{t.contacts.formTitle}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <MapPin className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{t.contacts.addressLabel}</p>
                      <p className="text-sm text-gray-600">Bălți, str. Pușkin, 1, Moldova</p>
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
                      <p className="text-sm text-gray-600">info@emmanuil.md</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <a href="#" aria-label="Instagram" className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gold">
                  <Instagram className="h-5 w-5" /> Instagram
                </a>
                <a href="#" aria-label="Telegram" className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gold">
                  <Send className="h-5 w-5" /> Telegram
                </a>
                <a href="#" aria-label="YouTube" className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gold">
                  <Youtube className="h-5 w-5" /> YouTube
                </a>
              </div>
              <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-100">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  <p className="text-sm text-gray-400">Hartă / Карта</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-5 text-xl font-bold text-gray-900">{t.contacts.formTitle}</h2>
              <ContactForm stream={streamEnum} lang={streamToLang(stream)} />
            </div>
          </div>
        </Container>
      </Section>

      <div className="bg-gray-50">
        <Section>
          <Container>
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">{t.contacts.prayerTitle}</h2>
                <p className="mt-3 text-gray-500">{t.contacts.prayerText}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                <PrayerRequestForm stream={streamEnum} lang={streamToLang(stream)} />
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
