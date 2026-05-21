export function StreamBadge({ stream }: { stream: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
        stream === "RO"
          ? "bg-blue-50 text-blue-700"
          : "bg-emerald-50 text-emerald-700"
      }`}
    >
      {stream === "RO" ? "🇷🇴 RO" : "🇷🇺 RU"}
    </span>
  );
}
