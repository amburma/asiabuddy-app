-- ============================================================================
-- Migration: 20260815_fix_ambiguous_hours_consumed.sql
--
-- PURPOSE: Fix "column reference hours_consumed is ambiguous" error in
-- increment_tour_guide_usage() function
--
-- CONTEXT: The live function was manually modified (outside of migrations) to
-- use hours_consumed instead of total_cost_usd, but the modification didn't
-- qualify column references properly, causing ambiguity when multiple tables
-- in the query have hours_consumed columns.
--
-- FIX: Qualify all column references with table names to resolve ambiguity.
-- This is a minimal fix - it preserves the existing manual logic while fixing
-- the syntax error.
-- ============================================================================

create or replace function increment_tour_guide_usage(
  p_account_id uuid,
  p_feature text,
  p_amount numeric
) returns table(
  success boolean,
  hours_consumed numeric,
  remaining_hours numeric,
  current_window_cost_usd numeric,
  is_window_blocked boolean
) as $$
declare
  v_source text;
  v_hours_allocated numeric;
  v_current_hours numeric;
  v_current_window_cost numeric;
  v_new_hours numeric;
  v_new_window_cost numeric;
  v_new_status text;
  v_base_rate numeric := 2.20; -- BASE_RATE_USD_PER_HOUR
begin
  if p_amount < 0 then
    raise exception 'p_amount must be non-negative, got %', p_amount;
  end if;

  select source, total_hours_allocated
    into v_source, v_hours_allocated
  from tour_guide_accounts
  where id = p_account_id;

  if v_source is null then
    raise exception 'tour_guide_accounts row not found for account %', p_account_id;
  end if;

  if v_source = 'trial' then
    raise exception 'increment_tour_guide_usage() is not valid for source=trial; trial accounts use increment_tour_guide_trial_usage() instead';
  end if;

  -- Bootstrap the usage row if it doesn't exist yet
  insert into tour_guide_usage (account_id)
    values (p_account_id)
    on conflict (account_id) do nothing;

  -- Row lock: atomic check-and-deduct
  select tour_guide_usage.hours_consumed, tour_guide_usage.current_window_cost_usd
    into v_current_hours, v_current_window_cost
  from tour_guide_usage
  where account_id = p_account_id
    for update;

  if v_current_hours is null then
    raise exception 'tour_guide_usage row missing for account % after bootstrap attempt', p_account_id;
  end if;

  -- Convert USD amount to hours using BASE_RATE_USD_PER_HOUR
  v_new_hours := v_current_hours + (p_amount / v_base_rate);
  v_new_window_cost := v_current_window_cost + p_amount;

  -- Check hourly cap
  if v_new_hours > v_hours_allocated then
    return query select false, v_current_hours, greatest(v_hours_allocated - v_current_hours, 0), v_current_window_cost, (v_current_window_cost >= v_base_rate);
    return;
  end if;

  -- Check hourly window cap
  if v_new_window_cost >= v_base_rate then
    return query select false, v_current_hours, greatest(v_hours_allocated - v_current_hours, 0), v_current_window_cost, true;
    return;
  end if;

  v_new_status := case
    when v_new_hours >= v_hours_allocated then 'capped'
    when v_new_hours >= v_hours_allocated * 0.8 then 'warned'
    else 'active'
  end;

  update tour_guide_usage
    set hours_consumed = v_new_hours,
        current_window_cost_usd = v_new_window_cost,
        feature_breakdown = jsonb_set(
          feature_breakdown,
          array[p_feature],
          to_jsonb(coalesce((feature_breakdown->>p_feature)::numeric, 0) + p_amount)
        ),
        status = v_new_status,
        updated_at = now()
    where account_id = p_account_id;

  return query select true, v_new_hours, greatest(v_hours_allocated - v_new_hours, 0), v_new_window_cost, (v_new_window_cost >= v_base_rate);
end;
$$ language plpgsql;