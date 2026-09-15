-- ============================================================================
-- Migration: Fix tour_guide_settle_window double-counting bug
--
-- PURPOSE: Remove automatic hours_consumed increment from tour_guide_settle_window()
--
-- BUG: The function was incrementing hours_consumed by 1 every 60 minutes regardless
-- of actual usage, double-counting against the accurate real-usage-based hours_consumed
-- value already maintained by increment_tour_guide_usage().
--
-- FIX: Remove the hours_consumed = hours_consumed + 1 line while keeping the window
-- reset logic (current_window_start_at and current_window_cost_usd) to support the
-- legitimate per-hour burst-cap check in increment_tour_guide_usage().
-- ============================================================================

CREATE OR REPLACE FUNCTION public.tour_guide_settle_window(p_account_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
declare
  v_source text;
  v_window_start timestamptz;
  v_now timestamptz := now();
  v_elapsed_minutes numeric;
  v_window_minutes constant numeric := 60;
begin
  select source
    into v_source
  from tour_guide_accounts
  where id = p_account_id;

  if v_source is null then
    raise exception 'tour_guide_accounts row not found for account %', p_account_id;
  end if;

  if v_source = 'trial' then
    return;
  end if;

  select current_window_start_at
    into v_window_start
  from tour_guide_usage
  where account_id = p_account_id
  for update;

  if v_window_start is null then
    return;
  end if;

  v_elapsed_minutes := extract(epoch from (v_now - v_window_start)) / 60;
  if v_elapsed_minutes >= v_window_minutes then
    update tour_guide_usage
      set current_window_start_at = v_now,
          current_window_cost_usd = 0,
          updated_at = v_now
      where account_id = p_account_id;
  end if;
end;
$function$;
