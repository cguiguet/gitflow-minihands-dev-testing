import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ReviewCard } from '../review-card';
import { Review } from '@/data/mockReviews';
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

describe('ReviewCard', () => {
  const mockReview: Review = {
    id: 'rev-1',
    destinationId: 'paris',
    userName: 'Sarah Johnson',
    userAvatar: '👩',
    rating: 5,
    date: '2024-01-15',
    title: 'Absolutely Amazing!',
    text: 'Paris exceeded all my expectations. The Eiffel Tower at night is breathtaking.',
    travelerType: 'Couple',
    helpful: 42,
    photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render review card with all details', () => {
    const { getByText } = render(<ReviewCard review={mockReview} />);
    
    expect(getByText('Sarah Johnson')).toBeTruthy();
    expect(getByText('👩')).toBeTruthy();
    expect(getByText('Absolutely Amazing!')).toBeTruthy();
    expect(getByText(/Paris exceeded all my expectations/)).toBeTruthy();
    expect(getByText('Couple')).toBeTruthy();
    expect(getByText('Helpful (42)')).toBeTruthy();
  });

  it('should display correct number of stars based on rating', () => {
    const { getAllByText } = render(<ReviewCard review={mockReview} />);
    const stars = getAllByText('⭐');
    expect(stars).toHaveLength(5);
  });

  it('should display partial stars for lower ratings', () => {
    const lowRatingReview = { ...mockReview, rating: 3 };
    const { getAllByText } = render(<ReviewCard review={lowRatingReview} />);
    
    const filledStars = getAllByText('⭐');
    const emptyStars = getAllByText('☆');
    
    expect(filledStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });

  it('should format date correctly', () => {
    const { getByText } = render(<ReviewCard review={mockReview} />);
    expect(getByText('Jan 2024')).toBeTruthy();
  });

  it('should display traveler type', () => {
    const { getByText } = render(<ReviewCard review={mockReview} />);
    expect(getByText('Couple')).toBeTruthy();
  });

  it('should display separator between metadata', () => {
    const { getByText } = render(<ReviewCard review={mockReview} />);
    expect(getByText('•')).toBeTruthy();
  });

  it('should increment helpful count when button is pressed', () => {
    const { getByText } = render(<ReviewCard review={mockReview} />);
    
    const helpfulButton = getByText('Helpful (42)');
    fireEvent.press(helpfulButton);
    
    expect(getByText('Helpful (43)')).toBeTruthy();
  });

  it('should only increment helpful count once', () => {
    const { getByText } = render(<ReviewCard review={mockReview} />);
    
    const helpfulButton = getByText('Helpful (42)');
    fireEvent.press(helpfulButton);
    fireEvent.press(helpfulButton);
    fireEvent.press(helpfulButton);
    
    expect(getByText('Helpful (43)')).toBeTruthy();
  });

  it('should trigger haptic feedback when helpful button is pressed', () => {
    const { getByText } = render(<ReviewCard review={mockReview} />);
    
    const helpfulButton = getByText('Helpful (42)');
    fireEvent.press(helpfulButton);
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('should render without title if not provided', () => {
    const noTitleReview = { ...mockReview, title: undefined };
    const { queryByText, getByText } = render(<ReviewCard review={noTitleReview} />);
    
    expect(queryByText('Absolutely Amazing!')).toBeNull();
    expect(getByText(/Paris exceeded all my expectations/)).toBeTruthy();
  });

  it('should render without photos if not provided', () => {
    const noPhotosReview = { ...mockReview, photos: undefined };
    const { getByText } = render(<ReviewCard review={noPhotosReview} />);
    
    expect(getByText('Sarah Johnson')).toBeTruthy();
  });

  it('should render with empty photos array', () => {
    const emptyPhotosReview = { ...mockReview, photos: [] };
    const { getByText } = render(<ReviewCard review={emptyPhotosReview} />);
    
    expect(getByText('Sarah Johnson')).toBeTruthy();
  });

  it('should handle different traveler types', () => {
    const types = ['Solo', 'Family', 'Business', 'Friends'];
    
    types.forEach(type => {
      const review = { ...mockReview, travelerType: type };
      const { getByText } = render(<ReviewCard review={review} />);
      expect(getByText(type)).toBeTruthy();
    });
  });

  it('should handle zero rating', () => {
    const zeroRatingReview = { ...mockReview, rating: 0 };
    const { getAllByText } = render(<ReviewCard review={zeroRatingReview} />);
    
    const emptyStars = getAllByText('☆');
    expect(emptyStars).toHaveLength(5);
  });

  it('should handle different date formats', () => {
    const dates = [
      { input: '2024-06-15', expected: 'Jun 2024' },
      { input: '2023-12-25', expected: 'Dec 2023' },
    ];
    
    dates.forEach(({ input, expected }) => {
      const review = { ...mockReview, date: input };
      const { getByText } = render(<ReviewCard review={review} />);
      expect(getByText(expected)).toBeTruthy();
    });
  });

  it('should display user avatar emoji', () => {
    const avatars = ['👨', '👩', '🧑', '👴', '👵'];
    
    avatars.forEach(avatar => {
      const review = { ...mockReview, userAvatar: avatar };
      const { getByText } = render(<ReviewCard review={review} />);
      expect(getByText(avatar)).toBeTruthy();
    });
  });

  it('should handle long review text', () => {
    const longTextReview = {
      ...mockReview,
      text: 'This is a very long review text that contains multiple sentences and detailed information about the destination. '.repeat(5),
    };
    const { getByText } = render(<ReviewCard review={longTextReview} />);
    
    expect(getByText(/This is a very long review text/)).toBeTruthy();
  });
});
