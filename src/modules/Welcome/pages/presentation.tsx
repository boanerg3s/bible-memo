import React from "react";
import { router } from "expo-router";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale } from "react-native-size-matters";
import { ScrollView, StyleSheet, View } from "react-native";
import { FirstStepContainer } from "../containers/first-step";
import { ThirdStepContainer } from "../containers/third-step";
import { SecondStepContainer } from "../containers/second-step";

const STEPS = [FirstStepContainer, SecondStepContainer, ThirdStepContainer];

export const PresentationPage: React.FC = () => {
  const [step, setStep] = React.useState(0);
  const StepComponent = React.useMemo(() => STEPS[step], [step]);
  const { t } = useLocale("welcome.pages.presentation");

  const action = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }

    router.replace("/add-objective");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <StepComponent />
      </ScrollView>

      <LinearGradient colors={["rgba(255,255,255,0)", "white"]} style={styles.bottomContainer}>
        <Button grow={false} rounded action={action}>
          {t("action")}
        </Button>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: moderateScale(20),
    gap: moderateScale(10),
    paddingBottom: moderateScale(120),
  },
  bottomContainer: {
    bottom: 0,
    shadowColor: "transparent",
    width: "100%",
    position: "absolute",
    padding: moderateScale(20),
  },
});
