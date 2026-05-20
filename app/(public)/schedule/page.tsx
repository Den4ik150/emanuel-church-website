import { Clock, MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { getActiveScheduleItems } from "@/server/queries/schedule";

const WEEKDAY_ORDER = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export default async function SchedulePage() {
  const items = await getActiveScheduleItems();

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.weekday]) acc[item.weekday] = [];
    acc[item.weekday].push(item);
    return acc;
  }, {});

  const sortedDays = Object.keys(grouped).sort(
    (a, b) => WEEKDAY_ORDER.indexOf(a) - WEEKDAY_ORDER.indexOf(b)
  );

  return (
    <>
      <div className="border-b border-gray-100 bg-gray-50">
        <Container>
          <div className="py-12 lg:py-16">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              Регулярно
            </p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Расписание
            </h1>
            <p className="mt-2 text-gray-500">
              Регулярные встречи и собрания нашей церкви.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <Container>
          {items.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              Расписание скоро появится
            </div>
          ) : (
            <div className="max-w-2xl space-y-8">
              {sortedDays.map((day) => (
                <div key={day}>
                  <h2 className="mb-4 border-b border-gray-100 pb-2 text-lg font-bold text-gray-900">
                    {day}
                  </h2>
                  <div className="space-y-3">
                    {grouped[day].map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 rounded-xl border border-gray-200 p-5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                          <Clock className="h-5 w-5 text-gold" />
                        </div>
                        <div>
                          <div className="mb-1 flex flex-wrap items-center gap-3">
                            <h3 className="font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <span className="text-sm font-medium text-gold">
                              {item.startTime}
                              {item.endTime && ` – ${item.endTime}`}
                            </span>
                          </div>
                          {item.description && (
                            <p className="mb-1 text-sm text-gray-600">
                              {item.description}
                            </p>
                          )}
                          {item.location && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                              <MapPin className="h-3.5 w-3.5" />
                              <span>{item.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 max-w-2xl rounded-xl border border-gold/30 bg-gold/5 p-6">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Обратите внимание:</span>{" "}
              расписание может меняться в праздничные дни. Актуальную
              информацию уточняйте в наших соцсетях или по телефону.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
