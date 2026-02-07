'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Product } from '@/lib/types';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

interface RoutineBuilderProps {
  locale: Locale;
  products: Product[];
}

type RoutineStep = 'cleanse' | 'treat' | 'moisturize';

export function RoutineBuilder({ locale, products }: RoutineBuilderProps) {
  const [activeTab, setActiveTab] = useState<RoutineStep>('cleanse');

  const tabs: { id: RoutineStep; label_en: string; label_ar: string }[] = [
    { id: 'cleanse', label_en: 'Cleanse', label_ar: 'تنظيف' },
    { id: 'treat', label_en: 'Treat', label_ar: 'علاج' },
    { id: 'moisturize', label_en: 'Moisturize', label_ar: 'ترطيب' },
  ];

  const getProductsForStep = (step: RoutineStep): Product[] => {
    const categoryMap: Record<RoutineStep, string[]> = {
      cleanse: ['cleanser', 'toner'],
      treat: ['serum', 'retinol', 'mask'],
      moisturize: ['moisturizer', 'sunscreen'],
    };

    return products
      .filter(p => 
        p.subcategory && categoryMap[step].includes(p.subcategory.slug)
      )
      .slice(0, 3);
  };

  const currentProducts = getProductsForStep(activeTab);

  return (
    <div className="routine-builder">
      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`routine-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            {locale === 'ar' ? tab.label_ar : tab.label_en}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <Link 
            key={product.id} 
            href={`/${locale}/product/${product.slug}`}
            className="routine-card group"
          >
            <div className="mb-4 overflow-hidden rounded-3xl">
              <ImagePlaceholder
                src={product.images[0] || ''}
                alt={locale === 'ar' ? product.title_ar : product.title_en}
                aspectRatio="1/1"
                className="w-full transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Skin type badge */}
              {product.filters.skinType && product.filters.skinType[0] && (
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium z-10" style={{ color: 'var(--text-2)' }}>
                  {product.filters.skinType[0]}
                </div>
              )}
            </div>

            <h4 className="font-heading text-lg mb-2" style={{ color: 'var(--text-1)' }}>
              {locale === 'ar' ? product.title_ar : product.title_en}
            </h4>
            <p className="text-sm mb-3" style={{ color: 'var(--text-2)' }}>
              {locale === 'ar' ? product.brand.name_ar : product.brand.name_en}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg" style={{ color: 'var(--accent-1)' }}>
                ${product.price}
              </span>
              <button className="add-btn opacity-0 group-hover:opacity-100 transition-opacity">
                {locale === 'ar' ? 'إضافة' : 'Add'}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
