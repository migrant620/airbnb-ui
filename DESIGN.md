---
version: alpha
name: Airbnb Android Explore and Booking Flow
description: Photo-led white cards on a plain page, a near-black ink with a single rose accent, and a search sheet that reads as one sentence in three clauses. Covers the first batch (Explore, the search sheet, results, listing detail, the photo viewer and the sign-in sheet).
colors:
  page: "#FFFFFF"
  card: "#FFFFFF"
  ink: "#222222"
  secondary: "#6C6C6C"
  tertiary: "#717171"
  hairline: "#DDDDDD"
  hairlineSoft: "#EBEBEB"
  brand: "#FF385C"
  reserve: "#D70466"
  continuePink: "#F13F65"
  chipBg: "#F7F7F7"
  counterCircle: "#F2F2F2"
  scrim: "rgba(0,0,0,0.35)"
typography:
  sectionTitle:
    fontFamily: Plus Jakarta Sans
    fontSize: 18.5px
    fontWeight: 700
    lineHeight: 23.7px
    letterSpacing: -0.61px
  cardTitle:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: 600
    lineHeight: 19px
  cardSub:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 18px
  rating:
    fontFamily: Roboto
    fontSize: 14px
    fontWeight: 500
    lineHeight: 18px
  detailTitle:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: 700
    lineHeight: 25px
  priceNow:
    fontFamily: Roboto
    fontSize: 20px
    fontWeight: 500
    lineHeight: 24px
  navLabel:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: 500
    lineHeight: 12px
  sheetTitle:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: 700
    lineHeight: 32px
spacing:
  frame: 393x777px
  page: 24px
  searchPillHeight: 56px
  cardWidth: 166.7px
  cardGap: 12px
  cardImageHeight: 158px
  counterRowHeight: 56px
  navHeight: 55px
  navItem: 75x56px
rounded:
  searchPill: 28px
  card: 12px
  cardImage: 12px
  sheet: 16px
  chip: 20px
  counterButton: 28px
  circle: 999px
---

## Overview

Based on Airbnb Android 26.38, English, light theme, default font scale, on a 393 dp wide phone frame. This document covers the first release batch only — the Explore page (All, Homes, Experiences, Services), the search sheet (Where, When, Who), the results list, the listing detail page, the photo viewer and the sign-in sheet a signed-out visitor sees. It is not a complete system for every Airbnb screen.

## Colors

The page, cards, sheets and floating controls are all white, so photography is the only strong colour on screen. Text is `ink`, with `secondary` for supporting lines (location, price note, host subtitle) and `tertiary` for inactive navigation labels. `hairline` draws the few lines there are — the tab underline, chip outlines, the top edge of the navigation bar — with `hairlineSoft` for the faintest dividers. `brand` is the accent: the selected tab, the heart, the guest-favourite badge and the active counter glyph. The Reserve button uses the deeper `reserve`, and the sign-in Continue button uses `continuePink`, so each screen has exactly one saturated control. `counterCircle` is the filled disc behind the guest-counter steppers, and `chipBg` fills unselected chips and the rating pill. Sheets dim the page with `scrim`.

## Typography

Sans text is Plus Jakarta Sans, and numeric strings — prices, ratings, dates, counts, the photo counter — are Roboto Medium. Airbnb sets its own Cereal, a commercial face; this prototype substitutes Plus Jakarta Sans and tracks each run in so a string occupies the same width as the original at the same size. Headings and prices carry negative tracking for that reason; body sizes are set to the original and not reduced. Weights step between regular (supporting copy), semibold (card titles, prices, input values) and bold (section headings, page titles, the Reserve label). The navigation labels are small and quiet at 10 dp.

## Layout

A 393 dp frame with 24 dp side margins. Explore: a 56 dp search pill 12 dp from the top, then a 40.4 dp category rail 16 dp below it, then two feed rows of 166.7 dp cards with 12 dp between them, each card a 158 dp image over its title, subtitle, price and rating. The navigation bar is 55 dp tall with five 75 x 56 dp cells inside a 4 dp inset from each side. The search sheet stacks Where, When and Who as three 60 dp rows separated by hairlines, with Clear all and Search below. The guest-counter sheet uses the same 56 dp row rhythm. Listing detail is a full-bleed photo, then title, type, rating, host and highlights in a 24 dp margin, with a price bar pinned to the bottom.

