const img = {
    h01: require('../assets/images/h01.webp'),
    h02: require('../assets/images/h02.webp'),
    h03: require('../assets/images/h03.webp'),
    h04: require('../assets/images/h04.webp'),
    h05: require('../assets/images/h05.webp'),
    h06: require('../assets/images/h06.webp'),
    t01: require('../assets/images/t01.webp'),
    t02: require('../assets/images/t02.webp'),
    t03: require('../assets/images/t03.webp'),
    t04: require('../assets/images/t04.webp'),
    t05: require('../assets/images/t05.webp'),
    t06: require('../assets/images/t06.webp'),
};
export type Photo = {
    file: number;
    category: string;
    caption: string;
};
export type Listing = {
    id: string;
    title: string;
    location: string;
    badge?: string;
    rating: number;
    reviews: number;
    priceForNights: string;
    priceNote: string;
    photo: number;
};
export const feedHomes: Listing[] = [
    { id: 'h-a', title: 'Home in South Lake Tahoe', location: 'South Lake Tahoe, California', badge: 'Guest favorite', rating: 4.99, reviews: 214, priceForNights: '$990 for 2 nights', priceNote: '2 nights', photo: img.h01 },
    { id: 'h-b', title: 'Home in South Lake Tahoe', location: 'South Lake Tahoe, California', badge: 'Guest favorite', rating: 4.97, reviews: 188, priceForNights: '$1,445 for 2 nights', priceNote: '2 nights', photo: img.h02 },
    { id: 'h-c', title: 'Cabin in Tahoma', location: 'Tahoma, California', badge: 'Guest favorite', rating: 4.97, reviews: 132, priceForNights: '$697 for 2 nights', priceNote: '2 nights', photo: img.h03 },
];
export const feedHotels: Listing[] = [
    { id: 'ht-a', title: 'Sandpiper Venice Beach Inn', location: 'Venice, California', rating: 4.6, reviews: 540, priceForNights: '$157 for 2 nights', priceNote: '2 nights', photo: img.h04 },
    { id: 'ht-b', title: 'Canyon Rest Inn Eagle Rock', location: 'Eagle Rock, California', rating: 4.75, reviews: 412, priceForNights: '$396 for 2 nights', priceNote: '2 nights', photo: img.h05 },
    { id: 'ht-c', title: 'Larkspur West Hollywood', location: 'West Hollywood, California', rating: 4.79, reviews: 623, priceForNights: '$768 for 2 nights', priceNote: '2 nights', photo: img.h06 },
];
export type MapResult = {
    id: string;
    name: string;
    location: string;
    badge: string;
    rating: number;
    reviews: number;
    beds: string;
    baths: string;
    priceForNights: string;
    priceWas: string;
    photo: number;
};
export const mapResult: MapResult = {
    id: 'r-montara',
    name: 'Tent 4 - Ridge deck, ocean view',
    location: 'Tent in Montara',
    badge: 'Guest favorite',
    rating: 4.97,
    reviews: 76,
    beds: '1 queen bed',
    baths: '1 bath',
    priceForNights: '$304 for 1 night',
    priceWas: '$336',
    photo: img.h03,
};
export const mapResultLabel = (l: MapResult) => `${l.badge}. ${l.location}. ${l.rating} out of 5 average rating, ${l.reviews} reviews. ` +
    `${l.name}. ${l.beds} · ${l.baths} . ${l.priceForNights}, originally ${l.priceWas}. Free cancellation.`;
