import Link from "next/link";
import { getAllNews } from "@/server/queries/news";
import { DeleteNewsButton } from "@/features/news/DeleteNewsButton";

export default async function AdminNewsPage() {
  const posts = await getAllNews();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Новости</h1>
        <Link
          href="/admin/news/new"
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gold-dark"
        >
          + Добавить
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          Новостей пока нет
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Заголовок
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Слаг
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Дата
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">
                  Статус
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">
                    {post.slug}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {post.createdAt.toLocaleDateString("ru-RU")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.isPublished
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {post.isPublished ? "Опубликовано" : "Черновик"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/news/${post.id}/edit`}
                        className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
                      >
                        Изменить
                      </Link>
                      <DeleteNewsButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
