import React from 'react';
import { Ticket } from 'lucide-react';
import { CalendarDay } from '../types';

interface DayCellProps {
  day: CalendarDay;
  onClick: (day: CalendarDay) => void;
}

const DayCell: React.FC<DayCellProps> = ({ day, onClick }) => {
  const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
  
  // Base classes with festive borders and gradients for depth
  // Increased height for larger fonts
  let containerClasses = "relative h-32 md:h-44 p-2 md:p-3 transition-all duration-300 group cursor-pointer hover:z-10";
  let dateClasses = "text-2xl md:text-4xl font-serif-sc font-bold leading-none";
  let contentClasses = "flex flex-col h-full";
  
  // State specific styles
  if (!day.isCurrentMonth) {
    containerClasses += " bg-stone-100 text-stone-300 shadow-inner";
    dateClasses += " text-stone-300";
  } else {
    // "Paper" texture gradient for active month
    containerClasses += " bg-gradient-to-br from-white to-stone-50 text-stone-800 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 border-b border-r border-stone-100"; 
  }

  // Today styling - 3D Red Badge
  if (day.isToday) {
    dateClasses = "w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-gradient-to-br from-red-500 to-red-700 text-amber-50 rounded-2xl shadow-[0_4px_6px_rgba(220,38,38,0.4)] transform group-hover:scale-105 transition-transform font-bold border-t border-red-400";
  } else if (isWeekend && day.isCurrentMonth) {
    dateClasses += " text-red-600";
  }

  // Lunar Text Styling - Much Larger
  let lunarClasses = "text-sm md:text-lg font-serif-sc text-stone-500 font-medium";
  let displayText = day.lunarDate;

  // Holiday Name Display
  if (day.holiday) {
     displayText = day.holiday;
     if (day.isCurrentMonth) {
        // Holiday Badge
        lunarClasses = "text-sm md:text-lg font-bold text-red-700 mt-1 bg-red-100/80 px-2 py-0.5 rounded-md inline-block shadow-sm";
     } else {
        lunarClasses = "text-sm md:text-base font-bold text-red-300 mt-1";
     }
  } else if (!day.isCurrentMonth) {
     lunarClasses = "text-sm md:text-base font-serif-sc text-stone-300";
  }

  return (
    <div className={containerClasses} onClick={() => onClick(day)}>
      <div className={contentClasses}>
        <div className="flex justify-between items-start mb-1">
          <span className={dateClasses}>
            {day.date.getDate()}
          </span>
          <div className="flex flex-col items-end gap-1.5">
            {/* Rest Badge - 3D effect */}
            {day.specialType === 'holiday' && (
               <span className="text-xs md:text-sm w-6 h-6 flex items-center justify-center rounded-lg font-serif-sc bg-gradient-to-br from-red-100 to-red-200 text-red-800 font-bold shadow-sm border border-red-200">
                 休
               </span>
            )}
            
            {day.solarTerm && (
              <span className="text-xs md:text-sm bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-serif-sc hidden md:inline-block shadow-sm">
                {day.solarTerm}
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-1 flex flex-col items-start flex-grow">
          <span className={lunarClasses}>
            {displayText}
          </span>
          
          {/* Mobile Solar Term */}
          {day.solarTerm && (
            <span className="text-xs text-amber-700/80 md:hidden mt-1 font-serif-sc font-medium">
               {day.solarTerm}
            </span>
          )}

          {/* 12306 Ticket Info - Larger, clearer */}
          {day.ticketText && day.isCurrentMonth && (
            <div className="mt-auto flex items-center text-xs md:text-sm text-blue-800 font-bold bg-blue-50 px-2 py-1 rounded-md border border-blue-200 w-full shadow-sm">
              <Ticket size={14} className="mr-1.5 shrink-0 text-blue-600" />
              <span className="truncate">{day.ticketText}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayCell;