# Cosmatic Store - Owner Editing Guide

## Quick Reference

| Task              | File Location                          | Language   |
| ----------------- | -------------------------------------- | ---------- |
| Add/Edit Product  | `src/lib/data/products.ts`             | TypeScript |
| Add Category      | `src/lib/data/categories.ts`           | TypeScript |
| Edit Translations | `src/dictionaries/en.json` & `ar.json` | JSON       |
| Change Site Name  | Dictionaries → `site.name`             | JSON       |
| Edit FAQ          | `src/app/[lang]/faq/FAQPageClient.tsx` | TypeScript |

---

## 1. Adding a New Product

Open `src/lib/data/products.ts` and add to the `products` array:

```typescript
{
  id: 'p23',                              // Unique ID
  slug: 'my-new-product',                 // URL-friendly name
  title_en: 'My New Product',             // English title
  title_ar: 'منتجي الجديد',                // Arabic title
  description_en: 'Product description',   // English description
  description_ar: 'وصف المنتج',            // Arabic description
  benefits_en: ['Benefit 1', 'Benefit 2'],
  benefits_ar: ['فائدة 1', 'فائدة 2'],
  howToUse_en: 'Instructions...',
  howToUse_ar: 'التعليمات...',
  ingredients_en: 'Ingredients list',
  ingredients_ar: 'قائمة المكونات',
  images: ['/images/products/my-product.jpg'],
  price: 29,
  compareAtPrice: 35,                     // Optional: original price for sale
  currency: 'USD',
  stock: 50,
  sku: 'SKU-001',
  brand: b('b1'),                         // Reference existing brand ID
  category: c('c1'),                      // Reference existing category ID
  subcategory: s('s1'),                   // Reference existing subcategory ID
  tags: ['tag1', 'tag2'],
  filters: {
    skinType: ['oily', 'dry'],
    concern: ['hydration', 'anti-aging'],
    crueltyFree: true,
    vegan: true
  },
  rating: 4.5,
  reviewCount: 0,
  featured: false,                        // Show in featured section
  bestSeller: false,                      // Show in best sellers
  newArrival: true                        // Show in new arrivals
}
```

---

## 2. Adding a New Category

Open `src/lib/data/categories.ts`:

```typescript
// Add to categories array:
{
  id: 'c7',
  name_en: 'New Category',
  name_ar: 'فئة جديدة',
  slug: 'new-category',
  image: '/images/categories/new-category.jpg'
}

// Add subcategories if needed:
{
  id: 's20',
  name_en: 'Subcategory',
  name_ar: 'تصنيف فرعي',
  slug: 'subcategory',
  categoryId: 'c7'  // Parent category ID
}
```

---

## 3. Adding a New Brand

Open `src/lib/data/categories.ts`:

```typescript
// Add to brands array:
{
  id: 'b6',
  name_en: 'Brand Name',
  name_ar: 'اسم العلامة التجارية',
  slug: 'brand-name'
}
```

---

## 4. Editing Translations

### Site Name & Tagline

Edit `src/dictionaries/en.json` and `src/dictionaries/ar.json`:

```json
{
  "site": {
    "name": "Your Store Name",
    "tagline": "Your Tagline"
  }
}
```

### Navigation Labels

```json
{
  "nav": {
    "home": "Home",
    "shop": "Shop"
    // ... edit any navigation text
  }
}
```

---

## 5. Editing Static Pages

### About Page

Edit `src/app/[lang]/about/page.tsx` → modify the `content` object.

### FAQ Page

Edit `src/app/[lang]/faq/FAQPageClient.tsx` → modify the `faqs` object.

### Contact Page

Edit `src/app/[lang]/contact/page.tsx` → modify the `c` object.

---

## 6. Adding Product Images

1. Add images to `public/images/products/`
2. Reference in product: `images: ['/images/products/filename.jpg']`

---

## 7. Running the Store

```bash
# Development (with live reload)
npm run dev

# Production build
npm run build
npm start
```

---

## 8. File Structure Quick Reference

```
src/
├── app/[lang]/           # All pages (ar/en)
├── components/           # Reusable UI components
├── lib/
│   ├── data/             # Products, categories, brands
│   └── i18n/             # Language configuration
└── dictionaries/         # Translation files (en.json, ar.json)
```

---

## Need Help?

- **Product not showing?** Check that `category` and `brand` IDs match existing ones
- **Arabic text not displaying?** Ensure you're editing the `_ar` field, not `_en`
- **Styling issues?** Check `src/app/globals.css` for design tokens
