import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import type { ComponentType } from 'react';
import { colors, type, fonts } from '../tokens';
import { BottomNav } from './Chrome';
import { WishlistIcon, TripsIcon, MessagesIcon, PersonCircleIcon } from './Icons';
type TabKey = 'wishlists' | 'trips' | 'messages' | 'login';
const CONTENT: Record<TabKey, {
    title: string;
    body: string;
}> = {
    wishlists: {
        title: 'No trips booked… yet!',
        body: 'Time to dust off your bags and start planning your next adventure.',
    },
    trips: {
        title: 'No trips booked… yet!',
        body: 'When you are ready to plan your next trip, we are here to help.',
    },
    messages: {
        title: 'No messages',
        body: 'When you message a Host, you will see your conversations here.',
    },
    login: {
        title: 'Log in or sign up',
        body: 'Log in or sign up to start planning your next trip.',
    },
};
const ICON: Record<TabKey, ComponentType<{
    size: number;
    color: string;
}>> = {
    wishlists: WishlistIcon,
    trips: TripsIcon,
    messages: MessagesIcon,
    login: PersonCircleIcon,
};
export const EmptyState = ({ tabKey, onLogin, onBack, activeNav, onNav, }: {
    tabKey: TabKey;
    onLogin: () => void;
    onBack: () => void;
    activeNav: string;
    onNav: (k: string) => void;
}) => {
    const c = CONTENT[tabKey];
    const Icon = ICON[tabKey];
    return (<View style={styles.root}>
      <View style={styles.center}>
        <View style={styles.iconCircle} pointerEvents="none">
          <Icon size={28} color={colors.ink}/>
        </View>
        <Text style={[type.sheetSectionTitle, styles.title]} numberOfLines={2}>
          {c.title}
        </Text>
        <Text style={[type.subtitle, styles.body]} numberOfLines={3}>
          {c.body}
        </Text>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Log in or sign up" onPress={onLogin} activeOpacity={0.9} style={styles.cta}>
          <Text style={type.loginContinue}>Log in or sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Explore stays" onPress={onBack} activeOpacity={0.7} style={styles.explore}>
          <Text style={styles.exploreText}>Explore stays</Text>
        </TouchableOpacity>
      </View>
      <BottomNav active={activeNav} onSelect={onNav}/>
    </View>);
};
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.white },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: colors.chipBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: { textAlign: 'center' },
    body: { marginTop: 10, textAlign: 'center', maxWidth: 280 },
    cta: {
        marginTop: 28,
        backgroundColor: colors.continuePink,
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignSelf: 'center',
    },
    explore: {
        marginTop: 14,
        borderWidth: 1,
        borderColor: colors.hairline,
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignSelf: 'center',
    },
    exploreText: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 20, fontWeight: '600', color: colors.ink },
});
