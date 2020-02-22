import { getMonthDays, getHalfDays, dateFormat } from "@/util"

export const DAY = 24 * 60 * 60 * 1000;//毫秒

/**
 * 获取时间范围
 * @param {*} type
 */
export function getDateRange(type) {
  let dateRange = {};
  const endDate = new Date();
  let startDate = endDate;
  if (!type) {
    return dateRange;
  }
  switch (type) {
    case 'day':
      startDate = new Date(endDate.getTime() - DAY);
      break;
    case 'week':
      startDate = new Date(endDate.getTime() - 7 * DAY);
      break;
    case 'month':
      startDate = new Date(endDate.getTime() - getMonthDays(endDate.getFullYear(), endDate.getMonth() + 1) * DAY);
      break;
    case 'halfyear':
      startDate = new Date(endDate.getTime() - getHalfDays() * DAY);
      break;
    default:
      break;
  }
  dateRange = {
    startTime: dateFormat(startDate, 'yyyy-MM-dd') + ' 00:00:00',
    endTime: dateFormat(endDate, 'yyyy-MM-dd') + ' 00:00:00'
  }
  return dateRange;
}

const store = {
  debug: true,
  state: {
    sysName: "等候区大屏",
    msgInfo: "",
    personNum: 0,
    modules: []
  }
};

export default store;
