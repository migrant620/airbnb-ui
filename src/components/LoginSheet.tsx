import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { colors, type } from '../tokens';
import { CloseIcon, GoogleIcon, AppleIcon, BeloIcon } from './Icons';
import { insetOf, rightAt, span } from '../layout';

/**
 * "Log in or sign up".
 *
 * The interface is a plain white sheet — no scrim, no card — so this is a full-frame panel rather than
 * the bottom sheet it resembles at a glance. Two runs sample pure black here (the heading and the
 * "or" separator), unlike the #222222 ink the rest of the product uses, so they carry their own token.
 */

const W = 393;
const at = (x: number, y: number, w: number, h: number) =>
  ({ position: 'absolute', left: x, top: y, width: w, height: h } as const);

const L = {
  closeHit: { x: 337, y: 10.6, w: 48, h: 48 },
  closeIcon: { x: 353, y: 26.6, w: 16, h: 16 },
  logo: { x: 169.7, y: 210.7, w: 54.9, h: 60.1 },
  title: { x: 24, y: 312.9, w: 345, h: 33.8 },
  field: { x: 24, y: 378.8, w: 345, h: 60.4 },
  placeholder: { x: 40, y: 398.8, w: 171.4, h: 20.7 },
  continueBtn: { x: 24, y: 455.2, w: 345, h: 48 },
  continueText: { x: 161.6, y: 469.1, w: 69.9, h: 20.7 },
  orText: { x: 189.6, y: 519.3, w: 13.5, h: 18.2 },
  orLineL: { x: 24, y: 528.15, w: 153.6, h: 1.1 },
  orLineR: { x: 215.1, y: 528.15, w: 153.9, h: 1.1 },
  google: { x: 130.6, y: 553.5, w: 60, h: 60 },
  apple: { x: 202.7, y: 553.5, w: 60, h: 60 },
};
/** The column and the close control end at the frame's right edge, so they are written from it. */
const COL = insetOf(L.title.x, L.title.w);
const OR_RIGHT = insetOf(L.orLineR.x, L.orLineR.w);

export const LoginSheet = ({ onClose }: { onClose: () => void }) => (
  // The whole sheet is a tappable backdrop: a tap anywhere that is not one of the
  // action controls dismisses it (the "mask" close), matching the "点击遮罩可收起" interaction.
  // The sheet is opaque white with no dimmed scrim, as the reference interface renders it, so the
  // backdrop is the panel itself rather than a separate dim layer. The surface style rides on the
  // child View, not the wrapper: TouchableWithoutFeedback renders no DOM of its own (it clones its
  // child and attaches the press handlers), and it forwards only a fixed prop list that has no
  // `style` - a style passed to the wrapper is dropped and the panel would paint with no background.
  <TouchableWithoutFeedback onPress={onClose}>
    <View style={styles.inner} aria-modal={true} role="dialog">
      <TouchableOpacity
      accessibilityRole="button"
      onPress={onClose}
      activeOpacity={0.7}
      style={rightAt(insetOf(L.closeHit.x, L.closeHit.w), L.closeHit.y, L.closeHit.w, L.closeHit.h)}
    >
      <View style={rightAt(insetOf(L.closeIcon.x, L.closeIcon.w) - insetOf(L.closeHit.x, L.closeHit.w), L.closeIcon.y - L.closeHit.y, L.closeIcon.w, L.closeIcon.h)} pointerEvents="none">
        <CloseIcon size={16} color={colors.ink} />
      </View>
    </TouchableOpacity>
    {/* The interface puts the "Close" description on the 16 dp icon node, not on the 48 dp touch target
        around it. RN-Web resolves a label to the nearest element already carrying role="button", so a
        nested label reads back as the 48 dp target (-16 dp on every edge); the labelled node therefore
        rides beside the pressable, at the icon's own box. */}
    <View
      accessibilityRole="button"
      accessibilityLabel="Close"
      style={rightAt(insetOf(L.closeIcon.x, L.closeIcon.w), L.closeIcon.y, L.closeIcon.w, L.closeIcon.h)}
      pointerEvents="none"
    />

    <View style={at(L.logo.x, L.logo.y, L.logo.w, L.logo.h)} pointerEvents="none">
      <BeloIcon width={L.logo.w} height={L.logo.h} />
    </View>
    <Text style={[type.loginTitle, span(L.title.x, L.title.y, COL, L.title.h), styles.centred, styles.titleInk]}>{'Log in or sign up'}</Text>

    <View style={[span(L.field.x, L.field.y, COL, L.field.h), styles.field]} pointerEvents="none" />
    <Text style={[type.loginInput, at(L.placeholder.x, L.placeholder.y, L.placeholder.w, L.placeholder.h)]} numberOfLines={1}>
      Phone number or email
    </Text>

    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Continue"
      onPress={onClose}
      activeOpacity={0.9}
      style={[span(L.continueBtn.x, L.continueBtn.y, COL, L.continueBtn.h), styles.continueBtn]}
    >
      <Text style={[type.loginContinue, at(L.continueText.x - L.continueBtn.x, L.continueText.y - L.continueBtn.y, L.continueText.w, L.continueText.h), styles.centred]} numberOfLines={1}>
        Continue
      </Text>
    </TouchableOpacity>

    <View style={[at(L.orLineL.x, L.orLineL.y, L.orLineL.w, L.orLineL.h), styles.rule]} pointerEvents="none" />
    <View style={[span(L.orLineR.x, L.orLineR.y, OR_RIGHT, L.orLineR.h), styles.rule]} pointerEvents="none" />
    <Text style={[type.loginOr, at(L.orText.x, L.orText.y, L.orText.w, L.orText.h), styles.centred, styles.orInk]}>
      or
    </Text>

    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Continue with Google"
      onPress={onClose}
      activeOpacity={0.9}
      style={[at(L.google.x, L.google.y, L.google.w, L.google.h), styles.social]}
    >
      {/* The reference's G is a 20 dp four-colour mark inside the 60 dp ring; the ring itself is the
          button's own border, so neither icon draws a second circle. */}
      <GoogleIcon size={21.8} />
    </TouchableOpacity>
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel="Continue with Apple"
      onPress={onClose}
      activeOpacity={0.9}
      style={[at(L.apple.x, L.apple.y, L.apple.w, L.apple.h), styles.social]}
    >
      {/* The reference measures the Apple mark at 16.4 x 20.0 dp inside the 60 dp button. This path
          spans 15.6 x 17.8 of its 24 viewBox, so size 27 lands the glyph at 17.6 x 20.0 - within
          1.2 dp of the reference width and exact in height. */}
      <AppleIcon size={27} color={colors.black} />
    </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  inner: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: colors.white, zIndex: 55,
  },
  centred: { textAlign: 'center' },
  titleInk: { color: colors.black },
  orInk: { color: colors.black },
  /* The login sheet's fields carry the same dark stroke as the search sheet's: (140,140,140) at
     y 379.2 and 438.5 across x 33.1-359.5, not the divider grey. */
  field: { borderWidth: 1, borderColor: colors.fieldBorder, borderRadius: 12, backgroundColor: colors.white },
  continueBtn: { backgroundColor: colors.continuePink, borderRadius: 8 },
  rule: { backgroundColor: colors.hairlineSoft },
  /* The reference's social buttons are 60 dp rounded squares, not circles: the top row's straight
   * border run is 32.8 dp, so the outer radius is (61.1 - 32.8) / 2 = 14.1 dp. 1.1 dp of #DDDDDD
   * borders, matching the 221 grey the raster samples. */
  social: {
    borderWidth: 1.1, borderColor: colors.hairline, borderRadius: 13.5, backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
});
