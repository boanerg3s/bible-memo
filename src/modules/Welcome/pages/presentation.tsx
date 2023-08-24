import { AppStyles } from "@/styles";
import { router } from "expo-router";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { StyleSheet, Text, View } from "react-native";

export const PresentationPage: React.FC = () => {
  const { t } = useLocale("welcome.pages.presentation");
  const action = () => router.replace("/add-objective");

  return (
    <View style={styles.container}>
      <View style={styles.artContainer} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{t("title")}</Text>
        <Text style={styles.description}>{t("description")}</Text>
      </View>

      <Button action={action}>{t("action")}</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  artContainer: { flex: 1 },
  contentContainer: { padding: 10 },
  container: { flex: 1 },
  title: { fontSize: AppStyles.fontSize["3xl"], fontWeight: "bold" },
  description: { fontSize: AppStyles.fontSize.base, marginVertical: 10, lineHeight: 24 },
});
