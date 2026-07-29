// Demo data for Cumilla Resort — all guest-facing text is bilingual {en, bn}.

export const IMG = {
  heroHome: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lalmai_hills_hero.png',
  heroVillas: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_villa.png',
  heroExp: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dharmasagar_lake.png',
  heroDining: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dining_roshomalai.png',
  heroGallery: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lake_cottage.png',
  heroAbout: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
  heroOffers: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_couple_dining.png',
  heroContact: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lalmai_hills_hero.png',
  heroBooking: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_villa.png',
  collage1: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
  collage2: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_pool.png',
  cta: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_couple_dining.png',
};

export const villas = [
  {
    slug: 'lalmai-hill-villa',
    name: { en: 'Lalmai Hill Villa', bn: 'লালমাই হিল ভিলা' },
    tag: { en: 'Most Loved', bn: 'সবচেয়ে জনপ্রিয়' },
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lalmai_hills_hero.png',
    img2: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_villa.png',
    img3: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lake_cottage.png',
    guests: 2, beds: { en: 'King Bed', bn: 'কিং বেড' }, size: 68, price: 12500, units: 10,
    desc: {
      en: 'Wake to mist rolling over the Lalmai Hills from your private veranda. Floor-to-ceiling glass on three sides, an outdoor rain shower, and the scent of wildflowers at first light.',
      bn: 'নিজের বারান্দা থেকে দেখুন লালমাই পাহাড়ের ঢালে কুয়াশা নামছে। তিন দিকে মেঝে-থেকে-ছাদ কাচ, খোলা আকাশের নিচে রেইন শাওয়ার, আর ভোরের আলোয় বুনো ফুলের ঘ্রাণ।',
    },
    amenities: [
      { en: 'Private veranda', bn: 'প্রাইভেট বারান্দা' }, { en: 'Outdoor rain shower', bn: 'আউটডোর রেইন শাওয়ার' },
      { en: 'Premium mini bar', bn: 'প্রিমিয়াম মিনি বার' }, { en: 'Air conditioning', bn: 'এয়ার কন্ডিশন' },
      { en: 'High-speed Wi-Fi', bn: 'হাই-স্পিড ওয়াই-ফাই' }, { en: 'Daily breakfast', bn: 'প্রতিদিন নাশতা' },
    ],
  },
  {
    slug: 'shalban-terracotta-cottage',
    name: { en: 'Shalban Terracotta Cottage', bn: 'শালবন টেরাকোটা কটেজ' },
    tag: { en: 'Signature', bn: 'সিগনেচার' },
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_terracotta_cottage.png',
    img2: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
    img3: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_pool.png',
    guests: 2, beds: { en: 'King Bed', bn: 'কিং বেড' }, size: 76, price: 18500, units: 8,
    desc: {
      en: 'Beautifully crafted cottage with terracotta brick relief, set beside Shalban forest. Large windows, bird songs at dawn, and a bathtub facing the garden.',
      bn: 'শালবনের পাশে লাল ইটের শৈল্পিক কারুকাজে তৈরি টেরাকোটা কটেজ। বড় জানালা, ভোরে পাখির ডাক আর বাগানের দিকে মুখ করা বাথটাব।',
    },
    amenities: [
      { en: 'Terracotta relief walls', bn: 'টেরাকোটা দেয়াল চিত্র' }, { en: 'Garden view bathtub', bn: 'গার্ডেন ভিউ বাথটাব' },
      { en: 'Archaeological guide book', bn: 'প্রত্নতাত্ত্বিক গাইড বই' }, { en: 'Air conditioning', bn: 'এয়ার কন্ডিশন' },
      { en: 'High-speed Wi-Fi', bn: 'হাই-স্পিড ওয়াই-ফাই' }, { en: 'Daily breakfast', bn: 'প্রতিদিন নাশতা' },
    ],
  },
  {
    slug: 'lake-cottage',
    name: { en: 'Dharmasagar Lake Cottage', bn: 'ধর্মসাগর লেক কটেজ' },
    tag: { en: 'Lakeside', bn: 'লেকের ধারে' },
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lake_cottage.png',
    img2: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dharmasagar_lake.png',
    img3: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lalmai_hills_hero.png',
    guests: 3, beds: { en: 'King + Day Bed', bn: 'কিং + ডে বেড' }, size: 84, price: 15000, units: 6,
    desc: {
      en: 'A stilted cottage over the lily-covered edge of the lake. Lotus blooms at your steps, kingfishers for neighbours, and a private jetty for sunrise boat rides.',
      bn: 'শাপলা-ঢাকা লেকের কিনারে খুঁটির উপর কটেজ। সিঁড়িতে পদ্মফুল, প্রতিবেশী মাছরাঙা, আর সূর্যোদয়ে নৌকা ভ্রমণের জন্য নিজস্ব ঘাট।',
    },
    amenities: [
      { en: 'Private jetty', bn: 'নিজস্ব ঘাট' }, { en: 'Sunrise boat ride', bn: 'সূর্যোদয়ে নৌকা ভ্রমণ' },
      { en: 'Lake-view bathtub', bn: 'লেক-ভিউ বাথটাব' }, { en: 'Air conditioning', bn: 'এয়ার কন্ডিশন' },
      { en: 'High-speed Wi-Fi', bn: 'হাই-স্পিড ওয়াই-ফাই' }, { en: 'Daily breakfast', bn: 'প্রতিদিন নাশতা' },
    ],
  },
  {
    slug: 'lalmai-pool-villa',
    name: { en: 'Lalmai Pool Villa', bn: 'লালমাই পুল ভিলা' },
    tag: { en: 'Private Pool', bn: 'প্রাইভেট পুল' },
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_pool.png',
    img2: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_villa.png',
    img3: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
    guests: 4, beds: { en: '2 King Beds', bn: '২টি কিং বেড' }, size: 140, price: 28000, units: 5,
    desc: {
      en: 'A walled garden villa with its own plunge pool, a shaded sala for afternoon tea, and two bedrooms opening onto the lush green lawns.',
      bn: 'দেয়ালঘেরা বাগান ভিলা সাথে নিজস্ব প্লাঞ্জ পুল। বিকেলের চায়ের জন্য ছায়াঘেরা সালা, আর সবুজের দিকে খোলা দুটি শয়নকক্ষ।',
    },
    amenities: [
      { en: 'Private plunge pool', bn: 'প্রাইভেট প্লাঞ্জ পুল' }, { en: 'Garden sala', bn: 'বাগান সালা' },
      { en: 'Outdoor dining pavilion', bn: 'খোলা ডাইনিং প্যাভিলিয়ন' }, { en: 'Air conditioning', bn: 'এয়ার কন্ডিশন' },
      { en: 'High-speed Wi-Fi', bn: 'হাই-স্পিড ওয়াই-ফাই' }, { en: 'Butler service', bn: 'বাটলার সেবা' },
    ],
  },
  {
    slug: 'family-heritage-residence',
    name: { en: 'Family Heritage Residence', bn: 'ফ্যামিলি হেরিটেজ রেসিডেন্স' },
    tag: { en: 'Family', bn: 'পরিবার' },
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_villa.png',
    img2: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_terracotta_cottage.png',
    img3: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lake_cottage.png',
    guests: 6, beds: { en: '3 Bedrooms', bn: '৩টি শয়নকক্ষ' }, size: 210, price: 35000, units: 2,
    desc: {
      en: 'Three bedrooms around a central courtyard with a firepit, featuring traditional terracotta architecture and a private chef for family meals.',
      bn: 'ফায়ারপিটসহ কেন্দ্রীয় উঠান ঘিরে তিনটি শয়নকক্ষ, লাল ইটের ঐতিহ্যবাহী স্থাপত্য, আর পারিবারিক খাবারের জন্য নিজস্ব বাবুর্চি।',
    },
    amenities: [
      { en: 'Private cook', bn: 'নিজস্ব বাবুর্চি' }, { en: 'Courtyard firepit', bn: 'উঠানে ফায়ারপিট' },
      { en: 'Kids bunk loft', bn: 'শিশুদের বাঙ্ক-লফট' }, { en: 'Air conditioning', bn: 'এয়ার কন্ডিশন' },
      { en: 'High-speed Wi-Fi', bn: 'হাই-স্পিড ওয়াই-ফাই' }, { en: 'Daily breakfast', bn: 'প্রতিদিন নাশতা' },
    ],
  },
  {
    slug: 'presidential-lalmai-suite',
    name: { en: 'Presidential Lalmai Suite', bn: 'প্রেসিডেনশিয়াল লালমাই স্যুট' },
    tag: { en: 'Presidential', bn: 'প্রেসিডেনশিয়াল' },
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_villa.png',
    img2: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dharmasagar_lake.png',
    img3: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_pool.png',
    guests: 4, beds: { en: '2 King Beds', bn: '২টি কিং বেড' }, size: 320, price: 52000, units: 1,
    desc: {
      en: 'The highest point of the resort: a glass-walled suite with a 270° view of Lalmai Hills, infinity pool, and a dedicated host around the clock.',
      bn: 'রিসোর্টের সর্বোচ্চ চূড়ায়: লালমাই পাহাড়ের ২৭০° দৃশ্যসহ কাচঘেরা স্যুট, ইনফিনিটি পুল, আর সার্বক্ষণিক ব্যক্তিগত হোস্ট।',
    },
    amenities: [
      { en: 'Infinity pool', bn: 'ইনফিনিটি পুল' }, { en: 'Private jacuzzi', bn: 'নিজস্ব জাকুজি' },
      { en: '24/7 dedicated host', bn: '২৪/৭ ব্যক্তিগত হোস্ট' }, { en: 'Wine & tea cellar', bn: 'ওয়াইন ও চা ভাণ্ডার' },
      { en: 'High-speed Wi-Fi', bn: 'হাই-স্পিড ওয়াই-ফাই' }, { en: 'Airport transfer', bn: 'বিমানবন্দর ট্রান্সফার' },
    ],
  },
];

export const experiences = [
  {
    icon: 'tea',
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lalmai_hills_hero.png',
    name: { en: 'Mainamati Ruins & Heritage Tour', bn: 'ময়নামতি ধ্বংসাবশেষ ও ঐতিহ্যবাহী ট্যুর' },
    desc: { en: 'Explore the ancient 8th-century Buddhist ruins of Mainamati and Shalban Vihara with our expert guides, appreciating the beautiful terracotta plaques and heritage.', bn: 'আমাদের অভিজ্ঞ গাইডের সাথে ময়নামতি ও শালবন বিহারের ৮ম শতাব্দীর প্রাচীন বৌদ্ধ ধ্বংসাবশেষ ঘুরে দেখুন এবং চমৎকার টেরাকোটা ও প্রত্নতাত্ত্বিক ঐতিহ্য উপভোগ করুন।' },
    duration: { en: '3 hours', bn: '৩ ঘণ্টা' }, level: 'easy', price: 1500,
  },
  {
    icon: 'tree',
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
    name: { en: 'Lalmai Hills & Shalban Vihara Trek', bn: 'লালমাই পাহাড় ও শালবন বিহার ট্রেক' },
    desc: { en: 'A fresh morning trek across the scenic red clay trails of Lalmai Hills, visiting the archaeological excavation sites with our resident historian.', bn: 'আমাদের ইতিহাসবিদের সাথে ভোরে লালমাই পাহাড়ের নয়নাভিরাম লালমাটি ট্রেইলে হেঁটে প্রাচীন খনন কাজ ও প্রত্নতাত্ত্বিক স্থানসমূহ ঘুরে দেখুন।' },
    duration: { en: '4 hours', bn: '৪ ঘণ্টা' }, level: 'moderate', price: 2500,
  },
  {
    icon: 'boat',
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lake_cottage.png',
    name: { en: 'Dharmasagar Lake Boat Ride', bn: 'ধর্মসাগর লেকে নৌকা ভ্রমণ' },
    desc: { en: 'Glide between water lilies at golden hour on a hand-rowed country boat in Dharmasagar, enjoying the sunset with local snacks and tea.', bn: 'গোধূলিবেলায় ধর্মসাগর দিঘির বুকে দেশি নৌকায় শাপলার ফাঁকে ভেসে চলুন — উপভোগ করুন সূর্যাস্ত, সাথে ঐতিহ্যবাহী কুমিলা রসমলাই ও চা।' },
    duration: { en: '2 hours', bn: '২ ঘণ্টা' }, level: 'easy', price: 1200,
  },
  {
    icon: 'bird',
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dharmasagar_lake.png',
    name: { en: 'Moynamoti War Cemetery Tour', bn: 'ময়নামতি ওয়ার সেমেট্রি ট্যুর' },
    desc: { en: 'A quiet, serene morning walk through the beautifully landscaped Moynamoti World War II Cemetery, learning about the local history with our guides.', bn: 'আমাদের গাইডের সাথে সুন্দর ও মনোরম ময়নামতি দ্বিতীয় বিশ্বযুদ্ধ সমাধি ক্ষেত্রে ভোরের শান্ত ও নিরিবিলি হাঁটা এবং ইতিহাস সম্পর্কে বিস্তারিত জানুন।' },
    duration: { en: '5 hours', bn: '৫ ঘণ্টা' }, level: 'easy', price: 2200,
  },
  {
    icon: 'bike',
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
    name: { en: 'Village Cycling Trail', bn: 'গ্রামের পথে সাইক্লিং' },
    desc: { en: 'Pedal shaded lanes through archaeological areas, local villages and green pathways, stopping for fresh coconut and local stories.', bn: 'প্রত্নতাত্ত্বিক এলাকা, গ্রামীণ জনপদ আর সবুজের ছায়াঢাকা মেঠোপথ দিয়ে সাইকেল চালান — উপভোগ করুন ডাব ও গ্রামীণ আতিথেয়তা।' },
    duration: { en: '3 hours', bn: '৩ ঘণ্টা' }, level: 'moderate', price: 1000,
  },
  {
    icon: 'music',
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dining_roshomalai.png',
    name: { en: 'Terracotta Clay Art Workshop', bn: 'টেরাকোটা আর্ট ওয়ার্কশপ' },
    desc: { en: 'Learn the ancient art of terracotta clay carving from local Cumilla artisans, shaping your own design and enjoying a fire-lit traditional dinner.', bn: 'কুমিল্লার স্থানীয় শিল্পীদের কাছে টেরাকোটা মাটির কারুকাজ শিখুন, নিজের ডিজাইন গড়ুন এবং সন্ধ্যায় লোকজ সংগীতের সাথে ডিনার উপভোগ করুন।' },
    duration: { en: '4 hours', bn: '৪ ঘণ্টা' }, level: 'easy', price: 3000,
  },
];

