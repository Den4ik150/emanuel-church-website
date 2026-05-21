"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { Heart } from "lucide-react";
import { prayerSchema, type PrayerFormValues } from "./schema";
import { submitPrayerRequest } from "@/server/actions/prayer-requests";
import type { Stream } from "@/lib/generated/prisma/client";

const inputClass =
  "w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold placeholder:text-gray-400";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const errorClass = "mt-1 text-xs text-red-500";

export function PrayerRequestForm({ stream = "RU" }: { stream?: Stream }) {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PrayerFormValues>({
    resolver: zodResolver(prayerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      isPrivate: true,
    },
  });

  const onSubmit = (data: PrayerFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const result = await submitPrayerRequest(data, stream);
      if (result.success) {
        setSubmitted(true);
      } else {
        setServerError(result.error ?? "Ошибка отправки.");
      }
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-gold/20 bg-gold/5 px-6 py-12 text-center">
        <Heart className="h-10 w-10 text-gold" />
        <div>
          <p className="font-semibold text-gray-900">Молитвенная просьба получена</p>
          <p className="mt-1 text-sm text-gray-500">
            Мы будем молиться вместе с вами.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={labelClass}>
          Ваше имя <span className="text-red-500">*</span>
        </label>
        <input {...register("name")} placeholder="Иван Иванов" className={inputClass} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Email (необязательно)</label>
          <input
            {...register("email")}
            type="email"
            placeholder="ivan@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Телефон (необязательно)</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder="+373 000 000 00"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Молитвенная нужда <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Опишите вашу молитвенную нужду..."
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">
        <input
          type="checkbox"
          id="isPrivate"
          {...register("isPrivate")}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-gold"
        />
        <label htmlFor="isPrivate" className="text-sm text-gray-600 leading-relaxed">
          <span className="font-medium text-gray-700">Конфиденциально</span> — просьба будет
          передана только пасторской команде и не будет объявлена публично.
        </label>
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark disabled:opacity-50"
      >
        {isPending ? "Отправка..." : "Отправить просьбу"}
      </button>
    </form>
  );
}
