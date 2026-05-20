import { getAllSettings } from "@/server/queries/settings";
import { SettingsForm } from "@/features/settings/SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Настройки сайта</h1>
        <p className="mt-1 text-sm text-gray-500">
          Глобальные параметры, отображаемые на сайте.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  );
}
