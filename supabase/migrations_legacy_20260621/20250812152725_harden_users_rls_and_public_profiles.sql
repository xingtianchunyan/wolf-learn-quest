-- Secure users table with RLS and provide a safe public RPC for basic info
BEGIN;

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive policies if they exist
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'users' 
      AND policyname = 'Users can view all profiles'
  ) THEN
    EXECUTE 'DROP POLICY "Users can view all profiles" ON public.users';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'users' 
      AND policyname = 'Enable read access for all users'
  ) THEN
    EXECUTE 'DROP POLICY "Enable read access for all users" ON public.users';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'users' 
      AND policyname = 'Public read access'
  ) THEN
    EXECUTE 'DROP POLICY "Public read access" ON public.users';
  END IF;
END $$;

-- Create strict owner-only policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'users' 
      AND policyname = 'Users can select own profile'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Users can select own profile"
      ON public.users
      FOR SELECT
      TO authenticated
      USING (user_id = auth.uid());
    $$;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'users' 
      AND policyname = 'Users can insert own profile'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Users can insert own profile"
      ON public.users
      FOR INSERT
      TO authenticated
      WITH CHECK (user_id = auth.uid());
    $$;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'users' 
      AND policyname = 'Users can update own profile'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Users can update own profile"
      ON public.users
      FOR UPDATE
      TO authenticated
      USING (user_id = auth.uid())
      WITH CHECK (user_id = auth.uid());
    $$;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'users' 
      AND policyname = 'Users can delete own profile'
  ) THEN
    EXECUTE $$
      CREATE POLICY "Users can delete own profile"
      ON public.users
      FOR DELETE
      TO authenticated
      USING (user_id = auth.uid());
    $$;
  END IF;
END $$;

-- Provide a safe RPC to expose only basic public info (no stats)
CREATE OR REPLACE FUNCTION public.get_public_user_profiles()
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
  FROM public.users u;
$$;

-- Ensure execute permissions for anon/auth
GRANT EXECUTE ON FUNCTION public.get_public_user_profiles() TO anon, authenticated;

COMMIT;
