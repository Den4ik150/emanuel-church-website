"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  currentStream: string;
};

const STREAMS = {
  ro: { flag: "🇷🇴", short: "RO", name: "Flux Român" },
  ru: { flag: "🇷🇺", short: "RU", name: "Русский" },
} as const;

export function StreamSwitcher({ currentStream }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(stream: "ro" | "ru") {
    const newPath = pathname.replace(/^\/(ro|ru)/, `/${stream}`);
    router.push(newPath);
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-[#1A1A2E] p-1">
      {(["ro", "ru"] as const).map((stream) => {
        const isActive = currentStream === stream;
        return (
          <button
            key={stream}
            onClick={() => !isActive && switchTo(stream)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200
              ${isActive
                ? "bg-gold text-white shadow-sm"
                : "text-white/55 hover:text-white/90"
              }`}
          >
            <span className="text-sm leading-none">{STREAMS[stream].flag}</span>
            <span className="hidden sm:inline">{STREAMS[stream].name}</span>
            <span className="sm:hidden">{STREAMS[stream].short}</span>
          </button>
        );
      })}
    </div>
  );
}
