import { mockReviews, Review, getReviewsByDestination, getReviewStats } from '../mockReviews';

describe('mockReviews', () => {
  it('should have 8 reviews', () => {
    expect(mockReviews).toHaveLength(8);
  });

  it('should have valid review structure', () => {
    mockReviews.forEach((review: Review) => {
      expect(review).toHaveProperty('id');
      expect(review).toHaveProperty('userName');
      expect(review).toHaveProperty('userAvatar');
      expect(review).toHaveProperty('rating');
      expect(review).toHaveProperty('date');
      expect(review).toHaveProperty('title');
      expect(review).toHaveProperty('text');
      expect(review).toHaveProperty('helpful');
      expect(review).toHaveProperty('travelerType');
    });
  });

  it('should have unique IDs', () => {
    const ids = mockReviews.map(r => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(mockReviews.length);
  });

  it('should have valid ratings between 1 and 5', () => {
    mockReviews.forEach((review: Review) => {
      expect(review.rating).toBeGreaterThanOrEqual(1);
      expect(review.rating).toBeLessThanOrEqual(5);
      expect(Number.isInteger(review.rating)).toBe(true);
    });
  });

  it('should have non-empty user names', () => {
    mockReviews.forEach((review: Review) => {
      expect(review.userName.length).toBeGreaterThan(0);
    });
  });

  it('should have non-empty titles', () => {
    mockReviews.forEach((review: Review) => {
      expect(review.title.length).toBeGreaterThan(0);
    });
  });

  it('should have non-empty text', () => {
    mockReviews.forEach((review: Review) => {
      expect(review.text.length).toBeGreaterThan(0);
    });
  });

  it('should have valid date format', () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    mockReviews.forEach((review: Review) => {
      expect(review.date).toMatch(dateRegex);
      expect(new Date(review.date).toString()).not.toBe('Invalid Date');
    });
  });

  it('should have non-negative helpful counts', () => {
    mockReviews.forEach((review: Review) => {
      expect(review.helpful).toBeGreaterThanOrEqual(0);
      expect(typeof review.helpful).toBe('number');
    });
  });

  it('should have valid traveler types', () => {
    const validTypes = ['Solo', 'Couple', 'Family', 'Friends', 'Business'];
    mockReviews.forEach((review: Review) => {
      expect(validTypes).toContain(review.travelerType);
    });
  });

  it('should have valid photo URLs when present', () => {
    mockReviews.forEach((review: Review) => {
      if (review.photos) {
        expect(Array.isArray(review.photos)).toBe(true);
        review.photos.forEach(photo => {
          expect(photo).toMatch(/^https?:\/\//);
        });
      }
    });
  });

  it('should have at least one review with photos', () => {
    const reviewsWithPhotos = mockReviews.filter(r => r.photos && r.photos.length > 0);
    expect(reviewsWithPhotos.length).toBeGreaterThan(0);
  });

  it('should have reviews from different traveler types', () => {
    const types = new Set(mockReviews.map(r => r.travelerType));
    expect(types.size).toBeGreaterThan(1);
  });
});

describe('getReviewsByDestination', () => {
  it('should return all reviews for any destination', () => {
    const reviews = getReviewsByDestination('paris');
    expect(reviews).toHaveLength(mockReviews.length);
  });

  it('should return the same reviews array', () => {
    const reviews = getReviewsByDestination('test-id');
    expect(reviews).toEqual(mockReviews);
  });
});

describe('getReviewStats', () => {
  it('should calculate correct total', () => {
    const stats = getReviewStats(mockReviews);
    expect(stats.total).toBe(mockReviews.length);
  });

  it('should calculate correct average rating', () => {
    const stats = getReviewStats(mockReviews);
    expect(stats.average).toBeGreaterThan(0);
    expect(stats.average).toBeLessThanOrEqual(5);
    expect(typeof stats.average).toBe('number');
  });

  it('should have breakdown for all rating levels', () => {
    const stats = getReviewStats(mockReviews);
    expect(stats.breakdown).toHaveProperty('1');
    expect(stats.breakdown).toHaveProperty('2');
    expect(stats.breakdown).toHaveProperty('3');
    expect(stats.breakdown).toHaveProperty('4');
    expect(stats.breakdown).toHaveProperty('5');
  });

  it('should have breakdown counts sum to total', () => {
    const stats = getReviewStats(mockReviews);
    const sum = stats.breakdown[1] + stats.breakdown[2] + stats.breakdown[3] + 
                stats.breakdown[4] + stats.breakdown[5];
    expect(sum).toBe(stats.total);
  });

  it('should calculate correct breakdown counts', () => {
    const stats = getReviewStats(mockReviews);
    const fiveStarCount = mockReviews.filter(r => r.rating === 5).length;
    const fourStarCount = mockReviews.filter(r => r.rating === 4).length;
    expect(stats.breakdown[5]).toBe(fiveStarCount);
    expect(stats.breakdown[4]).toBe(fourStarCount);
  });

  it('should round average to one decimal place', () => {
    const stats = getReviewStats(mockReviews);
    const decimalPlaces = stats.average.toString().split('.')[1]?.length || 0;
    expect(decimalPlaces).toBeLessThanOrEqual(1);
  });

  it('should handle empty reviews array', () => {
    const stats = getReviewStats([]);
    expect(stats.total).toBe(0);
    expect(isNaN(stats.average)).toBe(true);
  });

  it('should handle single review', () => {
    const singleReview = [mockReviews[0]];
    const stats = getReviewStats(singleReview);
    expect(stats.total).toBe(1);
    expect(stats.average).toBe(singleReview[0].rating);
  });
});