## Elevation & Depth

Depth comes from photography and from a few shadows rather than from borders. Cards and the search pill sit on soft shadows; the navigation bar carries a short upward shadow and a single hairline at its top edge. Sheets lift over a flat 35% black scrim with no blur. The floating "Prices include all fees" pill above the navigation bar is white at 97% opacity with its own shadow. The guest-favourite badge is a white pill at 95% over the photograph.

## Shapes

The search pill is fully rounded at 28 dp; cards and their images are 12 dp; chips and the rating pill are 20 dp; sheet tops are 16 dp; the guest-counter stepper discs are circles in `counterCircle` with round-rect glyphs inside; the guest-favourite badge is a pill; the photo-counter pill is fully rounded. Nothing else has a radius, and control outlines — where they exist — are 1 dp `hairline`.

## Components

Explore carries a search pill with the magnifier, a horizontally scrolling category rail where the selected chip is `ink` when unfiltered, and two card rows (a wide first row and a mixed second row) with badge, heart, title, location, price and rating. The search sheet shows Where (a recommended-destination list with a small thumbnail, name and region), When (a two-month calendar with start, end and in-range highlighting) and Who (adult, child, infant and pet counters that disable at their limits), with Clear all and Search. Results list a query summary and cards that carry a photo count, heart, title, date range, price and rating. Listing detail shows a photo with a `1 / N` counter, back, share and heart controls, the title, type and capacity line, the rating with its review count and guest-favourite flag, the host block, highlight rows with icons, and a bottom price bar with the nightly price and a Reserve button. The photo viewer is a full-bleed gallery with a counter and a category strip. The sign-in sheet is a bottom sheet with the title, a phone-or-email field, Continue, an "or" divider, Continue with Google and Continue with Apple, and a close control. The Log In tab is a stroked ring with a stroked figure inside it: a head arc left open at the bottom and two shoulder strokes running down to the ring, drawn in one weight with nothing filled. No Airbnb brand graphics, logos or avatar illustrations are used.

## Do's and Don'ts

Use real text, real inputs and stateful controls with local sample data. Never ship photographs, illustrations or brand graphics taken from Airbnb, and never pass off a reproduction of one as original artwork. Keep the accent single per screen: a screen should not show `brand`, `reserve` and `continuePink` at once. Do not add controls a signed-out visitor cannot see — there is no booking confirmation, no payment sheet and no host tools in this batch.

## Responsive Behavior

Mobile-first at 393 dp. On narrower screens the card rows keep their 166.7 dp cards and the rail scrolls; margins reduce but never collapse; the price bar and the navigation bar stay pinned so every control remains reachable. On shorter screens the sheets and the listing detail scroll rather than compressing. Wider screens centre the phone frame.

## Iteration Guide

Change a value in `src/tokens.ts`, rebuild, and recheck every screen that uses it; the tokens are shared, so one change moves several screens at once. Numeric sizes are set to the original and widths are matched with tracking, so prefer adjusting `letterSpacing` over `fontSize` when a run of text measures wide.

## Known Gaps

- Typeface: Plus Jakarta Sans stands in for Cereal; widths are matched per string, stroke weight differs slightly.
- Icons: every interface glyph, including the five navigation icons, is an original vector drawing built to the reference geometry. It is a close approximation, not the original artwork.
- Navigation glyphs: measured against the reference screenshot with the five cells aligned by their labels, the marks sit 3.28 to 5.82 dp lower than the reference and four of them draw 2.2 to 4.0 dp less ink. The Log In mark was rebuilt to the measured 22.56 dp and matches; the other four still sit inside a 24 dp box with a wider inset than the reference uses. The offset is common to all five cells, so it reads as one layout correction rather than four separate icon fixes. The interface comparison measures declared nodes, not glyph ink, so this is recorded here rather than enforced.
- Sample content: all listings, hosts and reviews are fictional and all photographs are original works made for this prototype.
- Search-results, listing-detail, photo-viewer and sign-in states are reachable but have not yet been refined to the same standard as Explore and the search sheet.
- The map view, filtering, wishlists, Trips, Messages and the full facilities and review lists are out of scope for this batch.
- Sign-in, booking and payment are appearance only.
