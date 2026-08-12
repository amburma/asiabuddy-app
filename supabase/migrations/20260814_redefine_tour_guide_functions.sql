-- ============================================================================
-- Migration: 20260814_redefine_tour_guide_functions.sql
--
-- CHANGE 1: increment_tour_guide_usage() signature simplified from
-- (p_account_id, p_feature, p_amount, p_cap_usd) back to
-- (p_account_id, p_feature, p_amount). The cap is now computed INSIDE the
-- function by looking up the account's source + total_hours_allocated,
-- applying the tier rate rules from project plan §1.2. This keeps the rate
-- logic in one place (the DB) instead of splitting it between app code and
-- SQL, removing the risk of CostGateService and this function disagreeing
-- on what the cap is.
--
-- Rates (source: §1.2 Business Constraints, hardcoded — see trade-off note
-- in the accompanying explanation):
--   package:   $1.50 real-cost hard-stop per 10 hours  => $0.15 / hour
--   purchased: $1.50 real-cost hard-stop per hour (sold at $2/hour)
--   trial:     not valid for this function — raises an exception. Trial
--              uses increment_tour_guide_trial_usage() (CHANGE 2 below),
--              which is wall-clock (seconds) based, not cost based.
--
-- CHANGE 2: new increment_tour_guide_trial_usage() function, same atomic
-- check-and-deduct + row-lock pattern as increment_tour_guide_usage(), but
-- operating on tour_guide_trial_usage.seconds_used against a fixed 120s
-- (2-minute) cap per §1.1. Rejects if called for a non-trial account.
-- ============================================================================

-- Drop the old 4-arg version from 20260812 — signature is changing, not just
-- the body, so CREATE OR REPLACE alone will not remove it (Postgres treats
-- differing argument lists as distinct functions/overloads).
drop function if exists increment_tour_guide_usage(uuid, text, numeric, numeric);

create or replace function increment_tour_guide_usage(
  p_account_id uuid,
  p_feature text,
  p_amount numeric
) returns table(
  success boolean,
  new_total_usd numeric,
  remaining_usd numeric
) as $$
declare
  v_source text;
  v_hours_allocated numeric;
  v_cap_usd numeric;
  v_current numeric;
  v_new_total numeric;
  v_new_status text;
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

  v_cap_usd := case v_source
    when 'package' then v_hours_allocated * 0.15
    when 'purchased' then v_hours_allocated * 1.50
    else null
  end;

  if v_cap_usd is null then
    raise exception 'increment_tour_guide_usage() is not valid for source=%; trial accounts use increment_tour_guide_trial_usage() instead', v_source;
  end if;

  insert into tour_guide_usage (account_id)
  values (p_account_id)
  on conflict (account_id) do nothing;

  select total_cost_usd into v_current
  from tour_guide_usage
  where account_id = p_account_id
  for update;

  if v_current is null then
    raise exception 'tour_guide_usage row missing for account % after bootstrap attempt', p_account_id;
  end if;

  if v_current + p_amount > v_cap_usd then
    return query select false, v_current, greatest(v_cap_usd - v_current, 0);
    return;
  end if;

  v_new_total := v_current + p_amount;
  v_new_status := case
    when v_new_total >= v_cap_usd then 'capped'
    when v_new_total >= v_cap_usd * 0.8 then 'warned'
    else 'active'
  end;

  update tour_guide_usage
    set total_cost_usd = v_new_total,
        feature_breakdown = jsonb_set(
          feature_breakdown,
          array[p_feature],
          to_jsonb(coalesce((feature_breakdown->>p_feature)::numeric, 0) + p_amount)
        ),
        status = v_new_status,
        updated_at = now()
    where account_id = p_account_id;

  return query select true, v_new_total, greatest(v_cap_usd - v_new_total, 0);
end;
$$ language plpgsql;


create or replace function increment_tour_guide_trial_usage(
  p_account_id uuid,
  p_seconds int
) returns table(
  success boolean,
  new_seconds_used int,
  remaining_seconds int
) as $$
declare
  v_source text;
  v_current int;
  v_new int;
  v_cap constant int := 120; -- fixed 2-minute trial cap, §1.1 / §3.1
begin
  if p_seconds < 0 then
    raise exception 'p_seconds must be non-negative, got %', p_seconds;
  end if;

  select source into v_source
  from tour_guide_accounts
  where id = p_account_id;

  if v_source is null then
    raise exception 'tour_guide_accounts row not found for account %', p_account_id;
  end if;

  if v_source <> 'trial' then
    raise exception 'increment_tour_guide_trial_usage() is only valid for source=''trial''; account % has source=%', p_account_id, v_source;
  end if;

  insert into tour_guide_trial_usage (account_id)
  values (p_account_id)
  on conflict (account_id) do nothing;

  select seconds_used into v_current
  from tour_guide_trial_usage
  where account_id = p_account_id
  for update;

  if v_current is null then
    raise exception 'tour_guide_trial_usage row missing for account % after bootstrap attempt', p_account_id;
  end if;

  if v_current + p_seconds > v_cap then
    return query select false, v_current, greatest(v_cap - v_current, 0);
    return;
  end if;

  v_new := v_current + p_seconds;

  update tour_guide_trial_usage
    set seconds_used = v_new,
        status = case when v_new >= v_cap then 'exhausted' else 'active' end,
        updated_at = now()
    where account_id = p_account_id;

  return query select true, v_new, greatest(v_cap - v_new, 0);
end;
$$ language plpgsql;
