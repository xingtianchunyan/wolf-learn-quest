-- Harden RLS on users and add safe public RPCs for basic info
BEGIN;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing permissive or conflicting policies
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Anyone can view user profiles'
  ) THEN
    EXECUTE 'DROP POLICY "Anyone can view user profiles" ON public.users';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Users can select own profile'
  ) THEN
    EXECUTE 'DROP POLICY "Users can select own profile" ON public.users';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Users can insert own profile'
  ) THEN
    EXECUTE 'DROP POLICY "Users can insert own profile" ON public.users';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Users can insert their own profile'
  ) THEN
    EXECUTE 'DROP POLICY "Users can insert their own profile" ON public.users';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Users can update their own profile'
  ) THEN
    EXECUTE 'DROP POLICY "Users can update their own profile" ON public.users';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'users' AND policyname = 'Users can delete own profile'
  ) THEN
    EXECUTE 'DROP POLICY "Users can delete own profile" ON public.users';
  END IF;
END $$;

-- Recreate strict owner-only policies (outside DO to avoid EXECUTE syntax issues)
CREATE POLICY "Users can select own profile"
ON public.users
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own profile"
ON public.users
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Public RPCs that expose only non-sensitive fields
CREATE OR REPLACE FUNCTION public.get_public_user_profiles_by_ids(p_user_ids uuid[])
RETURNS TABLE (
  user_id uuid,
  player_name text,
  avatar_url text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT u.user_id, u.player_name, u.avatar_url
  FROM public.users u
  WHERE u.user_id = ANY (p_user_ids);
$$;

CREATE OR REPLACE FUNCTION public.get_public_user_profile(p_user_id uuid)
RETURNS TABLE (
  user_id uuid,
  player_name text,
  avatar_url text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT u.user_id, u.player_name, u.avatar_url
  FROM public.users u
  WHERE u.user_id = p_user_id;
$$;

CREATE OR REPLACE FUNCTION public.get_public_user_by_name(p_name text)
RETURNS TABLE (
  user_id uuid,
  player_name text,
  avatar_url text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT u.user_id, u.player_name, u.avatar_url
  FROM public.users u
  WHERE u.player_name = p_name;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_user_profiles_by_ids(uuid[]) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_user_profile(uuid) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_user_by_name(text) TO anon, authenticated;

COMMIT;
