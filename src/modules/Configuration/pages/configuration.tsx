import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Divider } from "@/components/divider";
import { moderateScale } from "react-native-size-matters";
import { ResetAppContainer } from "../containers/reset-app";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { LanguageSelectionContainer } from "../containers/language-selection";
import { DarkModeSelectionContainer } from "../containers/dark-mode-selection";
import { NotificationSelectionContainer } from "../containers/notification-selection";

export const ConfigurationPage = () => {
  const { t } = useLocale("configuration.pages.configuration");

  return (
    <ScrollView style={styles.scrollview} contentContainerStyle={styles.contentContainer}>
      <View style={{ gap: moderateScale(10) }}>
        <Text style={styles.title}>{t("title")}</Text>
        <Text style={styles.description}>{t("description")}</Text>
      </View>
      <Divider />
      <LanguageSelectionContainer />
      <Divider />
      <NotificationSelectionContainer />
      <Divider />
      <DarkModeSelectionContainer />
      <Divider />
      <ResetAppContainer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: { padding: moderateScale(20), gap: moderateScale(40) },
  scrollview: { backgroundColor: "white", flex: 1 },
  title: { fontSize: AppStyles.fontSize["2xl"], fontWeight: "bold" },
  description: { color: AppStyles.color.black, fontSize: AppStyles.fontSize.base },
});
