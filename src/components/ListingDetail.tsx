import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, type, space, radii, shadow } from '../tokens';
import { BackIcon, ShareIcon, HeartIcon, StarIcon } from './Icons';
import { detailListing, PHOTO_TOTAL } from '../data';
export const ListingDetail = ({ photoIndex, onBack, onShare, onHeart, onOpenPhoto, onReserve, }: {
    photoIndex: number;
    onBack: () => void;
    onShare: () => void;
    onHeart: () => void;
    onOpenPhoto: () => void;
    onReserve: () => void;
}) => {
    const photos = detailListing.photos;
    const hero = photos[photoIndex % photos.length].file;
    return (<View style={styles.root}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: space.navHeight + 64 }}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Open photo tour" onPress={onOpenPhoto} activeOpacity={1}>
          <View style={styles.hero}>
            <Image source={hero} style={styles.heroImg} resizeMode="cover"/>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} style={[styles.topBtn, { left: 16 }]}>
              <BackIcon size={22} color={colors.ink}/>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Share" onPress={onShare} style={[styles.topBtn, { right: 70 }]}>
              <ShareIcon size={22} color={colors.ink}/>
            </TouchableOpacity>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Save to wishlist" onPress={onHeart} style={[styles.topBtn, { right: 16 }]}>
              <HeartIcon size={24} color={colors.ink}/>
            </TouchableOpacity>
            <View style={styles.counter} pointerEvents="none">
              <Text style={type.photoCaption}>{`${photoIndex + 1} / ${PHOTO_TOTAL}`}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.body}>
          <Text style={type.detailTitle}>{detailListing.title}</Text>
          <Text style={type.detailSub}>{detailListing.location}</Text>
          <Text style={type.detailMeta}>{detailListing.meta}</Text>

          <View style={styles.ratingRow}>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Show all reviews" style={styles.ratingCell}>
              <StarIcon size={14} color={colors.star}/>
              <Text style={type.detailRating}>{detailListing.rating.toFixed(2)}</Text>
              <Text style={[type.detailSub, { marginLeft: 4 }]}>· Show all {detailListing.reviews} reviews</Text>
            </TouchableOpacity>
          </View>

          {detailListing.freeCancellation ? (<View style={styles.freeCancel}>
              <Text style={type.guestFav}>Free cancellation</Text>
            </View>) : null}

          <View style={styles.divider}/>

          <View style={styles.hostRow}>
            <View style={styles.avatar}><Text style={styles.avatarText}>WS</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={type.hostName}>{`Hosted by ${detailListing.host.name}`}</Text>
              <Text style={type.hostSub}>{`${detailListing.host.superhost ? 'Superhost · ' : ''}${detailListing.host.years}`}</Text>
            </View>
          </View>
          <Text style={type.hostSub}>{detailListing.host.topPct}</Text>
          <Text style={[type.detailSub, { marginTop: 6 }]}>{detailListing.highlight}</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={type.hostName}>{detailListing.area}</Text>
            <Text style={type.detailSub}>{detailListing.areaDetail}</Text>
          </View>

          <View style={styles.divider}/>

          <Text style={type.detailTitle}>{detailListing.descriptionTitle}</Text>
          <Text style={type.detailSub}>{detailListing.description}</Text>

          <View style={styles.divider}/>

          <Text style={type.detailTitle}>{detailListing.sleepTitle}</Text>
          <Text style={type.detailSub}>{detailListing.sleepDetail}</Text>

          <View style={styles.divider}/>

          <Text style={type.detailTitle}>{detailListing.viewTitle}</Text>
          <Text style={type.detailSub}>{detailListing.viewDetail}</Text>

          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Show more" style={{ marginTop: 12 }}>
            <Text style={type.sheetTitle}>Show more</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.reserveBar, shadow.nav]}>
        <View>
          <Text style={styles.priceRow}>
            <Text style={type.priceNow}>{detailListing.priceNow} </Text>
            <Text style={type.priceWas}>{detailListing.priceWas}</Text>
          </Text>
          <Text style={type.priceNote}>{detailListing.priceNote}</Text>
        </View>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Reserve" onPress={onReserve} style={styles.reserveBtn}>
          <Text style={type.reserveBtn}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </View>);
};
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.white },
    scroll: { flex: 1 },
    hero: { width: '100%', height: 300, backgroundColor: colors.mapBlock },
    heroImg: { width: '100%', height: 300 },
    topBtn: {
        position: 'absolute', top: 14, width: 32, height: 32, borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center',
    },
    counter: {
        position: 'absolute', top: 14, left: 0, right: 0, alignItems: 'center',
    },
    body: { paddingHorizontal: space.contentPad, paddingTop: 16 },
    ratingRow: { flexDirection: 'row', marginTop: 14, paddingVertical: 14, borderTopWidth: 1, borderTopColor: colors.hairlineSoft },
    ratingCell: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    freeCancel: { marginTop: 8 },
    divider: { height: 1, backgroundColor: colors.hairlineSoft, marginVertical: 16 },
    hostRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
    avatarText: { color: colors.white, fontWeight: '700', fontSize: 16 },
    reserveBar: {
        position: 'absolute', left: 0, right: 0, bottom: 0, height: 64, backgroundColor: colors.white,
        borderTopWidth: 1, borderTopColor: colors.hairlineSoft, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20,
    },
    priceRow: { flexDirection: 'row', alignItems: 'baseline' },
    reserveBtn: { backgroundColor: colors.reserve, borderRadius: 24, paddingHorizontal: 24, paddingVertical: 13 },
});
