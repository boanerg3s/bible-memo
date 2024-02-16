import Constants from "expo-constants";
import { NativeModules } from "react-native";
import * as Notifications from "expo-notifications";
import { closestWeekday, toYmdHisString } from "@/helpers/date";
const { AlarmModule } = NativeModules;

/**
 * Check if notification is allowed in this device
 * @returns
 */
export async function requestNotificationPermissions() {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return { allowed: false };
    }
  }

  return { allowed: true };
}

/**
 * Create an alarm schedule
 * @param when date Y-m-d H:i:s format
 * @param notification Notification
 * @returns
 */
export const createAlarm = async (time: string, day: App.NotificationDayConfiguration): Promise<void> => {
  const weekdayDate = closestWeekday(day, time);
  const when = toYmdHisString(weekdayDate);

  return new Promise((res, rej) =>
    AlarmModule.createAlarm(
      when,
      "Está na hora de praticar!",
      "Continue memorizando os trechos bíblicos que você selecionou.",
      res,
      rej
    )
  );
};

/**
 * Stop an alarm ringing
 * @returns
 */
export const stopAlarm = async (): Promise<void> => {
  return new Promise((res, rej) => AlarmModule.stopAlarm(res, rej));
};

/**
 * Returns if an alarm is ringing
 * @returns
 */
export const isRinging = async (): Promise<boolean> => {
  return new Promise((res, rej) => AlarmModule.isRinging(res, rej));
};

/**
 * Cancel all alarms scheduled
 * @returns
 */
export const cancelAllAlarms = async (): Promise<void> => {
  return new Promise((res, rej) => AlarmModule.cancelAllAlarms(res, rej));
};

/**
 * Method used in application initialization
 */
export async function initializeNotificationService() {
  await Notifications.requestPermissionsAsync();
}
