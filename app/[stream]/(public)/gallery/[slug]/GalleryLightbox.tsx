"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Item = { id: string; fileUrl: string; title?: string | null };

export function GalleryLightbox({ items }: { items: Item[] }) {
  const [current, setCurrent] = useState<number | null>(null);

  const open = (idx: number) => setCurrent(idx);
  const close = () => setCurrent(null);
  const prev = () => setCurrent((i) => (i !== null ? (i - 1 + items.length) % items.length : null));
  const next = () => setCurrent((i) => (i !== null ? (i + 1) % items.length : null));

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => open(idx)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 focus:outline-none"
          >
            <Image
              src={item.fileUrl}
              alt={item.title ?? ""}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={close}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[current].fileUrl}
              alt={items[current].title ?? ""}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Counter */}
          <p className="absolute bottom-4 text-sm text-white/60">
            {current + 1} / {items.length}
          </p>
        </div>
      )}
    </>
  );
}
