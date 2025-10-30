// src/app/(admin)/admin/umkm/_actions/storage.ts
"use server";

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // <-- set di ENV (Vercel)
const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

export async function getSignedUploadUrl(
  bucket: "umkm" | "berita",
  path: string
) {
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUploadUrl(path);

  if (error) throw new Error(error.message);
  // data: { path, token }
  return data;
}
