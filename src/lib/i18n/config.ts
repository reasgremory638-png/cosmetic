// i18n Configuration
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function getLocaleName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: 'English',
    ar: 'العربية',
  };
  return names[locale];
}

// Get the opposite locale for switching
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en';
}
