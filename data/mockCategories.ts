export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Flights',
    icon: 'airplane',
    color: '#3B82F6',
  },
  {
    id: '2',
    name: 'Hotels',
    icon: 'bed.double',
    color: '#8B5CF6',
  },
  {
    id: '3',
    name: 'Car Rentals',
    icon: 'car',
    color: '#10B981',
  },
  {
    id: '4',
    name: 'Activities',
    icon: 'figure.hiking',
    color: '#F59E0B',
  },
  {
    id: '5',
    name: 'Cruises',
    icon: 'ferry',
    color: '#06B6D4',
  },
  {
    id: '6',
    name: 'Trains',
    icon: 'tram',
    color: '#EF4444',
  },
];

export interface RecentSearch {
  id: string;
  destination: string;
  dates: string;
  travelers: number;
  type: 'flight' | 'hotel' | 'package';
  timestamp: string;
}

export const mockRecentSearches: RecentSearch[] = [
  {
    id: '1',
    destination: 'Paris, France',
    dates: 'May 15 - May 22',
    travelers: 2,
    type: 'flight',
    timestamp: '2024-03-01T10:30:00Z',
  },
  {
    id: '2',
    destination: 'Tokyo, Japan',
    dates: 'Jun 10 - Jun 20',
    travelers: 1,
    type: 'package',
    timestamp: '2024-02-28T14:20:00Z',
  },
  {
    id: '3',
    destination: 'Bali, Indonesia',
    dates: 'Jul 5 - Jul 15',
    travelers: 4,
    type: 'hotel',
    timestamp: '2024-02-25T09:15:00Z',
  },
];
