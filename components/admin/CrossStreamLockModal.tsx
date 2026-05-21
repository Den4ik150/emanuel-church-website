"use client";

import { useState, useTransition } from "react";
import { Lock, X, Eye, EyeOff } from "lucide-react";
import { verifyStreamPin } from "@/server/actions/verify-stream-pin";

interface Props {
  /** Stream of the item being edited/deleted */
  itemStream: "RO" | "RU";
  /** Stream the admin is currently working in */
  adminStream: "RO" | "RU" | null;
  /** The action to run once unlocked */
  onUnlocked: () => void;
  /** Button label (e.g. "Редактировать" / "Удалить") */
  label: string;
  /** Optional className override for the trigger button */
  className?: string;
  /** Destructive = red button */
  destructive?: boolean;
}

export function CrossStreamLockModal({
  itemStream,
  adminStream,
  onUnlocked,
  label,
  className,
  destructive = false,
}: Props) {
  const needsLock = adminStream !== null && adminStream !== itemStream;

  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // No lock needed — act directly
  if (!needsLock) {
    return (
      <button onClick={onUnlocked} className={className}>
        {label}
      </button>
    );
  }

  const otherLabel = itemStream === "RO" ? "🇷🇴 Румынского" : "🇷🇺 Русского";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await verifyStreamPin(itemStream, pin);
      if (result.success) {
        setOpen(false);
        setPin("");
        onUnlocked();
      } else {
        setError(result.error ?? "Неверный PIN");
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          className ??
          (destructive
            ? "text-xs text-red-500 hover:text-red-700 font-medium"
            : "text-xs text-gold hover:text-gold-dark font-medium")
        }
      >
        <Lock className="inline h-3 w-3 mr-0.5 -mt-0.5" />
        {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-white shadow-xl p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                  <Lock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Доступ ограничен</p>
                  <p className="text-xs text-gray-500">Контент {otherLabel} потока</p>
                </div>
              </div>
              <button
                onClick={() => { setOpen(false); setPin(""); setError(null); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Введите PIN {otherLabel} потока, чтобы изменить этот контент.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Введите PIN"
                  autoFocus
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { setOpen(false); setPin(""); setError(null); }}
                  className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isPending || !pin}
                  className="flex-1 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-white hover:bg-gold-dark disabled:opacity-50"
                >
                  {isPending ? "Проверка..." : "Подтвердить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
