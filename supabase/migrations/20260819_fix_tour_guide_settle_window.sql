CREATE OR REPLACE FUNCTION public.tour_guide_settle_window(p_account_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
declare
  v_source text;
  v_hours_allocated numeric;
  v_hours_consumed integer;
  v_window_start timestamptz;
  v_now timestamptz := now();
  v_elapsed_minutes numeric;
  v_window_minutes constant numeric := 60;
begin
  select source, total_hours_allocated
    into v_source, v_hours_allocated
  from tour_guide_accounts
  where id = p_account_id;

  if v_source is null then
    raise exception 'tour_guide_accounts row not found for account %', p_account_id;
  end if;

  if v_source = 'trial' then
    return;
  end if;

  select hours_consumed, current_window_start_at
    into v_hours_consumed, v_window_start
  from tour_guide_usage
  where account_id = p_account_id
  for update;

  if v_window_start is null then
    return;
  end if;

  v_elapsed_minutes := extract(epoch from (v_now - v_window_start)) / 60;
  if v_elapsed_minutes >= v_window_minutes and v_hours_consumed < v_hours_allocated then
    update tour_guide_usage
      set hours_consumed = v_hours_consumed + 1,
          current_window_start_at = v_now,
          current_window_cost_usd = 0,
          updated_at = v_now
      where account_id = p_account_id;
  end if;
end;
$function$;