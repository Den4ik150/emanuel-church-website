import { ChangePasswordForm } from "@/features/admin-user/ChangePasswordForm";

export default function AdminAccountPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Аккаунт</h1>
        <p className="mt-1 text-sm text-gray-500">Смена пароля администратора.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-5 text-base font-semibold text-gray-800">Сменить пароль</h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
