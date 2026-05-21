"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeftRight } from "lucide-react";

type Props = {
  currentStream: string;
  switchLabel: string;
};

export function StreamSwitcher({ currentStream, switchLabel }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function handleSwitch() {
    const otherStream = currentStream === "ro" ? "ru" : "ro";
    // Replace /ro/ or /ru/ prefix at the start of the path
    const newPath = pathname.replace(/^\/(ro|ru)/, `/${otherStream}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-gold/50 hover:text-gold"
    >
      <ArrowLeftRight className="h-3.5 w-3.5" />
      <span>{switchLabel}</span>
    </button>
  );
}
