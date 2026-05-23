"use client";

import { useEffect } from "react";

export function HtmlLang({ stream }: { stream: string }) {
  useEffect(() => {
    document.documentElement.lang = stream === "ru" ? "ru" : "ro";
  }, [stream]);

  return null;
}
