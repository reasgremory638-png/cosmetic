'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionary';
import { products } from '@/lib/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { useCart } from '@/lib/context/CartContext';

interface ProductDetailClientProps {
  product: Product;
  locale: Locale;
  dict: Dictionary;
}

export function ProductDetailClient({ product, locale, dict }: ProductDetailClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'howToUse' | 'ingredients' | 'shipping'>('benefits');
  const [isAdding, setIsAdding] = useState(false);
  
  const { addItem } = useCart();
  
  const title = locale === 'ar' ? product.title_ar : product.title_en;
  const description = locale === 'ar' ? product.description_ar : product.description_en;
  const benefits = locale === 'ar' ? product.benefits_ar : product.benefits_en;
  const howToUse = locale === 'ar' ? product.howToUse_ar : product.howToUse_en;
  const ingredients = locale === 'ar' ? product.ingredients_ar : product.ingredients_en;
  const brandName = locale === 'ar' ? product.brand.name_ar : product.brand.name_en;
  
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;
  
  // Get related products (same category, different product)
  const relatedProducts = products
    .filter(p => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-8">
        <ol className="flex items-center gap-2 text-[#666]">
          <li><Link href={`/${locale}`} className="hover:text-[#111]">{dict.nav.home}</Link></li>
          <li>/</li>
          <li><Link href={`/${locale}/shop`} className="hover:text-[#111]">{dict.nav.shop}</Link></li>
          <li>/</li>
          <li><Link href={`/${locale}/shop/${product.category.slug}`} className="hover:text-[#111]">
            {locale === 'ar' ? product.category.name_ar : product.category.name_en}
          </Link></li>
          <li>/</li>
          <li className="text-[#111]">{title}</li>
        </ol>
      </nav>
      
      {/* Product Detail */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-50 flex items-center justify-center relative overflow-hidden mb-4">
            {product.images?.length ? (
              <Image 
                src={product.images[0]} 
                alt={title} 
                width={800}
                height={800}
                className="w-full h-full object-cover" 
                priority
              />
            ) : (
              <span className="text-gray-400">Product Image</span>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images?.slice(0, 4).map((img, i) => (
                <button 
                  key={i} 
                  className="aspect-square bg-gray-50 border border-gray-200 hover:border-black transition-colors overflow-hidden"
                  aria-label={`View image ${i + 1}`}
                >
                  <Image 
                    src={img} 
                    alt={`${title} - view ${i + 1}`} 
                    width={200}
                    height={200}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          {/* Brand */}
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">{brandName}</p>
          
          {/* Title */}
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          
          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'text-black' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviewCount} {dict.product.reviews.title.toLowerCase()})</span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-semibold">${product.price}</span>
            {isOnSale && (
              <span className="text-lg text-gray-500 line-through">${product.compareAtPrice}</span>
            )}
            {isOnSale && (
              <span className="badge badge-sale">
                {locale === 'ar' ? 'تخفيض' : 'Sale'}
              </span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-600 mb-6">{description}</p>
          
          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">
                {product.variants[0].type === 'shade' ? dict.product.shade : dict.product.size}
              </h3>
              <div className="flex gap-2" role="group" aria-label="Product variants">
              {product.variants?.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`px-4 py-2 border text-sm ${
                    selectedVariant === variant.id
                      ? 'bg-black text-white border-black'
                      : 'border-gray-200 hover:border-black'
                  } transition-colors`}
                  aria-label={`Select ${variant.name_en} variant`}
                  aria-pressed={selectedVariant === variant.id}
                >
                    {locale === 'ar' ? variant.name_ar : variant.name_en}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity & Add to Cart */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-3" role="group" aria-label="Quantity selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="text-lg font-medium min-w-[3ch] text-center" aria-live="polite">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button 
              className={`flex-1 ${isAdding ? 'bg-green-600' : 'bg-black'} text-white py-3 font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors`} 
              aria-label={`Add ${title} to cart`}
              onClick={() => {
                setIsAdding(true);
                addItem(product, selectedVariant, quantity);
                setTimeout(() => setIsAdding(false), 2000);
              }}
            >
              {isAdding 
                ? (locale === 'ar' ? 'تمت الإضافة' : 'Added to Cart!') 
                : dict.product.addToCart}
            </button>
          </div>
          
          {/* Stock Status */}
          <p className={`text-sm mb-6 ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
            {product.stock > 0 ? dict.product.inStock : dict.product.outOfStock}
            {product.stock > 0 && product.stock < 10 && (
              <span className="text-gray-600"> - {dict.product.lowStock.replace('{{count}}', String(product.stock))}</span>
            )}
          </p>
          
          {/* Wishlist */}
          <button 
            className="w-14 h-14 flex items-center justify-center border border-gray-200 hover:bg-black hover:text-white transition-colors"
            aria-label={`Add ${title} to wishlist`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
            {product.filters.crueltyFree && (
              <span className="text-xs text-gray-600 px-2 py-1 bg-gray-50">{dict.filters.crueltyFree}</span>
            )}
            {product.filters.vegan && (
              <span className="text-xs text-gray-600 px-2 py-1 bg-gray-50">{dict.filters.vegan}</span>
            )}
            {product.filters.halal && (
              <span className="text-xs text-gray-600 px-2 py-1 bg-gray-50">{dict.filters.halal}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-20">
        <div className="flex border-b border-gray-200 mb-8">
          {(['benefits', 'howToUse', 'ingredients', 'shipping'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium uppercase tracking-wide border-b-2 -mb-px transition-colors ${
                activeTab === tab
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-600 hover:text-black'
              }`}
            >
              {dict.product.tabs[tab]}
            </button>
          ))}
        </div>
        
        <div className="max-w-3xl">
          {activeTab === 'benefits' && (
            <ul className="space-y-2">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#111]">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'howToUse' && <p className="text-gray-600 leading-relaxed">{howToUse}</p>}
          {activeTab === 'ingredients' && <p className="text-gray-600 leading-relaxed">{ingredients}</p>}
          {activeTab === 'shipping' && (
            <p className="text-gray-600 leading-relaxed">
              {locale === 'ar' 
                ? 'شحن مجاني للطلبات فوق 50 دولار. التوصيل خلال 3-5 أيام عمل. إرجاع مجاني خلال 30 يوم.'
                : 'Free shipping on orders over $50. Delivery within 3-5 business days. Free returns within 30 days.'
              }
            </p>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-8">{dict.product.related}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
