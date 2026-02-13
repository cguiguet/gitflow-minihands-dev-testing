import React from 'react';
import { render } from '@testing-library/react-native';
import { WeatherWidget } from '../weather-widget';
import { WeatherForecast } from '@/data/mockWeather';

jest.mock('@/hooks/use-theme-color', () => ({
  useThemeColor: jest.fn(() => '#000000'),
}));

describe('WeatherWidget', () => {
  const mockWeather: WeatherForecast = {
    destinationId: 'paris',
    current: {
      temperature: 18,
      condition: 'Partly Cloudy',
      icon: '⛅',
      humidity: 65,
      windSpeed: 12,
    },
    forecast: [
      { day: 'Mon', icon: '☀️', high: 22, low: 15, precipitation: 10 },
      { day: 'Tue', icon: '⛅', high: 20, low: 14, precipitation: 20 },
      { day: 'Wed', icon: '🌧️', high: 18, low: 13, precipitation: 60 },
    ],
    bestTimeToVisit: 'April to October for pleasant weather',
  };

  it('should render weather widget', () => {
    const { getByText } = render(<WeatherWidget weather={mockWeather} />);
    expect(getByText('7-Day Weather Forecast')).toBeTruthy();
  });

  it('should display all forecast days', () => {
    const { getByText } = render(<WeatherWidget weather={mockWeather} />);
    expect(getByText('Mon')).toBeTruthy();
    expect(getByText('Tue')).toBeTruthy();
    expect(getByText('Wed')).toBeTruthy();
  });

  it('should display forecast icons', () => {
    const { getByText } = render(<WeatherWidget weather={mockWeather} />);
    expect(getByText('☀️')).toBeTruthy();
    expect(getByText('⛅')).toBeTruthy();
    expect(getByText('🌧️')).toBeTruthy();
  });

  it('should display high and low temperatures', () => {
    const { getByText } = render(<WeatherWidget weather={mockWeather} />);
    expect(getByText('22°')).toBeTruthy();
    expect(getByText('15°')).toBeTruthy();
  });

  it('should display precipitation percentages', () => {
    const { getByText } = render(<WeatherWidget weather={mockWeather} />);
    expect(getByText('10%')).toBeTruthy();
    expect(getByText('20%')).toBeTruthy();
    expect(getByText('60%')).toBeTruthy();
  });

  it('should display best time to visit section', () => {
    const { getByText } = render(<WeatherWidget weather={mockWeather} />);
    expect(getByText('Best Time to Visit')).toBeTruthy();
    expect(getByText('April to October for pleasant weather')).toBeTruthy();
  });

  it('should render with empty forecast array', () => {
    const emptyWeather: WeatherForecast = {
      ...mockWeather,
      forecast: [],
    };
    const { getByText } = render(<WeatherWidget weather={emptyWeather} />);
    expect(getByText('7-Day Weather Forecast')).toBeTruthy();
  });

  it('should handle long best time to visit text', () => {
    const longTextWeather: WeatherForecast = {
      ...mockWeather,
      bestTimeToVisit: 'The best time to visit is during spring and fall when temperatures are moderate and crowds are smaller',
    };
    const { getByText } = render(<WeatherWidget weather={longTextWeather} />);
    expect(getByText(/The best time to visit/)).toBeTruthy();
  });
});
