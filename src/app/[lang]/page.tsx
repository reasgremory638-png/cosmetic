import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { products, getBestSellers } from '@/lib/data/products';
import { RoutineBuilder } from '@/components/home/RoutineBuilder';
import { ProductCard } from '@/components/shop/ProductCard';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  
  const bestSellers = getBestSellers();
  
  return (
    <>
      {/* Hero Section - Botanical Glow Style */}
      <section className="botanical-hero">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px] py-16">
            {/* Left: Content */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-gray-100 border border-gray-300">
                <span className="text-sm font-medium tracking-wide text-black">
                  {locale === 'ar' ? '✨ مستحضرات طبيعية فاخرة' : '✨ Natural Luxury Skincare'}
                </span>
              </div>
              
              <h1 className="font-heading text-black" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1' }}>
                {locale === 'ar' ? 'اكتشفي جمالك الطبيعي' : 'Discover Your Natural Glow'}
              </h1>
              
              <p className="text-lg leading-relaxed text-gray-600" style={{ maxWidth: '500px' }}>
                {locale === 'ar' 
                  ? 'مكونات نباتية نقية، صيغ مدروسة علمياً، ونتائج مذهلة لبشرة متألقة ومشرقة'
                  : 'Pure botanical ingredients, scientifically-crafted formulas, and radiant results for glowing, healthy skin'
                }
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href={`/${locale}/shop`} className="btn btn-primary">
                  {locale === 'ar' ? 'تسوقي الآن' : 'Shop Now'}
                </Link>
                <Link href={`/${locale}/about`} className="btn btn-secondary">
                  {locale === 'ar' ? 'قصتنا' : 'Our Story'}
                </Link>
              </div>
            </div>
            
            {/* Right: Product Showcase with Floating Tags */}
            <div className="relative">
              <div className="relative z-10">
                <div className="max-w-md mx-auto rounded-[32px] overflow-hidden" style={{ boxShadow: 'var(--shadow-lifted)' }}>
                  <ImagePlaceholder
                    src=""
                    alt={locale === 'ar' ? 'منتج مميز' : 'Hero Product'}
                    aspectRatio="1/1"
                    className="w-full"
                    priority
                  />
                </div>
                
                {/* Floating Tags */}
                <div className="absolute -top-4 -right-4 bg-white px-5 py-3 rounded-full shadow-lg animate-float border border-gray-200">
                  <span className="text-sm font-medium text-black">
                    {locale === 'ar' ? '🌟 الأكثر مبيعاً' : '🌟 Best Seller'}
                  </span>
                </div>
                
                <div className="absolute bottom-12 -left-4 bg-white px-5 py-3 rounded-full shadow-lg animate-float-delayed border border-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    {locale === 'ar' ? '✓ للبشرة الحساسة' : '✓ Sensitive Skin'}
                  </span>
                </div>
                
                <div className="absolute top-1/3 -right-8 bg-white px-5 py-3 rounded-full shadow-lg animate-float border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">
                    {locale === 'ar' ? '🆕 جديد' : '🆕 New'}
                  </span>
                </div>
              </div>
              
              {/* Remove organic shapes - not needed for monochrome */}
            </div>
          </div>
        </div>
        
        {/* Clean background - no gradients */}
        <div className="absolute inset-0 -z-10 bg-white"></div>
      </section>

      {/* Quick Routine Builder */}
      <section className="section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-heading text-4xl mb-4" style={{ color: 'var(--text-1)' }}>
              {locale === 'ar' ? 'ابني روتينك المثالي' : 'Build Your Perfect Routine'}
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-2)' }}>
              {locale === 'ar' 
                ? 'اختاري المنتجات المناسبة لاحتياجات بشرتك في ثلاث خطوات بسيطة'
                : 'Choose the right products for your skin in three simple steps'
              }
            </p>
          </div>
          
          <RoutineBuilder locale={locale} products={products} />
        </div>
      </section>

      {/* Featured Products with Enhanced Cards */}
      <section className="section" style={{ backgroundColor: 'var(--bg-2)' }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl mb-4" style={{ color: 'var(--text-1)' }}>
              {locale === 'ar' ? 'الأكثر مبيعاً' : 'Bestsellers'}
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-2)' }}>
              {locale === 'ar' ? 'المنتجات المفضلة لدى عملائنا' : 'Customer favorites that deliver results'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href={`/${locale}/shop`} className="btn btn-primary">
              {locale === 'ar' ? 'عرض جميع المنتجات' : 'View All Products'}
            </Link>
          </div>
        </div>
      </section>

      {/* Offer Banner Split */}
      <section className="section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center rounded-[32px] overflow-hidden" style={{ backgroundColor: 'var(--bg-3)' }}>
            {/* Left: Content */}
            <div className="p-8 md:p-12">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: 'var(--accent-1)', color: 'white' }}>
                {locale === 'ar' ? 'عرض محدود' : 'Limited Offer'}
              </span>
              <h3 className="font-heading text-3xl md:text-4xl mb-4" style={{ color: 'var(--text-1)' }}>
                {locale === 'ar' ? 'خصم 20% على أول طلب' : '20% Off Your First Order'}
              </h3>
              <p className="text-lg mb-6" style={{ color: 'var(--text-2)' }}>
                {locale === 'ar' 
                  ? 'ابدئي رحلتك نحو بشرة أكثر إشراقاً مع عرضنا الحصري للعملاء الجدد'
                  : 'Start your journey to radiant skin with our exclusive new customer offer'
                }
              </p>
              <button className="btn btn-primary">
                {locale === 'ar' ? 'احصلي على الخصم' : 'Claim Discount'}
              </button>
            </div>
            
            {/* Right: Image */}
            <div className="h-full min-h-[300px] md:min-h-[400px]">
              <ImagePlaceholder
                src=""
                alt={locale === 'ar' ? 'عرض خاص' : 'Special Offer'}
                aspectRatio="1/1"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* As Seen In + Reviews */}
      <section className="section" style={{ backgroundColor: 'var(--bg-1)' }}>
        <div className="container mx-auto px-4 sm:px-6">
          {/* As Seen In */}
          <div className="text-center mb-16">  
            <p className="text-sm uppercase tracking-wide mb-8" style={{ color: 'var(--neutral-1)' }}>
              {locale === 'ar' ? 'نالت ثقة' : 'As Seen In'}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
              {['Vogue', 'Elle', 'Glamour', 'Cosmopolitan', 'Allure'].map((brand) => (
                <div key={brand} className="text-2xl font-semibold" style={{ color: 'var(--text-1)' }}>
                  {brand}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="max-w-5xl mx-auto">
            <h3 className="font-heading text-3xl text-center mb-12" style={{ color: 'var(--text-1)' }}>
              {locale === 'ar' ? 'آراء عملائنا' : 'What Our Customers Say'}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name_en: 'Sarah M.', name_ar: 'سارة م.',
                  text_en: 'Absolutely transformed my skin! The serum is incredibly lightweight yet so effective.',
                  text_ar: 'غيّرت بشرتي تماماً! السيروم خفيف جداً لكنه فعال للغاية.',
                  rating: 5
                },
                {
                  name_en: 'Emma L.', name_ar: 'إيما ل.',
                  text_en: 'Finally found products that work for my sensitive skin. No irritation, just results!',
                  text_ar: 'أخيراً وجدت منتجات تناسب بشرتي الحساسة. بدون تهيج، نتائج فقط!',
                  rating: 5
                },
                {
                  name_en: 'Maya K.', name_ar: 'مايا ك.',
                  text_en: 'Love the natural ingredients and luxurious feel. My new go-to skincare brand.',
                  text_ar: 'أحب المكونات الطبيعية والملمس الفاخر. علامتي التجارية المفضلة الآن.',
                  rating: 5
                },
              ].map((review, idx) => (
                <div key={idx} className="review-card p-8 rounded-3xl" style={{ backgroundColor: 'white', boxShadow: 'var(--shadow-soft)' }}>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'var(--accent-1)' }}>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
                    "{locale === 'ar' ? review.text_ar : review.text_en}"
                  </p>
                  <p className="font-medium" style={{ color: 'var(--text-1)' }}>
                    {locale === 'ar' ? review.name_ar : review.name_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
