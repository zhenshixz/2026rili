import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import AlmanacModal from './components/AlmanacModal';
import { getCalendarDays } from './services/dateService';
import { CalendarDay } from './types';

const App: React.FC = () => {
  // Initialize with Jan 2026 as per user request context, or current date if 2026 is passed
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    // Default to Jan 2026 if current year < 2026 for demo purposes
    if (now.getFullYear() < 2026) {
      return new Date(2026, 0, 1);
    }
    return now;
  });

  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  // Derived state for the grid
  const days = useMemo(() => {
    return getCalendarDays(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="min-h-screen bg-[#f5f2eb] text-stone-900 pb-16 font-sans selection:bg-red-200 selection:text-red-900">
      <Header 
        currentDate={currentDate} 
        onPrevMonth={handlePrevMonth} 
        onNextMonth={handleNextMonth} 
        onToday={handleToday}
      />
      
      <main className="max-w-7xl mx-auto px-4 mt-10 md:mt-12">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-end gap-5">
           <div>
             <h2 className="text-3xl md:text-4xl font-black font-serif-sc text-red-900 flex items-center gap-3 drop-shadow-sm">
               <span className="w-2 h-8 bg-red-600 rounded-full inline-block shadow-sm"></span>
               {currentDate.toLocaleString('zh-CN', { month: 'long' })}
             </h2>
             <p className="text-stone-600 text-base md:text-lg mt-2 font-serif-sc pl-5 font-medium">
               点击日期查看 AI 推演黄历详情
             </p>
           </div>
        </div>

        <CalendarGrid days={days} onDayClick={setSelectedDay} />
        
        <div className="mt-12 text-center text-stone-400 font-serif-sc space-y-2">
            <p className="text-stone-400/70 tracking-[0.3em] text-sm uppercase font-bold">Prosperity & Fortune</p>
            <p className="text-base">© 2026 中国 AI 日历 • Gemini 智能驱动</p>
        </div>
      </main>

      {/* Modal */}
      {selectedDay && (
        <AlmanacModal 
          day={selectedDay} 
          onClose={() => setSelectedDay(null)} 
        />
      )}
    </div>
  );
};

export default App;