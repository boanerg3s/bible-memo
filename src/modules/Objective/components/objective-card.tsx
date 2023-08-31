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
import { usePassageContent } from "@/modules/Objective/hooks/card";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type SuggestedObjectiveCardProps = { objective: App.SuggestedObjective };
type AdoptedObjectiveCardProps = { objective: App.Objective };
type ObjectiveCardProps = SuggestedObjectiveCardProps | AdoptedObjectiveCardProps;

export const ObjectiveCard: React.FC<ObjectiveCardProps> = (props) => {
  const { objective } = props;
  const { t: tBible } = useLocale("bible.label");
  const { t } = useLocale("objective.containers.objective-list");
  const { book, chapter, verseFrom, verseTo } = objective.passage;
  const title = `${tBible(book)} ${chapter}:${verseFrom}-${verseTo}`;
  const { fetchPassageContent, content, isContentLoading } = usePassageContent(objective.passage);

  React.useEffect(() => {
    fetchPassageContent();
  }, [fetchPassageContent]);

  const renderProgressTag = () => {
    //   if ("id" in objective && "progress" in objective) {
    //     if (objective.progress === 100) {
    //       return <Tag color="green">{t("memorized")}</Tag>;
    //     }

    //     return (
    //       <Tag color="purple">
    //         {t("progress")}: {String(objective.progress)}%
    //       </Tag>
    //     );
    //   }

    //   return <Tag color="lightGray">{t("not-started")}</Tag>;
    return null;
  };

  const renderLastSeenTag = () => {
    if ("lastSeen" in objective && objective.lastSeen) return <Tag color="lightGray">{t("last-seen")}</Tag>;
    return null;
  };

  // TODO
  const cardAction = () => {
    if ("id" in objective && "progress" in objective) {
      router.push({ pathname: "/view-objective", params: { objectiveId: objective.id } });
      return;
    }

    console.log("adiciona aos objetivos");
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
            <Skeleton colorMode="light" height={10} width="100%" />
            <Skeleton colorMode="light" height={10} width="100%" />
            <Skeleton colorMode="light" height={10} width="100%" />
          </MotiView>
        )}

        {!isContentLoading && (
          <Text numberOfLines={3} style={styles.preview}>
            {content}
          </Text>
        )}

        <View style={styles.horizontalContainer}>
          {renderProgressTag()}
          {renderLastSeenTag()}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  innerCard: { padding: 20, gap: 10 },
  preview: { color: AppStyles.color.gray },
  cardTitle: { fontSize: AppStyles.fontSize.xl, fontWeight: "bold" },
  skeletonContainer: { flexDirection: "column", gap: 11 },
  horizontalContainer: { flexDirection: "row", gap: 5, alignItems: "center" },
  cardTitleAppend: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.gray, fontWeight: "bold" },
});
