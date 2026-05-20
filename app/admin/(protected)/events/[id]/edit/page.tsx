import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getEventById } from "@/server/queries/events";
import { EventForm } from "@/features/events/EventForm";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/events"
          className="mb-3 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Назад к списку
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Редактировать мероприятие
        </h1>
      </div>

      <div className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6">
        <EventForm initialData={event} />
      </div>
    </div>
  );
}
