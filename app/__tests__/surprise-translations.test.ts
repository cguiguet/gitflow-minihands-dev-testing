import i18n from '../../i18n/config';

jest.mock('expo-localization', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

describe('Surprise Me Feature - Translation Tests', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  describe('English Translations', () => {
    it('should have surprise tab translation', () => {
      expect(i18n.exists('tabs.surprise')).toBe(true);
      expect(i18n.t('tabs.surprise')).toBe('Surprise');
    });

    it('should have surprise screen title translation', () => {
      expect(i18n.exists('surprise.title')).toBe(true);
      expect(i18n.t('surprise.title')).toBe('Surprise Me!');
    });

    it('should have surprise screen subtitle translation', () => {
      expect(i18n.exists('surprise.subtitle')).toBe(true);
      expect(i18n.t('surprise.subtitle')).toBe('Discover your next adventure');
    });

    it('should have instructions translation', () => {
      expect(i18n.exists('surprise.instructions')).toBe(true);
      expect(i18n.t('surprise.instructions')).toBe('Drag and release the dart to find a random destination');
    });

    it('should have landing text translation', () => {
      expect(i18n.exists('surprise.landing')).toBe(true);
      expect(i18n.t('surprise.landing')).toBe("You're going to...");
    });

    it('should have view details button translation', () => {
      expect(i18n.exists('surprise.viewDetails')).toBe(true);
      expect(i18n.t('surprise.viewDetails')).toBe('View Details');
    });

    it('should have try again button translation', () => {
      expect(i18n.exists('surprise.tryAgain')).toBe(true);
      expect(i18n.t('surprise.tryAgain')).toBe('Try Again');
    });
  });

  describe('German Translations', () => {
    beforeEach(() => {
      i18n.changeLanguage('de');
    });

    it('should have surprise tab translation in German', () => {
      expect(i18n.exists('tabs.surprise')).toBe(true);
      expect(i18n.t('tabs.surprise')).toBe('Überraschung');
    });

    it('should have surprise screen title translation in German', () => {
      expect(i18n.exists('surprise.title')).toBe(true);
      expect(i18n.t('surprise.title')).toBe('Überrasch mich!');
    });

    it('should have surprise screen subtitle translation in German', () => {
      expect(i18n.exists('surprise.subtitle')).toBe(true);
      expect(i18n.t('surprise.subtitle')).toBe('Entdecke dein nächstes Abenteuer');
    });

    it('should have instructions translation in German', () => {
      expect(i18n.exists('surprise.instructions')).toBe(true);
      expect(i18n.t('surprise.instructions')).toBe('Ziehe den Pfeil und lass ihn los, um ein zufälliges Ziel zu finden');
    });

    it('should have landing text translation in German', () => {
      expect(i18n.exists('surprise.landing')).toBe(true);
      expect(i18n.t('surprise.landing')).toBe('Du fliegst nach...');
    });

    it('should have view details button translation in German', () => {
      expect(i18n.exists('surprise.viewDetails')).toBe(true);
      expect(i18n.t('surprise.viewDetails')).toBe('Details anzeigen');
    });

    it('should have try again button translation in German', () => {
      expect(i18n.exists('surprise.tryAgain')).toBe(true);
      expect(i18n.t('surprise.tryAgain')).toBe('Nochmal versuchen');
    });
  });

  describe('Translation Completeness', () => {
    it('should have all surprise translations in both languages', () => {
      const requiredKeys = [
        'tabs.surprise',
        'surprise.title',
        'surprise.subtitle',
        'surprise.instructions',
        'surprise.landing',
        'surprise.viewDetails',
        'surprise.tryAgain',
      ];

      // Check English
      i18n.changeLanguage('en');
      requiredKeys.forEach(key => {
        expect(i18n.exists(key)).toBe(true);
      });

      // Check German
      i18n.changeLanguage('de');
      requiredKeys.forEach(key => {
        expect(i18n.exists(key)).toBe(true);
      });
    });

    it('should not have missing translations', () => {
      i18n.changeLanguage('en');
      expect(i18n.t('surprise.title')).not.toContain('surprise.title');
      
      i18n.changeLanguage('de');
      expect(i18n.t('surprise.title')).not.toContain('surprise.title');
    });
  });

  describe('Translation Context', () => {
    it('should provide user-friendly instructions', () => {
      i18n.changeLanguage('en');
      const instructions = i18n.t('surprise.instructions');
      expect(instructions.toLowerCase()).toContain('drag');
      expect(instructions.toLowerCase()).toContain('dart');
    });

    it('should have encouraging title', () => {
      i18n.changeLanguage('en');
      const title = i18n.t('surprise.title');
      expect(title).toContain('!');
    });

    it('should have adventure-themed subtitle', () => {
      i18n.changeLanguage('en');
      const subtitle = i18n.t('surprise.subtitle');
      expect(subtitle.toLowerCase()).toContain('adventure');
    });
  });
});
