import { Church, Calendar, Home, Book, GraduationCap, Megaphone, LayoutGrid } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'readings', label: 'القراءات', icon: Book },
    { id: 'sunday-school', label: 'مدارس الأحد', icon: GraduationCap },
    { id: 'announcements', label: 'الإعلانات', icon: Megaphone },
    { id: 'events', label: 'المواعيد', icon: Calendar },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:top-0 lg:bottom-auto bg-white/80 backdrop-blur-md border-t lg:border-t-0 lg:border-b border-stone-200 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="hidden lg:flex items-center gap-2">
            <Church className="w-8 h-8 text-amber-700" />
            <span className="arabic-serif font-bold text-xl text-stone-800">كنيسة مارمرقس بشبرا</span>
          </div>
          
          <div className="flex flex-1 justify-around lg:justify-end lg:gap-8 max-w-lg lg:max-w-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-2 px-3 py-1 rounded-xl transition-all ${
                    isActive 
                      ? 'text-amber-700 lg:bg-amber-50' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
                  <span className="text-xs lg:text-base font-medium arabic-sans">{tab.label}</span>
                  {isActive && (
                    <div className="lg:hidden w-1 h-1 bg-amber-700 rounded-full mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
