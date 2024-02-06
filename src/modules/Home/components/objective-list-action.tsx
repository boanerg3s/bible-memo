import { AppStyles } from "@/styles";
import { router } from "expo-router";
import { useLocale } from "@/hooks/locale";
import { scale } from "react-native-size-matters";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ObjectiveListAction: React.FC = () => {
  const { t } = useLocale("home.components.objective-list-action");
  const onPress = () => router.push("/add-objective");

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{t("action")}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: scale(16),
    aspectRatio: 1 / 0.5,
    alignItems: "center",
    borderStyle: "dashed",
    justifyContent: "center",
    borderColor: AppStyles.color.primary,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.primary,
    fontSize: AppStyles.fontSize.sm,
  },
});
