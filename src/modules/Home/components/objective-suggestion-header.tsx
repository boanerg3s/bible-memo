import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { StyleSheet, Text, View } from "react-native";

export const ObjectiveSuggestionHeader: React.FC = () => {
  const { t } = useLocale("home.components.objective-suggestion-header");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("title")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: AppStyles.fontSize.sm,
    color: AppStyles.color.gray,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
