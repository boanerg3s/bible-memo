import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Switch } from "@/components/switch";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const DarkModeSelectionContainer = () => {
  const { t } = useLocale("configuration.containers.dark-mode-selection");

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t("description")}</Text>
      <Switch disabled />
      <Text style={styles.hint}>{t("hint")}</Text>
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
  hint: {
    color: AppStyles.color.black,
    fontSize: AppStyles.fontSize.sm,
  },
});
