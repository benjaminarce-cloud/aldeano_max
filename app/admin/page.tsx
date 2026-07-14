import { redirect } from "next/navigation";
import Dashboard from "@/components/admin/Dashboard";
import { createClient } from "@/lib/supabase/server";
import type { Reservation } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();

  // Middleware already gates this route; re-checking here means no reservation
  // data is ever rendered without a verified session.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase
    .from("reservations")
    .select("*")
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  return (
    <Dashboard
      initial={(data ?? []) as Reservation[]}
      email={user.email ?? ""}
    />
  );
}
