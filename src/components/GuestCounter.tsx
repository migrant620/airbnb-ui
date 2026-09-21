import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, type, radii } from '../tokens';
import { PlusIcon, MinusIcon } from './Icons';
export const CounterRow = ({ label, caption, captionColor, value, min, max, onDec, onInc, }: {
    label: string;
    caption?: string;
    captionColor?: string;
    value: number;
    min: number;
    max: number;
    onDec: () => void;
    onInc: () => void;
}) => {
    const decEnabled = value > min;
    const incEnabled = value < max;
    return (<View style={styles.row}>
      <View style={styles.left}>
        <Text style={styles.label}>{label}</Text>
        {caption ? <Text style={[styles.caption, captionColor ? { color: captionColor } : null]}>{caption}</Text> : null}
      </View>
      <View style={styles.counter}>
        <CircleBtn enabled={decEnabled} onPress={onDec} label={label} direction="decrement" style={styles.decPos}>
          <MinusIcon size={16} color={decEnabled ? colors.ink : colors.hairline}/>
        </CircleBtn>
        <Text style={styles.value} accessibilityLabel={`${label} ${value}`}>{value}</Text>
        <CircleBtn enabled={incEnabled} onPress={onInc} label={label} direction="increment" style={styles.incPos}>
          <PlusIcon size={16} color={incEnabled ? colors.ink : colors.hairline}/>
        </CircleBtn>
      </View>
    </View>);
};
const CircleBtn = ({ enabled, onPress, label, direction, style, children, }: {
    enabled: boolean;
    onPress: () => void;
    label: string;
    direction: 'decrement' | 'increment';
    style: object;
    children: React.ReactNode;
}) => (<TouchableOpacity accessibilityRole="button" accessibilityLabel={`${direction} ${label}`} accessibilityState={{ disabled: !enabled }} disabled={!enabled} onPress={onPress} style={[styles.cbtn, style]}>
    <View style={[styles.ring, !enabled && styles.ringDisabled]}>{children}</View>
    <View accessibilityRole="button" accessibilityLabel={direction} style={styles.hit12}/>
  </TouchableOpacity>);
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        height: 73.5, borderBottomWidth: 1, borderBottomColor: colors.hairlineSoft,
    },
    left: { width: 145 },
    label: {
        fontFamily: 'PJS', fontSize: 16, lineHeight: 20.7, height: 20.7,
        fontWeight: '600' as const, letterSpacing: -0.5, color: '#000000',
    },
    caption: {
        fontFamily: 'PJS', fontSize: 12, lineHeight: 15.6, fontWeight: '400' as const,
        letterSpacing: -0.14, color: colors.secondary, marginTop: 4.1,
    },
    counter: { width: 116.2, height: 48, position: 'relative', marginRight: -9 },
    cbtn: { position: 'absolute', top: 0, width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
    decPos: { left: 0 },
    incPos: { left: 68.2 },
    ring: {
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: colors.counterCircle, alignItems: 'center', justifyContent: 'center',
    },
    ringDisabled: { backgroundColor: colors.counterCircle },
    hit12: { position: 'absolute', left: 18, top: 18, width: 12, height: 12 },
    value: { position: 'absolute', left: 40, top: 14, width: 28, textAlign: 'left', ...type.counterValue },
});
