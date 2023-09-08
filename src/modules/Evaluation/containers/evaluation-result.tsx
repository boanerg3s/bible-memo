import React from "react";
import { router } from "expo-router";
import { AppStyles } from "@/styles";
import abbreviate from "number-abbreviate";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { ReText } from "react-native-redash";
import { StyleSheet, Text, View } from "react-native";
import { runOnJS, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

interface Props {
  score: number;
  newScore: number;
}

export const EvaluationResult: React.FC<Props> = (props) => {
  const { t } = useLocale("evaluation.containers.evaluation-result");

  const animatedScore = useSharedValue(0);
  const formattedAnimatedScore = useDerivedValue(() => `${Math.floor(animatedScore.value)}`);

  const animatedNewScore = useSharedValue(0);
  const [totalScoreNumber, setTotalScoreNumber] = React.useState("");
  const abbr = (value: number): void => setTotalScoreNumber(abbreviate(Math.floor(value), 2));
  useDerivedValue(() => runOnJS(abbr)(animatedNewScore.value));

  React.useEffect(() => {
    animatedScore.value = withTiming(props.score, { duration: 1000 });
    animatedNewScore.value = withTiming(props.newScore, { duration: 1500 });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.textsContainer}>
          <Text style={styles.title}>{t("score-description")}</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ReText style={styles.number} text={formattedAnimatedScore} />
            <Text style={styles.smallNumber}>/100</Text>
          </View>
        </View>

        <View style={styles.textsContainer}>
          <Text style={styles.title}>{t("new-score-description")}</Text>
          <Text style={styles.number}>{totalScoreNumber}</Text>
        </View>
      </View>
      <Button action={router.back}>Continuar</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  textsContainer: {
    gap: 5,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 40,
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: AppStyles.fontSize.sm,
    fontWeight: "bold",
    color: AppStyles.color.gray,
  },
  number: {
    textAlign: "center",
    fontSize: AppStyles.fontSize["6xl"],
    fontWeight: "bold",
  },
  smallNumber: {
    fontSize: AppStyles.fontSize.lg,
    color: AppStyles.color.gray,
    marginTop: 20,
  },
});
