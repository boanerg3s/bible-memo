import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Info, RefreshCcw } from "react-native-feather";
import { useObjective } from "@/hooks/objective";
import { useLocalSearchParams } from "expo-router";
import { usePassageContent } from "@/hooks/passage";
import { useObjectiveStore } from "@/stores/objective";
import { WithHeaderNavigation } from "@/components/header-navigation";
import { ReadingCard } from "@/modules/Training/components/reading-card";
import { FragmentsCard } from "@/modules/Training/components/fragments-card";
import { ShuffleButton } from "@/modules/Training/components/shuffle-button";
import { FirstLetterCard } from "@/modules/Training/components/first-letter-card";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TRAINING_MODES: Record<App.Training, React.ComponentType<{ verse: App.BibleVerse }>> = {
  READING: ReadingCard,
  FRAGMENTS: FragmentsCard,
  FIRST_LETTER: FirstLetterCard,
};

const MODES_CAN_SHUFFLE: Record<App.Training, boolean> = {
  READING: false,
  FRAGMENTS: true,
  FIRST_LETTER: false,
};

const TraningPageHeaderAppend: React.FC = () => {
  const params = useLocalSearchParams();
  const objective = useObjective(Number(params.objectiveId));

  const { t: tBible } = useLocale("bible.label");
  const { t } = useLocale("training");
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

export const TrainingPage: React.FC = () => {
  const params = useLocalSearchParams();
  const { loading, updateLastSeen } = useObjectiveStore();
  const [pageKey, setPageKey] = React.useState(Math.random());

  const objective = useObjective(Number(params.objectiveId));
  const { content, fetchPassageContent, isContentLoading } = usePassageContent(objective.passage);

  const mode = params.trainingKey as App.Training;
  const ModeComponent = TRAINING_MODES[mode];
  const canShuffle = MODES_CAN_SHUFFLE[mode];

  React.useEffect(() => {
    fetchPassageContent();
    updateLastSeen(objective.id);
  }, []);

  if (isContentLoading || loading) {
    return (
      <View style={styles.fullPageContainer}>
        <ActivityIndicator size={32} color={AppStyles.color.blue} />
      </View>
    );
  }

  // TODO
  if (!content) {
    return (
      <View style={styles.fullPageContainer}>
        <Text>Ops...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View key={pageKey} style={[styles.listContainer, canShuffle && { paddingBottom: 80 }]}>
          {content.map((verse) => (
            <ModeComponent key={verse.number} verse={verse} />
          ))}
        </View>
      </ScrollView>

      {canShuffle && (
        <View style={{ position: "absolute", bottom: 20, right: 20 }}>
          <ShuffleButton action={() => setPageKey(Math.random())} />
        </View>
      )}
    </View>
  );
};

export const Training = WithHeaderNavigation(TrainingPage, TraningPageHeaderAppend);

const styles = StyleSheet.create({
  headerContainer: { flexDirection: "row", gap: 10, alignItems: "center" },
  trainingKeyContainer: { flexDirection: "row", gap: 5, alignItems: "center" },
  headerTitle: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.black, fontWeight: "bold" },
  headerSeparator: { color: AppStyles.color.gray },
  headerMode: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.gray, fontWeight: "bold" },
  listContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20, gap: 10 },
  fullPageContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});
