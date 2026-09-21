import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontFiles, frame } from './tokens';
import { ExploreScreen } from './components/ExploreScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { ListingDetail } from './components/ListingDetail';
import { PhotoViewer } from './components/PhotoViewer';
import { LoginSheet } from './components/LoginSheet';
import { SearchSheet, Guests } from './components/SearchSheet';
import { DayRange } from './components/Calendar';
import { detailListing } from './data';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function Shell() {
    const [fontsLoaded, fontError] = useFonts(fontFiles);
    const insets = useSafeAreaInsets();
    const feedRef = React.useRef<ScrollView>(null);
    const [screen, setScreen] = React.useState<'explore' | 'results' | 'detail'>('explore');
    const [detailReturn, setDetailReturn] = React.useState<'explore' | 'results'>('explore');
    const [activeCategory, setActiveCategory] = React.useState('All');
    const [activeNav, setActiveNav] = React.useState('explore');
    const [feedScrollY, setFeedScrollY] = React.useState(0);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const [searchStep, setSearchStep] = React.useState<'where' | 'when' | 'who'>('where');
    const [searchCategory, setSearchCategory] = React.useState('Homes');
    const [destination, setDestination] = React.useState<string | null>(null);
    const [range, setRange] = React.useState<DayRange>({ start: null, end: null });
    const [guests, setGuests] = React.useState<Guests>({ adults: 1, children: 0, infants: 0, pets: 0 });
    const [guestsTouched, setGuestsTouched] = React.useState(false);
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [photoOpen, setPhotoOpen] = React.useState(false);
    const [photoIndex, setPhotoIndex] = React.useState(0);
    const restoreFeed = React.useCallback(() => {
        setTimeout(() => {
            if (screen === 'explore')
                feedRef.current?.scrollTo({ y: feedScrollY, animated: false });
        }, 0);
    }, [screen, feedScrollY]);
    React.useEffect(() => {
        if (screen === 'explore')
            restoreFeed();
    }, [screen, restoreFeed]);
    if (!fontsLoaded && !fontError)
        return null;
    const datesText = (() => {
        const f = (dt: Date | null) => (dt ? `${MONTHS[dt.getMonth()]} ${dt.getDate()}` : null);
        const a = f(range.start);
        const b = f(range.end);
        if (a && b)
            return `${a} – ${b}`;
        if (a)
            return a;
        return 'Sep 30 – Oct 1';
    })();
    const guestTotal = guests.adults + guests.children;
    const guestsText = guestTotal > 0 ? `${guestTotal} guests` : '2 guests';
    const openListing = (from: 'explore' | 'results') => {
        setDetailReturn(from);
        setScreen('detail');
    };
    const openSearch = () => {
        setSearchStep('where');
        setSearchOpen(true);
    };
    const onSearch = () => {
        setSearchOpen(false);
        setScreen('results');
    };
    const onClear = () => {
        setDestination(null);
        setRange({ start: null, end: null });
        setGuests({ adults: 1, children: 0, infants: 0, pets: 0 });
        setGuestsTouched(false);
    };
    const updateGuests = (g: Guests) => {
        setGuests(g);
        setGuestsTouched(true);
    };
    return (<View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="dark"/>
      {screen === 'explore' ? (<ExploreScreen activeCategory={activeCategory} onCategory={setActiveCategory} onOpenListing={() => openListing('explore')} onHeart={() => setLoginOpen(true)} onOpenSearch={openSearch} onNav={setActiveNav} activeNav={activeNav} scrollRef={feedRef} onScrollY={setFeedScrollY}/>) : null}

      {screen === 'results' ? (<ResultsScreen datesText={datesText} guestsText={guestsText} onBack={() => { setScreen('explore'); setActiveNav('explore'); }} onFilters={() => { }} onOpenListing={() => openListing('results')} onHeart={() => setLoginOpen(true)} activeNav={activeNav} onNav={setActiveNav}/>) : null}

      {screen === 'detail' ? (<ListingDetail photoIndex={photoIndex} onBack={() => setScreen(detailReturn)} onShare={() => { }} onHeart={() => setLoginOpen(true)} onOpenPhoto={() => { setPhotoOpen(true); }} onReserve={() => setLoginOpen(true)}/>) : null}

      {searchOpen ? (<SearchSheet step={searchStep} setStep={setSearchStep} category={searchCategory} setCategory={setSearchCategory} destination={destination} pickDestination={setDestination} range={range} setRange={setRange} guests={guests} guestsTouched={guestsTouched} setGuests={updateGuests} onClose={() => setSearchOpen(false)} onClear={onClear} onSearch={onSearch}/>) : null}

      {photoOpen ? (<PhotoViewer startIndex={photoIndex} onClose={() => setPhotoOpen(false)} onShare={() => { }} onHeart={() => setLoginOpen(true)}/>) : null}

      {loginOpen ? <LoginSheet onClose={() => setLoginOpen(false)}/> : null}
    </View>);
}
export default function App() {
    return (<SafeAreaProvider>
      <View style={styles.stage}>
        <Shell />
      </View>
    </SafeAreaProvider>);
}
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.white },
    stage: {
        width: frame.width,
        maxWidth: '100%',
        height: frame.height,
        maxHeight: '100%',
        alignSelf: 'center',
        backgroundColor: colors.white,
    },
});
