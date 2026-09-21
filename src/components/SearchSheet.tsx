import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
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
    }) => (<View style={styles.inactiveRow}>
      <Text style={styles.inactiveTitle}>{title}</Text>
      <Text style={[styles.inactiveValue, valueColor ? { color: valueColor } : null]} numberOfLines={1}>{value}</Text>
    </View>);
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
        <View accessibilityRole="button" accessibilityLabel={label} style={styles.cardLabel}/>
        <View style={styles.stepInner}>{children}</View>
      </View>);
    };
    const padTop = p.step === 'where' ? 18.1 : 23;
    return (<View style={styles.overlay}>
      <TouchableOpacity style={styles.scrim} onPress={p.onClose} accessible={false}/>
      <View style={styles.panel}>
        
        <View style={styles.header}>
          <TouchableOpacity accessibilityRole="button" onPress={p.onClose} style={styles.closeBtn}>
            <CloseIcon size={16} color={INK}/>
          </TouchableOpacity>
          <View accessibilityRole="button" accessibilityLabel="Close" style={styles.closeHit}/>
          <View style={styles.seg}>
            {SEG.map((s) => {
            const sel = s === p.category;
            return (<TouchableOpacity key={s} accessibilityRole="tab" accessibilityLabel={s} accessibilityState={{ selected: sel }} onPress={() => p.setCategory(s)} style={styles.segBtn}>
                  <Text style={sel ? styles.segSel : styles.segUnsel}>{s}</Text>
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
                </View>
              </View>) : (<InactiveRow title="Where" value={p.destination ?? 'Nearby'} valueColor={INK}/>)}
          </StepCard>

          <View style={{ height: CARD_GAP }}/>

          <StepCard active={p.step === 'when'} label={PICKER.when} height={p.step === 'when' ? ACTIVE_H.when : INACTIVE_H} onPress={() => p.setStep('when')}>
            {p.step === 'when' ? (<View style={[styles.stepBody, { paddingTop: padTop }]}>
                <Text style={styles.stepTitle}>When?</Text>
                <View style={styles.calendarWrap}>
                  <Calendar year={2026} months={[8, 9]} range={p.range} onSelect={toggleRange}/>
                </View>
              </View>) : (<InactiveRow title="When" value={rangeText()}/>)}
          </StepCard>

          <View style={{ height: CARD_GAP }}/>

          <StepCard active={p.step === 'who'} label={PICKER.who} height={p.step === 'who' ? ACTIVE_H.who : INACTIVE_H} onPress={() => p.setStep('who')}>
            {p.step === 'who' ? (<View style={[styles.stepBody, { paddingTop: padTop }]}>
                <Text style={styles.stepTitle}>Who?</Text>
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
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={footerRight} onPress={() => (isWhen ? p.setStep('who') : p.onSearch())} style={[styles.searchBtn, isWhen && styles.searchBtnWhen]}>
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
    closeHit: { position: 'absolute', right: 32, top: 31, width: 16, height: 16 },
    seg: { position: 'absolute', top: 56, left: 95.7, width: 204.5, height: 13, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    segBtn: { height: 13, alignItems: 'center', justifyContent: 'center' },
    segSel: { fontFamily: 'PJS', fontSize: 10, lineHeight: 13, fontWeight: '700' as const, letterSpacing: -0.2, color: INK_BLACK },
    segUnsel: { fontFamily: 'PJS', fontSize: 10, lineHeight: 13, fontWeight: '400' as const, letterSpacing: -0.2, color: INK_SECONDARY },
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
        fontWeight: '700' as const, letterSpacing: -0.28, color: INK,
    },
    searchInput: {
        flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.hairline,
        borderRadius: 12, paddingHorizontal: 23, height: 56, marginTop: 19.1, marginBottom: 0, gap: 11,
    },
    caption: {
        fontFamily: 'PJS', fontSize: 12, lineHeight: 15.6, height: 15.6,
        fontWeight: '600' as const, letterSpacing: -0.348, color: INK, marginTop: 8, marginBottom: 4.1,
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
    calendarWrap: { marginTop: 4 },
    counters: { marginTop: 7.75 },
    inactiveRow: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 19 },
    inactiveTitle: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, height: 18.2, fontWeight: '600' as const, letterSpacing: -0.15, color: INK_SECONDARY },
    inactiveValue: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, height: 18.2, fontWeight: '400' as const, letterSpacing: -0.15, color: INK_BLACK },
    inputPlaceholder: { fontFamily: 'PJS', fontSize: 14, lineHeight: 18.2, fontWeight: '400' as const, letterSpacing: -0.242, color: INK_SECONDARY },
    footer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 49, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 24, borderTopWidth: 1, borderTopColor: colors.hairlineSoft, zIndex: 2 },
    footerLeft: { paddingVertical: 6 },
    footerText: { fontFamily: 'PJS', fontSize: 16, lineHeight: 20, fontWeight: '600' as const, color: INK },
    searchBtn: { position: 'absolute', left: 273.8, top: 2.5, backgroundColor: colors.reserve, borderRadius: 24, paddingHorizontal: 14, paddingVertical: 12 },
    searchBtnWhen: { left: 271.7 },
    footerRight: { fontFamily: 'PJS', fontSize: 15, lineHeight: 20, fontWeight: '700' as const, color: colors.white },
    footerRightWhen: { letterSpacing: 0.2625 },
});
