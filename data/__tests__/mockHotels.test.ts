import { mockHotels, Hotel, getHotelsByDestination } from '../mockHotels';

describe('mockHotels', () => {
  it('should have 5 hotels', () => {
    expect(mockHotels).toHaveLength(5);
  });

  it('should have valid hotel structure', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel).toHaveProperty('id');
      expect(hotel).toHaveProperty('name');
      expect(hotel).toHaveProperty('images');
      expect(hotel).toHaveProperty('starRating');
      expect(hotel).toHaveProperty('reviewScore');
      expect(hotel).toHaveProperty('reviewCount');
      expect(hotel).toHaveProperty('amenities');
      expect(hotel).toHaveProperty('pricePerNight');
      expect(hotel).toHaveProperty('currency');
      expect(hotel).toHaveProperty('location');
      expect(hotel).toHaveProperty('distance');
    });
  });

  it('should have unique IDs', () => {
    const ids = mockHotels.map(h => h.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockHotels.length);
  });

  it('should have valid prices', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel.pricePerNight).toBeGreaterThan(0);
      expect(typeof hotel.pricePerNight).toBe('number');
    });
  });

  it('should have USD currency', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel.currency).toBe('USD');
    });
  });

  it('should have non-empty names', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel.name.length).toBeGreaterThan(0);
    });
  });

  it('should have valid star ratings between 1 and 5', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel.starRating).toBeGreaterThanOrEqual(1);
      expect(hotel.starRating).toBeLessThanOrEqual(5);
      expect(Number.isInteger(hotel.starRating)).toBe(true);
    });
  });

  it('should have valid review scores between 0 and 5', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel.reviewScore).toBeGreaterThanOrEqual(0);
      expect(hotel.reviewScore).toBeLessThanOrEqual(5);
    });
  });

  it('should have positive review counts', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel.reviewCount).toBeGreaterThan(0);
      expect(typeof hotel.reviewCount).toBe('number');
    });
  });

  it('should have images array with at least one image', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(Array.isArray(hotel.images)).toBe(true);
      expect(hotel.images.length).toBeGreaterThan(0);
    });
  });

  it('should have valid image URLs', () => {
    mockHotels.forEach((hotel: Hotel) => {
      hotel.images.forEach(image => {
        expect(image).toMatch(/^https?:\/\//);
      });
    });
  });

  it('should have amenities array with at least one amenity', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(Array.isArray(hotel.amenities)).toBe(true);
      expect(hotel.amenities.length).toBeGreaterThan(0);
    });
  });

  it('should have non-empty location', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel.location.length).toBeGreaterThan(0);
    });
  });

  it('should have valid distance format', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel.distance).toMatch(/\d+\.?\d* km from center/);
    });
  });

  it('should have valid coordinates when present', () => {
    mockHotels.forEach((hotel: Hotel) => {
      if (hotel.coordinates) {
        expect(hotel.coordinates).toHaveProperty('latitude');
        expect(hotel.coordinates).toHaveProperty('longitude');
        expect(typeof hotel.coordinates.latitude).toBe('number');
        expect(typeof hotel.coordinates.longitude).toBe('number');
        expect(hotel.coordinates.latitude).toBeGreaterThanOrEqual(-90);
        expect(hotel.coordinates.latitude).toBeLessThanOrEqual(90);
        expect(hotel.coordinates.longitude).toBeGreaterThanOrEqual(-180);
        expect(hotel.coordinates.longitude).toBeLessThanOrEqual(180);
      }
    });
  });

  it('should have all hotels with coordinates', () => {
    mockHotels.forEach((hotel: Hotel) => {
      expect(hotel.coordinates).toBeDefined();
    });
  });
});

describe('getHotelsByDestination', () => {
  it('should return all hotels for any destination', () => {
    const hotels = getHotelsByDestination('paris');
    expect(hotels).toHaveLength(mockHotels.length);
  });

  it('should return the same hotels array', () => {
    const hotels = getHotelsByDestination('test-id');
    expect(hotels).toEqual(mockHotels);
  });
});
