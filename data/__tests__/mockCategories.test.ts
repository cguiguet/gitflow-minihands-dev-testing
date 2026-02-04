import { mockCategories, Category, mockRecentSearches, RecentSearch } from '../mockCategories';

describe('mockCategories', () => {
  it('should have 6 categories', () => {
    expect(mockCategories).toHaveLength(6);
  });

  it('should have valid category structure', () => {
    mockCategories.forEach((category: Category) => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('icon');
      expect(category).toHaveProperty('color');
    });
  });

  it('should have unique IDs', () => {
    const ids = mockCategories.map(c => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockCategories.length);
  });

  it('should have valid hex color codes', () => {
    mockCategories.forEach((category: Category) => {
      expect(category.color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it('should have non-empty names and icons', () => {
    mockCategories.forEach((category: Category) => {
      expect(category.name.length).toBeGreaterThan(0);
      expect(category.icon.length).toBeGreaterThan(0);
    });
  });
});

describe('mockRecentSearches', () => {
  it('should have 3 recent searches', () => {
    expect(mockRecentSearches).toHaveLength(3);
  });

  it('should have valid recent search structure', () => {
    mockRecentSearches.forEach((search: RecentSearch) => {
      expect(search).toHaveProperty('id');
      expect(search).toHaveProperty('destination');
      expect(search).toHaveProperty('dates');
      expect(search).toHaveProperty('travelers');
      expect(search).toHaveProperty('type');
      expect(search).toHaveProperty('timestamp');
    });
  });

  it('should have unique IDs', () => {
    const ids = mockRecentSearches.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockRecentSearches.length);
  });

  it('should have valid search types', () => {
    const validTypes = ['flight', 'hotel', 'package'];
    mockRecentSearches.forEach((search: RecentSearch) => {
      expect(validTypes).toContain(search.type);
    });
  });

  it('should have positive number of travelers', () => {
    mockRecentSearches.forEach((search: RecentSearch) => {
      expect(search.travelers).toBeGreaterThan(0);
    });
  });

  it('should have valid ISO timestamp format', () => {
    mockRecentSearches.forEach((search: RecentSearch) => {
      expect(new Date(search.timestamp).toString()).not.toBe('Invalid Date');
    });
  });

  it('should have non-empty destinations and dates', () => {
    mockRecentSearches.forEach((search: RecentSearch) => {
      expect(search.destination.length).toBeGreaterThan(0);
      expect(search.dates.length).toBeGreaterThan(0);
    });
  });
});
