"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { setAdminStream } from "@/server/actions/set-admin-stream";

interface Props {
  current: "RO" | "RU" | null;
}

// Pages where switching stream is blocked (editing/creating content)
function useIsEditing() {
  const pathname = usePathname();
  return /\/(new|edit)/.test(pathname);
}

export function AdminStreamSwitcher({ current }: Props) {
  const [isPending, startTransition] = useTransition();
  const isEditing = useIsEditing();

  const btn = (stream: "RO" | "RU") => {
    const isActive = current === stream;
    return (
      <button
        key={stream}
        onClick={() => !isEditing && startTransition(() => setAdminStream(stream))}
        disabled={isPending || isActive || isEditing}
        title={isEditing ? "Сохрани или отмени изменения перед переключением потока" : undefined}
        className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
          isActive
            ? "bg-gold text-white shadow-sm cursor-default"
            : isEditing
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100"
        }`}
      >
        {stream === "RO" ? "🇷🇴 RO" : "🇷🇺 RU"}
      </button>
    );
  };

  return (
    <div className={`flex items-center gap-0.5 rounded-lg border bg-gray-50 p-0.5 transition-colors ${
      isEditing ? "border-gray-100 opacity-60" : "border-gray-200"
    }`}>
      {btn("RO")}
      {btn("RU")}
      {isEditing && (
        <span className="px-2 text-xs text-gray-400">🔒</span>
      )}
    </div>
  );
}
