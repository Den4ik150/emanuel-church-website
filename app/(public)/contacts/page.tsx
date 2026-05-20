import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { MapPin, Phone, Mail, Instagram, Send, Youtube } from "lucide-react";
import { ContactForm } from "@/features/contacts/ContactForm";
import { PrayerRequestForm } from "@/features/prayer-requests/PrayerRequestForm";

export default function ContactsPage() {
  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Связь</p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Контакты</h1>
            <p className="mt-2 text-gray-500">
              Мы будем рады услышать вас. Приходите или напишите нам.
            </p>
          </div>
        </Container>
      </div>

      {/* Contact info + contact form */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-5 text-xl font-bold text-gray-900">Как с нами связаться</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <MapPin className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Адрес</p>
                      <p className="text-sm text-gray-600">г. Бельцы, ул. Пушкина, 1, Молдова</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Телефон</p>
                      <p className="text-sm text-gray-600">+373 231 00 000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Mail className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">info@emmanuil.md</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Социальные сети</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gold"
                  >
                    <Instagram className="h-5 w-5" /> Instagram
                  </a>
                  <a
                    href="#"
                    aria-label="Telegram"
                    className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gold"
                  >
                    <Send className="h-5 w-5" /> Telegram
                  </a>
                  <a
                    href="#"
                    aria-label="YouTube"
                    className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gold"
                  >
                    <Youtube className="h-5 w-5" /> YouTube
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-100">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  <p className="text-sm text-gray-400">Карта будет добавлена</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="mb-5 text-xl font-bold text-gray-900">Напишите нам</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* Prayer request section */}
      <div className="bg-gray-50">
        <Section>
          <Container>
            <div className="mx-auto max-w-2xl">
              <div className="mb-8 text-center">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  Молитва
                </p>
                <h2 className="text-2xl font-bold text-gray-900">Молитвенная просьба</h2>
                <p className="mt-3 text-gray-500">
                  Мы верим в силу молитвы. Оставьте свою просьбу — пасторская команда будет
                  молиться вместе с вами.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
                <PrayerRequestForm />
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}
