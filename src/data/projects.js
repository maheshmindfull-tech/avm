/**
 * AVM Project Data
 *
 * IMPORTANT: This is sample/demo data for development and demonstration purposes.
 * Replace with verified project information provided by AVM and its channel partners
 * before publishing to production.
 *
 * Do not present this sample data as real, verified project listings.
 */

export const PROJECT_STATUSES = {
  ONGOING: 'Ongoing',
  UNDER_CONSTRUCTION: 'Ongoing',
  LAUNCHING_SOON: 'Launching Soon',
  POSSESSION_SOON: 'Possession Soon',
  READY_TO_MOVE: 'Ready to Move',
};

export const PROPERTY_TYPES = {
  APARTMENT: 'Apartment',
  VILLA: 'Villa',
  TOWNHOUSE: 'Townhouse',
  PENTHOUSE: 'Penthouse',
};

export const CONFIGURATIONS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'];

export const LOCATIONS = [
  'Baner',
  'Wakad',
  'Hinjewadi',
  'Kharadi',
  'Hadapsar',
  'Aundh',
  'Balewadi',
  'Koregaon Park',
];

export const BUDGET_RANGES = [
  { label: 'Under ₹50 Lakh', min: 0, max: 5000000 },
  { label: '₹50 Lakh – ₹1 Cr', min: 5000000, max: 10000000 },
  { label: '₹1 Cr – ₹2 Cr', min: 10000000, max: 20000000 },
  { label: '₹2 Cr – ₹5 Cr', min: 20000000, max: 50000000 },
  { label: 'Above ₹5 Cr', min: 50000000, max: Infinity },
];

