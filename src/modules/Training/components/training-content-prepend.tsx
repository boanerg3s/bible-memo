import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useObjective } from "@/hooks/objective";

export const TrainingContentPrepend: React.FC = () => {
  const params = useLocalSearchParams();
  const objective = useObjective(Number(params.objectiveId));
  const { t } = useLocale("training.components.training-content-prepend");

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>
        {t("your-progress")}: {objective.progress}%
      </Text>

      <TouchableOpacity style={styles.customButton}>
        <Text style={styles.customButtonLabel}>{t("action")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: AppStyles.color.blue,
  },
  customButton: {
    height: 28,
    borderRadius: 100,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "white",
  },
  customButtonLabel: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.blue,
    fontSize: AppStyles.fontSize.xs,
  },
  caption: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.white,
    fontSize: AppStyles.fontSize.xs,
  },
});
