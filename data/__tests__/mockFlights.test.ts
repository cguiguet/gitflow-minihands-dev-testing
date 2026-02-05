import { mockFlights, Flight, getFlightsByDestination } from '../mockFlights';

describe('mockFlights', () => {
  it('should have 5 flights', () => {
    expect(mockFlights).toHaveLength(5);
  });

  it('should have valid flight structure', () => {
    mockFlights.forEach((flight: Flight) => {
      expect(flight).toHaveProperty('id');
      expect(flight).toHaveProperty('airline');
      expect(flight).toHaveProperty('airlineLogo');
      expect(flight).toHaveProperty('departureTime');
      expect(flight).toHaveProperty('arrivalTime');
      expect(flight).toHaveProperty('departureAirport');
      expect(flight).toHaveProperty('arrivalAirport');
      expect(flight).toHaveProperty('duration');
      expect(flight).toHaveProperty('stops');
      expect(flight).toHaveProperty('price');
      expect(flight).toHaveProperty('currency');
      expect(flight).toHaveProperty('cabinClass');
      expect(flight).toHaveProperty('availableSeats');
    });
  });

  it('should have unique IDs', () => {
    const ids = mockFlights.map(f => f.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockFlights.length);
  });

  it('should have valid prices', () => {
    mockFlights.forEach((flight: Flight) => {
      expect(flight.price).toBeGreaterThan(0);
      expect(typeof flight.price).toBe('number');
    });
  });

  it('should have USD currency', () => {
    mockFlights.forEach((flight: Flight) => {
      expect(flight.currency).toBe('USD');
    });
  });

  it('should have non-empty airline names', () => {
    mockFlights.forEach((flight: Flight) => {
      expect(flight.airline.length).toBeGreaterThan(0);
    });
  });

  it('should have valid time formats', () => {
    const timeRegex = /^\d{2}:\d{2}$/;
    mockFlights.forEach((flight: Flight) => {
      expect(flight.departureTime).toMatch(timeRegex);
      expect(flight.arrivalTime).toMatch(timeRegex);
    });
  });

  it('should have valid airport codes', () => {
    mockFlights.forEach((flight: Flight) => {
      expect(flight.departureAirport.length).toBe(3);
      expect(flight.arrivalAirport.length).toBe(3);
      expect(flight.departureAirport).toMatch(/^[A-Z]{3}$/);
      expect(flight.arrivalAirport).toMatch(/^[A-Z]{3}$/);
    });
  });

  it('should have valid duration format', () => {
    mockFlights.forEach((flight: Flight) => {
      expect(flight.duration).toMatch(/^\d+h \d+m$/);
    });
  });

  it('should have valid stop counts', () => {
    mockFlights.forEach((flight: Flight) => {
      expect(flight.stops).toBeGreaterThanOrEqual(0);
      expect(typeof flight.stops).toBe('number');
    });
  });

  it('should have stopDetails when stops > 0', () => {
    mockFlights.forEach((flight: Flight) => {
      if (flight.stops > 0) {
        expect(flight.stopDetails).toBeDefined();
        expect(Array.isArray(flight.stopDetails)).toBe(true);
        expect(flight.stopDetails!.length).toBe(flight.stops);
      }
    });
  });

  it('should have valid cabin classes', () => {
    const validClasses = ['Economy', 'Premium Economy', 'Business', 'First'];
    mockFlights.forEach((flight: Flight) => {
      expect(validClasses).toContain(flight.cabinClass);
    });
  });

  it('should have positive available seats', () => {
    mockFlights.forEach((flight: Flight) => {
      expect(flight.availableSeats).toBeGreaterThan(0);
      expect(typeof flight.availableSeats).toBe('number');
    });
  });

  it('should have valid stopDetails structure when present', () => {
    mockFlights.forEach((flight: Flight) => {
      if (flight.stopDetails) {
        flight.stopDetails.forEach(stop => {
          expect(stop).toHaveProperty('airport');
          expect(stop).toHaveProperty('duration');
          expect(stop.airport.length).toBe(3);
          expect(stop.airport).toMatch(/^[A-Z]{3}$/);
          expect(stop.duration).toMatch(/^\d+h \d+m$/);
        });
      }
    });
  });
});

describe('getFlightsByDestination', () => {
  it('should return all flights for any destination', () => {
    const flights = getFlightsByDestination('paris');
    expect(flights).toHaveLength(mockFlights.length);
  });

  it('should return the same flights array', () => {
    const flights = getFlightsByDestination('test-id');
    expect(flights).toEqual(mockFlights);
  });
});
