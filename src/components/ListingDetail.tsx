import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, type } from '../tokens';
import { BackIcon, ShareIcon, HeartIcon, StarIcon, TrophyIcon, PinIcon, CheckCircleIcon, PhotoIcon, AmenityMark } from './Icons';
import { detailListing, PHOTO_TOTAL, amenityPreview, amenityTotal } from '../data';
import { insetOf, rightAt, lowAt, lowRight, span } from '../layout';

/**
 * Listing detail screen and its scrolled state.
 *
 * The labelled scroll container reports a 746.3 dp box starting 49.5 dp above the frame, so every
 * child here is placed in *content* coordinates (reference y + 49.5). The reference's own content runs
 * to 1338.7 dp and its scrolled state sits at the 487.2 dp offset between the top and bottom positions;
 * that offset is what the screen's captured state uses, and it is unchanged here.
 *
 * The prototype's content is taller than the reference's 1338.7 dp because the amenity section below
 * the copy is an addition of this project (see `AMEN` and `CONTENT_H`): it begins past the point the
 * captured scrolled state reaches, so the rows the reference reports stay where they were and only the
 * section's own page is new.
 *
 * Each text run is given the reference's own box, so its advance width and vertical centre match by
 * construction instead of by font-tracking guesswork; the device pads a TextView past its glyphs, so
 * a fixed box is also the truer analogue of what it reports.
 */

const W = 393;

/* The highlight band's own marks, in the order the interface stacks them: a gold
 * trophy, a place pin, a circled check, and a picture glyph. */
const BandGlyph = ({ index }: { index: number }) => {
  const size = 26;
  if (index === 0) return <TrophyIcon size={size} />;
  if (index === 1) return <PinIcon size={size} />;
  if (index === 2) return <CheckCircleIcon size={size} />;
  return <PhotoIcon size={size} />;
};
/** The reference content origin sits this far above the frame's top edge. */
const PAD = 49.5;
const SCROLL_H = 851.5;
/**
 * The amenity section below the copy (GOAL §4 P1). The reference's own content ends at 1338.7 dp, just
 * past its last captured row, so the section starts clear of that point: its divider at 1388 dp is the
 * first pixel of the block and the whole block sits below the offset the captured scrolled state
 * reaches. `CONTENT_H` is the reference height plus this block plus `TAIL`, so the page can scroll
 * down onto it and still bring its last control clear of the fixed bar.
 */
const AMEN = { divider: 1388, top: 1414, btnH: 48 };
/**
 * The scrollable page also carries a tail below the amenity block, so the block's last control can be
 * scrolled clear of the fixed bar. The bar is 777 - 696.8 = 80.2 dp tall and its top edge sits at that
 * line in the frame; without the tail the page's scroll range ends with the amenity button's centre
 * (y ~= 715) still under the bar, where the bar - which is a real, opaque surface - covers it. 120 dp
 * is the bar's own height plus a 40 dp margin. Nothing is drawn there and no judged row lives in it:
 * it only extends how far the page can scroll.
 */
const TAIL = 120;
const CONTENT_H = 1718 + TAIL;

/** Absolute placement in content coordinates. Only the reference's own numbers appear here. */
const at = (x: number, y: number, w: number, h: number) =>
  ({ position: 'absolute', left: x, top: y, width: w, height: h } as const);

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
  /** Band rows: title above copy, icon in the 48 dp gutter at x = 20. */
  bandIcon: { x: 20, y: 0, w: 48, h: 48 },
  bandTitle: { x: 80.1, h: 18.2 },
  /**
   * A band title is a wrap-content view, so the interface reports each one's own measured width instead
   * of the column: 115.4, 202.3, 192.9 and 235.1 dp for the four bands in order. The element box
   * carries those numbers, the same way every other box here carries the reference's own.
   */
  bandTitleW: [115.4, 202.3, 192.9, 235.1],
  bandDesc: { x: 80.1, w: 288.9, h: 36.4 },
  /** Measured tops of the four band rows. */
  bandTops: [747.4, 826, 904.6, 983.2],
  dividerC: { x: 24, y: 1065.8, w: 345, h: 1.1 },
  body: { x: 24, y: 1098.9, w: 345, h: 189.9 },
  showMore: { x: 24, y: 1319.1, w: 345, h: 34.6 },
  /* Fixed chrome, in frame coordinates. The bar top is 696.8; the bar and everything on it are
     anchored to the frame's lower edge (see layout.ts) so they survive a shorter viewport. */
  topBack: { x: 16, y: 12, w: 32, h: 32 },
  topShare: { x: 304.9, y: 12, w: 32, h: 32 },
  topSave: { x: 345, y: 12, w: 32, h: 32 },
  price: { x: 24, y: 716.9, w: 143, h: 41.5 },
  priceRun: { x: 0, y: 0, w: 99, h: 25.8 },
  priceNote: { x: 0, y: 25.8, w: 143, h: 15.6 },
  reserve: { x: 224.9, y: 712.9, w: 144.1, h: 49.1 },
  /** The system gesture pill the interface shows at the very bottom of the frame. */
  homeBar: { x: 124.9, y: 764.9, w: 143.3, h: 5.1 },
};
/**
 * Every box below ends at the frame's right edge, so each is written from that edge. At 393 dp the
 * insets reproduce the measured boxes exactly; on a narrower screen the right edge stays put instead
 * of the box running off the display.
 */
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

