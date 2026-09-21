import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, type } from '../tokens';
import { CloseIcon, GoogleIcon, AppleIcon, BeloIcon } from './Icons';
import { insetOf, rightAt, span } from '../layout';
const W = 393;
const at = (x: number, y: number, w: number, h: number) => ({ position: 'absolute', left: x, top: y, width: w, height: h } as const);
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
const COL = insetOf(L.title.x, L.title.w);
const OR_RIGHT = insetOf(L.orLineR.x, L.orLineR.w);
export const LoginSheet = ({ onClose }: {
    onClose: () => void;
}) => (<View style={styles.root} aria-modal={true} role="dialog">
    <TouchableOpacity accessibilityRole="button" onPress={onClose} activeOpacity={0.7} style={rightAt(insetOf(L.closeHit.x, L.closeHit.w), L.closeHit.y, L.closeHit.w, L.closeHit.h)}>
      <View style={rightAt(insetOf(L.closeIcon.x, L.closeIcon.w) - insetOf(L.closeHit.x, L.closeHit.w), L.closeIcon.y - L.closeHit.y, L.closeIcon.w, L.closeIcon.h)} pointerEvents="none">
        <CloseIcon size={16} color={colors.ink}/>
      </View>
    </TouchableOpacity>
    
    <View accessibilityRole="button" accessibilityLabel="Close" style={rightAt(insetOf(L.closeIcon.x, L.closeIcon.w), L.closeIcon.y, L.closeIcon.w, L.closeIcon.h)} pointerEvents="none"/>

    <View style={at(L.logo.x, L.logo.y, L.logo.w, L.logo.h)} pointerEvents="none">
      <BeloIcon width={L.logo.w} height={L.logo.h}/>
    </View>
    <Text style={[type.loginTitle, span(L.title.x, L.title.y, COL, L.title.h), styles.centred, styles.titleInk]}>{'Log in or sign up'}</Text>

    <View style={[span(L.field.x, L.field.y, COL, L.field.h), styles.field]} pointerEvents="none"/>
    <Text style={[type.loginInput, at(L.placeholder.x, L.placeholder.y, L.placeholder.w, L.placeholder.h)]} numberOfLines={1}>
      Phone number or email
    </Text>

    <TouchableOpacity accessibilityRole="button" accessibilityLabel="Continue" onPress={onClose} activeOpacity={0.9} style={[span(L.continueBtn.x, L.continueBtn.y, COL, L.continueBtn.h), styles.continueBtn]}>
      <Text style={[type.loginContinue, at(L.continueText.x - L.continueBtn.x, L.continueText.y - L.continueBtn.y, L.continueText.w, L.continueText.h), styles.centred]} numberOfLines={1}>
        Continue
      </Text>
    </TouchableOpacity>

    <View style={[at(L.orLineL.x, L.orLineL.y, L.orLineL.w, L.orLineL.h), styles.rule]} pointerEvents="none"/>
    <View style={[span(L.orLineR.x, L.orLineR.y, OR_RIGHT, L.orLineR.h), styles.rule]} pointerEvents="none"/>
    <Text style={[type.loginOr, at(L.orText.x, L.orText.y, L.orText.w, L.orText.h), styles.centred, styles.orInk]} numberOfLines={1}>
      or
    </Text>

    <TouchableOpacity accessibilityRole="button" accessibilityLabel="Continue with Google" onPress={onClose} activeOpacity={0.9} style={[at(L.google.x, L.google.y, L.google.w, L.google.h), styles.social]}>
      
      <GoogleIcon size={21.8}/>
    </TouchableOpacity>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel="Continue with Apple" onPress={onClose} activeOpacity={0.9} style={[at(L.apple.x, L.apple.y, L.apple.w, L.apple.h), styles.social]}>
      
      <AppleIcon size={27} color={colors.black}/>
    </TouchableOpacity>
  </View>);
const styles = StyleSheet.create({
    root: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.white, zIndex: 55 },
    centred: { textAlign: 'center' },
    titleInk: { color: colors.black },
    orInk: { color: colors.black },
    field: { borderWidth: 1, borderColor: colors.hairline, borderRadius: 12, backgroundColor: colors.white },
    continueBtn: { backgroundColor: colors.continuePink, borderRadius: 8 },
    rule: { backgroundColor: colors.hairlineSoft },
    social: {
        borderWidth: 1.1, borderColor: colors.hairline, borderRadius: 13.5, backgroundColor: colors.white,
        alignItems: 'center', justifyContent: 'center',
    },
});
