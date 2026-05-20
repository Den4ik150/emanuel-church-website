import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getPageById } from "@/server/queries/pages";
import { StaticPageForm } from "@/features/pages/StaticPageForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPagePage({ params }: EditPageProps) {
  const { id } = await params;
  const page = await getPageById(id);

  if (!page) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/pages"
          className="mb-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад к списку
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Редактировать страницу
        </h1>
      </div>

      <div className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6">
        <StaticPageForm initialData={page} />
      </div>
    </div>
  );
}
