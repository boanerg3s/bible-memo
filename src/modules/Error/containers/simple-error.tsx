import { router } from "expo-router";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { StyleSheet, Text, View } from "react-native";

export const SimpleError: React.FC = () => {
  const { t } = useLocale("error.containers.simple-error");
  const action = () => router.replace("/");

  return (
    <View style={styles.container}>
      <Text>{t("title")}</Text>
      <Text>{t("description")}</Text>
      <Button action={action}>{t("action")}</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
