"use client";

import { useState, useTransition } from "react";
import { Lock, CheckCircle, Eye, EyeOff } from "lucide-react";
import { saveStreamPin } from "@/server/actions/verify-stream-pin";

interface Props {
  stream: "RO" | "RU";
  hasPin: boolean;
}

export function StreamPinForm({ stream, hasPin }: Props) {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const label = stream === "RO" ? "🇷🇴 Румынский поток" : "🇷🇺 Русский поток";
  const borderColor = stream === "RO" ? "border-blue-200" : "border-emerald-200";
  const badgeBg = stream === "RO" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const result = await saveStreamPin(stream, pin);
      if (result.success) {
        setSaved(true);
        setPin("");
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(result.error ?? "Ошибка сохранения");
      }
    });
  }

  return (
    <div className={`rounded-xl border ${borderColor} bg-white p-5`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-gray-400" />
          <span className="font-medium text-sm text-gray-900">{label}</span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeBg}`}>
          {hasPin ? "PIN задан ✓" : "Не задан"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type={showPin ? "text" : "password"}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder={hasPin ? "Изменить PIN..." : "Новый PIN (мин. 4 символа)"}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 pr-9 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
        {saved && (
          <p className="text-xs text-green-600 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" /> PIN сохранён
          </p>
        )}

        <button
          type="submit"
          disabled={isPending || !pin}
          className="w-full rounded-lg bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold-dark disabled:opacity-50 transition-colors"
        >
          {isPending ? "Сохранение..." : hasPin ? "Изменить PIN" : "Сохранить PIN"}
        </button>
      </form>
    </div>
  );
}
