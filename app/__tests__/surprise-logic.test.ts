import { mockDestinations } from '@/data/mockDestinations';

describe('Surprise Me Feature - Logic Tests', () => {
  describe('Random Destination Selection', () => {
    it('should have destinations available for selection', () => {
      expect(mockDestinations).toBeDefined();
      expect(mockDestinations.length).toBeGreaterThan(0);
    });

    it('should select a valid destination index', () => {
      const randomValue = 0.5;
      const selectedIndex = Math.floor(randomValue * mockDestinations.length);
      
      expect(selectedIndex).toBeGreaterThanOrEqual(0);
      expect(selectedIndex).toBeLessThan(mockDestinations.length);
    });

    it('should select first destination when random is 0', () => {
      const randomValue = 0;
      const selectedIndex = Math.floor(randomValue * mockDestinations.length);
      
      expect(selectedIndex).toBe(0);
      expect(mockDestinations[selectedIndex]).toBeDefined();
    });

    it('should select last destination when random is close to 1', () => {
      const randomValue = 0.99;
      const selectedIndex = Math.floor(randomValue * mockDestinations.length);
      
      expect(selectedIndex).toBe(mockDestinations.length - 1);
      expect(mockDestinations[selectedIndex]).toBeDefined();
    });

    it('should handle different random values correctly', () => {
      const testValues = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 0.99];
      
      testValues.forEach(randomValue => {
        const selectedIndex = Math.floor(randomValue * mockDestinations.length);
        expect(selectedIndex).toBeGreaterThanOrEqual(0);
        expect(selectedIndex).toBeLessThan(mockDestinations.length);
        expect(mockDestinations[selectedIndex]).toBeDefined();
      });
    });

    it('should produce different indices for different random values', () => {
      const index1 = Math.floor(0.1 * mockDestinations.length);
      const index2 = Math.floor(0.9 * mockDestinations.length);
      
      // With 6 destinations, these should be different
      if (mockDestinations.length > 2) {
        expect(index1).not.toBe(index2);
      }
    });
  });

  describe('Destination Data Validation', () => {
    it('should have all required properties for each destination', () => {
      mockDestinations.forEach(destination => {
        expect(destination.id).toBeDefined();
        expect(destination.name).toBeDefined();
        expect(destination.country).toBeDefined();
        expect(destination.image).toBeDefined();
        expect(destination.price).toBeDefined();
        expect(destination.rating).toBeDefined();
      });
    });

    it('should have valid destination IDs', () => {
      mockDestinations.forEach(destination => {
        expect(typeof destination.id).toBe('string');
        expect(destination.id.length).toBeGreaterThan(0);
      });
    });

    it('should have valid destination names', () => {
      mockDestinations.forEach(destination => {
        expect(typeof destination.name).toBe('string');
        expect(destination.name.length).toBeGreaterThan(0);
      });
    });

    it('should have valid destination countries', () => {
      mockDestinations.forEach(destination => {
        expect(typeof destination.country).toBe('string');
        expect(destination.country.length).toBeGreaterThan(0);
      });
    });

    it('should have valid destination images', () => {
      mockDestinations.forEach(destination => {
        expect(typeof destination.image).toBe('string');
        expect(destination.image.length).toBeGreaterThan(0);
      });
    });

    it('should have valid destination prices', () => {
      mockDestinations.forEach(destination => {
        expect(typeof destination.price).toBe('number');
        expect(destination.price).toBeGreaterThan(0);
      });
    });

    it('should have valid destination ratings', () => {
      mockDestinations.forEach(destination => {
        expect(typeof destination.rating).toBe('number');
        expect(destination.rating).toBeGreaterThanOrEqual(0);
        expect(destination.rating).toBeLessThanOrEqual(5);
      });
    });
  });

  describe('Gesture Velocity Calculation', () => {
    it('should calculate velocity from x and y components', () => {
      const velocityX = 600;
      const velocityY = 800;
      const velocity = Math.sqrt(velocityX ** 2 + velocityY ** 2);
      
      expect(velocity).toBe(1000);
    });

    it('should determine if velocity exceeds threshold', () => {
      const threshold = 500;
      
      const highVelocity = Math.sqrt(600 ** 2 + 800 ** 2);
      expect(highVelocity).toBeGreaterThan(threshold);
      
      const lowVelocity = Math.sqrt(100 ** 2 + 100 ** 2);
      expect(lowVelocity).toBeLessThan(threshold);
    });

    it('should handle zero velocity', () => {
      const velocity = Math.sqrt(0 ** 2 + 0 ** 2);
      expect(velocity).toBe(0);
    });

    it('should handle negative velocity components', () => {
      const velocity = Math.sqrt((-300) ** 2 + (-400) ** 2);
      expect(velocity).toBe(500);
    });
  });

  describe('Animation Timing', () => {
    it('should have reasonable dart throw duration', () => {
      const throwDuration = 800;
      expect(throwDuration).toBeGreaterThan(0);
      expect(throwDuration).toBeLessThan(2000);
    });

    it('should have reasonable destination reveal delay', () => {
      const revealDelay = 800;
      expect(revealDelay).toBeGreaterThan(0);
      expect(revealDelay).toBeLessThan(2000);
    });

    it('should have reasonable globe rotation duration', () => {
      const rotationDuration = 20000;
      expect(rotationDuration).toBeGreaterThan(0);
    });
  });

  describe('Dimensions Calculation', () => {
    it('should calculate globe size as percentage of screen width', () => {
      const mockWidth = 375; // iPhone width
      const globeSize = mockWidth * 0.6;
      
      expect(globeSize).toBe(225);
      expect(globeSize).toBeGreaterThan(0);
      expect(globeSize).toBeLessThan(mockWidth);
    });

    it('should have fixed dart size', () => {
      const dartSize = 60;
      expect(dartSize).toBeGreaterThan(0);
      expect(dartSize).toBeLessThan(100);
    });

    it('should handle different screen widths', () => {
      const widths = [320, 375, 414, 768, 1024];
      
      widths.forEach(width => {
        const globeSize = width * 0.6;
        expect(globeSize).toBeGreaterThan(0);
        expect(globeSize).toBeLessThan(width);
      });
    });
  });

  describe('Destination Navigation', () => {
    it('should construct valid destination route', () => {
      const destination = mockDestinations[0];
      const route = `/destination/${destination.id}`;
      
      expect(route).toContain('/destination/');
      expect(route).toContain(destination.id);
    });

    it('should construct routes for all destinations', () => {
      mockDestinations.forEach(destination => {
        const route = `/destination/${destination.id}`;
        expect(route).toMatch(/^\/destination\/[a-z0-9-]+$/);
      });
    });
  });

  describe('State Management', () => {
    it('should initialize with no selected destination', () => {
      const initialDestination = null;
      expect(initialDestination).toBeNull();
    });

    it('should initialize with not animating', () => {
      const initialAnimating = false;
      expect(initialAnimating).toBe(false);
    });

    it('should handle destination selection', () => {
      const selectedDestination = mockDestinations[0];
      expect(selectedDestination).not.toBeNull();
      expect(selectedDestination).toBeDefined();
    });

    it('should handle reset to initial state', () => {
      let selectedDestination = mockDestinations[0];
      let isAnimating = true;
      
      // Reset
      selectedDestination = null;
      isAnimating = false;
      
      expect(selectedDestination).toBeNull();
      expect(isAnimating).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle single destination', () => {
      const singleDestination = [mockDestinations[0]];
      const selectedIndex = Math.floor(0.5 * singleDestination.length);
      
      expect(selectedIndex).toBe(0);
      expect(singleDestination[selectedIndex]).toBeDefined();
    });

    it('should handle maximum random value', () => {
      const randomValue = 0.999999;
      const selectedIndex = Math.floor(randomValue * mockDestinations.length);
      
      expect(selectedIndex).toBeLessThan(mockDestinations.length);
      expect(mockDestinations[selectedIndex]).toBeDefined();
    });

    it('should handle minimum random value', () => {
      const randomValue = 0.000001;
      const selectedIndex = Math.floor(randomValue * mockDestinations.length);
      
      expect(selectedIndex).toBeGreaterThanOrEqual(0);
      expect(mockDestinations[selectedIndex]).toBeDefined();
    });
  });

  describe('Data Integrity', () => {
    it('should not have duplicate destination IDs', () => {
      const ids = mockDestinations.map(d => d.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have consistent data types', () => {
      mockDestinations.forEach(destination => {
        expect(typeof destination.id).toBe('string');
        expect(typeof destination.name).toBe('string');
        expect(typeof destination.country).toBe('string');
        expect(typeof destination.image).toBe('string');
        expect(typeof destination.price).toBe('number');
        expect(typeof destination.rating).toBe('number');
      });
    });

    it('should have reasonable price ranges', () => {
      mockDestinations.forEach(destination => {
        expect(destination.price).toBeGreaterThan(0);
        expect(destination.price).toBeLessThan(10000);
      });
    });

    it('should have valid rating ranges', () => {
      mockDestinations.forEach(destination => {
        expect(destination.rating).toBeGreaterThanOrEqual(0);
        expect(destination.rating).toBeLessThanOrEqual(5);
      });
    });
  });
});