export const restaurants = [
  {
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dining_roshomalai.png',
    name: { en: 'Moynamoti — The Heritage Table', bn: 'ময়নামতি — ঐতিহ্যের টেবিল' },
    cuisine: { en: 'Bengali heritage cuisine', bn: 'ঐতিহ্যবাহী বাঙালি রান্না' },
    hours: { en: '7:00 — 22:30', bn: 'সকাল ৭টা — রাত সাড়ে ১০টা' },
    desc: { en: 'Slow-cooked Bengali classics in a traditional red-brick pavilion: bhuna khichuri on rainy days, local river fish curries, and Cumilla Roshomalai to finish.', bn: 'ঐতিহ্যবাহী লাল ইটের প্যাভিলিয়নে ধীর আঁচের বাঙালি রান্না: বৃষ্টির দিনে ভুনা খিচুড়ি, স্থানীয় নদীর সুস্বাদু মাছের তরকারি, আর শেষ পাতে কুমিল্লার বিখ্যাত রসমলাই।' },
    dishes: [
      { en: 'Shorshe Ilish', bn: 'সর্ষে ইলিশ' }, { en: 'Bhuna Khichuri', bn: 'ভুনা খিচুড়ি' },
      { en: 'Cumilla Khashi Bhuna', bn: 'কুমিল্লার খাসি ভুনা' }, { en: 'Cumilla Roshomalai', bn: 'কুমিল্লার রসমলাই' },
    ],
  },
  {
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lalmai_hills_hero.png',
    name: { en: 'The Lalmai Lounge', bn: 'লালমাই লাউঞ্জ' },
    cuisine: { en: 'Estate teas & light bites', bn: 'বাগানের চা ও হালকা নাশতা' },
    hours: { en: '10:00 — 20:00', bn: 'সকাল ১০টা — রাত ৮টা' },
    desc: { en: 'A glass lounge floating over the green slopes. Premium teas, traditional Roshomalai dessert platters, and fresh pithas baked each afternoon.', bn: 'সবুজ পাহাড়ের ঢালের উপর ভাসমান কাচের লাউঞ্জ। প্রিমিয়াম চা, কুমিল্লার রসমলাই ডেজার্ট প্লেটার এবং প্রতি বিকেলে গরম পিঠা।' },
    dishes: [
      { en: 'Roshomalai Platter', bn: 'রসমলাই প্লেটার' }, { en: 'Premium Green Tea', bn: 'প্রিমিয়াম গ্রিন টি' },
      { en: 'Bhapa Pitha', bn: 'ভাপা পিঠা' }, { en: 'Lalmai Special Tea', bn: 'লালমাই স্পেশাল চা' },
    ],
  },
  {
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_couple_dining.png',
    name: { en: 'Agun — Fire & Stars', bn: 'আগুন — ফায়ার অ্যান্ড স্টারস' },
    cuisine: { en: 'Open-fire grill, dinner only', bn: 'খোলা আগুনের গ্রিল, শুধু ডিনার' },
    hours: { en: '18:30 — 23:00', bn: 'সন্ধ্যা সাড়ে ৬টা — রাত ১১টা' },
    desc: { en: 'A clearing on the hills, a wood fire, and a chef’s grill under the stars — fresh barbecue, bamboo sticky rice, and lanterns among the trees.', bn: 'পাহাড়ের এক ফাঁকা জায়গা, কাঠের আগুন, তারাভরা আকাশের নিচে শেফের গ্রিল — সুস্বাদু বারবিকিউ, বাঁশে ভাপানো ভাত, আর গাছে গাছে লণ্ঠন।' },
    dishes: [
      { en: 'Grilled River Ayre', bn: 'গ্রিলড নদীর আইড়' }, { en: 'Bamboo Sticky Rice', bn: 'বাঁশে ভাপানো ভাত' },
      { en: 'Charred Pineapple', bn: 'পোড়া আনারস' }, { en: 'Smoked Duck Bhuna', bn: 'স্মোকড হাঁস ভুনা' },
    ],
  },
];

export const offers = [
  {
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_couple_dining.png',
    name: { en: 'Honeymoon in the Mist', bn: 'কুয়াশায় হানিমুন' },
    desc: { en: '3 nights in a Terracotta Cottage, romantic candle-lit dinner at Agun, guided heritage walk, and a sunrise boat ride.', bn: 'টেরাকোটা কটেজে ৩ রাত, আগুনে তারাভরা ডিনার, গাইডসহ হেরিটেজ ওয়াক আর সূর্যোদয়ে নৌকা ভ্রমণ।' },
    price: 64000, unit: 'perCouple', till: { en: '30 Sep 2026', bn: '৩০ সেপ্টেম্বর ২০২৬' }, save: 18,
  },
  {
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png',
    name: { en: 'Monsoon Escape', bn: 'বর্ষা অবকাশ' },
    desc: { en: '2 nights in a Lalmai Hill Villa, guided nature trail, bhuna khichuri lunches and unlimited local snacks.', bn: 'লালমাই হিল ভিলায় ২ রাত, গাইডসহ পাহাড়ী ট্রেইল, দুপুরে ভুনা খিচুড়ি আর কুমিল্লার রসমলাই।' },
    price: 26500, unit: 'perCouple', till: { en: '31 Aug 2026', bn: '৩১ আগস্ট ২০২৬' }, save: 22,
  },
  {
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_villa.png',
    name: { en: 'Family Forest Holiday', bn: 'পারিবারিক বন ছুটি' },
    desc: { en: '3 nights in the Family Residence, archaeological explorer trek, cycling trail and a private firepit dinner.', bn: 'ফ্যামিলি রেসিডেন্সে ৩ রাত, প্রত্নতাত্ত্বিক এক্সপ্লোরার ট্রেক, সাইক্লিং আর ফায়ারপিটে প্রাইভেট ডিনার।' },
    price: 115000, unit: 'perFamily', till: { en: '31 Dec 2026', bn: '৩১ ডিসেম্বর ২০২৬' }, save: 15,
  },
  {
    img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lalmai_hills_hero.png',
    name: { en: 'Terracotta Harvest Festival', bn: 'টেরাকোটা উৎসবের মৌসুম' },
    desc: { en: '2 nights at festival time: craft clay designs with local artisans, blend your own tea, and take a handmade terracotta piece home.', bn: 'উত্সবের সময়ে ২ রাত: মৃৎশিল্পীদের সাথে মাটির পাত্র গড়ুন, টেরাকোটা আর্ট শিখুন এবং নিজের তৈরি একটি টেরাকোটা স্মারক বাড়ি নিয়ে যান।' },
    price: 29000, unit: 'perCouple', till: { en: '15 Jul 2026', bn: '১৫ জুলাই ২০২৬' }, save: 12,
  },
];

export const team = [
  { img: 'https://i.pravatar.cc/200?img=5', name: { en: 'Maya Rahman', bn: 'মায়া রহমান' }, role: { en: 'General Manager', bn: 'জেনারেল ম্যানেজার' } },
  { img: 'https://i.pravatar.cc/200?img=13', name: { en: 'Kamal Uddin', bn: 'কমাল উদ্দিন' }, role: { en: 'Estate Manager', bn: 'এস্টেট ম্যানেজার' } },
  { img: 'https://i.pravatar.cc/200?img=31', name: { en: 'Rina Debbarma', bn: 'রিনা দেববর্মা' }, role: { en: 'Head Naturalist', bn: 'প্রধান প্রকৃতিবিদ' } },
  { img: 'https://i.pravatar.cc/200?img=60', name: { en: 'Chef Anwar Hossain', bn: 'শেফ আনোয়ার হোসেন' }, role: { en: 'Executive Chef', bn: 'এক্সিকিউティブ শেফ' } },
];

