import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Phone, Heart, UserCheck, Calendar, MessageCircle, X, CheckCircle2, Clock } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError } from '../lib/firebase';

const CLERGY = [
  {
    id: 'p1',
    name: 'القمص أنجيلوس ميخائيل',
    role: 'كاهن الكنيسة',
    image: 'https://picsum.photos/seed/priest1/600/800',
    bio: 'القمص أنجيلوس يخدم الكنيسة منذ عام ١٩٩٠، يتميز بعلاقة روحية عميقة مع الشعب وبخدمة الإرشاد الأسري والاعترافات. له العديد من الكتابات الروحية والمقالات في تاريخ الكنيسة.',
    specialty: 'الإرشاد الأسري والاعترافات',
    phone: '0224316533',
    email: 'fr.angelos@stmark-shubra.org',
    available: 'الأحد، الثلاثاء، الخميس (صباحاً)',
    schedule: {
      '0': ['09:00', '10:00', '11:00'], // Sunday
      '2': ['09:00', '10:00', '11:00'], // Tuesday
      '4': ['09:00', '10:00', '11:00']  // Thursday
    }
  },
  {
    id: 'p2',
    name: 'القس بيشوي كمال',
    role: 'كاهن الشباب',
    image: 'https://picsum.photos/seed/priest2/600/800',
    bio: 'القس بيشوي يكرس مجهوده لخدمة الشباب واجتماعات المغتربين. يسعى دائماً لربط الشباب بالكنيسة من خلال الأنشطة الروحية والترفيهية والندوات الفكرية.',
    specialty: 'خدمة الشباب والمغتربين',
    phone: '01234567891',
    email: 'fr.bishoy@stmark-shubra.org',
    available: 'الأحد، الجمعة، الأربعاء (مساءً)',
    schedule: {
      '0': ['18:00', '19:00', '20:00'], // Sunday
      '3': ['18:00', '19:00', '20:00'], // Wednesday
      '5': ['18:00', '19:00', '20:00']  // Friday
    }
  },
  {
    id: 'p3',
    name: 'القس يوحنا مرقس',
    role: 'كاهن الخدمات الاجتماعية',
    image: 'https://picsum.photos/seed/priest3/600/800',
    bio: 'مهتم بخدمة المجتمع وأخوة الرب، يشرف على مراكز الخدمات الطبية والتعليمية الملحقة بالكنيسة لضمان تقديم أفضل خدمة للجميع.',
    specialty: 'الخدمات الاجتماعية والتنمية',
    phone: '01234567892',
    email: 'fr.youssef@stmark-shubra.org',
    available: 'الإثنين، الأربعاء، السبت',
    schedule: {
      '1': ['10:00', '11:00', '12:00'], // Monday
      '3': ['10:00', '11:00', '12:00'], // Wednesday
      '6': ['10:00', '11:00', '12:00']  // Saturday
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function ClergyView() {
  const [selectedPriest, setSelectedPriest] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const getAvailableSlots = (dateString: string) => {
    if (!dateString || !selectedPriest) return [];
    const date = new Date(dateString);
    const dayOfWeek = date.getDay().toString();
    return selectedPriest.schedule[dayOfWeek] || [];
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTimeSlot) {
      alert('الرجاء اختيار وقت متاح');
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const bookingData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      date: selectedDate,
      time: selectedTimeSlot,
      priestId: selectedPriest.id,
      priestName: selectedPriest.name,
      status: 'pending',
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'bookings'), bookingData);
      setIsSuccess(true);
    } catch (err) {
      handleFirestoreError(err, 'create', 'bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-24 lg:pb-0">
      <div className="text-center space-y-4">
        <h1 className="arabic-serif text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">الآباء الكهنة</h1>
        <p className="arabic-sans text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed">
          "رُعَاةٌ حَسَبَ قَلْبِي، فَيَرْعَوْنَكُمْ بِالْمَعْرِفَةِ وَالْفَهْمِ." - إرميا ٣ : ١٥
        </p>
      </div>

      <div className="grid lg:grid-cols-1 gap-12">
        {CLERGY.map((priest) => (
          <motion.div 
            key={priest.id}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-[3rem] overflow-hidden border border-stone-100 shadow-xl flex flex-col md:flex-row group"
          >
            <motion.div 
              variants={itemVariants}
              className="md:w-1/3 h-[400px] md:h-full relative overflow-hidden"
            >
              <img 
                src={priest.image} 
                alt={priest.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex items-end p-8 md:hidden">
                <div className="text-white">
                  <h2 className="arabic-serif text-2xl font-bold">{priest.name}</h2>
                  <p className="arabic-sans text-amber-400 font-medium">{priest.role}</p>
                </div>
              </div>
            </motion.div>

            <div className="md:w-2/3 p-8 lg:p-12 space-y-8">
              <motion.div variants={itemVariants} className="hidden md:block space-y-2">
                <div className="flex items-center gap-2 text-amber-700 text-sm font-bold arabic-sans tracking-widest uppercase">
                  <Heart className="w-4 h-4 fill-amber-700/10" />
                  رعاية روحية
                </div>
                <h2 className="arabic-serif text-3xl lg:text-4xl font-bold text-stone-900">{priest.name}</h2>
                <p className="arabic-sans text-amber-700 text-lg font-bold">{priest.role}</p>
              </motion.div>

              <div className="space-y-6">
                <motion.div variants={itemVariants} className="arabic-sans text-stone-600 leading-relaxed text-lg text-justify">
                  {priest.bio}
                </motion.div>

                <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl">
                    <UserCheck className="w-6 h-6 text-amber-700" />
                    <div>
                      <div className="text-[10px] text-stone-400 font-bold arabic-sans">التخصص الرعوي</div>
                      <div className="text-sm font-bold text-stone-800 arabic-sans">{priest.specialty}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl">
                    <Calendar className="w-6 h-6 text-amber-700" />
                    <div>
                      <div className="text-[10px] text-stone-400 font-bold arabic-sans">مواعيد التواجد</div>
                      <div className="text-sm font-bold text-stone-800 arabic-sans">{priest.available}</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
                <a 
                  href={`tel:${priest.phone}`}
                  className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl hover:bg-amber-700 transition-colors arabic-sans font-bold text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصال هاتفي</span>
                </a>
                <button 
                  onClick={() => setSelectedPriest(priest)}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-700 text-white shadow-lg shadow-amber-900/20 rounded-xl hover:bg-amber-800 transition-colors arabic-sans font-bold text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>حجز موعد اعتراف</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPriest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setSelectedPriest(null)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden p-8 lg:p-12"
            >
              <button 
                onClick={() => setSelectedPriest(null)}
                className="absolute top-8 left-8 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {!isSuccess ? (
                <div className="space-y-8 text-right" dir="rtl">
                  <div className="text-center space-y-2">
                    <h2 className="arabic-serif text-3xl font-bold">حجز موعد اعتراف</h2>
                    <p className="arabic-sans text-stone-500">مع {selectedPriest.name}</p>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <input 
                        name="name"
                        required
                        placeholder="الاسم بالكامل"
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl arabic-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-right"
                      />
                      <input 
                        name="phone"
                        required
                        placeholder="رقم الهاتف"
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl arabic-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-right"
                      />
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-stone-400 arabic-sans pr-2 text-right block">اختر تاريخاً</label>
                          <input 
                            name="date"
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={selectedDate}
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                              setSelectedTimeSlot('');
                            }}
                            className="w-full px-4 py-3 bg-stone-50 border border-stone-100 rounded-2xl arabic-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-right"
                          />
                        </div>

                        {selectedDate && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            className="space-y-2 overflow-hidden"
                          >
                            <label className="text-[10px] font-bold text-stone-400 arabic-sans pr-2 text-right block">الأوقات المتاحة لهذا اليوم</label>
                            {getAvailableSlots(selectedDate).length > 0 ? (
                              <div className="grid grid-cols-3 gap-2">
                                {getAvailableSlots(selectedDate).map((slot: string) => (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedTimeSlot(slot)}
                                    className={`py-3 rounded-xl text-sm font-bold font-mono transition-all border ${
                                      selectedTimeSlot === slot 
                                        ? 'bg-amber-700 text-white border-amber-700 shadow-md' 
                                        : 'bg-white text-stone-600 border-stone-100 hover:border-amber-200'
                                    }`}
                                  >
                                    {slot}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="p-4 bg-stone-50 rounded-2xl text-center text-xs text-stone-400 arabic-sans">
                                لا توجد مواعيد متاحة للأب الكاهن في هذا اليوم من الأسبوع
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting || !selectedTimeSlot}
                      className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold arabic-sans text-xl shadow-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'جاري الإرسال...' : 'تأكيد حجز هذا الوقت'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center space-y-6 py-8" dir="rtl">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="arabic-serif text-3xl font-bold text-stone-900">تم إرسال طلبك بنجاح!</h3>
                  <p className="arabic-sans text-stone-500 leading-relaxed text-lg">
                    نشكرك يا ابن الطاعة.. سيقوم الأب الكاهن بمراجعة طلبك والتواصل معك قريباً لتأكيد الموعد النهائي.
                  </p>
                  
                  <button 
                    onClick={() => { setSelectedPriest(null); setIsSuccess(false); }}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold arabic-sans hover:bg-amber-700 transition-colors shadow-lg"
                  >
                    إغلاق لمواصلة التصفح
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-stone-900 rounded-[3rem] p-12 text-center space-y-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full -mr-32 -mt-32" />
        <h3 className="arabic-serif text-3xl font-bold">لطلب سر الاعتراف أو الإرشاد الروحي</h3>
        <p className="arabic-sans text-stone-400 max-w-xl mx-auto leading-relaxed">
          يمكنكم التواصل مع الآباء في المواعيد الموضحة أعلاه، أو الحضور للكنيسة لمقابلة الأب الكاهن المسؤول. جميع المحادثات والاعترافات سرية تماماً.
        </p>
      </div>
    </div>
  );
}
