'use client';

import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { useCart } from '@/lib/context/CartContext';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

interface CartClientProps {
  locale: Locale;
  dict: Dictionary;
}

export function CartClient({ locale, dict }: CartClientProps) {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">{dict.cart.title}</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16 border border-gray-200">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-600 mb-6">{dict.cart.empty}</p>
              <Link href={`/${locale}/shop`} className="btn btn-primary">
                {dict.cart.continueShopping}
              </Link>
            </div>
          ) : (
            /* Cart Items List */
            <div className="space-y-6">
              {items.map((item) => {
                const title = locale === 'ar' ? item.product.title_ar : item.product.title_en;
                const variant = item.variantId ? (
                  item.product.variants?.find(v => v.id === item.variantId)
                ) : null;
                const variantName = variant ? (locale === 'ar' ? variant.name_ar : variant.name_en) : '';

                return (
                  <div key={`${item.product.id}-${item.variantId || 'default'}`} className="flex gap-6 py-6 border-b border-gray-200 last:border-0">
                    <div className="w-24 h-24 bg-gray-50 shrink-0 overflow-hidden">
                      <ImagePlaceholder
                        src={item.product.images[0]}
                        alt={title}
                        aspectRatio="1/1"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{title}</h3>
                      {variantName && <p className="text-sm text-gray-600">{variantName}</p>}
                      <p className="font-medium mt-2">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantId)}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 min-w-[3ch] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantId)}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.product.id, item.variantId)}
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        {dict.cart.remove}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 sticky top-24">
            <h2 className="font-semibold mb-6">{dict.checkout.orderSummary}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">{dict.cart.subtotal}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{dict.cart.shipping}</span>
                <span className="text-gray-600">{locale === 'ar' ? 'يحسب عند الدفع' : 'Calculated at checkout'}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>{dict.cart.total}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              className="w-full btn btn-primary py-3 flex items-center justify-center gap-2"
              disabled={items.length === 0}
            >
              {dict.cart.checkout}
            </button>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              {dict.cart.freeShipping}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
