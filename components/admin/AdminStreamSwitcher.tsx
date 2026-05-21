"use client";

import { useTransition } from "react";
import { setAdminStream } from "@/server/actions/set-admin-stream";

interface Props {
  current: "RO" | "RU" | null;
}

export function AdminStreamSwitcher({ current }: Props) {
  const [isPending, startTransition] = useTransition();

  const btn = (stream: "RO" | "RU" | "ALL", label: string) => {
    const isActive =
      stream === "ALL" ? current === null : current === stream;
    return (
      <button
        key={stream}
        onClick={() => startTransition(() => setAdminStream(stream))}
        disabled={isPending || isActive}
        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
          isActive
            ? "bg-gold text-white shadow-sm cursor-default"
            : "text-gray-500 hover:bg-gray-100 disabled:opacity-50"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 p-0.5">
      {btn("ALL", "Все")}
      {btn("RO", "🇷🇴 RO")}
      {btn("RU", "🇷🇺 RU")}
    </div>
  );
}
