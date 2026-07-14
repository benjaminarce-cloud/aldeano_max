"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const data = new FormData(e.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email") ?? "").trim(),
      password: String(data.get("password") ?? ""),
    });

    if (error) {
      setPending(false);
      setError("Correo o contraseña incorrectos.");
      return;
    }

    // Full reload so middleware re-reads the freshly written session cookie.
    router.replace(next);
    router.refresh();
  }

  const fieldClass =
    "rounded-sm border border-[rgba(241,232,217,.15)] bg-bg-deep px-2.5 py-2.5 font-sans text-[.92rem] text-cal outline-none transition-colors focus:border-achiote";

  return (
    <div className="w-full max-w-[380px] rounded-[3px] border border-[rgba(185,139,62,.25)] bg-card p-9">
      <div className="mb-7">
        <Logo className="text-2xl" />
        <p className="mt-0.5 font-mono text-[.65rem] uppercase tracking-[.1em] text-cal-dim">
          Panel de reservaciones
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-[7px]">
          <label
            htmlFor="email"
            className="font-mono text-[.65rem] uppercase tracking-[.06em] text-cal-dim"
          >
            Correo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-[7px]">
          <label
            htmlFor="password"
            className="font-mono text-[.65rem] uppercase tracking-[.06em] text-cal-dim"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={fieldClass}
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-sm bg-achiote p-3 font-mono text-[.75rem] uppercase tracking-[.05em] text-cal transition-colors hover:bg-oro disabled:cursor-not-allowed disabled:bg-[#5a4a3d]"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>

        <p
          role="status"
          aria-live="polite"
          className="min-h-[16px] font-mono text-[.72rem] text-achiote"
        >
          {error ?? ""}
        </p>
      </form>
    </div>
  );
}
