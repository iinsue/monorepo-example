"use server";

import { db } from "@/lib/db";
import { posts } from "@mono/database";
import { revalidatePath } from "next/cache";

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) return;

  await db.insert(posts).values({
    title,
    content,
    author: "Next.js 웹 사용자",
  });

  revalidatePath("/");
}
