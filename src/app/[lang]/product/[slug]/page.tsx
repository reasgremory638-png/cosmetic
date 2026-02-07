import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionary';
import { getProductBySlug, products } from '@/lib/data/products';
import { ProductDetailClient } from './ProductDetailClient';

export async function generateStaticParams() {
  return products.flatMap((product) => [
    { lang: 'en', slug: product.slug },
    { lang: 'ar', slug: product.slug },
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) return { title: 'Product Not Found' };
  
  const title = lang === 'ar' ? product.title_ar : product.title_en;
  const description = lang === 'ar' ? product.description_ar : product.description_en;
  
  return {
    title: `${title} | Cosmatic`,
    description,
    openGraph: {
      title,
      description,
      images: product.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const product = getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }
  
  const dict = await getDictionary(locale);
  
  return <ProductDetailClient product={product} locale={locale} dict={dict} />;
}
