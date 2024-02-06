import React from "react";
import { AppStyles } from "@/styles";
import { Card } from "@/components/card";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { useNotificationStore } from "@/stores/notification";
import { makeArrayUnique, removeFromArray } from "@/helpers/array";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { AddNewTimeDrawer, AddNewTimerDrawerRef } from "../components/add-new-time";
import BottomDrawer from "react-native-animated-bottom-drawer";

export const TimeSelectionContainer = () => {
  const { t } = useLocale("notification.containers.time-selection");
  const { notification, saveNotificationPreference } = useNotificationStore();

  const bottomDrawerRef = React.useRef<AddNewTimerDrawerRef>(null);
  const openDrawer = () => bottomDrawerRef.current?.open();

  const sortedTimeList = React.useMemo(() => {
    function convertToMinutes(time: string) {
      const [hour, minute] = time.split(":");
      return parseInt(hour, 10) * 60 + parseInt(minute, 10);
    }

    function sortTime(timeA: string, timeB: string) {
      const aMinutes = convertToMinutes(timeA);
      const bMinutes = convertToMinutes(timeB);
      if (aMinutes < bMinutes) return -1;
      if (aMinutes > bMinutes) return 1;
      return 0;
    }

    return notification.at.sort(sortTime);
  }, [notification]);

  const remove = (timeToRemove: string) => {
    function removeAction() {
      const newAt = removeFromArray(sortedTimeList, timeToRemove);
      const newPreference: App.Notification = { at: newAt, when: notification.when };
      saveNotificationPreference(newPreference);
    }

    Alert.alert(t("remove.title"), t("remove.description"), [
      { text: t("remove.cancel"), onPress: () => null, style: "cancel" },
      { text: t("remove.confirm"), onPress: removeAction },
    ]);
  };

  const add = (time: Date) => {
    const hour = time.getHours().toString().padStart(2, "0");
    const minute = time.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hour}:${minute}`;
    const newAt = makeArrayUnique([...sortedTimeList, formattedTime]);
    const newPreference: App.Notification = { at: newAt, when: notification.when };
    saveNotificationPreference(newPreference);
    bottomDrawerRef?.current?.close();
  };

  const timeRender = (time: string, index: number) => {
    const onPress = () => remove(time);

    return (
      <Card key={`${time}-${index}`}>
        <TouchableOpacity onPress={onPress} style={styles.timeContainer}>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.remove}>{t("remove.action")}</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t("description")}</Text>
      {sortedTimeList.map(timeRender)}

      <TouchableOpacity onPress={openDrawer} style={styles.timeAddContainer}>
        <Text style={styles.timeAddTitle}>{t("add")}</Text>
      </TouchableOpacity>

      <AddNewTimeDrawer ref={bottomDrawerRef} add={add} />
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
  time: { fontSize: AppStyles.fontSize.lg, fontWeight: "bold" },
  remove: { fontSize: AppStyles.fontSize.xs, color: AppStyles.color.red, textTransform: "lowercase" },
  timeContainer: {
    padding: moderateScale(15),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeAddContainer: {
    height: verticalScale(48),
    width: "100%",
    borderWidth: 1,
    borderRadius: scale(12),
    alignItems: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    borderColor: AppStyles.color.primary,
  },
  timeAddTitle: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.primary,
    fontSize: AppStyles.fontSize.sm,
  },
});
