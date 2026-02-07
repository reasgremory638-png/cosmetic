'use client';

import Link from 'next/link';
import type { Product } from '@/lib/types';
import type { Locale } from '@/lib/i18n/config';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const title = locale === 'ar' ? product.title_ar : product.title_en;
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  
  return (
    <Link href={`/${locale}/product/${product.slug}`} className="group block">
      <article className="card overflow-hidden">
        {/* Image Container - Horizontal Landscape */}
        <div className="relative aspect-4/3 overflow-hidden bg-gray-50">
          <ImagePlaceholder
            src={product.images[0] || ''}
            alt={title}
            aspectRatio="4/3"
            className="w-full h-full"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.newArrival && (
              <span className="badge badge-new">
                {locale === 'ar' ? 'جديد' : 'New'}
              </span>
            )}
            {isOnSale && (
              <span className="badge badge-sale">
                {locale === 'ar' ? 'تخفيض' : 'Sale'}
              </span>
            )}
          </div>
          
          {/* Quick Add Button - Shows on hover */}
        <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button 
            className="w-full py-2 bg-white text-black text-sm font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors duration-200"
            aria-label={`Quick add ${title} to cart`}
          >
            {locale === 'ar' ? 'إضافة سريعة' : 'Quick Add'}
          </button>
        </div>
        </div>
        
        {/* Product Info */}
        <div className="p-3">
          {/* Brand */}
          <p className="text-[10px] sm:text-xs text-[#666] uppercase tracking-wide mb-1">
            {locale === 'ar' ? product.brand.name_ar : product.brand.name_en}
          </p>
          
          {/* Title */}
          <h3 className="font-medium text-sm sm:text-base text-black mb-1.5 line-clamp-2">
            {title}
          </h3>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm sm:text-base text-black">
              ${product.price}
            </span>
            {isOnSale && (
              <span className="text-xs text-gray-500 line-through">
                ${product.compareAtPrice}
              </span>
            )}
          </div>
          
          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mt-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${star <= Math.round(product.rating) ? 'text-black' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[10px] sm:text-xs text-gray-500">({product.reviewCount})</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
