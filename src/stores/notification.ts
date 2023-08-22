import { create } from "zustand";
import * as NotificationHelper from "@/helpers/notification";

interface NotificationStore {
  notification: App.Notification;
  fetchNotificationPreference: () => Promise<void>;
  saveNotificationPreference: (language: App.Notification) => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set) => {
  const defaultNotification: App.Notification = { enabled: true, time: "09:00", when: "every_day" };

  const fetchNotificationPreference = async () => {
    const preference = await NotificationHelper.getNotificationPreference();
    set((state) => ({ ...state, language: preference || defaultNotification }));
  };

  const saveNotificationPreference = async (notification: App.Notification) => {
    await NotificationHelper.saveNotificationPreference(notification);
    await fetchNotificationPreference();
  };

  return {
    notification: defaultNotification,
    fetchNotificationPreference,
    saveNotificationPreference,
  };
});
