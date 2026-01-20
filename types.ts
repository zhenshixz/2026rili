export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  lunarDate: string;
  lunarMonth: string;
  solarTerm?: string;
  holiday?: string; // The name of the holiday e.g. "春节"
  specialType?: 'holiday' | 'work' | null; // 'holiday' = 休, 'work' = 班
  ticketText?: string; // 12306 ticket sale info
}

export interface AlmanacData {
  auspicious: string[]; // Yi (宜)
  inauspicious: string[]; // Ji (忌)
  description: string;
  dailyQuote: string;
}

export interface GeminiError {
  message: string;
}