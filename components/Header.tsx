import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentDate, onPrevMonth, onNextMonth, onToday }) => {
  const monthName = currentDate.toLocaleString('zh-CN', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <header className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8 bg-gradient-to-r from-red-800 via-red-700 to-red-800 shadow-xl sticky top-0 z-20 border-b-4 border-amber-400 relative">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }}></div>
      
      <div className="flex items-center space-x-5 mb-6 md:mb-0 relative z-10">
        <div className="bg-amber-100 p-3 rounded-2xl text-red-800 shadow-inner ring-2 ring-red-900/20">
          <Calendar size={36} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-50 font-serif-sc tracking-wide drop-shadow-md flex items-center gap-3">
            {year} <span className="text-amber-300">中国日历</span>
          </h1>
          <div className="flex items-center gap-3 text-red-100 text-lg font-serif-sc mt-2">
            <span className="bg-red-900/60 px-3 py-0.5 rounded-lg text-amber-200 border border-red-500/50 shadow-sm">丙午马年</span>
            <Sparkles size={16} className="text-amber-400" />
            <span className="tracking-widest opacity-90">万事胜意</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 relative z-10">
        <div className="flex items-center space-x-2 bg-red-900/40 rounded-full p-2 border-2 border-red-500/30 backdrop-blur-md shadow-inner">
          <button 
            onClick={onPrevMonth}
            className="p-3 hover:bg-red-700 rounded-full transition-all text-red-100 hover:text-white active:scale-95 hover:shadow-lg"
            aria-label="上一月"
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
          <span className="w-40 text-center font-bold text-amber-50 select-none font-serif-sc text-3xl drop-shadow-md">
            {monthName}
          </span>
          <button 
            onClick={onNextMonth}
            className="p-3 hover:bg-red-700 rounded-full transition-all text-red-100 hover:text-white active:scale-95 hover:shadow-lg"
            aria-label="下一月"
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        </div>

        <button 
          onClick={onToday}
          className="px-6 py-3 bg-gradient-to-b from-amber-300 to-amber-500 text-red-900 font-bold rounded-full hover:from-amber-200 hover:to-amber-400 transition-all shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] font-serif-sc text-lg border border-amber-200"
        >
          回到今天
        </button>
      </div>
    </header>
  );
};

export default Header;