import { redirect } from "next/navigation";
import Dashboard from "@/components/admin/Dashboard";
import AdminNotice from "@/components/admin/AdminNotice";
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

  // A signed-in account is not necessarily staff. RLS answers an unauthorised
  // read with an empty result rather than an error, so without asking first,
  // "you have no access" and "there are no reservations" render identically.
  const { data: isStaff, error: staffError } = await supabase.rpc("is_staff");

  if (staffError) {
    return (
      <AdminNotice
        title="No pudimos verificar tu acceso"
        body="Ocurrió un error al comprobar los permisos de tu cuenta. Vuelve a intentarlo en un momento."
        email={user.email ?? ""}
        detail={staffError.message}
      />
    );
  }

  if (!isStaff) {
    return (
      <AdminNotice
        title="Tu cuenta no tiene acceso"
        body="Esta cuenta existe pero no está dada de alta como personal, así que no puede ver las reservaciones. Pide que te agreguen al equipo y vuelve a entrar."
        email={user.email ?? ""}
      />
    );
  }

  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  if (error) {
    return (
      <AdminNotice
        title="No pudimos cargar las reservaciones"
        body="Tu cuenta sí tiene acceso, pero la consulta falló. Vuelve a intentarlo en un momento."
        email={user.email ?? ""}
        detail={error.message}
      />
    );
  }

  return (
    <Dashboard initial={(data ?? []) as Reservation[]} email={user.email ?? ""} />
  );
}
