"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";

/**
 * Full-page message for the states where the dashboard cannot be shown.
 *
 * It carries its own sign-out because middleware bounces a signed-in user from
 * /admin/login back to /admin: without a way to end the session here, someone
 * whose account is not staff has no route out of this screen.
 */
export default function AdminNotice({
  title,
  body,
  email,
  detail,
}: {
  title: string;
  body: string;
  email?: string;
  /** Raw error text. Shown verbatim so it can be reported as-is. */
  detail?: string;
}) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-bg px-5">
      <div className="w-full max-w-[440px] rounded-[3px] border border-[rgba(185,139,62,.25)] bg-card p-9">
        <div className="mb-7">
          <Logo className="text-2xl" />
          <p className="mt-0.5 font-mono text-[.65rem] uppercase tracking-[.1em] text-cal-dim">
            Panel de reservaciones
          </p>
        </div>

        <h1 className="mb-3 font-serif text-[1.5rem] font-[340]">{title}</h1>
        <p className="text-[.92rem] font-light leading-relaxed text-cal-dim">
          {body}
        </p>

        {email ? (
          <p className="mt-4 font-mono text-[.72rem] text-oro">{email}</p>
        ) : null}

        {detail ? (
          <p className="mt-4 break-words rounded-sm border border-dashed border-achiote/40 bg-bg-deep px-3 py-2.5 font-mono text-[.68rem] text-achiote">
            {detail}
          </p>
        ) : null}

        <button
          onClick={signOut}
          className="mt-7 w-full rounded-sm border border-[rgba(241,232,217,.25)] p-3 font-mono text-[.72rem] uppercase tracking-[.05em] text-cal-dim transition-colors hover:border-oro hover:text-cal"
        >
          Salir
        </button>
      </div>
    </main>
  );
}
