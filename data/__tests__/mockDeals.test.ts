import { mockDeals, Deal } from '../mockDeals';

describe('mockDeals', () => {
  it('should have 4 deals', () => {
    expect(mockDeals).toHaveLength(4);
  });

  it('should have valid deal structure', () => {
    mockDeals.forEach((deal: Deal) => {
      expect(deal).toHaveProperty('id');
      expect(deal).toHaveProperty('title');
      expect(deal).toHaveProperty('destination');
      expect(deal).toHaveProperty('image');
      expect(deal).toHaveProperty('originalPrice');
      expect(deal).toHaveProperty('discountedPrice');
      expect(deal).toHaveProperty('currency');
      expect(deal).toHaveProperty('discount');
      expect(deal).toHaveProperty('validUntil');
      expect(deal).toHaveProperty('type');
    });
  });

  it('should have unique IDs', () => {
    const ids = mockDeals.map(d => d.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockDeals.length);
  });

  it('should have discounted price less than original price', () => {
    mockDeals.forEach((deal: Deal) => {
      expect(deal.discountedPrice).toBeLessThan(deal.originalPrice);
    });
  });

  it('should have valid discount percentages', () => {
    mockDeals.forEach((deal: Deal) => {
      const calculatedDiscount = Math.round(
        ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100
      );
      expect(Math.abs(calculatedDiscount - deal.discount)).toBeLessThanOrEqual(1);
    });
  });

  it('should have valid deal types', () => {
    const validTypes = ['flight', 'hotel', 'package'];
    mockDeals.forEach((deal: Deal) => {
      expect(validTypes).toContain(deal.type);
    });
  });

  it('should have USD currency', () => {
    mockDeals.forEach((deal: Deal) => {
      expect(deal.currency).toBe('USD');
    });
  });

  it('should have valid date format for validUntil', () => {
    mockDeals.forEach((deal: Deal) => {
      expect(deal.validUntil).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(deal.validUntil).toString()).not.toBe('Invalid Date');
    });
  });

  it('should have non-empty titles and destinations', () => {
    mockDeals.forEach((deal: Deal) => {
      expect(deal.title.length).toBeGreaterThan(0);
      expect(deal.destination.length).toBeGreaterThan(0);
    });
  });

  it('should have valid image URLs', () => {
    mockDeals.forEach((deal: Deal) => {
      expect(deal.image).toMatch(/^https?:\/\//);
    });
  });
});
