export interface WeatherDay {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Rainy' | 'Stormy' | 'Snowy';
  precipitation: number;
  icon: string;
}

export interface WeatherForecast {
  destinationId: string;
  forecast: WeatherDay[];
  bestTimeToVisit: string;
}

const weatherIcons = {
  Sunny: '☀️',
  'Partly Cloudy': '⛅',
  Cloudy: '☁️',
  Rainy: '🌧️',
  Stormy: '⛈️',
  Snowy: '❄️',
};

export const mockWeatherForecasts: WeatherForecast[] = [
  {
    destinationId: '1',
    forecast: [
      {
        date: '2024-02-10',
        day: 'Mon',
        high: 12,
        low: 6,
        condition: 'Partly Cloudy',
        precipitation: 20,
        icon: weatherIcons['Partly Cloudy'],
      },
      {
        date: '2024-02-11',
        day: 'Tue',
        high: 14,
        low: 7,
        condition: 'Sunny',
        precipitation: 10,
        icon: weatherIcons.Sunny,
      },
      {
        date: '2024-02-12',
        day: 'Wed',
        high: 11,
        low: 5,
        condition: 'Rainy',
        precipitation: 70,
        icon: weatherIcons.Rainy,
      },
      {
        date: '2024-02-13',
        day: 'Thu',
        high: 13,
        low: 6,
        condition: 'Cloudy',
        precipitation: 30,
        icon: weatherIcons.Cloudy,
      },
      {
        date: '2024-02-14',
        day: 'Fri',
        high: 15,
        low: 8,
        condition: 'Sunny',
        precipitation: 5,
        icon: weatherIcons.Sunny,
      },
      {
        date: '2024-02-15',
        day: 'Sat',
        high: 16,
        low: 9,
        condition: 'Partly Cloudy',
        precipitation: 15,
        icon: weatherIcons['Partly Cloudy'],
      },
      {
        date: '2024-02-16',
        day: 'Sun',
        high: 14,
        low: 7,
        condition: 'Sunny',
        precipitation: 10,
        icon: weatherIcons.Sunny,
      },
    ],
    bestTimeToVisit: 'April to June and September to October offer pleasant weather and fewer crowds.',
  },
];

export function getWeatherByDestination(destinationId: string): WeatherForecast | undefined {
  return mockWeatherForecasts.find((w) => w.destinationId === destinationId) || mockWeatherForecasts[0];
}
