/**
 * Design tokens for the Airbnb-style prototype.
 *
 * Every value is derived from the product's own interface, mapped from raw device
 * pixels into the 393 x 777 logical frame:
 *   x_logical = x_raw / 2.75
 *   y_logical = (y_raw - 136) / 2.75
 * The interface is a 393 x 777 logical dp frame.
 *
 * Colours were sampled per-pixel from the interface :
 *   primary ink text ........ (34,34,34)      => #222222
 *   secondary text .......... (108,108,108)   => #6C6C6C
 *   Reserve button .......... (215,4,102)     => #D70466
 *   Continue button ......... (242,42,84)     => #F22A54
 *   Search pill ............. (229,29,84)     => #E51D56
 *   page / card / sheet ..... #FFFFFF
 *   nav hairline ............ ~#DDDDDD
 *
 * Fonts: Airbnb Cereal (proprietary) is replaced by Plus Jakarta Sans (OFL),
 * chosen by per-character advance measurement against the reference tab strings
 * (regular ratio 0.990, bold ~1.03 — closest of five candidates). Numeric
 * strings (prices, ratings, dates, counts) use Roboto Medium (Apache-2.0), as
 * specified, mirrored from the Tiimo project.
 */

export const colors = {
  white: '#FFFFFF',
  page: '#FFFFFF',
  surface: '#FFFFFF',
  ink: '#222222',
  /* The login sheet's heading and its "or" separator sample pure black (0,0,0), unlike the
   * #222222 the rest of the product's ink samples at. */
  black: '#000000',
  secondary: '#6C6C6C',
  tertiary: '#717171',
  hairline: '#DDDDDD',
  hairlineSoft: '#EBEBEB',
  brand: '#FF385C',
  reserve: '#D70466',
  /* The login sheet's primary action fills (242,42,84) — a warmer step than the reserve
     button's #D70466; both are sampled off the interface's own buttons. */
  continuePink: '#F22A54',
  /* The search sheet's primary pill fills (229,29,84), a step between the two above. */
  searchPink: '#E51D56',
  chipBg: '#F7F7F7',
  /* The chosen category chip's own fill. Sampled off the reference row: the pill reads 227,226,224
     in the middle and 220 at its edges. */
  chipSelected: '#E3E2E0',
  chipBorder: '#DDDDDD',
  /* Guest-counter stepper: the reference draws a filled #F2F2F2 disc (sampled 242,242,242) for both
   * the enabled and the disabled state; only the glyph changes colour. */
  counterCircle: '#F2F2F2',
  guestFavBg: 'rgba(255,255,255,0.95)',
  guestFavInk: '#222222',
  star: '#222222',
  /* Nav marks. Sampled off the interface's nav row: the selected cell's glyph and its
   * label both read #DA1249 pink, and the four idle ones read #6C6C6C - not the #222222/#717171 the
   * first pass assumed, which came from the icon set rather than from this row. */
  navInactive: '#6C6C6C',
  navActive: '#DA1249',
  pillBorder: '#DDDDDD',
  scrim: 'rgba(0,0,0,0.35)',
  /* The search sheet's backdrop plate: the grey the sheet card floats on. Sampled per-pixel off
   * A3-search-where above the card's edge (y 5/15/25/35/45/60/80/95 dp x 10/300/380 dp) the
   * reference reads a near-uniform 225..235 - the sheet's own tab row and close disc are the only
   * things drawn on it, so this is an opaque plate rather than a window onto the screen below.
   * Without it the card's white close disc was invisible on white. */
  sheetBackdrop: '#E3E3E3',
  /* The search sheet card's own top edge, measured off the capture: the row at y=101 dp still reads
   * 223 and the row at y=102 dp reads 255. */
  sheetTopOffset: 101.5,
  /* The search sheet card's own bottom edge, and the shadow it casts on the plate below it. Measured
   * the same way as the top edge, down the centre column of A3-search-where: the card's last white
   * row is y=681, the row at y=682 reads 189, and it recovers to the plate's own 237 by y=688 - so
   * the card stops 95 dp short of the frame and the plate shows below it, with a 6.5 dp shadow that
   * starts at 0.20 alpha (189 against a 237 plate) and falls to nothing. A4-when-range ends on the
   * same row (255 at 681, 209 at 682). The bottom 95 dp (the footer's divider and buttons) sit on
   * the plate, not on the card: the reference reads 223..236 there, never 255. */
  sheetBottomInset: 95,
  sheetShadowHeight: 6.5,
  sheetShadowTopAlpha: 0.2,
  /* The "Suggested destinations" artwork. The reference paints flat pastel tiles carrying a
   * coloured line drawing, not photographs; both the tile fill and the drawing's stroke are
   * sampled per-pixel inside each 56x56 tile (x 36..91.7, y 257.2..312.9 for the first row). */
  destTileNearby: '#F0F6FB',
  destTileLake: '#F0F5F1',
  destTileMountain: '#FDF7F0',
  destTileCity: '#FEF5F6',
  destInkNearby: '#4A81B0',
  destInkLake: '#0A6516',
  destInkMountain: '#E58D38',
  destInkCity: '#F2705C',
  iconGray: '#222222',
  ratingPillBg: '#F7F7F7',
  mapBg: '#E8ECEF',
  mapWater: '#AADCE8',
  mapRoad: '#FFFFFF',
  mapBlock: '#DFE5E8',
  pinBg: '#222222',
  pinText: '#FFFFFF',
  selectedTab: '#222222',
} as const;

