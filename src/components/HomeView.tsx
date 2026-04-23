import { motion, useScroll, useTransform } from 'motion/react';
import { Church, MapPin, Phone, Heart, BookOpen, ChevronLeft } from 'lucide-react';

interface HomeViewProps {
  onTabChange?: (tab: string) => void;
}

export default function HomeView({ onTabChange }: HomeViewProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="space-y-12 pb-24 lg:pb-0">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[65vh] rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <motion.img 
          style={{ y }}
          src="/src/assets/images/church_hero_bg_1776723421438.png" 
          alt="كنيسة مارمرقس بشبرا" 
          className="absolute inset-0 w-full h-[120%] object-cover scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Enhanced Multi-layer Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-stone-900/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950/80" />
        
        <div className="absolute inset-0 flex items-end p-8 lg:p-20">
          <div className="space-y-6 max-w-3xl text-right">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="arabic-serif text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
                مرحباً بكم في كنيسة القديس مارمرقس الرسولي بشبرا
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="arabic-sans text-stone-200 text-xl lg:text-2xl leading-relaxed max-w-xl ml-auto"
            >
              بيت الله المفتوح للجميع.. حيث تلتقي الأصالة بالروحانية في قلب حي شبرا العريق.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Daily Reading Mini-Widget */}
      <section className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group">
        <div className="w-20 h-20 bg-amber-50 text-amber-700 rounded-3xl flex items-center justify-center shrink-0">
          <BookOpen className="w-10 h-10" />
        </div>
        <div className="flex-1 space-y-2 text-center md:text-right">
          <h2 className="arabic-serif text-2xl font-bold text-stone-800">قراءات اليوم الروحية</h2>
          <p className="arabic-sans text-stone-500 italic leading-relaxed">
            "كُلُّ شَيْءٍ مُسْتَطَاعٌ لِلْمُؤْمِنِ." - (مرقس ٩ : ٢٣)
          </p>
        </div>
        <button 
          onClick={() => onTabChange?.('readings')}
          className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold arabic-sans flex items-center gap-2 hover:bg-amber-700 transition-colors"
        >
          <span>عرض القراءات والسنكسار</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </section>


      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Heart, title: 'المحبة', desc: 'نخدم الجميع بروح الحب والتواضع' },
          { icon: Church, title: 'العبادة', desc: 'صلوات وطقوس كنسية يومية' },
          { icon: Phone, title: 'الخدمة', desc: 'متواجدون دائماً للاستماع والإرشاد' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow text-center space-y-4"
          >
            <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="arabic-serif text-2xl font-bold text-stone-800">{item.title}</h3>
            <p className="arabic-sans text-stone-500">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="bg-amber-700 rounded-3xl p-8 lg:p-16 text-white overflow-hidden relative">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="arabic-serif text-3xl lg:text-5xl font-bold">رسالتنا الكنسية</h2>
            <p className="arabic-sans text-lg opacity-90 leading-relaxed text-justify">
              تأسست كنيستنا لتكون منارة روحية تقدم تعاليم الإنجيل والتقاليد الكنسية للأجيال المتعاقبة. نحن نؤمن بأن الكنيسة هي جماعة المؤمنين التي تسعى للنمو الروحي وخدمة المجتمع المحيط بكل حب وتفانٍ.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">١٣ شارع الشيخ أحمد رافع، شريف، الساحل، القاهرة</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                <Phone className="w-4 h-4" />
                <span className="text-sm">0224316533</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative h-80 rounded-2xl overflow-hidden border-4 border-white/10">
            <img 
              src="https://picsum.photos/seed/altar/800/600" 
              alt="Church Interior" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

