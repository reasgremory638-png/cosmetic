import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';

export default async function CartPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  
  // Note: In production, cart state would come from context or server
  // This is a static demo showing the cart UI structure
  
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">{dict.cart.title}</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* Empty State */}
          <div className="text-center py-16 border border-gray-200">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className="text-gray-600 mb-6">{dict.cart.empty}</p>
            <Link href={`/${locale}/shop`} className="btn btn-primary">
              {dict.cart.continueShopping}
            </Link>
          </div>
          
          {/* Sample Cart Item Structure (hidden, for reference) */}
          <div className="hidden">
            <div className="flex gap-6 py-6 border-b border-gray-200">
              <div className="w-24 h-24 bg-gray-50 shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium">Product Name</h3>
                <p className="text-sm text-gray-600">Variant</p>
                <p className="font-medium mt-2">$00.00</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200">
                  <button className="px-3 py-1">−</button>
                  <span className="px-3 py-1">1</span>
                  <button className="px-3 py-1">+</button>
                </div>
                <button className="text-gray-600 hover:text-black">{dict.cart.remove}</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6">
            <h2 className="font-semibold mb-6">{dict.checkout.orderSummary}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">{dict.cart.subtotal}</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{dict.cart.shipping}</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>{dict.cart.total}</span>
                <span>$0.00</span>
              </div>
            </div>
            
            <button className="w-full btn btn-primary" disabled>
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
