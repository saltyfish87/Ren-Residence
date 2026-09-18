// Facts and assets for Ren Residence, Bukit Jalil.
// Source of truth: the developer's sales kit / brochure / summary (5 May 2025) as extracted into
// ~/ctg-agent/data/incoming/Ren Residence/result.json (processed 2026-08-04), and the developer's public Google Drive folders.
// Do not add numbers that are not in that record. Compliance: starting price only; no rebates, discounts, packages, nett prices; nothing about financing margins.

export const drive = (id: string, w = 1600) => `https://lh3.googleusercontent.com/d/${id}=w${w}`;

export const IMG = {
  facade: "1SzU_RC5uFKLIp_jmvk576_APCBUfRUPd",                 // 1600x1992 portrait, main facade render
  aerial_night: "1h9t6W-r0TvGrng1Jx6MT2pRkzClBJLed", // 1600x872, hero
  facade_dusk: "17A4cys1_H7UbMmAVm5lxR3zRmdnQBVQK", // 1333x1667 portrait
  infinity_pool: "1NawIZ_ADvJnFCHUDEBHEo6th295keov0",
  cafe_lounge: "1SNjZgkcy4xDVvEeOk5n79YuBnUgO9XLR",
  community_kitchen: "1aGU7kP2db_G-rvZfRD14fUw1UKmw8mGt",
  dining_function: "12xNuWCKDIIxRf7tWthlXc1Kx5mTFfrz-",
  elevator_lobby: "1AzuUNCawC9Ov9GvTzcei8d59Qo2s6yZX",
  game_room: "1lhy08ahFOnitDgOVRt_8n9wSPXhlUbdG",
  gym_cardio: "1m2NI2gs6qmwOdjAaka2NLOdqMWZyS68v",
  gym_weight: "1BYNzL_xrTBOQcN8eGLDvFVoz3FUc61B6",
  lobby_water: "1H2sB4HXHqVE9O2oqvK1KlGmJd-s6ysaW",
  lounge: "1Zbaeftk-qgaob1malXXYtvEmWcGhTIlZ",
  main_lobby: "1MN9UvzofFNwJd0HCUmVcy9ClXwaTGykn",
  yoga: "1nETQajEKZ9SaXlkrIfQIrn892J3TDnaA",
  location_map: "1gcJZqOzRBp0O2fNIY2Q1kHI4W4Zbn3JO", // from the previous site (900px)
  type_a: "16qEhQekHAez3XxttnhueaVpg7ZT_sKsq",
  type_b1: "1J1OMnQXjUqBrtaGAypE3p1fZ9xcDP3LO",
  type_b2: "1mPdZ2wzqfSp1z8QTdnmVQhIVSg1XBxLA",
  type_b3: "1264V_Di-kuyvea_DqaYOAwclZSv8XV-p",
  type_c: "1XrxgGLRQOhrL38JAkBpa00zso4kR1Bbh",
  type_d: "1-rP7w1bgs0pp05cAe0RcOfaSdaKUYQbs"
} as const;

export const PROJECT = {
  name: "Ren Residence",
  fullName: "Ren Residence @ Residensi Renaisans Bukit Jalil",
  developer: "Gaya Kuasa Sdn Bhd",
  architect: "GDP Architects",
  address: "No. 2, Jalan Bukit Jalil Indah 4, Taman LTAT, 57000 Kuala Lumpur",
  area: "Bukit Jalil",
  lat: 3.0564,
  lng: 101.6669,
  tenure: "Leasehold",
  landTitle: "Residential",
  landSize: "5.6 Acres",
  status: "Under Construction",
  completionYear: 2027,
  totalUnits: 1260,
  storeys: 52,
  towers: 2,
  unitsPerFloor: "16",
  lifts: "5+1",
  builtUpMin: 920,
  builtUpMax: 1680,
  bedrooms: "3 - 4+1",
  bathrooms: "2 - 3",
  priceFrom: "RM 537,000",
  priceFromNumber: 537000,
  maintenance: "RM0.35 psf",
  carPark: "2 – 3 bays per unit"
} as const;

export const KEY_FEATURES = [
  "Designed in a unique '人' shape for optimum sunlight and views.",
  "Up to 4+1 bedrooms & 3 bathrooms.",
  "Over an acre of family-friendly recreational facilities.",
  "3-tier security with face recognition and license plate recognition access.",
  "2 to 3 parking bays per unit.",
  "Co-working spaces available."
];

export type Layout = { type: string; sqft: number; beds: string; baths: number; image: string };
export const LAYOUTS: Layout[] = [
  { type: "Type A", sqft: 920, beds: "3", baths: 2, image: IMG.type_a },
  { type: "Type B1", sqft: 1050, beds: "3 + 1", baths: 2, image: IMG.type_b1 },
  { type: "Type B2", sqft: 1110, beds: "3 + 1", baths: 2, image: IMG.type_b2 },
  { type: "Type B3", sqft: 1120, beds: "3 + 1", baths: 2, image: IMG.type_b3 },
  { type: "Type C", sqft: 1270, beds: "4 + 1", baths: 3, image: IMG.type_c },
  { type: "Type D", sqft: 1680, beds: "4 + 1", baths: 3, image: IMG.type_d }
];

