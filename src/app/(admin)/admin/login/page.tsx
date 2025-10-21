// src/app/(admin)/admin/login/page.tsx
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminLoginPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] grid place-items-center px-4 py-10">
      <Suspense
        // fallback ringan agar menghilangkan warning "missing suspense"
        fallback={
          <div className="w-full max-w-sm animate-pulse">
            <div className="h-8 w-40 bg-slate-200 rounded mb-4" />
            <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3">
              <div className="h-10 bg-slate-100 rounded" />
              <div className="h-10 bg-slate-100 rounded" />
              <div className="h-10 bg-slate-100 rounded" />
            </div>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </main>
  );
}
