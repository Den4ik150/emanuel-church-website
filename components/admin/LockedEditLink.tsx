"use client";

import { useRouter } from "next/navigation";
import { CrossStreamLockModal } from "./CrossStreamLockModal";
import Link from "next/link";

interface Props {
  href: string;
  itemStream: "RO" | "RU";
  adminStream: "RO" | "RU" | null;
}

export function LockedEditLink({ href, itemStream, adminStream }: Props) {
  const router = useRouter();
  const needsLock = adminStream !== null && adminStream !== itemStream;

  if (!needsLock) {
    return (
      <Link
        href={href}
        className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
      >
        Изменить
      </Link>
    );
  }

  return (
    <CrossStreamLockModal
      itemStream={itemStream}
      adminStream={adminStream}
      onUnlocked={() => router.push(href)}
      label="Изменить"
      className="rounded-md px-3 py-1.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-50 flex items-center gap-1"
    />
  );
}