/** Facility list as printed in the developer's summary, grouped as the developer groups them. */
export const FACILITY_GROUPS: { group: string; items: string[] }[] = [
  {
    "group": "Podium",
    "items": [
      "Infinity Swimming Pool",
      "Pool Deck",
      "Quiet Pool",
      "Jacuzzi - 1",
      "Jacuzzi - 2",
      "Shallow Pool",
      "Pool Terrace",
      "Kid Slider Pool",
      "Kid Pool",
      "Kid Play Pool",
      "Kid Shallow Pool",
      "Kid Small Pool",
      "Parent Seating Area",
      "Outdoor Shower",
      "Artificial Turf",
      "Multipurpose Artificial Turf",
      "Plaza",
      "Outdoor Meeting-1",
      "Outdoor Meeting-2",
      "Outdoor Lounge",
      "Picnic Court",
      "BBQ Area",
      "Children Play Station",
      "Children Twin Swing",
      "Children Mini Climb Wall",
      "Children Berm Play",
      "Children Sand Pit",
      "Children Balancing",
      "Outdoor Gym Station",
      "Pocket Garden",
      "Jogging Track",
      "Yoga Deck",
      "Children Play Net-1",
      "Children Play Net-2",
      "Stone Foot Therapy",
      "Basketball Court",
      "Tennis / Futsal Court",
      "Seating Area",
      "Changing Room-1",
      "Changing Room-2",
      "Multipurpose Hall",
      "Badminton Court",
      "Tadika / Kindergarten",
      "Taska / Childcare",
      "Management Office",
      "Shop",
      "Function Room 1",
      "Function Room 2",
      "Games Room",
      "Co-Working Room",
      "Gymnasium",
      "Yoga Room",
      "Steam Room",
      "Sauna Room",
      "Laundry",
      "Surau / Prayer Room",
      "Concierge",
      "Guardhouse"
    ]
  }
];

export const AMENITIES: { category: string; items: string[] }[] = [
  {
    "category": "Highways",
    "items": [
      "KESAS Highway",
      "Bukit Jalil Highway",
      "KL-Seremban Expressway",
      "Sungai Besi Expressway"
    ]
  },
  {
    "category": "Public Transport",
    "items": [
      "Alam Sutera LRT Station"
    ]
  },
  {
    "category": "Shopping & Retail",
    "items": [
      "Pavilion Bukit Jalil",
      "Giant Hypermarket Bandar Kinrara"
    ]
  },
  {
    "category": "Education",
    "items": [
      "Tzu Chi International School",
      "International Medical University (IMU)",
      "Kingsgate International School",
      "Technology Park Malaysia"
    ]
  },
  {
    "category": "Recreation",
    "items": [
      "Bukit Jalil Golf & Country Club",
      "Kinrara Golf Club",
      "Pavillion Recreational Park",
      "National Stadium Bukit Jalil"
    ]
  }
];

/** Drive times as stated on the previous site (indicative, not surveyed). */
export const DISTANCES: Record<string, string> = {
  "Pavilion Bukit Jalil": "about 1.8 km, 3 minutes' drive",
  "Alam Sutera LRT Station": "about 500 m, walkable",
  "Tzu Chi International School": "2 minutes' drive",
  "International Medical University (IMU)": "5 minutes' drive",
  "Bukit Jalil Golf & Country Club": "5 minutes' drive",
  "National Stadium Bukit Jalil": "6 minutes' drive"
};

export const FAQ = [
  { q: "Is Ren Residence a residential or commercial title?", a: "Residential title. Utilities are billed at domestic rates and there is no commercial podium traffic, which many families prefer." },
  { q: "Is Ren Residence freehold or leasehold?", a: "Leasehold, on an elevated 5.6-acre site in Bukit Jalil." },
  { q: "What is the starting price?", a: "From RM 537,000. Ask for the current price list; prices are set by the developer and may change." },
  { q: "What layouts and sizes are available?", a: "Six layouts from 920 to 1,680 sq ft: Type A (3 bedrooms), Types B1, B2 and B3 (3 + 1 bedrooms) and Types C and D (4 + 1 bedrooms, 3 bathrooms). Twin 52-storey towers hold 1,260 units, 16 units per floor, each tower served by 5 + 1 lifts." },
  { q: "When will Ren Residence be completed?", a: "The developer's target is 2027; the project is under construction." },
  { q: "What facilities are there, and what is the maintenance fee?", a: "Over an acre of facilities: an infinity pool, children's pools and play areas, basketball, tennis / futsal and badminton courts, a gym, yoga room, sauna and steam rooms, co-working room, function rooms, a kindergarten and childcare centre, jogging track and gardens. The maintenance fee is RM 0.35 per sq ft." },
  { q: "How is the location for getting around?", a: "Alam Sutera LRT station is about 500 m away and Pavilion Bukit Jalil about 1.8 km (a 3-minute drive), with the KESAS, Bukit Jalil, KL–Seremban and Sungai Besi expressways nearby. Tzu Chi International School, IMU and Kingsgate International School are minutes away." },
  { q: "Who is the developer and the architect?", a: "Developed by Gaya Kuasa Sdn Bhd and designed by GDP Architects, whose '人'-shaped twin towers are planned for sunlight, ventilation and privacy between neighbours." },
  { q: "How do I arrange a viewing or get the floor plans?", a: "WhatsApp Yee Woei Shyan (REN 46305, IQI Realty Sdn Bhd) at +60 10-827 8932, or use the registration form on this page." }
];
