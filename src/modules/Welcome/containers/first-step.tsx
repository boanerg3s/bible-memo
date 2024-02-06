import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export const FirstStepContainer: React.FC = () => {
  const { t } = useLocale("welcome.containers.first-step");

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        loop
        autoPlay
        source={require("@/assets/lottie/hi.json")}
        style={{
          width: moderateScale(200),
          height: moderateScale(200),
          marginLeft: -moderateScale(14),
          marginBottom: -moderateScale(40),
        }}
      />

      <Text style={styles.title}>{t("title")}</Text>
      <Text style={styles.description}>{t("description")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: moderateScale(10) },
  title: { fontSize: AppStyles.fontSize["3xl"], fontWeight: "bold", color: AppStyles.color.black },
  description: {
    fontSize: AppStyles.fontSize.base,
    marginVertical: moderateScale(10),
    lineHeight: verticalScale(24),
    color: AppStyles.color.black,
  },
});
