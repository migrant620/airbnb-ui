/**
 * Fictional listing content for the prototype.
 *
 * All names, hosts and reviews are invented. Real city/region names
 * (Lake Tahoe, South Lake Tahoe, Tahoma, California, Bolinas, Half Moon Bay,
 * Oakland, Woodside, etc.) are used as plausible locations only.
 *
 * Photo filenames point at generated, original images in assets/images.
 */

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

export type Photo = { file: number; category: string; caption: string };

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

/** Explore feed — first row (homes, "Guest favorite"). */
export const feedHomes: Listing[] = [
  { id: 'h-a', title: 'Home in South Lake Tahoe', location: 'South Lake Tahoe, California', badge: 'Guest favorite', rating: 4.99, reviews: 214, priceForNights: '$990 for 2 nights', priceNote: '2 nights', photo: img.h01 },
  { id: 'h-b', title: 'Home in South Lake Tahoe', location: 'South Lake Tahoe, California', badge: 'Guest favorite', rating: 4.97, reviews: 188, priceForNights: '$1,445 for 2 nights', priceNote: '2 nights', photo: img.h02 },
  { id: 'h-c', title: 'Cabin in Tahoma', location: 'Tahoma, California', badge: 'Guest favorite', rating: 4.97, reviews: 132, priceForNights: '$697 for 2 nights', priceNote: '2 nights', photo: img.h03 },
];

/** Explore feed — second row (hotels). */
export const feedHotels: Listing[] = [
  { id: 'ht-a', title: 'Sandpiper Venice Beach Inn', location: 'Venice, California', rating: 4.6, reviews: 540, priceForNights: '$157 for 2 nights', priceNote: '2 nights', photo: img.h04 },
  { id: 'ht-b', title: 'Canyon Rest Inn Eagle Rock', location: 'Eagle Rock, California', rating: 4.75, reviews: 412, priceForNights: '$396 for 2 nights', priceNote: '2 nights', photo: img.h05 },
  { id: 'ht-c', title: 'Larkspur West Hollywood', location: 'West Hollywood, California', rating: 4.79, reviews: 623, priceForNights: '$768 for 2 nights', priceNote: '2 nights', photo: img.h06 },
];

/**
 * The one card the "Homes nearby" map sheet shows. The device folds the whole card into a single
 * accessibility description, so the parts the description is assembled from are kept as fields and the
 * description itself is rebuilt from them (see `mapResultLabel`) instead of being typed out twice.
 */
export type MapResult = {
  id: string;
  /** Listing name, as the device spells it inside the card description. */
  name: string;
  /** Card heading; the device reads it before the rating. */
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
  name: 'Tent 03 - Overlook w/ocean view',
  location: 'Tent in Woodside',
  badge: 'Guest favorite',
  rating: 4.97,
  reviews: 76,
  beds: '1 queen bed',
  baths: '1 bath',
  priceForNights: '$304 for 1 night',
  priceWas: '$336',
  photo: img.h03,
};

/**
 * The card's accessibility description, in the order the device builds it:
 * "<badge>. <location>. <rating> out of 5 average rating, <reviews> reviews. <name>. <beds> · <baths> .
 * <price>, originally <was>. Free cancellation."
 */
export const mapResultLabel = (l: MapResult) =>
  `${l.badge}. ${l.location}. ${l.rating} out of 5 average rating, ${l.reviews} reviews. ` +
  `${l.name}. ${l.beds} · ${l.baths} . ${l.priceForNights}, originally ${l.priceWas}. Free cancellation.`;

/**
 * Map pins for the "Homes nearby" state, reproduced at the boxes the interface reports.
 *
 * The interface caught the pin layer mid-entry: twelve pins had expanded to their priced pill and eight
 * were still the blank placeholder pill, and most of those eight sit underneath a priced pin. Their
 * positions and sizes are part of the recorded state, so they are kept verbatim rather than recomputed
 * from the listing coordinates. `y` is relative to the map's own top edge (127.7 dp on screen).
 *
 * `label` is the pin's accessibility description; the device includes the price in it, so the visible
 * price run is a child of that description rather than a separate node.
 */
export type MapPin = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  price: string;
  /** Placeholder form: the interface shows an empty pill for these, with no price drawn yet. */
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

/**
 * The listing shown on the listing-detail and photo-tour screens.
 *
 * Fictional sample copy. Line breaks come from the width of the box each run is given, not from
 * breaks inserted into the text.
 */
