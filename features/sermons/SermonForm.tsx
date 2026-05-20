"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import Link from "next/link";
import { sermonSchema, type SermonFormValues } from "./schema";
import { createSermon, updateSermon } from "@/server/actions/sermons";

interface SermonFormProps {
  initialData?: {
    id: string;
    title: string;
    topic: string | null;
    preacher: string;
    description: string | null;
    sermonDate: Date;
    thumbnailUrl: string | null;
    videoUrl: string;
    timestampSeconds: number | null;
    notesUrl: string | null;
    isPublished: boolean;
  };
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const errorClass = "mt-1 text-xs text-red-500";

export function SermonForm({ initialData }: SermonFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SermonFormValues>({
    resolver: zodResolver(sermonSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          topic: initialData.topic ?? "",
          preacher: initialData.preacher,
          description: initialData.description ?? "",
          sermonDate: initialData.sermonDate.toISOString().split("T")[0],
          thumbnailUrl: initialData.thumbnailUrl ?? "",
          videoUrl: initialData.videoUrl,
          timestampSeconds: initialData.timestampSeconds?.toString() ?? "",
          notesUrl: initialData.notesUrl ?? "",
          isPublished: initialData.isPublished,
        }
      : {
          title: "",
          topic: "",
          preacher: "",
          description: "",
          sermonDate: "",
          thumbnailUrl: "",
          videoUrl: "",
          timestampSeconds: "",
          notesUrl: "",
          isPublished: false,
        },
  });

  const onSubmit = (data: SermonFormValues) => {
    startTransition(async () => {
      if (initialData) {
        await updateSermon(initialData.id, data);
      } else {
        await createSermon(data);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Название <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            className={inputClass}
            placeholder="Название проповеди"
          />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Тема</label>
          <input
            {...register("topic")}
            className={inputClass}
            placeholder="Тема (необязательно)"
          />
        </div>

        <div>
          <label className={labelClass}>
            Проповедник <span className="text-red-500">*</span>
          </label>
          <input
            {...register("preacher")}
            className={inputClass}
            placeholder="Имя проповедника"
          />
          {errors.preacher && (
            <p className={errorClass}>{errors.preacher.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Дата <span className="text-red-500">*</span>
          </label>
          <input type="date" {...register("sermonDate")} className={inputClass} />
          {errors.sermonDate && (
            <p className={errorClass}>{errors.sermonDate.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Секунды (таймкод)</label>
          <input
            type="number"
            min="0"
            {...register("timestampSeconds")}
            className={inputClass}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Описание</label>
        <textarea
          {...register("description")}
          rows={3}
          className={inputClass}
          placeholder="Краткое описание проповеди"
        />
      </div>

      <div>
        <label className={labelClass}>
          Ссылка на видео <span className="text-red-500">*</span>
        </label>
        <input
          {...register("videoUrl")}
          className={inputClass}
          placeholder="https://youtube.com/..."
        />
        {errors.videoUrl && (
          <p className={errorClass}>{errors.videoUrl.message}</p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Превью (URL)</label>
          <input
            {...register("thumbnailUrl")}
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className={labelClass}>Конспект (URL)</label>
          <input
            {...register("notesUrl")}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
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
          href="/admin/sermons"
          className="rounded-md px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
}
