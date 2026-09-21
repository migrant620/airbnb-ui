import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, useWindowDimensions } from 'react-native';
import { colors, type, space, radii, shadow } from '../tokens';
import { CloseIcon, SearchIcon, StarIcon } from './Icons';
import { Calendar, DayRange } from './Calendar';
import { CounterRow } from './GuestCounter';
import { destinations } from '../data';
export type Guests = {
    adults: number;
    children: number;
    infants: number;
    pets: number;
};
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
const INK = colors.ink;
const INK_SECONDARY = colors.secondary;
const INK_BLACK = '#000000';
const PICKER: Record<string, string> = {
    where: 'Location picker, Step 1 of 3',
    when: 'Date Picker, Step 2 of 3',
    who: 'Guest Picker, Step 3 of 3',
};
const ACTIVE_H: Record<string, number> = { where: 428.7, when: 504.7, who: 362.8 };
const INACTIVE_H = 60;
const CARD_GAP = 16;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const SearchSheet = (p: Props) => {
    const { width } = useWindowDimensions();
    const wide = width >= 393;
    const toggleRange = (d: Date) => {
        const { start, end } = p.range;
        if (!start || (start && end))
            p.setRange({ start: d, end: null });
        else if (d > start)
            p.setRange({ start, end: d });
        else
            p.setRange({ start: d, end: null });
    };
    const rangeText = () => {
        const f = (dt: Date | null) => (dt ? `${MONTHS[dt.getMonth()].slice(0, 3)} ${dt.getDate()}` : null);
        const a = f(p.range.start);
        const b = f(p.range.end);
        if (a && b)
            return `${a} – ${b}`;
        if (a)
            return a;
        return 'Add dates';
    };
    const guestText = () => (p.guestsTouched ? `${p.guests.adults + p.guests.children} guests` : 'Add guests');
    const setG = (k: keyof Guests, delta: number) => {
        p.setGuests({ ...p.guests, [k]: Math.max(0, p.guests[k] + delta) });
    };
    const isWhen = p.step === 'when';
    const footerLeft = isWhen ? 'Reset' : 'Clear all';
    const footerRight = isWhen ? 'Next' : 'Search';
    const InactiveRow = ({ title, value, valueColor }: {
        title: string;
        value: string;
        valueColor?: string;
    }) => {
        const digits = (value.match(/\d/g) || []).length;
        return (<View style={styles.inactiveRow}>
        <Text style={styles.inactiveTitle}>{title}</Text>
        <Text style={[
                styles.inactiveValue,
                valueColor ? { color: valueColor } : null,
                digits ? { letterSpacing: -0.15 - (1.6 * digits) / value.length } : null,
            ]} numberOfLines={1}>
          {value}
        </Text>
      </View>);
    };
    const StepCard = ({ active, label, onPress, height, children, }: {
        active: boolean;
        label: string;
        onPress: () => void;
        height: number;
        children?: React.ReactNode;
    }) => {
        if (!active) {
            return (<TouchableOpacity accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={[styles.stepCard, { height }]}>
          {children}
        </TouchableOpacity>);
        }
        return (<View style={[styles.stepCard, styles.stepCardActive, { height }]}>
        
        <View accessibilityRole="button" accessibilityLabel={label} style={styles.cardLabel} pointerEvents="none"/>
        <View style={styles.stepInner}>{children}</View>
      </View>);
    };
    const padTop = p.step === 'where' ? 18.1 : 23;
    return (<View style={styles.overlay}>
      <TouchableOpacity style={styles.scrim} onPress={p.onClose} accessible={false}/>
      
      <View style={styles.panel} aria-modal={true} role="dialog">
        
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" onPress={p.onClose} style={styles.closeBtn}>
            <View accessibilityRole="button" accessibilityLabel="Close" style={styles.closeHit}/>
            
            <View style={styles.closeDisc} pointerEvents="none"/>
            <View pointerEvents="none">
              <CloseIcon size={16} color={INK}/>
            </View>
          </TouchableOpacity>
          <View style={[styles.seg, { width: Math.min(204.5, width - 95.7 - 72) }]}>
            {SEG.map((s) => {
            const sel = s === p.category;
            const icon = s === 'Homes' ? '🏠' : s === 'Experiences' ? '🎈' : '🛎';
            return (<TouchableOpacity key={s} accessibilityRole="tab" accessibilityLabel={s} accessibilityState={{ selected: sel }} onPress={() => p.setCategory(s)} style={styles.segBtn}>
                  
                  <Text style={styles.segIcon} aria-hidden={true}>{icon}</Text>
                  <Text style={sel ? styles.segSel : styles.segUnsel}>{s}</Text>
                  {sel ? <View style={styles.segUnderline} pointerEvents="none"/> : null}
                </TouchableOpacity>);
        })}
          </View>
        </View>

        <ScrollView style={styles.body} contentContainerStyle={styles.bodyInner}>
          <StepCard active={p.step === 'where'} label={PICKER.where} height={p.step === 'where' ? ACTIVE_H.where : INACTIVE_H} onPress={() => p.setStep('where')}>
            {p.step === 'where' ? (<View style={[styles.stepBody, { paddingTop: padTop }]}>
                <Text style={styles.stepTitle}>Where?</Text>
                <View style={styles.searchInput}>
                  <SearchIcon size={18} color={INK_SECONDARY}/>
                  <Text style={styles.inputPlaceholder}>Search destinations</Text>
                </View>
                <Text style={styles.caption}>Suggested destinations</Text>
                <View style={styles.destList}>
                  {destinations.map((d) => (<TouchableOpacity key={d.name} accessibilityRole="button" accessibilityLabel={d.name} onPress={() => { p.pickDestination(d.name); p.setStep('when'); }} style={styles.destRow}>
                      <Image source={d.photo} style={styles.destThumb}/>
                      <View style={styles.destText}>
                        <Text style={styles.destName}>{d.name}</Text>
                        <Text style={styles.destSub} numberOfLines={2}>{d.sub}</Text>
                      </View>
                    </TouchableOpacity>))}
                  
                  <View style={styles.destFade} pointerEvents="none"/>
                </View>
              </View>) : (<InactiveRow title="Where" value={p.destination ?? 'Nearby'} valueColor={INK}/>)}
          </StepCard>

          <View style={{ height: CARD_GAP }}/>

          <StepCard active={p.step === 'when'} label={PICKER.when} height={p.step === 'when' ? ACTIVE_H.when : INACTIVE_H} onPress={() => p.setStep('when')}>
            {p.step === 'when' ? (<View style={[styles.stepBody, { paddingTop: padTop }]}>
                <Text style={styles.stepTitleBold}>When?</Text>
                
                <View style={styles.dateSeg} pointerEvents="none" aria-hidden={true}>
                  <View style={styles.dateSegPill}>
                    <Text style={styles.dateSegPillText}>Dates</Text>
                  </View>
                  <Text style={styles.dateSegText}>Flexible</Text>
                </View>
                <View style={styles.calendarWrap}>
                  <Calendar year={2026} months={[8, 9]} range={p.range} onSelect={toggleRange} today={new Date(2026, 8, 19)}/>
                </View>
                <View style={styles.flexChips} pointerEvents="none" aria-hidden={true}>
                  <View style={[styles.chip, styles.chipExact]}>
                    <Text style={styles.chipExactText}>Exact dates</Text>
                  </View>
                  <View style={styles.chip}><Text style={styles.chipText}>± 1 day</Text></View>
                  <View style={styles.chip}><Text style={styles.chipText}>± 2 days</Text></View>
                  <View style={styles.chip}><Text style={styles.chipText}>± 3 days</Text></View>
                </View>
              </View>) : (<InactiveRow title="When" value={rangeText()}/>)}
          </StepCard>

          <View style={{ height: CARD_GAP }}/>

          <StepCard active={p.step === 'who'} label={PICKER.who} height={p.step === 'who' ? ACTIVE_H.who : INACTIVE_H} onPress={() => p.setStep('who')}>
            {p.step === 'who' ? (<View style={[styles.stepBody, { paddingTop: padTop }]}>
                <Text style={styles.stepTitleBold}>Who?</Text>
                <View style={styles.counters}>
                  <CounterRow label="Adults" caption="Ages 13 or above" value={p.guests.adults} min={0} max={16} onDec={() => setG('adults', -1)} onInc={() => setG('adults', 1)}/>
                  <CounterRow label="Children" caption="Ages 2 – 12" value={p.guests.children} min={0} max={15} onDec={() => setG('children', -1)} onInc={() => setG('children', 1)}/>
                  <CounterRow label="Infants" caption="Under 2" value={p.guests.infants} min={0} max={5} onDec={() => setG('infants', -1)} onInc={() => setG('infants', 1)}/>
                  <CounterRow label="Pets" caption="Bringing a service animal?" captionColor={INK_BLACK} value={p.guests.pets} min={0} max={5} onDec={() => setG('pets', -1)} onInc={() => setG('pets', 1)}/>
                </View>
              </View>) : (<InactiveRow title="Who" value={guestText()}/>)}
          </StepCard>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={footerLeft} onPress={p.onClear} style={styles.footerLeft}>
            <Text style={styles.footerText}>{footerLeft}</Text>
          </TouchableOpacity>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={footerRight} onPress={() => (isWhen ? p.setStep('who') : p.onSearch())} style={[styles.searchBtn, wide ? (isWhen ? styles.searchBtnWhen : styles.searchBtnSearch) : styles.searchBtnNarrow]}>
            
            {wide && !isWhen ? (<View style={styles.searchBtnGlyph} pointerEvents="none">
                <SearchIcon size={18} color={colors.white}/>
              </View>) : null}
            <Text style={[styles.footerRight, isWhen && styles.footerRightWhen]}>{footerRight}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>);
};
const styles = StyleSheet.create({
    overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50 },
    scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.scrim },
    panel: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 14.4,
        backgroundColor: colors.white, borderTopLeftRadius: radii.sheetTop, borderTopRightRadius: radii.sheetTop,
    },
    header: { position: 'absolute', top: 0, left: 0, right: 0, height: 70, zIndex: 2 },
    closeBtn: { position: 'absolute', right: 16, top: 14.9, width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
    closeDisc: { position: 'absolute', width: 31, height: 31, borderRadius: 15.5, backgroundColor: colors.white },
    closeHit: { position: 'absolute', right: 16, top: 16.1, width: 16, height: 16 },
    seg: { position: 'absolute', top: 24, left: 95.7, width: 204.5, height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    segBtn: { height: 45, alignItems: 'center' },
    segIcon: { fontSize: 26, lineHeight: 26, height: 26, marginBottom: 6 },
    segUnderline: { position: 'absolute', top: 49, alignSelf: 'center', width: 36, height: 4, borderRadius: 2, backgroundColor: INK_BLACK },
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
    stepTitle: {
        fontFamily: 'PJS', fontSize: 20, lineHeight: 25.8, height: 25.8,
        fontWeight: '500' as const, letterSpacing: -0.28, color: INK,
    },
    stepTitleBold: {
        fontFamily: 'PJS', fontSize: 20, lineHeight: 25.8, height: 25.8,
        fontWeight: '700' as const, letterSpacing: -0.28, color: INK,
    },
    destFade: {
        position: 'absolute', left: 0, right: 0, bottom: 7.6, height: 28.1,
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${colors.white} 100%)`,
    } as unknown as import('react-native').ViewStyle,
    searchInput: {
        flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.hairline,
        borderRadius: 12, paddingHorizontal: 23, height: 56, marginTop: 19.1, marginBottom: 0, gap: 11,
    },
    caption: {
        fontFamily: 'PJS', fontSize: 12, lineHeight: 15.6, height: 15.6,
        fontWeight: '400' as const, letterSpacing: -0.229, color: INK, marginTop: 8, marginBottom: 4.1,
    },
    destList: { marginHorizontal: -8 },
    destRow: { height: 72, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 },
    destThumb: { width: 56, height: 56, borderRadius: 10, marginRight: 16, backgroundColor: colors.mapBlock },
    destText: { width: 249 },
    destName: {
        fontFamily: 'PJS', fontSize: 14, lineHeight: 20.4, height: 20.4,
        fontWeight: '600' as const, letterSpacing: -0.33, color: INK,
    },
    destSub: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.195, color: INK_SECONDARY },
    calendarWrap: { marginTop: 26, height: 300, overflow: 'hidden' },
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
    flexChips: {
        position: 'absolute', left: 23, right: -6, bottom: 6,
        flexDirection: 'row', alignItems: 'center', gap: 8,
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
    inactiveValue: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, height: 18.2, fontWeight: '600' as const, letterSpacing: -0.15, color: INK_BLACK },
    inputPlaceholder: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.242, color: INK_SECONDARY },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 49, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 24, borderTopWidth: 1, borderTopColor: colors.hairlineSoft, zIndex: 2 },
    footerLeft: { paddingVertical: 6 },
    footerText: { fontFamily: 'PJS', fontSize: 16, lineHeight: 20, fontWeight: '600' as const, color: INK },
    searchBtn: { position: 'absolute', top: 2.5, backgroundColor: colors.searchPink, borderRadius: 24, paddingHorizontal: 14, paddingVertical: 12 },
    searchBtnSearch: { left: 238.4, width: 130, paddingLeft: 49.2 },
    searchBtnGlyph: { position: 'absolute', left: 16.6, top: 0, bottom: 0, justifyContent: 'center' },
    searchBtnWhen: { left: 271.7, backgroundColor: INK },
    searchBtnNarrow: { right: 24 },
    footerRight: { fontFamily: 'PJS', fontSize: 15, lineHeight: 20, fontWeight: '700' as const, color: colors.white },
    footerRightWhen: { letterSpacing: 0.2625 },
});
