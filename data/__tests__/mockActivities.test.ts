import { mockActivities, Activity, getActivitiesByDestination, getActivitiesByCategory } from '../mockActivities';

describe('mockActivities', () => {
  it('should have 8 activities', () => {
    expect(mockActivities).toHaveLength(8);
  });

  it('should have valid activity structure', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(activity).toHaveProperty('id');
      expect(activity).toHaveProperty('title');
      expect(activity).toHaveProperty('description');
      expect(activity).toHaveProperty('image');
      expect(activity).toHaveProperty('category');
      expect(activity).toHaveProperty('duration');
      expect(activity).toHaveProperty('price');
      expect(activity).toHaveProperty('currency');
      expect(activity).toHaveProperty('rating');
      expect(activity).toHaveProperty('reviewCount');
      expect(activity).toHaveProperty('highlights');
    });
  });

  it('should have unique IDs', () => {
    const ids = mockActivities.map(a => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockActivities.length);
  });

  it('should have valid prices', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(activity.price).toBeGreaterThan(0);
      expect(typeof activity.price).toBe('number');
    });
  });

  it('should have valid ratings between 0 and 5', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(activity.rating).toBeGreaterThanOrEqual(0);
      expect(activity.rating).toBeLessThanOrEqual(5);
    });
  });

  it('should have USD currency', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(activity.currency).toBe('USD');
    });
  });

  it('should have non-empty titles and descriptions', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(activity.title.length).toBeGreaterThan(0);
      expect(activity.description.length).toBeGreaterThan(0);
    });
  });

  it('should have valid image URLs', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(activity.image).toMatch(/^https?:\/\//);
    });
  });

  it('should have valid categories', () => {
    const validCategories = ['Tours', 'Food & Drink', 'Outdoor', 'Culture', 'Adventure', 'Nightlife'];
    mockActivities.forEach((activity: Activity) => {
      expect(validCategories).toContain(activity.category);
    });
  });

  it('should have non-empty duration', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(activity.duration.length).toBeGreaterThan(0);
    });
  });

  it('should have positive review counts', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(activity.reviewCount).toBeGreaterThan(0);
      expect(typeof activity.reviewCount).toBe('number');
    });
  });

  it('should have highlights array with at least one item', () => {
    mockActivities.forEach((activity: Activity) => {
      expect(Array.isArray(activity.highlights)).toBe(true);
      expect(activity.highlights.length).toBeGreaterThan(0);
    });
  });
});

describe('getActivitiesByDestination', () => {
  it('should return all activities for any destination', () => {
    const activities = getActivitiesByDestination('paris');
    expect(activities).toHaveLength(mockActivities.length);
  });

  it('should return the same activities array', () => {
    const activities = getActivitiesByDestination('test-id');
    expect(activities).toEqual(mockActivities);
  });
});

describe('getActivitiesByCategory', () => {
  it('should filter activities by Tours category', () => {
    const tours = getActivitiesByCategory('Tours');
    expect(tours.length).toBeGreaterThan(0);
    tours.forEach(activity => {
      expect(activity.category).toBe('Tours');
    });
  });

  it('should filter activities by Food & Drink category', () => {
    const foodDrink = getActivitiesByCategory('Food & Drink');
    expect(foodDrink.length).toBeGreaterThan(0);
    foodDrink.forEach(activity => {
      expect(activity.category).toBe('Food & Drink');
    });
  });

  it('should filter activities by Culture category', () => {
    const culture = getActivitiesByCategory('Culture');
    expect(culture.length).toBeGreaterThan(0);
    culture.forEach(activity => {
      expect(activity.category).toBe('Culture');
    });
  });

  it('should filter activities by Adventure category', () => {
    const adventure = getActivitiesByCategory('Adventure');
    expect(adventure.length).toBeGreaterThan(0);
    adventure.forEach(activity => {
      expect(activity.category).toBe('Adventure');
    });
  });

  it('should filter activities by Nightlife category', () => {
    const nightlife = getActivitiesByCategory('Nightlife');
    expect(nightlife.length).toBeGreaterThan(0);
    nightlife.forEach(activity => {
      expect(activity.category).toBe('Nightlife');
    });
  });

  it('should return empty array for non-existent category', () => {
    const outdoor = getActivitiesByCategory('Outdoor');
    expect(outdoor).toHaveLength(0);
  });
});
