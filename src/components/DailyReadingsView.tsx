import { motion } from 'motion/react';
import { Book, FileText, Sun, Calendar as CalendarIcon, Quote } from 'lucide-react';

export default function DailyReadingsView() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('ar-EG', options);

  const readings = [
    { title: 'البولس', ref: 'رسالة بولس الرسول الأولى إلى كورنثوس (١٥ : ١٣ - ٢٨)', text: 'لأنه إن لم يكن الموتى يقومون، فلا يكون المسيح قد قام. وإن لم يكن المسيح قد قام، فباطل إيمانكم. أنتم بعد في خطاياكم...' },
    { title: 'الكاثوليكون', ref: 'رسالة يوحنا الرسول الأولى (٢ : ٧ - ١٧)', text: 'يا أحبائي، لست أكتب إليكم وصية جديدة، بل وصية قديمة كانت عندكم من البدء. الوصية القديمة هي الكلمة التي سمعتموها...' },
    { title: 'الإبركسيس', ref: 'أعمال الرسل (١٨ : ٢٤ - ٢٨)', text: 'ثم أقبل إلى أفسس يهودي اسمه أبلوس، سكندري الجنس، رجل فصيح، مقتدر في الكتب...' },
    { title: 'إنجيل القداس', ref: 'إنجيل لوقا (١١ : ٣٧ - ٥٢)', text: 'وفيما هو يتكلم سأله فريسي أن يتغدى عنده، فدخل واتكأ. وأما الفريسي فلما رأى ذلك تعجب أنه لم يغتسل أولاً قبل الغداء...' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 lg:pb-0">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold arabic-sans uppercase tracking-widest">
          <Sun className="w-3 h-3" />
          غذاء الروح
        </div>
        <h1 className="arabic-serif text-4xl lg:text-5xl font-bold text-stone-900">القراءات اليومية</h1>
        <p className="arabic-sans text-stone-500 text-lg">{formattedDate}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-stone-100 space-y-8">
            <div className="flex items-center gap-3 border-b border-stone-50 pb-6">
              <FileText className="w-8 h-8 text-amber-700" />
              <h2 className="arabic-serif text-3xl font-bold text-stone-800">السنكسار - ١٢ برمودة</h2>
            </div>
            
            <div className="space-y-6 arabic-sans text-stone-600 leading-relaxed text-lg">
              <div className="p-6 bg-stone-50 rounded-3xl border-r-4 border-amber-600">
                <h3 className="font-bold text-stone-900 mb-2">تذكار نياحة القديس أنبا الكسندروس أسقف الإسكندرية</h3>
                <p>
                  في مثل هذا اليوم من سنة ٤٤ للشهداء (٣٢٨م)، تنيح القديس العظيم الأنبا الكسندروس بابا الإسكندرية التاسع عشر. كان هذا القديس عالماً فاضلاً متمسكاً بالإيمان المستقيم...
                </p>
              </div>
              <p>
                كان البابا الكسندروس هو الذي اكتشف نبوغ القديس أثناسيوس الرسولي وضمه لخدمة الكنيسة، وهو الذي ترأس مجمع نيقية المسكوني الأول عام ٣٢٥م لمواجهة بدعة آريوس.
              </p>
              <p>
                عاش حياته مجاهداً في سبيل الحفاظ على العقيدة الأرثوذكسية، وترك لنا كتابات لاهوتية قيمة ومواعظ روحية عميقة ثبتت المؤمنين في إيمانهم.
              </p>
            </div>
          </section>

          <div className="grid md:grid-cols-1 gap-6">
            {readings.map((reading, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-start">
                  <h3 className="arabic-serif text-2xl font-bold text-amber-800">{reading.title}</h3>
                  <span className="text-[10px] font-bold text-stone-400 bg-stone-50 px-2 py-1 rounded">نص مختار</span>
                </div>
                <div className="arabic-sans text-sm font-bold text-stone-400">{reading.ref}</div>
                <p className="arabic-sans text-stone-600 leading-relaxed italic text-lg relative pr-8">
                  <Quote className="absolute right-0 top-0 w-6 h-6 text-stone-100 -z-10" />
                  "{reading.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-amber-700 rounded-[2.5rem] p-8 text-white space-y-6">
            <h3 className="arabic-serif text-2xl font-bold">آية اليوم</h3>
            <div className="p-6 bg-white/10 rounded-2xl border border-white/20 italic text-xl arabic-sans leading-relaxed">
              "كُلُّ شَيْءٍ مُسْتَطَاعٌ لِلْمُؤْمِنِ."
              <div className="text-right text-sm mt-4 font-bold opacity-80">(مرقس ٩ : ٢٣)</div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-100 space-y-6">
            <h3 className="arabic-serif text-2xl font-bold text-stone-800">النتيجة القبطية</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-stone-50 p-4 rounded-2xl">
                <span className="arabic-sans text-stone-500">الشهر القبطي</span>
                <span className="arabic-sans font-bold text-amber-700">١٢ برمودة ١٧٤٠</span>
              </div>
              <div className="flex justify-between items-center bg-stone-50 p-4 rounded-2xl">
                <span className="arabic-sans text-stone-500">المناسبة الأقرب</span>
                <span className="arabic-sans font-bold text-amber-700">سبت لعازر</span>
              </div>
              <div className="flex justify-between items-center bg-stone-50 p-4 rounded-2xl text-stone-400 text-xs text-center border-t border-stone-100 pt-4">
                تتغير القراءات يومياً حسب ترتيب القطمارس الكنسي.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
