import i18n from '../../i18n/config';

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

describe('i18n Integration Tests', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  describe('Translation Keys Coverage', () => {
    it('should have all tab translations available', () => {
      expect(i18n.exists('tabs.home')).toBe(true);
      expect(i18n.exists('tabs.explore')).toBe(true);
    });

    it('should have all home screen translations available', () => {
      expect(i18n.exists('home.welcome')).toBe(true);
      expect(i18n.exists('home.step1.title')).toBe(true);
      expect(i18n.exists('home.step1.editFile')).toBe(true);
      expect(i18n.exists('home.step2.title')).toBe(true);
      expect(i18n.exists('home.step2.description')).toBe(true);
      expect(i18n.exists('home.step3.title')).toBe(true);
      expect(i18n.exists('home.step3.description')).toBe(true);
    });

    it('should have all explore screen translations available', () => {
      expect(i18n.exists('explore.title')).toBe(true);
      expect(i18n.exists('explore.subtitle')).toBe(true);
      expect(i18n.exists('explore.fileBasedRouting.title')).toBe(true);
      expect(i18n.exists('explore.fileBasedRouting.description1')).toBe(true);
      expect(i18n.exists('explore.fileBasedRouting.description2')).toBe(true);
      expect(i18n.exists('explore.platformSupport.title')).toBe(true);
      expect(i18n.exists('explore.images.title')).toBe(true);
      expect(i18n.exists('explore.theming.title')).toBe(true);
      expect(i18n.exists('explore.animations.title')).toBe(true);
    });

    it('should have all modal translations available', () => {
      expect(i18n.exists('modal.title')).toBe(true);
      expect(i18n.exists('modal.goHome')).toBe(true);
    });
  });

  describe('Translation Consistency', () => {
    it('should have matching keys in English and German', () => {
      const enKeys = Object.keys(i18n.getResourceBundle('en', 'translation'));
      const deKeys = Object.keys(i18n.getResourceBundle('de', 'translation'));
      
      expect(enKeys.sort()).toEqual(deKeys.sort());
    });

    it('should have matching nested keys for tabs', () => {
      const enTabs = i18n.getResourceBundle('en', 'translation').tabs;
      const deTabs = i18n.getResourceBundle('de', 'translation').tabs;
      
      expect(Object.keys(enTabs).sort()).toEqual(Object.keys(deTabs).sort());
    });

    it('should have matching nested keys for home', () => {
      const enHome = i18n.getResourceBundle('en', 'translation').home;
      const deHome = i18n.getResourceBundle('de', 'translation').home;
      
      expect(Object.keys(enHome).sort()).toEqual(Object.keys(deHome).sort());
    });

    it('should have matching nested keys for explore', () => {
      const enExplore = i18n.getResourceBundle('en', 'translation').explore;
      const deExplore = i18n.getResourceBundle('de', 'translation').explore;
      
      expect(Object.keys(enExplore).sort()).toEqual(Object.keys(deExplore).sort());
    });
  });

  describe('Interpolation', () => {
    it('should handle interpolation in translations', () => {
      const result = i18n.t('home.step1.editFile', { shortcut: 'Cmd+D' });
      expect(result).toContain('Cmd+D');
    });

    it('should handle interpolation in German translations', () => {
      i18n.changeLanguage('de');
      const result = i18n.t('home.step1.editFile', { shortcut: 'Cmd+D' });
      expect(result).toContain('Cmd+D');
    });
  });

  describe('Fallback Behavior', () => {
    it('should fallback to English for missing translations', () => {
      i18n.changeLanguage('fr');
      expect(i18n.t('tabs.home')).toBe('Home');
    });

    it('should return key for completely missing translations', () => {
      const result = i18n.t('nonexistent.key');
      expect(result).toBe('nonexistent.key');
    });
  });
});
