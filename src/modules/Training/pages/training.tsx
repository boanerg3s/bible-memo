import React from "react";
import { useObjective } from "@/hooks/objective";
import { useLocalSearchParams } from "expo-router";
import { usePassageContent } from "@/hooks/passage";
import { useObjectiveStore } from "@/stores/objective";
import { BookBackground } from "@/components/book-background";
import { FullPageLoading } from "@/components/full-page-loading";
import { SimpleError } from "@/modules/Error/containers/simple-error";
import { WithHeaderNavigation } from "@/components/header-navigation";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { ReadingCard } from "@/modules/Training/components/reading-card";
import { FragmentsCard } from "@/modules/Training/components/fragments-card";
import { ShuffleButton } from "@/modules/Training/components/shuffle-button";
import { FirstLetterCard } from "@/modules/Training/components/first-letter-card";
import { TrainingHeaderAppend } from "@/modules/Training/components/training-header-append";
import { TrainingContentPrepend } from "@/modules/Training/components/training-content-prepend";

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

export const TrainingPage: React.FC = () => {
  const params = useLocalSearchParams();
  const { loading, updateLastSeen } = useObjectiveStore();
  const [pageKey, setPageKey] = React.useState(Math.random());

  const objectiveId = Number(params.objectiveId);
  const objective = useObjective(objectiveId);
  const { content, fetchPassageContent, isContentLoading } = usePassageContent(objective.passage);

  const mode = params.trainingKey as App.Training;
  const ModeComponent = TRAINING_MODES[mode];
  const canShuffle = MODES_CAN_SHUFFLE[mode];

  React.useEffect(() => {
    fetchPassageContent();
    updateLastSeen(objective.id);
  }, []);

  if (isContentLoading || loading) {
    return <FullPageLoading />;
  }

  if (!content) {
    return <SimpleError />;
  }

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <BookBackground />

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

export const Training = WithHeaderNavigation(TrainingPage, {
  HeaderAppend: TrainingHeaderAppend,
  ContentPrepend: TrainingContentPrepend,
});

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    gap: 10,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    minHeight: Dimensions.get("window").height - 136,
  },
  fullPageContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});
