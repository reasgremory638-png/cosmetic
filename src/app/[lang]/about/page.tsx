import type { Locale } from '@/lib/i18n/config';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  
  const content = {
    en: {
      title: 'About Cosmatic',
      subtitle: 'Premium Beauty Essentials',
      story: 'Founded in 2020, Cosmatic was born from a simple belief: everyone deserves access to high-quality, conscious beauty products. We curate the finest cosmetics from around the world, focusing on brands that share our commitment to quality, sustainability, and ethical practices.',
      mission: 'Our Mission',
      missionText: 'To empower individuals to feel confident and beautiful in their own skin, while making responsible choices for themselves and the planet.',
      values: 'Our Values',
      valuesList: [
        { title: 'Quality First', desc: 'We only stock products that meet our rigorous standards for efficacy and safety.' },
        { title: 'Transparency', desc: 'Full ingredient lists and honest product descriptions—always.' },
        { title: 'Sustainability', desc: 'We prioritize brands with eco-friendly packaging and ethical sourcing.' },
        { title: 'Inclusivity', desc: 'Beauty products for all skin types, tones, and concerns.' },
      ],
    },
    ar: {
      title: 'عن كوزماتك',
      subtitle: 'مستلزمات الجمال الفاخرة',
      story: 'تأسست كوزماتك في عام 2020، انطلاقاً من إيمان بسيط: الجميع يستحق الوصول إلى منتجات تجميل عالية الجودة وواعية. نحن ننتقي أفضل مستحضرات التجميل من جميع أنحاء العالم، مع التركيز على العلامات التجارية التي تشاركنا التزامنا بالجودة والاستدامة والممارسات الأخلاقية.',
      mission: 'مهمتنا',
      missionText: 'تمكين الأفراد من الشعور بالثقة والجمال في بشرتهم، مع اتخاذ خيارات مسؤولة لأنفسهم وللكوكب.',
      values: 'قيمنا',
      valuesList: [
        { title: 'الجودة أولاً', desc: 'نقدم فقط المنتجات التي تلبي معاييرنا الصارمة للفعالية والسلامة.' },
        { title: 'الشفافية', desc: 'قوائم مكونات كاملة وأوصاف منتجات صادقة — دائماً.' },
        { title: 'الاستدامة', desc: 'نعطي الأولوية للعلامات التجارية ذات التغليف الصديق للبيئة والمصادر الأخلاقية.' },
        { title: 'الشمولية', desc: 'منتجات تجميل لجميع أنواع البشرة وألوانها واحتياجاتها.' },
      ],
    },
  };
  
  const c = content[locale];
  
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-semibold mb-4">{c.title}</h1>
        <p className="text-xl text-gray-600">{c.subtitle}</p>
      </div>
      
      {/* Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="aspect-4/3 bg-gray-50">
          <div className="w-full h-full flex items-center justify-center text-gray-400">Story Image</div>
        </div>
        <div>
          <p className="text-lg text-gray-600 leading-relaxed">{c.story}</p>
        </div>
      </div>
      
      {/* Mission */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-2xl font-semibold mb-4">{c.mission}</h2>
        <p className="text-lg text-gray-600">{c.missionText}</p>
      </div>
      
      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-center mb-12">{c.values}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.valuesList.map((value, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center text-2xl">
                {['✨', '👁️', '🌱', '❤️'][i]}
              </div>
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
