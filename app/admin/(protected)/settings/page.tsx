import { getAllSettings } from "@/server/queries/settings";
import { SettingsForm } from "@/features/settings/SettingsForm";
import { StreamPinForm } from "@/features/settings/StreamPinForm";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  const [settings, pinRO, pinRU] = await Promise.all([
    getAllSettings(),
    prisma.siteSetting.findUnique({ where: { key: "pin_ro" } }),
    prisma.siteSetting.findUnique({ where: { key: "pin_ru" } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки сайта</h1>
        <p className="mt-1 text-sm text-gray-500">
          Глобальные параметры, отображаемые на сайте.
        </p>
      </div>

      <SettingsForm settings={settings} />

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Защита потоков (PIN-коды)
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Установите PIN для каждого потока. Без PIN нельзя редактировать контент чужого потока.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <StreamPinForm stream="RO" hasPin={!!pinRO?.value} />
          <StreamPinForm stream="RU" hasPin={!!pinRU?.value} />
        </div>
      </div>
    </div>
  );
}
