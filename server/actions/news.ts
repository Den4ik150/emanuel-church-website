"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { newsSchema, type NewsFormValues } from "@/features/news/schema";

function nullable(val: string | undefined): string | null {
  return val?.trim() ? val.trim() : null;
}

export async function createNews(data: NewsFormValues) {
  const parsed = newsSchema.parse(data);

  await prisma.newsPost.create({
    data: {
      stream: parsed.stream,
      title: parsed.title,
      slug: parsed.slug,
      excerpt: nullable(parsed.excerpt),
      content: parsed.content,
      coverImageUrl: nullable(parsed.coverImageUrl),
      isPublished: parsed.isPublished ?? false,
      publishedAt: parsed.isPublished ? new Date() : null,
    },
  });

  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateNews(id: string, data: NewsFormValues) {
  const parsed = newsSchema.parse(data);

  const existing = await prisma.newsPost.findUnique({ where: { id } });

  await prisma.newsPost.update({
    where: { id },
    data: {
      stream: parsed.stream,
      title: parsed.title,
      slug: parsed.slug,
      excerpt: nullable(parsed.excerpt),
      content: parsed.content,
      coverImageUrl: nullable(parsed.coverImageUrl),
      isPublished: parsed.isPublished ?? false,
      publishedAt:
        parsed.isPublished && !existing?.publishedAt ? new Date() : existing?.publishedAt ?? null,
    },
  });

  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteNews(id: string) {
  await prisma.newsPost.delete({ where: { id } });
  revalidatePath("/admin/news");
}
