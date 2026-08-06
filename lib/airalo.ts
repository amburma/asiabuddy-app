// PART 1 — Airalo eSIM affiliate link generator
// Mirrors the structure/conventions of lib/twelveGo.ts (generate12GoLink)

const AIRALO_AFFILIATE_LINK = 'https://airalo.tpo.lu/CMO35G2k';

// Airalo's own country landing pages follow this pattern (confirmed):
// https://www.airalo.com/thailand-esim, https://www.airalo.com/vietnam-esim, etc.
const AIRALO_ESIM_BASE = 'https://www.airalo.com';

export function generateAiraloLink(params: {
  countryId: string;   // must match Country['id'] from data/countries.ts, e.g. 'thailand'
  subId?: string;      // optional click/campaign tracking value, e.g. 'esim-card-home' or 'esim-page-thailand'
}): string {
  const { countryId, subId } = params;

  // Deep-link override to Airalo's country-specific eSIM page, passed via Impact.com's
  // generic "u" param (landing page override / deep link).
  const deepLinkTarget = `${AIRALO_ESIM_BASE}/${countryId}-esim`;

  const queryParams = new URLSearchParams();
  queryParams.set('u', deepLinkTarget);
  if (subId) {
    queryParams.set('subid1', subId);
  }

  return `${AIRALO_AFFILIATE_LINK}?${queryParams.toString()}`;
}
