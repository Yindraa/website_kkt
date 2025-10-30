// src/app/(admin)/admin/berita/new/page.tsx
import AdminBeritaForm from "../_components/AdminBeritaForm";

export const dynamic = "force-dynamic";

export default function AdminBeritaNewPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <AdminBeritaForm mode="create" />
    </div>
  );
}
