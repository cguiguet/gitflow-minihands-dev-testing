import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DestinationDetailsScreen from '../[id]';
import { mockDestinations } from '@/data/mockDestinations';
import * as Haptics from 'expo-haptics';
import * as Sharing from 'expo-sharing';

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(() => ({ id: 'paris' })),
  router: {
    back: jest.fn(),
  },
}));

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

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(() => Promise.resolve(true)),
  shareAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return {
    ...Reanimated,
    useSharedValue: jest.fn(() => ({ value: 0 })),
    useAnimatedStyle: jest.fn(() => ({})),
    interpolate: jest.fn(),
    Extrapolate: { CLAMP: 'clamp' },
  };
});

describe('DestinationDetailsScreen Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render destination details screen with all sections', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const parisDestination = mockDestinations.find(d => d.id === 'paris');
    expect(getByText(parisDestination!.name)).toBeTruthy();
  });

  it('should display all tab options', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('Flights')).toBeTruthy();
    expect(getByText('Hotels')).toBeTruthy();
    expect(getByText('Activities')).toBeTruthy();
    expect(getByText('Reviews')).toBeTruthy();
  });

  it('should switch between tabs when pressed', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const flightsTab = getByText('Flights');
    fireEvent.press(flightsTab);
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('should display flights when flights tab is selected', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const flightsTab = getByText('Flights');
    fireEvent.press(flightsTab);
    
    expect(getByText('Select')).toBeTruthy();
  });

  it('should display hotels when hotels tab is selected', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const hotelsTab = getByText('Hotels');
    fireEvent.press(hotelsTab);
    
    expect(getByText('Book')).toBeTruthy();
  });

  it('should display activities when activities tab is selected', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const activitiesTab = getByText('Activities');
    fireEvent.press(activitiesTab);
    
    expect(getByText('Book Now')).toBeTruthy();
  });

  it('should display reviews when reviews tab is selected', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const reviewsTab = getByText('Reviews');
    fireEvent.press(reviewsTab);
    
    expect(getByText(/Helpful/)).toBeTruthy();
  });

  it('should toggle favorite status when favorite button is pressed', () => {
    const { UNSAFE_getByProps } = render(<DestinationDetailsScreen />);
    
    const favoriteButton = UNSAFE_getByProps({ testID: 'favorite-button' });
    fireEvent.press(favoriteButton);
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
  });

  it('should call router.back when back button is pressed', async () => {
    const { useLocalSearchParams, router } = require('expo-router');
    const { UNSAFE_getByProps } = render(<DestinationDetailsScreen />);
    
    const backButton = UNSAFE_getByProps({ testID: 'back-button' });
    fireEvent.press(backButton);
    
    expect(router.back).toHaveBeenCalled();
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('should handle share functionality', async () => {
    const { UNSAFE_getByProps } = render(<DestinationDetailsScreen />);
    
    const shareButton = UNSAFE_getByProps({ testID: 'share-button' });
    fireEvent.press(shareButton);
    
    await waitFor(() => {
      expect(Sharing.isAvailableAsync).toHaveBeenCalled();
    });
  });

  it('should display weather widget in overview tab', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    expect(getByText('7-Day Weather Forecast')).toBeTruthy();
  });

  it('should display destination highlights in overview', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    expect(getByText('Highlights')).toBeTruthy();
  });

  it('should display quick facts in overview', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    expect(getByText('Quick Facts')).toBeTruthy();
  });

  it('should display similar destinations section', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    expect(getByText('Similar Destinations')).toBeTruthy();
  });

  it('should render error message for invalid destination', () => {
    const { useLocalSearchParams } = require('expo-router');
    useLocalSearchParams.mockReturnValue({ id: 'invalid-id' });
    
    const { getByText } = render(<DestinationDetailsScreen />);
    
    expect(getByText('Destination not found')).toBeTruthy();
  });

  it('should integrate with flight data correctly', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const flightsTab = getByText('Flights');
    fireEvent.press(flightsTab);
    
    expect(getByText('Select')).toBeTruthy();
  });

  it('should integrate with hotel data correctly', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const hotelsTab = getByText('Hotels');
    fireEvent.press(hotelsTab);
    
    expect(getByText('Book')).toBeTruthy();
  });

  it('should integrate with activity data correctly', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const activitiesTab = getByText('Activities');
    fireEvent.press(activitiesTab);
    
    expect(getByText('Book Now')).toBeTruthy();
  });

  it('should integrate with review data and display stats', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const reviewsTab = getByText('Reviews');
    fireEvent.press(reviewsTab);
    
    expect(getByText('Rating Breakdown')).toBeTruthy();
  });

  it('should display CTA button with pricing', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    const parisDestination = mockDestinations.find(d => d.id === 'paris');
    expect(getByText(`From $${parisDestination!.price}`)).toBeTruthy();
  });

  it('should handle tab navigation with haptic feedback', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    jest.clearAllMocks();
    
    const tabs = ['Flights', 'Hotels', 'Activities', 'Reviews', 'Overview'];
    tabs.forEach(tab => {
      fireEvent.press(getByText(tab));
      expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
      jest.clearAllMocks();
    });
  });

  it('should render all child components in overview tab', () => {
    const { getByText } = render(<DestinationDetailsScreen />);
    
    expect(getByText('Highlights')).toBeTruthy();
    expect(getByText('Quick Facts')).toBeTruthy();
    expect(getByText('7-Day Weather Forecast')).toBeTruthy();
    expect(getByText('Similar Destinations')).toBeTruthy();
  });

  it('should handle share error gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (Sharing.isAvailableAsync as jest.Mock).mockRejectedValue(new Error('Share failed'));
    
    const { UNSAFE_getByProps } = render(<DestinationDetailsScreen />);
    
    const shareButton = UNSAFE_getByProps({ testID: 'share-button' });
    fireEvent.press(shareButton);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error sharing:', expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });
});
