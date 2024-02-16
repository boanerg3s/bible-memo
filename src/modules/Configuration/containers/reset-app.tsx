import React from "react";
import { AppStyles } from "@/styles";
import { router } from "expo-router";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import Entypo from "@expo/vector-icons/Entypo";
import { cleanDatabase } from "@/services/database";
import { cancelAllAlarms } from "@/services/notification";
import { moderateScale } from "react-native-size-matters";
import { Alert, StyleSheet, Text, View } from "react-native";

export const ResetAppContainer = () => {
  const { t } = useLocale("configuration.containers.reset-app");

  const reset = async () => {
    async function resetAction() {
      await cancelAllAlarms();
      await cleanDatabase();
      router.replace("/");
    }

    Alert.alert(t("action.title"), t("action.description"), [
      { text: t("action.cancel"), onPress: () => null, style: "cancel" },
      { text: t("action.confirm"), onPress: resetAction },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t("description")}</Text>
      <Text style={styles.hint}>{t("hint")}</Text>
      <Button
        rounded
        grow={false}
        size="small"
        type="danger"
        action={reset}
        append={<Entypo name="warning" color={AppStyles.color.white} size={18} />}
      >
        {t("action.label")}
      </Button>
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
