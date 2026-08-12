-- ============================================================================
-- Migration: 20260812_create_increment_tour_guide_usage_function.sql
-- Task 0.2 — Atomic check-and-deduct function for tour_guide_usage
--
-- DESIGN DECISION (deviates from plan §3.2's literal SQL):
-- §3.2 shows a plain UPDATE ... SET total_cost_usd = total_cost_usd + p_amount
-- with no budget check inside the function. §2.3 explicitly requires
-- check-and-deduct to happen as ONE atomic DB operation to prevent two
-- concurrent tabs/requests from both passing a budget check before either
-- deducts. This version folds the cap check into the same transaction as the
-- deduct, using `SELECT ... FOR UPDATE` to lock the account's usage row so
-- concurrent callers serialize instead of racing.
--
-- Signature changed from plan's numeric-only return to a row, since the
-- caller (CostGateService) needs to know whether the deduct was accepted or
-- rejected, not just the resulting total.
--
-- ASSUMPTION NOT YET VERIFIED: this function assumes a tour_guide_usage row
-- may or may not already exist for the account (bootstraps it via
-- ON CONFLICT DO NOTHING if missing). Confirm whether application code
-- already inserts a tour_guide_usage row at account-creation time — if it
-- does, the bootstrap branch here is simply a no-op safety net.
-- ============================================================================

create or replace function increment_tour_guide_usage(
  p_account_id uuid,
  p_feature text,
  p_amount numeric,
  p_cap_usd numeric
) returns table(
  success boolean,
  new_total_usd numeric,
  remaining_usd numeric
) as $$
declare
  v_current numeric;
  v_new_total numeric;
  v_new_status text;
begin
  if p_amount < 0 then
    raise exception 'p_amount must be non-negative, got %', p_amount;
  end if;

  -- Bootstrap the usage row if it doesn't exist yet (safety net; see note above).
  insert into tour_guide_usage (account_id)
  values (p_account_id)
  on conflict (account_id) do nothing;

  -- Row lock: any other concurrent call for the SAME account_id blocks here
  -- until this transaction commits or rolls back. This is what makes the
  -- check-then-deduct sequence below atomic across concurrent requests.
  select total_cost_usd into v_current
  from tour_guide_usage
  where account_id = p_account_id
  for update;

  if v_current is null then
    raise exception 'tour_guide_usage row missing for account % after bootstrap attempt', p_account_id;
  end if;

  -- Reject if this deduct would push the account over its cap.
  if v_current + p_amount > p_cap_usd then
    return query select false, v_current, greatest(p_cap_usd - v_current, 0);
    return;
  end if;

  v_new_total := v_current + p_amount;
  v_new_status := case
    when v_new_total >= p_cap_usd then 'capped'
    when v_new_total >= p_cap_usd * 0.8 then 'warned'
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

  return query select true, v_new_total, greatest(p_cap_usd - v_new_total, 0);
end;
$$ language plpgsql;
