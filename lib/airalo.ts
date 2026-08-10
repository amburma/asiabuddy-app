// PART 1 — Airalo eSIM affiliate link generator
// Uses Travelpayouts (not Impact.com) — base link verified in Travelpayouts dashboard, Aug 2026.
// Destination is generic airalo.com homepage; no per-country deep link exists for this program.
// sub_id is the correct override parameter per Travelpayouts docs.

const AIRALO_AFFILIATE_LINK = 'https://airalo.tpo.lu/CMO35G2k';

export function generateAiraloLink({ subId }: { subId?: string }): string {
  const baseUrl = AIRALO_AFFILIATE_LINK;
  if (!subId) return baseUrl;
  return `${baseUrl}?sub_id=${encodeURIComponent(subId)}`;
}
