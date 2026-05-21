import { ru } from "./ru";
import { ro } from "./ro";
import { en } from "./en";

export type Lang = "ru" | "ro" | "en";
export type { Translations } from "./ru";

const translations = { ru, ro, en } as const;

export function getT(lang: Lang) {
  return translations[lang] ?? translations.ru;
}

/** Map stream slug to its native language */
export function streamToLang(stream: string): Lang {
  if (stream === "ro") return "ro";
  if (stream === "ru") return "ru";
  return "ro";
}
