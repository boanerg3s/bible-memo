import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { stopAlarm } from "@/services/notification";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { useNotificationStore } from "@/stores/notification";
import { moderateScale, verticalScale } from "react-native-size-matters";

export const AlarmPopup: React.FC = () => {
  const { isRinging } = useNotificationStore();
  const { t } = useLocale("alarm.components.alarm-popup");

  if (!isRinging) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        loop
        autoPlay
        source={require("@/assets/lottie/excited.json")}
        style={{
          width: moderateScale(150),
          height: moderateScale(150),
          marginLeft: -moderateScale(12),
        }}
      />

      <Text style={styles.title}>{t("title")}</Text>
      <Text style={styles.description}>{t("description")}</Text>

      <Button action={stopAlarm} size="small" rounded grow={false} type="danger">
        {t("action")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    gap: moderateScale(10),
    padding: moderateScale(40),
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  title: { fontSize: AppStyles.fontSize["3xl"], fontWeight: "bold", color: AppStyles.color.black },
  description: {
    fontSize: AppStyles.fontSize.base,
    marginVertical: moderateScale(10),
    lineHeight: verticalScale(24),
    color: AppStyles.color.black,
  },
});
