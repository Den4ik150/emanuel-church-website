"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useEffect } from "react";
import Link from "next/link";
import { galleryAlbumSchema, type GalleryAlbumFormValues } from "./schema";
import { createAlbum, updateAlbum } from "@/server/actions/gallery";

interface GalleryAlbumFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    albumDate: Date | null;
    coverImageUrl: string | null;
    stream: "RO" | "RU";
    isPublished: boolean;
  };
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const errorClass = "mt-1 text-xs text-red-500";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9а-яёa-z-]/gi, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function GalleryAlbumForm({ initialData }: GalleryAlbumFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GalleryAlbumFormValues>({
    resolver: zodResolver(galleryAlbumSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          description: initialData.description ?? "",
          albumDate: initialData.albumDate
            ? initialData.albumDate.toISOString().split("T")[0]
            : "",
          coverImageUrl: initialData.coverImageUrl ?? "",
          stream: initialData.stream,
          isPublished: initialData.isPublished,
        }
      : {
          title: "",
          slug: "",
          description: "",
          albumDate: "",
          coverImageUrl: "",
          stream: "RU" as const,
          isPublished: false,
        },
  });

  const titleValue = watch("title");

  useEffect(() => {
    if (!initialData) {
      setValue("slug", toSlug(titleValue ?? ""));
    }
  }, [titleValue, initialData, setValue]);

  const onSubmit = (data: GalleryAlbumFormValues) => {
    startTransition(async () => {
      if (initialData) {
        await updateAlbum(initialData.id, data);
      } else {
        await createAlbum(data);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>Поток <span className="text-red-500">*</span></label>
        <select {...register("stream")} className={inputClass}>
          <option value="RU">Русский поток</option>
          <option value="RO">Румынский поток</option>
        </select>
      </div>


      <div>
        <label className={labelClass}>
          Название <span className="text-red-500">*</span>
        </label>
        <input
          {...register("title")}
          className={inputClass}
          placeholder="Название альбома"
        />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      <div>
        <label className={labelClass}>
          Слаг <span className="text-red-500">*</span>
        </label>
        <input
          {...register("slug")}
          className={inputClass}
          placeholder="url-slug"
        />
        {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
        <p className="mt-1 text-xs text-gray-400">
          Используется в URL. Заполняется автоматически из названия.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Дата альбома</label>
          <input type="date" {...register("albumDate")} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Обложка (URL)</label>
          <input
            {...register("coverImageUrl")}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Описание</label>
        <textarea
          {...register("description")}
          rows={3}
          className={inputClass}
          placeholder="Краткое описание альбома"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPublished"
          {...register("isPublished")}
          className="h-4 w-4 rounded border-gray-300 accent-gold"
        />
        <label htmlFor="isPublished" className="text-sm text-gray-700">
          Опубликовать
        </label>
      </div>

      <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-gold px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-50"
        >
          {isPending ? "Сохранение..." : "Сохранить"}
        </button>
        <Link
          href="/admin/gallery"
          className="rounded-md px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
}
