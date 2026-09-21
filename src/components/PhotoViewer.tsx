import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { colors, type, radii } from '../tokens';
import { BackIcon, ShareIcon, HeartIcon, ArrowRightIcon } from './Icons';
import { detailListing, photoCategories, PHOTO_TOTAL } from '../data';
export const PhotoViewer = ({ startIndex, onClose, onShare, onHeart, }: {
    startIndex: number;
    onClose: () => void;
    onShare: () => void;
    onHeart: () => void;
}) => {
    const photos = detailListing.photos;
    const [index, setIndex] = React.useState(startIndex % PHOTO_TOTAL);
    const prev = () => setIndex((i) => (i - 1 + PHOTO_TOTAL) % PHOTO_TOTAL);
    const next = () => setIndex((i) => (i + 1) % PHOTO_TOTAL);
    const jumpTo = (cat: string) => {
        const found = photos.findIndex((p) => p.category === cat);
        if (found >= 0)
            setIndex(found);
    };
    const current = photos[index % photos.length];
    return (<View style={styles.root}>
      <View style={styles.topBar}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} style={styles.topBtn}>
          <BackIcon size={18} color={colors.white}/>
        </TouchableOpacity>
        <Text style={styles.tourTitle}>Photo tour</Text>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Share" onPress={onShare} style={styles.topBtn}>
          <ShareIcon size={18} color={colors.white}/>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Save to wishlist" onPress={onHeart} style={styles.topBtn}>
          <HeartIcon size={20} color={colors.white}/>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={styles.tabsInner}>
        {photoCategories.map((cat) => {
            const photo = photos.find((p) => p.category === cat);
            if (!photo)
                return null;
            const sel = current.category === cat;
            return (<TouchableOpacity key={cat} accessibilityRole="button" accessibilityLabel={cat} onPress={() => jumpTo(cat)} style={styles.thumb}>
              <Image source={photo.file} style={[styles.thumbImg, sel && styles.thumbSel]} resizeMode="cover"/>
              <Text style={sel ? styles.thumbLabelSel : styles.thumbLabel} numberOfLines={1}>{cat}</Text>
            </TouchableOpacity>);
        })}
      </ScrollView>

      <View style={styles.imageArea}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Previous photo" onPress={prev} style={styles.arrowLeft}>
          <ArrowRightIcon size={22} color={colors.white}/>
        </TouchableOpacity>
        <Image source={current.file} style={styles.bigImg} resizeMode="cover"/>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Next photo" onPress={next} style={styles.arrowRight}>
          <ArrowRightIcon size={22} color={colors.white}/>
        </TouchableOpacity>
        <View style={styles.counter} pointerEvents="none">
          <Text style={styles.counterText}>{`${index + 1} / ${PHOTO_TOTAL}`}</Text>
        </View>
      </View>

      <View style={styles.caption}>
        <Text style={styles.captionTitle}>{current.category}</Text>
        <Text style={styles.captionText}>{current.caption}</Text>
      </View>
    </View>);
};
const styles = StyleSheet.create({
    root: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 60 },
    topBar: { flexDirection: 'row', alignItems: 'center', paddingTop: 14, paddingHorizontal: 16, gap: 18, height: 48 },
    topBtn: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
    tourTitle: { flex: 1, textAlign: 'center', color: colors.white, fontSize: 16, fontWeight: '700' },
    tabs: { paddingVertical: 10 },
    tabsInner: { paddingHorizontal: 16, gap: 12 },
    thumb: { width: 56, alignItems: 'center' },
    thumbImg: { width: 56, height: 56, borderRadius: 8, backgroundColor: colors.mapBlock, borderWidth: 0 },
    thumbSel: { borderWidth: 2, borderColor: colors.white },
    thumbLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 3 },
    thumbLabelSel: { color: colors.white, fontSize: 10, marginTop: 3, fontWeight: '700' },
    imageArea: { flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' },
    bigImg: { width: '100%', height: '100%' },
    arrowLeft: { position: 'absolute', left: 8, top: '45%', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', zIndex: 2, transform: [{ rotate: '180deg' }] },
    arrowRight: { position: 'absolute', right: 8, top: '45%', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
    counter: { position: 'absolute', top: 12, right: 16 },
    counterText: { color: colors.white, fontSize: 14, fontWeight: '600' },
    caption: { paddingHorizontal: 24, paddingVertical: 16 },
    captionTitle: { color: colors.white, fontSize: 22, fontWeight: '700' },
    captionText: { color: 'rgba(255,255,255,0.85)', fontSize: 15, marginTop: 4 },
});
