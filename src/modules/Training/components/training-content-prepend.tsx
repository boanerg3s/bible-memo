import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { useObjective } from "@/hooks/objective";
import { router, useLocalSearchParams } from "expo-router";
import { useScoreInfo } from "@/modules/Score/hooks/score";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const TrainingContentPrepend: React.FC = () => {
  const params = useLocalSearchParams();
  const objectiveId = Number(params.objectiveId);
  const objective = useObjective(objectiveId);
  const { scoreNumber } = useScoreInfo(objective.score);
  const { t } = useLocale("training.components.training-content-prepend");
  const action = () => router.push({ pathname: "/evaluate", params: { objectiveId } });

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>
        {t("your-score")}: {scoreNumber}
      </Text>

      <TouchableOpacity onPress={action} style={styles.customButton}>
        <Text style={styles.customButtonLabel}>{t("action")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(20),
    height: verticalScale(40),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
    justifyContent: "space-between",
    backgroundColor: AppStyles.color.primary,
  },
  customButton: {
    height: verticalScale(28),
    borderRadius: scale(100),
    paddingHorizontal: moderateScale(10),
    justifyContent: "center",
    backgroundColor: "white",
  },
  customButtonLabel: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.primary,
    fontSize: AppStyles.fontSize.xs,
  },
  caption: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.white,
    fontSize: AppStyles.fontSize.xs,
  },
});
