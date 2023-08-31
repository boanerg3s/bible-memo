import { AppStyles } from "@/styles";
import { Tag } from "@/components/tag";
import { Card } from "@/components/card";
import { useLocale } from "@/hooks/locale";
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

  const renderProgressTag = () => null;

  // FUNÇÃO PARA RENDERIZAR O PROGRESSO
  // const renderProgressTag = () => {
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
  // };

  const renderLastSeenTag = () => {
    if ("lastSeen" in objective && objective.lastSeen) {
      return <Tag color="lightGray">{t("last-seen")}</Tag>;
    }

    return null;
  };

  // TODO
  const cardAction = () => {
    if ("id" in objective && "progress" in objective) {
      console.log("abre o objetivo");
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

        <Text numberOfLines={3} style={styles.preview}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Text>

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
  horizontalContainer: { flexDirection: "row", gap: 5, alignItems: "center" },
  cardTitleAppend: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.gray, fontWeight: "bold" },
});
