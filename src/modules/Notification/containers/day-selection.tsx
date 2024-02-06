import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Switch } from "@/components/switch";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useNotificationStore } from "@/stores/notification";
import { makeArrayUnique, removeFromArray } from "@/helpers/array";

export const DaySelectionContainer = () => {
  const { t } = useLocale("notification.containers.day-selection");
  const { notification, saveNotificationPreference } = useNotificationStore();
  const onChange = (key: App.NotificationDayConfiguration) => (status: boolean) => status ? addDay(key) : rmDay(key);
  const daysConfig = React.useMemo(() => notification.when, [notification]);

  const addDay = (key: App.NotificationDayConfiguration) => {
    const newPreference: App.Notification = {
      at: notification.at,
      when: makeArrayUnique([...daysConfig, key]),
    };

    saveNotificationPreference(newPreference);
  };

  const rmDay = (key: App.NotificationDayConfiguration) => {
    const newPreference: App.Notification = {
      at: notification.at,
      when: removeFromArray(daysConfig, key),
    };

    saveNotificationPreference(newPreference);
  };

  const isSundayActive = React.useMemo(() => daysConfig.includes("every_sunday"), [daysConfig]);
  const isMondayActive = React.useMemo(() => daysConfig.includes("every_monday"), [daysConfig]);
  const isTuesdayActive = React.useMemo(() => daysConfig.includes("every_tuesday"), [daysConfig]);
  const isWednesdayActive = React.useMemo(() => daysConfig.includes("every_wednesday"), [daysConfig]);
  const isThursdayActive = React.useMemo(() => daysConfig.includes("every_thursday"), [daysConfig]);
  const isFridayActive = React.useMemo(() => daysConfig.includes("every_friday"), [daysConfig]);
  const isSaturdayActive = React.useMemo(() => daysConfig.includes("every_saturday"), [daysConfig]);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t("description")}</Text>
      <Switch label={t("sunday")} defaultValue={isSundayActive} onChange={onChange("every_sunday")} />
      <Switch label={t("monday")} defaultValue={isMondayActive} onChange={onChange("every_monday")} />
      <Switch label={t("tuesday")} defaultValue={isTuesdayActive} onChange={onChange("every_tuesday")} />
      <Switch label={t("wednesday")} defaultValue={isWednesdayActive} onChange={onChange("every_wednesday")} />
      <Switch label={t("thursday")} defaultValue={isThursdayActive} onChange={onChange("every_thursday")} />
      <Switch label={t("friday")} defaultValue={isFridayActive} onChange={onChange("every_friday")} />
      <Switch label={t("saturday")} defaultValue={isSaturdayActive} onChange={onChange("every_saturday")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: moderateScale(15) },
  description: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.gray,
    fontSize: AppStyles.fontSize.sm,
  },
});
