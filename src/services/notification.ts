import { AppStyles } from "@/styles";
import Constants from "expo-constants";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { getDefaultUserLanguage } from "@/helpers/language";

export async function initializeNotificationService() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldSetBadge: true,
      shouldShowAlert: true,
      shouldPlaySound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    }),
  });
}

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

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      bypassDnd: true,
      lightColor: AppStyles.color.primary,
      vibrationPattern: [0, 250, 250, 250],
      importance: Notifications.AndroidImportance.MAX,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }

  return { allowed: true };
}

function getTitleAndBodyForNotification(language: keyof Bible.VersionList<string>) {
  if (language === "ptbr") {
    return {
      title: "Está na hora de praticar!",
      body: "Continue memorizando os trechos bíblicos que você selecionou.",
    };
  }

  return {
    title: "It's time to practice!",
    body: "Keep memorizing biblical texts chosen by you.",
  };
}

export async function schedulePushNotification(time: string, when: App.NotificationDayConfiguration) {
  const [hours, minutes] = time.split(":");
  const language = getDefaultUserLanguage();

  const daysIds: Record<App.NotificationDayConfiguration, number> = {
    every_sunday: 1,
    every_monday: 2,
    every_tuesday: 3,
    every_wednesday: 4,
    every_thursday: 5,
    every_friday: 6,
    every_saturday: 7,
  };

  return Notifications.scheduleNotificationAsync({
    content: {
      ...getTitleAndBodyForNotification(language),
      color: AppStyles.color.primary,
      vibrate: [0, 250, 250, 250],
      sound: "notify.wav",
    },
    trigger: {
      repeats: true,
      hour: Number(hours),
      weekday: daysIds[when],
      minute: Number(minutes),
    },
  });
}

export async function cancelNotificationSchedule(notificationId: string) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
