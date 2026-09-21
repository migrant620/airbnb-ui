import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, useWindowDimensions } from 'react-native';
import { colors, type } from '../tokens';
import { BackIcon, SlidersIcon, HeartIcon, StarIcon } from './Icons';
import { MapCanvas, MapPinMarker } from './MapView';
import { span, insetOf, rightAt } from '../layout';
import { BottomNav } from './Chrome';
import { mapPins, mapResult, mapResultLabel, filterChips } from '../data';
const R = {
    mapTop: 127.7,
    mapHeight: 650.3,
    sheetTop: 407.2,
    grabber: { top: 8.2, w: 37, h: 3 },
    back: { x: 18.2, y: 16, s: 48 },
    filters: { x: 320.9, y: 16, s: 48 },
    title: { x: 145.6, y: 22.6, w: 94.2, h: 18.2 },
    date: { x: 126.3, y: 41.8, w: 78.2, h: 15.6 },
    guests: { x: 204.5, y: 41.8, w: 54.6, h: 15.6 },
    chipTop: 76.1,
    chipHeight: 48,
    chipTextTop: 16,
    chips: [
        { x: 32.0, w: 93.2, tx: 44.0, tw: 69.1 },
        { x: 133.2, w: 94.6, tx: 145.2, tw: 70.6 },
        { x: 235.8, w: 100.4, tx: 247.8, tw: 76.4 },
        { x: 344.2, w: 60.8, tx: 356.2, tw: 36.8, clipped: true },
    ],
    chipTextClippedMinW: 72,
    count: { x: 138.6, y: 439.2, w: 116.1, h: 18.2 },
    card: { x: 24, y: 481.4, w: 345, h: 320.6, imageH: 240 },
};
export const ResultsScreen = ({ datesText, guestsText, onBack, onFilters, onOpenListing, onHeart, activeNav, onNav, }: {
    datesText: string;
    guestsText: string;
    onBack: () => void;
    onFilters: () => void;
    onOpenListing: () => void;
    onHeart: () => void;
    activeNav: string;
    onNav: (k: string) => void;
}) => {
    const { height } = useWindowDimensions();
    const contentH = Math.max(777, height);
    return (<View style={styles.root}>
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.scrollContent, { minHeight: contentH }]} showsVerticalScrollIndicator={false} bounces={false}>
  <View style={styles.root}>
    
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={'Google map\nShowing 20 stays.'} onPress={() => { }} activeOpacity={1} style={styles.map}>
      <MapCanvas width={393} height={R.mapHeight} stretch/>
      {mapPins.map((p, i) => (<MapPinMarker key={`${p.label}-${i}`} pin={p} onPress={() => { }}/>))}

      <View style={styles.sheet}>
        <View style={styles.grabber} pointerEvents="none"/>
        <Text style={[type.resultsCount, styles.count]} numberOfLines={1}>
          Over 1,000 homes
        </Text>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel={mapResultLabel(mapResult)} onPress={onOpenListing} activeOpacity={0.9} style={styles.card}>
          <Image source={mapResult.photo} style={styles.cardImage} resizeMode="cover"/>
          <View style={styles.badge} pointerEvents="none">
            <Text style={type.badgePill}>{mapResult.badge}</Text>
          </View>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Save to wishlist" onPress={onHeart} style={styles.heart} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            
            <HeartIcon size={26} color="#304E76" strokeColor="#fff" filled/>
          </TouchableOpacity>
          <View style={styles.cardText}>
            <Text style={type.cardTitle} numberOfLines={1}>
              {mapResult.name}
            </Text>
            <View style={styles.ratingRow}>
              <StarIcon size={12} color={colors.star}/>
              <Text style={type.rating}>{String(mapResult.rating)}</Text>
              <Text style={type.resultSub}>·</Text>
              <Text style={type.resultSub}>{mapResult.reviews} reviews</Text>
            </View>
            <Text style={type.cardPrice} numberOfLines={1}>
              {mapResult.priceForNights}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

    <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back to the previous search" onPress={onBack} activeOpacity={0.7} style={[styles.roundBtn, { left: R.back.x, top: R.back.y, width: R.back.s, height: R.back.s }]}>
      <BackIcon size={22} color={colors.ink}/>
    </TouchableOpacity>

    <TouchableOpacity accessibilityRole="button" accessibilityLabel="Filters, 0 filters applied" onPress={onFilters} activeOpacity={0.7} style={[styles.roundBtn, rightAt(insetOf(R.filters.x, R.filters.s), R.filters.y, R.filters.s, R.filters.s)]}>
      <SlidersIcon size={22} color={colors.ink}/>
    </TouchableOpacity>

    <Text style={[type.resultsTitle, textAt(R.title)]} numberOfLines={1}>Homes nearby</Text>
    <Text style={[type.resultsSub, textAt(R.date)]} numberOfLines={1}>{datesText}</Text>
    <Text style={[type.resultsSub, textAt(R.guests)]} numberOfLines={1}>{`  ·  ${guestsText}`}</Text>

    <View style={styles.chips}>
      {filterChips.map((c, i) => {
            const g = R.chips[i];
            return (<TouchableOpacity key={c} accessibilityRole="button" accessibilityLabel={c} onPress={() => { }} activeOpacity={0.7} style={[styles.chip, { left: g.x, width: g.w }]}>
            <Text style={[type.resultsChip, chipText(g)]} numberOfLines={1}>{c}</Text>
          </TouchableOpacity>);
        })}
    </View>
    </View>

    </ScrollView>

    <BottomNav active={activeNav} onSelect={onNav}/>
  </View>);
};
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.white },
    scroll: { flex: 1 },
    scrollContent: { position: 'relative', flexGrow: 1 },
    map: {
        position: 'absolute', left: 0, right: 0, top: R.mapTop, height: R.mapHeight,
        backgroundColor: colors.mapBg,
    },
    sheet: {
        position: 'absolute', left: 0, right: 0, top: R.sheetTop - R.mapTop, bottom: 0,
        backgroundColor: colors.white, borderTopLeftRadius: 16, borderTopRightRadius: 16,
    },
    grabber: {
        position: 'absolute', alignSelf: 'center', top: R.grabber.top,
        width: R.grabber.w, height: R.grabber.h, borderRadius: R.grabber.h / 2,
        backgroundColor: colors.hairline,
    },
    count: {
        position: 'absolute', left: R.count.x, top: R.count.y - R.sheetTop,
        width: R.count.w, height: R.count.h, textAlign: 'center',
    },
    card: {
        ...span(R.card.x, R.card.y - R.sheetTop, insetOf(R.card.x, R.card.w), R.card.h),
    },
    cardImage: {
        width: '100%', height: R.card.imageH, borderRadius: 12, backgroundColor: colors.mapBlock,
    },
    badge: {
        position: 'absolute', left: 16, top: 17, height: 22.6,
        backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 11.3,
        paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center',
    },
    heart: { position: 'absolute', right: 12, top: 14, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
    cardText: { paddingTop: 10, paddingHorizontal: 2 },
    ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2, gap: 4 },
    roundBtn: {
        position: 'absolute', alignItems: 'center', justifyContent: 'center',
        borderRadius: 24, backgroundColor: colors.white,
    },
    chips: { position: 'absolute', left: 0, right: 0, top: R.chipTop, height: R.chipHeight, overflow: 'hidden' },
    chip: {
        position: 'absolute', top: 0, height: R.chipHeight, borderRadius: R.chipHeight / 2,
        borderWidth: 1, borderColor: colors.chipBorder, backgroundColor: colors.white,
    },
});
const textAt = (b: {
    x: number;
    y: number;
    w: number;
    h: number;
}) => ({ position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h } as const);
const chipText = (g: {
    x: number;
    w: number;
    tx: number;
    tw: number;
    clipped?: boolean;
}) => ({
    position: 'absolute', left: g.tx - g.x - 1, top: R.chipTextTop, height: 15.6,
    minWidth: g.clipped ? R.chipTextClippedMinW : g.tw,
} as const);
