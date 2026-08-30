CREATE TABLE IF NOT EXISTS public.thquo_allowlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  added_by uuid REFERENCES auth.users(id),
  added_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.thquo_allowlist IS
  'Server-side allow-list controlling access to /admin/thquo (Tour Quotation admin). Separate from any /admin/staff auth mechanism.';

ALTER TABLE public.thquo_allowlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can check their own allowlist status"
ON public.thquo_allowlist
FOR SELECT
TO authenticated
USING (user_id = auth.uid());