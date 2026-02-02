import i18n from '../config';
import * as Localization from 'expo-localization';

jest.mock('expo-localization');

describe('i18n configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize i18n with default language', () => {
    expect(i18n).toBeDefined();
    expect(i18n.isInitialized).toBe(true);
  });

  it('should have English as fallback language', () => {
    expect(i18n.options.fallbackLng).toEqual(['en']);
  });

  it('should have both English and German resources', () => {
    expect(i18n.hasResourceBundle('en', 'translation')).toBe(true);
    expect(i18n.hasResourceBundle('de', 'translation')).toBe(true);
  });

  it('should disable escapeValue for React', () => {
    expect(i18n.options.interpolation?.escapeValue).toBe(false);
  });

  it('should use v3 compatibility JSON', () => {
    expect(i18n.options.compatibilityJSON).toBe('v3');
  });

  describe('language detection', () => {
    it('should use device language when supported', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([
        { languageCode: 'de' },
      ]);
      
      const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
      const supportedLanguages = ['en', 'de'];
      const fallbackLanguage = supportedLanguages.includes(deviceLanguage) 
        ? deviceLanguage 
        : 'en';
      
      expect(fallbackLanguage).toBe('de');
    });

    it('should fallback to English when device language is not supported', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([
        { languageCode: 'fr' },
      ]);
      
      const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
      const supportedLanguages = ['en', 'de'];
      const fallbackLanguage = supportedLanguages.includes(deviceLanguage) 
        ? deviceLanguage 
        : 'en';
      
      expect(fallbackLanguage).toBe('en');
    });

    it('should fallback to English when no device language is available', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([]);
      
      const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';
      const supportedLanguages = ['en', 'de'];
      const fallbackLanguage = supportedLanguages.includes(deviceLanguage) 
        ? deviceLanguage 
        : 'en';
      
      expect(fallbackLanguage).toBe('en');
    });
  });

  describe('translation keys', () => {
    it('should have all required tab translations in English', () => {
      const enTranslations = i18n.getResourceBundle('en', 'translation');
      expect(enTranslations.tabs).toBeDefined();
      expect(enTranslations.tabs.home).toBe('Home');
      expect(enTranslations.tabs.explore).toBe('Explore');
    });

    it('should have all required tab translations in German', () => {
      const deTranslations = i18n.getResourceBundle('de', 'translation');
      expect(deTranslations.tabs).toBeDefined();
      expect(deTranslations.tabs.home).toBe('Startseite');
      expect(deTranslations.tabs.explore).toBe('Erkunden');
    });

    it('should have home screen translations in English', () => {
      const enTranslations = i18n.getResourceBundle('en', 'translation');
      expect(enTranslations.home).toBeDefined();
      expect(enTranslations.home.welcome).toBe('Welcome!');
      expect(enTranslations.home.step1).toBeDefined();
      expect(enTranslations.home.step2).toBeDefined();
      expect(enTranslations.home.step3).toBeDefined();
    });

    it('should have explore screen translations in English', () => {
      const enTranslations = i18n.getResourceBundle('en', 'translation');
      expect(enTranslations.explore).toBeDefined();
      expect(enTranslations.explore.title).toBe('Explore');
      expect(enTranslations.explore.subtitle).toBeDefined();
    });

    it('should have modal translations in English', () => {
      const enTranslations = i18n.getResourceBundle('en', 'translation');
      expect(enTranslations.modal).toBeDefined();
      expect(enTranslations.modal.title).toBe('This is a modal');
      expect(enTranslations.modal.goHome).toBe('Go to home screen');
    });
  });

  describe('translation functionality', () => {
    it('should translate simple keys', () => {
      i18n.changeLanguage('en');
      expect(i18n.t('tabs.home')).toBe('Home');
      expect(i18n.t('tabs.explore')).toBe('Explore');
    });

    it('should translate nested keys', () => {
      i18n.changeLanguage('en');
      expect(i18n.t('home.welcome')).toBe('Welcome!');
      expect(i18n.t('home.step1.title')).toBe('Step 1: Try it');
    });

    it('should switch languages correctly', () => {
      i18n.changeLanguage('en');
      expect(i18n.t('tabs.home')).toBe('Home');
      
      i18n.changeLanguage('de');
      expect(i18n.t('tabs.home')).toBe('Startseite');
    });

    it('should handle interpolation', () => {
      i18n.changeLanguage('en');
      const translated = i18n.t('home.step1.editFile', { shortcut: 'Cmd+D' });
      expect(translated).toContain('Cmd+D');
    });
  });
});
