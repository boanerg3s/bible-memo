import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Divider } from "@/components/divider";
import { useObjective } from "@/hooks/objective";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { WithHeaderNavigation } from "@/components/header-navigation";
import { TrainingList } from "@/modules/Training/containers/training-list";

const ViewObjectivePage: React.FC = () => {
  const params = useLocalSearchParams();
  const objectiveId = Number(params.objectiveId);
  const { passage } = useObjective(objectiveId);
  const { t: tBible } = useLocale("bible.label");
  const { t } = useLocale("objective.pages.view-objective");
  const { book, chapter, verseFrom, verseTo, version } = passage;
  const title = `${tBible(book)} ${chapter}:${verseFrom}-${verseTo} (${version})`;

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.innerContainer} nestedScrollEnabled={true}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("headline")}</Text>
          <Text style={styles.passage}>{title}</Text>
        </View>

        <Divider />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("exercises")}</Text>
          <TrainingList />
        </View>
      </ScrollView>
    </View>
  );
};

export const ViewObjective = WithHeaderNavigation(ViewObjectivePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 5,
    flexDirection: "column",
  },
  title: {
    fontSize: AppStyles.fontSize.sm,
    color: AppStyles.color.gray,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  passage: {
    fontWeight: "bold",
    color: AppStyles.color.black,
    fontSize: AppStyles.fontSize["2xl"],
  },
  innerContainer: {
    gap: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
