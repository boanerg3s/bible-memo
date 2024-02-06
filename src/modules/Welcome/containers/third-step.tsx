import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export const ThirdStepContainer: React.FC = () => {
  const { t } = useLocale("welcome.containers.third-step");

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t("description")[0]}</Text>

      <AnimatedLottieView
        loop
        autoPlay
        source={require("@/assets/lottie/party.json")}
        style={{
          width: moderateScale(200),
          height: moderateScale(200),
          marginLeft: -moderateScale(14),
          marginBottom: -moderateScale(10),
        }}
      />

      <Text style={styles.description}>{t("description")[1]}</Text>
      <Text style={styles.description}>{t("description")[2]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: moderateScale(10) },
  description: { fontSize: AppStyles.fontSize.base, marginVertical: moderateScale(10), lineHeight: verticalScale(24) },
});
