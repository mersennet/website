<p align="center"><a href="https://mersennet.com"><img src="https://raw.githubusercontent.com/mersennet/.github/main/profile/mark.svg" width="72" alt="Mersennet"></a></p>
<h1 align="center">Mersennet Website</h1>
<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-7dff9b?style=flat-square" alt="MIT license"></a>
  <a href="https://github.com/mersennet/website/actions/workflows/ci.yml"><img src="https://github.com/mersennet/website/actions/workflows/ci.yml/badge.svg?branch=main" alt="CI"></a>
  <a href="https://mersennet.com"><img src="https://img.shields.io/badge/docs-mersennet-1c1c1c?style=flat-square" alt="Docs"></a>
  <a href="https://t.me/Mersennet"><img src="https://img.shields.io/badge/telegram-%40Mersennet-26A5E4?style=flat-square" alt="Telegram"></a>
</p>

The network home for **Mersennet** — the landing site for the whole network, served at [mersennet.com](https://mersennet.com).

A standalone [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS app, statically exported so it can be hosted on any static host (Vercel, Netlify, Cloudflare Pages, S3/CDN, Nginx).

> Documentation lives separately in [`../docs-site`](../docs-site) (Docusaurus) and is served at `docs.mersennet.com`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export written to ./out
```

Because `next.config.mjs` sets `output: 'export'`, `npm run build` produces a fully static site in `out/`. Serve it locally with any static server, e.g.:

```bash
npx serve out
```

## Structure

```
app/
  layout.tsx                 # fonts (Sora / Instrument Serif / JetBrains Mono) + SEO metadata
  page.tsx                   # landing composition
  page.module.css            # cosmic design system
  globals.css                # reset + base
  site.ts                    # brand facts + external links (single source of truth)
  sitemap.ts / robots.ts     # generated sitemap.xml + robots.txt
  components/                # Nav, Hero, Ticker, StatBand, Pillars, Thesis, Edge, HowItWorks, BuildShowcase, SelectiveDisclosure, Verifiability, Momentum, Ecosystem, Operate (live RPC stats), CtaBand, Footer, Icon
public/
  favicon.svg                # icon
  logo.svg                   # brand mark
  og.svg                     # OpenGraph / social card (1200x630)
```

## Editing content

- Brand facts (chain ID, RPC, symbol) and all outbound links: [`app/site.ts`](app/site.ts).
- Section copy lives in the matching component under [`app/components`](app/components).

## Notes

- The OpenGraph image is provided as `public/og.svg`. Some social platforms prefer PNG; export `og.svg` to a 1200x630 PNG and point `openGraph.images` / `twitter.images` in `app/layout.tsx` at it if you want maximum preview compatibility.
- External links (explorer, faucet) currently point at the testnet host IP. Update them in `app/site.ts` once DNS is in place.

---

<p align="center">
  Part of the <a href="https://github.com/mersennet">Mersennet</a> ecosystem —
  <a href="https://trade.mersennet.com">trade</a> ·
  <a href="https://explorer.mersennet.com">explorer</a> ·
  <a href="https://docs.mersennet.com">docs</a> ·
  <a href="https://mersennet.com/downloads/">run a node</a> ·
  <a href="https://t.me/Mersennet">Telegram</a><br>
  <sub>© 2026 Mersennet Foundation · MIT License · security@mersennet.com</sub>
</p>
