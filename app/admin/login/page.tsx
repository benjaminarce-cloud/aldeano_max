import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-bg px-5">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
