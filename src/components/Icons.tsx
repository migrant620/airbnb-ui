import * as React from 'react';
import Svg, { Path, Circle, Rect, G, Line } from 'react-native-svg';
type P = {
    size?: number;
    color?: string;
};
export const SearchIcon = ({ size = 18, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" stroke={color} strokeWidth={2}/>
    <Line x1={15.2} y1={15.2} x2={21} y2={21} stroke={color} strokeWidth={2} strokeLinecap="round"/>
  </Svg>);
export const SlidersIcon = ({ size = 18, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={4} y1={8} x2={20} y2={8} stroke={color} strokeWidth={2} strokeLinecap="round"/>
    <Line x1={4} y1={16} x2={20} y2={16} stroke={color} strokeWidth={2} strokeLinecap="round"/>
    <Circle cx={9} cy={8} r={2.6} fill="#fff" stroke={color} strokeWidth={2}/>
    <Circle cx={15} cy={16} r={2.6} fill="#fff" stroke={color} strokeWidth={2}/>
  </Svg>);
export const HeartIcon = ({ size = 24, color = '#222', strokeColor, filled = false }: P & {
    strokeColor?: string;
    filled?: boolean;
}) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 20.5l-1.4-1.3C5.4 14.6 2.5 11.9 2.5 8.6 2.5 6.1 4.5 4 7 4c1.7 0 3.3.9 4 2.3C11.7 4.9 13.3 4 15 4c2.5 0 4.5 2.1 4.5 4.6 0 3.3-2.9 6-8.1 10.6L12 20.5z" fill={filled ? color : 'rgba(0,0,0,0.001)'} stroke={strokeColor ?? color} strokeWidth={2} strokeLinejoin="round"/>
  </Svg>);
export const MagnifierIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    
    <Circle cx={9.83} cy={9.83} r={8.72} stroke={color} strokeWidth={1.5}/>
    <Line x1={15.99} y1={15.99} x2={22.88} y2={22.88} stroke={color} strokeWidth={1.5} strokeLinecap="round"/>
  </Svg>);
export const WishlistIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    
    <Path d="M13.22 21.34 l-1.71 -1.47 C5.17 14.66 1.63 11.60 1.63 7.87 1.63 5.04 4.07 2.66 7.12 2.66 c2.07 0.00 4.02 1.02 4.88 2.60 C12.85 3.68 14.80 2.66 16.88 2.66 c3.05 0.00 5.49 2.38 5.49 5.21 0.00 3.74 -3.54 6.79 -9.88 12.00 L13.22 21.34 z" stroke={color} strokeWidth={1.5} strokeLinejoin="round"/>
  </Svg>);
export const TripsIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    
    <Path d="M12.00 1.49 c1.16 0.00 2.13 0.72 2.81 1.95 l6.40 12.00 c1.45 2.67 0.19 5.85 -2.33 6.77 -2.13 0.82 -4.36 0.00 -6.88 -2.46 -2.52 2.46 -4.75 3.28 -6.88 2.46 -2.52 -0.92 -3.78 -4.10 -2.33 -6.77 L9.19 3.44 C9.87 2.21 10.84 1.49 12.00 1.49 z" stroke={color} strokeWidth={1.5} strokeLinejoin="round"/>
    <Path d="M11.82 9.61 c1.53 0.00 2.78 1.61 2.78 3.56 0.00 2.41 -1.53 4.37 -2.78 5.86 -1.26 -1.49 -2.78 -3.45 -2.78 -5.86 0.00 -1.95 1.26 -3.56 2.78 -3.56 z" stroke={color} strokeWidth={1.5}/>
  </Svg>);
export const MessagesIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    
    <Path d="M4.84 2.56 H19.17 A3 3 0 0 1 22.17 5.56 V16.40 A3 3 0 0 1 19.17 19.40 H13.65 L11.83 22.53 L10.00 19.40 H4.84 A3 3 0 0 1 1.84 16.40 V5.56 A3 3 0 0 1 4.84 2.56 Z" stroke={color} strokeWidth={1.5} strokeLinejoin="round"/>
  </Svg>);
export const PersonCircleIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10.53} stroke={color} strokeWidth={1.5}/>
    <Path d="M11.08 14.42A4.2 4.2 0 1 1 12.92 14.42" stroke={color} strokeWidth={1.5}/>
    <Line x1={9.85} y1={14.46} x2={3.5} y2={18.45} stroke={color} strokeWidth={1.5} strokeLinecap="round"/>
    <Line x1={14.15} y1={14.46} x2={20.5} y2={18.45} stroke={color} strokeWidth={1.5} strokeLinecap="round"/>
  </Svg>);
