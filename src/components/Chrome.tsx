import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { colors, fonts, type, space, radii, shadow } from '../tokens';
import { SearchIcon, MagnifierIcon, WishlistIcon, TripsIcon, MessagesIcon, PersonCircleIcon } from './Icons';
export const SearchPill = ({ onPress }: {
    onPress: () => void;
}) => (<TouchableOpacity accessibilityRole="button" accessibilityLabel="Start your search" onPress={onPress} style={[styles.pill, shadow.pill]} activeOpacity={0.7}>
    <View style={styles.pillIcon}><SearchIcon size={13} color={colors.ink}/></View>
    <Text style={type.searchPill} numberOfLines={1}>Start your search</Text>
  </TouchableOpacity>);
export const SearchPillWrap = ({ onPress }: {
    onPress: () => void;
}) => (<View style={styles.pillWrap}>
    <SearchPill onPress={onPress}/>
  </View>);
const TABS: {
    key: string;
    icon: string;
    track?: number;
}[] = [
    { key: 'All', icon: '🌍', track: -0.075 },
    { key: 'Homes', icon: '🏠' },
    { key: 'Experiences', icon: '🎈' },
    { key: 'Services', icon: '🛎' },
];
export const CategoryTabs = ({ active, onSelect, }: {
    active: string;
    onSelect: (k: string) => void;
}) => (<View style={styles.tabsWrap}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsInner}>
      {TABS.map(({ key: t, icon, track }) => {
        const sel = t === active;
        return (<TouchableOpacity key={t} accessibilityRole="tab" accessibilityLabel={t} accessibilityState={{ selected: sel }} onPress={() => onSelect(t)} style={[styles.tabBtn, sel ? styles.tabBtnSelected : null]}>
            <View style={styles.tabIconBox}>
              <Text style={styles.tabEmoji} aria-hidden={true}>
                {icon}
              </Text>
            </View>
            
            <Text style={[type.tab, track === undefined ? null : { letterSpacing: track }]}>{t}</Text>
          </TouchableOpacity>);
    })}
    </ScrollView>
  </View>);
const NAV = [
    { key: 'explore', label: 'Explore', Icon: MagnifierIcon },
    { key: 'wishlists', label: 'Wishlists', Icon: WishlistIcon },
    { key: 'trips', label: 'Trips', Icon: TripsIcon },
    { key: 'messages', label: 'Messages', Icon: MessagesIcon },
    { key: 'login', label: 'Log In', Icon: PersonCircleIcon },
];
export const BottomNav = ({ active, onSelect, }: {
    active: string;
    onSelect: (k: string) => void;
}) => (<View style={[styles.nav, shadow.nav]} pointerEvents="box-none">
    {NAV.map(({ key, label, Icon }) => {
        const sel = key === active;
        return (<TouchableOpacity key={key} accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected: sel }} onPress={() => onSelect(key)} style={styles.navItem}>
          <Icon size={24} color={sel ? colors.navActive : colors.navInactive}/>
          <Text style={sel ? type.navLabelActive : type.navLabel} numberOfLines={1}>
            {label}
          </Text>
        </TouchableOpacity>);
    })}
  </View>);
export const FooterNote = () => (<>
    <View style={styles.footerPill} pointerEvents="none"/>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel="Prices include all fees" style={styles.footerNote} activeOpacity={1}>
      <View style={styles.footerTag} pointerEvents="none">
        <Svg width={17} height={17} viewBox="0 0 24 24">
          <Path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42z" fill={colors.continuePink}/>
          <Circle cx="7.5" cy="7.5" r="1.6" fill="#FFFFFF"/>
        </Svg>
      </View>
      <Text style={type.footerNote} numberOfLines={1}>Prices include all fees</Text>
    </TouchableOpacity>
  </>);
const styles = StyleSheet.create({
    pillWrap: { marginHorizontal: space.searchPillLeft, marginTop: space.searchPillTop },
    pill: {
        height: space.searchPillHeight,
        borderRadius: space.searchPillRadius,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillIcon: { width: space.searchIconBox, alignItems: 'center', marginRight: space.searchIconGap },
    tabsWrap: { height: space.tabsHeight, marginTop: space.tabGap },
    tabsInner: { paddingHorizontal: space.contentPad, gap: space.tabChipGap, alignItems: 'center' },
    tabBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: space.tabsHeight,
        paddingLeft: space.tabPadLeft,
        paddingRight: space.tabPadRight,
    },
    tabIconBox: { width: space.tabIconBox, height: space.tabIconBox, marginRight: space.tabIconGap, alignItems: 'center', justifyContent: 'center' },
    tabEmoji: { fontSize: 15, lineHeight: 16, textAlign: 'center' },
    tabBtnSelected: { backgroundColor: colors.chipSelected, borderRadius: space.tabsHeight / 2 },
    tabThumb: { width: space.tabIconBox, height: space.tabIconBox, borderRadius: 8 },
    tabThumbFallback: {
        width: space.tabIconBox, height: space.tabIconBox, borderRadius: 8,
        backgroundColor: colors.chipBg, borderWidth: 1, borderColor: colors.hairline,
    },
    tabUnderline: {
        position: 'absolute', bottom: 2, left: space.tabPadLeft, width: 22, height: 2,
        backgroundColor: colors.selectedTab, borderRadius: 1,
    },
    nav: {
        position: 'absolute', left: 0, right: 0, bottom: 0, height: space.navHeight,
        backgroundColor: colors.white, flexDirection: 'row', alignItems: 'flex-start',
        justifyContent: 'space-between', paddingHorizontal: space.navPadX, overflow: 'hidden',
        borderTopWidth: 1, borderTopColor: colors.hairlineSoft,
    },
    navItem: {
        width: space.navItemWidth, height: space.navItemHeight,
        alignItems: 'center', justifyContent: 'center',
    },
    footerPill: {
        position: 'absolute', left: 92.1, top: 645.6, width: 209.2, height: 52.4,
        borderRadius: 26, backgroundColor: colors.white, opacity: 0.97,
        shadowColor: '#000', shadowOpacity: 0.14, shadowRadius: 10, shadowOffset: { width: 0, height: 2 }, elevation: 4,
    },
    footerNote: {
        position: 'absolute', left: space.footerNoteLeft, top: space.footerNoteTop,
        width: space.footerNoteWidth, height: space.footerNoteHeight,
        flexDirection: 'row', alignItems: 'center',
    },
    footerTag: {
        width: 17, height: 17, marginRight: 6,
        transform: [{ rotate: '-18deg' }],
    },
});
