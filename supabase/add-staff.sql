-- Grant a person access to the reservations dashboard.
--
-- Creating the account is a SEPARATE, EARLIER step. Add the user under
-- Authentication -> Users in the Supabase dashboard (or have them sign up),
-- then run this with their email to actually grant access.
--
-- Signing in is not access. Every read of public.reservations is gated by RLS
-- calling public.is_staff(), which is just "does this user have a row in
-- public.staff?". An account with no row here can sign in and will be told
-- "Tu cuenta no tiene acceso" on /admin.
--
-- Run it in the Supabase dashboard under SQL Editor.

insert into public.staff (user_id, email)
select id, email
from auth.users
where email = 'cambia-esto@aldeano.mx' -- <- put the real address here
on conflict (user_id) do nothing
returning user_id, email, created_at;

-- Returning zero rows means one of two things: there is no auth.users row for
-- that address yet (create the account first), or the person is already
-- enrolled. This tells them apart:
--
--   select u.email,
--          u.created_at as account_created,
--          (s.user_id is not null) as is_staff
--     from auth.users u
--     left join public.staff s on s.user_id = u.id
--    order by u.created_at;


-- Revoke access. The account keeps existing and can still sign in; it just
-- stops seeing reservations.
--
--   delete from public.staff where email = 'cambia-esto@aldeano.mx';
