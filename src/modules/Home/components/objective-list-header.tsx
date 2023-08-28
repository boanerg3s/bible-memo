import { router } from "expo-router";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { StyleSheet, Text, View } from "react-native";

export const ObjectiveListHeader: React.FC = () => {
  const { t } = useLocale("home.components.objective-list-header");
  const action = () => router.push("/add-objective");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("title")}</Text>

      <Button grow={false} action={action} type="primary" size="small" rounded={true}>
        {t("action")}
      </Button>
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
