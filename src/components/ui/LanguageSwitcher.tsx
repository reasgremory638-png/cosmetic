'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getAlternateLocale, getLocaleName } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  locale: Locale;
  currentPath: string;
}

export function LanguageSwitcher({ locale, currentPath }: LanguageSwitcherProps) {
  const alternateLocale = getAlternateLocale(locale);
  const alternatePath = currentPath.replace(`/${locale}`, `/${alternateLocale}`);
  
  return (
    <Link
      href={alternatePath || `/${alternateLocale}`}
      className="text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity"
    >
      {getLocaleName(alternateLocale)}
    </Link>
  );
}
