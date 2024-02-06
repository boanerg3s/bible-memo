import "react-native-reanimated";
import "react-native-gesture-handler";

import React from "react";
import { MotiView } from "moti";
import { router } from "expo-router";
import { AppStyles } from "@/styles";
import { Tag } from "@/components/tag";
import { Card } from "@/components/card";
import { Skeleton } from "moti/skeleton";
import { useLocale } from "@/hooks/locale";
import { useSummarizedPassageContent } from "@/hooks/passage";
import { ScoreTag } from "@/modules/Score/components/score-tag";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

type SuggestedObjectiveCardProps = { objective: App.SuggestedObjective };
type AdoptedObjectiveCardProps = { objective: App.Objective };
type ObjectiveCardProps = SuggestedObjectiveCardProps | AdoptedObjectiveCardProps;

export const ObjectiveCard: React.FC<ObjectiveCardProps> = (props) => {
  const { objective } = props;
  const { t: tBible } = useLocale("bible.label");
  const { t } = useLocale("objective.containers.objective-list");
  const { book, chapter, verseFrom, verseTo } = objective.passage;
  const title = `${tBible(book)} ${chapter}:${verseFrom}-${verseTo}`;
  const { fetchPassageContent, content, isContentLoading } = useSummarizedPassageContent(objective.passage);

  React.useEffect(() => {
    fetchPassageContent();
  }, [fetchPassageContent]);

  const renderScoreTag = () => {
    if ("id" in objective && "score" in objective) return <ScoreTag score={objective.score} />;
    return <Tag color="lightGray">{t("not-started")}</Tag>;
  };

  const renderLastSeenTag = () => {
    if ("lastSeen" in objective && objective.lastSeen) return <Tag color="lightGray">{t("last-seen")}</Tag>;
    return null;
  };

  const cardAction = () => {
    if ("id" in objective && "score" in objective) {
      router.push({ pathname: "/view-objective", params: { objectiveId: objective.id } });
      return;
    }

    router.push("/add-suggested-objective");
    return;
  };

  return (
    <Card>
      <TouchableOpacity onPress={cardAction} style={styles.innerCard}>
        <View style={styles.horizontalContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          {"version" in objective.passage && <Text style={styles.cardTitleAppend}>({objective.passage.version})</Text>}
        </View>

        {isContentLoading && (
          <MotiView transition={{ type: "timing" }} style={styles.skeletonContainer}>
            <Skeleton colorMode="light" height={verticalScale(10)} width="100%" />
            <Skeleton colorMode="light" height={verticalScale(10)} width="100%" />
            <Skeleton colorMode="light" height={verticalScale(10)} width="100%" />
          </MotiView>
        )}

        {!isContentLoading && (
          <Text numberOfLines={3} style={styles.preview}>
            {content}
          </Text>
        )}

        <View style={styles.horizontalContainer}>
          {renderScoreTag()}
          {renderLastSeenTag()}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  innerCard: { padding: moderateScale(20), gap: moderateScale(10) },
  preview: { color: AppStyles.color.gray },
  cardTitle: { fontSize: AppStyles.fontSize.xl, fontWeight: "bold" },
  skeletonContainer: { flexDirection: "column", gap: moderateScale(11) },
  horizontalContainer: { flexDirection: "row", gap: moderateScale(5), alignItems: "center" },
  cardTitleAppend: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.gray, fontWeight: "bold" },
});