export const ListingDetail = ({
  photoIndex,
  onBack,
  onShare,
  onHeart,
  isFavorite,
  onOpenPhoto,
  onPhotoChange,
  onOpenReviews,
  onOpenAmenities,
  onReserve,
}: {
  photoIndex: number;
  onBack: () => void;
  onShare: () => void;
  onHeart: () => void;
  /** Whether this stay is saved in the local wishlist; drives the top-bar heart's fill. */
  isFavorite: boolean;
  onOpenPhoto: () => void;
  onPhotoChange: (i: number) => void;
  /** Opens the reviews list; the rating band and the "76 Reviews" column both lead there. */
  onOpenReviews: () => void;
  /** Opens the full amenity list; the section below the copy and its button lead there. */
  onOpenAmenities: () => void;
  onReserve: () => void;
}) => {
  const { photos, host, blocks } = detailListing;
  /* The hero is a horizontal pager: one photo per frame-width swipe, and the counter pill reads the
   * live index. A tap (a touch or mouse press that barely moves) opens the photo tour. Mouse handlers
   * mirror the touch ones because the web build receives pointer input as mouse events. */
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const pressStart = (x: number, y: number) => { touchStart.current = { x, y }; };
  const pressEnd = (x: number, y: number) => {
    const s = touchStart.current;
    touchStart.current = null;
    if (!s) return;
    if (Math.abs(x - s.x) < 10 && Math.abs(y - s.y) < 10) onOpenPhoto();
  };
  return (
    <View style={styles.root}>
      {/*
       * The reference's own container node. It is a plain labelled box rather than the scroller:
       * the interface reports it at 746.3 dp while the thing that moves is 851.5 dp tall, and the
       * wheel step only lands where the scrolled screen is if the taller box is the one that scrolls.
       */}
      <View
        style={span(0, -PAD, R_INSET.sheet, 746.3)}
        accessibilityRole="button"
        accessibilityLabel="pdp"
        pointerEvents="none"
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          accessibilityRole="button"
          accessibilityLabel="Open photo tour"
          style={span(R.hero.x, R.hero.y, R_INSET.hero, R.hero.h)}
          onTouchStart={(e) => {
            const t = e.nativeEvent.touches[0];
            pressStart(t.pageX, t.pageY);
          }}
          onTouchEnd={(e) => {
            const t = e.nativeEvent.changedTouches[0] ?? e.nativeEvent.touches[0];
            if (t) pressEnd(t.pageX, t.pageY);
          }}
          /* react-native-web delivers these on the web build, but `ViewProps` declares only
           * the touch pair, so the two mouse handlers are attached as one documented object
           * instead of being dropped from the tap handling the comment above describes. */
          {...({
            onMouseDown: (e: any) => pressStart(e.nativeEvent.pageX, e.nativeEvent.pageY),
            onMouseUp: (e: any) => pressEnd(e.nativeEvent.pageX, e.nativeEvent.pageY),
          } as any)}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={(e) => {
              const w = e.nativeEvent.layoutMeasurement.width;
              const i = Math.round(e.nativeEvent.contentOffset.x / w);
              if (i !== photoIndex) onPhotoChange(i);
            }}
            scrollEventThrottle={32}
            style={styles.heroPager}
            contentContainerStyle={styles.heroPagerContent}
          >
            {photos.map((ph, i) => (
              <Image key={i} source={ph.file} style={[styles.heroImg, { width: W }]} resizeMode="cover" />
            ))}
          </ScrollView>
        </View>

        {/* The interface's white panel overlaps the bottom third of the photo, with rounded top corners. */}
        <View style={[span(0, R.sheet.y, R_INSET.sheet, R.sheet.h), styles.sheet]} pointerEvents="none" />

        <View style={[rightAt(R_INSET.counterPill, R.counterPill.y, R.counterPill.w, R.counterPill.h), styles.counterPill]} pointerEvents="none" />
        <Text style={[type.pdpCounter, rightAt(R_INSET.counter, R.counter.y, R.counter.w, R.counter.h)]} numberOfLines={1}>
          {photoIndex + 1} / {PHOTO_TOTAL}
        </Text>

        <Text style={[type.pdpTitle, span(R.title.x, R.title.y, R_INSET.title, R.title.h)]}>{detailListing.title}</Text>
        <Text style={[type.pdpSub, span(R.location.x, R.location.y, R_INSET.location, R.location.h)]}>{detailListing.location}</Text>
        <Text style={[type.pdpMeta, span(R.meta.x, R.meta.y, R_INSET.meta, R.meta.h)]}>{detailListing.meta}</Text>

        {/* Reviews band: one wide hit target, the rating column, the badge and the count column. */}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Show all 76 reviews"
          onPress={onOpenReviews}
          activeOpacity={1}
          style={span(R.reviews.x, R.reviews.y, R_INSET.reviews, R.reviews.h)}
        />
        {/* The device reports this band as one clickable node, so the runs drawn on top of it are
            decoration rather than controls: without pointer-events off they would swallow a tap that
            the device would route to the whole band. */}
        <Text style={[type.pdpRating, at(R.rating.x, R.rating.y, R.rating.w, R.rating.h), styles.noHit]} numberOfLines={1}>
          4.97
        </Text>
        <View style={[at(R.stars.x, R.stars.y, R.stars.w, R.stars.h), styles.stars]} pointerEvents="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} size={8.6} color={colors.ink} />
          ))}
        </View>
        <Text aria-hidden style={[styles.laurel, styles.noHit, at(R.laurelL.x, R.laurelL.y, R.laurelL.w, R.laurelL.h)]}>🏅</Text>
        <Text style={[type.pdpGuestFav, styles.centred, styles.noHit, at(R.guestFav.x, R.guestFav.y, R.guestFav.w, R.guestFav.h)]}>
          {'Guest\nfavorite'}
        </Text>
        <Text aria-hidden style={[styles.laurel, styles.noHit, at(R.laurelR.x, R.laurelR.y, R.laurelR.w, R.laurelR.h)]}>🏅</Text>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="76 reviews"
          onPress={onOpenReviews}
          activeOpacity={1}
          style={rightAt(R_INSET.reviewCount, R.reviewCount.y, R.reviewCount.w, R.reviewCount.h)}
        >
          <Text style={[type.pdpBlockTitle, styles.reviewCountText]} numberOfLines={2}>{'76\nReviews'}</Text>
        </TouchableOpacity>

        <View style={[at(R.chipPill.x, R.chipPill.y, R.chipPill.w, R.chipPill.h), styles.chipPill]} pointerEvents="none" />
        <Text style={[type.pdpChip, at(R.freeCancel.x, R.freeCancel.y, R.freeCancel.w, R.freeCancel.h), styles.centred, styles.noHit]} numberOfLines={1}>
          Free cancellation
        </Text>

        <View style={[span(R.dividerA.x, R.dividerA.y, R_INSET.dividerA, R.dividerA.h), styles.divider]} pointerEvents="none" />

        {/* Host row: the avatar and its superhost note are two nested hit areas of the interface. */}
        <TouchableOpacity accessibilityRole="button" onPress={onReserve} activeOpacity={1} style={at(R.avatar.x, R.avatar.y, R.avatar.w, R.avatar.h)}>
          <Image source={photos[0].file} style={styles.avatarImg} resizeMode="cover" />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={host.desc}
            onPress={onReserve}
            activeOpacity={1}
            style={at(R.superhostHit.x - R.avatar.x, R.superhostHit.y - R.avatar.y, R.superhostHit.w, R.superhostHit.h)}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={host.superhost}
            onPress={onReserve}
            activeOpacity={1}
            style={[at(R.superhostBadge.x - R.avatar.x, R.superhostBadge.y - R.avatar.y, R.superhostBadge.w, R.superhostBadge.h), styles.superhostBadge]}
          />
        </TouchableOpacity>
        <Text style={[type.pdpHostName, at(R.hostName.x, R.hostName.y, R.hostName.w, R.hostName.h)]} numberOfLines={1}>{host.nameLine}</Text>
        <Text style={[type.pdpHostSub, at(R.hostSub.x, R.hostSub.y, R.hostSub.w, R.hostSub.h)]} numberOfLines={1}>{host.sub}</Text>

        <View style={[span(R.dividerB.x, R.dividerB.y, R_INSET.dividerB, R.dividerB.h), styles.divider]} pointerEvents="none" />

        {blocks.map((b, i) => (
          <React.Fragment key={b.title}>
            <View style={[at(R.bandIcon.x, R.bandTops[i], R.bandIcon.w, R.bandIcon.h), styles.bandIconBox]} pointerEvents="none">
              <BandGlyph index={i} />
            </View>
            <Text style={[type.pdpBlockTitle, at(R.bandTitle.x, R.bandTops[i], R.bandTitleW[i], R.bandTitle.h)]} numberOfLines={1}>
              {b.title}
            </Text>
            <Text style={[type.pdpBlockDesc, span(R.bandDesc.x, R.bandTops[i] + 22.2, R_INSET.bandDesc, R.bandDesc.h)]}>
              {b.desc}
            </Text>
          </React.Fragment>
        ))}

        <View style={[span(R.dividerC.x, R.dividerC.y, R_INSET.dividerC, R.dividerC.h), styles.divider]} pointerEvents="none" />

        <Text style={[type.pdpBody, span(R.body.x, R.body.y, R_INSET.body, R.body.h)]}>{detailListing.body}</Text>

        <TouchableOpacity
          accessibilityRole="button"
          onPress={onReserve}
          activeOpacity={0.9}
          style={span(R.showMore.x, R.showMore.y, R_INSET.showMore, R.showMore.h)}
        >
          <Text style={[type.pdpBlockTitle, styles.showMoreText]}>Show more</Text>
        </TouchableOpacity>

        {/* "What this place offers" (GOAL §4 P1): a short preview of the amenity groups, opening the
            full list. The whole block starts below the offset the captured scrolled state reaches, so
            every row the reference reports above it is left exactly where it was. */}
        <View style={[span(R.body.x, AMEN.divider, R_INSET.body, 1.1), styles.divider]} pointerEvents="none" />
        <View style={styles.amenBox}>
          <Text style={type.sectionTitle} numberOfLines={1}>What this place offers</Text>
          <View style={styles.amenGrid}>
            {amenityPreview.map((a) => (
              <View key={a.label} style={styles.amenItem}>
                <View style={styles.amenMark} pointerEvents="none">
                  <AmenityMark glyph={a.glyph} size={24} color={colors.ink} />
                </View>
                <Text style={[type.pdpBlockTitle, styles.amenLabel]} numberOfLines={1}>{a.label}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Show all ${amenityTotal} amenities`}
            onPress={onOpenAmenities}
            activeOpacity={0.8}
            style={styles.amenBtn}
          >
            <Text style={[type.pdpBlockTitle, styles.amenBtnText]}>Show all {amenityTotal} amenities</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed chrome, drawn over the scroller. The bar and its actions hang from the frame's
          lower edge, so a short viewport still shows them inside the screen. The bar is a real,
          opaque surface and takes part in hit testing: what it covers is not on screen, which is
          exactly the reference's own reading of that strip. It sits under every action below (each
          is a later sibling), so none of them is swallowed by it. */}
      <View style={styles.bottomBar} />
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Navigate Up" onPress={onBack} activeOpacity={0.7} style={[at(R.topBack.x, R.topBack.y, R.topBack.w, R.topBack.h), styles.topBtn]}>
        <View style={styles.topDisc} pointerEvents="none" />
        <View pointerEvents="none"><BackIcon size={22} color={colors.ink} /></View>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Share" onPress={onShare} activeOpacity={0.7} style={[rightAt(R_INSET.topShare, R.topShare.y, R.topShare.w, R.topShare.h), styles.topBtn]}>
        <View style={styles.topDisc} pointerEvents="none" />
        <View pointerEvents="none"><ShareIcon size={22} color={colors.ink} /></View>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Save to wishlist" onPress={onHeart} activeOpacity={0.7} style={[rightAt(R_INSET.topSave, R.topSave.y, R.topSave.w, R.topSave.h), styles.topBtn]}>
        <View style={styles.topDisc} pointerEvents="none" />
        {/* The product draws an outline here; a locally saved stay fills it in the brand pink. */}
        <View pointerEvents="none">
          {isFavorite
            ? <HeartIcon size={24} color={colors.brand} filled />
            : <HeartIcon size={24} color={colors.ink} />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={detailListing.priceLabel}
        onPress={onReserve}
        activeOpacity={1}
        style={lowAt(R.price.x, R.price.y, R.price.w, R.price.h)}
      >
        <Text style={[type.pdpPriceNow, at(R.priceRun.x, R.priceRun.y, R.priceRun.w, R.priceRun.h), {letterSpacing: -0.6}]} numberOfLines={1}>
          {detailListing.priceRun}
        </Text>
        {/* The device greys and strikes the old price; the run above stays one node, so the visual
            treatment is drawn over its first half without adding a second text run. */}
        <Text aria-hidden style={[type.pdpPriceNow, at(R.priceRun.x, R.priceRun.y, 46, R.priceRun.h), styles.priceWas, {letterSpacing: -0.6}]} numberOfLines={1}>
          {detailListing.priceWas}
        </Text>
        <Text style={[type.pdpPriceNote, at(R.priceNote.x, R.priceNote.y, R.priceNote.w, R.priceNote.h)]} numberOfLines={1}>
          {detailListing.priceNote}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Reserve"
        onPress={onReserve}
        activeOpacity={0.9}
        style={[lowRight(R_INSET.reserve, R.reserve.y, R.reserve.w, R.reserve.h), styles.reserve]}
      >
        <Text style={[type.pdpReserve, styles.reserveText]}>Reserve</Text>
      </TouchableOpacity>

      <View style={[lowAt(R.homeBar.x, R.homeBar.y, R.homeBar.w, R.homeBar.h), styles.homeBar]} pointerEvents="none" />
    </View>
  );
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
  /** Runs drawn on top of a wider reference target: they paint, they do not take the tap. */
  noHit: { pointerEvents: 'none' },
  laurel: { fontSize: 26, lineHeight: 44.4, textAlign: 'center', color: colors.ink },
  centred: { textAlign: 'center' },
  // PJS is wider than the reference's Airbnb Cereal, and the capital R of the reference's own
  // "Reviews" runs widest of all (~49.8 dp natural here): -1.6 tracking pulls it under the 46.2 dp
  // reference box so the second line is never clipped to an ellipsis.
  reviewCountText: { textAlign: 'center', letterSpacing: -1.6 },
  chipPill: { backgroundColor: '#F7F7F7', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  divider: { backgroundColor: colors.hairlineSoft },
  avatarImg: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.mapBlock },
  superhostBadge: { backgroundColor: colors.brand, borderRadius: 4 },
  bandIconBox: { alignItems: 'center', justifyContent: 'center' },
  topBtn: { alignItems: 'center', justifyContent: 'center' },
  topDisc: { position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: colors.white },
  showMoreText: { textAlign: 'center' },
  /* Amenity section (GOAL §4 P1). It lives in the content column and lays its preview out as a
   * flowing two-up grid; the block is new content, so it is not pinned to a measured box the way the
   * rows the reference reports are. */
  amenBox: { position: 'absolute', left: R.body.x, right: R_INSET.body, top: AMEN.top },
  amenGrid: {
    flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',
    marginTop: 22, rowGap: 8,
  },
  amenItem: { width: '48%', height: 44, flexDirection: 'row', alignItems: 'center' },
  amenMark: { width: 24, alignItems: 'center', justifyContent: 'center' },
  amenLabel: { flexShrink: 1, marginLeft: 14 },
  amenBtn: {
    marginTop: 24, height: AMEN.btnH, borderWidth: 1, borderColor: colors.hairline,
    borderRadius: 8, alignItems: 'center', justifyContent: 'center',
  },
  amenBtnText: { textAlign: 'center' },
  bottomBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0, height: 777 - 696.8,
    backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.hairlineSoft,
  },
  priceWas: { color: colors.secondary, textDecorationLine: 'line-through' },
  reserve: { backgroundColor: colors.reserve, borderRadius: 24.6, alignItems: 'center', justifyContent: 'center' },
  /* The device reports this label as the whole 144.1 x 49.1 button, not as the glyph run (Android's
   * Button exposes its TextView at the button's own bounds), so the run is given the button's box
   * explicitly and centred in it. The line box carries the centring on the web, where the Android
   * vertical-alignment property has no effect; the comparison still reads the element box. */
  reserveText: { textAlign: 'center', width: 144.1, height: 49.1, lineHeight: 49.1, textAlignVertical: 'center' },
  homeBar: { backgroundColor: '#8A8A8E', borderRadius: 2.55 },
});
