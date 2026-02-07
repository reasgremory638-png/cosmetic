'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { categories } from '@/lib/data/categories';

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
  currentPath: string;
}

export function Header({ locale, dict, currentPath }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 px-4 text-sm">
        {locale === 'ar' ? 'شحن مجاني للطلبات فوق ٥٠ دولار' : 'Free shipping on orders over $50'}
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Logo */}
          <Link href={`/${locale}`} className="text-xl font-bold tracking-tight uppercase">
            {dict.site.name}
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href={`/${locale}/shop`} className="text-sm font-medium uppercase tracking-wide hover:opacity-70">
              {dict.nav.shop}
            </Link>
            {categories.slice(0, 2).map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/shop/${cat.slug}`}
                className="text-sm font-medium uppercase tracking-wide hover:opacity-70"
              >
                {locale === 'ar' ? cat.name_ar : cat.name_en}
              </Link>
            ))}
            <Link href={`/${locale}/about`} className="text-sm font-medium uppercase tracking-wide hover:opacity-70">
              {dict.nav.about}
            </Link>
            <Link href={`/${locale}/contact`} className="text-sm font-medium uppercase tracking-wide hover:opacity-70">
              {dict.nav.contact}
            </Link>
          </nav>
          
          {/* Right Icons */}
          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher locale={locale} currentPath={currentPath} />
            
            {/* Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:text-gray-600 transition-colors"
              aria-label="Toggle search"
              aria-expanded={searchOpen}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Wishlist */}
            <Link href={`/${locale}/wishlist`} className="p-2 hover:text-gray-600 transition-colors hidden sm:block" aria-label="Wishlist">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            
            {/* Cart */}
            <Link href={`/${locale}/cart`} className="p-2 hover:text-gray-600 transition-colors relative" aria-label="Shopping cart (0 items)">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center" aria-hidden="true">0</span>
            </Link>
            
            {/* Account */}
            <Link href={`/${locale}/account`} className="p-2 hover:text-gray-600 transition-colors hidden sm:block" aria-label="My account">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4">
          <div className="container mx-auto max-w-2xl">
            <div className="relative">
              <input
                type="search"
                placeholder={dict.nav.search + '...'}
                className="w-full py-3 px-4 pr-12 border border-gray-200 focus:border-black outline-none"
                autoFocus
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => setSearchOpen(false)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <Link href={`/${locale}/shop`} className="py-2 text-sm font-medium uppercase tracking-wide" onClick={() => setMobileMenuOpen(false)}>
              {dict.nav.shop}
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${locale}/shop/${cat.slug}`}
                className="py-2 text-sm font-medium uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {locale === 'ar' ? cat.name_ar : cat.name_en}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
