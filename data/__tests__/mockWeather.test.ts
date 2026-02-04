import { mockWeatherForecasts, WeatherForecast, WeatherDay, getWeatherByDestination } from '../mockWeather';

describe('mockWeatherForecasts', () => {
  it('should have at least one weather forecast', () => {
    expect(mockWeatherForecasts.length).toBeGreaterThan(0);
  });

  it('should have valid weather forecast structure', () => {
    mockWeatherForecasts.forEach((forecast: WeatherForecast) => {
      expect(forecast).toHaveProperty('destinationId');
      expect(forecast).toHaveProperty('forecast');
      expect(forecast).toHaveProperty('bestTimeToVisit');
    });
  });

  it('should have non-empty destination IDs', () => {
    mockWeatherForecasts.forEach((forecast: WeatherForecast) => {
      expect(forecast.destinationId.length).toBeGreaterThan(0);
    });
  });

  it('should have forecast array with at least one day', () => {
    mockWeatherForecasts.forEach((forecast: WeatherForecast) => {
      expect(Array.isArray(forecast.forecast)).toBe(true);
      expect(forecast.forecast.length).toBeGreaterThan(0);
    });
  });

  it('should have non-empty best time to visit', () => {
    mockWeatherForecasts.forEach((forecast: WeatherForecast) => {
      expect(forecast.bestTimeToVisit.length).toBeGreaterThan(0);
    });
  });
});

describe('WeatherDay structure', () => {
  const allDays = mockWeatherForecasts.flatMap(f => f.forecast);

  it('should have valid weather day structure', () => {
    allDays.forEach((day: WeatherDay) => {
      expect(day).toHaveProperty('date');
      expect(day).toHaveProperty('day');
      expect(day).toHaveProperty('high');
      expect(day).toHaveProperty('low');
      expect(day).toHaveProperty('condition');
      expect(day).toHaveProperty('precipitation');
      expect(day).toHaveProperty('icon');
    });
  });

  it('should have valid date format', () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    allDays.forEach((day: WeatherDay) => {
      expect(day.date).toMatch(dateRegex);
      expect(new Date(day.date).toString()).not.toBe('Invalid Date');
    });
  });

  it('should have valid day abbreviations', () => {
    const validDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    allDays.forEach((day: WeatherDay) => {
      expect(validDays).toContain(day.day);
    });
  });

  it('should have high temperature greater than or equal to low', () => {
    allDays.forEach((day: WeatherDay) => {
      expect(day.high).toBeGreaterThanOrEqual(day.low);
    });
  });

  it('should have valid temperature values', () => {
    allDays.forEach((day: WeatherDay) => {
      expect(typeof day.high).toBe('number');
      expect(typeof day.low).toBe('number');
      expect(day.high).toBeGreaterThan(-50);
      expect(day.high).toBeLessThan(60);
      expect(day.low).toBeGreaterThan(-50);
      expect(day.low).toBeLessThan(60);
    });
  });

  it('should have valid weather conditions', () => {
    const validConditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Stormy', 'Snowy'];
    allDays.forEach((day: WeatherDay) => {
      expect(validConditions).toContain(day.condition);
    });
  });

  it('should have valid precipitation percentage', () => {
    allDays.forEach((day: WeatherDay) => {
      expect(day.precipitation).toBeGreaterThanOrEqual(0);
      expect(day.precipitation).toBeLessThanOrEqual(100);
      expect(typeof day.precipitation).toBe('number');
    });
  });

  it('should have non-empty icon', () => {
    allDays.forEach((day: WeatherDay) => {
      expect(day.icon.length).toBeGreaterThan(0);
    });
  });

  it('should have icon matching condition', () => {
    const weatherIcons = {
      Sunny: '☀️',
      'Partly Cloudy': '⛅',
      Cloudy: '☁️',
      Rainy: '🌧️',
      Stormy: '⛈️',
      Snowy: '❄️',
    };

    allDays.forEach((day: WeatherDay) => {
      expect(day.icon).toBe(weatherIcons[day.condition]);
    });
  });
});

describe('getWeatherByDestination', () => {
  it('should return weather for matching destination ID', () => {
    const weather = getWeatherByDestination('1');
    expect(weather).toBeDefined();
    expect(weather?.destinationId).toBe('1');
  });

  it('should return first forecast for non-existent destination', () => {
    const weather = getWeatherByDestination('non-existent');
    expect(weather).toBeDefined();
    expect(weather).toEqual(mockWeatherForecasts[0]);
  });

  it('should return forecast with valid structure', () => {
    const weather = getWeatherByDestination('1');
    expect(weather).toHaveProperty('destinationId');
    expect(weather).toHaveProperty('forecast');
    expect(weather).toHaveProperty('bestTimeToVisit');
  });

  it('should return forecast with at least one day', () => {
    const weather = getWeatherByDestination('1');
    expect(weather?.forecast.length).toBeGreaterThan(0);
  });

  it('should return consistent results for same destination', () => {
    const weather1 = getWeatherByDestination('1');
    const weather2 = getWeatherByDestination('1');
    expect(weather1).toEqual(weather2);
  });
});

describe('Weather forecast data quality', () => {
  it('should have 7-day forecast', () => {
    mockWeatherForecasts.forEach((forecast: WeatherForecast) => {
      expect(forecast.forecast.length).toBe(7);
    });
  });

  it('should have consecutive dates', () => {
    mockWeatherForecasts.forEach((forecast: WeatherForecast) => {
      for (let i = 1; i < forecast.forecast.length; i++) {
        const prevDate = new Date(forecast.forecast[i - 1].date);
        const currDate = new Date(forecast.forecast[i].date);
        const diffDays = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
        expect(diffDays).toBe(1);
      }
    });
  });

  it('should have varied weather conditions', () => {
    mockWeatherForecasts.forEach((forecast: WeatherForecast) => {
      const conditions = new Set(forecast.forecast.map(d => d.condition));
      expect(conditions.size).toBeGreaterThan(1);
    });
  });
});
