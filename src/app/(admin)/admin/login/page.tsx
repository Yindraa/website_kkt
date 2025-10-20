import { Suspense } from "react";
import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Login Admin",
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm py-16">
      <h1 className="text-2xl font-bold mb-4">Login Admin</h1>
      <Suspense fallback={<div className="text-slate-600">Memuat…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