export const fontFiles = {
  'Roboto-400': require('../assets/fonts/Roboto_400Regular.ttf'),
  'Roboto-500': require('../assets/fonts/Roboto_500Medium.ttf'),
  'Roboto-700': require('../assets/fonts/Roboto_700Bold.ttf'),
  PJS: require('../assets/fonts/PlusJakartaSans-VF.ttf'),
};

export const fonts = {
  /** Body / headings: Plus Jakarta Sans (variable, weights via fontWeight). */
  sans: 'PJS',
  /** Numeric strings: Roboto Medium (Apache-2.0). */
  num: 'Roboto-500',
  roboto400: 'Roboto-400',
  roboto700: 'Roboto-700',
} as const;

export const type = {
  // letterSpacing values are measured corrections: the substitute face runs wider than Airbnb Cereal,
  // so each run is tracked in until its advance width matches the reference TextView .
  searchPill: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 20, fontWeight: '500' as const, letterSpacing: -0.68, color: colors.ink },
  /* The category rail sets every chip at one weight - the reference's chosen pill carries 18.0% ink
     over its run and its unchosen neighbours 19.0%, while the prototype at 700/400 measured 33.4% and
     21.1%. Both steps below are the same value, and it is the one the reference measures. */
  tab: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 20, fontWeight: '400' as const, letterSpacing: -0.875, color: colors.ink },
  tabSelected: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 20, fontWeight: '400' as const, letterSpacing: -0.875, color: colors.ink },
  sectionTitle: { fontFamily: fonts.sans, fontSize: 18.5, lineHeight: 23.7, fontWeight: '700' as const, letterSpacing: -0.61, color: colors.ink },
  /* Calibrated against the reference's own raster, not chosen by eye. The reference's run is narrower
     per character and lighter per stroke than Plus Jakarta Sans at the same nominal step, so both the
     size and the weight are set to what reproduces the reference: at 14 dp the substitute set
     "Plus, get Airbnb credit when you stay at a featured" 336 dp wide where the reference measures
     298.8, so the run is set at 12.1 dp and tracked out to the reference's own advance. */
  subtitle: { fontFamily: fonts.sans, fontSize: 12.1, lineHeight: 15.85, fontWeight: '400' as const, letterSpacing: 0.15, color: colors.secondary },
  cardTitle: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 17, fontWeight: '600' as const, letterSpacing: -0.35, color: colors.ink },
  cardSub: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, fontWeight: '400' as const, color: colors.secondary },
  cardPrice: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18, fontWeight: '400' as const, letterSpacing: -0.2, color: colors.ink, flexShrink: 0 },
  cardRatingNum: { fontFamily: fonts.num, fontSize: 13, lineHeight: 18, fontWeight: '500' as const, color: colors.ink, flexShrink: 0 },
  rating: { fontFamily: fonts.num, fontSize: 14, lineHeight: 18, fontWeight: '500' as const, color: colors.ink },
  navLabel: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 12, fontWeight: '500' as const, color: colors.navInactive },
  navLabelActive: { fontFamily: fonts.sans, fontSize: 10, lineHeight: 12, fontWeight: '700' as const, color: colors.navActive },
  sheetTitle: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 20, fontWeight: '700' as const, color: colors.ink },
  sheetSectionTitle: { fontFamily: fonts.sans, fontSize: 22, lineHeight: 27, fontWeight: '700' as const, color: colors.ink },
  inputPlaceholder: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '400' as const, color: colors.secondary },
  inputValue: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '600' as const, color: colors.ink },
  destName: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 20, fontWeight: '600' as const, color: colors.ink },
  destSub: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, fontWeight: '400' as const, color: colors.secondary },
  counterLabel: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 20, fontWeight: '400' as const, color: colors.ink },
  counterCaption: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 17, fontWeight: '400' as const, color: colors.secondary },
  counterValue: { fontFamily: fonts.roboto400, fontSize: 16, lineHeight: 20, fontWeight: '500' as const, color: colors.ink },
  detailTitle: { fontFamily: fonts.sans, fontSize: 20, lineHeight: 25, fontWeight: '700' as const, color: colors.ink },
  detailSub: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 19, fontWeight: '400' as const, color: colors.secondary },
  detailMeta: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 19, fontWeight: '400' as const, color: colors.ink },
  detailRating: { fontFamily: fonts.num, fontSize: 18, lineHeight: 22, fontWeight: '500' as const, color: colors.ink },
  guestFav: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, fontWeight: '600' as const, color: colors.ink },
  hostName: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 19, fontWeight: '600' as const, color: colors.ink },
  hostSub: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 17, fontWeight: '400' as const, color: colors.secondary },
  superhost: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 17, fontWeight: '600' as const, color: colors.ink },
  badgePill: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 16, fontWeight: '600' as const, color: colors.ink },
  priceNow: { fontFamily: fonts.num, fontSize: 20, lineHeight: 24, fontWeight: '500' as const, color: colors.ink },
  priceWas: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, fontWeight: '400' as const, color: colors.secondary },
  priceNote: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 17, fontWeight: '400' as const, color: colors.secondary },
  reserveBtn: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 20, fontWeight: '700' as const, color: colors.white },
  photoCatTitle: { fontFamily: fonts.sans, fontSize: 22, lineHeight: 27, fontWeight: '700' as const, color: colors.ink },
  photoCaption: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 19, fontWeight: '400' as const, color: colors.white },
  loginTitle: { fontFamily: fonts.sans, fontSize: 26, lineHeight: 32, fontWeight: '700' as const, color: colors.ink },
  /* "Phone number or email": the medium step carries 1.154x the reference's contrast over the field's
   * own 171.4 dp box. The regular step reads 0.965 there and its advance (169.9 dp) stays inside the
   * box, so the step comes down and the geometry does not move. */
  loginInput: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 22, fontWeight: '400' as const, letterSpacing: -0.13, color: colors.secondary },
  /* "Continue": at the bold step the run carries 1.181x the reference's contrast over its own 69.9 dp
   * box. The semibold step reads 1.047 and keeps the advance inside the box (69.4 dp). */
  loginContinue: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 20, fontWeight: '600' as const, letterSpacing: -0.21, color: colors.white },
  /* "or": the regular step carries 1.234x the reference's contrast over the 13.5 dp box; the medium
   * step reads 1.109 and still fits the box (13.7 dp). */
  loginOr: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 20, fontWeight: '500' as const, letterSpacing: -1.2, color: colors.ink },
  footerNote: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 17, fontWeight: '600' as const, color: colors.ink },
  resultTitle: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 19, fontWeight: '600' as const, color: colors.ink },
  resultSub: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, fontWeight: '400' as const, color: colors.secondary },
  filterChip: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 16, fontWeight: '600' as const, color: colors.ink },
  overHomes: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, fontWeight: '700' as const, color: colors.ink },
  /** Map pin price: dark ink on the white pill the interface shows (measured digit height 13.5 dp,
   *  run width 31.7 dp for "$250"). */
  mapPin: { fontFamily: fonts.num, fontSize: 15, lineHeight: 18, fontWeight: '500' as const, color: colors.ink },
  /** Filter chips under the results header.
   *  Size is the only lever available: the four chips are one style and the reference pins them against
   *  each other, so tracking alone cannot move the contrast total without pushing a chip out of the 2 dp
   *  geometry band. At 13 dp this face carries about 1.17x the reference's contrast on three of the four
   *  chips - visibly heavier - and contrast scales with the square of the size,
   *  so 12.6 dp takes all four to about 1.10 while every advance stays under its chip's own reference
   *  width (69.1 / 70.6 / 76.4 / clipped-at-36.8), which is what `minWidth` in ResultsScreen asks for. */
  resultsChip: { fontFamily: fonts.sans, fontSize: 12.6, lineHeight: 16, fontWeight: '400' as const, letterSpacing: -0.72, color: colors.ink },
  /** Results header: title and the date/guest line. */
  /* Measured off its own box on the map results screen: at 700 the substitute face carried 1.33x the
     reference's contrast.
     Both the step and the size come down to the pair that reproduces the reference's total; at 500 the
     advance falls 0.7 dp short of the reference's 94.2, so the tracking is opened to put it back. */
  resultsTitle: { fontFamily: fonts.sans, fontSize: 14.9, lineHeight: 18.2, fontWeight: '600' as const, letterSpacing: -0.81, color: colors.ink },
  resultsSub: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 15.6, fontWeight: '400' as const, letterSpacing: -0.97, color: colors.secondary },
  /** "Over 1,000 homes" caption over the results map. Tracked to -0.61 so the 122.2 dp natural
   *  advance of Plus Jakarta Sans pulls inside the 116.1 dp reference box instead of clipping to an ellipsis. */
  resultsCount: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18.2, fontWeight: '700' as const, letterSpacing: -0.61, color: colors.ink },

  /* ---------------------------------------------------------------- listing detail screen
   * Each run's line box is the reference's own box height, so the glyph centre lands where the device
   * put it. Sizes follow the measured glyph ink heights: title cap-to-descender 25.3 dp over two lines,
   * host name 15.6, block titles 9.5, block descriptions 12.0, price 19.6. */
  /* The three heading runs sit in the frame-width column and the interface centres each painted
   * line inside it, so short lines hang mid-column rather than at the left edge. */
  pdpTitle: { fontFamily: fonts.sans, fontSize: 26, lineHeight: 32, fontWeight: '700' as const, letterSpacing: -1.15, color: colors.ink, textAlign: 'center' as const },
  pdpSub: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.966, color: colors.secondary, textAlign: 'center' as const },
  pdpMeta: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.4, color: colors.secondary, textAlign: 'center' as const },
  /* "4.97" at 19 dp advances 36.4 dp and the reference box is 34.9, so the run was clipped to "4...".
     The reference's own advance is the 18.2 dp one, and its raster is the heavier step. The tracking
     is what keeps the run inside the box: at -0.25 the text measured 36 dp against a 35 dp client box
     and the browser drew the ellipsis instead of the digits; -0.65 sets the run at 34.0 dp. */
  pdpRating: { fontFamily: fonts.roboto700, fontSize: 18.2, lineHeight: 23.7, fontWeight: '500' as const, letterSpacing: -0.65, color: colors.ink },
  pdpGuestFav: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 18.4, fontWeight: '700' as const, letterSpacing: -0.62, color: colors.ink },
  /* "Free cancellation" measures 87.3 dp in the reference at a 14.2 dp line box. The face's own 13 dp
     regular step advances 97.9 and carries 0.865 of the reference's contrast; 11.7 dp at the bold step
     lands the advance on 86.95 but overshoots the total at 1.225, so the size keeps 11.7 dp and the step
     comes down: the medium step measures 86.12 of advance and 0.866 of the bold step's contrast, i.e.
     about 1.06 of the reference. */
  pdpChip: { fontFamily: fonts.sans, fontSize: 11.7, lineHeight: 14.2, fontWeight: '500' as const, letterSpacing: -0.5625, color: colors.tertiary },
  pdpHostName: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 20.7, fontWeight: '600' as const, letterSpacing: -0.56, color: colors.ink },
  pdpHostSub: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.44, color: colors.secondary },
  pdpBlockTitle: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18.2, fontWeight: '600' as const, letterSpacing: -0.6, color: colors.ink },
  pdpBlockDesc: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.44, color: colors.secondary },
  pdpBody: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 21.1, fontWeight: '400' as const, letterSpacing: -0.38, color: colors.ink },
  pdpCounter: { fontFamily: fonts.sans, fontSize: 12, lineHeight: 15.6, fontWeight: '600' as const, letterSpacing: -0.2, color: colors.white },
  pdpPriceNow: { fontFamily: fonts.num, fontSize: 21, lineHeight: 25.8, fontWeight: '500' as const, color: colors.ink },
  pdpPriceNote: { fontFamily: fonts.sans, fontSize: 12.5, lineHeight: 15.6, fontWeight: '400' as const, letterSpacing: -0.36, color: colors.secondary },
  pdpReserve: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 20, fontWeight: '700' as const, color: colors.white },

  /* ---------------------------------------------------------------- photo tour screen */
  tourTitle: { fontFamily: fonts.sans, fontSize: 16.5, lineHeight: 20.7, fontWeight: '600' as const, letterSpacing: -0.62, color: colors.ink },
  tourTab: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 15.6, fontWeight: '400' as const, letterSpacing: -0.44, color: colors.secondary },
  /* "Bedroom": at the bold step the run carries 1.179x the reference's contrast inside the reference's
   * own line box (24, 251.4, 92.8 x 28.7). The semibold step reads 1.049 there and its advance lands
   * on 92.7 dp against the reference's 92.8, so the step comes down with no tracking change. */
  tourRoomTitle: { fontFamily: fonts.sans, fontSize: 22, lineHeight: 28.7, fontWeight: '600' as const, letterSpacing: -1.1, color: colors.ink },
  tourRoomCaption: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.36, color: colors.secondary },
} as const;

