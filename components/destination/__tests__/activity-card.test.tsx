import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ActivityCard } from '../activity-card';
import { Activity } from '@/data/mockActivities';
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

describe('ActivityCard', () => {
  const mockActivity: Activity = {
    id: 'act-1',
    destinationId: 'paris',
    title: 'Eiffel Tower Skip-the-Line Tour',
    description: 'Skip the long lines and enjoy priority access to the iconic Eiffel Tower',
    image: 'https://example.com/eiffel.jpg',
    category: 'Sightseeing',
    duration: '2 hours',
    price: 89,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 1250,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render activity card with all details', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} />);
    
    expect(getByText('Eiffel Tower Skip-the-Line Tour')).toBeTruthy();
    expect(getByText(/Skip the long lines/)).toBeTruthy();
    expect(getByText('Sightseeing')).toBeTruthy();
    expect(getByText('2 hours')).toBeTruthy();
    expect(getByText('4.8 (1250)')).toBeTruthy();
    expect(getByText('$89')).toBeTruthy();
    expect(getByText('Book Now')).toBeTruthy();
  });

  it('should display category badge', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} />);
    expect(getByText('Sightseeing')).toBeTruthy();
  });

  it('should display duration with icon', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} />);
    expect(getByText('⏱️')).toBeTruthy();
    expect(getByText('2 hours')).toBeTruthy();
  });

  it('should display rating with icon', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} />);
    expect(getByText('⭐')).toBeTruthy();
    expect(getByText('4.8 (1250)')).toBeTruthy();
  });

  it('should display price with label', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} />);
    expect(getByText('From')).toBeTruthy();
    expect(getByText('$89')).toBeTruthy();
  });

  it('should call onBook when card is pressed', () => {
    const onBook = jest.fn();
    const { getByText } = render(<ActivityCard activity={mockActivity} onBook={onBook} />);
    
    const card = getByText('Eiffel Tower Skip-the-Line Tour').parent?.parent?.parent;
    fireEvent.press(card!);
    
    expect(onBook).toHaveBeenCalledWith(mockActivity);
  });

  it('should call onBook when book button is pressed', () => {
    const onBook = jest.fn();
    const { getByText } = render(<ActivityCard activity={mockActivity} onBook={onBook} />);
    
    const bookButton = getByText('Book Now');
    fireEvent.press(bookButton);
    
    expect(onBook).toHaveBeenCalledWith(mockActivity);
  });

  it('should trigger haptic feedback on press', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} />);
    
    const bookButton = getByText('Book Now');
    fireEvent.press(bookButton);
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
  });

  it('should not crash when onBook is not provided', () => {
    const { getByText } = render(<ActivityCard activity={mockActivity} />);
    
    const bookButton = getByText('Book Now');
    expect(() => fireEvent.press(bookButton)).not.toThrow();
  });

  it('should truncate long title to 2 lines', () => {
    const longTitleActivity: Activity = {
      ...mockActivity,
      title: 'This is a very long activity title that should be truncated to two lines maximum',
    };
    const { getByText } = render(<ActivityCard activity={longTitleActivity} />);
    
    const titleElement = getByText(/This is a very long/);
    expect(titleElement.props.numberOfLines).toBe(2);
  });

  it('should truncate long description to 2 lines', () => {
    const longDescActivity: Activity = {
      ...mockActivity,
      description: 'This is a very long description that should be truncated to two lines maximum to maintain card layout consistency',
    };
    const { getByText } = render(<ActivityCard activity={longDescActivity} />);
    
    const descElement = getByText(/This is a very long description/);
    expect(descElement.props.numberOfLines).toBe(2);
  });

  it('should handle different categories', () => {
    const categories = ['Adventure', 'Culture', 'Food & Drink', 'Nature'];
    
    categories.forEach(category => {
      const activity = { ...mockActivity, category };
      const { getByText } = render(<ActivityCard activity={activity} />);
      expect(getByText(category)).toBeTruthy();
    });
  });

  it('should display correct price format', () => {
    const prices = [50, 150, 999];
    
    prices.forEach(price => {
      const activity = { ...mockActivity, price };
      const { getByText } = render(<ActivityCard activity={activity} />);
      expect(getByText(`$${price}`)).toBeTruthy();
    });
  });

  it('should display rating with review count', () => {
    const activity = { ...mockActivity, rating: 4.5, reviewCount: 500 };
    const { getByText } = render(<ActivityCard activity={activity} />);
    expect(getByText('4.5 (500)')).toBeTruthy();
  });
});
