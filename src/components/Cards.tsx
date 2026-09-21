import * as React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { colors, type, space, radii } from '../tokens';
import { HeartIcon, StarIcon } from './Icons';
import type { Listing } from '../data';
export const listingLabel = (l: Listing) => [l.badge, l.title, l.priceForNights, `${String(l.rating)} out of 5 average rating.`]
    .filter(Boolean)
    .join('. ')
    .replace(/,(\S)/g, ', $1');
export const ListingCard = ({ listing, onOpen, onHeart, height, imageHeight, }: {
    listing: Listing;
    onOpen: () => void;
    onHeart: () => void;
    height?: number;
    imageHeight?: number;
}) => (<TouchableOpacity accessibilityRole="button" accessibilityLabel={listingLabel(listing)} onPress={onOpen} activeOpacity={0.9}>
    <View style={[styles.card, height ? { height } : null]}>
      <Image source={listing.photo} style={[styles.image, imageHeight ? { height: imageHeight } : null]} resizeMode="cover"/>
      {listing.badge ? (<View style={styles.badge} pointerEvents="none">
          <Text style={type.badgePill}>{listing.badge}</Text>
        </View>) : null}
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Save to wishlist" onPress={onHeart} style={styles.heart} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        
        <HeartIcon size={24} color="#304E76" strokeColor="#fff" filled/>
      </TouchableOpacity>
      <View style={styles.textBlock}>
        <Text style={type.cardTitle} numberOfLines={2}>{listing.title}</Text>
        <View style={styles.priceRow}>
          <Text style={type.cardPrice}>{listing.priceForNights}</Text>
          <View style={styles.dotSep} pointerEvents="none"/>
          <StarIcon size={11} color={colors.star}/>
          <Text style={type.cardRatingNum}>{String(listing.rating)}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>);
export const CategoryThumb = ({ label, photo, selected, onPress, }: {
    label: string;
    photo: number;
    selected: boolean;
    onPress: () => void;
}) => (<TouchableOpacity accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.thumb}>
    <Image source={photo} style={[styles.thumbImg, selected && styles.thumbSelected]} resizeMode="cover"/>
    <Text style={selected ? type.tabSelected : type.tab} numberOfLines={1}>{label}</Text>
  </TouchableOpacity>);
const styles = StyleSheet.create({
    card: { width: space.cardWidth },
    image: {
        width: space.cardWidth, height: space.cardImageHeight,
        borderTopLeftRadius: radii.cardImage, borderTopRightRadius: radii.cardImage,
        borderBottomLeftRadius: radii.cardImage, borderBottomRightRadius: radii.cardImage,
        backgroundColor: colors.mapBlock,
    },
    badge: {
        position: 'absolute', top: 10, left: 10,
        backgroundColor: colors.guestFavBg, paddingHorizontal: 10, paddingVertical: 5,
        borderRadius: 14,
    },
    heart: {
        position: 'absolute', top: 8, right: 8,
        width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
    },
    textBlock: { paddingTop: 8, paddingHorizontal: 4 },
    priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 2, flexWrap: 'nowrap' },
    dotSep: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: colors.secondary, flexShrink: 0 },
    thumb: { width: 108, marginRight: 12, alignItems: 'center' },
    thumbImg: {
        width: 108, height: 108, borderRadius: 12, backgroundColor: colors.mapBlock,
        borderWidth: 0,
    },
    thumbSelected: { borderWidth: 2, borderColor: colors.ink },
});
