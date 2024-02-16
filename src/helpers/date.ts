/**
 * Returns the closest weekday date from now
 * @param weekday
 * @returns
 */
export function closestWeekday(_weekday: App.NotificationDayConfiguration, time: string) {
  const weekday: Record<App.NotificationDayConfiguration, number> = {
    every_sunday: 0,
    every_monday: 1,
    every_tuesday: 2,
    every_wednesday: 3,
    every_thursday: 4,
    every_friday: 5,
    every_saturday: 6,
  };

  const date = new Date();
  const [hours, minutes] = time.split(":");
  const diff = (weekday[_weekday] - date.getDay() + 7) % 7;
  const closestWeekdayDate = new Date(date);
  closestWeekdayDate.setDate(date.getDate() + diff);
  closestWeekdayDate.setHours(Number(hours));
  closestWeekdayDate.setMinutes(Number(minutes));
  closestWeekdayDate.setSeconds(0);

  if (closestWeekdayDate < date) {
    const nextFinalDate = new Date(closestWeekdayDate);
    nextFinalDate.setDate(closestWeekdayDate.getDate() + 7);
    return nextFinalDate;
  }

  return closestWeekdayDate;
}

/**
 * Returns a Y-m-d H:i:s string given a date object
 * @param date Date
 * @returns string
 */
export function toYmdHisString(date: Date) {
  const addZero = (n: number) => n.toString().padStart(2, "0");

  const y = date.getFullYear();
  const m = addZero(date.getMonth() + 1);
  const d = addZero(date.getDate());
  const h = addZero(date.getHours());
  const i = addZero(date.getMinutes());
  const s = addZero(date.getSeconds());
  return `${y}-${m}-${d} ${h}:${i}:${s}`;
}

/**
 * Retrieve the current week number
 * @param date Date
 * @returns number
 */
export function getWeekNumber(date: Date): number {
  const firstDayOfYear: Date = new Date(date.getFullYear(), 0, 1);
  const millisecondsPerDay: number = 86400000; // 24 * 60 * 60 * 1000
  const diff: number = (date.getTime() - firstDayOfYear.getTime()) / millisecondsPerDay;
  return Math.ceil((diff + firstDayOfYear.getDay() + 1) / 7);
}
