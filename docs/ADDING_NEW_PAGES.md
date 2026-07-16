---
# Adding a New Page to AsiaBuddy — Required Steps

## Why this doc exists
`proxy.ts` at the project root contains a country-path whitelist (`VALID_COUNTRIES`). Any top-level route that is NOT a country page will be auto-redirected to `/` unless it's added to `EXCLUDED_PATHS` in `proxy.ts`. This has caused routing bugs before (e.g. `/partner-invite-2026` silently redirecting to home). Follow this checklist every time a new page is added.

## Checklist
1. Create the page at `app/<route-name>/page.tsx`.
2. Add `'/<route-name>'` to the `EXCLUDED_PATHS` array in `proxy.ts` at the project root. This step is mandatory for any non-country top-level route.
3. If the page should be private/unlisted:
   - Add a `layout.tsx` in the same folder exporting `robots: { index: false, follow: false, noarchive: true }` metadata (required if `page.tsx` uses `'use client'`, since client components can't export metadata directly).
   - Add a `Disallow: /<route-name>` line to `public/robots.txt`.
4. Clear the `.next` cache and restart the dev server before testing: `Remove-Item -Recurse -Force .next` then `npm run dev`.
5. Manually verify in the browser:
   - The new route loads without redirecting to home.
   - Existing country routes (e.g. `/thailand`) still work.
   - A random non-existent path still redirects to home as expected.
6. Only commit and push after all three checks above pass.
---
