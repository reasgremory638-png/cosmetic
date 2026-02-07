import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, getDirection, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/lib/context/CartContext';

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isArabic = lang === 'ar';
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
    title: isArabic ? 'كوزماتك | مستلزمات الجمال الفاخرة' : 'Cosmatic | Premium Beauty Essentials',
    description: isArabic 
      ? 'اكتشفي مستحضرات التجميل الفاخرة المصممة للجمال الواعي'
      : 'Discover premium cosmetics crafted for conscious beauty',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  
  if (!locales.includes(locale)) {
    notFound();
  }
  
  const dict = await getDictionary(locale);
  const direction = getDirection(locale);
  
  return (
    <CartProvider>
      <div dir={direction} className={locale === 'ar' ? 'font-arabic' : ''}>
        <Header locale={locale} dict={dict} currentPath={`/${locale}`} />
        <main>{children}</main>
        <Footer locale={locale} dict={dict} />
      </div>
    </CartProvider>
  );
}
