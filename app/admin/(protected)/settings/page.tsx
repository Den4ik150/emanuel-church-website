import { getAllSettings } from "@/server/queries/settings";
import { SettingsForm } from "@/features/settings/SettingsForm";
import { StreamPinForm } from "@/features/settings/StreamPinForm";
import { prisma } from "@/lib/prisma";
import { getAdminStream } from "@/lib/admin-stream";
import { getAdminT } from "@/lib/translations/admin";

export default async function AdminSettingsPage() {
  const adminStream = await getAdminStream();
  const t = getAdminT(adminStream);

  const [settings, pinRO, pinRU] = await Promise.all([
    getAllSettings(),
    prisma.siteSetting.findUnique({ where: { key: "pin_ro" } }),
    prisma.siteSetting.findUnique({ where: { key: "pin_ru" } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t.settings.heading}</h1>
        <p className="mt-1 text-sm text-gray-500">{t.settings.desc}</p>
      </div>

      <SettingsForm settings={settings} />

      <div>
        <h2 className="mb-1 text-lg font-semibold text-gray-900">{t.settings.pinHeading}</h2>
        <p className="mb-4 text-sm text-gray-500">{t.settings.pinDesc}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <StreamPinForm stream="RO" hasPin={!!pinRO?.value} />
          <StreamPinForm stream="RU" hasPin={!!pinRU?.value} />
        </div>
      </div>
    </div>
  );
}
