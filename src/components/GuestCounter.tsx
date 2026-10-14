import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, type, radii } from '../tokens';
import { PlusIcon, MinusIcon } from './Icons';

export const CounterRow = ({
  label,
  caption,
  captionColor,
  captionRow,
  value,
  min,
  max,
  onDec,
  onInc,
}: {
  label: string;
  caption?: string;
  captionColor?: string;
  /** The device reports this row's caption as the whole row's 48 dp button box rather than as the
   *  caption's own line, so the run is laid inside a box of that size (only the services row does). */
  captionRow?: boolean;
  value: number;
  min: number;
  max: number;
  onDec: () => void;
  onInc: () => void;
}) => {
  const decEnabled = value > min;
  const incEnabled = value < max;
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.label}>{label}</Text>
        {caption ? <Text style={[styles.caption, captionColor ? { color: captionColor } : null, captionRow ? styles.captionRow : null]}>{caption}</Text> : null}
      </View>
      <View style={styles.counter}>
        <CircleBtn enabled={decEnabled} onPress={onDec} label={label} direction="decrement" style={styles.decPos}>
          <MinusIcon size={16} color={decEnabled ? colors.ink : colors.hairline} />
        </CircleBtn>
        <Text style={styles.value} accessibilityLabel={`${label} ${value}`}>{value}</Text>
        <CircleBtn enabled={incEnabled} onPress={onInc} label={label} direction="increment" style={styles.incPos}>
          <PlusIcon size={16} color={incEnabled ? colors.ink : colors.hairline} />
        </CircleBtn>
      </View>
    </View>
  );
};

/* The device exposes two nodes per stepper: a 48x48 clickable control (matched by position) and the
 * 12x12 glyph node carrying the "decrement"/"increment" description. Reproduce both. */
const CircleBtn = ({
  enabled,
  onPress,
  label,
  direction,
  style,
  children,
}: {
  enabled: boolean;
  onPress: () => void;
  label: string;
  direction: 'decrement' | 'increment';
  style: object;
  children: React.ReactNode;
}) => (
  <TouchableOpacity
    accessibilityRole="button"
    accessibilityLabel={`${direction} ${label}`}
    accessibilityState={{ disabled: !enabled }}
    disabled={!enabled}
    onPress={onPress}
    style={[styles.cbtn, style]}
  >
    <View style={[styles.ring, !enabled && styles.ringDisabled]}>{children}</View>
    <View accessibilityRole="button" accessibilityLabel={direction} style={styles.hit12} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    height: 73.5, borderBottomWidth: 1, borderBottomColor: colors.hairlineSoft,
  },
  /* `height: 40.4` is the label's 20.7 dp line plus the caption's 4.1 dp gap plus its 15.6 dp line -
   * the column's own content height. Pinning it keeps the label's line where it is when a caption
   * takes the taller box below; for a caption on its own line the pin is the natural height. */
  left: { width: 145, height: 40.4 },
  /* Labels/captions are measured from the interface: the label runs 20.7 dp tall in pure black while
   * the caption is a 15.6 dp grey run sitting 4.1 dp below it. The reference's four labels carry about
   * 1.32x less contrast than the substitute face at the semibold step, so the label is set at regular
   * and the tracking is opened onto the reference's own advances ("Adults" 48.4, "Children" 62.6,
   * "Infants" 50.9, "Pets" 32.4 - all four land within 1.2 dp). */
  label: {
    fontFamily: 'PJS', fontSize: 16, lineHeight: 20.7, height: 20.7,
    fontWeight: '400' as const, letterSpacing: -0.15, color: '#000000',
  },
  caption: {
    fontFamily: 'PJS', fontSize: 12, lineHeight: 15.6, fontWeight: '400' as const,
    letterSpacing: -0.14, color: colors.secondary, marginTop: 4.1,
  },
  /* The services row's caption: the device reports it at (36, 556.4, 145.2 x 48) - the row's own
   * button box, not the caption's line - so the line box is pulled up to that box's top (556.4) and
   * opened to its height, which centres the 15.6 dp line inside it where the device draws it. The
   * negative margin is the 11.6 dp between the label's line foot (567.97) and that top; the box itself
   * is invisible, only the measured element differs. */
  captionRow: { marginTop: -11.6, height: 48, lineHeight: 48 },
  // R26: all four guest steppers read 1.1 dp right of the reference (icon@341,348/421/495/568 at
  // x 316.9 vs our 318.0); the -9 right margin over-pushed the pair by that much.
  counter: { width: 116.2, height: 48, position: 'relative', marginRight: -7.9 },
  cbtn: { position: 'absolute', top: 0, width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  decPos: { left: 0 },
  incPos: { left: 68.2 },
  /* The device paints a filled #F2F2F2 disc in both states (sampled 242,242,242 at the pixel level);
   * only the glyph fades to the hairline grey when the stepper is disabled. */
  ring: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: colors.counterCircle, alignItems: 'center', justifyContent: 'center',
  },
  ringDisabled: { backgroundColor: colors.counterCircle },
  hit12: { position: 'absolute', left: 18, top: 18, width: 12, height: 12 },
  /* The reference value is a 28 dp box starting at x=288.9 with the digit centred inside it. Centring
   * matters beyond looks: the box overlaps the left stepper by 8 dp, so a left-flush digit paints
   * into the stepper's 48 dp box on screen. The design keeps that box clear, which only holds when
   * the digit sits at 298.4..307.5 — i.e. centred. */
  value: { position: 'absolute', left: 40, top: 14, width: 28, textAlign: 'center', ...type.counterValue },
});
