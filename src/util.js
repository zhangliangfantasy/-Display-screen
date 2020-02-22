import CONFIG from '@/config'

/**
 * px转vh
 * @param {*} num
 */
export function pxToVh(num) {
  return 100 * num / CONFIG.dh + 'vh'
}

/**
 * px转vw
 * @param {*} num
 */
export function pxToVw(num) {
  return 100 * num / CONFIG.dw + 'vw'
}

/**
 * 日期格式化
 * @param date date
 * @param format format
 */
export function dateFormat(date, format) {
  if (!(date instanceof Date)) {
    return '';
  }

  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '')
      .substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ?
        o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;

}

/**
 * 判断是否是闰年
 * @param {*} year
 */
export function isLeapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
};

/**
 * 根据年、月获取该月天数
 * @param {*} year
 * @param {*} month
 */
export function getMonthDays(year, month) {
  let mapMonthDays = {
    1: 31,
    2: isLeapYear(year) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
    length: 12
  };
  return mapMonthDays[month];
}

/**
 * 获取距今半年的天数
 */
export function getHalfDays() {
  let nowDate = new Date();
  let totalDays = 0
  let currentMonth = nowDate.getMonth() + 1;//当前月
  let i = 0;
  while (i < 6) {
    i++;
    if (currentMonth - i > 0) {
      totalDays += getMonthDays(nowDate.getFullYear(), currentMonth - i);
    } else {
      totalDays += getMonthDays(nowDate.getFullYear(), 12 + currentMonth - i);
    }
  }
  return totalDays;
}
