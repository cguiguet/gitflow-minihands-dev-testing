export interface Deal {
  id: string;
  title: string;
  destination: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  currency: string;
  discount: number;
  validUntil: string;
  type: 'flight' | 'hotel' | 'package';
}

export const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'Summer Escape to Maldives',
    destination: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    originalPrice: 2499,
    discountedPrice: 1799,
    currency: 'USD',
    discount: 28,
    validUntil: '2024-06-30',
    type: 'package',
  },
  {
    id: '2',
    title: 'Weekend in Barcelona',
    destination: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80',
    originalPrice: 599,
    discountedPrice: 399,
    currency: 'USD',
    discount: 33,
    validUntil: '2024-05-15',
    type: 'hotel',
  },
  {
    id: '3',
    title: 'Round Trip to London',
    destination: 'London, UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    originalPrice: 899,
    discountedPrice: 649,
    currency: 'USD',
    discount: 28,
    validUntil: '2024-04-30',
    type: 'flight',
  },
  {
    id: '4',
    title: 'All-Inclusive Cancun',
    destination: 'Cancun, Mexico',
    image: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800&q=80',
    originalPrice: 1599,
    discountedPrice: 1199,
    currency: 'USD',
    discount: 25,
    validUntil: '2024-07-31',
    type: 'package',
  },
];
