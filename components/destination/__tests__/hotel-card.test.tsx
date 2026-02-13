import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { HotelCard } from '../hotel-card';
import { Hotel } from '@/data/mockHotels';
import * as Haptics from 'expo-haptics';

jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: jest.fn(() => '#000000'),
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
}));

describe('HotelCard', () => {
  const mockHotel: Hotel = {
    id: 'hotel-1',
    destinationId: 'paris',
    name: 'Le Grand Hotel',
    images: [
      'https://example.com/hotel1.jpg',
      'https://example.com/hotel2.jpg',
    ],
    starRating: 5,
    reviewScore: 9.2,
    reviewCount: 1543,
    location: 'Champs-Élysées',
    distance: '0.5 km from center',
    pricePerNight: 350,
    currency: 'USD',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking', 'Bar'],
    coordinates: { latitude: 48.8698, longitude: 2.3078 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render hotel card with all details', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);
    
    expect(getByText('Le Grand Hotel')).toBeTruthy();
    expect(getByText('9.2')).toBeTruthy();
    expect(getByText('(1543)')).toBeTruthy();
    expect(getByText('Champs-Élysées')).toBeTruthy();
    expect(getByText('• 0.5 km from center')).toBeTruthy();
    expect(getByText('From')).toBeTruthy();
    expect(getByText(/\$350/)).toBeTruthy();
    expect(getByText('Details')).toBeTruthy();
    expect(getByText('Book')).toBeTruthy();
  });

  it('should display correct number of stars', () => {
    const { getAllByText } = render(<HotelCard hotel={mockHotel} />);
    const stars = getAllByText('⭐');
    expect(stars).toHaveLength(5);
  });

  it('should display correct star rating for different ratings', () => {
    const ratings = [3, 4, 5];
    
    ratings.forEach(starRating => {
      const hotel = { ...mockHotel, starRating };
      const { getAllByText } = render(<HotelCard hotel={hotel} />);
      const stars = getAllByText('⭐');
      expect(stars).toHaveLength(starRating);
    });
  });

  it('should display location with icon', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);
    expect(getByText('📍')).toBeTruthy();
    expect(getByText('Champs-Élysées')).toBeTruthy();
  });

  it('should display distance from center', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);
    expect(getByText('• 0.5 km from center')).toBeTruthy();
  });

  it('should display amenities with icons', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);
    
    expect(getByText('WiFi')).toBeTruthy();
    expect(getByText('📶')).toBeTruthy();
    expect(getByText('Pool')).toBeTruthy();
    expect(getByText('🏊')).toBeTruthy();
    expect(getByText('Spa')).toBeTruthy();
    expect(getByText('💆')).toBeTruthy();
  });

  it('should display only first 6 amenities', () => {
    const { getByText, queryByText } = render(<HotelCard hotel={mockHotel} />);
    
    expect(getByText('WiFi')).toBeTruthy();
    expect(getByText('Pool')).toBeTruthy();
    expect(getByText('Spa')).toBeTruthy();
    expect(getByText('Restaurant')).toBeTruthy();
    expect(getByText('Gym')).toBeTruthy();
    expect(getByText('Parking')).toBeTruthy();
    expect(queryByText('Bar')).toBeNull();
  });

  it('should display price per night', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);
    expect(getByText(/\$350/)).toBeTruthy();
    expect(getByText('/night')).toBeTruthy();
  });

  it('should call onBook when book button is pressed', () => {
    const onBook = jest.fn();
    const { getByText } = render(<HotelCard hotel={mockHotel} onBook={onBook} />);
    
    const bookButton = getByText('Book');
    fireEvent.press(bookButton);
    
    expect(onBook).toHaveBeenCalledWith(mockHotel);
  });

  it('should trigger medium haptic feedback when booking', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);
    
    const bookButton = getByText('Book');
    fireEvent.press(bookButton);
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
  });

  it('should trigger light haptic feedback when viewing details', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);
    
    const detailsButton = getByText('Details');
    fireEvent.press(detailsButton);
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('should not crash when onBook is not provided', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);
    
    const bookButton = getByText('Book');
    expect(() => fireEvent.press(bookButton)).not.toThrow();
  });

  it('should handle hotels with fewer amenities', () => {
    const fewAmenitiesHotel = { ...mockHotel, amenities: ['WiFi', 'Pool'] };
    const { getByText } = render(<HotelCard hotel={fewAmenitiesHotel} />);
    
    expect(getByText('WiFi')).toBeTruthy();
    expect(getByText('Pool')).toBeTruthy();
  });

  it('should handle amenities without predefined icons', () => {
    const customAmenityHotel = { ...mockHotel, amenities: ['Custom Amenity'] };
    const { getByText } = render(<HotelCard hotel={customAmenityHotel} />);
    
    expect(getByText('Custom Amenity')).toBeTruthy();
    expect(getByText('✓')).toBeTruthy();
  });

  it('should display review score and count', () => {
    const { getByText } = render(<HotelCard hotel={mockHotel} />);
    expect(getByText('9.2')).toBeTruthy();
    expect(getByText('(1543)')).toBeTruthy();
  });

  it('should handle different price values', () => {
    const prices = [100, 500, 1000];
    
    prices.forEach(pricePerNight => {
      const hotel = { ...mockHotel, pricePerNight };
      const { getByText } = render(<HotelCard hotel={hotel} />);
      expect(getByText(new RegExp(`\\$${pricePerNight}`))).toBeTruthy();
    });
  });

  it('should render multiple images in carousel', () => {
    const multiImageHotel = {
      ...mockHotel,
      images: [
        'https://example.com/img1.jpg',
        'https://example.com/img2.jpg',
        'https://example.com/img3.jpg',
      ],
    };
    
    const { UNSAFE_getAllByType } = render(<HotelCard hotel={multiImageHotel} />);
    const images = UNSAFE_getAllByType('Image' as any);
    expect(images.length).toBeGreaterThanOrEqual(3);
  });

  it('should handle different review scores', () => {
    const scores = [7.5, 8.8, 9.5];
    
    scores.forEach(reviewScore => {
      const hotel = { ...mockHotel, reviewScore };
      const { getByText } = render(<HotelCard hotel={hotel} />);
      expect(getByText(reviewScore.toString())).toBeTruthy();
    });
  });

  it('should display all common amenity icons correctly', () => {
    const amenitiesWithIcons = {
      ...mockHotel,
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Parking'],
    };
    
    const { getByText } = render(<HotelCard hotel={amenitiesWithIcons} />);
    
    expect(getByText('📶')).toBeTruthy(); // WiFi
    expect(getByText('🏊')).toBeTruthy(); // Pool
    expect(getByText('💆')).toBeTruthy(); // Spa
    expect(getByText('🍽️')).toBeTruthy(); // Restaurant
    expect(getByText('💪')).toBeTruthy(); // Gym
    expect(getByText('🅿️')).toBeTruthy(); // Parking
  });
});
