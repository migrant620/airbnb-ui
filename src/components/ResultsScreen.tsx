import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, useWindowDimensions } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';
import { colors, type } from '../tokens';
import { BackIcon, SlidersIcon, HeartIcon, StarIcon } from './Icons';
import { MapCanvas, MapPinMarker } from './MapView';
import { span, insetOf, rightAt } from '../layout';
import { BottomNav } from './Chrome';
import { mapPins, mapResult, mapResultLabel, filterChips, feedHomes, feedHotels, Listing } from '../data';
const visiblePins = (() => {
    const priced = mapPins.filter((p) => !p.compact);
    const kept = priced.filter((p, i) => priced.slice(0, i).every((q) => Math.abs(q.x - p.x) > q.w * 0.6 || Math.abs(q.y - p.y) > q.h * 0.6));
    return [...mapPins.filter((p) => p.compact), ...kept];
})();
const R = {
    mapTop: 127.7,
    mapHeight: 650.3,
    sheetTop: 407.2,
    grabber: { top: 8.2, w: 37, h: 3 },
    back: { x: 18.2, y: 16, s: 48 },
    filters: { x: 320.9, y: 16, s: 48 },
    toggle: { x: 262, y: 16, s: 48 },
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
const resultListings = [...feedHomes, ...feedHotels];
const ListGlyph = ({ size = 22, color = '#222' }: {
    size?: number;
    color?: string;
}) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={4} y1={7} x2={20} y2={7} stroke={color} strokeWidth={2} strokeLinecap="round"/>
    <Line x1={4} y1={12} x2={20} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round"/>
    <Line x1={4} y1={17} x2={20} y2={17} stroke={color} strokeWidth={2} strokeLinecap="round"/>
  </Svg>);
const MapGlyph = ({ size = 22, color = '#222' }: {
    size?: number;
    color?: string;
}) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" stroke={color} strokeWidth={1.8} strokeLinejoin="round"/>
    <Line x1={9} y1={4} x2={9} y2={18} stroke={color} strokeWidth={1.8} strokeLinecap="round"/>
    <Line x1={15} y1={4} x2={15} y2={18} stroke={color} strokeWidth={1.8} strokeLinecap="round"/>
  </Svg>);
