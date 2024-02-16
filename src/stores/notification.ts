import { create } from "zustand";
import * as NotificationHelper from "@/helpers/notification";
import * as NotificationService from "@/services/notification";

interface NotificationStore {
  isRinging: boolean;
  notification: App.Notification;
  fetchIsRinging: () => Promise<void>;
  fetchNotificationPreference: () => Promise<void>;
  saveNotificationPreference: (language: App.Notification) => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set) => {
  const defaultIsRinging = false;
  const defaultNotification: App.Notification = { at: [], when: [] };

  const fetchIsRinging = async () => {
    const result = await NotificationService.isRinging();
    set((state) => ({ ...state, isRinging: result || defaultIsRinging }));
  };

  const fetchNotificationPreference = async () => {
    const preference = await NotificationHelper.getNotificationPreference();
    set((state) => ({ ...state, notification: preference || defaultNotification }));
  };

  const saveNotificationPreference = async (notification: App.Notification) => {
    await NotificationHelper.saveNotificationPreference(notification);
    await fetchNotificationPreference();
    await syncNotificationSchedule(notification);
  };

  const syncNotificationSchedule = async (config: App.Notification) => {
    // cleanup
    await NotificationService.cancelAllAlarms();

    const scheduleRequests = config.at.flatMap((time) => {
      const innerRequests = config.when.map((when) => NotificationService.createAlarm(time, when));
      return innerRequests;
    });

    await Promise.all(scheduleRequests);
  };

  return {
    isRinging: defaultIsRinging,
    notification: defaultNotification,
    fetchNotificationPreference,
    saveNotificationPreference,
    fetchIsRinging,
  };
});