const projects = [
  {
    id: 'avm-courtyard',
    slug: 'avm-courtyard',
    name: 'AVM Courtyard',
    location: 'Baner',
    city: 'Pune',
    propertyType: PROPERTY_TYPES.APARTMENT,
    configurations: ['2 BHK', '3 BHK'],
    priceRange: 'Contact for pricing',
    status: PROJECT_STATUSES.UNDER_CONSTRUCTION,
    featured: true,
    shortDescription: 'Contemporary residences with podium gardens, a landscaped courtyard, and a modern clubhouse.',
    description: 'AVM Courtyard offers thoughtfully designed apartments in the heart of Baner. The project features podium-level gardens, a central landscaped courtyard, and a fully equipped clubhouse. Designed for families seeking a balance of comfort, community, and connectivity.',
    highlights: [
      'Podium-level landscaped gardens',
      'Central courtyard with water feature',
      'Modern clubhouse with fitness centre',
      'Children\'s play area',
      'Covered parking for all units',
      'Proximity to IT hubs and schools',
    ],
    images: {
      card: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format',
      hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80&auto=format',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format',
      ],
    },
    demoData: true,
  },
  {
    id: 'avm-grove',
    slug: 'avm-grove',
    name: 'AVM Grove',
    location: 'Wakad',
    city: 'Pune',
    propertyType: PROPERTY_TYPES.APARTMENT,
    configurations: ['2 BHK'],
    priceRange: 'Contact for pricing',
    status: PROJECT_STATUSES.LAUNCHING_SOON,
    featured: true,
    shortDescription: 'Compact, well-planned apartments surrounded by landscaped courtyards and green spaces.',
    description: 'AVM Grove brings efficient, well-designed 2 BHK apartments to Wakad. Set amidst landscaped courtyards with covered parking and thoughtful amenities, the project is ideal for young professionals and small families seeking a modern, convenient home.',
    highlights: [
      'Landscaped courtyards',
      'Covered parking',
      'Multipurpose community hall',
      'Jogging track',
      'Close to major highways',
      'Neighbourhood retail planned',
    ],
    images: {
      card: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format',
      hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80&auto=format',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format',
      ],
    },
    demoData: true,
  },
  {
    id: 'avm-terraces',
    slug: 'avm-terraces',
    name: 'AVM Terraces',
    location: 'Hinjewadi',
    city: 'Pune',
    propertyType: PROPERTY_TYPES.APARTMENT,
    configurations: ['1 BHK', '2 BHK'],
    priceRange: 'Contact for pricing',
    status: PROJECT_STATUSES.UNDER_CONSTRUCTION,
    featured: true,
    shortDescription: 'Modern apartments with private terrace gardens and a co-working lounge near Hinjewadi IT Park.',
    description: 'AVM Terraces provides modern 1 and 2 BHK apartments with select units featuring private terrace gardens. Located near Hinjewadi IT Park, the project includes a co-working lounge, rooftop leisure deck, and well-planned parking infrastructure.',
    highlights: [
      'Select units with private terrace gardens',
      'Co-working lounge',
      'Rooftop leisure deck',
      'Near Hinjewadi IT Park',
      'EV charging infrastructure',
      'Smart home-ready units',
    ],
    images: {
      card: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&auto=format',
      hero: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80&auto=format',
      gallery: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80&auto=format',
      ],
    },
    demoData: true,
  },
  {
    id: 'avm-park-residences',
    slug: 'avm-park-residences',
    name: 'AVM Park Residences',
    location: 'Kharadi',
    city: 'Pune',
    propertyType: PROPERTY_TYPES.APARTMENT,
    configurations: ['3 BHK'],
    priceRange: 'Contact for pricing',
    status: PROJECT_STATUSES.POSSESSION_SOON,
    featured: true,
    shortDescription: 'Spacious park-facing apartments with a swimming pool, gymnasium, and landscaped common areas.',
    description: 'AVM Park Residences offers spacious 3 BHK apartments overlooking a landscaped park. The project includes a swimming pool, fully equipped gymnasium, and generous common areas. Designed for families who value space, light, and a sense of community.',
    highlights: [
      'Park-facing apartments',
      'Swimming pool',
      'Fully equipped gymnasium',
      'Landscaped common areas',
      'Senior citizen zone',
      'Close to Kharadi business district',
    ],
    images: {
      card: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format',
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format',
      ],
    },
    demoData: true,
  },
  {
    id: 'avm-heights',
    slug: 'avm-heights',
    name: 'AVM Heights',
    location: 'Hadapsar',
    city: 'Pune',
    propertyType: PROPERTY_TYPES.APARTMENT,
    configurations: ['2 BHK', '3 BHK'],
    priceRange: 'Contact for pricing',
    status: PROJECT_STATUSES.UNDER_CONSTRUCTION,
    featured: false,
    shortDescription: 'High-rise living with panoramic views and a sky lounge in the growing Hadapsar corridor.',
    description: 'AVM Heights is a high-rise residential project offering 2 and 3 BHK apartments in Hadapsar. The project features panoramic city views, a sky lounge, and premium specifications. Located in one of Pune\'s fastest-growing residential corridors.',
    highlights: [
      'High-rise with panoramic views',
      'Sky lounge',
      'Premium interior specifications',
      'Dedicated retail zone',
      'Children\'s play area',
      'Near IT parks and metro corridor',
    ],
    images: {
      card: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80&auto=format',
      hero: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1600&q=80&auto=format',
      gallery: [
        'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80&auto=format',
      ],
    },
    demoData: true,
  },
  {
    id: 'avm-orchard',
    slug: 'avm-orchard',
    name: 'AVM Orchard',
    location: 'Aundh',
    city: 'Pune',
    propertyType: PROPERTY_TYPES.APARTMENT,
    configurations: ['2 BHK'],
    priceRange: 'Contact for pricing',
    status: PROJECT_STATUSES.LAUNCHING_SOON,
    featured: false,
    shortDescription: 'Green-themed residences with tree-lined pathways and dedicated open spaces in Aundh.',
    description: 'AVM Orchard brings green-themed 2 BHK residences to Aundh. The project features tree-lined pathways, a children\'s play zone, and dedicated open spaces. Ideal for buyers looking for a peaceful, well-connected address in an established Pune neighbourhood.',
    highlights: [
      'Tree-lined pathways',
      'Dedicated green spaces',
      'Children\'s play zone',
      'Walking and jogging tracks',
      'Established neighbourhood',
      'Proximity to hospitals and schools',
    ],
    images: {
      card: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80&auto=format',
      hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80&auto=format',
      gallery: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80&auto=format',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format',
      ],
    },
    demoData: true,
  },
];

export default projects;
