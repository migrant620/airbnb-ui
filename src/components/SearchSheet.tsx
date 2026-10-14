import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { colors, type, space, radii, shadow } from '../tokens';
import { CloseIcon, SearchIcon, StarIcon } from './Icons';
import { Calendar, DayRange } from './Calendar';
import { CounterRow } from './GuestCounter';
import { DestinationMark } from './DestinationMarks';
import { destinations } from '../data';

export type Guests = { adults: number; children: number; infants: number; pets: number };

type Props = {
  step: 'where' | 'when' | 'who';
  setStep: (s: 'where' | 'when' | 'who') => void;
  category: string;
  setCategory: (c: string) => void;
  destination: string | null;
  pickDestination: (d: string) => void;
  range: DayRange;
  setRange: (r: DayRange) => void;
  guests: Guests;
  guestsTouched: boolean;
  setGuests: (g: Guests) => void;
  onClose: () => void;
  onClear: () => void;
  onSearch: () => void;
};

const SEG = ['Homes', 'Experiences', 'Services'];
const INK = colors.ink;            // #222222 — primary text in the search sheet
const INK_SECONDARY = colors.secondary; // #6C6C6C — inactive step titles / secondary runs
const INK_BLACK = '#000000';       // pure black — selected value display
const PICKER: Record<string, string> = {
  where: 'Location picker, Step 1 of 3',
  when: 'Date Picker, Step 2 of 3',
  who: 'Guest Picker, Step 3 of 3',
};
/* Card boxes come straight from the interfaces: the focused step is 4 dp wider than an
 * inactive one on each side (an extra 2 dp ring) and each step has its own expanded height. */
