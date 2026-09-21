import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Rect, Path, Polygon } from 'react-native-svg';
import { colors, type } from '../tokens';
export const MapView = ({ width, height, pins }: {
    width: number;
    height: number;
    pins: {
        x: number;
        y: number;
        label: string;
    }[];
}) => (<View style={{ width, height, backgroundColor: colors.mapBg, overflow: 'hidden' }}>
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Polygon points={`0,${height * 0.55} ${width * 0.35},${height * 0.45} ${width * 0.6},${height * 0.7} ${width * 0.4},${height} 0,${height}`} fill={colors.mapWater}/>
      <Rect x={width * 0.7} y={height * 0.05} width={width * 0.3} height={height * 0.3} fill={colors.mapWater}/>
      <Path d={`M0,${height * 0.3} L${width},${height * 0.42}`} stroke={colors.mapRoad} strokeWidth={10}/>
      <Path d={`M0,${height * 0.7} L${width},${height * 0.6}`} stroke={colors.mapRoad} strokeWidth={8}/>
      <Path d={`M${width * 0.45},0 L${width * 0.5},${height}`} stroke={colors.mapRoad} strokeWidth={8}/>
      <Path d={`M0,${height * 0.85} L${width * 0.3},${height}`} stroke={colors.mapRoad} strokeWidth={6}/>
      {[0.15, 0.4, 0.62, 0.85].map((bx, i) => (<Rect key={i} x={width * 0.08 + i * 6} y={height * (bx)} width={width * 0.12} height={height * 0.06} rx={3} fill={colors.mapBlock}/>))}
      {[0.2, 0.5, 0.78].map((bx, i) => (<Rect key={`b${i}`} x={width * 0.55} y={height * (bx)} width={width * 0.12} height={height * 0.05} rx={3} fill={colors.mapBlock}/>))}
    </Svg>
    {pins.map((pin, i) => (<View key={i} style={[styles.pin, { left: pin.x * width, top: pin.y * height }]}>
        <Text style={type.pin}>{pin.label}</Text>
      </View>))}
  </View>);
const styles = StyleSheet.create({
    pin: {
        position: 'absolute', transform: [{ translateX: -22 }, { translateY: -16 }],
        backgroundColor: colors.pinBg, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 16,
    },
});
