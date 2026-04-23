import { Church, MapPin, Phone, Mail, ChevronLeft, Facebook, Youtube, Instagram } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const sections = [
    {
      title: 'عن الكنيسة',
      links: [
        { id: 'history', label: 'تاريخ الكنيسة' },
        { id: 'saint', label: 'شفيعنا القديس مارمرقس' },
        { id: 'clergy', label: 'الآباء الكهنة' },
        { id: 'gallery', label: 'معرض الصور' },
      ]
    },
    {
      title: 'الخدمات',
      links: [
        { id: 'events', label: 'مواعيد القداسات والخدمات' },
        { id: 'sunday-school', label: 'مدارس الأحد' },
        { id: 'announcements', label: 'آخر الإعلانات والتنبيهات' },
      ]
    },
    {
      title: 'روابط هامة',
      links: [
        { id: 'readings', label: 'القراءات اليومية والسنكسار' },
        { id: 'location', label: 'موقع الكنيسة (الخريطة)' },
      ]
    }
  ];

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-32 lg:pb-12 mt-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-700/20 rounded-2xl flex items-center justify-center border border-amber-700/30">
                <Church className="w-7 h-7 text-amber-500" />
              </div>
              <span className="arabic-serif font-bold text-2xl text-white">كنيسة مارمرقس بشبرا</span>
            </div>
            <p className="arabic-sans text-sm leading-relaxed opacity-70">
              بيت الله المفتوح للجميع.. منارة روحية في قلب شبرا العريق، تخدم النفوس بروح المحبة والتواضع وتقدم الأسرار المقدسة والتعليم المستقيم.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links sections */}
          {sections.map((section, i) => (
            <div key={i} className="space-y-6">
              <h4 className="arabic-serif font-bold text-white text-lg border-r-4 border-amber-700 pr-3">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <button 
                      onClick={() => {
                        onTabChange(link.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="arabic-sans text-sm hover:text-amber-500 transition-colors flex items-center gap-2 group"
                    >
                      <ChevronLeft className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/10 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-500">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="arabic-sans">
              <div className="text-[10px] uppercase opacity-50 font-bold">العنوان</div>
              <div className="text-sm">١٣ شارع الشيخ أحمد رافع، القاهرة</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-500">
              <Phone className="w-5 h-5" />
            </div>
            <div className="arabic-sans">
              <div className="text-[10px] uppercase opacity-50 font-bold">الهاتف</div>
              <div className="text-sm">0224316533</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-amber-500">
              <Mail className="w-5 h-5" />
            </div>
            <div className="arabic-sans">
              <div className="text-[10px] uppercase opacity-50 font-bold">البريد الإلكتروني</div>
              <div className="text-sm">info@stmarkshoubra.com</div>
            </div>
          </div>
        </div>

        <div className="text-center arabic-sans text-xs opacity-40">
           جميع الحقوق محفوظة © ٢٠٢٦ كنيسة القديس مارمرقس الرسول بشبرا
        </div>
      </div>
    </footer>
  );
}
