import React from "react";
import { AppStyles } from "@/styles";
import * as Speech from "expo-speech";
import { Card } from "@/components/card";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, View } from "react-native";
import { useLanguageStore } from "@/stores/language";
import { TextInput } from "react-native-gesture-handler";
import { moderateScale, verticalScale } from "react-native-size-matters";

export const DictationCard: React.FC<{ verse: App.BibleVerse }> = (props) => {
  const { language } = useLanguageStore();
  const { t } = useLocale("training.components.dictation-card");

  const speak = () => {
    Speech.stop();
    Speech.speak(props.verse.text, { language });
  };

  return (
    <Card>
      <View style={styles.container}>
        <Button
          rounded
          size="small"
          grow={false}
          action={speak}
          type="secondary"
          append={<Entypo color={AppStyles.color.white} size={24} name="controller-play" />}
        >
          {t("play")}
        </Button>

        <TextInput multiline numberOfLines={6} placeholder={t("placeholder")} style={styles.input} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { padding: moderateScale(20), flexDirection: "column", gap: moderateScale(20) },
  text: { fontSize: AppStyles.fontSize.lg, color: AppStyles.color.black },
  number: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.gray, fontWeight: "bold" },
  input: {
    width: "100%",
    borderWidth: 1,
    padding: moderateScale(20),
    height: verticalScale(100),
    paddingTop: moderateScale(20),
    borderRadius: moderateScale(20),
    borderColor: AppStyles.color.black,
  },
});
