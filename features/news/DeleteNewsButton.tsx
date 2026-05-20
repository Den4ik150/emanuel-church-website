"use client";

import { useTransition } from "react";
import { deleteNews } from "@/server/actions/news";

export function DeleteNewsButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Удалить эту новость? Действие необратимо.")) return;
    startTransition(() => deleteNews(id));
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      {isPending ? "..." : "Удалить"}
    </button>
  );
}
