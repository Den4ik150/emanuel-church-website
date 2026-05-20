"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { staticPageSchema, type StaticPageFormValues } from "@/features/pages/schema";

function nullable(val: string | undefined): string | null {
  return val?.trim() ? val.trim() : null;
}

export async function createPage(data: StaticPageFormValues) {
  const parsed = staticPageSchema.parse(data);

  await prisma.staticPage.create({
    data: {
      slug: parsed.slug,
      title: parsed.title,
      excerpt: nullable(parsed.excerpt),
      content: parsed.content,
      seoTitle: nullable(parsed.seoTitle),
      seoDescription: nullable(parsed.seoDescription),
      isPublished: parsed.isPublished ?? false,
    },
  });

  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function updatePage(id: string, data: StaticPageFormValues) {
  const parsed = staticPageSchema.parse(data);

  await prisma.staticPage.update({
    where: { id },
    data: {
      slug: parsed.slug,
      title: parsed.title,
      excerpt: nullable(parsed.excerpt),
      content: parsed.content,
      seoTitle: nullable(parsed.seoTitle),
      seoDescription: nullable(parsed.seoDescription),
      isPublished: parsed.isPublished ?? false,
    },
  });

  revalidatePath("/admin/pages");
  redirect("/admin/pages");
}

export async function deletePage(id: string) {
  await prisma.staticPage.delete({ where: { id } });
  revalidatePath("/admin/pages");
}