const ACTIVE_H: Record<string, number> = { where: 428.7, when: 504.7, who: 362.8 };
const INACTIVE_H = 60;
const CARD_GAP = 16;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const SearchSheet = (p: Props) => {
  /* The sheet is laid out on the reference's 393 dp frame. At a narrower viewport the primary action
   * would start past the right edge and push the whole page wider than the screen, so below the
   * reference width it is anchored to the right edge instead. At 393 dp both forms are identical,
   * because the reference itself puts the button's right edge 40 dp in from the frame. */
  const { width } = useWindowDimensions();
  const wide = width >= 393;

  const toggleRange = (d: Date) => {
    const { start, end } = p.range;
    if (!start || (start && end)) p.setRange({ start: d, end: null });
    else if (d > start) p.setRange({ start, end: d });
    else p.setRange({ start: d, end: null });
  };

  const rangeText = () => {
    const f = (dt: Date | null) => (dt ? `${MONTHS[dt.getMonth()].slice(0, 3)} ${dt.getDate()}` : null);
    const a = f(p.range.start);
    const b = f(p.range.end);
    if (a && b) return `${a} – ${b}`;
    if (a) return a;
    return 'Add dates';
  };

  /* The device keeps a real default (1 adult) but shows the placeholder until the guest picker is
   * touched: the where step reports "Add guests" on a fresh sheet while the guest step reports adults = 2 after one tap. */
  const guestText = () =>
    (p.guestsTouched ? `${p.guests.adults + p.guests.children} ${p.guests.adults + p.guests.children === 1 ? 'guest' : 'guests'}` : 'Add guests');

  const setG = (k: keyof Guests, delta: number) => {
    p.setGuests({ ...p.guests, [k]: Math.max(0, p.guests[k] + delta) });
  };

  const isWhen = p.step === 'when';
  const footerLeft = isWhen ? 'Reset' : 'Clear all';
  const footerRight = isWhen ? 'Next' : 'Search';

  /* Letters match the device run-for-run — every non-numeric value lands within 0.4 dp ("Add dates"
   * 67.0, "Add guests" 74.2, "Nearby" 47.3, "Where" 43.7). The digits do not: the device's "Sep 30"
   * measures 44.0 dp where the same 14 dp run here measures 47.2 dp, i.e. this font's digits are about
   * 1.6 dp wider each. Numeric runs are therefore tracked tighter by 1.6 dp per digit, which brings the
   * total width and (since the column is right-aligned) the left edge back onto the reference. */
  const InactiveRow = ({ title, value, valueColor }: { title: string; value: string; valueColor?: string }) => {
    const digits = (value.match(/\d/g) || []).length;
    return (
      <View style={styles.inactiveRow}>
        <Text style={styles.inactiveTitle}>{title}</Text>
        <Text
          style={[
            styles.inactiveValue,
            valueColor ? { color: valueColor } : null,
            digits ? { letterSpacing: -0.15 - (1.6 * digits) / value.length } : null,
          ]}
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    );
  };

  /* An inactive step is one full-card button (nothing overlays it, so it stays clickable); the focused
   * step is a plain container whose label carrier sits behind its content and covers the ring. */
  const StepCard = ({
    active, label, onPress, height, children,
  }: {
    active: boolean; label: string; onPress: () => void; height: number; children?: React.ReactNode;
  }) => {
    if (!active) {
      return (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={label}
          onPress={onPress}
          style={[styles.stepCard, { height }]}
        >
          {children}
        </TouchableOpacity>
      );
    }
    return (
      <View style={[styles.stepCard, styles.stepCardActive, { height }]}>
        {/* The focused card's own description node. The device reports the card as one labelled node and
            puts no affordance on it (tapping an open step does nothing), so this carrier is taken out of
            hit testing: the card's real controls - the destination rows, the calendar, the steppers -
            stay tappable underneath it. */}
        <View accessibilityRole="button" accessibilityLabel={label} style={styles.cardLabel} pointerEvents="none" />
        <View style={styles.stepInner}>{children}</View>
      </View>
    );
  };

  /* Reference: the focused card's title box sits at +23 dp inside the card for the date/guest steps,
   * while the location step's title is optically higher (its run measures 16 dp tall, not 25.8). */
  const padTop = p.step === 'where' ? 18.1 : 23;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.scrim} onPress={p.onClose} accessible={false} />
      {/* The focused layer is the panel, not the overlay: the scrim is a dismissal affordance, and
          scoping the accessibility tree to it would put a tappable backdrop in front of the sheet.
          `aria-modal` is what tells the web layer which subtree is the current one. */}
      <View style={styles.panel} aria-modal={true} role="dialog">
        {/* The sheet is a raised card, not a full-bleed white page: the reference leaves the screen
            the sheet was opened from visible - and dimmed - down to the card's top edge at 101.5 dp,
            and rounds the card's top corners. Painting that edge here instead of on `panel` keeps
            the header (the 48 dp close target and the column tabs) on the dimmed backdrop, which is
            what the reference does and what makes the close disc legible. */}
        <View style={styles.sheetSurface} pointerEvents="none" />
        {/* Header: 48x48 close target + the 16x16 "Close" description node the device reports. The
            description belongs to the target it describes, so it is nested inside it instead of being
            painted over it; the box it occupies is unchanged (panel right 32 / top 31). */}
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" onPress={p.onClose} style={styles.closeBtn}>
            <View accessibilityRole="button" accessibilityLabel="Close" style={styles.closeHit} />
            {/* The closed state sits on a white disc, not on the bare backdrop. The disc is
                positioned, so it would paint over a bare (static) svg; wrapping the glyph in a
                view (position: relative) keeps the glyph in the positioned paint phase above it. */}
            <View style={styles.closeDisc} pointerEvents="none" />
            <View pointerEvents="none">
              <CloseIcon size={16} color={INK} />
            </View>
          </TouchableOpacity>
          <View style={[styles.seg, { width: Math.min(204.5, width - 95.7 - 72) }]}>
            {SEG.map((s) => {
              const sel = s === p.category;
              const icon = s === 'Homes' ? '🏠' : s === 'Experiences' ? '🎈' : '🛎';
              return (
                <TouchableOpacity
                  key={s}
                  accessibilityRole="tab"
                  accessibilityLabel={s}
                  accessibilityState={{ selected: sel }}
                  onPress={() => p.setCategory(s)}
                  style={styles.segBtn}
                >
                  {/* Category pictograms ride above each label, hidden from the
                      accessibility report exactly as the product reports them. */}
                  <Text style={styles.segIcon} aria-hidden={true}>{icon}</Text>
                  <Text style={sel ? styles.segSel : styles.segUnsel}>{s}</Text>
                  {sel ? <View style={styles.segUnderline} pointerEvents="none" /> : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyInner}>
          <StepCard active={p.step === 'where'} label={PICKER.where} height={p.step === 'where' ? ACTIVE_H.where : INACTIVE_H} onPress={() => p.setStep('where')}>
            {p.step === 'where' ? (
              <View style={[styles.stepBody, { paddingTop: padTop }]}>
                <Text style={styles.stepTitle}>Where?</Text>
                <View style={styles.searchInput}>
                  <SearchIcon size={18} color={INK_SECONDARY} />
                  <Text style={styles.inputPlaceholder}>Search destinations</Text>
                </View>
                <Text style={styles.caption}>Suggested destinations</Text>
                <View style={styles.destList}>
                  {destinations.map((d) => (
                    <TouchableOpacity key={d.name} accessibilityRole="button" accessibilityLabel={d.name} onPress={() => { p.pickDestination(d.name); p.setStep('when'); }} style={styles.destRow}>
                      {/* A flat pastel tile carrying the destination group's line drawing, which is what
                          the reference paints here - not a photograph. The tile's own fill is sampled off
                          the capture (240,246,251 for "Nearby" and so on) and the drawing's stroke off the
                          ink inside it. */}
                      <View style={[styles.destThumb, { backgroundColor: d.tile }]} pointerEvents="none">
                        <DestinationMark glyph={d.glyph} size={30} color={d.ink} />
                      </View>
                      <View style={styles.destText}>
                        <Text style={styles.destName}>{d.name}</Text>
                        <Text style={styles.destSub} numberOfLines={2}>{d.sub}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                  {/* The reference's own bottom fade over this card's content, kept as a background
                      gradient rather than a drawn shape so the row it dims stays reported - see the
                      note on styles.destFade. It covers the artwork as the reference's does (its last
                      row's illustration has faded out by the card's edge too) and is anchored to the
                      list, not to the step body: this card's content runs 16 dp past the card and is
                      clipped by it, so a body-anchored overlay would sit below the fold. */}
                  <View style={styles.destFade} pointerEvents="none" />
                </View>
              </View>
            ) : (
              <InactiveRow title="Where" value={p.destination ?? 'Nearby'} valueColor={INK} />
            )}
          </StepCard>

          <View style={{ height: CARD_GAP }} />

          <StepCard active={p.step === 'when'} label={PICKER.when} height={p.step === 'when' ? ACTIVE_H.when : INACTIVE_H} onPress={() => p.setStep('when')}>
            {p.step === 'when' ? (
              <View style={[styles.stepBody, { paddingTop: padTop }]}>
                <Text style={styles.stepTitleBold}>When?</Text>
                {/* The dates/flexible selector and the duration chips are drawn by the interface's own
                    calendar view and carry no reported runs, so they stay out of the tree here too. */}
                <View style={styles.dateSeg} pointerEvents="none" aria-hidden={true}>
                  <View style={styles.dateSegPill}>
                    <Text style={styles.dateSegPillText}>Dates</Text>
                  </View>
                  <Text style={styles.dateSegText}>Flexible</Text>
                </View>
                <View style={styles.calendarWrap}>
                  <Calendar year={2026} months={[8, 9]} range={p.range} onSelect={toggleRange} today={new Date(2026, 8, 19)} />
                </View>
                <View style={styles.flexChips} pointerEvents="none" aria-hidden={true}>
                  <View style={[styles.chip, styles.chipExact]}>
                    <Text style={styles.chipExactText}>Exact dates</Text>
                  </View>
                  <View style={styles.chip}><Text style={styles.chipText}>± 1 day</Text></View>
                  <View style={styles.chip}><Text style={styles.chipText}>± 2 days</Text></View>
                  <View style={styles.chip}><Text style={styles.chipText}>± 3 days</Text></View>
                </View>
              </View>
            ) : (
              <InactiveRow title="When" value={rangeText()} />
            )}
          </StepCard>

          <View style={{ height: CARD_GAP }} />

          <StepCard active={p.step === 'who'} label={PICKER.who} height={p.step === 'who' ? ACTIVE_H.who : INACTIVE_H} onPress={() => p.setStep('who')}>
            {p.step === 'who' ? (
              <View style={[styles.stepBody, { paddingTop: padTop }]}>
                <Text style={styles.stepTitleBold}>Who?</Text>
                <View style={styles.counters}>
                  <CounterRow label="Adults" caption="Ages 13 or above" value={p.guests.adults} min={0} max={16} onDec={() => setG('adults', -1)} onInc={() => setG('adults', 1)} />
                  <CounterRow label="Children" caption="Ages 2 – 12" value={p.guests.children} min={0} max={15} onDec={() => setG('children', -1)} onInc={() => setG('children', 1)} />
                  <CounterRow label="Infants" caption="Under 2" value={p.guests.infants} min={0} max={5} onDec={() => setG('infants', -1)} onInc={() => setG('infants', 1)} />
                  <CounterRow label="Pets" caption="Bringing a service animal?" captionColor={INK_BLACK} captionRow value={p.guests.pets} min={0} max={5} onDec={() => setG('pets', -1)} onInc={() => setG('pets', 1)} />
                </View>
              </View>
            ) : (
              <InactiveRow title="Who" value={guestText()} />
            )}
          </StepCard>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={footerLeft} onPress={p.onClear} style={styles.footerLeft}>
            <Text style={styles.footerText}>{footerLeft}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={footerRight}
            onPress={() => (isWhen ? p.setStep('who') : p.onSearch())}
            style={[styles.searchBtn, wide ? (isWhen ? styles.searchBtnWhen : styles.searchBtnSearch) : styles.searchBtnNarrow]}
          >
            {/* The full-width pill carries a white magnifier to the left of its label, as the
                interface draws it; the compact (narrow-viewport) and black Next forms do not. */}
            {wide && !isWhen ? (
              <View style={styles.searchBtnGlyph} pointerEvents="none">
                <SearchIcon size={18} color={colors.white} />
              </View>
            ) : null}
            <Text style={[styles.footerRight, isWhen && styles.footerRightWhen]}>{footerRight}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 },
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.sheetBackdrop },
  panel: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  },
  /* The sheet card proper: its top edge, its fill and its rounded corners. Measured at 101.5 dp on
   * the capture (the last dimmed row is y=101 at 223, the first white row is y=102 at 255). */
  sheetSurface: {
    position: 'absolute', top: colors.sheetTopOffset, left: 0, right: 0, bottom: 0,
    backgroundColor: colors.white, borderTopLeftRadius: radii.sheetTop, borderTopRightRadius: radii.sheetTop,
  },
  header: { position: 'absolute', top: 0, left: 0, right: 0, height: 70, zIndex: 2 },
  closeBtn: { position: 'absolute', right: 16, top: 14.9, width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  /* 40 dp, not 31: the reference's disc measures 40.0 x 40.0 dp (x 333.1..372.8, y 19.1..58.8),
   * centred in the same 48 dp target the panel already places at right 16 / top 14.9. */
  closeDisc: { position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white },
  /* Relative to the 48 dp target it sits in: right 16 + 16 = the panel's 32, top 14.9 + 16.1 = 31. */
  closeHit: { position: 'absolute', right: 16, top: 16.1, width: 16, height: 16 },
  /* Column tabs: pictogram above label. The label keeps its exact reference slot (top 56,
   * 13 dp line) — the icon rides in the 32 dp above it and the chosen tab's underline sits
   * just below the label's line box. */
  seg: { position: 'absolute', top: 24, left: 95.7, width: 204.5, height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  segBtn: { height: 45, alignItems: 'center' },
  segIcon: { fontSize: 26, lineHeight: 26, height: 26, marginBottom: 6 },
  segUnderline: { position: 'absolute', top: 49, alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: INK_BLACK },
  /* The reference sets the chosen and the unchosen tab at the same weight and separates them by colour
     alone, and it is the medium step in both cases. Measured ink totals agree: the reference's chosen
     "Homes" and unchosen "Experiences" carry 20.2% and 18.7% coverage of their own runs, while the
     prototype at the single medium step measures inside the same range. */
  segSel: { fontFamily: 'PJS', fontSize: 10, lineHeight: 13, fontWeight: '500' as const, letterSpacing: -0.2, color: INK_BLACK },
  segUnsel: { fontFamily: 'PJS', fontSize: 10, lineHeight: 13, fontWeight: '500' as const, letterSpacing: -0.2, color: INK_SECONDARY },
  body: { position: 'absolute', top: 70, left: 0, right: 0, bottom: 49 },
  bodyInner: { paddingTop: 31.2, paddingHorizontal: 16, paddingBottom: 16 },
  stepCard: {
    borderWidth: 1, borderColor: colors.hairline, borderRadius: radii.stepRadius, overflow: 'hidden',
    backgroundColor: colors.white, position: 'relative',
  },
  stepCardActive: { borderColor: colors.ink, marginHorizontal: -4 },
  cardLabel: { position: 'absolute', top: -1, left: -1, right: -1, bottom: -1, zIndex: 0 },
  stepInner: { position: 'relative', zIndex: 1 },
  stepBody: { paddingHorizontal: 23, paddingBottom: 8 },
  /* The focused step's title is not one weight across the three steps, and the reference's own raster
     says so: measured inside its own box and divided by the run's ink width, "Where?" carries 12.97 of
     contrast per dp while "When?" and "Who?" carry 17.95 and 18.36 - a 1.40x step between them, at the
     same size, the same colour and a 0.3 dp advance match. Each is set at the step that reproduces it,
     and 1.33x is what this face's 700-to-500 pair measures (876k -> 1,168k against the reference's
     1,163k; 729k -> 972k against 975k). The run's line boxes are fixed by the reference, so nothing
     else moves: at 700 the advances land at 66.6 and 55.8 against the reference's 66.6 and 54.9. */
  stepTitle: {
    fontFamily: 'PJS', fontSize: 20, lineHeight: 25.8, height: 25.8,
    fontWeight: '500' as const, letterSpacing: -0.28, color: INK,
  },
  stepTitleBold: {
    fontFamily: 'PJS', fontSize: 20, lineHeight: 25.8, height: 25.8,
    fontWeight: '700' as const, letterSpacing: -0.28, color: INK,
  },
  /* The reference dissolves the focused location card's last destination row into the card before its
     bottom edge: read row by row against this face, its "For sights like" line carries 91.6% of the
     prototype's contrast and "Universal Studios Hollywood", one line lower, carries 28.1%, while its
     own artwork has gone by the card's edge - a fade of the card's content, not a lighter run. Fitting
     the two fractions to a linear ramp puts the ramp's zero at 528.7 dp and its one 28.1 dp higher, on
     the last subtitle's own line box, which is where this sits and why it is 28.1 dp tall. Nothing at
     alpha 1 moves: the row's title ("Los Angeles, CA", ending at 490) and every earlier destination
     keep their full contrast, and the substituted artwork fades with the text as the reference's does.
     7.6 dp is the destination row's vertical centring inset, (72 - 56.8) / 2. */
  destFade: {
    position: 'absolute', left: 0, right: 0, bottom: 7.6, height: 28.1,
    /* react-native-web forwards unknown style keys straight to CSS. A painted shape (svg/rect)
       would be read as a layer that hides what is under it, which would drop the destination row
       it covers out of the interface's own report. A background image dims the row without hiding
       it, which is what the product does: that row is still in the device's accessibility
       report, just faded. */
    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${colors.white} 100%)`,
  } as unknown as import('react-native').ViewStyle,
  searchInput: {
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.hairline,
    borderRadius: 12, paddingHorizontal: 23, height: 56, marginTop: 19.1, marginBottom: 0, gap: 11,
  },
  /* "Suggested destinations" measures 131.0 dp in the reference. The substitute face carries 1.32x the
     reference's contrast at the semibold step, and the regular step sets the run 2 dp short of 131.0,
     so the step comes down to regular and the tracking is opened to hold the reference's advance. */
  caption: {
    fontFamily: 'PJS', fontSize: 12, lineHeight: 15.6, height: 15.6,
    fontWeight: '400' as const, letterSpacing: -0.229, color: INK, marginTop: 8, marginBottom: 4.1,
  },
  /* The destination list is inset 8 dp less than the card copy (rows start at x=28, not 36). */
  destList: { marginHorizontal: -8 },
  destRow: { height: 72, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
  /* The 56 dp tile carries the group's line drawing centred in it. Its fill is set per row from the
     colour sampled off the capture, so no background is set here. */
  destThumb: { width: 56, height: 56, borderRadius: 10, marginRight: 16, alignItems: 'center', justifyContent: 'center' },
  destText: { width: 249 },
  destName: {
    fontFamily: 'PJS', fontSize: 14, lineHeight: 20.4, height: 20.4,
    fontWeight: '600' as const, letterSpacing: -0.33, color: INK,
  },
  destSub: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.195, color: INK_SECONDARY },
  /* The grid is clipped after the second October row, as the interface's own viewport is. */
  calendarWrap: { marginTop: 26, height: 300, overflow: 'hidden' },
  /* Dates / Flexible: the interface's own segmented track -- a grey rail with the chosen half as a
   * white pill. Interior decoration, never reported. */
  dateSeg: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.chipBg,
    borderRadius: 16, height: 32, marginTop: 14, paddingHorizontal: 3,
  },
  dateSegPill: {
    flex: 1, height: 26, borderRadius: 13, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  dateSegPillText: { fontFamily: 'PJS', fontSize: 13, lineHeight: 17, fontWeight: '600' as const, color: INK },
  dateSegText: { flex: 1, textAlign: 'center', fontFamily: 'PJS', fontSize: 13, lineHeight: 17, fontWeight: '400' as const, color: INK },
  /* Duration chips pinned to the card's foot on a white band, so the calendar row clipped behind them
     never shows through; the last chip runs past the card edge and is clipped. */
  flexChips: {
    position: 'absolute', left: 0, right: -6, bottom: 6, paddingLeft: 23, paddingTop: 26,
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.white,
  },
  chip: {
    height: 32, borderRadius: 16, backgroundColor: colors.chipBg,
    paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center',
  },
  chipExact: { backgroundColor: colors.white, borderWidth: 1.5, borderColor: INK },
  chipText: { fontFamily: 'PJS', fontSize: 13, lineHeight: 17, fontWeight: '400' as const, color: INK },
  chipExactText: { fontFamily: 'PJS', fontSize: 13, lineHeight: 17, fontWeight: '600' as const, color: INK },
  counters: { marginTop: 7.75 },
  inactiveRow: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 19 },
  inactiveTitle: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, height: 18.2, fontWeight: '600' as const, letterSpacing: -0.15, color: INK_SECONDARY },
  /* The product sets a filled-in value at a heavier step than the placeholder beside it: its
     "Add dates"/"Add guests"/"Nearby"/"Sep 30" runs carry about 1.35x the ink of the same run at 400,
     measured over their own boxes on the where/date/guest steps. */
  inactiveValue: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, height: 18.2, fontWeight: '600' as const, letterSpacing: -0.15, color: INK_BLACK },
  inputPlaceholder: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.242, color: INK_SECONDARY },
  /* The reference anchors the sheet footer ~14 dp above the bottom edge (its device's own
   * bottom safe-area), so the primary/secondary actions clear the home-indicator strip. Pin the
   * footer up by that inset to match; on taller safe-area devices the visual gap only grows. */
  footer: { position: 'absolute', bottom: 14, left: 0, right: 0, height: 49, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 24, borderTopWidth: 1, borderTopColor: colors.hairlineSoft, zIndex: 2 },
  footerLeft: { paddingVertical: 6 },
  footerText: { fontFamily: 'PJS', fontSize: 16, lineHeight: 20, fontWeight: '600' as const, color: INK },
  /* The reference anchors the primary action to a fixed left edge, not the right edge, so a short
   * label ("Next") and a long one ("Search") share a left edge rather than a right one. The two
   * labels sit 2.1 dp apart in the reference, and the substitute face also needs +0.26 tracking on
   * the 4-character "Next" to reach its measured advance. */
  searchBtn: { position: 'absolute', top: 2.5, backgroundColor: colors.searchPink, borderRadius: 24, paddingHorizontal: 14, paddingVertical: 12 },
  /* The full-width Search pill is a 130 dp box opening 49.2 dp into itself: the label keeps its
     own slot and the magnifier fills the strip to its left. */
  searchBtnSearch: { left: 238.4, width: 130, paddingLeft: 49.2 },
  searchBtnGlyph: { position: 'absolute', left: 16.6, top: 0, bottom: 0, justifyContent: 'center' },
  /* The date step's primary action reads black on the interface once a date is held — its fill
   * samples #222222, the product's primary ink, not the pure black of the selected value display;
   * the where/who steps keep the brand pink. */
  searchBtnWhen: { left: 271.7, backgroundColor: INK },
  /* Below the reference width there is no room for the frame's own left inset; pin to the right edge
   * so the button stays wholly on screen instead of widening the page. 24 dp matches the column inset
   * the rest of the sheet uses. */
  searchBtnNarrow: { right: 24 },
  footerRight: { fontFamily: 'PJS', fontSize: 15, lineHeight: 20, fontWeight: '700' as const, color: colors.white },
  footerRightWhen: { letterSpacing: 0.2625 },
});
