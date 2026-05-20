import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getNewsById } from "@/server/queries/news";
import { NewsForm } from "@/features/news/NewsForm";

interface EditNewsPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const { id } = await params;
  const post = await getNewsById(id);

  if (!post) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/news"
          className="mb-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад к списку
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Редактировать новость
        </h1>
      </div>

      <div className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6">
        <NewsForm initialData={post} />
      </div>
    </div>
  );
}
