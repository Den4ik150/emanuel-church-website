import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { MapPin, Phone, Mail, Instagram, Send, Youtube } from "lucide-react";

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
                      <p className="text-sm text-gray-600">г. Бельцы, ул. Placeholder, 1, Молдова</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Phone className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Телефон</p>
                      <p className="text-sm text-gray-600">+373 — — — — — —</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                      <Mail className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">emmanuil@example.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Социальные сети</h3>
                <div className="flex gap-4">
                  <a href="#" aria-label="Instagram" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold transition-colors">
                    <Instagram className="h-5 w-5" /> Instagram
                  </a>
                  <a href="#" aria-label="Telegram" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold transition-colors">
                    <Send className="h-5 w-5" /> Telegram
                  </a>
                  <a href="#" aria-label="YouTube" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold transition-colors">
                    <Youtube className="h-5 w-5" /> YouTube
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-video w-full rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  <p className="text-sm text-gray-400">Карта будет добавлена</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="mb-5 text-xl font-bold text-gray-900">Напишите нам</h2>
              <form className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="ivan@example.com"
                    className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Телефон (необязательно)</label>
                  <input
                    type="tel"
                    placeholder="+373 000 000 00"
                    className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Сообщение</label>
                  <textarea
                    rows={5}
                    placeholder="Ваше сообщение..."
                    className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
