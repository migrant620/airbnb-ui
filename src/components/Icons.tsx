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
export const HeartIcon = ({ size = 24, color = '#222', filled = false }: P & {
    filled?: boolean;
}) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 20.5l-1.4-1.3C5.4 14.6 2.5 11.9 2.5 8.6 2.5 6.1 4.5 4 7 4c1.7 0 3.3.9 4 2.3C11.7 4.9 13.3 4 15 4c2.5 0 4.5 2.1 4.5 4.6 0 3.3-2.9 6-8.1 10.6L12 20.5z" fill={filled ? color : 'rgba(0,0,0,0.001)'} stroke={color} strokeWidth={2} strokeLinejoin="round"/>
  </Svg>);
export const HomeIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1v-8.5z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
  </Svg>);
export const WishlistIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 20.5l-1.4-1.3C5.4 14.6 2.5 11.9 2.5 8.6 2.5 6.1 4.5 4 7 4c1.7 0 3.3.9 4 2.3C11.7 4.9 13.3 4 15 4c2.5 0 4.5 2.1 4.5 4.6 0 3.3-2.9 6-8.1 10.6L12 20.5z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
  </Svg>);
export const TripsIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={7} width={18} height={13} rx={2} stroke={color} strokeWidth={2}/>
    <Line x1={3} y1={11} x2={21} y2={11} stroke={color} strokeWidth={2}/>
    <Path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth={2}/>
  </Svg>);
export const MessagesIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
  </Svg>);
export const PersonCircleIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10.28} stroke={color} strokeWidth={2}/>
    <Path d="M11.1 14.36A4.1 4.1 0 1 1 12.9 14.36" stroke={color} strokeWidth={2}/>
    <Line x1={9.9} y1={14.4} x2={3.7} y2={18.3} stroke={color} strokeWidth={2} strokeLinecap="round"/>
    <Line x1={14.1} y1={14.4} x2={20.3} y2={18.3} stroke={color} strokeWidth={2} strokeLinecap="round"/>
  </Svg>);
export const StarIcon = ({ size = 12, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.8 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" fill={color}/>
  </Svg>);
export const BackIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 5l-7 7 7 7" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>);
export const ShareIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={6} y1={12} x2={18} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round"/>
    <Line x1={13} y1={7} x2={18} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <Line x1={13} y1={17} x2={18} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
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
export const ArrowRightIcon = ({ size = 18, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1={5} y1={12} x2={19} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round"/>
    <Line x1={13} y1={6} x2={19} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    <Line x1={13} y1={18} x2={19} y2={12} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>);
export const GoogleIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={12} cy={12} r={11} fill="#fff" stroke="#DDD" strokeWidth={1}/>
    <Path d="M12 9.5v3.2h3.4c-.3 1.6-1.7 3-3.4 3a3.7 3.7 0 1 1 0-7.4c1 0 1.9.4 2.5 1l2.2-2.2A6.6 6.6 0 1 0 12 18.6c3.8 0 6.3-2.7 6.3-6.3 0-.4 0-.8-.1-1.2H12z" fill={color}/>
  </Svg>);
export const AppleIcon = ({ size = 24, color = '#222' }: P) => (<Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={12} cy={12} r={11} fill="#fff" stroke="#DDD" strokeWidth={1}/>
    <Path d="M15.5 12.6c0-1.8 1.5-2.7 1.6-2.7-1-1.4-2.4-1.6-2.9-1.6-1.3-.1-2.4.7-3 .7-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.7-1 2.4-2 .7-1 1-2 1-2.1-.1 0-1.7-.7-1.9-2.7zM13.4 6.3c.5-.6.8-1.4.8-2.3-.8 0-1.7.5-2.2 1.1-.5.6-.9 1.4-.8 2.2.9.1 1.8-.4 2.2-1z" fill={color}/>
  </Svg>);
