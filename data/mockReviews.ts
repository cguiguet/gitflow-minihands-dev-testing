export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  helpful: number;
  travelerType: 'Solo' | 'Couple' | 'Family' | 'Friends' | 'Business';
  photos?: string[];
}

export const mockReviews: Review[] = [
  {
    id: 'r1',
    userName: 'Sarah Johnson',
    userAvatar: '👩',
    rating: 5,
    date: '2024-01-15',
    title: 'Absolutely magical experience!',
    text: 'Paris exceeded all my expectations. The Eiffel Tower at sunset was breathtaking, and the food was incredible. Our hotel was perfectly located near all major attractions. Would definitely recommend spending at least 5 days here to fully experience the city.',
    helpful: 42,
    travelerType: 'Couple',
    photos: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80',
    ],
  },
  {
    id: 'r2',
    userName: 'Michael Chen',
    userAvatar: '👨',
    rating: 4,
    date: '2024-01-10',
    title: 'Great city but very crowded',
    text: 'Loved the museums and architecture. The Louvre was amazing but extremely busy even with skip-the-line tickets. Metro system is efficient and easy to use. Food is pricey but worth it. Recommend visiting in shoulder season to avoid crowds.',
    helpful: 28,
    travelerType: 'Solo',
  },
  {
    id: 'r3',
    userName: 'Emma Williams',
    userAvatar: '👩',
    rating: 5,
    date: '2024-01-05',
    title: 'Perfect family vacation',
    text: 'Traveled with two kids (ages 8 and 12) and they loved it! The river cruise was a highlight, and the parks were beautiful. Plenty of kid-friendly restaurants. The city is very walkable and safe. Our hotel had connecting rooms which was perfect.',
    helpful: 35,
    travelerType: 'Family',
    photos: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80',
    ],
  },
  {
    id: 'r4',
    userName: 'David Martinez',
    userAvatar: '👨',
    rating: 5,
    date: '2023-12-28',
    title: 'Romantic getaway perfection',
    text: 'Proposed to my girlfriend at the Eiffel Tower! The city is incredibly romantic. Every corner is Instagram-worthy. The wine, cheese, and pastries are phenomenal. We did a cooking class which was a unique experience. Can\'t wait to return for our honeymoon!',
    helpful: 56,
    travelerType: 'Couple',
    photos: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80',
    ],
  },
  {
    id: 'r5',
    userName: 'Lisa Anderson',
    userAvatar: '👩',
    rating: 4,
    date: '2023-12-20',
    title: 'Beautiful but expensive',
    text: 'The city is stunning and has so much history. Museums are world-class. However, it\'s quite expensive - budget accordingly. Some areas felt touristy but Montmartre was charming and authentic. Learn a few French phrases, locals appreciate the effort!',
    helpful: 19,
    travelerType: 'Friends',
  },
  {
    id: 'r6',
    userName: 'James Wilson',
    userAvatar: '👨',
    rating: 5,
    date: '2023-12-15',
    title: 'Business trip turned adventure',
    text: 'Was here for a conference but made time to explore. The business district is modern and efficient. After work, enjoyed amazing restaurants and nightlife. The city has great balance of work and leisure. Metro made it easy to get around.',
    helpful: 12,
    travelerType: 'Business',
  },
  {
    id: 'r7',
    userName: 'Sophie Taylor',
    userAvatar: '👩',
    rating: 5,
    date: '2023-12-10',
    title: 'Art lover\'s paradise',
    text: 'As an art enthusiast, Paris is heaven! Spent days in the Louvre, Musée d\'Orsay, and smaller galleries. The architecture itself is art. Street performers add to the ambiance. Café culture is real - spent hours people-watching. Absolutely enchanting!',
    helpful: 31,
    travelerType: 'Solo',
    photos: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80',
    ],
  },
  {
    id: 'r8',
    userName: 'Robert Brown',
    userAvatar: '👨',
    rating: 4,
    date: '2023-12-05',
    title: 'Great trip with friends',
    text: 'Went with a group of 6 friends. Had an amazing time exploring together. The nightlife is vibrant, especially in the Latin Quarter. Day trips to Versailles and Giverny were highlights. Group dinners were affordable when sharing. Highly recommend!',
    helpful: 24,
    travelerType: 'Friends',
  },
];

export function getReviewsByDestination(destinationId: string): Review[] {
  return mockReviews;
}

export function getReviewStats(reviews: Review[]) {
  const total = reviews.length;
  const breakdown = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / total;

  return {
    total,
    average: Math.round(average * 10) / 10,
    breakdown,
  };
}
