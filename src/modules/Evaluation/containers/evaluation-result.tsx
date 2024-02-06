import React from "react";
import { router } from "expo-router";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import LottieView from "lottie-react-native";
import { Button } from "@/components/button";
import { ReText } from "react-native-redash";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { BadScore } from "../components/bad-score";
import { OkScore } from "../components/ok-score";
import { GoodScore } from "../components/good-score";
import { VeryGoodScore } from "../components/very-good-score";
import { Divider } from "@/components/divider";

interface Props {
  score: number;
}

export const EvaluationResult: React.FC<Props> = (props) => {
  const { t } = useLocale("evaluation.containers.evaluation-result");

  const animatedScore = useSharedValue(0);
  const formattedAnimatedScore = useDerivedValue(() => `${Math.floor(animatedScore.value)}`);

  React.useEffect(() => {
    animatedScore.value = withTiming(props.score, { duration: 1000 });
  }, []);

  const renderAnimation = () => {
    const getDetails = () => {
      if (props.score < 30) return require("@/assets/lottie/cry.json");
      if (props.score < 50) return require("@/assets/lottie/ok.json");
      if (props.score < 80) return require("@/assets/lottie/good.json");
      return require("@/assets/lottie/very-good.json");
    };

    return (
      <View style={{ gap: scale(15), alignItems: "center" }}>
        <LottieView
          loop
          autoPlay
          source={getDetails()}
          style={{ width: moderateScale(150), height: moderateScale(150) }}
        />
      </View>
    );
  };

  const renderExplaination = () => {
    if (props.score < 30) return <BadScore />;
    if (props.score < 50) return <OkScore />;
    if (props.score < 80) return <GoodScore />;
    return <VeryGoodScore />;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        {renderAnimation()}

        <View style={styles.textsContainer}>
          <Text style={styles.title}>{t("score-description")}</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ReText style={styles.number} text={formattedAnimatedScore} />
            <Text style={styles.smallNumber}>/100</Text>
          </View>
        </View>

        <Divider />

        {renderExplaination()}
      </ScrollView>

      <Button action={router.back}>Continuar</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  textsContainer: {
    flex: 1,
    width: "100%",
    gap: moderateScale(5),
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(40),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(40),
    gap: moderateScale(30),
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
    marginTop: moderateScale(20),
  },
});
