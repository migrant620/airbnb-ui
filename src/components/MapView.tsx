import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Svg, { Rect, Path, Polygon } from 'react-native-svg';
import { colors, type } from '../tokens';
import type { MapPin } from '../data';
export const MapCanvas = ({ width, height, stretch }: {
    width: number;
    height: number;
    stretch?: boolean;
}) => (<Svg width={stretch ? '100%' : width} height={height} viewBox={`0 0 ${width} ${height}`}>
    
    <Polygon points={`0,0 ${width * 0.30},0 ${width * 0.24},${height * 0.22} ${width * 0.34},${height * 0.4} ${width * 0.26},${height * 0.56} 0,${height * 0.62}`} fill={colors.mapWater}/>
    <Polygon points={`${width * 0.44},${height * 0.55} ${width * 0.56},${height * 0.5} ${width * 0.64},${height * 0.66} ${width * 0.52},${height * 0.82} ${width * 0.42},${height * 0.7}`} fill={colors.mapWater}/>
    <Rect x={width * 0.72} y={height * 0.02} width={width * 0.28} height={height * 0.26} fill={colors.mapWater}/>
    
    <Path d={`M${width * 0.06},0 L${width * 0.36},${height * 0.18} L${width * 0.62},${height * 0.3} L${width},${height * 0.36}`} stroke={colors.mapRoad} strokeWidth={7} fill="none"/>
    <Path d={`M0,${height * 0.34} L${width * 0.4},${height * 0.44} L${width},${height * 0.52}`} stroke={colors.mapRoad} strokeWidth={10} fill="none"/>
    <Path d={`M${width * 0.5},0 L${width * 0.44},${height * 0.3} L${width * 0.58},${height * 0.62} L${width * 0.62},${height}`} stroke={colors.mapRoad} strokeWidth={9} fill="none"/>
    <Path d={`M0,${height * 0.8} L${width * 0.3},${height * 0.9} L${width * 0.7},${height * 0.96} L${width},${height * 0.92}`} stroke={colors.mapRoad} strokeWidth={6} fill="none"/>
    
    {[0.08, 0.16, 0.26, 0.62, 0.72, 0.84].map((bx, i) => (<Rect key={`a${i}`} x={width * (0.38 + (i % 3) * 0.18)} y={height * bx} width={width * 0.13} height={height * 0.045} rx={3} fill={colors.mapBlock}/>))}
    {[0.06, 0.42, 0.66, 0.88].map((bx, i) => (<Rect key={`b${i}`} x={width * (0.68 + (i % 2) * 0.12)} y={height * bx} width={width * 0.12} height={height * 0.04} rx={3} fill={colors.mapBlock}/>))}
  </Svg>);
export const MapPinMarker = ({ pin, onPress }: {
    pin: MapPin;
    onPress: () => void;
}) => (<TouchableOpacity accessibilityRole="button" accessibilityLabel={pin.label} onPress={onPress} activeOpacity={0.9} style={[styles.pin, { left: pin.x, top: pin.y, width: pin.w, height: pin.h, borderRadius: pin.h / 2 }]}>
    {pin.compact ? null : (<Text style={type.mapPin} numberOfLines={1}>
        {pin.price}
      </Text>)}
  </TouchableOpacity>);
const styles = StyleSheet.create({
    pin: {
        position: 'absolute',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 3,
    },
});
