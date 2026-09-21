import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { colors, type, space, shadow } from '../tokens';
import { BackIcon, SlidersIcon } from './Icons';
import { MapView } from './MapView';
import { ResultCard } from './Cards';
import { BottomNav } from './Chrome';
import { results, mapPins, filterChips } from '../data';
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
    const { width: winW } = useWindowDimensions();
    const stageW = Math.min(393, winW);
    const [activeChips, setActiveChips] = React.useState<Set<string>>(new Set());
    const toggle = (c: string) => setActiveChips((prev) => {
        const n = new Set(prev);
        n.has(c) ? n.delete(c) : n.add(c);
        return n;
    });
    return (<View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} style={styles.iconBtn}>
          <BackIcon size={22} color={colors.ink}/>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={type.detailTitle} numberOfLines={1}>Homes nearby</Text>
          <View style={styles.headerSub}>
            <Text style={type.detailSub}>{datesText}</Text>
            <Text style={type.detailSub}>  ·  {guestsText}</Text>
          </View>
        </View>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Filters" onPress={onFilters} style={styles.iconBtn}>
          <SlidersIcon size={22} color={colors.ink}/>
        </TouchableOpacity>
      </View>

      <View style={styles.chips}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsInner}>
          {filterChips.map((c) => {
            const sel = activeChips.has(c);
            return (<TouchableOpacity key={c} accessibilityRole="button" accessibilityLabel={c} accessibilityState={{ selected: sel }} onPress={() => toggle(c)} style={[styles.chip, sel && styles.chipSel]}>
                <Text style={sel ? type.reserveBtn : type.filterChip}>{c}</Text>
              </TouchableOpacity>);
        })}
        </ScrollView>
      </View>

      <View style={styles.mapWrap}>
        <MapView width={stageW} height={460} pins={mapPins}/>
        <View style={styles.overHomes} pointerEvents="none">
          <Text style={type.overHomes}>Over 1,000 homes</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRail} style={styles.cardRailWrap}>
          {results.map((r) => (<View key={r.id} style={styles.cardSlot}>
              <ResultCard listing={r} onOpen={onOpenListing} onHeart={onHeart}/>
            </View>))}
        </ScrollView>
      </View>

      <BottomNav active={activeNav} onSelect={onNav}/>
    </View>);
};
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.white },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, height: 64 },
    iconBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
    headerCenter: { flex: 1, alignItems: 'center' },
    headerSub: { flexDirection: 'row', marginTop: 2 },
    chips: { paddingVertical: 8 },
    chipsInner: { paddingHorizontal: 16, gap: 10 },
    chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.chipBorder, backgroundColor: colors.white },
    chipSel: { backgroundColor: colors.ink, borderColor: colors.ink },
    mapWrap: { flex: 1, position: 'relative' },
    overHomes: {
        position: 'absolute', top: 12, left: 0, right: 0, alignItems: 'center',
    },
    cardRailWrap: { position: 'absolute', left: 0, right: 0, bottom: space.navHeight + 8 },
    cardRail: { paddingHorizontal: 16, gap: 14, paddingVertical: 4 },
    cardSlot: { width: 300 },
});
