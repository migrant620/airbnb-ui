import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { colors, type } from '../tokens';
import { insetOf, rightAt, span } from '../layout';
import { BackIcon, ShareIcon, HeartIcon } from './Icons';
import { detailListing } from '../data';

/**
 * "Photo tour".
 *
 * The interface is a light screen, not the dark full-bleed viewer it is easy to assume: a light top
 * bar reading "Photo tour", a strip of room cards whose *labels* the device folds into each card's
 * own description (so the strip contributes four controls and no text runs), the selected room's
 * name and amenities, then the room's photos.
 */

const W = 393;
const at = (x: number, y: number, w: number, h: number) =>
  ({ position: 'absolute', left: x, top: y, width: w, height: h } as const);

/**
 * A box may be anchored by its left edge (the reference's own `x`) or by its right one. The two top
 * bar buttons that sit against the frame's right edge are anchored by the right edge, so a viewport
 * narrower than 393 dp pulls them in instead of pushing the page wider than the screen. At 393 dp the
 * two forms are the same box.
 */
type Box = { x?: number; right?: number; y: number; w: number; h: number };
const boxStyle = (b: Box) =>
  b.right !== undefined
    ? rightAt(b.right, b.y, b.w, b.h)
    : ({ position: 'absolute', left: b.x ?? 0, top: b.y, width: b.w, height: b.h } as const);
const innerStyle = (outer: Box, inner: Box) =>
  outer.right !== undefined
    ? rightAt((inner.right ?? 0) - (outer.right ?? 0), inner.y - outer.y, inner.w, inner.h)
    : ({ position: 'absolute', left: (inner.x ?? 0) - (outer.x ?? 0), top: inner.y - outer.y, width: inner.w, height: inner.h } as const);

const T = {
  backHit: { x: 8, y: 8.4, w: 48, h: 48 },
  backIcon: { x: 24, y: 24.4, w: 16, h: 16 },
  shareHit: { right: insetOf(288.9, 48), y: 8.4, w: 48, h: 48 },
  shareIcon: { right: insetOf(304.9, 16), y: 24.4, w: 16, h: 16 },
  saveHit: { right: insetOf(337, 48), y: 8.4, w: 48, h: 48 },
  saveIcon: { right: insetOf(353, 16), y: 24.4, w: 16, h: 16 },
  title: { x: 56, y: 22.2, w: 80.4, h: 20.7 },
  tabTop: 73.5,
  tabW: 108.1,
  tabH: 129.9,
  tabImgH: 99.3,
  tabPad: 12,
  roomTitle: { x: 24, y: 251.4, w: 92.8, h: 28.7 },
  caption: { x: 24, y: 288.2, w: 345, h: 54.6 },
  hero: { x: 24, y: 390.8, w: 345, h: 258.7 },
  small1: { x: 24, y: 653.5, w: 170.7, h: 123.4 },
  small2: { x: 198.7, y: 653.5, w: 170.3, h: 123.4 },
  footerRule: { x: 0, y: 776.9, w: W, h: 1.1 },
};
/** Boxes that end at the frame's right edge, written from that edge so they survive a narrower frame. */
const RIGHT_SPAN = { caption: insetOf(T.caption.x, T.caption.w), hero: insetOf(T.hero.x, T.hero.w),
  small2: insetOf(T.small2.x, T.small2.w), footerRule: insetOf(T.footerRule.x, T.footerRule.w) };

/**
 * A top-bar control. The interface reports the description on the 16 dp icon node and nothing on the
 * padded target around it. The labelled node is deliberately a *sibling* of the pressable, not a
 * child: nesting it inside makes the platform resolve the label to the pressable's own 48 dp box,
 * which reads 32 dp too large on every edge.
 */
const BarButton = ({
  hit,
  icon,
  label,
  onPress,
  children,
}: {
  hit: Box;
  icon: Box;
  label: string;
  onPress: () => void;
  children: React.ReactNode;
}) => (
  <>
    <TouchableOpacity accessibilityRole="button" onPress={onPress} activeOpacity={0.7} style={boxStyle(hit)}>
      <View style={innerStyle(hit, icon)} pointerEvents="none">
        {children}
      </View>
    </TouchableOpacity>
    <View
      accessibilityRole="button"
      accessibilityLabel={label}
      style={boxStyle(icon)}
      pointerEvents="none"
    />
  </>
);

