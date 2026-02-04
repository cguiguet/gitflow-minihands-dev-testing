import { mockDestinations, Destination } from '../mockDestinations';

describe('mockDestinations', () => {
  it('should have 6 destinations', () => {
    expect(mockDestinations).toHaveLength(6);
  });

  it('should have valid destination structure', () => {
    mockDestinations.forEach((destination: Destination) => {
      expect(destination).toHaveProperty('id');
      expect(destination).toHaveProperty('name');
      expect(destination).toHaveProperty('country');
      expect(destination).toHaveProperty('image');
      expect(destination).toHaveProperty('price');
      expect(destination).toHaveProperty('currency');
      expect(destination).toHaveProperty('rating');
      expect(destination).toHaveProperty('description');
    });
  });

  it('should have unique IDs', () => {
    const ids = mockDestinations.map(d => d.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockDestinations.length);
  });

  it('should have valid prices', () => {
    mockDestinations.forEach((destination: Destination) => {
      expect(destination.price).toBeGreaterThan(0);
      expect(typeof destination.price).toBe('number');
    });
  });

  it('should have valid ratings between 0 and 5', () => {
    mockDestinations.forEach((destination: Destination) => {
      expect(destination.rating).toBeGreaterThanOrEqual(0);
      expect(destination.rating).toBeLessThanOrEqual(5);
    });
  });

  it('should have USD currency', () => {
    mockDestinations.forEach((destination: Destination) => {
      expect(destination.currency).toBe('USD');
    });
  });

  it('should have non-empty names and countries', () => {
    mockDestinations.forEach((destination: Destination) => {
      expect(destination.name.length).toBeGreaterThan(0);
      expect(destination.country.length).toBeGreaterThan(0);
    });
  });

  it('should have valid image URLs', () => {
    mockDestinations.forEach((destination: Destination) => {
      expect(destination.image).toMatch(/^https?:\/\//);
    });
  });
});
