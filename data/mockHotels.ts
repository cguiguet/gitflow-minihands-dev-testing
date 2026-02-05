export interface Hotel {
  id: string;
  name: string;
  images: string[];
  starRating: number;
  reviewScore: number;
  reviewCount: number;
  amenities: string[];
  pricePerNight: number;
  currency: string;
  location: string;
  distance: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export const mockHotels: Hotel[] = [
  {
    id: 'h1',
    name: 'Le Grand Hotel',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    ],
    starRating: 5,
    reviewScore: 4.8,
    reviewCount: 1243,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking'],
    pricePerNight: 280,
    currency: 'USD',
    location: 'City Center',
    distance: '0.5 km from center',
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
  },
  {
    id: 'h2',
    name: 'Boutique Champs-Élysées',
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    ],
    starRating: 4,
    reviewScore: 4.6,
    reviewCount: 856,
    amenities: ['WiFi', 'Restaurant', 'Bar', 'Concierge'],
    pricePerNight: 195,
    currency: 'USD',
    location: 'Champs-Élysées',
    distance: '1.2 km from center',
    coordinates: {
      latitude: 48.8698,
      longitude: 2.3078,
    },
  },
  {
    id: 'h3',
    name: 'Marais Luxury Suites',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
    ],
    starRating: 4,
    reviewScore: 4.7,
    reviewCount: 632,
    amenities: ['WiFi', 'Kitchen', 'Parking', 'Pet-friendly'],
    pricePerNight: 165,
    currency: 'USD',
    location: 'Le Marais',
    distance: '0.8 km from center',
    coordinates: {
      latitude: 48.8584,
      longitude: 2.3639,
    },
  },
  {
    id: 'h4',
    name: 'Montmartre View Hotel',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
    ],
    starRating: 3,
    reviewScore: 4.4,
    reviewCount: 421,
    amenities: ['WiFi', 'Breakfast', 'Terrace'],
    pricePerNight: 125,
    currency: 'USD',
    location: 'Montmartre',
    distance: '2.5 km from center',
    coordinates: {
      latitude: 48.8867,
      longitude: 2.3431,
    },
  },
  {
    id: 'h5',
    name: 'Riverside Palace',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    ],
    starRating: 5,
    reviewScore: 4.9,
    reviewCount: 2156,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking', 'River View'],
    pricePerNight: 350,
    currency: 'USD',
    location: 'Seine Riverside',
    distance: '0.3 km from center',
    coordinates: {
      latitude: 48.8534,
      longitude: 2.3488,
    },
  },
];

export function getHotelsByDestination(destinationId: string): Hotel[] {
  return mockHotels;
}
