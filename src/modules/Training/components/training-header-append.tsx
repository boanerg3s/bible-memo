import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Info } from "react-native-feather";
import { useObjective } from "@/hooks/objective";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const TrainingHeaderAppend: React.FC = () => {
  const params = useLocalSearchParams();
  const objective = useObjective(Number(params.objectiveId));

  const { t } = useLocale("training");
  const { t: tBible } = useLocale("bible.label");
  const { book, chapter, verseFrom, verseTo, version } = objective.passage;
  const title = `${tBible(book)} ${chapter}:${verseFrom}-${verseTo} (${version})`;

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSeparator}>•</Text>

      <TouchableOpacity style={styles.trainingKeyContainer}>
        <Text style={styles.headerMode}>{t(`title.${params.trainingKey}`)}</Text>
        <Info width={16} stroke={AppStyles.color.gray} strokeWidth={3} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { flexDirection: "row", gap: 10, alignItems: "center" },
  trainingKeyContainer: { flexDirection: "row", gap: 5, alignItems: "center" },
  headerTitle: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.black, fontWeight: "bold" },
  headerSeparator: { color: AppStyles.color.gray },
  headerMode: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.gray, fontWeight: "bold" },
});
