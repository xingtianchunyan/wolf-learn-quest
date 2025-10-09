/**
 * 文件级注释：日期工具函数库
 * 提供日期处理相关的工具函数
 */

/**
 * 格式化日期
 * @param date - 日期对象或时间戳
 * @param format - 格式字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: Date | number,
  format: string = 'YYYY-MM-DD'
): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 获取相对时间描述
 * @param date - 日期对象或时间戳
 * @returns 相对时间描述
 */
export function getRelativeTime(date: Date | number): string {
  const now = new Date();
  const target = new Date(date);
  const diff = now.getTime() - target.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return '刚刚';
  } else if (minutes < 60) {
    return `${minutes}分钟前`;
  } else if (hours < 24) {
    return `${hours}小时前`;
  } else if (days < 7) {
    return `${days}天前`;
  } else {
    return formatDate(target, 'YYYY-MM-DD');
  }
}

/**
 * 判断是否为今天
 * @param date - 日期对象或时间戳
 * @returns 是否为今天
 */
export function isToday(date: Date | number): boolean {
  const today = new Date();
  const target = new Date(date);

  return today.toDateString() === target.toDateString();
}

/**
 * 判断是否为昨天
 * @param date - 日期对象或时间戳
 * @returns 是否为昨天
 */
export function isYesterday(date: Date | number): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const target = new Date(date);

  return yesterday.toDateString() === target.toDateString();
}

/**
 * 获取日期范围
 * @param startDate - 开始日期
 * @param endDate - 结束日期
 * @returns 日期数组
 */
export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

/**
 * 获取月份的天数
 * @param year - 年份
 * @param month - 月份（0-11）
 * @returns 天数
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * 获取星期几的中文名称
 * @param date - 日期对象或时间戳
 * @returns 星期几的中文名称
 */
export function getWeekdayName(date: Date | number): string {
  const weekdays = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  const d = new Date(date);
  return weekdays[d.getDay()];
}

/**
 * 计算两个日期之间的天数差
 * @param date1 - 第一个日期
 * @param date2 - 第二个日期
 * @returns 天数差
 */
export function getDaysDifference(
  date1: Date | number,
  date2: Date | number
): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const timeDiff = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * 添加天数到日期
 * @param date - 原始日期
 * @param days - 要添加的天数
 * @returns 新的日期
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 获取月份的开始日期
 * @param date - 日期
 * @returns 月份开始日期
 */
export function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * 获取月份的结束日期
 * @param date - 日期
 * @returns 月份结束日期
 */
export function getMonthEnd(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
