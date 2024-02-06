import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Divider } from "@/components/divider";
import { usePassageContent } from "@/hooks/passage";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { ReadingCard } from "@/modules/Training/components/reading-card";
import { FragmentsCard } from "@/modules/Training/components/fragments-card";
import { DictationCard } from "@/modules/Training/components/dictation-card";
import { FirstLetterCard } from "@/modules/Training/components/first-letter-card";

export const SecondStepContainer: React.FC = () => {
  const { t } = useLocale("welcome.containers.second-step");
  const config = t("training.exampleConfig") as unknown as Bible.Passage;
  const { content, fetchPassageContent } = usePassageContent(config);
  const exampleVerse = React.useMemo(() => (content ? content[0] : null), [content]);

  React.useEffect(() => {
    fetchPassageContent();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t("intro")[0]}</Text>

      <AnimatedLottieView
        loop
        autoPlay
        source={require("@/assets/lottie/brain.json")}
        style={{
          width: moderateScale(180),
          height: moderateScale(180),
          marginTop: -moderateScale(10),
          marginLeft: -moderateScale(14),
          marginBottom: -moderateScale(40),
        }}
      />

      <Text style={styles.description}>{t("intro")[1]}</Text>
      <Text style={styles.description}>{t("intro")[2]}</Text>

      <Divider />

      <Text style={styles.trainingTitle}>{t("training.reading.title")}</Text>
      <Text style={styles.description}>{t("training.reading.description")}</Text>
      {exampleVerse && <ReadingCard verse={exampleVerse} />}

      <Divider />

      <Text style={styles.trainingTitle}>{t("training.dictation.title")}</Text>
      <Text style={styles.description}>{t("training.dictation.description")}</Text>
      {exampleVerse && <DictationCard verse={exampleVerse} />}

      <Divider />

      <Text style={styles.trainingTitle}>{t("training.first-letter.title")}</Text>
      <Text style={styles.description}>{t("training.first-letter.description")}</Text>
      {exampleVerse && <FirstLetterCard verse={exampleVerse} />}

      <Divider />

      <Text style={styles.trainingTitle}>{t("training.fragments.title")}</Text>
      <Text style={styles.description}>{t("training.fragments.description")}</Text>
      {exampleVerse && <FragmentsCard verse={exampleVerse} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: moderateScale(40) },
  trainingTitle: {
    fontSize: AppStyles.fontSize.sm,
    color: AppStyles.color.gray,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  description: { fontSize: AppStyles.fontSize.base, lineHeight: verticalScale(24), color: AppStyles.color.black },
});
