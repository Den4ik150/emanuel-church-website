import { ChangePasswordForm } from "@/features/admin-user/ChangePasswordForm";
import { getAdminStream } from "@/lib/admin-stream";
import { getAdminT } from "@/lib/translations/admin";

export default async function AdminAccountPage() {
  const adminStream = await getAdminStream();
  const t = getAdminT(adminStream);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t.account.heading}</h1>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
