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
    { id: 'ht-a', title: 'Samesun Venice Beach Hostel', location: 'Venice, California', rating: 4.6, reviews: 540, priceForNights: '$157 for 2 nights', priceNote: '2 nights', photo: img.h04 },
    { id: 'ht-b', title: 'The Hills Inn Eagle Rock', location: 'Eagle Rock, California', rating: 4.75, reviews: 412, priceForNights: '$396 for 2 nights', priceNote: '2 nights', photo: img.h05 },
    { id: 'ht-c', title: 'Chamberlain West Hollywood', location: 'West Hollywood, California', rating: 4.79, reviews: 623, priceForNights: '$768 for 2 nights', priceNote: '2 nights', photo: img.h06 },
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
    id: 'r-bolinas',
    name: 'Nymph Cottage and Gardens',
    location: 'Home in Bolinas',
    badge: 'Guest favorite',
    rating: 4.83,
    reviews: 719,
    beds: '1 queen bed',
    baths: '1 bath',
    priceForNights: '$231 for 1 night',
    priceWas: '$258',
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
    { x: 202.3, y: 238.7, w: 54.9, h: 33.8, label: 'Tent in Woodside, $292 for 1 night, originally $323', price: '$292', compact: false },
    { x: 201.6, y: 238.0, w: 56.0, h: 33.8, label: 'Tent in Woodside, $304 for 1 night, originally $336', price: '$304', compact: false },
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
    id: 'd-woodside',
    title: 'Tent 03 - Overlook w/ocean view',
    location: 'Tent in Woodside, California',
    meta: '4 guests  ·  1 bedroom  ·  3 beds  ·  1 bath',
    rating: '4.97',
    reviews: 76,
    badge: 'Guest favorite',
    freeCancel: 'Free cancellation',
    host: {
        name: 'William, Sana & Sons',
        nameLine: 'Hosted by William, Sana & Sons',
        sub: 'Superhost · 3 years hosting',
        superhost: 'Superhost',
        desc: 'William, Sana & Sons is a superhost. Learn more about William, Sana & Sons.',
    },
    blocks: [
        { title: 'Top 10% of homes', desc: 'This home is highly ranked based on ratings, reviews, and reliability.' },
        { title: 'In the hills above Half Moon Bay', desc: 'On a 10-acre mountainside with ocean views toward Half Moon Bay and trails nearby' },
        { title: 'Safari tent with a private deck', desc: 'A 210 sq ft safari tent on a wooden deck with a wood stove, fire pit, and down bedding' },
        { title: 'Stunning views and thoughtful hosts', desc: 'Guests describe the views as breathtaking and praise hosts William and Sana by name' },
    ],
    body: 'Breathe deep in nature on Kings Mountain CA. Our safari-style tents blend comfort and adventure ' +
        'with real beds, down comforters, cotton linens, lighting, indoor/outdoor furniture, a mini fridge, ' +
        'and a stove. Each tent sits on a wooden deck overlooking the ocean and the surrounding forest. ' +
        'Enjoy light cooking, fireside chats, and cozy mornings—thoughtful touches make your stay relaxing.' +
        '\n\nLocation: 30 min from SFO, 40 min from San Francisco, 30 min from Palo Alto, 20 min from Half Moon Bay.',
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
