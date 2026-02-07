import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';

export default async function AccountPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  
  const menuItems = [
    { key: 'orders', href: `/${locale}/account/orders`, icon: '📦' },
    { key: 'addresses', href: `/${locale}/account/addresses`, icon: '📍' },
    { key: 'profile', href: `/${locale}/account/profile`, icon: '👤' },
  ];
  
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">{dict.account.title}</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="block p-8 border border-gray-200 hover:border-black transition-colors text-center"
          >
            <span className="text-4xl mb-4 block">{item.icon}</span>
            <span className="font-medium">{dict.account[item.key as keyof typeof dict.account]}</span>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <button className="text-gray-600 hover:text-black flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {dict.account.logout}
        </button>
      </div>
    </div>
  );
}
