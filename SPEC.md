# Beyond the Code — GA 2026 Site

## Problem Statement

CCS-CSC runs General Assembly (GA) "Beyond the Code" on Aug 27 2026. Students need
a way to generate branded course frame photos for social media (twibbon-style),
a readable version of the event program flow, and a path to the existing
attendance/QR-code app. Twibbonize-style sites charge to remove their watermark;
running the same flow ourselves removes that cost and dependency, and keeps
student photos off a third-party server.

## Solution

A single Next.js + shadcn app with three areas:

1. A frame generator (`/generator`) — pick one of four course frames (ACT,
   BSIS, BSCS, BSIT), upload a photo, pan/zoom it into the frame's circular
   cutout, download the composited PNG. Fully client-side, no upload to any
   server.
2. A program-flow page (`/program`) — the AM/PM schedule from the poster
   assets, rebuilt as readable, responsive HTML/table content instead of a
   flat image.
3. A landing hub (`/`) — event hero (theme, date, time, venue) plus three
   entry cards: Make a Frame → `/generator`, Program Flow → `/program`,
   Attendance → external link (placeholder URL for now, to be swapped for the
   already-deployed attendance/QR app).

Visual theme matches the GA poster: dark navy/purple, bold rounded display
type, sci-fi accent glow — applied consistently across all three routes.

## User Stories

1. As a CCS student, I want to pick my course's frame, so my photo is
   branded correctly for my program (ACT/BSIS/BSCS/BSIT).
2. As a CCS student, I want to upload a photo from my phone, so I can make a
   frame without needing a desktop.
3. As a CCS student, I want to drag my photo to reposition it inside the
   circular cutout, so my face is centered correctly.
4. As a CCS student, I want to pinch or scroll to zoom my photo, so I can
   crop tightly or loosely as needed.
5. As a CCS student, I want to download the finished frame as a PNG at full
   resolution, so I can post it without visible quality loss.
6. As a CCS student, I do not want to see a paid watermark-removal upsell,
   so the whole flow feels free and official.
7. As a CCS student, I want to view the program flow on my phone, so I know
   what time each segment starts without squinting at a poster JPEG.
8. As a CCS student, I want a single homepage that tells me what to do
   (make a frame, check the schedule, get my attendance QR), so I'm not
   hunting across separate links.
9. As a CCS student, I want the attendance card to send me to the existing
   QR/attendance app, so I don't need a second unrelated tool.
10. As a site visitor, I want the whole site to visually match the official
    GA poster branding, so it reads as an official CSC production.
11. As a CCS-CSC officer, I want zero backend/database to maintain, so there's
    no server cost, no accounts, and no student photo data retained anywhere.
12. As a CCS-CSC officer, I want the site deployed on Vercel, so publishing
    updates is a git push with no server ops.
13. As a mobile user, I want touch drag and pinch-zoom to work the same as
    mouse drag and scroll-zoom on desktop, so the experience isn't
    desktop-only.

## Implementation Decisions

- **Stack**: Next.js (App Router), TypeScript, Tailwind, shadcn/ui components,
  deployed on Vercel.
- **Routes**: `/` (landing hub), `/generator` (frame maker), `/program`
  (schedule). Attendance is an external `<a>` link, URL is a placeholder
  constant until the real attendance app URL is supplied.
- **Frame assets**: four course frame images (ACT, BSIS, BSCS, BSIT) served
  as static files from `/public`, each with a known circular cutout region
  (center + radius) hardcoded per frame, since frame art is fixed and won't
  be user-editable.
- **Compositing**: done entirely client-side via HTML Canvas — draw the
  user's photo (transformed by pan offset + zoom scale) clipped to the
  cutout circle, then draw the frame PNG on top. No image ever leaves the
  browser; no upload endpoint exists.
- **Interaction model**: pointer events (unified mouse+touch) for drag-to-pan;
  wheel event for desktop zoom, pinch (two-pointer distance delta) for touch
  zoom, plus a zoom slider as a fallback control. No rotate control.
- **Output**: PNG download at each frame's native pixel resolution (4096×4096
  for ACT/BSIS/BSCS/BSIT square frames — actual per-frame dimensions read
  from the source assets, not assumed uniform). No share-to-social buttons.
- **No backend**: no database, no analytics, no accounts, no supporter
  counter. Static/client-rendered pages only.
- **Program page content**: schedule data (time blocks, segment names,
  presenter names/roles) transcribed from the poster program-flow assets
  into a typed data structure in code, then rendered as HTML — not an
  embedded image.
- **Theming**: dark navy/purple palette and display typography matching the
  "Beyond the Code" poster, applied via a shared Tailwind theme/shadcn theme
  config so all three routes are visually consistent.

## Testing Decisions

- No existing test setup in this repo yet; this is a greenfield app.
- Compositing logic (pan/zoom transform → canvas draw → export) is the one
  piece of real logic worth a unit test: given a known transform and a known
  frame cutout, the output image dimensions and clip region should match
  expectations. Test at the transform-math level (pure function), not by
  rendering actual canvases, to keep it fast and independent of DOM/canvas
  availability.
- No test needed for static page content (landing hub, program schedule) —
  it's declarative markup/data, not branching logic.

## Out of Scope

- Building or modifying the attendance/QR app — it's already built and
  deployed elsewhere; this project only links to it.
- Any backend, database, authentication, or analytics.
- Social share integrations (Facebook/X/etc.).
- Photo rotation control.
- Supporter/download counters or leaderboards.
- Multi-event support — this site is scoped to GA 2026 "Beyond the Code"
  only.

## Further Notes

- Attendance URL is a placeholder (`PLACEHOLDER_ATTENDANCE_URL` or similar
  constant) until the real deployed URL is provided — swap in one place.
- Source frame/poster assets currently live in `ASSETS/` at repo root as
  loose JPEGs; they should be renamed to meaningful filenames (e.g.
  `frame-act.jpg`, `frame-bsis.jpg`, `frame-bscs.jpg`, `frame-bsit.jpg`,
  `poster-hero.jpg`, `program-flow-am.jpg`, `program-flow-pm.jpg`) and moved
  into `public/` as part of implementation.
- Event details for the landing hero: theme "Beyond the Code", General
  Assembly 2026, August 27 2026, 7:30 AM – 5:00 PM, ST Quadrangle.
