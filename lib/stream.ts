import type { Stream } from "@/lib/generated/prisma/client";

export const VALID_STREAMS = ["ro", "ru"] as const;
export type StreamSlug = (typeof VALID_STREAMS)[number];

/** Convert URL segment to Prisma Stream enum value */
export function toStreamEnum(stream: string): Stream {
  return stream.toUpperCase() as Stream;
}

/** Check if stream slug is valid */
export function isValidStream(stream: string): stream is StreamSlug {
  return VALID_STREAMS.includes(stream as StreamSlug);
}
