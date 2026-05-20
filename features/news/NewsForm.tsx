"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useEffect } from "react";
import Link from "next/link";
import { newsSchema, type NewsFormValues } from "./schema";
import { createNews, updateNews } from "@/server/actions/news";

interface NewsFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    coverImageUrl: string | null;
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

export function NewsForm({ initialData }: NewsFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          excerpt: initialData.excerpt ?? "",
          content: initialData.content,
          coverImageUrl: initialData.coverImageUrl ?? "",
          isPublished: initialData.isPublished,
        }
      : {
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          coverImageUrl: "",
          isPublished: false,
        },
  });

  const titleValue = watch("title");

  useEffect(() => {
    if (!initialData) {
      setValue("slug", toSlug(titleValue ?? ""));
    }
  }, [titleValue, initialData, setValue]);

  const onSubmit = (data: NewsFormValues) => {
    startTransition(async () => {
      if (initialData) {
        await updateNews(initialData.id, data);
      } else {
        await createNews(data);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>
          Заголовок <span className="text-red-500">*</span>
        </label>
        <input
          {...register("title")}
          className={inputClass}
          placeholder="Заголовок новости"
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
          Используется в URL. Заполняется автоматически из заголовка.
        </p>
      </div>

      <div>
        <label className={labelClass}>Анонс</label>
        <textarea
          {...register("excerpt")}
          rows={2}
          className={inputClass}
          placeholder="Краткое описание (отображается в списке новостей)"
        />
      </div>

      <div>
        <label className={labelClass}>
          Содержание <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("content")}
          rows={10}
          className={inputClass}
          placeholder="Полный текст новости..."
        />
        {errors.content && (
          <p className={errorClass}>{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Обложка (URL)</label>
        <input
          {...register("coverImageUrl")}
          className={inputClass}
          placeholder="https://..."
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
          href="/admin/news"
          className="rounded-md px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
}
