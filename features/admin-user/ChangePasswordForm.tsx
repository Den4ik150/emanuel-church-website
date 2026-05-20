"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordInput } from "./schema";
import { changePassword } from "@/server/actions/admin-user";

export function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  function onSubmit(data: ChangePasswordInput) {
    setServerError(null);
    setSuccess(false);
    startTransition(async () => {
      const result = await changePassword(data);
      if (result.success) {
        setSuccess(true);
        reset();
      } else {
        setServerError(result.error ?? "Ошибка сервера");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Текущий пароль
        </label>
        <input
          type="password"
          autoComplete="current-password"
          {...register("currentPassword")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
        />
        {errors.currentPassword && (
          <p className="mt-1 text-xs text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Новый пароль
        </label>
        <input
          type="password"
          autoComplete="new-password"
          {...register("newPassword")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
        />
        {errors.newPassword && (
          <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Повторите новый пароль
        </label>
        <input
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && (
        <p className="rounded-md bg-red-50 px-4 py-2.5 text-sm text-red-700">{serverError}</p>
      )}

      {success && (
        <p className="rounded-md bg-green-50 px-4 py-2.5 text-sm text-green-700">
          Пароль успешно изменён.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-gold px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gold-dark disabled:opacity-60"
      >
        {isPending ? "Сохранение..." : "Сменить пароль"}
      </button>
    </form>
  );
}
