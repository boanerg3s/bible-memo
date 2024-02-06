import { create } from "zustand";
import * as NotificationHelper from "@/helpers/notification";
import { cancelAllNotifications, schedulePushNotification } from "@/services/notification";

interface NotificationStore {
  notification: App.Notification;
  fetchNotificationPreference: () => Promise<void>;
  saveNotificationPreference: (language: App.Notification) => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set) => {
  const defaultNotification: App.Notification = { at: [], when: [] };

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
    await cancelAllNotifications();

    const scheduleRequests = config.at.flatMap((time) => {
      const innerRequests = config.when.map((when) => schedulePushNotification(time, when));
      return innerRequests;
    });

    await Promise.all(scheduleRequests);
  };

  return {
    notification: defaultNotification,
    fetchNotificationPreference,
    saveNotificationPreference,
  };
});
