// Major Chinese Holidays for 2026 (Gregorian Dates) with Rest/Work status
// Note: Official 2026 schedule is estimated based on standard rules (CNY Feb 17).
// CNY Holiday usually: Eve (Feb 16) to Day 6 (Feb 22). 

interface SpecialDay {
  name: string;
  type: 'holiday' | 'work';
}

export const SPECIAL_DAYS_2026: Record<string, SpecialDay> = {
  // 元旦
  "2026-01-01": { name: "元旦", type: 'holiday' },
  
  // 春节 (Spring Festival) - Holiday: Feb 16 - Feb 22
  // Removed makeup work days as per request
  "2026-02-16": { name: "除夕", type: 'holiday' },
  "2026-02-17": { name: "春节", type: 'holiday' },
  "2026-02-18": { name: "初二", type: 'holiday' },
  "2026-02-19": { name: "初三", type: 'holiday' },
  "2026-02-20": { name: "初四", type: 'holiday' },
  "2026-02-21": { name: "初五", type: 'holiday' },
  "2026-02-22": { name: "初六", type: 'holiday' },

  // 清明 (Qingming) - Apr 5 (Sun). Holiday likely Apr 4-6.
  "2026-04-05": { name: "清明", type: 'holiday' },
  "2026-04-06": { name: "休", type: 'holiday' },

  // 劳动节 (Labor Day) - May 1 (Fri).
  "2026-05-01": { name: "劳动节", type: 'holiday' },

  // 端午 (Dragon Boat) - Jun 19 (Fri). Holiday Jun 19-21.
  "2026-06-19": { name: "端午", type: 'holiday' },

  // 中秋 (Mid-Autumn) - Sep 25 (Fri). Holiday Sep 25-27.
  "2026-09-25": { name: "中秋", type: 'holiday' },

  // 国庆 (National Day) - Oct 1-7.
  "2026-10-01": { name: "国庆", type: 'holiday' },
  "2026-10-02": { name: "休", type: 'holiday' },
  "2026-10-03": { name: "休", type: 'holiday' },
  "2026-10-04": { name: "休", type: 'holiday' },
  "2026-10-05": { name: "休", type: 'holiday' },
  "2026-10-06": { name: "休", type: 'holiday' },
  "2026-10-07": { name: "休", type: 'holiday' },
  // Removed makeup work days for National Day as per request
};

// 12306 Ticket Sales (Pre-sale 15 days usually)
// Calculation: Target Date - 14 days.
export const TICKET_SALES_2026: Record<string, string> = {
  "2026-01-19": "售春运首日", // Assuming Chunyun starts ~Feb 2
  "2026-02-02": "售除夕票",   // Target: Feb 16
  "2026-02-03": "售初一票",   // Target: Feb 17
  "2026-02-07": "售初五票",   // Target: Feb 21 (Return Peak)
  "2026-02-08": "售初六票",   // Target: Feb 22 (Return Peak)
  "2026-02-23": "售元宵票",   // Target: Mar 9
};

export const WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
export const WEEKDAYS_CN = ["日", "一", "二", "三", "四", "五", "六"];

export const SOLAR_TERMS_2026: Record<string, string> = {
  "2026-02-04": "立春",
  "2026-02-19": "雨水",
  "2026-03-05": "惊蛰",
  "2026-03-20": "春分",
  "2026-04-05": "清明",
  "2026-04-20": "谷雨",
  "2026-05-05": "立夏",
  "2026-05-21": "小满",
  "2026-06-05": "芒种",
  "2026-06-21": "夏至",
  "2026-07-07": "小暑",
  "2026-07-23": "大暑",
  "2026-08-07": "立秋",
  "2026-08-23": "处暑",
  "2026-09-07": "白露",
  "2026-09-23": "秋分",
  "2026-10-08": "寒露",
  "2026-10-23": "霜降",
  "2026-11-07": "立冬",
  "2026-11-22": "小雪",
  "2026-12-07": "大雪",
  "2026-12-22": "冬至",
  "2026-01-05": "小寒",
  "2026-01-20": "大寒",
};