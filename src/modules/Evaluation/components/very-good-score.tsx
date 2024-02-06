import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { scale } from "react-native-size-matters";
import { Text, View, StyleSheet } from "react-native";

export const VeryGoodScore = () => {
  const { t } = useLocale("evaluation.components.very-good-score");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("title")}</Text>
      <Text style={styles.description}>{t("description")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: scale(15),
  },
  title: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.gray,
    fontSize: AppStyles.fontSize.xs,
  },
  description: {
    color: AppStyles.color.black,
    fontSize: AppStyles.fontSize.sm,
  },
});
