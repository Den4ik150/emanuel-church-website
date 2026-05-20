"use client";

import { useTransition, useState } from "react";
import { upsertSetting } from "@/server/actions/settings";

interface Setting {
  id: string;
  key: string;
  value: string;
  group: string | null;
}

interface SettingsFormProps {
  settings: Setting[];
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.key, s.value]))
  );
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const handleSave = (key: string) => {
    startTransition(async () => {
      await upsertSetting(key, values[key] ?? "");
      setSaved((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setSaved((prev) => ({ ...prev, [key]: false })), 2000);
    });
  };

  if (settings.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
        Настроек пока нет. Добавьте их через базу данных или сидер.
      </div>
    );
  }

  const groups = Array.from(new Set(settings.map((s) => s.group ?? "Общие")));

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const groupSettings = settings.filter(
          (s) => (s.group ?? "Общие") === group
        );
        return (
          <div
            key={group}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {group}
              </p>
            </div>
            <div className="divide-y divide-gray-100">
              {groupSettings.map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-center gap-4 px-4 py-3"
                >
                  <div className="w-48 shrink-0">
                    <p className="text-sm font-medium text-gray-700">
                      {setting.key}
                    </p>
                  </div>
                  <input
                    value={values[setting.key] ?? ""}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        [setting.key]: e.target.value,
                      }))
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                  />
                  <button
                    onClick={() => handleSave(setting.key)}
                    disabled={isPending}
                    className="shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
                    style={{
                      background: saved[setting.key]
                        ? "oklch(0.72 0.14 84 / 0.15)"
                        : undefined,
                      color: saved[setting.key] ? "oklch(0.58 0.14 84)" : "#6b7280",
                    }}
                  >
                    {saved[setting.key] ? "Сохранено ✓" : "Сохранить"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
