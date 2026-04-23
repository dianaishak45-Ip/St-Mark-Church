import { motion } from 'motion/react';
import { BookOpen, Calendar, Award, Building2, Users } from 'lucide-react';

export default function HistoryView() {
  const milestones = [
    { year: '1975', title: 'وضع حجر الأساس', desc: 'تم وضع حجر الأساس بيد البابا شنودة الثالث في احتفالية مهيبة حضرها المئات.' },
    { year: '1982', title: 'افتتاح الكنيسة الكبرى', desc: 'اكتمال بناء الدور العلوي وافتتاح الكنيسة رسمياً للصلوات العامة.' },
    { year: '1995', title: 'مركز الخدمات والمبنى الإداري', desc: 'توسعة الكنيسة وإنشاء مركز خدمات يضم عيادة طبية وفصول دراسية.' },
    { year: '2010', title: 'تجديدات الأيقونات والقبة', desc: 'تجديد شامل لنقوش القبة الرئيسية ورسم أيقونات جديدة بواسطة كبار فناني الفن القبطي.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-24 lg:pb-0">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-bold uppercase tracking-wider arabic-sans">
          تراثنا الروحي
        </div>
        <h1 className="arabic-serif text-5xl font-bold text-stone-900">تاريخ الكنيسة</h1>
        <p className="arabic-sans text-stone-500 max-w-2xl mx-auto text-lg">
          رحلة من الإيمان والمحبة تمتد لأكثر من أربعين عاماً في خدمة شعب الله.
        </p>
      </motion.div>

      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="arabic-serif text-3xl font-bold text-amber-700 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            البدايات الأولى
          </h2>
          <div className="space-y-4 arabic-sans text-stone-600 leading-relaxed text-lg">
            <p>
              بدأت فكرة إنشاء الكنيسة في أوائل السبعينات عندما اجتمعت مجموعة من العائلات لطلب مكان للصلاة في المنطقة المتنامية حديثاً. وبمباركة البابا شنودة الثالث، بدأ العمل بجد واجتهاد لجمع التبرعات وتوفير الأرض.
            </p>
            <p>
              كانت الصلوات الأولى تقام في "خيمة" بسيطة قبل البدء في أعمال الحفر، وكانت بمثابة القلب النابض للمنطقة، حيث لم تكن فقط مكاناً للصلاة بل ملتقى اجتماعياً وثقافياً للجميع.
            </p>
          </div>
        </div>
        <div className="aspect-square rounded-3xl overflow-hidden bg-stone-200 rotate-2 hover:rotate-0 transition-transform">
          <img 
            src="https://picsum.photos/seed/old-church/800/800?grayscale" 
            alt="Historical Photo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      <section className="relative">
        <div className="absolute top-0 right-1/2 bottom-0 w-px bg-stone-200 hidden md:block" />
        
        <div className="space-y-12">
          {milestones.map((ms, i) => (
            <motion.div 
              key={ms.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 text-center md:text-right space-y-2">
                <div className="arabic-serif text-3xl font-black text-amber-700">{ms.year}</div>
                <h3 className="arabic-serif text-2xl font-bold">{ms.title}</h3>
                <p className="arabic-sans text-stone-500">{ms.desc}</p>
              </div>
              
              <div className="relative z-10 w-12 h-12 bg-white border-4 border-amber-700 rounded-full flex items-center justify-center shrink-0">
                <div className="w-3 h-3 bg-amber-700 rounded-full" />
              </div>
              
              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-stone-900 rounded-3xl p-12 text-white text-center space-y-8">
        <h2 className="arabic-serif text-3xl font-bold italic">"بيت الله مع الناس"</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'عام خدمة', val: '45+', icon: Calendar },
            { label: 'عائلة كنسية', val: '1200', icon: Users },
            { label: 'قداس أسبوعي', val: '5', icon: Building2 },
            { label: 'شهادة تقدير', val: '12', icon: Award },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <stat.icon className="w-6 h-6 text-amber-400 mx-auto" />
              <div className="text-3xl font-bold font-mono">{stat.val}</div>
              <div className="arabic-sans text-xs text-stone-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
