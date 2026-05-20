import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getScheduleItemById } from "@/server/queries/schedule";
import { ScheduleForm } from "@/features/schedule/ScheduleForm";

interface EditSchedulePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSchedulePage({ params }: EditSchedulePageProps) {
  const { id } = await params;
  const item = await getScheduleItemById(id);

  if (!item) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/schedule"
          className="mb-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад к списку
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Редактировать запись
        </h1>
      </div>

      <div className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6">
        <ScheduleForm initialData={item} />
      </div>
    </div>
  );
}
