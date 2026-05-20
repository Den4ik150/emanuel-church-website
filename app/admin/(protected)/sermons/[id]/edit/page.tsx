import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getSermonById } from "@/server/queries/sermons";
import { SermonForm } from "@/features/sermons/SermonForm";

interface EditSermonPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSermonPage({ params }: EditSermonPageProps) {
  const { id } = await params;
  const sermon = await getSermonById(id);

  if (!sermon) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/sermons"
          className="mb-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад к списку
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Редактировать проповедь
        </h1>
      </div>

      <div className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6">
        <SermonForm initialData={sermon} />
      </div>
    </div>
  );
}
