import { AppStyles } from "@/styles";
import { router } from "expo-router";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { StyleSheet, Text, View } from "react-native";
import { useScoreInfo } from "@/modules/Score/hooks/score";

interface Props {
  score: number;
  objectiveId: number;
}

export const ScoreInfo: React.FC<Props> = (props) => {
  const { scoreNumber } = useScoreInfo(props.score);
  const { t } = useLocale("objective.components.score-bar");
  const action = () => router.push({ pathname: "/evaluate", params: { objectiveId: props.objectiveId } });

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Text style={styles.caption}>{t("your-score")}:</Text>
        <Text style={styles.score}>{scoreNumber}</Text>
      </View>

      <Button grow={false} rounded size="small" action={action}>
        {t("action")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barContainer: {
    gap: 5,
    flex: 1,
    flexDirection: "column",
  },
  score: {
    fontSize: AppStyles.fontSize["2xl"],
    color: AppStyles.color.black,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  caption: {
    fontSize: AppStyles.fontSize.xs,
    color: AppStyles.color.gray,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
