"use client";

import { useTransition } from "react";
import { CrossStreamLockModal } from "./CrossStreamLockModal";

interface Props {
  itemStream: "RO" | "RU";
  adminStream: "RO" | "RU" | null;
  deleteAction: () => Promise<void>;
  confirmText?: string;
  label?: string;
}

export function LockedDeleteButton({
  itemStream,
  adminStream,
  deleteAction,
  confirmText = "Удалить? Действие необратимо.",
  label = "Удалить",
}: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(confirmText)) return;
    startTransition(deleteAction);
  }

  return (
    <CrossStreamLockModal
      itemStream={itemStream}
      adminStream={adminStream}
      onUnlocked={handleDelete}
      label={isPending ? "..." : label}
      className="rounded-md px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
      destructive
    />
  );
}