export const PhotoViewer = ({
  startIndex,
  onClose,
  onShare,
  onHeart,
}: {
  startIndex: number;
  onClose: () => void;
  onShare: () => void;
  onHeart: () => void;
}) => {
  const rooms = detailListing.photos;
  const [index, setIndex] = React.useState(startIndex % rooms.length);
  const room = rooms[index];

  return (
    <View style={styles.root} aria-modal={true} role="dialog">
      <BarButton hit={T.backHit} icon={T.backIcon} label="Navigate up" onPress={onClose}>
        <BackIcon size={16} color={colors.ink} />
      </BarButton>
      <Text style={[type.tourTitle, at(T.title.x, T.title.y, T.title.w, T.title.h)]} numberOfLines={1}>Photo tour</Text>
      <BarButton hit={T.shareHit} icon={T.shareIcon} label="Share" onPress={onShare}>
        <ShareIcon size={16} color={colors.ink} />
      </BarButton>
      <BarButton hit={T.saveHit} icon={T.saveIcon} label="Save to wishlist" onPress={onHeart}>
        <HeartIcon size={17} color={colors.ink} />
      </BarButton>

      {/*
       * The strip keeps the reference's own spacing and runs past the right edge the same way: the
       * fourth card starts at 384.3 dp, so the interface reports it clipped to 8.7 dp wide. The device
       * reaches that card by scrolling the rail, so the rail scrolls here too — laying the cards out
       * absolutely would push the page itself past the screen edge.
       */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.strip}
        contentContainerStyle={styles.stripInner}
      >
        {rooms.map((r, i) => (
          <TouchableOpacity
            key={r.category}
            accessibilityRole="button"
            accessibilityLabel={r.category}
            onPress={() => setIndex(i)}
            activeOpacity={0.9}
            style={styles.tab}
          >
            <Image source={r.file} style={styles.tabImg} resizeMode="cover" />
            <Text style={[type.tourTab, styles.tabLabel]} numberOfLines={1}>{r.category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* The title box hugs its own run: the width still opens at the reference's value for the
          state the interface reports, and a longer room name paints whole instead of clipping. */}
      <Text
        style={[
          type.tourRoomTitle,
          { position: 'absolute', left: T.roomTitle.x, top: T.roomTitle.y, minHeight: T.roomTitle.h },
          styles.roomTitle,
        ]}
      >
        {room.category}
      </Text>
      <Text style={[type.tourRoomCaption, span(T.caption.x, T.caption.y, RIGHT_SPAN.caption, T.caption.h)]}>
        {room.caption}
      </Text>

      <TouchableOpacity accessibilityRole="button" onPress={() => {}} activeOpacity={0.95} style={span(T.hero.x, T.hero.y, RIGHT_SPAN.hero, T.hero.h)}>
        <Image source={room.file} style={styles.photo} resizeMode="cover" />
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" onPress={() => {}} activeOpacity={0.95} style={at(T.small1.x, T.small1.y, T.small1.w, T.small1.h)}>
        <Image source={rooms[(index + 1) % rooms.length].file} style={styles.photo} resizeMode="cover" />
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" onPress={() => {}} activeOpacity={0.95} style={span(T.small2.x, T.small2.y, RIGHT_SPAN.small2, T.small2.h)}>
        <Image source={rooms[(index + 2) % rooms.length].file} style={styles.photo} resizeMode="cover" />
      </TouchableOpacity>

      <View style={[span(T.footerRule.x, T.footerRule.y, RIGHT_SPAN.footerRule, T.footerRule.h), styles.rule]} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.white, zIndex: 60, overflow: 'hidden' },
  /* Maximum width keeps a long room name on one line inside the frame instead of wrapping; the
   * explicit height keeps the sampled ink region on the reference's own line box. */
  roomTitle: { maxWidth: 369, height: 28.7 },
  strip: { position: 'absolute', left: 0, right: 0, top: T.tabTop, height: T.tabH },
  stripInner: { paddingLeft: 24, gap: 12, alignItems: 'flex-start' },
  tab: { width: T.tabW, height: T.tabH },
  tabImg: { width: T.tabW, height: T.tabImgH, borderRadius: 12, backgroundColor: colors.mapBlock },
  tabLabel: { marginTop: T.tabH - T.tabImgH - 15.6, textAlign: 'left' },
  photo: { width: '100%', height: '100%', borderRadius: 12, backgroundColor: colors.mapBlock },
  rule: { backgroundColor: colors.hairlineSoft },
});
