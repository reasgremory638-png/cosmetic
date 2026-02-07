import type { Brand, Category, Subcategory } from '../types';

export const brands: Brand[] = [
  { id: 'b1', name_en: 'Glow Essentials', name_ar: 'جلو إسنشيالز', slug: 'glow-essentials' },
  { id: 'b2', name_en: 'Pure Beauty', name_ar: 'بيور بيوتي', slug: 'pure-beauty' },
  { id: 'b3', name_en: 'Luxe Cosmetics', name_ar: 'لوكس كوزماتكس', slug: 'luxe-cosmetics' },
  { id: 'b4', name_en: 'Natural Radiance', name_ar: 'ناتشورال ريديانس', slug: 'natural-radiance' },
  { id: 'b5', name_en: 'Velvet Touch', name_ar: 'فلفت تاتش', slug: 'velvet-touch' },
];

export const categories: Category[] = [
  { id: 'c1', name_en: 'Skincare', name_ar: 'العناية بالبشرة', slug: 'skincare', image: '/images/categories/skincare.jpg' },
  { id: 'c2', name_en: 'Makeup', name_ar: 'المكياج', slug: 'makeup', image: '/images/categories/makeup.jpg' },
  { id: 'c3', name_en: 'Haircare', name_ar: 'العناية بالشعر', slug: 'haircare', image: '/images/categories/haircare.jpg' },
  { id: 'c4', name_en: 'Fragrance', name_ar: 'العطور', slug: 'fragrance', image: '/images/categories/fragrance.jpg' },
  { id: 'c5', name_en: 'Bodycare', name_ar: 'العناية بالجسم', slug: 'bodycare', image: '/images/categories/bodycare.jpg' },
  { id: 'c6', name_en: 'Tools & Accessories', name_ar: 'الأدوات والإكسسوارات', slug: 'tools', image: '/images/categories/tools.jpg' },
];

export const subcategories: Subcategory[] = [
  // Skincare
  { id: 's1', name_en: 'Cleansers', name_ar: 'الغسولات', slug: 'cleansers', categoryId: 'c1' },
  { id: 's2', name_en: 'Toners', name_ar: 'التونر', slug: 'toners', categoryId: 'c1' },
  { id: 's3', name_en: 'Serums', name_ar: 'السيروم', slug: 'serums', categoryId: 'c1' },
  { id: 's4', name_en: 'Moisturizers', name_ar: 'المرطبات', slug: 'moisturizers', categoryId: 'c1' },
  { id: 's5', name_en: 'Sunscreen', name_ar: 'واقي الشمس', slug: 'sunscreen', categoryId: 'c1' },
  { id: 's6', name_en: 'Masks', name_ar: 'الماسكات', slug: 'masks', categoryId: 'c1' },
  // Makeup
  { id: 's7', name_en: 'Foundation', name_ar: 'كريم الأساس', slug: 'foundation', categoryId: 'c2' },
  { id: 's8', name_en: 'Concealer', name_ar: 'الكونسيلر', slug: 'concealer', categoryId: 'c2' },
  { id: 's9', name_en: 'Blush', name_ar: 'البلاشر', slug: 'blush', categoryId: 'c2' },
  { id: 's10', name_en: 'Lipstick', name_ar: 'أحمر الشفاه', slug: 'lipstick', categoryId: 'c2' },
  { id: 's11', name_en: 'Mascara', name_ar: 'الماسكرا', slug: 'mascara', categoryId: 'c2' },
  { id: 's12', name_en: 'Palettes', name_ar: 'الباليتات', slug: 'palettes', categoryId: 'c2' },
  // Haircare
  { id: 's13', name_en: 'Shampoo', name_ar: 'الشامبو', slug: 'shampoo', categoryId: 'c3' },
  { id: 's14', name_en: 'Conditioner', name_ar: 'البلسم', slug: 'conditioner', categoryId: 'c3' },
  { id: 's15', name_en: 'Hair Oils', name_ar: 'زيوت الشعر', slug: 'hair-oils', categoryId: 'c3' },
  // Fragrance
  { id: 's16', name_en: 'Perfume', name_ar: 'العطور', slug: 'perfume', categoryId: 'c4' },
  { id: 's17', name_en: 'Body Mist', name_ar: 'بودي ميست', slug: 'body-mist', categoryId: 'c4' },
  // Bodycare
  { id: 's18', name_en: 'Body Lotion', name_ar: 'لوشن الجسم', slug: 'body-lotion', categoryId: 'c5' },
  { id: 's19', name_en: 'Scrubs', name_ar: 'المقشرات', slug: 'scrubs', categoryId: 'c5' },
];