export const ResultsScreen = ({ datesText, guestsText, onBack, onFilters, filterCount, onOpenListing, onHeart, favoriteIds, onToggleFavorite, activeNav, onNav, }: {
    datesText: string;
    guestsText: string;
    onBack: () => void;
    onFilters: () => void;
    filterCount: number;
    onOpenListing: () => void;
    onHeart: () => void;
    favoriteIds: string[];
    onToggleFavorite: (l: Listing) => void;
    activeNav: string;
    onNav: (k: string) => void;
}) => {
    const [view, setView] = React.useState<'map' | 'list'>('map');
    const { height } = useWindowDimensions();
    const contentH = Math.max(777, height);
    const toggleGlyph = view === 'map'
        ? <ListGlyph size={22} color={colors.ink}/>
        : <MapGlyph size={22} color={colors.ink}/>;
    return (<View style={styles.root}>
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.scrollContent, { minHeight: contentH }]} showsVerticalScrollIndicator={false} bounces={false}>
  <View style={styles.root}>
    {view === 'map' ? (<ResultsMap datesText={datesText} guestsText={guestsText} onBack={onBack} onFilters={onFilters} filterCount={filterCount} onOpenListing={onOpenListing} onHeart={onHeart} view={view} onToggle={() => setView('list')}/>) : (<ResultsList datesText={datesText} guestsText={guestsText} onBack={onBack} onFilters={onFilters} filterCount={filterCount} onOpenListing={onOpenListing} favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} view={view} onToggle={() => setView('map')}/>)}
    </View>
    </ScrollView>

    <BottomNav active={activeNav} onSelect={onNav}/>
  </View>);
};
const TopControls = ({ onBack, onFilters, filterCount, view, onToggle, }: {
    onBack: () => void;
    onFilters: () => void;
    filterCount: number;
    view: 'map' | 'list';
    onToggle: () => void;
}) => (<>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back to the previous search" onPress={onBack} activeOpacity={0.7} style={[styles.roundBtn, { left: R.back.x, top: R.back.y, width: R.back.s, height: R.back.s }]}>
      <BackIcon size={22} color={colors.ink}/>
    </TouchableOpacity>

    <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Filters, ${filterCount} filter${filterCount === 1 ? '' : 's'} applied`} onPress={onFilters} activeOpacity={0.7} style={[styles.roundBtn, rightAt(insetOf(R.filters.x, R.filters.s), R.filters.y, R.filters.s, R.filters.s)]}>
      <SlidersIcon size={22} color={colors.ink}/>
    </TouchableOpacity>

    <TouchableOpacity accessibilityRole="button" accessibilityLabel={view === 'map' ? 'Show list' : 'Show map'} onPress={onToggle} activeOpacity={0.7} style={[styles.roundBtn, { left: R.toggle.x, top: R.toggle.y, width: R.toggle.s, height: R.toggle.s }]}>
      {view === 'map'
        ? <ListGlyph size={22} color={colors.ink}/>
        : <MapGlyph size={22} color={colors.ink}/>}
    </TouchableOpacity>
  </>);
const ResultsMap = ({ datesText, guestsText, onBack, onFilters, filterCount, onOpenListing, onHeart, view, onToggle, }: {
    datesText: string;
    guestsText: string;
    onBack: () => void;
    onFilters: () => void;
    filterCount: number;
    onOpenListing: () => void;
    onHeart: () => void;
    view: 'map' | 'list';
    onToggle: () => void;
}) => (<>
    
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={'Google map\nShowing 20 stays.'} onPress={() => { }} activeOpacity={1} style={styles.map}>
      <MapCanvas width={393} height={R.mapHeight} stretch/>
      {visiblePins.map((p, i) => (<MapPinMarker key={`${p.label}-${i}`} pin={p} onPress={() => { }}/>))}

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

    <TopControls onBack={onBack} onFilters={onFilters} filterCount={filterCount} view={view} onToggle={onToggle}/>

    <Text style={[type.resultsTitle, textAt(R.title)]} numberOfLines={1}>Homes nearby</Text>
    <Text style={[type.resultsSub, textAt(R.date)]} numberOfLines={1}>{datesText}</Text>
    <Text style={[type.resultsSub, textAt(R.guests)]} numberOfLines={1}>{`  ·  ${guestsText.replace(' ', ' ')}`}</Text>

    <View style={styles.chips}>
      {filterChips.map((c, i) => {
        const g = R.chips[i];
        return (<TouchableOpacity key={c} accessibilityRole="button" accessibilityLabel={c} onPress={() => { }} activeOpacity={0.7} style={[styles.chip, { left: g.x, width: g.w }]}>
            <Text style={[type.resultsChip, chipText(g)]} numberOfLines={1}>{c}</Text>
          </TouchableOpacity>);
    })}
    </View>
  </>);
const ResultsList = ({ datesText, guestsText, onBack, onFilters, filterCount, onOpenListing, favoriteIds, onToggleFavorite, view, onToggle, }: {
    datesText: string;
    guestsText: string;
    onBack: () => void;
    onFilters: () => void;
    filterCount: number;
    onOpenListing: () => void;
    favoriteIds: string[];
    onToggleFavorite: (l: Listing) => void;
    view: 'map' | 'list';
    onToggle: () => void;
}) => (<>
    <TopControls onBack={onBack} onFilters={onFilters} filterCount={filterCount} view={view} onToggle={onToggle}/>

    
    <View style={styles.listHeader}>
      <Text style={type.resultsCount} numberOfLines={1}>Over 1,000 homes</Text>
      <Text style={[type.resultsTitle, styles.listTitle]} numberOfLines={1}>Homes nearby</Text>
      <Text style={[type.resultsSub, styles.listSub]} numberOfLines={1}>{`${datesText}  ·  ${guestsText}`}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow} contentContainerStyle={styles.chipsRowInner}>
        {filterChips.map((c) => (<TouchableOpacity key={c} accessibilityRole="button" accessibilityLabel={c} onPress={() => { }} activeOpacity={0.7} style={styles.listChip}>
            <Text style={type.resultsChip} numberOfLines={1}>{c}</Text>
          </TouchableOpacity>))}
      </ScrollView>
    </View>

    {resultListings.map((l) => (<ResultRow key={l.id} listing={l} datesText={datesText} onOpen={onOpenListing} favorite={favoriteIds.includes(l.id)} onHeart={() => onToggleFavorite(l)}/>))}
  </>);
const ResultRow = ({ listing, datesText, onOpen, onHeart, favorite, }: {
    listing: typeof resultListings[number];
    datesText: string;
    onOpen: () => void;
    onHeart: () => void;
    favorite: boolean;
}) => {
    const label = [
        listing.badge,
        listing.title,
        listing.priceForNights,
        `${String(listing.rating)} out of 5 average rating, ${listing.reviews} reviews.`,
    ].filter(Boolean).join('. ');
    return (<TouchableOpacity accessibilityRole="button" accessibilityLabel={label} onPress={onOpen} activeOpacity={0.9} style={styles.rCard}>
      <View style={styles.rImageWrap}>
        <Image source={listing.photo} style={styles.rImage} resizeMode="cover"/>
        {listing.badge ? (<View style={styles.rBadge} pointerEvents="none">
            <Text style={type.badgePill}>{listing.badge}</Text>
          </View>) : null}
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Save to wishlist" onPress={onHeart} style={styles.rHeart} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          
          <HeartIcon size={26} color={favorite ? colors.brand : '#304E76'} strokeColor="#fff" filled/>
        </TouchableOpacity>
        
        <View style={styles.rDots} pointerEvents="none">
          {[0, 1, 2, 3, 4].map((i) => (<View key={i} style={[styles.dot, i === 0 && styles.dotActive]}/>))}
        </View>
      </View>
      <View style={styles.rText}>
        <Text style={type.cardTitle} numberOfLines={2}>{listing.title}</Text>
        <View style={styles.ratingRow}>
          <StarIcon size={12} color={colors.star}/>
          <Text style={type.cardRatingNum}>{String(listing.rating)}</Text>
          <Text style={type.resultSub}>·</Text>
          <Text style={type.resultSub}>{listing.reviews} reviews</Text>
        </View>
        <Text style={[type.resultSub, styles.rDate]} numberOfLines={1}>{datesText}</Text>
        <Text style={type.cardPrice} numberOfLines={1}>{listing.priceForNights}</Text>
      </View>
    </TouchableOpacity>);
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
    listHeader: { paddingTop: 64, paddingHorizontal: 24 },
    listTitle: { marginTop: 2 },
    listSub: { marginTop: 2 },
    chipsRow: { marginTop: 14 },
    chipsRowInner: { gap: 8, paddingRight: 24 },
    listChip: {
        height: 34, paddingHorizontal: 14, borderRadius: 17,
        borderWidth: 1, borderColor: colors.chipBorder, backgroundColor: colors.white,
        alignItems: 'center', justifyContent: 'center',
    },
    rCard: { paddingTop: 24, paddingHorizontal: 24 },
    rImageWrap: { position: 'relative' },
    rImage: { width: '100%', height: 200, borderRadius: 12, backgroundColor: colors.mapBlock },
    rBadge: {
        position: 'absolute', left: 12, top: 12, height: 22.6,
        backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 11.3,
        paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center',
    },
    rHeart: { position: 'absolute', right: 12, top: 12, width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
    rDots: { position: 'absolute', left: 12, bottom: 10, flexDirection: 'row', alignItems: 'center', gap: 4 },
    dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'rgba(255,255,255,0.65)' },
    dotActive: { width: 13, backgroundColor: colors.white },
    rText: { paddingTop: 10, paddingHorizontal: 2 },
    rDate: { marginTop: 2 },
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
