import { getPreference, savePreference } from "@/helpers/preference";

/**
 * Get Notification preference data
 * @returns App Notification preference
 */
export const getNotificationPreference = async (): Promise<App.Notification | null> => {
  const preference = await getPreference("notification");
  return preference?.value ? JSON.parse(preference.value) : null;
};

/**
 * Save Notification preference data
 * @param preference app notification preference
 */
export const saveNotificationPreference = async (preference: App.Notification): Promise<void> => {
  await savePreference("notification", JSON.stringify(preference));
};
