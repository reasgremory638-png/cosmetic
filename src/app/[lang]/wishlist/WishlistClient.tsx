'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import type { Product } from '@/lib/types';

interface WishlistClientProps {
  locale: Locale;
  dict: Dictionary;
}

export function WishlistClient({ locale, dict }: WishlistClientProps) {
  // In production, this would come from context/state management
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(items => items.filter(item => item.id !== productId));
  };
  
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">{dict.wishlist.title}</h1>
      
      {wishlistItems.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 border border-gray-200">
          <svg 
            className="w-16 h-16 mx-auto mb-4 text-gray-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <p className="text-gray-600 mb-6">{dict.wishlist.empty}</p>
          <Link href={`/${locale}/shop`} className="btn btn-primary">
            {dict.cart.continueShopping}
          </Link>
        </div>
      ) : (
        /* Wishlist Items Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="relative group">
              {/* Product Card Content */}
              <Link href={`/${locale}/product/${product.slug}`}>
                <div className="aspect-4/3 bg-gray-50 mb-3">
                  {/* Product image placeholder */}
                </div>
                <h3 className="font-medium text-sm mb-1">
                  {locale === 'ar' ? product.title_ar : product.title_en}
                </h3>
                <p className="text-sm font-semibold">${product.price}</p>
              </Link>
              
              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Remove from wishlist"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path 
                    fillRule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