export const galleryImages = [
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lalmai_hills_hero.png', cat: 'nature' },
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_shalban_vihara.png', cat: 'nature' },
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_lake_cottage.png', cat: 'nature' },
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_villa.png', cat: 'villas' },
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_terracotta_cottage.png', cat: 'villas' },
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dining_roshomalai.png', cat: 'dining' },
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_dharmasagar_lake.png', cat: 'nature' },
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_couple_dining.png', cat: 'dining' },
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_resort_pool.png', cat: 'villas' },
  { src: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/cumilla_eco_garden.png', cat: 'nature' },
];

export const adminBookings = [
  { ref: 'NR-1042', guest: { en: 'Farzana Akter', bn: 'ফারজানা আক্তার' }, avatar: 33, villa: { en: 'Treehouse 03', bn: 'ট্রিহাউস ০৩' }, in: { en: 'Jun 12', bn: '১২ জুন' }, out: { en: 'Jun 15', bn: '১৫ জুন' }, channel: { en: 'Direct', bn: 'সরাসরি' }, total: 55500, status: 'confirmed' },
  { ref: 'NR-1041', guest: { en: 'Tanvir Hasan', bn: 'তানভীর হাসান' }, avatar: 14, villa: { en: 'Tea Villa 07', bn: 'চা ভিলা ০৭' }, in: { en: 'Jun 11', bn: '১১ জুন' }, out: { en: 'Jun 14', bn: '১৪ জুন' }, channel: { en: 'Booking.com', bn: 'Booking.com' }, total: 37500, status: 'pending' },
  { ref: 'NR-1040', guest: { en: 'Aiko Tanaka', bn: 'আইকো তানাকা' }, avatar: 26, villa: { en: 'Residence 01', bn: 'রেসিডেন্স ০১' }, in: { en: 'Jun 10', bn: '১০ জুন' }, out: { en: 'Jun 17', bn: '১৭ জুন' }, channel: { en: 'Direct', bn: 'সরাসরি' }, total: 245000, status: 'checkedIn' },
  { ref: 'NR-1039', guest: { en: 'Marcus Webb', bn: 'মার্কাস ওয়েব' }, avatar: 58, villa: { en: 'Treehouse 06', bn: 'ট্রিহাউস ০৬' }, in: { en: 'Jun 9', bn: '৯ জুন' }, out: { en: 'Jun 12', bn: '১২ জুন' }, channel: { en: 'Expedia', bn: 'Expedia' }, total: 55500, status: 'cancelled' },
  { ref: 'NR-1038', guest: { en: 'Nusrat Jahan', bn: 'নুসরাত জাহান' }, avatar: 49, villa: { en: 'Lake Cottage 02', bn: 'লেক কটেজ ০২' }, in: { en: 'Jun 8', bn: '৮ জুন' }, out: { en: 'Jun 15', bn: '১৫ জুন' }, channel: { en: 'Direct', bn: 'সরাসরি' }, total: 105000, status: 'checkedIn' },
  { ref: 'NR-1037', guest: { en: 'Hannah Kim', bn: 'হানা কিম' }, avatar: 44, villa: { en: 'Pool Villa 03', bn: 'পুল ভিলা ০৩' }, in: { en: 'Jun 6', bn: '৬ জুন' }, out: { en: 'Jun 12', bn: '১২ জুন' }, channel: { en: 'Agent', bn: 'এজেন্ট' }, total: 168000, status: 'checkedIn' },
  { ref: 'NR-1036', guest: { en: 'Sakib Rahman', bn: 'সাকিব রহমান' }, avatar: 15, villa: { en: 'Tea Villa 04', bn: 'চা ভিলা ০৪' }, in: { en: 'Jun 7', bn: '৭ জুন' }, out: { en: 'Jun 13', bn: '১৩ জুন' }, channel: { en: 'Direct', bn: 'সরাসরি' }, total: 75000, status: 'checkedIn' },
  { ref: 'NR-1035', guest: { en: 'Isabella Moreau', bn: 'ইসাবেলা মোরো' }, avatar: 41, villa: { en: 'Treehouse 08', bn: 'ট্রিহাউস ০৮' }, in: { en: 'Jun 10', bn: '১০ জুন' }, out: { en: 'Jun 14', bn: '১৪ জুন' }, channel: { en: 'Direct', bn: 'সরাসরি' }, total: 74000, status: 'confirmed' },
  { ref: 'NR-1034', guest: { en: 'Mehzabin Khan', bn: 'মেহজাবিন খান' }, avatar: 68, villa: { en: 'Tea Villa 09', bn: 'চা ভিলা ০৯' }, in: { en: 'Jun 9', bn: '৯ জুন' }, out: { en: 'Jun 16', bn: '১৬ জুন' }, channel: { en: 'Booking.com', bn: 'Booking.com' }, total: 87500, status: 'checkedIn' },
  { ref: 'NR-1033', guest: { en: 'Rahim Chowdhury', bn: 'রহিম চৌধুরী' }, avatar: 20, villa: { en: 'Pool Villa 01', bn: 'পুল ভিলা ০১' }, in: { en: 'Jun 10', bn: '১০ জুন' }, out: { en: 'Jun 16', bn: '১৬ জুন' }, channel: { en: 'Direct', bn: 'সরাসরি' }, total: 168000, status: 'confirmed' },
  { ref: 'NR-1032', guest: { en: 'Noah Janssen', bn: 'নোয়া ইয়ানসেন' }, avatar: 36, villa: { en: 'Treehouse 02', bn: 'ট্রিহাউস ০২' }, in: { en: 'Jun 10', bn: '১০ জুন' }, out: { en: 'Jun 12', bn: '১২ জুন' }, channel: { en: 'Expedia', bn: 'Expedia' }, total: 37000, status: 'pending' },
  { ref: 'NR-1031', guest: { en: 'Liang Wei', bn: 'লিয়াং ওয়েই' }, avatar: 64, villa: { en: 'Suite 01', bn: 'স্যুট ০১' }, in: { en: 'Jun 10', bn: '১০ জুন' }, out: { en: 'Jun 17', bn: '১৭ জুন' }, channel: { en: 'Agent', bn: 'এজেন্ট' }, total: 364000, status: 'confirmed' },
];

export const adminGuests = [
  { avatar: 26, name: { en: 'Aiko Tanaka', bn: 'আইকো তানাকা' }, from: { en: 'Tokyo, JP', bn: 'টোকিও, জাপান' }, villa: { en: 'Residence 01', bn: 'রেসিডেন্স ০১' }, stay: { en: 'Jun 10 – 17', bn: '১০ – ১৭ জুন' }, prefs: { en: 'Vegan · early riser · yoga', bn: 'ভেগান · ভোরে ওঠেন · যোগ' }, spend: 268000, tier: 'gold',
    phone: '+81 90 1234 5678', email: 'aiko.tanaka@example.jp', nid: { en: 'Passport · TR8841290', bn: 'পাসপোর্ট · TR8841290' }, since: 2023, visits: 4,
    notes: { en: 'Prefers Residence wing. VIP welcome basket.', bn: 'রেসিডেন্স উইং পছন্দ। ভিআইপি ওয়েলকাম বাস্কেট।' },
    history: [
      { ref: 'NR-1040', villa: { en: 'Residence 01', bn: 'রেসিডেন্স ০১' }, dates: { en: 'Jun 10 – 17, 2026', bn: '১০ – ১৭ জুন ২০২৬' }, nights: 7, amount: 194000, status: 'checkedIn' },
      { ref: 'NR-0871', villa: { en: 'Pool Villa 02', bn: 'পুল ভিলা ০২' }, dates: { en: 'Nov 2 – 7, 2025', bn: '২ – ৭ নভেম্বর ২০২৫' }, nights: 5, amount: 121000, status: 'checkedOut' },
      { ref: 'NR-0512', villa: { en: 'Tea Villa 01', bn: 'চা ভিলা ০১' }, dates: { en: 'Mar 14 – 18, 2024', bn: '১৪ – ১৮ মার্চ ২০২৪' }, nights: 4, amount: 55000, status: 'checkedOut' },
    ] },
  { avatar: 49, name: { en: 'Nusrat Jahan', bn: 'নুসরাত জাহান' }, from: { en: 'Dhaka, BD', bn: 'ঢাকা, বাংলাদেশ' }, villa: { en: 'Lake Cottage 02', bn: 'লেক কটেজ ০২' }, stay: { en: 'Jun 8 – 15', bn: '৮ – ১৫ জুন' }, prefs: { en: 'Anniversary · romance package', bn: 'বিবাহবার্ষিকী · রোমান্স প্যাকেজ' }, spend: 125000, tier: 'silver',
    phone: '+880 1711 234567', email: 'nusrat.j@example.com', nid: { en: 'NID · 1992374415628', bn: 'এনআইডি · ১৯৯২৩৭৪৪১৫৬২৮' }, since: 2024, visits: 2,
    notes: { en: 'Anniversary couple — arrange lakeside dinner on Jun 12.', bn: 'বিবাহবার্ষিকী দম্পতি — ১২ জুন লেকের ধারে ডিনারের ব্যবস্থা করুন।' },
    history: [
      { ref: 'NR-1038', villa: { en: 'Lake Cottage 02', bn: 'লেক কটেজ ০২' }, dates: { en: 'Jun 8 – 15, 2026', bn: '৮ – ১৫ জুন ২০২৬' }, nights: 7, amount: 115500, status: 'checkedIn' },
      { ref: 'NR-0698', villa: { en: 'Lake Cottage 05', bn: 'লেক কটেজ ০৫' }, dates: { en: 'Jun 9 – 12, 2025', bn: '৯ – ১২ জুন ২০২৫' }, nights: 3, amount: 47400, status: 'checkedOut' },
    ] },
  { avatar: 15, name: { en: 'Sakib Rahman', bn: 'সাকিব রহমান' }, from: { en: 'Chattogram, BD', bn: 'চট্টগ্রাম, বাংলাদেশ' }, villa: { en: 'Tea Villa 04', bn: 'চা ভিলা ০৪' }, stay: { en: 'Jun 7 – 13', bn: '৭ – ১৩ জুন' }, prefs: { en: 'Birdwatching · halal only', bn: 'পাখি দেখা · শুধু হালাল' }, spend: 88000, tier: 'silver',
    phone: '+880 1819 876543', email: 'sakib.r@example.com', nid: { en: 'NID · 1987203398741', bn: 'এনআইডি · ১৯৮৭২০৩৩৯৮৭৪১' }, since: 2025, visits: 2,
    notes: { en: 'Keen birdwatcher — book dawn Lalmai walk with Rina.', bn: 'পাখি দেখায় আগ্রহী — রিনার সাথে ভোরের লালমাই হাঁটা বুক করুন।' },
    history: [
      { ref: 'NR-1036', villa: { en: 'Tea Villa 04', bn: 'চা ভিলা ০৪' }, dates: { en: 'Jun 7 – 13, 2026', bn: '৭ – ১৩ জুন ২০২৬' }, nights: 6, amount: 82500, status: 'checkedIn' },
      { ref: 'NR-0744', villa: { en: 'Tea Villa 08', bn: 'চা ভিলা ০৮' }, dates: { en: 'Dec 19 – 22, 2025', bn: '১৯ – ২২ ডিসেম্বর ২০২৫' }, nights: 3, amount: 41250, status: 'checkedOut' },
    ] },
  { avatar: 68, name: { en: 'Mehzabin Khan', bn: 'মেহজাবিন খান' }, from: { en: 'Sylhet, BD', bn: 'সিলেট, বাংলাদেশ' }, villa: { en: 'Tea Villa 09', bn: 'চা ভিলা ০৯' }, stay: { en: 'Jun 9 – 16', bn: '৯ – ১৬ জুন' }, prefs: { en: 'Photography · late checkout', bn: 'ফটোগ্রাফি · দেরিতে চেক-আউট' }, spend: 102500, tier: 'gold',
    phone: '+880 1612 445566', email: 'mehzabin.k@example.com', nid: { en: 'NID · 1995118876503', bn: 'এনআইডি · ১৯৯৫১১৮৮৭৬৫০৩' }, since: 2023, visits: 5,
    notes: { en: 'Travel photographer — grant sunrise rooftop access. Late checkout standing request.', bn: 'ট্রাভেল ফটোগ্রাফার — সূর্যোদয়ে ছাদে যাওয়ার অনুমতি দিন। দেরিতে চেক-আউট স্থায়ী অনুরোধ।' },
    history: [
      { ref: 'NR-1034', villa: { en: 'Tea Villa 09', bn: 'চা ভিলা ০৯' }, dates: { en: 'Jun 9 – 16, 2026', bn: '৯ – ১৬ জুন ২০২৬' }, nights: 7, amount: 96250, status: 'checkedIn' },
      { ref: 'NR-0802', villa: { en: 'Treehouse 04', bn: 'ট্রিহাউস ০৪' }, dates: { en: 'Sep 5 – 9, 2025', bn: '৫ – ৯ সেপ্টেম্বর ২০২৫' }, nights: 4, amount: 81400, status: 'checkedOut' },
      { ref: 'NR-0455', villa: { en: 'Tea Villa 02', bn: 'চা ভিলা ০২' }, dates: { en: 'Jan 20 – 23, 2024', bn: '২০ – ২৩ জানুয়ারি ২০২৪' }, nights: 3, amount: 41250, status: 'checkedOut' },
    ] },
  { avatar: 44, name: { en: 'Hannah Kim', bn: 'হানা কিম' }, from: { en: 'Seoul, KR', bn: 'সিউল, দক্ষিণ কোরিয়া' }, villa: { en: 'Pool Villa 03', bn: 'পুল ভিলা ০৩' }, stay: { en: 'Jun 6 – 12', bn: '৬ – ১২ জুন' }, prefs: { en: 'Quiet zone · pescatarian', bn: 'নিরিবিলি · মাছভোজী' }, spend: 196000, tier: 'platinum',
    phone: '+82 10 9876 5432', email: 'hannah.kim@example.kr', nid: { en: 'Passport · M70112358', bn: 'পাসপোর্ট · M70112358' }, since: 2022, visits: 6,
    notes: { en: 'Platinum member — quiet wing only, no housekeeping before 11am.', bn: 'প্লাটিনাম সদস্য — শুধু নিরিবিলি উইং, সকাল ১১টার আগে হাউসকিপিং নয়।' },
    history: [
      { ref: 'NR-1037', villa: { en: 'Pool Villa 03', bn: 'পুল ভিলা ০৩' }, dates: { en: 'Jun 6 – 12, 2026', bn: '৬ – ১২ জুন ২০২৬' }, nights: 6, amount: 145200, status: 'checkedIn' },
      { ref: 'NR-0913', villa: { en: 'Pool Villa 01', bn: 'পুল ভিলা ০১' }, dates: { en: 'Feb 11 – 16, 2026', bn: '১১ – ১৬ ফেব্রুয়ারি ২০২৬' }, nights: 5, amount: 121000, status: 'checkedOut' },
      { ref: 'NR-0577', villa: { en: 'Suite 01', bn: 'স্যুট ০১' }, dates: { en: 'Oct 1 – 5, 2024', bn: '১ – ৫ অক্টোবর ২০২৪' }, nights: 4, amount: 154000, status: 'checkedOut' },
    ] },
  { avatar: 11, name: { en: 'Oliver & Grace Bennett', bn: 'অলিভার ও গ্রেস বেনেট' }, from: { en: 'London, UK', bn: 'লন্ডন, যুক্তরাজ্য' }, villa: { en: 'Treehouse 05', bn: 'ট্রিহাউস ০৫' }, stay: { en: 'Jun 10 – 13', bn: '১০ – ১৩ জুন' }, prefs: { en: 'Honeymoon · tea tasting', bn: 'হানিমুন · চা টেস্টিং' }, spend: 64000, tier: 'silver',
    phone: '+44 7700 900123', email: 'bennett.o@example.co.uk', nid: { en: 'Passport · 533988201', bn: 'পাসপোর্ট · 533988201' }, since: 2026, visits: 1,
    notes: { en: 'Honeymoon — flower setup done, complimentary tea-tasting booked Jun 11.', bn: 'হানিমুন — ফুল দিয়ে সাজানো হয়েছে, ১১ জুন সৌজন্য চা-টেস্টিং বুক করা।' },
    history: [
      { ref: 'NR-1029', villa: { en: 'Treehouse 05', bn: 'ট্রিহাউস ০৫' }, dates: { en: 'Jun 10 – 13, 2026', bn: '১০ – ১৩ জুন ২০২৬' }, nights: 3, amount: 61050, status: 'checkedIn' },
    ] },
];

export const adminCheckins = [
  { avatar: 11, name: { en: 'Oliver & Grace Bennett', bn: 'অলিভার ও গ্রেস বেনেট' }, info: { en: 'Treehouse 05 · 3 nights', bn: 'ট্রিহাউস ০৫ · ৩ রাত' }, time: '14:00' },
  { avatar: 20, name: { en: 'Rahim Chowdhury', bn: 'রহিম চৌধুরী' }, info: { en: 'Pool Villa 01 · 6 nights · VIP', bn: 'পুল ভিলা ০১ · ৬ রাত · ভিআইপি' }, time: '15:30' },
  { avatar: 64, name: { en: 'Liang Family', bn: 'লিয়াং পরিবার' }, info: { en: 'Suite 01 · 7 nights', bn: 'স্যুট ০১ · ৭ রাত' }, time: '16:00' },
  { avatar: 36, name: { en: 'Noah Janssen', bn: 'নোয়া ইয়ানসেন' }, info: { en: 'Treehouse 02 · 2 nights', bn: 'ট্রিহাউস ০২ · ২ রাত' }, time: '17:15' },
  { avatar: 41, name: { en: 'Isabella Moreau', bn: 'ইসাবেলা মোরো' }, info: { en: 'Treehouse 08 · 4 nights · Honeymoon', bn: 'ট্রিহাউস ০৮ · ৪ রাত · হানিমুন' }, time: '18:00' },
];

export const adminTasks = [
  { villa: { en: 'Pool Villa 01', bn: 'পুল ভিলা ০১' }, task: { en: 'Full turnover — VIP arrival', bn: 'সম্পূর্ণ প্রস্তুতি — ভিআইপি আগমন' }, team: { en: 'Team A · Rina', bn: 'টিম এ · রিনা' }, priority: 'urgent', due: '13:30', status: 'inProgress' },
  { villa: { en: 'Treehouse 05', bn: 'ট্রিহাউস ০৫' }, task: { en: 'Honeymoon setup + turnover', bn: 'হানিমুন সাজসজ্জা + প্রস্তুতি' }, team: { en: 'Team B · Joynal', bn: 'টিম বি · জয়নাল' }, priority: 'high', due: '13:45', status: 'inProgress' },
  { villa: { en: 'Suite 01', bn: 'স্যুট ০১' }, task: { en: 'Deep clean + welcome setup', bn: 'গভীর পরিচ্ছন্নতা + অভ্যর্থনা' }, team: { en: 'Team C · Shapla', bn: 'টিম সি · শাপলা' }, priority: 'high', due: '15:00', status: 'queued' },
  { villa: { en: 'Tea Villa 06', bn: 'চা ভিলা ০৬' }, task: { en: 'Stay-over refresh', bn: 'অবস্থানকালীন পরিচ্ছন্নতা' }, team: { en: 'Team D · Monir', bn: 'টিম ডি · মনির' }, priority: 'normal', due: '16:00', status: 'queued' },
  { villa: { en: 'Lake Cottage 04', bn: 'লেক কটেজ ০৪' }, task: { en: 'Jetty railing repair', bn: 'ঘাটের রেলিং মেরামত' }, team: { en: 'Engineering', bn: 'প্রকৌশল' }, priority: 'urgent', due: '12:00', status: 'withVendor' },
  { villa: { en: 'Treehouse 07', bn: 'ট্রিহাউস ০৭' }, task: { en: 'Full turnover', bn: 'সম্পূর্ণ প্রস্তুতি' }, team: { en: 'Team A · Rina', bn: 'টিম এ · রিনা' }, priority: 'normal', due: '17:30', status: 'done' },
];

// Staff with full HR data: salary (monthly BDT), otRate (BDT/hr), weekly roster
// (Sat–Fri shift codes: M morning, E evening, N night, O off), attendance MTD
// (days, hours, ot hours, late days, leave days), payroll deduction & status.
export const adminStaff = [
  { avatar: 5, name: { en: 'Maya Rahman', bn: 'মায়া রহমান' }, role: { en: 'General Manager', bn: 'জেনারেল ম্যানেজার' }, dept: { en: 'Management', bn: 'ব্যবস্থাপনা' }, shift: 'morning', status: 'onDuty',
    salary: 185000, otRate: 0, week: ['M', 'M', 'M', 'M', 'M', 'O', 'M'], att: { days: 9, hours: 78, ot: 0, late: 0, leave: 0 }, deduction: 12500, payStatus: 'paid' },
  { avatar: 13, name: { en: 'Kamal Uddin', bn: 'কামাল উদ্দিন' }, role: { en: 'Estate Manager', bn: 'এস্টেট ম্যানেজার' }, dept: { en: 'Estate', bn: 'এস্টেট' }, shift: 'morning', status: 'onDuty',
    salary: 95000, otRate: 680, week: ['M', 'M', 'M', 'O', 'M', 'M', 'M'], att: { days: 9, hours: 81, ot: 5, late: 0, leave: 0 }, deduction: 6200, payStatus: 'paid' },
  { avatar: 60, name: { en: 'Anwar Hossain', bn: 'আনোয়ার হোসেন' }, role: { en: 'Executive Chef', bn: 'এক্সিকিউটিভ শেফ' }, dept: { en: 'F&B', bn: 'খাদ্য ও পানীয়' }, shift: 'evening', status: 'onDuty',
    salary: 110000, otRate: 790, week: ['E', 'E', 'E', 'E', 'O', 'E', 'E'], att: { days: 10, hours: 88, ot: 12, late: 1, leave: 0 }, deduction: 7400, payStatus: 'paid' },
  { avatar: 31, name: { en: 'Rina Debbarma', bn: 'রিনা দেববর্মা' }, role: { en: 'Head Naturalist', bn: 'প্রধান প্রকৃতিবিদ' }, dept: { en: 'Experiences', bn: 'অভিজ্ঞতা' }, shift: 'morning', status: 'onDuty',
    salary: 65000, otRate: 470, week: ['M', 'M', 'O', 'M', 'M', 'M', 'M'], att: { days: 9, hours: 74, ot: 4, late: 0, leave: 0 }, deduction: 4100, payStatus: 'pendingPay' },
  { avatar: 22, name: { en: 'Shapla Begum', bn: 'শাপলা বেগম' }, role: { en: 'Housekeeping Lead', bn: 'হাউসকিপিং প্রধান' }, dept: { en: 'Housekeeping', bn: 'হাউসকিপিং' }, shift: 'morning', status: 'onDuty',
    salary: 38000, otRate: 270, week: ['M', 'M', 'M', 'M', 'M', 'M', 'O'], att: { days: 10, hours: 86, ot: 9, late: 0, leave: 0 }, deduction: 2300, payStatus: 'paid' },
  { avatar: 53, name: { en: 'Joynal Abedin', bn: 'জয়নাল আবেদিন' }, role: { en: 'Front Office Manager', bn: 'ফ্রন্ট অফিস ম্যানেজার' }, dept: { en: 'Front Office', bn: 'ফ্রন্ট অফিস' }, shift: 'evening', status: 'onDuty',
    salary: 72000, otRate: 520, week: ['E', 'E', 'E', 'E', 'E', 'O', 'E'], att: { days: 9, hours: 79, ot: 6, late: 2, leave: 0 }, deduction: 4800, payStatus: 'paid' },
  { avatar: 17, name: { en: 'Monir Hossain', bn: 'মনির হোসেন' }, role: { en: 'Maintenance Engineer', bn: 'রক্ষণাবেক্ষণ প্রকৌশলী' }, dept: { en: 'Engineering', bn: 'প্রকৌশল' }, shift: 'night', status: 'offDuty',
    salary: 45000, otRate: 320, week: ['N', 'N', 'O', 'N', 'N', 'N', 'O'], att: { days: 8, hours: 70, ot: 11, late: 0, leave: 0 }, deduction: 2900, payStatus: 'pendingPay' },
  { avatar: 38, name: { en: 'Taslima Akter', bn: 'তাসলিমা আক্তার' }, role: { en: 'Assistant Manager', bn: 'सहकारी ब्यबस्थापक' }, dept: { en: 'Front Office', bn: 'ফ্রন্ট অফিস' }, shift: 'morning', status: 'onLeave',
    salary: 60000, otRate: 430, week: ['M', 'M', 'M', 'O', 'O', 'M', 'M'], att: { days: 7, hours: 58, ot: 0, late: 0, leave: 3 }, deduction: 3800, payStatus: 'paid' },
  { avatar: 47, name: { en: 'Rahela Khatun', bn: 'রাহেলা খাতুন' }, role: { en: 'Housekeeper', bn: 'হাউসকিপার' }, dept: { en: 'Housekeeping', bn: 'হাউসকিপিং' }, shift: 'morning', status: 'onDuty',
    salary: 25000, otRate: 180, week: ['M', 'M', 'M', 'M', 'O', 'M', 'M'], att: { days: 10, hours: 84, ot: 8, late: 1, leave: 0 }, deduction: 1500, payStatus: 'paid' },
  { avatar: 16, name: { en: 'Putul Rani', bn: 'পুতুল রানী' }, role: { en: 'Housekeeper', bn: 'হাউসকিপার' }, dept: { en: 'Housekeeping', bn: 'হাউসকিপিং' }, shift: 'evening', status: 'onDuty',
    salary: 24000, otRate: 175, week: ['E', 'E', 'O', 'E', 'E', 'E', 'E'], att: { days: 9, hours: 76, ot: 5, late: 0, leave: 1 }, deduction: 1450, payStatus: 'paid' },
  { avatar: 59, name: { en: 'Jashim Uddin', bn: 'জসিম উদ্দিন' }, role: { en: 'Senior Waiter', bn: 'সিনিয়র ওয়েটার' }, dept: { en: 'F&B', bn: 'খাদ্য ও পানীয়' }, shift: 'evening', status: 'onDuty',
    salary: 22000, otRate: 160, week: ['E', 'O', 'E', 'E', 'E', 'E', 'E'], att: { days: 10, hours: 87, ot: 10, late: 0, leave: 0 }, deduction: 1300, payStatus: 'pendingPay' },
  { avatar: 51, name: { en: 'Abdul Karim', bn: 'আব্দুল করিম' }, role: { en: 'Security Lead', bn: 'নিরাপত্তা প্রধান' }, dept: { en: 'Security', bn: 'নিরাপত্তা' }, shift: 'night', status: 'onDuty',
    salary: 26000, otRate: 185, week: ['N', 'N', 'N', 'O', 'N', 'N', 'N'], att: { days: 10, hours: 90, ot: 14, late: 0, leave: 0 }, deduction: 1600, payStatus: 'paid' },
];

// Today's cleaning log: who cleaned which villa, how long, room condition, inspection.
export const cleaningLog = [
  { villa: { en: 'Tea Villa 02', bn: 'চা ভিলা ০২' }, cleanerIdx: 8, time: '08:10', mins: 45, condition: 'good', inspection: 'inspected' },
  { villa: { en: 'Treehouse 05', bn: 'ট্রিহাউস ০৫' }, cleanerIdx: 4, time: '08:40', mins: 65, condition: 'good', inspection: 'inspected' },
  { villa: { en: 'Lake Cottage 01', bn: 'লেক কটেজ ০১' }, cleanerIdx: 9, time: '09:15', mins: 50, condition: 'fair', inspection: 'inspected' },
  { villa: { en: 'Pool Villa 01', bn: 'পুল ভিলা ০১' }, cleanerIdx: 8, time: '10:05', mins: 80, condition: 'good', inspection: 'inspected' },
  { villa: { en: 'Tea Villa 07', bn: 'চা ভিলা ০৭' }, cleanerIdx: 9, time: '10:50', mins: 40, condition: 'good', inspection: 'pendingInsp' },
  { villa: { en: 'Treehouse 03', bn: 'ট্রিহাউস ০৩' }, cleanerIdx: 4, time: '11:30', mins: 55, condition: 'needsRepair', inspection: 'inspected' },
  { villa: { en: 'Suite 01', bn: 'স্যুট ০১' }, cleanerIdx: 8, time: '12:20', mins: 95, condition: 'good', inspection: 'pendingInsp' },
  { villa: { en: 'Lake Cottage 04', bn: 'লেক কটেজ ০৪' }, cleanerIdx: 9, time: '13:00', mins: 45, condition: 'needsRepair', inspection: 'inspected' },
];

// 32 villas: 10 Tea Garden, 8 Treehouse, 6 Lake Cottage, 5 Pool Villa, 2 Residence, 1 Suite
export const roomTypes = [
  { key: 'tea', label: { en: 'Tea Villa', bn: 'চা ভিলা' }, count: 10 },
  { key: 'tree', label: { en: 'Treehouse', bn: 'ট্রিহাউস' }, count: 8 },
  { key: 'lake', label: { en: 'Lake Cottage', bn: 'লেক কটেজ' }, count: 6 },
  { key: 'pool', label: { en: 'Pool Villa', bn: 'পুল ভিলা' }, count: 5 },
  { key: 'res', label: { en: 'Residence', bn: 'রেসিডেন্স' }, count: 2 },
  { key: 'suite', label: { en: 'Suite', bn: 'স্যুট' }, count: 1 },
];
// status pattern: 0 occupied, 1 arriving, 2 vacant, 3 maintenance
export const roomPattern = [0,0,1,0,2,0,0,3,0,1, 0,0,2,0,1,0,0,2, 0,1,0,2,0,0, 0,1,0,0,2, 0,1, 1];

// ---------- Public live availability calendar ----------
// Every room with its booked date ranges (June–August 2026), generated
// deterministically so the demo is stable across reloads.
function isoDate(month, day) {
  const d = new Date(Date.UTC(2026, month - 1, day));
  return d.toISOString().slice(0, 10);
}

// Guest name pool for calendar bars (deterministic pick)
const GUEST_POOL = [
  { en: 'R. Chowdhury', bn: 'র. চৌধুরী' }, { en: 'A. Tanaka', bn: 'আ. তানাকা' },
  { en: 'N. Jahan', bn: 'নু. জাহান' }, { en: 'S. Rahman', bn: 'সা. রহমান' },
  { en: 'H. Kim', bn: 'হা. কিম' }, { en: 'M. Khan', bn: 'মে. খান' },
  { en: 'O. Bennett', bn: 'অ. বেনেট' }, { en: 'L. Wei', bn: 'লি. ওয়েই' },
  { en: 'F. Akter', bn: 'ফা. আক্তার' }, { en: 'T. Hasan', bn: 'তা. হাসান' },
  { en: 'I. Moreau', bn: 'ই. মোরো' }, { en: 'N. Janssen', bn: 'নো. ইয়ানসেন' },
];

export const publicRoomBookings = (() => {
  const rooms = [];
  let idx = 0;
  roomTypes.forEach((rt) => {
    for (let i = 1; i <= rt.count; i++) {
      const bookings = [];
      const g = (k) => GUEST_POOL[(idx * 3 + k * 7) % GUEST_POOL.length];
      // June stay (most rooms have one around today, 11 Jun)
      const s1 = 6 + ((idx * 3) % 9);             // day 6–14
      bookings.push({ from: isoDate(6, s1), to: isoDate(6, s1 + 2 + (idx % 5)), guest: g(0) });
      // Late-June stay for two-thirds of rooms
      if (idx % 3 !== 0) {
        const s2 = 18 + ((idx * 5) % 8);          // day 18–25
        bookings.push({ from: isoDate(6, s2), to: isoDate(6, s2 + 2 + (idx % 4)), guest: g(1) });
      }
      // July stay for half the rooms
      if (idx % 2 === 0) {
        const s3 = 3 + ((idx * 2) % 10);
        bookings.push({ from: isoDate(7, s3), to: isoDate(7, s3 + 2 + (idx % 5)), guest: g(2) });
      }
      // August stay for a third
      if (idx % 3 === 1) {
        const s4 = 8 + ((idx * 4) % 12);
        bookings.push({ from: isoDate(8, s4), to: isoDate(8, s4 + 3 + (idx % 3)), guest: g(3) });
      }
      rooms.push({ no: String(i).padStart(2, '0'), typeKey: rt.key, label: rt.label, bookings });
      idx++;
    }
  });
  return rooms;
})();

// ---------- Inventory & Stock ----------
export const suppliers = [
  { name: { en: 'Sreemangal Fresh Market', bn: 'শ্রীমঙ্গল ফ্রেশ মার্কেট' }, phone: '+880 1715 110022', cat: { en: 'Kitchen produce', bn: 'কিচেনের কাঁচামাল' } },
  { name: { en: 'Sylhet Hotel Supplies Ltd.', bn: 'সিলেট হোটেল সাপ্লাইজ লি.' }, phone: '+880 1818 334455', cat: { en: 'Housekeeping & linen', bn: 'হাউসকিপিং ও লিনেন' } },
  { name: { en: 'Moulvibazar Hardware', bn: 'মৌলভীবাজার হার্ডওয়্যার' }, phone: '+880 1611 778899', cat: { en: 'Maintenance parts', bn: 'মেরামতের যন্ত্রাংশ' } },
  { name: { en: 'Sreemangal Nursery', bn: 'শ্রীমঙ্গল নার্সারি' }, phone: '+880 1912 556677', cat: { en: 'Gardening & landscaping', bn: 'বাগান ও ল্যান্ডস্কেপিং' } },
];

export const inventoryItems = [
  { name: { en: 'Rice (Chinigura)', bn: 'চাল (চিনিগুঁড়া)' }, cat: 'kitchen', unit: { en: 'kg', bn: 'কেজি' }, stock: 85, reorder: 40, price: 145, supplierIdx: 0 },
  { name: { en: 'Chicken (whole)', bn: 'মুরগি (আস্ত)' }, cat: 'kitchen', unit: { en: 'kg', bn: 'কেজি' }, stock: 22, reorder: 25, price: 320, supplierIdx: 0 },
  { name: { en: 'Fresh fish (Ayre)', bn: 'তাজা মাছ (আইড়)' }, cat: 'kitchen', unit: { en: 'kg', bn: 'কেজি' }, stock: 14, reorder: 12, price: 850, supplierIdx: 0 },
  { name: { en: 'Estate green tea', bn: 'বাগানের সবুজ চা' }, cat: 'kitchen', unit: { en: 'kg', bn: 'কেজি' }, stock: 36, reorder: 10, price: 1200, supplierIdx: 0 },
  { name: { en: 'Cooking oil', bn: 'রান্নার তেল' }, cat: 'kitchen', unit: { en: 'litre', bn: 'লিটার' }, stock: 18, reorder: 30, price: 175, supplierIdx: 0 },
  { name: { en: 'Bath towels', bn: 'গোসলের তোয়ালে' }, cat: 'housekeeping', unit: { en: 'pcs', bn: 'টি' }, stock: 140, reorder: 80, price: 650, supplierIdx: 1 },
  { name: { en: 'Bed sheets (king)', bn: 'বিছানার চাদর (কিং)' }, cat: 'housekeeping', unit: { en: 'sets', bn: 'সেট' }, stock: 64, reorder: 40, price: 1850, supplierIdx: 1 },
  { name: { en: 'Guest soap & shampoo kits', bn: 'অতিথি সাবান ও শ্যাম্পু কিট' }, cat: 'housekeeping', unit: { en: 'kits', bn: 'কিট' }, stock: 95, reorder: 120, price: 95, supplierIdx: 1 },
  { name: { en: 'Toilet paper', bn: 'টয়লেট পেপার' }, cat: 'housekeeping', unit: { en: 'rolls', bn: 'রোল' }, stock: 310, reorder: 150, price: 28, supplierIdx: 1 },
  { name: { en: 'AC filters', bn: 'এসি ফিল্টার' }, cat: 'maintenance', unit: { en: 'pcs', bn: 'টি' }, stock: 9, reorder: 12, price: 480, supplierIdx: 2 },
  { name: { en: 'LED bulbs', bn: 'এলইডি বাল্ব' }, cat: 'maintenance', unit: { en: 'pcs', bn: 'টি' }, stock: 46, reorder: 24, price: 220, supplierIdx: 2 },
  { name: { en: 'Organic compost fertiliser', bn: 'জৈব সার কম্পোস্ট' }, cat: 'maintenance', unit: { en: 'bag', bn: 'ব্যাগ' }, stock: 11, reorder: 8, price: 950, supplierIdx: 3 },
];

export const purchaseOrders = [
  { ref: 'PO-2211', supplierIdx: 0, items: { en: 'Chicken 40kg · Oil 50L', bn: 'মুরগি ৪০ কেজি · তেল ৫০ লিটার' }, amount: 21550, date: { en: 'Jun 11', bn: '১১ জুন' }, status: 'pending' },
  { ref: 'PO-2210', supplierIdx: 1, items: { en: 'Soap kits 200 · Towels 40', bn: 'সাবান কিট ২০০ · তোয়ালে ৪০' }, amount: 45000, date: { en: 'Jun 10', bn: '১০ জুন' }, status: 'pending' },
  { ref: 'PO-2209', supplierIdx: 2, items: { en: 'AC filters 24 pcs', bn: 'এসি ফিল্টার ২৪টি' }, amount: 11520, date: { en: 'Jun 9', bn: '৯ জুন' }, status: 'done' },
  { ref: 'PO-2208', supplierIdx: 0, items: { en: 'Fish 20kg · Rice 100kg', bn: 'মাছ ২০ কেজি · চাল ১০০ কেজি' }, amount: 31500, date: { en: 'Jun 7', bn: '৭ জুন' }, status: 'done' },
  { ref: 'PO-2207', supplierIdx: 3, items: { en: 'Organic compost 12 bags', bn: 'জৈব সার ১২ ব্যাগ' }, amount: 11400, date: { en: 'Jun 5', bn: '৫ জুন' }, status: 'done' },
];

// ---------- Restaurant POS & room folios ----------
export const menuItems = [
  { name: { en: 'Sylheti Beef Bhuna', bn: 'সিলেটি গরুর ভুনা' }, cat: 'food', price: 650 },
  { name: { en: 'Ayre Fish Curry', bn: 'আইড় মাছের ঝোল' }, cat: 'food', price: 720 },
  { name: { en: 'Bamboo Chicken', bn: 'বাঁশ মুরগি' }, cat: 'food', price: 580 },
  { name: { en: 'Vegetable Khichuri', bn: 'সবজি খিচুড়ি' }, cat: 'food', price: 380 },
  { name: { en: 'Shatkora Prawn', bn: 'সাতকরা চিংড়ি' }, cat: 'food', price: 880 },
  { name: { en: 'Seven-layer Tea', bn: 'সাত রঙের চা' }, cat: 'beverage', price: 180 },
  { name: { en: 'Fresh Lime Soda', bn: 'তাজা লেবুর সোডা' }, cat: 'beverage', price: 120 },
  { name: { en: 'Estate Green Tea Pot', bn: 'বাগানের সবুজ চা (পট)' }, cat: 'beverage', price: 220 },
  { name: { en: 'Roshmalai', bn: 'রসমালাই' }, cat: 'dessert', price: 240 },
  { name: { en: 'Seasonal Fruit Platter', bn: 'মৌসুমি ফলের প্লেট' }, cat: 'dessert', price: 320 },
];

// Open folios: room-service charges of in-house guests (guestIdx → adminGuests)
export const initialFolios = [
  { guestIdx: 0, charges: [
    { name: { en: 'Seven-layer Tea ×2', bn: 'সাত রঙের চা ×২' }, amount: 360, time: '08:40' },
    { name: { en: 'Vegetable Khichuri', bn: 'সবজি খিচুড়ি' }, amount: 380, time: '13:15' },
  ] },
  { guestIdx: 1, charges: [
    { name: { en: 'Shatkora Prawn ×2', bn: 'সাতকরা চিংড়ি ×২' }, amount: 1760, time: '20:30' },
  ] },
  { guestIdx: 3, charges: [] },
  { guestIdx: 4, charges: [
    { name: { en: 'Estate Green Tea Pot', bn: 'বাগানের সবুজ চা (পট)' }, amount: 220, time: '07:55' },
    { name: { en: 'Roshmalai ×2', bn: 'রসমালাই ×২' }, amount: 480, time: '21:10' },
  ] },
];

// Admin notification feed (newest first)
export const adminNotifications = [
  { type: 'booking', href: '/admin/bookings', unread: true,
    text: { en: 'New booking NR-1042 — Farzana Akter, Treehouse 03, 12–15 Jun', bn: 'নতুন বুকিং NR-1042 — ফারজানা আক্তার, ট্রিহাউস ০৩, ১২–১৫ জুন' },
    time: { en: '10 min ago', bn: '১০ মিনিট আগে' } },
  { type: 'complaint', href: '/admin/feedback', unread: true,
    text: { en: 'Open complaint: Wi-Fi dropping on Tea Villa 09 veranda', bn: 'খোলা অভিযোগ: চা ভিলা ০৯-এর বারান্দায় ওয়াই-ফাই সমস্যা' },
    time: { en: '25 min ago', bn: '২৫ মিনিট আগে' } },
  { type: 'due', href: '/admin/dues', unread: true,
    text: { en: 'Due at checkout today: ৳40,700 — Noah Janssen (NR-1032)', bn: 'আজ চেক-আউটে বকেয়া: ৳৪০,৭০০ — নোয়া ইয়ানসেন (NR-1032)' },
    time: { en: '1 hr ago', bn: '১ ঘণ্টা আগে' } },
  { type: 'checkin', href: '/admin/frontdesk', unread: true,
    text: { en: '5 arrivals expected today — first at 14:00 (Bennett, Treehouse 05)', bn: 'আজ ৫টি আগমন প্রত্যাশিত — প্রথমটি ১৪:০০টায় (বেনেট, ট্রিহাউস ০৫)' },
    time: { en: '2 hrs ago', bn: '২ ঘণ্টা আগে' } },
  { type: 'maintenance', href: '/admin/housekeeping', unread: false,
    text: { en: 'Urgent: jetty railing repair at Lake Cottage 04 is with vendor', bn: 'জরুরি: লেক কটেজ ০৪-এর ঘাটের রেলিং মেরামত ভেন্ডরের কাছে' },
    time: { en: '3 hrs ago', bn: '৩ ঘণ্টা আগে' } },
  { type: 'booking', href: '/admin/prebooking', unread: false,
    text: { en: 'Advance received: ৳29,040 for NR-1101 (Pool Villa 02, July)', bn: 'অগ্রিম গৃহীত: ৳২৯,০৪০ — NR-1101 (পুল ভিলা ০২, জুলাই)' },
    time: { en: 'Yesterday', bn: 'গতকাল' } },
  { type: 'feedback', href: '/admin/feedback', unread: false,
    text: { en: '5★ praise from Hannah Kim — “best stay yet”', bn: 'হানা কিমের ৫★ প্রশংসা — “এখন পর্যন্ত সেরা অবস্থান”' },
    time: { en: 'Yesterday', bn: 'গতকাল' } },
];

// A room is unavailable if any booking overlaps [from, to). Checkout day is free.
export function isRoomFree(room, from, to) {
  return !room.bookings.some((b) => b.from < to && b.to > from);
}

export const monthlyRevenue = [
  { m: { en: 'Jan', bn: 'জানু' }, v: 78 }, { m: { en: 'Feb', bn: 'ফেব্রু' }, v: 84 },
  { m: { en: 'Mar', bn: 'মার্চ' }, v: 69 }, { m: { en: 'Apr', bn: 'এপ্রিল' }, v: 91 },
  { m: { en: 'May', bn: 'মে' }, v: 102 }, { m: { en: 'Jun', bn: 'জুন' }, v: 114 },
];

export const channels = [
  { name: 'directWeb', pct: 46 }, { name: 'bookingCom', pct: 24 }, { name: 'expedia', pct: 13 },
  { name: 'agents', pct: 10 }, { name: 'phone', pct: 7 },
];

export const topExperiences = [
  { name: { en: 'Tea Garden Walk', bn: 'চা বাগান ভ্রমণ' }, count: 86 },
  { name: { en: 'Lalmai Trek', bn: 'লালমাই ট্রেক' }, count: 64 },
  { name: { en: 'Lake Boat Ride', bn: 'লেকে নৌকা ভ্রমণ' }, count: 52 },
  { name: { en: 'Cultural Evening', bn: 'সাংস্কৃতিক সন্ধ্যা' }, count: 38 },
];

// Bangladeshi number format: 1,23,456 style (groups of 2 after first 3)
function commas(num) {
  const s = String(Math.round(num));
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const groups = [];
  for (let i = rest.length; i > 0; i -= 2) groups.unshift(rest.slice(Math.max(0, i - 2), i));
  return groups.join(',') + ',' + last3;
}

export function fmtTaka(amount, n) {
  return '৳' + n(commas(amount));
}

// ---------- Finance data (June 2026 MTD) ----------

export const incomeCategories = [
  { key: 'accommodation', label: { en: 'Accommodation', bn: 'আবাসন' }, amount: 3125000, prev: 2810000, pct: 72.0, color: 'var(--forest)' },
  { key: 'fb', label: { en: 'Food & Beverage', bn: 'খাদ্য ও পানীয়' }, amount: 840000, prev: 760000, pct: 19.3, color: 'var(--amber)' },
  { key: 'experiences', label: { en: 'Experiences', bn: 'অভিজ্ঞতা' }, amount: 265000, prev: 230000, pct: 6.1, color: 'var(--gold)' },
  { key: 'events', label: { en: 'Events & Meetings', bn: 'ইভেন্ট ও মিটিং' }, amount: 85000, prev: 62000, pct: 2.0, color: 'var(--blue)' },
  { key: 'misc', label: { en: 'Miscellaneous', bn: 'বিবিধ আয়' }, amount: 28500, prev: 31000, pct: 0.6, color: 'var(--muted)' },
];

export const expenseCategories = [
  { key: 'payroll', label: { en: 'Payroll & Benefits', bn: 'বেতন ও সুবিধা' }, amount: 747485, budget: 780000, pct: 50.3, color: 'var(--red)' },
  { key: 'food_cost', label: { en: 'Food & Supply Cost', bn: 'খাদ্য ও সরবরাহ ব্যয়' }, amount: 235000, budget: 250000, pct: 15.8, color: 'var(--amber)' },
  { key: 'utilities', label: { en: 'Utilities', bn: 'পরিষেবা (বিদ্যুৎ, পানি, গ্যাস)' }, amount: 185000, budget: 200000, pct: 12.4, color: 'var(--gold)' },
  { key: 'marketing', label: { en: 'Marketing & Advertising', bn: 'বিপণন ও বিজ্ঞাপন' }, amount: 120000, budget: 130000, pct: 8.1, color: 'var(--forest)' },
  { key: 'maintenance', label: { en: 'Maintenance & Repair', bn: 'রক্ষণাবেক্ষণ ও মেরামত' }, amount: 95000, budget: 80000, pct: 6.4, color: 'var(--sage)' },
  { key: 'admin_cost', label: { en: 'Admin & Office', bn: 'প্রশাসন ও অফিস' }, amount: 42000, budget: 45000, pct: 2.8, color: 'var(--blue)' },
  { key: 'insurance', label: { en: 'Insurance & License', bn: 'বীমা ও লাইসেন্স' }, amount: 38000, budget: 38000, pct: 2.56, color: 'var(--muted)' },
  { key: 'misc_exp', label: { en: 'Miscellaneous', bn: 'বিবিধ ব্যয়' }, amount: 25000, budget: 30000, pct: 1.68, color: 'var(--sage)' },
];

export const ledgerEntries = [
  { date: { en: 'Jun 10', bn: '১০ জুন' }, ref: 'TXN-0892', desc: { en: 'Room Revenue — 27 Villas', bn: 'কক্ষ রাজস্ব — ২৭টি ভিলা' }, cat: 'accommodation', type: 'income', amount: 337500 },
  { date: { en: 'Jun 10', bn: '১০ জুন' }, ref: 'TXN-0891', desc: { en: 'F&B Sales — Kanon Restaurant', bn: 'খাবার বিক্রয় — কানন রেস্তোরাঁ' }, cat: 'fb', type: 'income', amount: 28400 },
  { date: { en: 'Jun 10', bn: '১০ জুন' }, ref: 'TXN-0890', desc: { en: 'Electricity Bill — Jun 1–10', bn: 'বিদ্যুৎ বিল — ১–১০ জুন' }, cat: 'utilities', type: 'expense', amount: 61500 },
  { date: { en: 'Jun 9', bn: '৯ জুন' }, ref: 'TXN-0889', desc: { en: 'F&B Sales — Special Buffet', bn: 'খাবার বিক্রয় — স্পেশাল বুফে' }, cat: 'fb', type: 'income', amount: 52000 },
  { date: { en: 'Jun 9', bn: '৯ জুন' }, ref: 'TXN-0888', desc: { en: 'Housekeeping Supplies', bn: 'হাউসকিপিং সরবরাহ' }, cat: 'food_cost', type: 'expense', amount: 18500 },
  { date: { en: 'Jun 8', bn: '৮ জুন' }, ref: 'TXN-0887', desc: { en: 'Experience Bookings — Jun 8', bn: 'অভিজ্ঞতা বুকিং — ৮ জুন' }, cat: 'experiences', type: 'income', amount: 23600 },
  { date: { en: 'Jun 8', bn: '৮ জুন' }, ref: 'TXN-0886', desc: { en: 'AC Repair — Treehouse Units', bn: 'এসি মেরামত — ট্রিহাউস ইউনিট' }, cat: 'maintenance', type: 'expense', amount: 14200 },
  { date: { en: 'Jun 7', bn: '৭ জুন' }, ref: 'TXN-0885', desc: { en: 'Room Revenue — 25 Villas', bn: 'কক্ষ রাজস্ব — ২৫টি ভিলা' }, cat: 'accommodation', type: 'income', amount: 312500 },
  { date: { en: 'Jun 7', bn: '৭ জুন' }, ref: 'TXN-0884', desc: { en: 'Google & Meta Ads — June', bn: 'গুগল ও মেটা বিজ্ঞাপন — জুন' }, cat: 'marketing', type: 'expense', amount: 35000 },
  { date: { en: 'Jun 6', bn: '৬ জুন' }, ref: 'TXN-0883', desc: { en: 'Event Revenue — Corporate Retreat', bn: 'ইভেন্ট রাজস্ব — কর্পোরেট রিট্রিট' }, cat: 'events', type: 'income', amount: 85000 },
  { date: { en: 'Jun 6', bn: '৬ জুন' }, ref: 'TXN-0882', desc: { en: 'Borewell Maintenance', bn: 'বোরওয়েল রক্ষণাবেক্ষণ' }, cat: 'maintenance', type: 'expense', amount: 22000 },
  { date: { en: 'Jun 5', bn: '৫ জুন' }, ref: 'TXN-0881', desc: { en: 'F&B Sales — Tea Lounge & Bar', bn: 'খাবার বিক্রয় — চা লাউঞ্জ ও বার' }, cat: 'fb', type: 'income', amount: 41200 },
  { date: { en: 'Jun 5', bn: '৫ জুন' }, ref: 'TXN-0880', desc: { en: 'Payroll Advance — June', bn: 'বেতন অগ্রিম — জুন' }, cat: 'payroll', type: 'expense', amount: 350000 },
  { date: { en: 'Jun 4', bn: '৪ জুন' }, ref: 'TXN-0879', desc: { en: 'Room Revenue — 24 Villas', bn: 'কক্ষ রাজস্ব — ২৪টি ভিলা' }, cat: 'accommodation', type: 'income', amount: 300000 },
];

// Monthly P&L — revenue and expense in lakhs BDT
export const monthlyPL = [
  { m: { en: 'Jan', bn: 'জানু' }, rev: 78, exp: 13.5 },
  { m: { en: 'Feb', bn: 'ফেব্রু' }, rev: 84, exp: 14.2 },
  { m: { en: 'Mar', bn: 'মার্চ' }, rev: 69, exp: 13.8 },
  { m: { en: 'Apr', bn: 'এপ্রিল' }, rev: 91, exp: 14.5 },
  { m: { en: 'May', bn: 'মে' }, rev: 102, exp: 14.6 },
  { m: { en: 'Jun', bn: 'জুন' }, rev: 48.2, exp: 14.9 },
];

// ---------- Villa Rate Card ----------
export const villaRates = [
  { key: 'tea', type: { en: 'Tea Garden Villa', bn: 'চা ভিলা' }, units: 10, nightRate: 12500, occupancyPct: 87, prevMonth: 81 },
  { key: 'tree', type: { en: 'Canopy Treehouse', bn: 'ক্যানোপি ট্রিহাউস' }, units: 8, nightRate: 18500, occupancyPct: 84, prevMonth: 79 },
  { key: 'lake', type: { en: 'Lake Cottage', bn: 'লেক কটেজ' }, units: 6, nightRate: 15800, occupancyPct: 91, prevMonth: 88 },
  { key: 'pool', type: { en: 'Pool Villa', bn: 'পুল ভিলা' }, units: 5, nightRate: 22000, occupancyPct: 78, prevMonth: 72 },
  { key: 'res', type: { en: 'Residence', bn: 'রেসিডেন্স' }, units: 2, nightRate: 28500, occupancyPct: 65, prevMonth: 58 },
  { key: 'suite', type: { en: 'Suite', bn: 'স্যুট' }, units: 1, nightRate: 35000, occupancyPct: 80, prevMonth: 75 },
];

// Helper: Calculate revenue for villa type
function calcVillaRevenue(type) {
  const daysInMonth = 30;
  const potential = type.units * type.nightRate * daysInMonth;
  const actual = potential * (type.occupancyPct / 100);
  return { potential, actual };
}

export function getVillaMetrics(villaRates) {
  return villaRates.map((t) => {
    const rev = calcVillaRevenue(t);
    return { ...t, revenuePotential: rev.potential, revenueActual: rev.actual };
  });
}

// ---------- Restaurant Breakdown ----------
export const restaurantMetrics = [
  {
    key: 'kanon',
    name: { en: 'Kanon Restaurant', bn: 'কানন রেস্তোরাঁ' },
    cuisine: { en: 'Bengali', bn: 'বাঙালি' },
    mtdRevenue: 425000,
    guestCount: 580,
    foodCost: 168500,
    avgBill: 732,
    prevRevenue: 380000,
  },
  {
    key: 'tea_lounge',
    name: { en: 'Tea Lounge & Bar', bn: 'চা লাউঞ্জ ও বার' },
    cuisine: { en: 'Cafe & Beverages', bn: 'ক্যাফে ও পানীয়' },
    mtdRevenue: 245000,
    guestCount: 1240,
    foodCost: 78400,
    avgBill: 197,
    prevRevenue: 215000,
  },
  {
    key: 'dining',
    name: { en: 'Fine Dining Hall', bn: 'ফাইন ডাইনিং হল' },
    cuisine: { en: 'Fusion', bn: 'ফিউশন' },
    mtdRevenue: 170000,
    guestCount: 185,
    foodCost: 72250,
    avgBill: 918,
    prevRevenue: 165000,
  },
];

export function getRestaurantMetrics(data) {
  return data.map((r) => {
    const margin = r.mtdRevenue - r.foodCost;
    const marginPct = ((margin / r.mtdRevenue) * 100).toFixed(1);
    const costPct = ((r.foodCost / r.mtdRevenue) * 100).toFixed(1);
    const prevMargin = r.prevRevenue - (r.foodCost * (r.prevRevenue / r.mtdRevenue));
    const growth = (((r.mtdRevenue - r.prevRevenue) / r.prevRevenue) * 100).toFixed(1);
    return { ...r, margin, marginPct, costPct, prevMargin, growth };
  });
}

// Today's departures (front desk checkout queue)
export const todayDepartures = [
  { avatar: 44, name: { en: 'Hannah Kim', bn: 'হানা কিম' }, villa: { en: 'Pool Villa 03', bn: 'পুল ভিলা ০৩' }, ref: 'NR-1037', time: '11:00', due: 0 },
  { avatar: 36, name: { en: 'Noah Janssen', bn: 'নোয়া ইয়ানসেন' }, villa: { en: 'Treehouse 02', bn: 'ট্রিহাউস ০২' }, ref: 'NR-1032', time: '11:30', due: 40700 },
  { avatar: 58, name: { en: 'Marcus Webb', bn: 'মার্কাস ওয়েব' }, villa: { en: 'Treehouse 06', bn: 'ট্রিহাউস ০৬' }, ref: 'NR-1039', time: '12:00', due: 0 },
  { avatar: 33, name: { en: 'Farzana Akter', bn: 'ফারজানা আক্তার' }, villa: { en: 'Tea Villa 03', bn: 'চা ভিলা ০৩' }, ref: 'NR-1028', time: '12:00', due: 6200 },
];

// Pre-bookings: future reservations with advance deposits (30% standard)
export const preBookings = [
  { ref: 'NR-1101', guest: { en: 'Tahsin Ahmed', bn: 'তাহসিন আহমেদ' }, avatar: 12, villa: { en: 'Pool Villa 02', bn: 'পুল ভিলা ০২' }, dates: { en: 'Jul 3 – 7, 2026', bn: '৩ – ৭ জুলাই ২০২৬' }, nights: 4, total: 96800, advance: 29040, status: 'advancePaid' },
  { ref: 'NR-1102', guest: { en: 'Sadia Islam', bn: 'সাদিয়া ইসলাম' }, avatar: 45, villa: { en: 'Treehouse 01', bn: 'ট্রিহাউস ০১' }, dates: { en: 'Jul 11 – 14, 2026', bn: '১১ – ১৪ জুলাই ২০২৬' }, nights: 3, total: 61050, advance: 18315, status: 'advancePaid' },
  { ref: 'NR-1103', guest: { en: 'David Müller', bn: 'ডেভিড মুলার' }, avatar: 52, villa: { en: 'Suite 01', bn: 'স্যুট ০১' }, dates: { en: 'Aug 1 – 8, 2026', bn: '১ – ৮ আগস্ট ২০২৬' }, nights: 7, total: 269500, advance: 0, status: 'awaitingAdvance' },
  { ref: 'NR-1104', guest: { en: 'Rumana Haque', bn: 'রুমানা হক' }, avatar: 24, villa: { en: 'Lake Cottage 03', bn: 'লেক কটেজ ০৩' }, dates: { en: 'Aug 14 – 17, 2026', bn: '১৪ – ১৭ আগস্ট ২০২৬' }, nights: 3, total: 52140, advance: 15642, status: 'advancePaid' },
  { ref: 'NR-1105', guest: { en: 'Imran Kabir', bn: 'ইমরান কবির' }, avatar: 61, villa: { en: 'Tea Villa 05', bn: 'চা ভিলা ০৫' }, dates: { en: 'Sep 2 – 6, 2026', bn: '২ – ৬ সেপ্টেম্বর ২০২৬' }, nights: 4, total: 55000, advance: 0, status: 'awaitingAdvance' },
  { ref: 'NR-1106', guest: { en: 'Chloe Martin', bn: 'ক্লোয়ি মার্টিন' }, avatar: 38, villa: { en: 'Treehouse 07', bn: 'ট্রিহাউস ০৭' }, dates: { en: 'Oct 9 – 14, 2026', bn: '৯ – ১৪ অক্টোবর ২০২৬' }, nights: 5, total: 101750, advance: 30525, status: 'advancePaid' },
  { ref: 'NR-1107', guest: { en: 'Asif Chowdhury', bn: 'আসিফ চৌধুরী' }, avatar: 18, villa: { en: 'Residence 02', bn: 'রেসিডেন্স ০২' }, dates: { en: 'Dec 20 – 27, 2026', bn: '২০ – ২৭ ডিসেম্বর ২০২৬' }, nights: 7, total: 219450, advance: 65835, status: 'advancePaid' },
  { ref: 'NR-1108', guest: { en: 'Nadia Rahman', bn: 'নাদিয়া রহমান' }, avatar: 29, villa: { en: 'Tea Villa 01', bn: 'চা ভিলা ০১' }, dates: { en: 'Dec 24 – 28, 2026', bn: '২৪ – ২৮ ডিসেম্বর ২০২৬' }, nights: 4, total: 55000, advance: 0, status: 'awaitingAdvance' },
];

// Membership: 1 point per ৳100 spent. Tiers by points.
export const memberTiers = [
  { key: 'star', min: 0, max: 9999, color: 'var(--blue)',
    benefits: { en: ['5% off direct bookings', 'Welcome tea ritual', 'Birthday greeting'], bn: ['সরাসরি বুকিংয়ে ৫% ছাড়', 'ওয়েলকাম চা আয়োজন', 'জন্মদিনের শুভেচ্ছা'] } },
  { key: 'gold', min: 10000, max: 24999, color: 'var(--amber)',
    benefits: { en: ['10% off bookings & dining', 'Late checkout till 2pm', 'One free guided trek / stay', 'Room upgrade (subject to availability)'], bn: ['বুকিং ও ডাইনিংয়ে ১০% ছাড়', 'দুপুর ২টা পর্যন্ত দেরিতে চেক-আউট', 'প্রতি অবস্থানে একটি ফ্রি গাইডেড ট্রেক', 'রুম আপগ্রেড (খালি থাকা সাপেক্ষে)'] } },
  { key: 'platinum', min: 25000, max: Infinity, color: 'var(--green)',
    benefits: { en: ['15% off everything', 'Guaranteed room upgrade', 'Free airport pickup', 'Private dinner once per stay', 'Dedicated guest manager'], bn: ['সবকিছুতে ১৫% ছাড়', 'নিশ্চিত রুম আপগ্রেড', 'ফ্রি বিমানবন্দর পিকআপ', 'প্রতি অবস্থানে একবার প্রাইভেট ডিনার', 'নিবেদিত গেস্ট ম্যানেজার'] } },
];

export const POINTS_PER_100_TAKA = 1;

export function tierOfPoints(points) {
  if (points >= 25000) return 'platinum';
  if (points >= 10000) return 'gold';
  return 'star';
}

export const members = [
  { avatar: 44, name: { en: 'Hannah Kim', bn: 'হানা কিম' }, phone: '+82 10 9876 5432', since: 2022, visits: 6, spend: 4203000, points: 42030 },
  { avatar: 26, name: { en: 'Aiko Tanaka', bn: 'আইকো তানাকা' }, phone: '+81 90 1234 5678', since: 2023, visits: 4, spend: 2870000, points: 28700 },
  { avatar: 68, name: { en: 'Mehzabin Khan', bn: 'মেহজাবিন খান' }, phone: '+880 1612 445566', since: 2023, visits: 5, spend: 1890000, points: 18900 },
  { avatar: 64, name: { en: 'Liang Wei', bn: 'লিয়াং ওয়েই' }, phone: '+86 138 0013 8000', since: 2024, visits: 3, spend: 1456000, points: 14560 },
  { avatar: 20, name: { en: 'Rahim Chowdhury', bn: 'রহিম চৌধুরী' }, phone: '+880 1715 998877', since: 2024, visits: 3, spend: 1120000, points: 11200 },
  { avatar: 49, name: { en: 'Nusrat Jahan', bn: 'নুসরাত জাহান' }, phone: '+880 1711 234567', since: 2024, visits: 2, spend: 645000, points: 6450 },
  { avatar: 15, name: { en: 'Sakib Rahman', bn: 'সাকিব রহমান' }, phone: '+880 1819 876543', since: 2025, visits: 2, spend: 412000, points: 4120 },
  { avatar: 11, name: { en: 'Oliver & Grace Bennett', bn: 'অলিভার ও গ্রেস বেনেট' }, phone: '+44 7700 900123', since: 2026, visits: 1, spend: 64000, points: 640 },
];

// Guest feedback & complaints log
export const feedbackLog = [
  { avatar: 44, guest: { en: 'Hannah Kim', bn: 'হানা কিম' }, villa: { en: 'Pool Villa 03', bn: 'পুল ভিলা ০৩' }, type: 'praise', rating: 5, date: { en: 'Jun 10', bn: '১০ জুন' }, status: 'resolved',
    text: { en: 'The quiet wing arrangement was perfect — best stay yet.', bn: 'নিরিবিলি উইংয়ের ব্যবস্থা নিখুঁত ছিল — এখন পর্যন্ত সেরা অবস্থান।' } },
  { avatar: 36, guest: { en: 'Noah Janssen', bn: 'নোয়া ইয়ানসেন' }, villa: { en: 'Treehouse 02', bn: 'ট্রিহাউস ০২' }, type: 'complaint', rating: 3, date: { en: 'Jun 10', bn: '১০ জুন' }, status: 'open',
    text: { en: 'Hot water pressure was low in the morning shower.', bn: 'সকালে শাওয়ারে গরম পানির চাপ কম ছিল।' } },
  { avatar: 49, guest: { en: 'Nusrat Jahan', bn: 'নুসরাত জাহান' }, villa: { en: 'Lake Cottage 02', bn: 'লেক কটেজ ০২' }, type: 'complaint', rating: 4, date: { en: 'Jun 9', bn: '৯ জুন' }, status: 'inProgress',
    text: { en: 'Mosquito net has a small tear near the window side.', bn: 'জানালার পাশে মশারিতে ছোট একটা ছেঁড়া আছে।' } },
  { avatar: 15, guest: { en: 'Sakib Rahman', bn: 'সাকিব রহমান' }, villa: { en: 'Tea Villa 04', bn: 'চা ভিলা ০৪' }, type: 'suggestion', rating: 5, date: { en: 'Jun 9', bn: '৯ জুন' }, status: 'resolved',
    text: { en: 'Please add a printed bird checklist in the villas — happy to help draft one!', bn: 'ভিলায় ছাপানো পাখির তালিকা রাখলে ভালো হয় — বানাতে সাহায্য করতে রাজি!' } },
  { avatar: 26, guest: { en: 'Aiko Tanaka', bn: 'আইকো তানাকা' }, villa: { en: 'Residence 01', bn: 'রেসিডেন্স ০১' }, type: 'praise', rating: 5, date: { en: 'Jun 8', bn: '৮ জুন' }, status: 'resolved',
    text: { en: 'Vegan menu by Chef Anwar was outstanding. Arigato!', bn: 'শেফ আনোয়ারের ভেগান মেনু অসাধারণ ছিল। আরিগাতো!' } },
  { avatar: 68, guest: { en: 'Mehzabin Khan', bn: 'মেহজাবিন খান' }, villa: { en: 'Tea Villa 09', bn: 'চা ভিলা ০৯' }, type: 'complaint', rating: 4, date: { en: 'Jun 8', bn: '৮ জুন' }, status: 'open',
    text: { en: 'Wi-Fi keeps dropping on the veranda — need it for photo uploads.', bn: 'বারান্দায় ওয়াই-ফাই বারবার চলে যাচ্ছে — ছবি আপলোডের জন্য দরকার।' } },
  { avatar: 11, guest: { en: 'Oliver & Grace Bennett', bn: 'অলিভার ও গ্রেস বেনেট' }, villa: { en: 'Treehouse 05', bn: 'ট্রিহাউস ০৫' }, type: 'praise', rating: 5, date: { en: 'Jun 11', bn: '১১ জুন' }, status: 'resolved',
    text: { en: 'The honeymoon flower setup made Grace cry happy tears. Thank you!', bn: 'হানিমুনের ফুলের সাজে গ্রেস আনন্দে কেঁদে ফেলেছে। ধন্যবাদ!' } },
];

// SMS / Email confirmation templates ({guest}, {villa}, {dates}, {ref}, {amount} placeholders)
export const msgTemplates = [
  { key: 'bookingSms', channel: 'SMS', name: { en: 'Booking Confirmation (SMS)', bn: 'বুকিং নিশ্চিতকরণ (এসএমএস)' },
    body: { en: 'Dear {guest}, your booking {ref} for {villa}, {dates} is confirmed. Total ৳{amount}. — Cumilla Resort', bn: 'প্রিয় {guest}, আপনার বুকিং {ref} — {villa}, {dates} নিশ্চিত হয়েছে। মোট ৳{amount}। — নিসর্গ রিসোর্ট' } },
  { key: 'bookingEmail', channel: 'Email', name: { en: 'Booking Confirmation (Email)', bn: 'বুকিং নিশ্চিতকরণ (ইমেইল)' },
    body: { en: 'Dear {guest},\n\nWe are delighted to confirm your reservation {ref} at Cumilla Resort.\nVilla: {villa}\nDates: {dates}\nTotal: ৳{amount}\n\nOur team will welcome you with a seven-layer tea. Safe travels!\n\nCumilla Reservations', bn: 'প্রিয় {guest},\n\nনিসর্গ রিসোর্টে আপনার রিজার্ভেশন {ref} নিশ্চিত হয়েছে।\nভিলা: {villa}\nতারিখ: {dates}\nমোট: ৳{amount}\n\nসাত রঙের চা দিয়ে আমরা আপনাকে স্বাগত জানাব। শুভ যাত্রা!\n\nনিসর্গ রিজার্ভেশন' } },
  { key: 'checkinSms', channel: 'SMS', name: { en: 'Check-in Welcome (SMS)', bn: 'চেক-ইন স্বাগতম (এসএমএস)' },
    body: { en: 'Welcome to Cumilla, {guest}! Your villa {villa} is ready. Dial 0 from your room phone for anything, anytime.', bn: 'নিসর্গে স্বাগতম, {guest}! আপনার ভিলা {villa} প্রস্তুত। যেকোনো প্রয়োজনে রুমের ফোন থেকে ০ ডায়াল করুন।' } },
  { key: 'receiptSms', channel: 'SMS', name: { en: 'Payment Receipt (SMS)', bn: 'পেমেন্ট রসিদ (এসএমএস)' },
    body: { en: 'Payment of ৳{amount} received for booking {ref}. Thank you, {guest}! — Cumilla Resort', bn: 'বুকিং {ref}-এর জন্য ৳{amount} পেমেন্ট গৃহীত হয়েছে। ধন্যবাদ, {guest}! — নিসর্গ রিসোর্ট' } },
];

// ---------- Events & weddings ----------
export const eventPackages = [
  { img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_couple_dining.png',
    name: { en: 'Garden Wedding', bn: 'বাগানে বিয়ে' }, price: 450000, per: { en: 'starting · 150 guests', bn: 'শুরু · ১৫০ অতিথি' },
    desc: { en: 'A lantern-lit ceremony between the tea rows: bamboo mandap, Manipuri dance welcome, full Bengali feast and the bridal villa for two nights.', bn: 'চা সারির মাঝে লণ্ঠনের আলোয় বিয়ে: বাঁশের মণ্ডপ, মণিপুরি নৃত্যে বরণ, পূর্ণ বাঙালি ভোজ আর দুই রাতের ব্রাইডাল ভিলা।' },
    includes: { en: ['Bamboo mandap & florals', 'Full Bengali feast (150)', 'Bridal villa · 2 nights', 'Photography corners'], bn: ['বাঁশের মণ্ডপ ও ফুলসজ্জা', 'পূর্ণ বাঙালি ভোজ (১৫০)', 'ব্রাইডাল ভিলা · ২ রাত', 'ফটোগ্রাফি কর্নার'] } },
  { img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_treehouse.png',
    name: { en: 'Corporate Retreat', bn: 'কর্পোরেট রিট্রিট' }, price: 185000, per: { en: 'per day · up to 40', bn: 'প্রতি দিন · সর্বোচ্চ ৪০' },
    desc: { en: 'Strategy by day, firepit by night. Open-air conference pavilion, team trails in Lalmai, and a barbecue under the stars.', bn: 'দিনে স্ট্র্যাটেজি, রাতে ফায়ারপিট। খোলা কনফারেন্স প্যাভিলিয়ন, লালমাইয় টিম ট্রেইল, তারার নিচে বারবিকিউ।' },
    includes: { en: ['Conference pavilion + AV', 'Team-building trail', '3 meals + tea breaks', 'Evening barbecue'], bn: ['কনফারেন্স প্যাভিলিয়ন + এভি', 'টিম-বিল্ডিং ট্রেইল', '৩ বেলা খাবার + চা বিরতি', 'সান্ধ্য বারবিকিউ'] } },
  { img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_lake_cottage.png',
    name: { en: 'Birthday & Milestones', bn: 'জন্মদিন ও বিশেষ দিন' }, price: 65000, per: { en: 'starting · 30 guests', bn: 'শুরু · ৩০ অতিথি' },
    desc: { en: 'A private lakeside celebration: decorated deck, custom cake from our bakery, lantern release and a private boat ride.', bn: 'লেকের ধারে ব্যক্তিগত উদযাপন: সাজানো ডেক, নিজস্ব বেকারির কাস্টম কেক, ফানুস ওড়ানো আর প্রাইভেট নৌকা ভ্রমণ।' },
    includes: { en: ['Lakeside deck décor', 'Custom cake', 'Lantern release', 'Private boat ride'], bn: ['লেকসাইড ডেক সাজসজ্জা', 'কাস্টম কেক', 'ফানুস ওড়ানো', 'প্রাইভেট নৌকা ভ্রমণ'] } },
];

// ---------- Around us (local attractions) ----------
export const attractions = [
  { img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_rainforest.png',
    name: { en: 'Lalmai National Park', bn: 'লালমাই জাতীয় উদ্যান' }, km: 2, mins: 8,
    desc: { en: 'Hoolock gibbons, hornbills and the famous rail line through the rainforest. Dawn entry is magic.', bn: 'উল্লুক, ধনেশ আর রেইনফরেস্টের ভেতর দিয়ে যাওয়া বিখ্যাত রেললাইন। ভোরের প্রবেশ জাদুকরী।' } },
  { img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_lake_cottage.png',
    name: { en: 'Madhabpur Lake', bn: 'মাধবপুর লেক' }, km: 12, mins: 30,
    desc: { en: 'Water lilies between tea hills — best at golden hour. Paddle boats available at the ghat.', bn: 'চা পাহাড়ের মাঝে শাপলার লেক — সোনালি বিকেলে সবচেয়ে সুন্দর। ঘাটে প্যাডেল নৌকা আছে।' } },
  { img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_tea_garden_hero.png',
    name: { en: 'Nilkantha Seven-Layer Tea Cabin', bn: 'নীলকণ্ঠ সাত রঙের চা ঘর' }, km: 5, mins: 15,
    desc: { en: 'The original seven-colour tea, poured in front of you. A Sreemangal rite of passage.', bn: 'আসল সাত রঙের চা, চোখের সামনে ঢালা হয়। শ্রীমঙ্গলে এলে এটি না দেখলেই নয়।' } },
  { img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_rainforest.png',
    name: { en: 'Hum Hum Waterfall', bn: 'হামহাম জলপ্রপাত' }, km: 32, mins: 90,
    desc: { en: 'A half-day jungle trek to Sylhet’s wildest waterfall. Guides and bamboo staffs arranged by us.', bn: 'সিলেটের সবচেয়ে বুনো জলপ্রপাতে আধা দিনের জঙ্গল ট্রেক। গাইড ও বাঁশের লাঠি আমরা ব্যবস্থা করি।' } },
  { img: 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media/sylhet_dining.png',
    name: { en: 'Monipuri Para (weaving village)', bn: 'মণিপুরি পাড়া (তাঁতের গ্রাম)' }, km: 9, mins: 25,
    desc: { en: 'Handloom sarees and shawls woven on home looms — meet the weavers, buy at source.', bn: 'ঘরের তাঁতে বোনা শাড়ি ও চাদর — তাঁতিদের সাথে দেখা করুন, উৎস থেকেই কিনুন।' } },
];

// ---------- FAQ ----------
export const faqs = [
  { q: { en: 'What are check-in and check-out times?', bn: 'চেক-ইন ও চেক-আউট কখন?' }, a: { en: 'Check-in from 2:00 pm, check-out by 11:30 am. Early check-in and late check-out (till 6 pm) are available on request.', bn: 'চেক-ইন দুপুর ২টা থেকে, চেক-আউট সকাল সাড়ে ১১টার মধ্যে। অনুরোধে আগাম চেক-ইন ও দেরিতে চেক-আউট (সন্ধ্যা ৬টা পর্যন্ত) সম্ভব।' } },
  { q: { en: 'Is the food halal?', bn: 'খাবার কি হালাল?' }, a: { en: 'Yes — every kitchen on the estate is fully halal. We also cater vegan, vegetarian and child-friendly menus.', bn: 'হ্যাঁ — রিসোর্টের প্রতিটি রান্নাঘর সম্পূর্ণ হালাল। ভেগান, নিরামিষ ও শিশু-বান্ধব মেনুও আছে।' } },
  { q: { en: 'What is the cancellation policy?', bn: 'বাতিলের নিয়ম কী?' }, a: { en: 'Free cancellation up to 7 days before arrival. Within 7 days, the 30% advance is held as credit for a future stay.', bn: 'আগমনের ৭ দিন আগ পর্যন্ত বিনামূল্যে বাতিল। ৭ দিনের মধ্যে হলে ৩০% অগ্রিম ভবিষ্যৎ অবস্থানের ক্রেডিট হিসেবে জমা থাকে।' } },
  { q: { en: 'How do I pay?', bn: 'টাকা দেব কীভাবে?' }, a: { en: 'bKash, Nagad, all major cards, or cash at the resort. A 30% advance confirms your booking.', bn: 'বিকাশ, নগদ, সব ধরনের কার্ড, অথবা রিসোর্টে নগদ। ৩০% অগ্রিমে বুকিং নিশ্চিত হয়।' } },
  { q: { en: 'Are children welcome?', bn: 'শিশুরা কি স্বাগত?' }, a: { en: 'Very much — under 6 stay free, and the Family Residence sleeps six. Treehouses are for guests 12+.', bn: 'অবশ্যই — ৬ বছরের নিচে ফ্রি, ফ্যামিলি রেসিডেন্সে ৬ জন থাকা যায়। ট্রিহাউস ১২+ অতিথিদের জন্য।' } },
  { q: { en: 'How do we reach you from Dhaka?', bn: 'ঢাকা থেকে কীভাবে আসব?' }, a: { en: 'Parabat or Joyantika train to Sreemangal (~4.5 hrs), or drive (~3.5 hrs). We arrange pickup from station and Sylhet airport.', bn: 'পারাবত বা জয়ন্তিকা ট্রেনে শ্রীমঙ্গল (~সাড়ে ৪ ঘণ্টা), বা গাড়িতে (~সাড়ে ৩ ঘণ্টা)। স্টেশন ও সিলেট বিমানবন্দর থেকে পিকআপের ব্যবস্থা করি।' } },
  { q: { en: 'Is Wi-Fi available?', bn: 'ওয়াই-ফাই আছে?' }, a: { en: 'High-speed Wi-Fi in every villa and pavilion — though we hope the gibbons distract you from it.', bn: 'প্রতিটি ভিলা ও প্যাভিলিয়নে হাই-স্পিড ওয়াই-ফাই — যদিও আশা করি উল্লুকের ডাকই আপনাকে ব্যস্ত রাখবে।' } },
  { q: { en: 'Can we bring pets?', bn: 'পোষা প্রাণী আনা যাবে?' }, a: { en: 'Because we border a national park, pets are not permitted — wildlife comes first.', bn: 'জাতীয় উদ্যানের পাশে বলে পোষা প্রাণী আনা যায় না — বন্যপ্রাণীই আগে।' } },
];

// Extra (add-on) room charges, used by room renting + charge management
export const extraCharges = [
  { key: 'extraBed', label: { en: 'Extra Bed', bn: 'অতিরিক্ত বেড' }, amount: 2500, per: 'perNight' },
  { key: 'breakfast', label: { en: 'Extra Breakfast', bn: 'অতিরিক্ত নাশতা' }, amount: 800, per: 'perPerson' },
  { key: 'airportPickup', label: { en: 'Airport Pickup (Sylhet)', bn: 'বিমানবন্দর পিকআপ (সিলেট)' }, amount: 3500, per: 'perTrip' },
  { key: 'firepitDinner', label: { en: 'Private Firepit Dinner', bn: 'প্রাইভেট ফায়ারপিট ডিনার' }, amount: 4500, per: 'perUse' },
  { key: 'lateCheckout', label: { en: 'Late Checkout (till 6pm)', bn: 'দেরিতে চেক-আউট (সন্ধ্যা ৬টা পর্যন্ত)' }, amount: 5000, per: 'perUse' },
];

// Tax applied on room bills (matches invoices)
export const TAX_PCT = 10;

// Booking billing data (rates and charges)
export const bookingBillingMap = {
  'NR-1042': { nights: 3, ratePerNight: 18500, subTotal: 55500, tax: 5550, discount: 0, paid: 61050, pending: 0, paymentStatus: 'paid' },
  'NR-1041': { nights: 3, ratePerNight: 12500, subTotal: 37500, tax: 3750, discount: 0, paid: 0, pending: 41250, paymentStatus: 'pending' },
  'NR-1040': { nights: 7, ratePerNight: 28500, subTotal: 199500, tax: 19950, discount: 25450, paid: 194000, pending: 0, paymentStatus: 'paid' },
  'NR-1039': { nights: 3, ratePerNight: 18500, subTotal: 55500, tax: 0, discount: 55500, paid: 0, pending: 0, paymentStatus: 'cancelled' },
  'NR-1038': { nights: 7, ratePerNight: 15000, subTotal: 105000, tax: 10500, discount: 0, paid: 105000, pending: 10500, paymentStatus: 'partial' },
  'NR-1037': { nights: 6, ratePerNight: 22000, subTotal: 132000, tax: 13200, discount: 0, paid: 168000, pending: 0, paymentStatus: 'paid' },
  'NR-1036': { nights: 6, ratePerNight: 12500, subTotal: 75000, tax: 7500, discount: 0, paid: 75000, pending: 7500, paymentStatus: 'partial' },
  'NR-1035': { nights: 4, ratePerNight: 18500, subTotal: 74000, tax: 7400, discount: 0, paid: 0, pending: 81400, paymentStatus: 'pending' },
  'NR-1034': { nights: 7, ratePerNight: 12500, subTotal: 87500, tax: 8750, discount: 0, paid: 87500, pending: 8750, paymentStatus: 'partial' },
  'NR-1033': { nights: 6, ratePerNight: 22000, subTotal: 132000, tax: 13200, discount: 8000, paid: 0, pending: 137200, paymentStatus: 'pending' },
  'NR-1032': { nights: 2, ratePerNight: 18500, subTotal: 37000, tax: 3700, discount: 0, paid: 0, pending: 40700, paymentStatus: 'pending' },
  'NR-1031': { nights: 7, ratePerNight: 35000, subTotal: 245000, tax: 24500, discount: 0, paid: 364000, pending: 0, paymentStatus: 'paid' },
};

// Helper for dynamic Villa & Cottage custom image overrides
export function getVillaImage(slug, defaultImg) {
  if (typeof window === 'undefined') return defaultImg;
  try {
    const saved = localStorage.getItem('cumilla-villa-images-v1');
    if (saved) {
      const map = JSON.parse(saved);
      if (map[slug]) return map[slug];
    }
  } catch {}
  return defaultImg;
}

export function setVillaImage(slug, imgUrl) {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem('cumilla-villa-images-v1');
    const map = saved ? JSON.parse(saved) : {};
    map[slug] = imgUrl;
    localStorage.setItem('cumilla-villa-images-v1', JSON.stringify(map));
    window.dispatchEvent(new Event('storage'));
  } catch {}
}
