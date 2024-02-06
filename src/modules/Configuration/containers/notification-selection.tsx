import React from "react";
import { AppStyles } from "@/styles";
import { router } from "expo-router";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const NotificationSelectionContainer = () => {
  const { t } = useLocale("configuration.containers.notification-selection");

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t("description")}</Text>
      <Button
        rounded
        size="small"
        grow={false}
        type="secondary"
        action={() => router.push("/notification")}
        append={<Entypo name="bell" color={AppStyles.color.white} size={18} />}
      >
        Editar preferências
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
});
