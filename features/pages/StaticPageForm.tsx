"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import Link from "next/link";
import { staticPageSchema, type StaticPageFormValues } from "./schema";
import { createPage, updatePage } from "@/server/actions/pages";

interface StaticPageFormProps {
  initialData?: {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    seoTitle: string | null;
    seoDescription: string | null;
    isPublished: boolean;
  };
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const errorClass = "mt-1 text-xs text-red-500";

export function StaticPageForm({ initialData }: StaticPageFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaticPageFormValues>({
    resolver: zodResolver(staticPageSchema),
    defaultValues: initialData
      ? {
          slug: initialData.slug,
          title: initialData.title,
          excerpt: initialData.excerpt ?? "",
          content: initialData.content,
          seoTitle: initialData.seoTitle ?? "",
          seoDescription: initialData.seoDescription ?? "",
          isPublished: initialData.isPublished,
        }
      : {
          slug: "",
          title: "",
          excerpt: "",
          content: "",
          seoTitle: "",
          seoDescription: "",
          isPublished: false,
        },
  });

  const onSubmit = (data: StaticPageFormValues) => {
    startTransition(async () => {
      if (initialData) {
        await updatePage(initialData.id, data);
      } else {
        await createPage(data);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            Заголовок <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title")}
            className={inputClass}
            placeholder="Заголовок страницы"
          />
          {errors.title && (
            <p className={errorClass}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            Слаг <span className="text-red-500">*</span>
          </label>
          <input
            {...register("slug")}
            className={inputClass}
            placeholder="about / contacts"
          />
          {errors.slug && (
            <p className={errorClass}>{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Краткое описание</label>
        <textarea
          {...register("excerpt")}
          rows={2}
          className={inputClass}
          placeholder="Отображается в meta description и превью"
        />
      </div>

      <div>
        <label className={labelClass}>
          Содержание <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("content")}
          rows={12}
          className={inputClass}
          placeholder="Полное содержание страницы..."
        />
        {errors.content && (
          <p className={errorClass}>{errors.content.message}</p>
        )}
      </div>

      <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          SEO
        </p>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>SEO заголовок</label>
            <input
              {...register("seoTitle")}
              className={inputClass}
              placeholder="Title для поисковиков (если отличается от заголовка)"
            />
          </div>
          <div>
            <label className={labelClass}>SEO описание</label>
            <textarea
              {...register("seoDescription")}
              rows={2}
              className={inputClass}
              placeholder="Meta description (до 160 символов)"
            />
          </div>
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
          href="/admin/pages"
          className="rounded-md px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
}