export const StarIcon = ({ size = 12, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.8 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" fill={color}/>
  </Svg>);
export const BackIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    
    <Line x1={20} y1={12} x2={4.5} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round"/>
    <Path d="M11 5.5L4.5 12l6.5 6.5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>);
export const ShareIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    
    <Line x1={8.2} y1={10.6} x2={15.8} y2={6.4} stroke={color} strokeWidth={1.8}/>
    <Line x1={8.2} y1={13.4} x2={15.8} y2={17.6} stroke={color} strokeWidth={1.8}/>
    <Circle cx={18} cy={5.5} r={2.7} fill="#fff" stroke={color} strokeWidth={1.8}/>
    <Circle cx={6} cy={12} r={2.7} fill="#fff" stroke={color} strokeWidth={1.8}/>
    <Circle cx={18} cy={18.5} r={2.7} fill="#fff" stroke={color} strokeWidth={1.8}/>
  </Svg>);
export const CloseIcon = ({ size = 16, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={5} y1={5} x2={19} y2={19} stroke={color} strokeWidth={2.2} strokeLinecap="round"/>
    <Line x1={19} y1={5} x2={5} y2={19} stroke={color} strokeWidth={2.2} strokeLinecap="round"/>
  </Svg>);
export const PlusIcon = ({ size = 16, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={12} y1={5} x2={12} y2={19} stroke={color} strokeWidth={2.2} strokeLinecap="round"/>
    <Line x1={5} y1={12} x2={19} y2={12} stroke={color} strokeWidth={2.2} strokeLinecap="round"/>
  </Svg>);
export const MinusIcon = ({ size = 16, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={5} y1={12} x2={19} y2={12} stroke={color} strokeWidth={2.2} strokeLinecap="round"/>
  </Svg>);
export const TrophyIcon = ({ size = 24, color = '#DAB732' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M7 4h10v4.2A5 5 0 0 1 12 13a5 5 0 0 1-5-4.8V4z" fill={color}/>
    <Path d="M7 5.2H4.6a3.4 3.4 0 0 0 3.5 3.9M17 5.2h2.4a3.4 3.4 0 0 1-3.5 3.9" stroke={color} strokeWidth={1.6}/>
    <Line x1={12} y1={13} x2={12} y2={16.5} stroke={color} strokeWidth={1.8}/>
    <Path d="M8.5 19.5h7" stroke={color} strokeWidth={1.8} strokeLinecap="round"/>
    <Path d="M9.8 16.5h4.4l.7 3H9.1l.7-3z" fill={color}/>
  </Svg>);
export const PinIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 21.5s-6.8-6.2-6.8-11a6.8 6.8 0 0 1 13.6 0c0 4.8-6.8 11-6.8 11z" stroke={color} strokeWidth={1.8} strokeLinejoin="round"/>
    <Circle cx={12} cy={10.3} r={2.4} stroke={color} strokeWidth={1.8}/>
  </Svg>);
export const CheckCircleIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9.2} stroke={color} strokeWidth={1.8}/>
    <Path d="M8 12.2l2.8 2.8L16.2 9" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>);
export const PhotoIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={3.2} y={4.6} width={17.6} height={14.8} rx={2.4} stroke={color} strokeWidth={1.8}/>
    <Circle cx={8.6} cy={9.4} r={1.7} fill={color}/>
    <Path d="M4.4 17.2l4.8-4.6 3.4 3.2 3.4-3.2 3.6 3.4" stroke={color} strokeWidth={1.8} strokeLinejoin="round"/>
  </Svg>);
export const ArrowRightIcon = ({ size = 18, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={5} y1={12} x2={19} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round"/>
    <Line x1={13} y1={6} x2={19} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <Line x1={13} y1={18} x2={19} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>);
export const GoogleIcon = ({ size = 24 }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </Svg>);
export const AppleIcon = ({ size = 24, color = '#000' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M15.5 12.6c0-1.8 1.5-2.7 1.6-2.7-1-1.4-2.4-1.6-2.9-1.6-1.3-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.7-1 2.4-2 .7-1 1-2 1-2.1-.1 0-1.7-.7-1.9-2.7zM13.4 6.3c.5-.6.8-1.4.8-2.3-.8 0-1.7.5-2.2 1.1-.5.6-.9 1.4-.8 2.2.9.1 1.8-.4 2.2-1z" fill={color}/>
  </Svg>);
export const BeloIcon = ({ width = 54.9, height = 60.1 }: {
    width?: number;
    height?: number;
}) => (<Svg width={width} height={height} viewBox="0 0 24 26" fill="none">
    <Path d="M12 2.4c1.2 0 2.2.7 2.9 1.9l6.6 11.7c1.5 2.6.2 5.7-2.4 6.6-2.2.8-4.5 0-7.1-2.4-2.6 2.4-4.9 3.2-7.1 2.4-2.6-.9-3.9-4-2.4-6.6L9.1 4.3C9.8 3.1 10.8 2.4 12 2.4z" stroke="#FF385C" strokeWidth={1.8} strokeLinejoin="round"/>
    <Path d="M12 9.2c1.7 0 3.1 1.4 3.1 3.1 0 2.1-1.7 3.8-3.1 5.1-1.4-1.3-3.1-3-3.1-5.1 0-1.7 1.4-3.1 3.1-3.1z" stroke="#FF385C" strokeWidth={1.8}/>
  </Svg>);
