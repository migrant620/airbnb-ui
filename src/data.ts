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
export const results: Listing[] = [
    { id: 'r-a', title: 'Nymph Cottage', location: 'Home in Bolinas', badge: 'Guest favorite', rating: 4.83, reviews: 719, priceForNights: '$231 for 1 night', priceNote: '1 night', photo: img.h01 },
    { id: 'r-b', title: 'Cliffside Retreat', location: 'Home in Half Moon Bay', rating: 4.78, reviews: 302, priceForNights: '$246 for 1 night', priceNote: '1 night', photo: img.h02 },
    { id: 'r-c', title: 'Garden Guest Suite', location: 'Guest suite in Half Moon Bay', rating: 4.81, reviews: 256, priceForNights: '$247 for 1 night', priceNote: '1 night', photo: img.h03 },
    { id: 'r-d', title: 'Marina Loft', location: 'Apartment in Oakland', rating: 4.7, reviews: 411, priceForNights: '$205 for 1 night', priceNote: '1 night', photo: img.h05 },
    { id: 'r-e', title: 'Forest Yurt', location: 'Yurt in Richmond', rating: 4.85, reviews: 178, priceForNights: '$128 for 1 night', priceNote: '1 night', photo: img.h04 },
    { id: 'r-f', title: 'Hillside Bungalow', location: 'Bungalow in Oakland', rating: 4.74, reviews: 233, priceForNights: '$255 for 1 night', priceNote: '1 night', photo: img.h06 },
];
export const detailListing = {
    id: 'd-woodside',
    title: 'Tent 03 - Overlook w/ocean view',
    location: 'Tent in Woodside, California',
    meta: '4 guests  ·  1 bedroom  ·  3 beds  ·  1 bath',
    rating: 4.97,
    reviews: 76,
    badge: 'Guest favorite',
    host: { name: 'William, Sana & Sons', superhost: true, years: '3 years hosting', topPct: 'Top 10% of homes' },
    highlight: 'This home is highly ranked based on ratings, reviews, and reliability.',
    area: 'In the hills above Half Moon Bay',
    areaDetail: 'On a 10-acre mountainside with ocean views toward Half Moon Bay and trails nearby',
    descriptionTitle: 'Breathe deep in nature on Kings Mountain CA.',
    description: 'Our safari-style tents blend comfort and adventure. Wake to birdsong, brew coffee on the deck, and watch fog lift off the ocean. Thoughtful hosts, a wood stove for cool nights, and trails right outside.',
    sleepTitle: 'Safari tent with a private deck',
    sleepDetail: 'A 210 sq ft safari tent on a wooden deck with a wood stove, fire pit, and down bedding.',
    viewTitle: 'Stunning views and thoughtful hosts',
    viewDetail: 'Guests describe the views as breathtaking and praise hosts William and Sana by name.',
    priceNow: '$304',
    priceWas: '$336',
    priceNote: 'For 1 night · Sep 30 – Oct 1',
    freeCancellation: true,
    photos: [
        { file: img.t01, category: 'Bedroom', caption: 'Queen bed · 2 single beds · Bed linens · Clothing storage · Essentials · Extra pillows and blankets' },
        { file: img.t02, category: 'Full bathroom', caption: 'Toilet · Shower · Hot water · Towels · Soap · Toilet paper' },
        { file: img.t03, category: 'Backyard', caption: 'Fire pit · Patio · Garden · Mountain view · Outdoor seating' },
        { file: img.t04, category: 'Balcony', caption: 'Ocean view · Lounge chairs · Railing · Open air' },
        { file: img.t05, category: 'Exterior', caption: 'Wooden deck · Wood stove · Chairs · Forest setting' },
        { file: img.t06, category: 'Deck', caption: 'Ocean view · Lounge chairs · Evening light' },
    ] as Photo[],
};
export const photoCategories = ['Bedroom', 'Full bathroom', 'Backyard', 'Balcony', 'Exterior', 'Deck'];
export const PHOTO_TOTAL = 95;
export const destinations = [
    { name: 'Nearby', sub: 'Find what’s around you', photo: img.h01 },
    { name: 'Lake Tahoe', sub: 'Popular lake destination', photo: img.h02 },
    { name: 'South Lake Tahoe, CA', sub: 'For nature-lovers', photo: img.h03 },
    { name: 'Los Angeles, CA', sub: 'For sights like Universal Studios Hollywood', photo: img.h04 },
];
export const filterChips = ['Free parking', 'Self check-in', '1+ bathrooms', 'Allows pets'];
export const mapPins = [
    { x: 0.27, y: 0.30, label: '$231' },
    { x: 0.45, y: 0.27, label: '$246' },
    { x: 0.62, y: 0.35, label: '$247' },
    { x: 0.50, y: 0.52, label: '$205' },
    { x: 0.30, y: 0.55, label: '$128' },
    { x: 0.70, y: 0.58, label: '$255' },
    { x: 0.38, y: 0.42, label: '$304' },
    { x: 0.58, y: 0.45, label: '$185' },
];
