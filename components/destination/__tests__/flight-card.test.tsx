import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FlightCard } from '../flight-card';
import { Flight } from '@/data/mockFlights';
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

describe('FlightCard', () => {
  const mockNonstopFlight: Flight = {
    id: 'flight-1',
    destinationId: 'paris',
    airline: 'Air France',
    airlineLogo: '✈️',
    departureTime: '10:00 AM',
    arrivalTime: '11:30 PM',
    departureAirport: 'JFK',
    arrivalAirport: 'CDG',
    duration: '7h 30m',
    stops: 0,
    price: 850,
    currency: 'USD',
    cabinClass: 'Economy',
    availableSeats: 12,
  };

  const mockFlightWithStops: Flight = {
    ...mockNonstopFlight,
    id: 'flight-2',
    stops: 1,
    stopDetails: [
      { airport: 'LHR', duration: '2h 15m' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render flight card with all details', () => {
    const { getByText } = render(<FlightCard flight={mockNonstopFlight} />);
    
    expect(getByText('Air France')).toBeTruthy();
    expect(getByText('✈️')).toBeTruthy();
    expect(getByText('$850')).toBeTruthy();
    expect(getByText('per person')).toBeTruthy();
    expect(getByText('10:00 AM')).toBeTruthy();
    expect(getByText('11:30 PM')).toBeTruthy();
    expect(getByText('JFK')).toBeTruthy();
    expect(getByText('CDG')).toBeTruthy();
    expect(getByText('7h 30m')).toBeTruthy();
    expect(getByText('Nonstop')).toBeTruthy();
    expect(getByText('Economy')).toBeTruthy();
    expect(getByText('12 seats left')).toBeTruthy();
  });

  it('should display nonstop for flights with 0 stops', () => {
    const { getByText } = render(<FlightCard flight={mockNonstopFlight} />);
    expect(getByText('Nonstop')).toBeTruthy();
  });

  it('should display stop count for flights with stops', () => {
    const { getByText } = render(<FlightCard flight={mockFlightWithStops} />);
    expect(getByText('1 stop')).toBeTruthy();
  });

  it('should display plural stops for multiple stops', () => {
    const multiStopFlight = { ...mockFlightWithStops, stops: 2 };
    const { getByText } = render(<FlightCard flight={multiStopFlight} />);
    expect(getByText('2 stops')).toBeTruthy();
  });

  it('should display singular seat for 1 available seat', () => {
    const oneSeatFlight = { ...mockNonstopFlight, availableSeats: 1 };
    const { getByText } = render(<FlightCard flight={oneSeatFlight} />);
    expect(getByText('1 seat left')).toBeTruthy();
  });

  it('should show view details button for flights with stops', () => {
    const { getByText } = render(<FlightCard flight={mockFlightWithStops} />);
    expect(getByText('View details')).toBeTruthy();
  });

  it('should not show view details button for nonstop flights', () => {
    const { queryByText } = render(<FlightCard flight={mockNonstopFlight} />);
    expect(queryByText('View details')).toBeNull();
  });

  it('should expand and show layover details when view details is pressed', () => {
    const { getByText, queryByText } = render(<FlightCard flight={mockFlightWithStops} />);
    
    expect(queryByText('Layover Information')).toBeNull();
    
    const detailsButton = getByText('View details');
    fireEvent.press(detailsButton);
    
    expect(getByText('Layover Information')).toBeTruthy();
    expect(getByText('LHR')).toBeTruthy();
    expect(getByText('2h 15m layover')).toBeTruthy();
  });

  it('should toggle between view and hide details', () => {
    const { getByText } = render(<FlightCard flight={mockFlightWithStops} />);
    
    const detailsButton = getByText('View details');
    fireEvent.press(detailsButton);
    
    expect(getByText('Hide details')).toBeTruthy();
    
    fireEvent.press(getByText('Hide details'));
    expect(getByText('View details')).toBeTruthy();
  });

  it('should trigger light haptic feedback when expanding details', () => {
    const { getByText } = render(<FlightCard flight={mockFlightWithStops} />);
    
    const detailsButton = getByText('View details');
    fireEvent.press(detailsButton);
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('should call onSelect when select button is pressed', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<FlightCard flight={mockNonstopFlight} onSelect={onSelect} />);
    
    const selectButton = getByText('Select');
    fireEvent.press(selectButton);
    
    expect(onSelect).toHaveBeenCalledWith(mockNonstopFlight);
  });

  it('should trigger medium haptic feedback when selecting flight', () => {
    const { getByText } = render(<FlightCard flight={mockNonstopFlight} />);
    
    const selectButton = getByText('Select');
    fireEvent.press(selectButton);
    
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Medium);
  });

  it('should not crash when onSelect is not provided', () => {
    const { getByText } = render(<FlightCard flight={mockNonstopFlight} />);
    
    const selectButton = getByText('Select');
    expect(() => fireEvent.press(selectButton)).not.toThrow();
  });

  it('should handle multiple layovers', () => {
    const multiLayoverFlight: Flight = {
      ...mockFlightWithStops,
      stops: 2,
      stopDetails: [
        { airport: 'LHR', duration: '2h 15m' },
        { airport: 'AMS', duration: '1h 45m' },
      ],
    };
    
    const { getByText } = render(<FlightCard flight={multiLayoverFlight} />);
    
    const detailsButton = getByText('View details');
    fireEvent.press(detailsButton);
    
    expect(getByText('LHR')).toBeTruthy();
    expect(getByText('2h 15m layover')).toBeTruthy();
    expect(getByText('AMS')).toBeTruthy();
    expect(getByText('1h 45m layover')).toBeTruthy();
  });

  it('should display different cabin classes', () => {
    const cabinClasses = ['Economy', 'Premium Economy', 'Business', 'First Class'];
    
    cabinClasses.forEach(cabinClass => {
      const flight = { ...mockNonstopFlight, cabinClass };
      const { getByText } = render(<FlightCard flight={flight} />);
      expect(getByText(cabinClass)).toBeTruthy();
    });
  });

  it('should handle different price values', () => {
    const prices = [500, 1200, 5000];
    
    prices.forEach(price => {
      const flight = { ...mockNonstopFlight, price };
      const { getByText } = render(<FlightCard flight={flight} />);
      expect(getByText(`$${price}`)).toBeTruthy();
    });
  });

  it('should not show layover details when stopDetails is undefined', () => {
    const flightWithoutDetails = { ...mockFlightWithStops, stopDetails: undefined };
    const { getByText, queryByText } = render(<FlightCard flight={flightWithoutDetails} />);
    
    const detailsButton = getByText('View details');
    fireEvent.press(detailsButton);
    
    expect(queryByText('Layover Information')).toBeNull();
  });
});