export const space = {
  frameWidth: 393,
  frameHeight: 777,
  contentPad: 24,
  // Top chrome, measured from the interface: the pill runs 24..369 x 12..68 with a 28 radius,
  // the category rail is a 40.4 tall scrolling row starting at 84.
  searchPillTop: 12,
  searchPillLeft: 24,
  searchPillWidth: 345,
  searchPillHeight: 56,
  searchPillRadius: 28,
  searchIconBox: 12,
  searchIconGap: 8,
  tabGap: 16,
  tabsTop: 84,
  tabsHeight: 40.4,
  tabPadLeft: 16,
  tabPadRight: 14.2,
  tabIconBox: 16,
  tabIconGap: 6.2,
  tabChipGap: 8,
  headerHeight: 124.5,
  cardWidth: 166.7,
  cardGap: 12,
  cardHeightRow1: 201.2,
  cardHeightRow2: 217.2,
  cardHeightRow2Mid: 201.2,
  cardImageHeight: 158,
  cardRadius: 12,
  cardImageRadius: 12,
  // Feed rows: offsets measured from the reference (heading top, rail gap).
  row1HeadingTop: 26.25,
  row1RailGap: 16.3,
  row2HeadingTop: 24,
  row2RailGap: 14.1,
  footerNoteTop: 651.7,
  footerNoteLeft: 100.1,
  footerNoteWidth: 181.2,
  footerNoteHeight: 40,
  // Search sheet
  sheetPad: 16,
  segTop: 30.9,
  stepRowHeight: 60,
  // Guest counter row
  counterRowHeight: 56,
  // Bottom nav: five 75-wide cells between x=4 and x=389, cell box 75 x 56.
  navTop: 721,
  // R26: the gate's ±1 dp run measures every bottom-bar cell (Explore / Wishlists / Trips /
  // Messages / Log In) at [.., 722.0, .., 56.0] — a 56 dp band whose foot is the viewport's own.
  // At 55 the whole bar starts 1.0 dp lower and ends 1.0 dp past the frame.
  navHeight: 56,
  navItemWidth: 75,
  navItemHeight: 56,
  navPadX: 4,
} as const;

export const nav = {
  top: 722,
  height: 55,
  itemWidth: 75,
  itemHeight: 56,
  iconSize: 24,
  labelTop: 30,
  labelSize: 10,
} as const;

export const radii = {
  pill: 24,
  card: 12,
  cardImage: 12,
  sheet: 16,
  sheetTop: 16,
  chip: 20,
  circle: 999,
  counterBtn: 28,
  stepRadius: 14,
} as const;

export const shadow = {
  card: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  pill: { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 4 },
  nav: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: -2 }, elevation: 3 },
  sheet: { shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: -4 }, elevation: 5 },
} as const;

/**
 * P1 light/dark themes. Airbnb ships a dark mode; `light` mirrors the measured
 * `colors`, `dark` is a first-pass neutral-dark inversion pending measured confirmation.
 */
export const themes = {
  light: colors,
  dark: {
    ...colors,
    white: '#1A1A1A',
    page: '#121212',
    surface: '#1A1A1A',
    ink: '#EDEDED',
    black: '#000000',
    secondary: '#A0A0A0',
    tertiary: '#8A8A8A',
    hairline: '#2C2C2C',
    hairlineSoft: '#242424',
  },
} as const;

export const frame = { width: 393, height: 777 } as const;
