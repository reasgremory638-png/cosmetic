'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';

interface FAQPageClientProps {
  locale: Locale;
}

export function FAQPageClient({ locale }: FAQPageClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = {
    en: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted.' },
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available for an additional fee. Free shipping on orders over $50.' },
      { q: 'What is your return policy?', a: 'We offer free returns within 30 days of purchase. Items must be unused and in original packaging. Contact our support team to initiate a return.' },
      { q: 'Are your products cruelty-free?', a: 'Yes! We are committed to cruelty-free beauty. All products we stock are not tested on animals, and many are vegan-friendly.' },
      { q: 'Do you ship internationally?', a: 'Currently, we ship to the United States, Canada, UK, and select Middle Eastern countries. We\'re expanding to more regions soon!' },
      { q: 'How can I track my order?', a: 'Once your order ships, you\'ll receive an email with a tracking number. You can also check order status in your account dashboard.' },
    ],
    ar: [
      { q: 'ما هي طرق الدفع المتاحة؟', a: 'نقبل جميع بطاقات الائتمان الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس)، باي بال، وأبل باي. جميع المعاملات آمنة ومشفرة.' },
      { q: 'كم يستغرق الشحن؟', a: 'الشحن العادي يستغرق 3-5 أيام عمل. الشحن السريع (1-2 يوم عمل) متاح مقابل رسوم إضافية. شحن مجاني للطلبات فوق 50 دولار.' },
      { q: 'ما هي سياسة الإرجاع؟', a: 'نقدم إرجاع مجاني خلال 30 يوماً من الشراء. يجب أن تكون المنتجات غير مستخدمة وفي عبوتها الأصلية. تواصل مع فريق الدعم لبدء عملية الإرجاع.' },
      { q: 'هل منتجاتكم خالية من التجارب على الحيوانات؟', a: 'نعم! نحن ملتزمون بالجمال الخالي من القسوة. جميع المنتجات التي نقدمها لم يتم اختبارها على الحيوانات، والعديد منها مناسب للنباتيين.' },
      { q: 'هل تشحنون دولياً؟', a: 'حالياً، نشحن إلى الولايات المتحدة، كندا، المملكة المتحدة، ودول مختارة في الشرق الأوسط. نتوسع قريباً لمناطق أكثر!' },
      { q: 'كيف يمكنني تتبع طلبي؟', a: 'بمجرد شحن طلبك، ستتلقى بريداً إلكترونياً برقم التتبع. يمكنك أيضاً التحقق من حالة الطلب في لوحة حسابك.' },
    ],
  };
  
  const content = faqs[locale];
  
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-semibold mb-4">
          {locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-lg text-gray-600">
          {locale === 'ar' ? 'إجابات على أكثر الأسئلة شيوعاً' : 'Answers to our most common questions'}
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {content.map((faq, i) => (
          <div key={i} className="border-b border-gray-200">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full py-6 flex items-center justify-between text-left"
            >
              <span className="font-medium pr-8">{faq.q}</span>
              <svg
                className={`w-5 h-5 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="pb-6 text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
