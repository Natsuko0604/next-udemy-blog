import { writeFile } from "fs/promises";
import path from "path";
import { supabase } from "@/lib/supabase";

export async function saveImage(file: File): Promise<string | null> {
  const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === "true";

  if (useSupabase) {
    return await saveImageToSupabase(file);
  } else {
    return await saveImageToLocal(file);
  }
}

export async function saveImageToLocal(file: File): Promise<string | null> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), "public/images");

  try {
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return `/images/${fileName}`;
  } catch (error) {
    return null;
  }
}

async function saveImageToSupabase(file: File): Promise<string | null> {
  const fileName = `${Date.now()}_${sanitizeFileName(file.name)}`;
  const { data, error } = await supabase.storage
    .from("Udemy_next_blog_bucket")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Uploard error:", error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("Udemy_next_blog_bucket").getPublicUrl(fileName);

  return publicUrl;
}

function sanitizeFileName(name: string): string {
  // 1. 全角文字(日本語含む)を削除
  // 2. 英数字・._- 以外も削除
  return name
    .normalize("NFKD")
    .replace(/[^\w.\-]/g, "") // 英数字・アンダーバー以外削除（. と - は許可）
    .replace(/\s+/g, ""); // 念のため空白も削除
}
