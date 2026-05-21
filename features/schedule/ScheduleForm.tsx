"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import Link from "next/link";
import { scheduleSchema, type ScheduleFormValues } from "./schema";
import { createScheduleItem, updateScheduleItem } from "@/server/actions/schedule";

interface ScheduleFormProps {
  initialData?: {
    id: string;
    title: string;
    category: string | null;
    weekday: string;
    startTime: string;
    endTime: string | null;
    location: string | null;
    description: string | null;
    displayOrder: number;
    stream: string;
    isActive: boolean;
  };
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";
const errorClass = "mt-1 text-xs text-red-500";

const WEEKDAYS = [
  { value: "Воскресенье", label: "Воскресенье" },
  { value: "Понедельник", label: "Понедельник" },
  { value: "Вторник", label: "Вторник" },
  { value: "Среда", label: "Среда" },
  { value: "Четверг", label: "Четверг" },
  { value: "Пятница", label: "Пятница" },
  { value: "Суббота", label: "Суббота" },
];

export function ScheduleForm({ initialData }: ScheduleFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          category: initialData.category ?? "",
          weekday: initialData.weekday,
          startTime: initialData.startTime,
          endTime: initialData.endTime ?? "",
          location: initialData.location ?? "",
          description: initialData.description ?? "",
          displayOrder: initialData.displayOrder.toString(),
          stream: initialData.stream as "RO" | "RU",
          isActive: initialData.isActive,
        }
      : {
          title: "",
          category: "",
          weekday: "Воскресенье",
          startTime: "",
          endTime: "",
          location: "",
          description: "",
          displayOrder: "0",
          stream: "RU" as const,
          isActive: true,
        },
  });

  const onSubmit = (data: ScheduleFormValues) => {
    startTransition(async () => {
      if (initialData) {
        await updateScheduleItem(initialData.id, data);
      } else {
        await createScheduleItem(data);
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
          placeholder="Воскресное служение"
        />
        {errors.title && <p className={errorClass}>{errors.title.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            День недели <span className="text-red-500">*</span>
          </label>
          <select {...register("weekday")} className={inputClass}>
            {WEEKDAYS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          {errors.weekday && (
            <p className={errorClass}>{errors.weekday.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Категория</label>
          <input
            {...register("category")}
            className={inputClass}
            placeholder="напр. Богослужение"
          />
        </div>

        <div>
          <label className={labelClass}>
            Начало <span className="text-red-500">*</span>
          </label>
          <input
            {...register("startTime")}
            className={inputClass}
            placeholder="10:00"
          />
          {errors.startTime && (
            <p className={errorClass}>{errors.startTime.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Окончание</label>
          <input
            {...register("endTime")}
            className={inputClass}
            placeholder="12:00"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Место</label>
        <input
          {...register("location")}
          className={inputClass}
          placeholder="Главный зал"
        />
      </div>

      <div>
        <label className={labelClass}>Примечание</label>
        <textarea
          {...register("description")}
          rows={2}
          className={inputClass}
          placeholder="Дополнительная информация"
        />
      </div>

      <div>
        <label className={labelClass}>Порядок отображения</label>
        <input
          type="number"
          min="0"
          {...register("displayOrder")}
          className={inputClass}
          placeholder="0"
        />
        <p className="mt-1 text-xs text-gray-400">
          Меньшее число — выше в списке.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          {...register("isActive")}
          className="h-4 w-4 rounded border-gray-300 accent-gold"
        />
        <label htmlFor="isActive" className="text-sm text-gray-700">
          Активно
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
          href="/admin/schedule"
          className="rounded-md px-5 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
        >
          Отмена
        </Link>
      </div>
    </form>
  );
}
