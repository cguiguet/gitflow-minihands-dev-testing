export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'Tours' | 'Food & Drink' | 'Outdoor' | 'Culture' | 'Adventure' | 'Nightlife';
  duration: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
}

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    title: 'Eiffel Tower Skip-the-Line Tour',
    description: 'Skip the long lines and enjoy priority access to the iconic Eiffel Tower with an expert guide.',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&q=80',
    category: 'Tours',
    duration: '2 hours',
    price: 65,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 3421,
    highlights: ['Skip-the-line access', 'Expert guide', 'Summit access', 'Photo opportunities'],
  },
  {
    id: 'a2',
    title: 'Seine River Dinner Cruise',
    description: 'Enjoy a romantic dinner cruise along the Seine with stunning views of Paris landmarks.',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    category: 'Food & Drink',
    duration: '3 hours',
    price: 95,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 2156,
    highlights: ['3-course dinner', 'Live music', 'Champagne included', 'Sunset views'],
  },
  {
    id: 'a3',
    title: 'Louvre Museum Guided Tour',
    description: 'Discover the world\'s most famous artworks including the Mona Lisa with a knowledgeable guide.',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    category: 'Culture',
    duration: '3 hours',
    price: 55,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 4532,
    highlights: ['Skip-the-line', 'Expert art historian', 'Small group', 'Headsets included'],
  },
  {
    id: 'a4',
    title: 'Versailles Palace Day Trip',
    description: 'Full-day excursion to the magnificent Palace of Versailles with gardens and fountains.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    category: 'Tours',
    duration: 'Full day',
    price: 85,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 1876,
    highlights: ['Round-trip transport', 'Palace tour', 'Garden access', 'Lunch included'],
  },
  {
    id: 'a5',
    title: 'French Cooking Class',
    description: 'Learn to cook authentic French cuisine with a professional chef in a charming Parisian kitchen.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
    category: 'Food & Drink',
    duration: '4 hours',
    price: 120,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 892,
    highlights: ['Hands-on cooking', 'Market visit', 'Recipe booklet', 'Wine pairing'],
  },
  {
    id: 'a6',
    title: 'Montmartre Walking Tour',
    description: 'Explore the artistic neighborhood of Montmartre with its charming streets and Sacré-Cœur.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    category: 'Culture',
    duration: '2.5 hours',
    price: 35,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 1654,
    highlights: ['Local guide', 'Sacré-Cœur visit', 'Artist studios', 'Wine tasting'],
  },
  {
    id: 'a7',
    title: 'Hot Air Balloon Ride',
    description: 'Soar above the French countryside and enjoy breathtaking aerial views of châteaux.',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80',
    category: 'Adventure',
    duration: '3 hours',
    price: 195,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 543,
    highlights: ['Sunrise flight', 'Champagne toast', 'Certificate', 'Photos included'],
  },
  {
    id: 'a8',
    title: 'Moulin Rouge Show',
    description: 'Experience the world-famous cabaret show with dazzling costumes and performances.',
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&q=80',
    category: 'Nightlife',
    duration: '2 hours',
    price: 110,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 2341,
    highlights: ['Premium seating', 'Champagne included', 'Dinner option', 'Classic show'],
  },
];

export function getActivitiesByDestination(destinationId: string): Activity[] {
  return mockActivities;
}

export function getActivitiesByCategory(category: Activity['category']): Activity[] {
  return mockActivities.filter((activity) => activity.category === category);
}
