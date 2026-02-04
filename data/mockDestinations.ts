export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
  description: string;
}

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    price: 899,
    currency: 'USD',
    rating: 4.8,
    description: 'The City of Light awaits with iconic landmarks and world-class cuisine',
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
    price: 1299,
    currency: 'USD',
    rating: 4.9,
    description: 'Experience the perfect blend of tradition and cutting-edge technology',
  },
  {
    id: '3',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    price: 699,
    currency: 'USD',
    rating: 4.7,
    description: 'Tropical paradise with stunning beaches and rich culture',
  },
  {
    id: '4',
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    price: 799,
    currency: 'USD',
    rating: 4.6,
    description: 'The city that never sleeps with endless entertainment',
  },
  {
    id: '5',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
    price: 1099,
    currency: 'USD',
    rating: 4.9,
    description: 'Breathtaking sunsets and white-washed buildings',
  },
  {
    id: '6',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    price: 999,
    currency: 'USD',
    rating: 4.7,
    description: 'Luxury shopping and ultramodern architecture',
  },
];
