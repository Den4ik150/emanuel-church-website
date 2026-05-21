"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { CheckCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "./schema";
import { submitContact } from "@/server/actions/contacts";
import type { Stream } from "@/lib/generated/prisma/client";

const inputClass =
  "w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold placeholder:text-gray-400";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const errorClass = "mt-1 text-xs text-red-500";

export function ContactForm({ stream = "RU" }: { stream?: Stream }) {
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    setServerError(null);
    startTransition(async () => {
      const result = await submitContact(data, stream);
      if (result.success) {
        setSubmitted(true);
      } else {
        setServerError(result.error ?? "Ошибка отправки.");
      }
    });
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-green-100 bg-green-50 px-6 py-12 text-center">
        <CheckCircle className="h-10 w-10 text-green-500" />
        <div>
          <p className="font-semibold text-gray-900">Сообщение отправлено!</p>
          <p className="mt-1 text-sm text-gray-500">
            Мы свяжемся с вами в ближайшее время.
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

      <div>
        <label className={labelClass}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="ivan@example.com"
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Телефон (необязательно)</label>
        <input {...register("phone")} type="tel" placeholder="+373 000 000 00" className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>
          Сообщение <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Ваше сообщение..."
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-dark disabled:opacity-50"
      >
        {isPending ? "Отправка..." : "Отправить сообщение"}
      </button>
    </form>
  );
}
