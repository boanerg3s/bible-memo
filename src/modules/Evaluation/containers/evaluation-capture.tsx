import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { useObjective } from "@/hooks/objective";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { EvaluateButton } from "@/modules/Evaluation/components/evaluate-button";
import { Button } from "@/components/button";
import { WriteBox } from "../components/write-box";

interface Props {
  onListen: (value: string) => void;
}

const EvaluationCaptureHeader = () => {
  const params = useLocalSearchParams();
  const { t: tBible } = useLocale("bible.label");
  const { t } = useLocale("evaluation.containers.evaluation-capture");

  const objective = useObjective(Number(params.objectiveId));
  const { book, chapter, verseFrom, verseTo, version } = objective.passage;
  const title = `${tBible(book)} ${chapter}:${verseFrom}-${verseTo}`;
  const fullTitle = `${title} (${version})`;

  return (
    <View style={styles.textsContainer}>
      <Text style={styles.title}>{t("title")}</Text>
      <Text style={styles.objective}>{fullTitle}</Text>
      <Text style={styles.description}>{t("description", { objective: title })}</Text>
    </View>
  );
};

export const EvaluationCapture: React.FC<Props> = (props) => {
  const [writeMode, setWriteMode] = React.useState(false);
  const { t } = useLocale("evaluation.containers.evaluation-capture");

  if (writeMode) {
    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps>
        <EvaluationCaptureHeader />
        <WriteBox onListen={props.onListen} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <EvaluationCaptureHeader />
      <EvaluateButton onListen={props.onListen} />
      <Button type="secondary" size="small" rounded action={() => setWriteMode(true)}>
        {t("change-mode")}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textsContainer: { flexDirection: "column", gap: 5 },
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40, gap: 40 },
  title: { textAlign: "center", textTransform: "uppercase", fontSize: AppStyles.fontSize.sm, fontWeight: "bold" },
  objective: { textAlign: "center", fontWeight: "bold", fontSize: AppStyles.fontSize["2xl"] },
  description: { fontSize: AppStyles.fontSize.base, textAlign: "center", color: AppStyles.color.black },
});
