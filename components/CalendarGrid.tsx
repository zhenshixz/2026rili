import React from 'react';
import { WEEKDAYS } from '../constants';
import { CalendarDay } from '../types';
import DayCell from './DayCell';

interface CalendarGridProps {
  days: CalendarDay[];
  onDayClick: (day: CalendarDay) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ days, onDayClick }) => {
  return (
    <div className="relative">
        {/* Decorative Binding Rings (Visual Only) */}
        <div className="absolute -top-4 left-0 right-0 flex justify-evenly z-10 px-10 pointer-events-none">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-4 h-12 bg-stone-300 rounded-full shadow-md border border-stone-400"></div>
            ))}
        </div>

        {/* Main Calendar Block - 3D Effect */}
        <div className="bg-[#fffcf8] shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2),0_4px_6px_-2px_rgba(0,0,0,0.1),0_20px_0_-10px_#e5e5e5] rounded-3xl overflow-hidden border-2 border-red-900/10">
          
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 bg-red-50/90 border-b-2 border-red-100">
            {WEEKDAYS.map((day, i) => (
              <div key={day} className="py-5 text-center">
                <span className={`block text-xl md:text-2xl font-serif-sc font-black ${i === 0 || i === 6 ? 'text-red-700' : 'text-stone-800'}`}>
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 bg-stone-200 gap-px border-b border-stone-200">
            {days.map((day, index) => (
              <DayCell 
                key={index} 
                day={day} 
                onClick={onDayClick}
              />
            ))}
          </div>
        </div>
    </div>
  );
};

export default CalendarGrid;