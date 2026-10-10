import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, type, fonts, space } from '../tokens';
import { BackIcon, StarIcon } from './Icons';
import { detailListing, detailReviews, reviewBreakdown } from '../data';
const Stars = ({ size = 14, gap = 4 }: {
    size?: number;
    gap?: number;
}) => (<View style={[styles.starsRow, { gap }]} pointerEvents="none">
    {[0, 1, 2, 3, 4].map((i) => (<StarIcon key={i} size={size} color={colors.star}/>))}
  </View>);
export const ReviewsScreen = ({ onClose }: {
    onClose: () => void;
}) => {
    const { reviews, rating } = detailListing;
    return (<View style={styles.root} aria-modal={true} role="dialog">
      <View style={styles.header}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Navigate up" onPress={onClose} activeOpacity={0.7} style={styles.backBtn}>
          <BackIcon size={22} color={colors.ink}/>
        </TouchableOpacity>
        <Text style={[type.sheetTitle, styles.headerTitle]} numberOfLines={1}>Reviews</Text>
        <View style={styles.headerSpacer}/>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={false}>
        
        <View style={styles.summary}>
          <Text style={styles.score} numberOfLines={1}>{rating}</Text>
          <Stars size={16} gap={5}/>
          <Text style={styles.reviewCount} numberOfLines={1}>{reviews} reviews</Text>
        </View>

        
        <View style={styles.breakdown}>
          {reviewBreakdown.map((b) => (<View key={b.label} style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel} numberOfLines={1}>{b.label}</Text>
              <View style={styles.breakdownValue} pointerEvents="none">
                <Text style={styles.breakdownNum} numberOfLines={1}>{b.value.toFixed(1)}</Text>
                <StarIcon size={12} color={colors.star}/>
              </View>
            </View>))}
        </View>

        <View style={styles.divider} pointerEvents="none"/>

        {detailReviews.map((r) => (<View key={r.id} style={styles.card}>
            <View style={styles.cardHead}>
              <Image source={r.photo} style={styles.avatar} resizeMode="cover"/>
              <View style={styles.cardWho}>
                <Text style={styles.name} numberOfLines={1}>{r.name}</Text>
                <Text style={styles.meta} numberOfLines={1}>{r.meta}</Text>
              </View>
            </View>
            <Text style={styles.body}>{r.text}</Text>
          </View>))}

        <View style={styles.footerSpace} pointerEvents="none"/>
      </ScrollView>
    </View>);
};
const styles = StyleSheet.create({
    root: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: colors.white, zIndex: 62, overflow: 'hidden',
    },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        height: 56, paddingHorizontal: space.sheetPad,
        borderBottomWidth: 1, borderBottomColor: colors.hairlineSoft,
    },
    backBtn: { width: 40, height: 40, marginLeft: -8, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { flex: 1, textAlign: 'center', fontSize: 17 },
    headerSpacer: { width: 32 },
    scroll: { flex: 1 },
    content: { paddingHorizontal: space.contentPad, paddingTop: 24 },
    summary: { alignItems: 'center' },
    score: { fontFamily: fonts.num, fontSize: 30, lineHeight: 36, fontWeight: '500', color: colors.ink },
    starsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    reviewCount: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 18, fontWeight: '400', color: colors.secondary, marginTop: 6 },
    breakdown: { marginTop: 24 },
    breakdownRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        height: 40,
    },
    breakdownLabel: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 19, fontWeight: '400', color: colors.ink },
    breakdownValue: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    breakdownNum: { fontFamily: fonts.num, fontSize: 14, lineHeight: 18, fontWeight: '500', color: colors.ink },
    divider: { height: 1, backgroundColor: colors.hairlineSoft, marginTop: 16, marginBottom: 8 },
    card: { paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: colors.hairlineSoft },
    cardHead: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.mapBlock },
    cardWho: { marginLeft: 12 },
    name: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 20, fontWeight: '600', color: colors.ink },
    meta: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 17, fontWeight: '400', color: colors.secondary, marginTop: 1 },
    body: { fontFamily: fonts.sans, fontSize: 15, lineHeight: 21.1, fontWeight: '400', color: colors.ink, marginTop: 12 },
    footerSpace: { height: 40 },
});
