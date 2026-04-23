import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { GraduationCap, Users, Clock, Heart, CheckCircle2, MessageSquare, ChevronRight, X } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError } from '../lib/firebase';

export default function SundaySchoolView() {
  const [showRegForm, setShowRegForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const data = {
      childName: formData.get('childName'),
      class: formData.get('class'),
      birthDay: formData.get('birthDay'),
      parentName: formData.get('parentName'),
      phone: formData.get('phone'),
      status: 'pending',
      createdAt: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'registrations'), data);
      setIsSubmitted(true);
    } catch (err) {
      handleFirestoreError(err, 'create', 'registrations');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-24 lg:pb-0">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold arabic-sans uppercase tracking-widest">
          <GraduationCap className="w-3 h-3" />
          بناء الأجيال
        </div>
        <h1 className="arabic-serif text-4xl lg:text-5xl font-bold text-stone-900">مدارس الأحد</h1>
        <p className="arabic-sans text-stone-500 max-w-xl mx-auto text-lg leading-relaxed">
          "رَبِّ الوَلَدَ فِي طَرِيقِهِ، فَمَتَى شَاخَ أَيْضًا لاَ يَحِيدُ عَنْهُ." - أمثال ٢٢:٦
        </p>
      </div>

      {/* Stats/Info Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: Users, title: 'الفصول', desc: 'فصول مخصصة لكل مرحلة عمرية لضمان وصول الرسالة بوضوح.' },
          { icon: Clock, title: 'المواعيد', desc: 'نلتقي كل جمعة من الساعة ١٠ صباحاً وحتى ١٢ ظهراً.' },
          { icon: Heart, title: 'الرسالة', desc: 'غرس قيم المحبة والإيمان في قلوب أطفالنا منذ الصغر.' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-3xl border border-stone-100 shadow-sm text-center space-y-4"
          >
            <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
              <item.icon className="w-7 h-7" />
            </div>
            <h3 className="arabic-serif text-2xl font-bold text-stone-800">{item.title}</h3>
            <p className="arabic-sans text-stone-500 leading-relaxed text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>


      {/* Registration CTA / Information for Parents */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-4">
            <h2 className="arabic-serif text-3xl lg:text-4xl font-bold text-stone-900">معلومات لأولياء الأمور</h2>
            <p className="arabic-sans text-stone-600 leading-relaxed">
              نهتم بسلامة ونمو أطفالكم روحياً واجتماعياً. يرجى التواصل مع الخدام المسؤولين في حال وجود أي احتياجات خاصة أو طبية لأطفالكم.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'الالتزام بالمواعيد يساعد الطفل على الاندماج في أنشطة الكنيسة.',
              'نشجع الأطفال على المشاركة في الألحان الكنسية والكورال.',
              'توجد رحلات ترفيهية وتعليمية شهرية مخصصة لكل مرحلة.',
            ].map((text, i) => (
              <div key={i} className="flex gap-4 items-start bg-stone-50 p-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                <p className="arabic-sans text-stone-700 text-sm">{text}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setShowRegForm(true)}
              className="px-8 py-5 bg-amber-700 text-white rounded-2xl font-bold arabic-sans text-xl shadow-xl shadow-amber-900/20 hover:bg-amber-800 transition-all flex items-center justify-center gap-3"
            >
              <span>التسجيل الإلكتروني</span>
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div className="p-4 bg-stone-50 border border-stone-100 rounded-2xl flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-700" />
              <div>
                <div className="text-[10px] text-stone-400 arabic-sans">للاستفسار الهاتفي</div>
                <div className="text-sm font-bold text-stone-800 arabic-sans">0224316533</div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://picsum.photos/seed/kids-church/800/800" 
              alt="Kids Ministry" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/20" />
            <div className="absolute bottom-10 right-10 left-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white text-right">
              <MessageSquare className="w-8 h-8 mb-4 text-amber-400" />
              <p className="arabic-serif text-xl font-bold italic">"دعوا الأولاد يأتون إليَّ"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={() => setShowRegForm(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden p-8 lg:p-12"
            >
              <button 
                onClick={() => setShowRegForm(false)}
                className="absolute top-8 left-8 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {!isSubmitted ? (
                <div className="space-y-8" dir="rtl">
                  <div className="text-center space-y-2">
                    <h2 className="arabic-serif text-3xl font-bold text-stone-900">تسجيل الطفل بالكنيسة</h2>
                    <p className="arabic-sans text-stone-500">يرجى ملء البيانات لسهولة التواصل مع ولي الأمر</p>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <input 
                        name="childName"
                        required
                        placeholder="اسم الطفل الثلاثي"
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl arabic-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-right"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <select 
                          name="class" 
                          required
                          className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl arabic-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-right"
                        >
                          <option value="">المرحلة العمرية</option>
                          <option value="حضانة">حضانة</option>
                          <option value="ابتدائي">ابتدائي</option>
                          <option value="إعدادي">إعدادي</option>
                        </select>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-stone-400 arabic-sans pr-2 text-right block">تاريخ الميلاد</label>
                          <input 
                            name="birthDay"
                            type="date"
                            required
                            className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl arabic-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-right"
                          />
                        </div>
                      </div>
                      <input 
                        name="parentName"
                        required
                        placeholder="اسم ولي الأمر"
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl arabic-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-right"
                      />
                      <input 
                        name="phone"
                        required
                        type="tel"
                        placeholder="رقم الهاتف للتواصل"
                        className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl arabic-sans focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-right"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold arabic-sans text-xl shadow-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'جاري الإرسال...' : 'إرسال البيانات'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center space-y-6 py-8" dir="rtl">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="arabic-serif text-3xl font-bold text-stone-900">تم الاستلام بنجاح!</h3>
                  <p className="arabic-sans text-stone-500 leading-relaxed text-lg">
                    شكراً لاهتمامكم.. سيقوم الخادم المسؤول عن المرحلة المختارة بالتواصل معكم قريباً لتأكيد تفاصيل الحضور والأنشطة.
                  </p>
                  <button 
                    onClick={() => { setShowRegForm(false); setIsSubmitted(false); }}
                    className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold arabic-sans hover:bg-amber-700 transition-colors"
                  >
                    إغلاق لمواصلة التصفح
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
