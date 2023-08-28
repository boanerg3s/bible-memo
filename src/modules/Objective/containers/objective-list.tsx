import { AppStyles } from "@/styles";
import { Tag } from "@/components/tag";
import { Card } from "@/components/card";
import { useLocale } from "@/hooks/locale";
import { useObjectiveStore } from "@/stores/objective";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ObjectiveListCard: React.FC<{ objective: App.Objective }> = (props) => {
  const { objective } = props;
  const { t: tBible } = useLocale("bible.label");
  const { t } = useLocale("objective.containers.objective-list");
  const { book, chapter, version, verseFrom, verseTo } = objective.passage;
  const title = `${tBible(book)} ${chapter}:${verseFrom}-${verseTo}`;

  const renderProgressTag = () => {
    if (objective.progress === 100) {
      return <Tag color="green">{t("memorized")}</Tag>;
    }

    return (
      <Tag color="purple">
        {t("progress")}: {String(objective.progress)}%
      </Tag>
    );
  };

  return (
    <Card>
      <TouchableOpacity style={styles.innerCard}>
        <View style={styles.horizontalContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardTitleAppend}>({version})</Text>
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
          {objective.lastSeen && <Tag color="lightGray">{t("last-seen")}</Tag>}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export const ObjectiveList: React.FC = () => {
  const { objectives } = useObjectiveStore();

  return (
    <View style={styles.container}>
      {objectives.map((objective) => (
        <ObjectiveListCard key={objective.id} objective={objective} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20 },
  innerCard: { padding: 20, gap: 10 },
  preview: { color: AppStyles.color.gray },
  cardTitle: { fontSize: AppStyles.fontSize.xl, fontWeight: "bold" },
  horizontalContainer: { flexDirection: "row", gap: 5, alignItems: "center" },
  cardTitleAppend: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.gray, fontWeight: "bold" },
});
