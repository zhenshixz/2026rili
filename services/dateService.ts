import { CalendarDay } from '../types';
import { SPECIAL_DAYS_2026, TICKET_SALES_2026, SOLAR_TERMS_2026 } from '../constants';

// Helper to format date key for lookups
const formatDateKey = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// Use Native Intl API for Lunar Calendar
const lunarFormatter = new Intl.DateTimeFormat('zh-CN', {
  calendar: 'chinese',
  day: 'numeric',
  month: 'numeric'
});

const chineseNumerals = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
const lunarMonthNames = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];

// Helper to convert numeric day to Chinese lunar day text
const getLunarDayText = (day: number): string => {
  if (day === 10) return '初十';
  if (day === 20) return '二十';
  if (day === 30) return '三十';
  
  const digit = (day % 10);
  if (day < 11) return '初' + chineseNumerals[day - 1];
  if (day < 20) return '十' + chineseNumerals[digit - 1];
  if (day < 30) return '廿' + chineseNumerals[digit - 1];
  
  return '卅' + chineseNumerals[digit - 1]; 
};

const getLunarMonthText = (month: number): string => {
    return lunarMonthNames[month - 1] || `${month}月`;
}

const getLunarDetails = (date: Date) => {
  const parts = lunarFormatter.formatToParts(date);
  const lunarMonthPart = parts.find(p => p.type === 'month');
  const lunarDayPart = parts.find(p => p.type === 'day');
  
  let month = parseInt(lunarMonthPart?.value || '1', 10);
  let day = parseInt(lunarDayPart?.value || '1', 10);
  
  const monthStr = isNaN(month) ? (lunarMonthPart?.value || '') : getLunarMonthText(month);
  const dayStr = isNaN(day) ? (lunarDayPart?.value || '') : getLunarDayText(day);

  let displayStr = dayStr;
  if (day === 1 && !isNaN(month)) {
      displayStr = monthStr;
  }

  return {
    month: monthStr,
    day: dayStr,
    display: displayStr
  };
};

export const getCalendarDays = (year: number, month: number): CalendarDay[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay(); 
  
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDayOfWeek);

  const days: CalendarDay[] = [];
  const todayKey = formatDateKey(new Date());

  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dateKey = formatDateKey(currentDate);
    const lunar = getLunarDetails(currentDate);
    const isCurrentMonth = currentDate.getMonth() === month;
    
    // Look up special day info
    const specialInfo = SPECIAL_DAYS_2026[dateKey];
    const ticketInfo = TICKET_SALES_2026[dateKey];

    days.push({
      date: currentDate,
      isCurrentMonth,
      isToday: dateKey === todayKey,
      lunarDate: lunar.display,
      lunarMonth: lunar.month,
      solarTerm: SOLAR_TERMS_2026[dateKey],
      holiday: specialInfo ? specialInfo.name : undefined,
      specialType: specialInfo ? specialInfo.type : undefined,
      ticketText: ticketInfo
    });
  }

  return days;
};

export const getMonthName = (year: number, month: number): string => {
  return new Date(year, month).toLocaleString('zh-CN', { month: 'long', year: 'numeric' });
};