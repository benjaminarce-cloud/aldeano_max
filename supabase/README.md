# Supabase

The schema lives in the Supabase project, not in this repo — there are no
migrations. This folder documents how access works and holds the SQL worth
having on hand.

## Who can see reservations

Two tables, both with RLS enabled:

- **`reservations`** — one row per booking. The public form inserts here as
  `anon`; that is the only thing `anon` may do. It cannot read back what it
  wrote.
- **`staff`** — `user_id` (FK to `auth.users`), `email`. Membership, nothing
  more. An empty table means nobody has access.

Access hangs off one function:

```sql
create function public.is_staff() returns boolean
  language sql stable security definer set search_path to 'public'
as $$ select exists (select 1 from public.staff where user_id = auth.uid()); $$
```

Every `authenticated` policy on `reservations` — select, insert, update,
delete — calls it. So **having an account is not having access**: the account
authenticates you, the `staff` row authorises you.

`security definer` matters. It lets the function read `staff` on behalf of a
user who has no permission to read `staff` themselves.

## Adding someone

See [`add-staff.sql`](./add-staff.sql). Two steps, and the second is easy to
forget:

1. Create the account (Authentication → Users, or let them sign up).
2. Run `add-staff.sql` with their email.

There is deliberately **no trigger auto-enrolling new `auth.users`**. If signups
are open, that would hand every reservation — names and phone numbers — to
anyone who registers. Enrollment stays explicit.

## The failure mode this caused

Skipping step 2 used to be invisible. RLS answers an unauthorised read with an
*empty result*, not an error, so a non-staff account saw "sin reservaciones" —
exactly what a genuinely empty day looks like. Bookings were saving fine the
whole time and the dashboard showed nothing.

`app/admin/page.tsx` now calls `is_staff()` before reading and says which case
it is. If someone reports an empty dashboard, check `staff` first:

```sql
select u.email, (s.user_id is not null) as is_staff
  from auth.users u
  left join public.staff s on s.user_id = u.id;
```
