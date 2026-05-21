"use client";

import { useState, useCallback, useTransition } from "react";
import { Upload, X, Trash2, ImageIcon, Loader2 } from "lucide-react";
import { addGalleryItem, deleteGalleryItem } from "@/server/actions/gallery-items";

interface GalleryItem {
  id: string;
  fileUrl: string;
  thumbnailUrl: string | null;
  title: string | null;
  displayOrder: number;
}

interface Props {
  albumId: string;
  initialItems: GalleryItem[];
}

interface UploadingFile {
  id: string;
  name: string;
  preview: string;
  status: "uploading" | "done" | "error";
  error?: string;
}

export function GalleryItemsManager({ albumId, initialItems }: Props) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [uploading, setUploading] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [, startTransition] = useTransition();

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const allowed = fileArray.filter((f) =>
        ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(f.type)
      );

      if (allowed.length === 0) return;

      // Add placeholders
      const placeholders: UploadingFile[] = allowed.map((f) => ({
        id: Math.random().toString(36).slice(2),
        name: f.name,
        preview: URL.createObjectURL(f),
        status: "uploading",
      }));
      setUploading((prev) => [...prev, ...placeholders]);

      // Upload each file
      await Promise.all(
        allowed.map(async (file, i) => {
          const placeholder = placeholders[i];
          try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              const err = await res.json();
              throw new Error(err.error ?? "Upload failed");
            }

            const { url, thumbnailUrl } = await res.json();

            // Save to DB
            await addGalleryItem({
              albumId,
              fileUrl: url,
              thumbnailUrl,
              displayOrder: items.length + i,
            });

            // Add to local list
            setItems((prev) => [
              ...prev,
              {
                id: placeholder.id,
                fileUrl: url,
                thumbnailUrl,
                title: null,
                displayOrder: prev.length,
              },
            ]);

            setUploading((prev) =>
              prev.map((u) =>
                u.id === placeholder.id ? { ...u, status: "done" } : u
              )
            );
          } catch (err) {
            setUploading((prev) =>
              prev.map((u) =>
                u.id === placeholder.id
                  ? { ...u, status: "error", error: (err as Error).message }
                  : u
              )
            );
          }
        })
      );

      // Remove done/error placeholders after a short delay
      setTimeout(() => {
        setUploading((prev) => prev.filter((u) => u.status === "uploading"));
      }, 1500);
    },
    [albumId, items.length]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files);
  };

  const handleDelete = (item: GalleryItem) => {
    if (!confirm("Удалить фото? Действие необратимо.")) return;
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    startTransition(() => deleteGalleryItem(item.id, albumId));
  };

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-colors ${
          isDragging
            ? "border-gold bg-gold/5"
            : "border-gray-300 bg-white hover:border-gray-400"
        }`}
      >
        <div className="rounded-full bg-gray-100 p-3">
          <Upload className="h-6 w-6 text-gray-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            Перетащи фото сюда
          </p>
          <p className="text-xs text-gray-400">или</p>
        </div>
        <label className="cursor-pointer rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark">
          Выбрать файлы
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileInput}
          />
        </label>
        <p className="text-xs text-gray-400">JPG, PNG, WebP, GIF · до 10 МБ каждый</p>
      </div>

      {/* Uploading placeholders */}
      {uploading.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {uploading.map((u) => (
            <div
              key={u.id}
              className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u.preview} alt={u.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                {u.status === "uploading" && (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                )}
                {u.status === "done" && (
                  <div className="rounded-full bg-green-500 p-1">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {u.status === "error" && (
                  <div className="flex flex-col items-center gap-1 px-2 text-center">
                    <X className="h-5 w-5 text-red-400" />
                    <p className="text-xs text-white">{u.error}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo grid */}
      {items.length === 0 && uploading.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <ImageIcon className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm text-gray-400">В альбоме пока нет фото</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumbnailUrl ?? item.fileUrl}
                alt={item.title ?? ""}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              {/* Delete overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                <button
                  onClick={() => handleDelete(item)}
                  className="scale-75 rounded-full bg-red-500 p-2 text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100"
                  title="Удалить"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <p className="text-xs text-gray-400">
          Всего фото: {items.length}
        </p>
      )}
    </div>
  );
}
