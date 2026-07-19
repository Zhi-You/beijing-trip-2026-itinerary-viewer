# Beijing Imperial Autumn — Trip Itinerary Website

Interactive itinerary for a 4-person Beijing trip (1–9 November 2026).

## Quick start

```bash
cd C:\Beijing_Trip_2026
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The static site is output to `dist/` — deploy to Netlify, Vercel, GitHub Pages, or any static host.

## What’s included

Same architecture as the Tokyo planner, adapted for Beijing:

- **Home overview** — season notes, booking checklist, day-by-day itinerary, Pokemon stops, food map, tips
- **Customize mode** — drag & drop timeline, custom activities/meals, notes, export/import (localStorage)
- **Today’s plan & map** (`/day/:dayId`) — map-first day focus with GPS, stop filtering, Google Maps directions
- **Flights** — SQ 810 into PKX (1 Nov) and SQ 805 out of PEK T3 (9 Nov)
- **Mobile** — bottom nav, safe areas, large touch targets
- **i18n-ready** — UI strings in `src/i18n/locales/en/common.json`; content in `src/data/itinerary.en.ts`

## Customizable planner

The **Itinerary** section has a **View / Customize** toggle. Changes auto-save in this browser’s localStorage (`beijing-itinerary-board-v1`).

### Deploying with your custom timeline

1. In **Customize** mode, click **Export timeline** → saves `beijing-itinerary-board.json`
2. Copy it to `public/custom-board.json`
3. Run `npm run build` and deploy `dist/`

For GitHub project pages, set `base` in `vite.config.ts` to your repo path.

## Day map & focus page

- Leaflet + OpenStreetMap (no API key)
- Day focus page: live location, tap a stop to filter the map, open Google Maps for navigation
- Coordinates live in `src/data/locationCoordinates.ts`

## Key booking deadlines

| Item | Action |
|------|--------|
| Forbidden City (3 Nov, Tue) | Real-name timed tickets — book when slots open (closed Mondays) |
| National Museum (5 Nov, Thu) | Free reservation with passport |
| Mutianyu Great Wall (6 Nov, Fri) | Entry + cable car; private DiDi recommended |
| Alipay / WeChat / DiDi | Set up before departure |
| Airports | Arrive PKX · Depart PEK T3 (different airports!) |

## Project layout

```
src/
  i18n/                 # UI labels (add zh later)
  data/itinerary.en.ts  # Full itinerary content
  data/locationCoordinates.ts
  pages/                # Home + Day focus
  components/           # UI
```

### Adding Chinese later

1. Copy `src/data/itinerary.en.ts` → `itinerary.zh.ts`
2. Add `src/i18n/locales/zh/common.json`
3. Register in `src/i18n/index.ts`
4. Update `getItinerary()` to switch on locale
