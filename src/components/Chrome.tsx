import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, fonts, type, space, radii, shadow } from '../tokens';
import { SearchIcon, HomeIcon, WishlistIcon, TripsIcon, MessagesIcon, PersonCircleIcon } from './Icons';
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
export const CategoryTabs = ({ active, onSelect, thumbs, }: {
    active: string;
    onSelect: (k: string) => void;
    thumbs?: Record<string, number>;
}) => {
    const tabs = ['All', 'Homes', 'Experiences', 'Services'];
    return (<View style={styles.tabsWrap}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsInner}>
        {tabs.map((t) => {
            const sel = t === active;
            const bold = sel || t === 'All';
            const thumb = thumbs?.[t];
            return (<TouchableOpacity key={t} accessibilityRole="tab" accessibilityLabel={t} accessibilityState={{ selected: sel }} onPress={() => onSelect(t)} style={styles.tabBtn}>
              <View style={styles.tabIconBox}>
                {thumb ? (<Image source={thumb} style={styles.tabThumb} resizeMode="cover"/>) : (<View style={styles.tabThumbFallback}/>)}
              </View>
              <Text style={bold ? type.tabSelected : type.tab}>{t}</Text>
              {sel ? <View style={styles.tabUnderline}/> : null}
            </TouchableOpacity>);
        })}
      </ScrollView>
    </View>);
};
const NAV = [
    { key: 'explore', label: 'Explore', Icon: HomeIcon },
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
      <View style={styles.footerDot} pointerEvents="none">
        <View style={styles.footerDotStem}/>
        <View style={styles.footerDotPoint}/>
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
    tabIconBox: { width: space.tabIconBox, height: space.tabIconBox, marginRight: space.tabIconGap },
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
    footerDot: {
        width: 16, height: 16, borderRadius: 8, backgroundColor: colors.continuePink,
        alignItems: 'center', justifyContent: 'center', marginRight: 5,
    },
    footerDotStem: { position: 'absolute', left: 4.6, top: 2.6, width: 1.4, height: 4.2, backgroundColor: colors.ink },
    footerDotPoint: { position: 'absolute', left: 4.6, top: 8.0, width: 1.4, height: 1.4, borderRadius: 0.7, backgroundColor: colors.ink },
});