export type MapPin = {
    x: number;
    y: number;
    w: number;
    h: number;
    label: string;
    price: string;
    compact: boolean;
};
export const mapPins: MapPin[] = [
    { x: 202.3, y: 238.7, w: 54.9, h: 33.8, label: 'Tent in Montara, $292 for 1 night, originally $323', price: '$292', compact: false },
    { x: 201.6, y: 238.0, w: 56.0, h: 33.8, label: 'Tent in Montara, $304 for 1 night, originally $336', price: '$304', compact: false },
    { x: 176.8, y: 234.4, w: 55.3, h: 33.8, label: 'Home in Half Moon Bay, $246 for 1 night', price: '$246', compact: false },
    { x: 168.5, y: 223.8, w: 53.1, h: 33.8, label: 'Home in Half Moon Bay, $341 for 1 night', price: '$341', compact: false },
    { x: 166.3, y: 220.5, w: 54.6, h: 33.8, label: 'Guest suite in Half Moon Bay, $247 for 1 night, originally $275', price: '$247', compact: false },
    { x: 240.2, y: 107.4, w: 55.3, h: 33.8, label: 'Guest suite in Oakland, $234 for 1 night, originally $262', price: '$234', compact: false },
    { x: 239.8, y: 107.0, w: 55.3, h: 33.8, label: 'Guest suite in Oakland, $258 for 1 night, originally $284', price: '$258', compact: false },
    { x: 98.6, y: 77.2, w: 53.1, h: 33.8, label: 'Home in Bolinas, $231 for 1 night, originally $258', price: '$231', compact: false },
    { x: 104.1, y: 72.8, w: 53.5, h: 33.8, label: 'Guesthouse in Bolinas, $158 for 1 night', price: '$158', compact: false },
    { x: 219.1, y: 51.7, w: 53.5, h: 33.8, label: 'Yurt in Richmond, $128 for 1 night, originally $147', price: '$128', compact: false },
    { x: 108.1, y: 35.7, w: 55.3, h: 33.8, label: 'Place to stay in San Geronimo, $250 for 1 night, originally $309', price: '$250', compact: false },
    { x: 231.8, y: 7.3, w: 53.1, h: 33.8, label: 'Apartment in Vallejo, $136 for 1 night, originally $156', price: '$136', compact: false },
    { x: 197.2, y: 238.0, w: 22.2, h: 18.2, label: 'Home in Half Moon Bay, $315 for 1 night, originally $347', price: '$315', compact: true },
    { x: 241.3, y: 115.7, w: 22.2, h: 18.2, label: 'Apartment in Oakland, $205 for 1 night', price: '$205', compact: true },
    { x: 239.1, y: 106.6, w: 22.2, h: 18.2, label: 'Apartment in Oakland, $185 for 1 night', price: '$185', compact: true },
    { x: 236.2, y: 104.5, w: 22.2, h: 18.2, label: 'Bungalow in Oakland, $255 for 1 night, originally $284', price: '$255', compact: true },
    { x: 177.9, y: 68.8, w: 22.2, h: 18.2, label: 'Room in San Quentin, $103 for 1 night', price: '$103', compact: true },
    { x: 116.4, y: 41.1, w: 22.2, h: 18.2, label: 'Guesthouse in Lagunitas-Forest Knolls, $236 for 1 night, originally $295', price: '$236', compact: true },
    { x: 117.5, y: 40.4, w: 22.2, h: 18.2, label: 'Guest suite in Lagunitas-Forest Knolls, $309 for 1 night, originally $350', price: '$309', compact: true },
    { x: 256.9, y: 19.3, w: 22.2, h: 18.2, label: 'Guesthouse in Vallejo, $324 for 1 night, originally $362', price: '$324', compact: true },
];
export const detailListing = {
    id: 'd-montara',
    title: 'Tent 4 - Ridge deck, ocean view',
    location: 'Tent in Montara, California',
    meta: '4 guests  ·  1 bedroom  ·  3 beds  ·  1 bath',
    rating: '4.97',
    reviews: 76,
    badge: 'Guest favorite',
    freeCancel: 'Free cancellation',
    host: {
        name: 'Mara, Joel & Family',
        nameLine: 'Hosted by Mara, Joel & Family',
        sub: 'Superhost · 3 years hosting',
        superhost: 'Superhost',
        desc: 'Mara, Joel & Family is a superhost. Learn more about Mara, Joel & Family.',
    },
    blocks: [
        { title: 'Top 10% of homes', desc: 'This home is highly ranked based on ratings, reviews, and reliability.' },
        { title: 'In the hills above the coastline', desc: 'On a 12-acre hillside with ocean views toward the bay and walking trails nearby' },
        { title: 'Safari tent with a private deck', desc: 'A 220 sq ft canvas tent on a cedar deck with a wood stove, fire pit, and warm bedding' },
        { title: 'Stunning views and thoughtful hosts', desc: 'Guests describe the views as breathtaking and praise hosts Mara and Joel by name' },
    ],
    body: 'Slow down on a quiet coastal ridge. Our canvas tents pair comfort with the outdoors, ' +
        'with real beds, down comforters, cotton linens, lighting, indoor/outdoor furniture, a mini fridge, ' +
        'and a stove. Each tent sits on a cedar deck facing the ocean and the pines around it. ' +
        'Cook simple meals and sit by the fire—small touches keep the stay easy.' +
        '\n\nLocation: 35 min from the airport, 15 min from the beach.',
    priceRun: '$336 $304',
    priceNow: '$304',
    priceWas: '$336',
    priceNote: 'For 1 night · Sep 30 – Oct 1',
    priceLabel: '$304 For 1 night, originally $336. Sep 30 – Oct 1',
    showMore: 'Show more',
    photos: [
        { file: img.t01, category: 'Bedroom', caption: 'Queen bed · 2 single beds · Bed linens · Clothing storage · Essentials · Extra pillows and blankets · Show more' },
        { file: img.t02, category: 'Full bathroom', caption: 'Toilet · Shower · Hot water · Towels · Soap · Toilet paper · Show more' },
        { file: img.t03, category: 'Backyard', caption: 'Fire pit · Patio · Garden · Mountain view · Outdoor seating · Show more' },
        { file: img.t04, category: 'Balcony', caption: 'Ocean view · Lounge chairs · Railing · Open air · Show more' },
    ] as Photo[],
};
export const PHOTO_TOTAL = 95;
export const destinations = [
    { name: 'Nearby', sub: 'Find what’s around you', photo: img.h01 },
    { name: 'Lake Tahoe', sub: 'Popular lake destination', photo: img.h02 },
    { name: 'South Lake Tahoe, CA', sub: 'For nature-lovers', photo: img.h03 },
    { name: 'Los Angeles, CA', sub: 'For sights like Universal\u00a0Studios\u00a0Hollywood', photo: img.h04 },
];
export const filterChips = ['Free parking', 'Self check-in', '1+ bathrooms', 'Allows pets'];
export const detailListingCard: Listing = {
    id: detailListing.id,
    title: detailListing.title,
    location: detailListing.location,
    badge: detailListing.badge,
    rating: Number(detailListing.rating),
    reviews: detailListing.reviews,
    priceForNights: `${detailListing.priceNow} for 1 night`,
    priceNote: '1 night',
    photo: detailListing.photos[0].file,
};
export type Review = {
    id: string;
    name: string;
    meta: string;
    text: string;
    photo: number;
};
export const reviewBreakdown: {
    label: string;
    value: number;
}[] = [
    { label: 'Cleanliness', value: 4.9 },
    { label: 'Accuracy', value: 5.0 },
    { label: 'Check-in', value: 5.0 },
    { label: 'Communication', value: 5.0 },
    { label: 'Location', value: 4.9 },
    { label: 'Value', value: 4.8 },
];
export const detailReviews: Review[] = [
    {
        id: 'rv-1',
        name: 'Marta',
        meta: 'August 2026',
        photo: img.t01,
        text: 'The view at sunrise is unreal. The tent was warm and spotless, and the wooden deck is the perfect place for a slow morning coffee. Joel met us on arrival and had the wood stove going.',
    },
    {
        id: 'rv-2',
        name: 'Devin',
        meta: 'August 2026',
        photo: img.h01,
        text: 'Quiet, peaceful and exactly as pictured. Ten minutes down the hill and you are at the harbor. Bring a layer for the evenings, it cools off fast after sunset.',
    },
    {
        id: 'rv-3',
        name: 'Priya',
        meta: 'July 2026',
        photo: img.t03,
        text: 'A real highlight of our California trip. The hosts thought of everything, from the down bedding to the s’mores kit by the fire pit. We would come back in a heartbeat.',
    },
    {
        id: 'rv-4',
        name: 'Tomas',
        meta: 'July 2026',
        photo: img.h03,
        text: 'Off the grid in the best way. No traffic noise at all, just owls and the ocean far below. The drive up is winding, so arrive before dark the first time.',
    },
    {
        id: 'rv-5',
        name: 'Alicia',
        meta: 'June 2026',
        photo: img.t02,
        text: 'We booked one night and immediately wished we had booked three. The tent is bigger than it looks and the bed is genuinely comfortable. Mara left fresh fruit for us.',
    },
    {
        id: 'rv-6',
        name: 'Ken',
        meta: 'June 2026',
        photo: img.h05,
        text: 'Beautiful spot for a digital detox. Service is patchy on the mountain, which turned out to be a feature. The trails behind the property are worth the short hike.',
    },
];
export type AmenityGlyph = 'view' | 'tree' | 'drop' | 'washer' | 'bed' | 'tv' | 'ac' | 'heat' | 'alarm' | 'wifi' | 'kitchen' | 'door' | 'flame' | 'car' | 'pool' | 'paw';
export type Amenity = {
    label: string;
    glyph: AmenityGlyph;
};
export type AmenityGroup = {
    title: string;
    items: Amenity[];
};
export const detailAmenities: AmenityGroup[] = [
    {
        title: 'Scenic views',
        items: [
            { label: 'Beach view', glyph: 'view' },
            { label: 'Garden view', glyph: 'tree' },
            { label: 'Mountain view', glyph: 'view' },
        ],
    },
    {
        title: 'Bathroom',
        items: [
            { label: 'Hair dryer', glyph: 'drop' },
            { label: 'Shampoo', glyph: 'drop' },
            { label: 'Hot water', glyph: 'drop' },
            { label: 'Shower gel', glyph: 'drop' },
        ],
    },
    {
        title: 'Bedroom and laundry',
        items: [
            { label: 'Washer', glyph: 'washer' },
            { label: 'Dryer', glyph: 'washer' },
            { label: 'Essentials', glyph: 'bed' },
            { label: 'Bed linens', glyph: 'bed' },
            { label: 'Iron', glyph: 'washer' },
        ],
    },
    {
        title: 'Entertainment',
        items: [
            { label: 'TV', glyph: 'tv' },
            { label: 'Sound system', glyph: 'tv' },
        ],
    },
    {
        title: 'Heating and cooling',
        items: [
            { label: 'Air conditioning', glyph: 'ac' },
            { label: 'Heating', glyph: 'heat' },
        ],
    },
    {
        title: 'Home safety',
        items: [
            { label: 'Smoke alarm', glyph: 'alarm' },
            { label: 'Carbon monoxide alarm', glyph: 'alarm' },
            { label: 'Fire extinguisher', glyph: 'alarm' },
        ],
    },
    {
        title: 'Internet and office',
        items: [{ label: 'Wifi', glyph: 'wifi' }],
    },
    {
        title: 'Kitchen and dining',
        items: [
            { label: 'Kitchen', glyph: 'kitchen' },
            { label: 'Refrigerator', glyph: 'kitchen' },
            { label: 'Microwave', glyph: 'kitchen' },
            { label: 'Coffee maker', glyph: 'kitchen' },
            { label: 'Cooking basics', glyph: 'kitchen' },
            { label: 'Dishes and silverware', glyph: 'kitchen' },
        ],
    },
    {
        title: 'Location features',
        items: [
            { label: 'Private entrance', glyph: 'door' },
            { label: 'Beach access', glyph: 'view' },
        ],
    },
    {
        title: 'Outdoor',
        items: [
            { label: 'Backyard', glyph: 'tree' },
            { label: 'Fire pit', glyph: 'flame' },
            { label: 'Patio', glyph: 'tree' },
            { label: 'Outdoor dining area', glyph: 'tree' },
        ],
    },
    {
        title: 'Parking and facilities',
        items: [
            { label: 'Free parking on premises', glyph: 'car' },
            { label: 'Pool', glyph: 'pool' },
            { label: 'Hot tub', glyph: 'pool' },
        ],
    },
    {
        title: 'Services',
        items: [
            { label: 'Pets allowed', glyph: 'paw' },
            { label: 'Self check-in', glyph: 'door' },
            { label: 'Long term stays allowed', glyph: 'door' },
        ],
    },
];
export const amenityTotal = detailAmenities.reduce((n, g) => n + g.items.length, 0);
export const amenityPreview: Amenity[] = [
    { label: 'Kitchen', glyph: 'kitchen' },
    { label: 'Wifi', glyph: 'wifi' },
    { label: 'TV', glyph: 'tv' },
    { label: 'Pool', glyph: 'pool' },
    { label: 'Washer', glyph: 'washer' },
    { label: 'Heating', glyph: 'heat' },
];
