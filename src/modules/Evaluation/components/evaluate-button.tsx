import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { useVoice } from "@/modules/Voice/hooks/listener";
import { useCountdown } from "@/modules/Evaluation/hooks/countdown";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { VoiceVisualizer } from "@/modules/Voice/components/voice-visualizer";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
type Props = { onListen: (value: string) => void };

export const EvaluateButton: React.FC<Props> = (props) => {
  const { count, runCountdown } = useCountdown();
  const { t } = useLocale("evaluation.components.evaluate-button");
  const { hasErrors, isListening, listen, speechLevel, stop } = useVoice();

  const start = async () => {
    try {
      await runCountdown(3);
      const response = await listen();
      props.onListen(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (isListening) {
    return (
      <TouchableOpacity onPress={stop} style={styles.container}>
        <View style={styles.visualizerSafeArea}>
          <VoiceVisualizer factor={speechLevel} />
        </View>

        <Text style={styles.label}>{t("stop")}</Text>
      </TouchableOpacity>
    );
  }

  if (count > 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.label}>{t("prepare")}</Text>
      </View>
    );
  }

  if (hasErrors) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={start} style={styles.container}>
          <Text style={styles.label}>{t("try-again")}</Text>
        </TouchableOpacity>

        <Text style={styles.error}>{t("error")}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={start} style={styles.container}>
      <Text style={styles.label}>{t("init")}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(200),
    height: scale(200),
    borderRadius: scale(200),
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    backgroundColor: AppStyles.color.white,
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
  },
  visualizerSafeArea: {
    height: verticalScale(18),
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.gray,
    fontSize: AppStyles.fontSize.base,
  },
  count: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.gray,
    fontSize: AppStyles.fontSize["3xl"],
  },
  error: {
    marginTop: moderateScale(40),
    textAlign: "center",
    fontSize: AppStyles.fontSize.sm,
  },
});
