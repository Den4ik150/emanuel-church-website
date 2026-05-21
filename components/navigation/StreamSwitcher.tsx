"use client";

import { Fragment } from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  currentStream: string;
};

const STREAMS = {
  ro: { flag: "🇷🇴", short: "RO", name: "Flux Român" },
  ru: { flag: "🇷🇺", short: "RU", name: "Русский поток" },
} as const;

export function StreamSwitcher({ currentStream }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(stream: "ro" | "ru") {
    const newPath = pathname.replace(/^\/(ro|ru)/, `/${stream}`);
    router.push(newPath);
  }

  return (
    <div className="flex items-center">
      {/* Toggle */}
      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold">
        {(["ro", "ru"] as const).map((stream, i) => {
          const isActive = currentStream === stream;
          return (
            <Fragment key={stream}>
              {i > 0 && <span className="w-px self-stretch bg-gray-200" />}
              <button
                onClick={() => !isActive && switchTo(stream)}
                className={`flex items-center gap-1.5 transition-colors
                  px-2.5 py-1.5 sm:px-3 sm:py-1.5
                  ${isActive
                    ? "bg-gold text-white cursor-default"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
              >
                <span>{STREAMS[stream].flag}</span>
                {/* Full name on desktop, short code on mobile */}
                <span className="hidden sm:inline">{STREAMS[stream].name}</span>
                <span className="sm:hidden">{STREAMS[stream].short}</span>
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
