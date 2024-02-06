import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { useObjective } from "@/hooks/objective";
import { useObjectiveStore } from "@/stores/objective";
import { moderateScale } from "react-native-size-matters";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ScoreBar } from "@/modules/Objective/components/score-bar";
import { WithHeaderNavigation } from "@/components/header-navigation";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { TrainingList } from "@/modules/Training/containers/training-list";

const ViewObjectivePage: React.FC = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation<any>();
  const objectiveId = Number(params.objectiveId);

  const objective = useObjective(objectiveId);
  const { t: tBible } = useLocale("bible.label");
  const { removeObjective } = useObjectiveStore();
  const { t } = useLocale("objective.pages.view-objective");

  if (!objective) {
    return null;
  }

  const { book, chapter, verseFrom, verseTo, version } = objective.passage;
  const title = `${tBible(book)} ${chapter}:${verseFrom}-${verseTo} (${version})`;

  const remove = () => {
    const removeAction = async () => {
      await removeObjective(objectiveId);
      navigation.reset({ index: 0, routes: [{ name: "index", key: "/" }] });
    };

    Alert.alert(t("remove.title"), t("remove.description"), [
      { text: t("remove.cancel"), onPress: () => null, style: "cancel" },
      { text: t("remove.confirm"), onPress: removeAction },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.innerContainer} nestedScrollEnabled={true}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("headline")}</Text>
          <Text style={styles.passage}>{title}</Text>
        </View>

        <Divider />

        <View style={styles.contentContainer}>
          <ScoreBar score={objective.score} objectiveId={objectiveId} />
        </View>

        <Divider />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t("exercises")}</Text>
          <TrainingList objectiveId={objectiveId} />
        </View>

        <Divider />

        <View style={styles.contentContainer}>
          <Button rounded size="small" type="danger" action={remove}>
            {t("delete")}
          </Button>
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
    gap: moderateScale(10),
    paddingHorizontal: moderateScale(20),
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
    gap: moderateScale(20),
    paddingBottom: moderateScale(20),
    flexDirection: "column",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
