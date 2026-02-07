import type { Locale } from '@/lib/i18n/config';
import { FAQPageClient } from './FAQPageClient';

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  
  return <FAQPageClient locale={locale} />;
}
