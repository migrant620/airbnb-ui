import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, type } from '../tokens';
import { BackIcon, ShareIcon, HeartIcon, StarIcon, TrophyIcon, PinIcon, CheckCircleIcon, PhotoIcon } from './Icons';
import { detailListing, PHOTO_TOTAL } from '../data';
import { insetOf, rightAt, lowAt, lowRight, span } from '../layout';
const W = 393;
const BandGlyph = ({ index }: {
    index: number;
}) => {
    const size = 26;
    if (index === 0)
        return <TrophyIcon size={size}/>;
    if (index === 1)
        return <PinIcon size={size}/>;
    if (index === 2)
        return <CheckCircleIcon size={size}/>;
    return <PhotoIcon size={size}/>;
};
const PAD = 49.5;
const SCROLL_H = 851.5;
const CONTENT_H = 1338.7;
const at = (x: number, y: number, w: number, h: number) => ({ position: 'absolute', left: x, top: y, width: w, height: h } as const);
const R = {
    hero: { x: 0, y: 0, w: W, h: 374.4 },
    sheet: { y: 342.5, h: CONTENT_H - 342.5 },
    counter: { x: 333.7, y: 314.8, w: 29.1, h: 15.6 },
    counterPill: { x: 324.2, y: 309.4, w: 48, h: 26.4 },
    title: { x: 24, y: 374.5, w: 345, h: 64 },
    location: { x: 24, y: 454.5, w: 345, h: 18.2 },
    meta: { x: 24, y: 474.9, w: 345, h: 18.2 },
    reviews: { x: 16, y: 517.1, w: 358.8, h: 41.8 },
    rating: { x: 46.9, y: 518.2, w: 34.9, h: 23.7 },
    stars: { x: 41, y: 547.6, w: 48.8, h: 9.4 },
    guestFav: { x: 164.8, y: 517.1, w: 61.1, h: 36.8 },
    laurelL: { x: 126.6, y: 517.1, w: 48, h: 44.4 },
    laurelR: { x: 216.1, y: 517.1, w: 48, h: 44.4 },
    reviewCount: { x: 304.6, y: 517.1, w: 46.2, h: 41.5 },
    chipPill: { x: 142.4, y: 578.9, w: 108.1, h: 28.6 },
    freeCancel: { x: 152.8, y: 585.5, w: 87.3, h: 14.2 },
    dividerA: { x: 24, y: 610.9, w: 345, h: 1.1 },
    avatar: { x: 20, y: 655.4, w: 48, h: 48 },
    superhostHit: { x: 24, y: 659.4, w: 40, h: 40 },
    superhostBadge: { x: 51.3, y: 683.8, w: 14.9, h: 17.8 },
    hostName: { x: 80.1, y: 659.4, w: 234, h: 20.7 },
    hostSub: { x: 80.1, y: 684.1, w: 172.1, h: 18.2 },
    dividerB: { x: 24, y: 726.3, w: 345, h: 1.1 },
    bandIcon: { x: 20, y: 0, w: 48, h: 48 },
    bandTitle: { x: 80.1, h: 18.2 },
    bandTitleW: [115.4, 202.3, 192.9, 235.1],
    bandDesc: { x: 80.1, w: 288.9, h: 36.4 },
    bandTops: [747.4, 826, 904.6, 983.2],
    dividerC: { x: 24, y: 1065.8, w: 345, h: 1.1 },
    body: { x: 24, y: 1098.9, w: 345, h: 189.9 },
    showMore: { x: 24, y: 1319.1, w: 345, h: 34.6 },
    topBack: { x: 16, y: 12, w: 32, h: 32 },
    topShare: { x: 304.9, y: 12, w: 32, h: 32 },
    topSave: { x: 345, y: 12, w: 32, h: 32 },
    price: { x: 24, y: 716.9, w: 143, h: 41.5 },
    priceRun: { x: 0, y: 0, w: 99, h: 25.8 },
    priceNote: { x: 0, y: 25.8, w: 143, h: 15.6 },
    reserve: { x: 224.9, y: 712.9, w: 144.1, h: 49.1 },
    homeBar: { x: 124.9, y: 764.9, w: 143.3, h: 5.1 },
};
const R_INSET = {
    hero: insetOf(R.hero.x, R.hero.w), sheet: insetOf(0, W),
    title: insetOf(R.title.x, R.title.w), location: insetOf(R.location.x, R.location.w),
    meta: insetOf(R.meta.x, R.meta.w), reviews: insetOf(R.reviews.x, R.reviews.w),
    bandDesc: insetOf(R.bandDesc.x, R.bandDesc.w), dividerA: insetOf(R.dividerA.x, R.dividerA.w),
    dividerB: insetOf(R.dividerB.x, R.dividerB.w), dividerC: insetOf(R.dividerC.x, R.dividerC.w),
    body: insetOf(R.body.x, R.body.w), showMore: insetOf(R.showMore.x, R.showMore.w),
    topShare: insetOf(R.topShare.x, R.topShare.w), topSave: insetOf(R.topSave.x, R.topSave.w),
    counterPill: insetOf(R.counterPill.x, R.counterPill.w), counter: insetOf(R.counter.x, R.counter.w),
    reviewCount: insetOf(R.reviewCount.x, R.reviewCount.w), reserve: insetOf(R.reserve.x, R.reserve.w),
};
export const ListingDetail = ({ photoIndex, onBack, onShare, onHeart, onOpenPhoto, onPhotoChange, onReserve, }: {
    photoIndex: number;
    onBack: () => void;
    onShare: () => void;
    onHeart: () => void;
    onOpenPhoto: () => void;
    onPhotoChange: (i: number) => void;
    onReserve: () => void;
}) => {
    const { photos, host, blocks } = detailListing;
    const touchStart = React.useRef<{
        x: number;
        y: number;
    } | null>(null);
    const pressStart = (x: number, y: number) => { touchStart.current = { x, y }; };
    const pressEnd = (x: number, y: number) => {
        const s = touchStart.current;
        touchStart.current = null;
        if (!s)
            return;
        if (Math.abs(x - s.x) < 10 && Math.abs(y - s.y) < 10)
            onOpenPhoto();
    };
    return (<View style={styles.root}>
      
      <View style={span(0, -PAD, R_INSET.sheet, 746.3)} accessibilityRole="button" accessibilityLabel="pdp" pointerEvents="none"/>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={false}>
        <View accessibilityRole="button" accessibilityLabel="Open photo tour" style={span(R.hero.x, R.hero.y, R_INSET.hero, R.hero.h)} onTouchStart={(e) => {
            const t = e.nativeEvent.touches[0];
            pressStart(t.pageX, t.pageY);
        }} onTouchEnd={(e) => {
            const t = e.nativeEvent.changedTouches[0] ?? e.nativeEvent.touches[0];
            if (t)
                pressEnd(t.pageX, t.pageY);
        }} {...({
        onMouseDown: (e: any) => pressStart(e.nativeEvent.pageX, e.nativeEvent.pageY),
        onMouseUp: (e: any) => pressEnd(e.nativeEvent.pageX, e.nativeEvent.pageY),
    } as any)}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} bounces={false} onScroll={(e) => {
            const w = e.nativeEvent.layoutMeasurement.width;
            const i = Math.round(e.nativeEvent.contentOffset.x / w);
            if (i !== photoIndex)
                onPhotoChange(i);
        }} scrollEventThrottle={32} style={styles.heroPager} contentContainerStyle={styles.heroPagerContent}>
            {photos.map((ph, i) => (<Image key={i} source={ph.file} style={[styles.heroImg, { width: W }]} resizeMode="cover"/>))}
          </ScrollView>
        </View>

        
        <View style={[span(0, R.sheet.y, R_INSET.sheet, R.sheet.h), styles.sheet]} pointerEvents="none"/>

        <View style={[rightAt(R_INSET.counterPill, R.counterPill.y, R.counterPill.w, R.counterPill.h), styles.counterPill]} pointerEvents="none"/>
        <Text style={[type.pdpCounter, rightAt(R_INSET.counter, R.counter.y, R.counter.w, R.counter.h)]} numberOfLines={1}>
          {photoIndex + 1} / 95
        </Text>

        <Text style={[type.pdpTitle, span(R.title.x, R.title.y, R_INSET.title, R.title.h)]}>Tent 03 - Overlook w/ocean view</Text>
        <Text style={[type.pdpSub, span(R.location.x, R.location.y, R_INSET.location, R.location.h)]}>Tent in Woodside, California</Text>
        <Text style={[type.pdpMeta, span(R.meta.x, R.meta.y, R_INSET.meta, R.meta.h)]}>4 guests  ·  1 bedroom  ·  3 beds  ·  1 bath</Text>

        
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Show all 76 reviews" onPress={onReserve} activeOpacity={1} style={span(R.reviews.x, R.reviews.y, R_INSET.reviews, R.reviews.h)}/>
        
        <Text style={[type.pdpRating, at(R.rating.x, R.rating.y, R.rating.w, R.rating.h), styles.noHit]} numberOfLines={1}>
          4.97
        </Text>
        <View style={[at(R.stars.x, R.stars.y, R.stars.w, R.stars.h), styles.stars]} pointerEvents="none">
          {[0, 1, 2, 3, 4].map((i) => (<StarIcon key={i} size={8.6} color={colors.ink}/>))}
        </View>
        <Text aria-hidden style={[styles.laurel, styles.noHit, at(R.laurelL.x, R.laurelL.y, R.laurelL.w, R.laurelL.h)]}>🏅</Text>
        <Text style={[type.pdpGuestFav, styles.centred, styles.noHit, at(R.guestFav.x, R.guestFav.y, R.guestFav.w, R.guestFav.h)]}>
          {'Guest\nfavorite'}
        </Text>
        <Text aria-hidden style={[styles.laurel, styles.noHit, at(R.laurelR.x, R.laurelR.y, R.laurelR.w, R.laurelR.h)]}>🏅</Text>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="76 reviews" onPress={onReserve} activeOpacity={1} style={rightAt(R_INSET.reviewCount, R.reviewCount.y, R.reviewCount.w, R.reviewCount.h)}>
          <Text style={[type.pdpBlockTitle, styles.reviewCountText]} numberOfLines={2}>{'76\nReviews'}</Text>
        </TouchableOpacity>

        <View style={[at(R.chipPill.x, R.chipPill.y, R.chipPill.w, R.chipPill.h), styles.chipPill]} pointerEvents="none"/>
        <Text style={[type.pdpChip, at(R.freeCancel.x, R.freeCancel.y, R.freeCancel.w, R.freeCancel.h), styles.centred, styles.noHit]} numberOfLines={1}>
          Free cancellation
        </Text>

        <View style={[span(R.dividerA.x, R.dividerA.y, R_INSET.dividerA, R.dividerA.h), styles.divider]} pointerEvents="none"/>

        
        <TouchableOpacity accessibilityRole="button" onPress={onReserve} activeOpacity={1} style={at(R.avatar.x, R.avatar.y, R.avatar.w, R.avatar.h)}>
          <Image source={photos[0].file} style={styles.avatarImg} resizeMode="cover"/>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={host.desc} onPress={onReserve} activeOpacity={1} style={at(R.superhostHit.x - R.avatar.x, R.superhostHit.y - R.avatar.y, R.superhostHit.w, R.superhostHit.h)}/>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={host.superhost} onPress={onReserve} activeOpacity={1} style={[at(R.superhostBadge.x - R.avatar.x, R.superhostBadge.y - R.avatar.y, R.superhostBadge.w, R.superhostBadge.h), styles.superhostBadge]}/>
        </TouchableOpacity>
        <Text style={[type.pdpHostName, at(R.hostName.x, R.hostName.y, R.hostName.w, R.hostName.h)]} numberOfLines={1}>{host.nameLine}</Text>
        <Text style={[type.pdpHostSub, at(R.hostSub.x, R.hostSub.y, R.hostSub.w, R.hostSub.h)]} numberOfLines={1}>{host.sub}</Text>

        <View style={[span(R.dividerB.x, R.dividerB.y, R_INSET.dividerB, R.dividerB.h), styles.divider]} pointerEvents="none"/>

        {blocks.map((b, i) => (<React.Fragment key={b.title}>
            <View style={[at(R.bandIcon.x, R.bandTops[i], R.bandIcon.w, R.bandIcon.h), styles.bandIconBox]} pointerEvents="none">
              <BandGlyph index={i}/>
            </View>
            <Text style={[type.pdpBlockTitle, at(R.bandTitle.x, R.bandTops[i], R.bandTitleW[i], R.bandTitle.h)]} numberOfLines={1}>
              {b.title}
            </Text>
            <Text style={[type.pdpBlockDesc, span(R.bandDesc.x, R.bandTops[i] + 22.2, R_INSET.bandDesc, R.bandDesc.h)]}>
              {b.desc}
            </Text>
          </React.Fragment>))}

        <View style={[span(R.dividerC.x, R.dividerC.y, R_INSET.dividerC, R.dividerC.h), styles.divider]} pointerEvents="none"/>

        <Text style={[type.pdpBody, span(R.body.x, R.body.y, R_INSET.body, R.body.h)]}>{detailListing.body}</Text>

        <TouchableOpacity accessibilityRole="button" onPress={onReserve} activeOpacity={0.9} style={span(R.showMore.x, R.showMore.y, R_INSET.showMore, R.showMore.h)}>
          <Text style={[type.pdpBlockTitle, styles.showMoreText]}>Show more</Text>
        </TouchableOpacity>
      </ScrollView>

      
      <View style={styles.bottomBar} pointerEvents="none"/>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Navigate Up" onPress={onBack} activeOpacity={0.7} style={[at(R.topBack.x, R.topBack.y, R.topBack.w, R.topBack.h), styles.topBtn]}>
        <View style={styles.topDisc} pointerEvents="none"/>
        <View pointerEvents="none"><BackIcon size={22} color={colors.ink}/></View>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Share" onPress={onShare} activeOpacity={0.7} style={[rightAt(R_INSET.topShare, R.topShare.y, R.topShare.w, R.topShare.h), styles.topBtn]}>
        <View style={styles.topDisc} pointerEvents="none"/>
        <View pointerEvents="none"><ShareIcon size={22} color={colors.ink}/></View>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Save to wishlist" onPress={onHeart} activeOpacity={0.7} style={[rightAt(R_INSET.topSave, R.topSave.y, R.topSave.w, R.topSave.h), styles.topBtn]}>
        <View style={styles.topDisc} pointerEvents="none"/>
        <View pointerEvents="none"><HeartIcon size={24} color={colors.ink}/></View>
      </TouchableOpacity>

      <TouchableOpacity accessibilityRole="button" accessibilityLabel={detailListing.priceLabel} onPress={onReserve} activeOpacity={1} style={lowAt(R.price.x, R.price.y, R.price.w, R.price.h)}>
        <Text style={[type.pdpPriceNow, at(R.priceRun.x, R.priceRun.y, R.priceRun.w, R.priceRun.h), { letterSpacing: -0.6 }]} numberOfLines={1}>
          {detailListing.priceRun}
        </Text>
        
        <Text aria-hidden style={[type.pdpPriceNow, at(R.priceRun.x, R.priceRun.y, 46, R.priceRun.h), styles.priceWas, { letterSpacing: -0.6 }]} numberOfLines={1}>
          {detailListing.priceWas}
        </Text>
        <Text style={[type.pdpPriceNote, at(R.priceNote.x, R.priceNote.y, R.priceNote.w, R.priceNote.h)]} numberOfLines={1}>
          {detailListing.priceNote}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Reserve" onPress={onReserve} activeOpacity={0.9} style={[lowRight(R_INSET.reserve, R.reserve.y, R.reserve.w, R.reserve.h), styles.reserve]}>
        <Text style={[type.pdpReserve, styles.reserveText]}>Reserve</Text>
      </TouchableOpacity>

      <View style={[lowAt(R.homeBar.x, R.homeBar.y, R.homeBar.w, R.homeBar.h), styles.homeBar]} pointerEvents="none"/>
    </View>);
};
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.white, overflow: 'hidden' },
    scroll: {
        position: 'absolute', left: 0, top: -PAD, width: '100%', height: SCROLL_H,
    },
    content: { width: '100%', height: CONTENT_H, backgroundColor: colors.white },
    heroImg: { height: '100%', backgroundColor: colors.mapBlock },
    heroPager: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
    heroPagerContent: { alignItems: 'stretch' },
    sheet: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
    },
    counterPill: { backgroundColor: 'rgba(0,0,0,0.62)', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
    stars: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    noHit: { pointerEvents: 'none' },
    laurel: { fontSize: 26, lineHeight: 44.4, textAlign: 'center', color: colors.ink },
    centred: { textAlign: 'center' },
    reviewCountText: { textAlign: 'center', letterSpacing: -1.6 },
    chipPill: { backgroundColor: '#F7F7F7', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
    divider: { backgroundColor: colors.hairlineSoft },
    avatarImg: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.mapBlock },
    superhostBadge: { backgroundColor: colors.brand, borderRadius: 4 },
    bandIconBox: { alignItems: 'center', justifyContent: 'center' },
    topBtn: { alignItems: 'center', justifyContent: 'center' },
    topDisc: { position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white },
    showMoreText: { textAlign: 'center' },
    bottomBar: {
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 777 - 696.8,
        backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.hairlineSoft,
    },
    priceWas: { color: colors.secondary, textDecorationLine: 'line-through' },
    reserve: { backgroundColor: colors.reserve, borderRadius: 24.6, alignItems: 'center', justifyContent: 'center' },
    reserveText: { textAlign: 'center', width: 144.1, height: 49.1, lineHeight: 49.1, textAlignVertical: 'center' },
    homeBar: { backgroundColor: '#8A8A8E', borderRadius: 2.55 },
});
