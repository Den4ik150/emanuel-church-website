"use client";

import { useTransition } from "react";
import { deleteAlbum } from "@/server/actions/gallery";

export function DeleteAlbumButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm("Удалить этот альбом и все его фото? Действие необратимо.")) return;
    startTransition(() => deleteAlbum(id));
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
