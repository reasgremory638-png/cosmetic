import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { products, getProductsByCategory } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { ProductCard } from '@/components/shop/ProductCard';

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; category?: string[] }>;
  searchParams: Promise<{ sort?: string; concern?: string }>;
}) {
  const { lang, category } = await params;
  const search = await searchParams;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  
  // Get products based on category if provided
  const categorySlug = category?.[0];
  let filteredProducts = categorySlug ? getProductsByCategory(categorySlug) : products;
  const currentCategory = categories.find(c => c.slug === categorySlug);
  
  // Apply sorting
  if (search.sort) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      switch (search.sort) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'newest': return 0;
        default: return 0;
      }
    });
  }
  
  // Filter by concern if provided
  if (search.concern) {
    filteredProducts = filteredProducts.filter(p => 
      p.filters.concern?.includes(search.concern!)
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="text-xs sm:text-sm mb-6 sm:mb-8">
        <ol className="flex items-center gap-2 text-gray-600">
          <li><Link href={`/${locale}`} className="hover:text-black">{dict.nav.home}</Link></li>
          <li>/</li>
          <li><Link href={`/${locale}/shop`} className="hover:text-black">{dict.nav.shop}</Link></li>
          {currentCategory && (
            <>
              <li>/</li>
              <li className="text-black truncate">{locale === 'ar' ? currentCategory.name_ar : currentCategory.name_en}</li>
            </>
          )}
        </ol>
      </nav>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar - Categories */}
        <aside className="lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-24">
            <h2 className="font-semibold uppercase tracking-wide mb-4 text-sm sm:text-base">{dict.filters.category}</h2>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link 
                  href={`/${locale}/shop`}
                  className={`block py-1 text-sm ${!categorySlug ? 'font-medium' : 'text-gray-600 hover:text-black'}`}
                >
                  {locale === 'ar' ? 'جميع المنتجات' : 'All Products'}
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link 
                    href={`/${locale}/shop/${cat.slug}`}
                    className={`block py-1 text-sm ${categorySlug === cat.slug ? 'font-medium' : 'text-gray-600 hover:text-black'}`}
                  >
                    {locale === 'ar' ? cat.name_ar : cat.name_en}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Filters */}
            <div className="hidden lg:block mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold uppercase tracking-wide mb-4 text-sm">{dict.shop.filters}</h3>
              
              {/* Skin Type Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">{dict.filters.skinType}</h4>
                <div className="space-y-1">
                  {['Oily', 'Dry', 'Combination', 'Sensitive'].map((type) => (
                    <label key={type} className="flex items-center gap-2 text-sm text-gray-600">
                      <input type="checkbox" className="w-4 h-4" />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Badges Filter */}
              <div className="mb-6">
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="w-4 h-4" />
                    {dict.filters.crueltyFree}
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="w-4 h-4" />
                    {dict.filters.vegan}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold">
              {currentCategory 
                ? (locale === 'ar' ? currentCategory.name_ar : currentCategory.name_en)
                : dict.shop.title
              }
              <span className="text-gray-600 text-sm sm:text-base font-normal ml-2">
                ({filteredProducts.length} {dict.shop.results})
              </span>
            </h1>
            
            {/* Sort */}
            <select className="w-full sm:w-auto px-3 sm:px-4 py-2 border border-gray-200 bg-white text-xs sm:text-sm">
              <option value="">{dict.shop.sort}</option>
              <option value="newest">{dict.shop.sortOptions.newest}</option>
              <option value="price-asc">{dict.shop.sortOptions.priceLow}</option>
              <option value="price-desc">{dict.shop.sortOptions.priceHigh}</option>
              <option value="popular">{dict.shop.sortOptions.popular}</option>
            </select>
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600">
              {dict.shop.noProducts}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
