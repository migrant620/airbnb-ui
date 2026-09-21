import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { colors, type, space } from '../tokens';
import { SearchPillWrap, CategoryTabs, BottomNav, FooterNote } from './Chrome';
import { ListingCard } from './Cards';
import { feedHomes, feedHotels, Listing } from '../data';
type Row = {
    title: string;
    subtitle?: string;
    items: Listing[];
    padTop: number;
    railGap: number;
    cardHeights: number[];
    imageHeights: number[];
};
const H1 = 201.2;
const H2 = 217.2;
const rowsFor = (cat: string): Row[] => {
    const h1 = { padTop: space.row1HeadingTop, railGap: space.row1RailGap, cardHeights: [H1, H1, H1], imageHeights: [141.2, 141.2, 141.2] };
    const h2 = { padTop: space.row2HeadingTop, railGap: space.row2RailGap, cardHeights: [H2, H1, H2], imageHeights: [145, 129, 145] };
    const defaultFeed: Row[] = [
        { title: 'Popular homes in Lake Tahoe', items: feedHomes, ...h1 },
        {
            title: 'Great hotels for your next trip',
            subtitle: 'Plus, get Airbnb credit when you stay at a featured hotel.',
            items: feedHotels,
            ...h2,
        },
    ];
    switch (cat) {
        case 'Homes':
            return defaultFeed;
        case 'Experiences':
            return [
                { title: 'Experiences near you', items: feedHotels, ...h1 },
                { title: 'Popular experiences', items: feedHotels.slice().reverse(), ...h2 },
            ];
        case 'Services':
            return [
                { title: 'Services near you', items: feedHomes, ...h1 },
                { title: 'Popular services', items: feedHotels, ...h2 },
            ];
        default:
            return defaultFeed;
    }
};
const CardRow = ({ row, onOpenListing, onHeart, }: {
    row: Row;
    onOpenListing: () => void;
    onHeart: () => void;
}) => (<View style={styles.row}>
    <View style={[styles.headBlock, { marginTop: row.padTop }]}>
      <Text style={type.sectionTitle}>{row.title}</Text>
      {row.subtitle ? <Text style={[type.subtitle, styles.subtitle]}>{row.subtitle}</Text> : null}
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardRail} style={{ marginTop: row.railGap }}>
      {row.items.map((l, i) => (<View key={l.id} style={styles.cardSlot}>
          <ListingCard listing={l} onOpen={onOpenListing} onHeart={onHeart} height={row.cardHeights[Math.min(i, row.cardHeights.length - 1)]} imageHeight={row.imageHeights[Math.min(i, row.imageHeights.length - 1)]}/>
        </View>))}
    </ScrollView>
  </View>);
export const ExploreScreen = ({ activeCategory, onCategory, onOpenListing, onHeart, onOpenSearch, onNav, activeNav, scrollRef, onScrollY, }: {
    activeCategory: string;
    onCategory: (c: string) => void;
    onOpenListing: () => void;
    onHeart: () => void;
    onOpenSearch: () => void;
    onNav: (k: string) => void;
    activeNav: string;
    scrollRef: React.RefObject<ScrollView | null>;
    onScrollY: (y: number) => void;
}) => {
    const rows = rowsFor(activeCategory);
    return (<View style={styles.root}>
      <View style={styles.header}>
        <SearchPillWrap onPress={onOpenSearch}/>
        <CategoryTabs active={activeCategory} onSelect={onCategory}/>
      </View>

      <ScrollView ref={scrollRef} style={styles.feed} contentContainerStyle={styles.feedInner} onScroll={(e) => onScrollY(e.nativeEvent.contentOffset.y)} scrollEventThrottle={16}>
        {rows.map((row, i) => (<CardRow key={i} row={row} onOpenListing={onOpenListing} onHeart={onHeart}/>))}
        <View style={{ height: space.navHeight + 60 }}/>
      </ScrollView>

      {activeCategory === 'All' ? <FooterNote /> : null}
      <BottomNav active={activeNav} onSelect={onNav}/>
    </View>);
};
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.white },
    header: { backgroundColor: 'transparent' },
    feed: { flex: 1 },
    feedInner: { paddingTop: 0 },
    row: {},
    headBlock: { paddingLeft: 26.2 },
    subtitle: { width: 298.8, marginTop: 0 },
    cardRail: { paddingHorizontal: space.contentPad, gap: space.cardGap, paddingVertical: 0 },
    cardSlot: { width: space.cardWidth },
});