export const detailListing = {
  id: 'd-montara',
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
  /** The highlight band: four title/copy pairs, laid out as the interface shows them. The reference
      carries all four ("Top 10% of homes" first, 115.4 dp wide); `R.bandTops`/`R.bandTitleW` both hold
      four entries and the render indexes them by block, so dropping the first one mis-indexed the rest
      and truncated each title. All four are listed here. */
  blocks: [
    { title: 'Top 10% of homes', desc: 'This home is highly ranked based on ratings, reviews, and reliability.' },
    { title: 'In the hills above Half Moon Bay', desc: 'On a 10-acre mountainside with ocean views toward Half Moon Bay and trails nearby' },
    { title: 'Safari tent with a private deck', desc: 'A 210 sq ft safari tent on a wooden deck with a wood stove, fire pit, and down bedding' },
    { title: 'Stunning views and thoughtful hosts', desc: 'Guests describe the views as breathtaking and praise hosts William and Sana by name' },
  ],
  body:
    'Breathe deep in nature on Kings Mountain CA. Our safari-style tents blend comfort and adventure with ' +
    'real beds, down comforters, cotton linens, lighting, indoor/outdoor furniture, a mini fridge, ' +
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

/** Total photo count shown in the hero / photo-tour counter. The interface
 *  reads "1 / 95"; we cycle the six generated images over that count. */
export const PHOTO_TOTAL = 95;

export const destinations = [
  { name: 'Nearby', sub: 'Find what’s around you', photo: img.h01 },
  { name: 'Lake Tahoe', sub: 'Popular lake destination', photo: img.h02 },
  { name: 'South Lake Tahoe, CA', sub: 'For nature-lovers', photo: img.h03 },
  /* The reference breaks this run after "like": its own text carries non-breaking spaces inside
     "Universal Studios Hollywood", so that phrase is one unbreakable token and wraps as a whole. */
  { name: 'Los Angeles, CA', sub: 'For sights like Universal\u00a0Studios\u00a0Hollywood', photo: img.h04 },
];

export const filterChips = ['Free parking', 'Self check-in', '1+ bathrooms', 'Allows pets'];

/**
 * A feed-card view of the listing-detail screen's stay.
 *
 * The wishlist renders every saved stay with the same card the explore rail uses, so the detail
 * page's richer copy is folded down to the fields a `Listing` card reads. Only those fields are
 * carried over; the detail page keeps its own, fuller data.
 */
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

/**
 * The listing-detail screen's review list (GOAL §4 P1, "评价列表").
 *
 * Every reviewer name and every line of review text below is invented for the prototype; no real
 * person or review is reproduced. The avatars are the prototype's own generated photos, reused the
 * same way the detail page reuses one for the host. The summary figures (the overall score and the
 * "76 reviews" count) are the ones the detail screen's reviews band already shows, so the two stay
 * consistent.
 */
export type Review = {
  id: string;
  /** Reviewer's first name, as the card shows it. */
  name: string;
  /** The stay's month and year, spelled as the product spells it. */
  meta: string;
  text: string;
  /** Generated photo used as the reviewer's avatar. */
  photo: number;
};

/** Per-category scores under the overall rating, in the order the summary stacks them. */
export const reviewBreakdown: { label: string; value: number }[] = [
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

/**
 * The listing-detail screen's amenity list (GOAL §4 P1, "设施全列表").
 *
 * The detail screen's own captured state ends at the description, so it carries no amenity block; the
 * section that draws this list sits below that point and opens its own full page, the way the product
 * stacks its "what this place offers" section under the copy. Every label is a generic product term,
 * the grouping follows the product's own section order (views, bathroom, bedroom and laundry, and so
 * on), and nothing here is account-backed or sent anywhere — it is a local, appearance-only view of the
 * same fictional stay the rest of the detail screen shows.
 */
export type AmenityGlyph =
  | 'view' | 'tree' | 'drop' | 'washer' | 'bed' | 'tv' | 'ac' | 'heat'
  | 'alarm' | 'wifi' | 'kitchen' | 'door' | 'flame' | 'car' | 'pool' | 'paw';

export type Amenity = {
  label: string;
  /** Which mark the row draws; several labels share one. */
  glyph: AmenityGlyph;
};

export type AmenityGroup = { title: string; items: Amenity[] };

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

/** The count the detail page's full-list button quotes ("Show all N amenities"). */
export const amenityTotal = detailAmenities.reduce((n, g) => n + g.items.length, 0);

/** The short set the detail page previews, stacked two columns wide. */
export const amenityPreview: Amenity[] = [
  { label: 'Kitchen', glyph: 'kitchen' },
  { label: 'Wifi', glyph: 'wifi' },
  { label: 'TV', glyph: 'tv' },
  { label: 'Pool', glyph: 'pool' },
  { label: 'Washer', glyph: 'washer' },
  { label: 'Heating', glyph: 'heat' },
];
