"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  currentStream: string;
};

export function StreamSwitcher({ currentStream }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(stream: "ro" | "ru") {
    const newPath = pathname.replace(/^\/(ro|ru)/, `/${stream}`);
    router.push(newPath);
  }

  const isRO = currentStream === "ro";
  const isRU = currentStream === "ru";

  const activeClass =
    "bg-gold text-white shadow-sm cursor-default";
  const inactiveClass =
    "text-gray-500 hover:text-gray-800 cursor-pointer";

  return (
    <div className="flex items-center rounded-md border border-gray-200 overflow-hidden text-xs font-semibold">
      <button
        onClick={() => !isRO && switchTo("ro")}
        className={`px-3 py-1.5 transition-colors ${isRO ? activeClass : inactiveClass}`}
      >
        🇷🇴 RO
      </button>
      <span className="w-px self-stretch bg-gray-200" />
      <button
        onClick={() => !isRU && switchTo("ru")}
        className={`px-3 py-1.5 transition-colors ${isRU ? activeClass : inactiveClass}`}
      >
        🇷🇺 RU
      </button>
    </div>
  );
}
